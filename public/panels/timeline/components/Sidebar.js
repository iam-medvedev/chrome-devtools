// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Root from '../../../core/root/root.js';
import * as TraceEngine from '../../../models/trace/trace.js';
import * as Dialogs from '../../../ui/components/dialogs/dialogs.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import * as Menus from '../../../ui/components/menus/menus.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import sidebarStyles from './sidebar.css.js';
import * as SidebarInsight from './SidebarInsight.js';
const COLLAPSED_WIDTH = 40;
const DEFAULT_EXPANDED_WIDTH = 240;
var InsightsCategories;
(function (InsightsCategories) {
    InsightsCategories["ALL"] = "All";
    InsightsCategories["INP"] = "INP";
    InsightsCategories["LCP"] = "LCP";
    InsightsCategories["CLS"] = "CLS";
    InsightsCategories["OTHER"] = "Other";
})(InsightsCategories || (InsightsCategories = {}));
export class SidebarWidget extends UI.SplitWidget.SplitWidget {
    #sidebarExpanded = false;
    #sidebarUI = new SidebarUI();
    constructor() {
        super(true /* isVertical */, false /* secondIsSidebar */, undefined /* settingName */, COLLAPSED_WIDTH);
        if (Root.Runtime.experiments.isEnabled("timeline-rpp-sidebar" /* Root.Runtime.ExperimentName.TIMELINE_SIDEBAR */)) {
            this.sidebarElement().append(this.#sidebarUI);
        }
        else {
            this.hideSidebar();
        }
        this.setResizable(this.#sidebarExpanded);
        this.#sidebarUI.expanded = this.#sidebarExpanded;
        this.#sidebarUI.addEventListener('togglebuttonclick', () => {
            this.#sidebarExpanded = !this.#sidebarExpanded;
            if (this.#sidebarExpanded) {
                this.setResizable(true);
                this.forceSetSidebarWidth(DEFAULT_EXPANDED_WIDTH);
            }
            else {
                this.setResizable(false);
                this.forceSetSidebarWidth(COLLAPSED_WIDTH);
            }
            this.#sidebarUI.expanded = this.#sidebarExpanded;
        });
    }
    setTraceParsedData(traceParsedData) {
        this.#sidebarUI.traceParsedData = traceParsedData;
    }
    set data(insights) {
        this.#sidebarUI.insights = insights;
    }
}
export class SidebarUI extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar`;
    #shadow = this.attachShadow({ mode: 'open' });
    #activeTab = "Insights" /* SidebarTabsName.INSIGHTS */;
    selectedCategory = InsightsCategories.ALL;
    #expanded = false;
    #traceParsedData;
    #inpMetric = null;
    #lcpMetric = null;
    #clsMetric = null;
    #phaseData = [];
    #insights = null;
    #renderBound = this.#render.bind(this);
    getLCPInsightData() {
        if (!this.#insights) {
            return [];
        }
        // For now use the first navigation of the trace.
        const firstNav = this.#insights.values().next().value;
        if (!firstNav) {
            return [];
        }
        const lcpInsight = firstNav.LargestContentfulPaint;
        if (lcpInsight instanceof Error) {
            return [];
        }
        const timing = lcpInsight.lcpMs;
        const phases = lcpInsight.phases;
        if (!timing || !phases) {
            return [];
        }
        const { ttfb, loadDelay, loadTime, renderDelay } = phases;
        if (loadDelay && loadTime) {
            const phaseData = [
                { phase: 'Time to first byte', timing: ttfb, percent: `${(100 * ttfb / timing).toFixed(0)}%` },
                { phase: 'Resource load delay', timing: loadDelay, percent: `${(100 * loadDelay / timing).toFixed(0)}%` },
                { phase: 'Resource load duration', timing: loadTime, percent: `${(100 * loadTime / timing).toFixed(0)}%` },
                { phase: 'Resource render delay', timing: renderDelay, percent: `${(100 * ttfb / timing).toFixed(0)}%` },
            ];
            return phaseData;
        }
        // If the lcp is text, we only have ttfb and render delay.
        const phaseData = [
            { phase: 'Time to first byte', timing: ttfb, percent: `${(100 * ttfb / timing).toFixed(0)}%` },
            { phase: 'Resource render delay', timing: renderDelay, percent: `${(100 * ttfb / timing).toFixed(0)}%` },
        ];
        return phaseData;
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarStyles];
        // Force an immediate render of the default state (not expanded).
        this.#render();
    }
    set expanded(expanded) {
        if (expanded === this.#expanded) {
            return;
        }
        this.#expanded = expanded;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    set insights(insights) {
        if (insights === this.#insights) {
            return;
        }
        this.#insights = insights;
        this.#phaseData = this.getLCPInsightData();
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    set traceParsedData(traceParsedData) {
        if (this.#traceParsedData === traceParsedData) {
            // If this is the same trace, do not re-render.
            return;
        }
        this.#traceParsedData = traceParsedData;
        // Clear all data before re-render.
        this.#inpMetric = null;
        this.#lcpMetric = null;
        this.#clsMetric = null;
        if (!traceParsedData) {
            void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
            return;
        }
        // Get LCP metric for first navigation.
        const eventsByNavigation = traceParsedData.PageLoadMetrics.metricScoresByFrameId.get(traceParsedData.Meta.mainFrameId);
        if (eventsByNavigation) {
            const metricsByName = eventsByNavigation.values().next().value;
            if (metricsByName) {
                this.#lcpMetric = metricsByName.get("LCP" /* TraceEngine.Handlers.ModelHandlers.PageLoadMetrics.MetricName.LCP */);
            }
        }
        const clsScore = traceParsedData.LayoutShifts.sessionMaxScore;
        this.#clsMetric = {
            clsScore,
            clsScoreClassification: TraceEngine.Handlers.ModelHandlers.LayoutShifts.scoreClassificationForLayoutShift(clsScore),
        };
        if (traceParsedData.UserInteractions.longestInteractionEvent) {
            this.#inpMetric = {
                longestINPDur: traceParsedData.UserInteractions.longestInteractionEvent.dur,
                inpScoreClassification: TraceEngine.Handlers.ModelHandlers.UserInteractions.scoreClassificationForInteractionToNextPaint(traceParsedData.UserInteractions.longestInteractionEvent.dur),
            };
        }
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #toggleButtonClick() {
        this.dispatchEvent(new Event('togglebuttonclick'));
    }
    #onTabHeaderClicked(activeTab) {
        if (activeTab === this.#activeTab) {
            return;
        }
        this.#activeTab = activeTab;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #renderHeader() {
        // clang-format off
        return LitHtml.html `
      <div class="tabs-header">
        <input
          type="button"
          value=${"Insights" /* SidebarTabsName.INSIGHTS */}
          ?active=${this.#activeTab === "Insights" /* SidebarTabsName.INSIGHTS */}
          @click=${() => this.#onTabHeaderClicked("Insights" /* SidebarTabsName.INSIGHTS */)}>
        <input
          type="button"
          value=${"Annotations" /* SidebarTabsName.ANNOTATIONS */}
          ?active=${this.#activeTab === "Annotations" /* SidebarTabsName.ANNOTATIONS */}
          @click=${() => this.#onTabHeaderClicked("Annotations" /* SidebarTabsName.ANNOTATIONS */)}>
      </div>
    `;
        // clang-format on
    }
    #onTargetSelected(event) {
        this.selectedCategory = event.itemValue;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #renderMetricValue(label, value, classification) {
        return LitHtml.html `
      <div class="metric">
        <div class="metric-value metric-value-${classification}">${value}</div>
        <div class="metric-label">${label}</div>
      </div>
    `;
    }
    #renderINPMetric() {
        if (!this.#inpMetric) {
            return null;
        }
        const timeString = i18n.TimeUtilities.formatMicroSecondsTime(this.#inpMetric.longestINPDur);
        return this.#renderMetricValue('INP', timeString, this.#inpMetric.inpScoreClassification);
    }
    #renderLCPMetric() {
        if (!this.#lcpMetric) {
            return null;
        }
        const timeString = i18n.TimeUtilities.formatMicroSecondsAsSeconds(this.#lcpMetric.timing);
        return this.#renderMetricValue(this.#lcpMetric.metricName, timeString, this.#lcpMetric.classification);
    }
    #renderCLSMetric() {
        if (!this.#clsMetric) {
            return null;
        }
        return this.#renderMetricValue("CLS" /* TraceEngine.Handlers.ModelHandlers.PageLoadMetrics.MetricName.CLS */, this.#clsMetric.clsScore.toPrecision(3), this.#clsMetric.clsScoreClassification);
    }
    #renderInsightsForCategory(insightsCategory) {
        switch (insightsCategory) {
            case InsightsCategories.ALL:
                return LitHtml.html `
          <div class="metrics-row">
            ${this.#renderINPMetric()}
            ${this.#renderLCPMetric()}
            ${this.#renderCLSMetric()}
          </div>
          <div class="insights">${this.#renderLCPPhases()}</div>
        `;
            case InsightsCategories.LCP:
                return LitHtml.html `
          ${this.#renderLCPMetric()}
          <div class="insights">${this.#renderLCPPhases()}</div>
        `;
            case InsightsCategories.CLS:
                return LitHtml.html `${this.#renderCLSMetric()}`;
            case InsightsCategories.INP:
                return LitHtml.html `${this.#renderINPMetric()}`;
            case InsightsCategories.OTHER:
                return LitHtml.html `<div>${insightsCategory}</div>`;
        }
    }
    #renderLCPPhases() {
        const lcpTitle = 'LCP by Phase';
        const showLCPPhases = this.#phaseData ? this.#phaseData.length > 0 : false;
        // clang-format off
        return LitHtml.html `${showLCPPhases ? LitHtml.html `
        <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: lcpTitle,
        }}>
          <div slot="insight-description" class="insight-description">
            Each
            <x-link class="link" href="https://web.dev/articles/optimize-lcp#lcp-breakdown">phase has specific recommendations to improve.</x-link>
            In an ideal load, the two delay phases should be quite short.
          </div>
          <div slot="insight-content" class="table-container">
            <dl>
              <dt class="dl-title">Phase</dt>
              <dd class="dl-title">% of LCP</dd>
              ${this.#phaseData?.map(phase => LitHtml.html `
                <dt>${phase.phase}</dt>
                <dd class="dl-value">${phase.percent}</dd>
              `)}
            </dl>
          </div>
        </${SidebarInsight.SidebarInsight}>` : LitHtml.nothing}`;
        // clang-format on
    }
    #renderInsightsTabContent() {
        // clang-format off
        return LitHtml.html `
      <${Menus.SelectMenu.SelectMenu.litTagName}
            class="target-select-menu"
            @selectmenuselected=${this.#onTargetSelected}
            .showDivider=${true}
            .showArrow=${true}
            .sideButton=${false}
            .showSelectedItem=${true}
            .showConnector=${false}
            .position=${"bottom" /* Dialogs.Dialog.DialogVerticalPosition.BOTTOM */}
            .buttonTitle=${this.selectedCategory}
            jslog=${VisualLogging.dropDown('performance.sidebar-insights-category-select').track({ click: true })}
          >
          ${Object.values(InsightsCategories).map(insightsCategory => {
            return LitHtml.html `
              <${Menus.Menu.MenuItem.litTagName} .value=${insightsCategory}>
                ${insightsCategory}
              </${Menus.Menu.MenuItem.litTagName}>
            `;
        })}
      </${Menus.SelectMenu.SelectMenu.litTagName}>

      ${this.#renderInsightsForCategory(this.selectedCategory)}
    `;
        // clang-format on
    }
    #renderAnnotationTabContent() {
        // clang-format off
        return LitHtml.html `
      <h2>Content for Annotation Tab</h2>
      <p>This is the content of the Annotation tab.</p>
    `;
        // clang-format on
    }
    #renderContent() {
        switch (this.#activeTab) {
            case "Insights" /* SidebarTabsName.INSIGHTS */:
                return this.#renderInsightsTabContent();
            case "Annotations" /* SidebarTabsName.ANNOTATIONS */:
                return this.#renderAnnotationTabContent();
            default:
                return null;
        }
    }
    #updateActiveIndicatorPosition() {
        const insightsTabHeaderElement = this.#shadow.querySelector('.tabs-header input:nth-child(1)');
        const annotationTabHeaderElement = this.#shadow.querySelector('.tabs-header input:nth-child(2)');
        const tabSliderElement = this.#shadow.querySelector('.tab-slider');
        if (insightsTabHeaderElement && annotationTabHeaderElement && tabSliderElement) {
            const insightsTabHeaderWidth = insightsTabHeaderElement.getBoundingClientRect().width;
            const annotationTabHeaderWidth = annotationTabHeaderElement.getBoundingClientRect().width;
            switch (this.#activeTab) {
                case "Insights" /* SidebarTabsName.INSIGHTS */:
                    tabSliderElement.style.left = '0';
                    tabSliderElement.style.width = `${insightsTabHeaderWidth}px`;
                    return;
                case "Annotations" /* SidebarTabsName.ANNOTATIONS */:
                    tabSliderElement.style.left = `${insightsTabHeaderWidth}px`;
                    tabSliderElement.style.width = `${annotationTabHeaderWidth}px`;
                    return;
            }
        }
    }
    #render() {
        const toggleIcon = this.#expanded ? 'left-panel-close' : 'left-panel-open';
        // clang-format off
        const output = LitHtml.html `<div class=${LitHtml.Directives.classMap({
            sidebar: true,
            'is-expanded': this.#expanded,
            'is-closed': !this.#expanded,
        })}>
      <div class="tab-bar">
        ${this.#expanded ? this.#renderHeader() : LitHtml.nothing}
        <${IconButton.Icon.Icon.litTagName}
          name=${toggleIcon}
          @click=${this.#toggleButtonClick}
          class="sidebar-toggle-button"
          jslog=${VisualLogging.action('performance.sidebar-toggle').track({ click: true })}
        ></${IconButton.Icon.Icon.litTagName}>
      </div>
      <div class="tab-slider" ?hidden=${!this.#expanded}></div>
      <div class="tab-headers-bottom-line" ?hidden=${!this.#expanded}></div>
      ${this.#expanded ? LitHtml.html `<div class="sidebar-body">${this.#renderContent()}</div>` : LitHtml.nothing}
    </div>`;
        // clang-format on
        LitHtml.render(output, this.#shadow, { host: this });
        this.#updateActiveIndicatorPosition();
    }
}
customElements.define('devtools-performance-sidebar', SidebarUI);
//# sourceMappingURL=Sidebar.js.map