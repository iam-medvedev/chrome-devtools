import * as Trace from '../../models/trace/trace.js';
type PermittedObjectTypes = Trace.Types.Events.LegacyTimelineFrame | Trace.Types.Events.Event | SelectionRange;
declare const SelectionRangeSymbol: unique symbol;
export type SelectionRange = typeof SelectionRangeSymbol;
export declare class TimelineSelection {
    readonly startTime: Trace.Types.Timing.MilliSeconds;
    readonly endTime: Trace.Types.Timing.MilliSeconds;
    readonly object: PermittedObjectTypes;
    constructor(startTime: Trace.Types.Timing.MilliSeconds, endTime: Trace.Types.Timing.MilliSeconds, object: PermittedObjectTypes);
    static isLegacyTimelineFrame(object: PermittedObjectTypes): object is Trace.Types.Events.LegacyTimelineFrame;
    static fromFrame(frame: Trace.Types.Events.LegacyTimelineFrame): TimelineSelection;
    static isSyntheticNetworkRequestDetailsEventSelection(object: PermittedObjectTypes): object is Trace.Types.Events.SyntheticNetworkRequest;
    static isNetworkEventSelection(object: PermittedObjectTypes): object is Trace.Types.Events.SyntheticNetworkRequest | Trace.Types.Events.WebSocketEvent;
    static isTraceEventSelection(object: PermittedObjectTypes): object is Trace.Types.Events.Event;
    static fromTraceEvent(event: Trace.Types.Events.Event): TimelineSelection;
    static isRangeSelection(object: PermittedObjectTypes): object is SelectionRange;
    static fromRange(startTime: number, endTime: number): TimelineSelection;
}
export {};
