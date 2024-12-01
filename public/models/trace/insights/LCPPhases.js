// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Handlers from '../handlers/handlers.js';
import * as Helpers from '../helpers/helpers.js';
import * as Types from '../types/types.js';
import { InsightCategory, InsightWarning, } from './types.js';
const UIStrings = {
    /**
     *@description Title of an insight that provides details about the LCP metric, broken down by phases / parts.
     */
    title: 'LCP by phase',
    /**
     * @description Description of a DevTools insight that presents a breakdown for the LCP metric by phases.
     * This is displayed after a user expands the section to see more. No character length limits.
     */
    description: 'Each [phase has specific improvement strategies](https://web.dev/articles/optimize-lcp#lcp-breakdown). Ideally, most of the LCP time should be spent on loading the resources, not within delays.',
};
const str_ = i18n.i18n.registerUIStrings('models/trace/insights/LCPPhases.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
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
function finalize(partialModel) {
    const relatedEvents = [];
    if (partialModel.lcpEvent) {
        relatedEvents.push(partialModel.lcpEvent);
    }
    if (partialModel.lcpRequest) {
        relatedEvents.push(partialModel.lcpRequest);
    }
    return {
        title: i18nString(UIStrings.title),
        description: i18nString(UIStrings.description),
        category: InsightCategory.LCP,
        // TODO: should move the component's "getPhaseData" to model.
        shouldShow: Boolean(partialModel.phases) && (partialModel.lcpMs ?? 0) > 0,
        ...partialModel,
        relatedEvents,
    };
}
export function generateInsight(parsedTrace, context) {
    if (!context.navigation) {
        return finalize({});
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
        return finalize({ warnings: [InsightWarning.NO_LCP] });
    }
    // This helps calculate the phases.
    const lcpMs = Helpers.Timing.microSecondsToMilliseconds(metricScore.timing);
    // This helps position things on the timeline's UI accurately for a trace.
    const lcpTs = metricScore.event?.ts ? Helpers.Timing.microSecondsToMilliseconds(metricScore.event?.ts) : undefined;
    const lcpRequest = parsedTrace.LargestImagePaint.lcpRequestByNavigation.get(context.navigation);
    const docRequest = networkRequests.byTime.find(req => req.args.data.requestId === context.navigationId);
    if (!docRequest) {
        return finalize({ lcpMs, lcpTs, lcpEvent, lcpRequest, warnings: [InsightWarning.NO_DOCUMENT_REQUEST] });
    }
    if (!lcpRequest) {
        return finalize({
            lcpMs,
            lcpTs,
            lcpEvent,
            lcpRequest,
            phases: breakdownPhases(context.navigation, docRequest, lcpMs, lcpRequest) ?? undefined,
        });
    }
    return finalize({
        lcpMs,
        lcpTs,
        lcpEvent,
        lcpRequest,
        phases: breakdownPhases(context.navigation, docRequest, lcpMs, lcpRequest) ?? undefined,
    });
}
//# sourceMappingURL=LCPPhases.js.map