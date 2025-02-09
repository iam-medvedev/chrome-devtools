import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     *@description Title of an insight that provides details about the LCP metric, broken down by phases / parts.
     */
    title: string;
    /**
     * @description Description of a DevTools insight that presents a breakdown for the LCP metric by phases.
     * This is displayed after a user expands the section to see more. No character length limits.
     */
    description: string;
    /**
     *@description Time to first byte title for the Largest Contentful Paint's phases timespan breakdown.
     */
    timeToFirstByte: string;
    /**
     *@description Resource load delay title for the Largest Contentful Paint phases timespan breakdown.
     */
    resourceLoadDelay: string;
    /**
     *@description Resource load duration title for the Largest Contentful Paint phases timespan breakdown.
     */
    resourceLoadDuration: string;
    /**
     *@description Element render delay title for the Largest Contentful Paint phases timespan breakdown.
     */
    elementRenderDelay: string;
    /**
     *@description Label used for the phase/component/stage/section of a larger duration.
     */
    phase: string;
    /**
     *@description Label used for the percentage a single phase/component/stage/section takes up of a larger duration.
     */
    percentLCP: string;
    /**
     * @description Text status indicating that the the Largest Contentful Paint (LCP) metric timing was not found. "LCP" is an acronym and should not be translated.
     */
    noLcp: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export declare function deps(): ['NetworkRequests', 'PageLoadMetrics', 'LargestImagePaint', 'Meta'];
interface LCPPhases {
    /**
     * The time between when the user initiates loading the page until when
     * the browser receives the first byte of the html response.
     */
    ttfb: Types.Timing.Milli;
    /**
     * The time between ttfb and the LCP request request being started.
     * For a text LCP, this is undefined given no request is loaded.
     */
    loadDelay?: Types.Timing.Milli;
    /**
     * The time it takes to load the LCP request.
     */
    loadTime?: Types.Timing.Milli;
    /**
     * The time between when the LCP request finishes loading and when
     * the LCP element is rendered.
     */
    renderDelay: Types.Timing.Milli;
}
export type LCPPhasesInsightModel = InsightModel<typeof UIStrings, {
    lcpMs?: Types.Timing.Milli;
    lcpTs?: Types.Timing.Milli;
    lcpEvent?: Types.Events.LargestContentfulPaintCandidate;
    /** The network request for the LCP image, if there was one. */
    lcpRequest?: Types.Events.SyntheticNetworkRequest;
    phases?: LCPPhases;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): LCPPhasesInsightModel;
export {};
