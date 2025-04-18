/*
 * Copyright (C) 2010 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Logs from '../../models/logs/logs.js';
import * as ObjectUI from '../../ui/legacy/components/object_ui/object_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import networkingTimingTableStyles from './networkTimingTable.css.js';
const UIStrings = {
    /**
     *@description Text used to label the time taken to receive an HTTP/2 Push message.
     */
    receivingPush: 'Receiving `Push`',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    queueing: 'Queueing',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    stalled: 'Stalled',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    initialConnection: 'Initial connection',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    dnsLookup: 'DNS Lookup',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    proxyNegotiation: 'Proxy negotiation',
    /**
     *@description Text used to label the time taken to read an HTTP/2 Push message.
     */
    readingPush: 'Reading `Push`',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    contentDownload: 'Content Download',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    requestSent: 'Request sent',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    requestToServiceworker: 'Request to `ServiceWorker`',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    startup: 'Startup',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    respondwith: 'respondWith',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    ssl: 'SSL',
    /**
     *@description Text for sum
     */
    total: 'Total',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    waitingTtfb: 'Waiting for server response',
    /**
     *@description Text in Signed Exchange Info View of the Network panel
     */
    label: 'Label',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    routerEvaluation: 'Router Evaluation',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    routerCacheLookup: 'Cache Lookup',
    /**
     *@description Inner element text content in Network Log View Columns of the Network panel
     */
    waterfall: 'Waterfall',
    /**
     *@description Text for the duration of something
     */
    duration: 'Duration',
    /**
     *@description Text of a DOM element in Request Timing View of the Network panel
     *@example {120.39ms} PH1
     */
    queuedAtS: 'Queued at {PH1}',
    /**
     *@description Text of a DOM element in Request Timing View of the Network panel
     *@example {120.39ms} PH1
     */
    startedAtS: 'Started at {PH1}',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    serverPush: 'Server Push',
    /**
     *@description Text of a DOM element in Request Timing View of the Network panel
     */
    resourceScheduling: 'Resource Scheduling',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    connectionStart: 'Connection Start',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    requestresponse: 'Request/Response',
    /**
     *@description Text of a DOM element in Request Timing View of the Network panel
     */
    cautionRequestIsNotFinishedYet: 'CAUTION: request is not finished yet!',
    /**
     *@description Text in Request Timing View of the Network panel
     */
    explanation: 'Explanation',
    /**
     *@description Text of a DOM element in Request Timing View of the Network panel
     */
    serverTiming: 'Server Timing',
    /**
     *@description Text of a DOM element in Request Timing View of the Network panel
     */
    time: 'TIME',
    /**
     *@description Label for the Server Timing API
     */
    theServerTimingApi: 'the Server Timing API',
    /**
     *@description Text to inform about the ServerTiming API, which can be used to report timing information to DevTools about the substeps that the server performed to answer the requests. Timing information is, e.g., the duration of the substep.
     *@example {https://web.dev/custom-metrics/#server-timing-api} PH1
     */
    duringDevelopmentYouCanUseSToAdd: 'During development, you can use {PH1} to add insights into the server-side timing of this request.',
    /**
     *@description Header for last column of network timing tab.
     */
    durationC: 'DURATION',
    /**
     *@description Description for treeitem in ServiceWorker Fetch Details
     */
    originalRequest: 'Original Request',
    /**
     *@description Description for treeitem in ServiceWorker Fetch Details
     */
    responseReceived: 'Response Received',
    /**
     *@description Text for an unspecified service worker response source
     */
    unknown: 'Unknown',
    /**
     *@description Displays how a particular response was fetched
     *@example {Network fetch} PH1
     */
    sourceOfResponseS: 'Source of response: {PH1}',
    /**
     *@description Name of storage cache from which a response was fetched
     *@example {v1} PH1
     */
    cacheStorageCacheNameS: 'Cache storage cache name: {PH1}',
    /**
     *@description Text for unknown cache storage name
     */
    cacheStorageCacheNameUnknown: 'Cache storage cache name: Unknown',
    /**
     *@description Time at which a response was retrieved
     *@example {Fri Apr 10 2020 17:20:27 GMT-0700 (Pacific Daylight Time)} PH1
     */
    retrievalTimeS: 'Retrieval Time: {PH1}',
    /**
     *@description Text used to show that serviceworker fetch response source is ServiceWorker Cache Storage
     */
    serviceworkerCacheStorage: '`ServiceWorker` cache storage',
    /**
     *@description Text used to show that serviceworker fetch response source is HTTP cache
     */
    fromHttpCache: 'From HTTP cache',
    /**
     *@description Text used to show that data was retrieved via a Network fetch
     */
    networkFetch: 'Network fetch',
    /**
     *@description Text used to show that data was retrieved using ServiceWorker fallback code
     */
    fallbackCode: 'Fallback code',
    /**
     *@description Name of the specified source for SW static routing API.
     *@example {network} PH1
     */
    routerMatchedSource: 'Matched source: {PH1}',
    /**
     *@description Name of the actually used source for SW static routing API.
     *@example {network} PH1
     */
    routerActualSource: 'Actual source: {PH1}',
};
const str_ = i18n.i18n.registerUIStrings('panels/network/RequestTimingView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class RequestTimingView extends UI.Widget.VBox {
    request;
    calculator;
    lastMinimumBoundary;
    tableElement;
    constructor(request, calculator) {
        super();
        this.registerRequiredCSS(networkingTimingTableStyles);
        this.element.classList.add('resource-timing-view');
        this.request = request;
        this.calculator = calculator;
        this.lastMinimumBoundary = -1;
    }
    static timeRangeTitle(name) {
        switch (name) {
            case "push" /* RequestTimeRangeNames.PUSH */:
                return i18nString(UIStrings.receivingPush);
            case "queueing" /* RequestTimeRangeNames.QUEUEING */:
                return i18nString(UIStrings.queueing);
            case "blocking" /* RequestTimeRangeNames.BLOCKING */:
                return i18nString(UIStrings.stalled);
            case "connecting" /* RequestTimeRangeNames.CONNECTING */:
                return i18nString(UIStrings.initialConnection);
            case "dns" /* RequestTimeRangeNames.DNS */:
                return i18nString(UIStrings.dnsLookup);
            case "proxy" /* RequestTimeRangeNames.PROXY */:
                return i18nString(UIStrings.proxyNegotiation);
            case "receiving-push" /* RequestTimeRangeNames.RECEIVING_PUSH */:
                return i18nString(UIStrings.readingPush);
            case "receiving" /* RequestTimeRangeNames.RECEIVING */:
                return i18nString(UIStrings.contentDownload);
            case "sending" /* RequestTimeRangeNames.SENDING */:
                return i18nString(UIStrings.requestSent);
            case "serviceworker" /* RequestTimeRangeNames.SERVICE_WORKER */:
                return i18nString(UIStrings.requestToServiceworker);
            case "serviceworker-preparation" /* RequestTimeRangeNames.SERVICE_WORKER_PREPARATION */:
                return i18nString(UIStrings.startup);
            case "serviceworker-routerevaluation" /* RequestTimeRangeNames.SERVICE_WORKER_ROUTER_EVALUATION */:
                return i18nString(UIStrings.routerEvaluation);
            case "serviceworker-cachelookup" /* RequestTimeRangeNames.SERVICE_WORKER_CACHE_LOOKUP */:
                return i18nString(UIStrings.routerCacheLookup);
            case "serviceworker-respondwith" /* RequestTimeRangeNames.SERVICE_WORKER_RESPOND_WITH */:
                return i18nString(UIStrings.respondwith);
            case "ssl" /* RequestTimeRangeNames.SSL */:
                return i18nString(UIStrings.ssl);
            case "total" /* RequestTimeRangeNames.TOTAL */:
                return i18nString(UIStrings.total);
            case "waiting" /* RequestTimeRangeNames.WAITING */:
                return i18nString(UIStrings.waitingTtfb);
            default:
                return name;
        }
    }
    static calculateRequestTimeRanges(request, navigationStart) {
        const result = [];
        function addRange(name, start, end) {
            if (start < Number.MAX_VALUE && start <= end) {
                result.push({ name, start, end });
            }
        }
        function firstPositive(numbers) {
            for (let i = 0; i < numbers.length; ++i) {
                if (numbers[i] > 0) {
                    return numbers[i];
                }
            }
            return undefined;
        }
        function addOffsetRange(name, start, end) {
            if (start >= 0 && end >= 0) {
                addRange(name, startTime + (start / 1000), startTime + (end / 1000));
            }
        }
        // In some situations, argument `start` may come before `startTime` (`timing.requestStart`). This is especially true
        // in cases such as SW static routing API where fields like `workerRouterEvaluationStart` or `workerCacheLookupStart`
        // is set before setting `timing.requestStart`. If the `start` and `end` is known to be a valid value (i.e. not default
        // invalid value -1 or undefined), we allow adding the range.
        function addMaybeNegativeOffsetRange(name, start, end) {
            addRange(name, startTime + (start / 1000), startTime + (end / 1000));
        }
        const timing = request.timing;
        if (!timing) {
            const start = request.issueTime() !== -1 ? request.issueTime() : request.startTime !== -1 ? request.startTime : 0;
            const hasDifferentIssueAndStartTime = request.issueTime() !== -1 && request.startTime !== -1 && request.issueTime() !== request.startTime;
            const middle = (request.responseReceivedTime === -1) ?
                (hasDifferentIssueAndStartTime ? request.startTime : Number.MAX_VALUE) :
                request.responseReceivedTime;
            const end = (request.endTime === -1) ? Number.MAX_VALUE : request.endTime;
            addRange("total" /* RequestTimeRangeNames.TOTAL */, start, end);
            addRange("blocking" /* RequestTimeRangeNames.BLOCKING */, start, middle);
            const state = request.responseReceivedTime === -1 ? "connecting" /* RequestTimeRangeNames.CONNECTING */ : "receiving" /* RequestTimeRangeNames.RECEIVING */;
            addRange(state, middle, end);
            return result;
        }
        const issueTime = request.issueTime();
        const startTime = timing.requestTime;
        const endTime = firstPositive([request.endTime, request.responseReceivedTime]) || startTime;
        addRange("total" /* RequestTimeRangeNames.TOTAL */, issueTime < startTime ? issueTime : startTime, endTime);
        if (timing.pushStart) {
            const pushEnd = timing.pushEnd || endTime;
            // Only show the part of push that happened after the navigation/reload.
            // Pushes that happened on the same connection before we started main request will not be shown.
            if (pushEnd > navigationStart) {
                addRange("push" /* RequestTimeRangeNames.PUSH */, Math.max(timing.pushStart, navigationStart), pushEnd);
            }
        }
        if (issueTime < startTime) {
            addRange("queueing" /* RequestTimeRangeNames.QUEUEING */, issueTime, startTime);
        }
        const responseReceived = (request.responseReceivedTime - startTime) * 1000;
        if (request.fetchedViaServiceWorker) {
            addOffsetRange("blocking" /* RequestTimeRangeNames.BLOCKING */, 0, timing.workerStart);
            addOffsetRange("serviceworker-preparation" /* RequestTimeRangeNames.SERVICE_WORKER_PREPARATION */, timing.workerStart, timing.workerReady);
            addOffsetRange("serviceworker-respondwith" /* RequestTimeRangeNames.SERVICE_WORKER_RESPOND_WITH */, timing.workerFetchStart, timing.workerRespondWithSettled);
            addOffsetRange("serviceworker" /* RequestTimeRangeNames.SERVICE_WORKER */, timing.workerReady, timing.sendEnd);
            addOffsetRange("waiting" /* RequestTimeRangeNames.WAITING */, timing.sendEnd, responseReceived);
        }
        else if (!timing.pushStart) {
            const blockingEnd = firstPositive([timing.dnsStart, timing.connectStart, timing.sendStart, responseReceived]) || 0;
            addOffsetRange("blocking" /* RequestTimeRangeNames.BLOCKING */, 0, blockingEnd);
            addOffsetRange("proxy" /* RequestTimeRangeNames.PROXY */, timing.proxyStart, timing.proxyEnd);
            addOffsetRange("dns" /* RequestTimeRangeNames.DNS */, timing.dnsStart, timing.dnsEnd);
            addOffsetRange("connecting" /* RequestTimeRangeNames.CONNECTING */, timing.connectStart, timing.connectEnd);
            addOffsetRange("ssl" /* RequestTimeRangeNames.SSL */, timing.sslStart, timing.sslEnd);
            addOffsetRange("sending" /* RequestTimeRangeNames.SENDING */, timing.sendStart, timing.sendEnd);
            addOffsetRange("waiting" /* RequestTimeRangeNames.WAITING */, Math.max(timing.sendEnd, timing.connectEnd, timing.dnsEnd, timing.proxyEnd, blockingEnd), responseReceived);
        }
        const { serviceWorkerRouterInfo } = request;
        if (serviceWorkerRouterInfo) {
            if (timing.workerRouterEvaluationStart) {
                // Depending on the source,the next timestamp will be different. Determine the timestamp by checking
                // the matched and actual source.
                let routerEvaluationEnd = timing.sendStart;
                if (serviceWorkerRouterInfo?.matchedSourceType === "cache" /* Protocol.Network.ServiceWorkerRouterSource.Cache */ &&
                    timing.workerCacheLookupStart) {
                    routerEvaluationEnd = timing.workerCacheLookupStart;
                }
                else if (serviceWorkerRouterInfo?.actualSourceType === "fetch-event" /* Protocol.Network.ServiceWorkerRouterSource.FetchEvent */) {
                    routerEvaluationEnd = timing.workerStart;
                }
                addMaybeNegativeOffsetRange("serviceworker-routerevaluation" /* RequestTimeRangeNames.SERVICE_WORKER_ROUTER_EVALUATION */, timing.workerRouterEvaluationStart, routerEvaluationEnd);
            }
            if (timing.workerCacheLookupStart) {
                let cacheLookupEnd = timing.sendStart;
                if (serviceWorkerRouterInfo?.actualSourceType === "cache" /* Protocol.Network.ServiceWorkerRouterSource.Cache */) {
                    cacheLookupEnd = timing.receiveHeadersStart;
                }
                addMaybeNegativeOffsetRange("serviceworker-cachelookup" /* RequestTimeRangeNames.SERVICE_WORKER_CACHE_LOOKUP */, timing.workerCacheLookupStart, cacheLookupEnd);
            }
        }
        if (request.endTime !== -1) {
            addRange(timing.pushStart ? "receiving-push" /* RequestTimeRangeNames.RECEIVING_PUSH */ : "receiving" /* RequestTimeRangeNames.RECEIVING */, request.responseReceivedTime, endTime);
        }
        return result;
    }
    static createTimingTable(request, calculator) {
        const tableElement = document.createElement('table');
        tableElement.classList.add('network-timing-table');
        tableElement.setAttribute('jslog', `${VisualLogging.pane('timing').track({ resize: true })}`);
        const colgroup = tableElement.createChild('colgroup');
        colgroup.createChild('col', 'labels');
        colgroup.createChild('col', 'bars');
        colgroup.createChild('col', 'duration');
        const timeRanges = RequestTimingView.calculateRequestTimeRanges(request, calculator.minimumBoundary());
        const startTime = timeRanges.map(r => r.start).reduce((a, b) => Math.min(a, b));
        const endTime = timeRanges.map(r => r.end).reduce((a, b) => Math.max(a, b));
        const scale = 100 / (endTime - startTime);
        let connectionHeader;
        let serviceworkerHeader;
        let dataHeader;
        let queueingHeader;
        let totalDuration = 0;
        const startTimeHeader = tableElement.createChild('thead', 'network-timing-start');
        const tableHeaderRow = startTimeHeader.createChild('tr');
        const activityHeaderCell = tableHeaderRow.createChild('th');
        activityHeaderCell.createChild('span', 'network-timing-hidden-header').textContent = i18nString(UIStrings.label);
        activityHeaderCell.scope = 'col';
        const waterfallHeaderCell = tableHeaderRow.createChild('th');
        waterfallHeaderCell.createChild('span', 'network-timing-hidden-header').textContent =
            i18nString(UIStrings.waterfall);
        waterfallHeaderCell.scope = 'col';
        const durationHeaderCell = tableHeaderRow.createChild('th');
        durationHeaderCell.createChild('span', 'network-timing-hidden-header').textContent = i18nString(UIStrings.duration);
        durationHeaderCell.scope = 'col';
        const queuedCell = startTimeHeader.createChild('tr').createChild('td');
        const startedCell = startTimeHeader.createChild('tr').createChild('td');
        queuedCell.colSpan = startedCell.colSpan = 3;
        UI.UIUtils.createTextChild(queuedCell, i18nString(UIStrings.queuedAtS, { PH1: calculator.formatValue(request.issueTime(), 2) }));
        UI.UIUtils.createTextChild(startedCell, i18nString(UIStrings.startedAtS, { PH1: calculator.formatValue(request.startTime, 2) }));
        let right;
        for (let i = 0; i < timeRanges.length; ++i) {
            const range = timeRanges[i];
            const rangeName = range.name;
            if (rangeName === "total" /* RequestTimeRangeNames.TOTAL */) {
                totalDuration = range.end - range.start;
                continue;
            }
            if (rangeName === "push" /* RequestTimeRangeNames.PUSH */) {
                createHeader(i18nString(UIStrings.serverPush));
            }
            else if (rangeName === "queueing" /* RequestTimeRangeNames.QUEUEING */) {
                if (!queueingHeader) {
                    queueingHeader = createHeader(i18nString(UIStrings.resourceScheduling));
                }
            }
            else if (ConnectionSetupRangeNames.has(rangeName)) {
                if (!connectionHeader) {
                    connectionHeader = createHeader(i18nString(UIStrings.connectionStart));
                }
            }
            else if (ServiceWorkerRangeNames.has(rangeName)) {
                if (!serviceworkerHeader) {
                    serviceworkerHeader = createHeader('Service Worker');
                }
            }
            else if (!dataHeader) {
                dataHeader = createHeader(i18nString(UIStrings.requestresponse));
            }
            const left = (scale * (range.start - startTime));
            right = (scale * (endTime - range.end));
            const duration = range.end - range.start;
            const tr = tableElement.createChild('tr');
            const timingBarTitleElement = tr.createChild('td');
            UI.UIUtils.createTextChild(timingBarTitleElement, RequestTimingView.timeRangeTitle(rangeName));
            const row = tr.createChild('td').createChild('div', 'network-timing-row');
            const bar = row.createChild('span', 'network-timing-bar ' + rangeName);
            bar.style.left = left + '%';
            bar.style.right = right + '%';
            bar.textContent = '\u200B'; // Important for 0-time items to have 0 width.
            UI.ARIAUtils.setLabel(row, i18nString(UIStrings.startedAtS, { PH1: calculator.formatValue(range.start, 2) }));
            const label = tr.createChild('td').createChild('div', 'network-timing-bar-title');
            label.textContent = i18n.TimeUtilities.secondsToString(duration, true);
            if (range.name === 'serviceworker-respondwith') {
                timingBarTitleElement.classList.add('network-fetch-timing-bar-clickable');
                tableElement.createChild('tr', 'network-fetch-timing-bar-details');
                timingBarTitleElement.setAttribute('tabindex', '0');
                timingBarTitleElement.setAttribute('role', 'switch');
                UI.ARIAUtils.setChecked(timingBarTitleElement, false);
            }
            if (range.name === 'serviceworker-routerevaluation') {
                timingBarTitleElement.classList.add('network-fetch-timing-bar-clickable');
                tableElement.createChild('tr', 'router-evaluation-timing-bar-details');
                timingBarTitleElement.setAttribute('tabindex', '0');
                timingBarTitleElement.setAttribute('role', 'switch');
                UI.ARIAUtils.setChecked(timingBarTitleElement, false);
            }
        }
        if (!request.finished && !request.preserved) {
            const cell = tableElement.createChild('tr').createChild('td', 'caution');
            cell.colSpan = 3;
            UI.UIUtils.createTextChild(cell, i18nString(UIStrings.cautionRequestIsNotFinishedYet));
        }
        const footer = tableElement.createChild('tr', 'network-timing-footer');
        const note = footer.createChild('td');
        note.colSpan = 1;
        const explanationLink = UI.XLink.XLink.create('https://developer.chrome.com/docs/devtools/network/reference/#timing-explanation', i18nString(UIStrings.explanation), undefined, undefined, 'explanation');
        note.appendChild(explanationLink);
        footer.createChild('td');
        UI.UIUtils.createTextChild(footer.createChild('td'), i18n.TimeUtilities.secondsToString(totalDuration, true));
        const serverTimings = request.serverTimings;
        const lastTimingRightEdge = right === undefined ? 100 : right;
        const breakElement = tableElement.createChild('tr', 'network-timing-table-header').createChild('td');
        breakElement.colSpan = 3;
        breakElement.createChild('hr', 'break');
        const serverHeader = tableElement.createChild('tr', 'network-timing-table-header');
        UI.UIUtils.createTextChild(serverHeader.createChild('td'), i18nString(UIStrings.serverTiming));
        serverHeader.createChild('td');
        UI.UIUtils.createTextChild(serverHeader.createChild('td'), i18nString(UIStrings.time));
        if (!serverTimings) {
            const informationRow = tableElement.createChild('tr');
            const information = informationRow.createChild('td');
            information.colSpan = 3;
            const link = UI.XLink.XLink.create('https://web.dev/custom-metrics/#server-timing-api', i18nString(UIStrings.theServerTimingApi), undefined, undefined, 'server-timing-api');
            information.appendChild(i18n.i18n.getFormatLocalizedString(str_, UIStrings.duringDevelopmentYouCanUseSToAdd, { PH1: link }));
            return tableElement;
        }
        serverTimings.filter(item => item.metric.toLowerCase() !== 'total')
            .forEach(item => addServerTiming(item, lastTimingRightEdge));
        serverTimings.filter(item => item.metric.toLowerCase() === 'total')
            .forEach(item => addServerTiming(item, lastTimingRightEdge));
        return tableElement;
        function addServerTiming(serverTiming, right) {
            const colorGenerator = new Common.Color.Generator({ min: 0, max: 360, count: 36 }, { min: 50, max: 80, count: undefined }, 80);
            const isTotal = serverTiming.metric.toLowerCase() === 'total';
            const tr = tableElement.createChild('tr', isTotal ? 'network-timing-footer' : 'server-timing-row');
            const metricEl = tr.createChild('td', 'network-timing-metric');
            const metricDesc = [serverTiming.metric, serverTiming.description].filter(Boolean).join(' — ');
            // Mark entries from a bespoke format
            if (serverTiming.metric.startsWith('(c')) {
                tr.classList.add('synthetic');
            }
            UI.UIUtils.createTextChild(metricEl, metricDesc);
            UI.Tooltip.Tooltip.install(metricEl, metricDesc);
            const row = tr.createChild('td', 'server-timing-cell--value-bar').createChild('div', 'network-timing-row');
            if (serverTiming.value === null) {
                return;
            }
            const left = scale * (endTime - startTime - (serverTiming.value / 1000));
            if (left >= 0) { // don't chart values too big or too small
                const bar = row.createChild('span', 'network-timing-bar server-timing');
                bar.style.left = left + '%';
                bar.style.right = right + '%';
                bar.textContent = '\u200B'; // Important for 0-time items to have 0 width.
                if (!isTotal) {
                    bar.style.backgroundColor = colorGenerator.colorForID(serverTiming.metric);
                }
            }
            const label = tr.createChild('td', 'server-timing-cell--value-text').createChild('div', 'network-timing-bar-title');
            label.textContent = i18n.TimeUtilities.millisToString(serverTiming.value, true);
        }
        function createHeader(title) {
            const dataHeader = tableElement.createChild('tr', 'network-timing-table-header');
            const headerCell = dataHeader.createChild('td');
            UI.UIUtils.createTextChild(headerCell, title);
            UI.ARIAUtils.markAsHeading(headerCell, 2);
            UI.UIUtils.createTextChild(dataHeader.createChild('td'), '');
            UI.UIUtils.createTextChild(dataHeader.createChild('td'), i18nString(UIStrings.durationC));
            return dataHeader;
        }
    }
    constructFetchDetailsView() {
        if (!this.tableElement) {
            return;
        }
        const document = this.tableElement.ownerDocument;
        const fetchDetailsElement = document.querySelector('.network-fetch-timing-bar-details');
        if (!fetchDetailsElement) {
            return;
        }
        fetchDetailsElement.classList.add('network-fetch-timing-bar-details-collapsed');
        self.onInvokeElement(this.tableElement, this.onToggleFetchDetails.bind(this, fetchDetailsElement));
        const detailsView = new UI.TreeOutline.TreeOutlineInShadow();
        fetchDetailsElement.appendChild(detailsView.element);
        const origRequest = Logs.NetworkLog.NetworkLog.instance().originalRequestForURL(this.request.url());
        if (origRequest) {
            const requestObject = SDK.RemoteObject.RemoteObject.fromLocalObject(origRequest);
            const requestTreeElement = new ObjectUI.ObjectPropertiesSection.RootElement(requestObject);
            requestTreeElement.title = i18nString(UIStrings.originalRequest);
            detailsView.appendChild(requestTreeElement);
        }
        const response = Logs.NetworkLog.NetworkLog.instance().originalResponseForURL(this.request.url());
        if (response) {
            const responseObject = SDK.RemoteObject.RemoteObject.fromLocalObject(response);
            const responseTreeElement = new ObjectUI.ObjectPropertiesSection.RootElement(responseObject);
            responseTreeElement.title = i18nString(UIStrings.responseReceived);
            detailsView.appendChild(responseTreeElement);
        }
        const serviceWorkerResponseSource = document.createElement('div');
        serviceWorkerResponseSource.classList.add('network-fetch-details-treeitem');
        let swResponseSourceString = i18nString(UIStrings.unknown);
        const swResponseSource = this.request.serviceWorkerResponseSource();
        if (swResponseSource) {
            swResponseSourceString = this.getLocalizedResponseSourceForCode(swResponseSource);
        }
        serviceWorkerResponseSource.textContent = i18nString(UIStrings.sourceOfResponseS, { PH1: swResponseSourceString });
        const responseSourceTreeElement = new UI.TreeOutline.TreeElement(serviceWorkerResponseSource);
        detailsView.appendChild(responseSourceTreeElement);
        const cacheNameElement = document.createElement('div');
        cacheNameElement.classList.add('network-fetch-details-treeitem');
        const responseCacheStorageName = this.request.getResponseCacheStorageCacheName();
        if (responseCacheStorageName) {
            cacheNameElement.textContent = i18nString(UIStrings.cacheStorageCacheNameS, { PH1: responseCacheStorageName });
        }
        else {
            cacheNameElement.textContent = i18nString(UIStrings.cacheStorageCacheNameUnknown);
        }
        const cacheNameTreeElement = new UI.TreeOutline.TreeElement(cacheNameElement);
        detailsView.appendChild(cacheNameTreeElement);
        const retrievalTime = this.request.getResponseRetrievalTime();
        if (retrievalTime) {
            const responseTimeElement = document.createElement('div');
            responseTimeElement.classList.add('network-fetch-details-treeitem');
            responseTimeElement.textContent = i18nString(UIStrings.retrievalTimeS, { PH1: retrievalTime.toString() });
            const responseTimeTreeElement = new UI.TreeOutline.TreeElement(responseTimeElement);
            detailsView.appendChild(responseTimeTreeElement);
        }
    }
    getLocalizedResponseSourceForCode(swResponseSource) {
        switch (swResponseSource) {
            case "cache-storage" /* Protocol.Network.ServiceWorkerResponseSource.CacheStorage */:
                return i18nString(UIStrings.serviceworkerCacheStorage);
            case "http-cache" /* Protocol.Network.ServiceWorkerResponseSource.HttpCache */:
                return i18nString(UIStrings.fromHttpCache);
            case "network" /* Protocol.Network.ServiceWorkerResponseSource.Network */:
                return i18nString(UIStrings.networkFetch);
            default:
                return i18nString(UIStrings.fallbackCode);
        }
    }
    onToggleFetchDetails(fetchDetailsElement, event) {
        if (!event.target) {
            return;
        }
        const target = event.target;
        if (target.classList.contains('network-fetch-timing-bar-clickable')) {
            if (fetchDetailsElement.classList.contains('network-fetch-timing-bar-details-collapsed')) {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.NetworkPanelServiceWorkerRespondWith);
            }
            const expanded = target.getAttribute('aria-checked') === 'true';
            target.setAttribute('aria-checked', String(!expanded));
            fetchDetailsElement.classList.toggle('network-fetch-timing-bar-details-collapsed');
            fetchDetailsElement.classList.toggle('network-fetch-timing-bar-details-expanded');
        }
    }
    constructRouterEvaluationView() {
        if (!this.tableElement) {
            return;
        }
        const routerEvaluationDetailsElement = this.tableElement.querySelector('.router-evaluation-timing-bar-details');
        if (!routerEvaluationDetailsElement) {
            return;
        }
        routerEvaluationDetailsElement.classList.add('network-fetch-timing-bar-details-collapsed');
        self.onInvokeElement(this.tableElement, this.onToggleRouterEvaluationDetails.bind(this, routerEvaluationDetailsElement));
        const detailsView = new UI.TreeOutline.TreeOutlineInShadow();
        routerEvaluationDetailsElement.appendChild(detailsView.element);
        const { serviceWorkerRouterInfo } = this.request;
        if (!serviceWorkerRouterInfo) {
            return;
        }
        const document = this.tableElement.ownerDocument;
        // Add matched source type element
        const matchedSourceTypeElement = document.createElement('div');
        matchedSourceTypeElement.classList.add('network-fetch-details-treeitem');
        const matchedSourceType = serviceWorkerRouterInfo.matchedSourceType;
        const matchedSourceTypeString = String(matchedSourceType) || i18nString(UIStrings.unknown);
        matchedSourceTypeElement.textContent = i18nString(UIStrings.routerMatchedSource, { PH1: matchedSourceTypeString });
        const matchedSourceTypeTreeElement = new UI.TreeOutline.TreeElement(matchedSourceTypeElement);
        detailsView.appendChild(matchedSourceTypeTreeElement);
        // Add actual source type element
        const actualSourceTypeElement = document.createElement('div');
        actualSourceTypeElement.classList.add('network-fetch-details-treeitem');
        const actualSourceType = serviceWorkerRouterInfo.actualSourceType;
        const actualSourceTypeString = String(actualSourceType) || i18nString(UIStrings.unknown);
        actualSourceTypeElement.textContent = i18nString(UIStrings.routerActualSource, { PH1: actualSourceTypeString });
        const actualSourceTypeTreeElement = new UI.TreeOutline.TreeElement(actualSourceTypeElement);
        detailsView.appendChild(actualSourceTypeTreeElement);
    }
    onToggleRouterEvaluationDetails(routerEvaluationDetailsElement, event) {
        if (!event.target) {
            return;
        }
        const target = event.target;
        if (target.classList.contains('network-fetch-timing-bar-clickable')) {
            const expanded = target.getAttribute('aria-checked') === 'true';
            target.setAttribute('aria-checked', String(!expanded));
            routerEvaluationDetailsElement.classList.toggle('network-fetch-timing-bar-details-collapsed');
            routerEvaluationDetailsElement.classList.toggle('network-fetch-timing-bar-details-expanded');
        }
    }
    wasShown() {
        this.request.addEventListener(SDK.NetworkRequest.Events.TIMING_CHANGED, this.refresh, this);
        this.request.addEventListener(SDK.NetworkRequest.Events.FINISHED_LOADING, this.refresh, this);
        this.calculator.addEventListener("BoundariesChanged" /* Events.BOUNDARIES_CHANGED */, this.boundaryChanged, this);
        this.refresh();
    }
    willHide() {
        this.request.removeEventListener(SDK.NetworkRequest.Events.TIMING_CHANGED, this.refresh, this);
        this.request.removeEventListener(SDK.NetworkRequest.Events.FINISHED_LOADING, this.refresh, this);
        this.calculator.removeEventListener("BoundariesChanged" /* Events.BOUNDARIES_CHANGED */, this.boundaryChanged, this);
    }
    refresh() {
        if (this.tableElement) {
            this.tableElement.remove();
        }
        this.tableElement = RequestTimingView.createTimingTable(this.request, this.calculator);
        this.tableElement.classList.add('resource-timing-table');
        this.element.appendChild(this.tableElement);
        if (this.request.fetchedViaServiceWorker) {
            this.constructFetchDetailsView();
        }
        if (this.request.serviceWorkerRouterInfo) {
            this.constructRouterEvaluationView();
        }
    }
    boundaryChanged() {
        const minimumBoundary = this.calculator.minimumBoundary();
        if (minimumBoundary !== this.lastMinimumBoundary) {
            this.lastMinimumBoundary = minimumBoundary;
            this.refresh();
        }
    }
}
export const ServiceWorkerRangeNames = new Set([
    "serviceworker" /* RequestTimeRangeNames.SERVICE_WORKER */,
    "serviceworker-preparation" /* RequestTimeRangeNames.SERVICE_WORKER_PREPARATION */,
    "serviceworker-respondwith" /* RequestTimeRangeNames.SERVICE_WORKER_RESPOND_WITH */,
    "serviceworker-routerevaluation" /* RequestTimeRangeNames.SERVICE_WORKER_ROUTER_EVALUATION */,
    "serviceworker-cachelookup" /* RequestTimeRangeNames.SERVICE_WORKER_CACHE_LOOKUP */,
]);
export const ConnectionSetupRangeNames = new Set([
    "queueing" /* RequestTimeRangeNames.QUEUEING */,
    "blocking" /* RequestTimeRangeNames.BLOCKING */,
    "connecting" /* RequestTimeRangeNames.CONNECTING */,
    "dns" /* RequestTimeRangeNames.DNS */,
    "proxy" /* RequestTimeRangeNames.PROXY */,
    "ssl" /* RequestTimeRangeNames.SSL */,
]);
//# sourceMappingURL=RequestTimingView.js.map