import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export type DOMSizeInsightModel = InsightModel<{
    largeLayoutUpdates: Types.Events.Layout[];
    largeStyleRecalcs: Types.Events.UpdateLayoutTree[];
}>;
export declare function deps(): ['Renderer', 'AuctionWorklets'];
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): DOMSizeInsightModel;
