// gen/front_end/entrypoints/node_app/node_app.prebundle.js
import "../shell/shell.js";

// gen/front_end/panels/mobile_throttling/mobile_throttling-meta.js
import * as Common from "../../core/common/common.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as UI from "../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Text for throttling the network.
   */
  throttling: "Throttling",
  /**
   * @description Command for showing the mobile throttling tool.
   */
  showThrottling: "Show Throttling",
  /**
   * @description Title of an action in the network conditions tool to network offline.
   */
  goOffline: "Go offline",
  /**
   * @description A tag of mobile-related settings that can be searched in the command menu.
   */
  device: "device",
  /**
   * @description A tag of network-related actions that can be searched in the command menu.
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
   * @description Title of an action in the network conditions tool to network online.
   */
  goOnline: "Go online"
};
var str_ = i18n.i18n.registerUIStrings("panels/mobile_throttling/mobile_throttling-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedMobileThrottlingModule;
async function loadMobileThrottlingModule() {
  if (!loadedMobileThrottlingModule) {
    loadedMobileThrottlingModule = await import("../../panels/mobile_throttling/mobile_throttling.js");
  }
  return loadedMobileThrottlingModule;
}
UI.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "throttling-conditions",
  title: i18nLazyString(UIStrings.throttling),
  commandPrompt: i18nLazyString(UIStrings.showThrottling),
  order: 35,
  async loadView(universe) {
    const MobileThrottling = await loadMobileThrottlingModule();
    const { settings } = universe;
    return new MobileThrottling.ThrottlingSettingsTab.ThrottlingSettingsTab(settings);
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

// gen/front_end/panels/network/network-meta.js
import * as Common2 from "../../core/common/common.js";
import * as i18n3 from "../../core/i18n/i18n.js";
import * as Root from "../../core/root/root.js";
import * as SDK from "../../core/sdk/sdk.js";
import * as Logs from "../../models/logs/logs.js";
import * as Workspace from "../../models/workspace/workspace.js";
import * as PanelCommon from "../../panels/common/common.js";
import * as UI2 from "../../ui/legacy/legacy.js";
import * as SettingsUI from "../../ui/settings/settings.js";
import * as NetworkForward from "../../panels/network/forward/forward.js";
var UIStrings2 = {
  /**
   * @description Text to keep the log after refreshing.
   */
  keepLog: "Keep log",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Keep log on page reload / navigation'. This is an additional search term to help
   * the user find the setting even when they don't know the exact name of it.
   */
  keep: "keep",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Keep log on page reload / navigation'. This is an additional search term to help
   * the user find the setting even when they don't know the exact name of it.
   */
  preserve: "preserve",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Keep log on page reload / navigation'. This is an additional search term to help
   * the user find the setting even when they don't know the exact name of it.
   */
  clearTag: "clear",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Keep log on page reload / navigation'. This is an additional search term to help
   * the user find the setting even when they don't know the exact name of it.
   */
  reset: "reset",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu.
   */
  keepLogOnPageReload: "Keep log on page reload / navigation",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu.
   */
  doNotKeepLogOnPageReload: "Don\u2019t keep log on page reload / navigation",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu.
   */
  enableCache: "Enable cache",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu.
   */
  disableCache: "Disable cache while DevTools is open",
  /**
   * @description Tooltip text for a setting that controls the network cache. Disabling the network cache can simulate the network connections of users that are visiting a page for the first time.
   */
  networkCacheExplanation: "Disabling the network cache will simulate a network experience similar to a first time visitor.",
  /**
   * @description Title of a setting under the Network category.
   */
  networkRequestBlocking: "Network request blocking",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu.
   */
  enableNetworkRequestBlocking: "Enable network request blocking",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu.
   */
  disableNetworkRequestBlocking: "Disable network request blocking",
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
  showRequestConditions: "Show request conditions",
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
  dontGroupNetworkLogItemsByFrame: "Don\u2019t group network log items by frame",
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
  dontAllowToGenerateHarWithSensitiveData: "Don\u2019t allow to generate `HAR` with sensitive data",
  /**
   * @description Tooltip shown as documentation when hovering the (?) icon next to the "Allow to generate
   *              HAR with sensitive data" option in the Settings panel.
   */
  allowToGenerateHarWithSensitiveDataDocumentation: "By default generated HAR logs are sanitized and don\u2019t include `Cookie`, `Set-Cookie`, or `Authorization` HTTP headers. When this setting is enabled, options to export/copy HAR with sensitive data are provided."
};
var str_2 = i18n3.i18n.registerUIStrings("panels/network/network-meta.ts", UIStrings2);
var i18nLazyString2 = i18n3.i18n.getLazilyComputedLocalizedString.bind(void 0, str_2);
var i18nString = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var loadedNetworkModule;
var isNode = Root.Runtime.Runtime.isNode();
async function loadNetworkModule() {
  if (!loadedNetworkModule) {
    loadedNetworkModule = await import("../../panels/network/network.js");
  }
  return loadedNetworkModule;
}
function maybeRetrieveContextTypes(getClassCallBack) {
  if (loadedNetworkModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedNetworkModule);
}
UI2.ViewManager.registerViewExtension({
  location: "panel",
  id: "network",
  commandPrompt: i18nLazyString2(UIStrings2.showNetwork),
  title: i18nLazyString2(UIStrings2.network),
  order: 40,
  isPreviewFeature: isNode,
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
UI2.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "network.blocked-urls",
  commandPrompt: () => i18nString(UIStrings2.showRequestConditions),
  title: () => i18nString(UIStrings2.networkRequestConditions),
  persistence: "closeable",
  order: 60,
  async loadView() {
    const Network = await loadNetworkModule();
    return new Network.RequestConditionsDrawer.RequestConditionsDrawer();
  }
});
UI2.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "network.config",
  commandPrompt: i18nLazyString2(UIStrings2.showNetworkConditions),
  title: i18nLazyString2(UIStrings2.networkConditions),
  persistence: "closeable",
  order: 40,
  tags: [
    i18nLazyString2(UIStrings2.diskCache),
    i18nLazyString2(UIStrings2.networkThrottling),
    i18n3.i18n.lockedLazyString("useragent"),
    i18n3.i18n.lockedLazyString("user agent"),
    i18n3.i18n.lockedLazyString("user-agent")
  ],
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkConfigView.NetworkConfigView.instance();
  }
});
UI2.ViewManager.registerViewExtension({
  location: "network-sidebar",
  id: "network.search-network-tab",
  commandPrompt: i18nLazyString2(UIStrings2.showSearch),
  title: i18nLazyString2(UIStrings2.search),
  persistence: "permanent",
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.SearchNetworkView.instance();
  }
});
UI2.ActionRegistration.registerActionExtension({
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
      title: i18nLazyString2(UIStrings2.recordNetworkLog)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.stopRecordingNetworkLog)
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
UI2.ActionRegistration.registerActionExtension({
  actionId: "network.clear",
  category: "NETWORK",
  title: i18nLazyString2(UIStrings2.clear),
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
UI2.ActionRegistration.registerActionExtension({
  actionId: "network.hide-request-details",
  category: "NETWORK",
  title: i18nLazyString2(UIStrings2.hideRequestDetails),
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
UI2.ActionRegistration.registerActionExtension({
  actionId: "network.search",
  category: "NETWORK",
  title: i18nLazyString2(UIStrings2.search),
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
UI2.ActionRegistration.registerActionExtension({
  actionId: "network.add-network-request-blocking-pattern",
  category: "NETWORK",
  title: () => i18nString(UIStrings2.addNetworkRequestBlockingOrThrottlingPattern),
  iconClass: "plus",
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.RequestConditionsDrawer.RequestConditionsDrawer]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.RequestConditionsDrawer.ActionDelegate();
  }
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "network.remove-all-network-request-blocking-patterns",
  category: "NETWORK",
  title: () => i18nString(UIStrings2.removeAllNetworkRequestBlockingOrThrottlingPatterns),
  iconClass: "clear",
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.RequestConditionsDrawer.RequestConditionsDrawer]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.RequestConditionsDrawer.ActionDelegate();
  }
});
Common2.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString2(UIStrings2.allowToGenerateHarWithSensitiveData),
  settingName: "network.show-options-to-generate-har-with-sensitive-data",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18n3.i18n.lockedLazyString("HAR")
  ],
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.allowToGenerateHarWithSensitiveData)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.dontAllowToGenerateHarWithSensitiveData)
    }
  ],
  learnMore: {
    url: "https://goo.gle/devtools-export-hars",
    tooltip: i18nLazyString2(UIStrings2.allowToGenerateHarWithSensitiveDataDocumentation)
  }
});
Common2.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString2(UIStrings2.colorcodeResourceTypes),
  settingName: "network-color-code-resource-types",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString2(UIStrings2.colorCode),
    i18nLazyString2(UIStrings2.resourceType)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.colorCodeByResourceType)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.useDefaultColors)
    }
  ]
});
Common2.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString2(UIStrings2.groupNetworkLogByFrame),
  settingName: "network.group-by-frame",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString2(UIStrings2.netWork),
    i18nLazyString2(UIStrings2.frame),
    i18nLazyString2(UIStrings2.group)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.groupNetworkLogItemsByFrame)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.dontGroupNetworkLogItemsByFrame)
    }
  ]
});
SettingsUI.SettingUIRegistration.register(SDK.SDKSettings.requestBlockingEnabledSettingDescriptor, {
  category: "NETWORK",
  title: i18nLazyString2(UIStrings2.networkRequestBlocking),
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.enableNetworkRequestBlocking)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.disableNetworkRequestBlocking)
    }
  ]
});
SettingsUI.SettingUIRegistration.register(SDK.SDKSettings.cacheDisabledSettingDescriptor, {
  category: "NETWORK",
  title: i18nLazyString2(UIStrings2.disableCache),
  order: 0,
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.disableCache)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.enableCache)
    }
  ],
  learnMore: {
    tooltip: i18nLazyString2(UIStrings2.networkCacheExplanation)
  }
});
SettingsUI.SettingUIRegistration.register(SDK.SDKSettings.preserveNetworkLogSettingDescriptor, {
  category: "NETWORK",
  title: i18nLazyString2(UIStrings2.keepLog),
  tags: [
    i18nLazyString2(UIStrings2.keep),
    i18nLazyString2(UIStrings2.preserve),
    i18nLazyString2(UIStrings2.clearTag),
    i18nLazyString2(UIStrings2.reset)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.keepLogOnPageReload)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.doNotKeepLogOnPageReload)
    }
  ]
});
SettingsUI.SettingUIRegistration.register(Logs.NetworkLog.recordNetworkLogSettingDescriptor, {
  category: "NETWORK",
  title: i18nLazyString2(UIStrings2.recordNetworkLog)
});
UI2.ViewManager.registerLocationResolver({
  name: "network-sidebar",
  category: "NETWORK",
  async loadResolver() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
UI2.ContextMenu.registerProvider({
  contextTypes() {
    return [
      SDK.NetworkRequest.NetworkRequest,
      SDK.Resource.Resource,
      Workspace.UISourceCode.UISourceCode,
      SDK.TraceObject.RevealableNetworkRequest
    ];
  },
  async loadProvider() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
Common2.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK.NetworkRequest.NetworkRequest
    ];
  },
  destination: Common2.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestRevealer();
  }
});
Common2.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.UIRequestLocation.UIRequestLocation];
  },
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestLocationRevealer();
  }
});
Common2.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.NetworkRequestId.NetworkRequestId];
  },
  destination: Common2.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestIdRevealer();
  }
});
Common2.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.UIFilter.UIRequestFilter, PanelCommon.ExtensionServer.RevealableNetworkRequestFilter];
  },
  destination: Common2.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.NetworkLogWithFilterRevealer();
  }
});
Common2.Revealer.registerRevealer({
  contextTypes() {
    return [SDK.NetworkManager.AppliedNetworkConditions];
  },
  destination: Common2.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.RequestConditionsDrawer.AppliedConditionsRevealer();
  }
});

