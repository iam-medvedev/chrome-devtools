import type * as CrUXManager from '../../crux-manager/crux-manager.js';
import * as Types from '../types/types.js';
import { type InsightModels, type InsightSet, type InsightSetContext, type MetricSavings, type TraceInsightSets } from './types.js';
export declare function getInsight<InsightName extends keyof InsightModels>(insightName: InsightName, insights: TraceInsightSets | null, key: string | null): InsightModels[InsightName] | null;
export declare function getLCP(insights: TraceInsightSets | null, key: string | null): {
    value: Types.Timing.Micro;
    event: Types.Events.LargestContentfulPaintCandidate;
} | null;
export declare function getINP(insights: TraceInsightSets | null, key: string | null): {
    value: Types.Timing.Micro;
    event: Types.Events.SyntheticInteractionPair;
} | null;
export declare function getCLS(insights: TraceInsightSets | null, key: string | null): {
    value: number;
    worstClusterEvent: Types.Events.Event | null;
};
export declare function evaluateLCPMetricScore(value: number): number;
export declare function evaluateINPMetricScore(value: number): number;
export declare function evaluateCLSMetricScore(value: number): number;
export interface CrUXFieldMetricTimingResult {
    value: Types.Timing.Micro;
    pageScope: CrUXManager.PageScope;
}
export interface CrUXFieldMetricNumberResult {
    value: number;
    pageScope: CrUXManager.PageScope;
}
export interface CrUXFieldMetricResults {
    fcp: CrUXFieldMetricTimingResult | null;
    lcp: CrUXFieldMetricTimingResult | null;
    inp: CrUXFieldMetricTimingResult | null;
    cls: CrUXFieldMetricNumberResult | null;
    lcpPhases: {
        ttfb: CrUXFieldMetricTimingResult | null;
        loadDelay: CrUXFieldMetricTimingResult | null;
        loadDuration: CrUXFieldMetricTimingResult | null;
        renderDelay: CrUXFieldMetricTimingResult | null;
    };
}
export declare function getFieldMetricsForInsightSet(insightSet: InsightSet, metadata: Types.File.MetaData | null, scope?: CrUXManager.Scope | null): CrUXFieldMetricResults | null;
export declare function calculateMetricWeightsForSorting(insightSet: InsightSet, metadata: Types.File.MetaData | null): {
    lcp: number;
    inp: number;
    cls: number;
};
/**
 * Estimates the FCP & LCP savings for wasted bytes in `wastedBytesByRequestId`.
 */
export declare function metricSavingsForWastedBytes(wastedBytesByRequestId: Map<string, number>, context: InsightSetContext): MetricSavings | undefined;
