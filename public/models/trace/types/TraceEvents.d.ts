import type * as Protocol from '../../../generated/protocol.js';
import type { MicroSeconds, MilliSeconds, Seconds, TraceWindowMicroSeconds } from './Timing.js';
export declare const enum Phase {
    BEGIN = "B",
    END = "E",
    COMPLETE = "X",
    INSTANT = "I",
    COUNTER = "C",
    ASYNC_NESTABLE_START = "b",
    ASYNC_NESTABLE_INSTANT = "n",
    ASYNC_NESTABLE_END = "e",
    ASYNC_STEP_INTO = "T",
    ASYNC_BEGIN = "S",
    ASYNC_END = "F",
    ASYNC_STEP_PAST = "p",
    FLOW_START = "s",
    FLOW_STEP = "t",
    FLOW_END = "f",
    SAMPLE = "P",
    OBJECT_CREATED = "N",
    OBJECT_SNAPSHOT = "O",
    OBJECT_DESTROYED = "D",
    METADATA = "M",
    MEMORY_DUMP_GLOBAL = "V",
    MEMORY_DUMP_PROCESS = "v",
    MARK = "R",
    CLOCK_SYNC = "c"
}
export type NonEmptyString = string & {
    _tag: 'NonEmptyString';
};
export declare function isNestableAsyncPhase(phase: Phase): boolean;
export declare function isPhaseAsync(phase: Phase): boolean;
export declare function isFlowPhase(phase: Phase): boolean;
export declare const enum Scope {
    THREAD = "t",
    PROCESS = "p",
    GLOBAL = "g"
}
export interface Event {
    args?: Args;
    cat: string;
    name: string;
    ph: Phase;
    pid: ProcessID;
    tid: ThreadID;
    tts?: MicroSeconds;
    ts: MicroSeconds;
    tdur?: MicroSeconds;
    dur?: MicroSeconds;
}
export interface Args {
    data?: ArgsData;
    stackTrace?: CallFrame[];
}
export interface ArgsData {
    stackTrace?: CallFrame[];
    url?: string;
    navigationId?: string;
    frame?: string;
}
export interface CallFrame {
    codeType?: string;
    functionName: string;
    scriptId: number | string;
    columnNumber: number;
    lineNumber: number;
    url: string;
}
export declare function objectIsCallFrame(object: {}): object is CallFrame;
export interface TraceFrame {
    frame: string;
    name: string;
    processId: ProcessID;
    url: string;
    parent?: string;
    isOutermostMainFrame?: boolean;
    isInPrimaryMainFrame?: boolean;
}
export interface Sample extends Event {
    ph: Phase.SAMPLE;
}
/**
 * A fake trace event created to support CDP.Profiler.Profiles in the
 * trace engine.
 */
export interface SyntheticCpuProfile extends Instant, SyntheticBased<Phase.INSTANT> {
    name: 'CpuProfile';
    args: Args & {
        data: ArgsData & {
            cpuProfile: Protocol.Profiler.Profile;
        };
    };
}
export interface Profile extends Sample {
    name: 'Profile';
    id: ProfileID;
    args: Args & {
        data: ArgsData & {
            startTime: MicroSeconds;
        };
    };
}
export interface ProfileChunk extends Sample {
    name: 'ProfileChunk';
    id: ProfileID;
    args: Args & {
        data?: ArgsData & {
            cpuProfile?: PartialProfile;
            timeDeltas?: MicroSeconds[];
            lines?: MicroSeconds[];
        };
    };
}
export interface PartialProfile {
    nodes?: PartialNode[];
    samples: CallFrameID[];
}
export interface PartialNode {
    callFrame: CallFrame;
    id: CallFrameID;
    parent?: CallFrameID;
}
export interface Complete extends Event {
    ph: Phase.COMPLETE;
    dur: MicroSeconds;
}
export interface RunTask extends Complete {
    name: Name.RUN_TASK;
}
export declare function isRunTask(event: Event): event is RunTask;
export interface FireIdleCallback extends Complete {
    name: Name.FIRE_IDLE_CALLBACK;
    args: Args & {
        data: ArgsData & {
            allottedMilliseconds: MilliSeconds;
            frame: string;
            id: number;
            timedOut: boolean;
        };
    };
}
export interface SchedulePostMessage extends Instant {
    name: Name.SCHEDULE_POST_MESSAGE;
    args: Args & {
        data: ArgsData & {
            traceId: string;
        };
    };
}
export interface HandlePostMessage extends Complete {
    name: Name.HANDLE_POST_MESSAGE;
    args: Args & {
        data: ArgsData & {
            traceId: string;
        };
    };
}
export interface Dispatch extends Complete {
    name: 'EventDispatch';
    args: Args & {
        data: ArgsData & {
            type: string;
        };
    };
}
export interface ParseHTML extends Complete {
    name: 'ParseHTML';
    args: Args & {
        beginData: {
            frame: string;
            startLine: number;
            url: string;
        };
        endData?: {
            endLine: number;
        };
    };
}
export interface Begin extends Event {
    ph: Phase.BEGIN;
}
export interface End extends Event {
    ph: Phase.END;
}
/**
 * This denotes a complete event created from a pair of begin and end
 * events. For practicality, instead of always having to look for the
 * end event corresponding to a begin event, we create a synthetic
 * complete event that comprises the data of both from the beginning in
 * the RendererHandler.
 */
