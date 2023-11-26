import type * as Protocol from '../../../generated/protocol.js';
import { type MicroSeconds, type MilliSeconds, type Seconds } from './Timing.js';
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
export declare function isNestableAsyncPhase(phase: Phase): boolean;
export declare function isAsyncPhase(phase: Phase): boolean;
export declare function isFlowPhase(phase: Phase): boolean;
export declare const enum TraceEventScope {
    THREAD = "t",
    PROCESS = "p",
    GLOBAL = "g"
}
export interface TraceEventData {
    args?: TraceEventArgs;
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
export interface TraceEventArgs {
    data?: TraceEventArgsData;
}
export interface TraceEventArgsData {
    stackTrace?: TraceEventCallFrame[];
    navigationId?: string;
    frame?: string;
}
export interface TraceEventCallFrame {
    codeType?: string;
    functionName: string;
    scriptId: number;
    columnNumber: number;
    lineNumber: number;
    url: string;
}
export interface TraceFrame {
    frame: string;
    name: string;
    processId: ProcessID;
    url: string;
    parent?: string;
}
export interface TraceEventSample extends TraceEventData {
    ph: Phase.SAMPLE;
}
/**
 * A fake trace event created to support CDP.Profiler.Profiles in the
 * trace engine.
 */
export interface SyntheticTraceEventCpuProfile extends TraceEventInstant {
    name: 'CpuProfile';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            cpuProfile: Protocol.Profiler.Profile;
        };
    };
}
export interface TraceEventProfile extends TraceEventSample {
    name: 'Profile';
    id: ProfileID;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            startTime: MicroSeconds;
        };
    };
}
export interface TraceEventProfileChunk extends TraceEventSample {
    name: 'ProfileChunk';
    id: ProfileID;
    args: TraceEventArgs & {
        data?: TraceEventArgsData & {
            cpuProfile?: TraceEventPartialProfile;
            timeDeltas?: MicroSeconds[];
            lines?: MicroSeconds[];
        };
    };
}
export interface TraceEventPartialProfile {
    nodes?: TraceEventPartialNode[];
    samples: CallFrameID[];
}
export interface TraceEventPartialNode {
    callFrame: TraceEventCallFrame;
    id: CallFrameID;
    parent?: CallFrameID;
}
export interface TraceEventComplete extends TraceEventData {
    ph: Phase.COMPLETE;
    dur: MicroSeconds;
}
export interface TraceEventFireIdleCallback extends TraceEventComplete {
    name: KnownEventName.FireIdleCallback;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            allottedMilliseconds: MilliSeconds;
            frame: string;
            id: number;
            timedOut: boolean;
        };
    };
}
export interface TraceEventDispatch extends TraceEventComplete {
    name: 'EventDispatch';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            type: string;
        };
    };
}
export interface TraceEventParseHTML extends TraceEventComplete {
    name: 'ParseHTML';
    args: TraceEventArgs & {
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
export interface TraceEventBegin extends TraceEventData {
    ph: Phase.BEGIN;
}
export interface TraceEventEnd extends TraceEventData {
    ph: Phase.END;
}
/**
 * This denotes a complete event created from a pair of begin and end
 * events. For practicality, instead of always having to look for the
 * end event corresponding to a begin event, we create a synthetic
 * complete event that comprises the data of both from the beginning in
 * the RendererHandler.
 */
export type TraceEventSyntheticCompleteEvent = TraceEventComplete;
export interface TraceEventEventTiming extends TraceEventData {
    ph: Phase.ASYNC_NESTABLE_START | Phase.ASYNC_NESTABLE_END;
    name: KnownEventName.EventTiming;
    id: string;
    args: TraceEventArgs & {
        frame: string;
        data?: TraceEventArgsData & {
            cancelable: boolean;
            duration: MilliSeconds;
            processingEnd: MilliSeconds;
            processingStart: MilliSeconds;
            timeStamp: MilliSeconds;
            interactionId?: number;
            type: string;
        };
    };
}
export interface TraceEventEventTimingBegin extends TraceEventEventTiming {
    ph: Phase.ASYNC_NESTABLE_START;
}
export interface TraceEventEventTimingEnd extends TraceEventEventTiming {
    ph: Phase.ASYNC_NESTABLE_END;
}
export interface TraceEventGPUTask extends TraceEventComplete {
    name: 'GPUTask';
    args: TraceEventArgs & {
        data?: TraceEventArgsData & {
            renderer_pid: ProcessID;
            used_bytes: number;
        };
    };
}
export interface TraceEventSyntheticNetworkRedirect {
    url: string;
    priority: string;
    requestMethod?: string;
    ts: MicroSeconds;
    dur: MicroSeconds;
}
interface TraceEventSyntheticArgsData {
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
    waiting: MicroSeconds;
}
export interface TraceEventSyntheticNetworkRequest extends TraceEventComplete {
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            syntheticData: TraceEventSyntheticArgsData;
            decodedBodyLength: number;
            encodedDataLength: number;
            frame: string;
            fromServiceWorker: boolean;
            host: string;
            mimeType: string;
            pathname: string;
            search: string;
            priority: Priority;
            initialPriority: Priority;
            protocol: string;
            redirects: TraceEventSyntheticNetworkRedirect[];
            renderBlocking: RenderBlocking;
            requestId: string;
            requestingFrameUrl: string;
            statusCode: number;
            url: string;
            requestMethod?: string;
            timing?: TraceEventResourceReceiveResponseTimingData;
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
export declare const enum AuctionWorkletType {
    BIDDER = "bidder",
    SELLER = "seller",
    UNKNOWN = "unknown"
}
export interface SyntheticAuctionWorkletEvent extends TraceEventInstant {
    name: 'SyntheticAuctionWorkletEvent';
    pid: ProcessID;
    host: string;
    target: string;
    type: AuctionWorkletType;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            utilityThread: TraceEventThreadName;
            v8HelperThread: TraceEventThreadName;
        } & ({
            runningInProcessEvent: TraceEventAuctionWorkletRunningInProcess;
            doneWithProcessEvent: TraceEventAuctionWorkletDoneWithProcess;
        } | {
            runningInProcessEvent?: TraceEventAuctionWorkletRunningInProcess;
            doneWithProcessEvent: TraceEventAuctionWorkletDoneWithProcess;
        } | {
            doneWithProcessEvent?: TraceEventAuctionWorkletDoneWithProcess;
            runningInProcessEvent: TraceEventAuctionWorkletRunningInProcess;
        });
    };
}
export interface TraceEventAuctionWorkletRunningInProcess extends TraceEventData {
    name: 'AuctionWorkletRunningInProcess';
    ph: Phase.INSTANT;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            host: string;
            pid: ProcessID;
            target: string;
            type: AuctionWorkletType;
        };
    };
}
export interface TraceEventAuctionWorkletDoneWithProcess extends TraceEventData {
    name: 'AuctionWorkletDoneWithProcess';
    ph: Phase.INSTANT;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            host: string;
            pid: ProcessID;
            target: string;
            type: AuctionWorkletType;
        };
    };
}
export declare function isTraceEventAuctionWorkletRunningInProcess(event: TraceEventData): event is TraceEventAuctionWorkletRunningInProcess;
export declare function isTraceEventAuctionWorkletDoneWithProcess(event: TraceEventData): event is TraceEventAuctionWorkletDoneWithProcess;
export interface TraceEventSnapshot extends TraceEventData {
    args: TraceEventArgs & {
        snapshot: string;
    };
    name: 'Screenshot';
    cat: 'disabled-by-default-devtools.screenshot';
    ph: Phase.OBJECT_SNAPSHOT | Phase.INSTANT;
}
export interface TraceEventAnimation extends TraceEventData {
    args: TraceEventArgs & {
        id?: string;
        name?: string;
        nodeId?: number;
        nodeName?: string;
        state?: string;
        compositeFailed?: number;
        unsupportedProperties?: string[];
    };
    name: 'Animation';
    id2?: {
        local?: string;
    };
    ph: Phase.ASYNC_NESTABLE_START | Phase.ASYNC_NESTABLE_END;
}
export interface TraceEventMetadata extends TraceEventData {
    ph: Phase.METADATA;
    args: TraceEventArgs & {
        name?: string;
        uptime?: string;
    };
}
export interface TraceEventThreadName extends TraceEventMetadata {
    name: 'thread_name';
    args: TraceEventArgs & {
        name?: string;
    };
}
export interface TraceEventProcessName extends TraceEventMetadata {
    name: 'process_name';
}
export interface TraceEventMark extends TraceEventData {
    ph: Phase.MARK;
}
export interface TraceEventNavigationStart extends TraceEventMark {
    name: 'navigationStart';
    args: TraceEventArgs & {
        data?: TraceEventArgsData & {
            documentLoaderURL: string;
            isLoadingMainFrame: boolean;
            isOutermostMainFrame?: boolean;
            navigationId: string;
        };
        frame: string;
    };
}
export interface TraceEventFirstContentfulPaint extends TraceEventMark {
    name: 'firstContentfulPaint';
    args: TraceEventArgs & {
        frame: string;
        data?: TraceEventArgsData & {
            navigationId: string;
        };
    };
}
export interface TraceEventFirstPaint extends TraceEventMark {
    name: 'firstPaint';
    args: TraceEventArgs & {
        frame: string;
        data?: TraceEventArgsData & {
            navigationId: string;
        };
    };
}
export type PageLoadEvent = TraceEventFirstContentfulPaint | TraceEventMarkDOMContent | TraceEventInteractiveTime | TraceEventLargestContentfulPaintCandidate | TraceEventLayoutShift | TraceEventFirstPaint | TraceEventMarkLoad | TraceEventNavigationStart;
export interface TraceEventLargestContentfulPaintCandidate extends TraceEventMark {
    name: 'largestContentfulPaint::Candidate';
    args: TraceEventArgs & {
        frame: string;
        data?: TraceEventArgsData & {
            candidateIndex: number;
            isOutermostMainFrame: boolean;
            isMainFrame: boolean;
            navigationId: string;
            nodeId: Protocol.DOM.BackendNodeId;
            type?: string;
        };
    };
}
export interface TraceEventLargestImagePaintCandidate extends TraceEventMark {
    name: 'LargestImagePaint::Candidate';
    args: TraceEventArgs & {
        frame: string;
        data?: TraceEventArgsData & {
            candidateIndex: number;
            imageUrl: string;
            DOMNodeId: Protocol.DOM.BackendNodeId;
        };
    };
}
export interface TraceEventLargestTextPaintCandidate extends TraceEventMark {
    name: 'LargestTextPaint::Candidate';
    args: TraceEventArgs & {
        frame: string;
        data?: TraceEventArgsData & {
            candidateIndex: number;
            DOMNodeId: Protocol.DOM.BackendNodeId;
        };
    };
}
export interface TraceEventInteractiveTime extends TraceEventMark {
    name: 'InteractiveTime';
    args: TraceEventArgs & {
        args: {
            total_blocking_time_ms: number;
        };
        frame: string;
    };
}
export interface TraceEventInstant extends TraceEventData {
    ph: Phase.INSTANT;
    s: TraceEventScope;
}
export interface TraceEventUpdateCounters extends TraceEventInstant {
    name: 'UpdateCounters';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            documents: number;
            jsEventListeners: number;
            jsHeapSizeUsed: number;
            nodes: number;
        };
    };
}
export type TraceEventRendererEvent = TraceEventInstant | TraceEventComplete;
export interface TraceEventTracingStartedInBrowser extends TraceEventInstant {
    name: 'TracingStartedInBrowser';
    args: TraceEventArgs & {
        data?: TraceEventArgsData & {
            frameTreeNodeId: number;
            frames?: TraceFrame[];
            persistentIds: boolean;
        };
    };
}
export interface TraceEventTracingSessionIdForWorker extends TraceEventInstant {
    name: 'TracingSessionIdForWorker';
    args: TraceEventArgs & {
        data?: TraceEventArgsData & {
            url: string;
            workerId: WorkerId;
            workerThreadId: ThreadID;
            frame: string;
        };
    };
}
export declare function isTraceEventTracingSessionIdForWorker(event: TraceEventData): event is TraceEventTracingSessionIdForWorker;
export interface TraceEventFrameCommittedInBrowser extends TraceEventInstant {
    name: 'FrameCommittedInBrowser';
    args: TraceEventArgs & {
        data?: TraceEventArgsData & TraceFrame;
    };
}
export interface TraceEventMainFrameViewport extends TraceEventInstant {
    name: 'PaintTimingVisualizer::Viewport';
    args: {
        data: TraceEventArgsData & {
            viewport_rect: number[];
        };
    };
}
export interface TraceEventCommitLoad extends TraceEventInstant {
    name: 'CommitLoad';
    args: TraceEventArgs & {
        data?: TraceEventArgsData & {
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
export interface TraceEventMarkDOMContent extends TraceEventInstant {
    name: 'MarkDOMContent';
    args: TraceEventArgs & {
        data?: TraceEventArgsData & {
            frame: string;
            isMainFrame: boolean;
            page: string;
        };
    };
}
export interface TraceEventMarkLoad extends TraceEventInstant {
    name: 'MarkLoad';
    args: TraceEventArgs & {
        data?: TraceEventArgsData & {
            frame: string;
            isMainFrame: boolean;
            page: string;
        };
    };
}
export interface TraceEventAsync extends TraceEventData {
    ph: Phase.ASYNC_NESTABLE_START | Phase.ASYNC_NESTABLE_INSTANT | Phase.ASYNC_NESTABLE_END | Phase.ASYNC_STEP_INTO | Phase.ASYNC_BEGIN | Phase.ASYNC_END | Phase.ASYNC_STEP_PAST;
}
export type TraceRect = [number, number, number, number];
export type TraceImpactedNode = {
    new_rect: TraceRect;
    node_id: Protocol.DOM.BackendNodeId;
    old_rect: TraceRect;
};
type LayoutShiftData = TraceEventArgsData & {
    cumulative_score: number;
    frame_max_distance: number;
    had_recent_input: boolean;
    impacted_nodes: TraceImpactedNode[] | undefined;
    is_main_frame: boolean;
    overall_max_distance: number;
    region_rects: TraceRect[];
    score: number;
    weighted_score_delta: number;
};
export interface TraceEventLayoutShift extends TraceEventInstant {
    name: 'LayoutShift';
    normalized?: boolean;
    args: TraceEventArgs & {
        frame: string;
        data?: LayoutShiftData;
    };
}
interface LayoutShiftSessionWindowData {
    cumulativeWindowScore: number;
    id: number;
}
export interface LayoutShiftParsedData {
    screenshotSource?: string;
    timeFromNavigation?: MicroSeconds;
    cumulativeWeightedScoreInWindow: number;
    sessionWindowData: LayoutShiftSessionWindowData;
}
export interface SyntheticLayoutShift extends TraceEventLayoutShift {
    args: TraceEventArgs & {
        frame: string;
        data?: LayoutShiftData & {
            rawEvent: TraceEventLayoutShift;
        };
    };
    parsedData: LayoutShiftParsedData;
}
export type Priority = 'Low' | 'High' | 'Medium' | 'VeryHigh' | 'Highest';
export type RenderBlocking = 'blocking' | 'non_blocking' | 'in_body_parser_blocking' | 'potentially_blocking';
export interface TraceEventResourceSendRequest extends TraceEventInstant {
    name: 'ResourceSendRequest';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            frame: string;
            requestId: string;
            url: string;
            priority: Priority;
            requestMethod?: string;
            renderBlocking?: RenderBlocking;
        };
    };
}
export interface TraceEventResourceChangePriority extends TraceEventInstant {
    name: 'ResourceChangePriority';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            requestId: string;
            priority: Priority;
        };
    };
}
export interface TraceEventResourceWillSendRequest extends TraceEventInstant {
    name: 'ResourceWillSendRequest';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            requestId: string;
        };
    };
}
export interface TraceEventResourceFinish extends TraceEventInstant {
    name: 'ResourceFinish';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            decodedBodyLength: number;
            didFail: boolean;
            encodedDataLength: number;
            finishTime: Seconds;
            requestId: string;
        };
    };
}
export interface TraceEventResourceReceivedData extends TraceEventInstant {
    name: 'ResourceReceivedData';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            encodedDataLength: number;
            frame: string;
            requestId: string;
        };
    };
}
interface TraceEventResourceReceiveResponseTimingData {
    connectEnd: MilliSeconds;
    connectStart: MilliSeconds;
    dnsEnd: MilliSeconds;
    dnsStart: MilliSeconds;
    proxyEnd: MilliSeconds;
    proxyStart: MilliSeconds;
    pushEnd: MilliSeconds;
    pushStart: MilliSeconds;
    receiveHeadersEnd: MilliSeconds;
    requestTime: Seconds;
    sendEnd: MilliSeconds;
    sendStart: MilliSeconds;
    sslEnd: MilliSeconds;
    sslStart: MilliSeconds;
    workerReady: MilliSeconds;
    workerStart: MilliSeconds;
}
export interface TraceEventResourceReceiveResponse extends TraceEventInstant {
    name: 'ResourceReceiveResponse';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            encodedDataLength: number;
            frame: string;
            fromCache: boolean;
            fromServiceWorker: boolean;
            mimeType: string;
            requestId: string;
            responseTime: MilliSeconds;
            statusCode: number;
            timing: TraceEventResourceReceiveResponseTimingData;
        };
    };
}
export interface TraceEventResourceMarkAsCached extends TraceEventInstant {
    name: 'ResourceMarkAsCached';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
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
export interface TraceEventLayoutInvalidation extends TraceEventInstant {
    name: 'LayoutInvalidationTracking' | 'ScheduleStyleInvalidationTracking';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            frame: string;
            nodeId: Protocol.DOM.BackendNodeId;
            reason: LayoutInvalidationReason;
            nodeName?: string;
        };
    };
}
export declare const enum StyleRecalcInvalidationReason {
    ANIMATION = "Animation"
}
export interface TraceEventStyleRecalcInvalidation extends TraceEventInstant {
    name: 'StyleRecalcInvalidationTracking';
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            frame: string;
            nodeId: Protocol.DOM.BackendNodeId;
            reason: StyleRecalcInvalidationReason;
            subtree: boolean;
            nodeName?: string;
            extraData?: string;
        };
    };
}
export interface TraceEventScheduleStyleRecalculation extends TraceEventInstant {
    name: KnownEventName.ScheduleStyleRecalculation;
    args: TraceEventArgs & {
        data: {
            frame: string;
        };
    };
}
export declare function isTraceEventScheduleStyleRecalculation(event: TraceEventData): event is TraceEventScheduleStyleRecalculation;
export interface TraceEventPrePaint extends TraceEventComplete {
    name: 'PrePaint';
}
export type TraceEventNestableAsync = TraceEventNestableAsyncBegin | TraceEventNestableAsyncEnd;
export interface TraceEventNestableAsyncBegin extends TraceEventData {
    ph: Phase.ASYNC_NESTABLE_START;
    id2?: {
        local?: string;
        global?: string;
    };
    id?: string;
}
export interface TraceEventNestableAsyncEnd extends TraceEventData {
    ph: Phase.ASYNC_NESTABLE_END;
    id2?: {
        local?: string;
        global?: string;
    };
    id?: string;
}
export type TraceEventAsyncPerformanceMeasure = TraceEventPerformanceMeasureBegin | TraceEventPerformanceMeasureEnd;
export interface TraceEventPerformanceMeasureBegin extends TraceEventNestableAsyncBegin {
    cat: 'blink.user_timing';
    id: string;
}
export interface TraceEventPerformanceMeasureEnd extends TraceEventNestableAsyncEnd {
    cat: 'blink.user_timing';
    id: string;
}
export interface TraceEventConsoleTimeBegin extends TraceEventNestableAsyncBegin {
    cat: 'blink.console';
    id2: {
        local: string;
    };
}
export interface TraceEventConsoleTimeEnd extends TraceEventNestableAsyncEnd {
    cat: 'blink.console';
    id2: {
        local: string;
    };
}
export interface TraceEventTimeStamp extends TraceEventData {
    cat: 'devtools.timeline';
    name: 'TimeStamp';
    ph: Phase.INSTANT;
    id: string;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            frame: string;
            message: string;
        };
    };
}
export interface TraceEventPerformanceMark extends TraceEventData {
    cat: 'blink.user_timing';
    ph: Phase.INSTANT | Phase.MARK;
    id: string;
}
export interface TraceEventSyntheticNestableAsyncEvent extends TraceEventData {
    id?: string;
    id2?: {
        local?: string;
        global?: string;
    };
    dur: MicroSeconds;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            beginEvent: TraceEventNestableAsyncBegin;
            endEvent: TraceEventNestableAsyncEnd;
        };
    };
}
export interface TraceEventSyntheticUserTiming extends TraceEventSyntheticNestableAsyncEvent {
    id: string;
    dur: MicroSeconds;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            beginEvent: TraceEventPerformanceMeasureBegin;
            endEvent: TraceEventPerformanceMeasureEnd;
        };
    };
}
export interface TraceEventSyntheticConsoleTiming extends TraceEventSyntheticNestableAsyncEvent {
    id2: {
        local: string;
    };
    dur: MicroSeconds;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            beginEvent: TraceEventConsoleTimeBegin;
            endEvent: TraceEventConsoleTimeEnd;
        };
    };
}
export interface SyntheticInteractionEvent extends TraceEventSyntheticNestableAsyncEvent {
    interactionId: number;
    type: string;
    ts: MicroSeconds;
    dur: MicroSeconds;
    processingStart: MicroSeconds;
    processingEnd: MicroSeconds;
    inputDelay: MicroSeconds;
    mainThreadHandling: MicroSeconds;
    presentationDelay: MicroSeconds;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            beginEvent: TraceEventEventTimingBegin;
            endEvent: TraceEventEventTimingEnd;
        };
    };
}
/**
 * An event created synthetically in the frontend that has a self time
 * (the time spent running the task itself).
 */
