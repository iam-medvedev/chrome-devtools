import { type BottomUpCallStack, type ForcedReflowAggregatedData, type InsightModel, type RequiredData } from './types.js';
export declare function deps(): ['Warnings', 'Renderer'];
export type ForcedReflowInsightModel = InsightModel<{
    topLevelFunctionCallData: ForcedReflowAggregatedData | undefined;
    aggregatedBottomUpData: BottomUpCallStack[];
}>;
export declare function generateInsight(traceParsedData: RequiredData<typeof deps>): ForcedReflowInsightModel;
