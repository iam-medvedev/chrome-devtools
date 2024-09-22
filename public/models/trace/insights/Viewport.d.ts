import type * as Types from '../types/types.js';
import { type InsightResult, type InsightSetContext, type RequiredData } from './types.js';
export declare function deps(): ['Meta', 'UserInteractions'];
export type ViewportInsightResult = InsightResult<{
    mobileOptimized: boolean | null;
    viewportEvent?: Types.Events.ParseMetaViewport;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): ViewportInsightResult;
