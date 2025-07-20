// gen/front_end/entrypoints/node_app/node_app.prebundle.js
import "./../shell/shell.js";

// gen/front_end/panels/mobile_throttling/mobile_throttling-meta.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Text for throttling the network
   */
  throttling: "Throttling",
  /**
   *@description Command for showing the Mobile Throttling tool.
   */
  showThrottling: "Show Throttling",
  /**
   *@description Title of an action in the network conditions tool to network offline
   */
  goOffline: "Go offline",
  /**
   *@description A tag of Mobile related settings that can be searched in the command menu
   */
  device: "device",
  /**
   *@description A tag of Network related actions that can be searched in the command menu
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
   *@description Title of an action in the network conditions tool to network online
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
import * as UI2 from "./../../ui/legacy/legacy.js";
var UIStrings2 = {
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
  async loadView() {
    const Timeline = await loadTimelineModule();
    return Timeline.TimelinePanel.TimelinePanel.instance({ forceNew: null, isNode: true });
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
import * as SDK from "./../../core/sdk/sdk.js";
import * as Extensions from "./../../models/extensions/extensions.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as NetworkForward from "./../../panels/network/forward/forward.js";
var UIStrings3 = {
  /**
   *@description Command for showing the 'Network' tool
   */
  showNetwork: "Show Network",
  /**
   *@description Title of the Network tool
   */
  network: "Network",
  /**
   *@description Command for showing the 'Network request blocking' tool
   */
  showNetworkRequestBlocking: "Show Network request blocking",
  /**
   *@description Title of the 'Network request blocking' tool in the bottom drawer
   */
  networkRequestBlocking: "Network request blocking",
  /**
   *@description Command for showing the 'Network conditions' tool
   */
  showNetworkConditions: "Show Network conditions",
  /**
   *@description Title of the 'Network conditions' tool in the bottom drawer
   */
  networkConditions: "Network conditions",
  /**
   *@description A tag of Network Conditions tool that can be searched in the command menu
   */
  diskCache: "disk cache",
  /**
   *@description A tag of Network Conditions tool that can be searched in the command menu
   */
  networkThrottling: "network throttling",
  /**
   *@description Command for showing the 'Search' tool
   */
  showSearch: "Show Search",
  /**
   *@description Title of a search bar or tool
   */
  search: "Search",
  /**
   *@description Title of an action in the network tool to toggle recording
   */
  recordNetworkLog: "Record network log",
  /**
   *@description Title of an action in the network tool to toggle recording
   */
  stopRecordingNetworkLog: "Stop recording network log",
  /**
   *@description Title of an action that hides network request details
   */
  hideRequestDetails: "Hide request details",
  /**
   *@description Title of a setting under the Network category in Settings
   */
  colorcodeResourceTypes: "Color-code resource types",
  /**
   *@description A tag of Network color-code resource types that can be searched in the command menu
   */
  colorCode: "color code",
  /**
   *@description A tag of Network color-code resource types that can be searched in the command menu
   */
  resourceType: "resource type",
  /**
   *@description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  colorCodeByResourceType: "Color code by resource type",
  /**
   *@description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  useDefaultColors: "Use default colors",
  /**
   *@description Title of a setting under the Network category in Settings
   */
  groupNetworkLogByFrame: "Group network log by frame",
  /**
   *@description A tag of Group Network by frame setting that can be searched in the command menu
   */
  netWork: "network",
  /**
   *@description A tag of Group Network by frame setting that can be searched in the command menu
   */
  frame: "frame",
  /**
   *@description A tag of Group Network by frame setting that can be searched in the command menu
   */
  group: "group",
  /**
   *@description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  groupNetworkLogItemsByFrame: "Group network log items by frame",
  /**
   *@description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  dontGroupNetworkLogItemsByFrame: "Don't group network log items by frame",
  /**
   *@description Title of a button for clearing the network log
   */
  clear: "Clear network log",
  /**
   *@description Title of an action in the Network request blocking panel to add a new URL pattern to the blocklist.
   */
  addNetworkRequestBlockingPattern: "Add network request blocking pattern",
  /**
   *@description Title of an action in the Network request blocking panel to clear all URL patterns.
   */
  removeAllNetworkRequestBlockingPatterns: "Remove all network request blocking patterns",
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
  commandPrompt: i18nLazyString3(UIStrings3.showNetworkRequestBlocking),
  title: i18nLazyString3(UIStrings3.networkRequestBlocking),
  persistence: "closeable",
  order: 60,
  async loadView() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.BlockedURLsPane();
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
  title: i18nLazyString3(UIStrings3.addNetworkRequestBlockingPattern),
  iconClass: "plus",
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.BlockedURLsPane.BlockedURLsPane]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.ActionDelegate();
  }
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "network.remove-all-network-request-blocking-patterns",
  category: "NETWORK",
  title: i18nLazyString3(UIStrings3.removeAllNetworkRequestBlockingPatterns),
  iconClass: "clear",
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.BlockedURLsPane.BlockedURLsPane]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.ActionDelegate();
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
      SDK.NetworkRequest.NetworkRequest,
      SDK.Resource.Resource,
      Workspace.UISourceCode.UISourceCode,
      SDK.TraceObject.RevealableNetworkRequest
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
      SDK.NetworkRequest.NetworkRequest
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
    return [NetworkForward.UIFilter.UIRequestFilter, Extensions.ExtensionServer.RevealableNetworkRequestFilter];
  },
  destination: Common3.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.NetworkLogWithFilterRevealer();
  }
});

