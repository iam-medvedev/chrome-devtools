import type * as Types from '../types/types.js';
import type { InsightModels, InsightSet, TraceInsightSets } from './types.js';
export declare function getInsight<InsightName extends keyof InsightModels>(insightName: InsightName, insights: TraceInsightSets | null, key: string | null): InsightModels[InsightName] | null;
export declare function getLCP(insights: TraceInsightSets | null, key: string | null): {
    value: Types.Timing.MicroSeconds;
    event: Types.Events.LargestContentfulPaintCandidate;
} | null;
export declare function getINP(insights: TraceInsightSets | null, key: string | null): {
    value: Types.Timing.MicroSeconds;
    event: Types.Events.SyntheticInteractionPair;
} | null;
export declare function getCLS(insights: TraceInsightSets | null, key: string | null): {
    value: number;
    worstShiftEvent: Types.Events.Event | null;
};
export declare function evaluateLCPMetricScore(value: number): number;
export declare function evaluateINPMetricScore(value: number): number;
export declare function evaluateCLSMetricScore(value: number): number;
export declare function calculateMetricWeightsForSorting(insightSet: InsightSet, metadata: Types.File.MetaData | null): {
    lcp: number;
    inp: number;
    cls: number;
};
