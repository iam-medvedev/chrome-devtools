import * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import * as Trace from '../../trace/trace.js';
export declare class PerformanceTraceFormatter {
    #private;
    constructor(focus: TimelineUtils.AIContext.AgentFocus, eventsSerializer: TimelineUtils.EventsSerializer.EventsSerializer);
    serializeEvent(event: Trace.Types.Events.Event): string;
    serializeBounds(bounds: Trace.Types.Timing.TraceWindowMicro): string;
    formatTraceSummary(): string;
    formatCriticalRequests(): string;
    formatMainThreadBottomUpSummary(): string;
    formatThirdPartySummary(): string;
    formatLongestTasks(): string;
    formatMainThreadTrackSummary(min: Trace.Types.Timing.Micro, max: Trace.Types.Timing.Micro): string;
}
