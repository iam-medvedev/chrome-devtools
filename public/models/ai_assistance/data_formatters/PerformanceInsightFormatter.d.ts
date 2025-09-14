import * as Trace from '../../trace/trace.js';
import type { ConversationSuggestion } from '../agents/AiAgent.js';
export declare class PerformanceInsightFormatter {
    #private;
    constructor(parsedTrace: Trace.TraceModel.ParsedTrace, insight: Trace.Insights.Types.InsightModel);
    insightIsSupported(): boolean;
    getSuggestions(): [ConversationSuggestion, ...ConversationSuggestion[]];
    /**
     * Create an AI prompt string out of the Cache Insight model to use with Ask AI.
     * Note: This function accesses the UIStrings within Cache to help build the
     * AI prompt, but does not (and should not) call i18nString to localize these strings. They
     * should all be sent in English (at least for now).
     * @param insight The Cache Insight Model to query.
     * @returns a string formatted for sending to Ask AI.
     */
    formatCacheInsight(insight: Trace.Insights.Models.Cache.CacheInsightModel): string;
    /**
     * Create an AI prompt string out of the DOM Size model to use with Ask AI.
     * Note: This function accesses the UIStrings within DomSize to help build the
     * AI prompt, but does not (and should not) call i18nString to localize these strings. They
     * should all be sent in English (at least for now).
     * @param insight The DOM Size Insight Model to query.
     * @returns a string formatted for sending to Ask AI.
     */
    formatDomSizeInsight(insight: Trace.Insights.Models.DOMSize.DOMSizeInsightModel): string;
    /**
     * Create an AI prompt string out of the NetworkDependencyTree Insight model to use with Ask AI.
     * Note: This function accesses the UIStrings within NetworkDependencyTree to help build the
     * AI prompt, but does not (and should not) call i18nString to localize these strings. They
     * should all be sent in English (at least for now).
     * @param insight The Network Dependency Tree Insight Model to query.
     * @returns a string formatted for sending to Ask AI.
     */
    formatFontDisplayInsight(insight: Trace.Insights.Models.FontDisplay.FontDisplayInsightModel): string;
    /**
     * Create an AI prompt string out of the Forced Reflow Insight model to use with Ask AI.
     * Note: This function accesses the UIStrings within ForcedReflow model to help build the
     * AI prompt, but does not (and should not) call i18nString to localize these strings. They
     * should all be sent in English (at least for now).
     * @param insight The ForcedReflow Insight Model to query.
     * @returns a string formatted for sending to Ask AI.
     */
    formatForcedReflowInsight(insight: Trace.Insights.Models.ForcedReflow.ForcedReflowInsightModel): string;
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
     * Create an AI prompt string out of the Slow CSS Selector Insight model to use with Ask AI.
     * Note: This function accesses the UIStrings within SlowCSSSelector to help build the
     * AI prompt, but does not (and should not) call i18nString to localize these strings. They
     * should all be sent in English (at least for now).
     * @param insight The Network Dependency Tree Insight Model to query.
     * @returns a string formatted for sending to Ask AI.
     */
    formatSlowCssSelectorsInsight(insight: Trace.Insights.Models.SlowCSSSelector.SlowCSSSelectorInsightModel): string;
    /**
     * Create an AI prompt string out of the ThirdParties Insight model to use with Ask AI.
     * Note: This function accesses the UIStrings within ThirdParties to help build the
     * AI prompt, but does not (and should not) call i18nString to localize these strings. They
     * should all be sent in English (at least for now).
     * @param insight The Third Parties Insight Model to query.
     * @returns a string formatted for sending to Ask AI.
     */
    formatThirdPartiesInsight(insight: Trace.Insights.Models.ThirdParties.ThirdPartiesInsightModel): string;
    /**
     * Create an AI prompt string out of the Viewport [Mobile] Insight model to use with Ask AI.
     * Note: This function accesses the UIStrings within Viewport to help build the
     * AI prompt, but does not (and should not) call i18nString to localize these strings. They
     * should all be sent in English (at least for now).
     * @param insight The Network Dependency Tree Insight Model to query.
     * @returns a string formatted for sending to Ask AI.
     */
    formatViewportInsight(insight: Trace.Insights.Models.Viewport.ViewportInsightModel): string;
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
    static layoutShift(shift: Trace.Types.Events.SyntheticLayoutShift, index: number, parsedTrace: Trace.TraceModel.ParsedTrace, rootCauses?: Trace.Insights.Models.CLSCulprits.LayoutShiftRootCausesData): string;
    static networkRequests(requests: readonly Trace.Types.Events.SyntheticNetworkRequest[], parsedTrace: Trace.TraceModel.ParsedTrace, options?: NetworkRequestFormatOptions): string;
    /**
     * Network requests format description that is sent to the model as a fact.
     */
    static networkDataFormatDescription: string;
}
