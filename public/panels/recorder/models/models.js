var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/recorder/models/ConverterIds.js
var ConverterIds_exports = {};

// gen/front_end/panels/recorder/models/RecorderSettings.js
var RecorderSettings_exports = {};
__export(RecorderSettings_exports, {
  RecorderSettings: () => RecorderSettings
});
import * as Common from "./../../../core/common/common.js";
import * as i18n from "./../../../core/i18n/i18n.js";

// gen/front_end/panels/recorder/models/Schema.js
var Schema_exports = {};
__export(Schema_exports, {
  AssertedEventType: () => AssertedEventType,
  SelectorType: () => SelectorType,
  StepType: () => StepType
});
import { AssertedEventType, SelectorType, StepType } from "./../../../third_party/puppeteer-replay/puppeteer-replay.js";

// gen/front_end/panels/recorder/models/RecorderSettings.js
var UIStrings = {
  /**
   * @description This string is used to generate the default name for the create recording form in the Recording panel.
   * The format is similar to the one used by MacOS to generate names for screenshots. Both {DATE} and {TIME} are localized
   * using the current locale.
   *
   * @example {2022-08-04} DATE
   * @example {10:32:48} TIME
   */
  defaultRecordingName: "Recording {DATE} at {TIME}"
};
var str_ = i18n.i18n.registerUIStrings("panels/recorder/models/RecorderSettings.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var RecorderSettings = class {
  #selectorAttribute = Common.Settings.Settings.instance().createSetting("recorder-selector-attribute", "");
  #speed = Common.Settings.Settings.instance().createSetting(
    "recorder-panel-replay-speed",
    "normal"
    /* PlayRecordingSpeed.NORMAL */
  );
  #replayExtension = Common.Settings.Settings.instance().createSetting("recorder-panel-replay-extension", "");
  #selectorTypes = /* @__PURE__ */ new Map();
  #preferredCopyFormat = Common.Settings.Settings.instance().createSetting(
    "recorder-preferred-copy-format",
    "json"
    /* ConverterIds.JSON */
  );
  constructor() {
    for (const selectorType of Object.values(SelectorType)) {
      this.#selectorTypes.set(selectorType, Common.Settings.Settings.instance().createSetting(`recorder-${selectorType}-selector-enabled`, true));
    }
  }
  get selectorAttribute() {
    return this.#selectorAttribute.get();
  }
  set selectorAttribute(value) {
    this.#selectorAttribute.set(value);
  }
  get speed() {
    return this.#speed.get();
  }
  set speed(speed) {
    this.#speed.set(speed);
  }
  get replayExtension() {
    return this.#replayExtension.get();
  }
  set replayExtension(replayExtension) {
    this.#replayExtension.set(replayExtension);
  }
  get defaultTitle() {
    const now = /* @__PURE__ */ new Date();
    return i18nString(UIStrings.defaultRecordingName, {
      DATE: now.toLocaleDateString(),
      TIME: now.toLocaleTimeString()
    });
  }
  get defaultSelectors() {
    return Object.values(SelectorType).filter((type) => this.getSelectorByType(type));
  }
  getSelectorByType(type) {
    return this.#selectorTypes.get(type)?.get();
  }
  setSelectorByType(type, value) {
    this.#selectorTypes.get(type)?.set(value);
  }
  get preferredCopyFormat() {
    return this.#preferredCopyFormat.get();
  }
  set preferredCopyFormat(value) {
    this.#preferredCopyFormat.set(value);
  }
};

