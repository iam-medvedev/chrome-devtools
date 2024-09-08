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
    /**
     * getTopCulprits gets the top 3 shift root causes based on clusters.
     */
    getTopCulprits(clusters, culpritsByShift) {
        if (!culpritsByShift) {
            return [];
        }
        const MAX_TOP_CULPRITS = 3;
        const causes = [];
        for (const cluster of clusters) {
            if (causes.length === MAX_TOP_CULPRITS) {
                break;
            }
            const shifts = cluster.events;
            for (const shift of shifts) {
                if (causes.length === MAX_TOP_CULPRITS) {
                    break;
                }
                const culprits = culpritsByShift.get(shift);
                if (!culprits) {
                    continue;
                }
                const fontReq = culprits.fontRequests;
                const iframes = culprits.iframes;
                for (let i = 0; i < fontReq.length && causes.length < MAX_TOP_CULPRITS; i++) {
                    causes.push('Font request');
                }
                for (let i = 0; i < iframes.length && causes.length < MAX_TOP_CULPRITS; i++) {
                    causes.push('Injected iframe');
                }
            }
        }
        return causes.slice(0, MAX_TOP_CULPRITS);
    }
    #render(culprits) {
        // clang-format off
        return LitHtml.html `
        <div class="insights">
            <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            expanded: this.isActive(),
        }}
            @insighttoggleclick=${this.onSidebarClick}>
                <div slot="insight-description" class="insight-description">
                    Layout shifts happen when existing elements unexpectedly move.
                         Shifts are caused by nodes changing size or newly added. Investigate
                         and fix these culprits.
                </div>
                <div slot="insight-content" style="insight-content">
                  <p>
                    Top layout shift culprits:
                    ${culprits.map(culprit => {
            return LitHtml.html `
                        <li>${culprit}</li>
                      `;
        })}
                  <p>
                </div>
            </${SidebarInsight.SidebarInsight}>
        </div>`;
        // clang-format on
    }
    render() {
        const clsInsight = getCLSInsight(this.data.insights, this.data.navigationId);
        const culpritsByShift = clsInsight?.shifts;
        const clusters = clsInsight?.clusters ?? [];
        const causes = this.getTopCulprits(clusters, culpritsByShift);
        const hasCulprits = causes.length > 0;
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = hasCulprits && matchesCategory ? this.#render(causes) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-cls-culprits', CLSCulprits);
//# sourceMappingURL=CLSCulprits.js.map