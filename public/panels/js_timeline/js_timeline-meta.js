// gen/front_end/panels/js_timeline/js_timeline-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Text for the performance of something
   */
  performance: "Performance",
  /**
   *@description Command for showing the 'Performance' tool
   */
  showPerformance: "Show Performance",
  /**
   *@description Title of an action in the timeline tool to show history
   */
  showRecentTimelineSessions: "Show recent timeline sessions",
  /**
   *@description Text to record a series of actions for analysis
   */
  record: "Record",
  /**
   *@description Text of an item that stops the running task
   */
  stop: "Stop",
  /**
   *@description Title of an action in the timeline tool to record a reload of the current page
   */
  recordAndReload: "Record and reload"
};
var str_ = i18n.i18n.registerUIStrings("panels/js_timeline/js_timeline-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedTimelineModule;
async function loadTimelineModule() {
  if (!loadedTimelineModule) {
    loadedTimelineModule = await import("./../timeline/timeline.js");
  }
  return loadedTimelineModule;
}
function maybeRetrieveTimelineContextTypes(getClassCallBack) {
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
  order: 66,
  hasToolbar: false,
  isPreviewFeature: true,
  async loadView() {
    const Timeline = await loadTimelineModule();
    return Timeline.TimelinePanel.TimelinePanel.instance({ forceNew: null, isNode: true });
  }
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
    return maybeRetrieveTimelineContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
  actionId: "timeline.toggle-recording",
  category: "PERFORMANCE",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveTimelineContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
    return maybeRetrieveTimelineContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
Common.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  settingName: "annotations-hidden",
  settingType: "boolean",
  defaultValue: true
});
//# sourceMappingURL=js_timeline-meta.js.map
