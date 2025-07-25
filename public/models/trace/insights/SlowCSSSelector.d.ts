import type * as Handlers from '../handlers/handlers.js';
import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext } from './types.js';
export declare const UIStrings: {
    /**
     *@description Title of an insight that provides details about slow CSS selectors.
     */
    readonly title: "CSS Selector costs";
    /**
     * @description Text to describe how to improve the performance of CSS selectors.
     */
    readonly description: "If Recalculate Style costs remain high, selector optimization can reduce them. [Optimize the selectors](https://developer.chrome.com/docs/devtools/performance/selector-stats) with both high elapsed time and high slow-path %. Simpler selectors, fewer selectors, a smaller DOM, and a shallower DOM will all reduce matching costs.";
    /**
     *@description Column name for count of elements that the engine attempted to match against a style rule
     */
    readonly matchAttempts: "Match attempts";
    /**
     *@description Column name for count of elements that matched a style rule
     */
    readonly matchCount: "Match count";
    /**
     *@description Column name for elapsed time spent computing a style rule
     */
    readonly elapsed: "Elapsed time";
    /**
     *@description Column name for the selectors that took the longest amount of time/effort.
     */
    readonly topSelectors: "Top selectors";
    /**
     *@description Column name for a total sum.
     */
    readonly total: "Total";
    /**
     * @description Text status indicating that no CSS selector data was found.
     */
    readonly enableSelectorData: "No CSS selector data was found. CSS selector stats need to be enabled in the performance panel settings.";
    /**
     *@description top CSS selector when ranked by elapsed time in ms
     */
    readonly topSelectorElapsedTime: "Top selector elaspsed time";
    /**
     *@description top CSS selector when ranked by match attempt
     */
    readonly topSelectorMatchAttempt: "Top selector match attempt";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export type SlowCSSSelectorInsightModel = InsightModel<typeof UIStrings, {
    totalElapsedMs: Types.Timing.Milli;
    totalMatchAttempts: number;
    totalMatchCount: number;
    topSelectorElapsedMs: Types.Events.SelectorTiming | null;
    topSelectorMatchAttempts: Types.Events.SelectorTiming | null;
}>;
export declare function generateInsight(parsedTrace: Handlers.Types.ParsedTrace, context: InsightSetContext): SlowCSSSelectorInsightModel;
export declare function createOverlays(_: SlowCSSSelectorInsightModel): Types.Overlays.Overlay[];
