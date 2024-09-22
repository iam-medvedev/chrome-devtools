import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as Trace from '../../models/trace/trace.js';
export declare class IsLong extends TimelineModel.TimelineModelFilter.TimelineModelFilter {
    #private;
    constructor();
    setMinimumRecordDuration(value: Trace.Types.Timing.MilliSeconds): void;
    accept(event: Trace.Types.Events.Event): boolean;
}
export declare class Category extends TimelineModel.TimelineModelFilter.TimelineModelFilter {
    constructor();
    accept(event: Trace.Types.Events.Event): boolean;
}
export declare class TimelineRegExp extends TimelineModel.TimelineModelFilter.TimelineModelFilter {
    private regExpInternal;
    constructor(regExp?: RegExp);
    setRegExp(regExp: RegExp | null): void;
    regExp(): RegExp | null;
    accept(event: Trace.Types.Events.Event, parsedTrace?: Trace.Handlers.Types.ParsedTrace): boolean;
}
