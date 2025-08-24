import * as Trace from '../../../models/trace/trace.js';
import { AICallTree } from './AICallTree.js';
export declare class AIQueries {
    /**
     * Returns the set of network requests that occurred within the timeframe of this Insight.
     */
    static networkRequests(insight: Trace.Insights.Types.InsightModel, insightSetBounds: Trace.Types.Timing.TraceWindowMicro, parsedTrace: Trace.Handlers.Types.ParsedTrace): readonly Trace.Types.Events.SyntheticNetworkRequest[];
    /**
     * Returns the single network request. We do not check to filter this by the
     * bounds of the insight, because the only way that the LLM has found this
     * request is by first inspecting a summary of relevant network requests for
     * the given insight. So if it then looks up a request by URL, we know that
     * is a valid and relevant request.
     */
    static networkRequest(parsedTrace: Trace.Handlers.Types.ParsedTrace, url: string): Trace.Types.Events.SyntheticNetworkRequest | null;
    static findMainThread(navigationId: string | undefined, parsedTrace: Trace.Handlers.Types.ParsedTrace): Trace.Handlers.Threads.ThreadData | null;
    /**
     * Returns bottom up activity for the given range.
     */
    static mainThreadActivityBottomUp(navigationId: string | undefined, bounds: Trace.Types.Timing.TraceWindowMicro, parsedTrace: Trace.Handlers.Types.ParsedTrace): Trace.Extras.TraceTree.BottomUpRootNode | null;
    /**
     * Returns an AI Call Tree representing the activity on the main thread for
     * the relevant time range of the given insight.
     */
    static mainThreadActivityTopDown(navigationId: string | undefined, bounds: Trace.Types.Timing.TraceWindowMicro, parsedTrace: Trace.Handlers.Types.ParsedTrace): AICallTree | null;
    /**
     * Returns an AI Call Tree representing the activity on the main thread for
     * the relevant time range of the given insight.
     */
    static mainThreadActivityForInsight(insight: Trace.Insights.Types.InsightModel, insightSetBounds: Trace.Types.Timing.TraceWindowMicro, parsedTrace: Trace.Handlers.Types.ParsedTrace): AICallTree | null;
    /**
     * Returns the top longest tasks as AI Call Trees.
     */
    static longestTasks(navigationId: string | undefined, bounds: Trace.Types.Timing.TraceWindowMicro, parsedTrace: Trace.Handlers.Types.ParsedTrace, limit?: number): AICallTree[] | null;
}
/**
 * Calculates the trace bounds for the given insight that are relevant.
 *
 * Uses the insight's overlays to determine the relevant trace bounds. If there are
 * no overlays, falls back to the insight set's navigation bounds.
 */
export declare function insightBounds(insight: Trace.Insights.Types.InsightModel, insightSetBounds: Trace.Types.Timing.TraceWindowMicro): Trace.Types.Timing.TraceWindowMicro;
