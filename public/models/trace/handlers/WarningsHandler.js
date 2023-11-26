// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../core/platform/platform.js';
import * as Helpers from '../helpers/helpers.js';
import * as Types from '../types/types.js';
import { data as userInteractionsHandlerData } from './UserInteractionsHandler.js';
const warningsPerEvent = new Map();
const eventsPerWarning = new Map();
export const FORCED_LAYOUT_AND_STYLES_THRESHOLD = Helpers.Timing.millisecondsToMicroseconds(Types.Timing.MilliSeconds(10));
export const LONG_MAIN_THREAD_TASK_THRESHOLD = Helpers.Timing.millisecondsToMicroseconds(Types.Timing.MilliSeconds(50));
export function reset() {
    warningsPerEvent.clear();
    eventsPerWarning.clear();
}
function storeWarning(event, warning) {
    const existingWarnings = Platform.MapUtilities.getWithDefault(warningsPerEvent, event, () => []);
    existingWarnings.push(warning);
    warningsPerEvent.set(event, existingWarnings);
    const existingEvents = Platform.MapUtilities.getWithDefault(eventsPerWarning, warning, () => []);
    existingEvents.push(event);
    eventsPerWarning.set(warning, existingEvents);
}
export function handleEvent(event) {
    if (event.name === "RunTask" /* Types.TraceEvents.KnownEventName.RunTask */) {
        const { duration } = Helpers.Timing.eventTimingsMicroSeconds(event);
        if (duration > LONG_MAIN_THREAD_TASK_THRESHOLD) {
            storeWarning(event, 'LONG_TASK');
        }
        return;
    }
    if (Types.TraceEvents.isTraceEventFireIdleCallback(event)) {
        const { duration } = Helpers.Timing.eventTimingsMilliSeconds(event);
        if (duration > event.args.data.allottedMilliseconds) {
            storeWarning(event, 'IDLE_CALLBACK_OVER_TIME');
        }
        return;
    }
    if (event.name === "Layout" /* Types.TraceEvents.KnownEventName.Layout */) {
        if (event.dur && event.dur >= FORCED_LAYOUT_AND_STYLES_THRESHOLD) {
            storeWarning(event, 'FORCED_LAYOUT');
        }
        return;
    }
    if (event.name === "RecalculateStyles" /* Types.TraceEvents.KnownEventName.RecalculateStyles */ ||
        event.name === "UpdateLayoutTree" /* Types.TraceEvents.KnownEventName.UpdateLayoutTree */) {
        if (event.dur && event.dur >= FORCED_LAYOUT_AND_STYLES_THRESHOLD) {
            storeWarning(event, 'FORCED_STYLE');
        }
        return;
    }
}
export function deps() {
    return ['UserInteractions'];
}
export async function finalize() {
    // These events do exist on the UserInteractionsHandler, but we also put
    // them into the WarningsHandler so that the warnings handler can be the
    // source of truth and the way to look up all warnings for a given event.
    // Otherwise, we would have to look up warnings across multiple handlers for
    // a given event, which will start to get messy very quickly.
    const longInteractions = userInteractionsHandlerData().interactionsOverThreshold;
    for (const interaction of longInteractions) {
        storeWarning(interaction, 'LONG_INTERACTION');
    }
}
export function data() {
    return {
        perEvent: new Map(warningsPerEvent),
        perWarning: new Map(eventsPerWarning),
    };
}
//# sourceMappingURL=WarningsHandler.js.map