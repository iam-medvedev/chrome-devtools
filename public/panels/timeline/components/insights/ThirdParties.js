// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, md, shouldRenderForCategory } from './Helpers.js';
import * as SidebarInsight from './SidebarInsight.js';
import { InsightsCategories } from './types.js';
const UIStrings = {
    /** Title of a diagnostic audit that provides details about the code on a web page that the user doesn't control (referred to as "third-party code"). */
    title: 'Minimize third-party usage',
    /**
     * @description Description of a DevTools insight that identifies the code on the page that the user doesn't control.
     * This is displayed after a user expands the section to see more. No character length limits.
     * The last sentence starting with 'Learn' becomes link text to additional documentation.
     */
    description: 'Third-party code can significantly impact load performance. ' +
        'Limit the number of redundant third-party providers and try to load third-party code after ' +
        'your page has primarily finished loading. ' +
        '[Learn how to minimize third-party impact](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/).',
    /** Label for a table column that displays the name of a third-party provider. */
    columnThirdParty: 'Third-party',
    /** Label for a column in a data table; entries will be the download size of a web resource in kilobytes. */
    columnTransferSize: 'Transfer size',
    /** Label for a table column that displays how much time each row spent blocking other work on the main thread, entries will be the number of milliseconds spent. */
    columnBlockingTime: 'Blocking time',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/ThirdParties.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export function getThirdPartiesInsight(insights, navigationId) {
    if (!insights || !navigationId) {
        return null;
    }
    const insightsByNavigation = insights.get(navigationId);
    if (!insightsByNavigation) {
        return null;
    }
    const thirdPartiesInsight = insightsByNavigation.ThirdPartyWeb;
    if (thirdPartiesInsight instanceof Error) {
        return null;
    }
    return thirdPartiesInsight;
}
export class ThirdParties extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-third-parties`;
    insightCategory = InsightsCategories.OTHER;
    internalName = 'third-parties';
    userVisibleTitle = i18nString(UIStrings.title);
    createOverlays() {
        const insight = getThirdPartiesInsight(this.data.insights, this.data.navigationId);
        if (!insight) {
            return [];
        }
        const overlays = [];
        for (const [entity, requests] of insight.requestsByEntity) {
            if (entity === insight.firstPartyEntity) {
                continue;
            }
            for (const request of requests) {
                overlays.push({
                    type: 'ENTRY_OUTLINE',
                    entry: request,
                    outlineReason: 'INFO',
                });
            }
        }
        return overlays;
    }
    #render(data) {
        const entries = [...data.summaryByEntity.entries()];
        // clang-format off
        const rows1 = entries
            .sort((a, b) => b[1].transferSize - a[1].transferSize)
            .slice(0, 6)
            .map(([entity, summary]) => [
            entity.name,
            Platform.NumberUtilities.bytesToString(summary.transferSize),
        ]);
        const rows2 = entries
            .sort((a, b) => b[1].mainThreadTime - a[1].mainThreadTime)
            .slice(0, 6)
            .map(([entity, summary]) => [
            entity.name,
            i18n.TimeUtilities.millisToString(Platform.Timing.microSecondsToMilliSeconds(summary.mainThreadTime)),
        ]);
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
                <div slot="insight-content">
                  <div class="table-container">
                    <dl>
                      <dt class="dl-title">${i18nString(UIStrings.columnThirdParty)}</dt>
                      <dd class="dl-title">${i18nString(UIStrings.columnTransferSize)}</dd>
                        ${rows1.map(([entity, transferSize]) => LitHtml.html `
                          <dt>${entity}</dt>
                          <dd class="dl-value">${transferSize}</dd>
                        `)}
                    </dl>
                  </div>
                  <div class="table-container">
                    <dl>
                      <dt class="dl-title">${i18nString(UIStrings.columnThirdParty)}</dt>
                      <dd class="dl-title">${i18nString(UIStrings.columnBlockingTime)}</dd>
                        ${rows2.map(([entity, mainThreadTime]) => LitHtml.html `
                          <dt>${entity}</dt>
                          <dd class="dl-value">${mainThreadTime}</dd>
                        `)}
                    </dl>
                  </div>
                </div>
            </${SidebarInsight.SidebarInsight}>
        </div>`;
        // clang-format on
    }
    render() {
        const insight = getThirdPartiesInsight(this.data.insights, this.data.navigationId);
        const shouldShow = insight && insight.summaryByEntity.size;
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = shouldShow && matchesCategory ? this.#render(insight) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-third-parties', ThirdParties);
//# sourceMappingURL=ThirdParties.js.map