// gen/front_end/panels/recorder/models/RecorderShortcutHelper.js
var RecorderShortcutHelper_exports = {};
__export(RecorderShortcutHelper_exports, {
  RecorderShortcutHelper: () => RecorderShortcutHelper
});
import * as UI from "./../../../ui/legacy/legacy.js";
var RecorderShortcutHelper = class {
  #abortController;
  #timeoutId = null;
  #timeout;
  constructor(timeout = 200) {
    this.#timeout = timeout;
    this.#abortController = new AbortController();
  }
  #cleanInternals() {
    this.#abortController.abort();
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
    }
    this.#abortController = new AbortController();
  }
  #handleCallback(callback) {
    this.#cleanInternals();
    void callback();
  }
  handleShortcut(callback) {
    this.#cleanInternals();
    document.addEventListener("keyup", (event) => {
      if (UI.KeyboardShortcut.KeyboardShortcut.eventHasCtrlEquivalentKey(event)) {
        this.#handleCallback(callback);
      }
    }, { signal: this.#abortController.signal });
    this.#timeoutId = setTimeout(() => this.#handleCallback(callback), this.#timeout);
  }
};

// gen/front_end/panels/recorder/models/RecordingPlayer.js
var RecordingPlayer_exports = {};
__export(RecordingPlayer_exports, {
  RecordingPlayer: () => RecordingPlayer,
  defaultTimeout: () => defaultTimeout
});
import * as Common2 from "./../../../core/common/common.js";
import * as SDK from "./../../../core/sdk/sdk.js";
import * as PuppeteerService from "./../../../services/puppeteer/puppeteer.js";
import * as PuppeteerReplay from "./../../../third_party/puppeteer-replay/puppeteer-replay.js";
var speedDelayMap = {
  [
    "normal"
    /* PlayRecordingSpeed.NORMAL */
  ]: 0,
  [
    "slow"
    /* PlayRecordingSpeed.SLOW */
  ]: 500,
  [
    "very_slow"
    /* PlayRecordingSpeed.VERY_SLOW */
  ]: 1e3,
  [
    "extremely_slow"
    /* PlayRecordingSpeed.EXTREMELY_SLOW */
  ]: 2e3
};
var defaultTimeout = 5e3;
function isPageTarget(target) {
  return Common2.ParsedURL.schemeIs(target.url, "devtools:") || target.type === "page" || target.type === "background_page" || target.type === "webview";
}
var RecordingPlayer = class _RecordingPlayer extends Common2.ObjectWrapper.ObjectWrapper {
  userFlow;
  speed;
  timeout;
  breakpointIndexes;
  steppingOver = false;
  aborted = false;
  #stopPromise = Promise.withResolvers();
  #abortPromise = Promise.withResolvers();
  #runner;
  constructor(userFlow, { speed, breakpointIndexes = /* @__PURE__ */ new Set() }) {
    super();
    this.userFlow = userFlow;
    this.speed = speed;
    this.timeout = userFlow.timeout || defaultTimeout;
    this.breakpointIndexes = breakpointIndexes;
  }
  #resolveAndRefreshStopPromise() {
    this.#stopPromise.resolve();
    this.#stopPromise = Promise.withResolvers();
  }
  static async connectPuppeteer() {
    const rootTarget = SDK.TargetManager.TargetManager.instance().rootTarget();
    if (!rootTarget) {
      throw new Error("Could not find the root target");
    }
    const primaryPageTarget = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!primaryPageTarget) {
      throw new Error("Could not find the primary page target");
    }
    const childTargetManager = primaryPageTarget.model(SDK.ChildTargetManager.ChildTargetManager);
    if (!childTargetManager) {
      throw new Error("Could not get childTargetManager");
    }
    const resourceTreeModel = primaryPageTarget.model(SDK.ResourceTreeModel.ResourceTreeModel);
    if (!resourceTreeModel) {
      throw new Error("Could not get resource tree model");
    }
    const mainFrame = resourceTreeModel.mainFrame;
    if (!mainFrame) {
      throw new Error("Could not find main frame");
    }
    const rootChildTargetManager = rootTarget.model(SDK.ChildTargetManager.ChildTargetManager);
    if (!rootChildTargetManager) {
      throw new Error("Could not find the child target manager class for the root target");
    }
    const result = await rootChildTargetManager.createParallelConnection(() => {
    });
    const connection = result.connection;
    const mainTargetId = await childTargetManager.getParentTargetId();
    const rootTargetId = await rootChildTargetManager.getParentTargetId();
    const { page, browser, puppeteerConnection } = await PuppeteerService.PuppeteerConnection.PuppeteerConnectionHelper.connectPuppeteerToConnectionViaTab({
      connection,
      rootTargetId,
      isPageTargetCallback: isPageTarget
    });
    if (!page) {
      throw new Error("could not find main page!");
    }
    browser.on("targetdiscovered", (targetInfo) => {
      if (targetInfo.type !== "page") {
        return;
      }
      if (targetInfo.targetId === mainTargetId) {
        return;
      }
      if (targetInfo.openerId !== mainTargetId) {
        return;
      }
      void puppeteerConnection._createSession(
        targetInfo,
        /* emulateAutoAttach= */
        true
      );
    });
    return { page, browser };
  }
  static async disconnectPuppeteer(browser) {
    try {
      const pages = await browser.pages();
      for (const page of pages) {
        const client = page._client();
        await client.send("Network.disable");
        await client.send("Page.disable");
        await client.send("Log.disable");
        await client.send("Performance.disable");
        await client.send("Runtime.disable");
        await client.send("Emulation.clearDeviceMetricsOverride");
        await client.send("Emulation.setAutomationOverride", { enabled: false });
        for (const frame of page.frames()) {
          const client2 = frame.client;
          await client2.send("Network.disable");
          await client2.send("Page.disable");
          await client2.send("Log.disable");
          await client2.send("Performance.disable");
          await client2.send("Runtime.disable");
          await client2.send("Emulation.setAutomationOverride", { enabled: false });
        }
      }
      await browser.disconnect();
    } catch (err) {
      console.error("Error disconnecting Puppeteer", err.message);
    }
  }
  async stop() {
    await Promise.race([this.#stopPromise, this.#abortPromise]);
  }
  get abortPromise() {
    return this.#abortPromise.promise;
  }
  abort() {
    this.aborted = true;
    this.#abortPromise.resolve();
    this.#runner?.abort();
  }
  disposeForTesting() {
    this.#stopPromise.resolve();
    this.#abortPromise.resolve();
  }
  continue() {
    this.steppingOver = false;
    this.#resolveAndRefreshStopPromise();
  }
  stepOver() {
    this.steppingOver = true;
    this.#resolveAndRefreshStopPromise();
  }
  updateBreakpointIndexes(breakpointIndexes) {
    this.breakpointIndexes = breakpointIndexes;
  }
  async play() {
    const { page, browser } = await _RecordingPlayer.connectPuppeteer();
    this.aborted = false;
    const player = this;
    class ExtensionWithBreak extends PuppeteerReplay.PuppeteerRunnerExtension {
      #speed;
      constructor(browser2, page2, { timeout, speed }) {
        super(browser2, page2, { timeout });
        this.#speed = speed;
      }
      async beforeEachStep(step, flow) {
        const { resolve, promise } = Promise.withResolvers();
        player.dispatchEventToListeners("Step", {
          step,
          resolve
        });
        await promise;
        const currentStepIndex = flow.steps.indexOf(step);
        const shouldStopAtCurrentStep = player.steppingOver || player.breakpointIndexes.has(currentStepIndex);
        const shouldWaitForSpeed = step.type !== "setViewport" && step.type !== "navigate" && !player.aborted;
        if (shouldStopAtCurrentStep) {
          player.dispatchEventToListeners(
            "Stop"
            /* Events.STOP */
          );
          await player.stop();
          player.dispatchEventToListeners(
            "Continue"
            /* Events.CONTINUE */
          );
        } else if (shouldWaitForSpeed) {
          await Promise.race([
            new Promise((resolve2) => setTimeout(resolve2, speedDelayMap[this.#speed])),
            player.abortPromise
          ]);
        }
      }
      async runStep(step, flow) {
        if (Common2.ParsedURL.schemeIs(page?.url(), "devtools:") && (step.type === "setViewport" || step.type === "navigate")) {
          return;
        }
        if (step.type === "navigate" && Common2.ParsedURL.schemeIs(step.url, "chrome:")) {
          throw new Error("Not allowed to replay on chrome:// URLs");
        }
        await this.page.bringToFront();
        await super.runStep(step, flow);
      }
    }
    const extension = new ExtensionWithBreak(browser, page, {
      timeout: this.timeout,
      speed: this.speed
    });
    this.#runner = await PuppeteerReplay.createRunner(this.userFlow, extension);
    let error;
    try {
      await this.#runner.run();
    } catch (err) {
      error = err;
      console.error("Replay error", err.message);
    } finally {
      await _RecordingPlayer.disconnectPuppeteer(browser);
    }
    if (this.aborted) {
      this.dispatchEventToListeners(
        "Abort"
        /* Events.ABORT */
      );
    } else if (error) {
      this.dispatchEventToListeners("Error", error);
    } else {
      this.dispatchEventToListeners(
        "Done"
        /* Events.DONE */
      );
    }
  }
};

// gen/front_end/panels/recorder/models/RecordingSession.js
var RecordingSession_exports = {};
__export(RecordingSession_exports, {
  RecordingSession: () => RecordingSession
});
import * as Common3 from "./../../../core/common/common.js";
import * as Platform from "./../../../core/platform/platform.js";
import * as SDK3 from "./../../../core/sdk/sdk.js";
import * as UI2 from "./../../../ui/legacy/legacy.js";
import * as Util from "./../util/util.js";

// gen/front_end/panels/recorder/models/SchemaUtils.js
var SchemaUtils_exports = {};
__export(SchemaUtils_exports, {
  areSelectorsEqual: () => areSelectorsEqual,
  createEmulateNetworkConditionsStep: () => createEmulateNetworkConditionsStep,
  createViewportStep: () => createViewportStep,
  maxTimeout: () => maxTimeout,
  minTimeout: () => minTimeout,
  parse: () => parse2,
  parseStep: () => parseStep2
});
import * as PuppeteerReplay2 from "./../../../third_party/puppeteer-replay/puppeteer-replay.js";
function createViewportStep(viewport) {
  return {
    type: StepType.SetViewport,
    width: viewport.clientWidth,
    height: viewport.clientHeight,
    // TODO read real parameters here
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: false
  };
}
function createEmulateNetworkConditionsStep(conditions) {
  return {
    type: StepType.EmulateNetworkConditions,
    download: conditions.download,
    upload: conditions.upload,
    latency: conditions.latency
  };
}
function areSelectorsEqual(stepA, stepB) {
  if ("selectors" in stepA && "selectors" in stepB) {
    return JSON.stringify(stepA.selectors) === JSON.stringify(stepB.selectors);
  }
  return !("selectors" in stepA) && !("selectors" in stepB);
}
var minTimeout = 1;
var maxTimeout = 3e4;
var parse2 = PuppeteerReplay2.parse;
var parseStep2 = PuppeteerReplay2.parseStep;

// gen/front_end/panels/recorder/models/SDKUtils.js
var SDKUtils_exports = {};
__export(SDKUtils_exports, {
  evaluateInAllFrames: () => evaluateInAllFrames,
  findFrameIdByExecutionContext: () => findFrameIdByExecutionContext,
  findTargetByExecutionContext: () => findTargetByExecutionContext,
  getTargetFrameContext: () => getTargetFrameContext,
  getTargetName: () => getTargetName,
  isFrameTargetInfo: () => isFrameTargetInfo
});
import * as SDK2 from "./../../../core/sdk/sdk.js";
function getTargetName(target) {
  if (SDK2.TargetManager.TargetManager.instance().primaryPageTarget() === target) {
    return "main";
  }
  return target.id() === "main" ? "main" : target.inspectedURL();
}
function getTargetFrameContext(target, frame) {
  const path = [];
  while (frame) {
    const parentFrame = frame.sameTargetParentFrame();
    if (!parentFrame) {
      break;
    }
    const childFrames = parentFrame.childFrames;
    const index = childFrames.indexOf(frame);
    path.unshift(index);
    frame = parentFrame;
  }
  return { target: getTargetName(target), frame: path };
}
async function evaluateInAllFrames(worldName, target, expression) {
  const runtimeModel = target.model(SDK2.RuntimeModel.RuntimeModel);
  const executionContexts = runtimeModel.executionContexts();
  const resourceTreeModel = target.model(SDK2.ResourceTreeModel.ResourceTreeModel);
  for (const frame of resourceTreeModel.frames()) {
    const executionContext = executionContexts.find((context) => context.frameId === frame.id);
    if (!executionContext) {
      continue;
    }
    const { executionContextId } = await target.pageAgent().invoke_createIsolatedWorld({ frameId: frame.id, worldName });
    await target.runtimeAgent().invoke_evaluate({
      expression,
      includeCommandLineAPI: true,
      contextId: executionContextId
    });
  }
}
function findTargetByExecutionContext(targets, executionContextId) {
  for (const target of targets) {
    const runtimeModel = target.model(SDK2.RuntimeModel.RuntimeModel);
    if (!runtimeModel) {
      continue;
    }
    for (const context of runtimeModel.executionContexts()) {
      if (context.id === executionContextId) {
        return target;
      }
    }
  }
  return;
}
function findFrameIdByExecutionContext(targets, executionContextId) {
  for (const target of targets) {
    const runtimeModel = target.model(SDK2.RuntimeModel.RuntimeModel);
    if (!runtimeModel) {
      continue;
    }
    for (const context of runtimeModel.executionContexts()) {
      if (context.id === executionContextId && context.frameId !== void 0) {
        return context.frameId;
      }
    }
  }
  return;
}
var isFrameTargetInfo = (target) => {
  return target.type === "page" || target.type === "iframe";
};

// gen/front_end/panels/recorder/models/RecordingSession.js
var formatAsJSLiteral = Platform.StringUtilities.formatAsJSLiteral;
var unrelatedNavigationTypes = /* @__PURE__ */ new Set([
  "typed",
  "address_bar",
  "auto_bookmark",
  "auto_subframe",
  "generated",
  "auto_toplevel",
  "reload",
  "keyword",
  "keyword_generated"
]);
var createShortcuts = (descriptors) => {
  const shortcuts = [];
  for (const shortcut of descriptors) {
    for (const key of shortcut) {
      const shortcutBase = { meta: false, ctrl: false, shift: false, alt: false, keyCode: -1 };
      const { keyCode, modifiers } = UI2.KeyboardShortcut.KeyboardShortcut.keyCodeAndModifiersFromKey(key);
      shortcutBase.keyCode = keyCode;
      const modifiersMap = UI2.KeyboardShortcut.Modifiers;
      shortcutBase.ctrl = Boolean(modifiers & modifiersMap.Ctrl.value);
      shortcutBase.meta = Boolean(modifiers & modifiersMap.Meta.value);
      shortcutBase.shift = Boolean(modifiers & modifiersMap.Shift.value);
      shortcutBase.shift = Boolean(modifiers & modifiersMap.Alt.value);
      if (shortcutBase.keyCode !== -1) {
        shortcuts.push(shortcutBase);
      }
    }
  }
  return shortcuts;
};
var evaluateInAllTargets = async (worldName, targets, expression) => {
  await Promise.all(targets.map((target) => evaluateInAllFrames(worldName, target, expression)));
};
var RecorderBinding = Object.freeze({
  addStep: "addStep",
  stopShortcut: "stopShortcut"
});
var RecordingSession = class _RecordingSession extends Common3.ObjectWrapper.ObjectWrapper {
  #target;
  #pageAgent;
  #targetAgent;
  #networkManager;
  #resourceTreeModel;
  #targets = /* @__PURE__ */ new Map();
  #lastNavigationEntryIdByTarget = /* @__PURE__ */ new Map();
  #lastNavigationHistoryByTarget = /* @__PURE__ */ new Map();
  #scriptIdentifiers = /* @__PURE__ */ new Map();
  #runtimeEventDescriptors = /* @__PURE__ */ new Map();
  #childTargetEventDescriptors = /* @__PURE__ */ new Map();
  #mutex = new Common3.Mutex.Mutex();
  #userFlow;
  #stepsPendingNavigationByTargetId = /* @__PURE__ */ new Map();
  #started = false;
  #selectorTypesToRecord = [];
  constructor(target, opts) {
    super();
    this.#target = target;
    this.#pageAgent = target.pageAgent();
    this.#targetAgent = target.targetAgent();
    this.#networkManager = SDK3.NetworkManager.MultitargetNetworkManager.instance();
    const resourceTreeModel = target.model(SDK3.ResourceTreeModel.ResourceTreeModel);
    if (!resourceTreeModel) {
      throw new Error("ResourceTreeModel is missing for the target: " + target.id());
    }
    this.#resourceTreeModel = resourceTreeModel;
    this.#target = target;
    this.#userFlow = { title: opts.title, selectorAttribute: opts.selectorAttribute, steps: [] };
    this.#selectorTypesToRecord = opts.selectorTypesToRecord;
  }
  /**
   * @returns - A deep copy of the session's current user flow.
   */
  cloneUserFlow() {
    return structuredClone(this.#userFlow);
  }
  /**
   * Overwrites the session's current user flow with the given one.
   *
   * This method will not dispatch an `recordingupdated` event.
   */
  overwriteUserFlow(flow) {
    this.#userFlow = structuredClone(flow);
  }
  async start() {
    if (this.#started) {
      throw new Error("The session has started");
    }
    this.#started = true;
    this.#networkManager.addEventListener("ConditionsChanged", this.#appendCurrentNetworkStep, this);
    await this.#appendInitialSteps();
    await this.#pageAgent.invoke_bringToFront();
    await this.#setUpTarget(this.#target);
  }
  async stop() {
    await this.#dispatchRecordingUpdate();
    void this.#mutex.acquire();
    await Promise.all([...this.#targets.values()].map(this.#tearDownTarget));
    this.#networkManager.removeEventListener("ConditionsChanged", this.#appendCurrentNetworkStep, this);
  }
  async #appendInitialSteps() {
    const mainFrame = this.#resourceTreeModel.mainFrame;
    if (!mainFrame) {
      throw new Error("Could not find mainFrame.");
    }
    if (this.#networkManager.networkConditions() !== SDK3.NetworkManager.NoThrottlingConditions) {
      this.#appendCurrentNetworkStep();
    }
    const { cssLayoutViewport } = await this.#target.pageAgent().invoke_getLayoutMetrics();
    this.#appendStep(createViewportStep(cssLayoutViewport));
    const history = await this.#resourceTreeModel.navigationHistory();
    if (history) {
      const entry = history.entries[history.currentIndex];
      this.#lastNavigationEntryIdByTarget.set(this.#target.id(), entry.id);
      this.#lastNavigationHistoryByTarget.set(this.#target.id(), history.entries.map((entry2) => entry2.id));
      this.#userFlow.steps.push({
        type: StepType.Navigate,
        url: entry.url,
        assertedEvents: [{ type: AssertedEventType.Navigation, url: entry.url, title: entry.title }]
      });
    } else {
      this.#userFlow.steps.push({
        type: StepType.Navigate,
        url: mainFrame.url,
        assertedEvents: [
          { type: AssertedEventType.Navigation, url: mainFrame.url, title: await this.#getDocumentTitle(this.#target) }
        ]
      });
    }
    void this.#dispatchRecordingUpdate();
  }
  async #getDocumentTitle(target) {
    const response = await target.runtimeAgent().invoke_evaluate({ expression: "document.title" });
    return response.result?.value || "";
  }
  #appendCurrentNetworkStep() {
    const networkConditions = this.#networkManager.networkConditions();
    this.#appendStep(createEmulateNetworkConditionsStep(networkConditions));
  }
  #updateTimeout;
  #updateListeners = [];
  #dispatchRecordingUpdate() {
    if (this.#updateTimeout) {
      clearTimeout(this.#updateTimeout);
    }
    this.#updateTimeout = setTimeout(() => {
      this.dispatchEventToListeners("recordingupdated", structuredClone(this.#userFlow));
      this.#updateTimeout = void 0;
      for (const resolve of this.#updateListeners) {
        resolve();
      }
      this.#updateListeners.length = 0;
    }, 100);
    return new Promise((resolve) => {
      this.#updateListeners.push(resolve);
    });
  }
  get #previousStep() {
    return this.#userFlow.steps.slice(-1)[0];
  }
  /**
   * Contains keys that are pressed related to a change step.
   */
  #pressedChangeKeys = /* @__PURE__ */ new Set();
  /**
   * Shift-reduces a given step into the user flow.
   */
  #appendStep(step) {
    switch (step.type) {
      case "doubleClick": {
        for (let j = this.#userFlow.steps.length - 1; j > 0; j--) {
          const previousStep = this.#userFlow.steps[j];
          if (previousStep.type === "click") {
            step.selectors = previousStep.selectors;
            this.#userFlow.steps.splice(j, 1);
            break;
          }
        }
        break;
      }
      case "change": {
        const previousStep = this.#previousStep;
        if (!previousStep) {
          break;
        }
        switch (previousStep.type) {
          // Merging changes.
          case "change":
            if (!areSelectorsEqual(step, previousStep)) {
              break;
            }
            this.#userFlow.steps[this.#userFlow.steps.length - 1] = step;
            void this.#dispatchRecordingUpdate();
            return;
          // Ignore key downs resulting in inputs.
          case "keyDown":
            this.#pressedChangeKeys.add(previousStep.key);
            this.#userFlow.steps.pop();
            this.#appendStep(step);
            return;
        }
        break;
      }
      case "keyDown": {
        if (this.#pressedChangeKeys.has(step.key)) {
          return;
        }
        break;
      }
      case "keyUp": {
        if (this.#pressedChangeKeys.has(step.key)) {
          this.#pressedChangeKeys.delete(step.key);
          return;
        }
        break;
      }
    }
    this.#userFlow.steps.push(step);
    void this.#dispatchRecordingUpdate();
  }
  #handleBeforeUnload(context, sdkTarget) {
    const lastStep = this.#userFlow.steps[this.#userFlow.steps.length - 1];
    if (lastStep && !lastStep.assertedEvents?.find((event) => event.type === AssertedEventType.Navigation)) {
      const target = context.target || "main";
      const frameSelector = (context.frame || []).join(",");
      const lastStepTarget = lastStep.target || "main";
      const lastStepFrameSelector = (("frame" in lastStep ? lastStep.frame : []) || []).join(",");
      if (target === lastStepTarget && frameSelector === lastStepFrameSelector) {
        lastStep.assertedEvents = [{ type: AssertedEventType.Navigation }];
        this.#stepsPendingNavigationByTargetId.set(sdkTarget.id(), lastStep);
        void this.#dispatchRecordingUpdate();
      }
    }
  }
  #replaceUnloadWithNavigation(target, event) {
    const stepPendingNavigation = this.#stepsPendingNavigationByTargetId.get(target.id());
    if (!stepPendingNavigation) {
      return;
    }
    const step = stepPendingNavigation;
    if (!step.assertedEvents) {
      return;
    }
    const navigationEvent = step.assertedEvents.find((event2) => event2.type === AssertedEventType.Navigation);
    if (!navigationEvent || navigationEvent.url) {
      return;
    }
    navigationEvent.url = event.url;
    navigationEvent.title = event.title;
    void this.#dispatchRecordingUpdate();
  }
  #handleStopShortcutBinding(event) {
    const shortcutLength = Number(event.data.payload);
    for (let index = 0; index < shortcutLength - 1; index++) {
      this.#userFlow.steps.pop();
    }
    this.dispatchEventToListeners("recordingstopped", structuredClone(this.#userFlow));
  }
  #receiveBindingCalled(target, event) {
    switch (event.data.name) {
      case RecorderBinding.stopShortcut:
        this.#handleStopShortcutBinding(event);
        return;
      case RecorderBinding.addStep:
        this.#handleAddStepBinding(target, event);
        return;
      default:
        return;
    }
  }
  #handleAddStepBinding(target, event) {
    const executionContextId = event.data.executionContextId;
    let frameId;
    const runtimeModel = target.model(SDK3.RuntimeModel.RuntimeModel);
    if (runtimeModel) {
      for (const context2 of runtimeModel.executionContexts()) {
        if (context2.id === executionContextId) {
          frameId = context2.frameId;
          break;
        }
      }
    }
    if (!frameId) {
      throw new Error("No execution context found for the binding call + " + JSON.stringify(event.data));
    }
    const step = JSON.parse(event.data.payload);
    const resourceTreeModel = target.model(SDK3.ResourceTreeModel.ResourceTreeModel);
    const frame = resourceTreeModel.frameForId(frameId);
    if (!frame) {
      throw new Error("Could not find frame.");
    }
    const context = getTargetFrameContext(target, frame);
    if (step.type === "beforeUnload") {
      this.#handleBeforeUnload(context, target);
      return;
    }
    switch (step.type) {
      case "change": {
        this.#appendStep({
          type: "change",
          value: step.value,
          selectors: step.selectors,
          frame: context.frame.length ? context.frame : void 0,
          target: context.target
        });
        break;
      }
      case "doubleClick": {
        this.#appendStep({
          type: "doubleClick",
          target: context.target,
          selectors: step.selectors,
          offsetY: step.offsetY,
          offsetX: step.offsetX,
          frame: context.frame.length ? context.frame : void 0,
          deviceType: step.deviceType,
          button: step.button
        });
        break;
      }
      case "click": {
        this.#appendStep({
          type: "click",
          target: context.target,
          selectors: step.selectors,
          offsetY: step.offsetY,
          offsetX: step.offsetX,
          frame: context.frame.length ? context.frame : void 0,
          duration: step.duration,
          deviceType: step.deviceType,
          button: step.button
        });
        break;
      }
      case "keyUp": {
        this.#appendStep({
          type: "keyUp",
          key: step.key,
          frame: context.frame.length ? context.frame : void 0,
          target: context.target
        });
        break;
      }
      case "keyDown": {
        this.#appendStep({
          type: "keyDown",
          frame: context.frame.length ? context.frame : void 0,
          target: context.target,
          key: step.key
        });
        break;
      }
      default:
        throw new Error("Unhandled client event");
    }
  }
  #getStopShortcuts() {
    const descriptors = UI2.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction("chrome-recorder.start-recording").map((key) => key.descriptors.map((press) => press.key));
    return createShortcuts(descriptors);
  }
  static get #allowUntrustedEvents() {
    try {
      Common3.Settings.Settings.instance().settingForTest("untrusted-recorder-events");
      return true;
    } catch {
    }
    return false;
  }
  #setUpTarget = async (target) => {
    if (target.type() !== SDK3.Target.Type.FRAME) {
      return;
    }
    this.#targets.set(target.id(), target);
    const a11yModel = target.model(SDK3.AccessibilityModel.AccessibilityModel);
    Platform.assertNotNullOrUndefined(a11yModel);
    await a11yModel.resumeModel();
    await this.#addBindings(target);
    await this.#injectApplicationScript(target);
    const childTargetManager = target.model(SDK3.ChildTargetManager.ChildTargetManager);
    Platform.assertNotNullOrUndefined(childTargetManager);
    this.#childTargetEventDescriptors.set(target, [
      childTargetManager.addEventListener("TargetCreated", this.#receiveTargetCreated.bind(this, target)),
      childTargetManager.addEventListener("TargetDestroyed", this.#receiveTargetClosed.bind(this, target)),
      childTargetManager.addEventListener("TargetInfoChanged", this.#receiveTargetInfoChanged.bind(this, target))
    ]);
    await Promise.all(childTargetManager.childTargets().map(this.#setUpTarget));
  };
  #tearDownTarget = async (target) => {
    const descriptors = this.#childTargetEventDescriptors.get(target);
    if (descriptors) {
      Common3.EventTarget.removeEventListeners(descriptors);
    }
    await this.#injectCleanUpScript(target);
    await this.#removeBindings(target);
  };
  async #addBindings(target) {
    const runtimeModel = target.model(SDK3.RuntimeModel.RuntimeModel);
    Platform.assertNotNullOrUndefined(runtimeModel);
    this.#runtimeEventDescriptors.set(target, [runtimeModel.addEventListener(SDK3.RuntimeModel.Events.BindingCalled, this.#receiveBindingCalled.bind(this, target))]);
    await Promise.all(Object.values(RecorderBinding).map((name) => runtimeModel.addBinding({ name, executionContextName: Util.DEVTOOLS_RECORDER_WORLD_NAME })));
  }
  async #removeBindings(target) {
    await Promise.all(Object.values(RecorderBinding).map((name) => target.runtimeAgent().invoke_removeBinding({ name })));
    const descriptors = this.#runtimeEventDescriptors.get(target);
    if (descriptors) {
      Common3.EventTarget.removeEventListeners(descriptors);
    }
  }
  async #injectApplicationScript(target) {
    const injectedScript = await Util.InjectedScript.get();
    const script = `
      ${injectedScript};DevToolsRecorder.startRecording({getAccessibleName, getAccessibleRole}, {
        debug: ${Util.isDebugBuild},
        allowUntrustedEvents: ${_RecordingSession.#allowUntrustedEvents},
        selectorTypesToRecord: ${JSON.stringify(this.#selectorTypesToRecord)},
        selectorAttribute: ${this.#userFlow.selectorAttribute ? formatAsJSLiteral(this.#userFlow.selectorAttribute) : void 0},
        stopShortcuts: ${JSON.stringify(this.#getStopShortcuts())},
      });
    `;
    const [{ identifier }] = await Promise.all([
      target.pageAgent().invoke_addScriptToEvaluateOnNewDocument({ source: script, worldName: Util.DEVTOOLS_RECORDER_WORLD_NAME, includeCommandLineAPI: true }),
      evaluateInAllFrames(Util.DEVTOOLS_RECORDER_WORLD_NAME, target, script)
    ]);
    this.#scriptIdentifiers.set(target.id(), identifier);
  }
  async #injectCleanUpScript(target) {
    const scriptId = this.#scriptIdentifiers.get(target.id());
    if (!scriptId) {
      return;
    }
    await target.pageAgent().invoke_removeScriptToEvaluateOnNewDocument({ identifier: scriptId });
    await evaluateInAllTargets(Util.DEVTOOLS_RECORDER_WORLD_NAME, [...this.#targets.values()], "DevToolsRecorder.stopRecording()");
  }
  #receiveTargetCreated(target, event) {
    void this.#handleEvent({ type: "targetCreated", event, target });
  }
  #receiveTargetClosed(_eventTarget, event) {
    const childTarget = this.#targets.get(event.data);
    if (childTarget) {
      void this.#handleEvent({ type: "targetClosed", event, target: childTarget });
    }
  }
  #receiveTargetInfoChanged(eventTarget, event) {
    const target = this.#targets.get(event.data.targetId) || eventTarget;
    void this.#handleEvent({ type: "targetInfoChanged", event, target });
  }
  #handleEvent(event) {
    return this.#mutex.run(async () => {
      try {
        if (Util.isDebugBuild) {
          console.time(`Processing ${JSON.stringify(event)}`);
        }
        switch (event.type) {
          case "targetClosed":
            await this.#handleTargetClosed(event);
            break;
          case "targetCreated":
            await this.#handleTargetCreated(event);
            break;
          case "targetInfoChanged":
            await this.#handleTargetInfoChanged(event);
            break;
        }
        if (Util.isDebugBuild) {
          console.timeEnd(`Processing ${JSON.stringify(event)}`);
        }
      } catch (err) {
        console.error("Error happened while processing recording events: ", err.message, err.stack);
      }
    });
  }
  async #handleTargetCreated(event) {
    if (event.event.data.type !== "page" && event.event.data.type !== "iframe") {
      return;
    }
    await this.#targetAgent.invoke_attachToTarget({ targetId: event.event.data.targetId, flatten: true });
    const target = SDK3.TargetManager.TargetManager.instance().targets().find((t) => t.id() === event.event.data.targetId);
    if (!target) {
      throw new Error("Could not find target.");
    }
    await this.#setUpTarget(target);
    window.dispatchEvent(new Event("recorderAttachedToTarget"));
  }
  async #handleTargetClosed(event) {
    const stepPendingNavigation = this.#stepsPendingNavigationByTargetId.get(event.target.id());
    if (stepPendingNavigation) {
      delete stepPendingNavigation.assertedEvents;
      this.#stepsPendingNavigationByTargetId.delete(event.target.id());
    }
  }
  async #handlePageNavigation(resourceTreeModel, target) {
    const history = await resourceTreeModel.navigationHistory();
    if (!history) {
      return false;
    }
    const entry = history.entries[history.currentIndex];
    const prevId = this.#lastNavigationEntryIdByTarget.get(target.id());
    if (prevId === entry.id) {
      return true;
    }
    this.#lastNavigationEntryIdByTarget.set(target.id(), entry.id);
    const lastHistory = this.#lastNavigationHistoryByTarget.get(target.id()) || [];
    this.#lastNavigationHistoryByTarget.set(target.id(), history.entries.map((entry2) => entry2.id));
    if (unrelatedNavigationTypes.has(entry.transitionType) || lastHistory.includes(entry.id)) {
      const stepPendingNavigation = this.#stepsPendingNavigationByTargetId.get(target.id());
      if (stepPendingNavigation) {
        delete stepPendingNavigation.assertedEvents;
        this.#stepsPendingNavigationByTargetId.delete(target.id());
      }
      this.#appendStep({
        type: StepType.Navigate,
        url: entry.url,
        assertedEvents: [{ type: AssertedEventType.Navigation, url: entry.url, title: entry.title }]
      });
    } else {
      this.#replaceUnloadWithNavigation(target, { type: AssertedEventType.Navigation, url: entry.url, title: entry.title });
    }
    return true;
  }
  async #handleTargetInfoChanged(event) {
    if (event.event.data.type !== "page" && event.event.data.type !== "iframe") {
      return;
    }
    const target = event.target;
    const resourceTreeModel = target.model(SDK3.ResourceTreeModel.ResourceTreeModel);
    if (!resourceTreeModel) {
      throw new Error("ResourceTreeModel is missing in handleNavigation");
    }
    if (event.event.data.type === "iframe") {
      this.#replaceUnloadWithNavigation(target, { type: AssertedEventType.Navigation, url: event.event.data.url, title: await this.#getDocumentTitle(target) });
    } else if (event.event.data.type === "page") {
      if (await this.#handlePageNavigation(resourceTreeModel, target)) {
        return;
      }
      await this.#waitForDOMContentLoadedWithTimeout(resourceTreeModel, 500);
      this.#replaceUnloadWithNavigation(target, { type: AssertedEventType.Navigation, url: event.event.data.url, title: await this.#getDocumentTitle(target) });
    }
  }
  async #waitForDOMContentLoadedWithTimeout(resourceTreeModel, timeout) {
    const { resolve: resolver, promise: contentLoadedPromise } = Promise.withResolvers();
    const onDomContentLoaded = () => {
      resourceTreeModel.removeEventListener(SDK3.ResourceTreeModel.Events.DOMContentLoaded, onDomContentLoaded);
      resolver();
    };
    resourceTreeModel.addEventListener(SDK3.ResourceTreeModel.Events.DOMContentLoaded, onDomContentLoaded);
    await Promise.any([
      contentLoadedPromise,
      new Promise((resolve) => setTimeout(() => {
        resourceTreeModel.removeEventListener(SDK3.ResourceTreeModel.Events.DOMContentLoaded, onDomContentLoaded);
        resolve();
      }, timeout))
    ]);
  }
};

