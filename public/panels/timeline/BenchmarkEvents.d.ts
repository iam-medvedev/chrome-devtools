import type * as Trace from '../../models/trace/trace.js';
export declare class TraceLoadEvent extends Event {
    duration: Trace.Types.Timing.MilliSeconds;
    static readonly eventName = "traceload";
    constructor(duration: Trace.Types.Timing.MilliSeconds);
}
declare global {
    interface HTMLElementEventMap {
        [TraceLoadEvent.eventName]: TraceLoadEvent;
    }
}
