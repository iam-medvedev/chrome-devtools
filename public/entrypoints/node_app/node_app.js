// gen/front_end/entrypoints/node_app/node_app.prebundle.js
import "./../shell/shell.js";

// gen/front_end/panels/mobile_throttling/mobile_throttling-meta.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Text for throttling the network
   */
  throttling: "Throttling",
  /**
   * @description Command for showing the Mobile Throttling tool.
   */
  showThrottling: "Show Throttling",
  /**
   * @description Title of an action in the network conditions tool to network offline
   */
  goOffline: "Go offline",
  /**
   * @description A tag of Mobile related settings that can be searched in the command menu
   */
  device: "device",
  /**
   * @description A tag of Network related actions that can be searched in the command menu
   */
  throttlingTag: "throttling",
  /**
   * @description Title of an action in the network conditions tool to simulate an environment with a
   * slow 3G connection, i.e. for a low end mobile device.
   */
  enableSlowGThrottling: "Enable slow `3G` throttling",
  /**
   * @description Title of an action in the network conditions tool to simulate an environment with a
   * medium-speed 3G connection, i.e. for a mid-tier mobile device.
   */
  enableFastGThrottling: "Enable fast `3G` throttling",
  /**
   * @description Title of an action in the network conditions tool to network online
   */
  goOnline: "Go online"
};
var str_ = i18n.i18n.registerUIStrings("panels/mobile_throttling/mobile_throttling-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedMobileThrottlingModule;
async function loadMobileThrottlingModule() {
  if (!loadedMobileThrottlingModule) {
    loadedMobileThrottlingModule = await import("./../../panels/mobile_throttling/mobile_throttling.js");
  }
  return loadedMobileThrottlingModule;
}
UI.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "throttling-conditions",
  title: i18nLazyString(UIStrings.throttling),
  commandPrompt: i18nLazyString(UIStrings.showThrottling),
  order: 35,
  async loadView() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingSettingsTab.ThrottlingSettingsTab();
  },
  settings: [
    "custom-network-conditions",
    "calibrated-cpu-throttling"
  ],
  iconName: "performance"
});
UI.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-offline",
  category: "NETWORK",
  title: i18nLazyString(UIStrings.goOffline),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString(UIStrings.device),
    i18nLazyString(UIStrings.throttlingTag)
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-low-end-mobile",
  category: "NETWORK",
  title: i18nLazyString(UIStrings.enableSlowGThrottling),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString(UIStrings.device),
    i18nLazyString(UIStrings.throttlingTag)
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-mid-tier-mobile",
  category: "NETWORK",
  title: i18nLazyString(UIStrings.enableFastGThrottling),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString(UIStrings.device),
    i18nLazyString(UIStrings.throttlingTag)
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-online",
  category: "NETWORK",
  title: i18nLazyString(UIStrings.goOnline),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString(UIStrings.device),
    i18nLazyString(UIStrings.throttlingTag)
  ]
});
Common.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "custom-network-conditions",
  settingType: "array",
  defaultValue: []
});

