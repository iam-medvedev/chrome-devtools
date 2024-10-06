// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Helpers from '../../../models/trace/helpers/helpers.js';
import * as Trace from '../../../models/trace/trace.js';
import * as LegacyComponents from '../../../ui/legacy/components/utils/utils.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as EntryName from './EntryName.js';
import * as Insights from './insights/insights.js';
import layoutShiftDetailsStyles from './layoutShiftDetails.css.js';
const MAX_URL_LENGTH = 20;
const UIStrings = {
    /**
     * @description Text indicating an insight.
     */
    insight: 'Insight',
    /**
     * @description Title indicating the Layout shift culprits insight.
     */
    layoutShiftCulprits: 'Layout shift culprits',
    /**
     * @description Text referring to the start time of a given event.
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
    /**
     * @description Text for a culprit type of non-composited animation.
     */
    nonCompositedAnimation: 'Non-composited animation',
    /**
     * @description Text referring to an animation.
     */
    animation: 'Animation',
    /**
     * @description Text referring to the duration of a given event.
     */
    duration: 'Duration',
    /**
     * @description Text referring to a parent cluster.
     */
    parentCluster: 'Parent cluster',
    /**
     * @description Text referring to a layout shift cluster and its start time.
     * @example {32 ms} PH1
     */
    cluster: 'Layout shift cluster @ {PH1}',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/LayoutShiftDetails.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class LayoutShiftDetails extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-layout-shift-details`;
    #shadow = this.attachShadow({ mode: 'open' });
    #event = null;
    #traceInsightsSets = null;
    #parsedTrace = null;
    #isFreshRecording = false;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [layoutShiftDetailsStyles];
        // Styles for linkifier button.
        UI.UIUtils.injectTextButtonStyles(this.#shadow);
        this.#render();
    }
    setData(event, traceInsightsSets, parsedTrace, isFreshRecording) {
        if (this.#event === event) {
            return;
        }
        this.#event = event;
        this.#traceInsightsSets = traceInsightsSets;
        this.#parsedTrace = parsedTrace;
        this.#isFreshRecording = isFreshRecording;
        this.#render();
    }
    #renderInsightChip() {
        if (!this.#event) {
            return null;
        }
        // clang-format off
        return LitHtml.html `
      <div class="insight-chip">
        <div class="insight-keyword">${i18nString(UIStrings.insight)} </div>${i18nString(UIStrings.layoutShiftCulprits)}</div>
    `;
        // clang-format on
    }
    #renderTitle(event) {
        const title = EntryName.nameForEntry(event);
        return LitHtml.html `
      <div class="layout-shift-details-title">
        <div class="layout-shift-event-title"></div>
        ${title}
      </div>
    `;
    }
    #renderShiftedElements(elementsShifted) {
        // clang-format off
        return LitHtml.html `
      ${elementsShifted?.map(el => {
            if (el.node_id !== undefined) {
                return LitHtml.html `
            <${Insights.NodeLink.NodeLink.litTagName}
              .data=${{
                    backendNodeId: el.node_id,
                }}>
            </${Insights.NodeLink.NodeLink.litTagName}>`;
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
        // clang-format off
        return LitHtml.html `
    <span class="culprit"><span class="culprit-type">${i18nString(UIStrings.injectedIframe)}: </span><span class="culprit-value">${el}</span></span>`;
        // clang-format on
    }
    #renderFontRequest(request) {
        const options = {
            tabStop: true,
            showColumnNumber: false,
            inlineFrameIndex: 0,
            maxLength: MAX_URL_LENGTH,
        };
        const linkifiedURL = LegacyComponents.Linkifier.Linkifier.linkifyURL(request.args.data.url, options);
        // clang-format off
        return LitHtml.html `
    <span class="culprit"><span class="culprit-type">${i18nString(UIStrings.fontRequest)}: </span><span class="culprit-value">${linkifiedURL}</span></span>`;
        // clang-format on
    }
    #clickEvent(event) {
        this.dispatchEvent(new Insights.Helpers.EventReferenceClick(event));
    }
    #renderAnimation(failure) {
        const event = failure.animation;
        if (!event) {
            return null;
        }
        // clang-format off
        return LitHtml.html `
      ${LitHtml.html `
        <span class="culprit">
        <span class="culprit-type">${i18nString(UIStrings.nonCompositedAnimation)}: </span>
        <span class="culprit-value devtools-link" @click=${() => this.#clickEvent(event)}>${i18nString(UIStrings.animation)}</span>
      </span>`}`;
        // clang-format on
    }
    #renderRootCauseValues(rootCauses) {
        return LitHtml.html `
      ${rootCauses?.fontRequests.map(fontReq => this.#renderFontRequest(fontReq))}
      ${rootCauses?.iframeIds.map(iframe => this.#renderIframe(iframe))}
      ${rootCauses?.nonCompositedAnimations.map(failure => this.#renderAnimation(failure))}
    `;
    }
    #renderParentCluster(cluster, parsedTrace) {
        if (!cluster) {
            return null;
        }
        const ts = Trace.Types.Timing.MicroSeconds(cluster.ts - (parsedTrace?.Meta.traceBounds.min ?? 0));
        const clusterTs = i18n.TimeUtilities.formatMicroSecondsTime(ts);
        // clang-format off
        return LitHtml.html `
      <span class="parent-cluster">${i18nString(UIStrings.parentCluster)}:
         <span class="devtools-link" @click=${() => this.#clickEvent(cluster)}>${i18nString(UIStrings.cluster, { PH1: clusterTs })}</span>
      </span>`;
        // clang-format on
    }
    #renderShiftDetails(layoutShift, traceInsightsSets, parsedTrace) {
        if (!traceInsightsSets) {
            return null;
        }
        const score = layoutShift.args.data?.weighted_score_delta;
        if (!score) {
            return null;
        }
        const ts = Trace.Types.Timing.MicroSeconds(layoutShift.ts - parsedTrace.Meta.traceBounds.min);
        const insightsId = layoutShift.args.data?.navigationId ?? Trace.Types.Events.NO_NAVIGATION;
        const clsInsight = traceInsightsSets.get(insightsId)?.data.CumulativeLayoutShift;
        if (clsInsight instanceof Error) {
            return null;
        }
        const rootCauses = clsInsight?.shifts?.get(layoutShift);
        const elementsShifted = layoutShift.args.data?.impacted_nodes;
        const hasCulprits = rootCauses &&
            (rootCauses.fontRequests.length || rootCauses.iframeIds.length || rootCauses.nonCompositedAnimations.length);
        const hasShiftedElements = elementsShifted?.length;
        const parentCluster = clsInsight?.clusters.find(cluster => {
            return cluster.events.find(event => event === layoutShift);
        });
        // clang-format off
        return LitHtml.html `
      <table class="layout-shift-details-table">
        <thead class="table-title">
          <tr>
            <th>${i18nString(UIStrings.startTime)}</th>
            <th>${i18nString(UIStrings.shiftScore)}</th>
            ${hasShiftedElements && this.#isFreshRecording ? LitHtml.html `
              <th>${i18nString(UIStrings.elementsShifted)}</th>` : LitHtml.nothing}
            ${hasCulprits && this.#isFreshRecording ? LitHtml.html `
              <th>${i18nString(UIStrings.culprit)}</th> ` : LitHtml.nothing}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${i18n.TimeUtilities.preciseMillisToString(Helpers.Timing.microSecondsToMilliseconds(ts))}</td>
            <td>${(score.toPrecision(4))}</td>
            ${this.#isFreshRecording ? LitHtml.html `
              <td>
                <div class="elements-shifted">
                  ${this.#renderShiftedElements(elementsShifted)}
                </div>
              </td>` : LitHtml.nothing}
            ${this.#isFreshRecording ? LitHtml.html `
              <td class="culprits">
                ${this.#renderRootCauseValues(rootCauses)}
              </td>` : LitHtml.nothing}
          </tr>
        </tbody>
      </table>
      ${this.#renderParentCluster(parentCluster, parsedTrace)}
    `;
        // clang-format on
    }
    #renderClusterDetails(cluster, parsedTrace) {
        const ts = Trace.Types.Timing.MicroSeconds(cluster.ts - parsedTrace.Meta.traceBounds.min);
        const dur = cluster.dur ?? Trace.Types.Timing.MicroSeconds(0);
        // clang-format off
        return LitHtml.html `
        <div class="cluster-details">
            <div class="details-row"><div class="title">${i18nString(UIStrings.startTime)}</div><div class="value">${i18n.TimeUtilities.preciseMillisToString(Helpers.Timing.microSecondsToMilliseconds(ts))}</div></div>
            <div class="details-row"><div class="title">${i18nString(UIStrings.duration)}</div><div class="value">${i18n.TimeUtilities.preciseMillisToString(Helpers.Timing.microSecondsToMilliseconds(dur))}</div></div>
        </div>
    `;
        // clang-format on
    }
    #renderDetails(event, traceInsightsSets, parsedTrace) {
        if (Trace.Types.Events.isSyntheticLayoutShift(event)) {
            return this.#renderShiftDetails(event, traceInsightsSets, parsedTrace);
        }
        return this.#renderClusterDetails(event, parsedTrace);
    }
    #render() {
        if (!this.#event || !this.#parsedTrace) {
            return;
        }
        // clang-format off
        const output = LitHtml.html `
      <div class="layout-shift-summary-details">
        <div class="event-details">
          ${this.#renderTitle(this.#event)}
          ${this.#renderDetails(this.#event, this.#traceInsightsSets, this.#parsedTrace)}
        </div>
        <div class="insight-categories">
          ${this.#renderInsightChip()}
        </div>
      </div>
    `;
        // clang-format on
        LitHtml.render(output, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-layout-shift-details', LayoutShiftDetails);
//# sourceMappingURL=LayoutShiftDetails.js.map