// gen/front_end/entrypoints/node_app/node_app.prebundle.js
import * as Common4 from "./../../core/common/common.js";
import * as i18n11 from "./../../core/i18n/i18n.js";
import * as Root2 from "./../../core/root/root.js";
import * as UI5 from "./../../ui/legacy/legacy.js";
import * as Main from "./../main/main.js";

// gen/front_end/entrypoints/node_app/NodeConnectionsPanel.js
import * as Host from "./../../core/host/host.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI4 from "./../../ui/legacy/legacy.js";

// gen/front_end/entrypoints/node_app/nodeConnectionsPanel.css.js
var nodeConnectionsPanel_css_default = `/*
 * Copyright (c) 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.add-network-target-button {
  margin: 10px 25px;
  align-self: center;
}

.network-discovery-list {
  flex: none;
  max-width: 600px;
  max-height: 202px;
  margin: 20px 0 5px;
}

.network-discovery-list-empty {
  flex: auto;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.network-discovery-list-item {
  padding: 3px 5px;
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;
  flex: auto 1 1;
}

.network-discovery-value {
  flex: 3 1 0;
}

.list-item .network-discovery-value {
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
  color: var(--sys-color-on-surface);
  overflow: hidden;
}

.network-discovery-edit-row {
  flex: none;
  display: flex;
  flex-direction: row;
  margin: 6px 5px;
  align-items: center;
}

.network-discovery-edit-row input {
  width: 100%;
  text-align: inherit;
}

.network-discovery-footer {
  margin: 0;
  overflow: hidden;
  max-width: 500px;
  padding: 3px;
}

.network-discovery-footer > * {
  white-space: pre-wrap;
}

.node-panel {
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
}

.network-discovery-view {
  min-width: 400px;
  text-align: left;
}

:host-context(.node-frontend) .network-discovery-list-empty {
  height: 40px;
}

:host-context(.node-frontend) .network-discovery-list-item {
  padding: 3px 15px;
  height: 40px;
}

.node-panel-center {
  max-width: 600px;
  padding-top: 50px;
  text-align: center;
}

.node-panel-logo {
  width: 400px;
  margin-bottom: 50px;
}

:host-context(.node-frontend) .network-discovery-edit-row input {
  height: 30px;
  padding-left: 5px;
}

:host-context(.node-frontend) .network-discovery-edit-row {
  margin: 6px 9px;
}

/*# sourceURL=${import.meta.resolve("./nodeConnectionsPanel.css")} */`;

