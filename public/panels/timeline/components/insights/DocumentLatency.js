// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../../ui/components/icon_button/icon_button.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const { html } = LitHtml;
const UIStrings = {
    /**
     * @description Text to tell the user that the document request does not have redirects.
     */
    passingRedirects: 'Avoids redirects',
    /**
     * @description Text to tell the user that the document request had redirects.
     */
    failedRedirects: 'Had redirects',
    /**
     * @description Text to tell the user that the time starting the document request to when the server started responding is acceptable.
     */
    passingServerResponseTime: 'Server responds quickly',
    /**
     * @description Text to tell the user that the time starting the document request to when the server started responding is not acceptable.
     */
    failedServerResponseTime: 'Server responded slowly',
    /**
     * @description Text to tell the user that text compression (like gzip) was applied.
     */
    passingTextCompression: 'Applies text compression',
    /**
     * @description Text to tell the user that text compression (like gzip) was not applied.
     */
    failedTextCompression: 'No compression applied',
    /**
     * @description Text for a label describing a network request event as having redirects.
     */
    redirectsLabel: 'Redirects',
    /**
     * @description Text for a label describing a network request event as taking too long to start delivery by the server.
     */
    serverResponseTimeLabel: 'Server response time',
    /**
     * @description Text for a label describing a network request event as taking longer to download because it wasn't compressed.
     */
    uncompressedDownload: 'Uncompressed download',
    /**
     *@description Text for a screen-reader label to tell the user that the icon represents a successful insight check
     *@example {Server response time} PH1
     */
    successAriaLabel: 'Insight check passed: {PH1}',
    /**
     *@description Text for a screen-reader label to tell the user that the icon represents an unsuccessful insight check
     *@example {Server response time} PH1
     */
    failedAriaLabel: 'Insight check failed: {PH1}',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/DocumentLatency.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class DocumentLatency extends BaseInsightComponent {
    static litTagName = LitHtml.StaticHtml.literal `devtools-performance-document-latency`;
    internalName = 'document-latency';
    #check(didPass, good, bad) {
        const icon = didPass ? 'check-circle' : 'clear';
        const ariaLabel = didPass ? i18nString(UIStrings.successAriaLabel, { PH1: good }) :
            i18nString(UIStrings.failedAriaLabel, { PH1: bad });
        return html `
      <devtools-icon
        aria-label=${ariaLabel}
        name=${icon}
        class=${didPass ? 'metric-value-good' : 'metric-value-bad'}
      ></devtools-icon>
      <span>${didPass ? good : bad}</span>
    `;
    }
    createOverlays() {
        if (!this.model?.data?.documentRequest) {
            return [];
        }
        const overlays = [];
        const event = this.model.data.documentRequest;
        const redirectDurationMicro = Trace.Helpers.Timing.milliToMicro(this.model.data.redirectDuration);
        const sections = [];
        if (this.model.data.redirectDuration) {
            const bounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(event.ts, (event.ts + redirectDurationMicro));
            sections.push({ bounds, label: i18nString(UIStrings.redirectsLabel), showDuration: true });
            overlays.push({ type: 'CANDY_STRIPED_TIME_RANGE', bounds, entry: event });
        }
        if (this.model.data.serverResponseTooSlow) {
            const serverResponseTimeMicro = Trace.Helpers.Timing.milliToMicro(this.model.data.serverResponseTime);
            // NOTE: NetworkRequestHandlers never makes a synthetic network request event if `timing` is missing.
            const sendEnd = event.args.data.timing?.sendEnd ?? Trace.Types.Timing.Milli(0);
            const sendEndMicro = Trace.Helpers.Timing.milliToMicro(sendEnd);
            const bounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(sendEndMicro, (sendEndMicro + serverResponseTimeMicro));
            sections.push({ bounds, label: i18nString(UIStrings.serverResponseTimeLabel), showDuration: true });
        }
        if (this.model.data.uncompressedResponseBytes) {
            const bounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(event.args.data.syntheticData.downloadStart, (event.args.data.syntheticData.downloadStart + event.args.data.syntheticData.download));
            sections.push({ bounds, label: i18nString(UIStrings.uncompressedDownload), showDuration: true });
            overlays.push({ type: 'CANDY_STRIPED_TIME_RANGE', bounds, entry: event });
        }
        if (sections.length) {
            overlays.push({
                type: 'TIMESPAN_BREAKDOWN',
                sections,
                entry: this.model.data.documentRequest,
                // Always render below because the document request is guaranteed to be
                // the first request in the network track.
                renderLocation: 'BELOW_EVENT',
            });
        }
        overlays.push({
            type: 'ENTRY_SELECTED',
            entry: this.model.data.documentRequest,
        });
        return overlays;
    }
    getEstimatedSavingsTime() {
        return this.model?.metricSavings?.FCP ?? null;
    }
    getEstimatedSavingsBytes() {
        return this.model?.data?.uncompressedResponseBytes ?? null;
    }
    renderContent() {
        if (!this.model?.data) {
            return LitHtml.nothing;
        }
        // clang-format off
        return html `
      <div class="insight-section">
        <ul class="insight-results insight-icon-results">
          <li class="insight-entry">
            ${this.#check(this.model.data.redirectDuration === 0, i18nString(UIStrings.passingRedirects), i18nString(UIStrings.failedRedirects))}
          </li>
          <li class="insight-entry">
            ${this.#check(!this.model.data.serverResponseTooSlow, i18nString(UIStrings.passingServerResponseTime), i18nString(UIStrings.failedServerResponseTime))}
          </li>
          <li class="insight-entry">
            ${this.#check(this.model.data.uncompressedResponseBytes === 0, i18nString(UIStrings.passingTextCompression), i18nString(UIStrings.failedTextCompression))}
          </li>
        </ul>
      </div>`;
        // clang-format on
    }
}
customElements.define('devtools-performance-document-latency', DocumentLatency);
//# sourceMappingURL=DocumentLatency.js.map