// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { eventRef } from './EventRef.js';
import { BaseInsight, shouldRenderForCategory } from './Helpers.js';
import { Category } from './types.js';
const { html } = LitHtml;
const UIStrings = {
    /**
     * @description Title of an insight that provides the user with the list of network requests that blocked and therefore slowed down the page rendering and becoming visible to the user.
     */
    title: 'Render blocking requests',
    /**
     * @description Text to describe that there are requests blocking rendering, which may affect LCP.
     */
    description: 'Requests are blocking the page\'s initial render, which may delay LCP. ' +
        '[Deferring or inlining](https://web.dev/learn/performance/understanding-the-critical-path#render-blocking_resources/) ' +
        'can move these network requests out of the critical path.',
    /**
     * @description Label to describe a network request (that happens to be render-blocking).
     */
    renderBlockingRequest: 'Request',
    /**
     *@description Label used for a time duration.
     */
    duration: 'Duration',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/RenderBlocking.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class RenderBlockingRequests extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-render-blocking-requests`;
    insightCategory = Category.LCP;
    internalName = 'render-blocking-requests';
    userVisibleTitle = i18nString(UIStrings.title);
    description = i18nString(UIStrings.description);
    createOverlays() {
        const insight = Trace.Insights.Common.getInsight('RenderBlocking', this.data.insights, this.data.insightSetKey);
        if (!insight) {
            return [];
        }
        return insight.renderBlockingRequests.map(request => this.#createOverlayForRequest(request));
    }
    #createOverlayForRequest(request) {
        return {
            type: 'ENTRY_OUTLINE',
            entry: request,
            outlineReason: 'ERROR',
        };
    }
    #renderRenderBlocking(insightResult) {
        const estimatedSavings = insightResult.metricSavings?.FCP;
        const MAX_REQUESTS = 3;
        const topRequests = insightResult.renderBlockingRequests.slice(0, MAX_REQUESTS);
        // clang-format off
        return html `
        <div class="insights">
          <devtools-performance-sidebar-insight .data=${{
            title: this.userVisibleTitle,
            description: this.description,
            internalName: this.internalName,
            expanded: this.isActive(),
            estimatedSavingsTime: estimatedSavings,
        }}
          @insighttoggleclick=${this.onSidebarClick} >
            <div slot="insight-content" class="insight-section">
              ${html `<devtools-performance-table
                .data=${{
            insight: this,
            headers: [i18nString(UIStrings.renderBlockingRequest), i18nString(UIStrings.duration)],
            rows: topRequests.map(request => ({
                values: [
                    eventRef(request),
                    i18n.TimeUtilities.millisToString(Platform.Timing.microSecondsToMilliSeconds(request.dur)),
                ],
                overlays: [this.#createOverlayForRequest(request)],
            })),
        }}>
              </devtools-performance-table>`}
            </div>
          </devtools-performance-sidebar-insight>
      </div>`;
        // clang-format on
    }
    getRelatedEvents() {
        const insight = Trace.Insights.Common.getInsight('RenderBlocking', this.data.insights, this.data.insightSetKey);
        return insight?.relatedEvents ?? [];
    }
    render() {
        const insight = Trace.Insights.Common.getInsight('RenderBlocking', this.data.insights, this.data.insightSetKey);
        const hasBlockingRequests = insight?.renderBlockingRequests && insight.renderBlockingRequests.length > 0;
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = hasBlockingRequests && matchesCategory ? this.#renderRenderBlocking(insight) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-render-blocking-requests', RenderBlockingRequests);
//# sourceMappingURL=RenderBlocking.js.map