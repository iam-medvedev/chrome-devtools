import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as TraceEngine from '../../models/trace/trace.js';
export declare class IsLong extends TimelineModel.TimelineModelFilter.TimelineModelFilter {
    private minimumRecordDuration;
    constructor();
    setMinimumRecordDuration(value: number): void;
    accept(event: TraceEngine.Legacy.CompatibleTraceEvent): boolean;
}
export declare class Category extends TimelineModel.TimelineModelFilter.TimelineModelFilter {
    constructor();
    accept(event: TraceEngine.Legacy.CompatibleTraceEvent): boolean;
}
export declare class TimelineRegExp extends TimelineModel.TimelineModelFilter.TimelineModelFilter {
    private regExpInternal;
    constructor(regExp?: RegExp);
    setRegExp(regExp: RegExp | null): void;
    regExp(): RegExp | null;
    accept(event: TraceEngine.Legacy.CompatibleTraceEvent, traceParsedData?: TraceEngine.Handlers.Types.TraceParseData): boolean;
}
