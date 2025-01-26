import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare function deps(): ['Meta', 'NetworkRequests', 'LayoutShifts'];
export type FontDisplayInsightModel = InsightModel<{
    fonts: Array<{
        request: Types.Events.SyntheticNetworkRequest;
        display: string;
        wastedTime: Types.Timing.Milli;
    }>;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): FontDisplayInsightModel;
