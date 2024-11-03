import * as Trace from '../../models/trace/trace.js';
export type EventSelection = {
    event: Trace.Types.Events.Event;
};
export type TimeRangeSelection = {
    bounds: Trace.Types.Timing.TraceWindowMicroSeconds;
};
export type TimelineSelection = EventSelection | TimeRangeSelection;
export declare function selectionFromEvent(event: Trace.Types.Events.Event): EventSelection;
export declare function selectionFromRangeMicroSeconds(min: Trace.Types.Timing.MicroSeconds, max: Trace.Types.Timing.MicroSeconds): TimeRangeSelection;
export declare function selectionFromRangeMilliSeconds(min: Trace.Types.Timing.MilliSeconds, max: Trace.Types.Timing.MilliSeconds): TimeRangeSelection;
export declare function selectionIsEvent(selection: TimelineSelection | null): selection is EventSelection;
export declare function selectionIsRange(selection: TimelineSelection | null): selection is TimeRangeSelection;
export declare function rangeForSelection(selection: TimelineSelection): Trace.Types.Timing.TraceWindowMicroSeconds;
export declare function selectionsEqual(s1: TimelineSelection, s2: TimelineSelection): boolean;
