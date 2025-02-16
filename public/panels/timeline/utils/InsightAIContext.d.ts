import type * as Trace from '../../../models/trace/trace.js';
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
    constructor(insight: Trace.Insights.Types.InsightModel<{}, {}>, parsedTrace: Trace.Handlers.Types.ParsedTrace);
    title(): string;
}
