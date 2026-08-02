// gen/front_end/panels/timeline/timeline-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as LiveMetrics from "./../../models/live-metrics/live-metrics.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as SettingsUI from "./../../ui/settings/settings.js";
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
  chromeFrameInLayersView: "Chrome frame in Layers view",
  /**
   * @description Title of a setting under the Performance category in Settings
   */
  timelineShowAllEvents: "Show all events",
  /**
   * @description Title of a setting under the Performance category in Settings
   */
  enableSoftNavigations: "Enable soft navigation performance monitoring",
  /**
   * @description Title of a setting under the Performance category in Settings
   */
  timelineDebugMode: "Timeline debug mode (trace event details, etc.)",
  /**
   * @description Title of a setting under the Performance category in Settings
   */
  timelineInvalidationTracking: "Invalidation tracking",
  /**
   * @description Title of a setting in Performance panel.
   */
  disableJavascriptSamples: "Disable JavaScript samples",
  /**
   * @description Title of a setting in Performance panel.
   */
  enableAdvancedPaint: "Enable advanced paint instrumentation (slow)",
  /**
   * @description Title of a setting in Performance panel.
   */
  enableSelectorStats: "Enable CSS selector stats (slow)",
  /**
   * @description Title of a setting in Performance panel.
   */
  screenshotCapture: "Screenshot capture",
  /**
   * @description Title of a setting in Performance panel.
   */
  screenshots: "Screenshots",
  /**
   * @description Title of a setting in Performance panel.
   */
  memory: "Memory",
  /**
   * @description Title of a setting in Performance panel.
   */
  dimThirdParties: "Dim 3rd parties",
  /**
   * @description Title of a setting in Performance panel.
   */
  showCustomtracks: "Show custom tracks",
  /**
   * @description Title of a setting in Performance panel counters graph.
   */
  jsHeap: "JS heap",
  /**
   * @description Title of a setting in Performance panel counters graph.
   */
  documents: "Documents",
  /**
   * @description Title of a setting in Performance panel counters graph.
   */
  nodes: "Nodes",
  /**
   * @description Title of a setting in Performance panel counters graph.
   */
  listeners: "Listeners",
  /**
   * @description Title of a setting in Performance panel counters graph.
   */
  gpuMemory: "GPU memory"
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
    const { pageResourceLoader: resourceLoader, targetManager, isolateManager } = universe;
    return Timeline.TimelinePanel.TimelinePanel.instance({ forceNew: true, resourceLoader, targetManager, isolateManager });
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
  title: i18nLazyString(UIStrings.chromeFrameInLayersView),
  settingName: "frame-viewer-chrome-window",
  settingType: "boolean",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.timelineInvalidationTracking),
  settingName: "timeline-invalidation-tracking",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.timelineShowAllEvents),
  settingName: "timeline-show-all-events",
  settingType: "boolean",
  defaultValue: false
});
SettingsUI.SettingUIRegistration.register(LiveMetrics.timelineEnableSoftNavigationsSettingDescriptor, {
  category: "PERFORMANCE",
  title: i18nLazyString(UIStrings.enableSoftNavigations)
});
Common.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.timelineDebugMode),
  settingName: "timeline-debug-mode",
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
    return maybeRetrieveContextTypes((Timeline) => [Timeline.TimelinePanel.ParsedTraceRevealable]);
  },
  destination: Common.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ParsedTraceRevealer();
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
Common.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.Utils.Helpers.RevealableCoreVitals]);
  },
  destination: Common.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.CoreVitalsRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.Utils.Helpers.RevealableTimeRange]);
  },
  destination: Common.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.TimeRangeRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes((Timeline) => [Timeline.Utils.Helpers.RevealableBottomUpProfile]);
  },
  destination: Common.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.BottomUpProfileRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK.CPUProfilerModel.ProfileFinishedData
    ];
  },
  destination: Common.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ProfileFinishedRevealer();
  }
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString(UIStrings.disableJavascriptSamples),
  settingName: "timeline-disable-js-sampling",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString(UIStrings.enableAdvancedPaint),
  settingName: "timeline-capture-layers-and-pictures",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString(UIStrings.enableSelectorStats),
  settingName: "timeline-capture-selector-stats",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString(UIStrings.screenshotCapture),
  settingName: "timeline-screenshot-capture-mode",
  settingType: "enum",
  defaultValue: "auto"
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString(UIStrings.screenshots),
  settingName: "timeline-show-screenshots",
  settingType: "boolean",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString(UIStrings.memory),
  settingName: "timeline-show-memory",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString(UIStrings.dimThirdParties),
  settingName: "timeline-dim-third-parties",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString(UIStrings.showCustomtracks),
  settingName: "timeline-show-extension-data",
  settingType: "boolean",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString(UIStrings.jsHeap),
  settingName: "timeline-counters-graph-js-heap-size-used",
  settingType: "boolean",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString(UIStrings.documents),
  settingName: "timeline-counters-graph-documents",
  settingType: "boolean",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString(UIStrings.nodes),
  settingName: "timeline-counters-graph-nodes",
  settingType: "boolean",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString(UIStrings.listeners),
  settingName: "timeline-counters-graph-js-event-listeners",
  settingType: "boolean",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString(UIStrings.gpuMemory),
  settingName: "timeline-counters-graph-gpu-memory-used-kb",
  settingType: "boolean",
  defaultValue: true
});
//# sourceMappingURL=timeline-meta.js.map
