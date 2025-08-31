import * as Trace from '../../models/trace/trace.js';
import * as TimelineUtils from '../../panels/timeline/utils/utils.js';
type PerformanceAgentResponse = {
    focus: TimelineUtils.AIContext.AgentFocus;
} | {
    error: string;
};
/**
 * For an external request, get the insight to debug based on its user visible title.
 * Currently, this function makes some assumptions that in time we will need to
 * avoid:
 * - It assumes a trace exists that had one or zero navigations. It is unable
 *   to figure out which insight to use if there are >1 navigations -it would need
 *   some extra input data to figure it out.
 */
export declare function getInsightAgentFocusToDebug(model: Trace.TraceModel.Model, insightTitle: string): Promise<PerformanceAgentResponse>;
export {};
