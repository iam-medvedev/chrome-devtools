// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Helpers from '../helpers/helpers.js';
import * as Types from '../types/types.js';
import { data as AsyncJSCallsHandlerData } from './AsyncJSCallsHandler.js';
import { data as flowsHandlerData } from './FlowsHandler.js';
const lastScheduleStyleRecalcByFrame = new Map();
// This tracks the last event that is considered to have invalidated the layout
// for a given frame.
// Note that although there is an InvalidateLayout event, there are also other
// events (ScheduleStyleRecalculation) that could be the reason a layout was
// invalidated.
const lastInvalidationEventForFrame = new Map();
// Important: although the event is called UpdateLayoutTree, in the UI we
// present these to the user as "Recalculate Style". So don't get confused!
// These are the same - just UpdateLayoutTree is what the event from Chromium
// is called.
const lastUpdateLayoutTreeByFrame = new Map();
// These two maps store the same data but in different directions.
// For a given event, tell me what its initiator was. An event can only have one initiator.
const eventToInitiatorMap = new Map();
// For a given event, tell me what events it initiated. An event can initiate
// multiple events, hence why the value for this map is an array.
const initiatorToEventsMap = new Map();
// Note: we are keeping the parsing of the following async JS schedulers
// for backwards compatibility only. They are targeted to be removed
// completely by M134. See more details at crbug.com/383974422
// TODO(andoli): remove manual parsing of async JS schedulers.
const requestAnimationFrameEventsById = new Map();
const timerInstallEventsById = new Map();
const requestIdleCallbackEventsById = new Map();
const webSocketCreateEventsById = new Map();
const schedulePostTaskCallbackEventsById = new Map();
export function reset() {
    lastScheduleStyleRecalcByFrame.clear();
    lastInvalidationEventForFrame.clear();
    lastUpdateLayoutTreeByFrame.clear();
    timerInstallEventsById.clear();
    eventToInitiatorMap.clear();
    initiatorToEventsMap.clear();
    requestAnimationFrameEventsById.clear();
    requestIdleCallbackEventsById.clear();
    webSocketCreateEventsById.clear();
    schedulePostTaskCallbackEventsById.clear();
}
function storeInitiator(data) {
    eventToInitiatorMap.set(data.event, data.initiator);
    const eventsForInitiator = initiatorToEventsMap.get(data.initiator) || [];
    eventsForInitiator.push(data.event);
    initiatorToEventsMap.set(data.initiator, eventsForInitiator);
}
/**
 * IMPORTANT: Before adding support for new initiator relationships in
 * trace events consider using Perfetto's flow API on the events in
 * question, so that they get automatically computed.
 * @see {@link flowsHandlerData}
 *
 * The events manually computed here were added before we had support
 * for flow events. As such they should be migrated to use the flow
 * API so that no manual parsing is needed.
 */