// gen/front_end/panels/js_timeline/js_timeline-meta.js
import * as Common2 from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
var UIStrings2 = {
  /**
   * @description Text for the performance of something
   */
  performance: "Performance",
  /**
   * @description Command for showing the 'Performance' tool
   */
  showPerformance: "Show Performance",
  /**
   * @description Title of an action in the timeline tool to show history
   */
  showRecentTimelineSessions: "Show recent timeline sessions",
  /**
   * @description Text to record a series of actions for analysis
   */
  record: "Record",
  /**
   * @description Text of an item that stops the running task
   */
  stop: "Stop",
  /**
   * @description Title of an action in the timeline tool to record a reload of the current page
   */
  recordAndReload: "Record and reload"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/js_timeline/js_timeline-meta.ts", UIStrings2);
var i18nLazyString2 = i18n3.i18n.getLazilyComputedLocalizedString.bind(void 0, str_2);
var loadedTimelineModule;
async function loadTimelineModule() {
  if (!loadedTimelineModule) {
    loadedTimelineModule = await import("./../../panels/timeline/timeline.js");
  }
  return loadedTimelineModule;
}
function maybeRetrieveTimelineContextTypes(getClassCallBack) {
  if (loadedTimelineModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedTimelineModule);
}
UI2.ViewManager.registerViewExtension({
  location: "panel",
  id: "timeline",
  title: i18nLazyString2(UIStrings2.performance),
  commandPrompt: i18nLazyString2(UIStrings2.showPerformance),
  order: 66,
  hasToolbar: false,
  isPreviewFeature: true,
  async loadView(universe) {
    const Timeline = await loadTimelineModule();
    const resourceLoader = universe.context.get(SDK.PageResourceLoader.PageResourceLoader);
    return Timeline.TimelinePanel.TimelinePanel.instance({ forceNew: true, resourceLoader });
  }
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "timeline.show-history",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  category: "PERFORMANCE",
  title: i18nLazyString2(UIStrings2.showRecentTimelineSessions),
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
UI2.ActionRegistration.registerActionExtension({
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
      title: i18nLazyString2(UIStrings2.record)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.stop)
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
UI2.ActionRegistration.registerActionExtension({
  actionId: "timeline.record-reload",
  iconClass: "refresh",
  contextTypes() {
    return maybeRetrieveTimelineContextTypes((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  category: "PERFORMANCE",
  title: i18nLazyString2(UIStrings2.recordAndReload),
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
Common2.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  settingName: "annotations-hidden",
  settingType: "boolean",
  defaultValue: true
});

// gen/front_end/panels/network/network-meta.js
import * as Common3 from "./../../core/common/common.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as PanelCommon from "./../../panels/common/common.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as NetworkForward from "./../../panels/network/forward/forward.js";
var UIStrings3 = {
  /**
   * @description Command for showing the 'Network' tool
   */
  showNetwork: "Show Network",
  /**
   * @description Title of the Network tool
   */
  network: "Network",
  /**
   * @description Command for showing the 'Network request blocking' tool
   */
  showRequestConditions: "Show Request conditions",
  /**
   * @description Title of the 'Request conditions' tool in the bottom drawer
   */
  networkRequestConditions: "Request conditions",
  /**
   * @description Command for showing the 'Network conditions' tool
   */
  showNetworkConditions: "Show Network conditions",
  /**
   * @description Title of the 'Network conditions' tool in the bottom drawer
   */
  networkConditions: "Network conditions",
  /**
   * @description A tag of Network Conditions tool that can be searched in the command menu
   */
  diskCache: "disk cache",
  /**
   * @description A tag of Network Conditions tool that can be searched in the command menu
   */
  networkThrottling: "network throttling",
  /**
   * @description Command for showing the 'Search' tool
   */
  showSearch: "Show Search",
  /**
   * @description Title of a search bar or tool
   */
  search: "Search",
  /**
   * @description Title of an action in the network tool to toggle recording
   */
  recordNetworkLog: "Record network log",
  /**
   * @description Title of an action in the network tool to toggle recording
   */
  stopRecordingNetworkLog: "Stop recording network log",
  /**
   * @description Title of an action that hides network request details
   */
  hideRequestDetails: "Hide request details",
  /**
   * @description Title of a setting under the Network category in Settings
   */
  colorcodeResourceTypes: "Color-code resource types",
  /**
   * @description A tag of Network color-code resource types that can be searched in the command menu
   */
  colorCode: "color code",
  /**
   * @description A tag of Network color-code resource types that can be searched in the command menu
   */
  resourceType: "resource type",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  colorCodeByResourceType: "Color code by resource type",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  useDefaultColors: "Use default colors",
  /**
   * @description Title of a setting under the Network category in Settings
   */
  groupNetworkLogByFrame: "Group network log by frame",
  /**
   * @description A tag of Group Network by frame setting that can be searched in the command menu
   */
  netWork: "network",
  /**
   * @description A tag of Group Network by frame setting that can be searched in the command menu
   */
  frame: "frame",
  /**
   * @description A tag of Group Network by frame setting that can be searched in the command menu
   */
  group: "group",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  groupNetworkLogItemsByFrame: "Group network log items by frame",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  dontGroupNetworkLogItemsByFrame: "Don't group network log items by frame",
  /**
   * @description Title of a button for clearing the network log
   */
  clear: "Clear network log",
  /**
   * @description Title of an action in the Network request blocking panel to add a new URL pattern to the blocklist.
   */
  addNetworkRequestBlockingOrThrottlingPattern: "Add network request blocking or throttling pattern",
  /**
   * @description Title of an action in the Network request blocking panel to clear all URL patterns.
   */
  removeAllNetworkRequestBlockingOrThrottlingPatterns: "Remove all network request blocking or throttling patterns",
  /**
   * @description Title of an action in the Network panel (and title of a setting in the Network category)
   *              that enables options in the UI to copy or export HAR (not translatable) with sensitive data.
   */
  allowToGenerateHarWithSensitiveData: "Allow to generate `HAR` with sensitive data",
  /**
   * @description Title of an action in the Network panel that disables options in the UI to copy or export
   *              HAR (not translatable) with sensitive data.
   */
  dontAllowToGenerateHarWithSensitiveData: "Don't allow to generate `HAR` with sensitive data",
  /**
   * @description Tooltip shown as documentation when hovering the (?) icon next to the "Allow to generate
   *              HAR with sensitive data" option in the Settings panel.
   */
  allowToGenerateHarWithSensitiveDataDocumentation: "By default generated HAR logs are sanitized and don't include `Cookie`, `Set-Cookie`, or `Authorization` HTTP headers. When this setting is enabled, options to export/copy HAR with sensitive data are provided."
};
var str_3 = i18n5.i18n.registerUIStrings("panels/network/network-meta.ts", UIStrings3);
var i18nLazyString3 = i18n5.i18n.getLazilyComputedLocalizedString.bind(void 0, str_3);
var i18nString = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var loadedNetworkModule;
var isNode = Root.Runtime.Runtime.isNode();
async function loadNetworkModule() {
  if (!loadedNetworkModule) {
    loadedNetworkModule = await import("./../../panels/network/network.js");
  }
  return loadedNetworkModule;
}
function maybeRetrieveContextTypes(getClassCallBack) {
  if (loadedNetworkModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedNetworkModule);
}
UI3.ViewManager.registerViewExtension({
  location: "panel",
  id: "network",
  commandPrompt: i18nLazyString3(UIStrings3.showNetwork),
  title: i18nLazyString3(UIStrings3.network),
  order: 40,
  isPreviewFeature: isNode,
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
UI3.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "network.blocked-urls",
  commandPrompt: () => i18nString(UIStrings3.showRequestConditions),
  title: () => i18nString(UIStrings3.networkRequestConditions),
  persistence: "closeable",
  order: 60,
  async loadView() {
    const Network = await loadNetworkModule();
    return new Network.RequestConditionsDrawer.RequestConditionsDrawer();
  }
});
UI3.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "network.config",
  commandPrompt: i18nLazyString3(UIStrings3.showNetworkConditions),
  title: i18nLazyString3(UIStrings3.networkConditions),
  persistence: "closeable",
  order: 40,
  tags: [
    i18nLazyString3(UIStrings3.diskCache),
    i18nLazyString3(UIStrings3.networkThrottling),
    i18n5.i18n.lockedLazyString("useragent"),
    i18n5.i18n.lockedLazyString("user agent"),
    i18n5.i18n.lockedLazyString("user-agent")
  ],
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkConfigView.NetworkConfigView.instance();
  }
});
UI3.ViewManager.registerViewExtension({
  location: "network-sidebar",
  id: "network.search-network-tab",
  commandPrompt: i18nLazyString3(UIStrings3.showSearch),
  title: i18nLazyString3(UIStrings3.search),
  persistence: "permanent",
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.SearchNetworkView.instance();
  }
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "network.toggle-recording",
  category: "NETWORK",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.NetworkPanel.NetworkPanel]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.ActionDelegate();
  },
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.recordNetworkLog)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.stopRecordingNetworkLog)
    }
  ],
  bindings: [
    {
      shortcut: "Ctrl+E",
      platform: "windows,linux"
    },
    {
      shortcut: "Meta+E",
      platform: "mac"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "network.clear",
  category: "NETWORK",
  title: i18nLazyString3(UIStrings3.clear),
  iconClass: "clear",
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.NetworkPanel.NetworkPanel]);
  },
  bindings: [
    {
      shortcut: "Ctrl+L"
    },
    {
      shortcut: "Meta+K",
      platform: "mac"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "network.hide-request-details",
  category: "NETWORK",
  title: i18nLazyString3(UIStrings3.hideRequestDetails),
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.NetworkPanel.NetworkPanel]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.ActionDelegate();
  },
  bindings: [
    {
      shortcut: "Esc"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "network.search",
  category: "NETWORK",
  title: i18nLazyString3(UIStrings3.search),
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.NetworkPanel.NetworkPanel]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.ActionDelegate();
  },
  bindings: [
    {
      platform: "mac",
      shortcut: "Meta+F",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+F",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "network.add-network-request-blocking-pattern",
  category: "NETWORK",
  title: () => i18nString(UIStrings3.addNetworkRequestBlockingOrThrottlingPattern),
  iconClass: "plus",
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.RequestConditionsDrawer.RequestConditionsDrawer]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.RequestConditionsDrawer.ActionDelegate();
  }
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "network.remove-all-network-request-blocking-patterns",
  category: "NETWORK",
  title: () => i18nString(UIStrings3.removeAllNetworkRequestBlockingOrThrottlingPatterns),
  iconClass: "clear",
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.RequestConditionsDrawer.RequestConditionsDrawer]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.RequestConditionsDrawer.ActionDelegate();
  }
});
Common3.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.allowToGenerateHarWithSensitiveData),
  settingName: "network.show-options-to-generate-har-with-sensitive-data",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18n5.i18n.lockedLazyString("HAR")
  ],
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.allowToGenerateHarWithSensitiveData)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.dontAllowToGenerateHarWithSensitiveData)
    }
  ],
  learnMore: {
    url: "https://goo.gle/devtools-export-hars",
    tooltip: i18nLazyString3(UIStrings3.allowToGenerateHarWithSensitiveDataDocumentation)
  }
});
Common3.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.colorcodeResourceTypes),
  settingName: "network-color-code-resource-types",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString3(UIStrings3.colorCode),
    i18nLazyString3(UIStrings3.resourceType)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.colorCodeByResourceType)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.useDefaultColors)
    }
  ]
});
Common3.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.groupNetworkLogByFrame),
  settingName: "network.group-by-frame",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString3(UIStrings3.netWork),
    i18nLazyString3(UIStrings3.frame),
    i18nLazyString3(UIStrings3.group)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.groupNetworkLogItemsByFrame)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.dontGroupNetworkLogItemsByFrame)
    }
  ]
});
UI3.ViewManager.registerLocationResolver({
  name: "network-sidebar",
  category: "NETWORK",
  async loadResolver() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
UI3.ContextMenu.registerProvider({
  contextTypes() {
    return [
      SDK2.NetworkRequest.NetworkRequest,
      SDK2.Resource.Resource,
      Workspace.UISourceCode.UISourceCode,
      SDK2.TraceObject.RevealableNetworkRequest
    ];
  },
  async loadProvider() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  },
  experiment: void 0
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK2.NetworkRequest.NetworkRequest
    ];
  },
  destination: Common3.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.UIRequestLocation.UIRequestLocation];
  },
  destination: void 0,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestLocationRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.NetworkRequestId.NetworkRequestId];
  },
  destination: Common3.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestIdRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.UIFilter.UIRequestFilter, PanelCommon.ExtensionServer.RevealableNetworkRequestFilter];
  },
  destination: Common3.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.NetworkLogWithFilterRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return [SDK2.NetworkManager.AppliedNetworkConditions];
  },
  destination: Common3.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.RequestConditionsDrawer.AppliedConditionsRevealer();
  }
});

