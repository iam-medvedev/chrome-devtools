// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { getCleanTextContentFromElements, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithLocale } from '../../testing/EnvironmentHelpers.js';
import * as Network from './NetworkTimeCalculator.js';
import * as RequestTimingView from './RequestTimingView.js';
function createNetworkRequest(matchedSource, actualSource) {
    const request = SDK.NetworkRequest.NetworkRequest.create('requestId', 'http://devtools-frontend.test', '', null, null, null);
    request.mimeType = 'application/wasm';
    request.finished = true;
    const timingInfo = {
        requestTime: 500,
        proxyStart: 0,
        proxyEnd: 0,
        dnsStart: 0,
        dnsEnd: 0,
        connectStart: 0,
        connectEnd: 0,
        sslStart: 0,
        sslEnd: 0,
        workerReady: 400,
        workerStart: 500,
        workerRouterEvaluationStart: -200,
        workerFetchStart: 600,
        workerRespondWithSettled: 700,
        sendStart: 800,
        sendEnd: 900,
        pushStart: 0,
        pushEnd: 0,
        receiveHeadersStart: 1000,
        receiveHeadersEnd: 0,
    };
    if (matchedSource === "cache" /* Protocol.Network.ServiceWorkerRouterSource.Cache */) {
        timingInfo.workerCacheLookupStart = -100;
    }
    request.timing = timingInfo;
    request.serviceWorkerRouterInfo = {
        ruleIdMatched: 1,
        matchedSourceType: matchedSource,
        actualSourceType: actualSource,
    };
    return request;
}
describeWithLocale('ResourceTimingView', () => {
    it('RequestTimeRanges has router evaluation field with SW router source as network', async () => {
        const request = createNetworkRequest("network" /* Protocol.Network.ServiceWorkerRouterSource.Network */, "network" /* Protocol.Network.ServiceWorkerRouterSource.Network */);
        const timingInfo = request.timing;
        const timeRanges = RequestTimingView.RequestTimingView.calculateRequestTimeRanges(request, 100);
        const routerEvaluationTime = timingInfo.workerRouterEvaluationStart;
        const sendStart = timingInfo.sendStart;
        const routerEvaluation = timeRanges.find(timeRange => timeRange.name === "serviceworker-routerevaluation" /* RequestTimingView.RequestTimeRangeNames.SERVICE_WORKER_ROUTER_EVALUATION */);
        assert.isTrue(Boolean(routerEvaluation), 'worker router evaluation exists');
        assert.strictEqual(routerEvaluation?.start, timingInfo.requestTime + routerEvaluationTime / 1000);
        assert.strictEqual(routerEvaluation?.end, timingInfo.requestTime + sendStart / 1000);
        const cacheLookup = timeRanges.find(timeRange => timeRange.name === "serviceworker-cachelookup" /* RequestTimingView.RequestTimeRangeNames.SERVICE_WORKER_CACHE_LOOKUP */);
        assert.isFalse(Boolean(cacheLookup), 'worker cache lookup does not exist');
    });
    it('RequestTimeRanges has router evaluation field with SW router source as fetch-event', async () => {
        const request = createNetworkRequest("fetch-event" /* Protocol.Network.ServiceWorkerRouterSource.FetchEvent */, "fetch-event" /* Protocol.Network.ServiceWorkerRouterSource.FetchEvent */);
        const timingInfo = request.timing;
        const timeRanges = RequestTimingView.RequestTimingView.calculateRequestTimeRanges(request, 100);
        const routerEvaluationTime = timingInfo.workerRouterEvaluationStart;
        const workerStart = timingInfo.workerStart;
        const routerEvaluation = timeRanges.find(timeRange => timeRange.name === "serviceworker-routerevaluation" /* RequestTimingView.RequestTimeRangeNames.SERVICE_WORKER_ROUTER_EVALUATION */);
        assert.isTrue(Boolean(routerEvaluation), 'worker router evaluation exists');
        assert.strictEqual(routerEvaluation?.start, timingInfo.requestTime + routerEvaluationTime / 1000);
        assert.strictEqual(routerEvaluation?.end, timingInfo.requestTime + workerStart / 1000);
        const cacheLookup = timeRanges.find(timeRange => timeRange.name === "serviceworker-cachelookup" /* RequestTimingView.RequestTimeRangeNames.SERVICE_WORKER_CACHE_LOOKUP */);
        assert.isFalse(Boolean(cacheLookup), 'worker cache lookup does not exist');
    });
    it('RequestTimeRanges has router evaluation field with SW router source as cache hit', async () => {
        const request = createNetworkRequest("cache" /* Protocol.Network.ServiceWorkerRouterSource.Cache */, "cache" /* Protocol.Network.ServiceWorkerRouterSource.Cache */);
        const timingInfo = request.timing;
        const timeRanges = RequestTimingView.RequestTimingView.calculateRequestTimeRanges(request, 100);
        const routerEvaluationTime = timingInfo.workerRouterEvaluationStart;
        const cacheLookupStart = timingInfo.workerCacheLookupStart;
        const routerEvaluation = timeRanges.find(timeRange => timeRange.name === "serviceworker-routerevaluation" /* RequestTimingView.RequestTimeRangeNames.SERVICE_WORKER_ROUTER_EVALUATION */);
        assert.isTrue(Boolean(routerEvaluation), 'worker router evaluation exists');
        assert.strictEqual(routerEvaluation?.start, timingInfo.requestTime + routerEvaluationTime / 1000);
        assert.strictEqual(routerEvaluation?.end, timingInfo.requestTime + cacheLookupStart / 1000);
        const cacheLookup = timeRanges.find(timeRange => timeRange.name === "serviceworker-cachelookup" /* RequestTimingView.RequestTimeRangeNames.SERVICE_WORKER_CACHE_LOOKUP */);
        assert.isTrue(Boolean(cacheLookup), 'worker cache lookup does not exist');
        assert.strictEqual(cacheLookup?.start, timingInfo.requestTime + cacheLookupStart / 1000);
        assert.strictEqual(cacheLookup?.end, timingInfo.requestTime + timingInfo.receiveHeadersStart / 1000);
    });
    it('RequestTimeRanges has router evaluation field with SW router source as cache miss', async () => {
        const request = createNetworkRequest("cache" /* Protocol.Network.ServiceWorkerRouterSource.Cache */, "network" /* Protocol.Network.ServiceWorkerRouterSource.Network */);
        const timingInfo = request.timing;
        const timeRanges = RequestTimingView.RequestTimingView.calculateRequestTimeRanges(request, 100);
        const routerEvaluationTime = timingInfo.workerRouterEvaluationStart;
        const cacheLookupStart = timingInfo.workerCacheLookupStart;
        const routerEvaluation = timeRanges.find(timeRange => timeRange.name === "serviceworker-routerevaluation" /* RequestTimingView.RequestTimeRangeNames.SERVICE_WORKER_ROUTER_EVALUATION */);
        assert.isTrue(Boolean(routerEvaluation), 'worker router evaluation exists');
        assert.strictEqual(routerEvaluation?.start, timingInfo.requestTime + routerEvaluationTime / 1000);
        assert.strictEqual(routerEvaluation?.end, timingInfo.requestTime + cacheLookupStart / 1000);
        const cacheLookup = timeRanges.find(timeRange => timeRange.name === "serviceworker-cachelookup" /* RequestTimingView.RequestTimeRangeNames.SERVICE_WORKER_CACHE_LOOKUP */);
        assert.isTrue(Boolean(cacheLookup), 'worker cache lookup does not exist');
        assert.strictEqual(cacheLookup?.start, timingInfo.requestTime + cacheLookupStart / 1000);
        assert.strictEqual(cacheLookup?.end, timingInfo.requestTime + timingInfo.sendStart / 1000);
    });
    it('Timing table has router evaluation field with detail tabs', async () => {
        const request = createNetworkRequest("network" /* Protocol.Network.ServiceWorkerRouterSource.Network */, "network" /* Protocol.Network.ServiceWorkerRouterSource.Network */);
        const component = new RequestTimingView.RequestTimingView(request, new Network.NetworkTimeCalculator(true));
        const div = document.createElement('div');
        renderElementIntoDOM(div);
        component.markAsRoot();
        component.show(div);
        // Test if we correctly set details element
        const routerEvaluationDetailsElement = document.querySelector('.router-evaluation-timing-bar-details');
        assert.isNotNull(routerEvaluationDetailsElement, 'router evaluation details does not exist');
        assert.strictEqual(routerEvaluationDetailsElement.childElementCount, 1, 'router evaluation details child element count does not match');
        assert.isNotNull(routerEvaluationDetailsElement.firstElementChild, 'router evaluation first element is non null');
        // Test if we correctly set the tree item inside shadow root
        const shadowElement = routerEvaluationDetailsElement.firstElementChild.shadowRoot;
        assert.isNotNull(shadowElement, 'shadow element does not exist');
        const content = getCleanTextContentFromElements(shadowElement, '.network-fetch-details-treeitem');
        assert.strictEqual(content.length, 2, 'does not match the tree item');
        // Check the content of the view. Since the value is set from matched to actual,
        // the order should be the same.
        const networkString = String("network" /* Protocol.Network.ServiceWorkerRouterSource.Network */);
        assert.strictEqual(content[0], `Matched source: ${networkString}`, 'matched source does not match');
        assert.strictEqual(content[1], `Actual source: ${networkString}`, 'actual source does not match');
    });
});
//# sourceMappingURL=RequestTimingView.test.js.map