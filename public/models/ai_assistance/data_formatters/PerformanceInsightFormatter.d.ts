import type * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import * as Trace from '../../trace/trace.js';
export declare class PerformanceInsightFormatter {
    #private;
    constructor(activeInsight: TimelineUtils.InsightAIContext.ActiveInsight);
    insightIsSupported(): boolean;
    formatInsight(): string;
}
export interface NetworkRequestFormatOptions {
    verbose: boolean;
    customTitle?: string;
}
export declare class TraceEventFormatter {
    static layoutShift(shift: Trace.Types.Events.SyntheticLayoutShift, index: number, parsedTrace: Trace.Handlers.Types.ParsedTrace, rootCauses?: Trace.Insights.Models.CLSCulprits.LayoutShiftRootCausesData): string;
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
