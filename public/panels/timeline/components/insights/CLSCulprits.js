// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, EventReferenceClick, shouldRenderForCategory } from './Helpers.js';
import * as SidebarInsight from './SidebarInsight.js';
import { Category } from './types.js';
const UIStrings = {
    /** Title of an insight that provides details about why elements shift/move on the page. The causes for these shifts are referred to as culprits ("reasons"). */
    title: 'Layout shift culprits',
    /**
     * @description Description of a DevTools insight that identifies the reasons that elements shift on the page.
     * This is displayed after a user expands the section to see more. No character length limits.
     */
    description: 'Layout shifts occur when elements move absent any user interaction. [Investigate the causes of layout shifts](https://web.dev/articles/optimize-cls), such as elements being added, removed, or their fonts changing as the page loads.',
    /**
     *@description Text indicating the worst layout shift cluster.
     */
    worstLayoutShiftCluster: 'Worst layout shift cluster',
    /**
     * @description Text indicating the worst layout shift cluster.
     */
    worstCluster: 'Worst cluster',
    /**
     * @description Text indicating a layout shift cluster and its start time.
     * @example {32 ms} PH1
     */
    layoutShiftCluster: 'Layout shift cluster @ {PH1}',
    /**
     *@description Text indicating the biggest reasons for the layout shifts.
     */
    topCulprits: 'Top layout shift culprits',
    /**
     * @description Text for a culprit type of Injected iframe.
     */
    injectedIframe: 'Injected iframe',
    /**
     * @description Text for a culprit type of Font request.
     */
    fontRequest: 'Font request',
    /**
     * @description Text for a culprit type of Animation.
     */
    animation: 'Animation',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/CLSCulprits.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class CLSCulprits extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-cls-culprits`;
    insightCategory = Category.CLS;
    internalName = 'cls-culprits';
    userVisibleTitle = i18nString(UIStrings.title);
    description = i18nString(UIStrings.description);
    createOverlays() {
        const insight = Trace.Insights.Common.getInsight('CumulativeLayoutShift', this.data.insights, this.data.insightSetKey);
        const clustersByScore = insight?.clusters.toSorted((a, b) => b.clusterCumulativeScore - a.clusterCumulativeScore) ?? [];
        const worstCluster = clustersByScore[0];
        if (!worstCluster) {
            return [];
        }
        const range = Trace.Types.Timing.MicroSeconds(worstCluster.dur ?? 0);
        const max = Trace.Types.Timing.MicroSeconds(worstCluster.ts + range);
        const label = LitHtml.html `<div>${i18nString(UIStrings.worstLayoutShiftCluster)}</div>`;
        return [{
                type: 'TIMESPAN_BREAKDOWN',
                sections: [
                    { bounds: { min: worstCluster.ts, range, max }, label, showDuration: false },
                ],
                // This allows for the overlay to sit over the layout shift.
                entry: worstCluster.events[0],
                renderLocation: 'ABOVE_EVENT',
            }];
    }
    /**
     * getTopCulprits gets the top 3 shift root causes based on worst cluster.
     */
    getTopCulprits(cluster, culpritsByShift) {
        if (!culpritsByShift) {
            return [];
        }
        const MAX_TOP_CULPRITS = 3;
        const causes = [];
        if (causes.length === MAX_TOP_CULPRITS) {
            return causes;
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
            const iframes = culprits.iframeIds;
            const animations = culprits.nonCompositedAnimations;
            for (let i = 0; i < fontReq.length && causes.length < MAX_TOP_CULPRITS; i++) {
                causes.push(i18nString(UIStrings.fontRequest));
            }
            for (let i = 0; i < iframes.length && causes.length < MAX_TOP_CULPRITS; i++) {
                causes.push(i18nString(UIStrings.injectedIframe));
            }
            for (let i = 0; i < animations.length && causes.length < MAX_TOP_CULPRITS; i++) {
                causes.push(i18nString(UIStrings.animation));
            }
        }
        return causes.slice(0, MAX_TOP_CULPRITS);
    }
    #clickEvent(event) {
        this.dispatchEvent(new EventReferenceClick(event));
    }
    #render(culprits, worstCluster) {
        const ts = Trace.Types.Timing.MicroSeconds(worstCluster.ts - (this.data.parsedTrace?.Meta.traceBounds.min ?? 0));
        const clusterTs = i18n.TimeUtilities.formatMicroSecondsTime(ts);
        // TODO(crbug.com/369102516): use Table for hover/click ux.
        // clang-format off
        return LitHtml.html `
        <div class="insights">
            <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            description: this.description,
            internalName: this.internalName,
            expanded: this.isActive(),
        }}
            @insighttoggleclick=${this.onSidebarClick}>
                <div slot="insight-content" class="insight-section">
                  <span class="worst-cluster">${i18nString(UIStrings.worstCluster)}: <span class="devtools-link" @click=${() => this.#clickEvent(worstCluster)}>${i18nString(UIStrings.layoutShiftCluster, { PH1: clusterTs })}</span></span>
                    <p>${i18nString(UIStrings.topCulprits)}:</p>
                        ${culprits.map(culprit => {
            return LitHtml.html `
                            <li>${culprit}</li>
                          `;
        })}
                </div>
            </${SidebarInsight.SidebarInsight}>
        </div>`;
        // clang-format on
    }
    render() {
        const insight = Trace.Insights.Common.getInsight('CumulativeLayoutShift', this.data.insights, this.data.insightSetKey);
        const culpritsByShift = insight?.shifts;
        const clusters = insight?.clusters ?? [];
        if (!clusters.length) {
            return;
        }
        const clustersByScore = clusters.toSorted((a, b) => b.clusterCumulativeScore - a.clusterCumulativeScore);
        const causes = this.getTopCulprits(clustersByScore[0], culpritsByShift);
        const hasCulprits = causes.length > 0;
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = hasCulprits && matchesCategory ? this.#render(causes, clustersByScore[0]) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-cls-culprits', CLSCulprits);
//# sourceMappingURL=CLSCulprits.js.map