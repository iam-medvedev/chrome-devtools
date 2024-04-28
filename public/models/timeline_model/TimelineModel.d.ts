import * as Platform from '../../core/platform/platform.js';
import type * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as TraceEngine from '../trace/trace.js';
export declare class TimelineModelImpl {
    private inspectedTargetEventsInternal;
    private sessionId;
    private mainFrameNodeId;
    private pageFrames;
    private workerIdByThread;
    private requestsFromBrowser;
    private mainFrame;
    private minimumRecordTimeInternal;
    private lastScheduleStyleRecalculation;
    private paintImageEventByPixelRefId;
    private lastPaintForLayer;
    private currentScriptEvent;
    private eventStack;
    private browserFrameTracking;
    private persistentIds;
    private legacyCurrentPage;
    private currentTaskLayoutAndRecalcEvents;
    private tracingModelInternal;
    private lastRecalculateStylesEvent;
    constructor();
    /**
     * Iterates events in a tree hierarchically, from top to bottom,
     * calling back on every event's start and end in the order
     * dictated by the corresponding timestamp.
     *
     * Events are assumed to be in ascendent order by timestamp.
     *
     * For example, given this tree, the following callbacks
     * are expected to be made in the following order
     * |---------------A---------------|
     *  |------B------||-------D------|
     *    |---C---|
     *
     * 1. Start A
     * 3. Start B
     * 4. Start C
     * 5. End C
     * 6. End B
     * 7. Start D
     * 8. End D
     * 9. End A
     *
     * By default, async events are filtered. This behaviour can be
     * overriden making use of the filterAsyncEvents parameter.
     */
    static forEachEvent(events: TraceEngine.Legacy.CompatibleTraceEvent[], onStartEvent: (arg0: TraceEngine.Legacy.CompatibleTraceEvent) => void, onEndEvent: (arg0: TraceEngine.Legacy.CompatibleTraceEvent) => void, onInstantEvent?: ((arg0: TraceEngine.Legacy.CompatibleTraceEvent, arg1: TraceEngine.Legacy.CompatibleTraceEvent | null) => void), startTime?: number, endTime?: number, filter?: ((arg0: TraceEngine.Legacy.CompatibleTraceEvent) => boolean), ignoreAsyncEvents?: boolean): void;
    private static topLevelEventEndingAfter;
    static eventFrameId(event: TraceEngine.Legacy.Event): Protocol.Page.FrameId | null;
    setEvents(tracingModel: TraceEngine.Legacy.TracingModel): void;
    private processGenericTrace;
    private processMetadataAndThreads;
    private processThreadsForBrowserFrames;
    private processMetadataEvents;
    private processSyncBrowserEvents;
    private resetProcessingState;
    private processThreadEvents;
    private processEvent;
    private processBrowserEvent;
    private findAncestorEvent;
    private addPageFrame;
    private reset;
    tracingModel(): TraceEngine.Legacy.TracingModel | null;
    inspectedTargetEvents(): TraceEngine.Legacy.Event[];
    rootFrames(): PageFrame[];
    pageURL(): Platform.DevToolsPath.UrlString;
    pageFrameById(frameId: Protocol.Page.FrameId): PageFrame | null;
    static findRecalculateStyleEvents(events: TraceEngine.Types.TraceEvents.TraceEventData[], startTime?: number, endTime?: number): TraceEngine.Legacy.Event[];
}
export declare enum RecordType {
    Task = "RunTask",
    Program = "Program",
    EventDispatch = "EventDispatch",
    GPUTask = "GPUTask",
    Animation = "Animation",
    RequestMainThreadFrame = "RequestMainThreadFrame",
    BeginFrame = "BeginFrame",
    NeedsBeginFrameChanged = "NeedsBeginFrameChanged",
    BeginMainThreadFrame = "BeginMainThreadFrame",
    ActivateLayerTree = "ActivateLayerTree",
    DrawFrame = "DrawFrame",
    DroppedFrame = "DroppedFrame",
    HitTest = "HitTest",
    ScheduleStyleRecalculation = "ScheduleStyleRecalculation",
    RecalculateStyles = "RecalculateStyles",
    UpdateLayoutTree = "UpdateLayoutTree",
    InvalidateLayout = "InvalidateLayout",
    Layerize = "Layerize",
    Layout = "Layout",
    LayoutShift = "LayoutShift",
    UpdateLayer = "UpdateLayer",
    UpdateLayerTree = "UpdateLayerTree",
    PaintSetup = "PaintSetup",
    Paint = "Paint",
    PaintImage = "PaintImage",
    PrePaint = "PrePaint",
    Rasterize = "Rasterize",
    RasterTask = "RasterTask",
    ScrollLayer = "ScrollLayer",
    Commit = "Commit",
    CompositeLayers = "CompositeLayers",
    ComputeIntersections = "IntersectionObserverController::computeIntersections",
    InteractiveTime = "InteractiveTime",
    ParseHTML = "ParseHTML",
    ParseAuthorStyleSheet = "ParseAuthorStyleSheet",
    TimerInstall = "TimerInstall",
    TimerRemove = "TimerRemove",
    TimerFire = "TimerFire",
    XHRReadyStateChange = "XHRReadyStateChange",
    XHRLoad = "XHRLoad",
    CompileScript = "v8.compile",
    CompileCode = "V8.CompileCode",
    OptimizeCode = "V8.OptimizeCode",
    EvaluateScript = "EvaluateScript",
    CacheScript = "v8.produceCache",
    CompileModule = "v8.compileModule",
    EvaluateModule = "v8.evaluateModule",
    CacheModule = "v8.produceModuleCache",
    WasmStreamFromResponseCallback = "v8.wasm.streamFromResponseCallback",
    WasmCompiledModule = "v8.wasm.compiledModule",
    WasmCachedModule = "v8.wasm.cachedModule",
    WasmModuleCacheHit = "v8.wasm.moduleCacheHit",
    WasmModuleCacheInvalid = "v8.wasm.moduleCacheInvalid",
    FrameStartedLoading = "FrameStartedLoading",
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
    EventTiming = "EventTiming",
    ResourceWillSendRequest = "ResourceWillSendRequest",
    ResourceSendRequest = "ResourceSendRequest",
    ResourceReceiveResponse = "ResourceReceiveResponse",
    ResourceReceivedData = "ResourceReceivedData",
    ResourceFinish = "ResourceFinish",
    ResourceMarkAsCached = "ResourceMarkAsCached",
    RunMicrotasks = "RunMicrotasks",
    FunctionCall = "FunctionCall",
    GCEvent = "GCEvent",
    MajorGC = "MajorGC",
    MinorGC = "MinorGC",
    JSFrame = "JSFrame",
    JSSample = "JSSample",
    JSIdleFrame = "JSIdleFrame",
    JSIdleSample = "JSIdleSample",
    JSSystemFrame = "JSSystemFrame",
    JSSystemSample = "JSSystemSample",
    JSRoot = "JSRoot",
    V8Sample = "V8Sample",
    JitCodeAdded = "JitCodeAdded",
    JitCodeMoved = "JitCodeMoved",
    StreamingCompileScript = "v8.parseOnBackground",
    StreamingCompileScriptWaiting = "v8.parseOnBackgroundWaiting",
    StreamingCompileScriptParsing = "v8.parseOnBackgroundParsing",
    BackgroundDeserialize = "v8.deserializeOnBackground",
    FinalizeDeserialization = "V8.FinalizeDeserialization",
    V8Execute = "V8.Execute",
    UpdateCounters = "UpdateCounters",
    RequestAnimationFrame = "RequestAnimationFrame",
    CancelAnimationFrame = "CancelAnimationFrame",
    FireAnimationFrame = "FireAnimationFrame",
    RequestIdleCallback = "RequestIdleCallback",
    CancelIdleCallback = "CancelIdleCallback",
    FireIdleCallback = "FireIdleCallback",
    WebSocketCreate = "WebSocketCreate",
    WebSocketSendHandshakeRequest = "WebSocketSendHandshakeRequest",
    WebSocketReceiveHandshakeResponse = "WebSocketReceiveHandshakeResponse",
    WebSocketDestroy = "WebSocketDestroy",
    EmbedderCallback = "EmbedderCallback",
    SetLayerTreeId = "SetLayerTreeId",
    TracingStartedInPage = "TracingStartedInPage",
    TracingSessionIdForWorker = "TracingSessionIdForWorker",
    StartProfiling = "CpuProfiler::StartProfiling",
    DecodeImage = "Decode Image",
    DrawLazyPixelRef = "Draw LazyPixelRef",
    DecodeLazyPixelRef = "Decode LazyPixelRef",
    LazyPixelRef = "LazyPixelRef",
    LayerTreeHostImplSnapshot = "cc::LayerTreeHostImpl",
    PictureSnapshot = "cc::Picture",
    DisplayItemListSnapshot = "cc::DisplayItemList",
    InputLatencyMouseMove = "InputLatency::MouseMove",
    InputLatencyMouseWheel = "InputLatency::MouseWheel",
    ImplSideFling = "InputHandlerProxy::HandleGestureFling::started",
    GCCollectGarbage = "BlinkGC.AtomicPhase",
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
    CpuProfile = "CpuProfile",
    Profile = "Profile",
    AsyncTask = "AsyncTask",
    SelectorStats = "SelectorStats"
}
export declare namespace TimelineModelImpl {
    const Category: {
        Console: string;
        UserTiming: string;
        Loading: string;
    };
    const WorkerThreadName = "DedicatedWorker thread";
    const WorkerThreadNameLegacy = "DedicatedWorker Thread";
    const RendererMainThreadName = "CrRendererMain";
    const BrowserMainThreadName = "CrBrowserMain";
    const UtilityMainThreadNameSuffix = "CrUtilityMain";
    const DevToolsMetadataEvent: {
        TracingStartedInBrowser: string;
        TracingStartedInPage: string;
        TracingSessionIdForWorker: string;
        FrameCommittedInBrowser: string;
        ProcessReadyInBrowser: string;
        FrameDeletedInBrowser: string;
    };
    const Thresholds: {
        LongTask: number;
        Handler: number;
        RecurringHandler: number;
        ForcedLayout: number;
        IdleCallbackAddon: number;
    };
}
export declare class PageFrame {
    frameId: any;
    url: any;
    name: any;
    children: PageFrame[];
    parent: PageFrame | null;
    processes: {
        time: number;
        processId: number;
        processPseudoId: string | null;
        url: Platform.DevToolsPath.UrlString;
    }[];
    deletedTime: number | null;
    ownerNode: SDK.DOMModel.DeferredDOMNode | null;
    constructor(payload: any);
    update(time: number, payload: any): void;
    processReady(processPseudoId: string, processId: number): void;
    addChild(child: PageFrame): void;
}
export declare class EventOnTimelineData {
    url: Platform.DevToolsPath.UrlString | null;
    frameId: Protocol.Page.FrameId | null;
    constructor();
    static forEvent(event: TraceEngine.Legacy.CompatibleTraceEvent): EventOnTimelineData;
    static forTraceEventData(event: TraceEngine.Types.TraceEvents.TraceEventData): EventOnTimelineData;
}
export interface MetadataEvents {
    page: TraceEngine.Legacy.Event[];
    workers: TraceEngine.Legacy.Event[];
}
