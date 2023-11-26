import * as TraceEngine from '../../models/trace/trace.js';
import { RecordType } from './TimelineModel.js';
export declare abstract class TimelineModelFilter {
    abstract accept(_event: TraceEngine.Legacy.CompatibleTraceEvent, traceParsedData?: TraceEngine.Handlers.Types.TraceParseData): boolean;
}
export declare class TimelineVisibleEventsFilter extends TimelineModelFilter {
    private readonly visibleTypes;
    constructor(visibleTypes: string[]);
    accept(event: TraceEngine.Legacy.CompatibleTraceEvent): boolean;
    static eventType(event: TraceEngine.Legacy.CompatibleTraceEvent): RecordType;
}
export declare class TimelineInvisibleEventsFilter extends TimelineModelFilter {
    private invisibleTypes;
    constructor(invisibleTypes: string[]);
    accept(event: TraceEngine.Legacy.CompatibleTraceEvent): boolean;
}
export declare class ExclusiveNameFilter extends TimelineModelFilter {
    private excludeNames;
    constructor(excludeNames: string[]);
    accept(event: TraceEngine.Legacy.CompatibleTraceEvent): boolean;
}
