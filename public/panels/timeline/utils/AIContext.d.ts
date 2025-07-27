import type * as Trace from '../../../models/trace/trace.js';
import type { AICallTree } from './AICallTree.js';
interface AgentFocusDataCallTree {
    type: 'call-tree';
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    callTree: AICallTree;
}
interface AgentFocusDataInsight {
    type: 'insight';
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    insight: Trace.Insights.Types.InsightModel;
    insightSetBounds: Trace.Types.Timing.TraceWindowMicro;
}
type AgentFocusData = AgentFocusDataCallTree | AgentFocusDataInsight;
export declare class AgentFocus {
    #private;
    static fromInsight(parsedTrace: Trace.Handlers.Types.ParsedTrace, insight: Trace.Insights.Types.InsightModel, insightSetBounds: Trace.Types.Timing.TraceWindowMicro): AgentFocus;
    static fromCallTree(callTree: AICallTree): AgentFocus;
    constructor(data: AgentFocusData);
    get data(): AgentFocusData;
}
export {};
