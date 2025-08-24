import * as Trace from '../../trace/trace.js';
import type { ConversationSuggestion } from '../agents/AiAgent.js';
export declare class PerformanceInsightFormatter {
    #private;
    constructor(parsedTrace: Trace.Handlers.Types.ParsedTrace, insight: Trace.Insights.Types.InsightModel);
    insightIsSupported(): boolean;
    getSuggestions(): [ConversationSuggestion, ...ConversationSuggestion[]];
    /**
     * Formats and outputs the insight's data.
     * Pass `{headingLevel: X}` to determine what heading level to use for the
     * titles in the markdown output. The default is 2 (##).
     */
    formatInsight(opts?: {
        headingLevel: number;
    }): string;
    estimatedSavings(): string;
}
export interface NetworkRequestFormatOptions {
    verbose?: boolean;
    customTitle?: string;
}
export declare class TraceEventFormatter {
    #private;
    static layoutShift(shift: Trace.Types.Events.SyntheticLayoutShift, index: number, parsedTrace: Trace.Handlers.Types.ParsedTrace, rootCauses?: Trace.Insights.Models.CLSCulprits.LayoutShiftRootCausesData): string;
    static networkRequests(requests: readonly Trace.Types.Events.SyntheticNetworkRequest[], parsedTrace: Trace.Handlers.Types.ParsedTrace, options?: NetworkRequestFormatOptions): string;
    /**
     * Network requests format description that is sent to the model as a fact.
     */
    static networkDataFormatDescription: string;
}
