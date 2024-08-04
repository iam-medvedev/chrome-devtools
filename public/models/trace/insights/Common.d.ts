import type * as Handlers from '../handlers/handlers.js';
import type * as Types from '../types/types.js';
import { type NavigationInsightContext } from './types.js';
export declare function findLCPRequest(traceData: Pick<Handlers.Types.TraceParseData, 'Meta' | 'NetworkRequests' | 'LargestImagePaint'>, context: NavigationInsightContext, lcpEvent: Types.TraceEvents.TraceEventLargestContentfulPaintCandidate): Types.TraceEvents.SyntheticNetworkRequest | null;
