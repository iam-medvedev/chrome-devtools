import { type BottomUpCallStack, type ForcedReflowAggregatedData, type InsightModel, type RequiredData } from './types.js';
export declare function deps(): ['Warnings', 'Renderer'];
export declare const UIStrings: {
    /**
     *@description Title of an insight that provides details about Forced reflow.
     */
    title: string;
    /**
     * @description Text to describe the forced reflow.
     */
    description: string;
    /**
     *@description Title of a list to provide related stack trace data
     */
    relatedStackTrace: string;
    /**
     *@description Text to describe the top time-consuming function call
     */
    topTimeConsumingFunctionCall: string;
    /**
     * @description Text to describe the total reflow time
     */
    totalReflowTime: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export type ForcedReflowInsightModel = InsightModel<typeof UIStrings, {
    topLevelFunctionCallData: ForcedReflowAggregatedData | undefined;
    aggregatedBottomUpData: BottomUpCallStack[];
}>;
export declare function generateInsight(traceParsedData: RequiredData<typeof deps>): ForcedReflowInsightModel;
