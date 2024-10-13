import * as Types from '../types/types.js';
import type { InsightResult, InsightSetContext, RequiredData } from './types.js';
export declare function deps(): ['Meta', 'NetworkRequests', 'LayoutShifts'];
export type FontDisplayResult = InsightResult<{
    fonts: Array<{
        request: Types.Events.SyntheticNetworkRequest;
        display: string;
        wastedTime: Types.Timing.MilliSeconds;
    }>;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): FontDisplayResult;
