// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as Common from '../common/common.js';
import * as Host from '../host/host.js';
import * as i18n from '../i18n/i18n.js';
import * as Platform from '../platform/platform.js';
import * as Root from '../root/root.js';
import { Cookie } from './Cookie.js';
import { DirectSocketChunkType, DirectSocketStatus, DirectSocketType, Events as NetworkRequestEvents, NetworkRequest } from './NetworkRequest.js';
import { SDKModel } from './SDKModel.js';
import { TargetManager } from './TargetManager.js';
const UIStrings = {
    /**
     *@description Explanation why no content is shown for WebSocket connection.
     */
    noContentForWebSocket: 'Content for WebSockets is currently not supported',
    /**
     *@description Explanation why no content is shown for redirect response.
     */
    noContentForRedirect: 'No content available because this request was redirected',
    /**
     *@description Explanation why no content is shown for preflight request.
     */
    noContentForPreflight: 'No content available for preflight request',
    /**
     *@description Text to indicate that network throttling is disabled
     */
    noThrottling: 'No throttling',
    /**
     *@description Text to indicate the network connectivity is offline
     */
    offline: 'Offline',
    /**
     *@description Text in Network Manager representing the "3G" throttling preset.
     */
    slowG: '3G', // Named `slowG` for legacy reasons and because this value
    // is serialized locally on the user's machine: if we
    // change it we break their stored throttling settings.
    // (See crrev.com/c/2947255)
    /**
     *@description Text in Network Manager representing the "Slow 4G" throttling preset
     */
    fastG: 'Slow 4G', // Named `fastG` for legacy reasons and because this value
    // is serialized locally on the user's machine: if we
    // change it we break their stored throttling settings.
    // (See crrev.com/c/2947255)
    /**
     *@description Text in Network Manager representing the "Fast 4G" throttling preset
     */
    fast4G: 'Fast 4G',
    /**
     *@description Text in Network Manager
     *@example {https://example.com} PH1
     */
    requestWasBlockedByDevtoolsS: 'Request was blocked by DevTools: "{PH1}"',
    /**
     *@description Message in Network Manager
     *@example {XHR} PH1
     *@example {GET} PH2
     *@example {https://example.com} PH3
     */
    sFailedLoadingSS: '{PH1} failed loading: {PH2} "{PH3}".',
    /**
     *@description Message in Network Manager
     *@example {XHR} PH1
     *@example {GET} PH2
     *@example {https://example.com} PH3
     */
    sFinishedLoadingSS: '{PH1} finished loading: {PH2} "{PH3}".',
    /**
     *@description One of direct socket connection statuses
     */
    directSocketStatusOpening: 'Opening',
    /**
     *@description One of direct socket connection statuses
     */
    directSocketStatusOpen: 'Open',
    /**
     *@description One of direct socket connection statuses
     */
    directSocketStatusClosed: 'Closed',
    /**
     *@description One of direct socket connection statuses
     */
    directSocketStatusAborted: 'Aborted',
};
const str_ = i18n.i18n.registerUIStrings('core/sdk/NetworkManager.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
const requestToManagerMap = new WeakMap();
const CONNECTION_TYPES = new Map([
    ['2g', "cellular2g" /* Protocol.Network.ConnectionType.Cellular2g */],
    ['3g', "cellular3g" /* Protocol.Network.ConnectionType.Cellular3g */],
    ['4g', "cellular4g" /* Protocol.Network.ConnectionType.Cellular4g */],
    ['bluetooth', "bluetooth" /* Protocol.Network.ConnectionType.Bluetooth */],
    ['wifi', "wifi" /* Protocol.Network.ConnectionType.Wifi */],
    ['wimax', "wimax" /* Protocol.Network.ConnectionType.Wimax */],
]);
/**
 * We store two settings to disk to persist network throttling.
 * 1. The custom conditions that the user has defined.
 * 2. The active `key` that applies the correct current preset.
 * The reason the setting creation functions are defined here is because they are referred
 * to in multiple places, and this ensures we don't have accidental typos which
 * mean extra settings get mistakenly created.
 */
export function customUserNetworkConditionsSetting() {
    return Common.Settings.Settings.instance().moduleSetting('custom-network-conditions');
}
export function activeNetworkThrottlingKeySetting() {
    return Common.Settings.Settings.instance().createSetting('active-network-condition-key', "NO_THROTTLING" /* PredefinedThrottlingConditionKey.NO_THROTTLING */);
}
export class NetworkManager extends SDKModel {
    dispatcher;
    fetchDispatcher;
    #networkAgent;
    #bypassServiceWorkerSetting;
    activeNetworkThrottlingKey = activeNetworkThrottlingKeySetting();
    constructor(target) {
        super(target);
        this.dispatcher = new NetworkDispatcher(this);
        this.fetchDispatcher = new FetchDispatcher(target.fetchAgent(), this);
        this.#networkAgent = target.networkAgent();
        target.registerNetworkDispatcher(this.dispatcher);
        target.registerFetchDispatcher(this.fetchDispatcher);
        if (Common.Settings.Settings.instance().moduleSetting('cache-disabled').get()) {
            void this.#networkAgent.invoke_setCacheDisabled({ cacheDisabled: true });
        }
        if (Root.Runtime.hostConfig.devToolsPrivacyUI?.enabled &&
            Root.Runtime.hostConfig.thirdPartyCookieControls?.managedBlockThirdPartyCookies !== true &&
            (Common.Settings.Settings.instance().createSetting('cookie-control-override-enabled', undefined).get() ||
                Common.Settings.Settings.instance().createSetting('grace-period-mitigation-disabled', undefined).get() ||
                Common.Settings.Settings.instance().createSetting('heuristic-mitigation-disabled', undefined).get())) {
            this.cookieControlFlagsSettingChanged();
        }
        void this.#networkAgent.invoke_enable({
            maxPostDataSize: MAX_EAGER_POST_REQUEST_BODY_LENGTH,
            reportDirectSocketTraffic: true,
        });
        void this.#networkAgent.invoke_setAttachDebugStack({ enabled: true });
        this.#bypassServiceWorkerSetting =
            Common.Settings.Settings.instance().createSetting('bypass-service-worker', false);
        if (this.#bypassServiceWorkerSetting.get()) {
            this.bypassServiceWorkerChanged();
        }
        this.#bypassServiceWorkerSetting.addChangeListener(this.bypassServiceWorkerChanged, this);
        Common.Settings.Settings.instance()
            .moduleSetting('cache-disabled')
            .addChangeListener(this.cacheDisabledSettingChanged, this);
        Common.Settings.Settings.instance()
            .createSetting('cookie-control-override-enabled', undefined)
            .addChangeListener(this.cookieControlFlagsSettingChanged, this);
        Common.Settings.Settings.instance()
            .createSetting('grace-period-mitigation-disabled', undefined)
            .addChangeListener(this.cookieControlFlagsSettingChanged, this);
        Common.Settings.Settings.instance()
            .createSetting('heuristic-mitigation-disabled', undefined)
            .addChangeListener(this.cookieControlFlagsSettingChanged, this);
    }
    static forRequest(request) {
        return requestToManagerMap.get(request) || null;
    }
    static canReplayRequest(request) {
        return Boolean(requestToManagerMap.get(request)) && Boolean(request.backendRequestId()) && !request.isRedirect() &&
            request.resourceType() === Common.ResourceType.resourceTypes.XHR;
    }
    static replayRequest(request) {
        const manager = requestToManagerMap.get(request);
        const requestId = request.backendRequestId();
        if (!manager || !requestId || request.isRedirect()) {
            return;
        }
        void manager.#networkAgent.invoke_replayXHR({ requestId });
    }
    static async searchInRequest(request, query, caseSensitive, isRegex) {
        const manager = NetworkManager.forRequest(request);
        const requestId = request.backendRequestId();
        if (!manager || !requestId || request.isRedirect()) {
            return [];
        }
        const response = await manager.#networkAgent.invoke_searchInResponseBody({ requestId, query, caseSensitive, isRegex });
        return TextUtils.TextUtils.performSearchInSearchMatches(response.result || [], query, caseSensitive, isRegex);
    }
    static async requestContentData(request) {
        if (request.resourceType() === Common.ResourceType.resourceTypes.WebSocket) {
            return { error: i18nString(UIStrings.noContentForWebSocket) };
        }
        if (!request.finished) {
            await request.once(NetworkRequestEvents.FINISHED_LOADING);
        }
        if (request.isRedirect()) {
            return { error: i18nString(UIStrings.noContentForRedirect) };
        }
        if (request.isPreflightRequest()) {
            return { error: i18nString(UIStrings.noContentForPreflight) };
        }
        const manager = NetworkManager.forRequest(request);
        if (!manager) {
            return { error: 'No network manager for request' };
        }
        const requestId = request.backendRequestId();
        if (!requestId) {
            return { error: 'No backend request id for request' };
        }
        const response = await manager.#networkAgent.invoke_getResponseBody({ requestId });
        const error = response.getError();
        if (error) {
            return { error };
        }
        return new TextUtils.ContentData.ContentData(response.body, response.base64Encoded, request.mimeType, request.charset() ?? undefined);
    }
    /**
     * Returns the already received bytes for an in-flight request. After calling this method
     * "dataReceived" events will contain additional data.
     */
    static async streamResponseBody(request) {
        if (request.finished) {
            return { error: 'Streaming the response body is only available for in-flight requests.' };
        }
        const manager = NetworkManager.forRequest(request);
        if (!manager) {
            return { error: 'No network manager for request' };
        }
        const requestId = request.backendRequestId();
        if (!requestId) {
            return { error: 'No backend request id for request' };
        }
        const response = await manager.#networkAgent.invoke_streamResourceContent({ requestId });
        const error = response.getError();
        if (error) {
            return { error };
        }
        // Wait for at least the `responseReceived event so we have accurate mimetype and charset.
        await request.waitForResponseReceived();
        return new TextUtils.ContentData.ContentData(response.bufferedData, /* isBase64=*/ true, request.mimeType, request.charset() ?? undefined);
    }
    static async requestPostData(request) {
        const manager = NetworkManager.forRequest(request);
        if (!manager) {
            console.error('No network manager for request');
            return null;
        }
        const requestId = request.backendRequestId();
        if (!requestId) {
            console.error('No backend request id for request');
            return null;
        }
        try {
            const { postData } = await manager.#networkAgent.invoke_getRequestPostData({ requestId });
            return postData;
        }
        catch (e) {
            return e.message;
        }
    }
    static connectionType(conditions) {
        if (!conditions.download && !conditions.upload) {
            return "none" /* Protocol.Network.ConnectionType.None */;
        }
        try {
            const title = typeof conditions.title === 'function' ? conditions.title().toLowerCase() : conditions.title.toLowerCase();
            for (const [name, protocolType] of CONNECTION_TYPES) {
                if (title.includes(name)) {
                    return protocolType;
                }
            }
        }
        catch {
            // If the i18nKey for this condition has changed, calling conditions.title() will break, so in that case we reset to NONE
            return "none" /* Protocol.Network.ConnectionType.None */;
        }
        return "other" /* Protocol.Network.ConnectionType.Other */;
    }
    static lowercaseHeaders(headers) {
        const newHeaders = {};
        for (const headerName in headers) {
            newHeaders[headerName.toLowerCase()] = headers[headerName];
        }
        return newHeaders;
    }
    requestForURL(url) {
        return this.dispatcher.requestForURL(url);
    }
    requestForId(id) {
        return this.dispatcher.requestForId(id);
    }
    requestForLoaderId(loaderId) {
        return this.dispatcher.requestForLoaderId(loaderId);
    }
    cacheDisabledSettingChanged({ data: enabled }) {
        void this.#networkAgent.invoke_setCacheDisabled({ cacheDisabled: enabled });
    }
    cookieControlFlagsSettingChanged() {
        const overridesEnabled = Boolean(Common.Settings.Settings.instance().createSetting('cookie-control-override-enabled', undefined).get());
        const gracePeriodEnabled = overridesEnabled ?
            Boolean(Common.Settings.Settings.instance().createSetting('grace-period-mitigation-disabled', undefined).get()) :
            false;
        const heuristicEnabled = overridesEnabled ?
            Boolean(Common.Settings.Settings.instance().createSetting('heuristic-mitigation-disabled', undefined).get()) :
            false;
        void this.#networkAgent.invoke_setCookieControls({
            enableThirdPartyCookieRestriction: overridesEnabled,
            disableThirdPartyCookieMetadata: gracePeriodEnabled,
            disableThirdPartyCookieHeuristics: heuristicEnabled,
        });
    }
    dispose() {
        Common.Settings.Settings.instance()
            .moduleSetting('cache-disabled')
            .removeChangeListener(this.cacheDisabledSettingChanged, this);
    }
    bypassServiceWorkerChanged() {
        void this.#networkAgent.invoke_setBypassServiceWorker({ bypass: this.#bypassServiceWorkerSetting.get() });
    }
    async getSecurityIsolationStatus(frameId) {
        const result = await this.#networkAgent.invoke_getSecurityIsolationStatus({ frameId: frameId ?? undefined });
        if (result.getError()) {
            return null;
        }
        return result.status;
    }
    async enableReportingApi(enable = true) {
        return await this.#networkAgent.invoke_enableReportingApi({ enable });
    }
    async loadNetworkResource(frameId, url, options) {
        const result = await this.#networkAgent.invoke_loadNetworkResource({ frameId: frameId ?? undefined, url, options });
        if (result.getError()) {
            throw new Error(result.getError());
        }
        return result.resource;
    }
    clearRequests() {
        this.dispatcher.clearRequests();
    }
}
export var Events;
(function (Events) {
    /* eslint-disable @typescript-eslint/naming-convention -- Used by web_tests. */
    Events["RequestStarted"] = "RequestStarted";
    Events["RequestUpdated"] = "RequestUpdated";
    Events["RequestFinished"] = "RequestFinished";
    Events["RequestUpdateDropped"] = "RequestUpdateDropped";
    Events["ResponseReceived"] = "ResponseReceived";
    Events["MessageGenerated"] = "MessageGenerated";
    Events["RequestRedirected"] = "RequestRedirected";
    Events["LoadingFinished"] = "LoadingFinished";
    Events["ReportingApiReportAdded"] = "ReportingApiReportAdded";
    Events["ReportingApiReportUpdated"] = "ReportingApiReportUpdated";
    Events["ReportingApiEndpointsChangedForOrigin"] = "ReportingApiEndpointsChangedForOrigin";
    /* eslint-enable @typescript-eslint/naming-convention */
})(Events || (Events = {}));
/**
 * Define some built-in DevTools throttling presets.
 * Note that for the download, upload and RTT values we multiply them by adjustment factors to make DevTools' emulation more accurate.
 * @see https://docs.google.com/document/d/10lfVdS1iDWCRKQXPfbxEn4Or99D64mvNlugP1AQuFlE/edit for historical context.
 * @see https://crbug.com/342406608#comment10 for context around the addition of 4G presets in June 2024.
 */
