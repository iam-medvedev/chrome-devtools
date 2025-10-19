// gen/front_end/entrypoints/worker_app/worker_app.prebundle.js
import "./../shell/shell.js";

// gen/front_end/panels/browser_debugger/browser_debugger-meta.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Command for showing the 'Event Listener Breakpoints' tool
   */
  showEventListenerBreakpoints: "Show Event Listener Breakpoints",
  /**
   * @description Title of the 'Event Listener Breakpoints' tool in the bottom sidebar of the Sources tool
   */
  eventListenerBreakpoints: "Event Listener Breakpoints",
  /**
   * @description Title for showing the 'CSP Violation Breakpoints' tool in the Sources panel
   */
  showCspViolationBreakpoints: "Show CSP Violation Breakpoints",
  /**
   * @description Title of the 'CSP Violation Breakpoints' tool in the bottom sidebar of the Sources tool
   */
  cspViolationBreakpoints: "CSP Violation Breakpoints",
  /**
   * @description Command for showing the 'XHR/fetch Breakpoints' in the sources panel
   */
  showXhrfetchBreakpoints: "Show XHR/fetch Breakpoints",
  /**
   * @description Title of the 'XHR/fetch Breakpoints' tool in the bottom sidebar of the Sources tool
   */
  xhrfetchBreakpoints: "XHR/fetch Breakpoints",
  /**
   * @description Command for showing the 'DOM Breakpoints' tool in the Elements panel
   */
  showDomBreakpoints: "Show DOM Breakpoints",
  /**
   * @description Title of the 'DOM Breakpoints' tool in the bottom sidebar of the Sources tool
   */
  domBreakpoints: "DOM Breakpoints",
  /**
   * @description Command for showing the 'Global Listeners' tool in the sources panel
   */
  showGlobalListeners: "Show Global Listeners",
  /**
   * @description Title of the 'Global Listeners' tool in the bottom sidebar of the Sources tool
   */
  globalListeners: "Global Listeners",
  /**
   * @description Text that refers to one or a group of webpages
   */
  page: "Page",
  /**
   * @description Command for showing the 'Page' tab in the Sources panel
   */
  showPage: "Show Page",
  /**
   * @description Title as part of a tool to override existing configurations
   */
  overrides: "Overrides",
  /**
   * @description Command for showing the 'Overrides' tool in the Sources panel
   */
  showOverrides: "Show Overrides",
  /**
   * @description Title for a type of source files
   */
  contentScripts: "Content scripts",
  /**
   * @description Command for showing the 'Content scripts' tool in the sources panel
   */
  showContentScripts: "Show Content scripts",
  /**
   * @description Label for a button in the sources panel that refreshes the list of global event listeners.
   */
  refreshGlobalListeners: "Refresh global listeners"
};
var str_ = i18n.i18n.registerUIStrings("panels/browser_debugger/browser_debugger-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedBrowserDebuggerModule;
async function loadBrowserDebuggerModule() {
  if (!loadedBrowserDebuggerModule) {
    loadedBrowserDebuggerModule = await import("./../../panels/browser_debugger/browser_debugger.js");
  }
  return loadedBrowserDebuggerModule;
}
function maybeRetrieveContextTypes(getClassCallBack) {
  if (loadedBrowserDebuggerModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedBrowserDebuggerModule);
}
var loadedSourcesModule;
async function loadSourcesModule() {
  if (!loadedSourcesModule) {
    loadedSourcesModule = await import("./../../panels/sources/sources.js");
  }
  return loadedSourcesModule;
}
UI.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.EventListenerBreakpointsSidebarPane.EventListenerBreakpointsSidebarPane.instance();
  },
  id: "sources.event-listener-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString(UIStrings.showEventListenerBreakpoints),
  title: i18nLazyString(UIStrings.eventListenerBreakpoints),
  order: 9,
  persistence: "permanent"
});
UI.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.CSPViolationBreakpointsSidebarPane.CSPViolationBreakpointsSidebarPane();
  },
  id: "sources.csp-violation-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString(UIStrings.showCspViolationBreakpoints),
  title: i18nLazyString(UIStrings.cspViolationBreakpoints),
  order: 10,
  persistence: "permanent"
});
UI.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.XHRBreakpointsSidebarPane.XHRBreakpointsSidebarPane.instance();
  },
  id: "sources.xhr-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString(UIStrings.showXhrfetchBreakpoints),
  title: i18nLazyString(UIStrings.xhrfetchBreakpoints),
  order: 5,
  persistence: "permanent",
  hasToolbar: true
});
UI.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance();
  },
  id: "sources.dom-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString(UIStrings.showDomBreakpoints),
  title: i18nLazyString(UIStrings.domBreakpoints),
  order: 7,
  persistence: "permanent"
});
UI.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.ObjectEventListenersSidebarPane.ObjectEventListenersSidebarPane();
  },
  id: "sources.global-listeners",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString(UIStrings.showGlobalListeners),
  title: i18nLazyString(UIStrings.globalListeners),
  order: 8,
  persistence: "permanent",
  hasToolbar: true
});
UI.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance();
  },
  id: "elements.dom-breakpoints",
  location: "elements-sidebar",
  commandPrompt: i18nLazyString(UIStrings.showDomBreakpoints),
  title: i18nLazyString(UIStrings.domBreakpoints),
  order: 6,
  persistence: "permanent"
});
UI.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-network",
  title: i18nLazyString(UIStrings.page),
  commandPrompt: i18nLazyString(UIStrings.showPage),
  order: 2,
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.NetworkNavigatorView.instance();
  }
});
UI.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-overrides",
  title: i18nLazyString(UIStrings.overrides),
  commandPrompt: i18nLazyString(UIStrings.showOverrides),
  order: 4,
  persistence: "permanent",
  condition: () => !Root.Runtime.Runtime.isTraceApp(),
  async loadView() {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.OverridesNavigatorView.instance();
  }
});
UI.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-content-scripts",
  title: i18nLazyString(UIStrings.contentScripts),
  commandPrompt: i18nLazyString(UIStrings.showContentScripts),
  order: 5,
  persistence: "permanent",
  condition: () => Root.Runtime.getPathName() !== "/bundled/worker_app.html" && !Root.Runtime.Runtime.isTraceApp(),
  async loadView() {
    const Sources = await loadSourcesModule();
    return new Sources.SourcesNavigator.ContentScriptsNavigatorView();
  }
});
UI.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "browser-debugger.refresh-global-event-listeners",
  async loadActionDelegate() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.ObjectEventListenersSidebarPane.ActionDelegate();
  },
  title: i18nLazyString(UIStrings.refreshGlobalListeners),
  iconClass: "refresh",
  contextTypes() {
    return maybeRetrieveContextTypes((BrowserDebugger) => [
      BrowserDebugger.ObjectEventListenersSidebarPane.ObjectEventListenersSidebarPane
    ]);
  }
});
UI.ContextMenu.registerProvider({
  contextTypes() {
    return [
      SDK.DOMModel.DOMNode
    ];
  },
  async loadProvider() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.DOMBreakpointsSidebarPane.ContextMenuProvider();
  },
  experiment: void 0
});
UI.Context.registerListener({
  contextTypes() {
    return [SDK.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.XHRBreakpointsSidebarPane.XHRBreakpointsSidebarPane.instance();
  }
});
UI.Context.registerListener({
  contextTypes() {
    return [SDK.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance();
  }
});

// gen/front_end/panels/developer_resources/developer_resources-meta.js
import * as Common from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
var UIStrings2 = {
  /**
   * @description Title for developer resources panel
   */
  developerResources: "Developer resources",
  /**
   * @description Command for showing the developer resources panel
   */
  showDeveloperResources: "Show Developer resources"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/developer_resources/developer_resources-meta.ts", UIStrings2);
var i18nLazyString2 = i18n3.i18n.getLazilyComputedLocalizedString.bind(void 0, str_2);
var loadedDeveloperResourcesModule;
async function loadDeveloperResourcesModule() {
  if (!loadedDeveloperResourcesModule) {
    loadedDeveloperResourcesModule = await import("./../../panels/developer_resources/developer_resources.js");
  }
  return loadedDeveloperResourcesModule;
}
UI2.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "developer-resources",
  title: i18nLazyString2(UIStrings2.developerResources),
  commandPrompt: i18nLazyString2(UIStrings2.showDeveloperResources),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const DeveloperResources = await loadDeveloperResourcesModule();
    return new DeveloperResources.DeveloperResourcesView.DeveloperResourcesView();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [SDK2.PageResourceLoader.ResourceKey];
  },
  destination: Common.Revealer.RevealerDestination.DEVELOPER_RESOURCES_PANEL,
  async loadRevealer() {
    const DeveloperResources = await loadDeveloperResourcesModule();
    return new DeveloperResources.DeveloperResourcesView.DeveloperResourcesRevealer();
  }
});

