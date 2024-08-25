// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export function isNestableAsyncPhase(phase) {
    return phase === "b" /* Phase.ASYNC_NESTABLE_START */ || phase === "e" /* Phase.ASYNC_NESTABLE_END */ ||
        phase === "n" /* Phase.ASYNC_NESTABLE_INSTANT */;
}
export function isAsyncPhase(phase) {
    return isNestableAsyncPhase(phase) || phase === "S" /* Phase.ASYNC_BEGIN */ || phase === "T" /* Phase.ASYNC_STEP_INTO */ ||
        phase === "F" /* Phase.ASYNC_END */ || phase === "p" /* Phase.ASYNC_STEP_PAST */;
}
export function isFlowPhase(phase) {
    return phase === "s" /* Phase.FLOW_START */ || phase === "t" /* Phase.FLOW_STEP */ || phase === "f" /* Phase.FLOW_END */;
}
export function objectIsTraceEventCallFrame(object) {
    return ('functionName' in object && typeof object.functionName === 'string') &&
        ('scriptId' in object && (typeof object.scriptId === 'string' || typeof object.scriptId === 'number')) &&
        ('columnNumber' in object && typeof object.columnNumber === 'number') &&
        ('lineNumber' in object && typeof object.lineNumber === 'number') &&
        ('url' in object && typeof object.url === 'string');
}
export function isTraceEventRunTask(event) {
    return event.name === "RunTask" /* KnownEventName.RUN_TASK */;
}
export function isTraceEventAuctionWorkletRunningInProcess(event) {
    return event.name === 'AuctionWorkletRunningInProcess';
}
export function isTraceEventAuctionWorkletDoneWithProcess(event) {
    return event.name === 'AuctionWorkletDoneWithProcess';
}
export function isTraceEventScreenshot(event) {
    return event.name === "Screenshot" /* KnownEventName.SCREENSHOT */;
}
const markerTypeGuards = [
    isTraceEventMarkDOMContent,
    isTraceEventMarkLoad,
    isTraceEventFirstPaint,
    isTraceEventFirstContentfulPaint,
    isTraceEventLargestContentfulPaintCandidate,
    isTraceEventNavigationStart,
];
export const MarkerName = ['MarkDOMContent', 'MarkLoad', 'firstPaint', 'firstContentfulPaint', 'largestContentfulPaint::Candidate'];
export function isTraceEventMarkerEvent(event) {
    return markerTypeGuards.some(fn => fn(event));
}
const pageLoadEventTypeGuards = [
    ...markerTypeGuards,
    isTraceEventInteractiveTime,
];
export function eventIsPageLoadEvent(event) {
    return pageLoadEventTypeGuards.some(fn => fn(event));
}
export function isTraceEventTracingSessionIdForWorker(event) {
    return event.name === 'TracingSessionIdForWorker';
}
export function isTraceEventScheduleStyleInvalidationTracking(event) {
    return event.name === "ScheduleStyleInvalidationTracking" /* KnownEventName.SCHEDULE_STYLE_INVALIDATION_TRACKING */;
}
export function isTraceEventStyleRecalcInvalidationTracking(event) {
    return event.name === "StyleRecalcInvalidationTracking" /* KnownEventName.STYLE_RECALC_INVALIDATION_TRACKING */;
}
export function isTraceEventStyleInvalidatorInvalidationTracking(event) {
    return event.name === "StyleInvalidatorInvalidationTracking" /* KnownEventName.STYLE_INVALIDATOR_INVALIDATION_TRACKING */;
}
export function isTraceEventBeginCommitCompositorFrame(event) {
    return event.name === "BeginCommitCompositorFrame" /* KnownEventName.BEGIN_COMMIT_COMPOSITOR_FRAME */;
}
export function isTraceEventParseMetaViewport(event) {
    return event.name === "ParseMetaViewport" /* KnownEventName.PARSE_META_VIEWPORT */;
}
export function isTraceEventScheduleStyleRecalculation(event) {
    return event.name === "ScheduleStyleRecalculation" /* KnownEventName.SCHEDULE_STYLE_RECALCULATION */;
}
export function isTraceEventRenderFrameImplCreateChildFrame(event) {
    return event.name === "RenderFrameImpl::createChildFrame" /* KnownEventName.RENDER_FRAME_IMPL_CREATE_CHILD_FRAME */;
}
export function isTraceEventTargetRundown(traceEventData) {
    if (traceEventData.cat !== 'disabled-by-default-devtools.target-rundown') {
        return false;
    }
    const data = traceEventData.args?.data;
    if (!data) {
        return false;
    }
    return 'frame' in data && 'frameType' in data && 'url' in data && 'isolate' in data && 'v8context' in data &&
        'scriptId' in data;
}
export function isTraceEventScriptRundown(traceEventData) {
    if (traceEventData.cat !== 'disabled-by-default-devtools.v8-source-rundown') {
        return false;
    }
    const data = traceEventData.args?.data;
    if (!data) {
        return false;
    }
    return 'isolate' in data && 'executionContextId' in data && 'scriptId' in data && 'startLine' in data &&
        'startColumn' in data && 'endLine' in data && 'endColumn' in data && 'hash' in data && 'isModule' in data &&
        'hasSourceUrl' in data;
}
export function isTraceEventScriptRundownSource(traceEventData) {
    if (traceEventData.cat !== 'disabled-by-default-devtools.v8-source-rundown-sources') {
        return false;
    }
    const data = traceEventData.args?.data;
    if (!data) {
        return false;
    }
    return 'isolate' in data && 'scriptId' in data && 'sourceText' in data;
}
export function isTraceEventPipelineReporter(event) {
    return event.name === "PipelineReporter" /* KnownEventName.PIPELINE_REPORTER */;
}
export function isSyntheticBasedEvent(event) {
    return 'rawSourceEvent' in event;
}
export function isSyntheticInteractionEvent(event) {
    return Boolean('interactionId' in event && event.args?.data && 'beginEvent' in event.args.data && 'endEvent' in event.args.data);
}
export function isTraceEventDrawFrame(event) {
    // The extra check for INSTANT here is because in the past DrawFrame events had an ASYNC_NESTABLE_START and ASYNC_NESTABLE_END pair. We don't want to support those old events, so we have to check we are dealing with an instant event.
    return event.name === "DrawFrame" /* KnownEventName.DRAW_FRAME */ && event.ph === "I" /* Phase.INSTANT */;
}
export function isLegacyTraceEventDrawFrameBegin(event) {
    return event.name === "DrawFrame" /* KnownEventName.DRAW_FRAME */ && event.ph === "b" /* Phase.ASYNC_NESTABLE_START */;
}
export function isTraceEventBeginFrame(event) {
    // Old traces did not have frameSeqId; but we do not want to support these.
    return Boolean(event.name === "BeginFrame" /* KnownEventName.BEGIN_FRAME */ && event.args && 'frameSeqId' in event.args);
}
export function isTraceEventDroppedFrame(event) {
    // Old traces did not have frameSeqId; but we do not want to support these.
    return Boolean(event.name === "DroppedFrame" /* KnownEventName.DROPPED_FRAME */ && event.args && 'frameSeqId' in event.args);
}
export function isTraceEventRequestMainThreadFrame(event) {
    return event.name === "RequestMainThreadFrame" /* KnownEventName.REQUEST_MAIN_THREAD_FRAME */;
}
export function isTraceEventBeginMainThreadFrame(event) {
    return event.name === "BeginMainThreadFrame" /* KnownEventName.BEGIN_MAIN_THREAD_FRAME */;
}
export function isTraceEventNeedsBeginFrameChanged(event) {
    return event.name === "NeedsBeginFrameChanged" /* KnownEventName.NEEDS_BEGIN_FRAME_CHANGED */;
}
export function isTraceEventCommit(event) {
    // Old traces did not have frameSeqId; but we do not want to support these.
    return Boolean(event.name === "Commit" /* KnownEventName.COMMIT */ && event.args && 'frameSeqId' in event.args);
}
export function isTraceEventRasterTask(event) {
    return event.name === "RasterTask" /* KnownEventName.RASTER_TASK */;
}
export function isTraceEventCompositeLayers(event) {
    return event.name === "CompositeLayers" /* KnownEventName.COMPOSITE_LAYERS */;
}
export function isTraceEventActivateLayerTree(event) {
    return event.name === "ActivateLayerTree" /* KnownEventName.ACTIVATE_LAYER_TREE */;
}
export function isTraceEventInvalidationTracking(event) {
    return isTraceEventScheduleStyleInvalidationTracking(event) || isTraceEventStyleRecalcInvalidationTracking(event) ||
        isTraceEventStyleInvalidatorInvalidationTracking(event) || isTraceEventLayoutInvalidationTracking(event);
}
export function isTraceEventDrawLazyPixelRef(event) {
    return event.name === "Draw LazyPixelRef" /* KnownEventName.DRAW_LAZY_PIXEL_REF */;
}
export function isTraceEventDecodeLazyPixelRef(event) {
    return event.name === "Decode LazyPixelRef" /* KnownEventName.DECODE_LAZY_PIXEL_REF */;
}
export function isTraceEventDecodeImage(event) {
    return event.name === "Decode Image" /* KnownEventName.DECODE_IMAGE */;
}
export function isTraceEventSelectorStats(event) {
    return event.name === "SelectorStats" /* KnownEventName.SELECTOR_STATS */;
}
export function isTraceEventUpdateLayoutTree(event) {
    return event.name === "UpdateLayoutTree" /* KnownEventName.UPDATE_LAYOUT_TREE */;
}
export function isTraceEventLayout(event) {
    return event.name === "Layout" /* KnownEventName.LAYOUT */;
}
export function isTraceEventInvalidateLayout(event) {
    return event.name === "InvalidateLayout" /* KnownEventName.INVALIDATE_LAYOUT */;
}
class ProfileIdTag {
    #profileIdTag;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ProfileID(value) {
    return value;
}
class CallFrameIdTag {
    #callFrameIdTag;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CallFrameID(value) {
    return value;
}
class SampleIndexTag {
    #sampleIndexTag;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export function SampleIndex(value) {
    return value;
}
class ProcessIdTag {
    #processIdTag;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ProcessID(value) {
    return value;
}
class ThreadIdTag {
    #threadIdTag;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ThreadID(value) {
    return value;
}
class WorkerIdTag {
    #workerIdTag;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export function WorkerId(value) {
    return value;
}
export function isTraceEventComplete(event) {
    return event.ph === "X" /* Phase.COMPLETE */;
}
export function isTraceEventBegin(event) {
    return event.ph === "B" /* Phase.BEGIN */;
}
export function isTraceEventEnd(event) {
    return event.ph === "E" /* Phase.END */;
}
export function isTraceEventDispatch(event) {
    return event.name === 'EventDispatch';
}
export function isTraceEventInstant(event) {
    return event.ph === "I" /* Phase.INSTANT */;
}
export function isTraceEventRendererEvent(event) {
    return isTraceEventInstant(event) || isTraceEventComplete(event);
}
export function isTraceEventFireIdleCallback(event) {
    return event.name === 'FireIdleCallback';
}
export function isTraceEventSchedulePostMessage(event) {
    return event.name === "SchedulePostMessage" /* KnownEventName.SCHEDULE_POST_MESSAGE */;
}
export function isTraceEventHandlePostMessage(event) {
    return event.name === "HandlePostMessage" /* KnownEventName.HANDLE_POST_MESSAGE */;
}
export function isTraceEventUpdateCounters(event) {
    return event.name === 'UpdateCounters';
}
export function isThreadName(traceEventData) {
    return traceEventData.name === "thread_name" /* KnownEventName.THREAD_NAME */;
}
export function isProcessName(traceEventData) {
    return traceEventData.name === 'process_name';
}
export function isTraceEventTracingStartedInBrowser(traceEventData) {
    return traceEventData.name === "TracingStartedInBrowser" /* KnownEventName.TRACING_STARTED_IN_BROWSER */;
}
export function isTraceEventFrameCommittedInBrowser(traceEventData) {
    return traceEventData.name === 'FrameCommittedInBrowser';
}
export function isTraceEventCommitLoad(traceEventData) {
    return traceEventData.name === 'CommitLoad';
}
export function isTraceEventNavigationStart(traceEventData) {
    return traceEventData.name === 'navigationStart';
}
export function isTraceEventAnimation(traceEventData) {
    // We've found some rare traces with an Animtation trace event from a different category: https://crbug.com/1472375#comment7
    return traceEventData.name === 'Animation' && traceEventData.cat.includes('devtools.timeline');
}
export function isTraceEventLayoutShift(traceEventData) {
    return traceEventData.name === 'LayoutShift';
}
export function isTraceEventLayoutInvalidationTracking(traceEventData) {
    return traceEventData.name === "LayoutInvalidationTracking" /* KnownEventName.LAYOUT_INVALIDATION_TRACKING */;
}
export function isTraceEventFirstContentfulPaint(traceEventData) {
    return traceEventData.name === 'firstContentfulPaint';
}
export function isTraceEventLargestContentfulPaintCandidate(traceEventData) {
    return traceEventData.name === "largestContentfulPaint::Candidate" /* KnownEventName.MARK_LCP_CANDIDATE */;
}
export function isTraceEventLargestImagePaintCandidate(traceEventData) {
    return traceEventData.name === 'LargestImagePaint::Candidate';
}
export function isTraceEventLargestTextPaintCandidate(traceEventData) {
    return traceEventData.name === 'LargestTextPaint::Candidate';
}
export function isTraceEventMarkLoad(traceEventData) {
    return traceEventData.name === 'MarkLoad';
}
export function isTraceEventFirstPaint(traceEventData) {
    return traceEventData.name === 'firstPaint';
}
export function isTraceEventMarkDOMContent(traceEventData) {
    return traceEventData.name === 'MarkDOMContent';
}
export function isTraceEventInteractiveTime(traceEventData) {
    return traceEventData.name === 'InteractiveTime';
}
export function isTraceEventEventTiming(traceEventData) {
    return traceEventData.name === "EventTiming" /* KnownEventName.EVENT_TIMING */;
}
export function isTraceEventEventTimingEnd(traceEventData) {
    return isTraceEventEventTiming(traceEventData) && traceEventData.ph === "e" /* Phase.ASYNC_NESTABLE_END */;
}
export function isTraceEventEventTimingStart(traceEventData) {
    return isTraceEventEventTiming(traceEventData) && traceEventData.ph === "b" /* Phase.ASYNC_NESTABLE_START */;
}
export function isTraceEventGPUTask(traceEventData) {
    return traceEventData.name === 'GPUTask';
}
export function isTraceEventProfile(traceEventData) {
    return traceEventData.name === 'Profile';
}
export function isSyntheticCpuProfile(traceEventData) {
    return traceEventData.name === 'CpuProfile';
}
export function isTraceEventProfileChunk(traceEventData) {
    return traceEventData.name === 'ProfileChunk';
}
export function isTraceEventResourceChangePriority(traceEventData) {
    return traceEventData.name === 'ResourceChangePriority';
}
export function isTraceEventResourceSendRequest(traceEventData) {
    return traceEventData.name === 'ResourceSendRequest';
}
export function isTraceEventResourceReceiveResponse(traceEventData) {
    return traceEventData.name === 'ResourceReceiveResponse';
}
export function isTraceEventResourceMarkAsCached(traceEventData) {
    return traceEventData.name === 'ResourceMarkAsCached';
}
export function isTraceEventResourceFinish(traceEventData) {
    return traceEventData.name === 'ResourceFinish';
}
export function isTraceEventResourceWillSendRequest(traceEventData) {
    return traceEventData.name === 'ResourceWillSendRequest';
}
export function isTraceEventResourceReceivedData(traceEventData) {
    return traceEventData.name === 'ResourceReceivedData';
}
export function isSyntheticNetworkRequestEvent(traceEventData) {
    return traceEventData.name === 'SyntheticNetworkRequest';
}
export function isSyntheticWebSocketConnectionEvent(traceEventData) {
    return traceEventData.name === 'SyntheticWebSocketConnectionEvent';
}
export function isNetworkTrackEntry(traceEventData) {
    return isSyntheticNetworkRequestEvent(traceEventData) || isSyntheticWebSocketConnectionEvent(traceEventData) ||
        isWebSocketTraceEvent(traceEventData);
}
export function isTraceEventPrePaint(traceEventData) {
    return traceEventData.name === 'PrePaint';
}
export function isTraceEventNavigationStartWithURL(event) {
    return Boolean(isTraceEventNavigationStart(event) && event.args.data && event.args.data.documentLoaderURL !== '');
}
export function isTraceEventMainFrameViewport(traceEventData) {
    return traceEventData.name === 'PaintTimingVisualizer::Viewport';
}
export function isSyntheticUserTiming(traceEventData) {
    if (traceEventData.cat !== 'blink.user_timing') {
        return false;
    }
    const data = traceEventData.args?.data;
    if (!data) {
        return false;
    }
    return 'beginEvent' in data && 'endEvent' in data;
}
export function isSyntheticConsoleTiming(traceEventData) {
    if (traceEventData.cat !== 'blink.console') {
        return false;
    }
    const data = traceEventData.args?.data;
    if (!data) {
        return false;
    }
    return 'beginEvent' in data && 'endEvent' in data;
}
export function isTraceEventUserTiming(traceEventData) {
    return traceEventData.cat === 'blink.user_timing';
}
export function isTraceEventPerformanceMeasure(traceEventData) {
    return isTraceEventUserTiming(traceEventData) && isTraceEventAsyncPhase(traceEventData);
}
export function isTraceEventPerformanceMark(traceEventData) {
    return isTraceEventUserTiming(traceEventData) &&
        (traceEventData.ph === "R" /* Phase.MARK */ || traceEventData.ph === "I" /* Phase.INSTANT */);
}
export function isTraceEventConsoleTime(traceEventData) {
    return traceEventData.cat === 'blink.console' && isTraceEventAsyncPhase(traceEventData);
}
export function isTraceEventTimeStamp(traceEventData) {
    return traceEventData.ph === "I" /* Phase.INSTANT */ && traceEventData.name === 'TimeStamp';
}
export function isTraceEventParseHTML(traceEventData) {
    return traceEventData.name === 'ParseHTML';
}
const asyncPhases = new Set([
    "b" /* Phase.ASYNC_NESTABLE_START */,
    "n" /* Phase.ASYNC_NESTABLE_INSTANT */,
    "e" /* Phase.ASYNC_NESTABLE_END */,
    "T" /* Phase.ASYNC_STEP_INTO */,
    "S" /* Phase.ASYNC_BEGIN */,
    "F" /* Phase.ASYNC_END */,
    "p" /* Phase.ASYNC_STEP_PAST */,
]);
export function isTraceEventAsyncPhase(traceEventData) {
    return asyncPhases.has(traceEventData.ph);
}
export function isSyntheticLayoutShift(traceEventData) {
    if (!isTraceEventLayoutShift(traceEventData) || !traceEventData.args.data) {
        return false;
    }
    return 'rawEvent' in traceEventData.args.data;
}
export function isProfileCall(event) {
    return 'callFrame' in event;
}
export function isTraceEventPaint(event) {
    return event.name === "Paint" /* KnownEventName.PAINT */;
}
export function isTraceEventPaintImage(event) {
    return event.name === "PaintImage" /* KnownEventName.PAINT_IMAGE */;
}
export function isTraceEventScrollLayer(event) {
    return event.name === "ScrollLayer" /* KnownEventName.SCROLL_LAYER */;
}
export function isTraceEventSetLayerId(event) {
    return event.name === "SetLayerTreeId" /* KnownEventName.SET_LAYER_TREE_ID */;
}
export function isTraceEventUpdateLayer(event) {
    return event.name === "UpdateLayer" /* KnownEventName.UPDATE_LAYER */;
}
export function isTraceEventDisplayListItemListSnapshot(event) {
    return event.name === "cc::DisplayItemList" /* KnownEventName.DISPLAY_ITEM_LIST_SNAPSHOT */;
}
export function isTraceEventLayerTreeHostImplSnapshot(event) {
    return event.name === "cc::LayerTreeHostImpl" /* KnownEventName.LAYER_TREE_HOST_IMPL_SNAPSHOT */;
}
export function isTraceEventFireAnimationFrame(event) {
    return event.name === "FireAnimationFrame" /* KnownEventName.FIRE_ANIMATION_FRAME */;
}
export function isTraceEventRequestAnimationFrame(event) {
    return event.name === "RequestAnimationFrame" /* KnownEventName.REQUEST_ANIMATION_FRAME */;
}
export function isTraceEventTimerInstall(event) {
    return event.name === "TimerInstall" /* KnownEventName.TIMER_INSTALL */;
}
export function isTraceEventTimerFire(event) {
    return event.name === "TimerFire" /* KnownEventName.TIMER_FIRE */;
}
export function isTraceEventRequestIdleCallback(event) {
    return event.name === "RequestIdleCallback" /* KnownEventName.REQUEST_IDLE_CALLBACK */;
}
export function isTraceEventWebSocketCreate(event) {
    return event.name === "WebSocketCreate" /* KnownEventName.WEB_SOCKET_CREATE */;
}
export function isTraceEventWebSocketInfo(traceEventData) {
    return traceEventData.name === "WebSocketSendHandshakeRequest" /* KnownEventName.WEB_SOCKET_SEND_HANDSHAKE_REQUEST */ ||
        traceEventData.name === "WebSocketReceiveHandshakeResponse" /* KnownEventName.WEB_SOCKET_RECEIVE_HANDSHAKE_REQUEST */ ||
        traceEventData.name === "WebSocketDestroy" /* KnownEventName.WEB_SOCKET_DESTROY */;
}
export function isTraceEventWebSocketTransfer(traceEventData) {
    return traceEventData.name === "WebSocketSend" /* KnownEventName.WEB_SOCKET_SEND */ ||
        traceEventData.name === "WebSocketReceive" /* KnownEventName.WEB_SOCKET_RECEIVE */;
}
export function isTraceEventWebSocketSend(event) {
    return event.name === "WebSocketSend" /* KnownEventName.WEB_SOCKET_SEND */;
}
export function isTraceEventWebSocketReceive(event) {
    return event.name === "WebSocketReceive" /* KnownEventName.WEB_SOCKET_RECEIVE */;
}
export function isTraceEventWebSocketSendHandshakeRequest(event) {
    return event.name === "WebSocketSendHandshakeRequest" /* KnownEventName.WEB_SOCKET_SEND_HANDSHAKE_REQUEST */;
}
export function isTraceEventWebSocketReceiveHandshakeResponse(event) {
    return event.name === "WebSocketReceiveHandshakeResponse" /* KnownEventName.WEB_SOCKET_RECEIVE_HANDSHAKE_REQUEST */;
}
export function isTraceEventWebSocketDestroy(event) {
    return event.name === "WebSocketDestroy" /* KnownEventName.WEB_SOCKET_DESTROY */;
}
export function isWebSocketTraceEvent(event) {
    return isTraceEventWebSocketCreate(event) || isTraceEventWebSocketInfo(event) || isTraceEventWebSocketTransfer(event);
}
export function isWebSocketEvent(event) {
    return isWebSocketTraceEvent(event) || isSyntheticWebSocketConnectionEvent(event);
}
export function isTraceEventV8Compile(event) {
    return event.name === "v8.compile" /* KnownEventName.COMPILE */;
}
export function isTraceEventFunctionCall(event) {
    return event.name === "FunctionCall" /* KnownEventName.FUNCTION_CALL */;
}
export function isSyntheticServerTiming(event) {
    return event.cat === 'devtools.server-timing';
}
/**
 * Generally, before JS is executed, a trace event is dispatched that
 * parents the JS calls. These we call "invocation" events. This
 * function determines if an event is one of such.
 */
export function isJSInvocationEvent(event) {
    switch (event.name) {
        case "RunMicrotasks" /* KnownEventName.RUN_MICROTASKS */:
        case "FunctionCall" /* KnownEventName.FUNCTION_CALL */:
        case "EvaluateScript" /* KnownEventName.EVALUATE_SCRIPT */:
        case "v8.evaluateModule" /* KnownEventName.EVALUATE_MODULE */:
        case "EventDispatch" /* KnownEventName.EVENT_DISPATCH */:
        case "V8.Execute" /* KnownEventName.V8_EXECUTE */:
            return true;
    }
    // Also consider any new v8 trace events. (eg 'V8.RunMicrotasks' and 'v8.run')
    if (event.name.startsWith('v8') || event.name.startsWith('V8')) {
        return true;
    }
    return false;
}
// NOT AN EXHAUSTIVE LIST: just some categories we use and refer
// to in multiple places.
export const Categories = {
    Console: 'blink.console',
    UserTiming: 'blink.user_timing',
    Loading: 'loading',
};
//# sourceMappingURL=TraceEvents.js.map