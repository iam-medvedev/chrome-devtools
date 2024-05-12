import * as TraceEngine from '../trace/trace.js';
export declare class TimelineModelImpl {
    private sessionId;
    private lastPaintForLayer;
    private currentScriptEvent;
    private eventStack;
    private browserFrameTracking;
    constructor();
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
    private reset;
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
    const DevToolsMetadataEvent: {
        TracingStartedInBrowser: string;
        TracingStartedInPage: string;
        TracingSessionIdForWorker: string;
        FrameCommittedInBrowser: string;
        ProcessReadyInBrowser: string;
        FrameDeletedInBrowser: string;
    };
}
export interface MetadataEvents {
    page: TraceEngine.Legacy.Event[];
    workers: TraceEngine.Legacy.Event[];
}