export function handleEvent(event) {
    if (Types.Events.isScheduleStyleRecalculation(event)) {
        lastScheduleStyleRecalcByFrame.set(event.args.data.frame, event);
    }
    else if (Types.Events.isUpdateLayoutTree(event)) {
        // IMPORTANT: although the trace event is called UpdateLayoutTree, this
        // represents a Styles Recalculation. This event in the timeline is shown to
        // the user as "Recalculate Styles."
        if (event.args.beginData) {
            // Store the last UpdateLayout event: we use this when we see an
            // InvalidateLayout and try to figure out its initiator.
            lastUpdateLayoutTreeByFrame.set(event.args.beginData.frame, event);
            // If this frame has seen a ScheduleStyleRecalc event, then that event is
            // considered to be the initiator of this StylesRecalc.
            const scheduledStyleForFrame = lastScheduleStyleRecalcByFrame.get(event.args.beginData.frame);
            if (scheduledStyleForFrame) {
                storeInitiator({
                    event,
                    initiator: scheduledStyleForFrame,
                });
            }
        }
    }
    else if (Types.Events.isInvalidateLayout(event)) {
        // By default, the InvalidateLayout event is what triggered the layout invalidation for this frame.
        let invalidationInitiator = event;
        // However, if we have not had any prior invalidations for this frame, we
        // want to consider StyleRecalculation events as they might be the actual
        // cause of this layout invalidation.
        if (!lastInvalidationEventForFrame.has(event.args.data.frame)) {
            // 1. If we have not had an invalidation event for this frame
            // 2. AND we have had an UpdateLayoutTree for this frame
            // 3. AND the UpdateLayoutTree event ended AFTER the InvalidateLayout startTime
            // 4. AND we have an initiator for the UpdateLayoutTree event
            // 5. Then we set the last invalidation event for this frame to be the UpdateLayoutTree's initiator.
            const lastUpdateLayoutTreeForFrame = lastUpdateLayoutTreeByFrame.get(event.args.data.frame);
            if (lastUpdateLayoutTreeForFrame) {
                const { endTime } = Helpers.Timing.eventTimingsMicroSeconds(lastUpdateLayoutTreeForFrame);
                const initiatorOfUpdateLayout = eventToInitiatorMap.get(lastUpdateLayoutTreeForFrame);
                if (initiatorOfUpdateLayout && endTime && endTime > event.ts) {
                    invalidationInitiator = initiatorOfUpdateLayout;
                }
            }
        }
        lastInvalidationEventForFrame.set(event.args.data.frame, invalidationInitiator);
    }
    else if (Types.Events.isLayout(event)) {
        // The initiator of a Layout event is the last Invalidation event.
        const lastInvalidation = lastInvalidationEventForFrame.get(event.args.beginData.frame);
        if (lastInvalidation) {
            storeInitiator({
                event,
                initiator: lastInvalidation,
            });
        }
        // Now clear the last invalidation for the frame: the last invalidation has been linked to a Layout event, so it cannot be the initiator for any future layouts.
        lastInvalidationEventForFrame.delete(event.args.beginData.frame);
    }
    else if (Types.Events.isRequestAnimationFrame(event)) {
        requestAnimationFrameEventsById.set(event.args.data.id, event);
    }
    else if (Types.Events.isFireAnimationFrame(event)) {
        // If we get a fire event, that means we should have had the
        // RequestAnimationFrame event by now. If so, we can set that as the
        // initiator for the fire event.
        const matchingRequestEvent = requestAnimationFrameEventsById.get(event.args.data.id);
        if (matchingRequestEvent) {
            storeInitiator({
                event,
                initiator: matchingRequestEvent,
            });
        }
    }
    else if (Types.Events.isTimerInstall(event)) {
        timerInstallEventsById.set(event.args.data.timerId, event);
    }
    else if (Types.Events.isTimerFire(event)) {
        const matchingInstall = timerInstallEventsById.get(event.args.data.timerId);
        if (matchingInstall) {
            storeInitiator({ event, initiator: matchingInstall });
        }
    }
    else if (Types.Events.isRequestIdleCallback(event)) {
        requestIdleCallbackEventsById.set(event.args.data.id, event);
    }
    else if (Types.Events.isFireIdleCallback(event)) {
        const matchingRequestEvent = requestIdleCallbackEventsById.get(event.args.data.id);
        if (matchingRequestEvent) {
            storeInitiator({
                event,
                initiator: matchingRequestEvent,
            });
        }
    }
    else if (Types.Events.isWebSocketCreate(event)) {
        webSocketCreateEventsById.set(event.args.data.identifier, event);
    }
    else if (Types.Events.isWebSocketInfo(event) || Types.Events.isWebSocketTransfer(event)) {
        const matchingCreateEvent = webSocketCreateEventsById.get(event.args.data.identifier);
        if (matchingCreateEvent) {
            storeInitiator({
                event,
                initiator: matchingCreateEvent,
            });
        }
    }
    else if (Types.Events.isSchedulePostTaskCallback(event)) {
        schedulePostTaskCallbackEventsById.set(event.args.data.taskId, event);
    }
    else if (Types.Events.isRunPostTaskCallback(event) || Types.Events.isAbortPostTaskCallback(event)) {
        const matchingSchedule = schedulePostTaskCallbackEventsById.get(event.args.data.taskId);
        if (matchingSchedule) {
            storeInitiator({ event, initiator: matchingSchedule });
        }
    }
}
function createRelationshipsFromFlows() {
    const flows = flowsHandlerData().flows;
    for (let i = 0; i < flows.length; i++) {
        const flow = flows[i];
        for (let j = 0; j < flow.length - 1; j++) {
            storeInitiator({ event: flow[j + 1], initiator: flow[j] });
        }
    }
}
function createRelationshipsFromAsyncJSCalls() {
    const asyncCallEntries = AsyncJSCallsHandlerData().schedulerToRunEntryPoints.entries();
    for (const [asyncCaller, asyncCallees] of asyncCallEntries) {
        for (const asyncCallee of asyncCallees) {
            storeInitiator({ event: asyncCallee, initiator: asyncCaller });
        }
    }
}
export async function finalize() {
    createRelationshipsFromFlows();
    createRelationshipsFromAsyncJSCalls();
}
export function data() {
    return {
        eventToInitiator: eventToInitiatorMap,
        initiatorToEvents: initiatorToEventsMap,
    };
}
export function deps() {
    return ['Flows', 'AsyncJSCalls'];
}
//# sourceMappingURL=InitiatorsHandler.js.map