export type SyntheticComplete = Complete;
export type EventTimingBeginOrEnd = EventTimingBegin | EventTimingEnd;
export interface EventTimingBegin extends Event {
    ph: Phase.ASYNC_NESTABLE_START;
    name: Name.EVENT_TIMING;
    id: string;
    args: Args & {
        data: ArgsData & {
            cancelable: boolean;
            duration: MilliSeconds;
            type: string;
            interactionId: number;
            interactionOffset: number;
            nodeId: Protocol.DOM.BackendNodeId;
            frame?: string;
            processingEnd?: MilliSeconds;
            processingStart?: MilliSeconds;
            timeStamp?: MilliSeconds;
            enqueuedToMainThreadTime?: MilliSeconds;
            commitFinishTime?: MilliSeconds;
        };
        frame?: string;
    };
}
export interface EventTimingEnd extends Event {
    ph: Phase.ASYNC_NESTABLE_END;
    name: Name.EVENT_TIMING;
    id: string;
    args: Args;
}
export interface GPUTask extends Complete {
    name: 'GPUTask';
    args: Args & {
        data?: ArgsData & {
            renderer_pid: ProcessID;
            used_bytes: number;
        };
    };
}
export interface SyntheticNetworkRedirect {
    url: string;
    priority: string;
    requestMethod?: string;
    ts: MicroSeconds;
    dur: MicroSeconds;
}
interface SyntheticArgsData {
    dnsLookup: MicroSeconds;
    download: MicroSeconds;
    downloadStart: MicroSeconds;
    finishTime: MicroSeconds;
    initialConnection: MicroSeconds;
    isDiskCached: boolean;
    isHttps: boolean;
    isMemoryCached: boolean;
    isPushedResource: boolean;
    networkDuration: MicroSeconds;
    processingDuration: MicroSeconds;
    proxyNegotiation: MicroSeconds;
    queueing: MicroSeconds;
    redirectionDuration: MicroSeconds;
    requestSent: MicroSeconds;
    sendStartTime: MicroSeconds;
    ssl: MicroSeconds;
    stalled: MicroSeconds;
    totalTime: MicroSeconds;
    /** Server response time (receiveHeadersEnd - sendEnd) */
    waiting: MicroSeconds;
}
export interface SyntheticNetworkRequest extends Complete, SyntheticBased<Phase.COMPLETE> {
    rawSourceEvent: ResourceSendRequest;
    args: Args & {
        data: ArgsData & {
            syntheticData: SyntheticArgsData;
            /** Size of the resource after decompression (if applicable). */
            decodedBodyLength: number;
            /**
             * Size of the resource over the network. Includes size of headers and
             * anything else in the HTTP response packet.
             */
            encodedDataLength: number;
            frame: string;
            fromServiceWorker: boolean;
            isLinkPreload: boolean;
            mimeType: string;
            priority: Protocol.Network.ResourcePriority;
            initialPriority: Protocol.Network.ResourcePriority;
            /**
             * This is the protocol used to resolve the request.
             *
             * Note, this is not the same as URL.protocol.
             *
             * Example values (not exhaustive): http/0.9, http/1.0, http/1.1, http, h2, h3-Q050, data, blob
             */
            protocol: string;
            redirects: SyntheticNetworkRedirect[];
            renderBlocking: RenderBlocking;
            requestId: string;
            requestingFrameUrl: string;
            statusCode: number;
            resourceType: Protocol.Network.ResourceType;
            responseHeaders: Array<{
                name: string;
                value: string;
            }>;
            fetchPriorityHint: FetchPriorityHint;
            url: string;
            /** True only if got a 'resourceFinish' event indicating a failure. */
            failed: boolean;
            /** True only if got a 'resourceFinish' event. */
            finished: boolean;
            connectionId: number;
            connectionReused: boolean;
            initiator?: Initiator;
            requestMethod?: string;
            timing?: ResourceReceiveResponseTimingData;
            syntheticServerTimings?: SyntheticServerTiming[];
        };
    };
    cat: 'loading';
    name: 'SyntheticNetworkRequest';
    ph: Phase.COMPLETE;
    dur: MicroSeconds;
    tdur: MicroSeconds;
    ts: MicroSeconds;
    tts: MicroSeconds;
    pid: ProcessID;
    tid: ThreadID;
}
export interface SyntheticWebSocketConnection extends Complete, SyntheticBased<Phase.COMPLETE> {
    rawSourceEvent: Event;
    args: Args & {
        data: ArgsData & {
            identifier: number;
            priority: Protocol.Network.ResourcePriority;
            url: string;
        };
    };
    cat: string;
    name: 'SyntheticWebSocketConnection';
    ph: Phase.COMPLETE;
    dur: MicroSeconds;
    ts: MicroSeconds;
    pid: ProcessID;
    tid: ThreadID;
    s: Scope;
}
export declare const enum AuctionWorkletType {
    BIDDER = "bidder",
    SELLER = "seller",
    UNKNOWN = "unknown"
}
export interface SyntheticAuctionWorklet extends Instant, SyntheticBased<Phase.INSTANT> {
    rawSourceEvent: Event;
    name: 'SyntheticAuctionWorklet';
    pid: ProcessID;
    host: string;
    target: string;
    type: AuctionWorkletType;
    args: Args & {
        data: ArgsData & {
            utilityThread: ThreadName;
            v8HelperThread: ThreadName;
        } & ({
            runningInProcessEvent: AuctionWorkletRunningInProcess;
            doneWithProcessEvent: AuctionWorkletDoneWithProcess;
        } | {
            runningInProcessEvent?: AuctionWorkletRunningInProcess;
            doneWithProcessEvent: AuctionWorkletDoneWithProcess;
        } | {
            doneWithProcessEvent?: AuctionWorkletDoneWithProcess;
            runningInProcessEvent: AuctionWorkletRunningInProcess;
        });
    };
}
export interface AuctionWorkletRunningInProcess extends Event {
    name: 'AuctionWorkletRunningInProcess';
    ph: Phase.INSTANT;
    args: Args & {
        data: ArgsData & {
            host: string;
            pid: ProcessID;
            target: string;
            type: AuctionWorkletType;
        };
    };
}
export interface AuctionWorkletDoneWithProcess extends Event {
    name: 'AuctionWorkletDoneWithProcess';
    ph: Phase.INSTANT;
    args: Args & {
        data: ArgsData & {
            host: string;
            pid: ProcessID;
            target: string;
            type: AuctionWorkletType;
        };
    };
}
export declare function isAuctionWorkletRunningInProcess(event: Event): event is AuctionWorkletRunningInProcess;
export declare function isAuctionWorkletDoneWithProcess(event: Event): event is AuctionWorkletDoneWithProcess;
export interface Screenshot extends Event {
    /**
     * @deprecated This value is incorrect. Use ScreenshotHandler.getPresentationTimestamp()
     */
    ts: MicroSeconds;
    /** The id is the frame sequence number in hex */
    id: string;
    args: Args & {
        snapshot: string;
    };
    name: Name.SCREENSHOT;
    cat: 'disabled-by-default-devtools.screenshot';
    ph: Phase.OBJECT_SNAPSHOT;
}
export declare function isScreenshot(event: Event): event is Screenshot;
export interface SyntheticScreenshot extends Event, SyntheticBased {
    rawSourceEvent: Screenshot;
    /** This is the correct presentation timestamp. */
    ts: MicroSeconds;
    args: Args & {
        dataUri: string;
    };
    name: Name.SCREENSHOT;
    cat: 'disabled-by-default-devtools.screenshot';
    ph: Phase.OBJECT_SNAPSHOT;
}
export interface Animation extends Event {
    args: Args & {
        data: ArgsData & {
            nodeName?: string;
            nodeId?: Protocol.DOM.BackendNodeId;
            displayName?: string;
            id?: string;
            name?: string;
            state?: string;
            compositeFailed?: number;
            unsupportedProperties?: string[];
        };
    };
    name: 'Animation';
    id2?: {
        local?: string;
    };
    ph: Phase.ASYNC_NESTABLE_START | Phase.ASYNC_NESTABLE_END | Phase.ASYNC_NESTABLE_INSTANT;
}
export interface Metadata extends Event {
    ph: Phase.METADATA;
    args: Args & {
        name?: string;
        uptime?: string;
    };
}
export interface ThreadName extends Metadata {
    name: Name.THREAD_NAME;
    args: Args & {
        name?: string;
    };
}
export interface ProcessName extends Metadata {
    name: 'process_name';
}
export interface Mark extends Event {
    ph: Phase.MARK;
}
export interface NavigationStartUnreliable extends Mark {
    name: 'navigationStart';
    args: Args & {
        data?: ArgsData & {
            /** An empty documentLoaderURL means this navigationStart is unreliable noise and can be ignored. */
            documentLoaderURL: never;
            isLoadingMainFrame: boolean;
            isOutermostMainFrame?: boolean;
            navigationId: string;
            /**
             * @deprecated use documentLoaderURL for navigation events URLs
             */
            url?: string;
        };
        frame: string;
    };
}
export interface NavigationStart extends NavigationStartUnreliable {
    args: NavigationStartUnreliable['args'] & {
        data: NavigationStartUnreliable['args']['data'] & {
            /** This navigationStart is valid, as the documentLoaderURL isn't empty. */
            documentLoaderURL: NonEmptyString;
        };
    };
}
export interface FirstContentfulPaint extends Mark {
    name: Name.MARK_FCP;
    args: Args & {
        frame: string;
        data?: ArgsData & {
            navigationId: string;
        };
    };
}
export interface FirstPaint extends Mark {
    name: 'firstPaint';
    args: Args & {
        frame: string;
        data?: ArgsData & {
            navigationId: string;
        };
    };
}
export type PageLoadEvent = FirstContentfulPaint | MarkDOMContent | InteractiveTime | LargestContentfulPaintCandidate | LayoutShift | FirstPaint | MarkLoad | NavigationStart;
export declare const MarkerName: readonly ["MarkDOMContent", "MarkLoad", "firstPaint", "firstContentfulPaint", "largestContentfulPaint::Candidate"];
export interface MarkerEvent extends Event {
    name: typeof MarkerName[number];
}
export declare function isMarkerEvent(event: Event): event is MarkerEvent;
export declare function eventIsPageLoadEvent(event: Event): event is PageLoadEvent;
export interface LargestContentfulPaintCandidate extends Mark {
    name: Name.MARK_LCP_CANDIDATE;
    args: Args & {
        frame: string;
        data?: ArgsData & {
            candidateIndex: number;
            isOutermostMainFrame: boolean;
            isMainFrame: boolean;
            navigationId: string;
            nodeId: Protocol.DOM.BackendNodeId;
            loadingAttr: string;
            type?: string;
        };
    };
}
export interface LargestImagePaintCandidate extends Mark {
    name: 'LargestImagePaint::Candidate';
    args: Args & {
        frame: string;
        data?: ArgsData & {
            candidateIndex: number;
            imageUrl: string;
            DOMNodeId: Protocol.DOM.BackendNodeId;
        };
    };
}
export interface LargestTextPaintCandidate extends Mark {
    name: 'LargestTextPaint::Candidate';
    args: Args & {
        frame: string;
        data?: ArgsData & {
            candidateIndex: number;
            DOMNodeId: Protocol.DOM.BackendNodeId;
        };
    };
}
export interface InteractiveTime extends Mark {
    name: 'InteractiveTime';
    args: Args & {
        args: {
            total_blocking_time_ms: number;
        };
        frame: string;
    };
}
export interface Instant extends Event {
    ph: Phase.INSTANT;
    s: Scope;
}
export interface UpdateCounters extends Instant {
    name: 'UpdateCounters';
    args: Args & {
        data: ArgsData & {
            documents: number;
            jsEventListeners: number;
            jsHeapSizeUsed: number;
            nodes: number;
            gpuMemoryLimitKB?: number;
        };
    };
}
export type RendererEvent = Instant | Complete;
export interface TracingStartedInBrowser extends Instant {
    name: Name.TRACING_STARTED_IN_BROWSER;
    args: Args & {
        data?: ArgsData & {
            frameTreeNodeId: number;
            frames?: TraceFrame[];
            persistentIds: boolean;
        };
    };
}
export interface TracingSessionIdForWorker extends Instant {
    name: 'TracingSessionIdForWorker';
    args: Args & {
        data?: ArgsData & {
            url: string;
            workerId: WorkerId;
            workerThreadId: ThreadID;
            frame: string;
        };
    };
}
export declare function isTracingSessionIdForWorker(event: Event): event is TracingSessionIdForWorker;
export interface FrameCommittedInBrowser extends Instant {
    name: 'FrameCommittedInBrowser';
    args: Args & {
        data?: ArgsData & TraceFrame;
    };
}
export interface MainFrameViewport extends Instant {
    name: 'PaintTimingVisualizer::Viewport';
    args: {
        data: ArgsData & {
            viewport_rect: number[];
            /** Device Pixel Ratio. Added in m128 */
            dpr: number;
        };
    };
}
export interface CommitLoad extends Instant {
    name: 'CommitLoad';
    args: Args & {
        data?: ArgsData & {
            frame: string;
            isMainFrame: boolean;
            name: string;
            nodeId: number;
            page: string;
            parent: string;
            url: string;
        };
    };
}
export interface MarkDOMContent extends Instant {
    name: 'MarkDOMContent';
    args: Args & {
        data?: ArgsData & {
            frame: string;
            isMainFrame: boolean;
            isOutermostMainFrame?: boolean;
            page: string;
        };
    };
}
export interface MarkLoad extends Instant {
    name: 'MarkLoad';
    args: Args & {
        data?: ArgsData & {
            frame: string;
            isMainFrame: boolean;
            page: string;
            isOutermostMainFrame?: boolean;
        };
    };
}
export interface Async extends Event {
    ph: Phase.ASYNC_NESTABLE_START | Phase.ASYNC_NESTABLE_INSTANT | Phase.ASYNC_NESTABLE_END | Phase.ASYNC_STEP_INTO | Phase.ASYNC_BEGIN | Phase.ASYNC_END | Phase.ASYNC_STEP_PAST;
}
export type TraceRect = [number, number, number, number];
export type TraceImpactedNode = {
    new_rect: TraceRect;
    node_id: Protocol.DOM.BackendNodeId;
    old_rect: TraceRect;
};
type LayoutShiftData = ArgsData & {
    cumulative_score: number;
    frame_max_distance: number;
    had_recent_input: boolean;
    impacted_nodes: TraceImpactedNode[] | undefined;
    is_main_frame: boolean;
    overall_max_distance: number;
    region_rects: TraceRect[];
    /** @deprecated This value will incorrectly overreport for shifts within an iframe. */
    score: number;
    /** This is the preferred "score", used for CLS. If `is_main_frame` is true, `score` and `weighted_score_delta` will be equal. But if the shift is from an iframe, `weighted_score_delta` will be appropriately reduced to account for the viewport size of that iframe. https://wicg.github.io/layout-instability/#subframe-weighting-factor and b/275509162 */
    weighted_score_delta: number;
    navigationId?: string;
};
export interface LayoutShift extends Instant {
    name: 'LayoutShift';
    normalized?: boolean;
    args: Args & {
        frame: string;
        data?: LayoutShiftData;
    };
}
interface LayoutShiftSessionWindowData {
    cumulativeWindowScore: number;
    id: number;
}
export interface LayoutShiftParsedData {
    /** screenshot taken before and after this shift. Before *should* always exist, but after might not at the end of a trace. */
    screenshots: {
        before: SyntheticScreenshot | null;
        after: SyntheticScreenshot | null;
    };
    timeFromNavigation?: MicroSeconds;
    cumulativeWeightedScoreInWindow: number;
    sessionWindowData: LayoutShiftSessionWindowData;
}
export interface SyntheticLayoutShift extends LayoutShift, SyntheticBased<Phase.INSTANT> {
    name: 'LayoutShift';
    rawSourceEvent: LayoutShift;
    args: Args & {
        frame: string;
        data?: LayoutShiftData & {
            rawEvent: LayoutShift;
        };
    };
    parsedData: LayoutShiftParsedData;
}
export declare const NO_NAVIGATION = "NO_NAVIGATION";
/**
 * This maybe be a navigation id string from Chromium, or `NO_NAVIGATION`, which represents the
 * portion of the trace for which we don't have any navigation event for (as it happeneded prior
 * to the trace start).
 */
