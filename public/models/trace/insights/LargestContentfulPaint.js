// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Handlers from '../handlers/handlers.js';
import * as Helpers from '../helpers/helpers.js';
import * as Types from '../types/types.js';
import { findLCPRequest } from './Common.js';
import { InsightWarning } from './types.js';
export function deps() {
    return ['NetworkRequests', 'PageLoadMetrics', 'LargestImagePaint', 'Meta'];
}
function breakdownPhases(nav, mainRequest, lcpMs, lcpRequest) {
    const mainReqTiming = mainRequest.args.data.timing;
    if (!mainReqTiming) {
        throw new Error('no timing for main resource');
    }
    const firstDocByteTs = Helpers.Timing.secondsToMicroseconds(mainReqTiming.requestTime) +
        Helpers.Timing.millisecondsToMicroseconds(mainReqTiming.receiveHeadersStart);
    const firstDocByteTiming = Types.Timing.MicroSeconds(firstDocByteTs - nav.ts);
    const ttfb = Helpers.Timing.microSecondsToMilliseconds(firstDocByteTiming);
    let renderDelay = Types.Timing.MilliSeconds(lcpMs - ttfb);
    if (!lcpRequest) {
        return { ttfb, renderDelay };
    }
    const lcpStartTs = Types.Timing.MicroSeconds(lcpRequest.ts - nav.ts);
    const resourceStart = Helpers.Timing.microSecondsToMilliseconds(lcpStartTs);
    const lcpReqEndTs = Types.Timing.MicroSeconds(lcpRequest.args.data.syntheticData.finishTime - nav.ts);
    const resourceEnd = Helpers.Timing.microSecondsToMilliseconds(lcpReqEndTs);
    const loadDelay = Types.Timing.MilliSeconds(resourceStart - ttfb);
    const loadTime = Types.Timing.MilliSeconds(resourceEnd - resourceStart);
    renderDelay = Types.Timing.MilliSeconds(lcpMs - resourceEnd);
    return {
        ttfb,
        loadDelay,
        loadTime,
        renderDelay,
    };
}
export function generateInsight(traceParsedData, context) {
    const networkRequests = traceParsedData.NetworkRequests;
    const nav = traceParsedData.Meta.navigationsByNavigationId.get(context.navigationId);
    if (!nav) {
        throw new Error('no trace navigation');
    }
    const frameMetrics = traceParsedData.PageLoadMetrics.metricScoresByFrameId.get(context.frameId);
    if (!frameMetrics) {
        throw new Error('no frame metrics');
    }
    const navMetrics = frameMetrics.get(context.navigationId);
    if (!navMetrics) {
        throw new Error('no navigation metrics');
    }
    const metricScore = navMetrics.get("LCP" /* Handlers.ModelHandlers.PageLoadMetrics.MetricName.LCP */);
    const lcpEvent = metricScore?.event;
    if (!lcpEvent || !Types.TraceEvents.isTraceEventLargestContentfulPaintCandidate(lcpEvent)) {
        return { warnings: [InsightWarning.NO_LCP] };
    }
    // This helps calculate the phases.
    const lcpMs = Helpers.Timing.microSecondsToMilliseconds(metricScore.timing);
    // This helps position things on the timeline's UI accurately for a trace.
    const lcpTs = metricScore.event?.ts ? Helpers.Timing.microSecondsToMilliseconds(metricScore.event?.ts) : undefined;
    const lcpResource = findLCPRequest(traceParsedData, context, lcpEvent);
    const mainReq = networkRequests.byTime.find(req => req.args.data.requestId === context.navigationId);
    if (!mainReq) {
        return { lcpMs, lcpTs, warnings: [InsightWarning.NO_DOCUMENT_REQUEST] };
    }
    if (!lcpResource) {
        return {
            lcpMs: lcpMs,
            lcpTs: lcpTs,
            phases: breakdownPhases(nav, mainReq, lcpMs, lcpResource),
        };
    }
    const imageLoadingAttr = lcpEvent.args.data?.loadingAttr;
    const imagePreloaded = lcpResource?.args.data.isLinkPreload || lcpResource?.args.data.initiator?.type === 'preload';
    const imageFetchPriorityHint = lcpResource?.args.data.fetchPriorityHint;
    // This is the earliest discovery time an LCP resource could have - it's TTFB.
    const earliestDiscoveryTime = mainReq && mainReq.args.data.timing ?
        Helpers.Timing.secondsToMicroseconds(mainReq.args.data.timing.requestTime) +
            Helpers.Timing.millisecondsToMicroseconds(mainReq.args.data.timing.receiveHeadersStart) :
        undefined;
    return {
        lcpMs: lcpMs,
        lcpTs: lcpTs,
        phases: breakdownPhases(nav, mainReq, lcpMs, lcpResource),
        shouldRemoveLazyLoading: imageLoadingAttr === 'lazy',
        shouldIncreasePriorityHint: imageFetchPriorityHint !== 'high',
        shouldPreloadImage: !imagePreloaded,
        lcpResource,
        earliestDiscoveryTimeTs: earliestDiscoveryTime ? Types.Timing.MicroSeconds(earliestDiscoveryTime) : undefined,
    };
}
//# sourceMappingURL=LargestContentfulPaint.js.map