// gen/front_end/panels/timeline/timeline-meta.js
import * as Common3 from "../../core/common/common.js";
import * as i18n5 from "../../core/i18n/i18n.js";
import * as SDK2 from "../../core/sdk/sdk.js";
import * as LiveMetrics from "../../models/live-metrics/live-metrics.js";
import * as UI3 from "../../ui/legacy/legacy.js";
import * as SettingsUI2 from "../../ui/settings/settings.js";
var UIStrings3 = {
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
var str_3 = i18n5.i18n.registerUIStrings("panels/timeline/timeline-meta.ts", UIStrings3);
var i18nLazyString3 = i18n5.i18n.getLazilyComputedLocalizedString.bind(void 0, str_3);
var loadedTimelineModule;
async function loadTimelineModule() {
  if (!loadedTimelineModule) {
    loadedTimelineModule = await import("../../panels/timeline/timeline.js");
  }
  return loadedTimelineModule;
}
function maybeRetrieveContextTypes2(getClassCallBack) {
  if (loadedTimelineModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedTimelineModule);
}
UI3.ViewManager.registerViewExtension({
  location: "panel",
  id: "timeline",
  title: i18nLazyString3(UIStrings3.performance),
  commandPrompt: i18nLazyString3(UIStrings3.showPerformance),
  order: 50,
  async loadView(universe) {
    const Timeline = await loadTimelineModule();
    const { pageResourceLoader: resourceLoader, targetManager, isolateManager } = universe;
    return Timeline.TimelinePanel.TimelinePanel.instance({ forceNew: true, resourceLoader, targetManager, isolateManager });
  }
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "timeline.toggle-recording",
  category: "PERFORMANCE",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.record)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.stop)
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
UI3.ActionRegistration.registerActionExtension({
  actionId: "timeline.record-reload",
  iconClass: "refresh",
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  category: "PERFORMANCE",
  title: i18nLazyString3(UIStrings3.recordAndReload),
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
UI3.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.save-to-file",
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString3(UIStrings3.saveProfile),
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
UI3.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.load-from-file",
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString3(UIStrings3.loadProfile),
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
UI3.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-previous-frame",
  category: "PERFORMANCE",
  title: i18nLazyString3(UIStrings3.previousFrame),
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI3.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-next-frame",
  category: "PERFORMANCE",
  title: i18nLazyString3(UIStrings3.nextFrame),
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI3.ActionRegistration.registerActionExtension({
  actionId: "timeline.show-history",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  category: "PERFORMANCE",
  title: i18nLazyString3(UIStrings3.showRecentTimelineSessions),
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI3.ActionRegistration.registerActionExtension({
  actionId: "timeline.previous-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString3(UIStrings3.previousRecording),
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI3.ActionRegistration.registerActionExtension({
  actionId: "timeline.next-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString3(UIStrings3.nextRecording),
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
Common3.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.chromeFrameInLayersView),
  settingName: "frame-viewer-chrome-window",
  settingType: "boolean",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.timelineInvalidationTracking),
  settingName: "timeline-invalidation-tracking",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.timelineShowAllEvents),
  settingName: "timeline-show-all-events",
  settingType: "boolean",
  defaultValue: false
});
SettingsUI2.SettingUIRegistration.register(LiveMetrics.timelineEnableSoftNavigationsSettingDescriptor, {
  category: "PERFORMANCE",
  title: i18nLazyString3(UIStrings3.enableSoftNavigations)
});
Common3.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.timelineDebugMode),
  settingName: "timeline-debug-mode",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  settingName: "annotations-hidden",
  settingType: "boolean",
  defaultValue: false
});
UI3.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.load-from-file",
  order: 10
});
UI3.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.save-to-file",
  order: 15
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return [SDK2.TraceObject.TraceObject];
  },
  destination: Common3.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.TraceRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.TimelinePanel.ParsedTraceRevealable]);
  },
  destination: Common3.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ParsedTraceRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return [SDK2.TraceObject.RevealableEvent];
  },
  destination: Common3.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.EventRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.Utils.Helpers.RevealableInsight]);
  },
  destination: Common3.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.InsightRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.Utils.Helpers.RevealableCoreVitals]);
  },
  destination: Common3.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.CoreVitalsRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.Utils.Helpers.RevealableTimeRange]);
  },
  destination: Common3.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.TimeRangeRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes2((Timeline) => [Timeline.Utils.Helpers.RevealableBottomUpProfile]);
  },
  destination: Common3.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.BottomUpProfileRevealer();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK2.CPUProfilerModel.ProfileFinishedData
    ];
  },
  destination: Common3.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ProfileFinishedRevealer();
  }
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString3(UIStrings3.disableJavascriptSamples),
  settingName: "timeline-disable-js-sampling",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString3(UIStrings3.enableAdvancedPaint),
  settingName: "timeline-capture-layers-and-pictures",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString3(UIStrings3.enableSelectorStats),
  settingName: "timeline-capture-selector-stats",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString3(UIStrings3.screenshotCapture),
  settingName: "timeline-screenshot-capture-mode",
  settingType: "enum",
  defaultValue: "auto"
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString3(UIStrings3.screenshots),
  settingName: "timeline-show-screenshots",
  settingType: "boolean",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString3(UIStrings3.memory),
  settingName: "timeline-show-memory",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString3(UIStrings3.dimThirdParties),
  settingName: "timeline-dim-third-parties",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString3(UIStrings3.showCustomtracks),
  settingName: "timeline-show-extension-data",
  settingType: "boolean",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString3(UIStrings3.jsHeap),
  settingName: "timeline-counters-graph-js-heap-size-used",
  settingType: "boolean",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString3(UIStrings3.documents),
  settingName: "timeline-counters-graph-documents",
  settingType: "boolean",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString3(UIStrings3.nodes),
  settingName: "timeline-counters-graph-nodes",
  settingType: "boolean",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString3(UIStrings3.listeners),
  settingName: "timeline-counters-graph-js-event-listeners",
  settingType: "boolean",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString3(UIStrings3.gpuMemory),
  settingName: "timeline-counters-graph-gpu-memory-used-kb",
  settingType: "boolean",
  defaultValue: true
});