// gen/front_end/entrypoints/node_app/node_app.prebundle.js
import * as Common4 from "./../../core/common/common.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as Root2 from "./../../core/root/root.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
import * as Main from "./../main/main.js";
import * as App from "./app/app.js";
var { NodeConnectionsPanel: NodeConnectionsPanel2 } = App.NodeConnectionsPanel;
var { NodeMainImpl } = App.NodeMain;
var UIStrings4 = {
  /**
   * @description Text that refers to the network connection
   */
  connection: "Connection",
  /**
   * @description A tag of Node.js Connection Panel that can be searched in the command menu
   */
  node: "node",
  /**
   * @description Command for showing the Connection tool
   */
  showConnection: "Show Connection",
  /**
   * @description Title of the 'Node' tool in the Network Navigator View, which is part of the Sources tool
   */
  networkTitle: "Node",
  /**
   * @description Command for showing the 'Node' tool in the Network Navigator View, which is part of the Sources tool
   */
  showNode: "Show Node",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  application: "Application",
  /**
   * @description Command for showing the 'Application' tool
   */
  showApplication: "Show Application"
};
var str_4 = i18n7.i18n.registerUIStrings("entrypoints/node_app/node_app.ts", UIStrings4);
var i18nLazyString4 = i18n7.i18n.getLazilyComputedLocalizedString.bind(void 0, str_4);
var loadedSourcesModule;
async function loadSourcesModule() {
  if (!loadedSourcesModule) {
    loadedSourcesModule = await import("./../../panels/sources/sources.js");
  }
  return loadedSourcesModule;
}
UI4.ViewManager.registerViewExtension({
  location: "panel",
  id: "node-connection",
  title: i18nLazyString4(UIStrings4.connection),
  commandPrompt: i18nLazyString4(UIStrings4.showConnection),
  order: 0,
  async loadView() {
    return new NodeConnectionsPanel2();
  },
  tags: [i18nLazyString4(UIStrings4.node)]
});
UI4.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-network",
  title: i18nLazyString4(UIStrings4.networkTitle),
  commandPrompt: i18nLazyString4(UIStrings4.showNode),
  order: 2,
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.NetworkNavigatorView.instance();
  }
});
var loadedResourcesModule;
async function loadResourcesModule() {
  if (!loadedResourcesModule) {
    loadedResourcesModule = await import("./../../panels/application/application.js");
  }
  return loadedResourcesModule;
}
UI4.ViewManager.registerViewExtension({
  location: "panel",
  id: "resources",
  title: i18nLazyString4(UIStrings4.application),
  commandPrompt: i18nLazyString4(UIStrings4.showApplication),
  order: 70,
  async loadView() {
    const Resources = await loadResourcesModule();
    return Resources.ResourcesPanel.ResourcesPanel.instance({
      forceNew: true,
      mode: "node"
    });
  },
  tags: []
});
self.runtime = Root2.Runtime.Runtime.instance({ forceNew: true });
Common4.Runnable.registerEarlyInitializationRunnable(NodeMainImpl.instance);
new Main.MainImpl.MainImpl();
//# sourceMappingURL=node_app.js.map
