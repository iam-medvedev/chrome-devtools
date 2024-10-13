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
function anyValuesNaN(...values) {
    return values.some(v => Number.isNaN(v));
}
/**
 * Calculates the 4 phases of an LCP and the timings of each.
 * Will return `null` if any required values were missing. We don't ever expect
 * them to be missing on newer traces, but old trace files may lack some of the
 * data we rely on, so we want to handle that case.
 */
function breakdownPhases(nav, docRequest, lcpMs, lcpRequest) {
    const docReqTiming = docRequest.args.data.timing;
    if (!docReqTiming) {
        throw new Error('no timing for document request');
    }
    const firstDocByteTs = Helpers.Timing.secondsToMicroseconds(docReqTiming.requestTime) +
        Helpers.Timing.millisecondsToMicroseconds(docReqTiming.receiveHeadersStart);
    const firstDocByteTiming = Types.Timing.MicroSeconds(firstDocByteTs - nav.ts);
    const ttfb = Helpers.Timing.microSecondsToMilliseconds(firstDocByteTiming);
    let renderDelay = Types.Timing.MilliSeconds(lcpMs - ttfb);
    if (!lcpRequest) {
        if (anyValuesNaN(ttfb, renderDelay)) {
            return null;
        }
        return { ttfb, renderDelay };
    }
    const lcpStartTs = Types.Timing.MicroSeconds(lcpRequest.ts - nav.ts);
    const requestStart = Helpers.Timing.microSecondsToMilliseconds(lcpStartTs);
    const lcpReqEndTs = Types.Timing.MicroSeconds(lcpRequest.args.data.syntheticData.finishTime - nav.ts);
    const requestEnd = Helpers.Timing.microSecondsToMilliseconds(lcpReqEndTs);
    const loadDelay = Types.Timing.MilliSeconds(requestStart - ttfb);
    const loadTime = Types.Timing.MilliSeconds(requestEnd - requestStart);
    renderDelay = Types.Timing.MilliSeconds(lcpMs - requestEnd);
    if (anyValuesNaN(ttfb, loadDelay, loadTime, renderDelay)) {
        return null;
    }
    return {
        ttfb,
        loadDelay,
        loadTime,
        renderDelay,
    };
}
export function generateInsight(parsedTrace, context) {
    if (!context.navigation) {
        return {};
    }
    const networkRequests = parsedTrace.NetworkRequests;
    const frameMetrics = parsedTrace.PageLoadMetrics.metricScoresByFrameId.get(context.frameId);
    if (!frameMetrics) {
        throw new Error('no frame metrics');
    }
    const navMetrics = frameMetrics.get(context.navigationId);
    if (!navMetrics) {
        throw new Error('no navigation metrics');
    }
    const metricScore = navMetrics.get("LCP" /* Handlers.ModelHandlers.PageLoadMetrics.MetricName.LCP */);
    const lcpEvent = metricScore?.event;
    if (!lcpEvent || !Types.Events.isLargestContentfulPaintCandidate(lcpEvent)) {
        return { warnings: [InsightWarning.NO_LCP] };
    }
    // This helps calculate the phases.
    const lcpMs = Helpers.Timing.microSecondsToMilliseconds(metricScore.timing);
    // This helps position things on the timeline's UI accurately for a trace.
    const lcpTs = metricScore.event?.ts ? Helpers.Timing.microSecondsToMilliseconds(metricScore.event?.ts) : undefined;
    const lcpRequest = findLCPRequest(parsedTrace, context, lcpEvent);
    const docRequest = networkRequests.byTime.find(req => req.args.data.requestId === context.navigationId);
    if (!docRequest) {
        return { lcpMs, lcpTs, lcpEvent, warnings: [InsightWarning.NO_DOCUMENT_REQUEST] };
    }
    if (!lcpRequest) {
        return {
            lcpMs,
            lcpTs,
            lcpEvent,
            phases: breakdownPhases(context.navigation, docRequest, lcpMs, lcpRequest) ?? undefined,
        };
    }
    const initiatorUrl = lcpRequest.args.data.initiator?.url;
    // TODO(b/372319476): Explore using trace event HTMLDocumentParser::FetchQueuedPreloads to determine if the request
    // is discovered by the preload scanner.
    const initiatedByMainDoc = lcpRequest?.args.data.initiator?.type === 'parser' && docRequest.args.data.url === initiatorUrl;
    const imgPreloadedOrFoundInHTML = lcpRequest?.args.data.isLinkPreload || initiatedByMainDoc;
    const imageLoadingAttr = lcpEvent.args.data?.loadingAttr;
    const imageFetchPriorityHint = lcpRequest?.args.data.fetchPriorityHint;
    // This is the earliest discovery time an LCP request could have - it's TTFB.
    const earliestDiscoveryTime = docRequest && docRequest.args.data.timing ?
        Helpers.Timing.secondsToMicroseconds(docRequest.args.data.timing.requestTime) +
            Helpers.Timing.millisecondsToMicroseconds(docRequest.args.data.timing.receiveHeadersStart) :
        undefined;
    return {
        lcpMs,
        lcpTs,
        lcpEvent,
        phases: breakdownPhases(context.navigation, docRequest, lcpMs, lcpRequest) ?? undefined,
        shouldRemoveLazyLoading: imageLoadingAttr === 'lazy',
        shouldIncreasePriorityHint: imageFetchPriorityHint !== 'high',
        shouldPreloadImage: !imgPreloadedOrFoundInHTML,
        lcpRequest,
        earliestDiscoveryTimeTs: earliestDiscoveryTime ? Types.Timing.MicroSeconds(earliestDiscoveryTime) : undefined,
    };
}
//# sourceMappingURL=LargestContentfulPaint.js.map