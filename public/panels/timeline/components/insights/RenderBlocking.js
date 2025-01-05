// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { eventRef } from './EventRef.js';
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
    /**
     * @description Text status indicating that no requests blocked the initial render of a navigation
     */
    noRenderBlocking: 'No render blocking requests for this navigation',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/RenderBlocking.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class RenderBlocking extends BaseInsightComponent {
    static litTagName = LitHtml.StaticHtml.literal `devtools-performance-render-blocking-requests`;
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
    getEstimatedSavingsTime() {
        return this.model?.metricSavings?.FCP ?? null;
    }
    renderContent() {
        if (!this.model) {
            return LitHtml.nothing;
        }
        const MAX_REQUESTS = 3;
        const topRequests = this.model.renderBlockingRequests.slice(0, MAX_REQUESTS);
        if (!topRequests.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.noRenderBlocking)}</div>`;
        }
        // clang-format off
        return html `
      <div class="insight-section">
        <devtools-performance-table
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
        </devtools-performance-table>
      </div>
    `;
        // clang-format on
    }
}
customElements.define('devtools-performance-render-blocking-requests', RenderBlocking);
//# sourceMappingURL=RenderBlocking.js.map