// gen/front_end/panels/recorder/models/RecordingSettings.js
var RecordingSettings_exports = {};

// gen/front_end/panels/recorder/models/RecordingStorage.js
var RecordingStorage_exports = {};
__export(RecordingStorage_exports, {
  RecordingStorage: () => RecordingStorage
});
import * as Common4 from "./../../../core/common/common.js";
var instance = null;
var UUIDGenerator = class {
  next() {
    return crypto.randomUUID();
  }
};
var RecordingStorage = class _RecordingStorage {
  #recordingsSetting;
  #mutex = new Common4.Mutex.Mutex();
  #idGenerator = new UUIDGenerator();
  constructor() {
    this.#recordingsSetting = Common4.Settings.Settings.instance().createSetting("recorder-recordings-ng", []);
  }
  clearForTest() {
    this.#recordingsSetting.set([]);
    this.#idGenerator = new UUIDGenerator();
  }
  setIdGeneratorForTest(idGenerator) {
    this.#idGenerator = idGenerator;
  }
  async saveRecording(flow) {
    const release = await this.#mutex.acquire();
    try {
      const recordings = await this.#recordingsSetting.forceGet();
      const storageName = this.#idGenerator.next();
      const recording = { storageName, flow };
      recordings.push(recording);
      this.#recordingsSetting.set(recordings);
      return recording;
    } finally {
      release();
    }
  }
  async updateRecording(storageName, flow) {
    const release = await this.#mutex.acquire();
    try {
      const recordings = await this.#recordingsSetting.forceGet();
      const recording = recordings.find((recording2) => recording2.storageName === storageName);
      if (!recording) {
        throw new Error("No recording is found during updateRecording");
      }
      recording.flow = flow;
      this.#recordingsSetting.set(recordings);
      return recording;
    } finally {
      release();
    }
  }
  async deleteRecording(storageName) {
    const release = await this.#mutex.acquire();
    try {
      const recordings = await this.#recordingsSetting.forceGet();
      this.#recordingsSetting.set(recordings.filter((recording) => recording.storageName !== storageName));
    } finally {
      release();
    }
  }
  getRecording(storageName) {
    const recordings = this.#recordingsSetting.get();
    return recordings.find((recording) => recording.storageName === storageName);
  }
  getRecordings() {
    return this.#recordingsSetting.get();
  }
  static instance() {
    if (!instance) {
      instance = new _RecordingStorage();
    }
    return instance;
  }
};

