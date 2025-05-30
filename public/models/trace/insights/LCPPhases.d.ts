import * as Handlers from '../handlers/handlers.js';
import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext } from './types.js';
export declare const UIStrings: {
    /**
     *@description Title of an insight that provides details about the LCP metric, broken down by phases / parts.
     */
    readonly title: "LCP by phase";
    /**
     * @description Description of a DevTools insight that presents a breakdown for the LCP metric by phases.
     * This is displayed after a user expands the section to see more. No character length limits.
     */
    readonly description: "Each [phase has specific improvement strategies](https://web.dev/articles/optimize-lcp#lcp-breakdown). Ideally, most of the LCP time should be spent on loading the resources, not within delays.";
    /**
     *@description Time to first byte title for the Largest Contentful Paint's phases timespan breakdown.
     */
    readonly timeToFirstByte: "Time to first byte";
    /**
     *@description Resource load delay title for the Largest Contentful Paint phases timespan breakdown.
     */
    readonly resourceLoadDelay: "Resource load delay";
    /**
     *@description Resource load duration title for the Largest Contentful Paint phases timespan breakdown.
     */
    readonly resourceLoadDuration: "Resource load duration";
    /**
     *@description Element render delay title for the Largest Contentful Paint phases timespan breakdown.
     */
    readonly elementRenderDelay: "Element render delay";
    /**
     *@description Label used for the phase/component/stage/section of a larger duration.
     */
    readonly phase: "Phase";
    /**
     * @description Label used for the duration a single phase/component/stage/section takes up of a larger duration.
     */
    readonly duration: "Duration";
    /**
     * @description Label used for the duration a single phase/component/stage/section takes up of a larger duration. The value will be the 75th percentile of aggregate data. "Field" means that the data was collected from real users in the field as opposed to the developers local environment. "Field" is synonymous with "Real user data".
     */
    readonly fieldDuration: "Field p75";
    /**
     * @description Text status indicating that the the Largest Contentful Paint (LCP) metric timing was not found. "LCP" is an acronym and should not be translated.
     */
    readonly noLcp: "No LCP detected";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
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
export declare function isLCPPhases(model: InsightModel): model is LCPPhasesInsightModel;
export type LCPPhasesInsightModel = InsightModel<typeof UIStrings, {
    lcpMs?: Types.Timing.Milli;
    lcpTs?: Types.Timing.Milli;
    lcpEvent?: Types.Events.LargestContentfulPaintCandidate;
    /** The network request for the LCP image, if there was one. */
    lcpRequest?: Types.Events.SyntheticNetworkRequest;
    phases?: LCPPhases;
}>;
export declare function generateInsight(parsedTrace: Handlers.Types.ParsedTrace, context: InsightSetContext): LCPPhasesInsightModel;
export {};