export const NoThrottlingConditions = {
    key: "NO_THROTTLING" /* PredefinedThrottlingConditionKey.NO_THROTTLING */,
    title: i18nLazyString(UIStrings.noThrottling),
    i18nTitleKey: UIStrings.noThrottling,
    download: -1,
    upload: -1,
    latency: 0,
};
export const OfflineConditions = {
    key: "OFFLINE" /* PredefinedThrottlingConditionKey.OFFLINE */,
    title: i18nLazyString(UIStrings.offline),
    i18nTitleKey: UIStrings.offline,
    download: 0,
    upload: 0,
    latency: 0,
};
const slow3GTargetLatency = 400;
export const Slow3GConditions = {
    key: "SPEED_3G" /* PredefinedThrottlingConditionKey.SPEED_3G */,
    title: i18nLazyString(UIStrings.slowG),
    i18nTitleKey: UIStrings.slowG,
    // ~500Kbps down
    download: 500 * 1000 / 8 * .8,
    // ~500Kbps up
    upload: 500 * 1000 / 8 * .8,
    // 400ms RTT
    latency: slow3GTargetLatency * 5,
    targetLatency: slow3GTargetLatency,
};
// Note for readers: this used to be called "Fast 3G" but it was renamed in May
// 2024 to align with LH (crbug.com/342406608).
const slow4GTargetLatency = 150;
export const Slow4GConditions = {
    key: "SPEED_SLOW_4G" /* PredefinedThrottlingConditionKey.SPEED_SLOW_4G */,
    title: i18nLazyString(UIStrings.fastG),
    i18nTitleKey: UIStrings.fastG,
    // ~1.6 Mbps down
    download: 1.6 * 1000 * 1000 / 8 * .9,
    // ~0.75 Mbps up
    upload: 750 * 1000 / 8 * .9,
    // 150ms RTT
    latency: slow4GTargetLatency * 3.75,
    targetLatency: slow4GTargetLatency,
};
const fast4GTargetLatency = 60;
export const Fast4GConditions = {
    key: "SPEED_FAST_4G" /* PredefinedThrottlingConditionKey.SPEED_FAST_4G */,
    title: i18nLazyString(UIStrings.fast4G),
    i18nTitleKey: UIStrings.fast4G,
    // 9 Mbps down
    download: 9 * 1000 * 1000 / 8 * .9,
    // 1.5 Mbps up
    upload: 1.5 * 1000 * 1000 / 8 * .9,
    // 60ms RTT
    latency: fast4GTargetLatency * 2.75,
    targetLatency: fast4GTargetLatency,
};
const MAX_EAGER_POST_REQUEST_BODY_LENGTH = 64 * 1024; // bytes
export class FetchDispatcher {
    #fetchAgent;
    #manager;
    constructor(agent, manager) {
        this.#fetchAgent = agent;
        this.#manager = manager;
    }
    requestPaused({ requestId, request, resourceType, responseStatusCode, responseHeaders, networkId }) {
        const networkRequest = networkId ? this.#manager.requestForId(networkId) : null;
        // If there was no 'Network.responseReceivedExtraInfo' event (e.g. for 'file:/' URLSs),
        // populate 'originalResponseHeaders' with the headers from the 'Fetch.requestPaused' event.
        if (networkRequest?.originalResponseHeaders.length === 0 && responseHeaders) {
            networkRequest.originalResponseHeaders = responseHeaders;
        }
        void MultitargetNetworkManager.instance().requestIntercepted(new InterceptedRequest(this.#fetchAgent, request, resourceType, requestId, networkRequest, responseStatusCode, responseHeaders));
    }
    authRequired({}) {
    }
}
export class NetworkDispatcher {
    #manager;
    #requestsById = new Map();
    #requestsByURL = new Map();
    #requestsByLoaderId = new Map();
    #requestIdToExtraInfoBuilder = new Map();
    /**
     * In case of an early abort or a cache hit, the Trust Token done event is
     * reported before the request itself is created in `requestWillBeSent`.
     * This causes the event to be lost as no `NetworkRequest` instance has been
     * created yet.
     * This map caches the events temporarily and populates the NetworkRequest
     * once it is created in `requestWillBeSent`.
     */
    #requestIdToTrustTokenEvent = new Map();
    constructor(manager) {
        this.#manager = manager;
        MultitargetNetworkManager.instance().addEventListener("RequestIntercepted" /* MultitargetNetworkManager.Events.REQUEST_INTERCEPTED */, this.#markAsIntercepted.bind(this));
    }
    #markAsIntercepted(event) {
        const request = this.requestForId(event.data);
        if (request) {
            request.setWasIntercepted(true);
        }
    }
    headersMapToHeadersArray(headersMap) {
        const result = [];
        for (const name in headersMap) {
            const values = headersMap[name].split('\n');
            for (let i = 0; i < values.length; ++i) {
                result.push({ name, value: values[i] });
            }
        }
        return result;
    }
    updateNetworkRequestWithRequest(networkRequest, request) {
        networkRequest.requestMethod = request.method;
        networkRequest.setRequestHeaders(this.headersMapToHeadersArray(request.headers));
        networkRequest.setRequestFormData(Boolean(request.hasPostData), request.postData || null);
        networkRequest.setInitialPriority(request.initialPriority);
        networkRequest.mixedContentType = request.mixedContentType || "none" /* Protocol.Security.MixedContentType.None */;
        networkRequest.setReferrerPolicy(request.referrerPolicy);
        networkRequest.setIsSameSite(request.isSameSite || false);
    }
    updateNetworkRequestWithResponse(networkRequest, response) {
        if (response.url && networkRequest.url() !== response.url) {
            networkRequest.setUrl(response.url);
        }
        networkRequest.mimeType = response.mimeType;
        networkRequest.setCharset(response.charset);
        if (!networkRequest.statusCode || networkRequest.wasIntercepted()) {
            networkRequest.statusCode = response.status;
        }
        if (!networkRequest.statusText || networkRequest.wasIntercepted()) {
            networkRequest.statusText = response.statusText;
        }
        if (!networkRequest.hasExtraResponseInfo() || networkRequest.wasIntercepted()) {
            networkRequest.responseHeaders = this.headersMapToHeadersArray(response.headers);
        }
        if (response.encodedDataLength >= 0) {
            networkRequest.setTransferSize(response.encodedDataLength);
        }
        if (response.requestHeaders && !networkRequest.hasExtraRequestInfo()) {
            // TODO(http://crbug.com/1004979): Stop using response.requestHeaders and
            //   response.requestHeadersText once shared workers
            //   emit Network.*ExtraInfo events for their network #requests.
            networkRequest.setRequestHeaders(this.headersMapToHeadersArray(response.requestHeaders));
            networkRequest.setRequestHeadersText(response.requestHeadersText || '');
        }
        networkRequest.connectionReused = response.connectionReused;
        networkRequest.connectionId = String(response.connectionId);
        if (response.remoteIPAddress) {
            networkRequest.setRemoteAddress(response.remoteIPAddress, response.remotePort || -1);
        }
        if (response.fromServiceWorker) {
            networkRequest.fetchedViaServiceWorker = true;
        }
        if (response.fromDiskCache) {
            networkRequest.setFromDiskCache();
        }
        if (response.fromPrefetchCache) {
            networkRequest.setFromPrefetchCache();
        }
        if (response.fromEarlyHints) {
            networkRequest.setFromEarlyHints();
        }
        if (response.cacheStorageCacheName) {
            networkRequest.setResponseCacheStorageCacheName(response.cacheStorageCacheName);
        }
        if (response.serviceWorkerRouterInfo) {
            networkRequest.serviceWorkerRouterInfo = response.serviceWorkerRouterInfo;
        }
        if (response.responseTime) {
            networkRequest.setResponseRetrievalTime(new Date(response.responseTime));
        }
        networkRequest.timing = response.timing;
        networkRequest.protocol = response.protocol || '';
        networkRequest.alternateProtocolUsage = response.alternateProtocolUsage;
        if (response.serviceWorkerResponseSource) {
            networkRequest.setServiceWorkerResponseSource(response.serviceWorkerResponseSource);
        }
        networkRequest.setSecurityState(response.securityState);
        if (response.securityDetails) {
            networkRequest.setSecurityDetails(response.securityDetails);
        }
        const newResourceType = Common.ResourceType.ResourceType.fromMimeTypeOverride(networkRequest.mimeType);
        if (newResourceType) {
            networkRequest.setResourceType(newResourceType);
        }
        if (networkRequest.responseReceivedPromiseResolve) {
            // Anyone interested in waiting for response headers being available?
            networkRequest.responseReceivedPromiseResolve();
        }
        else {
            // If not, make sure no one will wait on it in the future.
            networkRequest.responseReceivedPromise = Promise.resolve();
        }
    }
    requestForId(id) {
        return this.#requestsById.get(id) || null;
    }
    requestForURL(url) {
        return this.#requestsByURL.get(url) || null;
    }
    requestForLoaderId(loaderId) {
        return this.#requestsByLoaderId.get(loaderId) || null;
    }
    resourceChangedPriority({ requestId, newPriority }) {
        const networkRequest = this.#requestsById.get(requestId);
        if (networkRequest) {
            networkRequest.setPriority(newPriority);
        }
    }
    signedExchangeReceived({ requestId, info }) {
        // While loading a signed exchange, a signedExchangeReceived event is sent
        // between two requestWillBeSent events.
        // 1. The first requestWillBeSent is sent while starting the navigation (or
        //    prefetching).
        // 2. This signedExchangeReceived event is sent when the browser detects the
        //    signed exchange.
        // 3. The second requestWillBeSent is sent with the generated redirect
        //    response and a new redirected request which URL is the inner request
        //    URL of the signed exchange.
        let networkRequest = this.#requestsById.get(requestId);
        // |requestId| is available only for navigation #requests. If the request was
        // sent from a renderer process for prefetching, it is not available. In the
        // case, need to fallback to look for the URL.
        // TODO(crbug/841076): Sends the request ID of prefetching to the browser
        // process and DevTools to find the matching request.
        if (!networkRequest) {
            networkRequest = this.#requestsByURL.get(info.outerResponse.url);
            if (!networkRequest) {
                return;
            }
            // Or clause is never hit, but is here because we can't use non-null assertions.
            const backendRequestId = networkRequest.backendRequestId() || requestId;
            requestId = backendRequestId;
        }
        networkRequest.setSignedExchangeInfo(info);
        networkRequest.setResourceType(Common.ResourceType.resourceTypes.SignedExchange);
        this.updateNetworkRequestWithResponse(networkRequest, info.outerResponse);
        this.updateNetworkRequest(networkRequest);
        this.getExtraInfoBuilder(requestId).addHasExtraInfo(info.hasExtraInfo);
        this.#manager.dispatchEventToListeners(Events.ResponseReceived, { request: networkRequest, response: info.outerResponse });
    }
    requestWillBeSent({ requestId, loaderId, documentURL, request, timestamp, wallTime, initiator, redirectHasExtraInfo, redirectResponse, type, frameId, hasUserGesture, }) {
        let networkRequest = this.#requestsById.get(requestId);
        if (networkRequest) {
            // FIXME: move this check to the backend.
            if (!redirectResponse) {
                return;
            }
            // If signedExchangeReceived event has already been sent for the request,
            // ignores the internally generated |redirectResponse|. The
            // |outerResponse| of SignedExchangeInfo was set to |networkRequest| in
            // signedExchangeReceived().
            if (!networkRequest.signedExchangeInfo()) {
                this.responseReceived({
                    requestId,
                    loaderId,
                    timestamp,
                    type: type || "Other" /* Protocol.Network.ResourceType.Other */,
                    response: redirectResponse,
                    hasExtraInfo: redirectHasExtraInfo,
                    frameId,
                });
            }
            networkRequest = this.appendRedirect(requestId, timestamp, request.url);
            this.#manager.dispatchEventToListeners(Events.RequestRedirected, networkRequest);
        }
        else {
            networkRequest = NetworkRequest.create(requestId, request.url, documentURL, frameId ?? null, loaderId, initiator, hasUserGesture);
            requestToManagerMap.set(networkRequest, this.#manager);
        }
        networkRequest.hasNetworkData = true;
        this.updateNetworkRequestWithRequest(networkRequest, request);
        networkRequest.setIssueTime(timestamp, wallTime);
        networkRequest.setResourceType(type ? Common.ResourceType.resourceTypes[type] : Common.ResourceType.resourceTypes.Other);
        if (request.trustTokenParams) {
            networkRequest.setTrustTokenParams(request.trustTokenParams);
        }
        const maybeTrustTokenEvent = this.#requestIdToTrustTokenEvent.get(requestId);
        if (maybeTrustTokenEvent) {
            networkRequest.setTrustTokenOperationDoneEvent(maybeTrustTokenEvent);
            this.#requestIdToTrustTokenEvent.delete(requestId);
        }
        this.getExtraInfoBuilder(requestId).addRequest(networkRequest);
        this.startNetworkRequest(networkRequest, request);
    }
    requestServedFromCache({ requestId }) {
        const networkRequest = this.#requestsById.get(requestId);
        if (!networkRequest) {
            return;
        }
        networkRequest.setFromMemoryCache();
    }
    responseReceived({ requestId, loaderId, timestamp, type, response, hasExtraInfo, frameId }) {
        const networkRequest = this.#requestsById.get(requestId);
        const lowercaseHeaders = NetworkManager.lowercaseHeaders(response.headers);
        if (!networkRequest) {
            const lastModifiedHeader = lowercaseHeaders['last-modified'];
            // We missed the requestWillBeSent.
            const eventData = {
                url: response.url,
                frameId: frameId ?? null,
                loaderId,
                resourceType: type,
                mimeType: response.mimeType,
                lastModified: lastModifiedHeader ? new Date(lastModifiedHeader) : null,
            };
            this.#manager.dispatchEventToListeners(Events.RequestUpdateDropped, eventData);
            return;
        }
        networkRequest.responseReceivedTime = timestamp;
        networkRequest.setResourceType(Common.ResourceType.resourceTypes[type]);
        this.updateNetworkRequestWithResponse(networkRequest, response);
        this.updateNetworkRequest(networkRequest);
        this.getExtraInfoBuilder(requestId).addHasExtraInfo(hasExtraInfo);
        this.#manager.dispatchEventToListeners(Events.ResponseReceived, { request: networkRequest, response });
    }
    dataReceived(event) {
        let networkRequest = this.#requestsById.get(event.requestId);
        if (!networkRequest) {
            networkRequest = this.maybeAdoptMainResourceRequest(event.requestId);
        }
        if (!networkRequest) {
            return;
        }
        networkRequest.addDataReceivedEvent(event);
        this.updateNetworkRequest(networkRequest);
    }
    loadingFinished({ requestId, timestamp: finishTime, encodedDataLength }) {
        let networkRequest = this.#requestsById.get(requestId);
        if (!networkRequest) {
            networkRequest = this.maybeAdoptMainResourceRequest(requestId);
        }
        if (!networkRequest) {
            return;
        }
        this.getExtraInfoBuilder(requestId).finished();
        this.finishNetworkRequest(networkRequest, finishTime, encodedDataLength);
        this.#manager.dispatchEventToListeners(Events.LoadingFinished, networkRequest);
    }
    loadingFailed({ requestId, timestamp: time, type: resourceType, errorText: localizedDescription, canceled, blockedReason, corsErrorStatus, }) {
        const networkRequest = this.#requestsById.get(requestId);
        if (!networkRequest) {
            return;
        }
        networkRequest.failed = true;
        networkRequest.setResourceType(Common.ResourceType.resourceTypes[resourceType]);
        networkRequest.canceled = Boolean(canceled);
        if (blockedReason) {
            networkRequest.setBlockedReason(blockedReason);
            if (blockedReason === "inspector" /* Protocol.Network.BlockedReason.Inspector */) {
                const message = i18nString(UIStrings.requestWasBlockedByDevtoolsS, { PH1: networkRequest.url() });
                this.#manager.dispatchEventToListeners(Events.MessageGenerated, { message, requestId, warning: true });
            }
        }
        if (corsErrorStatus) {
            networkRequest.setCorsErrorStatus(corsErrorStatus);
        }
        networkRequest.localizedFailDescription = localizedDescription;
        this.getExtraInfoBuilder(requestId).finished();
        this.finishNetworkRequest(networkRequest, time, -1);
    }
    webSocketCreated({ requestId, url: requestURL, initiator }) {
        const networkRequest = NetworkRequest.createForSocket(requestId, requestURL, initiator);
        requestToManagerMap.set(networkRequest, this.#manager);
        networkRequest.setResourceType(Common.ResourceType.resourceTypes.WebSocket);
        this.startNetworkRequest(networkRequest, null);
    }
    webSocketWillSendHandshakeRequest({ requestId, timestamp: time, wallTime, request }) {
        const networkRequest = this.#requestsById.get(requestId);
        if (!networkRequest) {
            return;
        }
        networkRequest.requestMethod = 'GET';
        networkRequest.setRequestHeaders(this.headersMapToHeadersArray(request.headers));
        networkRequest.setIssueTime(time, wallTime);
        this.updateNetworkRequest(networkRequest);
    }
    webSocketHandshakeResponseReceived({ requestId, timestamp: time, response }) {
        const networkRequest = this.#requestsById.get(requestId);
        if (!networkRequest) {
            return;
        }
        networkRequest.statusCode = response.status;
        networkRequest.statusText = response.statusText;
        networkRequest.responseHeaders = this.headersMapToHeadersArray(response.headers);
        networkRequest.responseHeadersText = response.headersText || '';
        if (response.requestHeaders) {
            networkRequest.setRequestHeaders(this.headersMapToHeadersArray(response.requestHeaders));
        }
        if (response.requestHeadersText) {
            networkRequest.setRequestHeadersText(response.requestHeadersText);
        }
        networkRequest.responseReceivedTime = time;
        networkRequest.protocol = 'websocket';
        this.updateNetworkRequest(networkRequest);
    }
    webSocketFrameReceived({ requestId, timestamp: time, response }) {
        const networkRequest = this.#requestsById.get(requestId);
        if (!networkRequest) {
            return;
        }
        networkRequest.addProtocolFrame(response, time, false);
        networkRequest.responseReceivedTime = time;
        this.updateNetworkRequest(networkRequest);
    }
    webSocketFrameSent({ requestId, timestamp: time, response }) {
        const networkRequest = this.#requestsById.get(requestId);
        if (!networkRequest) {
            return;
        }
        networkRequest.addProtocolFrame(response, time, true);
        networkRequest.responseReceivedTime = time;
        this.updateNetworkRequest(networkRequest);
    }
    webSocketFrameError({ requestId, timestamp: time, errorMessage }) {
        const networkRequest = this.#requestsById.get(requestId);
        if (!networkRequest) {
            return;
        }
        networkRequest.addProtocolFrameError(errorMessage, time);
        networkRequest.responseReceivedTime = time;
        this.updateNetworkRequest(networkRequest);
    }
    webSocketClosed({ requestId, timestamp: time }) {
        const networkRequest = this.#requestsById.get(requestId);
        if (!networkRequest) {
            return;
        }
        this.finishNetworkRequest(networkRequest, time, -1);
    }
    eventSourceMessageReceived({ requestId, timestamp: time, eventName, eventId, data }) {
        const networkRequest = this.#requestsById.get(requestId);
        if (!networkRequest) {
            return;
        }
        networkRequest.addEventSourceMessage(time, eventName, eventId, data);
    }
    requestIntercepted({}) {
    }
    requestWillBeSentExtraInfo({ requestId, associatedCookies, headers, clientSecurityState, connectTiming, siteHasCookieInOtherPartition }) {
        const blockedRequestCookies = [];
        const includedRequestCookies = [];
        for (const { blockedReasons, exemptionReason, cookie } of associatedCookies) {
            if (blockedReasons.length === 0) {
                includedRequestCookies.push({ exemptionReason, cookie: Cookie.fromProtocolCookie(cookie) });
            }
            else {
                blockedRequestCookies.push({ blockedReasons, cookie: Cookie.fromProtocolCookie(cookie) });
            }
        }
        const extraRequestInfo = {
            blockedRequestCookies,
            includedRequestCookies,
            requestHeaders: this.headersMapToHeadersArray(headers),
            clientSecurityState,
            connectTiming,
            siteHasCookieInOtherPartition,
        };
        this.getExtraInfoBuilder(requestId).addRequestExtraInfo(extraRequestInfo);
    }
    responseReceivedEarlyHints({ requestId, headers, }) {
        this.getExtraInfoBuilder(requestId).setEarlyHintsHeaders(this.headersMapToHeadersArray(headers));
    }
    responseReceivedExtraInfo({ requestId, blockedCookies, headers, headersText, resourceIPAddressSpace, statusCode, cookiePartitionKey, cookiePartitionKeyOpaque, exemptedCookies, }) {
        const extraResponseInfo = {
            blockedResponseCookies: blockedCookies.map(blockedCookie => ({
                blockedReasons: blockedCookie.blockedReasons,
                cookieLine: blockedCookie.cookieLine,
                cookie: blockedCookie.cookie ? Cookie.fromProtocolCookie(blockedCookie.cookie) : null,
            })),
            responseHeaders: this.headersMapToHeadersArray(headers),
            responseHeadersText: headersText,
            resourceIPAddressSpace,
            statusCode,
            cookiePartitionKey,
            cookiePartitionKeyOpaque,
            exemptedResponseCookies: exemptedCookies?.map(exemptedCookie => ({
                cookie: Cookie.fromProtocolCookie(exemptedCookie.cookie),
                cookieLine: exemptedCookie.cookieLine,
                exemptionReason: exemptedCookie.exemptionReason,
            })),
        };
        this.getExtraInfoBuilder(requestId).addResponseExtraInfo(extraResponseInfo);
    }
    getExtraInfoBuilder(requestId) {
        let builder;
        if (!this.#requestIdToExtraInfoBuilder.has(requestId)) {
            builder = new ExtraInfoBuilder();
            this.#requestIdToExtraInfoBuilder.set(requestId, builder);
        }
        else {
            builder = this.#requestIdToExtraInfoBuilder.get(requestId);
        }
        return builder;
    }
    appendRedirect(requestId, time, redirectURL) {
        const originalNetworkRequest = this.#requestsById.get(requestId);
        if (!originalNetworkRequest) {
            throw new Error(`Could not find original network request for ${requestId}`);
        }
        let redirectCount = 0;
        for (let redirect = originalNetworkRequest.redirectSource(); redirect; redirect = redirect.redirectSource()) {
            redirectCount++;
        }
        originalNetworkRequest.markAsRedirect(redirectCount);
        this.finishNetworkRequest(originalNetworkRequest, time, -1);
        const newNetworkRequest = NetworkRequest.create(requestId, redirectURL, originalNetworkRequest.documentURL, originalNetworkRequest.frameId, originalNetworkRequest.loaderId, originalNetworkRequest.initiator(), originalNetworkRequest.hasUserGesture() ?? undefined);
        requestToManagerMap.set(newNetworkRequest, this.#manager);
        newNetworkRequest.setRedirectSource(originalNetworkRequest);
        originalNetworkRequest.setRedirectDestination(newNetworkRequest);
        return newNetworkRequest;
    }
    maybeAdoptMainResourceRequest(requestId) {
        const request = MultitargetNetworkManager.instance().inflightMainResourceRequests.get(requestId);
        if (!request) {
            return null;
        }
        const oldDispatcher = NetworkManager.forRequest(request).dispatcher;
        oldDispatcher.#requestsById.delete(requestId);
        oldDispatcher.#requestsByURL.delete(request.url());
        const loaderId = request.loaderId;
        if (loaderId) {
            oldDispatcher.#requestsByLoaderId.delete(loaderId);
        }
        const builder = oldDispatcher.#requestIdToExtraInfoBuilder.get(requestId);
        oldDispatcher.#requestIdToExtraInfoBuilder.delete(requestId);
        this.#requestsById.set(requestId, request);
        this.#requestsByURL.set(request.url(), request);
        if (loaderId) {
            this.#requestsByLoaderId.set(loaderId, request);
        }
        if (builder) {
            this.#requestIdToExtraInfoBuilder.set(requestId, builder);
        }
        requestToManagerMap.set(request, this.#manager);
        return request;
    }
    startNetworkRequest(networkRequest, originalRequest) {
        this.#requestsById.set(networkRequest.requestId(), networkRequest);
        this.#requestsByURL.set(networkRequest.url(), networkRequest);
        const loaderId = networkRequest.loaderId;
        if (loaderId) {
            this.#requestsByLoaderId.set(loaderId, networkRequest);
        }
        // The following relies on the fact that loaderIds and requestIds
        // are globally unique and that the main request has them equal. If
        // loaderId is an empty string, it indicates a worker request. For the
        // request to fetch the main worker script, the request ID is the future
        // worker target ID and, therefore, it is unique.
        if (networkRequest.loaderId === networkRequest.requestId() || networkRequest.loaderId === '') {
            MultitargetNetworkManager.instance().inflightMainResourceRequests.set(networkRequest.requestId(), networkRequest);
        }
        this.#manager.dispatchEventToListeners(Events.RequestStarted, { request: networkRequest, originalRequest });
    }
    updateNetworkRequest(networkRequest) {
        this.#manager.dispatchEventToListeners(Events.RequestUpdated, networkRequest);
    }
    finishNetworkRequest(networkRequest, finishTime, encodedDataLength) {
        networkRequest.endTime = finishTime;
        networkRequest.finished = true;
        if (encodedDataLength >= 0) {
            const redirectSource = networkRequest.redirectSource();
            if (redirectSource?.signedExchangeInfo()) {
                networkRequest.setTransferSize(0);
                redirectSource.setTransferSize(encodedDataLength);
                this.updateNetworkRequest(redirectSource);
            }
            else {
                networkRequest.setTransferSize(encodedDataLength);
            }
        }
        this.#manager.dispatchEventToListeners(Events.RequestFinished, networkRequest);
        MultitargetNetworkManager.instance().inflightMainResourceRequests.delete(networkRequest.requestId());
        if (Common.Settings.Settings.instance().moduleSetting('monitoring-xhr-enabled').get() &&
            networkRequest.resourceType().category() === Common.ResourceType.resourceCategories.XHR) {
            let message;
            const failedToLoad = networkRequest.failed || networkRequest.hasErrorStatusCode();
            if (failedToLoad) {
                message = i18nString(UIStrings.sFailedLoadingSS, { PH1: networkRequest.resourceType().title(), PH2: networkRequest.requestMethod, PH3: networkRequest.url() });
            }
            else {
                message = i18nString(UIStrings.sFinishedLoadingSS, { PH1: networkRequest.resourceType().title(), PH2: networkRequest.requestMethod, PH3: networkRequest.url() });
            }
            this.#manager.dispatchEventToListeners(Events.MessageGenerated, { message, requestId: networkRequest.requestId(), warning: false });
        }
    }
    clearRequests() {
        for (const [requestId, request] of this.#requestsById) {
            if (request.finished) {
                this.#requestsById.delete(requestId);
            }
        }
        for (const [requestURL, request] of this.#requestsByURL) {
            if (request.finished) {
                this.#requestsByURL.delete(requestURL);
            }
        }
        for (const [requestLoaderId, request] of this.#requestsByLoaderId) {
            if (request.finished) {
                this.#requestsByLoaderId.delete(requestLoaderId);
            }
        }
        for (const [requestId, builder] of this.#requestIdToExtraInfoBuilder) {
            if (builder.isFinished()) {
                this.#requestIdToExtraInfoBuilder.delete(requestId);
            }
        }
    }
    webTransportCreated({ transportId, url: requestURL, timestamp: time, initiator }) {
        const networkRequest = NetworkRequest.createForSocket(transportId, requestURL, initiator);
        networkRequest.hasNetworkData = true;
        requestToManagerMap.set(networkRequest, this.#manager);
        networkRequest.setResourceType(Common.ResourceType.resourceTypes.WebTransport);
        networkRequest.setIssueTime(time, 0);
        // TODO(yoichio): Add appropreate events to address abort cases.
        this.startNetworkRequest(networkRequest, null);
    }
    webTransportConnectionEstablished({ transportId, timestamp: time }) {
        const networkRequest = this.#requestsById.get(transportId);
        if (!networkRequest) {
            return;
        }
        // This dummy deltas are needed to show this request as being
        // downloaded(blue) given typical WebTransport is kept for a while.
        // TODO(yoichio): Add appropreate events to fix these dummy datas.
        // DNS lookup?
        networkRequest.responseReceivedTime = time;
        networkRequest.endTime = time + 0.001;
        this.updateNetworkRequest(networkRequest);
    }
    webTransportClosed({ transportId, timestamp: time }) {
        const networkRequest = this.#requestsById.get(transportId);
        if (!networkRequest) {
            return;
        }
        networkRequest.endTime = time;
        this.finishNetworkRequest(networkRequest, time, 0);
    }
    directTCPSocketCreated(event) {
        const requestURL = this.concatHostPort(event.remoteAddr, event.remotePort);
        const networkRequest = NetworkRequest.createForSocket(event.identifier, requestURL, event.initiator);
        networkRequest.hasNetworkData = true;
        networkRequest.setRemoteAddress(event.remoteAddr, event.remotePort);
        networkRequest.protocol = i18n.i18n.lockedString('tcp');
        networkRequest.statusText = i18nString(UIStrings.directSocketStatusOpening);
        networkRequest.directSocketInfo = {
            type: DirectSocketType.TCP,
            status: DirectSocketStatus.OPENING,
            createOptions: {
                remoteAddr: event.remoteAddr,
                remotePort: event.remotePort,
                noDelay: event.options.noDelay,
                keepAliveDelay: event.options.keepAliveDelay,
                sendBufferSize: event.options.sendBufferSize,
                receiveBufferSize: event.options.receiveBufferSize,
                dnsQueryType: event.options.dnsQueryType,
            }
        };
        networkRequest.setResourceType(Common.ResourceType.resourceTypes.DirectSocket);
        networkRequest.setIssueTime(event.timestamp, event.timestamp);
        requestToManagerMap.set(networkRequest, this.#manager);
        this.startNetworkRequest(networkRequest, null);
    }
    directTCPSocketOpened(event) {
        const networkRequest = this.#requestsById.get(event.identifier);
        if (!networkRequest?.directSocketInfo) {
            return;
        }
        networkRequest.responseReceivedTime = event.timestamp;
        networkRequest.directSocketInfo.status = DirectSocketStatus.OPEN;
        networkRequest.statusText = i18nString(UIStrings.directSocketStatusOpen);
        networkRequest.directSocketInfo.openInfo = {
            remoteAddr: event.remoteAddr,
            remotePort: event.remotePort,
            localAddr: event.localAddr,
            localPort: event.localPort,
        };
        networkRequest.setRemoteAddress(event.remoteAddr, event.remotePort);
        const requestURL = this.concatHostPort(event.remoteAddr, event.remotePort);
        networkRequest.setUrl(requestURL);
        this.updateNetworkRequest(networkRequest);
    }
    directTCPSocketAborted(event) {
        const networkRequest = this.#requestsById.get(event.identifier);
        if (!networkRequest?.directSocketInfo) {
            return;
        }
        networkRequest.failed = true;
        networkRequest.directSocketInfo.status = DirectSocketStatus.ABORTED;
        networkRequest.statusText = i18nString(UIStrings.directSocketStatusAborted);
        networkRequest.directSocketInfo.errorMessage = event.errorMessage;
        this.finishNetworkRequest(networkRequest, event.timestamp, 0);
    }
    directTCPSocketClosed(event) {
        const networkRequest = this.#requestsById.get(event.identifier);
        if (!networkRequest?.directSocketInfo) {
            return;
        }
        networkRequest.statusText = i18nString(UIStrings.directSocketStatusClosed);
        networkRequest.directSocketInfo.status = DirectSocketStatus.CLOSED;
        this.finishNetworkRequest(networkRequest, event.timestamp, 0);
    }
    directTCPSocketChunkSent(event) {
        const networkRequest = this.#requestsById.get(event.identifier);
        if (!networkRequest) {
            return;
        }
        networkRequest.addDirectSocketChunk({
            data: event.data,
            type: DirectSocketChunkType.SEND,
            timestamp: event.timestamp,
        });
        networkRequest.responseReceivedTime = event.timestamp;
        this.updateNetworkRequest(networkRequest);
    }
    directTCPSocketChunkReceived(event) {
        const networkRequest = this.#requestsById.get(event.identifier);
        if (!networkRequest) {
            return;
        }
        networkRequest.addDirectSocketChunk({
            data: event.data,
            type: DirectSocketChunkType.RECEIVE,
            timestamp: event.timestamp,
        });
        networkRequest.responseReceivedTime = event.timestamp;
        this.updateNetworkRequest(networkRequest);
    }
    directUDPSocketCreated(event) {
        let requestURL = '';
        let type;
        if (event.options.remoteAddr && event.options.remotePort) {
            requestURL = this.concatHostPort(event.options.remoteAddr, event.options.remotePort);
            type = DirectSocketType.UDP_CONNECTED;
        }
        else if (event.options.localAddr) {
            requestURL = this.concatHostPort(event.options.localAddr, event.options.localPort);
            type = DirectSocketType.UDP_BOUND;
        }
        else {
            // Must be present in a valid command if remoteAddr
            // is not specified.
            return;
        }
        const networkRequest = NetworkRequest.createForSocket(event.identifier, requestURL, event.initiator);
        networkRequest.hasNetworkData = true;
        if (event.options.remoteAddr && event.options.remotePort) {
            networkRequest.setRemoteAddress(event.options.remoteAddr, event.options.remotePort);
        }
        networkRequest.protocol = i18n.i18n.lockedString('udp');
        networkRequest.statusText = i18nString(UIStrings.directSocketStatusOpening);
        networkRequest.directSocketInfo = {
            type,
            status: DirectSocketStatus.OPENING,
            createOptions: {
                remoteAddr: event.options.remoteAddr,
                remotePort: event.options.remotePort,
                localAddr: event.options.localAddr,
                localPort: event.options.localPort,
                sendBufferSize: event.options.sendBufferSize,
                receiveBufferSize: event.options.receiveBufferSize,
                dnsQueryType: event.options.dnsQueryType,
            }
        };
        networkRequest.setResourceType(Common.ResourceType.resourceTypes.DirectSocket);
        networkRequest.setIssueTime(event.timestamp, event.timestamp);
        requestToManagerMap.set(networkRequest, this.#manager);
        this.startNetworkRequest(networkRequest, null);
    }
    directUDPSocketOpened(event) {
        const networkRequest = this.#requestsById.get(event.identifier);
        if (!networkRequest?.directSocketInfo) {
            return;
        }
        let requestURL;
        if (networkRequest.directSocketInfo.type === DirectSocketType.UDP_CONNECTED) {
            if (!event.remoteAddr || !event.remotePort) {
                // Connected socket must have remoteAdd and remotePort.
                return;
            }
            networkRequest.setRemoteAddress(event.remoteAddr, event.remotePort);
            requestURL = this.concatHostPort(event.remoteAddr, event.remotePort);
        }
        else {
            requestURL = this.concatHostPort(event.localAddr, event.localPort);
        }
        networkRequest.setUrl(requestURL);
        networkRequest.responseReceivedTime = event.timestamp;
        networkRequest.directSocketInfo.status = DirectSocketStatus.OPEN;
        networkRequest.statusText = i18nString(UIStrings.directSocketStatusOpen);
        networkRequest.directSocketInfo.openInfo = {
            remoteAddr: event.remoteAddr,
            remotePort: event.remotePort,
            localAddr: event.localAddr,
            localPort: event.localPort,
        };
        this.updateNetworkRequest(networkRequest);
    }
    directUDPSocketAborted(event) {
        const networkRequest = this.#requestsById.get(event.identifier);
        if (!networkRequest?.directSocketInfo) {
            return;
        }
        networkRequest.failed = true;
        networkRequest.directSocketInfo.status = DirectSocketStatus.ABORTED;
        networkRequest.statusText = i18nString(UIStrings.directSocketStatusAborted);
        networkRequest.directSocketInfo.errorMessage = event.errorMessage;
        this.finishNetworkRequest(networkRequest, event.timestamp, 0);
    }
    directUDPSocketClosed(event) {
        const networkRequest = this.#requestsById.get(event.identifier);
        if (!networkRequest?.directSocketInfo) {
            return;
        }
        networkRequest.statusText = i18nString(UIStrings.directSocketStatusClosed);
        networkRequest.directSocketInfo.status = DirectSocketStatus.CLOSED;
        this.finishNetworkRequest(networkRequest, event.timestamp, 0);
    }
    directUDPSocketChunkSent(event) {
        const networkRequest = this.#requestsById.get(event.identifier);
        if (!networkRequest) {
            return;
        }
        networkRequest.addDirectSocketChunk({
            data: event.message.data,
            type: DirectSocketChunkType.SEND,
            timestamp: event.timestamp,
            remoteAddress: event.message.remoteAddr,
            remotePort: event.message.remotePort
        });
        networkRequest.responseReceivedTime = event.timestamp;
        this.updateNetworkRequest(networkRequest);
    }
    directUDPSocketChunkReceived(event) {
        const networkRequest = this.#requestsById.get(event.identifier);
        if (!networkRequest) {
            return;
        }
        networkRequest.addDirectSocketChunk({
            data: event.message.data,
            type: DirectSocketChunkType.RECEIVE,
            timestamp: event.timestamp,
            remoteAddress: event.message.remoteAddr,
            remotePort: event.message.remotePort
        });
        networkRequest.responseReceivedTime = event.timestamp;
        this.updateNetworkRequest(networkRequest);
    }
    trustTokenOperationDone(event) {
        const request = this.#requestsById.get(event.requestId);
        if (!request) {
            this.#requestIdToTrustTokenEvent.set(event.requestId, event);
            return;
        }
        request.setTrustTokenOperationDoneEvent(event);
    }
    subresourceWebBundleMetadataReceived({ requestId, urls }) {
        const extraInfoBuilder = this.getExtraInfoBuilder(requestId);
        extraInfoBuilder.setWebBundleInfo({ resourceUrls: urls });
        const finalRequest = extraInfoBuilder.finalRequest();
        if (finalRequest) {
            this.updateNetworkRequest(finalRequest);
        }
    }
    subresourceWebBundleMetadataError({ requestId, errorMessage }) {
        const extraInfoBuilder = this.getExtraInfoBuilder(requestId);
        extraInfoBuilder.setWebBundleInfo({ errorMessage });
        const finalRequest = extraInfoBuilder.finalRequest();
        if (finalRequest) {
            this.updateNetworkRequest(finalRequest);
        }
    }
    subresourceWebBundleInnerResponseParsed({ innerRequestId, bundleRequestId }) {
        const extraInfoBuilder = this.getExtraInfoBuilder(innerRequestId);
        extraInfoBuilder.setWebBundleInnerRequestInfo({ bundleRequestId });
        const finalRequest = extraInfoBuilder.finalRequest();
        if (finalRequest) {
            this.updateNetworkRequest(finalRequest);
        }
    }
    subresourceWebBundleInnerResponseError({ innerRequestId, errorMessage }) {
        const extraInfoBuilder = this.getExtraInfoBuilder(innerRequestId);
        extraInfoBuilder.setWebBundleInnerRequestInfo({ errorMessage });
        const finalRequest = extraInfoBuilder.finalRequest();
        if (finalRequest) {
            this.updateNetworkRequest(finalRequest);
        }
    }
    reportingApiReportAdded(data) {
        this.#manager.dispatchEventToListeners(Events.ReportingApiReportAdded, data.report);
    }
    reportingApiReportUpdated(data) {
        this.#manager.dispatchEventToListeners(Events.ReportingApiReportUpdated, data.report);
    }
    reportingApiEndpointsChangedForOrigin(data) {
        this.#manager.dispatchEventToListeners(Events.ReportingApiEndpointsChangedForOrigin, data);
    }
    policyUpdated() {
    }
    /**
     * @deprecated
     * This method is only kept for usage in a web test.
     */
    createNetworkRequest(requestId, frameId, loaderId, url, documentURL, initiator) {
        const request = NetworkRequest.create(requestId, url, documentURL, frameId, loaderId, initiator);
        requestToManagerMap.set(request, this.#manager);
        return request;
    }
    concatHostPort(host, port) {
        if (!port || port === 0) {
            return host;
        }
        return `${host}:${port}`;
    }
}
let multiTargetNetworkManagerInstance;
export class MultitargetNetworkManager extends Common.ObjectWrapper.ObjectWrapper {
    #userAgentOverride = '';
    #userAgentMetadataOverride = null;
    #customAcceptedEncodings = null;
    #networkAgents = new Set();
    #fetchAgents = new Set();
    inflightMainResourceRequests = new Map();
    #networkConditions = NoThrottlingConditions;
    #updatingInterceptionPatternsPromise = null;
    #blockingEnabledSetting = Common.Settings.Settings.instance().moduleSetting('request-blocking-enabled');
    #blockedPatternsSetting = Common.Settings.Settings.instance().createSetting('network-blocked-patterns', []);
    #effectiveBlockedURLs = [];
    #urlsForRequestInterceptor = new Platform.MapUtilities.Multimap();
    #extraHeaders;
    #customUserAgent;
    constructor() {
        super();
        // TODO(allada) Remove these and merge it with request interception.
        const blockedPatternChanged = () => {
            this.updateBlockedPatterns();
            this.dispatchEventToListeners("BlockedPatternsChanged" /* MultitargetNetworkManager.Events.BLOCKED_PATTERNS_CHANGED */);
        };
        this.#blockingEnabledSetting.addChangeListener(blockedPatternChanged);
        this.#blockedPatternsSetting.addChangeListener(blockedPatternChanged);
        this.updateBlockedPatterns();
        TargetManager.instance().observeModels(NetworkManager, this);
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!multiTargetNetworkManagerInstance || forceNew) {
            multiTargetNetworkManagerInstance = new MultitargetNetworkManager();
        }
        return multiTargetNetworkManagerInstance;
    }
    static dispose() {
        multiTargetNetworkManagerInstance = null;
    }
    static patchUserAgentWithChromeVersion(uaString) {
        // Patches Chrome/ChrOS version from user #agent ("1.2.3.4" when user #agent is: "Chrome/1.2.3.4").
        // Otherwise, ignore it. This assumes additional appVersions appear after the Chrome version.
        const chromeVersion = Root.Runtime.getChromeVersion();
        if (chromeVersion.length > 0) {
            // "1.2.3.4" becomes "1.0.100.0"
            const additionalAppVersion = chromeVersion.split('.', 1)[0] + '.0.100.0';
            return Platform.StringUtilities.sprintf(uaString, chromeVersion, additionalAppVersion);
        }
        return uaString;
    }
    static patchUserAgentMetadataWithChromeVersion(userAgentMetadata) {
        // Patches Chrome/ChrOS version from user #agent metadata ("1.2.3.4" when user #agent is: "Chrome/1.2.3.4").
        // Otherwise, ignore it. This assumes additional appVersions appear after the Chrome version.
        if (!userAgentMetadata.brands) {
            return;
        }
        const chromeVersion = Root.Runtime.getChromeVersion();
        if (chromeVersion.length === 0) {
            return;
        }
        const majorVersion = chromeVersion.split('.', 1)[0];
        for (const brand of userAgentMetadata.brands) {
            if (brand.version.includes('%s')) {
                brand.version = Platform.StringUtilities.sprintf(brand.version, majorVersion);
            }
        }
        if (userAgentMetadata.fullVersion) {
            if (userAgentMetadata.fullVersion.includes('%s')) {
                userAgentMetadata.fullVersion = Platform.StringUtilities.sprintf(userAgentMetadata.fullVersion, chromeVersion);
            }
        }
    }
    modelAdded(networkManager) {
        const networkAgent = networkManager.target().networkAgent();
        const fetchAgent = networkManager.target().fetchAgent();
        if (this.#extraHeaders) {
            void networkAgent.invoke_setExtraHTTPHeaders({ headers: this.#extraHeaders });
        }
        if (this.currentUserAgent()) {
            void networkAgent.invoke_setUserAgentOverride({ userAgent: this.currentUserAgent(), userAgentMetadata: this.#userAgentMetadataOverride || undefined });
        }
        if (this.#effectiveBlockedURLs.length) {
            void networkAgent.invoke_setBlockedURLs({ urls: this.#effectiveBlockedURLs });
        }
        if (this.isIntercepting()) {
            void fetchAgent.invoke_enable({ patterns: this.#urlsForRequestInterceptor.valuesArray() });
        }
        if (this.#customAcceptedEncodings === null) {
            void networkAgent.invoke_clearAcceptedEncodingsOverride();
        }
        else {
            void networkAgent.invoke_setAcceptedEncodings({ encodings: this.#customAcceptedEncodings });
        }
        this.#networkAgents.add(networkAgent);
        this.#fetchAgents.add(fetchAgent);
        if (this.isThrottling()) {
            this.updateNetworkConditions(networkAgent);
        }
    }
    modelRemoved(networkManager) {
        for (const entry of this.inflightMainResourceRequests) {
            const manager = NetworkManager.forRequest((entry[1]));
            if (manager !== networkManager) {
                continue;
            }
            this.inflightMainResourceRequests.delete((entry[0]));
        }
        this.#networkAgents.delete(networkManager.target().networkAgent());
        this.#fetchAgents.delete(networkManager.target().fetchAgent());
    }
    isThrottling() {
        return this.#networkConditions.download >= 0 || this.#networkConditions.upload >= 0 ||
            this.#networkConditions.latency > 0;
    }
    isOffline() {
        return !this.#networkConditions.download && !this.#networkConditions.upload;
    }
    setNetworkConditions(conditions) {
        this.#networkConditions = conditions;
        for (const agent of this.#networkAgents) {
            this.updateNetworkConditions(agent);
        }
        this.dispatchEventToListeners("ConditionsChanged" /* MultitargetNetworkManager.Events.CONDITIONS_CHANGED */);
    }
    networkConditions() {
        return this.#networkConditions;
    }
    updateNetworkConditions(networkAgent) {
        const conditions = this.#networkConditions;
        if (!this.isThrottling()) {
            void networkAgent.invoke_emulateNetworkConditions({
                offline: false,
                latency: 0,
                downloadThroughput: 0,
                uploadThroughput: 0,
            });
        }
        else {
            void networkAgent.invoke_emulateNetworkConditions({
                offline: this.isOffline(),
                latency: conditions.latency,
                downloadThroughput: conditions.download < 0 ? 0 : conditions.download,
                uploadThroughput: conditions.upload < 0 ? 0 : conditions.upload,
                packetLoss: (conditions.packetLoss ?? 0) < 0 ? 0 : conditions.packetLoss,
                packetQueueLength: conditions.packetQueueLength,
                packetReordering: conditions.packetReordering,
                connectionType: NetworkManager.connectionType(conditions),
            });
        }
    }
    setExtraHTTPHeaders(headers) {
        this.#extraHeaders = headers;
        for (const agent of this.#networkAgents) {
            void agent.invoke_setExtraHTTPHeaders({ headers: this.#extraHeaders });
        }
    }
    currentUserAgent() {
        return this.#customUserAgent ? this.#customUserAgent : this.#userAgentOverride;
    }
    updateUserAgentOverride() {
        const userAgent = this.currentUserAgent();
        for (const agent of this.#networkAgents) {
            void agent.invoke_setUserAgentOverride({ userAgent, userAgentMetadata: this.#userAgentMetadataOverride || undefined });
        }
    }
    setUserAgentOverride(userAgent, userAgentMetadataOverride) {
        const uaChanged = (this.#userAgentOverride !== userAgent);
        this.#userAgentOverride = userAgent;
        if (!this.#customUserAgent) {
            this.#userAgentMetadataOverride = userAgentMetadataOverride;
            this.updateUserAgentOverride();
        }
        else {
            this.#userAgentMetadataOverride = null;
        }
        if (uaChanged) {
            this.dispatchEventToListeners("UserAgentChanged" /* MultitargetNetworkManager.Events.USER_AGENT_CHANGED */);
        }
    }
    setCustomUserAgentOverride(userAgent, userAgentMetadataOverride = null) {
        this.#customUserAgent = userAgent;
        this.#userAgentMetadataOverride = userAgentMetadataOverride;
        this.updateUserAgentOverride();
    }
    setCustomAcceptedEncodingsOverride(acceptedEncodings) {
        this.#customAcceptedEncodings = acceptedEncodings;
        this.updateAcceptedEncodingsOverride();
        this.dispatchEventToListeners("AcceptedEncodingsChanged" /* MultitargetNetworkManager.Events.ACCEPTED_ENCODINGS_CHANGED */);
    }
    clearCustomAcceptedEncodingsOverride() {
        this.#customAcceptedEncodings = null;
        this.updateAcceptedEncodingsOverride();
        this.dispatchEventToListeners("AcceptedEncodingsChanged" /* MultitargetNetworkManager.Events.ACCEPTED_ENCODINGS_CHANGED */);
    }
    isAcceptedEncodingOverrideSet() {
        return this.#customAcceptedEncodings !== null;
    }
    updateAcceptedEncodingsOverride() {
        const customAcceptedEncodings = this.#customAcceptedEncodings;
        for (const agent of this.#networkAgents) {
            if (customAcceptedEncodings === null) {
                void agent.invoke_clearAcceptedEncodingsOverride();
            }
            else {
                void agent.invoke_setAcceptedEncodings({ encodings: customAcceptedEncodings });
            }
        }
    }
    // TODO(allada) Move all request blocking into interception and let view manage blocking.
    blockedPatterns() {
        return this.#blockedPatternsSetting.get().slice();
    }
    blockingEnabled() {
        return this.#blockingEnabledSetting.get();
    }
    isBlocking() {
        return Boolean(this.#effectiveBlockedURLs.length);
    }
    setBlockedPatterns(patterns) {
        this.#blockedPatternsSetting.set(patterns);
    }
    setBlockingEnabled(enabled) {
        if (this.#blockingEnabledSetting.get() === enabled) {
            return;
        }
        this.#blockingEnabledSetting.set(enabled);
    }
    updateBlockedPatterns() {
        const urls = [];
        if (this.#blockingEnabledSetting.get()) {
            for (const pattern of this.#blockedPatternsSetting.get()) {
                if (pattern.enabled) {
                    urls.push(pattern.url);
                }
            }
        }
        if (!urls.length && !this.#effectiveBlockedURLs.length) {
            return;
        }
        this.#effectiveBlockedURLs = urls;
        for (const agent of this.#networkAgents) {
            void agent.invoke_setBlockedURLs({ urls: this.#effectiveBlockedURLs });
        }
    }
    isIntercepting() {
        return Boolean(this.#urlsForRequestInterceptor.size);
    }
    setInterceptionHandlerForPatterns(patterns, requestInterceptor) {
        // Note: requestInterceptors may receive interception #requests for patterns they did not subscribe to.
        this.#urlsForRequestInterceptor.deleteAll(requestInterceptor);
        for (const newPattern of patterns) {
            this.#urlsForRequestInterceptor.set(requestInterceptor, newPattern);
        }
        return this.updateInterceptionPatternsOnNextTick();
    }
    updateInterceptionPatternsOnNextTick() {
        // This is used so we can register and unregister patterns in loops without sending lots of protocol messages.
        if (!this.#updatingInterceptionPatternsPromise) {
            this.#updatingInterceptionPatternsPromise = Promise.resolve().then(this.updateInterceptionPatterns.bind(this));
        }
        return this.#updatingInterceptionPatternsPromise;
    }
    async updateInterceptionPatterns() {
        if (!Common.Settings.Settings.instance().moduleSetting('cache-disabled').get()) {
            Common.Settings.Settings.instance().moduleSetting('cache-disabled').set(true);
        }
        this.#updatingInterceptionPatternsPromise = null;
        const promises = [];
        for (const agent of this.#fetchAgents) {
            promises.push(agent.invoke_enable({ patterns: this.#urlsForRequestInterceptor.valuesArray() }));
        }
        this.dispatchEventToListeners("InterceptorsChanged" /* MultitargetNetworkManager.Events.INTERCEPTORS_CHANGED */);
        await Promise.all(promises);
    }
    async requestIntercepted(interceptedRequest) {
        for (const requestInterceptor of this.#urlsForRequestInterceptor.keysArray()) {
            await requestInterceptor(interceptedRequest);
            if (interceptedRequest.hasResponded() && interceptedRequest.networkRequest) {
                this.dispatchEventToListeners("RequestIntercepted" /* MultitargetNetworkManager.Events.REQUEST_INTERCEPTED */, interceptedRequest.networkRequest.requestId());
                return;
            }
        }
        if (!interceptedRequest.hasResponded()) {
            interceptedRequest.continueRequestWithoutChange();
        }
    }
    clearBrowserCache() {
        for (const agent of this.#networkAgents) {
            void agent.invoke_clearBrowserCache();
        }
    }
    clearBrowserCookies() {
        for (const agent of this.#networkAgents) {
            void agent.invoke_clearBrowserCookies();
        }
    }
    async getCertificate(origin) {
        const target = TargetManager.instance().primaryPageTarget();
        if (!target) {
            return [];
        }
        const certificate = await target.networkAgent().invoke_getCertificate({ origin });
        if (!certificate) {
            return [];
        }
        return certificate.tableNames;
    }
    async loadResource(url) {
        const headers = {};
        const currentUserAgent = this.currentUserAgent();
        if (currentUserAgent) {
            headers['User-Agent'] = currentUserAgent;
        }
        if (Common.Settings.Settings.instance().moduleSetting('cache-disabled').get()) {
            headers['Cache-Control'] = 'no-cache';
        }
        const allowRemoteFilePaths = Common.Settings.Settings.instance().moduleSetting('network.enable-remote-file-loading').get();
        return await new Promise(resolve => Host.ResourceLoader.load(url, headers, (success, _responseHeaders, content, errorDescription) => {
            resolve({ success, content, errorDescription });
        }, allowRemoteFilePaths));
    }
}
export class InterceptedRequest {
    #fetchAgent;
    #hasResponded = false;
    request;
    resourceType;
    responseStatusCode;
    responseHeaders;
    requestId;
    networkRequest;
    constructor(fetchAgent, request, resourceType, requestId, networkRequest, responseStatusCode, responseHeaders) {
        this.#fetchAgent = fetchAgent;
        this.request = request;
        this.resourceType = resourceType;
        this.responseStatusCode = responseStatusCode;
        this.responseHeaders = responseHeaders;
        this.requestId = requestId;
        this.networkRequest = networkRequest;
    }
    hasResponded() {
        return this.#hasResponded;
    }
    static mergeSetCookieHeaders(originalSetCookieHeaders, setCookieHeadersFromOverrides) {
        // Generates a map containing the `set-cookie` headers. Valid `set-cookie`
        // headers are stored by the cookie name. Malformed `set-cookie` headers are
        // stored by the whole header value. Duplicates are allowed.
        const generateHeaderMap = (headers) => {
            const result = new Map();
            for (const header of headers) {
                // The regex matches cookie headers of the form '<header-name>=<header-value>'.
                // <header-name> is a token as defined in https://www.rfc-editor.org/rfc/rfc9110.html#name-tokens.
                // The shape of <header-value> is not being validated at all here.
                const match = header.value.match(/^([a-zA-Z0-9!#$%&'*+.^_`|~-]+=)(.*)$/);
                if (match) {
                    if (result.has(match[1])) {
                        result.get(match[1])?.push(header.value);
                    }
                    else {
                        result.set(match[1], [header.value]);
                    }
                }
                else if (result.has(header.value)) {
                    result.get(header.value)?.push(header.value);
                }
                else {
                    result.set(header.value, [header.value]);
                }
            }
            return result;
        };
        const originalHeadersMap = generateHeaderMap(originalSetCookieHeaders);
        const overridesHeaderMap = generateHeaderMap(setCookieHeadersFromOverrides);
        // Iterate over original headers. If the same key is found among the
        // overrides, use those instead.
        const mergedHeaders = [];
        for (const [key, headerValues] of originalHeadersMap) {
            if (overridesHeaderMap.has(key)) {
                for (const headerValue of overridesHeaderMap.get(key) || []) {
                    mergedHeaders.push({ name: 'set-cookie', value: headerValue });
                }
            }
            else {
                for (const headerValue of headerValues) {
                    mergedHeaders.push({ name: 'set-cookie', value: headerValue });
                }
            }
        }
        // Finally add all overrides which have not been added yet.
        for (const [key, headerValues] of overridesHeaderMap) {
            if (originalHeadersMap.has(key)) {
                continue;
            }
            for (const headerValue of headerValues) {
                mergedHeaders.push({ name: 'set-cookie', value: headerValue });
            }
        }
        return mergedHeaders;
    }
    async continueRequestWithContent(contentBlob, encoded, responseHeaders, isBodyOverridden) {
        this.#hasResponded = true;
        const body = encoded ? await contentBlob.text() : await Common.Base64.encode(contentBlob).catch(err => {
            console.error(err);
            return '';
        });
        const responseCode = isBodyOverridden ? 200 : (this.responseStatusCode || 200);
        if (this.networkRequest) {
            const originalSetCookieHeaders = this.networkRequest?.originalResponseHeaders.filter(header => header.name === 'set-cookie') || [];
            const setCookieHeadersFromOverrides = responseHeaders.filter(header => header.name === 'set-cookie');
            this.networkRequest.setCookieHeaders =
                InterceptedRequest.mergeSetCookieHeaders(originalSetCookieHeaders, setCookieHeadersFromOverrides);
            this.networkRequest.hasOverriddenContent = isBodyOverridden;
        }
        void this.#fetchAgent.invoke_fulfillRequest({ requestId: this.requestId, responseCode, body, responseHeaders });
        MultitargetNetworkManager.instance().dispatchEventToListeners("RequestFulfilled" /* MultitargetNetworkManager.Events.REQUEST_FULFILLED */, this.request.url);
    }
    continueRequestWithoutChange() {
        console.assert(!this.#hasResponded);
        this.#hasResponded = true;
        void this.#fetchAgent.invoke_continueRequest({ requestId: this.requestId });
    }
    async responseBody() {
        const response = await this.#fetchAgent.invoke_getResponseBody({ requestId: this.requestId });
        const error = response.getError();
        if (error) {
            return { error };
        }
        const { mimeType, charset } = this.getMimeTypeAndCharset();
        return new TextUtils.ContentData.ContentData(response.body, response.base64Encoded, mimeType ?? 'application/octet-stream', charset ?? undefined);
    }
    isRedirect() {
        return this.responseStatusCode !== undefined && this.responseStatusCode >= 300 && this.responseStatusCode < 400;
    }
    /**
     * Tries to determine the MIME type and charset for this intercepted request.
     * Looks at the intercepted response headers first (for Content-Type header), then
     * checks the `NetworkRequest` if we have one.
     */
    getMimeTypeAndCharset() {
        for (const header of this.responseHeaders ?? []) {
            if (header.name.toLowerCase() === 'content-type') {
                return Platform.MimeType.parseContentType(header.value);
            }
        }
        const mimeType = this.networkRequest?.mimeType ?? null;
        const charset = this.networkRequest?.charset() ?? null;
        return { mimeType, charset };
    }
}
/**
 * Helper class to match #requests created from requestWillBeSent with
 * requestWillBeSentExtraInfo and responseReceivedExtraInfo when they have the
 * same requestId due to redirects.
 */
class ExtraInfoBuilder {
    #requests = [];
    #responseExtraInfoFlag = [];
    #requestExtraInfos = [];
    #responseExtraInfos = [];
    #responseEarlyHintsHeaders = [];
    #finished = false;
    #webBundleInfo = null;
    #webBundleInnerRequestInfo = null;
    addRequest(req) {
        this.#requests.push(req);
        this.sync(this.#requests.length - 1);
    }
    addHasExtraInfo(hasExtraInfo) {
        this.#responseExtraInfoFlag.push(hasExtraInfo);
        // This comes in response, so it can't come before request or after next
        // request in the redirect chain.
        console.assert(this.#requests.length === this.#responseExtraInfoFlag.length, 'request/response count mismatch');
        if (!hasExtraInfo) {
            // We may potentially have gotten extra infos from the next redirect
            // request already. Account for that by inserting null for missing
            // extra infos at current position.
            this.#requestExtraInfos.splice(this.#requests.length - 1, 0, null);
            this.#responseExtraInfos.splice(this.#requests.length - 1, 0, null);
        }
        this.sync(this.#requests.length - 1);
    }
    addRequestExtraInfo(info) {
        this.#requestExtraInfos.push(info);
        this.sync(this.#requestExtraInfos.length - 1);
    }
    addResponseExtraInfo(info) {
        this.#responseExtraInfos.push(info);
        this.sync(this.#responseExtraInfos.length - 1);
    }
    setEarlyHintsHeaders(earlyHintsHeaders) {
        this.#responseEarlyHintsHeaders = earlyHintsHeaders;
        this.updateFinalRequest();
    }
    setWebBundleInfo(info) {
        this.#webBundleInfo = info;
        this.updateFinalRequest();
    }
    setWebBundleInnerRequestInfo(info) {
        this.#webBundleInnerRequestInfo = info;
        this.updateFinalRequest();
    }
    finished() {
        this.#finished = true;
        // We may have missed responseReceived event in case of failure.
        // That said, the ExtraInfo events still may be here, so mark them
        // as present. Event if they are not, this is harmless.
        // TODO(caseq): consider if we need to report hasExtraInfo in the
        // loadingFailed event.
        if (this.#responseExtraInfoFlag.length < this.#requests.length) {
            this.#responseExtraInfoFlag.push(true);
            this.sync(this.#responseExtraInfoFlag.length - 1);
        }
        console.assert(this.#requests.length === this.#responseExtraInfoFlag.length, 'request/response count mismatch when request finished');
        this.updateFinalRequest();
    }
    isFinished() {
        return this.#finished;
    }
    sync(index) {
        const req = this.#requests[index];
        if (!req) {
            return;
        }
        // No response yet, so we don't know if extra info would
        // be there, bail out for now.
        if (index >= this.#responseExtraInfoFlag.length) {
            return;
        }
        if (!this.#responseExtraInfoFlag[index]) {
            return;
        }
        const requestExtraInfo = this.#requestExtraInfos[index];
        if (requestExtraInfo) {
            req.addExtraRequestInfo(requestExtraInfo);
            this.#requestExtraInfos[index] = null;
        }
        const responseExtraInfo = this.#responseExtraInfos[index];
        if (responseExtraInfo) {
            req.addExtraResponseInfo(responseExtraInfo);
            this.#responseExtraInfos[index] = null;
        }
    }
    finalRequest() {
        if (!this.#finished) {
            return null;
        }
        return this.#requests[this.#requests.length - 1] || null;
    }
    updateFinalRequest() {
        if (!this.#finished) {
            return;
        }
        const finalRequest = this.finalRequest();
        finalRequest?.setWebBundleInfo(this.#webBundleInfo);
        finalRequest?.setWebBundleInnerRequestInfo(this.#webBundleInnerRequestInfo);
        finalRequest?.setEarlyHintsHeaders(this.#responseEarlyHintsHeaders);
    }
}
SDKModel.register(NetworkManager, { capabilities: 16 /* Capability.NETWORK */, autostart: true });
export function networkConditionsEqual(first, second) {
    // Caution: titles might be different function instances, which produce
    // the same value.
    // We prefer to use the i18nTitleKey to prevent against locale changes or
    // UIString changes that might change the value vs what the user has stored
    // locally.
    const firstTitle = first.i18nTitleKey || (typeof first.title === 'function' ? first.title() : first.title);
    const secondTitle = second.i18nTitleKey || (typeof second.title === 'function' ? second.title() : second.title);
    return second.download === first.download && second.upload === first.upload && second.latency === first.latency &&
        first.packetLoss === second.packetLoss && first.packetQueueLength === second.packetQueueLength &&
        first.packetReordering === second.packetReordering && secondTitle === firstTitle;
}
export const THROTTLING_CONDITIONS_LOOKUP = new Map([
    ["NO_THROTTLING" /* PredefinedThrottlingConditionKey.NO_THROTTLING */, NoThrottlingConditions],
    ["OFFLINE" /* PredefinedThrottlingConditionKey.OFFLINE */, OfflineConditions],
    ["SPEED_3G" /* PredefinedThrottlingConditionKey.SPEED_3G */, Slow3GConditions],
    ["SPEED_SLOW_4G" /* PredefinedThrottlingConditionKey.SPEED_SLOW_4G */, Slow4GConditions],
    ["SPEED_FAST_4G" /* PredefinedThrottlingConditionKey.SPEED_FAST_4G */, Fast4GConditions]
]);
function keyIsPredefined(key) {
    return !key.startsWith('USER_CUSTOM_SETTING_');
}
export function keyIsCustomUser(key) {
    return key.startsWith('USER_CUSTOM_SETTING_');
}
export function getPredefinedCondition(key) {
    if (!keyIsPredefined(key)) {
        return null;
    }
    return THROTTLING_CONDITIONS_LOOKUP.get(key) ?? null;
}
//# sourceMappingURL=NetworkManager.js.map