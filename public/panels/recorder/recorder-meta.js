// gen/front_end/panels/recorder/recorder-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Title of the Recorder Panel
   */
  recorder: "Recorder",
  /**
   *@description Title of the Recorder Panel
   */
  showRecorder: "Show Recorder",
  /**
   *@description Title of start/stop recording action in command menu
   */
  startStopRecording: "Start/Stop recording",
  /**
   *@description Title of create a new recording action in command menu
   */
  createRecording: "Create a new recording",
  /**
   *@description Title of start a new recording action in command menu
   */
  replayRecording: "Replay recording",
  /**
   * @description Title for toggling code action in command menu
   */
  toggleCode: "Toggle code view"
};
var str_ = i18n.i18n.registerUIStrings("panels/recorder/recorder-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedRecorderModule;
async function loadRecorderModule() {
  if (!loadedRecorderModule) {
    loadedRecorderModule = await import("./recorder.js");
  }
  return loadedRecorderModule;
}
function maybeRetrieveContextTypes(getClassCallBack, actionId) {
  if (loadedRecorderModule === void 0) {
    return [];
  }
  if (actionId && loadedRecorderModule.RecorderPanel.RecorderPanel.instance().isActionPossible(actionId)) {
    return getClassCallBack(loadedRecorderModule);
  }
  return [];
}
var viewId = "chrome-recorder";
UI.ViewManager.defaultOptionsForTabs[viewId] = true;
UI.ViewManager.registerViewExtension({
  location: "panel",
  id: viewId,
  commandPrompt: i18nLazyString(UIStrings.showRecorder),
  title: i18nLazyString(UIStrings.recorder),
  order: 90,
  persistence: "closeable",
  async loadView() {
    const Recorder = await loadRecorderModule();
    return Recorder.RecorderPanel.RecorderPanel.instance();
  }
});
UI.ActionRegistration.registerActionExtension({
  category: "RECORDER",
  actionId: "chrome-recorder.create-recording",
  title: i18nLazyString(UIStrings.createRecording),
  async loadActionDelegate() {
    const Recorder = await loadRecorderModule();
    return new Recorder.RecorderPanel.ActionDelegate();
  }
});
UI.ActionRegistration.registerActionExtension({
  category: "RECORDER",
  actionId: "chrome-recorder.start-recording",
  title: i18nLazyString(UIStrings.startStopRecording),
  contextTypes() {
    return maybeRetrieveContextTypes(
      (Recorder) => [Recorder.RecorderPanel.RecorderPanel],
      "chrome-recorder.start-recording"
      /* Actions.RecorderActions.START_RECORDING */
    );
  },
  async loadActionDelegate() {
    const Recorder = await loadRecorderModule();
    return new Recorder.RecorderPanel.ActionDelegate();
  },
  bindings: [
    {
      shortcut: "Ctrl+E",
      platform: "windows,linux"
    },
    {
      shortcut: "Meta+E",
      platform: "mac"
      /* UI.ActionRegistration.Platforms.MAC */
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  category: "RECORDER",
  actionId: "chrome-recorder.replay-recording",
  title: i18nLazyString(UIStrings.replayRecording),
  contextTypes() {
    return maybeRetrieveContextTypes(
      (Recorder) => [Recorder.RecorderPanel.RecorderPanel],
      "chrome-recorder.replay-recording"
      /* Actions.RecorderActions.REPLAY_RECORDING */
    );
  },
  async loadActionDelegate() {
    const Recorder = await loadRecorderModule();
    return new Recorder.RecorderPanel.ActionDelegate();
  },
  bindings: [
    {
      shortcut: "Ctrl+Enter",
      platform: "windows,linux"
    },
    {
      shortcut: "Meta+Enter",
      platform: "mac"
      /* UI.ActionRegistration.Platforms.MAC */
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  category: "RECORDER",
  actionId: "chrome-recorder.toggle-code-view",
  title: i18nLazyString(UIStrings.toggleCode),
  contextTypes() {
    return maybeRetrieveContextTypes(
      (Recorder) => [Recorder.RecorderPanel.RecorderPanel],
      "chrome-recorder.toggle-code-view"
      /* Actions.RecorderActions.TOGGLE_CODE_VIEW */
    );
  },
  async loadActionDelegate() {
    const Recorder = await loadRecorderModule();
    return new Recorder.RecorderPanel.ActionDelegate();
  },
  bindings: [
    {
      shortcut: "Ctrl+B",
      platform: "windows,linux"
    },
    {
      shortcut: "Meta+B",
      platform: "mac"
      /* UI.ActionRegistration.Platforms.MAC */
    }
  ]
});
//# sourceMappingURL=recorder-meta.js.map
