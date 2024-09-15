import * as Types from '../types/types.js';
import { type InsightResult, type NavigationInsightContext, type RequiredData } from './types.js';
export type DocumentLatencyInsightResult = InsightResult<{
    serverResponseTime: Types.Timing.MilliSeconds;
    serverResponseTooSlow: boolean;
    redirectDuration: Types.Timing.MilliSeconds;
    uncompressedResponseBytes: number;
    documentRequest?: Types.TraceEvents.SyntheticNetworkRequest;
}>;
export declare function deps(): ['Meta', 'NetworkRequests'];
export declare function generateInsight(traceParsedData: RequiredData<typeof deps>, context: NavigationInsightContext): DocumentLatencyInsightResult;
