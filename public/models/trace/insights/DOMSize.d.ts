import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     * @description Title of an insight that recommends reducing the size of the DOM tree as a means to improve page responsiveness. "DOM" is an acronym and should not be translated.
     */
    title: string;
    /**
     * @description Description of an insight that recommends reducing the size of the DOM tree as a means to improve page responsiveness. "DOM" is an acronym and should not be translated. "layout reflows" are when the browser will recompute the layout of content on the page.
     */
    description: string;
    /**
     * @description Header for a column containing the names of statistics as opposed to the actual statistic values.
     */
    statistic: string;
    /**
     * @description Header for a column containing the value of a statistic.
     */
    value: string;
    /**
     * @description Header for a column containing the page element related to a statistic.
     */
    element: string;
    /**
     * @description Label for a value representing the total number of elements on the page.
     */
    totalElements: string;
    /**
     * @description Label for a value representing the maximum depth of the Document Object Model (DOM). "DOM" is a acronym and should not be translated.
     */
    maxDOMDepth: string;
    /**
     * @description Label for a value representing the maximum number of child elements of any parent element on the page.
     */
    maxChildren: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export type DOMSizeInsightModel = InsightModel<typeof UIStrings, {
    largeLayoutUpdates: Types.Events.Layout[];
    largeStyleRecalcs: Types.Events.UpdateLayoutTree[];
    maxDOMStats?: Types.Events.DOMStats;
}>;
export declare function deps(): ['Renderer', 'AuctionWorklets', 'DOMStats'];
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): DOMSizeInsightModel;
