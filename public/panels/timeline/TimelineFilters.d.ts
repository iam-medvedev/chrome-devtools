import * as Trace from '../../models/trace/trace.js';
export declare class IsLong extends Trace.Extras.TraceFilter.TraceFilter {
    #private;
    constructor();
    setMinimumRecordDuration(value: Trace.Types.Timing.Milli): void;
    accept(event: Trace.Types.Events.Event): boolean;
}
export declare class Category extends Trace.Extras.TraceFilter.TraceFilter {
    constructor();
    accept(event: Trace.Types.Events.Event): boolean;
}
export declare class TimelineRegExp extends Trace.Extras.TraceFilter.TraceFilter {
    private regExpInternal;
    constructor(regExp?: RegExp);
    setRegExp(regExp: RegExp | null): void;
    regExp(): RegExp | null;
    accept(event: Trace.Types.Events.Event, parsedTrace?: Trace.Handlers.Types.ParsedTrace): boolean;
}
