/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import * as Common from '../../core/common/common.js';
import * as TraceEngine from '../trace/trace.js';
export class TimelineModelImpl {
    sessionId;
    lastPaintForLayer;
    currentScriptEvent;
    eventStack;
    browserFrameTracking;
    constructor() {
        this.reset();
        this.resetProcessingState();
    }
    setEvents(tracingModel) {
        this.reset();
        this.resetProcessingState();
        this.processSyncBrowserEvents(tracingModel);
        if (this.browserFrameTracking) {
            this.processThreadsForBrowserFrames(tracingModel);
        }
        else {
            // The next line is for loading legacy traces recorded before M67.
            // TODO(alph): Drop the support at some point.
            const metadataEvents = this.processMetadataEvents(tracingModel);
            if (metadataEvents) {
                this.processMetadataAndThreads(metadataEvents);
            }
            else {
                this.processGenericTrace(tracingModel);
            }
        }
        this.resetProcessingState();
    }
    processGenericTrace(tracingModel) {
        for (const process of tracingModel.sortedProcesses()) {
            for (const thread of process.sortedThreads()) {
                this.processThreadEvents(thread);
            }
        }
    }
    processMetadataAndThreads(metadataEvents) {
        let startTime = 0;
        for (let i = 0, length = metadataEvents.page.length; i < length; i++) {
            const metaEvent = metadataEvents.page[i];
            const process = metaEvent.thread.process();
            const endTime = i + 1 < length ? metadataEvents.page[i + 1].startTime : Infinity;
            if (startTime === endTime) {
                continue;
            }
            for (const thread of process.sortedThreads()) {
                this.processThreadEvents(thread);
            }
            startTime = endTime;
        }
    }
    processThreadsForBrowserFrames(tracingModel) {
        const processDataByPid = new Map();
        for (const process of tracingModel.sortedProcesses()) {
            const processData = processDataByPid.get(process.id());
            if (!processData) {
                continue;
            }
            // Sort ascending by range starts, followed by range ends
            processData.sort((a, b) => a.from - b.from || a.to - b.to);
            for (const thread of process.sortedThreads()) {
                if (thread.name() === TimelineModelImpl.RendererMainThreadName) {
                    this.processThreadEvents(thread);
                }
                else if (thread.name() === TimelineModelImpl.WorkerThreadName ||
                    thread.name() === TimelineModelImpl.WorkerThreadNameLegacy) {
                    continue;
                }
                else {
                    this.processThreadEvents(thread);
                }
            }
        }
    }
    processMetadataEvents(tracingModel) {
        const metadataEvents = tracingModel.devToolsMetadataEvents();
        const pageDevToolsMetadataEvents = [];
        const workersDevToolsMetadataEvents = [];
        for (const event of metadataEvents) {
            if (event.name === TimelineModelImpl.DevToolsMetadataEvent.TracingStartedInPage) {
                pageDevToolsMetadataEvents.push(event);
            }
            else if (event.name === TimelineModelImpl.DevToolsMetadataEvent.TracingSessionIdForWorker) {
                workersDevToolsMetadataEvents.push(event);
            }
        }
        if (!pageDevToolsMetadataEvents.length) {
            return null;
        }
        const sessionId = pageDevToolsMetadataEvents[0].args['sessionId'] || pageDevToolsMetadataEvents[0].args['data']['sessionId'];
        this.sessionId = sessionId;
        const mismatchingIds = new Set();
        function checkSessionId(event) {
            let args = event.args;
            // FIXME: put sessionId into args["data"] for TracingStartedInPage event.
            if (args['data']) {
                args = args['data'];
            }
            const id = args['sessionId'];
            if (id === sessionId) {
                return true;
            }
            mismatchingIds.add(id);
            return false;
        }
        const result = {
            page: pageDevToolsMetadataEvents.filter(checkSessionId).sort(TraceEngine.Legacy.Event.compareStartTime),
            workers: workersDevToolsMetadataEvents.sort(TraceEngine.Legacy.Event.compareStartTime),
        };
        if (mismatchingIds.size) {
            Common.Console.Console.instance().error('Timeline recording was started in more than one page simultaneously. Session id mismatch: ' +
                this.sessionId + ' and ' + [...mismatchingIds] + '.');
        }
        return result;
    }
    processSyncBrowserEvents(tracingModel) {
        const browserMain = TraceEngine.Legacy.TracingModel.browserMainThread(tracingModel);
        if (browserMain) {
            browserMain.events().forEach(this.processBrowserEvent, this);
        }
    }
    resetProcessingState() {
        this.lastPaintForLayer = {};
        this.currentScriptEvent = null;
        this.eventStack = [];
        this.browserFrameTracking = false;
    }
    processThreadEvents(thread) {
        const events = thread.events();
        this.eventStack = [];
        const eventStack = this.eventStack;
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            let last = eventStack[eventStack.length - 1];
            while (last && last.endTime !== undefined && last.endTime <= event.startTime) {
                eventStack.pop();
                last = eventStack[eventStack.length - 1];
            }
            if (!this.processEvent(event)) {
                continue;
            }
            if (!TraceEngine.Types.TraceEvents.isAsyncPhase(event.phase) && event.duration) {
                if (eventStack.length) {
                    const parent = eventStack[eventStack.length - 1];
                    if (parent) {
                        parent.selfTime -= event.duration;
                        if (parent.selfTime < 0) {
                            parent.selfTime = 0;
                        }
                    }
                }
                event.selfTime = event.duration;
                eventStack.push(event);
            }
        }
    }
    processEvent(event) {
        if (this.currentScriptEvent) {
            if (this.currentScriptEvent.endTime !== undefined && event.startTime > this.currentScriptEvent.endTime) {
                this.currentScriptEvent = null;
            }
        }
        const eventData = event.args['data'] || event.args['beginData'] || {};
        switch (event.name) {
            case RecordType.Layout: {
                const frameId = event.args?.beginData?.frame;
                if (!frameId) {
                    break;
                }
                break;
            }
            case RecordType.RunMicrotasks: {
                // Microtasks technically are not necessarily scripts, but for purpose of
                // forced sync style recalc or layout detection they are.
                if (!this.currentScriptEvent) {
                    this.currentScriptEvent = event;
                }
                break;
            }
            case RecordType.Paint: {
                // Only keep layer paint events, skip paints for subframes that get painted to the same layer as parent.
                if (!eventData['layerId']) {
                    break;
                }
                const layerId = eventData['layerId'];
                this.lastPaintForLayer[layerId] = event;
                break;
            }
        }
        return true;
    }
    processBrowserEvent(event) {
        if (event.name === RecordType.ResourceWillSendRequest) {
            const requestId = event.args?.data?.requestId;
            if (typeof requestId === 'string') {
            }
            return;
        }
        if (event.hasCategory(TraceEngine.Legacy.DevToolsMetadataEventCategory) && event.args['data']) {
            const data = event.args['data'];
            if (event.name === TimelineModelImpl.DevToolsMetadataEvent.TracingStartedInBrowser) {
                if (!data['persistentIds']) {
                    return;
                }
                this.browserFrameTracking = true;
                return;
            }
        }
    }
    reset() {
        this.sessionId = null;
    }
}
export var RecordType;
(function (RecordType) {
    RecordType["Task"] = "RunTask";
    RecordType["Program"] = "Program";
    RecordType["EventDispatch"] = "EventDispatch";
    RecordType["GPUTask"] = "GPUTask";
    RecordType["Animation"] = "Animation";
    RecordType["RequestMainThreadFrame"] = "RequestMainThreadFrame";
    RecordType["BeginFrame"] = "BeginFrame";
    RecordType["NeedsBeginFrameChanged"] = "NeedsBeginFrameChanged";
    RecordType["BeginMainThreadFrame"] = "BeginMainThreadFrame";
    RecordType["ActivateLayerTree"] = "ActivateLayerTree";
    RecordType["DrawFrame"] = "DrawFrame";
    RecordType["DroppedFrame"] = "DroppedFrame";
    RecordType["HitTest"] = "HitTest";
    RecordType["ScheduleStyleRecalculation"] = "ScheduleStyleRecalculation";
    RecordType["UpdateLayoutTree"] = "UpdateLayoutTree";
    RecordType["InvalidateLayout"] = "InvalidateLayout";
    RecordType["Layerize"] = "Layerize";
    RecordType["Layout"] = "Layout";
    RecordType["LayoutShift"] = "LayoutShift";
    RecordType["UpdateLayer"] = "UpdateLayer";
    RecordType["UpdateLayerTree"] = "UpdateLayerTree";
    RecordType["PaintSetup"] = "PaintSetup";
    RecordType["Paint"] = "Paint";
    RecordType["PaintImage"] = "PaintImage";
    RecordType["PrePaint"] = "PrePaint";
    RecordType["Rasterize"] = "Rasterize";
    RecordType["RasterTask"] = "RasterTask";
    RecordType["ScrollLayer"] = "ScrollLayer";
    RecordType["Commit"] = "Commit";
    RecordType["CompositeLayers"] = "CompositeLayers";
    RecordType["ComputeIntersections"] = "IntersectionObserverController::computeIntersections";
    RecordType["InteractiveTime"] = "InteractiveTime";
    RecordType["ParseHTML"] = "ParseHTML";
    RecordType["ParseAuthorStyleSheet"] = "ParseAuthorStyleSheet";
    RecordType["TimerInstall"] = "TimerInstall";
    RecordType["TimerRemove"] = "TimerRemove";
    RecordType["TimerFire"] = "TimerFire";
    RecordType["XHRReadyStateChange"] = "XHRReadyStateChange";
    RecordType["XHRLoad"] = "XHRLoad";
    RecordType["CompileScript"] = "v8.compile";
    RecordType["CompileCode"] = "V8.CompileCode";
    RecordType["OptimizeCode"] = "V8.OptimizeCode";
    RecordType["EvaluateScript"] = "EvaluateScript";
    RecordType["CacheScript"] = "v8.produceCache";
    RecordType["CompileModule"] = "v8.compileModule";
    RecordType["EvaluateModule"] = "v8.evaluateModule";
    RecordType["CacheModule"] = "v8.produceModuleCache";
    RecordType["WasmStreamFromResponseCallback"] = "v8.wasm.streamFromResponseCallback";
    RecordType["WasmCompiledModule"] = "v8.wasm.compiledModule";
    RecordType["WasmCachedModule"] = "v8.wasm.cachedModule";
    RecordType["WasmModuleCacheHit"] = "v8.wasm.moduleCacheHit";
    RecordType["WasmModuleCacheInvalid"] = "v8.wasm.moduleCacheInvalid";
    RecordType["FrameStartedLoading"] = "FrameStartedLoading";
    RecordType["CommitLoad"] = "CommitLoad";
    RecordType["MarkLoad"] = "MarkLoad";
    RecordType["MarkDOMContent"] = "MarkDOMContent";
    RecordType["MarkFirstPaint"] = "firstPaint";
    RecordType["MarkFCP"] = "firstContentfulPaint";
    RecordType["MarkLCPCandidate"] = "largestContentfulPaint::Candidate";
    RecordType["MarkLCPInvalidate"] = "largestContentfulPaint::Invalidate";
    RecordType["NavigationStart"] = "navigationStart";
    RecordType["TimeStamp"] = "TimeStamp";
    RecordType["ConsoleTime"] = "ConsoleTime";
    RecordType["UserTiming"] = "UserTiming";
    RecordType["EventTiming"] = "EventTiming";
    RecordType["ResourceWillSendRequest"] = "ResourceWillSendRequest";
    RecordType["ResourceSendRequest"] = "ResourceSendRequest";
    RecordType["ResourceReceiveResponse"] = "ResourceReceiveResponse";
    RecordType["ResourceReceivedData"] = "ResourceReceivedData";
    RecordType["ResourceFinish"] = "ResourceFinish";
    RecordType["ResourceMarkAsCached"] = "ResourceMarkAsCached";
    RecordType["RunMicrotasks"] = "RunMicrotasks";
    RecordType["FunctionCall"] = "FunctionCall";
    RecordType["GCEvent"] = "GCEvent";
    RecordType["MajorGC"] = "MajorGC";
    RecordType["MinorGC"] = "MinorGC";
    // The following types are used for CPUProfile.
    // JSRoot is used for the root node.
    // JSIdleFrame and JSIdleSample are used for idle nodes.
    // JSSystemFrame and JSSystemSample are used for other system nodes.
    // JSFrame and JSSample are used for other nodes, and will be categorized as |scripting|.
    RecordType["JSFrame"] = "JSFrame";
    RecordType["JSSample"] = "JSSample";
    RecordType["JSIdleFrame"] = "JSIdleFrame";
    RecordType["JSIdleSample"] = "JSIdleSample";
    RecordType["JSSystemFrame"] = "JSSystemFrame";
    RecordType["JSSystemSample"] = "JSSystemSample";
    RecordType["JSRoot"] = "JSRoot";
    // V8Sample events are coming from tracing and contain raw stacks with function addresses.
    // After being processed with help of JitCodeAdded and JitCodeMoved events they
    // get translated into function infos and stored as stacks in JSSample events.
    RecordType["V8Sample"] = "V8Sample";
    RecordType["JitCodeAdded"] = "JitCodeAdded";
    RecordType["JitCodeMoved"] = "JitCodeMoved";
    RecordType["StreamingCompileScript"] = "v8.parseOnBackground";
    RecordType["StreamingCompileScriptWaiting"] = "v8.parseOnBackgroundWaiting";
    RecordType["StreamingCompileScriptParsing"] = "v8.parseOnBackgroundParsing";
    RecordType["BackgroundDeserialize"] = "v8.deserializeOnBackground";
    RecordType["FinalizeDeserialization"] = "V8.FinalizeDeserialization";
    RecordType["V8Execute"] = "V8.Execute";
    RecordType["UpdateCounters"] = "UpdateCounters";
    RecordType["RequestAnimationFrame"] = "RequestAnimationFrame";
    RecordType["CancelAnimationFrame"] = "CancelAnimationFrame";
    RecordType["FireAnimationFrame"] = "FireAnimationFrame";
    RecordType["RequestIdleCallback"] = "RequestIdleCallback";
    RecordType["CancelIdleCallback"] = "CancelIdleCallback";
    RecordType["FireIdleCallback"] = "FireIdleCallback";
    RecordType["WebSocketCreate"] = "WebSocketCreate";
    RecordType["WebSocketSendHandshakeRequest"] = "WebSocketSendHandshakeRequest";
    RecordType["WebSocketReceiveHandshakeResponse"] = "WebSocketReceiveHandshakeResponse";
    RecordType["WebSocketDestroy"] = "WebSocketDestroy";
    RecordType["EmbedderCallback"] = "EmbedderCallback";
    RecordType["SetLayerTreeId"] = "SetLayerTreeId";
    RecordType["TracingStartedInPage"] = "TracingStartedInPage";
    RecordType["TracingSessionIdForWorker"] = "TracingSessionIdForWorker";
    RecordType["StartProfiling"] = "CpuProfiler::StartProfiling";
    RecordType["DecodeImage"] = "Decode Image";
    RecordType["DrawLazyPixelRef"] = "Draw LazyPixelRef";
    RecordType["DecodeLazyPixelRef"] = "Decode LazyPixelRef";
    RecordType["LazyPixelRef"] = "LazyPixelRef";
    RecordType["LayerTreeHostImplSnapshot"] = "cc::LayerTreeHostImpl";
    RecordType["PictureSnapshot"] = "cc::Picture";
    RecordType["DisplayItemListSnapshot"] = "cc::DisplayItemList";
    RecordType["InputLatencyMouseMove"] = "InputLatency::MouseMove";
    RecordType["InputLatencyMouseWheel"] = "InputLatency::MouseWheel";
    RecordType["ImplSideFling"] = "InputHandlerProxy::HandleGestureFling::started";
    RecordType["GCCollectGarbage"] = "BlinkGC.AtomicPhase";
    RecordType["CryptoDoEncrypt"] = "DoEncrypt";
    RecordType["CryptoDoEncryptReply"] = "DoEncryptReply";
    RecordType["CryptoDoDecrypt"] = "DoDecrypt";
    RecordType["CryptoDoDecryptReply"] = "DoDecryptReply";
    RecordType["CryptoDoDigest"] = "DoDigest";
    RecordType["CryptoDoDigestReply"] = "DoDigestReply";
    RecordType["CryptoDoSign"] = "DoSign";
    RecordType["CryptoDoSignReply"] = "DoSignReply";
    RecordType["CryptoDoVerify"] = "DoVerify";
    RecordType["CryptoDoVerifyReply"] = "DoVerifyReply";
    // CpuProfile is a virtual event created on frontend to support
    // serialization of CPU Profiles within tracing timeline data.
    RecordType["CpuProfile"] = "CpuProfile";
    RecordType["Profile"] = "Profile";
    RecordType["AsyncTask"] = "AsyncTask";
    RecordType["SelectorStats"] = "SelectorStats";
})(RecordType || (RecordType = {}));
(function (TimelineModelImpl) {
    TimelineModelImpl.Category = {
        Console: 'blink.console',
        UserTiming: 'blink.user_timing',
        Loading: 'loading',
    };
    TimelineModelImpl.WorkerThreadName = 'DedicatedWorker thread';
    TimelineModelImpl.WorkerThreadNameLegacy = 'DedicatedWorker Thread';
    TimelineModelImpl.RendererMainThreadName = 'CrRendererMain';
    TimelineModelImpl.DevToolsMetadataEvent = {
        TracingStartedInBrowser: 'TracingStartedInBrowser',
        TracingStartedInPage: 'TracingStartedInPage',
        TracingSessionIdForWorker: 'TracingSessionIdForWorker',
        FrameCommittedInBrowser: 'FrameCommittedInBrowser',
        ProcessReadyInBrowser: 'ProcessReadyInBrowser',
        FrameDeletedInBrowser: 'FrameDeletedInBrowser',
    };
})(TimelineModelImpl || (TimelineModelImpl = {}));
//# sourceMappingURL=TimelineModel.js.map