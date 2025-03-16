import * as Trace from '../../../models/trace/trace.js';
import type * as TimelineUtils from '../../timeline/utils/utils.js';
export declare class PerformanceInsightFormatter {
    #private;
    constructor(activeInsight: TimelineUtils.InsightAIContext.ActiveInsight);
    formatInsight(): string;
}
export interface NetworkRequestFormatOptions {
    verbose: boolean;
}
export declare class TraceEventFormatter {
    /**
     * This is the data passed to a network request when the Performance Insights
     * agent is asking for information. It is a slimmed down version of the
     * request's data to avoid using up too much of the context window.
     * IMPORTANT: these set of fields have been reviewed by Chrome Privacy &
     * Security; be careful about adding new data here. If you are in doubt please
     * talk to jacktfranklin@.
     */
    static networkRequest(request: Trace.Types.Events.SyntheticNetworkRequest, parsedTrace: Trace.Handlers.Types.ParsedTrace, options: NetworkRequestFormatOptions): string;
}
