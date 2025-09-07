import * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import * as Trace from '../../trace/trace.js';
import type { UnitFormatters } from './Types.js';
export declare class PerformanceTraceFormatter {
    #private;
    constructor(formatters: UnitFormatters, focus: TimelineUtils.AIContext.AgentFocus, eventsSerializer: Trace.EventsSerializer.EventsSerializer);
    serializeEvent(event: Trace.Types.Events.Event): string;
    serializeBounds(bounds: Trace.Types.Timing.TraceWindowMicro): string;
    formatTraceSummary(): string;
    formatCriticalRequests(): string;
    formatMainThreadBottomUpSummary(): string;
    formatThirdPartySummary(): string;
    formatLongestTasks(): string;
    formatMainThreadTrackSummary(bounds: Trace.Types.Timing.TraceWindowMicro): string;
    formatNetworkTrackSummary(bounds: Trace.Types.Timing.TraceWindowMicro): string;
    formatCallTree(tree: TimelineUtils.AICallTree.AICallTree, headerLevel?: number): string;
}
