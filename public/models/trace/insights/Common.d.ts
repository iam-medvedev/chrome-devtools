import type * as Handlers from '../handlers/handlers.js';
import type * as Types from '../types/types.js';
import type { InsightResults, InsightSetContextWithNavigation, TraceInsightSets } from './types.js';
export declare function getInsight<InsightName extends keyof InsightResults>(insightName: InsightName, insights: TraceInsightSets | null, key: string | null): InsightResults[InsightName] | null;
/**
 * Finds a network request given a navigation context and URL.
 * Considers redirects.
 */
export declare function findRequest(parsedTrace: Pick<Handlers.Types.ParsedTrace, 'Meta' | 'NetworkRequests'>, context: InsightSetContextWithNavigation, url: string): Types.Events.SyntheticNetworkRequest | null;
export declare function findLCPRequest(parsedTrace: Pick<Handlers.Types.ParsedTrace, 'Meta' | 'NetworkRequests' | 'LargestImagePaint'>, context: InsightSetContextWithNavigation, lcpEvent: Types.Events.LargestContentfulPaintCandidate): Types.Events.SyntheticNetworkRequest | null;
