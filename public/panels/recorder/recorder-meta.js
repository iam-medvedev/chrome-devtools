// ../../front_end/panels/recorder/recorder-meta.ts
import * as i18n from "../../core/i18n/i18n.js";
import * as UI from "../../ui/legacy/legacy.js";
import * as Actions from "./recorder-actions/recorder-actions.js";
var UIStrings = {
  /**
   * @description Title of the Recorder panel.
   */
  recorder: "Recorder",
  /**
   * @description Command for showing the Recorder panel.
   */
  showRecorder: "Show Recorder",
  /**
   * @description Title of the start/stop recording action in the command menu.
   */
  startStopRecording: "Start/stop recording",
  /**
   * @description Title of the create new recording action in the command menu.
   */
  createRecording: "Create a new recording",
  /**
   * @description Title of the replay recording action in the command menu.
   */
  replayRecording: "Replay recording",
  /**
   * @description Title for the toggle code action in the command menu.
   */
  toggleCode: "Toggle code view"
};
var str_ = i18n.i18n.registerUIStrings(
  "panels/recorder/recorder-meta.ts",
  UIStrings
);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(
  void 0,
  str_
);
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
  if (actionId && loadedRecorderModule.RecorderPanel.RecorderPanel.instance().isActionPossible(
    actionId
  )) {
    return getClassCallBack(loadedRecorderModule);
  }
  return [];
}
var viewId = "chrome-recorder";
UI.ViewManager.defaultOptionsForTabs[viewId] = true;
UI.ViewManager.registerViewExtension({
  location: UI.ViewManager.ViewLocationValues.PANEL,
  id: viewId,
  commandPrompt: i18nLazyString(UIStrings.showRecorder),
  title: i18nLazyString(UIStrings.recorder),
  order: 90,
  persistence: UI.ViewManager.ViewPersistence.CLOSEABLE,
  async loadView() {
    const Recorder = await loadRecorderModule();
    return Recorder.RecorderPanel.RecorderPanel.instance();
  }
});
UI.ActionRegistration.registerActionExtension({
  category: UI.ActionRegistration.ActionCategory.RECORDER,
  actionId: Actions.RecorderActions.CREATE_RECORDING,
  title: i18nLazyString(UIStrings.createRecording),
  async loadActionDelegate() {
    const Recorder = await loadRecorderModule();
    return new Recorder.RecorderPanel.ActionDelegate();
  }
});
UI.ActionRegistration.registerActionExtension({
  category: UI.ActionRegistration.ActionCategory.RECORDER,
  actionId: Actions.RecorderActions.START_RECORDING,
  title: i18nLazyString(UIStrings.startStopRecording),
  contextTypes() {
    return maybeRetrieveContextTypes(
      (Recorder) => [Recorder.RecorderPanel.RecorderPanel],
      Actions.RecorderActions.START_RECORDING
    );
  },
  async loadActionDelegate() {
    const Recorder = await loadRecorderModule();
    return new Recorder.RecorderPanel.ActionDelegate();
  },
  bindings: [
    {
      shortcut: "Ctrl+E",
      platform: UI.ActionRegistration.Platforms.WINDOWS_LINUX
    },
    { shortcut: "Meta+E", platform: UI.ActionRegistration.Platforms.MAC }
  ]
});
UI.ActionRegistration.registerActionExtension({
  category: UI.ActionRegistration.ActionCategory.RECORDER,
  actionId: Actions.RecorderActions.REPLAY_RECORDING,
  title: i18nLazyString(UIStrings.replayRecording),
  contextTypes() {
    return maybeRetrieveContextTypes(
      (Recorder) => [Recorder.RecorderPanel.RecorderPanel],
      Actions.RecorderActions.REPLAY_RECORDING
    );
  },
  async loadActionDelegate() {
    const Recorder = await loadRecorderModule();
    return new Recorder.RecorderPanel.ActionDelegate();
  },
  bindings: [
    {
      shortcut: "Ctrl+Enter",
      platform: UI.ActionRegistration.Platforms.WINDOWS_LINUX
    },
    { shortcut: "Meta+Enter", platform: UI.ActionRegistration.Platforms.MAC }
  ]
});
UI.ActionRegistration.registerActionExtension({
  category: UI.ActionRegistration.ActionCategory.RECORDER,
  actionId: Actions.RecorderActions.TOGGLE_CODE_VIEW,
  title: i18nLazyString(UIStrings.toggleCode),
  contextTypes() {
    return maybeRetrieveContextTypes(
      (Recorder) => [Recorder.RecorderPanel.RecorderPanel],
      Actions.RecorderActions.TOGGLE_CODE_VIEW
    );
  },
  async loadActionDelegate() {
    const Recorder = await loadRecorderModule();
    return new Recorder.RecorderPanel.ActionDelegate();
  },
  bindings: [
    {
      shortcut: "Ctrl+B",
      platform: UI.ActionRegistration.Platforms.WINDOWS_LINUX
    },
    { shortcut: "Meta+B", platform: UI.ActionRegistration.Platforms.MAC }
  ]
});
//# sourceMappingURL=recorder-meta.js.map
