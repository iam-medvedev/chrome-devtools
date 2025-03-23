// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as SDK from '../../../../core/sdk/sdk.js';
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
        if (!callFrame) {
            // TODO: Remove this style hack.
            return html `<div style="margin: 4px 10px; font-style: italic">${i18nString(UIStrings.unattributed)}</div>`;
        }
        const linkifier = new LegacyComponents.Linkifier.Linkifier();
        const stackTrace = {
            callFrames: [
                {
                    functionName: callFrame.functionName,
                    scriptId: callFrame.scriptId,
                    url: callFrame.url,
                    lineNumber: callFrame.lineNumber,
                    columnNumber: callFrame.columnNumber,
                },
            ],
        };
        const target = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
        const callFrameContents = LegacyComponents.JSPresentationUtils.buildStackTracePreviewContents(target, linkifier, { stackTrace, tabStops: true, showColumnNumber: true });
        return html `${callFrameContents.element}`;
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