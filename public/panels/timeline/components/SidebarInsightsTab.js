// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Trace from '../../../models/trace/trace.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import * as Insights from './insights/insights.js';
import styles from './sidebarInsightsTab.css.js';
import { SidebarSingleInsightSet } from './SidebarSingleInsightSet.js';
import { createUrlLabels } from './Utils.js';
const FEEDBACK_URL = 'https://crbug.com/371170842';
const UIStrings = {
    /**
     *@description text show in feedback button
     */
    feedbackButton: 'Feedback',
    /**
     *@description text show in feedback tooltip
     */
    feedbackTooltip: 'Insights is an experimental feature. Your feedback will help us improve it.',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/SidebarInsightsTab.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class SidebarInsightsTab extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-insights`;
    #boundRender = this.#render.bind(this);
    #shadow = this.attachShadow({ mode: 'open' });
    #parsedTrace = null;
    #insights = null;
    #activeInsight = null;
    #selectedCategory = Insights.Types.Category.ALL;
    /**
     * When a trace has sets of insights, we show an accordion with each
     * set within. A set can be specific to a single navigation, or include the
     * beginning of the trace up to the first navigation.
     * You can only have one of these open at any time, and we track it via this ID.
     */
    #insightSetKey = null;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [styles];
    }
    set parsedTrace(data) {
        if (data === this.#parsedTrace) {
            return;
        }
        this.#parsedTrace = data;
        this.#insightSetKey = null;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set insights(data) {
        if (data === this.#insights) {
            return;
        }
        this.#insights = data;
        this.#insightSetKey = null;
        if (!this.#insights || !this.#parsedTrace) {
            return;
        }
        // Select by default the first non-trivial insight set:
        // - greater than 5s in duration
        // - or, has a navigation
        // In practice this means selecting either the first or the second insight set.
        const trivialThreshold = Trace.Helpers.Timing.millisecondsToMicroseconds(Trace.Types.Timing.MilliSeconds(5000));
        const insightSets = [...this.#insights.values()];
        this.#insightSetKey =
            insightSets.find(insightSet => insightSet.navigation || insightSet.bounds.range > trivialThreshold)?.id
                // If everything is "trivial", just select the first one.
                ?? insightSets[0]?.id ?? null;
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
    #insightSetClicked(id) {
        // Update the active insight set.
        if (id !== this.#activeInsight?.insightSetKey) {
            this.dispatchEvent(new Insights.SidebarInsight.InsightDeactivated());
        }
        this.#insightSetKey = id;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #insightSetHovered(id) {
        const data = this.#insights?.get(id);
        data && this.dispatchEvent(new Insights.SidebarInsight.InsightSetHovered(data.bounds));
    }
    #insightSetUnhovered() {
        this.dispatchEvent(new Insights.SidebarInsight.InsightSetHovered());
    }
    #onFeedbackClick() {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(FEEDBACK_URL);
    }
    // TODO(crbug.com/368170718): use a shorter label for each insight set/url when possible.
    #render() {
        if (!this.#parsedTrace || !this.#insights) {
            LitHtml.render(LitHtml.nothing, this.#shadow, { host: this });
            return;
        }
        const hasMultipleInsightSets = this.#insights.size > 1;
        const labels = createUrlLabels([...this.#insights.values()].map(({ url }) => url));
        // clang-format off
        const html = LitHtml.html `
      <select class="chrome-select insights-category-select"
        @change=${this.#onCategoryDropdownChange}
        jslog=${VisualLogging.dropDown('timeline.sidebar-insights-category-select').track({ click: true })}
      >
        ${Object.values(Insights.Types.Category).map(insightsCategory => {
            return LitHtml.html `
            <option value=${insightsCategory}>
              ${insightsCategory}
            </option>
          `;
        })}
      </select>

      <div class="insight-sets-wrapper">
        ${[...this.#insights.values()].map(({ id, url }, index) => {
            const data = {
                parsedTrace: this.#parsedTrace,
                insights: this.#insights,
                insightSetKey: id,
                activeCategory: this.#selectedCategory,
                activeInsight: this.#activeInsight,
            };
            const contents = LitHtml.html `
            <${SidebarSingleInsightSet.litTagName}
              .data=${data}>
            </${SidebarSingleInsightSet.litTagName}>
          `;
            if (hasMultipleInsightSets) {
                return LitHtml.html `<details
              ?open=${id === this.#insightSetKey}
            >
              <summary
                @click=${() => this.#insightSetClicked(id)}
                @mouseenter=${() => this.#insightSetHovered(id)}
                @mouseleave=${() => this.#insightSetUnhovered()}
                title=${url.href}
                >${labels[index]}</summary>
              ${contents}
            </details>`;
            }
            return contents;
        })}
      </div>

      <div class="feedback-wrapper">
        <${Buttons.Button.Button.litTagName} .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */} .iconName=${'experiment'} @click=${this.#onFeedbackClick}>
          ${i18nString(UIStrings.feedbackButton)}
        </${Buttons.Button.Button.litTagName}>

        <p class="tooltip">${i18nString(UIStrings.feedbackTooltip)}</p>
      </div>
    `;
        // clang-format on
        LitHtml.render(LitHtml.html `${html}`, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-sidebar-insights', SidebarInsightsTab);
//# sourceMappingURL=SidebarInsightsTab.js.map