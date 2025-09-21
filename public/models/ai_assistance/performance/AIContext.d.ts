import * as Trace from '../../../models/trace/trace.js';
import type { AICallTree } from './AICallTree.js';
export interface AgentFocusData {
    parsedTrace: Trace.TraceModel.ParsedTrace;
    insightSet: Trace.Insights.Types.InsightSet | null;
    callTree: AICallTree | null;
    insight: Trace.Insights.Types.InsightModel | null;
}
export declare class AgentFocus {
    #private;
    static full(parsedTrace: Trace.TraceModel.ParsedTrace): AgentFocus;
    static fromInsight(parsedTrace: Trace.TraceModel.ParsedTrace, insight: Trace.Insights.Types.InsightModel): AgentFocus;
    static fromCallTree(callTree: AICallTree): AgentFocus;
    constructor(data: AgentFocusData);
    get data(): AgentFocusData;
    withInsight(insight: Trace.Insights.Types.InsightModel | null): AgentFocus;
    withCallTree(callTree: AICallTree | null): AgentFocus;
}
export declare function getPerformanceAgentFocusFromModel(model: Trace.TraceModel.Model): AgentFocus | null;
