// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, md, shouldRenderForCategory } from './Helpers.js';
import { NodeLink } from './NodeLink.js';
import * as SidebarInsight from './SidebarInsight.js';
import { InsightsCategories } from './types.js';
const UIStrings = {
    /**
     * @description Text to tell the user how a viewport meta element can improve performance.
     */
    description: 'A viewport meta element not only optimizes your app for mobile screen sizes, ' +
        'but also [prevents a 300 millisecond delay to user input](https://developer.chrome.com/blog/300ms-tap-delay-gone-away/).',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/Viewport.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export function getViewportInsight(insights, navigationId) {
    if (!insights || !navigationId) {
        return null;
    }
    const insightsByNavigation = insights.get(navigationId);
    if (!insightsByNavigation) {
        return null;
    }
    const viewportInsight = insightsByNavigation.Viewport;
    if (viewportInsight instanceof Error) {
        return null;
    }
    return viewportInsight;
}
export class Viewport extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-viewport`;
    insightCategory = InsightsCategories.INP;
    internalName = 'viewport';
    userVisibleTitle = 'Mobile-optimized viewport';
    createOverlays() {
        // TODO(b/351757418): create overlay for synthetic input delay events
        return [];
    }
    #render(data) {
        const backendNodeId = data.viewportEvent?.args.data.node_id;
        // clang-format off
        return LitHtml.html `
        <div class="insights">
            <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            expanded: this.isActive(),
        }}
            @insighttoggleclick=${this.onSidebarClick}>
                <div slot="insight-description" class="insight-description">
                  ${md(i18nString(UIStrings.description))}
                </div>
                <div slot="insight-content" class="insight-content">
                  ${backendNodeId !== undefined ? LitHtml.html `<${NodeLink.litTagName}
                    .data=${{
            backendNodeId,
            options: { tooltip: data.viewportEvent?.args.data.content },
        }}>
                  </${NodeLink.litTagName}>` : LitHtml.nothing}
                </div>
            </${SidebarInsight.SidebarInsight}>
        </div>`;
        // clang-format on
    }
    render() {
        const viewportInsight = getViewportInsight(this.data.insights, this.data.navigationId);
        const shouldShow = viewportInsight && !viewportInsight.mobileOptimized;
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = shouldShow && matchesCategory ? this.#render(viewportInsight) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-viewport', Viewport);
//# sourceMappingURL=Viewport.js.map