import * as Types from '../types/types.js';
import { type InsightResult, type NavigationInsightContext, type RequiredData } from './types.js';
export type RenderBlockingInsightResult = InsightResult<{
    renderBlockingRequests: Types.TraceEvents.SyntheticNetworkRequest[];
    requestIdToWastedMs?: Map<string, number>;
}>;
export declare function deps(): ['NetworkRequests', 'PageLoadMetrics', 'LargestImagePaint'];
export declare function generateInsight(traceParsedData: RequiredData<typeof deps>, context: NavigationInsightContext): RenderBlockingInsightResult;
