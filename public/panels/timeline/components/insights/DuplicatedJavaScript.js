// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { eventRef } from './EventRef.js';
const { UIStrings, i18nString } = Trace.Insights.Models.DuplicatedJavaScript;
const { html } = Lit;
export class DuplicatedJavaScript extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-duplicated-javascript`;
    internalName = 'duplicated-javascript';
    createOverlays() {
        if (!this.model) {
            return [];
        }
        const requests = this.model.scriptsWithDuplication.map(script => script.request)
            .filter(e => !!e); // eslint-disable-line no-implicit-coercion
        return requests.map(request => {
            return {
                type: 'ENTRY_OUTLINE',
                entry: request,
                outlineReason: 'ERROR',
            };
        });
    }
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        const rows = [...this.model.duplication.entries()].slice(0, 10).map(([source, data]) => {
            const scriptToOverlay = new Map();
            for (const { script } of data.duplicates) {
                scriptToOverlay.set(script, {
                    type: 'ENTRY_OUTLINE',
                    entry: script.request,
                    outlineReason: 'ERROR',
                });
            }
            return {
                values: [source, i18n.ByteUtilities.bytesToString(data.estimatedDuplicateBytes)],
                overlays: [...scriptToOverlay.values()],
                subRows: data.duplicates.map(({ script, attributedSize: resourceSize }) => {
                    let overlays;
                    const overlay = scriptToOverlay.get(script);
                    if (overlay) {
                        overlays = [overlay];
                    }
                    return {
                        values: [
                            script.request ? eventRef(script.request) : script.url ?? 'unknown',
                            i18n.ByteUtilities.bytesToString(resourceSize),
                        ],
                        overlays,
                    };
                })
            };
        });
        // clang-format off
        return html `
      <div class="insight-section">
        <devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.columnSource), i18nString(UIStrings.columnResourceSize)],
            rows,
        }}>
        </devtools-performance-table>
      </div>
    `;
        // clang-format on
    }
}
customElements.define('devtools-performance-duplicated-javascript', DuplicatedJavaScript);
//# sourceMappingURL=DuplicatedJavaScript.js.map