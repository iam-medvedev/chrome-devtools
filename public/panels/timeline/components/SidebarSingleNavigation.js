// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// TODO(crbug.com/366049346): rename file
import * as i18n from '../../../core/i18n/i18n.js';
import * as Trace from '../../../models/trace/trace.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as Insights from './insights/insights.js';
import { EventReferenceClick } from './Sidebar.js';
import { InsightsCategories } from './SidebarInsightsTab.js';
import styles from './sidebarSingleNavigation.css.js';
export class SidebarSingleNavigation extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-single-navigation`;
    #shadow = this.attachShadow({ mode: 'open' });
    #renderBound = this.#render.bind(this);
    #data = {
        parsedTrace: null,
        insights: null,
        navigationId: null,
        activeCategory: InsightsCategories.ALL,
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
        if (this.#data.activeCategory === InsightsCategories.ALL) {
            return true;
        }
        return label === this.#data.activeCategory;
    }
    #onClickMetric(event, insightComponentName) {
        const el = this.shadowRoot?.querySelector(insightComponentName);
        if (el && this.#data.navigationId) {
            this.dispatchEvent(new Insights.SidebarInsight.InsightActivated(el.internalName, this.#data.navigationId, el.createOverlays.bind(el)));
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
    /**
     * @returns the duration of the longest interaction for the navigation. If
     * there are no interactions, we return `null`. This distinction is important
     * as if there are no navigations, we do not want to show the user the INP
     * score.
     */
    #calculateINP(parsedTrace, navigationId) {
        const eventsForNavigation = parsedTrace.UserInteractions.interactionEventsWithNoNesting.filter(e => {
            return e.args.data.navigationId === navigationId;
        });
        if (eventsForNavigation.length === 0) {
            return null;
        }
        let maxDuration = Trace.Types.Timing.MicroSeconds(0);
        for (const event of eventsForNavigation) {
            if (event.dur > maxDuration) {
                maxDuration = event.dur;
            }
        }
        return maxDuration;
    }
    #calculateCLSScore(parsedTrace, navigationId) {
        // Find all clusers associated with this navigation
        const clustersForNavigation = parsedTrace.LayoutShifts.clusters.filter(c => c.navigationId === navigationId);
        let maxScore = 0;
        let worstCluster;
        for (const cluster of clustersForNavigation) {
            if (cluster.clusterCumulativeScore > maxScore) {
                maxScore = cluster.clusterCumulativeScore;
                worstCluster = cluster;
            }
        }
        return { maxScore, worstShfitEvent: worstCluster?.worstShiftEvent ?? null };
    }
    #renderMetrics(parsedTrace, navigationId) {
        const forNavigation = parsedTrace.PageLoadMetrics.metricScoresByFrameId.get(parsedTrace.Meta.mainFrameId)?.get(navigationId);
        const lcpMetric = forNavigation?.get("LCP" /* Trace.Handlers.ModelHandlers.PageLoadMetrics.MetricName.LCP */);
        const { maxScore: clsScore, worstShfitEvent } = this.#calculateCLSScore(parsedTrace, navigationId);
        const inp = this.#calculateINP(parsedTrace, navigationId);
        return LitHtml.html `
    <div class="metrics-row">
    ${lcpMetric ? this.#renderMetricValue('LCP', i18n.TimeUtilities.formatMicroSecondsAsSeconds(lcpMetric.timing), lcpMetric.classification, lcpMetric.event ?? null) :
            LitHtml.nothing}
    ${this.#renderMetricValue('CLS', clsScore.toFixed(2), Trace.Handlers.ModelHandlers.LayoutShifts.scoreClassificationForLayoutShift(clsScore), worstShfitEvent)}
    ${inp ?
            this.#renderMetricValue('INP', i18n.TimeUtilities.formatMicroSecondsAsMillisFixed(inp), Trace.Handlers.ModelHandlers.UserInteractions.scoreClassificationForInteractionToNextPaint(inp), null) :
            LitHtml.nothing}
    </div>
    `;
    }
    #renderInsights(insights, navigationId) {
        // TODO(crbug.com/368135130): sort this in a smart way!
        const insightComponents = [
            Insights.LCPPhases.LCPPhases,
            Insights.InteractionToNextPaint.InteractionToNextPaint,
            Insights.LCPDiscovery.LCPDiscovery,
            Insights.RenderBlocking.RenderBlockingRequests,
            Insights.SlowCSSSelector.SlowCSSSelector,
            Insights.CLSCulprits.CLSCulprits,
            Insights.DocumentLatency.DocumentLatency,
            Insights.ThirdParties.ThirdParties,
            Insights.Viewport.Viewport,
        ];
        // clang-format off
        return LitHtml.html `${insightComponents.map(component => {
            return LitHtml.html `<div>
        <${component.litTagName}
          .insights=${insights}
          .navigationId=${navigationId}
          .activeInsight=${this.#data.activeInsight}
          .activeCategory=${this.#data.activeCategory}
        </${component.litTagName}>
      </div>`;
        })}`;
        // clang-format on
    }
    #render() {
        const { parsedTrace, insights, navigationId, } = this.#data;
        if (!parsedTrace || !insights || !navigationId) {
            LitHtml.render(LitHtml.html ``, this.#shadow, { host: this });
            return;
        }
        // clang-format off
        LitHtml.render(LitHtml.html `
      <div class="navigation">
        ${this.#renderMetrics(parsedTrace, navigationId)}
        ${this.#renderInsights(insights, navigationId)}
        </div>
      `, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-performance-sidebar-single-navigation', SidebarSingleNavigation);
//# sourceMappingURL=SidebarSingleNavigation.js.map