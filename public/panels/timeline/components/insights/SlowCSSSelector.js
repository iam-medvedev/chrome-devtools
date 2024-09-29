// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, shouldRenderForCategory } from './Helpers.js';
import * as SidebarInsight from './SidebarInsight.js';
import { Table } from './Table.js';
import { Category } from './types.js';
const UIStrings = {
    /**
     *@description Title of an insight that provides details about slow CSS selectors.
     */
    title: 'Slow CSS selectors',
    /**
     * @description Text to describe how to improve the performance of CSS selectors.
     */
    description: 'Learn how to [assess the performance of CSS selectors](https://developer.chrome.com/docs/devtools/performance/selector-stats).',
    /**
     *@description Column name for count of elements that the engine attempted to match against a style rule
     */
    matchAttempts: 'Match attempts',
    /**
     *@description Column name for count of elements that matched a style rule
     */
    matchCount: 'Match count',
    /**
     *@description Column name for elapsed time spent computing a style rule
     */
    elapsed: 'Elapsed time',
    /**
     *@description Column name for the selectors that took the longest amount of time/effort.
     */
    topSelectors: 'Top selectors',
    /**
     *@description Column name for a total sum.
     */
    total: 'Total',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/SlowCSSSelector.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class SlowCSSSelector extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-slow-css-selector`;
    insightCategory = Category.ALL;
    internalName = 'slow-css-selector';
    userVisibleTitle = i18nString(UIStrings.title);
    description = i18nString(UIStrings.description);
    #slowCSSSelector = null;
    createOverlays() {
        if (!this.data.insights || !this.data.insightSetKey) {
            return [];
        }
        const { insightSetKey: navigationId, insights } = this.data;
        const insightsByNavigation = insights.get(navigationId);
        if (!insightsByNavigation) {
            return [];
        }
        const scsInsight = insightsByNavigation.data.SlowCSSSelector;
        if (scsInsight instanceof Error) {
            return [];
        }
        const sections = [];
        return [{
                type: 'TIMESPAN_BREAKDOWN',
                sections,
            }];
    }
    renderSlowCSSSelector() {
        const time = (us) => i18n.TimeUtilities.millisToString(Platform.Timing.microSecondsToMilliSeconds(us));
        // clang-format off
        return this.#slowCSSSelector ? LitHtml.html `
      <div class="insights">
        <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            description: this.description,
            internalName: this.internalName,
            expanded: this.isActive(),
        }}
          @insighttoggleclick=${this.onSidebarClick}
        >
          <div slot="insight-content" class="insight-section">
            ${LitHtml.html `<${Table.litTagName}
              .data=${{
            insight: this,
            headers: [i18nString(UIStrings.total), ''],
            rows: [
                { values: [i18nString(UIStrings.elapsed), i18n.TimeUtilities.millisToString(this.#slowCSSSelector.totalElapsedMs)] },
                { values: [i18nString(UIStrings.matchAttempts), this.#slowCSSSelector.totalMatchAttempts] },
                { values: [i18nString(UIStrings.matchCount), this.#slowCSSSelector.totalMatchCount] },
            ],
        }}>
            </${Table.litTagName}>`}
            ${LitHtml.html `<${Table.litTagName}
              .data=${{
            insight: this,
            headers: [i18nString(UIStrings.topSelectors), i18nString(UIStrings.elapsed)],
            rows: this.#slowCSSSelector.topElapsedMs.map(selector => {
                return {
                    values: [selector.selector, time(Trace.Types.Timing.MicroSeconds(selector['elapsed (us)']))],
                };
            }),
        }}>
            </${Table.litTagName}>`}
            ${LitHtml.html `<${Table.litTagName}
              .data=${{
            insight: this,
            headers: [i18nString(UIStrings.topSelectors), i18nString(UIStrings.matchAttempts)],
            rows: this.#slowCSSSelector.topMatchAttempts.map(selector => {
                return {
                    values: [selector.selector, selector['match_attempts']],
                };
            }),
        }}>
            </${Table.litTagName}>`}
          </div>
        </${SidebarInsight}>
      </div>` : LitHtml.nothing;
        // clang-format on
    }
    #hasDataToRender() {
        this.#slowCSSSelector =
            Trace.Insights.Common.getInsight('SlowCSSSelector', this.data.insights, this.data.insightSetKey);
        return this.#slowCSSSelector !== null && this.#slowCSSSelector.topElapsedMs.length !== 0 &&
            this.#slowCSSSelector.topMatchAttempts.length !== 0;
    }
    render() {
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const shouldRender = matchesCategory && this.#hasDataToRender();
        const output = shouldRender ? this.renderSlowCSSSelector() : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-slow-css-selector', SlowCSSSelector);
//# sourceMappingURL=SlowCSSSelector.js.map