// gen/front_end/panels/issues/issues-meta.js
import * as Common2 from "./../../core/common/common.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as IssuesManager from "./../../models/issues_manager/issues_manager.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
var UIStrings3 = {
  /**
   * @description Label for the issues pane
   */
  issues: "Issues",
  /**
   * @description Command for showing the 'Issues' tool
   */
  showIssues: "Show Issues"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/issues/issues-meta.ts", UIStrings3);
var i18nLazyString3 = i18n5.i18n.getLazilyComputedLocalizedString.bind(void 0, str_3);
var loadedIssuesModule;
async function loadIssuesModule() {
  if (!loadedIssuesModule) {
    loadedIssuesModule = await import("./../../panels/issues/issues.js");
  }
  return loadedIssuesModule;
}
UI3.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "issues-pane",
  title: i18nLazyString3(UIStrings3.issues),
  commandPrompt: i18nLazyString3(UIStrings3.showIssues),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const Issues = await loadIssuesModule();
    return new Issues.IssuesPane.IssuesPane();
  }
});
Common2.Revealer.registerRevealer({
  contextTypes() {
    return [
      IssuesManager.Issue.Issue
    ];
  },
  destination: Common2.Revealer.RevealerDestination.ISSUES_VIEW,
  async loadRevealer() {
    const Issues = await loadIssuesModule();
    return new Issues.IssueRevealer.IssueRevealer();
  }
});

