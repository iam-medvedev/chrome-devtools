// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { eventRef } from './EventRef.js';
import { createLimitedRows, renderOthersLabel } from './Table.js';
const { UIStrings, i18nString } = Trace.Insights.Models.ModernHTTP;
const { html } = Lit;
export class ModernHTTP extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-modern-http`;
    internalName = 'modern-http';
    mapToRow(req) {
        return { values: [eventRef(req), req.args.data.protocol], overlays: [this.#createOverlayForRequest(req)] };
    }
    createAggregatedTableRow(remaining) {
        return {
            values: [renderOthersLabel(remaining.length), ''],
            overlays: remaining.map(req => this.#createOverlayForRequest(req)),
        };
    }
    getEstimatedSavingsTime() {
        return this.model?.metricSavings?.LCP ?? null;
    }
    createOverlays() {
        return this.model?.requests.map(req => this.#createOverlayForRequest(req)) ?? [];
    }
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        const rows = createLimitedRows(this.model.requests, this);
        if (!rows.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.noOldProtocolRequests)}</div>`;
        }
        // clang-format off
        return html `
      <div class="insight-section">
        <devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.request), i18nString(UIStrings.protocol)],
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
customElements.define('devtools-performance-modern-http', ModernHTTP);
//# sourceMappingURL=ModernHTTP.js.map