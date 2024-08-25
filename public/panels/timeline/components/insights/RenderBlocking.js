// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, shouldRenderForCategory } from './Helpers.js';
import * as SidebarInsight from './SidebarInsight.js';
import { InsightsCategories } from './types.js';
export function getRenderBlockingInsight(insights, navigationId) {
    if (!insights || !navigationId) {
        return null;
    }
    const insightsByNavigation = insights.get(navigationId);
    if (!insightsByNavigation) {
        return null;
    }
    const insight = insightsByNavigation.RenderBlocking;
    if (insight instanceof Error) {
        return null;
    }
    return insight;
}
export class RenderBlockingRequests extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-render-blocking-requests`;
    insightCategory = InsightsCategories.LCP;
    internalName = 'render-blocking-requests';
    userVisibleTitle = 'Render-blocking requests';
    createOverlays() {
        const renderBlockingResults = getRenderBlockingInsight(this.data.insights, this.data.navigationId);
        if (!renderBlockingResults) {
            return [];
        }
        const entryOutlineOverlays = renderBlockingResults.renderBlockingRequests.map(req => {
            return {
                type: 'ENTRY_OUTLINE',
                entry: req,
                outlineReason: 'ERROR',
            };
        });
        return entryOutlineOverlays;
    }
    #renderRenderBlocking(insightResult) {
        const estimatedSavings = insightResult.metricSavings?.FCP;
        // clang-format off
        return LitHtml.html `
        <div class="insights">
          <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            expanded: this.isActive(),
            estimatedSavings: estimatedSavings,
        }}
          @insighttoggleclick=${this.onSidebarClick}
        >
          <div slot="insight-description" class="insight-description">
            Requests are blocking the page's initial render. <x-link class="link" href="https://web.dev/learn/performance/understanding-the-critical-path#render-blocking_resources">Deferring or inlining</x-link>
             can move these network requests out of the critical path.
          </div>
        </${SidebarInsight.SidebarInsight}>
      </div>`;
        // clang-format on
    }
    render() {
        const renderBlockingResults = getRenderBlockingInsight(this.data.insights, this.data.navigationId);
        const hasBlockingRequests = renderBlockingResults?.renderBlockingRequests && renderBlockingResults.renderBlockingRequests.length > 0;
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = hasBlockingRequests && matchesCategory ? this.#renderRenderBlocking(renderBlockingResults) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-render-blocking-requests', RenderBlockingRequests);
//# sourceMappingURL=RenderBlocking.js.map