// gen/front_end/panels/recorder/models/ScreenshotStorage.js
var ScreenshotStorage_exports = {};
__export(ScreenshotStorage_exports, {
  ScreenshotStorage: () => ScreenshotStorage
});
import * as Common5 from "./../../../core/common/common.js";
var instance2 = null;
var DEFAULT_MAX_STORAGE_SIZE = 50 * 1024 * 1024;
var ScreenshotStorage = class _ScreenshotStorage {
  #screenshotSettings;
  #screenshots;
  #maxStorageSize;
  constructor(maxStorageSize = DEFAULT_MAX_STORAGE_SIZE) {
    this.#screenshotSettings = Common5.Settings.Settings.instance().createSetting("recorder-screenshots", []);
    this.#screenshots = this.#loadFromSettings();
    this.#maxStorageSize = maxStorageSize;
  }
  clear() {
    this.#screenshotSettings.set([]);
    this.#screenshots = /* @__PURE__ */ new Map();
  }
  getScreenshotForSection(recordingName, index) {
    const screenshot = this.#screenshots.get(this.#calculateKey(recordingName, index));
    if (!screenshot) {
      return null;
    }
    this.#syncWithSettings(screenshot);
    return screenshot.data;
  }
  storeScreenshotForSection(recordingName, index, data) {
    const screenshot = { recordingName, index, data };
    this.#screenshots.set(this.#calculateKey(recordingName, index), screenshot);
    this.#syncWithSettings(screenshot);
  }
  deleteScreenshotsForRecording(recordingName) {
    for (const [key, entry] of this.#screenshots) {
      if (entry.recordingName === recordingName) {
        this.#screenshots.delete(key);
      }
    }
    this.#syncWithSettings();
  }
  #calculateKey(recordingName, index) {
    return `${recordingName}:${index}`;
  }
  #loadFromSettings() {
    const screenshots = /* @__PURE__ */ new Map();
    const data = this.#screenshotSettings.get();
    for (const item of data) {
      screenshots.set(this.#calculateKey(item.recordingName, item.index), item);
    }
    return screenshots;
  }
  #syncWithSettings(modifiedScreenshot) {
    if (modifiedScreenshot) {
      const key = this.#calculateKey(modifiedScreenshot.recordingName, modifiedScreenshot.index);
      this.#screenshots.delete(key);
      this.#screenshots.set(key, modifiedScreenshot);
    }
    const screenshots = [];
    let currentStorageSize = 0;
    for (const [key, screenshot] of Array.from(this.#screenshots.entries()).reverse()) {
      if (currentStorageSize < this.#maxStorageSize) {
        currentStorageSize += screenshot.data.length;
        screenshots.push(screenshot);
      } else {
        this.#screenshots.delete(key);
      }
    }
    this.#screenshotSettings.set(screenshots.reverse());
  }
  static instance(opts = { forceNew: null, maxStorageSize: DEFAULT_MAX_STORAGE_SIZE }) {
    const { forceNew, maxStorageSize } = opts;
    if (!instance2 || forceNew) {
      instance2 = new _ScreenshotStorage(maxStorageSize);
    }
    return instance2;
  }
};