export type NavigationId = string | typeof NO_NAVIGATION;
/**
 * This is a synthetic Layout shift cluster. Not based on a raw event as there's no concept
 * of this as a trace event.
 */
export interface SyntheticLayoutShiftCluster {
    name: 'SyntheticLayoutShiftCluster';
    clusterWindow: TraceWindowMicroSeconds;
    clusterCumulativeScore: number;
    events: SyntheticLayoutShift[];
    scoreWindows: {
        good: TraceWindowMicroSeconds;
        needsImprovement?: TraceWindowMicroSeconds;
        bad?: TraceWindowMicroSeconds;
    };
    navigationId?: NavigationId;
    worstShiftEvent?: Event;
    ts: MicroSeconds;
    dur: MicroSeconds;
    cat: '';
    ph: Phase.COMPLETE;
    pid: ProcessID;
    tid: ThreadID;
}
export type FetchPriorityHint = 'low' | 'high' | 'auto';
export type RenderBlocking = 'blocking' | 'non_blocking' | 'in_body_parser_blocking' | 'potentially_blocking' | 'dynamically_injected_non_blocking';
export interface Initiator {
    type: Protocol.Network.InitiatorType;
    fetchType: string;
    columnNumber?: number;
    lineNumber?: number;
    url?: string;
}
export interface ResourceSendRequest extends Instant {
    name: 'ResourceSendRequest';
    args: Args & {
        data: ArgsData & {
            frame: string;
            requestId: string;
            url: string;
            priority: Protocol.Network.ResourcePriority;
            /** Added Feb 2024. https://crrev.com/c/5277583 */
            resourceType?: Protocol.Network.ResourceType;
            /** Added Feb 2024. https://crrev.com/c/5297615 */
            fetchPriorityHint?: FetchPriorityHint;
            requestMethod?: string;
            renderBlocking?: RenderBlocking;
            initiator?: Initiator;
            isLinkPreload?: boolean;
        };
    };
}
export interface ResourceChangePriority extends Instant {
    name: 'ResourceChangePriority';
    args: Args & {
        data: ArgsData & {
            requestId: string;
            priority: Protocol.Network.ResourcePriority;
        };
    };
}
/** Only sent for navigations. https://source.chromium.org/chromium/chromium/src/+/main:content/browser/devtools/devtools_instrumentation.cc;l=1612-1647;drc=ec7daf93d0479b758610c75f4e146fd4d2d6ed2b */
export interface ResourceWillSendRequest extends Instant {
    name: Name.RESOURCE_WILL_SEND_REQUEST;
    args: Args & {
        data: ArgsData & {
            requestId: string;
        };
    };
}
export interface ResourceFinish extends Instant {
    name: 'ResourceFinish';
    args: Args & {
        data: ArgsData & {
            decodedBodyLength: number;
            didFail: boolean;
            encodedDataLength: number;
            finishTime: Seconds;
            requestId: string;
        };
    };
}
export interface ResourceReceivedData extends Instant {
    name: 'ResourceReceivedData';
    args: Args & {
        data: ArgsData & {
            encodedDataLength: number;
            frame: string;
            requestId: string;
        };
    };
}
/** See https://mdn.github.io/shared-assets/images/diagrams/api/performance/timestamp-diagram.svg  */
interface ResourceReceiveResponseTimingData {
    connectEnd: MilliSeconds;
    connectStart: MilliSeconds;
    dnsEnd: MilliSeconds;
    dnsStart: MilliSeconds;
    proxyEnd: MilliSeconds;
    proxyStart: MilliSeconds;
    pushEnd: MilliSeconds;
    pushStart: MilliSeconds;
    receiveHeadersEnd: MilliSeconds;
    receiveHeadersStart: MilliSeconds;
    /** When the network service is about to handle a request, ie. just before going to the HTTP cache or going to the network for DNS/connection setup. */
    requestTime: Seconds;
    sendEnd: MilliSeconds;
    sendStart: MilliSeconds;
    sslEnd: MilliSeconds;
    sslStart: MilliSeconds;
    workerReady: MilliSeconds;
    workerStart: MilliSeconds;
}
export interface ResourceReceiveResponse extends Instant {
    name: 'ResourceReceiveResponse';
    args: Args & {
        data: ArgsData & {
            /**
             * This is the protocol used to resolve the request.
             *
             * Note, this is not the same as URL.protocol.
             *
             * Example values (not exhaustive): http/0.9, http/1.0, http/1.1, http, h2, h3-Q050, data, blob
             */
            protocol: string;
            encodedDataLength: number;
            frame: string;
            fromCache: boolean;
            fromServiceWorker: boolean;
            mimeType: string;
            requestId: string;
            responseTime: MilliSeconds;
            statusCode: number;
            timing?: ResourceReceiveResponseTimingData;
            connectionId: number;
            connectionReused: boolean;
            headers?: Array<{
                name: string;
                value: string;
            }>;
        };
    };
}
export interface ResourceMarkAsCached extends Instant {
    name: 'ResourceMarkAsCached';
    args: Args & {
        data: ArgsData & {
            requestId: string;
        };
    };
}
export declare const enum LayoutInvalidationReason {
    SIZE_CHANGED = "Size changed",
    ATTRIBUTE = "Attribute",
    ADDED_TO_LAYOUT = "Added to layout",
    SCROLLBAR_CHANGED = "Scrollbar changed",
    REMOVED_FROM_LAYOUT = "Removed from layout",
    STYLE_CHANGED = "Style changed",
    FONTS_CHANGED = "Fonts changed",
    UNKNOWN = "Unknown"
}
export interface LayoutInvalidationTracking extends Instant {
    name: Name.LAYOUT_INVALIDATION_TRACKING;
    args: Args & {
        data: ArgsData & {
            frame: string;
            nodeId: Protocol.DOM.BackendNodeId;
            reason: LayoutInvalidationReason;
            nodeName?: string;
        };
    };
}
export interface ScheduleStyleInvalidationTracking extends Instant {
    name: Name.SCHEDULE_STYLE_INVALIDATION_TRACKING;
    args: Args & {
        data: ArgsData & {
            frame: string;
            nodeId: Protocol.DOM.BackendNodeId;
            invalidationSet?: string;
            invalidatedSelectorId?: string;
            reason?: LayoutInvalidationReason;
            changedClass?: string;
            changedAttribute?: string;
            changedId?: string;
            nodeName?: string;
            stackTrace?: CallFrame[];
        };
    };
}
export declare function isScheduleStyleInvalidationTracking(event: Event): event is ScheduleStyleInvalidationTracking;
export declare const enum StyleRecalcInvalidationReason {
    ANIMATION = "Animation"
}
export interface StyleRecalcInvalidationTracking extends Instant {
    name: Name.STYLE_RECALC_INVALIDATION_TRACKING;
    args: Args & {
        data: ArgsData & {
            frame: string;
            nodeId: Protocol.DOM.BackendNodeId;
            reason: StyleRecalcInvalidationReason;
            subtree: boolean;
            nodeName?: string;
            extraData?: string;
        };
    };
}
export declare function isStyleRecalcInvalidationTracking(event: Event): event is StyleRecalcInvalidationTracking;
export interface StyleInvalidatorInvalidationTracking extends Instant {
    name: Name.STYLE_INVALIDATOR_INVALIDATION_TRACKING;
    args: Args & {
        data: ArgsData & {
            frame: string;
            nodeId: Protocol.DOM.BackendNodeId;
            reason: string;
            invalidationList: Array<{
                classes?: string[];
                id: string;
            }>;
            subtree: boolean;
            nodeName?: string;
            extraData?: string;
        };
    };
}
export declare function isStyleInvalidatorInvalidationTracking(event: Event): event is StyleInvalidatorInvalidationTracking;
export interface BeginCommitCompositorFrame extends Instant {
    name: Name.BEGIN_COMMIT_COMPOSITOR_FRAME;
    args: Args & {
        frame: string;
        is_mobile_optimized: boolean;
    };
}
export declare function isBeginCommitCompositorFrame(event: Event): event is BeginCommitCompositorFrame;
export interface ParseMetaViewport extends Instant {
    name: Name.PARSE_META_VIEWPORT;
    args: Args & {
        data: {
            node_id: Protocol.DOM.BackendNodeId;
            content: string;
            frame?: string;
        };
    };
}
export declare function isParseMetaViewport(event: Event): event is ParseMetaViewport;
export interface ScheduleStyleRecalculation extends Instant {
    name: Name.SCHEDULE_STYLE_RECALCULATION;
    args: Args & {
        data: {
            frame: string;
        };
    };
}
export declare function isScheduleStyleRecalculation(event: Event): event is ScheduleStyleRecalculation;
export interface RenderFrameImplCreateChildFrame extends Event {
    name: Name.RENDER_FRAME_IMPL_CREATE_CHILD_FRAME;
    args: Args & {
        child_frame_token: string;
        frame_token: string;
    };
}
export declare function isRenderFrameImplCreateChildFrame(event: Event): event is RenderFrameImplCreateChildFrame;
export interface LayoutImageUnsized extends Event {
    name: Name.LAYOUT_IMAGE_UNSIZED;
    args: Args & {
        data: {
            nodeId: Protocol.DOM.BackendNodeId;
            frameId: string;
        };
    };
}
export declare function isLayoutImageUnsized(event: Event): event is LayoutImageUnsized;
export interface PrePaint extends Complete {
    name: 'PrePaint';
}
export interface PairableAsync extends Event {
    ph: Phase.ASYNC_NESTABLE_START | Phase.ASYNC_NESTABLE_END | Phase.ASYNC_NESTABLE_INSTANT;
    id2?: {
        local?: string;
        global?: string;
    };
    id?: string;
}
export interface PairableAsyncBegin extends PairableAsync {
    ph: Phase.ASYNC_NESTABLE_START;
}
export interface PairableAsyncInstant extends PairableAsync {
    ph: Phase.ASYNC_NESTABLE_INSTANT;
}
export interface PairableAsyncEnd extends PairableAsync {
    ph: Phase.ASYNC_NESTABLE_END;
}
export interface UserTiming extends Event {
    id2?: {
        local?: string;
        global?: string;
    };
    id?: string;
    cat: 'blink.user_timing';
}
export interface DomLoading extends UserTiming {
    name: Name.DOM_LOADING;
    args: Args & {
        frame?: string;
    };
}
export interface BeginRemoteFontLoad extends UserTiming {
    name: Name.BEGIN_REMOTE_FONT_LOAD;
    args: Args & {
        display: string;
        id: number;
    };
}
export type PairableUserTiming = UserTiming & PairableAsync;
export interface PerformanceMeasureBegin extends PairableUserTiming {
    args: Args & {
        detail?: string;
        stackTrace?: CallFrame[];
    };
    ph: Phase.ASYNC_NESTABLE_START;
}
export type PerformanceMeasureEnd = PairableUserTiming & PairableAsyncEnd;
export type PerformanceMeasure = PerformanceMeasureBegin | PerformanceMeasureEnd;
export interface PerformanceMark extends UserTiming {
    args: Args & {
        data?: ArgsData & {
            detail?: string;
            stackTrace?: CallFrame[];
        };
    };
    ph: Phase.INSTANT | Phase.MARK | Phase.ASYNC_NESTABLE_INSTANT;
}
export interface ConsoleTimeBegin extends PairableAsyncBegin {
    cat: 'blink.console';
}
export interface ConsoleTimeEnd extends PairableAsyncEnd {
    cat: 'blink.console';
}
export type ConsoleTime = ConsoleTimeBegin | ConsoleTimeEnd;
export interface TimeStamp extends Event {
    cat: 'devtools.timeline';
    name: 'TimeStamp';
    ph: Phase.INSTANT;
    id: string;
    args: Args & {
        data: ArgsData & {
            frame: string;
            message: string;
        };
    };
}
/** ChromeFrameReporter args for PipelineReporter event.
    Matching proto: https://source.chromium.org/chromium/chromium/src/+/main:third_party/perfetto/protos/perfetto/trace/track_event/chrome_frame_reporter.proto
 */
