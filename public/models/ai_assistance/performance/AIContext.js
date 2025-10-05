// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Trace from '../../../models/trace/trace.js';
import { AICallTree } from './AICallTree.js';
/**
 * Gets the first, most relevant InsightSet to use, following the logic of:
 * 1. If there is only one InsightSet, use that.
 * 2. If there are more, prefer the first we find that has a navigation associated with it.
 * 3. If none with a navigation are found, fallback to the first one.
 * 4. Otherwise, return null.
 *
 * TODO(cjamcl): we should just give the agent the entire insight set, and give
 * summary detail about all of them + the ability to query each.
 */
function getFirstInsightSet(insights) {
    const insightSets = Array.from(insights.values());
    if (insightSets.length === 0) {
        return null;
    }
    if (insightSets.length === 1) {
        return insightSets[0];
    }
    return insightSets.filter(set => set.navigation).at(0) ?? insightSets.at(0) ?? null;
}
export class AgentFocus {
    static fromParsedTrace(parsedTrace) {
        if (!parsedTrace.insights) {
            throw new Error('missing insights');
        }
        const insightSet = getFirstInsightSet(parsedTrace.insights);
        return new AgentFocus({
            parsedTrace,
            insightSet,
            event: null,
            callTree: null,
            insight: null,
        });
    }
    static fromInsight(parsedTrace, insight) {
        if (!parsedTrace.insights) {
            throw new Error('missing insights');
        }
        const insightSet = getFirstInsightSet(parsedTrace.insights);
        return new AgentFocus({
            parsedTrace,
            insightSet,
            event: null,
            callTree: null,
            insight,
        });
    }
    static fromEvent(parsedTrace, event) {
        if (!parsedTrace.insights) {
            throw new Error('missing insights');
        }
        const insightSet = getFirstInsightSet(parsedTrace.insights);
        const result = AgentFocus.#getCallTreeOrEvent(parsedTrace, event);
        return new AgentFocus({ parsedTrace, insightSet, event: result.event, callTree: result.callTree, insight: null });
    }
    static fromCallTree(callTree) {
        const insights = callTree.parsedTrace.insights;
        // Select the insight set containing the call tree.
        // If for some reason that fails, fallback to the first one.
        let insightSet = null;
        if (insights) {
            const callTreeTimeRange = Trace.Helpers.Timing.traceWindowFromEvent(callTree.rootNode.event);
            insightSet = insights.values().find(set => Trace.Helpers.Timing.boundsIncludeTimeRange({
                timeRange: callTreeTimeRange,
                bounds: set.bounds,
            })) ??
                getFirstInsightSet(insights);
        }
        return new AgentFocus({ parsedTrace: callTree.parsedTrace, insightSet, event: null, callTree, insight: null });
    }
    #data;
    eventsSerializer = new Trace.EventsSerializer.EventsSerializer();
    constructor(data) {
        this.#data = data;
    }
    get parsedTrace() {
        return this.#data.parsedTrace;
    }
    get insightSet() {
        return this.#data.insightSet;
    }
    /** Note: at most one of event or callTree is non-null. */
    get event() {
        return this.#data.event;
    }
    /** Note: at most one of event or callTree is non-null. */
    get callTree() {
        return this.#data.callTree;
    }
    get insight() {
        return this.#data.insight;
    }
    withInsight(insight) {
        const focus = new AgentFocus(this.#data);
        focus.#data.insight = insight;
        return focus;
    }
    withEvent(event) {
        const focus = new AgentFocus(this.#data);
        const result = AgentFocus.#getCallTreeOrEvent(this.#data.parsedTrace, event);
        focus.#data.callTree = result.callTree;
        focus.#data.event = result.event;
        return focus;
    }
    lookupEvent(key) {
        try {
            return this.eventsSerializer.eventForKey(key, this.#data.parsedTrace);
        }
        catch (err) {
            if (err.toString().includes('Unknown trace event') || err.toString().includes('Unknown profile call')) {
                return null;
            }
            throw err;
        }
    }
    /**
     * If an event is a call tree, this returns that call tree and a null event.
     * If not a call tree, this only returns a non-null event if the event is a network
     * request.
     * This is an arbitrary limitation – it should be removed, but first we need to
     * improve the agent's knowledge of events that are not main-thread or network
     * events.
     */
    static #getCallTreeOrEvent(parsedTrace, event) {
        const callTree = event && AICallTree.fromEvent(event, parsedTrace);
        if (callTree) {
            return { callTree, event: null };
        }
        if (event && Trace.Types.Events.isSyntheticNetworkRequest(event)) {
            return { callTree: null, event };
        }
        return { callTree: null, event: null };
    }
}
export function getPerformanceAgentFocusFromModel(model) {
    const parsedTrace = model.parsedTrace();
    if (!parsedTrace) {
        return null;
    }
    return AgentFocus.fromParsedTrace(parsedTrace);
}
//# sourceMappingURL=AIContext.js.map