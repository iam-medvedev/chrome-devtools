import type * as Handlers from '../handlers/handlers.js';
import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext } from './types.js';
export declare const UIStrings: {
    /**
     * @description Title of an insight that recommends avoiding chaining critical requests.
     */
    readonly title: "Network dependency tree";
    /**
     * @description Description of an insight that recommends avoiding chaining critical requests.
     */
    readonly description: "[Avoid chaining critical requests](https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains) by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.";
    /**
     * @description Description of the warning that recommends avoiding chaining critical requests.
     */
    readonly warningDescription: "Avoid chaining critical requests by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.";
    /**
     * @description Text status indicating that there isn't long chaining critical network requests.
     */
    readonly noNetworkDependencyTree: "No rendering tasks impacted by network dependencies";
    /**
     * @description Text for the maximum critical path latency. This refers to the longest chain of network requests that
     * the browser must download before it can render the page.
     */
    readonly maxCriticalPathLatency: "Max critical path latency:";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export interface CriticalRequestNode {
    request: Types.Events.SyntheticNetworkRequest;
    timeFromInitialRequest: Types.Timing.Micro;
    children: CriticalRequestNode[];
    isLongest?: boolean;
    relatedRequests: Set<Types.Events.SyntheticNetworkRequest>;
}
export type NetworkDependencyTreeInsightModel = InsightModel<typeof UIStrings, {
    rootNodes: CriticalRequestNode[];
    maxTime: Types.Timing.Micro;
    fail: boolean;
}>;
export declare function generateInsight(_parsedTrace: Handlers.Types.ParsedTrace, context: InsightSetContext): NetworkDependencyTreeInsightModel;
