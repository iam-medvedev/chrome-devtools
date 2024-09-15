import * as Types from '../types/types.js';
import { type InsightResult, type NavigationInsightContext, type RequiredData } from './types.js';
export declare function deps(): ['SelectorStats'];
export type SlowCSSSelectorInsightResult = InsightResult<{
    totalElapsedMs: Types.Timing.MilliSeconds;
    totalMatchAttempts: number;
    totalMatchCount: number;
    topElapsedMs: Types.TraceEvents.SelectorTiming[];
    topMatchAttempts: Types.TraceEvents.SelectorTiming[];
}>;
export declare function generateInsight(traceParsedData: RequiredData<typeof deps>, context: NavigationInsightContext): SlowCSSSelectorInsightResult;
