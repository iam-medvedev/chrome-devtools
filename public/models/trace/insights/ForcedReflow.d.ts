import { type BottomUpCallStack, type ForcedReflowAggregatedData, type InsightModel, type RequiredData } from './types.js';
export declare function deps(): ['Warnings', 'Renderer'];
export declare const UIStrings: {
    /**
     *@description Title of an insight that provides details about Forced reflow.
     */
    readonly title: "Forced reflow";
    /**
     * @description Text to describe the forced reflow.
     */
    readonly description: "Many APIs, typically reading layout geometry, force the rendering engine to pause script execution in order to calculate the style and layout. Learn more about [forced reflow](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid-forced-synchronous-layouts) and its mitigations.";
    /**
     *@description Title of a list to provide related stack trace data
     */
    readonly relatedStackTrace: "Stack trace";
    /**
     *@description Text to describe the top time-consuming function call
     */
    readonly topTimeConsumingFunctionCall: "Top function call";
    /**
     * @description Text to describe the total reflow time
     */
    readonly totalReflowTime: "Total reflow time";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export type ForcedReflowInsightModel = InsightModel<typeof UIStrings, {
    topLevelFunctionCallData: ForcedReflowAggregatedData | undefined;
    aggregatedBottomUpData: BottomUpCallStack[];
}>;
export declare function generateInsight(traceParsedData: RequiredData<typeof deps>): ForcedReflowInsightModel;
