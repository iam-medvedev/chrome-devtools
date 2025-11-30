// gen/front_end/panels/timeline/timeline-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Text for the performance of something
   */
  performance: "Performance",
  /**
   * @description Command for showing the 'Performance' tool
   */
  showPerformance: "Show Performance",
  /**
   * @description Text to record a series of actions for analysis
   */
  record: "Record",
  /**
   * @description Text of an item that stops the running task
   */
  stop: "Stop",
  /**
   * @description Title of an action in the timeline tool to record reload
   */
  recordAndReload: "Record and reload",
  /**
   * @description Tooltip text that appears when hovering over the largeicon download button
   */
  saveProfile: "Save profile\u2026",
  /**
   * @description Tooltip text that appears when hovering over the largeicon load button
   */
  loadProfile: "Load profile\u2026",
  /**
   * @description Prev button title in Film Strip View of the Performance panel
   */
  previousFrame: "Previous frame",
  /**
   * @description Next button title in Film Strip View of the Performance panel
   */
  nextFrame: "Next frame",
  /**
   * @description Title of an action in the timeline tool to show history
   */
  showRecentTimelineSessions: "Show recent timeline sessions",
  /**
   * @description Title of an action that opens the previous recording in the performance panel
   */
  previousRecording: "Previous recording",
  /**
   * @description Title of an action that opens the next recording in the performance panel
   */
  nextRecording: "Next recording",
  /**
   * @description Title of a setting under the Performance category in Settings
   */
  hideChromeFrameInLayersView: "Hide `chrome` frame in Layers view"
};
var str_ = i18n.i18n.registerUIStrings("panels/timeline/timeline-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedTimelineModule;
async function loadTimelineModule() {
  if (!loadedTimelineModule) {
    loadedTimelineModule = await import("./timeline.js");
  }
  return loadedTimelineModule;
}
function maybeRetrieveContextTypes(getClassCallBack) {
  if (loadedTimelineModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedTimelineModule);
}
UI.ViewManager.registerViewExtension({
  location: "panel",
  id: "timeline",
  title: i18nLazyString(UIStrings.performance),
  commandPrompt: i18nLazyString(UIStrings.showPerformance),
  order: 50,
  async loadView(universe) {
    const Timeline = await loadTimelineModule();
    const resourceLoader = universe.context.get(SDK.PageResourceLoader.PageResourceLoader);
    return Timeline.TimelinePanel.TimelinePanel.instance({ forceNew: true, resourceLoader });
  }
});
UI.ActionRegistration.registerActionExtension({
  actionId: "timeline.toggle-recording",
  category: "PERFORMANCE",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.record)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.stop)
    }
  ],
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+E"
    },
    {
      platform: "mac",
      shortcut: "Meta+E"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "timeline.record-reload",
  iconClass: "refresh",
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  category: "PERFORMANCE",
  title: i18nLazyString(UIStrings.recordAndReload),
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+E"
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+E"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.save-to-file",
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString(UIStrings.saveProfile),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+S"
    },
    {
      platform: "mac",
      shortcut: "Meta+S"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.load-from-file",
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString(UIStrings.loadProfile),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+O"
    },
    {
      platform: "mac",
      shortcut: "Meta+O"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-previous-frame",
  category: "PERFORMANCE",
  title: i18nLazyString(UIStrings.previousFrame),
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  bindings: [
    {
      shortcut: "["
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-next-frame",
  category: "PERFORMANCE",
  title: i18nLazyString(UIStrings.nextFrame),
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  bindings: [
    {
      shortcut: "]"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "timeline.show-history",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  category: "PERFORMANCE",
  title: i18nLazyString(UIStrings.showRecentTimelineSessions),
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+H"
    },
    {
      platform: "mac",
      shortcut: "Meta+Y"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "timeline.previous-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString(UIStrings.previousRecording),
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Alt+Left"
    },
    {
      platform: "mac",
      shortcut: "Meta+Left"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "timeline.next-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString(UIStrings.nextRecording),
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Alt+Right"
    },
    {
      platform: "mac",
      shortcut: "Meta+Right"
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.hideChromeFrameInLayersView),
  settingName: "frame-viewer-hide-chrome-window",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  settingName: "annotations-hidden",
  settingType: "boolean",
  defaultValue: false
});
UI.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.load-from-file",
  order: 10
});
UI.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.save-to-file",
  order: 15
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [SDK.TraceObject.TraceObject];
  },
  destination: Common.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.TraceRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [SDK.TraceObject.RevealableEvent];
  },
  destination: Common.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.EventRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.Utils.Helpers.RevealableInsight]);
  },
  destination: Common.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.InsightRevealer();
  }
});
//# sourceMappingURL=timeline-meta.js.map
