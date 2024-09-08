import * as Types from '../types/types.js';
import { type InsightResult, type NavigationInsightContext, type RequiredData } from './types.js';
export declare function deps(): ['NetworkRequests', 'PageLoadMetrics', 'LargestImagePaint', 'Meta'];
interface LCPPhases {
    /**
     * The time between when the user initiates loading the page until when
     * the browser receives the first byte of the html response.
     */
    ttfb: Types.Timing.MilliSeconds;
    /**
     * The time between ttfb and the LCP request request being started.
     * For a text LCP, this is undefined given no request is loaded.
     */
    loadDelay?: Types.Timing.MilliSeconds;
    /**
     * The time it takes to load the LCP request.
     */
    loadTime?: Types.Timing.MilliSeconds;
    /**
     * The time between when the LCP request finishes loading and when
     * the LCP element is rendered.
     */
    renderDelay: Types.Timing.MilliSeconds;
}
export type LCPInsightResult = InsightResult<{
    lcpMs?: Types.Timing.MilliSeconds;
    lcpTs?: Types.Timing.MilliSeconds;
    phases?: LCPPhases;
    shouldRemoveLazyLoading?: boolean;
    shouldIncreasePriorityHint?: boolean;
    shouldPreloadImage?: boolean;
    /** The network request for the LCP image, if there was one. */
    lcpRequest?: Types.TraceEvents.SyntheticNetworkRequest;
    earliestDiscoveryTimeTs?: Types.Timing.MicroSeconds;
}>;
export declare function generateInsight(traceParsedData: RequiredData<typeof deps>, context: NavigationInsightContext): LCPInsightResult;
export {};