// gen/front_end/panels/layer_viewer/layer_viewer-meta.js
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
var UIStrings4 = {
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (reset view in Layers Panel)
   */
  resetView: "Reset view",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (switch to pan in Layers Panel)
   */
  switchToPanMode: "Switch to pan mode",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (switch to rotate mode in Layers Panel)
   */
  switchToRotateMode: "Switch to rotate mode",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (zoom in)
   */
  zoomIn: "Zoom in",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (zoom out)
   */
  zoomOut: "Zoom out",
  /**
   * @description Description of a shortcut that pans or rotates the layer viewer up
   */
  panOrRotateUp: "Pan or rotate up",
  /**
   * @description Description of a shortcut that pans or rotates the layer viewer down
   */
  panOrRotateDown: "Pan or rotate down",
  /**
   * @description Description of a shortcut that pans or rotates the layer viewer left
   */
  panOrRotateLeft: "Pan or rotate left",
  /**
   * @description Description of a shortcut that pans or rotates the layer viewer right
   */
  panOrRotateRight: "Pan or rotate right"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/layer_viewer/layer_viewer-meta.ts", UIStrings4);
var i18nLazyString4 = i18n7.i18n.getLazilyComputedLocalizedString.bind(void 0, str_4);
UI4.ActionRegistration.registerActionExtension({
  actionId: "layers.reset-view",
  category: "LAYERS",
  title: i18nLazyString4(UIStrings4.resetView),
  bindings: [
    {
      shortcut: "0"
    }
  ]
});
UI4.ActionRegistration.registerActionExtension({
  actionId: "layers.pan-mode",
  category: "LAYERS",
  title: i18nLazyString4(UIStrings4.switchToPanMode),
  bindings: [
    {
      shortcut: "x"
    }
  ]
});
UI4.ActionRegistration.registerActionExtension({
  actionId: "layers.rotate-mode",
  category: "LAYERS",
  title: i18nLazyString4(UIStrings4.switchToRotateMode),
  bindings: [
    {
      shortcut: "v"
    }
  ]
});
UI4.ActionRegistration.registerActionExtension({
  actionId: "layers.zoom-in",
  category: "LAYERS",
  title: i18nLazyString4(UIStrings4.zoomIn),
  bindings: [
    {
      shortcut: "Shift+Plus"
    },
    {
      shortcut: "NumpadPlus"
    }
  ]
});
UI4.ActionRegistration.registerActionExtension({
  actionId: "layers.zoom-out",
  category: "LAYERS",
  title: i18nLazyString4(UIStrings4.zoomOut),
  bindings: [
    {
      shortcut: "Shift+Minus"
    },
    {
      shortcut: "NumpadMinus"
    }
  ]
});
UI4.ActionRegistration.registerActionExtension({
  actionId: "layers.up",
  category: "LAYERS",
  title: i18nLazyString4(UIStrings4.panOrRotateUp),
  bindings: [
    {
      shortcut: "Up"
    },
    {
      shortcut: "w"
    }
  ]
});
UI4.ActionRegistration.registerActionExtension({
  actionId: "layers.down",
  category: "LAYERS",
  title: i18nLazyString4(UIStrings4.panOrRotateDown),
  bindings: [
    {
      shortcut: "Down"
    },
    {
      shortcut: "s"
    }
  ]
});
UI4.ActionRegistration.registerActionExtension({
  actionId: "layers.left",
  category: "LAYERS",
  title: i18nLazyString4(UIStrings4.panOrRotateLeft),
  bindings: [
    {
      shortcut: "Left"
    },
    {
      shortcut: "a"
    }
  ]
});
UI4.ActionRegistration.registerActionExtension({
  actionId: "layers.right",
  category: "LAYERS",
  title: i18nLazyString4(UIStrings4.panOrRotateRight),
  bindings: [
    {
      shortcut: "Right"
    },
    {
      shortcut: "d"
    }
  ]
});

// gen/front_end/panels/mobile_throttling/mobile_throttling-meta.js
import * as Common3 from "./../../core/common/common.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as UI5 from "./../../ui/legacy/legacy.js";
var UIStrings5 = {
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
var str_5 = i18n9.i18n.registerUIStrings("panels/mobile_throttling/mobile_throttling-meta.ts", UIStrings5);
var i18nLazyString5 = i18n9.i18n.getLazilyComputedLocalizedString.bind(void 0, str_5);
var loadedMobileThrottlingModule;
async function loadMobileThrottlingModule() {
  if (!loadedMobileThrottlingModule) {
    loadedMobileThrottlingModule = await import("./../../panels/mobile_throttling/mobile_throttling.js");
  }
  return loadedMobileThrottlingModule;
}
UI5.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "throttling-conditions",
  title: i18nLazyString5(UIStrings5.throttling),
  commandPrompt: i18nLazyString5(UIStrings5.showThrottling),
  order: 35,
  async loadView() {
    const MobileThrottling2 = await loadMobileThrottlingModule();
    return new MobileThrottling2.ThrottlingSettingsTab.ThrottlingSettingsTab();
  },
  settings: [
    "custom-network-conditions",
    "calibrated-cpu-throttling"
  ],
  iconName: "performance"
});
UI5.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-offline",
  category: "NETWORK",
  title: i18nLazyString5(UIStrings5.goOffline),
  async loadActionDelegate() {
    const MobileThrottling2 = await loadMobileThrottlingModule();
    return new MobileThrottling2.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString5(UIStrings5.device),
    i18nLazyString5(UIStrings5.throttlingTag)
  ]
});
UI5.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-low-end-mobile",
  category: "NETWORK",
  title: i18nLazyString5(UIStrings5.enableSlowGThrottling),
  async loadActionDelegate() {
    const MobileThrottling2 = await loadMobileThrottlingModule();
    return new MobileThrottling2.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString5(UIStrings5.device),
    i18nLazyString5(UIStrings5.throttlingTag)
  ]
});
UI5.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-mid-tier-mobile",
  category: "NETWORK",
  title: i18nLazyString5(UIStrings5.enableFastGThrottling),
  async loadActionDelegate() {
    const MobileThrottling2 = await loadMobileThrottlingModule();
    return new MobileThrottling2.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString5(UIStrings5.device),
    i18nLazyString5(UIStrings5.throttlingTag)
  ]
});
UI5.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-online",
  category: "NETWORK",
  title: i18nLazyString5(UIStrings5.goOnline),
  async loadActionDelegate() {
    const MobileThrottling2 = await loadMobileThrottlingModule();
    return new MobileThrottling2.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString5(UIStrings5.device),
    i18nLazyString5(UIStrings5.throttlingTag)
  ]
});
Common3.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "custom-network-conditions",
  settingType: "array",
  defaultValue: []
});

