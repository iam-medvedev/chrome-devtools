import * as Types from '../types/types.js';
import type { InsightResult, InsightSetContext, RequiredData } from './types.js';
export type DocumentLatencyInsightResult = InsightResult<{
    data?: {
        serverResponseTime: Types.Timing.MilliSeconds;
        serverResponseTooSlow: boolean;
        redirectDuration: Types.Timing.MilliSeconds;
        uncompressedResponseBytes: number;
        documentRequest?: Types.Events.SyntheticNetworkRequest;
    };
}>;
export declare function deps(): ['Meta', 'NetworkRequests'];
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): DocumentLatencyInsightResult;