// gen/front_end/panels/recorder/models/ScreenshotUtils.js
var ScreenshotUtils_exports = {};
__export(ScreenshotUtils_exports, {
  resizeScreenshot: () => resizeScreenshot,
  takeScreenshot: () => takeScreenshot
});
import * as SDK4 from "./../../../core/sdk/sdk.js";
var SCREENSHOT_WIDTH = 160;
var SCREENSHOT_MAX_HEIGHT = 240;
async function captureScreenshot() {
  const mainTarget = SDK4.TargetManager.TargetManager.instance().primaryPageTarget();
  if (!mainTarget) {
    throw new Error("Could not find main target");
  }
  const { data } = await mainTarget.pageAgent().invoke_captureScreenshot({});
  if (!data) {
    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  }
  return "data:image/png;base64," + data;
}
async function resizeScreenshot(data) {
  const img = new Image();
  const promise = new Promise((resolve) => {
    img.onload = resolve;
  });
  img.src = data;
  await promise;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("Could not create context.");
  }
  const aspectRatio = img.width / img.height;
  canvas.width = SCREENSHOT_WIDTH;
  canvas.height = Math.min(SCREENSHOT_MAX_HEIGHT, SCREENSHOT_WIDTH / aspectRatio);
  const bitmap = await createImageBitmap(img, {
    resizeWidth: SCREENSHOT_WIDTH,
    resizeQuality: "high"
  });
  context.drawImage(bitmap, 0, 0);
  return canvas.toDataURL("image/png");
}
async function takeScreenshot() {
  const data = await captureScreenshot();
  return await resizeScreenshot(data);
}

