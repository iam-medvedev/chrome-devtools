import type * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import * as Trace from '../../trace/trace.js';
export declare class PerformanceInsightFormatter {
    #private;
    constructor(activeInsight: TimelineUtils.InsightAIContext.ActiveInsight);
    insightIsSupported(): boolean;
    formatInsight(): string;
}
export interface NetworkRequestFormatOptions {
    verbose: boolean;
    customTitle?: string;
}
export declare class TraceEventFormatter {
    #private;
    static layoutShift(shift: Trace.Types.Events.SyntheticLayoutShift, index: number, parsedTrace: Trace.Handlers.Types.ParsedTrace, rootCauses?: Trace.Insights.Models.CLSCulprits.LayoutShiftRootCausesData): string;
    /**
     * This is the data passed to a network request when the Performance Insights
     * agent is asking for information. It is a slimmed down version of the
     * request's data to avoid using up too much of the context window.
     * IMPORTANT: these set of fields have been reviewed by Chrome Privacy &
     * Security; be careful about adding new data here. If you are in doubt please
     * talk to jacktfranklin@.
     */
    static networkRequest(request: Trace.Types.Events.SyntheticNetworkRequest, parsedTrace: Trace.Handlers.Types.ParsedTrace, options: NetworkRequestFormatOptions): string;
    static getNetworkRequestsNewFormat(requests: Trace.Types.Events.SyntheticNetworkRequest[], parsedTrace: Trace.Handlers.Types.ParsedTrace): string;
    /**
     *
     * This is the network request data passed to a the Performance Insights agent.
     *
     * The `urlIdToIndex` Map is used to map URLs to numerical indices in order to not need to pass whole url every time it's mentioned.
     * The map content is passed in the response together will all the requests data.
     *
     * The format is as follows:
     * `urlIndex;queuedTime;requestSentTime;downloadCompleteTime;processingCompleteTime;totalDuration;downloadDuration;mainThreadProcessingDuration;statusCode;mimeType;priority;initialPriority;finalPriority;renderBlocking;protocol;fromServiceWorker;initiatorUrlIndex;redirects:[[redirectUrlIndex|startTime|duration]];responseHeaders:[header1Value,header2Value,...]`
     *
     * - `urlIndex`: Numerical index for the request's URL, referencing the 'All URLs' list.
     * Timings (all in milliseconds, relative to navigation start):
     * - `queuedTime`: When the request was queued.
     * - `requestSentTime`: When the request was sent.
     * - `downloadCompleteTime`: When the download completed.
     * - `processingCompleteTime`: When main thread processing finished.
     * Durations (all in milliseconds):
     * - `totalDuration`: Total time from the request being queued until its main thread processing completed.
     * - `downloadDuration`: Time spent actively downloading the resource.
     * - `mainThreadProcessingDuration`: Time spent on the main thread after the download completed.
     * - `statusCode`: The HTTP status code of the response (e.g., 200, 404).
     * - `mimeType`: The MIME type of the resource (e.g., "text/html", "application/javascript").
     * - `priority`: The final network request priority (e.g., "VeryHigh", "Low").
     * - `initialPriority`: The initial network request priority.
     * - `finalPriority`: The final network request priority (redundant if `priority` is always final, but kept for clarity if `initialPriority` and `priority` differ).
     * - `renderBlocking`: 't' if the request was render-blocking, 'f' otherwise.
     * - `protocol`: The network protocol used (e.g., "h2", "http/1.1").
     * - `fromServiceWorker`: 't' if the request was served from a service worker, 'f' otherwise.
     * - `initiatorUrlIndex`: Numerical index for the URL of the resource that initiated this request, or empty string if no initiator.
     * - `redirects`: A comma-separated list of redirects, enclosed in square brackets. Each redirect is formatted as
     * `[redirectUrlIndex|startTime|duration]`, where: `redirectUrlIndex`: Numerical index for the redirect's URL. `startTime`: The start time of the redirect in milliseconds, relative to navigation start. `duration`: The duration of the redirect in milliseconds.
     * - `responseHeaders`: A comma-separated list of values for specific, pre-defined response headers, enclosed in square brackets.
     * The order of headers corresponds to an internal fixed list. If a header is not present, its value will be empty.
     */
    static networkRequestNewFormat(urlIndex: number, request: Trace.Types.Events.SyntheticNetworkRequest, parsedTrace: Trace.Handlers.Types.ParsedTrace, urlIdToIndex: Map<string, number>): string;
}
