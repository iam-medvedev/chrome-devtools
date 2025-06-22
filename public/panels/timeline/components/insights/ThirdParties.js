// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { createLimitedRows, renderOthersLabel } from './Table.js';
const { UIStrings, i18nString } = Trace.Insights.Models.ThirdParties;
const { html } = Lit;
const MAX_TO_SHOW = 5;
export class ThirdParties extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-third-parties`;
    internalName = 'third-parties';
    createOverlays() {
        if (!this.model) {
            return [];
        }
        const overlays = [];
        const summaries = this.model.entitySummaries ?? [];
        for (const summary of summaries) {
            if (summary.entity === this.model.firstPartyEntity) {
                continue;
            }
            const summaryOverlays = this.#createOverlaysForSummary(summary);
            overlays.push(...summaryOverlays);
        }
        return overlays;
    }
    #createOverlaysForSummary(summary) {
        const overlays = [];
        for (const event of summary.relatedEvents) {
            // The events found for a third party can be vast, as they gather every
            // single main thread task along with everything else on the page. If the
            // main thread is busy with large icicles, we can easily create tens of
            // thousands of overlays. Therefore, only create overlays for events of at least 1ms.
            if (event.dur === undefined || event.dur < 1_000) {
                continue;
            }
            const overlay = {
                type: 'ENTRY_OUTLINE',
                entry: event,
                outlineReason: 'INFO',
            };
            overlays.push(overlay);
        }
        return overlays;
    }
    #mainThreadTimeAggregator = {
        mapToRow: summary => ({
            values: [summary.entity.name, i18n.TimeUtilities.millisToString(summary.mainThreadTime)],
            overlays: this.#createOverlaysForSummary(summary),
        }),
        createAggregatedTableRow: remaining => {
            const totalMainThreadTime = remaining.reduce((acc, summary) => acc + summary.mainThreadTime, 0);
            return {
                values: [renderOthersLabel(remaining.length), i18n.TimeUtilities.millisToString(totalMainThreadTime)],
                overlays: remaining.flatMap(summary => this.#createOverlaysForSummary(summary) ?? []),
            };
        },
    };
    #transferSizeAggregator = {
        mapToRow: summary => ({
            values: [summary.entity.name, i18n.ByteUtilities.formatBytesToKb(summary.transferSize)],
            overlays: this.#createOverlaysForSummary(summary),
        }),
        createAggregatedTableRow: remaining => {
            const totalBytes = remaining.reduce((acc, summary) => acc + summary.transferSize, 0);
            return {
                values: [renderOthersLabel(remaining.length), i18n.ByteUtilities.formatBytesToKb(totalBytes)],
                overlays: remaining.flatMap(summary => this.#createOverlaysForSummary(summary) ?? []),
            };
        },
    };
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        let result = this.model.entitySummaries ?? [];
        if (this.model.firstPartyEntity) {
            result = result.filter(s => s.entity !== this.model?.firstPartyEntity || null);
        }
        if (!result.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.noThirdParties)}</div>`;
        }
        const topTransferSizeEntries = result.toSorted((a, b) => b.transferSize - a.transferSize);
        const topMainThreadTimeEntries = result.toSorted((a, b) => b.mainThreadTime - a.mainThreadTime);
        const sections = [];
        if (topTransferSizeEntries.length) {
            const rows = createLimitedRows(topTransferSizeEntries, this.#transferSizeAggregator, MAX_TO_SHOW);
            // clang-format off
            sections.push(html `
        <div class="insight-section">
          <devtools-performance-table
            .data=${{
                insight: this,
                headers: [i18nString(UIStrings.columnThirdParty), i18nString(UIStrings.columnTransferSize)],
                rows,
            }}>
          </devtools-performance-table>
        </div>
      `);
            // clang-format on
        }
        if (topMainThreadTimeEntries.length) {
            const rows = createLimitedRows(topMainThreadTimeEntries, this.#mainThreadTimeAggregator, MAX_TO_SHOW);
            // clang-format off
            sections.push(html `
        <div class="insight-section">
          <devtools-performance-table
            .data=${{
                insight: this,
                headers: [i18nString(UIStrings.columnThirdParty), i18nString(UIStrings.columnMainThreadTime)],
                rows,
            }}>
          </devtools-performance-table>
        </div>
      `);
            // clang-format on
        }
        return html `${sections}`;
    }
}
customElements.define('devtools-performance-third-parties', ThirdParties);
//# sourceMappingURL=ThirdParties.js.map