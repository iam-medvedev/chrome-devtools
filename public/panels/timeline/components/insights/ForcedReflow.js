// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LegacyComponents from '../../../../ui/legacy/components/utils/utils.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { createLimitedRows, renderOthersLabel } from './Table.js';
const { UIStrings, i18nString } = Trace.Insights.Models.ForcedReflow;
const { html, nothing } = Lit;
export class ForcedReflow extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-forced-reflow`;
    mapToRow(data) {
        return {
            values: [this.#linkifyUrl(data.bottomUpData)],
            overlays: this.#createOverlayForEvents(data.relatedEvents),
        };
    }
    createAggregatedTableRow(remaining) {
        return {
            values: [renderOthersLabel(remaining.length)],
            overlays: remaining.flatMap(r => this.#createOverlayForEvents(r.relatedEvents)),
        };
    }
    internalName = 'forced-reflow';
    #linkifyUrl(callFrame) {
        const style = 'display: flex; gap: 4px; padding: 4px 0; overflow: hidden; white-space: nowrap';
        if (!callFrame) {
            return html `<div style=${style}>${i18nString(UIStrings.unattributed)}</div>`;
        }
        const linkifier = new LegacyComponents.Linkifier.Linkifier();
        const location = linkifier.linkifyScriptLocation(null, callFrame.scriptId, callFrame.url, callFrame.lineNumber, {
            columnNumber: callFrame.columnNumber,
            showColumnNumber: true,
            inlineFrameIndex: 0,
            tabStop: true,
        });
        if (location instanceof HTMLElement) {
            location.style.maxWidth = 'max-content';
            location.style.overflow = 'hidden';
            location.style.textOverflow = 'ellipsis';
            location.style.whiteSpace = 'normal';
            location.style.verticalAlign = 'top';
            location.style.textAlign = 'left';
            location.style.flex = '1';
        }
        const functionName = callFrame.functionName || i18nString(UIStrings.anonymous);
        return html `<div style=${style}>${functionName}<span> @ </span> ${location}</div>`;
    }
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        const topLevelFunctionCallData = this.model.topLevelFunctionCallData;
        const bottomUpCallStackData = this.model.aggregatedBottomUpData;
        const time = (us) => i18n.TimeUtilities.millisToString(Platform.Timing.microSecondsToMilliSeconds(us));
        const rows = createLimitedRows(bottomUpCallStackData, this);
        // clang-format off
        return html `
      ${topLevelFunctionCallData ? html `
        <div class="insight-section">
          <devtools-performance-table
            .data=${{
            insight: this,
            headers: [i18nString(UIStrings.topTimeConsumingFunctionCall), i18nString(UIStrings.totalReflowTime)],
            rows: [{
                    values: [
                        this.#linkifyUrl(topLevelFunctionCallData.topLevelFunctionCall),
                        time(Trace.Types.Timing.Micro(topLevelFunctionCallData.totalReflowTime)),
                    ],
                    overlays: this.#createOverlayForEvents(topLevelFunctionCallData.topLevelFunctionCallEvents, 'INFO'),
                }],
        }}>
          </devtools-performance-table>
        </div>
      ` : nothing}
      <div class="insight-section">
        <devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.relatedStackTrace)],
            rows,
        }}>
        </devtools-performance-table>
      </div>`;
        // clang-format on
    }
    createOverlays() {
        if (!this.model || !this.model.topLevelFunctionCallData) {
            return [];
        }
        const allBottomUpEvents = [...this.model.aggregatedBottomUpData.values().flatMap(data => data.relatedEvents)];
        return [
            ...this.#createOverlayForEvents(this.model.topLevelFunctionCallData.topLevelFunctionCallEvents, 'INFO'),
            ...this.#createOverlayForEvents(allBottomUpEvents),
        ];
    }
    #createOverlayForEvents(events, outlineReason = 'ERROR') {
        return events.map(e => ({
            type: 'ENTRY_OUTLINE',
            entry: e,
            outlineReason,
        }));
    }
}
customElements.define('devtools-performance-forced-reflow', ForcedReflow);
//# sourceMappingURL=ForcedReflow.js.map