// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Root from '../../../core/root/root.js';
import * as Trace from '../../../models/trace/trace.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import { shouldRenderForCategory } from './insights/Helpers.js';
import * as Insights from './insights/insights.js';
import styles from './sidebarSingleInsightSet.css.js';
import { NumberWithUnit } from './Utils.js';
const { html } = LitHtml;
const UIStrings = {
    /**
     *@description title used for a metric value to tell the user about its score classification
     *@example {INP} PH1
     *@example {1.2s} PH2
     *@example {poor} PH3
     */
    metricScore: '{PH1}: {PH2} {PH3} score',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/SidebarSingleInsightSet.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
/**
 * These are WIP Insights that are only shown if the user has turned on the
 * "enable experimental performance insights" experiment. This is used to enable
 * us to ship incrementally without turning insights on by default for all
 * users. */
const EXPERIMENTAL_INSIGHTS = new Set([
    'FontDisplay',
]);
/**
 * Every insight (INCLUDING experimental ones)
 * The order of these properties is the order the insights will be shown in the sidebar.
 * TODO(crbug.com/368135130): sort this in a smart way!
 */
const INSIGHT_NAME_TO_COMPONENT = {
    InteractionToNextPaint: Insights.InteractionToNextPaint.InteractionToNextPaint,
    LCPPhases: Insights.LCPPhases.LCPPhases,
    LCPDiscovery: Insights.LCPDiscovery.LCPDiscovery,
    CLSCulprits: Insights.CLSCulprits.CLSCulprits,
    RenderBlocking: Insights.RenderBlocking.RenderBlocking,
    DocumentLatency: Insights.DocumentLatency.DocumentLatency,
    FontDisplay: Insights.FontDisplay.FontDisplay,
    Viewport: Insights.Viewport.Viewport,
    ThirdParties: Insights.ThirdParties.ThirdParties,
    SlowCSSSelector: Insights.SlowCSSSelector.SlowCSSSelector,
};
export class SidebarSingleInsightSet extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #renderBound = this.#render.bind(this);
    #data = {
        parsedTrace: null,
        insights: null,
        insightSetKey: null,
        activeCategory: Trace.Insights.Types.InsightCategory.ALL,
        activeInsight: null,
    };
    set data(data) {
        this.#data = data;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [styles];
        this.#render();
    }
    #metricIsVisible(label) {
        if (this.#data.activeCategory === Trace.Insights.Types.InsightCategory.ALL) {
            return true;
        }
        return label === this.#data.activeCategory;
    }
    #onClickMetric(traceEvent) {
        this.dispatchEvent(new Insights.EventRef.EventReferenceClick(traceEvent));
    }
    #renderMetricValue(label, value, classification, eventToSelectOnClick) {
        const valueText = typeof value === 'string' ? value : value.text;
        const valueDisplay = typeof value === 'string' ? value : value.element;
        // NOTE: it is deliberate to use the same value for the title and
        // aria-label; the aria-label is used to give more context to
        // screen-readers, and the title is to aid users who may not know what
        // the red/orange/green classification is, or those who are unable to
        // easily distinguish the visual colour differences.
        // clang-format off
        const title = i18nString(UIStrings.metricScore, { PH1: label, PH2: valueText, PH3: classification });
        return this.#metricIsVisible(label) ? html `
      <button class="metric"
        @click=${eventToSelectOnClick ? this.#onClickMetric.bind(this, eventToSelectOnClick) : null}
        title=${title}
        aria-label=${title}
      >
        <div class="metric-value metric-value-${classification}">${valueDisplay}</div>
        <div class="metric-label">${label}</div>
      </button>
    ` : LitHtml.nothing;
        // clang-format on
    }
    #getINP(insightSetKey) {
        const insight = Trace.Insights.Common.getInsight('InteractionToNextPaint', this.#data.insights, insightSetKey);
        if (!insight?.longestInteractionEvent?.dur) {
            return null;
        }
        const value = insight.longestInteractionEvent.dur;
        return { value, event: insight.longestInteractionEvent };
    }
    #getLCP(insightSetKey) {
        const insight = Trace.Insights.Common.getInsight('LCPPhases', this.#data.insights, insightSetKey);
        if (!insight || !insight.lcpMs || !insight.lcpEvent) {
            return null;
        }
        const value = Trace.Helpers.Timing.millisecondsToMicroseconds(insight.lcpMs);
        return { value, event: insight.lcpEvent };
    }
    #getCLS(insightSetKey) {
        const insight = Trace.Insights.Common.getInsight('CLSCulprits', this.#data.insights, insightSetKey);
        if (!insight) {
            // Unlike the other metrics, there is still a value for this metric even with no data.
            // This means this view will always display a CLS score.
            return { value: 0, worstShiftEvent: null };
        }
        // TODO(cjamcl): the CLS insight should be doing this for us.
        let maxScore = 0;
        let worstCluster;
        for (const cluster of insight.clusters) {
            if (cluster.clusterCumulativeScore > maxScore) {
                maxScore = cluster.clusterCumulativeScore;
                worstCluster = cluster;
            }
        }
        return { value: maxScore, worstShiftEvent: worstCluster?.worstShiftEvent ?? null };
    }
    #renderMetrics(insightSetKey) {
        const lcp = this.#getLCP(insightSetKey);
        const cls = this.#getCLS(insightSetKey);
        const inp = this.#getINP(insightSetKey);
        return html `
    <div class="metrics-row">
    ${lcp ? this.#renderMetricValue('LCP', NumberWithUnit.formatMicroSecondsAsSeconds(lcp.value), Trace.Handlers.ModelHandlers.PageLoadMetrics.scoreClassificationForLargestContentfulPaint(lcp.value), lcp.event ?? null) :
            LitHtml.nothing}
    ${inp ? this.#renderMetricValue('INP', NumberWithUnit.formatMicroSecondsAsMillisFixed(inp.value), Trace.Handlers.ModelHandlers.UserInteractions.scoreClassificationForInteractionToNextPaint(inp.value), inp.event) :
            LitHtml.nothing}
    ${this.#renderMetricValue('CLS', cls.value ? cls.value.toFixed(2) : '0', Trace.Handlers.ModelHandlers.LayoutShifts.scoreClassificationForLayoutShift(cls.value), cls.worstShiftEvent)}
    </div>
    `;
    }
    #renderInsights(insightSets, parsedTrace, insightSetKey) {
        const includeExperimental = Root.Runtime.experiments.isEnabled("timeline-experimental-insights" /* Root.Runtime.ExperimentName.TIMELINE_EXPERIMENTAL_INSIGHTS */);
        const models = insightSets?.get(insightSetKey)?.model;
        if (!models) {
            return LitHtml.nothing;
        }
        const components = [];
        for (const [name, componentClass] of Object.entries(INSIGHT_NAME_TO_COMPONENT)) {
            if (!includeExperimental && EXPERIMENTAL_INSIGHTS.has(name)) {
                continue;
            }
            const model = models[name];
            if (!model ||
                !shouldRenderForCategory({ activeCategory: this.#data.activeCategory, insightCategory: model.category })) {
                continue;
            }
            // clang-format off
            const component = html `<div>
        <${componentClass.litTagName}
          .selected=${this.#data.activeInsight?.model === model}
          .model=${model}
          .parsedTrace=${parsedTrace}
          .insightSetKey=${insightSetKey}
        </${componentClass.litTagName}>
      </div>`;
            // clang-format on
            components.push(component);
        }
        return html `${components}`;
    }
    #render() {
        const { parsedTrace, insights, insightSetKey, } = this.#data;
        if (!parsedTrace || !insights || !insightSetKey) {
            LitHtml.render(html ``, this.#shadow, { host: this });
            return;
        }
        // clang-format off
        LitHtml.render(html `
      <div class="navigation">
        ${this.#renderMetrics(insightSetKey)}
        ${this.#renderInsights(insights, parsedTrace, insightSetKey)}
        </div>
      `, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-performance-sidebar-single-navigation', SidebarSingleInsightSet);
//# sourceMappingURL=SidebarSingleInsightSet.js.map