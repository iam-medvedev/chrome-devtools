var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/recorder/RecorderController.js
var RecorderController_exports = {};
__export(RecorderController_exports, {
  RecorderController: () => RecorderController
});
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import * as Root from "./../../core/root/root.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Bindings from "./../../models/bindings/bindings.js";
import * as PublicExtensions from "./../../models/extensions/extensions.js";
import * as PanelCommon from "./../common/common.js";
import * as Emulation from "./../emulation/emulation.js";
import * as Tracing from "./../../services/tracing/tracing.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";
import * as Components from "./components/components.js";
import * as Converters from "./converters/converters.js";
import * as Extensions from "./extensions/extensions.js";
import * as Models from "./models/models.js";

// gen/front_end/panels/recorder/recorderController.css.js
var recorderController_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: inherit;
}

*:focus,
*:focus-visible {
  outline: none;
}

:host {
  overflow-x: auto;
}

:host,
devtools-create-recording-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  background-color: var(--sys-color-cdt-base-container);
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  border-bottom: 1px solid var(--sys-color-divider);
  padding: 0 5px;
  gap: 3px;
  flex-shrink: 0;
}

.separator {
  background-color: var(--sys-color-divider);
  width: 1px;
  height: 17px;
  margin: 0;
}

select {
  appearance: none;
  user-select: none;
  border: none;
  border-radius: var(--sys-shape-corner-extra-small);
  height: var(--sys-size-9);
  max-width: 140px;
  min-width: 140px;
  padding: 0 var(--sys-size-6) 0 var(--sys-size-5);
  position: relative;
  color: var(--sys-color-on-surface);
  background-color: transparent;
  text-overflow: ellipsis;
  background-image: var(--combobox-dropdown-arrow);
  background-position: right center;
  background-repeat: no-repeat;

  &:hover {
    background-color: var(--sys-color-state-hover-on-subtle);
  }

  &:active {
    background-color: var(--sys-color-state-ripple-neutral-on-subtle);
  }

  &:hover:active {
    background: var(--combobox-dropdown-arrow),
      linear-gradient(
        var(--sys-color-state-hover-on-subtle),
        var(--sys-color-state-hover-on-subtle)
      ),
      linear-gradient(
        var(--sys-color-state-ripple-neutral-on-subtle),
        var(--sys-color-state-ripple-neutral-on-subtle)
      );
    background-position: right center;
    background-repeat: no-repeat;
  }

  &:disabled {
    pointer-events: none;
    color: var(--sys-color-state-disabled);
    background-color: var(--sys-color-state-disabled-container);
  }

  &:focus-visible {
    outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
  }
}

select option {
  background-color: var(--sys-color-cdt-base-container);
  color: var(--sys-color-on-surface);
}

devtools-menu {
  width: 0;
  height: 0;
  position: absolute;
}

devtools-recording-list-view {
  overflow: auto;
}

.error {
  color: var(--sys-color-error);
  border: 1px solid var(--sys-color-error);
  background-color: var(--sys-color-error-container);
  padding: 4px;
}

.feedback {
  margin-left: auto;
  margin-right: 4px;
}

.feedback .x-link {
  letter-spacing: 0.03em;
  text-decoration-line: underline;
  font-size: var(--sys-typescale-body4-size);
  line-height: 16px;
  color: var(--sys-color-primary);
  outline-offset: 3px;
}

.feedback .x-link:focus-visible,
.empty-state-description .x-link:focus-visible {
  outline: -webkit-focus-ring-color auto 1px;
}

.empty-state {
  margin: var(--sys-size-5);
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  min-height: fit-content;
  min-width: fit-content;

  > * {
    max-width: var(--sys-size-29);
  }

  .empty-state-header {
    font: var(--sys-typescale-headline5);
    margin-bottom: var(--sys-size-3);
  }

  .empty-state-description {
    font: var(--sys-typescale-body4-regular);
    color: var(--sys-color-on-surface-subtle);

    > x-link {
      white-space: nowrap;
      margin-left: var(--sys-size-3);
      cursor: pointer;
      text-decoration: underline;
      color: var(--sys-color-primary);
      outline-offset: var(--sys-size-2);
    }
  }

  > devtools-button {
    margin-top: var(--sys-size-7);
  }
}

