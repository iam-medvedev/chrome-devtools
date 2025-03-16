// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Trace from '../../../models/trace/trace.js';
import { AICallTree } from './AICallTree.js';
/**
 * This class holds the Insight that is active when the user has entered the
 * Ask AI flow from the Insights sidebar.
 * Ideally we would just use the InsightModel instance itself, but we need to
 * also store a reference to the parsed trace as we use that to populate the
 * data provided to the LLM, so we use this class as a container for the insight
 * and the parsed trace.
 */
export class ActiveInsight {
    #insight;
    #parsedTrace;
    constructor(insight, parsedTrace) {
        this.#insight = insight;
        this.#parsedTrace = parsedTrace;
    }
    get insight() {
        return this.#insight;
    }
    get parsedTrace() {
        return this.#parsedTrace;
    }
    title() {
        return this.#insight.title;
    }
}
export class AIQueries {
    /**
     * Returns the set of network requests that occurred within the timeframe of this Insight.
     */
    static networkRequests(insight, parsedTrace) {
        const bounds = insightBounds(insight, parsedTrace);
        // Now we find network requests that:
        // 1. began within the bounds
        // 2. completed within the bounds
        const matchedRequests = [];
        for (const request of parsedTrace.NetworkRequests.byTime) {
            // Requests are ordered by time ASC, so if we find one request that is
            // beyond the max, the rest are guaranteed to be also and we can break early.
            if (request.ts > bounds.max) {
                break;
            }
            if (request.args.data.url.startsWith('data:')) {
                // For the sake of the LLM querying data, we don't care about data: URLs.
                continue;
            }
            if (request.ts >= bounds.min && request.ts + request.dur <= bounds.max) {
                matchedRequests.push(request);
            }
        }
        return matchedRequests;
    }
    /**
     * Returns the single network request. We do not check to filter this by the
     * bounds of the insight, because the only way that the LLM has found this
     * request is by first inspecting a summary of relevant network requests for
     * the given insight. So if it then looks up a request by URL, we know that
     * is a valid and relevant request.
     */
    static networkRequest(parsedTrace, url) {
        return parsedTrace.NetworkRequests.byTime.find(r => r.args.data.url === url) ?? null;
    }
    /**
     * Returns an AI Call Tree representing the activity on the main thread for
     * the relevant time range of the given insight.
     */
    static mainThreadActivity(insight, parsedTrace) {
        /**
         * We cannot assume that there is one main thread as there are scenarios
         * where there can be multiple (see crbug.com/402658800) as an example.
         * Therefore we calculate the main thread by using the thread that the
         * Insight has been associated to. Most Insights relate to a navigation, so
         * in this case we can use the navigation's PID/TID as we know that will
         * have run on the main thread that we are interested in.
         * If we do not have a navigation, we fall back to looking for the first
         * thread we find that is of type MAIN_THREAD.
         * Longer term we should solve this at the Trace Engine level to avoid
         * look-ups like this; this is the work that is tracked in
         * crbug.com/402658800.
         */
        let mainThreadPID = null;
        let mainThreadTID = null;
        if (insight.navigationId) {
            const navigation = parsedTrace.Meta.navigationsByNavigationId.get(insight.navigationId);
            if (navigation?.args.data?.isOutermostMainFrame) {
                mainThreadPID = navigation.pid;
                mainThreadTID = navigation.tid;
            }
        }
        const threads = Trace.Handlers.Threads.threadsInTrace(parsedTrace);
        const thread = threads.find(thread => {
            if (mainThreadPID && mainThreadTID) {
                return thread.pid === mainThreadPID && thread.tid === mainThreadTID;
            }
            return thread.type === "MAIN_THREAD" /* Trace.Handlers.Threads.ThreadType.MAIN_THREAD */;
        });
        if (!thread) {
            return null;
        }
        const bounds = insightBounds(insight, parsedTrace);
        return AICallTree.fromTimeOnThread({
            thread: {
                pid: thread.pid,
                tid: thread.tid,
            },
            parsedTrace,
            bounds,
        });
    }
}
/**
 * Calculates the time bounds for the given insight that are relevant.
 * If the insight is attached to a navigation, this will be the start of that
 * navigation through to either the next navigation, or the end of the trace.
 * For some insights we change the bounds; for LCP insights we treat the max
 * bound as LCP time, as anything that happens after that cannot have impacted
 * it.
 */
function insightBounds(insight, parsedTrace) {
    const navigationStart = insight.navigationId ? parsedTrace.Meta.navigationsByNavigationId.get(insight.navigationId) : undefined;
    const minBound = navigationStart?.ts ?? parsedTrace.Meta.traceBounds.min;
    let maxBound = customMaxBoundForInsight(insight);
    if (!maxBound) {
        maxBound = parsedTrace.Meta.traceBounds.max;
        if (navigationStart) {
            const nextNavigation = getNextNavigation(navigationStart, parsedTrace);
            if (nextNavigation) {
                maxBound = nextNavigation.ts;
            }
        }
    }
    return Trace.Helpers.Timing.traceWindowFromMicroSeconds(minBound, maxBound);
}
/**
 * For a given navigation on the main frame, return the next navigation, if there was one.
 */
function getNextNavigation(navigation, parsedTrace) {
    for (let i = 0; i < parsedTrace.Meta.mainFrameNavigations.length; i++) {
        const currentNavigationStart = parsedTrace.Meta.mainFrameNavigations[i];
        if (currentNavigationStart.args.data?.navigationId === navigation.args.data?.navigationId) {
            return parsedTrace.Meta.mainFrameNavigations.at(i + 1) ?? null;
        }
    }
    return null;
}
function customMaxBoundForInsight(insight) {
    if (Trace.Insights.Models.LCPPhases.isLCPPhases(insight) && insight.lcpEvent) {
        return insight.lcpEvent.ts;
    }
    return null;
}
//# sourceMappingURL=InsightAIContext.js.map