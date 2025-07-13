import * as Trace from '../../../models/trace/trace.js';
import { AICallTree } from './AICallTree.js';
/**
 * This class holds the Insight that is active when the user has entered the
 * Ask AI flow from the Insights sidebar.
 * Ideally we would just use the InsightModel instance itself, but we need to
 * also store a reference to the parsed trace as we use that to populate the
 * data provided to the LLM, so we use this class as a container for the insight
 * and the parsed trace.
 */
export declare class ActiveInsight {
    #private;
    constructor(insight: Trace.Insights.Types.InsightModel, insightSetBounds: Trace.Types.Timing.TraceWindowMicro, parsedTrace: Trace.Handlers.Types.ParsedTrace);
    get insight(): Readonly<Trace.Insights.Types.InsightModel>;
    get insightSetBounds(): Readonly<Trace.Types.Timing.TraceWindowMicro>;
    get parsedTrace(): Trace.Handlers.Types.ParsedTrace;
    title(): string;
}
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
    /**
     * Returns an AI Call Tree representing the activity on the main thread for
     * the relevant time range of the given insight.
     */
    static mainThreadActivity(insight: Trace.Insights.Types.InsightModel, insightSetBounds: Trace.Types.Timing.TraceWindowMicro, parsedTrace: Trace.Handlers.Types.ParsedTrace): AICallTree | null;
}