// gen/front_end/panels/network/network-meta.js
import * as Common4 from "./../../core/common/common.js";
import * as i18n11 from "./../../core/i18n/i18n.js";
import * as Root2 from "./../../core/root/root.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
import * as Extensions from "./../../models/extensions/extensions.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as UI6 from "./../../ui/legacy/legacy.js";
import * as NetworkForward from "./../../panels/network/forward/forward.js";
var UIStrings6 = {
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
  showNetworkRequestBlocking: "Show Network request blocking",
  /**
   * @description Title of the 'Network request blocking' tool in the bottom drawer
   */
  networkRequestBlocking: "Network request blocking",
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
  addNetworkRequestBlockingPattern: "Add network request blocking pattern",
  /**
   * @description Title of an action in the Network request blocking panel to clear all URL patterns.
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
var str_6 = i18n11.i18n.registerUIStrings("panels/network/network-meta.ts", UIStrings6);
var i18nLazyString6 = i18n11.i18n.getLazilyComputedLocalizedString.bind(void 0, str_6);
var loadedNetworkModule;
var isNode = Root2.Runtime.Runtime.isNode();
async function loadNetworkModule() {
  if (!loadedNetworkModule) {
    loadedNetworkModule = await import("./../../panels/network/network.js");
  }
  return loadedNetworkModule;
}
function maybeRetrieveContextTypes2(getClassCallBack) {
  if (loadedNetworkModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedNetworkModule);
}
UI6.ViewManager.registerViewExtension({
  location: "panel",
  id: "network",
  commandPrompt: i18nLazyString6(UIStrings6.showNetwork),
  title: i18nLazyString6(UIStrings6.network),
  order: 40,
  isPreviewFeature: isNode,
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
UI6.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "network.blocked-urls",
  commandPrompt: i18nLazyString6(UIStrings6.showNetworkRequestBlocking),
  title: i18nLazyString6(UIStrings6.networkRequestBlocking),
  persistence: "closeable",
  order: 60,
  async loadView() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.BlockedURLsPane();
  }
});
UI6.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "network.config",
  commandPrompt: i18nLazyString6(UIStrings6.showNetworkConditions),
  title: i18nLazyString6(UIStrings6.networkConditions),
  persistence: "closeable",
  order: 40,
  tags: [
    i18nLazyString6(UIStrings6.diskCache),
    i18nLazyString6(UIStrings6.networkThrottling),
    i18n11.i18n.lockedLazyString("useragent"),
    i18n11.i18n.lockedLazyString("user agent"),
    i18n11.i18n.lockedLazyString("user-agent")
  ],
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkConfigView.NetworkConfigView.instance();
  }
});
UI6.ViewManager.registerViewExtension({
  location: "network-sidebar",
  id: "network.search-network-tab",
  commandPrompt: i18nLazyString6(UIStrings6.showSearch),
  title: i18nLazyString6(UIStrings6.search),
  persistence: "permanent",
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.SearchNetworkView.instance();
  }
});
UI6.ActionRegistration.registerActionExtension({
  actionId: "network.toggle-recording",
  category: "NETWORK",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes2((Network) => [Network.NetworkPanel.NetworkPanel]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.ActionDelegate();
  },
  options: [
    {
      value: true,
      title: i18nLazyString6(UIStrings6.recordNetworkLog)
    },
    {
      value: false,
      title: i18nLazyString6(UIStrings6.stopRecordingNetworkLog)
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
UI6.ActionRegistration.registerActionExtension({
  actionId: "network.clear",
  category: "NETWORK",
  title: i18nLazyString6(UIStrings6.clear),
  iconClass: "clear",
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Network) => [Network.NetworkPanel.NetworkPanel]);
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
UI6.ActionRegistration.registerActionExtension({
  actionId: "network.hide-request-details",
  category: "NETWORK",
  title: i18nLazyString6(UIStrings6.hideRequestDetails),
  contextTypes() {
    return maybeRetrieveContextTypes2((Network) => [Network.NetworkPanel.NetworkPanel]);
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
UI6.ActionRegistration.registerActionExtension({
  actionId: "network.search",
  category: "NETWORK",
  title: i18nLazyString6(UIStrings6.search),
  contextTypes() {
    return maybeRetrieveContextTypes2((Network) => [Network.NetworkPanel.NetworkPanel]);
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
UI6.ActionRegistration.registerActionExtension({
  actionId: "network.add-network-request-blocking-pattern",
  category: "NETWORK",
  title: i18nLazyString6(UIStrings6.addNetworkRequestBlockingPattern),
  iconClass: "plus",
  contextTypes() {
    return maybeRetrieveContextTypes2((Network) => [Network.BlockedURLsPane.BlockedURLsPane]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.ActionDelegate();
  }
});
UI6.ActionRegistration.registerActionExtension({
  actionId: "network.remove-all-network-request-blocking-patterns",
  category: "NETWORK",
  title: i18nLazyString6(UIStrings6.removeAllNetworkRequestBlockingPatterns),
  iconClass: "clear",
  contextTypes() {
    return maybeRetrieveContextTypes2((Network) => [Network.BlockedURLsPane.BlockedURLsPane]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.ActionDelegate();
  }
});
Common4.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString6(UIStrings6.allowToGenerateHarWithSensitiveData),
  settingName: "network.show-options-to-generate-har-with-sensitive-data",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18n11.i18n.lockedLazyString("HAR")
  ],
  options: [
    {
      value: true,
      title: i18nLazyString6(UIStrings6.allowToGenerateHarWithSensitiveData)
    },
    {
      value: false,
      title: i18nLazyString6(UIStrings6.dontAllowToGenerateHarWithSensitiveData)
    }
  ],
  learnMore: {
    url: "https://goo.gle/devtools-export-hars",
    tooltip: i18nLazyString6(UIStrings6.allowToGenerateHarWithSensitiveDataDocumentation)
  }
});
Common4.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString6(UIStrings6.colorcodeResourceTypes),
  settingName: "network-color-code-resource-types",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString6(UIStrings6.colorCode),
    i18nLazyString6(UIStrings6.resourceType)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString6(UIStrings6.colorCodeByResourceType)
    },
    {
      value: false,
      title: i18nLazyString6(UIStrings6.useDefaultColors)
    }
  ]
});
Common4.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString6(UIStrings6.groupNetworkLogByFrame),
  settingName: "network.group-by-frame",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString6(UIStrings6.netWork),
    i18nLazyString6(UIStrings6.frame),
    i18nLazyString6(UIStrings6.group)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString6(UIStrings6.groupNetworkLogItemsByFrame)
    },
    {
      value: false,
      title: i18nLazyString6(UIStrings6.dontGroupNetworkLogItemsByFrame)
    }
  ]
});
UI6.ViewManager.registerLocationResolver({
  name: "network-sidebar",
  category: "NETWORK",
  async loadResolver() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
UI6.ContextMenu.registerProvider({
  contextTypes() {
    return [
      SDK3.NetworkRequest.NetworkRequest,
      SDK3.Resource.Resource,
      Workspace.UISourceCode.UISourceCode,
      SDK3.TraceObject.RevealableNetworkRequest
    ];
  },
  async loadProvider() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  },
  experiment: void 0
});
Common4.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK3.NetworkRequest.NetworkRequest
    ];
  },
  destination: Common4.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestRevealer();
  }
});
Common4.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.UIRequestLocation.UIRequestLocation];
  },
  destination: void 0,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestLocationRevealer();
  }
});
Common4.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.NetworkRequestId.NetworkRequestId];
  },
  destination: Common4.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.RequestIdRevealer();
  }
});
Common4.Revealer.registerRevealer({
  contextTypes() {
    return [NetworkForward.UIFilter.UIRequestFilter, Extensions.ExtensionServer.RevealableNetworkRequestFilter];
  },
  destination: Common4.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.NetworkLogWithFilterRevealer();
  }
});

// gen/front_end/panels/application/application-meta.js
import * as Common5 from "./../../core/common/common.js";
import * as i18n13 from "./../../core/i18n/i18n.js";
import * as SDK4 from "./../../core/sdk/sdk.js";
import * as UI7 from "./../../ui/legacy/legacy.js";
import * as PreloadingHelper from "./../../panels/application/preloading/helper/helper.js";
var UIStrings7 = {
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  application: "Application",
  /**
   * @description Command for showing the 'Application' tool
   */
  showApplication: "Show Application",
  /**
   * @description A tag of Application Panel that can be searched in the command menu
   */
  pwa: "pwa",
  /**
   * @description Text of button in Clear Storage View of the Application panel
   */
  clearSiteData: "Clear site data",
  /**
   * @description Title of an action that clears all site data including 3rd party cookies
   */
  clearSiteDataIncludingThirdparty: "Clear site data (including third-party cookies)",
  /**
   * @description Title of an action under the Background Services category that can be invoked through the Command Menu
   */
  startRecordingEvents: "Start recording events",
  /**
   * @description Title of an action under the Background Services category that can be invoked through the Command Menu
   */
  stopRecordingEvents: "Stop recording events"
};
var str_7 = i18n13.i18n.registerUIStrings("panels/application/application-meta.ts", UIStrings7);
var i18nLazyString7 = i18n13.i18n.getLazilyComputedLocalizedString.bind(void 0, str_7);
var loadedResourcesModule;
async function loadResourcesModule() {
  if (!loadedResourcesModule) {
    loadedResourcesModule = await import("./../../panels/application/application.js");
  }
  return loadedResourcesModule;
}
function maybeRetrieveContextTypes3(getClassCallBack) {
  if (loadedResourcesModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedResourcesModule);
}
UI7.ViewManager.registerViewExtension({
  location: "panel",
  id: "resources",
  title: i18nLazyString7(UIStrings7.application),
  commandPrompt: i18nLazyString7(UIStrings7.showApplication),
  order: 70,
  async loadView() {
    const Resources = await loadResourcesModule();
    return Resources.ResourcesPanel.ResourcesPanel.instance();
  },
  tags: [i18nLazyString7(UIStrings7.pwa)]
});
UI7.ActionRegistration.registerActionExtension({
  category: "RESOURCES",
  actionId: "resources.clear",
  title: i18nLazyString7(UIStrings7.clearSiteData),
  async loadActionDelegate() {
    const Resources = await loadResourcesModule();
    return new Resources.StorageView.ActionDelegate();
  }
});
UI7.ActionRegistration.registerActionExtension({
  category: "RESOURCES",
  actionId: "resources.clear-incl-third-party-cookies",
  title: i18nLazyString7(UIStrings7.clearSiteDataIncludingThirdparty),
  async loadActionDelegate() {
    const Resources = await loadResourcesModule();
    return new Resources.StorageView.ActionDelegate();
  }
});
UI7.ActionRegistration.registerActionExtension({
  actionId: "background-service.toggle-recording",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes3((Resources) => [Resources.BackgroundServiceView.BackgroundServiceView]);
  },
  async loadActionDelegate() {
    const Resources = await loadResourcesModule();
    return new Resources.BackgroundServiceView.ActionDelegate();
  },
  category: "BACKGROUND_SERVICES",
  options: [
    {
      value: true,
      title: i18nLazyString7(UIStrings7.startRecordingEvents)
    },
    {
      value: false,
      title: i18nLazyString7(UIStrings7.stopRecordingEvents)
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
Common5.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK4.Resource.Resource
    ];
  },
  destination: Common5.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.ResourceRevealer();
  }
});
Common5.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK4.ResourceTreeModel.ResourceTreeFrame
    ];
  },
  destination: Common5.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.FrameDetailsRevealer();
  }
});
Common5.Revealer.registerRevealer({
  contextTypes() {
    return [PreloadingHelper.PreloadingForward.RuleSetView];
  },
  destination: Common5.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.RuleSetViewRevealer();
  }
});
Common5.Revealer.registerRevealer({
  contextTypes() {
    return [PreloadingHelper.PreloadingForward.AttemptViewWithFilter];
  },
  destination: Common5.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.AttemptViewWithFilterRevealer();
  }
});

