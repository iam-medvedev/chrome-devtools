// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, shortenUrl, shouldRenderForCategory } from './Helpers.js';
import * as SidebarInsight from './SidebarInsight.js';
import { Table } from './Table.js';
import { Category } from './types.js';
const UIStrings = {
    /** Title of an insight that provides details about the fonts used on the page, and the value of their `font-display` properties. */
    title: 'Font display',
    /**
     * @description Text to tell the user about the font-display CSS feature to help improve a the UX of a page.
     */
    description: 'Consider using a [font-display](https://developer.chrome.com/blog/font-display) of `swap` or `optional` to ensure text is consistently visible.',
    /** Column for a font loaded by the page to render text. */
    fontColumn: 'Font',
    /** Column for the amount of time wasted. */
    wastedTimeColumn: 'Wasted time',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/FontDisplay.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class FontDisplay extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-font-display`;
    insightCategory = Category.INP;
    internalName = 'font-display';
    userVisibleTitle = i18nString(UIStrings.title);
    description = i18nString(UIStrings.description);
    #overlayForRequest = new Map();
    createOverlays() {
        this.#overlayForRequest.clear();
        const insight = Trace.Insights.Common.getInsight('FontDisplay', this.data.insights, this.data.insightSetKey);
        if (!insight) {
            return [];
        }
        for (const font of insight.fonts) {
            this.#overlayForRequest.set(font.request, {
                type: 'ENTRY_OUTLINE',
                entry: font.request,
                outlineReason: font.wastedTime ? 'ERROR' : 'INFO',
            });
        }
        return [...this.#overlayForRequest.values()];
    }
    #render(insight) {
        // clang-format off
        return LitHtml.html `
        <div class="insights">
            <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            description: this.description,
            expanded: this.isActive(),
            internalName: this.internalName,
            estimatedSavingsTime: insight.metricSavings?.FCP,
        }}
            @insighttoggleclick=${this.onSidebarClick}>
                <div slot="insight-content" class="insight-section">
                  ${LitHtml.html `<${Table.litTagName}
                    .data=${{
            insight: this,
            headers: [i18nString(UIStrings.fontColumn), 'font-display', i18nString(UIStrings.wastedTimeColumn)],
            rows: insight.fonts.map(font => ({
                values: [
                    // TODO(crbug.com/369422196): the font name would be nicer here.
                    shortenUrl(font.request.args.data.url),
                    font.display,
                    i18n.TimeUtilities.millisToString(font.wastedTime),
                ],
                overlays: [this.#overlayForRequest.get(font.request)],
            })),
        }}>
                  </${Table.litTagName}>`}
                </div>
            </${SidebarInsight.SidebarInsight}>
        </div>`;
        // clang-format on
    }
    render() {
        const insight = Trace.Insights.Common.getInsight('FontDisplay', this.data.insights, this.data.insightSetKey);
        const shouldShow = insight && insight.fonts.find(font => font.wastedTime);
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = shouldShow && matchesCategory ? this.#render(insight) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-font-display', FontDisplay);
//# sourceMappingURL=FontDisplay.js.map