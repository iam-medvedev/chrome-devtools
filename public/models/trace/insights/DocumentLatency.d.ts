import * as Types from '../types/types.js';
import type { InsightModel, InsightSetContext, RequiredData } from './types.js';
export type DocumentLatencyInsightModel = InsightModel<{
    data?: {
        serverResponseTime: Types.Timing.MilliSeconds;
        serverResponseTooSlow: boolean;
        redirectDuration: Types.Timing.MilliSeconds;
        uncompressedResponseBytes: number;
        documentRequest?: Types.Events.SyntheticNetworkRequest;
    };
}>;
export declare function deps(): ['Meta', 'NetworkRequests'];
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): DocumentLatencyInsightModel;
