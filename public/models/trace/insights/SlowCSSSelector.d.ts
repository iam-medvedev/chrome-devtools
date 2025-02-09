import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     *@description Title of an insight that provides details about slow CSS selectors.
     */
    title: string;
    /**
     * @description Text to describe how to improve the performance of CSS selectors.
     */
    description: string;
    /**
     *@description Column name for count of elements that the engine attempted to match against a style rule
     */
    matchAttempts: string;
    /**
     *@description Column name for count of elements that matched a style rule
     */
    matchCount: string;
    /**
     *@description Column name for elapsed time spent computing a style rule
     */
    elapsed: string;
    /**
     *@description Column name for the selectors that took the longest amount of time/effort.
     */
    topSelectors: string;
    /**
     *@description Column name for a total sum.
     */
    total: string;
    /**
     * @description Text status indicating that no CSS selector data was found.
     */
    enableSelectorData: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export declare function deps(): ['SelectorStats'];
export type SlowCSSSelectorInsightModel = InsightModel<typeof UIStrings, {
    totalElapsedMs: Types.Timing.Milli;
    totalMatchAttempts: number;
    totalMatchCount: number;
    topElapsedMs: Types.Events.SelectorTiming[];
    topMatchAttempts: Types.Events.SelectorTiming[];
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): SlowCSSSelectorInsightModel;
