// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, shouldRenderForCategory } from './Helpers.js';
import { Category } from './types.js';
const { html } = LitHtml;
const UIStrings = {
    /**
     *@description Title of an insight that provides details about slow CSS selectors.
     */
    title: 'CSS Selector costs',
    /**
     * @description Text to describe how to improve the performance of CSS selectors.
     */
    description: 'If Recalculate Style costs remain high, selector optimization can reduce them. [Optimize the selectors](https://developer.chrome.com/docs/devtools/performance/selector-stats) with both high elapsed time and high slow-path %. Simpler selectors, fewer selectors, a smaller DOM, and a shallower DOM will all reduce matching costs.',
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
        return [];
    }
    renderSlowCSSSelector() {
        const time = (us) => i18n.TimeUtilities.millisToString(Platform.Timing.microSecondsToMilliSeconds(us));
        // clang-format off
        return this.#slowCSSSelector ? html `
      <div class="insights">
        <devtools-performance-sidebar-insight .data=${{
            title: this.userVisibleTitle,
            description: this.description,
            internalName: this.internalName,
            expanded: this.isActive(),
        }}
          @insighttoggleclick=${this.onSidebarClick} >
          <div slot="insight-content" class="insight-section">
            ${html `<devtools-performance-table
              .data=${{
            insight: this,
            headers: [i18nString(UIStrings.total), ''],
            rows: [
                { values: [i18nString(UIStrings.elapsed), i18n.TimeUtilities.millisToString(this.#slowCSSSelector.totalElapsedMs)] },
                { values: [i18nString(UIStrings.matchAttempts), this.#slowCSSSelector.totalMatchAttempts] },
                { values: [i18nString(UIStrings.matchCount), this.#slowCSSSelector.totalMatchCount] },
            ],
        }}>
            </devtools-performance-table>`}
            ${html `<devtools-performance-table
              .data=${{
            insight: this,
            headers: [i18nString(UIStrings.topSelectors), i18nString(UIStrings.elapsed)],
            rows: this.#slowCSSSelector.topElapsedMs.map(selector => {
                return {
                    values: [selector.selector, time(Trace.Types.Timing.MicroSeconds(selector['elapsed (us)']))],
                };
            }),
        }}>
            </devtools-performance-table>`}
            ${html `<devtools-performance-table
              .data=${{
            insight: this,
            headers: [i18nString(UIStrings.topSelectors), i18nString(UIStrings.matchAttempts)],
            rows: this.#slowCSSSelector.topMatchAttempts.map(selector => {
                return {
                    values: [selector.selector, selector['match_attempts']],
                };
            }),
        }}>
            </devtools-performance-table>`}
          </div>
        </devtools-performance-sidebar-insight>
      </div>` : LitHtml.nothing;
        // clang-format on
    }
    #hasDataToRender() {
        this.#slowCSSSelector =
            Trace.Insights.Common.getInsight('SlowCSSSelector', this.data.insights, this.data.insightSetKey);
        return this.#slowCSSSelector !== null && this.#slowCSSSelector.topElapsedMs.length !== 0 &&
            this.#slowCSSSelector.topMatchAttempts.length !== 0;
    }
    getRelatedEvents() {
        const insight = Trace.Insights.Common.getInsight('SlowCSSSelector', this.data.insights, this.data.insightSetKey);
        return insight?.relatedEvents ?? [];
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