// gen/front_end/entrypoints/node_app/NodeConnectionsPanel.js
var UIStrings4 = {
  /**
   *@description Text in Node Connections Panel of the Sources panel when debugging a Node.js app
   */
  nodejsDebuggingGuide: "Node.js debugging guide",
  /**
   *@description Text in Node Connections Panel of the Sources panel when debugging a Node.js app
   *@example {Node.js debugging guide} PH1
   */
  specifyNetworkEndpointAnd: "Specify network endpoint and DevTools will connect to it automatically. Read {PH1} to learn more.",
  /**
   *@description Placeholder text content in Node Connections Panel of the Sources panel when debugging a Node.js app
   */
  noConnectionsSpecified: "No connections specified",
  /**
   *@description Text of add network target button in Node Connections Panel of the Sources panel when debugging a Node.js app
   */
  addConnection: "Add connection",
  /**
   *@description Text in Node Connections Panel of the Sources panel when debugging a Node.js app
   */
  networkAddressEgLocalhost: "Network address (e.g. localhost:9229)"
};
var str_4 = i18n7.i18n.registerUIStrings("entrypoints/node_app/NodeConnectionsPanel.ts", UIStrings4);
var i18nString = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var nodejsIconUrl = new URL("../../Images/node-stack-icon.svg", import.meta.url).toString();
var NodeConnectionsPanel = class extends UI4.Panel.Panel {
  #config;
  #networkDiscoveryView;
  constructor() {
    super("node-connection");
    this.contentElement.classList.add("node-panel");
    const container = this.contentElement.createChild("div", "node-panel-center");
    const image = container.createChild("img", "node-panel-logo");
    image.src = nodejsIconUrl;
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged, this.#devicesDiscoveryConfigChanged, this);
    this.contentElement.tabIndex = 0;
    this.setDefaultFocusedElement(this.contentElement);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(false);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(true);
    this.#networkDiscoveryView = new NodeConnectionsView((config) => {
      this.#config.networkDiscoveryConfig = config;
      Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesDiscoveryConfig(this.#config);
    });
    this.#networkDiscoveryView.show(container);
  }
  #devicesDiscoveryConfigChanged({ data: config }) {
    this.#config = config;
    this.#networkDiscoveryView.discoveryConfigChanged(this.#config.networkDiscoveryConfig);
  }
  wasShown() {
    super.wasShown();
    this.registerRequiredCSS(nodeConnectionsPanel_css_default);
  }
};
var NodeConnectionsView = class extends UI4.Widget.VBox {
  #callback;
  #list;
  #editor;
  #networkDiscoveryConfig;
  constructor(callback) {
    super();
    this.#callback = callback;
    this.element.classList.add("network-discovery-view");
    const networkDiscoveryFooter = this.element.createChild("div", "network-discovery-footer");
    const documentationLink = UI4.XLink.XLink.create("https://nodejs.org/en/docs/inspector/", i18nString(UIStrings4.nodejsDebuggingGuide), void 0, void 0, "node-js-debugging");
    networkDiscoveryFooter.appendChild(i18n7.i18n.getFormatLocalizedString(str_4, UIStrings4.specifyNetworkEndpointAnd, { PH1: documentationLink }));
    this.#list = new UI4.ListWidget.ListWidget(this);
    this.#list.registerRequiredCSS(nodeConnectionsPanel_css_default);
    this.#list.element.classList.add("network-discovery-list");
    const placeholder = document.createElement("div");
    placeholder.classList.add("network-discovery-list-empty");
    placeholder.textContent = i18nString(UIStrings4.noConnectionsSpecified);
    this.#list.setEmptyPlaceholder(placeholder);
    this.#list.show(this.element);
    this.#editor = null;
    const addButton = UI4.UIUtils.createTextButton(i18nString(UIStrings4.addConnection), this.#addNetworkTargetButtonClicked.bind(this), {
      className: "add-network-target-button",
      variant: "primary"
      /* Buttons.Button.Variant.PRIMARY */
    });
    this.element.appendChild(addButton);
    this.#networkDiscoveryConfig = [];
    this.element.classList.add("node-frontend");
  }
  #update() {
    const config = this.#networkDiscoveryConfig.map((item) => item.address);
    this.#callback.call(null, config);
  }
  #addNetworkTargetButtonClicked() {
    this.#list.addNewItem(this.#networkDiscoveryConfig.length, { address: "", port: "" });
  }
  discoveryConfigChanged(networkDiscoveryConfig) {
    this.#networkDiscoveryConfig = [];
    this.#list.clear();
    for (const address of networkDiscoveryConfig) {
      const item = { address, port: "" };
      this.#networkDiscoveryConfig.push(item);
      this.#list.appendItem(item, true);
    }
  }
  renderItem(rule, _editable) {
    const element = document.createElement("div");
    element.classList.add("network-discovery-list-item");
    element.createChild("div", "network-discovery-value network-discovery-address").textContent = rule.address;
    return element;
  }
  removeItemRequested(_rule, index) {
    this.#networkDiscoveryConfig.splice(index, 1);
    this.#list.removeItem(index);
    this.#update();
  }
  commitEdit(rule, editor, isNew) {
    rule.address = editor.control("address").value.trim();
    if (isNew) {
      this.#networkDiscoveryConfig.push(rule);
    }
    this.#update();
  }
  beginEdit(rule) {
    const editor = this.#createEditor();
    editor.control("address").value = rule.address;
    return editor;
  }
  #createEditor() {
    if (this.#editor) {
      return this.#editor;
    }
    const editor = new UI4.ListWidget.Editor();
    this.#editor = editor;
    const content = editor.contentElement();
    const fields = content.createChild("div", "network-discovery-edit-row");
    const input = editor.createInput("address", "text", i18nString(UIStrings4.networkAddressEgLocalhost), addressValidator);
    fields.createChild("div", "network-discovery-value network-discovery-address").appendChild(input);
    return editor;
    function addressValidator(_rule, _index, input2) {
      const match = input2.value.trim().match(/^([a-zA-Z0-9\.\-_]+):(\d+)$/);
      if (!match) {
        return {
          valid: false,
          errorMessage: void 0
        };
      }
      const port = parseInt(match[2], 10);
      return {
        valid: port <= 65535,
        errorMessage: void 0
      };
    }
  }
};

