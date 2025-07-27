var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/timeline/utils/AICallTree.js
var AICallTree_exports = {};
__export(AICallTree_exports, {
  AICallTree: () => AICallTree,
  ExcludeCompileCodeFilter: () => ExcludeCompileCodeFilter,
  MinDurationFilter: () => MinDurationFilter,
  SelectedEventDurationFilter: () => SelectedEventDurationFilter
});
import * as Root from "./../../../core/root/root.js";
import * as Trace4 from "./../../../models/trace/trace.js";

// gen/front_end/panels/timeline/utils/EntryName.js
var EntryName_exports = {};
__export(EntryName_exports, {
  nameForEntry: () => nameForEntry
});
import * as Common from "./../../../core/common/common.js";
import * as i18n3 from "./../../../core/i18n/i18n.js";
import * as Trace2 from "./../../../models/trace/trace.js";

// gen/front_end/panels/timeline/utils/EntryStyles.js
var EntryStyles_exports = {};
__export(EntryStyles_exports, {
  EventCategory: () => EventCategory,
  TimelineCategory: () => TimelineCategory,
  TimelineRecordStyle: () => TimelineRecordStyle,
  getCategoryStyles: () => getCategoryStyles,
  getEventStyle: () => getEventStyle,
  getTimelineMainEventCategories: () => getTimelineMainEventCategories,
  markerDetailsForEvent: () => markerDetailsForEvent,
  maybeInitSylesMap: () => maybeInitSylesMap,
  setCategories: () => setCategories,
  setEventStylesMap: () => setEventStylesMap,
  setTimelineMainEventCategories: () => setTimelineMainEventCategories,
  stringIsEventCategory: () => stringIsEventCategory,
  visibleTypes: () => visibleTypes
});
import * as i18n from "./../../../core/i18n/i18n.js";
import * as Trace from "./../../../models/trace/trace.js";
import * as ThemeSupport from "./../../../ui/legacy/theme_support/theme_support.js";
var UIStrings = {
  /**
   *@description Category in the Summary view of the Performance panel to indicate time spent to load resources
   */
  loading: "Loading",
  /**
   *@description Text in Timeline for the Experience title
   */
  experience: "Experience",
  /**
   *@description Category in the Summary view of the Performance panel to indicate time spent in script execution
   */
  scripting: "Scripting",
  /**
   *@description Category in the Summary view of the Performance panel to indicate time spent in rendering the web page
   */
  rendering: "Rendering",
  /**
   *@description Category in the Summary view of the Performance panel to indicate time spent to visually represent the web page
   */
  painting: "Painting",
  /**
   *@description Event category in the Performance panel for time spent in the GPU
   */
  gpu: "GPU",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  async: "Async",
  /**
   *@description Category in the Summary view of the Performance panel to indicate time spent in the rest of the system
   */
  system: "System",
  /**
   *@description Category in the Summary view of the Performance panel to indicate idle time
   */
  idle: "Idle",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  task: "Task",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  consoleTaskRun: "Run console task",
  /**
   *@description Text for other types of items
   */
  other: "Other",
  /**
   *@description Text that refers to the animation of the web page
   */
  animation: "Animation",
  /**
   *@description Text that refers to some events
   */
  event: "Event",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  requestMainThreadFrame: "Request main thread frame",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  frameStart: "Frame start",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  onMessage: "On message",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  schedulePostMessage: "Schedule postMessage",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  messaging: "Messaging",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  frameStartMainThread: "Frame start (main thread)",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  drawFrame: "Draw frame",
  /**
   *@description Noun for an event in the Performance panel. This marks time
    spent in an operation that only happens when the profiler is active.
   */
  profilingOverhead: "Profiling overhead",
  /**
   *@description The process the browser uses to determine a target element for a
   *pointer event. Typically, this is determined by considering the pointer's
   *location and also the visual layout of elements on the screen.
   */
  hitTest: "Hit test",
  /**
   *@description Noun for an event in the Performance panel. The browser has decided
   *that the styles for some elements need to be recalculated and scheduled that
   *recalculation process at some time in the future.
   */
  scheduleStyleRecalculation: "Schedule style recalculation",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  recalculateStyle: "Recalculate style",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  invalidateLayout: "Invalidate Layout",
  /**
   *@description Noun for an event in the Performance panel. Layerize is a step
   *where we calculate which layers to create.
   */
  layerize: "Layerize",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  layout: "Layout",
  /**
   *@description Noun for an event in the Performance panel. Paint setup is a
   *step before the 'Paint' event. A paint event is when the browser draws pixels
   *to the screen. This step is the setup beforehand.
   */
  paintSetup: "Paint setup",
  /**
   *@description Noun for a paint event in the Performance panel, where an image
   *was being painted. A paint event is when the browser draws pixels to the
   *screen, in this case specifically for an image in a website.
   */
  paintImage: "Paint image",
  /**
   *@description Noun for an event in the Performance panel. Pre-paint is a
   *step before the 'Paint' event. A paint event is when the browser records the
   *instructions for drawing the page. This step is the setup beforehand.
   */
  prePaint: "Pre-paint",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  updateLayer: "Update layer",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  updateLayerTree: "Update layer tree",
  /**
   *@description Noun for a paint event in the Performance panel. A paint event is when the browser draws pixels to the screen.
   */
  paint: "Paint",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  rasterizePaint: "Rasterize paint",
  /**
   *@description The action to scroll
   */
  scroll: "Scroll",
  /**
   *@description Noun for an event in the Performance panel. Commit is a step
   *where we send (also known as "commit") layers to the compositor thread. This
   *step follows the "Layerize" step which is what calculates which layers to
   *create.
   */
  commit: "Commit",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  compositeLayers: "Composite layers",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  computeIntersections: "Compute intersections",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  parseHtml: "Parse HTML",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  parseStylesheet: "Parse stylesheet",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  installTimer: "Install timer",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  removeTimer: "Remove timer",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  timerFired: "Timer fired",
  /**
   *@description Text for an event. Shown in the timeline in the Performance panel.
   * XHR refers to XmlHttpRequest, a Web API. This particular Web API has a property
   * named 'readyState' (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState). When
   * the 'readyState' property changes the text is shown.
   */
  xhrReadyStateChange: "`XHR` `readyState` change",
  /**
   * @description Text for an event. Shown in the timeline in the Performance panel.
   * XHR refers to XmlHttpRequest, a Web API. (see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
   * The text is shown when a XmlHttpRequest load event happens on the inspected page.
   */
  xhrLoad: "`XHR` load",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  compileScript: "Compile script",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  cacheScript: "Cache script code",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  compileCode: "Compile code",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  optimizeCode: "Optimize code",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  evaluateScript: "Evaluate script",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  compileModule: "Compile module",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  cacheModule: "Cache module code",
  /**
   * @description Text for an event. Shown in the timeline in the Performance panel.
   * "Module" refers to JavaScript modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
   * JavaScript modules are a way to organize JavaScript code.
   * "Evaluate" is the phase when the JavaScript code of a module is executed.
   */
  evaluateModule: "Evaluate module",
  /**
   *@description Noun indicating that a compile task (type: streaming) happened.
   */
  streamingCompileTask: "Streaming compile task",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  waitingForNetwork: "Waiting for network",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  parseAndCompile: "Parse and compile",
  /**
   * @description Text in Timeline UIUtils of the Performance panel.
   * "Code Cache" refers to JavaScript bytecode cache: https://v8.dev/blog/code-caching-for-devs
   * "Deserialize" refers to the process of reading the code cache.
   */
  deserializeCodeCache: "Deserialize code cache",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  streamingWasmResponse: "Streaming Wasm response",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  compiledWasmModule: "Compiled Wasm module",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  cachedWasmModule: "Cached Wasm module",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  wasmModuleCacheHit: "Wasm module cache hit",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  wasmModuleCacheInvalid: "Wasm module cache invalid",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  frameStartedLoading: "Frame started loading",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  onloadEvent: "Onload event",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  domcontentloadedEvent: "DOMContentLoaded event",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  firstPaint: "First Paint",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  firstContentfulPaint: "First Contentful Paint",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  largestContentfulPaint: "Largest Contentful Paint",
  /**
   *@description Text for timestamps of items
   */
  timestamp: "Timestamp",
  /**
   *@description Noun for a 'time' event that happens in the Console (a tool in
   * DevTools). The user can trigger console time events from their code, and
   * they will show up in the Performance panel. Time events are used to measure
   * the duration of something, e.g. the user will emit two time events at the
   * start and end of some interesting task.
   */
  consoleTime: "Console time",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  userTiming: "User timing",
  /**
   * @description Name for an event shown in the Performance panel. When a network
   * request is about to be sent by the browser, the time is recorded and DevTools
   * is notified that a network request will be sent momentarily.
   */
  willSendRequest: "Will send request",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  sendRequest: "Send request",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  receiveResponse: "Receive response",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  finishLoading: "Finish loading",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  receiveData: "Receive data",
  /**
   *@description Event category in the Performance panel for time spent to execute microtasks in JavaScript
   */
  runMicrotasks: "Run microtasks",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  functionCall: "Function call",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  gcEvent: "GC event",
  /**
   *@description Event category in the Performance panel for time spent to perform a full Garbage Collection pass
   */
  majorGc: "Major GC",
  /**
   *@description Event category in the Performance panel for time spent to perform a quick Garbage Collection pass
   */
  minorGc: "Minor GC",
  /**
   *@description Text for the request animation frame event
   */
  requestAnimationFrame: "Request animation frame",
  /**
   *@description Text to cancel the animation frame
   */
  cancelAnimationFrame: "Cancel animation frame",
  /**
   *@description Text for the event that an animation frame is fired
   */
  animationFrameFired: "Animation frame fired",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  requestIdleCallback: "Request idle callback",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  cancelIdleCallback: "Cancel idle callback",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  fireIdleCallback: "Fire idle callback",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  createWebsocket: "Create WebSocket",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  sendWebsocketHandshake: "Send WebSocket handshake",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  receiveWebsocketHandshake: "Receive WebSocket handshake",
  /**
   *@description Text in Timeline Flame Chart Data Provider of the Performance panel
   */
  wsMessageReceived: "Receive WebSocket message",
  /**
   *@description Text in Timeline Flame Chart Data Provider of the Performance panel
   */
  wsMessageSent: "Send WebSocket message",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  destroyWebsocket: "Destroy WebSocket",
  /**
   *@description Event category in the Performance panel for time spent in the embedder of the WebView
   */
  embedderCallback: "Embedder callback",
  /**
   *@description Event category in the Performance panel for time spent decoding an image
   */
  imageDecode: "Image decode",
  /**
   *@description Event category in the Performance panel for time spent to perform Garbage Collection for the Document Object Model
   */
  domGc: "DOM GC",
  /**
   *@description Event category in the Performance panel for time spent to perform Garbage Collection for C++: https://chromium.googlesource.com/v8/v8/+/main/include/cppgc/README.md
   */
  cppGc: "CPP GC",
  /**
   *@description Event category in the Performance panel for time spent to perform encryption
   */
  encrypt: "Encrypt",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  encryptReply: "Encrypt reply",
  /**
   *@description Event category in the Performance panel for time spent to perform decryption
   */
  decrypt: "Decrypt",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  decryptReply: "Decrypt reply",
  /**
   * @description Noun phrase meaning 'the browser was preparing the digest'.
   * Digest: https://developer.mozilla.org/en-US/docs/Glossary/Digest
   */
  digest: "Digest",
  /**
   *@description Noun phrase meaning 'the browser was preparing the digest
   *reply'. Digest: https://developer.mozilla.org/en-US/docs/Glossary/Digest
   */
  digestReply: "Digest reply",
  /**
   *@description The 'sign' stage of a web crypto event. Shown when displaying what the website was doing at a particular point in time.
   */
  sign: "Sign",
  /**
   * @description Noun phrase for an event of the Web Crypto API. The event is recorded when the signing process is concluded.
   * Signature: https://developer.mozilla.org/en-US/docs/Glossary/Signature/Security
   */
  signReply: "Sign reply",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  verify: "Verify",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  verifyReply: "Verify reply",
  /**
   *@description Text in Timeline UIUtils of the Performance panel
   */
  asyncTask: "Async task",
  /**
   *@description Text in Timeline for Layout Shift records
   */
  layoutShift: "Layout shift",
  /**
   *@description Text in Timeline for Layout Shift records
   */
  layoutShiftCluster: "Layout shift cluster",
  /**
   *@description Text in Timeline for an Event Timing record
   */
  eventTiming: "Event timing",
  /**
   *@description Event category in the Performance panel for JavaScript nodes in CPUProfile
   */
  jsFrame: "JS frame",
  /**
   *@description Text in UIDevtools Utils of the Performance panel
   */
  rasterizing: "Rasterizing",
  /**
   *@description Text in UIDevtools Utils of the Performance panel
   */
  drawing: "Drawing",
  /**
   * @description Label for an event in the Performance panel indicating that a
   * callback function has been scheduled to run at a later time using the
   * postTask API.
   */
  schedulePostTaskCallback: "Schedule postTask",
  /**
   * @description Label for an event in the Performance panel indicating that a
   * callback function that was scheduled to run using the postTask API was
   * fired (invoked).
   */
  runPostTaskCallback: "Fire postTask",
  /**
   * @description Label for an event in the Performance panel indicating that a
   * callback function that was scheduled to run at a later time using the
   * postTask API was cancelled, so will no longer run.
   */
  abortPostTaskCallback: "Cancel postTask"
};
var EventCategory;
(function(EventCategory2) {
  EventCategory2["DRAWING"] = "drawing";
  EventCategory2["RASTERIZING"] = "rasterizing";
  EventCategory2["LAYOUT"] = "layout";
  EventCategory2["LOADING"] = "loading";
  EventCategory2["EXPERIENCE"] = "experience";
  EventCategory2["SCRIPTING"] = "scripting";
  EventCategory2["MESSAGING"] = "messaging";
  EventCategory2["RENDERING"] = "rendering";
  EventCategory2["PAINTING"] = "painting";
  EventCategory2["GPU"] = "gpu";
  EventCategory2["ASYNC"] = "async";
  EventCategory2["OTHER"] = "other";
  EventCategory2["IDLE"] = "idle";
})(EventCategory || (EventCategory = {}));
var mainEventCategories;
var str_ = i18n.i18n.registerUIStrings("panels/timeline/utils/EntryStyles.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var TimelineRecordStyle = class {
  title;
  category;
  hidden;
  constructor(title, category, hidden = false) {
    this.title = title;
    this.category = category;
    this.hidden = hidden;
  }
};
var TimelineCategory = class {
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
};
var categoryStyles;
var eventStylesMap;
function getEventStyle(eventName) {
  return maybeInitSylesMap()[eventName];
}
function stringIsEventCategory(it) {
  return Object.values(EventCategory).includes(it);
}
function getCategoryStyles() {
  if (categoryStyles) {
    return categoryStyles;
  }
  categoryStyles = {
    loading: new TimelineCategory(EventCategory.LOADING, i18nString(UIStrings.loading), true, "--app-color-loading-children", "--app-color-loading"),
    experience: new TimelineCategory(EventCategory.EXPERIENCE, i18nString(UIStrings.experience), false, "--app-color-rendering-children", "--app-color-rendering"),
    messaging: new TimelineCategory(EventCategory.MESSAGING, i18nString(UIStrings.messaging), true, "--app-color-messaging-children", "--app-color-messaging"),
    scripting: new TimelineCategory(EventCategory.SCRIPTING, i18nString(UIStrings.scripting), true, "--app-color-scripting-children", "--app-color-scripting"),
    rendering: new TimelineCategory(EventCategory.RENDERING, i18nString(UIStrings.rendering), true, "--app-color-rendering-children", "--app-color-rendering"),
    painting: new TimelineCategory(EventCategory.PAINTING, i18nString(UIStrings.painting), true, "--app-color-painting-children", "--app-color-painting"),
    gpu: new TimelineCategory(EventCategory.GPU, i18nString(UIStrings.gpu), false, "--app-color-painting-children", "--app-color-painting"),
    async: new TimelineCategory(EventCategory.ASYNC, i18nString(UIStrings.async), false, "--app-color-async-children", "--app-color-async"),
    other: new TimelineCategory(EventCategory.OTHER, i18nString(UIStrings.system), false, "--app-color-system-children", "--app-color-system"),
    idle: new TimelineCategory(EventCategory.IDLE, i18nString(UIStrings.idle), false, "--app-color-idle-children", "--app-color-idle"),
    layout: new TimelineCategory(EventCategory.LAYOUT, i18nString(UIStrings.layout), false, "--app-color-loading-children", "--app-color-loading"),
    rasterizing: new TimelineCategory(EventCategory.RASTERIZING, i18nString(UIStrings.rasterizing), false, "--app-color-children", "--app-color-scripting"),
    drawing: new TimelineCategory(EventCategory.DRAWING, i18nString(UIStrings.drawing), false, "--app-color-rendering-children", "--app-color-rendering")
  };
  return categoryStyles;
}
function maybeInitSylesMap() {
  if (eventStylesMap) {
    return eventStylesMap;
  }
  const defaultCategoryStyles = getCategoryStyles();
  eventStylesMap = {
    [
      "RunTask"
      /* Trace.Types.Events.Name.RUN_TASK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.task), defaultCategoryStyles.other),
    [
      "ProfileCall"
      /* Trace.Types.Events.Name.PROFILE_CALL */
    ]: new TimelineRecordStyle(i18nString(UIStrings.jsFrame), defaultCategoryStyles.scripting),
    [
      "JSSample"
      /* Trace.Types.Events.Name.JS_SAMPLE */
    ]: new TimelineRecordStyle("JSSample", defaultCategoryStyles.scripting),
    [
      "Program"
      /* Trace.Types.Events.Name.PROGRAM */
    ]: new TimelineRecordStyle(i18nString(UIStrings.other), defaultCategoryStyles.other),
    [
      "CpuProfiler::StartProfiling"
      /* Trace.Types.Events.Name.START_PROFILING */
    ]: new TimelineRecordStyle(i18nString(UIStrings.profilingOverhead), defaultCategoryStyles.other),
    [
      "Animation"
      /* Trace.Types.Events.Name.ANIMATION */
    ]: new TimelineRecordStyle(i18nString(UIStrings.animation), defaultCategoryStyles.rendering),
    [
      "EventDispatch"
      /* Trace.Types.Events.Name.EVENT_DISPATCH */
    ]: new TimelineRecordStyle(i18nString(UIStrings.event), defaultCategoryStyles.scripting),
    [
      "RequestMainThreadFrame"
      /* Trace.Types.Events.Name.REQUEST_MAIN_THREAD_FRAME */
    ]: new TimelineRecordStyle(i18nString(UIStrings.requestMainThreadFrame), defaultCategoryStyles.rendering, true),
    [
      "BeginFrame"
      /* Trace.Types.Events.Name.BEGIN_FRAME */
    ]: new TimelineRecordStyle(i18nString(UIStrings.frameStart), defaultCategoryStyles.rendering, true),
    [
      "BeginMainThreadFrame"
      /* Trace.Types.Events.Name.BEGIN_MAIN_THREAD_FRAME */
    ]: new TimelineRecordStyle(i18nString(UIStrings.frameStartMainThread), defaultCategoryStyles.rendering, true),
    [
      "DrawFrame"
      /* Trace.Types.Events.Name.DRAW_FRAME */
    ]: new TimelineRecordStyle(i18nString(UIStrings.drawFrame), defaultCategoryStyles.rendering, true),
    [
      "HitTest"
      /* Trace.Types.Events.Name.HIT_TEST */
    ]: new TimelineRecordStyle(i18nString(UIStrings.hitTest), defaultCategoryStyles.rendering),
    [
      "ScheduleStyleRecalculation"
      /* Trace.Types.Events.Name.SCHEDULE_STYLE_RECALCULATION */
    ]: new TimelineRecordStyle(i18nString(UIStrings.scheduleStyleRecalculation), defaultCategoryStyles.rendering),
    [
      "UpdateLayoutTree"
      /* Trace.Types.Events.Name.UPDATE_LAYOUT_TREE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.recalculateStyle), defaultCategoryStyles.rendering),
    [
      "InvalidateLayout"
      /* Trace.Types.Events.Name.INVALIDATE_LAYOUT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.invalidateLayout), defaultCategoryStyles.rendering, true),
    [
      "Layerize"
      /* Trace.Types.Events.Name.LAYERIZE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.layerize), defaultCategoryStyles.rendering),
    [
      "Layout"
      /* Trace.Types.Events.Name.LAYOUT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.layout), defaultCategoryStyles.rendering),
    [
      "PaintSetup"
      /* Trace.Types.Events.Name.PAINT_SETUP */
    ]: new TimelineRecordStyle(i18nString(UIStrings.paintSetup), defaultCategoryStyles.painting),
    [
      "PaintImage"
      /* Trace.Types.Events.Name.PAINT_IMAGE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.paintImage), defaultCategoryStyles.painting, true),
    [
      "UpdateLayer"
      /* Trace.Types.Events.Name.UPDATE_LAYER */
    ]: new TimelineRecordStyle(i18nString(UIStrings.updateLayer), defaultCategoryStyles.painting, true),
    [
      "UpdateLayerTree"
      /* Trace.Types.Events.Name.UPDATE_LAYER_TREE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.updateLayerTree), defaultCategoryStyles.rendering),
    [
      "Paint"
      /* Trace.Types.Events.Name.PAINT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.paint), defaultCategoryStyles.painting),
    [
      "PrePaint"
      /* Trace.Types.Events.Name.PRE_PAINT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.prePaint), defaultCategoryStyles.rendering),
    [
      "RasterTask"
      /* Trace.Types.Events.Name.RASTER_TASK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.rasterizePaint), defaultCategoryStyles.painting),
    [
      "ScrollLayer"
      /* Trace.Types.Events.Name.SCROLL_LAYER */
    ]: new TimelineRecordStyle(i18nString(UIStrings.scroll), defaultCategoryStyles.rendering),
    [
      "Commit"
      /* Trace.Types.Events.Name.COMMIT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.commit), defaultCategoryStyles.painting),
    [
      "CompositeLayers"
      /* Trace.Types.Events.Name.COMPOSITE_LAYERS */
    ]: new TimelineRecordStyle(i18nString(UIStrings.compositeLayers), defaultCategoryStyles.painting),
    [
      "ComputeIntersections"
      /* Trace.Types.Events.Name.COMPUTE_INTERSECTION */
    ]: new TimelineRecordStyle(i18nString(UIStrings.computeIntersections), defaultCategoryStyles.rendering),
    [
      "ParseHTML"
      /* Trace.Types.Events.Name.PARSE_HTML */
    ]: new TimelineRecordStyle(i18nString(UIStrings.parseHtml), defaultCategoryStyles.loading),
    [
      "ParseAuthorStyleSheet"
      /* Trace.Types.Events.Name.PARSE_AUTHOR_STYLE_SHEET */
    ]: new TimelineRecordStyle(i18nString(UIStrings.parseStylesheet), defaultCategoryStyles.loading),
    [
      "TimerInstall"
      /* Trace.Types.Events.Name.TIMER_INSTALL */
    ]: new TimelineRecordStyle(i18nString(UIStrings.installTimer), defaultCategoryStyles.scripting),
    [
      "TimerRemove"
      /* Trace.Types.Events.Name.TIMER_REMOVE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.removeTimer), defaultCategoryStyles.scripting),
    [
      "TimerFire"
      /* Trace.Types.Events.Name.TIMER_FIRE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.timerFired), defaultCategoryStyles.scripting),
    [
      "XHRReadyStateChange"
      /* Trace.Types.Events.Name.XHR_READY_STATE_CHANGED */
    ]: new TimelineRecordStyle(i18nString(UIStrings.xhrReadyStateChange), defaultCategoryStyles.scripting),
    [
      "XHRLoad"
      /* Trace.Types.Events.Name.XHR_LOAD */
    ]: new TimelineRecordStyle(i18nString(UIStrings.xhrLoad), defaultCategoryStyles.scripting),
    [
      "v8.compile"
      /* Trace.Types.Events.Name.COMPILE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.compileScript), defaultCategoryStyles.scripting),
    [
      "v8.produceCache"
      /* Trace.Types.Events.Name.CACHE_SCRIPT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.cacheScript), defaultCategoryStyles.scripting),
    [
      "V8.CompileCode"
      /* Trace.Types.Events.Name.COMPILE_CODE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.compileCode), defaultCategoryStyles.scripting),
    [
      "V8.OptimizeCode"
      /* Trace.Types.Events.Name.OPTIMIZE_CODE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.optimizeCode), defaultCategoryStyles.scripting),
    [
      "EvaluateScript"
      /* Trace.Types.Events.Name.EVALUATE_SCRIPT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.evaluateScript), defaultCategoryStyles.scripting),
    [
      "V8.CompileModule"
      /* Trace.Types.Events.Name.COMPILE_MODULE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.compileModule), defaultCategoryStyles.scripting),
    [
      "v8.produceModuleCache"
      /* Trace.Types.Events.Name.CACHE_MODULE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.cacheModule), defaultCategoryStyles.scripting),
    [
      "v8.evaluateModule"
      /* Trace.Types.Events.Name.EVALUATE_MODULE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.evaluateModule), defaultCategoryStyles.scripting),
    [
      "v8.parseOnBackground"
      /* Trace.Types.Events.Name.STREAMING_COMPILE_SCRIPT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.streamingCompileTask), defaultCategoryStyles.other),
    [
      "v8.parseOnBackgroundWaiting"
      /* Trace.Types.Events.Name.STREAMING_COMPILE_SCRIPT_WAITING */
    ]: new TimelineRecordStyle(i18nString(UIStrings.waitingForNetwork), defaultCategoryStyles.idle),
    [
      "v8.parseOnBackgroundParsing"
      /* Trace.Types.Events.Name.STREAMING_COMPILE_SCRIPT_PARSING */
    ]: new TimelineRecordStyle(i18nString(UIStrings.parseAndCompile), defaultCategoryStyles.scripting),
    [
      "v8.deserializeOnBackground"
      /* Trace.Types.Events.Name.BACKGROUND_DESERIALIZE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.deserializeCodeCache), defaultCategoryStyles.scripting),
    [
      "V8.FinalizeDeserialization"
      /* Trace.Types.Events.Name.FINALIZE_DESERIALIZATION */
    ]: new TimelineRecordStyle(i18nString(UIStrings.profilingOverhead), defaultCategoryStyles.other),
    [
      "v8.wasm.streamFromResponseCallback"
      /* Trace.Types.Events.Name.WASM_STREAM_FROM_RESPONSE_CALLBACK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.streamingWasmResponse), defaultCategoryStyles.scripting),
    [
      "v8.wasm.compiledModule"
      /* Trace.Types.Events.Name.WASM_COMPILED_MODULE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.compiledWasmModule), defaultCategoryStyles.scripting),
    [
      "v8.wasm.cachedModule"
      /* Trace.Types.Events.Name.WASM_CACHED_MODULE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.cachedWasmModule), defaultCategoryStyles.scripting),
    [
      "v8.wasm.moduleCacheHit"
      /* Trace.Types.Events.Name.WASM_MODULE_CACHE_HIT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.wasmModuleCacheHit), defaultCategoryStyles.scripting),
    [
      "v8.wasm.moduleCacheInvalid"
      /* Trace.Types.Events.Name.WASM_MODULE_CACHE_INVALID */
    ]: new TimelineRecordStyle(i18nString(UIStrings.wasmModuleCacheInvalid), defaultCategoryStyles.scripting),
    [
      "FrameStartedLoading"
      /* Trace.Types.Events.Name.FRAME_STARTED_LOADING */
    ]: new TimelineRecordStyle(i18nString(UIStrings.frameStartedLoading), defaultCategoryStyles.loading, true),
    [
      "MarkLoad"
      /* Trace.Types.Events.Name.MARK_LOAD */
    ]: new TimelineRecordStyle(i18nString(UIStrings.onloadEvent), defaultCategoryStyles.scripting, true),
    [
      "MarkDOMContent"
      /* Trace.Types.Events.Name.MARK_DOM_CONTENT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.domcontentloadedEvent), defaultCategoryStyles.scripting, true),
    [
      "firstPaint"
      /* Trace.Types.Events.Name.MARK_FIRST_PAINT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.firstPaint), defaultCategoryStyles.painting, true),
    [
      "firstContentfulPaint"
      /* Trace.Types.Events.Name.MARK_FCP */
    ]: new TimelineRecordStyle(i18nString(UIStrings.firstContentfulPaint), defaultCategoryStyles.rendering, true),
    [
      "largestContentfulPaint::Candidate"
      /* Trace.Types.Events.Name.MARK_LCP_CANDIDATE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.largestContentfulPaint), defaultCategoryStyles.rendering, true),
    [
      "TimeStamp"
      /* Trace.Types.Events.Name.TIME_STAMP */
    ]: new TimelineRecordStyle(i18nString(UIStrings.timestamp), defaultCategoryStyles.scripting),
    [
      "ConsoleTime"
      /* Trace.Types.Events.Name.CONSOLE_TIME */
    ]: new TimelineRecordStyle(i18nString(UIStrings.consoleTime), defaultCategoryStyles.scripting),
    [
      "UserTiming"
      /* Trace.Types.Events.Name.USER_TIMING */
    ]: new TimelineRecordStyle(i18nString(UIStrings.userTiming), defaultCategoryStyles.scripting),
    [
      "ResourceWillSendRequest"
      /* Trace.Types.Events.Name.RESOURCE_WILL_SEND_REQUEST */
    ]: new TimelineRecordStyle(i18nString(UIStrings.willSendRequest), defaultCategoryStyles.loading),
    [
      "ResourceSendRequest"
      /* Trace.Types.Events.Name.RESOURCE_SEND_REQUEST */
    ]: new TimelineRecordStyle(i18nString(UIStrings.sendRequest), defaultCategoryStyles.loading),
    [
      "ResourceReceiveResponse"
      /* Trace.Types.Events.Name.RESOURCE_RECEIVE_RESPONSE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.receiveResponse), defaultCategoryStyles.loading),
    [
      "ResourceFinish"
      /* Trace.Types.Events.Name.RESOURCE_FINISH */
    ]: new TimelineRecordStyle(i18nString(UIStrings.finishLoading), defaultCategoryStyles.loading),
    [
      "ResourceReceivedData"
      /* Trace.Types.Events.Name.RESOURCE_RECEIVE_DATA */
    ]: new TimelineRecordStyle(i18nString(UIStrings.receiveData), defaultCategoryStyles.loading),
    [
      "RunMicrotasks"
      /* Trace.Types.Events.Name.RUN_MICROTASKS */
    ]: new TimelineRecordStyle(i18nString(UIStrings.runMicrotasks), defaultCategoryStyles.scripting),
    [
      "FunctionCall"
      /* Trace.Types.Events.Name.FUNCTION_CALL */
    ]: new TimelineRecordStyle(i18nString(UIStrings.functionCall), defaultCategoryStyles.scripting),
    [
      "GCEvent"
      /* Trace.Types.Events.Name.GC */
    ]: new TimelineRecordStyle(i18nString(UIStrings.gcEvent), defaultCategoryStyles.scripting),
    [
      "MajorGC"
      /* Trace.Types.Events.Name.MAJOR_GC */
    ]: new TimelineRecordStyle(i18nString(UIStrings.majorGc), defaultCategoryStyles.scripting),
    [
      "MinorGC"
      /* Trace.Types.Events.Name.MINOR_GC */
    ]: new TimelineRecordStyle(i18nString(UIStrings.minorGc), defaultCategoryStyles.scripting),
    [
      "CppGC.IncrementalSweep"
      /* Trace.Types.Events.Name.CPPGC_SWEEP */
    ]: new TimelineRecordStyle(i18nString(UIStrings.cppGc), defaultCategoryStyles.scripting),
    [
      "RequestAnimationFrame"
      /* Trace.Types.Events.Name.REQUEST_ANIMATION_FRAME */
    ]: new TimelineRecordStyle(i18nString(UIStrings.requestAnimationFrame), defaultCategoryStyles.scripting),
    [
      "CancelAnimationFrame"
      /* Trace.Types.Events.Name.CANCEL_ANIMATION_FRAME */
    ]: new TimelineRecordStyle(i18nString(UIStrings.cancelAnimationFrame), defaultCategoryStyles.scripting),
    [
      "FireAnimationFrame"
      /* Trace.Types.Events.Name.FIRE_ANIMATION_FRAME */
    ]: new TimelineRecordStyle(i18nString(UIStrings.animationFrameFired), defaultCategoryStyles.scripting),
    [
      "RequestIdleCallback"
      /* Trace.Types.Events.Name.REQUEST_IDLE_CALLBACK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.requestIdleCallback), defaultCategoryStyles.scripting),
    [
      "CancelIdleCallback"
      /* Trace.Types.Events.Name.CANCEL_IDLE_CALLBACK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.cancelIdleCallback), defaultCategoryStyles.scripting),
    [
      "FireIdleCallback"
      /* Trace.Types.Events.Name.FIRE_IDLE_CALLBACK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.fireIdleCallback), defaultCategoryStyles.scripting),
    [
      "WebSocketCreate"
      /* Trace.Types.Events.Name.WEB_SOCKET_CREATE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.createWebsocket), defaultCategoryStyles.scripting),
    [
      "WebSocketSendHandshakeRequest"
      /* Trace.Types.Events.Name.WEB_SOCKET_SEND_HANDSHAKE_REQUEST */
    ]: new TimelineRecordStyle(i18nString(UIStrings.sendWebsocketHandshake), defaultCategoryStyles.scripting),
    [
      "WebSocketReceiveHandshakeResponse"
      /* Trace.Types.Events.Name.WEB_SOCKET_RECEIVE_HANDSHAKE_REQUEST */
    ]: new TimelineRecordStyle(i18nString(UIStrings.receiveWebsocketHandshake), defaultCategoryStyles.scripting),
    [
      "WebSocketDestroy"
      /* Trace.Types.Events.Name.WEB_SOCKET_DESTROY */
    ]: new TimelineRecordStyle(i18nString(UIStrings.destroyWebsocket), defaultCategoryStyles.scripting),
    [
      "WebSocketSend"
      /* Trace.Types.Events.Name.WEB_SOCKET_SEND */
    ]: new TimelineRecordStyle(i18nString(UIStrings.wsMessageSent), defaultCategoryStyles.scripting),
    [
      "WebSocketReceive"
      /* Trace.Types.Events.Name.WEB_SOCKET_RECEIVE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.wsMessageReceived), defaultCategoryStyles.scripting),
    [
      "EmbedderCallback"
      /* Trace.Types.Events.Name.EMBEDDER_CALLBACK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.embedderCallback), defaultCategoryStyles.scripting),
    [
      "Decode Image"
      /* Trace.Types.Events.Name.DECODE_IMAGE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.imageDecode), defaultCategoryStyles.painting),
    [
      "GPUTask"
      /* Trace.Types.Events.Name.GPU_TASK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.gpu), defaultCategoryStyles.gpu),
    [
      "BlinkGC.AtomicPhase"
      /* Trace.Types.Events.Name.GC_COLLECT_GARBARGE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.domGc), defaultCategoryStyles.scripting),
    [
      "DoEncrypt"
      /* Trace.Types.Events.Name.CRYPTO_DO_ENCRYPT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.encrypt), defaultCategoryStyles.scripting),
    [
      "DoEncryptReply"
      /* Trace.Types.Events.Name.CRYPTO_DO_ENCRYPT_REPLY */
    ]: new TimelineRecordStyle(i18nString(UIStrings.encryptReply), defaultCategoryStyles.scripting),
    [
      "DoDecrypt"
      /* Trace.Types.Events.Name.CRYPTO_DO_DECRYPT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.decrypt), defaultCategoryStyles.scripting),
    [
      "DoDecryptReply"
      /* Trace.Types.Events.Name.CRYPTO_DO_DECRYPT_REPLY */
    ]: new TimelineRecordStyle(i18nString(UIStrings.decryptReply), defaultCategoryStyles.scripting),
    [
      "DoDigest"
      /* Trace.Types.Events.Name.CRYPTO_DO_DIGEST */
    ]: new TimelineRecordStyle(i18nString(UIStrings.digest), defaultCategoryStyles.scripting),
    [
      "DoDigestReply"
      /* Trace.Types.Events.Name.CRYPTO_DO_DIGEST_REPLY */
    ]: new TimelineRecordStyle(i18nString(UIStrings.digestReply), defaultCategoryStyles.scripting),
    [
      "DoSign"
      /* Trace.Types.Events.Name.CRYPTO_DO_SIGN */
    ]: new TimelineRecordStyle(i18nString(UIStrings.sign), defaultCategoryStyles.scripting),
    [
      "DoSignReply"
      /* Trace.Types.Events.Name.CRYPTO_DO_SIGN_REPLY */
    ]: new TimelineRecordStyle(i18nString(UIStrings.signReply), defaultCategoryStyles.scripting),
    [
      "DoVerify"
      /* Trace.Types.Events.Name.CRYPTO_DO_VERIFY */
    ]: new TimelineRecordStyle(i18nString(UIStrings.verify), defaultCategoryStyles.scripting),
    [
      "DoVerifyReply"
      /* Trace.Types.Events.Name.CRYPTO_DO_VERIFY_REPLY */
    ]: new TimelineRecordStyle(i18nString(UIStrings.verifyReply), defaultCategoryStyles.scripting),
    [
      "AsyncTask"
      /* Trace.Types.Events.Name.ASYNC_TASK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.asyncTask), defaultCategoryStyles.async),
    [
      "LayoutShift"
      /* Trace.Types.Events.Name.LAYOUT_SHIFT */
    ]: new TimelineRecordStyle(
      i18nString(UIStrings.layoutShift),
      defaultCategoryStyles.experience,
      /* Mark LayoutShifts as hidden; in the timeline we render
      * SyntheticLayoutShifts so those are the ones visible to the user */
      true
    ),
    [
      "SyntheticLayoutShift"
      /* Trace.Types.Events.Name.SYNTHETIC_LAYOUT_SHIFT */
    ]: new TimelineRecordStyle(i18nString(UIStrings.layoutShift), defaultCategoryStyles.experience),
    [
      "SyntheticLayoutShiftCluster"
      /* Trace.Types.Events.Name.SYNTHETIC_LAYOUT_SHIFT_CLUSTER */
    ]: new TimelineRecordStyle(i18nString(UIStrings.layoutShiftCluster), defaultCategoryStyles.experience),
    [
      "EventTiming"
      /* Trace.Types.Events.Name.EVENT_TIMING */
    ]: new TimelineRecordStyle(i18nString(UIStrings.eventTiming), defaultCategoryStyles.experience),
    [
      "HandlePostMessage"
      /* Trace.Types.Events.Name.HANDLE_POST_MESSAGE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.onMessage), defaultCategoryStyles.messaging),
    [
      "SchedulePostMessage"
      /* Trace.Types.Events.Name.SCHEDULE_POST_MESSAGE */
    ]: new TimelineRecordStyle(i18nString(UIStrings.schedulePostMessage), defaultCategoryStyles.messaging),
    [
      "SchedulePostTaskCallback"
      /* Trace.Types.Events.Name.SCHEDULE_POST_TASK_CALLBACK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.schedulePostTaskCallback), defaultCategoryStyles.scripting),
    [
      "RunPostTaskCallback"
      /* Trace.Types.Events.Name.RUN_POST_TASK_CALLBACK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.runPostTaskCallback), defaultCategoryStyles.scripting),
    [
      "AbortPostTaskCallback"
      /* Trace.Types.Events.Name.ABORT_POST_TASK_CALLBACK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.abortPostTaskCallback), defaultCategoryStyles.scripting),
    [
      "V8Console::runTask"
      /* Trace.Types.Events.Name.V8_CONSOLE_RUN_TASK */
    ]: new TimelineRecordStyle(i18nString(UIStrings.consoleTaskRun), defaultCategoryStyles.scripting)
  };
  const visibleEventStyles = Object.entries(eventStylesMap).filter(([, style]) => style.hidden === false).map(([key]) => key);
  const visibleTraceEventsComplete = visibleEventStyles.every((eventType) => {
    return Trace.Helpers.Trace.VISIBLE_TRACE_EVENT_TYPES.has(eventType);
  });
  const eventStylesMapKeys = Object.keys(eventStylesMap);
  const eventStylesComplete = Array.from(Trace.Helpers.Trace.VISIBLE_TRACE_EVENT_TYPES).every((eventType) => {
    return eventStylesMapKeys.includes(eventType);
  });
  if (!visibleTraceEventsComplete || !eventStylesComplete) {
    throw new Error("eventStylesMap and VISIBLE_TRACE_EVENT_TYPES are out of sync!");
  }
  return eventStylesMap;
}
function setEventStylesMap(eventStyles) {
  eventStylesMap = eventStyles;
}
function setCategories(cats) {
  categoryStyles = cats;
}
function visibleTypes() {
  const eventStyles = maybeInitSylesMap();
  const result = [];
  for (const name in eventStyles) {
    const nameAsKey = name;
    if (!eventStyles[nameAsKey]?.hidden) {
      result.push(name);
    }
  }
  return result;
}
function getTimelineMainEventCategories() {
  if (mainEventCategories) {
    return mainEventCategories;
  }
  mainEventCategories = [
    EventCategory.IDLE,
    EventCategory.LOADING,
    EventCategory.PAINTING,
    EventCategory.RENDERING,
    EventCategory.SCRIPTING,
    EventCategory.OTHER
  ];
  return mainEventCategories;
}
function setTimelineMainEventCategories(categories) {
  mainEventCategories = categories;
}
function markerDetailsForEvent(event) {
  let title = "";
  let color = "var(--color-text-primary)";
  if (Trace.Types.Events.isFirstContentfulPaint(event)) {
    color = "var(--sys-color-green-bright)";
    title = "FCP";
  }
  if (Trace.Types.Events.isLargestContentfulPaintCandidate(event)) {
    color = "var(--sys-color-green)";
    title = "LCP";
  }
  if (Trace.Types.Events.isNavigationStart(event)) {
    color = "var(--color-text-primary)";
    title = "Nav";
  }
  if (Trace.Types.Events.isMarkDOMContent(event)) {
    color = "var(--color-text-disabled)";
    title = "DCL";
  }
  if (Trace.Types.Events.isMarkLoad(event)) {
    color = "var(--color-text-disabled)";
    title = "L";
  }
  return { color, title };
}