// gen/front_end/panels/timeline/timeline-meta.js
import * as Common6 from "./../../core/common/common.js";
import * as i18n15 from "./../../core/i18n/i18n.js";
import * as SDK5 from "./../../core/sdk/sdk.js";
import * as UI8 from "./../../ui/legacy/legacy.js";
var UIStrings8 = {
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
var str_8 = i18n15.i18n.registerUIStrings("panels/timeline/timeline-meta.ts", UIStrings8);
var i18nLazyString8 = i18n15.i18n.getLazilyComputedLocalizedString.bind(void 0, str_8);
var loadedTimelineModule;
async function loadTimelineModule() {
  if (!loadedTimelineModule) {
    loadedTimelineModule = await import("./../../panels/timeline/timeline.js");
  }
  return loadedTimelineModule;
}
function maybeRetrieveContextTypes4(getClassCallBack) {
  if (loadedTimelineModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedTimelineModule);
}
UI8.ViewManager.registerViewExtension({
  location: "panel",
  id: "timeline",
  title: i18nLazyString8(UIStrings8.performance),
  commandPrompt: i18nLazyString8(UIStrings8.showPerformance),
  order: 50,
  async loadView() {
    const Timeline = await loadTimelineModule();
    return Timeline.TimelinePanel.TimelinePanel.instance();
  }
});
UI8.ActionRegistration.registerActionExtension({
  actionId: "timeline.toggle-recording",
  category: "PERFORMANCE",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.record)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.stop)
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "timeline.record-reload",
  iconClass: "refresh",
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  category: "PERFORMANCE",
  title: i18nLazyString8(UIStrings8.recordAndReload),
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
UI8.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.save-to-file",
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.saveProfile),
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
UI8.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.load-from-file",
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.loadProfile),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-previous-frame",
  category: "PERFORMANCE",
  title: i18nLazyString8(UIStrings8.previousFrame),
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-next-frame",
  category: "PERFORMANCE",
  title: i18nLazyString8(UIStrings8.nextFrame),
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "timeline.show-history",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  category: "PERFORMANCE",
  title: i18nLazyString8(UIStrings8.showRecentTimelineSessions),
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "timeline.previous-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.previousRecording),
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "timeline.next-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.nextRecording),
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
Common6.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.hideChromeFrameInLayersView),
  settingName: "frame-viewer-hide-chrome-window",
  settingType: "boolean",
  defaultValue: false
});
Common6.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  settingName: "annotations-hidden",
  settingType: "boolean",
  defaultValue: false
});
Common6.Linkifier.registerLinkifier({
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.CLSLinkifier.CLSRect]);
  },
  async loadLinkifier() {
    const Timeline = await loadTimelineModule();
    return Timeline.CLSLinkifier.Linkifier.instance();
  }
});
UI8.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.load-from-file",
  order: 10
});
UI8.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.save-to-file",
  order: 15
});
Common6.Revealer.registerRevealer({
  contextTypes() {
    return [SDK5.TraceObject.TraceObject];
  },
  destination: Common6.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.TraceRevealer();
  }
});
Common6.Revealer.registerRevealer({
  contextTypes() {
    return [SDK5.TraceObject.RevealableEvent];
  },
  destination: Common6.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.EventRevealer();
  }
});
Common6.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes4((Timeline) => [Timeline.Utils.Helpers.RevealableInsight]);
  },
  destination: Common6.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.InsightRevealer();
  }
});

