import * as Trace from '../../models/trace/trace.js';
export declare abstract class TimelineModelFilter {
    abstract accept(_event: Trace.Types.Events.Event, parsedTrace?: Trace.Handlers.Types.ParsedTrace): boolean;
}
export declare class TimelineVisibleEventsFilter extends TimelineModelFilter {
    private readonly visibleTypes;
    constructor(visibleTypes: string[]);
    accept(event: Trace.Types.Events.Event): boolean;
    static eventType(event: Trace.Types.Events.Event): Trace.Types.Events.Name;
}
export declare class TimelineInvisibleEventsFilter extends TimelineModelFilter {
    #private;
    constructor(invisibleTypes: Trace.Types.Events.Name[]);
    accept(event: Trace.Types.Events.Event): boolean;
}
export declare class ExclusiveNameFilter extends TimelineModelFilter {
    #private;
    constructor(excludeNames: Trace.Types.Events.Name[]);
    accept(event: Trace.Types.Events.Event): boolean;
}
