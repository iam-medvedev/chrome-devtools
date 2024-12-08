// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const { html } = LitHtml;
const UIStrings = {
    /** Label for a table column that displays the name of a third-party provider. */
    columnThirdParty: 'Third party',
    /** Label for a column in a data table; entries will be the download size of a web resource in kilobytes. */
    columnTransferSize: 'Transfer size',
    /** Label for a table column that displays how much time each row spent blocking other work on the main thread, entries will be the number of milliseconds spent. */
    columnBlockingTime: 'Blocking time',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/ThirdParties.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class ThirdParties extends BaseInsightComponent {
    static litTagName = LitHtml.literal `devtools-performance-third-parties`;
    internalName = 'third-parties';
    #overlaysForEntity = new Map();
    createOverlays() {
        this.#overlaysForEntity.clear();
        if (!this.model) {
            return [];
        }
        const overlays = [];
        for (const [entity, requests] of this.model.requestsByEntity) {
            if (entity === this.model.firstPartyEntity) {
                continue;
            }
            const overlaysForThisEntity = [];
            for (const request of requests) {
                const overlay = {
                    type: 'ENTRY_OUTLINE',
                    entry: request,
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
            return LitHtml.nothing;
        }
        const entries = [...this.model.summaryByEntity.entries()].filter(kv => kv[0] !== this.model?.firstPartyEntity);
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
                headers: [i18nString(UIStrings.columnThirdParty), i18nString(UIStrings.columnBlockingTime)],
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