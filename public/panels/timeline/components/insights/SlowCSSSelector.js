// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../../core/common/common.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, shouldRenderForCategory } from './Helpers.js';
import * as SidebarInsight from './SidebarInsight.js';
import { Table } from './Table.js';
import { InsightsCategories } from './types.js';
export class SlowCSSSelector extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-slow-css-selector`;
    insightCategory = InsightsCategories.OTHER;
    internalName = 'slow-css-selector';
    userVisibleTitle = 'Slow CSS Selectors';
    #slowCSSSelector = null;
    getSlowCSSSelectorData(insights, navigationId) {
        if (!insights || !navigationId) {
            return null;
        }
        const insightsByNavigation = insights.get(navigationId);
        if (!insightsByNavigation) {
            return null;
        }
        const slowCSSSelector = insightsByNavigation.SlowCSSSelector;
        if (slowCSSSelector instanceof Error) {
            return null;
        }
        return slowCSSSelector;
    }
    createOverlays() {
        if (!this.data.insights || !this.data.navigationId) {
            return [];
        }
        const { navigationId, insights } = this.data;
        const insightsByNavigation = insights.get(navigationId);
        if (!insightsByNavigation) {
            return [];
        }
        const scsInsight = insightsByNavigation.SlowCSSSelector;
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
        // clang-format off
        return this.#slowCSSSelector ? LitHtml.html `
      <div class="insights">
        <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            expanded: this.isActive(),
        }}
          @insighttoggleclick=${this.onSidebarClick}
        >
          <div slot="insight-content">
            ${LitHtml.html `<${Table.litTagName}
              .data=${{
            headers: ['Total', 'Stats'],
            rows: [
                ['Elapsed in ms', this.#slowCSSSelector.totalElapsedMs],
                ['Match Attempts', this.#slowCSSSelector.totalMatchAttempts],
                ['Match Count', this.#slowCSSSelector.totalMatchCount],
            ],
        }}>
            </${Table.litTagName}>`}
            ${LitHtml.html `<${Table.litTagName}
              .data=${{
            headers: ['Top Selectors', 'Elapsed Time (ms)'],
            rows: this.#slowCSSSelector.topElapsedMs.map(selector => {
                return [selector.selector, selector['elapsed (us)'] / 1000.0];
            }),
        }}>
            </${Table.litTagName}>`}
            ${LitHtml.html `<${Table.litTagName}
              .data=${{
            headers: ['Top Selectors', 'Match Attempts'],
            rows: this.#slowCSSSelector.topMatchAttempts.map(selector => {
                return [selector.selector, selector['match_attempts']];
            }),
        }}>
            </${Table.litTagName}>`}
          </div>
        </${SidebarInsight}>
      </div>` : LitHtml.nothing;
        // clang-format on
    }
    #hasDataToRender() {
        const selectorStatsFeatureEnabled = Common.Settings.Settings.instance().createSetting('timeline-capture-selector-stats', false);
        this.#slowCSSSelector = selectorStatsFeatureEnabled.get() ?
            this.getSlowCSSSelectorData(this.data.insights, this.data.navigationId) :
            null;
        return this.#slowCSSSelector !== null;
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