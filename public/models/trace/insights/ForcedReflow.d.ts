import * as Platform from '../../../core/platform/platform.js';
import type * as Protocol from '../../../generated/protocol.js';
import type * as Handlers from '../handlers/handlers.js';
import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext } from './types.js';
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
    /**
     * @description Text to describe CPU processor tasks that could not be attributed to any specific source code.
     */
    readonly unattributed: "[unattributed]";
    /**
     * @description Text for the name of anonymous functions
     */
    readonly anonymous: "(anonymous)";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => Platform.UIString.LocalizedString;
export type ForcedReflowInsightModel = InsightModel<typeof UIStrings, {
    topLevelFunctionCallData: ForcedReflowAggregatedData | undefined;
    aggregatedBottomUpData: BottomUpCallStack[];
}>;
export interface BottomUpCallStack {
    /**
     * `null` indicates that this data is for unattributed force reflows.
     */
    bottomUpData: Types.Events.CallFrame | Protocol.Runtime.CallFrame | null;
    totalTime: number;
    relatedEvents: Types.Events.Event[];
}
export interface ForcedReflowAggregatedData {
    topLevelFunctionCall: Types.Events.CallFrame | Protocol.Runtime.CallFrame;
    totalReflowTime: number;
    topLevelFunctionCallEvents: Types.Events.Event[];
}
export declare function generateInsight(traceParsedData: Handlers.Types.ParsedTrace, context: InsightSetContext): ForcedReflowInsightModel;
