// gen/front_end/panels/network/network-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Extensions from "./../../models/extensions/extensions.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as NetworkForward from "./forward/forward.js";
var UIStrings = {
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
var str_ = i18n.i18n.registerUIStrings("panels/network/network-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedNetworkModule;
var isNode = Root.Runtime.Runtime.isNode();
async function loadNetworkModule() {
  if (!loadedNetworkModule) {
    loadedNetworkModule = await import("./network.js");
  }
  return loadedNetworkModule;
}
function maybeRetrieveContextTypes(getClassCallBack) {
  if (loadedNetworkModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedNetworkModule);
}
UI.ViewManager.registerViewExtension({
  location: "panel",
  id: "network",
  commandPrompt: i18nLazyString(UIStrings.showNetwork),
  title: i18nLazyString(UIStrings.network),
  order: 40,
  isPreviewFeature: isNode,
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
UI.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "network.blocked-urls",
  commandPrompt: i18nLazyString(UIStrings.showNetworkRequestBlocking),
  title: i18nLazyString(UIStrings.networkRequestBlocking),
  persistence: "closeable",
  order: 60,
  async loadView() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.BlockedURLsPane();
  }
});
UI.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "network.config",
  commandPrompt: i18nLazyString(UIStrings.showNetworkConditions),
  title: i18nLazyString(UIStrings.networkConditions),
  persistence: "closeable",
  order: 40,
  tags: [
    i18nLazyString(UIStrings.diskCache),
    i18nLazyString(UIStrings.networkThrottling),
    i18n.i18n.lockedLazyString("useragent"),
    i18n.i18n.lockedLazyString("user agent"),
    i18n.i18n.lockedLazyString("user-agent")
  ],
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkConfigView.NetworkConfigView.instance();
  }
});
UI.ViewManager.registerViewExtension({
  location: "network-sidebar",
  id: "network.search-network-tab",
  commandPrompt: i18nLazyString(UIStrings.showSearch),
  title: i18nLazyString(UIStrings.search),
  persistence: "permanent",
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.SearchNetworkView.instance();
  }
});
UI.ActionRegistration.registerActionExtension({
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
      title: i18nLazyString(UIStrings.recordNetworkLog)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.stopRecordingNetworkLog)
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
UI.ActionRegistration.registerActionExtension({
  actionId: "network.clear",
  category: "NETWORK",
  title: i18nLazyString(UIStrings.clear),
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
UI.ActionRegistration.registerActionExtension({
  actionId: "network.hide-request-details",
  category: "NETWORK",
  title: i18nLazyString(UIStrings.hideRequestDetails),
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
UI.ActionRegistration.registerActionExtension({
  actionId: "network.search",
  category: "NETWORK",
  title: i18nLazyString(UIStrings.search),
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
UI.ActionRegistration.registerActionExtension({
  actionId: "network.add-network-request-blocking-pattern",
  category: "NETWORK",
  title: i18nLazyString(UIStrings.addNetworkRequestBlockingPattern),
  iconClass: "plus",
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.BlockedURLsPane.BlockedURLsPane]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.ActionDelegate();
  }
});
UI.ActionRegistration.registerActionExtension({
  actionId: "network.remove-all-network-request-blocking-patterns",
  category: "NETWORK",
  title: i18nLazyString(UIStrings.removeAllNetworkRequestBlockingPatterns),
  iconClass: "clear",
  contextTypes() {
    return maybeRetrieveContextTypes((Network) => [Network.BlockedURLsPane.BlockedURLsPane]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.ActionDelegate();
  }
});
Common.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.allowToGenerateHarWithSensitiveData),
  settingName: "network.show-options-to-generate-har-with-sensitive-data",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18n.i18n.lockedLazyString("HAR")
  ],
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.allowToGenerateHarWithSensitiveData)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.dontAllowToGenerateHarWithSensitiveData)
    }
  ],
  learnMore: {
    url: "https://goo.gle/devtools-export-hars",
    tooltip: i18nLazyString(UIStrings.allowToGenerateHarWithSensitiveDataDocumentation)
  }
});
Common.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.colorcodeResourceTypes),
  settingName: "network-color-code-resource-types",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString(UIStrings.colorCode),
    i18nLazyString(UIStrings.resourceType)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.colorCodeByResourceType)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.useDefaultColors)
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.groupNetworkLogByFrame),
  settingName: "network.group-by-frame",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString(UIStrings.netWork),
    i18nLazyString(UIStrings.frame),
    i18nLazyString(UIStrings.group)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.groupNetworkLogItemsByFrame)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.dontGroupNetworkLogItemsByFrame)
    }
  ]
});
UI.ViewManager.registerLocationResolver({
  name: "network-sidebar",
  category: "NETWORK",
  async loadResolver() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
UI.ContextMenu.registerProvider({
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
Common.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK.NetworkRequest.NetworkRequest
    ];
  },
  destination: Common.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.UIRequestLocation.UIRequestLocation];
  },
  destination: void 0,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestLocationRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.NetworkRequestId.NetworkRequestId];
  },
  destination: Common.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestIdRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.UIFilter.UIRequestFilter, Extensions.ExtensionServer.RevealableNetworkRequestFilter];
  },
  destination: Common.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.NetworkLogWithFilterRevealer();
  }
});
//# sourceMappingURL=network-meta.js.map
