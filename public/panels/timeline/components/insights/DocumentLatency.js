// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as IconButton from '../../../../ui/components/icon_button/icon_button.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, shouldRenderForCategory } from './Helpers.js';
import * as SidebarInsight from './SidebarInsight.js';
import { Category } from './types.js';
const UIStrings = {
    /**
     *@description Title of an insight that provides a breakdown for how long it took to download the main document.
     */
    title: 'Document request latency',
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
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/DocumentLatency.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class DocumentLatency extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-document-latency`;
    insightCategory = Category.ALL;
    internalName = 'document-latency';
    userVisibleTitle = i18nString(UIStrings.title);
    description = '';
    #check(didPass, good, bad) {
        const icon = didPass ? 'check-circle' : 'clear';
        return LitHtml.html `
      <${IconButton.Icon.Icon.litTagName}
        name=${icon}
        class=${didPass ? 'metric-value-good' : 'metric-value-bad'}
      ></${IconButton.Icon.Icon.litTagName}>
      <span>${didPass ? good : bad}</span>
    `;
    }
    createOverlays() {
        const insight = Trace.Insights.Common.getInsight('DocumentLatency', this.data.insights, this.data.insightSetKey);
        if (!insight?.data?.documentRequest) {
            return [];
        }
        const overlays = [];
        const event = insight.data.documentRequest;
        const redirectDurationMicro = Trace.Helpers.Timing.millisecondsToMicroseconds(insight.data.redirectDuration);
        const sections = [];
        if (insight.data.redirectDuration) {
            const bounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(event.ts, (event.ts + redirectDurationMicro));
            sections.push({ bounds, label: i18nString(UIStrings.redirectsLabel), showDuration: true });
            overlays.push({ type: 'CANDY_STRIPED_TIME_RANGE', bounds, entry: event });
        }
        if (insight.data.serverResponseTooSlow) {
            const serverResponseTimeMicro = Trace.Helpers.Timing.millisecondsToMicroseconds(insight.data.serverResponseTime);
            // NOTE: NetworkRequestHandlers never makes a synthetic network request event if `timing` is missing.
            const sendEnd = event.args.data.timing?.sendEnd ?? Trace.Types.Timing.MilliSeconds(0);
            const sendEndMicro = Trace.Helpers.Timing.millisecondsToMicroseconds(sendEnd);
            const bounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(sendEndMicro, (sendEndMicro + serverResponseTimeMicro));
            sections.push({ bounds, label: i18nString(UIStrings.serverResponseTimeLabel), showDuration: true });
        }
        if (insight.data.uncompressedResponseBytes) {
            const bounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(event.args.data.syntheticData.downloadStart, (event.args.data.syntheticData.downloadStart + event.args.data.syntheticData.download));
            sections.push({ bounds, label: i18nString(UIStrings.uncompressedDownload), showDuration: true });
            overlays.push({ type: 'CANDY_STRIPED_TIME_RANGE', bounds, entry: event });
        }
        if (sections.length) {
            overlays.push({
                type: 'TIMESPAN_BREAKDOWN',
                sections,
                entry: insight.data.documentRequest,
                // Always render below because the document request is guaranteed to be
                // the first request in the network track.
                renderLocation: 'BELOW_EVENT',
            });
        }
        overlays.push({
            type: 'ENTRY_SELECTED',
            entry: insight.data.documentRequest,
        });
        return overlays;
    }
    #renderInsight(insight) {
        if (!insight.data) {
            return LitHtml.nothing;
        }
        // clang-format off
        return LitHtml.html `
    <div class="insights">
      <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            description: this.description,
            expanded: this.isActive(),
            internalName: this.internalName,
            estimatedSavingsTime: insight.metricSavings?.FCP,
            estimatedSavingsBytes: insight.data.uncompressedResponseBytes,
        }}
        @insighttoggleclick=${this.onSidebarClick}
      >
        <div slot="insight-content" class="insight-section">
          <ul class="insight-results insight-icon-results">
            <li class="insight-entry">
              ${this.#check(insight.data.redirectDuration === 0, i18nString(UIStrings.passingRedirects), i18nString(UIStrings.failedRedirects))}
            </li>
            <li class="insight-entry">
              ${this.#check(!insight.data.serverResponseTooSlow, i18nString(UIStrings.passingServerResponseTime), i18nString(UIStrings.failedServerResponseTime))}
            </li>
            <li class="insight-entry">
              ${this.#check(insight.data.uncompressedResponseBytes === 0, i18nString(UIStrings.passingTextCompression), i18nString(UIStrings.failedTextCompression))}
            </li>
          </ul>
        </div>
      </${SidebarInsight.SidebarInsight}>
    </div>`;
        // clang-format on
    }
    render() {
        const insight = Trace.Insights.Common.getInsight('DocumentLatency', this.data.insights, this.data.insightSetKey);
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = matchesCategory && insight?.data ? this.#renderInsight(insight) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-document-latency', DocumentLatency);
//# sourceMappingURL=DocumentLatency.js.map