// gen/front_end/panels/recorder/models/Section.js
var Section_exports = {};
__export(Section_exports, {
  buildSections: () => buildSections
});
function startNewSection(step) {
  const navigationEvent = step.assertedEvents?.find((event) => event.type === "navigation");
  if (step.type === "navigate") {
    return {
      title: navigationEvent?.title || "",
      url: step.url,
      steps: [],
      causingStep: step
    };
  }
  if (navigationEvent) {
    return {
      title: navigationEvent.title || "",
      url: navigationEvent.url || "",
      steps: []
    };
  }
  return null;
}
function buildSections(steps) {
  let currentSection = null;
  const sections = [];
  for (const step of steps) {
    if (currentSection) {
      currentSection.steps.push(step);
    } else if (step.type === "navigate") {
      currentSection = startNewSection(step);
      continue;
    } else {
      currentSection = { title: "Current page", url: "", steps: [step] };
    }
    const nextSection = startNewSection(step);
    if (nextSection) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = nextSection;
    }
  }
  if (currentSection && (!sections.length || currentSection.steps.length)) {
    sections.push(currentSection);
  }
  return sections;
}

// gen/front_end/panels/recorder/models/Tooltip.js
var Tooltip_exports = {};
__export(Tooltip_exports, {
  getTooltipForActions: () => getTooltipForActions
});
import * as UI3 from "./../../../ui/legacy/legacy.js";
function getTooltipForActions(translation, action) {
  let title = translation;
  const shortcuts = UI3.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction(action);
  for (const shortcut of shortcuts) {
    title += ` - ${shortcut.title()}`;
  }
  return title;
}
export {
  ConverterIds_exports as ConverterIds,
  RecorderSettings_exports as RecorderSettings,
  RecorderShortcutHelper_exports as RecorderShortcutHelper,
  RecordingPlayer_exports as RecordingPlayer,
  RecordingSession_exports as RecordingSession,
  RecordingSettings_exports as RecordingSettings,
  RecordingStorage_exports as RecordingStorage,
  SDKUtils_exports as SDKUtils,
  Schema_exports as Schema,
  SchemaUtils_exports as SchemaUtils,
  ScreenshotStorage_exports as ScreenshotStorage,
  ScreenshotUtils_exports as ScreenshotUtils,
  Section_exports as Section,
  Tooltip_exports as Tooltip
};
//# sourceMappingURL=models.js.map