interface ChromeFrameReporter {
    state: State;
    enum: FrameDropReason;
    /** The reason is set only if |state| is not |STATE_UPDATED_ALL|. */
    reason: FrameDropReason;
    frame_source: number;
    /**  Identifies a BeginFrameArgs (along with the source_id).
         See comments in components/viz/common/frame_sinks/begin_frame_args.h. */
    frame_sequence: number;
    /**  If this is a droped frame (i.e. if |state| is set to |STATE_DROPPED| or
         |STATE_PRESENTED_PARTIAL|), then indicates whether this frame impacts smoothness. */
    affects_smoothness: boolean;
    /** The type of active scroll. */
    scroll_state: ScrollState;
    /** If any main thread animation is active during this frame. */
    has_main_animation: boolean;
    /** If any compositor thread animation is active during this frame. */
    has_compositor_animation: boolean;
    /** If any touch-driven UX (not scroll) is active during this frame. */
    has_smooth_input_main: boolean;
    /**  Whether the frame contained any missing content (i.e. whether there was
         checkerboarding in the frame). */
    has_missing_content: boolean;
    /** The id of layer_tree_host that the frame has been produced for. */
    layer_tree_host_id: number;
    /** If total latency of PipelineReporter exceeds a certain limit. */
    has_high_latency: boolean;
    /**  Indicate if the frame is "FORKED" (i.e. a PipelineReporter event starts at
         the same frame sequence as another PipelineReporter) or "BACKFILL"
         (i.e. dropped frames when there are no partial compositor updates). */
    frame_type: FrameType;
    /**  The breakdown stage of PipelineReporter that is most likely accountable for
         high latency. */
    high_latency_contribution_stage: string[];
}
declare const enum State {
    /** The frame did not have any updates to present. **/
    STATE_NO_UPDATE_DESIRED = "STATE_NO_UPDATE_DESIRED",
    /**  The frame presented all the desired updates (i.e. any updates requested
         from both the compositor thread and main-threads were handled). **/
    STATE_PRESENTED_ALL = "STATE_PRESENTED_ALL",
    /**  The frame was presented with some updates, but also missed some updates
         (e.g. missed updates from the main-thread, but included updates from the
          compositor thread). **/
    STATE_PRESENTED_PARTIAL = "STATE_PRESENTED_PARTIAL",
    /**  The frame was dropped, i.e. some updates were desired for the frame, but
         was not presented. **/
    STATE_DROPPED = "STATE_DROPPED"
}
declare const enum FrameDropReason {
    REASON_UNSPECIFIED = "REASON_UNSPECIFIED",
    /**  Frame was dropped by the display-compositor.
           The display-compositor may drop a frame some times (e.g. the frame missed
          the deadline, or was blocked on surface-sync, etc.) **/
    REASON_DISPLAY_COMPOSITOR = "REASON_DISPLAY_COMPOSITOR",
    /**  Frame was dropped because of the main-thread.
           The main-thread may cause a frame to be dropped, e.g. if the main-thread
          is running expensive javascript, or doing a lot of layout updates, etc. **/
    REASON_MAIN_THREAD = "REASON_MAIN_THREAD",
    /**  Frame was dropped by the client compositor.
           The client compositor can drop some frames too (e.g. attempting to
           recover latency, missing the deadline, etc.). **/
    REASON_CLIENT_COMPOSITOR = "REASON_CLIENT_COMPOSITOR"
}
declare const enum ScrollState {
    SCROLL_NONE = "SCROLL_NONE",
    SCROLL_MAIN_THREAD = "SCROLL_MAIN_THREAD",
    SCROLL_COMPOSITOR_THREAD = "SCROLL_COMPOSITOR_THREAD",
    /** Used when it can't be determined whether a scroll is in progress or not. */
    SCROLL_UNKNOWN = "SCROLL_UNKNOWN"
}
declare const enum FrameType {
    FORKED = "FORKED",
    BACKFILL = "BACKFILL"
}
export interface PipelineReporter extends Event {
    id2?: {
        local?: string;
    };
    ph: Phase.ASYNC_NESTABLE_START | Phase.ASYNC_NESTABLE_END;
    args: Args & {
        chrome_frame_reporter: ChromeFrameReporter;
    };
}
export declare function isPipelineReporter(event: Event): event is PipelineReporter;
export interface SyntheticBased<Ph extends Phase = Phase> extends Event {
    ph: Ph;
    rawSourceEvent: Event;
    _tag: 'SyntheticEntryTag';
}
export declare function isSyntheticBased(event: Event): event is SyntheticBased;
export interface SyntheticEventPair<T extends PairableAsync = PairableAsync> extends SyntheticBased {
    rawSourceEvent: Event;
    name: T['name'];
    cat: T['cat'];
    id?: string;
    id2?: {
        local?: string;
        global?: string;
    };
    dur: MicroSeconds;
    args: Args & {
        data: {
            beginEvent: T & PairableAsyncBegin;
            endEvent: T & PairableAsyncEnd;
            instantEvents?: Array<T & PairableAsyncInstant>;
        };
    };
}
export type SyntheticPipelineReporterPair = SyntheticEventPair<PipelineReporter>;
export type SyntheticUserTimingPair = SyntheticEventPair<PerformanceMeasure>;
export type SyntheticConsoleTimingPair = SyntheticEventPair<ConsoleTime>;
export type SyntheticAnimationPair = SyntheticEventPair<Animation>;
export interface SyntheticInteractionPair extends SyntheticEventPair<EventTimingBeginOrEnd> {
    interactionId: number;
    type: string;
    ts: MicroSeconds;
    dur: MicroSeconds;
    processingStart: MicroSeconds;
    processingEnd: MicroSeconds;
    inputDelay: MicroSeconds;
    mainThreadHandling: MicroSeconds;
    presentationDelay: MicroSeconds;
}
/**
 * A profile call created in the frontend from samples disguised as a
 * trace event.
 *
 * We store the sampleIndex, profileId and nodeId so that we can easily link
 * back a Synthetic Trace Entry to an indivdual Sample trace event within a
 * Profile.
 *
 * Because a sample contains a set of call frames representing the stack at the
 * point in time that the sample was created, we also have to store the ID of
 * the Node that points to the function call that this profile call represents.
 */
