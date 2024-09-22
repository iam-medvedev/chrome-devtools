import * as Types from '../types/types.js';
import { type InsightResult, type InsightSetContext, type RequiredData } from './types.js';
export type RenderBlockingInsightResult = InsightResult<{
    renderBlockingRequests: Types.Events.SyntheticNetworkRequest[];
    requestIdToWastedMs?: Map<string, number>;
}>;
export declare function deps(): ['NetworkRequests', 'PageLoadMetrics', 'LargestImagePaint'];
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): RenderBlockingInsightResult;
