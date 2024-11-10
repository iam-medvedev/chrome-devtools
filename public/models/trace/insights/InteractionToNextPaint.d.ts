import type { SyntheticInteractionPair } from '../types/TraceEvents.js';
import type { InsightModel, InsightSetContext, RequiredData } from './types.js';
export declare function deps(): ['UserInteractions'];
export type INPInsightModel = InsightModel<{
    longestInteractionEvent?: SyntheticInteractionPair;
    highPercentileInteractionEvent?: SyntheticInteractionPair;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): INPInsightModel;