export interface SyntheticProfileCall extends Event {
    callFrame: Protocol.Runtime.CallFrame;
    nodeId: Protocol.integer;
    sampleIndex: number;
    profileId: ProfileID;
}
/**
 * A synthetic event created from the Server-Timing header of network
 * request. In order to create these synthetic events, the corresponding
 * metric (timing) in the header must contain a "start" param, which
 * corresponds to the timestamp of the metric in the server. The
 * ServerTimingsHandler implements a heuristic to estimate the offset
 * between the client clock and the server clock so that the server
 * timestamp can be translated to the tracing clock.
 */
export interface SyntheticServerTiming<T extends Phase = Phase.COMPLETE> extends SyntheticBased<T> {
    rawSourceEvent: ResourceSendRequest;
    cat: 'devtools.server-timing';
    args: Args & {
        data: ArgsData & {
            desc?: string;
            origin: string;
        };
    };
}
/**
 * A JS Sample reflects a single sample from the V8 CPU Profile
 */
export interface SyntheticJSSample extends Event {
    name: Name.JS_SAMPLE;
    args: Args & {
        data: ArgsData & {
            stackTrace: Protocol.Runtime.CallFrame[];
        };
    };
    ph: Phase.INSTANT;
}
export declare function isSyntheticInteraction(event: Event): event is SyntheticInteractionPair;
export interface DrawFrame extends Instant {
    name: Name.DRAW_FRAME;
    args: Args & {
        layerTreeId: number;
        frameSeqId: number;
    };
}
export declare function isDrawFrame(event: Event): event is DrawFrame;
export interface LegacyDrawFrameBegin extends Async {
    name: Name.DRAW_FRAME;
    ph: Phase.ASYNC_NESTABLE_START;
    args: Args & {
        layerTreeId: number;
        frameSeqId: number;
    };
}
export declare function isLegacyTraceEventDrawFrameBegin(event: Event): event is LegacyDrawFrameBegin;
export interface BeginFrame extends Instant {
    name: Name.BEGIN_FRAME;
    args: Args & {
        layerTreeId: number;
        frameSeqId: number;
    };
}
export declare function isBeginFrame(event: Event): event is BeginFrame;
export interface DroppedFrame extends Instant {
    name: Name.DROPPED_FRAME;
    args: Args & {
        layerTreeId: number;
        frameSeqId: number;
        hasPartialUpdate?: boolean;
    };
}
export declare function isDroppedFrame(event: Event): event is DroppedFrame;
export interface RequestMainThreadFrame extends Instant {
    name: Name.REQUEST_MAIN_THREAD_FRAME;
    args: Args & {
        layerTreeId: number;
    };
}
export declare function isRequestMainThreadFrame(event: Event): event is RequestMainThreadFrame;
export interface BeginMainThreadFrame extends Instant {
    name: Name.BEGIN_MAIN_THREAD_FRAME;
    args: Args & {
        layerTreeId: number;
        data: ArgsData & {
            frameId?: number;
        };
    };
}
export declare function isBeginMainThreadFrame(event: Event): event is BeginMainThreadFrame;
export interface NeedsBeginFrameChanged extends Instant {
    name: Name.NEEDS_BEGIN_FRAME_CHANGED;
    args: Args & {
        layerTreeId: number;
        data: ArgsData & {
            needsBeginFrame: number;
        };
    };
}
export declare function isNeedsBeginFrameChanged(event: Event): event is NeedsBeginFrameChanged;
export interface Commit extends Instant {
    name: Name.COMMIT;
    args: Args & {
        layerTreeId: number;
        frameSeqId: number;
    };
}
export declare function isCommit(event: Event): event is Commit;
export interface RasterTask extends Complete {
    name: Name.RASTER_TASK;
    args: Args & {
        tileData?: {
            layerId: number;
            sourceFrameNumber: number;
            tileId: {
                id_ref: string;
            };
            tileResolution: string;
        };
    };
}
export declare function isRasterTask(event: Event): event is RasterTask;
export interface CompositeLayers extends Instant {
    name: Name.COMPOSITE_LAYERS;
    args: Args & {
        layerTreeId: number;
    };
}
export declare function isCompositeLayers(event: Event): event is CompositeLayers;
export interface ActivateLayerTree extends Instant {
    name: Name.ACTIVATE_LAYER_TREE;
    args: Args & {
        layerTreeId: number;
        frameId: number;
    };
}
export declare function isActivateLayerTree(event: Event): event is ActivateLayerTree;
export type InvalidationTrackingEvent = ScheduleStyleInvalidationTracking | StyleRecalcInvalidationTracking | StyleInvalidatorInvalidationTracking | LayoutInvalidationTracking;
export declare function isInvalidationTracking(event: Event): event is InvalidationTrackingEvent;
export interface DrawLazyPixelRef extends Instant {
    name: Name.DRAW_LAZY_PIXEL_REF;
    args?: Args & {
        LazyPixelRef: number;
    };
}
export declare function isDrawLazyPixelRef(event: Event): event is DrawLazyPixelRef;
export interface DecodeLazyPixelRef extends Instant {
    name: Name.DECODE_LAZY_PIXEL_REF;
    args?: Args & {
        LazyPixelRef: number;
    };
}
export declare function isDecodeLazyPixelRef(event: Event): event is DecodeLazyPixelRef;
export interface DecodeImage extends Complete {
    name: Name.DECODE_IMAGE;
    args: Args & {
        imageType: string;
    };
}
export declare function isDecodeImage(event: Event): event is DecodeImage;
export interface SelectorTiming {
    'elapsed (us)': number;
    'fast_reject_count': number;
    'match_attempts': number;
    'selector': string;
    'style_sheet_id': string;
    'match_count': number;
}
export declare enum SelectorTimingsKey {
    Elapsed = "elapsed (us)",
    RejectPercentage = "reject_percentage",
    FastRejectCount = "fast_reject_count",
    MatchAttempts = "match_attempts",
    MatchCount = "match_count",
    Selector = "selector",
    StyleSheetId = "style_sheet_id"
}
export interface SelectorStats {
    selector_timings: SelectorTiming[];
}
export interface SelectorStats extends Complete {
    name: Name.SELECTOR_STATS;
    args: Args & {
        selector_stats?: SelectorStats;
    };
}
export declare function isSelectorStats(event: Event): event is SelectorStats;
export interface UpdateLayoutTree extends Complete {
    name: Name.UPDATE_LAYOUT_TREE;
    args: Args & {
        elementCount: number;
        beginData?: {
            frame: string;
            stackTrace?: CallFrame[];
        };
    };
}
export declare function isUpdateLayoutTree(event: Event): event is UpdateLayoutTree;
export interface Layout extends Complete {
    name: Name.LAYOUT;
    args: Args & {
        beginData: {
            frame: string;
            dirtyObjects: number;
            partialLayout: boolean;
            totalObjects: number;
        };
        endData?: {
            layoutRoots: Array<{
                depth: number;
                nodeId: Protocol.DOM.BackendNodeId;
                quads: number[][];
            }>;
        };
    };
}
export declare function isLayout(event: Event): event is Layout;
export interface InvalidateLayout extends Instant {
    name: Name.INVALIDATE_LAYOUT;
    args: Args & {
        data: {
            frame: string;
            nodeId: Protocol.DOM.BackendNodeId;
        };
    };
}
export declare function isInvalidateLayout(event: Event): event is InvalidateLayout;
declare class ProfileIdTag {
    #private;
}
export type ProfileID = string & ProfileIdTag;
export declare function ProfileID(value: string): ProfileID;
declare class CallFrameIdTag {
    #private;
}
export type CallFrameID = number & CallFrameIdTag;
export declare function CallFrameID(value: number): CallFrameID;
declare class SampleIndexTag {
    #private;
}
export type SampleIndex = number & SampleIndexTag;
export declare function SampleIndex(value: number): SampleIndex;
declare class ProcessIdTag {
    #private;
}
export type ProcessID = number & ProcessIdTag;
export declare function ProcessID(value: number): ProcessID;
declare class ThreadIdTag {
    #private;
}
export type ThreadID = number & ThreadIdTag;
export declare function ThreadID(value: number): ThreadID;
declare class WorkerIdTag {
    #private;
}
export type WorkerId = string & WorkerIdTag;
export declare function WorkerId(value: string): WorkerId;
export declare function isComplete(event: Event): event is Complete;
export declare function isBegin(event: Event): event is Begin;
export declare function isEnd(event: Event): event is End;
export declare function isDispatch(event: Event): event is Dispatch;
export declare function isInstant(event: Event): event is Instant;
export declare function isRendererEvent(event: Event): event is RendererEvent;
export declare function isFireIdleCallback(event: Event): event is FireIdleCallback;
export declare function isSchedulePostMessage(event: Event): event is SchedulePostMessage;
export declare function isHandlePostMessage(event: Event): event is HandlePostMessage;
export declare function isUpdateCounters(event: Event): event is UpdateCounters;
export declare function isThreadName(event: Event): event is ThreadName;
export declare function isProcessName(event: Event): event is ProcessName;
export declare function isTracingStartedInBrowser(event: Event): event is TracingStartedInBrowser;
export declare function isFrameCommittedInBrowser(event: Event): event is FrameCommittedInBrowser;
export declare function isCommitLoad(event: Event): event is CommitLoad;
/** @deprecated You probably want `isNavigationStart` instead. */
export declare function isNavigationStartUnreliable(event: Event): event is NavigationStartUnreliable;
export declare function isAnimation(event: Event): event is Animation;
export declare function isSyntheticAnimation(event: Event): event is SyntheticAnimationPair;
export declare function isLayoutShift(event: Event): event is LayoutShift;
export declare function isLayoutInvalidationTracking(event: Event): event is LayoutInvalidationTracking;
export declare function isFirstContentfulPaint(event: Event): event is FirstContentfulPaint;
export declare function isLargestContentfulPaintCandidate(event: Event): event is LargestContentfulPaintCandidate;
export declare function isLargestImagePaintCandidate(event: Event): event is LargestImagePaintCandidate;
export declare function isLargestTextPaintCandidate(event: Event): event is LargestTextPaintCandidate;
export declare function isMarkLoad(event: Event): event is MarkLoad;
export declare function isFirstPaint(event: Event): event is FirstPaint;
export declare function isMarkDOMContent(event: Event): event is MarkDOMContent;
export declare function isInteractiveTime(event: Event): event is InteractiveTime;
export declare function isEventTiming(event: Event): event is EventTimingBeginOrEnd;
export declare function isEventTimingEnd(event: Event): event is EventTimingEnd;
export declare function isEventTimingStart(event: Event): event is EventTimingBegin;
export declare function isGPUTask(event: Event): event is GPUTask;
export declare function isProfile(event: Event): event is Profile;
export declare function isSyntheticCpuProfile(event: Event): event is SyntheticCpuProfile;
export declare function isProfileChunk(event: Event): event is ProfileChunk;
export declare function isResourceChangePriority(event: Event): event is ResourceChangePriority;
export declare function isResourceSendRequest(event: Event): event is ResourceSendRequest;
export declare function isResourceReceiveResponse(event: Event): event is ResourceReceiveResponse;
export declare function isResourceMarkAsCached(event: Event): event is ResourceMarkAsCached;
export declare function isResourceFinish(event: Event): event is ResourceFinish;
export declare function isResourceWillSendRequest(event: Event): event is ResourceWillSendRequest;
export declare function isResourceReceivedData(event: Event): event is ResourceReceivedData;
export declare function isSyntheticNetworkRequest(event: Event): event is SyntheticNetworkRequest;
export declare function isSyntheticWebSocketConnection(event: Event): event is SyntheticWebSocketConnection;
export declare function isNetworkTrackEntry(event: Event): event is SyntheticWebSocketConnection | SyntheticNetworkRequest;
export declare function isPrePaint(event: Event): event is PrePaint;
/** A VALID navigation start (as it has a populated documentLoaderURL) */
export declare function isNavigationStart(event: Event): event is NavigationStart;
export declare function isMainFrameViewport(event: Event): event is MainFrameViewport;
export declare function isSyntheticUserTiming(event: Event): event is SyntheticUserTimingPair;
export declare function isSyntheticConsoleTiming(event: Event): event is SyntheticConsoleTimingPair;
export declare function isUserTiming(event: Event): event is UserTiming;
export declare function isDomLoading(event: Event): event is DomLoading;
export declare function isBeginRemoteFontLoad(event: Event): event is BeginRemoteFontLoad;
export declare function isPerformanceMeasure(event: Event): event is PerformanceMeasure;
export declare function isPerformanceMark(event: Event): event is PerformanceMark;
export declare function isConsoleTime(event: Event): event is ConsoleTime;
export declare function isTimeStamp(event: Event): event is TimeStamp;
export declare function isParseHTML(event: Event): event is ParseHTML;
export interface Async extends Event {
    ph: Phase.ASYNC_NESTABLE_START | Phase.ASYNC_NESTABLE_INSTANT | Phase.ASYNC_NESTABLE_END | Phase.ASYNC_STEP_INTO | Phase.ASYNC_BEGIN | Phase.ASYNC_END | Phase.ASYNC_STEP_PAST;
}
export declare function isSyntheticLayoutShift(event: Event): event is SyntheticLayoutShift;
export declare function isSyntheticLayoutShiftCluster(event: Event): event is SyntheticLayoutShiftCluster;
export declare function isProfileCall(event: Event): event is SyntheticProfileCall;
export interface Paint extends Complete {
    name: Name.PAINT;
    args: Args & {
        data: ArgsData & {
            clip: number[];
            frame: string;
            layerId: number;
            nodeId?: Protocol.DOM.BackendNodeId;
        };
    };
}
export declare function isPaint(event: Event): event is Paint;
export interface PaintImage extends Complete {
    name: Name.PAINT_IMAGE;
    args: Args & {
        data: Event & {
            height: number;
            width: number;
            x: number;
            y: number;
            url?: string;
            srcHeight: number;
            srcWidth: number;
            nodeId?: Protocol.DOM.BackendNodeId;
        };
    };
}
export declare function isPaintImage(event: Event): event is PaintImage;
export interface ScrollLayer extends Complete {
    name: Name.SCROLL_LAYER;
    args: Args & {
        data: Event & {
            frame: string;
            nodeId?: Protocol.DOM.BackendNodeId;
        };
    };
}
export declare function isScrollLayer(event: Event): event is ScrollLayer;
export interface SetLayerTreeId extends Instant {
    name: Name.SET_LAYER_TREE_ID;
    args: Args & {
        data: ArgsData & {
            frame: string;
            layerTreeId: number;
        };
    };
}
export declare function isSetLayerId(event: Event): event is SetLayerTreeId;
export interface UpdateLayer extends Complete {
    name: Name.UPDATE_LAYER;
    args: Args & {
        layerId: number;
        layerTreeId: number;
    };
}
export declare function isUpdateLayer(event: Event): event is UpdateLayer;
export interface DisplayItemListSnapshot extends Event {
    name: Name.DISPLAY_ITEM_LIST_SNAPSHOT;
    ph: Phase.OBJECT_SNAPSHOT;
    id2: {
        local?: string;
    };
    args: Args & {
        snapshot: {
            skp64: string;
            params?: {
                layer_rect: [number, number, number, number];
            };
        };
    };
}
export declare function isDisplayListItemListSnapshot(event: Event): event is DisplayItemListSnapshot;
export interface LayerTreeHostImplSnapshot extends Event {
    name: Name.LAYER_TREE_HOST_IMPL_SNAPSHOT;
    ph: Phase.OBJECT_SNAPSHOT;
    id: string;
    args: Args & {
        snapshot: {
            active_tiles: Array<{
                id: string;
                layer_id: string;
                gpu_memory_usage: number;
                content_rect: number[];
            }>;
            device_viewport_size: {
                width: number;
                height: number;
            };
            active_tree: {
                root_layer: TraceLayer;
                layers: TraceLayer[];
            };
        };
    };
}
export declare function isLayerTreeHostImplSnapshot(event: Event): event is LayerTreeHostImplSnapshot;
export interface TraceLayer {
    bounds: {
        height: number;
        width: number;
    };
    children: TraceLayer[];
    layer_id: number;
    position: number[];
    scroll_offset: number[];
    layer_quad: number[];
    draws_content: number;
    gpu_memory_usage: number;
    transform: number[];
    owner_node: Protocol.DOM.BackendNodeId;
    compositing_reasons: string[];
    compositing_reason_ids: string[];
    non_fast_scrollable_region: number[];
    touch_event_handler_region: number[];
    wheel_event_handler_region: number[];
    scroll_event_handler_region: number[];
}
export interface TracingLayerTile {
    id: string;
    layer_id: string;
    gpu_memory_usage: number;
    content_rect: number[];
}
export interface FireAnimationFrame extends Complete {
    name: Name.FIRE_ANIMATION_FRAME;
    args: Args & {
        data: {
            frame: string;
            id: number;
        };
    };
}
export declare function isFireAnimationFrame(event: Event): event is FireAnimationFrame;
export interface RequestAnimationFrame extends Instant {
    name: Name.REQUEST_ANIMATION_FRAME;
    args: Args & {
        data: {
            frame: string;
            id: number;
            stackTrace?: CallFrame;
        };
    };
}
export declare function isRequestAnimationFrame(event: Event): event is RequestAnimationFrame;
export interface TimerInstall extends Instant {
    name: Name.TIMER_INSTALL;
    args: Args & {
        data: {
            frame: string;
            singleShot: boolean;
            stackTrace?: CallFrame;
            timeout: number;
            timerId: number;
        };
    };
}
export declare function isTimerInstall(event: Event): event is TimerInstall;
export interface TimerFire extends Complete {
    name: Name.TIMER_FIRE;
    args: Args & {
        data: {
            frame: string;
            timerId: number;
        };
    };
}
export declare function isTimerFire(event: Event): event is TimerFire;
export interface RequestIdleCallback extends Instant {
    name: Name.REQUEST_IDLE_CALLBACK;
    args: Args & {
        data: {
            frame: string;
            id: number;
            timeout: number;
            stackTrace?: CallFrame;
        };
    };
}
export declare function isRequestIdleCallback(event: Event): event is RequestIdleCallback;
export interface WebSocketCreate extends Instant {
    name: Name.WEB_SOCKET_CREATE;
    args: Args & {
        data: {
            identifier: number;
            url: string;
            frame?: string;
            workerId?: string;
            websocketProtocol?: string;
            stackTrace?: CallFrame;
        };
    };
}
export declare function isWebSocketCreate(event: Event): event is WebSocketCreate;
export interface WebSocketInfo extends Instant {
    name: Name.WEB_SOCKET_DESTROY | Name.WEB_SOCKET_RECEIVE_HANDSHAKE | Name.WEB_SOCKET_RECEIVE_HANDSHAKE_REQUEST;
    args: Args & {
        data: ArgsData & {
            identifier: number;
            url: string;
            frame?: string;
            workerId?: string;
        };
    };
}
export interface WebSocketTransfer extends Instant {
    name: Name.WEB_SOCKET_SEND | Name.WEB_SOCKET_RECEIVE;
    args: Args & {
        data: ArgsData & {
            identifier: number;
            url: string;
            frame?: string;
            workerId?: string;
            dataLength: number;
        };
    };
}
export declare function isWebSocketInfo(event: Event): event is WebSocketInfo;
export declare function isWebSocketTransfer(event: Event): event is WebSocketTransfer;
export interface WebSocketSend extends Instant {
    name: Name.WEB_SOCKET_SEND;
    args: Args & {
        data: ArgsData & {
            identifier: number;
            url: string;
            frame?: string;
            workerId?: string;
            dataLength: number;
        };
    };
}
export declare function isWebSocketSend(event: Event): event is WebSocketSend;
export interface WebSocketReceive extends Instant {
    name: Name.WEB_SOCKET_RECEIVE;
    args: Args & {
        data: ArgsData & {
            identifier: number;
            url: string;
            frame?: string;
            workerId?: string;
            dataLength: number;
        };
    };
}
export declare function isWebSocketReceive(event: Event): event is WebSocketReceive;
export interface WebSocketSendHandshakeRequest extends Instant {
    name: Name.WEB_SOCKET_SEND_HANDSHAKE_REQUEST;
    args: Args & {
        data: {
            frame: string;
            identifier: number;
        };
    };
}
export declare function isWebSocketSendHandshakeRequest(event: Event): event is WebSocketSendHandshakeRequest;
export interface WebSocketReceiveHandshakeResponse extends Instant {
    name: Name.WEB_SOCKET_RECEIVE_HANDSHAKE_REQUEST;
    args: Args & {
        data: {
            frame: string;
            identifier: number;
        };
    };
}
export declare function isWebSocketReceiveHandshakeResponse(event: Event): event is WebSocketReceiveHandshakeResponse;
export interface WebSocketDestroy extends Instant {
    name: Name.WEB_SOCKET_DESTROY;
    args: Args & {
        data: {
            frame: string;
            identifier: number;
        };
    };
}
export declare function isWebSocketDestroy(event: Event): event is WebSocketDestroy;
export type WebSocketTraceEvent = WebSocketCreate | WebSocketInfo | WebSocketTransfer;
export declare function isWebSocketTraceEvent(event: Event): event is WebSocketTraceEvent;
export type WebSocketEvent = WebSocketTraceEvent | SyntheticWebSocketConnection;
export declare function isWebSocketEvent(event: Event): event is WebSocketTraceEvent | SyntheticWebSocketConnection;
export interface V8Compile extends Complete {
    name: Name.COMPILE;
    args: Args & {
        data?: {
            url?: string;
            columnNumber?: number;
            consumedCacheSize?: number;
            cacheRejected?: boolean;
            cacheKind?: 'full' | 'normal';
            lineNumber?: number;
            notStreamedReason?: string;
            streamed?: boolean;
            eager?: boolean;
        };
        fileName?: string;
    };
}
export declare function isV8Compile(event: Event): event is V8Compile;
export interface FunctionCall extends Complete {
    name: Name.FUNCTION_CALL;
    args: Args & {
        data?: {
            frame?: string;
            columnNumber?: number;
            lineNumber?: number;
            functionName?: string;
            scriptId?: number;
            url?: string;
        };
    };
}
export declare function isFunctionCall(event: Event): event is FunctionCall;
export declare function isSyntheticServerTiming(event: Event): event is SyntheticServerTiming;
export interface SchedulePostTaskCallback extends Instant {
    name: Name.SCHEDULE_POST_TASK_CALLBACK;
    args: Args & {
        data: {
            taskId: number;
            priority: 'user-blocking' | 'user-visible' | 'background';
            delay: MilliSeconds;
            frame?: string;
            stackTrace?: CallFrame;
        };
    };
}
export declare function isSchedulePostTaskCallback(event: Event): event is SchedulePostTaskCallback;
export interface RunPostTaskCallback extends Complete {
    name: Name.RUN_POST_TASK_CALLBACK;
    args: Args & {
        data: {
            taskId: number;
            priority: 'user-blocking' | 'user-visible' | 'background';
            delay: MilliSeconds;
            frame?: string;
        };
    };
}
export declare function isRunPostTaskCallback(event: Event): event is RunPostTaskCallback;
export interface AbortPostTaskCallback extends Complete {
    name: Name.ABORT_POST_TASK_CALLBACK;
    args: Args & {
        data: {
            taskId: number;
            frame?: string;
            stackTrace?: CallFrame;
        };
    };
}
export declare function isAbortPostTaskCallback(event: Event): event is RunPostTaskCallback;
/**
 * Generally, before JS is executed, a trace event is dispatched that
 * parents the JS calls. These we call "invocation" events. This
 * function determines if an event is one of such.
 */
