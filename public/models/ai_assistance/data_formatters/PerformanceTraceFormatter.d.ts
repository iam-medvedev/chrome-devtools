import * as Trace from '../../trace/trace.js';
import type { AICallTree } from '../performance/AICallTree.js';
import type { AgentFocus } from '../performance/AIContext.js';
export declare class PerformanceTraceFormatter {
    #private;
    constructor(focus: AgentFocus, eventsSerializer: Trace.EventsSerializer.EventsSerializer);
    serializeEvent(event: Trace.Types.Events.Event): string;
    serializeBounds(bounds: Trace.Types.Timing.TraceWindowMicro): string;
    formatTraceSummary(): string;
    formatCriticalRequests(): string;
    formatMainThreadBottomUpSummary(): string;
    formatThirdPartySummary(): string;
    formatLongestTasks(): string;
    formatMainThreadTrackSummary(bounds: Trace.Types.Timing.TraceWindowMicro): string;
    formatNetworkTrackSummary(bounds: Trace.Types.Timing.TraceWindowMicro): string;
    formatCallTree(tree: AICallTree, headerLevel?: number): string;
}
