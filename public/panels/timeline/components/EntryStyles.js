// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as TraceEngine from '../../../models/trace/trace.js';
import * as ThemeSupport from '../../../ui/legacy/theme_support/theme_support.js';
const UIStrings = {
    /**
     *@description Category in the Summary view of the Performance panel to indicate time spent to load resources
     */
    loading: 'Loading',
    /**
     *@description Text in Timeline for the Experience title
     */
    experience: 'Experience',
    /**
     *@description Category in the Summary view of the Performance panel to indicate time spent in script execution
     */
    scripting: 'Scripting',
    /**
     *@description Category in the Summary view of the Performance panel to indicate time spent in rendering the web page
     */
    rendering: 'Rendering',
    /**
     *@description Category in the Summary view of the Performance panel to indicate time spent to visually represent the web page
     */
    painting: 'Painting',
    /**
     *@description Event category in the Performance panel for time spent in the GPU
     */
    gpu: 'GPU',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    async: 'Async',
    /**
     *@description Category in the Summary view of the Performance panel to indicate time spent in the rest of the system
     */
    system: 'System',
    /**
     *@description Category in the Summary view of the Performance panel to indicate idle time
     */
    idle: 'Idle',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    task: 'Task',
    /**
     *@description Text for other types of items
     */
    other: 'Other',
    /**
     *@description Text that refers to the animation of the web page
     */
    animation: 'Animation',
    /**
     *@description Text that refers to some events
     */
    event: 'Event',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    requestMainThreadFrame: 'Request main thread frame',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    frameStart: 'Frame start',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    onMessage: 'On message',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    schedulePostMessage: 'Schedule postMessage',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    messaging: 'Messaging',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    frameStartMainThread: 'Frame start (main thread)',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    drawFrame: 'Draw frame',
    /**
     *@description Noun for an event in the Performance panel. This marks time
      spent in an operation that only happens when the profiler is active.
     */
    profilingOverhead: 'Profiling overhead',
    /**
     *@description The process the browser uses to determine a target element for a
     *pointer event. Typically, this is determined by considering the pointer's
     *location and also the visual layout of elements on the screen.
     */
    hitTest: 'Hit test',
    /**
     *@description Noun for an event in the Performance panel. The browser has decided
     *that the styles for some elements need to be recalculated and scheduled that
     *recalculation process at some time in the future.
     */
    scheduleStyleRecalculation: 'Schedule style recalculation',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    recalculateStyle: 'Recalculate style',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    invalidateLayout: 'Invalidate Layout',
    /**
     *@description Noun for an event in the Performance panel. Layerize is a step
     *where we calculate which layers to create.
     */
    layerize: 'Layerize',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    layout: 'Layout',
    /**
     *@description Noun for an event in the Performance panel. Paint setup is a
     *step before the 'Paint' event. A paint event is when the browser draws pixels
     *to the screen. This step is the setup beforehand.
     */
    paintSetup: 'Paint setup',
    /**
     *@description Noun for a paint event in the Performance panel, where an image
     *was being painted. A paint event is when the browser draws pixels to the
     *screen, in this case specifically for an image in a website.
     */
    paintImage: 'Paint image',
    /**
     *@description Noun for an event in the Performance panel. Pre-paint is a
     *step before the 'Paint' event. A paint event is when the browser records the
     *instructions for drawing the page. This step is the setup beforehand.
     */
    prePaint: 'Pre-paint',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    updateLayer: 'Update layer',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    updateLayerTree: 'Update layer tree',
    /**
     *@description Noun for a paint event in the Performance panel. A paint event is when the browser draws pixels to the screen.
     */
    paint: 'Paint',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    rasterizePaint: 'Rasterize paint',
    /**
     *@description The action to scroll
     */
    scroll: 'Scroll',
    /**
     *@description Noun for an event in the Performance panel. Commit is a step
     *where we send (also known as "commit") layers to the compositor thread. This
     *step follows the "Layerize" step which is what calculates which layers to
     *create.
     */
    commit: 'Commit',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    compositeLayers: 'Composite layers',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    computeIntersections: 'Compute intersections',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    parseHtml: 'Parse HTML',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    parseStylesheet: 'Parse stylesheet',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    installTimer: 'Install timer',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    removeTimer: 'Remove timer',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    timerFired: 'Timer fired',
    /**
     *@description Text for an event. Shown in the timeline in the Performance panel.
     * XHR refers to XmlHttpRequest, a Web API. This particular Web API has a property
     * named 'readyState' (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState). When
     * the 'readyState' property changes the text is shown.
     */
    xhrReadyStateChange: '`XHR` `readyState` change',
    /**
     * @description Text for an event. Shown in the timeline in the Perforamnce panel.
     * XHR refers to XmlHttpRequest, a Web API. (see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
     * The text is shown when a XmlHttpRequest load event happens on the inspected page.
     */
    xhrLoad: '`XHR` load',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    compileScript: 'Compile script',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    cacheScript: 'Cache script code',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    compileCode: 'Compile code',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    optimizeCode: 'Optimize code',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    evaluateScript: 'Evaluate script',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    compileModule: 'Compile module',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    cacheModule: 'Cache module code',
    /**
     * @description Text for an event. Shown in the timeline in the Perforamnce panel.
     * "Module" refers to JavaScript modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
     * JavaScript modules are a way to organize JavaScript code.
     * "Evaluate" is the phase when the JavaScript code of a module is executed.
     */
    evaluateModule: 'Evaluate module',
    /**
     *@description Noun indicating that a compile task (type: streaming) happened.
     */
    streamingCompileTask: 'Streaming compile task',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    waitingForNetwork: 'Waiting for network',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    parseAndCompile: 'Parse and compile',
    /**
     * @description Text in Timeline UIUtils of the Performance panel.
     * "Code Cache" refers to JavaScript bytecode cache: https://v8.dev/blog/code-caching-for-devs
     * "Deserialize" refers to the process of reading the code cache.
     */
    deserializeCodeCache: 'Deserialize code cache',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    streamingWasmResponse: 'Streaming Wasm response',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    compiledWasmModule: 'Compiled Wasm module',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    cachedWasmModule: 'Cached Wasm module',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    wasmModuleCacheHit: 'Wasm module cache hit',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    wasmModuleCacheInvalid: 'Wasm module cache invalid',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    frameStartedLoading: 'Frame started loading',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    onloadEvent: 'Onload event',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    domcontentloadedEvent: 'DOMContentLoaded event',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    firstPaint: 'First Paint',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    firstContentfulPaint: 'First Contentful Paint',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    largestContentfulPaint: 'Largest Contentful Paint',
    /**
     *@description Text for timestamps of items
     */
    timestamp: 'Timestamp',
    /**
     *@description Noun for a 'time' event that happens in the Console (a tool in
     * DevTools). The user can trigger console time events from their code, and
     * they will show up in the Performance panel. Time events are used to measure
     * the duration of something, e.g. the user will emit two time events at the
     * start and end of some interesting task.
     */
    consoleTime: 'Console time',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    userTiming: 'User timing',
    /**
     * @description Name for an event shown in the Performance panel. When a network
     * request is about to be sent by the browser, the time is recorded and DevTools
     * is notified that a network request will be sent momentarily.
     */
    willSendRequest: 'Will send request',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    sendRequest: 'Send request',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    receiveResponse: 'Receive response',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    finishLoading: 'Finish loading',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    receiveData: 'Receive data',
    /**
     *@description Event category in the Performance panel for time spent to execute microtasks in JavaScript
     */
    runMicrotasks: 'Run microtasks',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    functionCall: 'Function call',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    gcEvent: 'GC event',
    /**
     *@description Event category in the Performance panel for time spent to perform a full Garbage Collection pass
     */
    majorGc: 'Major GC',
    /**
     *@description Event category in the Performance panel for time spent to perform a quick Garbage Collection pass
     */
    minorGc: 'Minor GC',
    /**
     *@description Text for the request animation frame event
     */
    requestAnimationFrame: 'Request animation frame',
    /**
     *@description Text to cancel the animation frame
     */
    cancelAnimationFrame: 'Cancel animation frame',
    /**
     *@description Text for the event that an animation frame is fired
     */
    animationFrameFired: 'Animation frame fired',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    requestIdleCallback: 'Request idle callback',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    cancelIdleCallback: 'Cancel idle callback',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    fireIdleCallback: 'Fire idle callback',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    createWebsocket: 'Create WebSocket',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    sendWebsocketHandshake: 'Send WebSocket handshake',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    receiveWebsocketHandshake: 'Receive WebSocket handshake',
    /**
     *@description Text in Timeline Flame Chart Data Provider of the Performance panel
     */
    wsMessageReceived: 'Receive WebSocket message',
    /**
     *@description Text in Timeline Flame Chart Data Provider of the Performance panel
     */
    wsMessageSent: 'Send WebSocket message',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    destroyWebsocket: 'Destroy WebSocket',
    /**
     *@description Event category in the Performance panel for time spent in the embedder of the WebView
     */
    embedderCallback: 'Embedder callback',
    /**
     *@description Event category in the Performance panel for time spent decoding an image
     */
    imageDecode: 'Image decode',
    /**
     *@description Event category in the Performance panel for time spent to perform Garbage Collection for the Document Object Model
     */
    domGc: 'DOM GC',
    /**
     *@description Event category in the Performance panel for time spent to perform Garbage Collection for C++: https://chromium.googlesource.com/v8/v8/+/main/include/cppgc/README.md
     */
    cppGc: 'CPP GC',
    /**
     *@description Event category in the Performance panel for time spent to perform encryption
     */
    encrypt: 'Encrypt',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    encryptReply: 'Encrypt reply',
    /**
     *@description Event category in the Performance panel for time spent to perform decryption
     */
    decrypt: 'Decrypt',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    decryptReply: 'Decrypt reply',
    /**
     * @description Noun phrase meaning 'the browser was preparing the digest'.
     * Digest: https://developer.mozilla.org/en-US/docs/Glossary/Digest
     */
    digest: 'Digest',
    /**
     *@description Noun phrase meaning 'the browser was preparing the digest
     *reply'. Digest: https://developer.mozilla.org/en-US/docs/Glossary/Digest
     */
    digestReply: 'Digest reply',
    /**
     *@description The 'sign' stage of a web crypto event. Shown when displaying what the website was doing at a particular point in time.
     */
    sign: 'Sign',
    /**
     * @description Noun phrase for an event of the Web Crypto API. The event is recorded when the signing process is concluded.
     * Signature: https://developer.mozilla.org/en-US/docs/Glossary/Signature/Security
     */
    signReply: 'Sign reply',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    verify: 'Verify',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    verifyReply: 'Verify reply',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    asyncTask: 'Async task',
    /**
     *@description Text in Timeline for Layout Shift records
     */
    layoutShift: 'Layout shift',
    /**
     *@description Text in Timeline for Layout Shift records
     */
    layoutShiftCluster: 'Layout shift cluster',
    /**
     *@description Text in Timeline for an Event Timing record
     */
    eventTiming: 'Event timing',
    /**
     *@description Event category in the Performance panel for JavaScript nodes in CPUProfile
     */
    jsFrame: 'JS frame',
    /**
     *@description Text in UIDevtools Utils of the Performance panel
     */
    rasterizing: 'Rasterizing',
    /**
     *@description Text in UIDevtools Utils of the Performance panel
     */
    drawing: 'Drawing',
};
export var EventCategory;
(function (EventCategory) {
    EventCategory["DRAWING"] = "drawing";
    EventCategory["RASTERIZING"] = "rasterizing";
    EventCategory["LAYOUT"] = "layout";
    EventCategory["LOADING"] = "loading";
    EventCategory["EXPERIENCE"] = "experience";
    EventCategory["SCRIPTING"] = "scripting";
    EventCategory["MESSAGING"] = "messaging";
    EventCategory["RENDERING"] = "rendering";
    EventCategory["PAINTING"] = "painting";
    EventCategory["GPU"] = "gpu";
    EventCategory["ASYNC"] = "async";
    EventCategory["OTHER"] = "other";
    EventCategory["IDLE"] = "idle";
})(EventCategory || (EventCategory = {}));
let mainEventCategories;
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/EntryStyles.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class TimelineRecordStyle {
    title;
    category;
    hidden;
    constructor(title, category, hidden = false) {
        this.title = title;
        this.category = category;
        this.hidden = hidden;
    }
}
export class TimelineCategory {
    name;
    title;
    visible;
    childColor;
    colorInternal;
    #hidden;
    constructor(name, title, visible, childColor, color) {
        this.name = name;
        this.title = title;
        this.visible = visible;
        this.childColor = childColor;
        this.colorInternal = color;
        this.hidden = false;
    }
    get hidden() {
        return Boolean(this.#hidden);
    }
    get color() {
        return this.getComputedColorValue();
    }
    getCSSValue() {
        return `var(${this.colorInternal})`;
    }
    getComputedColorValue() {
        return ThemeSupport.ThemeSupport.instance().getComputedValue(this.colorInternal);
    }
    set hidden(hidden) {
        this.#hidden = hidden;
    }
}
/**
 * This object defines the styles for the categories used in the
 * timeline (loading, rendering, scripting, etc.).
 */
let categoryStyles;
/**
 * This map defines the styles for events shown in the panel. This
 * includes its color (which on the event's category, the label it's
 * displayed with and flag to know wether it's visible in the flamechart
 * or not).
 * The thread appenders use this map to determine if an event should be
 * shown in the flame chart. If an event is not in the map, then it
 * won't be shown, but it also won't be shown if it's marked as "hidden"
 * in its styles.
 *
 * The map is also used in other places, like the event's details view.
 */
let eventStylesMap;
export function getEventStyle(eventName) {
    return maybeInitSylesMap()[eventName];
}
export function stringIsEventCategory(it) {
    return Object.values(EventCategory).includes(it);
}
export function getCategoryStyles() {
    if (categoryStyles) {
        return categoryStyles;
    }
    categoryStyles = {
        loading: new TimelineCategory(EventCategory.LOADING, i18nString(UIStrings.loading), true, '--app-color-loading-children', '--app-color-loading'),
        experience: new TimelineCategory(EventCategory.EXPERIENCE, i18nString(UIStrings.experience), false, '--app-color-rendering-children', '--app-color-rendering'),
        messaging: new TimelineCategory(EventCategory.MESSAGING, i18nString(UIStrings.messaging), true, '--app-color-messaging-children', '--app-color-messaging'),
        scripting: new TimelineCategory(EventCategory.SCRIPTING, i18nString(UIStrings.scripting), true, '--app-color-scripting-children', '--app-color-scripting'),
        rendering: new TimelineCategory(EventCategory.RENDERING, i18nString(UIStrings.rendering), true, '--app-color-rendering-children', '--app-color-rendering'),
        painting: new TimelineCategory(EventCategory.PAINTING, i18nString(UIStrings.painting), true, '--app-color-painting-children', '--app-color-painting'),
        gpu: new TimelineCategory(EventCategory.GPU, i18nString(UIStrings.gpu), false, '--app-color-painting-children', '--app-color-painting'),
        async: new TimelineCategory(EventCategory.ASYNC, i18nString(UIStrings.async), false, '--app-color-async-children', '--app-color-async'),
        other: new TimelineCategory(EventCategory.OTHER, i18nString(UIStrings.system), false, '--app-color-system-children', '--app-color-system'),
        idle: new TimelineCategory(EventCategory.IDLE, i18nString(UIStrings.idle), false, '--app-color-idle-children', '--app-color-idle'),
        layout: new TimelineCategory(EventCategory.LAYOUT, i18nString(UIStrings.layout), false, '--app-color-loading-children', '--app-color-loading'),
        rasterizing: new TimelineCategory(EventCategory.RASTERIZING, i18nString(UIStrings.rasterizing), false, '--app-color-children', '--app-color-scripting'),
        drawing: new TimelineCategory(EventCategory.DRAWING, i18nString(UIStrings.drawing), false, '--app-color-rendering-children', '--app-color-rendering'),
    };
    return categoryStyles;
}
export function maybeInitSylesMap() {
    if (eventStylesMap) {
        return eventStylesMap;
    }
    const defaultCategoryStyles = getCategoryStyles();
    eventStylesMap = {
        ["RunTask" /* TraceEngine.Types.TraceEvents.KnownEventName.RUN_TASK */]: new TimelineRecordStyle(i18nString(UIStrings.task), defaultCategoryStyles.other),
        ["ProfileCall" /* TraceEngine.Types.TraceEvents.KnownEventName.PROFILE_CALL */]: new TimelineRecordStyle(i18nString(UIStrings.jsFrame), defaultCategoryStyles.scripting),
        ["JSSample" /* TraceEngine.Types.TraceEvents.KnownEventName.JS_SAMPLE */]: new TimelineRecordStyle("JSSample" /* TraceEngine.Types.TraceEvents.KnownEventName.JS_SAMPLE */, defaultCategoryStyles.scripting),
        ["Program" /* TraceEngine.Types.TraceEvents.KnownEventName.PROGRAM */]: new TimelineRecordStyle(i18nString(UIStrings.other), defaultCategoryStyles.other),
        ["CpuProfiler::StartProfiling" /* TraceEngine.Types.TraceEvents.KnownEventName.START_PROFILING */]: new TimelineRecordStyle(i18nString(UIStrings.profilingOverhead), defaultCategoryStyles.other),
        ["Animation" /* TraceEngine.Types.TraceEvents.KnownEventName.ANIMATION */]: new TimelineRecordStyle(i18nString(UIStrings.animation), defaultCategoryStyles.rendering),
        ["EventDispatch" /* TraceEngine.Types.TraceEvents.KnownEventName.EVENT_DISPATCH */]: new TimelineRecordStyle(i18nString(UIStrings.event), defaultCategoryStyles.scripting),
        ["RequestMainThreadFrame" /* TraceEngine.Types.TraceEvents.KnownEventName.REQUEST_MAIN_THREAD_FRAME */]: new TimelineRecordStyle(i18nString(UIStrings.requestMainThreadFrame), defaultCategoryStyles.rendering, true),
        ["BeginFrame" /* TraceEngine.Types.TraceEvents.KnownEventName.BEGIN_FRAME */]: new TimelineRecordStyle(i18nString(UIStrings.frameStart), defaultCategoryStyles.rendering, true),
        ["BeginMainThreadFrame" /* TraceEngine.Types.TraceEvents.KnownEventName.BEGIN_MAIN_THREAD_FRAME */]: new TimelineRecordStyle(i18nString(UIStrings.frameStartMainThread), defaultCategoryStyles.rendering, true),
        ["DrawFrame" /* TraceEngine.Types.TraceEvents.KnownEventName.DRAW_FRAME */]: new TimelineRecordStyle(i18nString(UIStrings.drawFrame), defaultCategoryStyles.rendering, true),
        ["HitTest" /* TraceEngine.Types.TraceEvents.KnownEventName.HIT_TEST */]: new TimelineRecordStyle(i18nString(UIStrings.hitTest), defaultCategoryStyles.rendering),
        ["ScheduleStyleRecalculation" /* TraceEngine.Types.TraceEvents.KnownEventName.SCHEDULE_STYLE_RECALCULATION */]: new TimelineRecordStyle(i18nString(UIStrings.scheduleStyleRecalculation), defaultCategoryStyles.rendering),
        ["UpdateLayoutTree" /* TraceEngine.Types.TraceEvents.KnownEventName.UPDATE_LAYOUT_TREE */]: new TimelineRecordStyle(i18nString(UIStrings.recalculateStyle), defaultCategoryStyles.rendering),
        ["InvalidateLayout" /* TraceEngine.Types.TraceEvents.KnownEventName.INVALIDATE_LAYOUT */]: new TimelineRecordStyle(i18nString(UIStrings.invalidateLayout), defaultCategoryStyles.rendering, true),
        ["Layerize" /* TraceEngine.Types.TraceEvents.KnownEventName.LAYERIZE */]: new TimelineRecordStyle(i18nString(UIStrings.layerize), defaultCategoryStyles.rendering),
        ["Layout" /* TraceEngine.Types.TraceEvents.KnownEventName.LAYOUT */]: new TimelineRecordStyle(i18nString(UIStrings.layout), defaultCategoryStyles.rendering),
        ["PaintSetup" /* TraceEngine.Types.TraceEvents.KnownEventName.PAINT_SETUP */]: new TimelineRecordStyle(i18nString(UIStrings.paintSetup), defaultCategoryStyles.painting),
        ["PaintImage" /* TraceEngine.Types.TraceEvents.KnownEventName.PAINT_IMAGE */]: new TimelineRecordStyle(i18nString(UIStrings.paintImage), defaultCategoryStyles.painting, true),
        ["UpdateLayer" /* TraceEngine.Types.TraceEvents.KnownEventName.UPDATE_LAYER */]: new TimelineRecordStyle(i18nString(UIStrings.updateLayer), defaultCategoryStyles.painting, true),
        ["UpdateLayerTree" /* TraceEngine.Types.TraceEvents.KnownEventName.UPDATE_LAYER_TREE */]: new TimelineRecordStyle(i18nString(UIStrings.updateLayerTree), defaultCategoryStyles.rendering),
        ["Paint" /* TraceEngine.Types.TraceEvents.KnownEventName.PAINT */]: new TimelineRecordStyle(i18nString(UIStrings.paint), defaultCategoryStyles.painting),
        ["PrePaint" /* TraceEngine.Types.TraceEvents.KnownEventName.PRE_PAINT */]: new TimelineRecordStyle(i18nString(UIStrings.prePaint), defaultCategoryStyles.rendering),
        ["RasterTask" /* TraceEngine.Types.TraceEvents.KnownEventName.RASTER_TASK */]: new TimelineRecordStyle(i18nString(UIStrings.rasterizePaint), defaultCategoryStyles.painting),
        ["ScrollLayer" /* TraceEngine.Types.TraceEvents.KnownEventName.SCROLL_LAYER */]: new TimelineRecordStyle(i18nString(UIStrings.scroll), defaultCategoryStyles.rendering),
        ["Commit" /* TraceEngine.Types.TraceEvents.KnownEventName.COMMIT */]: new TimelineRecordStyle(i18nString(UIStrings.commit), defaultCategoryStyles.painting),
        ["CompositeLayers" /* TraceEngine.Types.TraceEvents.KnownEventName.COMPOSITE_LAYERS */]: new TimelineRecordStyle(i18nString(UIStrings.compositeLayers), defaultCategoryStyles.painting),
        ["ComputeIntersections" /* TraceEngine.Types.TraceEvents.KnownEventName.COMPUTE_INTERSECTION */]: new TimelineRecordStyle(i18nString(UIStrings.computeIntersections), defaultCategoryStyles.rendering),
        ["ParseHTML" /* TraceEngine.Types.TraceEvents.KnownEventName.PARSE_HTML */]: new TimelineRecordStyle(i18nString(UIStrings.parseHtml), defaultCategoryStyles.loading),
        ["ParseAuthorStyleSheet" /* TraceEngine.Types.TraceEvents.KnownEventName.PARSE_AUTHOR_STYLE_SHEET */]: new TimelineRecordStyle(i18nString(UIStrings.parseStylesheet), defaultCategoryStyles.loading),
        ["TimerInstall" /* TraceEngine.Types.TraceEvents.KnownEventName.TIMER_INSTALL */]: new TimelineRecordStyle(i18nString(UIStrings.installTimer), defaultCategoryStyles.scripting),
        ["TimerRemove" /* TraceEngine.Types.TraceEvents.KnownEventName.TIMER_REMOVE */]: new TimelineRecordStyle(i18nString(UIStrings.removeTimer), defaultCategoryStyles.scripting),
        ["TimerFire" /* TraceEngine.Types.TraceEvents.KnownEventName.TIMER_FIRE */]: new TimelineRecordStyle(i18nString(UIStrings.timerFired), defaultCategoryStyles.scripting),
        ["XHRReadyStateChange" /* TraceEngine.Types.TraceEvents.KnownEventName.XHR_READY_STATE_CHANGED */]: new TimelineRecordStyle(i18nString(UIStrings.xhrReadyStateChange), defaultCategoryStyles.scripting),
        ["XHRLoad" /* TraceEngine.Types.TraceEvents.KnownEventName.XHR_LOAD */]: new TimelineRecordStyle(i18nString(UIStrings.xhrLoad), defaultCategoryStyles.scripting),
        ["v8.compile" /* TraceEngine.Types.TraceEvents.KnownEventName.COMPILE */]: new TimelineRecordStyle(i18nString(UIStrings.compileScript), defaultCategoryStyles.scripting),
        ["v8.produceCache" /* TraceEngine.Types.TraceEvents.KnownEventName.CACHE_SCRIPT */]: new TimelineRecordStyle(i18nString(UIStrings.cacheScript), defaultCategoryStyles.scripting),
        ["V8.CompileCode" /* TraceEngine.Types.TraceEvents.KnownEventName.COMPILE_CODE */]: new TimelineRecordStyle(i18nString(UIStrings.compileCode), defaultCategoryStyles.scripting),
        ["V8.OptimizeCode" /* TraceEngine.Types.TraceEvents.KnownEventName.OPTIMIZE_CODE */]: new TimelineRecordStyle(i18nString(UIStrings.optimizeCode), defaultCategoryStyles.scripting),
        ["EvaluateScript" /* TraceEngine.Types.TraceEvents.KnownEventName.EVALUATE_SCRIPT */]: new TimelineRecordStyle(i18nString(UIStrings.evaluateScript), defaultCategoryStyles.scripting),
        ["V8.CompileModule" /* TraceEngine.Types.TraceEvents.KnownEventName.COMPILE_MODULE */]: new TimelineRecordStyle(i18nString(UIStrings.compileModule), defaultCategoryStyles.scripting),
        ["v8.produceModuleCache" /* TraceEngine.Types.TraceEvents.KnownEventName.CACHE_MODULE */]: new TimelineRecordStyle(i18nString(UIStrings.cacheModule), defaultCategoryStyles.scripting),
        ["v8.evaluateModule" /* TraceEngine.Types.TraceEvents.KnownEventName.EVALUATE_MODULE */]: new TimelineRecordStyle(i18nString(UIStrings.evaluateModule), defaultCategoryStyles.scripting),
        ["v8.parseOnBackground" /* TraceEngine.Types.TraceEvents.KnownEventName.STREAMING_COMPILE_SCRIPT */]: new TimelineRecordStyle(i18nString(UIStrings.streamingCompileTask), defaultCategoryStyles.other),
        ["v8.parseOnBackgroundWaiting" /* TraceEngine.Types.TraceEvents.KnownEventName.STREAMING_COMPILE_SCRIPT_WAITING */]: new TimelineRecordStyle(i18nString(UIStrings.waitingForNetwork), defaultCategoryStyles.idle),
        ["v8.parseOnBackgroundParsing" /* TraceEngine.Types.TraceEvents.KnownEventName.STREAMING_COMPILE_SCRIPT_PARSING */]: new TimelineRecordStyle(i18nString(UIStrings.parseAndCompile), defaultCategoryStyles.scripting),
        ["v8.deserializeOnBackground" /* TraceEngine.Types.TraceEvents.KnownEventName.BACKGROUND_DESERIALIZE */]: new TimelineRecordStyle(i18nString(UIStrings.deserializeCodeCache), defaultCategoryStyles.scripting),
        ["V8.FinalizeDeserialization" /* TraceEngine.Types.TraceEvents.KnownEventName.FINALIZE_DESERIALIZATION */]: new TimelineRecordStyle(i18nString(UIStrings.profilingOverhead), defaultCategoryStyles.other),
        ["v8.wasm.streamFromResponseCallback" /* TraceEngine.Types.TraceEvents.KnownEventName.WASM_STREAM_FROM_RESPONSE_CALLBACK */]: new TimelineRecordStyle(i18nString(UIStrings.streamingWasmResponse), defaultCategoryStyles.scripting),
        ["v8.wasm.compiledModule" /* TraceEngine.Types.TraceEvents.KnownEventName.WASM_COMPILED_MODULE */]: new TimelineRecordStyle(i18nString(UIStrings.compiledWasmModule), defaultCategoryStyles.scripting),
        ["v8.wasm.cachedModule" /* TraceEngine.Types.TraceEvents.KnownEventName.WASM_CACHED_MODULE */]: new TimelineRecordStyle(i18nString(UIStrings.cachedWasmModule), defaultCategoryStyles.scripting),
        ["v8.wasm.moduleCacheHit" /* TraceEngine.Types.TraceEvents.KnownEventName.WASM_MODULE_CACHE_HIT */]: new TimelineRecordStyle(i18nString(UIStrings.wasmModuleCacheHit), defaultCategoryStyles.scripting),
        ["v8.wasm.moduleCacheInvalid" /* TraceEngine.Types.TraceEvents.KnownEventName.WASM_MODULE_CACHE_INVALID */]: new TimelineRecordStyle(i18nString(UIStrings.wasmModuleCacheInvalid), defaultCategoryStyles.scripting),
        ["FrameStartedLoading" /* TraceEngine.Types.TraceEvents.KnownEventName.FRAME_STARTED_LOADING */]: new TimelineRecordStyle(i18nString(UIStrings.frameStartedLoading), defaultCategoryStyles.loading, true),
        ["MarkLoad" /* TraceEngine.Types.TraceEvents.KnownEventName.MARK_LOAD */]: new TimelineRecordStyle(i18nString(UIStrings.onloadEvent), defaultCategoryStyles.scripting, true),
        ["MarkDOMContent" /* TraceEngine.Types.TraceEvents.KnownEventName.MARK_DOM_CONTENT */]: new TimelineRecordStyle(i18nString(UIStrings.domcontentloadedEvent), defaultCategoryStyles.scripting, true),
        ["firstPaint" /* TraceEngine.Types.TraceEvents.KnownEventName.MARK_FIRST_PAINT */]: new TimelineRecordStyle(i18nString(UIStrings.firstPaint), defaultCategoryStyles.painting, true),
        ["firstContentfulPaint" /* TraceEngine.Types.TraceEvents.KnownEventName.MARK_FCP */]: new TimelineRecordStyle(i18nString(UIStrings.firstContentfulPaint), defaultCategoryStyles.rendering, true),
        ["largestContentfulPaint::Candidate" /* TraceEngine.Types.TraceEvents.KnownEventName.MARK_LCP_CANDIDATE */]: new TimelineRecordStyle(i18nString(UIStrings.largestContentfulPaint), defaultCategoryStyles.rendering, true),
        ["TimeStamp" /* TraceEngine.Types.TraceEvents.KnownEventName.TIME_STAMP */]: new TimelineRecordStyle(i18nString(UIStrings.timestamp), defaultCategoryStyles.scripting),
        ["ConsoleTime" /* TraceEngine.Types.TraceEvents.KnownEventName.CONSOLE_TIME */]: new TimelineRecordStyle(i18nString(UIStrings.consoleTime), defaultCategoryStyles.scripting),
        ["UserTiming" /* TraceEngine.Types.TraceEvents.KnownEventName.USER_TIMING */]: new TimelineRecordStyle(i18nString(UIStrings.userTiming), defaultCategoryStyles.scripting),
        ["ResourceWillSendRequest" /* TraceEngine.Types.TraceEvents.KnownEventName.RESOURCE_WILL_SEND_REQUEST */]: new TimelineRecordStyle(i18nString(UIStrings.willSendRequest), defaultCategoryStyles.loading),
        ["ResourceSendRequest" /* TraceEngine.Types.TraceEvents.KnownEventName.RESOURCE_SEND_REQUEST */]: new TimelineRecordStyle(i18nString(UIStrings.sendRequest), defaultCategoryStyles.loading),
        ["ResourceReceiveResponse" /* TraceEngine.Types.TraceEvents.KnownEventName.RESOURCE_RECEIVE_RESPONSE */]: new TimelineRecordStyle(i18nString(UIStrings.receiveResponse), defaultCategoryStyles.loading),
        ["ResourceFinish" /* TraceEngine.Types.TraceEvents.KnownEventName.RESOURCE_FINISH */]: new TimelineRecordStyle(i18nString(UIStrings.finishLoading), defaultCategoryStyles.loading),
        ["ResourceReceivedData" /* TraceEngine.Types.TraceEvents.KnownEventName.RESOURCE_RECEIVE_DATA */]: new TimelineRecordStyle(i18nString(UIStrings.receiveData), defaultCategoryStyles.loading),
        ["RunMicrotasks" /* TraceEngine.Types.TraceEvents.KnownEventName.RUN_MICROTASKS */]: new TimelineRecordStyle(i18nString(UIStrings.runMicrotasks), defaultCategoryStyles.scripting),
        ["FunctionCall" /* TraceEngine.Types.TraceEvents.KnownEventName.FUNCTION_CALL */]: new TimelineRecordStyle(i18nString(UIStrings.functionCall), defaultCategoryStyles.scripting),
        ["GCEvent" /* TraceEngine.Types.TraceEvents.KnownEventName.GC */]: new TimelineRecordStyle(i18nString(UIStrings.gcEvent), defaultCategoryStyles.scripting),
        ["MajorGC" /* TraceEngine.Types.TraceEvents.KnownEventName.MAJOR_GC */]: new TimelineRecordStyle(i18nString(UIStrings.majorGc), defaultCategoryStyles.scripting),
        ["MinorGC" /* TraceEngine.Types.TraceEvents.KnownEventName.MINOR_GC */]: new TimelineRecordStyle(i18nString(UIStrings.minorGc), defaultCategoryStyles.scripting),
        ["CppGC.IncrementalSweep" /* TraceEngine.Types.TraceEvents.KnownEventName.CPPGC_SWEEP */]: new TimelineRecordStyle(i18nString(UIStrings.cppGc), defaultCategoryStyles.scripting),
        ["RequestAnimationFrame" /* TraceEngine.Types.TraceEvents.KnownEventName.REQUEST_ANIMATION_FRAME */]: new TimelineRecordStyle(i18nString(UIStrings.requestAnimationFrame), defaultCategoryStyles.scripting),
        ["CancelAnimationFrame" /* TraceEngine.Types.TraceEvents.KnownEventName.CANCEL_ANIMATION_FRAME */]: new TimelineRecordStyle(i18nString(UIStrings.cancelAnimationFrame), defaultCategoryStyles.scripting),
        ["FireAnimationFrame" /* TraceEngine.Types.TraceEvents.KnownEventName.FIRE_ANIMATION_FRAME */]: new TimelineRecordStyle(i18nString(UIStrings.animationFrameFired), defaultCategoryStyles.scripting),
        ["RequestIdleCallback" /* TraceEngine.Types.TraceEvents.KnownEventName.REQUEST_IDLE_CALLBACK */]: new TimelineRecordStyle(i18nString(UIStrings.requestIdleCallback), defaultCategoryStyles.scripting),
        ["CancelIdleCallback" /* TraceEngine.Types.TraceEvents.KnownEventName.CANCEL_IDLE_CALLBACK */]: new TimelineRecordStyle(i18nString(UIStrings.cancelIdleCallback), defaultCategoryStyles.scripting),
        ["FireIdleCallback" /* TraceEngine.Types.TraceEvents.KnownEventName.FIRE_IDLE_CALLBACK */]: new TimelineRecordStyle(i18nString(UIStrings.fireIdleCallback), defaultCategoryStyles.scripting),
        ["WebSocketCreate" /* TraceEngine.Types.TraceEvents.KnownEventName.WEB_SOCKET_CREATE */]: new TimelineRecordStyle(i18nString(UIStrings.createWebsocket), defaultCategoryStyles.scripting),
        ["WebSocketSendHandshakeRequest" /* TraceEngine.Types.TraceEvents.KnownEventName.WEB_SOCKET_SEND_HANDSHAKE_REQUEST */]: new TimelineRecordStyle(i18nString(UIStrings.sendWebsocketHandshake), defaultCategoryStyles.scripting),
        ["WebSocketReceiveHandshakeResponse" /* TraceEngine.Types.TraceEvents.KnownEventName.WEB_SOCKET_RECEIVE_HANDSHAKE_REQUEST */]: new TimelineRecordStyle(i18nString(UIStrings.receiveWebsocketHandshake), defaultCategoryStyles.scripting),
        ["WebSocketDestroy" /* TraceEngine.Types.TraceEvents.KnownEventName.WEB_SOCKET_DESTROY */]: new TimelineRecordStyle(i18nString(UIStrings.destroyWebsocket), defaultCategoryStyles.scripting),
        ["WebSocketSend" /* TraceEngine.Types.TraceEvents.KnownEventName.WEB_SOCKET_SEND */]: new TimelineRecordStyle(i18nString(UIStrings.wsMessageSent), defaultCategoryStyles.scripting),
        ["WebSocketReceive" /* TraceEngine.Types.TraceEvents.KnownEventName.WEB_SOCKET_RECEIVE */]: new TimelineRecordStyle(i18nString(UIStrings.wsMessageReceived), defaultCategoryStyles.scripting),
        ["EmbedderCallback" /* TraceEngine.Types.TraceEvents.KnownEventName.EMBEDDER_CALLBACK */]: new TimelineRecordStyle(i18nString(UIStrings.embedderCallback), defaultCategoryStyles.scripting),
        ["Decode Image" /* TraceEngine.Types.TraceEvents.KnownEventName.DECODE_IMAGE */]: new TimelineRecordStyle(i18nString(UIStrings.imageDecode), defaultCategoryStyles.painting),
        ["GPUTask" /* TraceEngine.Types.TraceEvents.KnownEventName.GPU_TASK */]: new TimelineRecordStyle(i18nString(UIStrings.gpu), defaultCategoryStyles.gpu),
        ["BlinkGC.AtomicPhase" /* TraceEngine.Types.TraceEvents.KnownEventName.GC_COLLECT_GARBARGE */]: new TimelineRecordStyle(i18nString(UIStrings.domGc), defaultCategoryStyles.scripting),
        ["DoEncrypt" /* TraceEngine.Types.TraceEvents.KnownEventName.CRYPTO_DO_ENCRYPT */]: new TimelineRecordStyle(i18nString(UIStrings.encrypt), defaultCategoryStyles.scripting),
        ["DoEncryptReply" /* TraceEngine.Types.TraceEvents.KnownEventName.CRYPTO_DO_ENCRYPT_REPLY */]: new TimelineRecordStyle(i18nString(UIStrings.encryptReply), defaultCategoryStyles.scripting),
        ["DoDecrypt" /* TraceEngine.Types.TraceEvents.KnownEventName.CRYPTO_DO_DECRYPT */]: new TimelineRecordStyle(i18nString(UIStrings.decrypt), defaultCategoryStyles.scripting),
        ["DoDecryptReply" /* TraceEngine.Types.TraceEvents.KnownEventName.CRYPTO_DO_DECRYPT_REPLY */]: new TimelineRecordStyle(i18nString(UIStrings.decryptReply), defaultCategoryStyles.scripting),
        ["DoDigest" /* TraceEngine.Types.TraceEvents.KnownEventName.CRYPTO_DO_DIGEST */]: new TimelineRecordStyle(i18nString(UIStrings.digest), defaultCategoryStyles.scripting),
        ["DoDigestReply" /* TraceEngine.Types.TraceEvents.KnownEventName.CRYPTO_DO_DIGEST_REPLY */]: new TimelineRecordStyle(i18nString(UIStrings.digestReply), defaultCategoryStyles.scripting),
        ["DoSign" /* TraceEngine.Types.TraceEvents.KnownEventName.CRYPTO_DO_SIGN */]: new TimelineRecordStyle(i18nString(UIStrings.sign), defaultCategoryStyles.scripting),
        ["DoSignReply" /* TraceEngine.Types.TraceEvents.KnownEventName.CRYPTO_DO_SIGN_REPLY */]: new TimelineRecordStyle(i18nString(UIStrings.signReply), defaultCategoryStyles.scripting),
        ["DoVerify" /* TraceEngine.Types.TraceEvents.KnownEventName.CRYPTO_DO_VERIFY */]: new TimelineRecordStyle(i18nString(UIStrings.verify), defaultCategoryStyles.scripting),
        ["DoVerifyReply" /* TraceEngine.Types.TraceEvents.KnownEventName.CRYPTO_DO_VERIFY_REPLY */]: new TimelineRecordStyle(i18nString(UIStrings.verifyReply), defaultCategoryStyles.scripting),
        ["AsyncTask" /* TraceEngine.Types.TraceEvents.KnownEventName.ASYNC_TASK */]: new TimelineRecordStyle(i18nString(UIStrings.asyncTask), defaultCategoryStyles.async),
        ["LayoutShift" /* TraceEngine.Types.TraceEvents.KnownEventName.LAYOUT_SHIFT */]: new TimelineRecordStyle(i18nString(UIStrings.layoutShift), defaultCategoryStyles.experience),
        ["SyntheticLayoutShiftCluster" /* TraceEngine.Types.TraceEvents.KnownEventName.SYNTHETIC_LAYOUT_SHIFT_CLUSTER */]: new TimelineRecordStyle(i18nString(UIStrings.layoutShiftCluster), defaultCategoryStyles.experience),
        ["EventTiming" /* TraceEngine.Types.TraceEvents.KnownEventName.EVENT_TIMING */]: new TimelineRecordStyle(i18nString(UIStrings.eventTiming), defaultCategoryStyles.experience),
        ["HandlePostMessage" /* TraceEngine.Types.TraceEvents.KnownEventName.HANDLE_POST_MESSAGE */]: new TimelineRecordStyle(i18nString(UIStrings.onMessage), defaultCategoryStyles.messaging),
        ["SchedulePostMessage" /* TraceEngine.Types.TraceEvents.KnownEventName.SCHEDULE_POST_MESSAGE */]: new TimelineRecordStyle(i18nString(UIStrings.schedulePostMessage), defaultCategoryStyles.messaging),
    };
    return eventStylesMap;
}
export function setEventStylesMap(eventStyles) {
    eventStylesMap = eventStyles;
}
export function setCategories(cats) {
    categoryStyles = cats;
}
export function visibleTypes() {
    const eventStyles = maybeInitSylesMap();
    const result = [];
    for (const name in eventStyles) {
        // Typescript cannot infer that `name` is a key of eventStyles
        const nameAsKey = name;
        if (!eventStyles[nameAsKey]?.hidden) {
            result.push(name);
        }
    }
    return result;
}
export function getTimelineMainEventCategories() {
    if (mainEventCategories) {
        return mainEventCategories;
    }
    mainEventCategories = [
        EventCategory.IDLE,
        EventCategory.LOADING,
        EventCategory.PAINTING,
        EventCategory.RENDERING,
        EventCategory.SCRIPTING,
        EventCategory.OTHER,
    ];
    return mainEventCategories;
}
export function setTimelineMainEventCategories(categories) {
    mainEventCategories = categories;
}
//# sourceMappingURL=EntryStyles.js.map