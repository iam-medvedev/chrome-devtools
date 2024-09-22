// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import * as Insights from './insights/insights.js';
import styles from './sidebarInsightsTab.css.js';
import { SidebarSingleNavigation } from './SidebarSingleNavigation.js';
export var InsightsCategories;
(function (InsightsCategories) {
    InsightsCategories["ALL"] = "All";
    InsightsCategories["INP"] = "INP";
    InsightsCategories["LCP"] = "LCP";
    InsightsCategories["CLS"] = "CLS";
    InsightsCategories["OTHER"] = "Other";
})(InsightsCategories || (InsightsCategories = {}));
export class SidebarInsightsTab extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-insights`;
    #boundRender = this.#render.bind(this);
    #shadow = this.attachShadow({ mode: 'open' });
    #parsedTrace = null;
    #insights = null;
    #insightSets = null;
    #activeInsight = null;
    #selectedCategory = InsightsCategories.ALL;
    /**
     * When a trace has multiple navigations, we show an accordion with each
     * navigation in. You can only have one of these open at any time, and we
     * track it via this ID.
     */
    #activeNavigationId = null;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [styles];
    }
    set parsedTrace(data) {
        if (data === this.#parsedTrace) {
            return;
        }
        this.#parsedTrace = data;
        this.#activeNavigationId = null;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set insights(data) {
        if (data === this.#insights) {
            return;
        }
        this.#insights = data;
        this.#insightSets = [];
        this.#activeNavigationId = null;
        if (!this.#insights || !this.#parsedTrace) {
            return;
        }
        for (const insightSets of this.#insights.values()) {
            // TODO(crbug.com/366049346): move "shouldShow" logic to insight result (rather than the component),
            // and if none are visible, don't push the insight set.
            this.#insightSets.push({
                id: insightSets.id,
                label: insightSets.label,
            });
        }
        // TODO(crbug.com/366049346): skip the first insight set if trivial.
        this.#activeNavigationId = this.#insightSets[0]?.id ?? null;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set activeInsight(active) {
        if (active === this.#activeInsight) {
            return;
        }
        this.#activeInsight = active;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #onCategoryDropdownChange(event) {
        const target = event.target;
        const value = target.value;
        this.#selectedCategory = value;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #navigationClicked(id) {
        // New navigation clicked. Update the active insight.
        if (id !== this.#activeInsight?.navigationId) {
            this.dispatchEvent(new Insights.SidebarInsight.InsightDeactivated());
        }
        this.#activeNavigationId = id;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #navigationHovered(id) {
        const data = this.#insights?.get(id);
        data && this.dispatchEvent(new Insights.SidebarInsight.NavigationBoundsHovered(data.bounds));
    }
    #navigationUnhovered() {
        this.dispatchEvent(new Insights.SidebarInsight.NavigationBoundsHovered());
    }
    #render() {
        if (!this.#parsedTrace || !this.#insights || !this.#insightSets) {
            LitHtml.render(LitHtml.nothing, this.#shadow, { host: this });
            return;
        }
        const hasMultipleInsightSets = this.#insightSets.length > 1;
        // clang-format off
        const html = LitHtml.html `
      <select class="chrome-select insights-category-select"
        @change=${this.#onCategoryDropdownChange}
        jslog=${VisualLogging.dropDown('timeline.sidebar-insights-category-select').track({ click: true })}
      >
        ${Object.values(InsightsCategories).map(insightsCategory => {
            return LitHtml.html `
            <option value=${insightsCategory}>
              ${insightsCategory}
            </option>
          `;
        })}
      </select>

      <div class="navigations-wrapper">
        ${this.#insightSets.map(({ id, label }) => {
            const data = {
                parsedTrace: this.#parsedTrace,
                insights: this.#insights,
                navigationId: id, // TODO(crbug.com/366049346): rename `navigationId`.
                activeCategory: this.#selectedCategory,
                activeInsight: this.#activeInsight,
            };
            const contents = LitHtml.html `
            <${SidebarSingleNavigation.litTagName}
              .data=${data}>
            </${SidebarSingleNavigation.litTagName}>
          `;
            if (hasMultipleInsightSets) {
                return LitHtml.html `<details
              ?open=${id === this.#activeNavigationId}
              class="navigation-wrapper"
            >
              <summary
                @click=${() => this.#navigationClicked(id)}
                @mouseenter=${() => this.#navigationHovered(id)}
                @mouseleave=${() => this.#navigationUnhovered()}
                >${label}</summary>
              ${contents}
            </details>`;
            }
            return contents;
        })}
      </div>
    `;
        // clang-format on
        LitHtml.render(LitHtml.html `${html}`, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-sidebar-insights', SidebarInsightsTab);
//# sourceMappingURL=SidebarInsightsTab.js.map