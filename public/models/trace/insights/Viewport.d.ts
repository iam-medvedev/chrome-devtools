import type * as Types from '../types/types.js';
import { type InsightResult, type NavigationInsightContext, type RequiredData } from './types.js';
export declare function deps(): ['Meta', 'UserInteractions'];
export type ViewportInsightResult = InsightResult<{
    mobileOptimized: boolean | null;
    viewportEvent?: Types.TraceEvents.TraceEventParseMetaViewport;
}>;
export declare function generateInsight(traceParsedData: RequiredData<typeof deps>, context: NavigationInsightContext): ViewportInsightResult;