// gen/front_end/entrypoints/node_app/node_app.prebundle.js
import * as Common4 from "../../core/common/common.js";
import * as i18n7 from "../../core/i18n/i18n.js";
import * as Root2 from "../../core/root/root.js";
import * as UI4 from "../../ui/legacy/legacy.js";
import * as Main from "../main/main.js";
import * as App from "./app/app.js";
var { NodeConnectionsPanel: NodeConnectionsPanel2 } = App.NodeConnectionsPanel;
var { NodeMainImpl } = App.NodeMain;
var UIStrings4 = {
  /**
   * @description Text that refers to the network connection.
   */
  connection: "Connection",
  /**
   * @description A tag of Node.js connection panel that can be searched in the command menu.
   */
  node: "node",
  /**
   * @description Command for showing the Connection tool.
   */
  showConnection: "Show Connection",
  /**
   * @description Title of the 'Node' tool in the Network navigator view, which is part of the Sources tool.
   */
  networkTitle: "Node",
  /**
   * @description Command for showing the 'Node' tool in the Network navigator view, which is part of the Sources tool.
   */
  showNode: "Show Node",
  /**
   * @description Text in Application panel sidebar of the Application panel.
   */
  application: "Application",
  /**
   * @description Command for showing the Application tool.
   */
  showApplication: "Show Application"
};
var str_4 = i18n7.i18n.registerUIStrings("entrypoints/node_app/node_app.ts", UIStrings4);
var i18nLazyString4 = i18n7.i18n.getLazilyComputedLocalizedString.bind(void 0, str_4);
var loadedSourcesModule;
async function loadSourcesModule() {
  if (!loadedSourcesModule) {
    loadedSourcesModule = await import("../../panels/sources/sources.js");
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
  async loadView(universe) {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.NetworkNavigatorView.instance({ forceNew: null, networkProjectManager: universe.networkProjectManager });
  }
});
var loadedResourcesModule;
async function loadResourcesModule() {
  if (!loadedResourcesModule) {
    loadedResourcesModule = await import("../../panels/application/application.js");
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
