// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { eventRef } from './EventRef.js';
import { createLimitedRows, renderOthersLabel } from './Table.js';
const { UIStrings, i18nString } = Trace.Insights.Models.FontDisplay;
const { html } = Lit;
export class FontDisplay extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-font-display`;
    internalName = 'font-display';
    mapToRow(font) {
        const overlay = this.#overlayForRequest.get(font.request);
        return {
            values: [
                eventRef(font.request, { text: font.name }),
                i18n.TimeUtilities.millisToString(font.wastedTime),
            ],
            overlays: overlay ? [overlay] : [],
        };
    }
    createAggregatedTableRow(remaining) {
        return {
            values: [renderOthersLabel(remaining.length), ''],
            overlays: remaining.map(r => this.#overlayForRequest.get(r.request)).filter(o => !!o),
        };
    }
    #overlayForRequest = new Map();
    createOverlays() {
        this.#overlayForRequest.clear();
        if (!this.model) {
            return [];
        }
        for (const font of this.model.fonts) {
            this.#overlayForRequest.set(font.request, {
                type: 'ENTRY_OUTLINE',
                entry: font.request,
                outlineReason: font.wastedTime ? 'ERROR' : 'INFO',
            });
        }
        return [...this.#overlayForRequest.values()];
    }
    getEstimatedSavingsTime() {
        return this.model?.metricSavings?.FCP ?? null;
    }
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        const rows = createLimitedRows(this.model.fonts, this);
        // clang-format off
        return html `
      <div class="insight-section">
        ${html `<devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.fontColumn), i18nString(UIStrings.wastedTimeColumn)],
            rows,
        }}>
        </devtools-performance-table>`}
      </div>`;
        // clang-format on
    }
}
customElements.define('devtools-performance-font-display', FontDisplay);
//# sourceMappingURL=FontDisplay.js.map