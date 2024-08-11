import type * as Handlers from '../handlers/handlers.js';
import type * as Types from '../types/types.js';
import { type NavigationInsightContext } from './types.js';
/**
 * Finds a network request given a navigation context and URL.
 * Considers redirects.
 */
export declare function findRequest(traceData: Pick<Handlers.Types.TraceParseData, 'Meta' | 'NetworkRequests'>, context: NavigationInsightContext, url: string): Types.TraceEvents.SyntheticNetworkRequest | null;
export declare function findLCPRequest(traceData: Pick<Handlers.Types.TraceParseData, 'Meta' | 'NetworkRequests' | 'LargestImagePaint'>, context: NavigationInsightContext, lcpEvent: Types.TraceEvents.TraceEventLargestContentfulPaintCandidate): Types.TraceEvents.SyntheticNetworkRequest | null;
