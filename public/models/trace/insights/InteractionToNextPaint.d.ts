import { type SyntheticInteractionPair } from '../types/TraceEvents.js';
import { type InsightResult, type NavigationInsightContext, type RequiredData } from './types.js';
export declare function deps(): ['UserInteractions'];
export type INPInsightResult = InsightResult<{
    longestInteractionEvent?: SyntheticInteractionPair;
    highPercentileInteractionEvent?: SyntheticInteractionPair;
}>;
export declare function generateInsight(traceParsedData: RequiredData<typeof deps>, context: NavigationInsightContext): INPInsightResult;
