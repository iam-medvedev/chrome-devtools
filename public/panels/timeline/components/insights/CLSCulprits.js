// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, shouldRenderForCategory } from './Helpers.js';
import * as SidebarInsight from './SidebarInsight.js';
import { InsightsCategories } from './types.js';
export function getCLSInsight(insights, navigationId) {
    if (!insights || !navigationId) {
        return null;
    }
    const insightsByNavigation = insights.get(navigationId);
    if (!insightsByNavigation) {
        return null;
    }
    const clsInsight = insightsByNavigation.CumulativeLayoutShift;
    if (clsInsight instanceof Error) {
        return null;
    }
    return clsInsight;
}
export class CLSCulprits extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-cls-culprits`;
    insightCategory = InsightsCategories.CLS;
    internalName = 'cls-culprits';
    userVisibleTitle = 'Layout Shift Culprits';
    createOverlays() {
        // TODO: create overlays
        return [];
    }
    #render() {
        // clang-format off
        return LitHtml.html `
        <div class="insights">
            <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            expanded: this.isActive(),
        }}
            @insighttoggleclick=${this.onSidebarClick}>
                <div slot="insight-description" class="insight-description">
                    <p>Layout shifts happen when existing elements unexpectedly move.
                         Shifts are caused by nodes changing size or newly added. Investigate
                         and fix these culprits.</p>
                </div>
            </${SidebarInsight.SidebarInsight}>
        </div>`;
        // clang-format on
    }
    render() {
        const clsInsight = getCLSInsight(this.data.insights, this.data.navigationId);
        const hasShifts = clsInsight?.shifts && clsInsight.shifts.size > 0;
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = hasShifts && matchesCategory ? this.#render() : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-cls-culprits', CLSCulprits);
//# sourceMappingURL=CLSCulprits.js.map