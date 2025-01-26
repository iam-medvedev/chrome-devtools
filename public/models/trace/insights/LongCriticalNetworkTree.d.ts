import type * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export type LongCriticalNetworkTreeInsightModel = InsightModel<{
    longChains: Types.Events.SyntheticNetworkRequest[][];
}>;
export declare function deps(): ['NetworkRequests'];
export declare function generateInsight(_parsedTrace: RequiredData<typeof deps>, _context: InsightSetContext): LongCriticalNetworkTreeInsightModel;