// gen/front_end/entrypoints/node_app/NodeMain.js
import * as Host2 from "./../../core/host/host.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
var UIStrings5 = {
  /**
   *@description Text that refers to the main target
   */
  main: "Main",
  /**
   *@description Text in Node Main of the Sources panel when debugging a Node.js app
   *@example {example.com} PH1
   */
  nodejsS: "Node.js: {PH1}",
  /**
   *@description Text in DevTools window title when debugging a Node.js app
   *@example {example.com} PH1
   */
  NodejsTitleS: "DevTools - Node.js: {PH1}"
};
var str_5 = i18n9.i18n.registerUIStrings("entrypoints/node_app/NodeMain.ts", UIStrings5);
var i18nString2 = i18n9.i18n.getLocalizedString.bind(void 0, str_5);
var nodeMainImplInstance;
var NodeMainImpl = class _NodeMainImpl {
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!nodeMainImplInstance || forceNew) {
      nodeMainImplInstance = new _NodeMainImpl();
    }
    return nodeMainImplInstance;
  }
  async run() {
    Host2.userMetrics.actionTaken(Host2.UserMetrics.Action.ConnectToNodeJSFromFrontend);
    void SDK2.Connections.initMainConnection(async () => {
      const target = SDK2.TargetManager.TargetManager.instance().createTarget(
        // TODO: Use SDK.Target.Type.NODE rather thatn BROWSER once DevTools is loaded appropriately in that case.
        "main",
        i18nString2(UIStrings5.main),
        SDK2.Target.Type.BROWSER,
        null
      );
      target.setInspectedURL("Node.js");
    }, Components.TargetDetachedDialog.TargetDetachedDialog.connectionLost);
  }
};
var NodeChildTargetManager = class extends SDK2.SDKModel.SDKModel {
  #targetManager;
  #parentTarget;
  #targetAgent;
  #childTargets = /* @__PURE__ */ new Map();
  #childConnections = /* @__PURE__ */ new Map();
  constructor(parentTarget) {
    super(parentTarget);
    this.#targetManager = parentTarget.targetManager();
    this.#parentTarget = parentTarget;
    this.#targetAgent = parentTarget.targetAgent();
    parentTarget.registerTargetDispatcher(this);
    void this.#targetAgent.invoke_setDiscoverTargets({ discover: true });
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host2.InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged, this.#devicesDiscoveryConfigChanged, this);
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(false);
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(true);
  }
  #devicesDiscoveryConfigChanged({ data: config }) {
    const locations = [];
    for (const address of config.networkDiscoveryConfig) {
      const parts = address.split(":");
      const port = parseInt(parts[1], 10);
      if (parts[0] && port) {
        locations.push({ host: parts[0], port });
      }
    }
    void this.#targetAgent.invoke_setRemoteLocations({ locations });
  }
  dispose() {
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.events.removeEventListener(Host2.InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged, this.#devicesDiscoveryConfigChanged, this);
    for (const sessionId of this.#childTargets.keys()) {
      this.detachedFromTarget({ sessionId });
    }
  }
  targetCreated({ targetInfo }) {
    if (targetInfo.type === "node" && !targetInfo.attached) {
      void this.#targetAgent.invoke_attachToTarget({ targetId: targetInfo.targetId, flatten: false });
    } else if (targetInfo.type === "node_worker") {
      void this.#targetAgent.invoke_setAutoAttach({ autoAttach: true, waitForDebuggerOnStart: false });
    }
  }
  targetInfoChanged(_event) {
  }
  targetDestroyed(_event) {
  }
  attachedToTarget({ sessionId, targetInfo }) {
    let target;
    if (targetInfo.type === "node_worker") {
      target = this.#targetManager.createTarget(targetInfo.targetId, targetInfo.title, SDK2.Target.Type.NODE_WORKER, this.#parentTarget, sessionId, true, void 0, targetInfo);
    } else {
      const name = i18nString2(UIStrings5.nodejsS, { PH1: targetInfo.url });
      document.title = i18nString2(UIStrings5.NodejsTitleS, { PH1: targetInfo.url });
      const connection = new NodeConnection(this.#targetAgent, sessionId);
      this.#childConnections.set(sessionId, connection);
      target = this.#targetManager.createTarget(targetInfo.targetId, name, SDK2.Target.Type.NODE, this.#parentTarget, void 0, void 0, connection);
    }
    this.#childTargets.set(sessionId, target);
    void target.runtimeAgent().invoke_runIfWaitingForDebugger();
  }
  detachedFromTarget({ sessionId }) {
    const childTarget = this.#childTargets.get(sessionId);
    if (childTarget) {
      childTarget.dispose("target terminated");
    }
    this.#childTargets.delete(sessionId);
    this.#childConnections.delete(sessionId);
  }
  receivedMessageFromTarget({ sessionId, message }) {
    const connection = this.#childConnections.get(sessionId);
    const onMessage = connection ? connection.onMessage : null;
    if (onMessage) {
      onMessage.call(null, message);
    }
  }
  targetCrashed(_event) {
  }
};
var NodeConnection = class {
  #targetAgent;
  #sessionId;
  onMessage;
  #onDisconnect;
  constructor(targetAgent, sessionId) {
    this.#targetAgent = targetAgent;
    this.#sessionId = sessionId;
    this.onMessage = null;
    this.#onDisconnect = null;
  }
  setOnMessage(onMessage) {
    this.onMessage = onMessage;
  }
  setOnDisconnect(onDisconnect) {
    this.#onDisconnect = onDisconnect;
  }
  sendRawMessage(message) {
    void this.#targetAgent.invoke_sendMessageToTarget({ message, sessionId: this.#sessionId });
  }
  async disconnect() {
    if (this.#onDisconnect) {
      this.#onDisconnect.call(null, "force disconnect");
    }
    this.#onDisconnect = null;
    this.onMessage = null;
    await this.#targetAgent.invoke_detachFromTarget({ sessionId: this.#sessionId });
  }
};
SDK2.SDKModel.SDKModel.register(NodeChildTargetManager, { capabilities: 32, autostart: true });

// gen/front_end/entrypoints/node_app/node_app.prebundle.js
var UIStrings6 = {
  /**
   *@description Text that refers to the network connection
   */
  connection: "Connection",
  /**
   *@description A tag of Node.js Connection Panel that can be searched in the command menu
   */
  node: "node",
  /**
   *@description Command for showing the Connection tool
   */
  showConnection: "Show Connection",
  /**
   *@description Title of the 'Node' tool in the Network Navigator View, which is part of the Sources tool
   */
  networkTitle: "Node",
  /**
   *@description Command for showing the 'Node' tool in the Network Navigator View, which is part of the Sources tool
   */
  showNode: "Show Node"
};
var str_6 = i18n11.i18n.registerUIStrings("entrypoints/node_app/node_app.ts", UIStrings6);
var i18nLazyString4 = i18n11.i18n.getLazilyComputedLocalizedString.bind(void 0, str_6);
var loadedSourcesModule;
async function loadSourcesModule() {
  if (!loadedSourcesModule) {
    loadedSourcesModule = await import("./../../panels/sources/sources.js");
  }
  return loadedSourcesModule;
}
UI5.ViewManager.registerViewExtension({
  location: "panel",
  id: "node-connection",
  title: i18nLazyString4(UIStrings6.connection),
  commandPrompt: i18nLazyString4(UIStrings6.showConnection),
  order: 0,
  async loadView() {
    return new NodeConnectionsPanel();
  },
  tags: [i18nLazyString4(UIStrings6.node)]
});
UI5.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-network",
  title: i18nLazyString4(UIStrings6.networkTitle),
  commandPrompt: i18nLazyString4(UIStrings6.showNode),
  order: 2,
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.NetworkNavigatorView.instance();
  }
});
self.runtime = Root2.Runtime.Runtime.instance({ forceNew: true });
Common4.Runnable.registerEarlyInitializationRunnable(NodeMainImpl.instance);
new Main.MainImpl.MainImpl();
//# sourceMappingURL=node_app.js.map