// gen/front_end/panels/timeline/utils/EntryName.js
var UIStrings2 = {
  /**
   *@description Text shown for an entry in the flame chart that has no explicit name.
   */
  anonymous: "(anonymous)",
  /**
   *@description Text used to show an EventDispatch event which has a type associated with it
   *@example {click} PH1
   */
  eventDispatchS: "Event: {PH1}",
  /**
   *@description Text shown for an entry in the flame chart that represents a frame.
   */
  frame: "Frame",
  /**
   *@description Text in Timeline Flame Chart Data Provider of the Performance panel
   */
  wsConnectionOpened: "WebSocket opened",
  /**
   *@description Text in Timeline Flame Chart Data Provider of the Performance panel
   *@example {ws://example.com} PH1
   */
  wsConnectionOpenedWithUrl: "WebSocket opened: {PH1}",
  /**
   *@description Text in Timeline Flame Chart Data Provider of the Performance panel
   */
  wsConnectionClosed: "WebSocket closed",
  /**
   *@description Text in Timeline Flame Chart Data Provider of the Performance panel
   */
  layoutShift: "Layout shift"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/timeline/utils/EntryName.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
function nameForEntry(entry, parsedTrace) {
  if (Trace2.Types.Events.isProfileCall(entry)) {
    if (parsedTrace) {
      const potentialCallName = Trace2.Handlers.ModelHandlers.Samples.getProfileCallFunctionName(parsedTrace.Samples, entry);
      if (potentialCallName) {
        return potentialCallName;
      }
    }
    return entry.callFrame.functionName || i18nString2(UIStrings2.anonymous);
  }
  if (Trace2.Types.Events.isLegacyTimelineFrame(entry)) {
    return i18n3.i18n.lockedString(UIStrings2.frame);
  }
  if (Trace2.Types.Events.isDispatch(entry)) {
    return i18nString2(UIStrings2.eventDispatchS, { PH1: entry.args.data.type });
  }
  if (Trace2.Types.Events.isSyntheticNetworkRequest(entry)) {
    const parsedURL = new Common.ParsedURL.ParsedURL(entry.args.data.url);
    const text = parsedURL.isValid ? `${parsedURL.displayName} (${parsedURL.host})` : entry.args.data.url || "Network request";
    return text;
  }
  if (Trace2.Types.Events.isWebSocketCreate(entry)) {
    if (entry.args.data.url) {
      return i18nString2(UIStrings2.wsConnectionOpenedWithUrl, { PH1: entry.args.data.url });
    }
    return i18nString2(UIStrings2.wsConnectionOpened);
  }
  if (Trace2.Types.Events.isWebSocketDestroy(entry)) {
    return i18nString2(UIStrings2.wsConnectionClosed);
  }
  if (Trace2.Types.Events.isSyntheticInteraction(entry)) {
    return nameForInteractionEvent(entry);
  }
  if (Trace2.Types.Events.isSyntheticLayoutShift(entry)) {
    return i18nString2(UIStrings2.layoutShift);
  }
  if (Trace2.Types.Events.isSyntheticAnimation(entry) && entry.args.data.beginEvent.args.data.displayName) {
    return entry.args.data.beginEvent.args.data.displayName;
  }
  const eventStyleCustomName = getEventStyle(entry.name)?.title;
  return eventStyleCustomName || entry.name;
}
function nameForInteractionEvent(event) {
  const category = Trace2.Handlers.ModelHandlers.UserInteractions.categoryOfInteraction(event);
  if (category === "OTHER") {
    return "Other";
  }
  if (category === "KEYBOARD") {
    return "Keyboard";
  }
  if (category === "POINTER") {
    return "Pointer";
  }
  return event.type;
}

// gen/front_end/panels/timeline/utils/SourceMapsResolver.js
var SourceMapsResolver_exports = {};
__export(SourceMapsResolver_exports, {
  SourceMappingsUpdated: () => SourceMappingsUpdated,
  SourceMapsResolver: () => SourceMapsResolver,
  resolvedCodeLocationDataNames: () => resolvedCodeLocationDataNames
});
import * as SDK from "./../../../core/sdk/sdk.js";
import * as Bindings from "./../../../models/bindings/bindings.js";
import * as SourceMapScopes from "./../../../models/source_map_scopes/source_map_scopes.js";
import * as Trace3 from "./../../../models/trace/trace.js";
import * as Workspace from "./../../../models/workspace/workspace.js";
var SourceMappingsUpdated = class _SourceMappingsUpdated extends Event {
  static eventName = "sourcemappingsupdated";
  constructor() {
    super(_SourceMappingsUpdated.eventName, { composed: true, bubbles: true });
  }
};
var resolvedCodeLocationDataNames = /* @__PURE__ */ new Map();
var SourceMapsResolver = class _SourceMapsResolver extends EventTarget {
  executionContextNamesByOrigin = /* @__PURE__ */ new Map();
  #parsedTrace;
  #entityMapper = null;
  #isResolving = false;
  // We need to gather up a list of all the DebuggerModels that we should
  // listen to for source map attached events. For most pages this will be
  // the debugger model for the primary page target, but if a trace has
  // workers, we would also need to gather up the DebuggerModel instances for
  // those workers too.
  #debuggerModelsToListen = /* @__PURE__ */ new Set();
  constructor(parsedTrace, entityMapper) {
    super();
    this.#parsedTrace = parsedTrace;
    this.#entityMapper = entityMapper ?? null;
  }
  static clearResolvedNodeNames() {
    resolvedCodeLocationDataNames.clear();
  }
  static keyForCodeLocation(callFrame) {
    return `${callFrame.url}$$$${callFrame.scriptId}$$$${callFrame.functionName}$$$${callFrame.lineNumber}$$$${callFrame.columnNumber}`;
  }
  /**
   * For trace events containing a call frame / source location
   * (f.e. a stack trace), attempts to obtain the resolved source
   * location based on the those that have been resolved so far from
   * listened source maps.
   *
   * Note that a single deployed URL can map to multiple authored URLs
   * (f.e. if an app is bundled). Thus, beyond a URL we can use code
   * location data like line and column numbers to obtain the specific
   * authored code according to the source mappings.
   *
   * TODO(andoli): This can return incorrect scripts if the target page has been reloaded since the trace.
   */
  static resolvedCodeLocationForCallFrame(callFrame) {
    const codeLocationKey = this.keyForCodeLocation(callFrame);
    return resolvedCodeLocationDataNames.get(codeLocationKey) ?? null;
  }
  static resolvedCodeLocationForEntry(entry) {
    let callFrame = null;
    if (Trace3.Types.Events.isProfileCall(entry)) {
      callFrame = entry.callFrame;
    } else {
      const stackTrace = Trace3.Helpers.Trace.getZeroIndexedStackTraceInEventPayload(entry);
      if (stackTrace === null || stackTrace.length < 1) {
        return null;
      }
      callFrame = stackTrace[0];
    }
    return _SourceMapsResolver.resolvedCodeLocationForCallFrame(callFrame);
  }
  static resolvedURLForEntry(parsedTrace, entry) {
    const resolvedCallFrameURL = _SourceMapsResolver.resolvedCodeLocationForEntry(entry)?.devtoolsLocation?.uiSourceCode.url();
    if (resolvedCallFrameURL) {
      return resolvedCallFrameURL;
    }
    const url = Trace3.Handlers.Helpers.getNonResolvedURL(entry, parsedTrace);
    if (url) {
      return Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(url)?.url() ?? url;
    }
    return null;
  }
  static storeResolvedCodeDataForCallFrame(callFrame, resolvedCodeLocationData) {
    const keyForCallFrame = this.keyForCodeLocation(callFrame);
    resolvedCodeLocationDataNames.set(keyForCallFrame, resolvedCodeLocationData);
  }
  async install() {
    for (const threadToProfileMap of this.#parsedTrace.Samples.profilesInProcess.values()) {
      for (const [tid, profile] of threadToProfileMap) {
        const nodes = profile.parsedProfile.nodes();
        if (!nodes || nodes.length === 0) {
          continue;
        }
        const target = this.#targetForThread(tid);
        const debuggerModel = target?.model(SDK.DebuggerModel.DebuggerModel);
        if (!debuggerModel) {
          continue;
        }
        for (const node of nodes) {
          const script = debuggerModel.scriptForId(String(node.callFrame.scriptId));
          const shouldListenToSourceMap = !script || script.sourceMapURL;
          if (!shouldListenToSourceMap) {
            continue;
          }
          this.#debuggerModelsToListen.add(debuggerModel);
        }
      }
    }
    for (const debuggerModel of this.#debuggerModelsToListen) {
      debuggerModel.sourceMapManager().addEventListener(SDK.SourceMapManager.Events.SourceMapAttached, this.#onAttachedSourceMap, this);
    }
    this.#updateExtensionNames();
    await this.#resolveMappingsForProfileNodes();
  }
  /**
   * Removes the event listeners and stops tracking newly added sourcemaps.
   * Should be called before destroying an instance of this class to avoid leaks
   * with listeners.
   */
  uninstall() {
    for (const debuggerModel of this.#debuggerModelsToListen) {
      debuggerModel.sourceMapManager().removeEventListener(SDK.SourceMapManager.Events.SourceMapAttached, this.#onAttachedSourceMap, this);
    }
    this.#debuggerModelsToListen.clear();
  }
  async #resolveMappingsForProfileNodes() {
    let updatedMappings = false;
    for (const [, threadsInProcess] of this.#parsedTrace.Samples.profilesInProcess) {
      for (const [tid, threadProfile] of threadsInProcess) {
        const nodes = threadProfile.parsedProfile.nodes() ?? [];
        const target = this.#targetForThread(tid);
        if (!target) {
          continue;
        }
        for (const node of nodes) {
          const resolvedFunctionName = await SourceMapScopes.NamesResolver.resolveProfileFrameFunctionName(node.callFrame, target);
          updatedMappings ||= Boolean(resolvedFunctionName);
          node.setFunctionName(resolvedFunctionName);
          const debuggerModel = target.model(SDK.DebuggerModel.DebuggerModel);
          const script = debuggerModel?.scriptForId(node.scriptId) || null;
          const location = debuggerModel && new SDK.DebuggerModel.Location(debuggerModel, node.callFrame.scriptId, node.callFrame.lineNumber, node.callFrame.columnNumber);
          const uiLocation = location && await Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().rawLocationToUILocation(location);
          updatedMappings ||= Boolean(uiLocation);
          if (uiLocation?.uiSourceCode.url() && this.#entityMapper) {
            this.#entityMapper.updateSourceMapEntities(node.callFrame, uiLocation.uiSourceCode.url());
          }
          _SourceMapsResolver.storeResolvedCodeDataForCallFrame(node.callFrame, { name: resolvedFunctionName, devtoolsLocation: uiLocation, script });
        }
      }
    }
    if (!updatedMappings) {
      return;
    }
    this.dispatchEvent(new SourceMappingsUpdated());
  }
  #onAttachedSourceMap() {
    if (this.#isResolving) {
      return;
    }
    this.#isResolving = true;
    setTimeout(async () => {
      this.#isResolving = false;
      await this.#resolveMappingsForProfileNodes();
    }, 500);
  }
  // Figure out the target for the node. If it is in a worker thread,
  // that is the target, otherwise we use the primary page target.
  #targetForThread(tid) {
    const maybeWorkerId = this.#parsedTrace.Workers.workerIdByThread.get(tid);
    if (maybeWorkerId) {
      return SDK.TargetManager.TargetManager.instance().targetById(maybeWorkerId);
    }
    return SDK.TargetManager.TargetManager.instance().primaryPageTarget();
  }
  #updateExtensionNames() {
    for (const runtimeModel of SDK.TargetManager.TargetManager.instance().models(SDK.RuntimeModel.RuntimeModel)) {
      for (const context of runtimeModel.executionContexts()) {
        this.executionContextNamesByOrigin.set(context.origin, context.name);
      }
    }
    this.#entityMapper?.updateExtensionEntitiesWithName(this.executionContextNamesByOrigin);
  }
};

