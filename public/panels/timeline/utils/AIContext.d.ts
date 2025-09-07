import type * as Trace from '../../../models/trace/trace.js';
import type { AICallTree } from './AICallTree.js';
export interface AgentFocusDataFull {
    type: 'full';
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    insightSet: Trace.Insights.Types.InsightSet | null;
    traceMetadata: Trace.Types.File.MetaData;
}
interface AgentFocusDataCallTree {
    type: 'call-tree';
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    callTree: AICallTree;
}
export interface AgentFocusDataInsight {
    type: 'insight';
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    insightSet: Trace.Insights.Types.InsightSet | null;
    traceMetadata: Trace.Types.File.MetaData;
    insight: Trace.Insights.Types.InsightModel;
}
type AgentFocusData = AgentFocusDataCallTree | AgentFocusDataInsight | AgentFocusDataFull;
export declare class AgentFocus {
    #private;
    static full(parsedTrace: Trace.Handlers.Types.ParsedTrace, insights: Trace.Insights.Types.TraceInsightSets, traceMetadata: Trace.Types.File.MetaData): AgentFocus;
    static fromInsight(parsedTrace: Trace.Handlers.Types.ParsedTrace, insights: Trace.Insights.Types.TraceInsightSets, traceMetadata: Trace.Types.File.MetaData, insight: Trace.Insights.Types.InsightModel): AgentFocus;
    static fromCallTree(callTree: AICallTree): AgentFocus;
    constructor(data: AgentFocusData);
    get data(): AgentFocusData;
}
export declare function getPerformanceAgentFocusFromModel(model: Trace.TraceModel.Model): AgentFocus | null;
export {};
