// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Trace from '../../models/trace/trace.js';
const SelectionRangeSymbol = Symbol('SelectionRange');
export class TimelineSelection {
    startTime;
    endTime;
    object;
    constructor(startTime, endTime, object) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.object = object;
    }
    static isLegacyTimelineFrame(object) {
        return typeof object !== 'symbol' && Trace.Types.Events.isLegacyTimelineFrame(object);
    }
    static fromFrame(frame) {
        return new TimelineSelection(Trace.Helpers.Timing.microSecondsToMilliseconds(frame.startTime), Trace.Helpers.Timing.microSecondsToMilliseconds(frame.endTime), frame);
    }
    static isSyntheticNetworkRequestDetailsEventSelection(object) {
        if (TimelineSelection.isLegacyTimelineFrame(object) || TimelineSelection.isRangeSelection(object)) {
            return false;
        }
        // At this point we know the selection is a raw trace event, so we just
        // need to check it's the right type of raw event.
        return Trace.Types.Events.isSyntheticNetworkRequest(object);
    }
    static isNetworkEventSelection(object) {
        if (TimelineSelection.isLegacyTimelineFrame(object) || TimelineSelection.isRangeSelection(object)) {
            return false;
        }
        // At this point we know the selection is a raw trace event, so we just
        // need to check it's the right type of raw event.
        return Trace.Types.Events.isNetworkTrackEntry(object);
    }
    static isTraceEventSelection(object) {
        // Trace events are just raw objects, so now we have to confirm it is a trace event by ruling everything else out.
        if (TimelineSelection.isLegacyTimelineFrame(object) || TimelineSelection.isRangeSelection(object)) {
            return false;
        }
        // Although Network Requests are trace events, in TimelineSelection we
        // treat Network requests distinctly
        if (Trace.Types.Events.isSyntheticNetworkRequest(object)) {
            return false;
        }
        return true;
    }
    static fromTraceEvent(event) {
        const { startTime, endTime } = Trace.Helpers.Timing.eventTimingsMilliSeconds(event);
        return new TimelineSelection(startTime, Trace.Types.Timing.MilliSeconds(endTime || (startTime + 1)), event);
    }
    static isRangeSelection(object) {
        return object === SelectionRangeSymbol;
    }
    static fromRange(startTime, endTime) {
        return new TimelineSelection(Trace.Types.Timing.MilliSeconds(startTime), Trace.Types.Timing.MilliSeconds(endTime), SelectionRangeSymbol);
    }
}
//# sourceMappingURL=TimelineSelection.js.map