import * as Trace from '../../trace/trace.js';
import type { ConversationSuggestion } from '../agents/AiAgent.js';
export declare class PerformanceInsightFormatter {
    #private;
    constructor(parsedTrace: Trace.Handlers.Types.ParsedTrace, insight: Trace.Insights.Types.InsightModel);
    insightIsSupported(): boolean;
    getSuggestions(): [ConversationSuggestion, ...ConversationSuggestion[]];
    /**
     * Create an AI prompt string out of the NetworkDependencyTree Insight model to use with Ask AI.
     * Note: This function accesses the UIStrings within NetworkDependencyTree to help build the
     * AI prompt, but does not (and should not) call i18nString to localize these strings. They
     * should all be sent in English (at least for now).
     * @param insight The Network Dependency Tree Insight Model to query.
     * @returns a string formatted for sending to Ask AI.
     */
    formatNetworkDependencyTreeInsight(insight: Trace.Insights.Models.NetworkDependencyTree.NetworkDependencyTreeInsightModel): string;
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
