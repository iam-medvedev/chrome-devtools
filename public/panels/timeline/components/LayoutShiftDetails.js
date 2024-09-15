// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Helpers from '../../../models/trace/helpers/helpers.js';
import * as TraceEngine from '../../../models/trace/trace.js';
import * as LegacyComponents from '../../../ui/legacy/components/utils/utils.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import { NodeLink } from './insights/insights.js';
import layoutShiftDetailsStyles from './layoutShiftDetails.css.js';
const MAX_URL_LENGTH = 80;
const UIStrings = {
    /**
     * @description Text for a Layout Shift event indictating that it is an insight.
     */
    insight: 'Insight',
    /**
     * @description Title for a Layout Shift event insight.
     */
    layoutShiftCulprits: 'Layout Shift culprits',
    /**
     * @description Text indicating a Layout Shift.
     */
    layoutShift: 'Layout Shift',
    /**
     * @description Text for a table header referring to the start time of a Layout Shift event.
     */
    startTime: 'Start time',
    /**
     * @description Text for a table header referring to the score of a Layout Shift event.
     */
    shiftScore: 'Shift score',
    /**
     * @description Text for a table header referring to the elements shifted for a Layout Shift event.
     */
    elementsShifted: 'Elements shifted',
    /**
     * @description Text for a table header referring to the culprit type of a Layout Shift event culprit.
     */
    culpritType: 'Culprit type',
    /**
     * @description Text for a table header referring to the culprit of a Layout Shift event.
     */
    culprit: 'Culprit',
    /**
     * @description Text for a culprit type of Injected iframe.
     */
    injectedIframe: 'Injected iframe',
    /**
     * @description Text for a culprit type of Font request.
     */
    fontRequest: 'Font request',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/LayoutShiftDetails.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class LayoutShiftDetails extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-layout-shift-details`;
    #shadow = this.attachShadow({ mode: 'open' });
    #layoutShift;
    #traceInsightsData = null;
    #traceEngineData = null;
    #isFreshRecording = false;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [layoutShiftDetailsStyles];
        // Styles for linkifier button.
        UI.UIUtils.injectTextButtonStyles(this.#shadow);
        this.#render();
    }
    setData(layoutShift, traceInsightsData, traceEngineData, isFreshRecording) {
        if (this.#layoutShift === layoutShift) {
            return;
        }
        this.#layoutShift = layoutShift;
        this.#traceInsightsData = traceInsightsData;
        this.#traceEngineData = traceEngineData;
        this.#isFreshRecording = isFreshRecording;
        this.#render();
    }
    #renderInsightTitleCard() {
        if (!this.#layoutShift) {
            return null;
        }
        return LitHtml.html `
      <div class="timeline-details-chip-decorative-title">
        <div class="insight-keyword">${UIStrings.insight}</div>${UIStrings.layoutShiftCulprits}</div>
    `;
    }
    #renderDetailsChip() {
        return LitHtml.html `
      <div class="layout-shift-details-title">
        <div class="layout-shift-event-chip"></div>
        ${UIStrings.layoutShift}
      </div>
    `;
    }
    #renderShiftedElements(elementsShifted) {
        // clang-format off
        return LitHtml.html `
      ${elementsShifted?.map(el => {
            if (el.node_id !== undefined) {
                return LitHtml.html `
            <${NodeLink.NodeLink.litTagName}
              .data=${{
                    backendNodeId: el.node_id,
                }}>
            </${NodeLink.NodeLink.litTagName}>`;
            }
            return LitHtml.nothing;
        })}`;
        // clang-format on
    }
    #renderIframe(iframeId) {
        const domLoadingId = iframeId;
        if (!domLoadingId) {
            return null;
        }
        const domLoadingFrame = SDK.FrameManager.FrameManager.instance().getFrame(domLoadingId);
        if (!domLoadingFrame) {
            return null;
        }
        const el = LegacyComponents.Linkifier.Linkifier.linkifyRevealable(domLoadingFrame, domLoadingFrame.displayName());
        return LitHtml.html `<tr><td>${el}</td></tr>`;
    }
    #renderFontRequest(request) {
        const options = {
            tabStop: true,
            showColumnNumber: false,
            inlineFrameIndex: 0,
            maxLength: MAX_URL_LENGTH,
        };
        const linkifiedURL = LegacyComponents.Linkifier.Linkifier.linkifyURL(request.args.data.url, options);
        return LitHtml.html `<tr><td>${linkifiedURL}</td></tr>`;
    }
    #renderRootCauseValues(rootCauses) {
        return LitHtml.html `
      ${rootCauses?.fontRequests.map(fontReq => this.#renderFontRequest(fontReq))}
      ${rootCauses?.iframeIds.map(iframe => this.#renderIframe(iframe))}
  `;
    }
    #renderDetailsTable(layoutShift, traceInsightsData, traceEngineData) {
        const score = layoutShift.args.data?.score;
        if (!score) {
            return null;
        }
        const ts = TraceEngine.Types.Timing.MicroSeconds(layoutShift.ts - traceEngineData.Meta.traceBounds.min);
        const clsInsight = traceInsightsData.get(layoutShift.args.data?.navigationId ?? '')?.CumulativeLayoutShift;
        if (clsInsight instanceof Error) {
            return null;
        }
        const rootCauses = clsInsight?.shifts?.get(layoutShift);
        const elementsShifted = layoutShift.args.data?.impacted_nodes;
        const hasCulprits = rootCauses && (rootCauses.fontRequests.length > 0 || rootCauses.iframeIds.length > 0);
        const hasShiftedElements = elementsShifted && elementsShifted.length > 0;
        // For rowspan.
        const rootCauseCount = (rootCauses?.fontRequests?.length ?? 0) + (rootCauses?.iframeIds.length ?? 0);
        // clang-format off
        return LitHtml.html `
      <table class="layout-shift-details-table">
        <thead>
          <tr class="table-title">
            <th>${i18nString(UIStrings.startTime)}</th>
            <th>${i18nString(UIStrings.shiftScore)}</th>
            ${hasShiftedElements && this.#isFreshRecording ? LitHtml.html `
              <th>${i18nString(UIStrings.elementsShifted)}</th>` : LitHtml.nothing}
            ${hasCulprits ? LitHtml.html `
              <th>${i18nString(UIStrings.culpritType)}</th> ` : LitHtml.nothing}
            ${hasCulprits && this.#isFreshRecording ? LitHtml.html `
              <th>${i18nString(UIStrings.culprit)}</th> ` : LitHtml.nothing}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan=${rootCauseCount ?? 1}>${i18n.TimeUtilities.preciseMillisToString(Helpers.Timing.microSecondsToMilliseconds(ts))}</td>
            <td rowspan=${rootCauseCount ?? 1}>${(score.toPrecision(4))}</td>
            ${this.#isFreshRecording ? LitHtml.html `
              <td>
                <div class="elements-shifted">
                  ${this.#renderShiftedElements(elementsShifted)}
                </div>
              </td>` : LitHtml.nothing}
            <td>
              ${rootCauses?.fontRequests.map(() => LitHtml.html `
                  <tr><td>${i18nString(UIStrings.fontRequest)}</td></tr>
                    `)}
              ${rootCauses?.iframeIds.map(() => LitHtml.html `
                <tr><td>${i18nString(UIStrings.injectedIframe)}</td></tr>
                  `)}
            </td>
            ${this.#isFreshRecording ? LitHtml.html `
              <td>
                ${this.#renderRootCauseValues(rootCauses)}
              </td>` : LitHtml.nothing}
          </tr>
        </tbody>
      </table>
    `;
        // clang-format on
    }
    #render() {
        if (!this.#layoutShift || !this.#traceInsightsData || !this.#traceEngineData) {
            return;
        }
        // clang-format off
        const output = LitHtml.html `
      <div class="layout-shift-summary-details">
        ${this.#renderInsightTitleCard()}
        ${this.#renderDetailsChip()}
        ${this.#renderDetailsTable(this.#layoutShift, this.#traceInsightsData, this.#traceEngineData)}
      </div>
    `;
        // clang-format on
        LitHtml.render(output, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-layout-shift-details', LayoutShiftDetails);
//# sourceMappingURL=LayoutShiftDetails.js.map