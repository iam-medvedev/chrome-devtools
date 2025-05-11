import * as Common from '../../../core/common/common.js';
import * as Platform from '../../../core/platform/platform.js';
import * as Protocol from '../../../generated/protocol.js';
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
    /** Label for a column in a data table; entries will be the network request */
    readonly columnRequest: "Request";
    /** Label for a column in a data table; entries will be the time from main document till current network request. */
    readonly columnTime: "Time";
    /**
     * @description Title of the table of the detected preconnect origins.
     */
    readonly preconnectOriginsTableTitle: "Preconnect origins";
    /**
     * @description Description of the table of the detected preconnect origins.
     */
    readonly preconnectOriginsTableDescription: "[preconnect](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/?utm_source=devtools&utm_medium=referral) hints help the browser establish a connection earlier in the page load, saving time when the first request for that origin is made. The following are the origins that the page preconnected to.";
    /**
     * @description Text status indicating that there isn't any preconnected origins.
     */
    readonly noPreconnectOrigins: "no origins were preconnected";
    /**
     * @description Label for a column in a data table; entries will be the source of the origin.
     */
    readonly columnSource: "Source";
    /**
     * @description Text status indicating that there isn't preconnect candidates.
     */
    readonly noPreconnectCandidates: "No additional origins are good candidates for preconnecting";
    /**
     * @description Title of the table that shows the origins that the page should have preconnected to.
     */
    readonly estSavingTableTitle: "Preconnect candidates";
    /**
     * @description Description of the table that recommends preconnecting to the origins to save time.
     */
    readonly estSavingTableDescription: "Add [preconnect](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/?utm_source=devtools&utm_medium=referral) hints to your most important origins, but try to use fewer than 4.";
    /**
     * @description Label for a column in a data table; entries will be the origin of a web resource
     */
    readonly columnOrigin: "Origin";
    /**
     * @description Label for a column in a data table; entries will be the number of milliseconds the user could reduce page load by if they implemented the suggestions.
     */
    readonly columnWastedMs: "Est LCP savings";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => Common.UIString.LocalizedString;
export interface CriticalRequestNode {
    request: Types.Events.SyntheticNetworkRequest;
    timeFromInitialRequest: Types.Timing.Micro;
    children: CriticalRequestNode[];
    isLongest?: boolean;
    relatedRequests: Set<Types.Events.SyntheticNetworkRequest>;
}
export interface PreconnectOrigin {
    node_id: Protocol.DOM.BackendNodeId;
    frame?: string;
    url: string;
}
export interface PreconnectCandidate {
    origin: Platform.DevToolsPath.UrlString;
    wastedMs: Types.Timing.Milli;
}
export type NetworkDependencyTreeInsightModel = InsightModel<typeof UIStrings, {
    rootNodes: CriticalRequestNode[];
    maxTime: Types.Timing.Micro;
    fail: boolean;
    preconnectOrigins: PreconnectOrigin[];
    preconnectCandidates: PreconnectCandidate[];
}>;
export declare function generatePreconnectCandidates(parsedTrace: Handlers.Types.ParsedTrace, context: InsightSetContext): PreconnectCandidate[];
export declare function generateInsight(parsedTrace: Handlers.Types.ParsedTrace, context: InsightSetContext): NetworkDependencyTreeInsightModel;
