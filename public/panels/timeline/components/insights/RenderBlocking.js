// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { eventRef } from './EventRef.js';
import { BaseInsightComponent, shouldRenderForCategory } from './Helpers.js';
import { Category } from './types.js';
const { html } = LitHtml;
const UIStrings = {
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
export class RenderBlocking extends BaseInsightComponent {
    static litTagName = LitHtml.literal `devtools-performance-render-blocking-requests`;
    insightCategory = Category.LCP;
    internalName = 'render-blocking-requests';
    createOverlays() {
        if (!this.model) {
            return [];
        }
        return this.model.renderBlockingRequests.map(request => this.#createOverlayForRequest(request));
    }
    #createOverlayForRequest(request) {
        return {
            type: 'ENTRY_OUTLINE',
            entry: request,
            outlineReason: 'ERROR',
        };
    }
    #renderRenderBlocking(insightResult) {
        if (!this.model) {
            return LitHtml.nothing;
        }
        const estimatedSavings = insightResult.metricSavings?.FCP;
        const MAX_REQUESTS = 3;
        const topRequests = insightResult.renderBlockingRequests.slice(0, MAX_REQUESTS);
        // clang-format off
        return html `
        <div class="insights">
          <devtools-performance-sidebar-insight .data=${{
            title: this.model.title,
            description: this.model.description,
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
        return this.model?.relatedEvents ?? [];
    }
    render() {
        const model = this.model;
        const hasBlockingRequests = model?.renderBlockingRequests && model.renderBlockingRequests.length > 0;
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = hasBlockingRequests && matchesCategory ? this.#renderRenderBlocking(model) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-render-blocking-requests', RenderBlocking);
//# sourceMappingURL=RenderBlocking.js.map