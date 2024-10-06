// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, shouldRenderForCategory } from './Helpers.js';
import { NodeLink } from './NodeLink.js';
import * as SidebarInsight from './SidebarInsight.js';
import { Category } from './types.js';
const UIStrings = {
    /** Title of an insight that provides details about if the page's viewport is optimized for mobile viewing. */
    title: 'Mobile-optimized viewport',
    /**
     * @description Text to tell the user how a viewport meta element can improve performance.
     */
    description: 'A viewport meta element not only optimizes your app for mobile screen sizes, ' +
        'but also [prevents a 300 millisecond delay to user input](https://developer.chrome.com/blog/300ms-tap-delay-gone-away/).',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/Viewport.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class Viewport extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-viewport`;
    insightCategory = Category.INP;
    internalName = 'viewport';
    userVisibleTitle = i18nString(UIStrings.title);
    description = i18nString(UIStrings.description);
    createOverlays() {
        // TODO(b/351757418): create overlay for synthetic input delay events
        return [];
    }
    #render(insight) {
        const backendNodeId = insight.viewportEvent?.args.data.node_id;
        // clang-format off
        return LitHtml.html `
        <div class="insights">
            <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            description: this.description,
            expanded: this.isActive(),
            internalName: this.internalName,
            estimatedSavingsTime: insight.metricSavings?.INP,
        }}
            @insighttoggleclick=${this.onSidebarClick}>
                <div slot="insight-content" class="insight-section">
                  ${backendNodeId !== undefined ? LitHtml.html `<${NodeLink.litTagName}
                    .data=${{
            backendNodeId,
            options: { tooltip: insight.viewportEvent?.args.data.content },
        }}>
                  </${NodeLink.litTagName}>` : LitHtml.nothing}
                </div>
            </${SidebarInsight.SidebarInsight}>
        </div>`;
        // clang-format on
    }
    render() {
        const viewportInsight = Trace.Insights.Common.getInsight('Viewport', this.data.insights, this.data.insightSetKey);
        const shouldShow = viewportInsight && viewportInsight.mobileOptimized === false;
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