export declare function isJSInvocationEvent(event: Event): boolean;
/**
 * This is an exhaustive list of events we track in the Performance
 * panel. Note not all of them are necessarliry shown in the flame
 * chart, some of them we only use for parsing.
 * TODO(crbug.com/1428024): Complete this enum.
 */
export declare const enum Name {
    THREAD_NAME = "thread_name",
    PROGRAM = "Program",
    RUN_TASK = "RunTask",
    ASYNC_TASK = "AsyncTask",
    RUN_MICROTASKS = "RunMicrotasks",
    XHR_LOAD = "XHRLoad",
    XHR_READY_STATE_CHANGED = "XHRReadyStateChange",
    PARSE_HTML = "ParseHTML",
    PARSE_CSS = "ParseAuthorStyleSheet",
    COMPILE_CODE = "V8.CompileCode",
    COMPILE_MODULE = "V8.CompileModule",
    COMPILE = "v8.compile",
    COMPILE_SCRIPT = "V8.CompileScript",
    OPTIMIZE = "V8.OptimizeCode",
    WASM_STREAM_FROM_RESPONSE_CALLBACK = "v8.wasm.streamFromResponseCallback",
    WASM_COMPILED_MODULE = "v8.wasm.compiledModule",
    WASM_CACHED_MODULE = "v8.wasm.cachedModule",
    WASM_MODULE_CACHE_HIT = "v8.wasm.moduleCacheHit",
    WASM_MODULE_CACHE_INVALID = "v8.wasm.moduleCacheInvalid",
    PROFILE_CALL = "ProfileCall",
    EVALUATE_SCRIPT = "EvaluateScript",
    FUNCTION_CALL = "FunctionCall",
    EVENT_DISPATCH = "EventDispatch",
    EVALUATE_MODULE = "v8.evaluateModule",
    REQUEST_MAIN_THREAD_FRAME = "RequestMainThreadFrame",
    REQUEST_ANIMATION_FRAME = "RequestAnimationFrame",
    CANCEL_ANIMATION_FRAME = "CancelAnimationFrame",
    FIRE_ANIMATION_FRAME = "FireAnimationFrame",
    REQUEST_IDLE_CALLBACK = "RequestIdleCallback",
    CANCEL_IDLE_CALLBACK = "CancelIdleCallback",
    FIRE_IDLE_CALLBACK = "FireIdleCallback",
    TIMER_INSTALL = "TimerInstall",
    TIMER_REMOVE = "TimerRemove",
    TIMER_FIRE = "TimerFire",
    WEB_SOCKET_CREATE = "WebSocketCreate",
    WEB_SOCKET_SEND_HANDSHAKE = "WebSocketSendHandshakeRequest",
    WEB_SOCKET_RECEIVE_HANDSHAKE = "WebSocketReceiveHandshakeResponse",
    WEB_SOCKET_DESTROY = "WebSocketDestroy",
    WEB_SOCKET_SEND = "WebSocketSend",
    WEB_SOCKET_RECEIVE = "WebSocketReceive",
    CRYPTO_DO_ENCRYPT = "DoEncrypt",
    CRYPTO_DO_ENCRYPT_REPLY = "DoEncryptReply",
    CRYPTO_DO_DECRYPT = "DoDecrypt",
    CRYPTO_DO_DECRYPT_REPLY = "DoDecryptReply",
    CRYPTO_DO_DIGEST = "DoDigest",
    CRYPTO_DO_DIGEST_REPLY = "DoDigestReply",
    CRYPTO_DO_SIGN = "DoSign",
    CRYPTO_DO_SIGN_REPLY = "DoSignReply",
    CRYPTO_DO_VERIFY = "DoVerify",
    CRYPTO_DO_VERIFY_REPLY = "DoVerifyReply",
    V8_EXECUTE = "V8.Execute",
    SCHEDULE_POST_TASK_CALLBACK = "SchedulePostTaskCallback",
    RUN_POST_TASK_CALLBACK = "RunPostTaskCallback",
    ABORT_POST_TASK_CALLBACK = "AbortPostTaskCallback",
    GC = "GCEvent",
    DOMGC = "BlinkGC.AtomicPhase",
    MAJOR_GC = "MajorGC",
    MINOR_GC = "MinorGC",
    GC_COLLECT_GARBARGE = "BlinkGC.AtomicPhase",
    CPPGC_SWEEP = "CppGC.IncrementalSweep",
    SCHEDULE_STYLE_RECALCULATION = "ScheduleStyleRecalculation",
    LAYOUT = "Layout",
    UPDATE_LAYOUT_TREE = "UpdateLayoutTree",
    INVALIDATE_LAYOUT = "InvalidateLayout",
    LAYOUT_INVALIDATION_TRACKING = "LayoutInvalidationTracking",
    COMPUTE_INTERSECTION = "ComputeIntersections",
    HIT_TEST = "HitTest",
    PRE_PAINT = "PrePaint",
    LAYERIZE = "Layerize",
    LAYOUT_SHIFT = "LayoutShift",
    SYNTHETIC_LAYOUT_SHIFT_CLUSTER = "SyntheticLayoutShiftCluster",
    UPDATE_LAYER_TREE = "UpdateLayerTree",
    SCHEDULE_STYLE_INVALIDATION_TRACKING = "ScheduleStyleInvalidationTracking",
    STYLE_RECALC_INVALIDATION_TRACKING = "StyleRecalcInvalidationTracking",
    STYLE_INVALIDATOR_INVALIDATION_TRACKING = "StyleInvalidatorInvalidationTracking",
    SELECTOR_STATS = "SelectorStats",
    BEGIN_COMMIT_COMPOSITOR_FRAME = "BeginCommitCompositorFrame",
    PARSE_META_VIEWPORT = "ParseMetaViewport",
    SCROLL_LAYER = "ScrollLayer",
    UPDATE_LAYER = "UpdateLayer",
    PAINT_SETUP = "PaintSetup",
    PAINT = "Paint",
    PAINT_IMAGE = "PaintImage",
    COMMIT = "Commit",
    COMPOSITE_LAYERS = "CompositeLayers",
    RASTER_TASK = "RasterTask",
    IMAGE_DECODE_TASK = "ImageDecodeTask",
    IMAGE_UPLOAD_TASK = "ImageUploadTask",
    DECODE_IMAGE = "Decode Image",
    DRAW_LAZY_PIXEL_REF = "Draw LazyPixelRef",
    DECODE_LAZY_PIXEL_REF = "Decode LazyPixelRef",
    GPU_TASK = "GPUTask",
    RASTERIZE = "Rasterize",
    EVENT_TIMING = "EventTiming",
    OPTIMIZE_CODE = "V8.OptimizeCode",
    CACHE_SCRIPT = "v8.produceCache",
    CACHE_MODULE = "v8.produceModuleCache",
    V8_SAMPLE = "V8Sample",
    JIT_CODE_ADDED = "JitCodeAdded",
    JIT_CODE_MOVED = "JitCodeMoved",
    STREAMING_COMPILE_SCRIPT = "v8.parseOnBackground",
    STREAMING_COMPILE_SCRIPT_WAITING = "v8.parseOnBackgroundWaiting",
    STREAMING_COMPILE_SCRIPT_PARSING = "v8.parseOnBackgroundParsing",
    BACKGROUND_DESERIALIZE = "v8.deserializeOnBackground",
    FINALIZE_DESERIALIZATION = "V8.FinalizeDeserialization",
    COMMIT_LOAD = "CommitLoad",
    MARK_LOAD = "MarkLoad",
    MARK_DOM_CONTENT = "MarkDOMContent",
    MARK_FIRST_PAINT = "firstPaint",
    MARK_FCP = "firstContentfulPaint",
    MARK_LCP_CANDIDATE = "largestContentfulPaint::Candidate",
    MARK_LCP_INVALIDATE = "largestContentfulPaint::Invalidate",
    NAVIGATION_START = "navigationStart",
    TIME_STAMP = "TimeStamp",
    CONSOLE_TIME = "ConsoleTime",
    USER_TIMING = "UserTiming",
    INTERACTIVE_TIME = "InteractiveTime",
    BEGIN_FRAME = "BeginFrame",
    NEEDS_BEGIN_FRAME_CHANGED = "NeedsBeginFrameChanged",
    BEGIN_MAIN_THREAD_FRAME = "BeginMainThreadFrame",
    ACTIVATE_LAYER_TREE = "ActivateLayerTree",
    DRAW_FRAME = "DrawFrame",
    DROPPED_FRAME = "DroppedFrame",
    FRAME_STARTED_LOADING = "FrameStartedLoading",
    PIPELINE_REPORTER = "PipelineReporter",
    SCREENSHOT = "Screenshot",
    RESOURCE_WILL_SEND_REQUEST = "ResourceWillSendRequest",
    RESOURCE_SEND_REQUEST = "ResourceSendRequest",
    RESOURCE_RECEIVE_RESPONSE = "ResourceReceiveResponse",
    RESOURCE_RECEIVE_DATA = "ResourceReceivedData",
    RESOURCE_FINISH = "ResourceFinish",
    RESOURCE_MARK_AS_CACHED = "ResourceMarkAsCached",
    WEB_SOCKET_SEND_HANDSHAKE_REQUEST = "WebSocketSendHandshakeRequest",
    WEB_SOCKET_RECEIVE_HANDSHAKE_REQUEST = "WebSocketReceiveHandshakeResponse",
    PROFILE = "Profile",
    START_PROFILING = "CpuProfiler::StartProfiling",
    PROFILE_CHUNK = "ProfileChunk",
    UPDATE_COUNTERS = "UpdateCounters",
    JS_SAMPLE = "JSSample",
    ANIMATION = "Animation",
    PARSE_AUTHOR_STYLE_SHEET = "ParseAuthorStyleSheet",
    EMBEDDER_CALLBACK = "EmbedderCallback",
    SET_LAYER_TREE_ID = "SetLayerTreeId",
    TRACING_STARTED_IN_PAGE = "TracingStartedInPage",
    TRACING_STARTED_IN_BROWSER = "TracingStartedInBrowser",
    TRACING_SESSION_ID_FOR_WORKER = "TracingSessionIdForWorker",
    LAZY_PIXEL_REF = "LazyPixelRef",
    LAYER_TREE_HOST_IMPL_SNAPSHOT = "cc::LayerTreeHostImpl",
    PICTURE_SNAPSHOT = "cc::Picture",
    DISPLAY_ITEM_LIST_SNAPSHOT = "cc::DisplayItemList",
    INPUT_LATENCY_MOUSE_MOVE = "InputLatency::MouseMove",
    INPUT_LATENCY_MOUSE_WHEEL = "InputLatency::MouseWheel",
    IMPL_SIDE_FLING = "InputHandlerProxy::HandleGestureFling::started",
    SCHEDULE_POST_MESSAGE = "SchedulePostMessage",
    HANDLE_POST_MESSAGE = "HandlePostMessage",
    RENDER_FRAME_IMPL_CREATE_CHILD_FRAME = "RenderFrameImpl::createChildFrame",
    LAYOUT_IMAGE_UNSIZED = "LayoutImageUnsized",
    DOM_LOADING = "domLoading",
    BEGIN_REMOTE_FONT_LOAD = "BeginRemoteFontLoad"
}
export declare const Categories: {
    readonly Console: "blink.console";
    readonly UserTiming: "blink.user_timing";
    readonly Loading: "loading";
};
/**
 * The frames implementation in handlers/FramesHandler is considered "legacy"
 * in that it is based on the old TimelineModel implementation rather than
 * following the pattern of the other handlers. This will change in time as we
 * migrate the frames track to use AnimationFrame events, but for now we
 * maintain it because the effort required to migrate was large.
 * Consequently, the types we use through the codebase to refer to these frames
 * usually use ModelHandlers.FramesHandler.TimelineFrame, but in
 * trace/types/*.ts we cannot refer to types defined in the Handlers. To avoid a
 * circular dependency, we define these interfaces here which are implemented by
 * the classes in FramesHandler.ts, but they can also be used to refer to
 * instances of frames in trace/types/*.ts which is unable to import from
 * handlers.
 */
export interface LegacyTimelineFrame extends Event {
    startTime: MicroSeconds;
    startTimeOffset: MicroSeconds;
    endTime: MicroSeconds;
    duration: MicroSeconds;
    idle: boolean;
    dropped: boolean;
    isPartial: boolean;
    layerTree: LegacyFrameLayerTreeData | null;
    paints: LegacyLayerPaintEvent[];
    mainFrameId?: number;
    readonly seqId: number;
    index: number;
}
export declare function isLegacyTimelineFrame(data: Event): data is LegacyTimelineFrame;
export interface LegacyFrameLayerTreeData {
    entry: LayerTreeHostImplSnapshot;
    paints: LegacyLayerPaintEvent[];
}
export interface LegacyLayerPaintEvent {
    layerId(): number;
    event(): Paint;
    picture(): LegacyLayerPaintEventPicture | null;
}
export interface LegacyLayerPaintEventPicture {
    rect: Array<number>;
    serializedPicture: string;
}
export {};
