import * as Types from '../types/types.js';
import { type Checklist, type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     *@description Title of an insight that provides details about the LCP metric, and the network requests necessary to load it. Details how the LCP request was discoverable - in other words, the path necessary to load it (ex: network requests, JavaScript)
     */
    title: string;
    /**
     *@description Description of an insight that provides details about the LCP metric, and the network requests necessary to load it.
     */
    description: string;
    /**
     * @description Text to tell the user how long after the earliest discovery time their LCP element loaded.
     * @example {401ms} PH1
     */
    lcpLoadDelay: string;
    /**
     * @description Text to tell the user that a fetchpriority property value of "high" is applied to the LCP request.
     */
    fetchPriorityApplied: string;
    /**
     * @description Text to tell the user that a fetchpriority property value of "high" should be applied to the LCP request.
     */
    fetchPriorityShouldBeApplied: string;
    /**
     * @description Text to tell the user that the LCP request is discoverable in the initial document.
     */
    requestDiscoverable: string;
    /**
     * @description Text to tell the user that the LCP request does not have the lazy load property applied.
     */
    lazyLoadNotApplied: string;
    /**
     * @description Text status indicating that the the Largest Contentful Paint (LCP) metric timing was not found. "LCP" is an acronym and should not be translated.
     */
    noLcp: string;
    /**
     * @description Text status indicating that the Largest Contentful Paint (LCP) metric was text rather than an image. "LCP" is an acronym and should not be translated.
     */
    noLcpResource: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export declare function deps(): ['NetworkRequests', 'PageLoadMetrics', 'LargestImagePaint', 'Meta'];
export type LCPDiscoveryInsightModel = InsightModel<typeof UIStrings, {
    lcpEvent?: Types.Events.LargestContentfulPaintCandidate;
    /** The network request for the LCP image, if there was one. */
    lcpRequest?: Types.Events.SyntheticNetworkRequest;
    earliestDiscoveryTimeTs?: Types.Timing.Micro;
    checklist?: Checklist<'priorityHinted' | 'requestDiscoverable' | 'eagerlyLoaded'>;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): LCPDiscoveryInsightModel;
