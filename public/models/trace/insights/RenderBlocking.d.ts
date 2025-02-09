import type * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     * @description Title of an insight that provides the user with the list of network requests that blocked and therefore slowed down the page rendering and becoming visible to the user.
     */
    title: string;
    /**
     * @description Text to describe that there are requests blocking rendering, which may affect LCP.
     */
    description: string;
    /**
     * @description Label to describe a network request (that happens to be render-blocking).
     */
    renderBlockingRequest: string;
    /**
     *@description Label used for a time duration.
     */
    duration: string;
    /**
     * @description Text status indicating that no requests blocked the initial render of a navigation
     */
    noRenderBlocking: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export type RenderBlockingInsightModel = InsightModel<typeof UIStrings, {
    renderBlockingRequests: Types.Events.SyntheticNetworkRequest[];
    requestIdToWastedMs?: Map<string, number>;
}>;
export declare function deps(): ['NetworkRequests', 'PageLoadMetrics', 'LargestImagePaint'];
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): RenderBlockingInsightModel;