export interface SyntheticEventWithSelfTime extends TraceEventData {
    selfTime?: MicroSeconds;
}
/**
 * A profile call created in the frontend from samples disguised as a
 * trace event.
 */
export interface TraceEventSyntheticProfileCall extends SyntheticEventWithSelfTime {
    callFrame: Protocol.Runtime.CallFrame;
    nodeId: Protocol.integer;
}
/**
 * A trace event augmented synthetically in the frontend to contain
 * its self time.
 */
export type SyntheticRendererEvent = TraceEventRendererEvent & SyntheticEventWithSelfTime;
export type TraceEntry = SyntheticRendererEvent | TraceEventSyntheticProfileCall;
export declare function isSyntheticInteractionEvent(event: TraceEventData): event is SyntheticInteractionEvent;
export declare function isRendererEvent(event: TraceEventData): event is TraceEntry;
export interface TraceEventDrawFrame extends TraceEventInstant {
    name: KnownEventName.DrawFrame;
    args: TraceEventArgs & {
        layerTreeId: number;
        frameSeqId: number;
    };
}
export declare function isTraceEventDrawFrame(event: TraceEventData): event is TraceEventDrawFrame;
export interface TraceEventLegacyDrawFrameBegin extends TraceEventAsync {
    name: KnownEventName.DrawFrame;
    ph: Phase.ASYNC_NESTABLE_START;
    args: TraceEventArgs & {
        layerTreeId: number;
        frameSeqId: number;
    };
}
export declare function isLegacyTraceEventDrawFrameBegin(event: TraceEventData): event is TraceEventLegacyDrawFrameBegin;
export interface TraceEventBeginFrame extends TraceEventInstant {
    name: KnownEventName.BeginFrame;
    args: TraceEventArgs & {
        layerTreeId: number;
        frameSeqId: number;
    };
}
export declare function isTraceEventBeginFrame(event: TraceEventData): event is TraceEventBeginFrame;
export interface TraceEventDroppedFrame extends TraceEventInstant {
    name: KnownEventName.DroppedFrame;
    args: TraceEventArgs & {
        layerTreeId: number;
        frameSeqId: number;
        hasPartialUpdate?: boolean;
    };
}
export declare function isTraceEventDroppedFrame(event: TraceEventData): event is TraceEventDroppedFrame;
export interface TraceEventRequestMainThreadFrame extends TraceEventInstant {
    name: KnownEventName.RequestMainThreadFrame;
    args: TraceEventArgs & {
        layerTreeId: number;
    };
}
export declare function isTraceEventRequestMainThreadFrame(event: TraceEventData): event is TraceEventRequestMainThreadFrame;
export interface TraceEventBeginMainThreadFrame extends TraceEventInstant {
    name: KnownEventName.BeginMainThreadFrame;
    args: TraceEventArgs & {
        layerTreeId: number;
        data: TraceEventArgsData & {
            frameId?: number;
        };
    };
}
export declare function isTraceEventBeginMainThreadFrame(event: TraceEventData): event is TraceEventBeginMainThreadFrame;
export interface TraceEventNeedsBeginFrameChanged extends TraceEventInstant {
    name: KnownEventName.NeedsBeginFrameChanged;
    args: TraceEventArgs & {
        layerTreeId: number;
        data: TraceEventArgsData & {
            needsBeginFrame: number;
        };
    };
}
export declare function isTraceEventNeedsBeginFrameChanged(event: TraceEventData): event is TraceEventNeedsBeginFrameChanged;
export interface TraceEventCommit extends TraceEventInstant {
    name: KnownEventName.Commit;
    args: TraceEventArgs & {
        layerTreeId: number;
        frameSeqId: number;
    };
}
export declare function isTraceEventCommit(event: TraceEventData): event is TraceEventCommit;
export interface TraceEventRasterTask extends TraceEventComplete {
    name: KnownEventName.RasterTask;
    args: TraceEventArgs & {
        tileData: {
            layerId: number;
            sourceFrameNumber: number;
            tileId: {
                id_ref: string;
            };
            tileResolution: string;
        };
    };
}
export declare function isTraceEventRasterTask(event: TraceEventData): event is TraceEventRasterTask;
export interface TraceEventCompositeLayers extends TraceEventInstant {
    name: KnownEventName.CompositeLayers;
    args: TraceEventArgs & {
        layerTreeId: number;
    };
}
export declare function isTraceEventCompositeLayers(event: TraceEventData): event is TraceEventCompositeLayers;
export interface TraceEventActivateLayerTree extends TraceEventInstant {
    name: KnownEventName.ActivateLayerTree;
    args: TraceEventArgs & {
        layerTreeId: number;
        frameId: number;
    };
}
export declare function isTraceEventActivateLayerTree(event: TraceEventData): event is TraceEventActivateLayerTree;
export interface TraceEventUpdateLayoutTree extends TraceEventComplete {
    name: KnownEventName.UpdateLayoutTree;
    args: TraceEventArgs & {
        elementCount: number;
        beginData?: {
            frame: string;
        };
    };
}
export declare function isTraceEventUpdateLayoutTree(event: TraceEventData): event is TraceEventUpdateLayoutTree;
export interface TraceEventLayout extends TraceEventComplete {
    name: KnownEventName.Layout;
    args: TraceEventArgs & {
        beginData: {
            frame: string;
            dirtyObjects: number;
            partialLayout: boolean;
            totalObjects: number;
        };
        endData: {
            layoutRoots: Array<{
                depth: number;
                nodeId: Protocol.DOM.BackendNodeId;
                quads: number[][];
            }>;
        };
    };
}
export declare function isTraceEventLayout(event: TraceEventData): event is TraceEventLayout;
export interface TraceEventInvalidateLayout extends TraceEventInstant {
    name: KnownEventName.InvalidateLayout;
    args: TraceEventArgs & {
        data: {
            frame: string;
            nodeId: Protocol.DOM.BackendNodeId;
        };
    };
}
export declare function isTraceEventInvalidateLayout(event: TraceEventData): event is TraceEventInvalidateLayout;
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
export declare function isTraceEventComplete(event: TraceEventData): event is TraceEventComplete;
export declare function isTraceEventBegin(event: TraceEventData): event is TraceEventBegin;
export declare function isTraceEventEnd(event: TraceEventData): event is TraceEventEnd;
export declare function isTraceEventDispatch(event: TraceEventData): event is TraceEventDispatch;
export declare function isTraceEventInstant(event: TraceEventData): event is TraceEventInstant;
export declare function isTraceEventRendererEvent(event: TraceEventData): event is TraceEventRendererEvent;
export declare function isTraceEventFireIdleCallback(event: TraceEventData): event is TraceEventFireIdleCallback;
export declare function isTraceEventUpdateCounters(event: TraceEventData): event is TraceEventUpdateCounters;
export declare function isThreadName(traceEventData: TraceEventData): traceEventData is TraceEventThreadName;
export declare function isProcessName(traceEventData: TraceEventData): traceEventData is TraceEventProcessName;
export declare function isTraceEventTracingStartedInBrowser(traceEventData: TraceEventData): traceEventData is TraceEventTracingStartedInBrowser;
export declare function isTraceEventFrameCommittedInBrowser(traceEventData: TraceEventData): traceEventData is TraceEventFrameCommittedInBrowser;
export declare function isTraceEventCommitLoad(traceEventData: TraceEventData): traceEventData is TraceEventCommitLoad;
export declare function isTraceEventNavigationStart(traceEventData: TraceEventData): traceEventData is TraceEventNavigationStart;
export declare function isTraceEventAnimation(traceEventData: TraceEventData): traceEventData is TraceEventAnimation;
export declare function isTraceEventLayoutShift(traceEventData: TraceEventData): traceEventData is TraceEventLayoutShift;
export declare function isTraceEventLayoutInvalidation(traceEventData: TraceEventData): traceEventData is TraceEventLayoutInvalidation;
export declare function isTraceEventStyleRecalcInvalidation(traceEventData: TraceEventData): traceEventData is TraceEventStyleRecalcInvalidation;
export declare function isTraceEventFirstContentfulPaint(traceEventData: TraceEventData): traceEventData is TraceEventFirstContentfulPaint;
export declare function isTraceEventLargestContentfulPaintCandidate(traceEventData: TraceEventData): traceEventData is TraceEventLargestContentfulPaintCandidate;
export declare function isTraceEventLargestImagePaintCandidate(traceEventData: TraceEventData): traceEventData is TraceEventLargestImagePaintCandidate;
export declare function isTraceEventLargestTextPaintCandidate(traceEventData: TraceEventData): traceEventData is TraceEventLargestTextPaintCandidate;
export declare function isTraceEventMarkLoad(traceEventData: TraceEventData): traceEventData is TraceEventMarkLoad;
export declare function isTraceEventFirstPaint(traceEventData: TraceEventData): traceEventData is TraceEventFirstPaint;
export declare function isTraceEventMarkDOMContent(traceEventData: TraceEventData): traceEventData is TraceEventMarkDOMContent;
export declare function isTraceEventInteractiveTime(traceEventData: TraceEventData): traceEventData is TraceEventInteractiveTime;
export declare function isTraceEventEventTiming(traceEventData: TraceEventData): traceEventData is TraceEventEventTiming;
export declare function isTraceEventEventTimingEnd(traceEventData: TraceEventData): traceEventData is TraceEventEventTimingEnd;
export declare function isTraceEventEventTimingStart(traceEventData: TraceEventData): traceEventData is TraceEventEventTimingBegin;
export declare function isTraceEventGPUTask(traceEventData: TraceEventData): traceEventData is TraceEventGPUTask;
export declare function isTraceEventProfile(traceEventData: TraceEventData): traceEventData is TraceEventProfile;
export declare function isSyntheticTraceEventCpuProfile(traceEventData: TraceEventData): traceEventData is SyntheticTraceEventCpuProfile;
export declare function isTraceEventProfileChunk(traceEventData: TraceEventData): traceEventData is TraceEventProfileChunk;
export declare function isTraceEventResourceChangePriority(traceEventData: TraceEventData): traceEventData is TraceEventResourceChangePriority;
export declare function isTraceEventResourceSendRequest(traceEventData: TraceEventData): traceEventData is TraceEventResourceSendRequest;
export declare function isTraceEventResourceReceiveResponse(traceEventData: TraceEventData): traceEventData is TraceEventResourceReceiveResponse;
export declare function isTraceEventResourceMarkAsCached(traceEventData: TraceEventData): traceEventData is TraceEventResourceMarkAsCached;
export declare function isTraceEventResourceFinish(traceEventData: TraceEventData): traceEventData is TraceEventResourceFinish;
export declare function isTraceEventResourceWillSendRequest(traceEventData: TraceEventData): traceEventData is TraceEventResourceWillSendRequest;
export declare function isTraceEventResourceReceivedData(traceEventData: TraceEventData): traceEventData is TraceEventResourceReceivedData;
export declare function isSyntheticNetworkRequestDetailsEvent(traceEventData: TraceEventData): traceEventData is TraceEventSyntheticNetworkRequest;
export declare function isTraceEventPrePaint(traceEventData: TraceEventData): traceEventData is TraceEventPrePaint;
export declare function isTraceEventNavigationStartWithURL(event: TraceEventData): event is TraceEventNavigationStart;
export declare function isTraceEventMainFrameViewport(traceEventData: TraceEventData): traceEventData is TraceEventMainFrameViewport;
export declare function isSyntheticUserTimingTraceEvent(traceEventData: TraceEventData): traceEventData is TraceEventSyntheticUserTiming;
export declare function isSyntheticConsoleTimingTraceEvent(traceEventData: TraceEventData): traceEventData is TraceEventSyntheticConsoleTiming;
export declare function isTraceEventPerformanceMeasure(traceEventData: TraceEventData): traceEventData is TraceEventPerformanceMeasureBegin | TraceEventPerformanceMeasureEnd;
export declare function isTraceEventPerformanceMark(traceEventData: TraceEventData): traceEventData is TraceEventPerformanceMark;
export declare function isTraceEventConsoleTime(traceEventData: TraceEventData): traceEventData is TraceEventConsoleTimeBegin | TraceEventConsoleTimeEnd;
export declare function isTraceEventTimeStamp(traceEventData: TraceEventData): traceEventData is TraceEventTimeStamp;
export declare function isTraceEventParseHTML(traceEventData: TraceEventData): traceEventData is TraceEventParseHTML;
export interface TraceEventAsync extends TraceEventData {
    ph: Phase.ASYNC_NESTABLE_START | Phase.ASYNC_NESTABLE_INSTANT | Phase.ASYNC_NESTABLE_END | Phase.ASYNC_STEP_INTO | Phase.ASYNC_BEGIN | Phase.ASYNC_END | Phase.ASYNC_STEP_PAST;
}
export declare function isTraceEventAsyncPhase(traceEventData: TraceEventData): boolean;
export declare function isSyntheticLayoutShift(traceEventData: TraceEventData): traceEventData is SyntheticLayoutShift;
export declare function isProfileCall(event: TraceEventData): event is TraceEventSyntheticProfileCall;
export interface TraceEventPaint extends TraceEventComplete {
    name: KnownEventName.Paint;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            clip: number[];
            frame: string;
            layerId: number;
            nodeId: number;
        };
    };
}
export declare function isTraceEventPaint(event: TraceEventData): event is TraceEventPaint;
export interface TraceEventSetLayerTreeId extends TraceEventInstant {
    name: KnownEventName.SetLayerTreeId;
    args: TraceEventArgs & {
        data: TraceEventArgsData & {
            frame: string;
            layerTreeId: number;
        };
    };
}
export declare function isTraceEventSetLayerId(event: TraceEventData): event is TraceEventSetLayerTreeId;
export interface TraceEventUpdateLayer extends TraceEventComplete {
    name: KnownEventName.UpdateLayer;
    args: TraceEventArgs & {
        layerId: number;
        layerTreeId: number;
    };
}
export declare function isTraceEventUpdateLayer(event: TraceEventData): event is TraceEventUpdateLayer;
export interface TraceEventDisplayItemListSnapshot extends TraceEventData {
    name: KnownEventName.DisplayItemListSnapshot;
    ph: Phase.OBJECT_SNAPSHOT;
    id2: {
        local?: string;
    };
    args: TraceEventArgs & {
        snapshot: {
            skp64: string;
            params?: {
                layer_rect: [number, number, number, number];
            };
        };
    };
}
export declare function isTraceEventDisplayListItemListSnapshot(event: TraceEventData): event is TraceEventDisplayItemListSnapshot;
export interface TraceEventLayerTreeHostImplSnapshot extends TraceEventData {
    name: KnownEventName.LayerTreeHostImplSnapshot;
    ph: Phase.OBJECT_SNAPSHOT;
    id: string;
    args: TraceEventArgs & {
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
}
export declare function isTraceEventLayerTreeHostImplSnapshot(event: TraceEventData): event is TraceEventLayerTreeHostImplSnapshot;
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
export interface TraceEventFireAnimationFrame extends TraceEventComplete {
    name: KnownEventName.FireAnimationFrame;
    args: TraceEventArgs & {
        data: {
            frame: string;
            id: number;
        };
    };
}
export declare function isTraceEventFireAnimationFrame(event: TraceEventData): event is TraceEventFireAnimationFrame;
export interface TraceEventRequestAnimationFrame extends TraceEventInstant {
    name: KnownEventName.RequestAnimationFrame;
    args: TraceEventArgs & {
        data: {
            frame: string;
            id: number;
            stackTrace?: TraceEventCallFrame;
        };
    };
}
export declare function isTraceEventRequestAnimationFrame(event: TraceEventData): event is TraceEventRequestAnimationFrame;
export interface TraceEventTimerInstall extends TraceEventInstant {
    name: KnownEventName.TimerInstall;
    args: TraceEventArgs & {
        data: {
            frame: string;
            singleShot: boolean;
            stackTrace?: TraceEventCallFrame;
            timeout: number;
            timerId: number;
        };
    };
}
export declare function isTraceEventTimerInstall(event: TraceEventData): event is TraceEventTimerInstall;
export interface TraceEventTimerFire extends TraceEventComplete {
    name: KnownEventName.TimerFire;
    args: TraceEventArgs & {
        data: {
            frame: string;
            timerId: number;
        };
    };
}
export declare function isTraceEventTimerFire(event: TraceEventData): event is TraceEventTimerFire;
export interface TraceEventRequestIdleCallback extends TraceEventInstant {
    name: KnownEventName.RequestIdleCallback;
    args: TraceEventArgs & {
        data: {
            frame: string;
            id: number;
            timeout: number;
            stackTrace?: TraceEventCallFrame;
        };
    };
}
export declare function isTraceEventRequestIdleCallback(event: TraceEventData): event is TraceEventRequestIdleCallback;
export interface TraceEventWebSocketCreate extends TraceEventInstant {
    name: KnownEventName.WebSocketCreate;
    args: TraceEventArgs & {
        data: {
            identifier: number;
            url: string;
            frame?: string;
            websocketProtocol?: string;
            stackTrace?: TraceEventCallFrame;
        };
    };
}
export declare function isTraceEventWebSocketCreate(event: TraceEventData): event is TraceEventWebSocketCreate;
export interface TraceEventWebSocketSendHandshakeRequest extends TraceEventInstant {
    name: KnownEventName.WebSocketSendHandshakeRequest;
    args: TraceEventArgs & {
        data: {
            frame: string;
            identifier: number;
        };
    };
}
export declare function isTraceEventWebSocketSendHandshakeRequest(event: TraceEventData): event is TraceEventWebSocketSendHandshakeRequest;
export interface TraceEventWebSocketReceiveHandshakeResponse extends TraceEventInstant {
    name: KnownEventName.WebSocketReceiveHandshakeResponse;
    args: TraceEventArgs & {
        data: {
            frame: string;
            identifier: number;
        };
    };
}
export declare function isTraceEventWebSocketReceiveHandshakeResponse(event: TraceEventData): event is TraceEventWebSocketReceiveHandshakeResponse;
export interface TraceEventWebSocketDestroy extends TraceEventInstant {
    name: KnownEventName.WebSocketDestroy;
    args: TraceEventArgs & {
        data: {
            frame: string;
            identifier: number;
        };
    };
}
export declare function isTraceEventWebSocketDestroy(event: TraceEventData): event is TraceEventWebSocketDestroy;
export declare function isWebSocketTraceEvent(event: TraceEventData): event is TraceEventWebSocketCreate | TraceEventWebSocketDestroy | TraceEventWebSocketReceiveHandshakeResponse | TraceEventWebSocketSendHandshakeRequest;
/**
 * This is an exhaustive list of events we track in the Performance
 * panel. Note not all of them are necessarliry shown in the flame
 * chart, some of them we only use for parsing.
 * TODO(crbug.com/1428024): Complete this enum.
 */
export declare const enum KnownEventName {
    Program = "Program",
    RunTask = "RunTask",
    AsyncTask = "AsyncTask",
    RunMicrotasks = "RunMicrotasks",
    XHRLoad = "XHRLoad",
    XHRReadyStateChange = "XHRReadyStateChange",
    ParseHTML = "ParseHTML",
    ParseCSS = "ParseAuthorStyleSheet",
    CompileScript = "V8.CompileScript",
    CompileCode = "V8.CompileCode",
    CompileModule = "V8.CompileModule",
    Optimize = "V8.OptimizeCode",
    WasmStreamFromResponseCallback = "v8.wasm.streamFromResponseCallback",
    WasmCompiledModule = "v8.wasm.compiledModule",
    WasmCachedModule = "v8.wasm.cachedModule",
    WasmModuleCacheHit = "v8.wasm.moduleCacheHit",
    WasmModuleCacheInvalid = "v8.wasm.moduleCacheInvalid",
    ProfileCall = "ProfileCall",
    EvaluateScript = "EvaluateScript",
    FunctionCall = "FunctionCall",
    EventDispatch = "EventDispatch",
    EvaluateModule = "v8.evaluateModule",
    RequestMainThreadFrame = "RequestMainThreadFrame",
    RequestAnimationFrame = "RequestAnimationFrame",
    CancelAnimationFrame = "CancelAnimationFrame",
    FireAnimationFrame = "FireAnimationFrame",
    RequestIdleCallback = "RequestIdleCallback",
    CancelIdleCallback = "CancelIdleCallback",
    FireIdleCallback = "FireIdleCallback",
    TimerInstall = "TimerInstall",
    TimerRemove = "TimerRemove",
    TimerFire = "TimerFire",
    WebSocketCreate = "WebSocketCreate",
    WebSocketSendHandshake = "WebSocketSendHandshakeRequest",
    WebSocketReceiveHandshake = "WebSocketReceiveHandshakeResponse",
    WebSocketDestroy = "WebSocketDestroy",
    CryptoDoEncrypt = "DoEncrypt",
    CryptoDoEncryptReply = "DoEncryptReply",
    CryptoDoDecrypt = "DoDecrypt",
    CryptoDoDecryptReply = "DoDecryptReply",
    CryptoDoDigest = "DoDigest",
    CryptoDoDigestReply = "DoDigestReply",
    CryptoDoSign = "DoSign",
    CryptoDoSignReply = "DoSignReply",
    CryptoDoVerify = "DoVerify",
    CryptoDoVerifyReply = "DoVerifyReply",
    V8Execute = "V8.Execute",
    GC = "GCEvent",
    DOMGC = "BlinkGC.AtomicPhase",
    IncrementalGCMarking = "V8.GCIncrementalMarking",
    MajorGC = "MajorGC",
    MinorGC = "MinorGC",
    GCCollectGarbage = "BlinkGC.AtomicPhase",
    ScheduleStyleRecalculation = "ScheduleStyleRecalculation",
    RecalculateStyles = "RecalculateStyles",
    Layout = "Layout",
    UpdateLayoutTree = "UpdateLayoutTree",
    InvalidateLayout = "InvalidateLayout",
    LayoutInvalidationTracking = "LayoutInvalidationTracking",
    ComputeIntersections = "ComputeIntersections",
    HitTest = "HitTest",
    PrePaint = "PrePaint",
    Layerize = "Layerize",
    LayoutShift = "LayoutShift",
    UpdateLayerTree = "UpdateLayerTree",
    ScheduleStyleInvalidationTracking = "ScheduleStyleInvalidationTracking",
    StyleRecalcInvalidationTracking = "StyleRecalcInvalidationTracking",
    StyleInvalidatorInvalidationTracking = "StyleInvalidatorInvalidationTracking",
    ScrollLayer = "ScrollLayer",
    UpdateLayer = "UpdateLayer",
    PaintSetup = "PaintSetup",
    Paint = "Paint",
    PaintImage = "PaintImage",
    Commit = "Commit",
    CompositeLayers = "CompositeLayers",
    RasterTask = "RasterTask",
    ImageDecodeTask = "ImageDecodeTask",
    ImageUploadTask = "ImageUploadTask",
    DecodeImage = "Decode Image",
    ResizeImage = "Resize Image",
    DrawLazyPixelRef = "Draw LazyPixelRef",
    DecodeLazyPixelRef = "Decode LazyPixelRef",
    GPUTask = "GPUTask",
    Rasterize = "Rasterize",
    EventTiming = "EventTiming",
    OptimizeCode = "V8.OptimizeCode",
    CacheScript = "v8.produceCache",
    CacheModule = "v8.produceModuleCache",
    V8Sample = "V8Sample",
    JitCodeAdded = "JitCodeAdded",
    JitCodeMoved = "JitCodeMoved",
    StreamingCompileScript = "v8.parseOnBackground",
    StreamingCompileScriptWaiting = "v8.parseOnBackgroundWaiting",
    StreamingCompileScriptParsing = "v8.parseOnBackgroundParsing",
    BackgroundDeserialize = "v8.deserializeOnBackground",
    FinalizeDeserialization = "V8.FinalizeDeserialization",
    CommitLoad = "CommitLoad",
    MarkLoad = "MarkLoad",
    MarkDOMContent = "MarkDOMContent",
    MarkFirstPaint = "firstPaint",
    MarkFCP = "firstContentfulPaint",
    MarkLCPCandidate = "largestContentfulPaint::Candidate",
    MarkLCPInvalidate = "largestContentfulPaint::Invalidate",
    NavigationStart = "navigationStart",
    TimeStamp = "TimeStamp",
    ConsoleTime = "ConsoleTime",
    UserTiming = "UserTiming",
    InteractiveTime = "InteractiveTime",
    BeginFrame = "BeginFrame",
    NeedsBeginFrameChanged = "NeedsBeginFrameChanged",
    BeginMainThreadFrame = "BeginMainThreadFrame",
    ActivateLayerTree = "ActivateLayerTree",
    DrawFrame = "DrawFrame",
    DroppedFrame = "DroppedFrame",
    FrameStartedLoading = "FrameStartedLoading",
    ResourceWillSendRequest = "ResourceWillSendRequest",
    ResourceSendRequest = "ResourceSendRequest",
    ResourceReceiveResponse = "ResourceReceiveResponse",
    ResourceReceivedData = "ResourceReceivedData",
    ResourceFinish = "ResourceFinish",
    ResourceMarkAsCached = "ResourceMarkAsCached",
    WebSocketSendHandshakeRequest = "WebSocketSendHandshakeRequest",
    WebSocketReceiveHandshakeResponse = "WebSocketReceiveHandshakeResponse",
    Profile = "Profile",
    StartProfiling = "CpuProfiler::StartProfiling",
    ProfileChunk = "ProfileChunk",
    UpdateCounters = "UpdateCounters",
    Animation = "Animation",
    ParseAuthorStyleSheet = "ParseAuthorStyleSheet",
    EmbedderCallback = "EmbedderCallback",
    SetLayerTreeId = "SetLayerTreeId",
    TracingStartedInPage = "TracingStartedInPage",
    TracingSessionIdForWorker = "TracingSessionIdForWorker",
    LazyPixelRef = "LazyPixelRef",
    LayerTreeHostImplSnapshot = "cc::LayerTreeHostImpl",
    PictureSnapshot = "cc::Picture",
    DisplayItemListSnapshot = "cc::DisplayItemList",
    InputLatencyMouseMove = "InputLatency::MouseMove",
    InputLatencyMouseWheel = "InputLatency::MouseWheel",
    ImplSideFling = "InputHandlerProxy::HandleGestureFling::started"
}
export {};
