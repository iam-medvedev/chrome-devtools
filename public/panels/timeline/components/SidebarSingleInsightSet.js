// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Trace from '../../../models/trace/trace.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as Insights from './insights/insights.js';
import { EventReferenceClick } from './Sidebar.js';
import styles from './sidebarSingleInsightSet.css.js';
export class SidebarSingleInsightSet extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-single-navigation`;
    #shadow = this.attachShadow({ mode: 'open' });
    #renderBound = this.#render.bind(this);
    #data = {
        parsedTrace: null,
        insights: null,
        insightSetKey: null,
        activeCategory: Insights.Types.Category.ALL,
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
        if (this.#data.activeCategory === Insights.Types.Category.ALL) {
            return true;
        }
        return label === this.#data.activeCategory;
    }
    #onClickMetric(event, insightComponentName) {
        const el = this.shadowRoot?.querySelector(insightComponentName);
        if (el && this.#data.insightSetKey) {
            this.dispatchEvent(new Insights.SidebarInsight.InsightActivated(el.internalName, this.#data.insightSetKey, el.getInitialOverlays()));
        }
        this.dispatchEvent(new EventReferenceClick(event));
    }
    #renderMetricValue(label, value, classification, event) {
        const insightComponentName = {
            LCP: Insights.LCPPhases.LCPPhases.litTagName.value,
            CLS: Insights.CLSCulprits.CLSCulprits.litTagName.value,
            INP: Insights.InteractionToNextPaint.InteractionToNextPaint.litTagName.value,
        }[label];
        // clang-format off
        return this.#metricIsVisible(label) ? LitHtml.html `
      <div class="metric" @click=${event ? this.#onClickMetric.bind(this, event, insightComponentName) : null}>
        <div class="metric-value metric-value-${classification}">${value}</div>
        <div class="metric-label">${label}</div>
      </div>
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
        const insight = Trace.Insights.Common.getInsight('LargestContentfulPaint', this.#data.insights, insightSetKey);
        if (!insight || !insight.lcpMs || !insight.lcpEvent) {
            return null;
        }
        const value = Trace.Helpers.Timing.millisecondsToMicroseconds(insight.lcpMs);
        return { value, event: insight.lcpEvent };
    }
    #getCLS(insightSetKey) {
        const insight = Trace.Insights.Common.getInsight('CumulativeLayoutShift', this.#data.insights, insightSetKey);
        if (!insight) {
            // Unlike the other metrics, there is still a value for this metric even with no data.
            // This means this view will always display a CLS score.
            return { value: 0, worstShiftEvent: null };
        }
        // TODO(crbug.com/366049346): buildLayoutShiftsClusters is dropping non-nav clusters,
        //                            so `insight.clusters` is always empty for non-navs.
        // TODO(cjamcl): the CLS insight be doing this for us.
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
        return LitHtml.html `
    <div class="metrics-row">
    ${lcp ? this.#renderMetricValue('LCP', i18n.TimeUtilities.formatMicroSecondsAsSeconds(lcp.value), Trace.Handlers.ModelHandlers.PageLoadMetrics.scoreClassificationForLargestContentfulPaint(lcp.value), lcp.event ?? null) :
            LitHtml.nothing}
    ${this.#renderMetricValue('CLS', cls.value.toFixed(2), Trace.Handlers.ModelHandlers.LayoutShifts.scoreClassificationForLayoutShift(cls.value), cls.worstShiftEvent)}
    ${inp ? this.#renderMetricValue('INP', i18n.TimeUtilities.formatMicroSecondsAsMillisFixed(inp.value), Trace.Handlers.ModelHandlers.UserInteractions.scoreClassificationForInteractionToNextPaint(inp.value), inp.event) :
            LitHtml.nothing}
    </div>
    `;
    }
    #renderInsights(insights, insightSetKey) {
        // TODO(crbug.com/368135130): sort this in a smart way!
        const insightComponents = [
            Insights.InteractionToNextPaint.InteractionToNextPaint,
            Insights.LCPPhases.LCPPhases,
            Insights.LCPDiscovery.LCPDiscovery,
            Insights.CLSCulprits.CLSCulprits,
            Insights.RenderBlocking.RenderBlockingRequests,
            Insights.DocumentLatency.DocumentLatency,
            Insights.FontDisplay.FontDisplay,
            Insights.Viewport.Viewport,
            Insights.ThirdParties.ThirdParties,
            Insights.SlowCSSSelector.SlowCSSSelector,
        ];
        // clang-format off
        return LitHtml.html `${insightComponents.map(component => {
            return LitHtml.html `<div data-single-insight-wrapper>
        <${component.litTagName}
          .insights=${insights}
          .insightSetKey=${insightSetKey}
          .activeInsight=${this.#data.activeInsight}
          .activeCategory=${this.#data.activeCategory}>
        </${component.litTagName}>
      </div>`;
        })}`;
        // clang-format on
    }
    #render() {
        const { parsedTrace, insights, insightSetKey, } = this.#data;
        if (!parsedTrace || !insights || !insightSetKey) {
            LitHtml.render(LitHtml.html ``, this.#shadow, { host: this });
            return;
        }
        // clang-format off
        LitHtml.render(LitHtml.html `
      <div class="navigation">
        ${this.#renderMetrics(insightSetKey)}
        ${this.#renderInsights(insights, insightSetKey)}
        </div>
      `, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-performance-sidebar-single-navigation', SidebarSingleInsightSet);
//# sourceMappingURL=SidebarSingleInsightSet.js.map