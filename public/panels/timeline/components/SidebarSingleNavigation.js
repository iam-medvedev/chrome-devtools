// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as TraceEngine from '../../../models/trace/trace.js';
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
        traceParsedData: null,
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
    #referenceEvent(event) {
        return () => {
            this.dispatchEvent(new EventReferenceClick(event));
        };
    }
    #renderMetricValue(label, value, classification, event) {
        // clang-format off
        return this.#metricIsVisible(label) ? LitHtml.html `
      <div class="metric" @click=${event ? this.#referenceEvent(event) : null}>
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
    #calculateINPScore(traceParsedData, navigationId) {
        const eventsForNavigation = traceParsedData.UserInteractions.interactionEventsWithNoNesting.filter(e => {
            return e.args.data.navigationId === navigationId;
        });
        if (eventsForNavigation.length === 0) {
            return null;
        }
        let maxDuration = TraceEngine.Types.Timing.MicroSeconds(0);
        for (const event of eventsForNavigation) {
            if (event.dur > maxDuration) {
                maxDuration = event.dur;
            }
        }
        return maxDuration;
    }
    #calculateCLSScore(traceParsedData, navigationId) {
        // Find all clusers associated with this navigation
        const clustersForNavigation = traceParsedData.LayoutShifts.clusters.filter(c => c.navigationId === navigationId);
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
    #renderMetrics(traceParsedData, navigationId) {
        const forNavigation = traceParsedData.PageLoadMetrics.metricScoresByFrameId.get(traceParsedData.Meta.mainFrameId)?.get(navigationId);
        const lcpMetric = forNavigation?.get("LCP" /* TraceEngine.Handlers.ModelHandlers.PageLoadMetrics.MetricName.LCP */);
        const { maxScore: clsScore, worstShfitEvent } = this.#calculateCLSScore(traceParsedData, navigationId);
        const inpScore = this.#calculateINPScore(traceParsedData, navigationId);
        return LitHtml.html `
    <div class="metrics-row">
    ${lcpMetric ? this.#renderMetricValue('LCP', i18n.TimeUtilities.formatMicroSecondsAsSeconds(lcpMetric.timing), lcpMetric.classification, lcpMetric.event ?? null) :
            LitHtml.nothing}
    ${this.#renderMetricValue('CLS', clsScore.toFixed(2), TraceEngine.Handlers.ModelHandlers.LayoutShifts.scoreClassificationForLayoutShift(clsScore), worstShfitEvent)}
    ${inpScore ? this.#renderMetricValue('INP', i18n.TimeUtilities.formatMicroSecondsTime(inpScore), TraceEngine.Handlers.ModelHandlers.UserInteractions.scoreClassificationForInteractionToNextPaint(inpScore), null) :
            LitHtml.nothing}
    </div>
    `;
    }
    #renderInsights(insights, navigationId) {
        // clang-format off
        return LitHtml.html `
    <div>
      <${Insights.LCPPhases.LCPPhases.litTagName}
        .insights=${insights}
        .navigationId=${navigationId}
        .activeInsight=${this.#data.activeInsight}
        .activeCategory=${this.#data.activeCategory}
      </${Insights.LCPPhases.LCPPhases}>
    </div>
    <div>
      <${Insights.LCPDiscovery.LCPDiscovery.litTagName}
        .insights=${insights}
        .navigationId=${navigationId}
        .activeInsight=${this.#data.activeInsight}
        .activeCategory=${this.#data.activeCategory}
      </${Insights.LCPDiscovery.LCPDiscovery}>
    </div>
    <div>
      <${Insights.RenderBlocking.RenderBlockingRequests.litTagName}
        .insights=${insights}
        .navigationId=${navigationId}
        .activeInsight=${this.#data.activeInsight}
        .activeCategory=${this.#data.activeCategory}
      </${Insights.RenderBlocking.RenderBlockingRequests}>
    </div>
    <div>
      <${Insights.CLSCulprits.CLSCulprits.litTagName}
        .insights=${insights}
        .navigationId=${navigationId}
        .activeInsight=${this.#data.activeInsight}
        .activeCategory=${this.#data.activeCategory}
      </${Insights.CLSCulprits.CLSCulprits}>
    </div>
    <div>
      <${Insights.DocumentLatency.DocumentLatency.litTagName}
        .insights=${insights}
        .navigationId=${navigationId}
        .activeInsight=${this.#data.activeInsight}
        .activeCategory=${this.#data.activeCategory}
      </${Insights.DocumentLatency.DocumentLatency}>
    </div>
    <div>
      <${Insights.Viewport.Viewport.litTagName}
        .insights=${insights}
        .navigationId=${navigationId}
        .activeInsight=${this.#data.activeInsight}
        .activeCategory=${this.#data.activeCategory}
      </${Insights.Viewport.Viewport}>
    </div>`;
        // clang-format on
    }
    #render() {
        const { traceParsedData, insights, navigationId, } = this.#data;
        if (!traceParsedData || !insights || !navigationId) {
            LitHtml.render(LitHtml.html ``, this.#shadow, { host: this });
            return;
        }
        const navigation = traceParsedData.Meta.navigationsByNavigationId.get(navigationId);
        if (!navigation) {
            LitHtml.render(LitHtml.html ``, this.#shadow, { host: this });
            return;
        }
        // clang-format off
        LitHtml.render(LitHtml.html `
      <div class="navigation">
        ${this.#renderMetrics(traceParsedData, navigationId)}
        ${this.#renderInsights(insights, navigationId)}
        </div>
      `, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-performance-sidebar-single-navigation', SidebarSingleNavigation);
//# sourceMappingURL=SidebarSingleNavigation.js.map