// gen/front_end/panels/timeline/utils/AICallTree.js
function depthFirstWalk(nodes, callback) {
  for (const node of nodes) {
    if (callback?.(node)) {
      break;
    }
    depthFirstWalk(node.children().values(), callback);
  }
}
var AICallTree = class _AICallTree {
  selectedNode;
  rootNode;
  parsedTrace;
  constructor(selectedNode, rootNode, parsedTrace) {
    this.selectedNode = selectedNode;
    this.rootNode = rootNode;
    this.parsedTrace = parsedTrace;
  }
  /**
   * Builds a call tree representing all calls within the given timeframe for
   * the provided thread.
   * Events that are less than 0.05% of the range duration are removed.
   */
  static fromTimeOnThread({ thread, parsedTrace, bounds }) {
    const threadEvents = parsedTrace.Renderer.processes.get(thread.pid)?.threads.get(thread.tid)?.entries;
    if (!threadEvents) {
      return null;
    }
    const overlappingEvents = threadEvents.filter((e) => Trace4.Helpers.Timing.eventIsInBounds(e, bounds));
    const visibleEventsFilter = new Trace4.Extras.TraceFilter.VisibleEventsFilter(visibleTypes());
    const minDuration = Trace4.Types.Timing.Micro(bounds.range * 5e-3);
    const minDurationFilter = new MinDurationFilter(minDuration);
    const compileCodeFilter = new ExcludeCompileCodeFilter();
    const rootNode = new Trace4.Extras.TraceTree.TopDownRootNode(overlappingEvents, {
      filters: [minDurationFilter, compileCodeFilter, visibleEventsFilter],
      startTime: Trace4.Helpers.Timing.microToMilli(bounds.min),
      endTime: Trace4.Helpers.Timing.microToMilli(bounds.max),
      doNotAggregate: true,
      includeInstantEvents: true
    });
    const instance = new _AICallTree(null, rootNode, parsedTrace);
    return instance;
  }
  /**
   * Attempts to build an AICallTree from a given selected event. It also
   * validates that this event is one that we support being used with the AI
   * Assistance panel, which [as of January 2025] means:
   * 1. It is on the main thread.
   * 2. It exists in either the Renderer or Sample handler's entryToNode map.
   * This filters out other events we make such as SyntheticLayoutShifts which are not valid
   * If the event is not valid, or there is an unexpected error building the tree, `null` is returned.
   */
  static fromEvent(selectedEvent, parsedTrace) {
    if (Trace4.Types.Events.isPerformanceMark(selectedEvent)) {
      return null;
    }
    const threads = Trace4.Handlers.Threads.threadsInTrace(parsedTrace);
    const thread = threads.find((t) => t.pid === selectedEvent.pid && t.tid === selectedEvent.tid);
    if (!thread) {
      return null;
    }
    if (thread.type !== "MAIN_THREAD" && thread.type !== "CPU_PROFILE") {
      return null;
    }
    if (!parsedTrace.Renderer.entryToNode.has(selectedEvent) && !parsedTrace.Samples.entryToNode.has(selectedEvent)) {
      return null;
    }
    const allEventsEnabled = Root.Runtime.experiments.isEnabled("timeline-show-all-events");
    const { startTime, endTime } = Trace4.Helpers.Timing.eventTimingsMilliSeconds(selectedEvent);
    const selectedEventBounds = Trace4.Helpers.Timing.traceWindowFromMicroSeconds(Trace4.Helpers.Timing.milliToMicro(startTime), Trace4.Helpers.Timing.milliToMicro(endTime));
    let threadEvents = parsedTrace.Renderer.processes.get(selectedEvent.pid)?.threads.get(selectedEvent.tid)?.entries;
    if (!threadEvents) {
      threadEvents = parsedTrace.Samples.profilesInProcess.get(selectedEvent.pid)?.get(selectedEvent.tid)?.profileCalls;
    }
    if (!threadEvents) {
      console.warn(`AICallTree: could not find thread for selected entry: ${selectedEvent}`);
      return null;
    }
    const overlappingEvents = threadEvents.filter((e) => Trace4.Helpers.Timing.eventIsInBounds(e, selectedEventBounds));
    const filters = [new SelectedEventDurationFilter(selectedEvent), new ExcludeCompileCodeFilter(selectedEvent)];
    if (!allEventsEnabled) {
      filters.push(new Trace4.Extras.TraceFilter.VisibleEventsFilter(visibleTypes()));
    }
    const rootNode = new Trace4.Extras.TraceTree.TopDownRootNode(overlappingEvents, {
      filters,
      startTime,
      endTime,
      includeInstantEvents: true
    });
    let selectedNode = null;
    depthFirstWalk([rootNode].values(), (node) => {
      if (node.event === selectedEvent) {
        selectedNode = node;
        return true;
      }
      return;
    });
    if (selectedNode === null) {
      console.warn(`Selected event ${selectedEvent} not found within its own tree.`);
      return null;
    }
    const instance = new _AICallTree(selectedNode, rootNode, parsedTrace);
    return instance;
  }
  /**
   * Iterates through nodes level by level using a Breadth-First Search (BFS) algorithm.
   * BFS is important here because the serialization process assumes that direct child nodes
   * will have consecutive IDs (horizontally across each depth).
   *
   * Example tree with IDs:
   *
   *             1
   *            / \
   *           2   3
   *        / / /   \
   *      4  5 6     7
   *
   * Here, node with an ID 2 has consecutive children in the 4-6 range.
   *
   * To optimize for space, the provided `callback` function is called to serialize
   * each node as it's visited during the BFS traversal.
   *
   * When serializing a node, the callback receives:
   * 1. The current node being visited.
   * 2. The ID assigned to this current node (a simple incrementing index based on visit order).
   * 3. The predicted starting ID for the children of this current node.
   *
   * A serialized node needs to know the ID range of its children. However,
   * child node IDs are only assigned when those children are themselves visited.
   * To handle this, we predict the starting ID for a node's children. This prediction
   * is based on a running count of all nodes that have ever been added to the BFS queue.
   * Since IDs are assigned consecutively as nodes are processed from the queue, and a
   * node's children are added to the end of the queue when the parent is visited,
   * their eventual IDs will follow this running count.
   */
  breadthFirstWalk(nodes, serializeNodeCallback) {
    const queue = Array.from(nodes);
    let nodeIndex = 1;
    let nodesAddedToQueueCount = queue.length;
    let currentNode = queue.shift();
    while (currentNode) {
      if (currentNode.children().size > 0) {
        serializeNodeCallback(currentNode, nodeIndex, nodesAddedToQueueCount + 1);
      } else {
        serializeNodeCallback(currentNode, nodeIndex);
      }
      queue.push(...Array.from(currentNode.children().values()));
      nodesAddedToQueueCount += currentNode.children().size;
      currentNode = queue.shift();
      nodeIndex++;
    }
  }
  /* This is a new serialization format that is currently only used in tests.
   * TODO: replace the current format with this one. */
  serialize() {
    const allUrls = [];
    let nodesStr = "";
    this.breadthFirstWalk(this.rootNode.children().values(), (node, nodeId, childStartingNode) => {
      nodesStr += "\n" + this.stringifyNode(node, nodeId, this.parsedTrace, this.selectedNode, allUrls, childStartingNode);
    });
    let output = "";
    if (allUrls.length) {
      output += "\n# All URL #s:\n\n" + allUrls.map((url, index) => `  * ${index}: ${url}`).join("\n");
    }
    output += "\n\n# Call tree:\n" + nodesStr;
    return output;
  }
  /*
  * Each node is serialized into a single line to minimize token usage in the context window.
  * The format is a semicolon-separated string with the following fields:
  * Format: `id;name;duration;selfTime;urlIndex;childRange;[S]
  *
  *   1. `id`: A unique numerical identifier for the node assigned by BFS.
  *   2. `name`: The name of the event represented by the node.
  *   3. `duration`: The total duration of the event in milliseconds, rounded to one decimal place.
  *   4. `selfTime`: The self time of the event in milliseconds, rounded to one decimal place.
  *   5. `urlIndex`: An index referencing a URL in the `allUrls` array. If no URL is present, this is an empty string.
  *   6. `childRange`: A string indicating the range of IDs for the node's children. Children should always have consecutive IDs.
  *                    If there is only one child, it's a single ID.
  *   7. `[S]`: An optional marker indicating that this node is the selected node.
  *
  * Example:
  *   `1;Parse HTML;2.5;0.3;0;2-5;S`
  *   This represents:
  *     - Node ID 1
  *     - Name "Parse HTML"
  *     - Total duration of 2.5ms
  *     - Self time of 0.3ms
  *     - URL index 0 (meaning the URL is the first one in the `allUrls` array)
  *     - Child range of IDs 2 to 5
  *     - This node is the selected node (S marker)
  */
  stringifyNode(node, nodeId, parsedTrace, selectedNode, allUrls, childStartingNodeIndex) {
    const event = node.event;
    if (!event) {
      throw new Error("Event required");
    }
    const idStr = String(nodeId);
    const name = nameForEntry(event, parsedTrace);
    const roundToTenths = (num) => {
      if (!num) {
        return "";
      }
      return String(Math.round(num * 10) / 10);
    };
    const durationStr = roundToTenths(node.totalTime);
    const selfTimeStr = roundToTenths(node.selfTime);
    const url = SourceMapsResolver.resolvedURLForEntry(parsedTrace, event);
    let urlIndexStr = "";
    if (url) {
      const existingIndex = allUrls.indexOf(url);
      if (existingIndex === -1) {
        urlIndexStr = String(allUrls.push(url) - 1);
      } else {
        urlIndexStr = String(existingIndex);
      }
    }
    const children = Array.from(node.children().values());
    let childRangeStr = "";
    if (childStartingNodeIndex) {
      childRangeStr = children.length === 1 ? String(childStartingNodeIndex) : `${childStartingNodeIndex}-${childStartingNodeIndex + children.length}`;
    }
    const selectedMarker = selectedNode?.event === node.event ? "S" : "";
    let line = idStr;
    line += ";" + name;
    line += ";" + durationStr;
    line += ";" + selfTimeStr;
    line += ";" + urlIndexStr;
    line += ";" + childRangeStr;
    if (selectedMarker) {
      line += ";" + selectedMarker;
    }
    return line;
  }
  // Only used for debugging.
  logDebug() {
    const str = this.serialize();
    console.log("\u{1F386}", str);
    if (str.length > 45e3) {
      console.warn("Output will likely not fit in the context window. Expect an AIDA error.");
    }
  }
};
var ExcludeCompileCodeFilter = class extends Trace4.Extras.TraceFilter.TraceFilter {
  #selectedEvent = null;
  constructor(selectedEvent) {
    super();
    this.#selectedEvent = selectedEvent ?? null;
  }
  accept(event) {
    if (this.#selectedEvent && event === this.#selectedEvent) {
      return true;
    }
    return event.name !== "V8.CompileCode";
  }
};
var SelectedEventDurationFilter = class extends Trace4.Extras.TraceFilter.TraceFilter {
  #minDuration;
  #selectedEvent;
  constructor(selectedEvent) {
    super();
    this.#minDuration = Trace4.Types.Timing.Micro((selectedEvent.dur ?? 1) * 5e-3);
    this.#selectedEvent = selectedEvent;
  }
  accept(event) {
    if (event === this.#selectedEvent) {
      return true;
    }
    return event.dur ? event.dur >= this.#minDuration : false;
  }
};
var MinDurationFilter = class extends Trace4.Extras.TraceFilter.TraceFilter {
  #minDuration;
  constructor(minDuration) {
    super();
    this.#minDuration = minDuration;
  }
  accept(event) {
    return event.dur ? event.dur >= this.#minDuration : false;
  }
};