// gen/front_end/entrypoints/worker_app/WorkerMain.js
import * as Common7 from "./../../core/common/common.js";
import * as i18n17 from "./../../core/i18n/i18n.js";
import * as SDK6 from "./../../core/sdk/sdk.js";
import * as MobileThrottling from "./../../panels/mobile_throttling/mobile_throttling.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
var UIStrings9 = {
  /**
   * @description Text that refers to the main target.
   */
  main: "Main"
};
var str_9 = i18n17.i18n.registerUIStrings("entrypoints/worker_app/WorkerMain.ts", UIStrings9);
var i18nString = i18n17.i18n.getLocalizedString.bind(void 0, str_9);
var workerMainImplInstance;
var WorkerMainImpl = class _WorkerMainImpl {
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!workerMainImplInstance || forceNew) {
      workerMainImplInstance = new _WorkerMainImpl();
    }
    return workerMainImplInstance;
  }
  async run() {
    void SDK6.Connections.initMainConnection(async () => {
      if (await SDK6.TargetManager.TargetManager.instance().maybeAttachInitialTarget()) {
        return;
      }
      SDK6.TargetManager.TargetManager.instance().createTarget("main", i18nString(UIStrings9.main), SDK6.Target.Type.ServiceWorker, null);
    }, Components.TargetDetachedDialog.TargetDetachedDialog.connectionLost);
    new MobileThrottling.NetworkPanelIndicator.NetworkPanelIndicator();
  }
};
Common7.Runnable.registerEarlyInitializationRunnable(WorkerMainImpl.instance);
SDK6.ChildTargetManager.ChildTargetManager.install(async ({ target, waitingForDebugger }) => {
  if (target.parentTarget() || target.type() !== SDK6.Target.Type.ServiceWorker || !waitingForDebugger) {
    return;
  }
  const debuggerModel = target.model(SDK6.DebuggerModel.DebuggerModel);
  if (!debuggerModel) {
    return;
  }
  if (!debuggerModel.isReadyToPause()) {
    await debuggerModel.once(SDK6.DebuggerModel.Events.DebuggerIsReadyToPause);
  }
  debuggerModel.pause();
});

// gen/front_end/entrypoints/worker_app/worker_app.prebundle.js
import * as Root3 from "./../../core/root/root.js";
import * as Main from "./../main/main.js";
self.runtime = Root3.Runtime.Runtime.instance({ forceNew: true });
new Main.MainImpl.MainImpl();
//# sourceMappingURL=worker_app.js.map
