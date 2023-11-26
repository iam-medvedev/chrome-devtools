import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as TraceEngine from '../../models/trace/trace.js';
type PermittedObjectTypes = TimelineModel.TimelineFrameModel.TimelineFrame | TraceEngine.Legacy.Event | TraceEngine.Types.TraceEvents.TraceEventData | SelectionRange;
declare const SelectionRangeSymbol: unique symbol;
export type SelectionRange = typeof SelectionRangeSymbol;
export declare class TimelineSelection {
    readonly startTime: TraceEngine.Types.Timing.MilliSeconds;
    readonly endTime: TraceEngine.Types.Timing.MilliSeconds;
    readonly object: PermittedObjectTypes;
    constructor(startTime: TraceEngine.Types.Timing.MilliSeconds, endTime: TraceEngine.Types.Timing.MilliSeconds, object: PermittedObjectTypes);
    static isFrameObject(object: PermittedObjectTypes): object is TimelineModel.TimelineFrameModel.TimelineFrame;
    static fromFrame(frame: TimelineModel.TimelineFrameModel.TimelineFrame): TimelineSelection;
    static isSyntheticNetworkRequestDetailsEventSelection(object: PermittedObjectTypes): object is TraceEngine.Types.TraceEvents.TraceEventSyntheticNetworkRequest;
    static isTraceEventSelection(object: PermittedObjectTypes): object is TraceEngine.Legacy.Event | TraceEngine.Types.TraceEvents.TraceEventData;
    static fromTraceEvent(event: TraceEngine.Legacy.CompatibleTraceEvent): TimelineSelection;
    static isRangeSelection(object: PermittedObjectTypes): object is SelectionRange;
    static fromRange(startTime: number, endTime: number): TimelineSelection;
}
export {};
