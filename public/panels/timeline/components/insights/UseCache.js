// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { eventRef } from './EventRef.js';
const { UIStrings, i18nString } = Trace.Insights.Models.UseCache;
const { html } = Lit;
const MAX_TO_SHOW = 10;
export class UseCache extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-use-cache`;
    internalName = 'use-cache';
    createOverlays() {
        if (!this.model) {
            return [];
        }
        return this.model.requests.map(req => this.#createOverlayForRequest(req.request));
    }
    getEstimatedSavingsBytes() {
        return this.model?.totalWastedBytes ?? null;
    }
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        const cacheableRequests = [...this.model.requests];
        const topRequests = cacheableRequests.sort((a, b) => b.request.args.data.decodedBodyLength - a.request.args.data.decodedBodyLength);
        const remaining = topRequests.splice(MAX_TO_SHOW);
        const rows = topRequests.map(req => ({
            values: [eventRef(req.request), i18n.TimeUtilities.secondsToString(req.ttl)],
            overlays: [this.#createOverlayForRequest(req.request)],
        }));
        if (remaining.length > 0) {
            const value = remaining.length > 1 ? i18nString(UIStrings.others, { PH1: remaining.length }) : eventRef(remaining[0].request);
            rows.push({
                values: [value],
                overlays: remaining.map(r => this.#createOverlayForRequest(r.request)),
            });
        }
        if (!rows.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.noRequestsToCache)}</div>`;
        }
        // clang-format off
        return html `
      <div class="insight-section">
        <devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.requestColumn), i18nString(UIStrings.cacheTTL)],
            rows,
        }}>
        </devtools-performance-table>
      </div>`;
        // clang-format on
    }
    #createOverlayForRequest(request) {
        return {
            type: 'ENTRY_OUTLINE',
            entry: request,
            outlineReason: 'ERROR',
        };
    }
}
customElements.define('devtools-performance-use-cache', UseCache);
//# sourceMappingURL=UseCache.js.map