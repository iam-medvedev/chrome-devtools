import * as Trace from '../../../models/trace/trace.js';
import type { AICallTree } from './AICallTree.js';
export interface AgentFocusDataFull {
    type: 'full';
    parsedTrace: Trace.TraceModel.ParsedTrace;
    insightSet: Trace.Insights.Types.InsightSet | null;
}
interface AgentFocusDataCallTree {
    type: 'call-tree';
    parsedTrace: Trace.TraceModel.ParsedTrace;
    insightSet: Trace.Insights.Types.InsightSet | null;
    callTree: AICallTree;
}
export interface AgentFocusDataInsight {
    type: 'insight';
    parsedTrace: Trace.TraceModel.ParsedTrace;
    insightSet: Trace.Insights.Types.InsightSet | null;
    insight: Trace.Insights.Types.InsightModel;
}
type AgentFocusData = AgentFocusDataCallTree | AgentFocusDataInsight | AgentFocusDataFull;
export declare class AgentFocus {
    #private;
    static full(parsedTrace: Trace.TraceModel.ParsedTrace): AgentFocus;
    static fromInsight(parsedTrace: Trace.TraceModel.ParsedTrace, insight: Trace.Insights.Types.InsightModel): AgentFocus;
    static fromCallTree(callTree: AICallTree): AgentFocus;
    constructor(data: AgentFocusData);
    get data(): AgentFocusData;
}
export declare function getPerformanceAgentFocusFromModel(model: Trace.TraceModel.Model): AgentFocus | null;
export {};
