import * as Protocol from '../../../generated/protocol.js';
import type * as CrUXManager from '../../crux-manager/crux-manager.js';
import type * as Handlers from '../handlers/handlers.js';
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
export declare function evaluateLCPMetricScore(value: Types.Timing.Milli): number;
export declare function evaluateINPMetricScore(value: Types.Timing.Milli): number;
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
/**
 * Returns whether the network request was sent encoded.
 */
export declare function isRequestCompressed(request: Types.Events.SyntheticNetworkRequest): boolean;
/**
 * Estimates the number of bytes the content of this network record would have consumed on the network based on the
 * uncompressed size (totalBytes). Uses the actual transfer size from the network record if applicable,
 * minus the size of the response headers.
 *
 * @param totalBytes Uncompressed size of the resource
 */
export declare function estimateCompressedContentSize(request: Types.Events.SyntheticNetworkRequest | undefined, totalBytes: number, resourceType: Protocol.Network.ResourceType): number;
/**
 * Utility function to estimate the ratio of the compression of a script.
 * This excludes the size of the response headers.
 */
export declare function estimateCompressionRatioForScript(script: Handlers.ModelHandlers.Scripts.Script): number;
