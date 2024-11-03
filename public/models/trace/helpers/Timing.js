// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Types from '../types/types.js';
import { getNavigationForTraceEvent } from './Trace.js';
export const millisecondsToMicroseconds = (value) => Types.Timing.MicroSeconds(value * 1000);
export const secondsToMilliseconds = (value) => Types.Timing.MilliSeconds(value * 1000);
export const secondsToMicroseconds = (value) => millisecondsToMicroseconds(secondsToMilliseconds(value));
export const microSecondsToMilliseconds = (value) => Types.Timing.MilliSeconds(value / 1000);
export const microSecondsToSeconds = (value) => Types.Timing.Seconds(value / 1000 / 1000);
export function timeStampForEventAdjustedByClosestNavigation(event, traceBounds, navigationsByNavigationId, navigationsByFrameId) {
    let eventTimeStamp = event.ts - traceBounds.min;
    if (event.args?.data?.navigationId) {
        const navigationForEvent = navigationsByNavigationId.get(event.args.data.navigationId);
        if (navigationForEvent) {
            eventTimeStamp = event.ts - navigationForEvent.ts;
        }
    }
    else if (event.args?.data?.frame) {
        const navigationForEvent = getNavigationForTraceEvent(event, event.args.data.frame, navigationsByFrameId);
        if (navigationForEvent) {
            eventTimeStamp = event.ts - navigationForEvent.ts;
        }
    }
    return Types.Timing.MicroSeconds(eventTimeStamp);
}
// Expands the trace window by a provided percentage or, if it the expanded window is smaller than 1 millisecond, expands it to 1 millisecond.
// If the expanded window is outside of the max trace window, cut the overflowing bound to the max trace window bound.
export function expandWindowByPercentOrToOneMillisecond(annotationWindow, maxTraceWindow, percentage) {
    // Expand min and max of the window by half of the provided percentage. That way, in total, the window will be expanded by the provided percentage.
    let newMin = annotationWindow.min - annotationWindow.range * (percentage / 100) / 2;
    let newMax = annotationWindow.max + annotationWindow.range * (percentage / 100) / 2;
    if (newMax - newMin < 1_000) {
        const rangeMiddle = (annotationWindow.min + annotationWindow.max) / 2;
        newMin = rangeMiddle - 500;
        newMax = rangeMiddle + 500;
    }
    newMin = Math.max(newMin, maxTraceWindow.min);
    newMax = Math.min(newMax, maxTraceWindow.max);
    const expandedWindow = {
        min: Types.Timing.MicroSeconds(newMin),
        max: Types.Timing.MicroSeconds(newMax),
        range: Types.Timing.MicroSeconds(newMax - newMin),
    };
    return expandedWindow;
}
export function eventTimingsMicroSeconds(event) {
    return {
        startTime: event.ts,
        endTime: Types.Timing.MicroSeconds(event.ts + (event.dur ?? Types.Timing.MicroSeconds(0))),
        duration: Types.Timing.MicroSeconds(event.dur || 0),
    };
}
export function eventTimingsMilliSeconds(event) {
    const microTimes = eventTimingsMicroSeconds(event);
    return {
        startTime: microSecondsToMilliseconds(microTimes.startTime),
        endTime: microSecondsToMilliseconds(microTimes.endTime),
        duration: microSecondsToMilliseconds(microTimes.duration),
    };
}
export function eventTimingsSeconds(event) {
    const microTimes = eventTimingsMicroSeconds(event);
    return {
        startTime: microSecondsToSeconds(microTimes.startTime),
        endTime: microSecondsToSeconds(microTimes.endTime),
        duration: microSecondsToSeconds(microTimes.duration),
    };
}
export function traceWindowMilliSeconds(bounds) {
    return {
        min: microSecondsToMilliseconds(bounds.min),
        max: microSecondsToMilliseconds(bounds.max),
        range: microSecondsToMilliseconds(bounds.range),
    };
}
export function traceWindowMillisecondsToMicroSeconds(bounds) {
    return {
        min: millisecondsToMicroseconds(bounds.min),
        max: millisecondsToMicroseconds(bounds.max),
        range: millisecondsToMicroseconds(bounds.range),
    };
}
export function traceWindowMicroSecondsToMilliSeconds(bounds) {
    return {
        min: microSecondsToMilliseconds(bounds.min),
        max: microSecondsToMilliseconds(bounds.max),
        range: microSecondsToMilliseconds(bounds.range),
    };
}
export function traceWindowFromMilliSeconds(min, max) {
    const traceWindow = {
        min: millisecondsToMicroseconds(min),
        max: millisecondsToMicroseconds(max),
        range: Types.Timing.MicroSeconds(millisecondsToMicroseconds(max) - millisecondsToMicroseconds(min)),
    };
    return traceWindow;
}
export function traceWindowFromMicroSeconds(min, max) {
    const traceWindow = {
        min,
        max,
        range: Types.Timing.MicroSeconds(max - min),
    };
    return traceWindow;
}
/**
 * Checks to see if the timeRange is within the bounds. By "within" we mean
 * "has any overlap":
 *         |------------------------|
 *      ==                                     no overlap (entirely before)
 *       =========                             overlap
 *            =========                        overlap
 *                             =========       overlap
 *                                     ====    no overlap (entirely after)
 *        ==============================       overlap (time range is larger than bounds)
 *         |------------------------|
 */
export function boundsIncludeTimeRange(data) {
    const { min: visibleMin, max: visibleMax } = data.bounds;
    const { min: rangeMin, max: rangeMax } = data.timeRange;
    return visibleMin <= rangeMax && visibleMax >= rangeMin;
}
/** Checks to see if the event is within or overlaps the bounds */
export function eventIsInBounds(event, bounds) {
    const startTime = event.ts;
    return startTime <= bounds.max && bounds.min <= (startTime + (event.dur ?? 0));
}
export function timestampIsInBounds(bounds, timestamp) {
    return timestamp >= bounds.min && timestamp <= bounds.max;
}
/**
 * Returns true if the window fits entirely within the bounds.
 * Note that if the window is equivalent to the bounds, that is considered to fit
 */
export function windowFitsInsideBounds(data) {
    return data.window.min >= data.bounds.min && data.window.max <= data.bounds.max;
}
export function windowsEqual(w1, w2) {
    return w1.min === w2.min && w1.max === w2.max;
}
//# sourceMappingURL=Timing.js.map