/*# sourceURL=${import.meta.resolve("./recorderController.css")} */`;

// gen/front_end/panels/recorder/RecorderEvents.js
var RecorderEvents_exports = {};
__export(RecorderEvents_exports, {
  RecordingStateChangedEvent: () => RecordingStateChangedEvent,
  ReplayFinishedEvent: () => ReplayFinishedEvent
});
var ReplayFinishedEvent = class _ReplayFinishedEvent extends Event {
  static eventName = "replayfinished";
  constructor() {
    super(_ReplayFinishedEvent.eventName, { bubbles: true, composed: true });
  }
};
var RecordingStateChangedEvent = class _RecordingStateChangedEvent extends Event {
  recording;
  static eventName = "recordingstatechanged";
  constructor(recording) {
    super(_RecordingStateChangedEvent.eventName, {
      bubbles: true,
      composed: true
    });
    this.recording = recording;
  }
};

// gen/front_end/panels/recorder/RecorderController.js
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var { html, Decorators, Directives: { ref }, LitElement } = Lit;
var { customElement, state } = Decorators;
var UIStrings = {
  /**
   * @description The title of the button that leads to a page for creating a new recording.
   */
  createRecording: "Create recording",
  /**
   * @description The title of the button that allows importing a recording.
   */
  importRecording: "Import recording",
  /**
   * @description The title of the button that deletes the recording
   */
  deleteRecording: "Delete recording",
  /**
   * @description The title of the select if user has no saved recordings
   */
  noRecordings: "No recordings",
  /**
   * @description The title of the select option for one or more recording
   * number followed by this text - `1 recording(s)` or `4 recording(s)`
   */
  numberOfRecordings: "recording(s)",
  /**
   * @description The title of the button that continues the replay
   */
  continueReplay: "Continue",
  /**
   * @description The title of the button that executes only one step in the replay
   */
  stepOverReplay: "Execute one step",
  /**
   * @description The title of the button that opens a menu with various options of exporting a recording to file.
   */
  exportRecording: "Export recording",
  /**
   * @description The title of shortcut for starting and stopping recording.
   */
  startStopRecording: "Start/Stop recording",
  /**
   * @description The title of shortcut for replaying recording.
   */
  replayRecording: "Replay recording",
  /**
   * @description The title of shortcut for copying a recording or selected step.
   */
  copyShortcut: "Copy recording or selected step",
  /**
   * @description The title of shortcut for toggling code view.
   */
  toggleCode: "Toggle code view",
  /**
   * @description The title of the menu group in the export menu of the Recorder
   * panel that is followed by the list of built-in export formats.
   */
  export: "Export",
  /**
   * @description The title of the menu group in the export menu of the Recorder
   * panel that is followed by the list of export formats available via browser
   * extensions.
   */
  exportViaExtensions: "Export via extensions",
  /**
   * @description The title of the menu option that leads to a page that lists
   * all browsers extensions available for Recorder.
   */
  getExtensions: "Get extensions\u2026",
  /**
   * @description The button label that leads to the feedback form for Recorder.
   */
  sendFeedback: "Send feedback",
  /**
   * @description The header of the start page in the Recorder panel.
   */
  header: "Nothing recorded yet",
  /**
   * @description Text to explain the usage of the recorder panel.
   */
  recordingDescription: "Use recordings to create automated end-to-end tests or performance traces.",
  /**
   * @description Link text to forward to a documentation page on the recorder.
   */
  learnMore: "Learn more",
  /**
   * @description Headline of warning shown to users when users import a recording into DevTools Recorder.
   */
  doYouTrustThisCode: "Do you trust this recording?",
  /**
   * @description Warning shown to users when imports code into DevTools Recorder.
   * @example {allow importing} PH1
   */
  doNotImport: "Don't import recordings you do not understand or have not reviewed yourself into DevTools. This could allow attackers to steal your identity or take control of your computer. Please type ''{PH1}'' below to allow importing.",
  /**
   * @description Text a user needs to type in order to confirm that they
   *are aware of the danger of import code into the DevTools Recorder.
   */
  allowImporting: "allow importing",
  /**
   * @description Input box placeholder which instructs the user to type 'allow importing' into the input box.
   * @example {allow importing} PH1
   */
  typeAllowImporting: "Type ''{PH1}''"
};
var str_ = i18n.i18n.registerUIStrings("panels/recorder/RecorderController.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var GET_EXTENSIONS_MENU_ITEM = "get-extensions-link";
var GET_EXTENSIONS_URL = "https://goo.gle/recorder-extension-list";
var RECORDER_EXPLANATION_URL = "https://developer.chrome.com/docs/devtools/recorder";
var FEEDBACK_URL = "https://goo.gle/recorder-feedback";
var CONVERTER_ID_TO_METRIC = {
  [
    "json"
    /* Models.ConverterIds.ConverterIds.JSON */
  ]: 2,
  [
    "@puppeteer/replay"
    /* Models.ConverterIds.ConverterIds.REPLAY */
  ]: 3,
  [
    "puppeteer"
    /* Models.ConverterIds.ConverterIds.PUPPETEER */
  ]: 1,
  [
    "puppeteer-firefox"
    /* Models.ConverterIds.ConverterIds.PUPPETEER_FIREFOX */
  ]: 1,
  [
    "lighthouse"
    /* Models.ConverterIds.ConverterIds.LIGHTHOUSE */
  ]: 5
};
var RecorderController = class RecorderController2 extends LitElement {
  #storage = Models.RecordingStorage.RecordingStorage.instance();
  #screenshotStorage = Models.ScreenshotStorage.ScreenshotStorage.instance();
  // TODO: we keep the functionality to allow/disallow replay but right now it's not used.
  // It can be used to decide if we allow replay on a certain target for example.
  #replayAllowed = true;
  #replayState = { isPlaying: false, isPausedOnBreakpoint: false };
  #fileSelector;
  #exportMenuButton;
  #stepBreakpointIndexes = /* @__PURE__ */ new Set();
  #builtInConverters;
  #recorderSettings = new Models.RecorderSettings.RecorderSettings();
  #shortcutHelper = new Models.RecorderShortcutHelper.RecorderShortcutHelper();
  #disableRecorderImportWarningSetting = Common.Settings.Settings.instance().createSetting(
    "disable-recorder-import-warning",
    false,
    "Synced"
    /* Common.Settings.SettingStorageType.SYNCED */
  );
  #selfXssWarningDisabledSetting = Common.Settings.Settings.instance().createSetting(
    "disable-self-xss-warning",
    false,
    "Synced"
    /* Common.Settings.SettingStorageType.SYNCED */
  );
  #recordingView;
  #createRecordingView;
  constructor() {
    super();
    this.isRecording = false;
    this.isToggling = false;
    this.exportMenuExpanded = false;
    this.currentPage = "StartPage";
    if (this.#storage.getRecordings().length) {
      this.#setCurrentPage(
        "AllRecordingsPage"
        /* Pages.ALL_RECORDINGS_PAGE */
      );
    }
    const textEditorIndent = Common.Settings.Settings.instance().moduleSetting("text-editor-indent").get();
    this.#builtInConverters = Object.freeze([
      new Converters.JSONConverter.JSONConverter(textEditorIndent),
      new Converters.PuppeteerReplayConverter.PuppeteerReplayConverter(textEditorIndent),
      new Converters.PuppeteerConverter.PuppeteerConverter(textEditorIndent),
      new Converters.PuppeteerFirefoxConverter.PuppeteerFirefoxConverter(textEditorIndent),
      new Converters.LighthouseConverter.LighthouseConverter(textEditorIndent)
    ]);
    const extensionManager = Extensions.ExtensionManager.ExtensionManager.instance();
    this.#updateExtensions(extensionManager.extensions());
    extensionManager.addEventListener("extensionsUpdated", (event) => {
      this.#updateExtensions(event.data);
    });
    this.addEventListener("setrecording", (event) => this.#onSetRecording(event));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.currentRecordingSession) {
      void this.currentRecordingSession.stop();
    }
  }
  #updateExtensions(extensions) {
    this.extensionConverters = extensions.filter((extension) => extension.getCapabilities().includes("export")).map((extension, idx) => {
      return new Converters.ExtensionConverter.ExtensionConverter(idx, extension);
    });
    this.replayExtensions = extensions.filter((extension) => extension.getCapabilities().includes("replay"));
  }
  setIsRecordingStateForTesting(isRecording) {
    this.isRecording = isRecording;
  }
  setRecordingStateForTesting(state2) {
    this.#replayState.isPlaying = state2.isPlaying;
    this.#replayState.isPausedOnBreakpoint = state2.isPausedOnBreakpoint;
  }
  setCurrentPageForTesting(page) {
    this.#setCurrentPage(page);
  }
  getCurrentPageForTesting() {
    return this.currentPage;
  }
  getCurrentRecordingForTesting() {
    return this.currentRecording;
  }
  getStepBreakpointIndexesForTesting() {
    return [...this.#stepBreakpointIndexes.values()];
  }
  /**
   * We should clear errors on every new action in the controller.
   * TODO: think how to make handle this centrally so that in no case
   * the error remains shown for longer than needed. Maybe a timer?
   */
  #clearError() {
    this.importError = void 0;
  }
  async #importFile(file) {
    const outputStream = new Common.StringOutputStream.StringOutputStream();
    const reader = new Bindings.FileUtils.ChunkedFileReader(
      file,
      /* chunkSize */
      1e7
    );
    const success = await reader.read(outputStream);
    if (!success) {
      throw reader.error() ?? new Error("Unknown");
    }
    let flow;
    try {
      flow = Models.SchemaUtils.parse(JSON.parse(outputStream.data()));
    } catch (error) {
      this.importError = error;
      return;
    }
    this.#setCurrentRecording(await this.#storage.saveRecording(flow));
    this.#setCurrentPage(
      "RecordingPage"
      /* Pages.RECORDING_PAGE */
    );
    this.#clearError();
  }
  setCurrentRecordingForTesting(recording) {
    this.#setCurrentRecording(recording);
  }
  getSectionsForTesting() {
    return this.sections;
  }
  #setCurrentRecording(recording, opts = {}) {
    const { keepBreakpoints = false, updateSession = false } = opts;
    this.recordingPlayer?.abort();
    this.currentStep = void 0;
    this.recordingError = void 0;
    this.lastReplayResult = void 0;
    this.recordingPlayer = void 0;
    this.#replayState.isPlaying = false;
    this.#replayState.isPausedOnBreakpoint = false;
    this.#stepBreakpointIndexes = keepBreakpoints ? this.#stepBreakpointIndexes : /* @__PURE__ */ new Set();
    if (recording) {
      this.currentRecording = recording;
      this.sections = Models.Section.buildSections(recording.flow.steps);
      this.settings = this.#buildSettings(recording.flow);
      if (updateSession && this.currentRecordingSession) {
        this.currentRecordingSession.overwriteUserFlow(recording.flow);
      }
    } else {
      this.currentRecording = void 0;
      this.sections = void 0;
      this.settings = void 0;
    }
    this.#updateScreenshotsForSections();
  }
  #setCurrentPage(page) {
    if (page === this.currentPage) {
      return;
    }
    this.previousPage = this.currentPage;
    this.currentPage = page;
  }
  #buildSettings(flow) {
    const steps = flow.steps;
    const navigateStepIdx = steps.findIndex((step) => step.type === "navigate");
    const settings = { timeout: flow.timeout };
    for (let i = navigateStepIdx - 1; i >= 0; i--) {
      const step = steps[i];
      if (!settings.viewportSettings && step.type === "setViewport") {
        settings.viewportSettings = step;
      }
      if (!settings.networkConditionsSettings && step.type === "emulateNetworkConditions") {
        settings.networkConditionsSettings = { ...step };
        for (const preset of [
          SDK.NetworkManager.OfflineConditions,
          SDK.NetworkManager.Slow3GConditions,
          SDK.NetworkManager.Slow4GConditions,
          SDK.NetworkManager.Fast4GConditions
        ]) {
          if (SDK.NetworkManager.networkConditionsEqual(
            { ...preset, title: preset.i18nTitleKey || "" },
            // The key below is not used, but we need it to satisfy TS.
            {
              ...step,
              title: preset.i18nTitleKey || "",
              key: `step_${i}_recorder_key`
            }
          )) {
            settings.networkConditionsSettings.title = preset.title instanceof Function ? preset.title() : preset.title;
            settings.networkConditionsSettings.i18nTitleKey = preset.i18nTitleKey;
          }
        }
      }
    }
    return settings;
  }
  #getMainTarget() {
    const target = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!target) {
      throw new Error("Missing main page target");
    }
    return target;
  }
  #getSectionFromStep(step) {
    if (!this.sections) {
      return null;
    }
    for (const section2 of this.sections) {
      if (section2.steps.indexOf(step) !== -1) {
        return section2;
      }
    }
    return null;
  }
  #updateScreenshotsForSections() {
    if (!this.sections || !this.currentRecording) {
      return;
    }
    const storageName = this.currentRecording.storageName;
    for (let i = 0; i < this.sections.length; i++) {
      const screenshot = this.#screenshotStorage.getScreenshotForSection(storageName, i);
      this.sections[i].screenshot = screenshot || void 0;
    }
    this.requestUpdate();
  }
  #onAbortReplay() {
    this.recordingPlayer?.abort();
  }
  async #onPlayViaExtension(extension) {
    if (!this.currentRecording || !this.#replayAllowed) {
      return;
    }
    const pluginManager = PublicExtensions.RecorderPluginManager.RecorderPluginManager.instance();
    const promise = pluginManager.once(
      "showViewRequested"
      /* PublicExtensions.RecorderPluginManager.Events.SHOW_VIEW_REQUESTED */
    );
    extension.replay(this.currentRecording.flow);
    const descriptor = await promise;
    this.viewDescriptor = descriptor;
    Host.userMetrics.recordingReplayStarted(
      3
      /* Host.UserMetrics.RecordingReplayStarted.REPLAY_VIA_EXTENSION */
    );
  }
  async #onPlayRecording(event) {
    if (!this.currentRecording || !this.#replayAllowed) {
      return;
    }
    if (this.viewDescriptor) {
      this.viewDescriptor = void 0;
    }
    if (event.extension) {
      return await this.#onPlayViaExtension(event.extension);
    }
    Host.userMetrics.recordingReplayStarted(
      event.targetPanel !== "chrome-recorder" ? 2 : 1
      /* Host.UserMetrics.RecordingReplayStarted.REPLAY_ONLY */
    );
    this.#replayState.isPlaying = true;
    this.currentStep = void 0;
    this.recordingError = void 0;
    this.lastReplayResult = void 0;
    const currentRecording = this.currentRecording;
    this.#clearError();
    await this.#disableDeviceModeIfEnabled();
    this.recordingPlayer = new Models.RecordingPlayer.RecordingPlayer(this.currentRecording.flow, { speed: event.speed, breakpointIndexes: this.#stepBreakpointIndexes });
    const withPerformanceTrace = event.targetPanel === "timeline";
    const sectionsWithScreenshot = /* @__PURE__ */ new Set();
    this.recordingPlayer.addEventListener("Step", async ({ data: { step, resolve } }) => {
      this.currentStep = step;
      const currentSection = this.#getSectionFromStep(step);
      if (this.sections && currentSection && !sectionsWithScreenshot.has(currentSection)) {
        sectionsWithScreenshot.add(currentSection);
        const currentSectionIndex = this.sections.indexOf(currentSection);
        const screenshot = await Models.ScreenshotUtils.takeScreenshot();
        currentSection.screenshot = screenshot;
        Models.ScreenshotStorage.ScreenshotStorage.instance().storeScreenshotForSection(currentRecording.storageName, currentSectionIndex, screenshot);
      }
      resolve();
    });
    this.recordingPlayer.addEventListener("Stop", () => {
      this.#replayState.isPausedOnBreakpoint = true;
      this.requestUpdate();
    });
    this.recordingPlayer.addEventListener("Continue", () => {
      this.#replayState.isPausedOnBreakpoint = false;
      this.requestUpdate();
    });
    this.recordingPlayer.addEventListener("Error", ({ data: error }) => {
      this.recordingError = error;
      if (!withPerformanceTrace) {
        this.#replayState.isPlaying = false;
        this.recordingPlayer = void 0;
      }
      this.lastReplayResult = "Failure";
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.startsWith("could not find element")) {
        Host.userMetrics.recordingReplayFinished(
          2
          /* Host.UserMetrics.RecordingReplayFinished.TIMEOUT_ERROR_SELECTORS */
        );
      } else if (errorMessage.startsWith("waiting for target failed")) {
        Host.userMetrics.recordingReplayFinished(
          3
          /* Host.UserMetrics.RecordingReplayFinished.TIMEOUT_ERROR_TARGET */
        );
      } else {
        Host.userMetrics.recordingReplayFinished(
          4
          /* Host.UserMetrics.RecordingReplayFinished.OTHER_ERROR */
        );
      }
      this.dispatchEvent(new ReplayFinishedEvent());
    });
    this.recordingPlayer.addEventListener("Done", () => {
      if (!withPerformanceTrace) {
        this.#replayState.isPlaying = false;
        this.recordingPlayer = void 0;
      }
      this.lastReplayResult = "Success";
      this.dispatchEvent(new ReplayFinishedEvent());
      Host.userMetrics.recordingReplayFinished(
        1
        /* Host.UserMetrics.RecordingReplayFinished.SUCCESS */
      );
    });
    this.recordingPlayer.addEventListener("Abort", () => {
      this.currentStep = void 0;
      this.recordingError = void 0;
      this.lastReplayResult = void 0;
      this.#replayState.isPlaying = false;
    });
    let resolveWithEvents = (_events) => {
    };
    const eventsPromise = new Promise((resolve) => {
      resolveWithEvents = resolve;
    });
    let performanceTracing = null;
    switch (event.targetPanel) {
      case "timeline":
        performanceTracing = new Tracing.PerformanceTracing.PerformanceTracing(this.#getMainTarget(), {
          tracingBufferUsage() {
          },
          eventsRetrievalProgress() {
          },
          tracingComplete(events) {
            resolveWithEvents(events);
          }
        });
        break;
    }
    if (performanceTracing) {
      await performanceTracing.start();
    }
    this.#setTouchEmulationAllowed(false);
    await this.recordingPlayer.play();
    this.#setTouchEmulationAllowed(true);
    if (performanceTracing) {
      await performanceTracing.stop();
      const events = await eventsPromise;
      this.#replayState.isPlaying = false;
      this.recordingPlayer = void 0;
      await UI.InspectorView.InspectorView.instance().showPanel(event.targetPanel);
      if (event.targetPanel === "timeline") {
        const trace = new SDK.TraceObject.TraceObject(events);
        void Common.Revealer.reveal(trace);
      }
    }
  }
  async #disableDeviceModeIfEnabled() {
    try {
      const deviceModeWrapper = Emulation.DeviceModeWrapper.DeviceModeWrapper.instance();
      if (deviceModeWrapper.isDeviceModeOn()) {
        deviceModeWrapper.toggleDeviceMode();
        const emulationModel = this.#getMainTarget().model(SDK.EmulationModel.EmulationModel);
        await emulationModel?.emulateDevice(null);
      }
    } catch {
    }
  }
  #setTouchEmulationAllowed(touchEmulationAllowed) {
    const emulationModel = this.#getMainTarget().model(SDK.EmulationModel.EmulationModel);
    emulationModel?.setTouchEmulationAllowed(touchEmulationAllowed);
  }
  async #onSetRecording(event) {
    const json = JSON.parse(event.detail);
    this.#setCurrentRecording(await this.#storage.saveRecording(Models.SchemaUtils.parse(json)));
    this.#setCurrentPage(
      "RecordingPage"
      /* Pages.RECORDING_PAGE */
    );
    this.#clearError();
  }
  // Used by e2e tests to inspect the current recording.
  getUserFlow() {
    return this.currentRecording?.flow;
  }
  async #handleRecordingChanged(event) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    const recording = {
      ...this.currentRecording,
      flow: {
        ...this.currentRecording.flow,
        steps: this.currentRecording.flow.steps.map((step) => step === event.currentStep ? event.newStep : step)
      }
    };
    this.#setCurrentRecording(await this.#storage.updateRecording(recording.storageName, recording.flow), { keepBreakpoints: true, updateSession: true });
  }
  async #handleStepAdded(event) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    const stepOrSection = event.stepOrSection;
    let step;
    let position = event.position;
    if ("steps" in stepOrSection) {
      const sectionIdx = this.sections?.indexOf(stepOrSection);
      if (sectionIdx === void 0 || sectionIdx === -1) {
        throw new Error("There is no section to add a step to");
      }
      if (event.position === "after") {
        if (this.sections?.[sectionIdx].steps.length) {
          step = this.sections?.[sectionIdx].steps[0];
          position = "before";
        } else {
          step = this.sections?.[sectionIdx].causingStep;
          position = "after";
        }
      } else {
        if (sectionIdx <= 0) {
          throw new Error("There is no section to add a step to");
        }
        const prevSection = this.sections?.[sectionIdx - 1];
        step = prevSection?.steps[prevSection.steps.length - 1];
        position = "after";
      }
    } else {
      step = stepOrSection;
    }
    if (!step) {
      throw new Error("Anchor step is not found when adding a step");
    }
    const steps = this.currentRecording.flow.steps;
    const currentIndex = steps.indexOf(step);
    const indexToInsertAt = currentIndex + (position === "before" ? 0 : 1);
    steps.splice(indexToInsertAt, 0, { type: Models.Schema.StepType.WaitForElement, selectors: ["body"] });
    const recording = { ...this.currentRecording, flow: { ...this.currentRecording.flow, steps } };
    Host.userMetrics.recordingEdited(
      2
      /* Host.UserMetrics.RecordingEdited.STEP_ADDED */
    );
    this.#stepBreakpointIndexes = new Set([...this.#stepBreakpointIndexes.values()].map((breakpointIndex) => {
      if (indexToInsertAt > breakpointIndex) {
        return breakpointIndex;
      }
      return breakpointIndex + 1;
    }));
    this.#setCurrentRecording(await this.#storage.updateRecording(recording.storageName, recording.flow), { keepBreakpoints: true, updateSession: true });
  }
  async #handleRecordingTitleChanged(title) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    const flow = { ...this.currentRecording.flow, title };
    this.#setCurrentRecording(await this.#storage.updateRecording(this.currentRecording.storageName, flow));
  }
  async #handleStepRemoved(event) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    const steps = this.currentRecording.flow.steps;
    const currentIndex = steps.indexOf(event.step);
    steps.splice(currentIndex, 1);
    const flow = { ...this.currentRecording.flow, steps };
    Host.userMetrics.recordingEdited(
      3
      /* Host.UserMetrics.RecordingEdited.STEP_REMOVED */
    );
    this.#stepBreakpointIndexes = new Set([...this.#stepBreakpointIndexes.values()].map((breakpointIndex) => {
      if (currentIndex > breakpointIndex) {
        return breakpointIndex;
      }
      if (currentIndex === breakpointIndex) {
        return -1;
      }
      return breakpointIndex - 1;
    }).filter((index) => index >= 0));
    this.#setCurrentRecording(await this.#storage.updateRecording(this.currentRecording.storageName, flow), { keepBreakpoints: true, updateSession: true });
  }
  async #onNetworkConditionsChanged(data) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    const navigateIdx = this.currentRecording.flow.steps.findIndex((step) => step.type === "navigate");
    if (navigateIdx === -1) {
      throw new Error("Current recording does not have a navigate step");
    }
    const emulateNetworkConditionsIdx = this.currentRecording.flow.steps.findIndex((step, idx) => {
      if (idx >= navigateIdx) {
        return false;
      }
      return step.type === "emulateNetworkConditions";
    });
    if (!data) {
      if (emulateNetworkConditionsIdx !== -1) {
        this.currentRecording.flow.steps.splice(emulateNetworkConditionsIdx, 1);
      }
    } else if (emulateNetworkConditionsIdx === -1) {
      this.currentRecording.flow.steps.splice(0, 0, Models.SchemaUtils.createEmulateNetworkConditionsStep({ download: data.download, upload: data.upload, latency: data.latency }));
    } else {
      const step = this.currentRecording.flow.steps[emulateNetworkConditionsIdx];
      step.download = data.download;
      step.upload = data.upload;
      step.latency = data.latency;
    }
    this.#setCurrentRecording(await this.#storage.updateRecording(this.currentRecording.storageName, this.currentRecording.flow));
  }
  async #onTimeoutChanged(timeout) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    this.currentRecording.flow.timeout = timeout;
    this.#setCurrentRecording(await this.#storage.updateRecording(this.currentRecording.storageName, this.currentRecording.flow));
  }
  async #onDeleteRecording(event) {
    event.stopPropagation();
    if (event instanceof Components.RecordingListView.DeleteRecordingEvent) {
      await this.#storage.deleteRecording(event.storageName);
      this.#screenshotStorage.deleteScreenshotsForRecording(event.storageName);
      this.requestUpdate();
    } else {
      if (!this.currentRecording) {
        return;
      }
      await this.#storage.deleteRecording(this.currentRecording.storageName);
      this.#screenshotStorage.deleteScreenshotsForRecording(this.currentRecording.storageName);
    }
    if ((await this.#storage.getRecordings()).length) {
      this.#setCurrentPage(
        "AllRecordingsPage"
        /* Pages.ALL_RECORDINGS_PAGE */
      );
    } else {
      this.#setCurrentPage(
        "StartPage"
        /* Pages.START_PAGE */
      );
    }
    this.#setCurrentRecording(void 0);
    this.#clearError();
  }
  #onCreateNewRecording(event) {
    event?.stopPropagation();
    this.#setCurrentPage(
      "CreateRecordingPage"
      /* Pages.CREATE_RECORDING_PAGE */
    );
    this.#clearError();
  }
  async #onRecordingStarted(data) {
    await this.#disableDeviceModeIfEnabled();
    this.isToggling = true;
    this.#clearError();
    Host.userMetrics.recordingToggled(
      1
      /* Host.UserMetrics.RecordingToggled.RECORDING_STARTED */
    );
    this.currentRecordingSession = new Models.RecordingSession.RecordingSession(this.#getMainTarget(), {
      title: data.name,
      selectorAttribute: data.selectorAttribute,
      selectorTypesToRecord: data.selectorTypesToRecord.length ? data.selectorTypesToRecord : Object.values(Models.Schema.SelectorType)
    });
    this.#setCurrentRecording(await this.#storage.saveRecording(this.currentRecordingSession.cloneUserFlow()));
    let previousSectionIndex = -1;
    let screenshotPromise;
    const takeScreenshot = async (currentRecording) => {
      if (!this.sections) {
        throw new Error("Could not find sections.");
      }
      const currentSectionIndex = this.sections.length - 1;
      const currentSection = this.sections[currentSectionIndex];
      if (screenshotPromise || previousSectionIndex === currentSectionIndex) {
        return;
      }
      screenshotPromise = Models.ScreenshotUtils.takeScreenshot();
      const screenshot = await screenshotPromise;
      screenshotPromise = void 0;
      currentSection.screenshot = screenshot;
      Models.ScreenshotStorage.ScreenshotStorage.instance().storeScreenshotForSection(currentRecording.storageName, currentSectionIndex, screenshot);
      previousSectionIndex = currentSectionIndex;
      this.#updateScreenshotsForSections();
    };
    this.currentRecordingSession.addEventListener("recordingupdated", async ({ data: data2 }) => {
      if (!this.currentRecording) {
        throw new Error("No current recording found");
      }
      this.#setCurrentRecording(await this.#storage.updateRecording(this.currentRecording.storageName, data2));
      this.#recordingView?.scrollToBottom();
      await takeScreenshot(this.currentRecording);
    });
    this.currentRecordingSession.addEventListener("recordingstopped", async ({ data: data2 }) => {
      if (!this.currentRecording) {
        throw new Error("No current recording found");
      }
      Host.userMetrics.keyboardShortcutFired(
        "chrome-recorder.start-recording"
        /* Actions.RecorderActions.START_RECORDING */
      );
      this.#setCurrentRecording(await this.#storage.updateRecording(this.currentRecording.storageName, data2));
      await this.#onRecordingFinished();
    });
    await this.currentRecordingSession.start();
    this.isToggling = false;
    this.isRecording = true;
    this.#setCurrentPage(
      "RecordingPage"
      /* Pages.RECORDING_PAGE */
    );
    this.dispatchEvent(new RecordingStateChangedEvent(this.currentRecording.flow));
  }
  async #onRecordingFinished() {
    if (!this.currentRecording || !this.currentRecordingSession) {
      throw new Error("Recording was never started");
    }
    this.isToggling = true;
    this.#clearError();
    Host.userMetrics.recordingToggled(
      2
      /* Host.UserMetrics.RecordingToggled.RECORDING_FINISHED */
    );
    await this.currentRecordingSession.stop();
    this.currentRecordingSession = void 0;
    this.isToggling = false;
    this.isRecording = false;
    this.dispatchEvent(new RecordingStateChangedEvent(this.currentRecording.flow));
  }
  async onRecordingCancelled() {
    if (this.previousPage) {
      this.#setCurrentPage(this.previousPage);
    }
  }
  async #onRecordingSelected(event) {
    const storageName = event instanceof Components.RecordingListView.OpenRecordingEvent || event instanceof Components.RecordingListView.PlayRecordingEvent ? event.storageName : event.target?.value;
    this.#setCurrentRecording(await this.#storage.getRecording(storageName));
    if (this.currentRecording) {
      this.#setCurrentPage(
        "RecordingPage"
        /* Pages.RECORDING_PAGE */
      );
    } else if (storageName === "StartPage") {
      this.#setCurrentPage(
        "StartPage"
        /* Pages.START_PAGE */
      );
    } else if (storageName === "AllRecordingsPage") {
      this.#setCurrentPage(
        "AllRecordingsPage"
        /* Pages.ALL_RECORDINGS_PAGE */
      );
    }
  }
  async #onExportOptionSelected(event) {
    if (typeof event.itemValue !== "string") {
      throw new Error("Invalid export option value");
    }
    if (event.itemValue === GET_EXTENSIONS_MENU_ITEM) {
      Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(GET_EXTENSIONS_URL);
      return;
    }
    if (!this.currentRecording) {
      throw new Error("No recording selected");
    }
    const id = event.itemValue;
    const byId = (converter2) => converter2.getId() === id;
    const converter = this.#builtInConverters.find(byId) || this.extensionConverters.find(byId);
    if (!converter) {
      throw new Error("No recording selected");
    }
    const [content] = await converter.stringify(this.currentRecording.flow);
    await this.#exportContent(converter.getFilename(this.currentRecording.flow), content);
    const builtInMetric = CONVERTER_ID_TO_METRIC[converter.getId()];
    if (builtInMetric) {
      Host.userMetrics.recordingExported(builtInMetric);
    } else if (converter.getId().startsWith(Converters.ExtensionConverter.EXTENSION_PREFIX)) {
      Host.userMetrics.recordingExported(
        4
        /* Host.UserMetrics.RecordingExported.TO_EXTENSION */
      );
    } else {
      throw new Error("Could not find a metric for the export option with id = " + id);
    }
  }
  async #exportContent(suggestedName, data) {
    try {
      const handle = await window.showSaveFilePicker({ suggestedName });
      const writable = await handle.createWritable();
      await writable.write(data);
      await writable.close();
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      throw error;
    }
  }
  async #handleAddAssertionEvent() {
    if (!this.currentRecordingSession || !this.currentRecording) {
      return;
    }
    const flow = this.currentRecordingSession.cloneUserFlow();
    flow.steps.push({ type: "waitForElement", selectors: [[".cls"]] });
    this.#setCurrentRecording(await this.#storage.updateRecording(this.currentRecording.storageName, flow), { keepBreakpoints: true, updateSession: true });
    Host.userMetrics.recordingAssertion(
      1
      /* Host.UserMetrics.RecordingAssertion.ASSERTION_ADDED */
    );
    await this.updateComplete;
    await this.#recordingView?.updateComplete;
    this.#recordingView?.contentElement?.querySelector(".section:last-child devtools-step-view:last-of-type")?.shadowRoot?.querySelector(".action")?.click();
  }
  async #acknowledgeImportNotice() {
    if (this.#disableRecorderImportWarningSetting.get()) {
      return true;
    }
    if (Root.Runtime.Runtime.queryParam("isChromeForTesting") || Root.Runtime.Runtime.queryParam("disableSelfXssWarnings") || this.#selfXssWarningDisabledSetting.get()) {
      return true;
    }
    const result = await PanelCommon.TypeToAllowDialog.show({
      jslogContext: {
        input: "confirm-import-recording-input",
        dialog: "confirm-import-recording-dialog"
      },
      message: i18nString(UIStrings.doNotImport, { PH1: i18nString(UIStrings.allowImporting) }),
      header: i18nString(UIStrings.doYouTrustThisCode),
      typePhrase: i18nString(UIStrings.allowImporting),
      inputPlaceholder: i18nString(UIStrings.typeAllowImporting, { PH1: i18nString(UIStrings.allowImporting) })
    });
    if (result) {
      this.#disableRecorderImportWarningSetting.set(true);
    }
    return result;
  }
  async #onImportRecording(event) {
    event.stopPropagation();
    this.#clearError();
    if (await this.#acknowledgeImportNotice()) {
      this.#fileSelector = UI.UIUtils.createFileSelectorElement(this.#importFile.bind(this));
      this.#fileSelector.click();
    }
  }
  async #onPlayRecordingByName(event) {
    await this.#onRecordingSelected(event);
    await this.#onPlayRecording({ targetPanel: "chrome-recorder", speed: this.#recorderSettings.speed });
  }
  #onAddBreakpoint = (event) => {
    this.#stepBreakpointIndexes = structuredClone(this.#stepBreakpointIndexes);
    this.#stepBreakpointIndexes.add(event.index);
    this.recordingPlayer?.updateBreakpointIndexes(this.#stepBreakpointIndexes);
    this.requestUpdate();
  };
  #onRemoveBreakpoint = (event) => {
    this.#stepBreakpointIndexes = structuredClone(this.#stepBreakpointIndexes);
    this.#stepBreakpointIndexes.delete(event.index);
    this.recordingPlayer?.updateBreakpointIndexes(this.#stepBreakpointIndexes);
    this.requestUpdate();
  };
  #onExtensionViewClosed() {
    this.viewDescriptor = void 0;
  }
  handleActions(actionId) {
    if (!this.isActionPossible(actionId)) {
      return;
    }
    switch (actionId) {
      case "chrome-recorder.create-recording":
        this.#onCreateNewRecording();
        return;
      case "chrome-recorder.start-recording":
        if (this.currentPage !== "CreateRecordingPage" && !this.isRecording) {
          this.#shortcutHelper.handleShortcut(this.#onRecordingStarted.bind(this, {
            name: this.#recorderSettings.defaultTitle,
            selectorTypesToRecord: this.#recorderSettings.defaultSelectors,
            selectorAttribute: this.#recorderSettings.selectorAttribute ? this.#recorderSettings.selectorAttribute : void 0
          }));
        } else if (this.currentPage === "CreateRecordingPage") {
          if (this.#createRecordingView) {
            this.#shortcutHelper.handleShortcut(() => {
              this.#createRecordingView?.startRecording();
            });
          }
        } else if (this.isRecording) {
          void this.#onRecordingFinished();
        }
        return;
      case "chrome-recorder.replay-recording":
        void this.#onPlayRecording({ targetPanel: "chrome-recorder", speed: this.#recorderSettings.speed });
        return;
      case "chrome-recorder.toggle-code-view": {
        this.#recordingView?.showCodeToggle();
        return;
      }
    }
  }
  isActionPossible(actionId) {
    switch (actionId) {
      case "chrome-recorder.create-recording":
        return !this.isRecording && !this.#replayState.isPlaying;
      case "chrome-recorder.start-recording":
        return !this.#replayState.isPlaying;
      case "chrome-recorder.replay-recording":
        return this.currentPage === "RecordingPage" && !this.#replayState.isPlaying;
      case "chrome-recorder.toggle-code-view":
        return this.currentPage === "RecordingPage";
      case "chrome-recorder.copy-recording-or-step":
        return false;
    }
  }
  #getShortcutsInfo() {
    const getBindingForAction = (action2) => {
      const shortcuts = UI.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction(action2);
      const shortcutsWithSplitBindings = shortcuts.map((shortcut) => shortcut.title().split(/[\s+]+/).map((word) => {
        return { key: word.trim() };
      }));
      return shortcutsWithSplitBindings;
    };
    return [
      {
        title: i18nString(UIStrings.startStopRecording),
        rows: getBindingForAction(
          "chrome-recorder.start-recording"
          /* Actions.RecorderActions.START_RECORDING */
        )
      },
      {
        title: i18nString(UIStrings.replayRecording),
        rows: getBindingForAction(
          "chrome-recorder.replay-recording"
          /* Actions.RecorderActions.REPLAY_RECORDING */
        )
      },
      {
        title: i18nString(UIStrings.copyShortcut),
        rows: Host.Platform.isMac() ? [[{ key: "\u2318" }, { key: "C" }]] : [[{ key: "Ctrl" }, { key: "C" }]]
      },
      {
        title: i18nString(UIStrings.toggleCode),
        rows: getBindingForAction(
          "chrome-recorder.toggle-code-view"
          /* Actions.RecorderActions.TOGGLE_CODE_VIEW */
        )
      }
    ];
  }
  #renderCurrentPage() {
    switch (this.currentPage) {
      case "StartPage":
        return this.#renderStartPage();
      case "AllRecordingsPage":
        return this.#renderAllRecordingsPage();
      case "RecordingPage":
        return this.#renderRecordingPage();
      case "CreateRecordingPage":
        return this.#renderCreateRecordingPage();
    }
  }
  #renderAllRecordingsPage() {
    const recordings = this.#storage.getRecordings();
    return html`
      <devtools-widget
        .widgetConfig=${UI.Widget.widgetConfig(Components.RecordingListView.RecordingListView, {
      recordings: recordings.map((recording) => ({
        storageName: recording.storageName,
        name: recording.flow.title
      })),
      replayAllowed: this.#replayAllowed
    })}
        @createrecording=${this.#onCreateNewRecording}
        @deleterecording=${this.#onDeleteRecording}
        @openrecording=${this.#onRecordingSelected}
        @playrecording=${this.#onPlayRecordingByName}
      >
      </devtools-widget>
    `;
  }
  #renderStartPage() {
    return html`
      <div class="empty-state" jslog=${VisualLogging.section().context("start-view")}>
        <div class="empty-state-header">${i18nString(UIStrings.header)}</div>
        <div class="empty-state-description">
          <span>${i18nString(UIStrings.recordingDescription)}</span>
          <x-link
            class="x-link devtools-link"
            href=${RECORDER_EXPLANATION_URL}
            jslog=${VisualLogging.link().track({ click: true, keydown: "Enter|Space" }).context("learn-more")}
          >${i18nString(UIStrings.learnMore)}</x-link>
        </div>
        <devtools-button .variant=${"tonal"} jslogContext=${"chrome-recorder.create-recording"} @click=${this.#onCreateNewRecording}>${i18nString(UIStrings.createRecording)}</devtools-button>
      </div>
    `;
  }
  #renderRecordingPage() {
    return html`
      <devtools-widget
          class="recording-view"
          .widgetConfig=${UI.Widget.widgetConfig(Components.RecordingView.RecordingView, {
      recording: this.currentRecording?.flow ?? { title: "", steps: [] },
      replayState: this.#replayState,
      isRecording: this.isRecording,
      recordingTogglingInProgress: this.isToggling,
      currentStep: this.currentStep,
      currentError: this.recordingError,
      sections: this.sections ?? [],
      settings: this.settings,
      recorderSettings: this.#recorderSettings,
      lastReplayResult: this.lastReplayResult,
      replayAllowed: this.#replayAllowed,
      breakpointIndexes: this.#stepBreakpointIndexes,
      builtInConverters: this.#builtInConverters,
      extensionConverters: this.extensionConverters,
      replayExtensions: this.replayExtensions,
      extensionDescriptor: this.viewDescriptor,
      recordingFinished: this.#onRecordingFinished.bind(this),
      addAssertion: this.#handleAddAssertionEvent.bind(this),
      abortReplay: this.#onAbortReplay.bind(this),
      playRecording: this.#onPlayRecording.bind(this),
      networkConditionsChanged: this.#onNetworkConditionsChanged.bind(this),
      timeoutChanged: this.#onTimeoutChanged.bind(this),
      titleChanged: this.#handleRecordingTitleChanged.bind(this)
    })}
          @requestselectorattribute=${(event) => {
      event.send(this.currentRecording?.flow.selectorAttribute);
    }}
          @stepchanged=${this.#handleRecordingChanged.bind(this)}
          @addstep=${this.#handleStepAdded.bind(this)}
          @removestep=${this.#handleStepRemoved.bind(this)}
          @addbreakpoint=${this.#onAddBreakpoint.bind(this)}
          @removebreakpoint=${this.#onRemoveBreakpoint.bind(this)}
          @recorderextensionviewclosed=${this.#onExtensionViewClosed.bind(this)}
          ${UI.Widget.widgetRef(Components.RecordingView.RecordingView, (widget) => {
      this.#recordingView = widget;
    })}
        ></devtools-widget>
    `;
  }
  #renderCreateRecordingPage() {
    return html`
      <devtools-widget
        class="recording-view"
        .widgetConfig=${UI.Widget.widgetConfig(Components.CreateRecordingView.CreateRecordingView, {
      recorderSettings: this.#recorderSettings,
      onRecordingStarted: this.#onRecordingStarted.bind(this),
      onRecordingCancelled: this.onRecordingCancelled.bind(this)
    })}
        ${UI.Widget.widgetRef(Components.CreateRecordingView.CreateRecordingView, (widget) => {
      this.#createRecordingView = widget;
    })}
      ></devtools-widget>
    `;
  }
  #getExportMenuButton = () => {
    if (!this.#exportMenuButton) {
      throw new Error("#exportMenuButton not found");
    }
    return this.#exportMenuButton;
  };
  #onExportRecording(event) {
    event.stopPropagation();
    this.#clearError();
    this.exportMenuExpanded = !this.exportMenuExpanded;
  }
  #onExportMenuClosed() {
    this.exportMenuExpanded = false;
  }
  render() {
    const recordings = this.#storage.getRecordings();
    const selectValue = this.currentRecording ? this.currentRecording.storageName : this.currentPage;
    const values = [
      recordings.length === 0 ? {
        value: "StartPage",
        name: i18nString(UIStrings.noRecordings),
        selected: selectValue === "StartPage"
      } : {
        value: "AllRecordingsPage",
        name: `${recordings.length} ${i18nString(UIStrings.numberOfRecordings)}`,
        selected: selectValue === "AllRecordingsPage"
      },
      ...recordings.map((recording) => ({
        value: recording.storageName,
        name: recording.flow.title,
        selected: selectValue === recording.storageName
      }))
    ];
    return html`
        <style>${UI.inspectorCommonStyles}</style>
        <style>${recorderController_css_default}</style>
        <div class="wrapper">
          <div class="header" jslog=${VisualLogging.toolbar()}>
            <devtools-button
              @click=${this.#onCreateNewRecording}
              .data=${{
      variant: "toolbar",
      iconName: "plus",
      disabled: this.#replayState.isPlaying || this.isRecording || this.isToggling,
      title: Models.Tooltip.getTooltipForActions(
        i18nString(UIStrings.createRecording),
        "chrome-recorder.create-recording"
        /* Actions.RecorderActions.CREATE_RECORDING */
      ),
      jslogContext: "chrome-recorder.create-recording"
    }}
            ></devtools-button>
            <div class="separator"></div>
            <select
              .disabled=${recordings.length === 0 || this.#replayState.isPlaying || this.isRecording || this.isToggling}
              @click=${(e) => e.stopPropagation()}
              @change=${this.#onRecordingSelected}
              jslog=${VisualLogging.dropDown("recordings").track({ change: true })}
            >
              ${Lit.Directives.repeat(values, (item2) => item2.value, (item2) => {
      return html`<option .selected=${item2.selected} value=${item2.value}>${item2.name}</option>`;
    })}
            </select>
            <div class="separator"></div>
            <devtools-button
              @click=${this.#onImportRecording}
              .data=${{
      variant: "toolbar",
      iconName: "import",
      title: i18nString(UIStrings.importRecording),
      jslogContext: "import-recording"
    }}
            ></devtools-button>
            <devtools-button
              id='origin'
              @click=${this.#onExportRecording}
              ${ref((el) => {
      if (el instanceof HTMLElement) {
        this.#exportMenuButton = el;
      }
    })}
              .data=${{
      variant: "toolbar",
      iconName: "download",
      title: i18nString(UIStrings.exportRecording),
      disabled: !this.currentRecording
    }}
              jslog=${VisualLogging.dropDown("export-recording").track({ click: true })}
            ></devtools-button>
            <devtools-menu
              @menucloserequest=${this.#onExportMenuClosed}
              @menuitemselected=${this.#onExportOptionSelected}
              .origin=${this.#getExportMenuButton}
              .showDivider=${false}
              .showSelectedItem=${false}
              .open=${this.exportMenuExpanded}
            >
              <devtools-menu-group .name=${i18nString(UIStrings.export)}>
                ${Lit.Directives.repeat(this.#builtInConverters, (converter) => {
      return html`
                    <devtools-menu-item
                      .value=${converter.getId()}
                      jslog=${VisualLogging.item(`converter-${Platform2.StringUtilities.toKebabCase(converter.getId())}`).track({ click: true })}>
                      ${converter.getFormatName()}
                    </devtools-menu-item>
                  `;
    })}
              </devtools-menu-group>
              <devtools-menu-group .name=${i18nString(UIStrings.exportViaExtensions)}>
                ${Lit.Directives.repeat(this.extensionConverters, (converter) => {
      return html`
                    <devtools-menu-item
                     .value=${converter.getId()}
                      jslog=${VisualLogging.item("converter-extension").track({ click: true })}>
                    ${converter.getFormatName()}
                    </devtools-menu-item>
                  `;
    })}
                <devtools-menu-item .value=${GET_EXTENSIONS_MENU_ITEM}>
                  ${i18nString(UIStrings.getExtensions)}
                </devtools-menu-item>
              </devtools-menu-group>
            </devtools-menu>
            <devtools-button
              @click=${this.#onDeleteRecording}
              .data=${{
      variant: "toolbar",
      iconName: "bin",
      disabled: !this.currentRecording || this.#replayState.isPlaying || this.isRecording || this.isToggling,
      title: i18nString(UIStrings.deleteRecording),
      jslogContext: "delete-recording"
    }}
            ></devtools-button>
            <div class="separator"></div>
            <devtools-button
              @click=${() => this.recordingPlayer?.continue()}
              .data=${{
      variant: "primary_toolbar",
      iconName: "resume",
      disabled: !this.recordingPlayer || !this.#replayState.isPausedOnBreakpoint,
      title: i18nString(UIStrings.continueReplay),
      jslogContext: "continue-replay"
    }}
            ></devtools-button>
            <devtools-button
              @click=${() => this.recordingPlayer?.stepOver()}
              .data=${{
      variant: "toolbar",
      iconName: "step-over",
      disabled: !this.recordingPlayer || !this.#replayState.isPausedOnBreakpoint,
      title: i18nString(UIStrings.stepOverReplay),
      jslogContext: "step-over"
    }}
            ></devtools-button>
            <div class="feedback">
              <x-link class="x-link" title=${i18nString(UIStrings.sendFeedback)} href=${FEEDBACK_URL} jslog=${VisualLogging.link("feedback").track({ click: true })}>${i18nString(UIStrings.sendFeedback)}</x-link>
            </div>
            <div class="separator"></div>
            <devtools-shortcut-dialog
              .data=${{
      shortcuts: this.#getShortcutsInfo()
    }} jslog=${VisualLogging.action("show-shortcuts").track({ click: true })}
            ></devtools-shortcut-dialog>
          </div>
          ${this.importError ? html`<div class='error'>Import error: ${this.importError.message}</div>` : ""}
          ${this.#renderCurrentPage()}
        </div>
      `;
  }
};
__decorate([
  state()
], RecorderController.prototype, "currentRecordingSession", void 0);
__decorate([
  state()
], RecorderController.prototype, "currentRecording", void 0);
__decorate([
  state()
], RecorderController.prototype, "currentStep", void 0);
__decorate([
  state()
], RecorderController.prototype, "recordingError", void 0);
__decorate([
  state()
], RecorderController.prototype, "isRecording", void 0);
__decorate([
  state()
], RecorderController.prototype, "isToggling", void 0);
__decorate([
  state()
], RecorderController.prototype, "recordingPlayer", void 0);
__decorate([
  state()
], RecorderController.prototype, "lastReplayResult", void 0);
__decorate([
  state()
], RecorderController.prototype, "currentPage", void 0);
__decorate([
  state()
], RecorderController.prototype, "previousPage", void 0);
__decorate([
  state()
], RecorderController.prototype, "sections", void 0);
__decorate([
  state()
], RecorderController.prototype, "settings", void 0);
__decorate([
  state()
], RecorderController.prototype, "importError", void 0);
__decorate([
  state()
], RecorderController.prototype, "exportMenuExpanded", void 0);
__decorate([
  state()
], RecorderController.prototype, "extensionConverters", void 0);
__decorate([
  state()
], RecorderController.prototype, "replayExtensions", void 0);
__decorate([
  state()
], RecorderController.prototype, "viewDescriptor", void 0);
RecorderController = __decorate([
  customElement("devtools-recorder-controller")
], RecorderController);

// gen/front_end/panels/recorder/RecorderPanel.js
var RecorderPanel_exports = {};
__export(RecorderPanel_exports, {
  ActionDelegate: () => ActionDelegate,
  RecorderPanel: () => RecorderPanel
});
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";
var recorderPanelInstance;
var RecorderPanel = class _RecorderPanel extends UI2.Panel.Panel {
  static panelName = "chrome-recorder";
  #controller;
  constructor() {
    super(_RecorderPanel.panelName);
    this.element.setAttribute("jslog", `${VisualLogging2.panel("chrome-recorder").track({ resize: true })}`);
    this.#controller = new RecorderController();
    this.contentElement.append(this.#controller);
    this.setHideOnDetach();
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!recorderPanelInstance || forceNew) {
      recorderPanelInstance = new _RecorderPanel();
    }
    return recorderPanelInstance;
  }
  wasShown() {
    super.wasShown();
    UI2.Context.Context.instance().setFlavor(_RecorderPanel, this);
    this.#controller.focus();
  }
  willHide() {
    super.willHide();
    UI2.Context.Context.instance().setFlavor(_RecorderPanel, null);
  }
  handleActions(actionId) {
    this.#controller.handleActions(actionId);
  }
  isActionPossible(actionId) {
    return this.#controller.isActionPossible(actionId);
  }
};
var ActionDelegate = class {
  handleAction(_context, actionId) {
    void (async () => {
      await UI2.ViewManager.ViewManager.instance().showView(RecorderPanel.panelName);
      const view = UI2.ViewManager.ViewManager.instance().view(RecorderPanel.panelName);
      if (view) {
        const widget = await view.widget();
        widget.handleActions(actionId);
      }
    })();
    return true;
  }
};
export {
  RecorderController_exports as RecorderController,
  RecorderEvents_exports as RecorderEvents,
  RecorderPanel_exports as RecorderPanel
};
//# sourceMappingURL=recorder.js.map