// gen/front_end/panels/timeline/utils/AIContext.js
var AIContext_exports = {};
__export(AIContext_exports, {
  AgentFocus: () => AgentFocus
});
var AgentFocus = class _AgentFocus {
  static fromInsight(parsedTrace, insight, insightSetBounds) {
    return new _AgentFocus({
      type: "insight",
      parsedTrace,
      insight,
      insightSetBounds
    });
  }
  static fromCallTree(callTree) {
    return new _AgentFocus({ type: "call-tree", parsedTrace: callTree.parsedTrace, callTree });
  }
  #data;
  constructor(data) {
    this.#data = data;
  }
  get data() {
    return this.#data;
  }
};

// gen/front_end/panels/timeline/utils/EntityMapper.js
var EntityMapper_exports = {};
__export(EntityMapper_exports, {
  EntityMapper: () => EntityMapper
});
import * as Trace5 from "./../../../models/trace/trace.js";
var EntityMapper = class {
  #parsedTrace;
  #entityMappings;
  #firstPartyEntity;
  #thirdPartyEvents = [];
  /**
   * When resolving urls and updating our entity mapping in the
   * SourceMapsResolver, a single call frame can appear multiple times
   * as different cpu profile nodes. To avoid duplicate work on the
   * same CallFrame, we can keep track of them.
   */
  #resolvedCallFrames = /* @__PURE__ */ new Set();
  constructor(parsedTrace) {
    this.#parsedTrace = parsedTrace;
    this.#entityMappings = this.#parsedTrace.Renderer.entityMappings;
    this.#firstPartyEntity = this.#findFirstPartyEntity();
    this.#thirdPartyEvents = this.#getThirdPartyEvents();
  }
  #findFirstPartyEntity() {
    const nav = Array.from(this.#parsedTrace.Meta.navigationsByNavigationId.values()).sort((a, b) => a.ts - b.ts)[0];
    const firstPartyUrl = nav?.args.data?.documentLoaderURL ?? this.#parsedTrace.Meta.mainFrameURL;
    if (!firstPartyUrl) {
      return null;
    }
    return Trace5.Handlers.Helpers.getEntityForUrl(firstPartyUrl, this.#entityMappings.createdEntityCache) ?? null;
  }
  #getThirdPartyEvents() {
    const entries = Array.from(this.#entityMappings.eventsByEntity.entries());
    const thirdPartyEvents = entries.flatMap(([entity, events]) => {
      return entity !== this.#firstPartyEntity ? events : [];
    });
    return thirdPartyEvents;
  }
  /**
   * Returns an entity for a given event if any.
   */
  entityForEvent(event) {
    return this.#entityMappings.entityByEvent.get(event) ?? null;
  }
  /**
   * Returns trace events that correspond with a given entity if any.
   */
  eventsForEntity(entity) {
    return this.#entityMappings.eventsByEntity.get(entity) ?? [];
  }
  firstPartyEntity() {
    return this.#firstPartyEntity;
  }
  thirdPartyEvents() {
    return this.#thirdPartyEvents;
  }
  mappings() {
    return this.#entityMappings;
  }
  /**
   * This updates entity mapping given a callFrame and sourceURL (newly resolved),
   * updating both eventsByEntity and entityByEvent. The call frame provides us the
   * URL and sourcemap source location that events map to. This describes the exact events we
   * want to update. We then update the events with the new sourceURL.
   *
   * compiledURLs -> the actual file's url (e.g. my-big-bundle.min.js)
   * sourceURLs -> the resolved urls (e.g. react.development.js, my-app.ts)
   * @param callFrame
   * @param sourceURL
   */
  updateSourceMapEntities(callFrame, sourceURL) {
    if (this.#resolvedCallFrames.has(callFrame)) {
      return;
    }
    const compiledURL = callFrame.url;
    const currentEntity = Trace5.Handlers.Helpers.getEntityForUrl(compiledURL, this.#entityMappings.createdEntityCache);
    const resolvedEntity = Trace5.Handlers.Helpers.getEntityForUrl(sourceURL, this.#entityMappings.createdEntityCache);
    if (resolvedEntity === currentEntity || (!currentEntity || !resolvedEntity)) {
      return;
    }
    const currentEntityEvents = (currentEntity && this.#entityMappings.eventsByEntity.get(currentEntity)) ?? [];
    const sourceLocationEvents = [];
    const unrelatedEvents = [];
    currentEntityEvents?.forEach((e) => {
      const stackTrace = Trace5.Helpers.Trace.getZeroIndexedStackTraceInEventPayload(e);
      const cf = stackTrace?.at(0);
      const matchesCallFrame = cf && Trace5.Helpers.Trace.isMatchingCallFrame(cf, callFrame);
      if (matchesCallFrame) {
        sourceLocationEvents.push(e);
      } else {
        unrelatedEvents.push(e);
      }
    });
    this.#entityMappings.eventsByEntity.set(currentEntity, unrelatedEvents);
    this.#entityMappings.eventsByEntity.set(resolvedEntity, sourceLocationEvents);
    sourceLocationEvents.forEach((e) => {
      this.#entityMappings.entityByEvent.set(e, resolvedEntity);
    });
    this.#resolvedCallFrames.add(callFrame);
  }
  // Update entities with proper Chrome Extension names.
  updateExtensionEntitiesWithName(executionContextNamesByOrigin) {
    const entities = Array.from(this.#entityMappings.eventsByEntity.keys());
    for (const [origin, name] of executionContextNamesByOrigin) {
      const entity = entities.find((e) => e.domains[0] === origin);
      if (entity) {
        entity.name = entity.company = name;
      }
    }
  }
};

// gen/front_end/panels/timeline/utils/EntryNodes.js
var EntryNodes_exports = {};
__export(EntryNodes_exports, {
  domNodesForBackendIds: () => domNodesForBackendIds,
  nodeIdsForEvent: () => nodeIdsForEvent,
  relatedDOMNodesForEvent: () => relatedDOMNodesForEvent
});
import * as SDK2 from "./../../../core/sdk/sdk.js";
import * as Trace6 from "./../../../models/trace/trace.js";
var nodeIdsForEventCache = /* @__PURE__ */ new WeakMap();
var domNodesForEventCache = /* @__PURE__ */ new WeakMap();
function nodeIdsForEvent(modelData, event) {
  const fromCache = nodeIdsForEventCache.get(event);
  if (fromCache) {
    return fromCache;
  }
  const foundIds = /* @__PURE__ */ new Set();
  if (Trace6.Types.Events.isLayout(event)) {
    event.args.endData?.layoutRoots.forEach((root) => foundIds.add(root.nodeId));
  } else if (Trace6.Types.Events.isSyntheticLayoutShift(event) && event.args.data?.impacted_nodes) {
    event.args.data.impacted_nodes.forEach((node) => foundIds.add(node.node_id));
  } else if (Trace6.Types.Events.isLargestContentfulPaintCandidate(event) && typeof event.args.data?.nodeId !== "undefined") {
    foundIds.add(event.args.data.nodeId);
  } else if (Trace6.Types.Events.isPaint(event) && typeof event.args.data.nodeId !== "undefined") {
    foundIds.add(event.args.data.nodeId);
  } else if (Trace6.Types.Events.isPaintImage(event) && typeof event.args.data.nodeId !== "undefined") {
    foundIds.add(event.args.data.nodeId);
  } else if (Trace6.Types.Events.isScrollLayer(event) && typeof event.args.data.nodeId !== "undefined") {
    foundIds.add(event.args.data.nodeId);
  } else if (Trace6.Types.Events.isSyntheticAnimation(event) && typeof event.args.data.beginEvent.args.data.nodeId !== "undefined") {
    foundIds.add(event.args.data.beginEvent.args.data.nodeId);
  } else if (Trace6.Types.Events.isDecodeImage(event)) {
    const paintImageEvent = modelData.ImagePainting.paintImageForEvent.get(event);
    if (typeof paintImageEvent?.args.data.nodeId !== "undefined") {
      foundIds.add(paintImageEvent.args.data.nodeId);
    }
  } else if (Trace6.Types.Events.isDrawLazyPixelRef(event) && event.args?.LazyPixelRef) {
    const paintImageEvent = modelData.ImagePainting.paintImageByDrawLazyPixelRef.get(event.args.LazyPixelRef);
    if (typeof paintImageEvent?.args.data.nodeId !== "undefined") {
      foundIds.add(paintImageEvent.args.data.nodeId);
    }
  } else if (Trace6.Types.Events.isParseMetaViewport(event) && typeof event.args?.data.node_id !== "undefined") {
    foundIds.add(event.args.data.node_id);
  }
  nodeIdsForEventCache.set(event, foundIds);
  return foundIds;
}
async function relatedDOMNodesForEvent(modelData, event) {
  const fromCache = domNodesForEventCache.get(event);
  if (fromCache) {
    return fromCache;
  }
  const nodeIds = nodeIdsForEvent(modelData, event);
  if (nodeIds.size) {
    const frame = event.args?.data?.frame;
    const result = await domNodesForBackendIds(frame, nodeIds);
    domNodesForEventCache.set(event, result);
    return result;
  }
  return null;
}
async function domNodesForBackendIds(frameId, nodeIds) {
  const target = SDK2.TargetManager.TargetManager.instance().primaryPageTarget();
  const domModel = target?.model(SDK2.DOMModel.DOMModel);
  const resourceTreeModel = target?.model(SDK2.ResourceTreeModel.ResourceTreeModel);
  if (!domModel || !resourceTreeModel) {
    return /* @__PURE__ */ new Map();
  }
  if (frameId && !resourceTreeModel.frames().some((frame) => frame.id === frameId)) {
    return /* @__PURE__ */ new Map();
  }
  return await domModel.pushNodesByBackendIdsToFrontend(nodeIds) || /* @__PURE__ */ new Map();
}

// gen/front_end/panels/timeline/utils/Helpers.js
var Helpers_exports = {};
__export(Helpers_exports, {
  RevealableInsight: () => RevealableInsight,
  createUrlLabels: () => createUrlLabels,
  formatOriginWithEntity: () => formatOriginWithEntity,
  getThrottlingRecommendations: () => getThrottlingRecommendations,
  md: () => md,
  shortenUrl: () => shortenUrl
});
import "./../../../ui/components/markdown_view/markdown_view.js";
import * as Platform from "./../../../core/platform/platform.js";
import * as SDK3 from "./../../../core/sdk/sdk.js";
import * as CrUXManager from "./../../../models/crux-manager/crux-manager.js";
import * as Marked from "./../../../third_party/marked/marked.js";
import * as Lit from "./../../../ui/lit/lit.js";
import * as MobileThrottling from "./../../mobile_throttling/mobile_throttling.js";
var { html } = Lit;
var MAX_ORIGIN_LENGTH = 60;
function getThrottlingRecommendations() {
  let cpuOption = SDK3.CPUThrottlingManager.CalibratedMidTierMobileThrottlingOption;
  if (cpuOption.rate() === 0) {
    cpuOption = SDK3.CPUThrottlingManager.MidTierThrottlingOption;
  }
  let networkConditions = null;
  const response = CrUXManager.CrUXManager.instance().getSelectedFieldMetricData("round_trip_time");
  if (response?.percentiles) {
    const rtt = Number(response.percentiles.p75);
    networkConditions = MobileThrottling.ThrottlingPresets.ThrottlingPresets.getRecommendedNetworkPreset(rtt);
  }
  return {
    cpuOption,
    networkConditions
  };
}
function createTrimmedUrlSearch(url) {
  const maxSearchValueLength = 8;
  let search = "";
  for (const [key, value] of url.searchParams) {
    if (search) {
      search += "&";
    }
    if (value) {
      search += `${key}=${Platform.StringUtilities.trimEndWithMaxLength(value, maxSearchValueLength)}`;
    } else {
      search += key;
    }
  }
  if (search) {
    search = "?" + search;
  }
  return search;
}
function createUrlLabels(urls) {
  const labels = [];
  const isAllHttps = urls.every((url) => url.protocol === "https:");
  for (const [index, url] of urls.entries()) {
    const previousUrl = urls[index - 1];
    const sameHostAndProtocol = previousUrl && url.host === previousUrl.host && url.protocol === previousUrl.protocol;
    let elideHost = sameHostAndProtocol;
    let elideProtocol = isAllHttps;
    if (index === 0 && isAllHttps) {
      elideHost = true;
      elideProtocol = true;
    }
    const search = createTrimmedUrlSearch(url);
    if (!elideProtocol) {
      labels.push(`${url.protocol}//${url.host}${url.pathname}${search}`);
    } else if (!elideHost) {
      labels.push(`${url.host}${url.pathname}${search}`);
    } else {
      labels.push(`${url.pathname}${search}`);
    }
  }
  return labels.map((label) => label.length > 1 && label.endsWith("/") ? label.substring(0, label.length - 1) : label);
}
function shortenUrl(url, maxChars = 20) {
  const parts = url.pathname === "/" ? [url.host] : url.pathname.split("/");
  let shortenedUrl = parts.at(-1) ?? "";
  if (shortenedUrl.length > maxChars) {
    return Platform.StringUtilities.trimMiddle(shortenedUrl, maxChars);
  }
  let i = parts.length - 1;
  while (--i >= 0) {
    if (shortenedUrl.length + parts[i].length <= maxChars) {
      shortenedUrl = `${parts[i]}/${shortenedUrl}`;
    }
  }
  return shortenedUrl;
}
function md(markdown) {
  const tokens = Marked.Marked.lexer(markdown);
  const data = { tokens };
  return html`<devtools-markdown-view .data=${data}></devtools-markdown-view>`;
}
function formatOriginWithEntity(url, entity, parenthesizeEntity) {
  const origin = url.origin.replace("https://", "");
  if (!entity) {
    return origin;
  }
  let originWithEntity;
  if (entity.isUnrecognized) {
    originWithEntity = `${origin}`;
  } else {
    originWithEntity = parenthesizeEntity ? `${origin} (${entity.name})` : `${origin} - ${entity.name}`;
  }
  originWithEntity = Platform.StringUtilities.trimEndWithMaxLength(originWithEntity, MAX_ORIGIN_LENGTH);
  return originWithEntity;
}
var RevealableInsight = class {
  insight;
  constructor(insight) {
    this.insight = insight;
  }
};

// gen/front_end/panels/timeline/utils/IgnoreList.js
var IgnoreList_exports = {};
__export(IgnoreList_exports, {
  getIgnoredReasonString: () => getIgnoredReasonString,
  isIgnoreListedEntry: () => isIgnoreListedEntry
});
import * as i18n5 from "./../../../core/i18n/i18n.js";
import * as Bindings2 from "./../../../models/bindings/bindings.js";
import * as Trace7 from "./../../../models/trace/trace.js";
var UIStrings3 = {
  /**
   * @description Refers to when skipping content scripts is enabled and the current script is ignored because it's a content script.
   */
  skipContentScripts: "Content script",
  /**
   * @description Refers to when skipping known third party scripts is enabled and the current script is ignored because it's a known third party script.
   */
  skip3rdPartyScripts: "Marked with ignoreList in source map",
  /**
   * @description Refers to when skipping anonymous scripts is enabled and the current script is ignored because is an anonymous script.
   */
  skipAnonymousScripts: "Anonymous script",
  /**
   * @description Refers to when the current script is ignored because of an unknown rule.
   */
  unknown: "Unknown"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/timeline/utils/IgnoreList.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
function getUrlAndIgnoreListOptions(entry) {
  const rawUrl = entry.callFrame.url;
  const sourceMappedData = SourceMapsResolver.resolvedCodeLocationForEntry(entry);
  const script = sourceMappedData?.script;
  const uiSourceCode = sourceMappedData?.devtoolsLocation?.uiSourceCode;
  const resolvedUrl = uiSourceCode?.url();
  const isKnownThirdParty = uiSourceCode?.isKnownThirdParty();
  const isContentScript = script?.isContentScript();
  const ignoreListOptions = { isContentScript, isKnownThirdParty };
  const url = resolvedUrl || rawUrl;
  return { url, ignoreListOptions };
}
function isIgnoreListedEntry(entry) {
  if (!Trace7.Types.Events.isProfileCall(entry)) {
    return false;
  }
  const { url, ignoreListOptions } = getUrlAndIgnoreListOptions(entry);
  return isIgnoreListedURL(url, ignoreListOptions);
}
function isIgnoreListedURL(url, options) {
  return Bindings2.IgnoreListManager.IgnoreListManager.instance().isUserIgnoreListedURL(url, options);
}
function getIgnoredReasonString(entry) {
  if (!Trace7.Types.Events.isProfileCall(entry)) {
    console.warn("Ignore list feature should only support ProfileCall.");
    return "";
  }
  const { url, ignoreListOptions } = getUrlAndIgnoreListOptions(entry);
  const ignoreListMgr = Bindings2.IgnoreListManager.IgnoreListManager.instance();
  if (ignoreListOptions.isContentScript && ignoreListMgr.skipContentScripts) {
    return i18nString3(UIStrings3.skipContentScripts);
  }
  if (ignoreListOptions.isKnownThirdParty && ignoreListMgr.automaticallyIgnoreListKnownThirdPartyScripts) {
    return i18nString3(UIStrings3.skip3rdPartyScripts);
  }
  if (!url) {
    if (ignoreListMgr.skipAnonymousScripts) {
      return i18nString3(UIStrings3.skipAnonymousScripts);
    }
    return "";
  }
  const regex = ignoreListMgr.getFirstMatchedRegex(url);
  return regex ? regex.source : i18nString3(UIStrings3.unknown);
}

// gen/front_end/panels/timeline/utils/ImageCache.js
var ImageCache_exports = {};
__export(ImageCache_exports, {
  cacheForTesting: () => cacheForTesting,
  emitter: () => emitter,
  getOrQueue: () => getOrQueue,
  loadImageForTesting: () => loadImageForTesting,
  preload: () => preload
});
import * as Trace8 from "./../../../models/trace/trace.js";
var imageCache = /* @__PURE__ */ new WeakMap();
var emitter = new EventTarget();
function getOrQueue(screenshot) {
  if (imageCache.has(screenshot)) {
    return imageCache.get(screenshot) ?? null;
  }
  const uri = Trace8.Handlers.ModelHandlers.Screenshots.screenshotImageDataUri(screenshot);
  loadImage(uri).then((imageOrNull) => {
    imageCache.set(screenshot, imageOrNull);
    emitter.dispatchEvent(new CustomEvent("screenshot-loaded", { detail: { screenshot, image: imageOrNull } }));
  }).catch(() => {
  });
  return null;
}
function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => resolve(null));
    image.src = url;
  });
}
function preload(screenshots) {
  const promises = screenshots.map((screenshot) => {
    if (imageCache.has(screenshot)) {
      return;
    }
    const uri = Trace8.Handlers.ModelHandlers.Screenshots.screenshotImageDataUri(screenshot);
    return loadImage(uri).then((image) => {
      imageCache.set(screenshot, image);
      return;
    });
  });
  return Promise.all(promises);
}
var cacheForTesting = imageCache;
var loadImageForTesting = loadImage;

// gen/front_end/panels/timeline/utils/InsightAIContext.js
var InsightAIContext_exports = {};
__export(InsightAIContext_exports, {
  AIQueries: () => AIQueries
});
import * as Trace9 from "./../../../models/trace/trace.js";
var AIQueries = class {
  /**
   * Returns the set of network requests that occurred within the timeframe of this Insight.
   */
  static networkRequests(insight, insightSetBounds, parsedTrace) {
    const bounds = insightBounds(insight, insightSetBounds);
    const matchedRequests = [];
    for (const request of parsedTrace.NetworkRequests.byTime) {
      if (request.ts > bounds.max) {
        break;
      }
      if (request.args.data.url.startsWith("data:")) {
        continue;
      }
      if (request.ts >= bounds.min && request.ts + request.dur <= bounds.max) {
        matchedRequests.push(request);
      }
    }
    return matchedRequests;
  }
  /**
   * Returns the single network request. We do not check to filter this by the
   * bounds of the insight, because the only way that the LLM has found this
   * request is by first inspecting a summary of relevant network requests for
   * the given insight. So if it then looks up a request by URL, we know that
   * is a valid and relevant request.
   */
  static networkRequest(parsedTrace, url) {
    return parsedTrace.NetworkRequests.byTime.find((r) => r.args.data.url === url) ?? null;
  }
  /**
   * Returns an AI Call Tree representing the activity on the main thread for
   * the relevant time range of the given insight.
   */
  static mainThreadActivity(insight, insightSetBounds, parsedTrace) {
    let mainThreadPID = null;
    let mainThreadTID = null;
    if (insight.navigationId) {
      const navigation = parsedTrace.Meta.navigationsByNavigationId.get(insight.navigationId);
      if (navigation?.args.data?.isOutermostMainFrame) {
        mainThreadPID = navigation.pid;
        mainThreadTID = navigation.tid;
      }
    }
    const threads = Trace9.Handlers.Threads.threadsInTrace(parsedTrace);
    const thread = threads.find((thread2) => {
      if (mainThreadPID && mainThreadTID) {
        return thread2.pid === mainThreadPID && thread2.tid === mainThreadTID;
      }
      return thread2.type === "MAIN_THREAD";
    });
    if (!thread) {
      return null;
    }
    const bounds = insightBounds(insight, insightSetBounds);
    return AICallTree.fromTimeOnThread({
      thread: {
        pid: thread.pid,
        tid: thread.tid
      },
      parsedTrace,
      bounds
    });
  }
};
function insightBounds(insight, insightSetBounds) {
  const overlays = insight.createOverlays?.() ?? [];
  const windows = overlays.map(Trace9.Helpers.Timing.traceWindowFromOverlay).filter((bounds) => !!bounds);
  const overlaysBounds = Trace9.Helpers.Timing.combineTraceWindowsMicro(windows);
  if (overlaysBounds) {
    return overlaysBounds;
  }
  return insightSetBounds;
}

// gen/front_end/panels/timeline/utils/Treemap.js
var Treemap_exports = {};
__export(Treemap_exports, {
  createTreemapData: () => createTreemapData,
  makeScriptNode: () => makeScriptNode,
  openTreemap: () => openTreemap
});
import * as Common2 from "./../../../core/common/common.js";
import * as i18n7 from "./../../../core/i18n/i18n.js";
import * as Trace10 from "./../../../models/trace/trace.js";
async function toCompressedBase64(string) {
  const compAb = await Common2.Gzip.compress(string);
  const strb64 = await Common2.Base64.encode(compAb);
  return strb64;
}
async function openTabWithUrlData(data, urlString, windowName) {
  const url = new URL(urlString);
  url.hash = await toCompressedBase64(JSON.stringify(data));
  url.searchParams.set("gzip", "1");
  window.open(url.toString(), windowName);
}
function openTreemap(treemapData, mainDocumentUrl, windowNameSuffix) {
  const treemapOptions = {
    lhr: {
      mainDocumentUrl,
      audits: {
        "script-treemap-data": {
          details: {
            type: "treemap-data",
            nodes: treemapData
          }
        }
      },
      configSettings: {
        locale: i18n7.DevToolsLocale.DevToolsLocale.instance().locale
      }
    },
    initialView: "duplicate-modules"
  };
  const url = "https://googlechrome.github.io/lighthouse/treemap/";
  const windowName = `treemap-${windowNameSuffix}`;
  void openTabWithUrlData(treemapOptions, url, windowName);
}
function makeScriptNode(src, sourceRoot, sourcesData) {
  function newNode(name) {
    return {
      name,
      resourceBytes: 0,
      encodedBytes: void 0
    };
  }
  const sourceRootNode = newNode(sourceRoot);
  function addAllNodesInSourcePath(source, data) {
    let node = sourceRootNode;
    sourceRootNode.resourceBytes += data.resourceBytes;
    const sourcePathSegments = source.replace(sourceRoot, "").split(/\/+/);
    sourcePathSegments.forEach((sourcePathSegment, i) => {
      if (sourcePathSegment.length === 0) {
        return;
      }
      const isLeaf = i === sourcePathSegments.length - 1;
      let child = node.children?.find((child2) => child2.name === sourcePathSegment);
      if (!child) {
        child = newNode(sourcePathSegment);
        node.children = node.children || [];
        node.children.push(child);
      }
      node = child;
      node.resourceBytes += data.resourceBytes;
      if (isLeaf && data.duplicatedNormalizedModuleName !== void 0) {
        node.duplicatedNormalizedModuleName = data.duplicatedNormalizedModuleName;
      }
    });
  }
  for (const [source, data] of Object.entries(sourcesData)) {
    addAllNodesInSourcePath(source, data);
  }
  function collapseAll(node) {
    while (node.children && node.children.length === 1) {
      const child = node.children[0];
      node.name += "/" + child.name;
      if (child.duplicatedNormalizedModuleName) {
        node.duplicatedNormalizedModuleName = child.duplicatedNormalizedModuleName;
      }
      node.children = child.children;
    }
    if (node.children) {
      for (const child of node.children) {
        collapseAll(child);
      }
    }
  }
  collapseAll(sourceRootNode);
  if (!sourceRootNode.name) {
    return {
      ...sourceRootNode,
      name: src,
      children: sourceRootNode.children
    };
  }
  const scriptNode = { ...sourceRootNode };
  scriptNode.name = src;
  scriptNode.children = [sourceRootNode];
  return scriptNode;
}
function getNetworkRequestSizes(request) {
  const resourceSize = request.args.data.decodedBodyLength;
  const transferSize = request.args.data.encodedDataLength;
  const headersTransferSize = 0;
  return { resourceSize, transferSize, headersTransferSize };
}
function createTreemapData(scripts, duplication) {
  const nodes = [];
  const htmlNodesByFrameId = /* @__PURE__ */ new Map();
  for (const script of scripts.scripts) {
    if (!script.url) {
      continue;
    }
    const name = script.url;
    const sizes = Trace10.Handlers.ModelHandlers.Scripts.getScriptGeneratedSizes(script);
    let node;
    if (script.sourceMap && sizes && !("errorMessage" in sizes)) {
      const sourcesData = {};
      for (const [source, resourceBytes] of Object.entries(sizes.files)) {
        const sourceData = {
          resourceBytes,
          encodedBytes: void 0
        };
        const key = Trace10.Extras.ScriptDuplication.normalizeSource(source);
        if (duplication.has(key)) {
          sourceData.duplicatedNormalizedModuleName = key;
        }
        sourcesData[source] = sourceData;
      }
      if (sizes.unmappedBytes) {
        const sourceData = {
          resourceBytes: sizes.unmappedBytes
        };
        sourcesData["(unmapped)"] = sourceData;
      }
      node = makeScriptNode(script.url, script.url, sourcesData);
    } else {
      node = {
        name,
        resourceBytes: script.content?.length ?? 0,
        encodedBytes: void 0
      };
    }
    if (script.inline) {
      let htmlNode = htmlNodesByFrameId.get(script.frame);
      if (!htmlNode) {
        htmlNode = {
          name,
          resourceBytes: 0,
          encodedBytes: void 0,
          children: []
        };
        htmlNodesByFrameId.set(script.frame, htmlNode);
        nodes.push(htmlNode);
      }
      htmlNode.resourceBytes += node.resourceBytes;
      node.name = script.content ? "(inline) " + script.content.trimStart().substring(0, 15) + "\u2026" : "(inline)";
      htmlNode.children?.push(node);
    } else {
      nodes.push(node);
      if (script.request) {
        const { transferSize, headersTransferSize } = getNetworkRequestSizes(script.request);
        const bodyTransferSize = transferSize - headersTransferSize;
        node.encodedBytes = bodyTransferSize;
      } else {
        node.encodedBytes = node.resourceBytes;
      }
    }
  }
  for (const [frameId, node] of htmlNodesByFrameId) {
    const script = scripts.scripts.find((s) => s.request?.args.data.resourceType === "Document" && s.request?.args.data.frame === frameId);
    if (script?.request) {
      const { resourceSize, transferSize, headersTransferSize } = getNetworkRequestSizes(script.request);
      const inlineScriptsPct = node.resourceBytes / resourceSize;
      const bodyTransferSize = transferSize - headersTransferSize;
      node.encodedBytes = Math.floor(bodyTransferSize * inlineScriptsPct);
    } else {
      node.encodedBytes = node.resourceBytes;
    }
  }
  return nodes;
}
export {
  AICallTree_exports as AICallTree,
  AIContext_exports as AIContext,
  EntityMapper_exports as EntityMapper,
  EntryName_exports as EntryName,
  EntryNodes_exports as EntryNodes,
  EntryStyles_exports as EntryStyles,
  Helpers_exports as Helpers,
  IgnoreList_exports as IgnoreList,
  ImageCache_exports as ImageCache,
  InsightAIContext_exports as InsightAIContext,
  SourceMapsResolver_exports as SourceMapsResolver,
  Treemap_exports as Treemap
};
//# sourceMappingURL=utils.js.map
