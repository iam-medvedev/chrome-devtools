// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const { UIStrings, i18nString } = Trace.Insights.Models.ThirdParties;
const { html } = Lit;
export class ThirdParties extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-third-parties`;
    internalName = 'third-parties';
    #overlaysForEntity = new Map();
    createOverlays() {
        this.#overlaysForEntity.clear();
        if (!this.model) {
            return [];
        }
        const overlays = [];
        for (const [entity, events] of this.model.eventsByEntity) {
            if (entity === this.model.firstPartyEntity) {
                continue;
            }
            const overlaysForThisEntity = [];
            for (const event of events) {
                const overlay = {
                    type: 'ENTRY_OUTLINE',
                    entry: event,
                    outlineReason: 'INFO',
                };
                overlaysForThisEntity.push(overlay);
                overlays.push(overlay);
            }
            this.#overlaysForEntity.set(entity, overlaysForThisEntity);
        }
        return overlays;
    }
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        const entries = [...this.model.summaryByEntity.entries()].filter(kv => kv[0] !== this.model?.firstPartyEntity);
        if (!entries.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.noThirdParties)}</div>`;
        }
        const topTransferSizeEntries = entries.sort((a, b) => b[1].transferSize - a[1].transferSize).slice(0, 6);
        const topMainThreadTimeEntries = entries.sort((a, b) => b[1].mainThreadTime - a[1].mainThreadTime).slice(0, 6);
        const sections = [];
        if (topTransferSizeEntries.length) {
            // clang-format off
            sections.push(html `
        <div class="insight-section">
          <devtools-performance-table
            .data=${{
                insight: this,
                headers: [i18nString(UIStrings.columnThirdParty), i18nString(UIStrings.columnTransferSize)],
                rows: topTransferSizeEntries.map(([entity, summary]) => ({
                    values: [
                        entity.name,
                        i18n.ByteUtilities.bytesToString(summary.transferSize),
                    ],
                    overlays: this.#overlaysForEntity.get(entity),
                })),
            }}>
          </devtools-performance-table>
        </div>
      `);
            // clang-format on
        }
        if (topMainThreadTimeEntries.length) {
            // clang-format off
            sections.push(html `
        <div class="insight-section">
          <devtools-performance-table
            .data=${{
                insight: this,
                headers: [i18nString(UIStrings.columnThirdParty), i18nString(UIStrings.columnMainThreadTime)],
                rows: topMainThreadTimeEntries.map(([entity, summary]) => ({
                    values: [
                        entity.name,
                        i18n.TimeUtilities.millisToString(Platform.Timing.microSecondsToMilliSeconds(summary.mainThreadTime)),
                    ],
                    overlays: this.#overlaysForEntity.get(entity),
                })),
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