// gen/front_end/entrypoints/devtools_app/devtools_app.prebundle.js
import "./../shell/shell.js";

// gen/front_end/panels/css_overview/css_overview-meta.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Title of the CSS overview panel
   */
  cssOverview: "CSS overview",
  /**
   * @description Title of the CSS overview panel
   */
  showCssOverview: "Show CSS overview"
};
var str_ = i18n.i18n.registerUIStrings("panels/css_overview/css_overview-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedCSSOverviewModule;
async function loadCSSOverviewModule() {
  if (!loadedCSSOverviewModule) {
    loadedCSSOverviewModule = await import("./../../panels/css_overview/css_overview.js");
  }
  return loadedCSSOverviewModule;
}
UI.ViewManager.registerViewExtension({
  location: "panel",
  id: "cssoverview",
  commandPrompt: i18nLazyString(UIStrings.showCssOverview),
  title: i18nLazyString(UIStrings.cssOverview),
  order: 95,
  persistence: "closeable",
  async loadView() {
    const CSSOverview = await loadCSSOverviewModule();
    return new CSSOverview.CSSOverviewPanel.CSSOverviewPanel();
  },
  isPreviewFeature: true
});

// gen/front_end/panels/elements/elements-meta.js
import * as Common from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
var UIStrings2 = {
  /**
   * @description Command for showing the 'Elements' panel. Elements refers to HTML elements.
   */
  showElements: "Show Elements",
  /**
   * @description Title of the Elements Panel. Elements refers to HTML elements.
   */
  elements: "Elements",
  /**
   * @description Command for showing the 'Event Listeners' tool. Refers to DOM Event listeners.
   */
  showEventListeners: "Show Event Listeners",
  /**
   * @description Title of the 'Event Listeners' tool in the sidebar of the elements panel. Refers to
   * DOM Event listeners.
   */
  eventListeners: "Event Listeners",
  /**
   * @description Command for showing the 'Properties' tool. Refers to HTML properties.
   */
  showProperties: "Show Properties",
  /**
   * @description Title of the 'Properties' tool in the sidebar of the elements tool. Refers to HTML
   * properties.
   */
  properties: "Properties",
  /**
   * @description Command for showing the 'Stack Trace' tool. Stack trace refers to the location in
   * the code where the program was at a point in time.
   */
  showStackTrace: "Show Stack Trace",
  /**
   * @description Text for the execution stack trace tool, which shows the stack trace from when this
   * HTML element was created. Stack trace refers to the location in the code where the program was
   * at a point in time.
   */
  stackTrace: "Stack Trace",
  /**
   * @description Command for showing the 'Layout' tool
   */
  showLayout: "Show Layout",
  /**
   * @description The title of the 'Layout' tool in the sidebar of the elements panel.
   */
  layout: "Layout",
  /**
   * @description Command to hide a HTML element in the Elements tree.
   */
  hideElement: "Hide element",
  /**
   * @description A context menu item (command) in the Elements panel that allows the user to edit the
   * currently selected node as raw HTML text.
   */
  editAsHtml: "Edit as HTML",
  /**
   * @description A context menu item (command) in the Elements panel that creates an exact copy of
   * this HTML element.
   */
  duplicateElement: "Duplicate element",
  /**
   * @description A command in the Elements panel to undo the last action the user took.
   */
  undo: "Undo",
  /**
   * @description A command in the Elements panel to redo the last action the user took (undo an
   * undo).
   */
  redo: "Redo",
  /**
   * @description A command in the Elements panel to capture a screenshot of the selected area.
   */
  captureAreaScreenshot: "Capture area screenshot",
  /**
   * @description Title/tooltip of an action in the elements panel to toggle element search on/off.
   */
  selectAnElementInThePageTo: "Select an element in the page to inspect it",
  /**
   * @description Title/tooltip of an action in the elements panel to add a new style rule.
   */
  newStyleRule: "New Style Rule",
  /**
   * @description Title/tooltip of an action in the elements panel to refresh the event listeners.
   */
  refreshEventListeners: "Refresh event listeners",
  /**
   * @description Title of a setting under the Elements category in Settings. If
   *              this option is on, the Elements panel will automatically wrap
   *              long lines in the DOM tree and try to avoid showing a horizontal
   *              scrollbar if possible.
   */
  wordWrap: "Word wrap",
  /**
   * @description Title of an action in the Elements panel that toggles the 'Word
   *              wrap' setting.
   */
  toggleWordWrap: "Toggle word wrap",
  /**
   * @description Title of a setting under the Elements category. Whether to show/hide code comments in HTML.
   */
  showHtmlComments: "Show `HTML` comments",
  /**
   * @description Title of a setting under the Elements category. Whether to show/hide code comments in HTML.
   */
  hideHtmlComments: "Hide `HTML` comments",
  /**
   * @description Title of a setting under the Elements category in Settings. Whether the position of
   * the DOM node on the actual website should be highlighted/revealed to the user when they hover
   * over the corresponding node in the DOM tree in DevTools.
   */
  revealDomNodeOnHover: "Reveal `DOM` node on hover",
  /**
   * @description Title of a setting under the Elements category in Settings. Turns on a mode where
   * the inspect tooltip (an information pane that hovers next to selected DOM elements) has extra
   * detail.
   */
  showDetailedInspectTooltip: "Show detailed inspect tooltip",
  /**
   * @description Title of a setting under the Elements category in Settings. Turns on a mode where
   * hovering over CSS properties in the Styles pane will display a popover with documentation.
   */
  showCSSDocumentationTooltip: "Show CSS documentation tooltip",
  /**
   * @description A context menu item (command) in the Elements panel that copy the styles of
   * the HTML element.
   */
  copyStyles: "Copy styles",
  /**
   * @description A context menu item (command) in the Elements panel that toggles the view between
   * the element and a11y trees.
   */
  toggleA11yTree: "Toggle accessibility tree",
  /**
   * @description Title of a setting under the Elements category. Whether to show/hide hide
   * the shadow DOM nodes of HTML elements that are built into the browser (e.g. the <input> element).
   */
  showUserAgentShadowDOM: "Show user agent shadow `DOM`",
  /**
   * @description Command for showing the 'Computed' tool. Displays computed CSS styles in Elements sidebar.
   */
  showComputedStyles: "Show Computed Styles",
  /**
   * @description Command for showing the 'Styles' tool. Displays CSS styles in Elements sidebar.
   */
  showStyles: "Show Styles",
  /**
   * @description Command for toggling the eye dropper when the color picker is open
   */
  toggleEyeDropper: "Toggle eye dropper"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/elements/elements-meta.ts", UIStrings2);
var i18nLazyString2 = i18n3.i18n.getLazilyComputedLocalizedString.bind(void 0, str_2);
var loadedElementsModule;
async function loadElementsModule() {
  if (!loadedElementsModule) {
    loadedElementsModule = await import("./../../panels/elements/elements.js");
  }
  return loadedElementsModule;
}
function maybeRetrieveContextTypes(getClassCallBack) {
  if (loadedElementsModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedElementsModule);
}
UI2.ViewManager.registerViewExtension({
  location: "panel",
  id: "elements",
  commandPrompt: i18nLazyString2(UIStrings2.showElements),
  title: i18nLazyString2(UIStrings2.elements),
  order: 10,
  persistence: "permanent",
  hasToolbar: false,
  async loadView() {
    const Elements = await loadElementsModule();
    return Elements.ElementsPanel.ElementsPanel.instance();
  }
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.show-styles",
  category: "ELEMENTS",
  title: i18nLazyString2(UIStrings2.showStyles),
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  }
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.show-computed",
  category: "ELEMENTS",
  title: i18nLazyString2(UIStrings2.showComputedStyles),
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  }
});
UI2.ViewManager.registerViewExtension({
  location: "elements-sidebar",
  id: "elements.event-listeners",
  commandPrompt: i18nLazyString2(UIStrings2.showEventListeners),
  title: i18nLazyString2(UIStrings2.eventListeners),
  order: 5,
  persistence: "permanent",
  async loadView() {
    const Elements = await loadElementsModule();
    return Elements.EventListenersWidget.EventListenersWidget.instance();
  }
});
UI2.ViewManager.registerViewExtension({
  location: "elements-sidebar",
  id: "elements.dom-properties",
  commandPrompt: i18nLazyString2(UIStrings2.showProperties),
  title: i18nLazyString2(UIStrings2.properties),
  order: 7,
  persistence: "permanent",
  async loadView() {
    const Elements = await loadElementsModule();
    return new Elements.PropertiesWidget.PropertiesWidget();
  }
});
UI2.ViewManager.registerViewExtension({
  experiment: "capture-node-creation-stacks",
  location: "elements-sidebar",
  id: "elements.dom-creation",
  commandPrompt: i18nLazyString2(UIStrings2.showStackTrace),
  title: i18nLazyString2(UIStrings2.stackTrace),
  order: 10,
  persistence: "permanent",
  async loadView() {
    const Elements = await loadElementsModule();
    return new Elements.NodeStackTraceWidget.NodeStackTraceWidget();
  }
});
UI2.ViewManager.registerViewExtension({
  location: "elements-sidebar",
  id: "elements.layout",
  commandPrompt: i18nLazyString2(UIStrings2.showLayout),
  title: i18nLazyString2(UIStrings2.layout),
  order: 4,
  persistence: "permanent",
  async loadView() {
    const Elements = await loadElementsModule();
    return Elements.LayoutPane.LayoutPane.instance();
  }
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.hide-element",
  category: "ELEMENTS",
  title: i18nLazyString2(UIStrings2.hideElement),
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.ElementsPanel.ElementsPanel]);
  },
  bindings: [
    {
      shortcut: "H"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.toggle-eye-dropper",
  category: "ELEMENTS",
  title: i18nLazyString2(UIStrings2.toggleEyeDropper),
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.ColorSwatchPopoverIcon.ColorSwatchPopoverIcon]);
  },
  bindings: [
    {
      shortcut: "c"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.edit-as-html",
  category: "ELEMENTS",
  title: i18nLazyString2(UIStrings2.editAsHtml),
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.ElementsPanel.ElementsPanel]);
  },
  bindings: [
    {
      shortcut: "F2"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.duplicate-element",
  category: "ELEMENTS",
  title: i18nLazyString2(UIStrings2.duplicateElement),
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.ElementsPanel.ElementsPanel]);
  },
  bindings: [
    {
      shortcut: "Shift+Alt+Down"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.copy-styles",
  category: "ELEMENTS",
  title: i18nLazyString2(UIStrings2.copyStyles),
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.ElementsPanel.ElementsPanel]);
  },
  bindings: [
    {
      shortcut: "Ctrl+Alt+C",
      platform: "windows,linux"
    },
    {
      shortcut: "Meta+Alt+C",
      platform: "mac"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.toggle-a11y-tree",
  category: "ELEMENTS",
  title: i18nLazyString2(UIStrings2.toggleA11yTree),
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.ElementsPanel.ElementsPanel]);
  },
  bindings: [
    {
      shortcut: "A"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.undo",
  category: "ELEMENTS",
  title: i18nLazyString2(UIStrings2.undo),
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.ElementsPanel.ElementsPanel]);
  },
  bindings: [
    {
      shortcut: "Ctrl+Z",
      platform: "windows,linux"
    },
    {
      shortcut: "Meta+Z",
      platform: "mac"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.redo",
  category: "ELEMENTS",
  title: i18nLazyString2(UIStrings2.redo),
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.ElementsPanel.ElementsPanel]);
  },
  bindings: [
    {
      shortcut: "Ctrl+Y",
      platform: "windows,linux"
    },
    {
      shortcut: "Meta+Shift+Z",
      platform: "mac"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "elements.capture-area-screenshot",
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.InspectElementModeController.ToggleSearchActionDelegate();
  },
  condition: Root.Runtime.conditions.canDock,
  title: i18nLazyString2(UIStrings2.captureAreaScreenshot),
  category: "SCREENSHOT"
});
UI2.ActionRegistration.registerActionExtension({
  category: "ELEMENTS",
  actionId: "elements.toggle-element-search",
  toggleable: true,
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.InspectElementModeController.ToggleSearchActionDelegate();
  },
  title: i18nLazyString2(UIStrings2.selectAnElementInThePageTo),
  iconClass: "select-element",
  bindings: [
    {
      shortcut: "Ctrl+Shift+C",
      platform: "windows,linux"
    },
    {
      shortcut: "Meta+Shift+C",
      platform: "mac"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  category: "ELEMENTS",
  actionId: "elements.new-style-rule",
  title: i18nLazyString2(UIStrings2.newStyleRule),
  iconClass: "plus",
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.StylesSidebarPane.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.StylesSidebarPane.StylesSidebarPane]);
  }
});
UI2.ActionRegistration.registerActionExtension({
  category: "ELEMENTS",
  actionId: "elements.refresh-event-listeners",
  title: i18nLazyString2(UIStrings2.refreshEventListeners),
  iconClass: "refresh",
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.EventListenersWidget.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.EventListenersWidget.EventListenersWidget]);
  }
});
Common.Settings.registerSettingExtension({
  category: "ELEMENTS",
  storageType: "Synced",
  order: 1,
  title: i18nLazyString2(UIStrings2.showUserAgentShadowDOM),
  settingName: "show-ua-shadow-dom",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "ELEMENTS",
  storageType: "Synced",
  order: 2,
  title: i18nLazyString2(UIStrings2.wordWrap),
  settingName: "dom-word-wrap",
  settingType: "boolean",
  defaultValue: true
});
UI2.ActionRegistration.registerActionExtension({
  category: "ELEMENTS",
  actionId: "elements.toggle-word-wrap",
  async loadActionDelegate() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ElementsActionDelegate();
  },
  title: i18nLazyString2(UIStrings2.toggleWordWrap),
  contextTypes() {
    return maybeRetrieveContextTypes((Elements) => [Elements.ElementsPanel.ElementsPanel]);
  },
  bindings: [
    {
      shortcut: "Alt+Z",
      keybindSets: [
        "vsCode"
        /* UI.ActionRegistration.KeybindSet.VS_CODE */
      ]
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "ELEMENTS",
  storageType: "Synced",
  order: 3,
  title: i18nLazyString2(UIStrings2.showHtmlComments),
  settingName: "show-html-comments",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.showHtmlComments)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.hideHtmlComments)
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "ELEMENTS",
  storageType: "Synced",
  order: 4,
  title: i18nLazyString2(UIStrings2.revealDomNodeOnHover),
  settingName: "highlight-node-on-hover-in-overlay",
  settingType: "boolean",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  category: "ELEMENTS",
  storageType: "Synced",
  order: 5,
  title: i18nLazyString2(UIStrings2.showDetailedInspectTooltip),
  settingName: "show-detailed-inspect-tooltip",
  settingType: "boolean",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  settingName: "show-event-listeners-for-ancestors",
  settingType: "boolean",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  category: "ADORNER",
  storageType: "Synced",
  settingName: "adorner-settings",
  settingType: "array",
  defaultValue: []
});
Common.Settings.registerSettingExtension({
  category: "ELEMENTS",
  storageType: "Synced",
  title: i18nLazyString2(UIStrings2.showCSSDocumentationTooltip),
  settingName: "show-css-property-documentation-on-hover",
  settingType: "boolean",
  defaultValue: true
});
UI2.ContextMenu.registerProvider({
  contextTypes() {
    return [
      SDK.RemoteObject.RemoteObject,
      SDK.DOMModel.DOMNode,
      SDK.DOMModel.DeferredDOMNode
    ];
  },
  async loadProvider() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.ContextMenuProvider();
  },
  experiment: void 0
});
UI2.ViewManager.registerLocationResolver({
  name: "elements-sidebar",
  category: "ELEMENTS",
  async loadResolver() {
    const Elements = await loadElementsModule();
    return Elements.ElementsPanel.ElementsPanel.instance();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK.DOMModel.DOMNode,
      SDK.DOMModel.DeferredDOMNode,
      SDK.RemoteObject.RemoteObject
    ];
  },
  destination: Common.Revealer.RevealerDestination.ELEMENTS_PANEL,
  async loadRevealer() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.DOMNodeRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK.CSSProperty.CSSProperty
    ];
  },
  destination: Common.Revealer.RevealerDestination.STYLES_SIDEBAR,
  async loadRevealer() {
    const Elements = await loadElementsModule();
    return new Elements.ElementsPanel.CSSPropertyRevealer();
  }
});
UI2.Toolbar.registerToolbarItem({
  async loadItem() {
    const Elements = await loadElementsModule();
    return Elements.LayersWidget.ButtonProvider.instance();
  },
  order: 1,
  location: "styles-sidebarpane-toolbar"
});
UI2.Toolbar.registerToolbarItem({
  async loadItem() {
    const Elements = await loadElementsModule();
    return Elements.ElementStatePaneWidget.ButtonProvider.instance();
  },
  order: 2,
  location: "styles-sidebarpane-toolbar"
});
UI2.Toolbar.registerToolbarItem({
  async loadItem() {
    const Elements = await loadElementsModule();
    return Elements.ClassesPaneWidget.ButtonProvider.instance();
  },
  order: 3,
  location: "styles-sidebarpane-toolbar"
});
UI2.Toolbar.registerToolbarItem({
  async loadItem() {
    const Elements = await loadElementsModule();
    return Elements.StylesSidebarPane.ButtonProvider.instance();
  },
  order: 100,
  location: "styles-sidebarpane-toolbar"
});
UI2.Toolbar.registerToolbarItem({
  actionId: "elements.toggle-element-search",
  location: "main-toolbar-left",
  order: 0
});
UI2.UIUtils.registerRenderer({
  contextTypes() {
    return [SDK.DOMModel.DOMNode, SDK.DOMModel.DeferredDOMNode];
  },
  async loadRenderer() {
    const Elements = await loadElementsModule();
    return Elements.ElementsTreeOutlineRenderer.Renderer.instance();
  }
});
Common.Linkifier.registerLinkifier({
  contextTypes() {
    return [
      SDK.DOMModel.DOMNode,
      SDK.DOMModel.DeferredDOMNode
    ];
  },
  async loadLinkifier() {
    const Elements = await loadElementsModule();
    return Elements.DOMLinkifier.Linkifier.instance();
  }
});

// gen/front_end/panels/browser_debugger/browser_debugger-meta.js
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as Root2 from "./../../core/root/root.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
var UIStrings3 = {
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
var str_3 = i18n5.i18n.registerUIStrings("panels/browser_debugger/browser_debugger-meta.ts", UIStrings3);
var i18nLazyString3 = i18n5.i18n.getLazilyComputedLocalizedString.bind(void 0, str_3);
var loadedBrowserDebuggerModule;
async function loadBrowserDebuggerModule() {
  if (!loadedBrowserDebuggerModule) {
    loadedBrowserDebuggerModule = await import("./../../panels/browser_debugger/browser_debugger.js");
  }
  return loadedBrowserDebuggerModule;
}
function maybeRetrieveContextTypes2(getClassCallBack) {
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
UI3.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.EventListenerBreakpointsSidebarPane.EventListenerBreakpointsSidebarPane.instance();
  },
  id: "sources.event-listener-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString3(UIStrings3.showEventListenerBreakpoints),
  title: i18nLazyString3(UIStrings3.eventListenerBreakpoints),
  order: 9,
  persistence: "permanent"
});
UI3.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.CSPViolationBreakpointsSidebarPane.CSPViolationBreakpointsSidebarPane();
  },
  id: "sources.csp-violation-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString3(UIStrings3.showCspViolationBreakpoints),
  title: i18nLazyString3(UIStrings3.cspViolationBreakpoints),
  order: 10,
  persistence: "permanent"
});
UI3.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.XHRBreakpointsSidebarPane.XHRBreakpointsSidebarPane.instance();
  },
  id: "sources.xhr-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString3(UIStrings3.showXhrfetchBreakpoints),
  title: i18nLazyString3(UIStrings3.xhrfetchBreakpoints),
  order: 5,
  persistence: "permanent",
  hasToolbar: true
});
UI3.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance();
  },
  id: "sources.dom-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString3(UIStrings3.showDomBreakpoints),
  title: i18nLazyString3(UIStrings3.domBreakpoints),
  order: 7,
  persistence: "permanent"
});
UI3.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.ObjectEventListenersSidebarPane.ObjectEventListenersSidebarPane();
  },
  id: "sources.global-listeners",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString3(UIStrings3.showGlobalListeners),
  title: i18nLazyString3(UIStrings3.globalListeners),
  order: 8,
  persistence: "permanent",
  hasToolbar: true
});
UI3.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance();
  },
  id: "elements.dom-breakpoints",
  location: "elements-sidebar",
  commandPrompt: i18nLazyString3(UIStrings3.showDomBreakpoints),
  title: i18nLazyString3(UIStrings3.domBreakpoints),
  order: 6,
  persistence: "permanent"
});
UI3.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-network",
  title: i18nLazyString3(UIStrings3.page),
  commandPrompt: i18nLazyString3(UIStrings3.showPage),
  order: 2,
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.NetworkNavigatorView.instance();
  }
});
UI3.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-overrides",
  title: i18nLazyString3(UIStrings3.overrides),
  commandPrompt: i18nLazyString3(UIStrings3.showOverrides),
  order: 4,
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.OverridesNavigatorView.instance();
  }
});
UI3.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-content-scripts",
  title: i18nLazyString3(UIStrings3.contentScripts),
  commandPrompt: i18nLazyString3(UIStrings3.showContentScripts),
  order: 5,
  persistence: "permanent",
  condition: () => Root2.Runtime.getPathName() !== "/bundled/worker_app.html",
  async loadView() {
    const Sources = await loadSourcesModule();
    return new Sources.SourcesNavigator.ContentScriptsNavigatorView();
  }
});
UI3.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "browser-debugger.refresh-global-event-listeners",
  async loadActionDelegate() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.ObjectEventListenersSidebarPane.ActionDelegate();
  },
  title: i18nLazyString3(UIStrings3.refreshGlobalListeners),
  iconClass: "refresh",
  contextTypes() {
    return maybeRetrieveContextTypes2((BrowserDebugger) => [
      BrowserDebugger.ObjectEventListenersSidebarPane.ObjectEventListenersSidebarPane
    ]);
  }
});
UI3.ContextMenu.registerProvider({
  contextTypes() {
    return [
      SDK2.DOMModel.DOMNode
    ];
  },
  async loadProvider() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.DOMBreakpointsSidebarPane.ContextMenuProvider();
  },
  experiment: void 0
});
UI3.Context.registerListener({
  contextTypes() {
    return [SDK2.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.XHRBreakpointsSidebarPane.XHRBreakpointsSidebarPane.instance();
  }
});
UI3.Context.registerListener({
  contextTypes() {
    return [SDK2.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance();
  }
});

// gen/front_end/panels/network/network-meta.js
import * as Common2 from "./../../core/common/common.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as Root3 from "./../../core/root/root.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
import * as Extensions from "./../../models/extensions/extensions.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
import * as NetworkForward from "./../../panels/network/forward/forward.js";
var UIStrings4 = {
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
var str_4 = i18n7.i18n.registerUIStrings("panels/network/network-meta.ts", UIStrings4);
var i18nLazyString4 = i18n7.i18n.getLazilyComputedLocalizedString.bind(void 0, str_4);
var loadedNetworkModule;
var isNode = Root3.Runtime.Runtime.isNode();
async function loadNetworkModule() {
  if (!loadedNetworkModule) {
    loadedNetworkModule = await import("./../../panels/network/network.js");
  }
  return loadedNetworkModule;
}
function maybeRetrieveContextTypes3(getClassCallBack) {
  if (loadedNetworkModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedNetworkModule);
}
UI4.ViewManager.registerViewExtension({
  location: "panel",
  id: "network",
  commandPrompt: i18nLazyString4(UIStrings4.showNetwork),
  title: i18nLazyString4(UIStrings4.network),
  order: 40,
  isPreviewFeature: isNode,
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
UI4.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "network.blocked-urls",
  commandPrompt: i18nLazyString4(UIStrings4.showNetworkRequestBlocking),
  title: i18nLazyString4(UIStrings4.networkRequestBlocking),
  persistence: "closeable",
  order: 60,
  async loadView() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.BlockedURLsPane();
  }
});
UI4.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "network.config",
  commandPrompt: i18nLazyString4(UIStrings4.showNetworkConditions),
  title: i18nLazyString4(UIStrings4.networkConditions),
  persistence: "closeable",
  order: 40,
  tags: [
    i18nLazyString4(UIStrings4.diskCache),
    i18nLazyString4(UIStrings4.networkThrottling),
    i18n7.i18n.lockedLazyString("useragent"),
    i18n7.i18n.lockedLazyString("user agent"),
    i18n7.i18n.lockedLazyString("user-agent")
  ],
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkConfigView.NetworkConfigView.instance();
  }
});
UI4.ViewManager.registerViewExtension({
  location: "network-sidebar",
  id: "network.search-network-tab",
  commandPrompt: i18nLazyString4(UIStrings4.showSearch),
  title: i18nLazyString4(UIStrings4.search),
  persistence: "permanent",
  async loadView() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.SearchNetworkView.instance();
  }
});
UI4.ActionRegistration.registerActionExtension({
  actionId: "network.toggle-recording",
  category: "NETWORK",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes3((Network) => [Network.NetworkPanel.NetworkPanel]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.ActionDelegate();
  },
  options: [
    {
      value: true,
      title: i18nLazyString4(UIStrings4.recordNetworkLog)
    },
    {
      value: false,
      title: i18nLazyString4(UIStrings4.stopRecordingNetworkLog)
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
UI4.ActionRegistration.registerActionExtension({
  actionId: "network.clear",
  category: "NETWORK",
  title: i18nLazyString4(UIStrings4.clear),
  iconClass: "clear",
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes3((Network) => [Network.NetworkPanel.NetworkPanel]);
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
UI4.ActionRegistration.registerActionExtension({
  actionId: "network.hide-request-details",
  category: "NETWORK",
  title: i18nLazyString4(UIStrings4.hideRequestDetails),
  contextTypes() {
    return maybeRetrieveContextTypes3((Network) => [Network.NetworkPanel.NetworkPanel]);
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
UI4.ActionRegistration.registerActionExtension({
  actionId: "network.search",
  category: "NETWORK",
  title: i18nLazyString4(UIStrings4.search),
  contextTypes() {
    return maybeRetrieveContextTypes3((Network) => [Network.NetworkPanel.NetworkPanel]);
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
UI4.ActionRegistration.registerActionExtension({
  actionId: "network.add-network-request-blocking-pattern",
  category: "NETWORK",
  title: i18nLazyString4(UIStrings4.addNetworkRequestBlockingPattern),
  iconClass: "plus",
  contextTypes() {
    return maybeRetrieveContextTypes3((Network) => [Network.BlockedURLsPane.BlockedURLsPane]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.ActionDelegate();
  }
});
UI4.ActionRegistration.registerActionExtension({
  actionId: "network.remove-all-network-request-blocking-patterns",
  category: "NETWORK",
  title: i18nLazyString4(UIStrings4.removeAllNetworkRequestBlockingPatterns),
  iconClass: "clear",
  contextTypes() {
    return maybeRetrieveContextTypes3((Network) => [Network.BlockedURLsPane.BlockedURLsPane]);
  },
  async loadActionDelegate() {
    const Network = await loadNetworkModule();
    return new Network.BlockedURLsPane.ActionDelegate();
  }
});
Common2.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString4(UIStrings4.allowToGenerateHarWithSensitiveData),
  settingName: "network.show-options-to-generate-har-with-sensitive-data",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18n7.i18n.lockedLazyString("HAR")
  ],
  options: [
    {
      value: true,
      title: i18nLazyString4(UIStrings4.allowToGenerateHarWithSensitiveData)
    },
    {
      value: false,
      title: i18nLazyString4(UIStrings4.dontAllowToGenerateHarWithSensitiveData)
    }
  ],
  learnMore: {
    url: "https://goo.gle/devtools-export-hars",
    tooltip: i18nLazyString4(UIStrings4.allowToGenerateHarWithSensitiveDataDocumentation)
  }
});
Common2.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString4(UIStrings4.colorcodeResourceTypes),
  settingName: "network-color-code-resource-types",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString4(UIStrings4.colorCode),
    i18nLazyString4(UIStrings4.resourceType)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString4(UIStrings4.colorCodeByResourceType)
    },
    {
      value: false,
      title: i18nLazyString4(UIStrings4.useDefaultColors)
    }
  ]
});
Common2.Settings.registerSettingExtension({
  category: "NETWORK",
  storageType: "Synced",
  title: i18nLazyString4(UIStrings4.groupNetworkLogByFrame),
  settingName: "network.group-by-frame",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString4(UIStrings4.netWork),
    i18nLazyString4(UIStrings4.frame),
    i18nLazyString4(UIStrings4.group)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString4(UIStrings4.groupNetworkLogItemsByFrame)
    },
    {
      value: false,
      title: i18nLazyString4(UIStrings4.dontGroupNetworkLogItemsByFrame)
    }
  ]
});
UI4.ViewManager.registerLocationResolver({
  name: "network-sidebar",
  category: "NETWORK",
  async loadResolver() {
    const Network = await loadNetworkModule();
    return Network.NetworkPanel.NetworkPanel.instance();
  }
});
UI4.ContextMenu.registerProvider({
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
Common2.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK3.NetworkRequest.NetworkRequest
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
  destination: void 0,
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
    return [NetworkForward.UIFilter.UIRequestFilter, Extensions.ExtensionServer.RevealableNetworkRequestFilter];
  },
  destination: Common2.Revealer.RevealerDestination.NETWORK_PANEL,
  async loadRevealer() {
    const Network = await loadNetworkModule();
    return new Network.NetworkPanel.NetworkLogWithFilterRevealer();
  }
});

// gen/front_end/panels/security/security-meta.js
import * as Common3 from "./../../core/common/common.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as Root4 from "./../../core/root/root.js";
import * as UI5 from "./../../ui/legacy/legacy.js";
import * as Security from "./../../panels/security/security.js";
var UIStrings5 = {
  /**
   * @description Default Title of the security panel
   */
  security: "Security",
  /**
   * @description Title of privacy and security panel. This is used when the kDevToolsPrivacyUI feature flag is enabled.
   */
  PrivacyAndSecurity: "Privacy and security",
  /**
   * @description Default command to open the security panel
   */
  showSecurity: "Show Security",
  /**
   * @description Command to open the privacy and security panel. This is used when the kDevToolPrivacyUI feature flag is enabled
   */
  showPrivacyAndSecurity: "Show Privacy and security"
};
var str_5 = i18n9.i18n.registerUIStrings("panels/security/security-meta.ts", UIStrings5);
var i18nLazyString5 = i18n9.i18n.getLazilyComputedLocalizedString.bind(void 0, str_5);
var loadedSecurityModule;
async function loadSecurityModule() {
  if (!loadedSecurityModule) {
    loadedSecurityModule = await import("./../../panels/security/security.js");
  }
  return loadedSecurityModule;
}
UI5.ViewManager.registerViewExtension({
  location: "panel",
  id: "security",
  title: () => Root4.Runtime.hostConfig.devToolsPrivacyUI?.enabled ? i18nLazyString5(UIStrings5.PrivacyAndSecurity)() : i18nLazyString5(UIStrings5.security)(),
  commandPrompt: () => Root4.Runtime.hostConfig.devToolsPrivacyUI?.enabled ? i18nLazyString5(UIStrings5.showPrivacyAndSecurity)() : i18nLazyString5(UIStrings5.showSecurity)(),
  order: 80,
  persistence: "closeable",
  async loadView() {
    const Security2 = await loadSecurityModule();
    return Security2.SecurityPanel.SecurityPanel.instance();
  }
});
Common3.Revealer.registerRevealer({
  contextTypes() {
    return [
      Security.CookieReportView.CookieReportView
    ];
  },
  destination: Common3.Revealer.RevealerDestination.SECURITY_PANEL,
  async loadRevealer() {
    const Security2 = await loadSecurityModule();
    return new Security2.SecurityPanel.SecurityRevealer();
  }
});

// gen/front_end/panels/emulation/emulation-meta.js
import * as Common4 from "./../../core/common/common.js";
import * as i18n11 from "./../../core/i18n/i18n.js";
import * as Root5 from "./../../core/root/root.js";
import * as UI6 from "./../../ui/legacy/legacy.js";
var UIStrings6 = {
  /**
   * @description Title of an action in the emulation tool to toggle device mode
   */
  toggleDeviceToolbar: "Toggle device toolbar",
  /**
   * @description Title of an action in the emulation tool to capture screenshot
   */
  captureScreenshot: "Capture screenshot",
  /**
   * @description Title of an action in the emulation tool to capture full height screenshot. This
   * action captures a screenshot of the entire website, not just the visible portion.
   */
  captureFullSizeScreenshot: "Capture full size screenshot",
  /**
   * @description Title of an action in the emulation tool to capture a screenshot of just this node.
   * Node refers to a HTML element/node.
   */
  captureNodeScreenshot: "Capture node screenshot",
  /**
   * @description Command in the Device Mode Toolbar, to show media query boundaries in the UI.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
   */
  showMediaQueries: "Show media queries",
  /**
   * @description A tag of Mobile related settings that can be searched in the command menu if the
   * user doesn't know the exact name of the tool. Device refers to e.g. phone/tablet.
   */
  device: "device",
  /**
   * @description Command in the Device Mode Toolbar, to hide media query boundaries in the UI.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
   */
  hideMediaQueries: "Hide media queries",
  /**
   * @description Command that shows measuring rulers next to the emulated device.
   */
  showRulers: "Show rulers in the Device Mode toolbar",
  /**
   * @description Command that hides measuring rulers next to the emulated device.
   */
  hideRulers: "Hide rulers in the Device Mode toolbar",
  /**
   * @description Command that shows a frame (like a picture frame) around the emulated device.
   */
  showDeviceFrame: "Show device frame",
  /**
   * @description Command that hides a frame (like a picture frame) around the emulated device.
   */
  hideDeviceFrame: "Hide device frame"
};
var str_6 = i18n11.i18n.registerUIStrings("panels/emulation/emulation-meta.ts", UIStrings6);
var i18nLazyString6 = i18n11.i18n.getLazilyComputedLocalizedString.bind(void 0, str_6);
var loadedEmulationModule;
async function loadEmulationModule() {
  if (!loadedEmulationModule) {
    loadedEmulationModule = await import("./../../panels/emulation/emulation.js");
  }
  return loadedEmulationModule;
}
UI6.ActionRegistration.registerActionExtension({
  category: "MOBILE",
  actionId: "emulation.toggle-device-mode",
  toggleable: true,
  async loadActionDelegate() {
    const Emulation = await loadEmulationModule();
    return new Emulation.DeviceModeWrapper.ActionDelegate();
  },
  condition: Root5.Runtime.conditions.canDock,
  title: i18nLazyString6(UIStrings6.toggleDeviceToolbar),
  iconClass: "devices",
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Shift+Ctrl+M"
    },
    {
      platform: "mac",
      shortcut: "Shift+Meta+M"
    }
  ]
});
UI6.ActionRegistration.registerActionExtension({
  actionId: "emulation.capture-screenshot",
  category: "SCREENSHOT",
  async loadActionDelegate() {
    const Emulation = await loadEmulationModule();
    return new Emulation.DeviceModeWrapper.ActionDelegate();
  },
  condition: Root5.Runtime.conditions.canDock,
  title: i18nLazyString6(UIStrings6.captureScreenshot)
});
UI6.ActionRegistration.registerActionExtension({
  actionId: "emulation.capture-full-height-screenshot",
  category: "SCREENSHOT",
  async loadActionDelegate() {
    const Emulation = await loadEmulationModule();
    return new Emulation.DeviceModeWrapper.ActionDelegate();
  },
  condition: Root5.Runtime.conditions.canDock,
  title: i18nLazyString6(UIStrings6.captureFullSizeScreenshot)
});
UI6.ActionRegistration.registerActionExtension({
  actionId: "emulation.capture-node-screenshot",
  category: "SCREENSHOT",
  async loadActionDelegate() {
    const Emulation = await loadEmulationModule();
    return new Emulation.DeviceModeWrapper.ActionDelegate();
  },
  condition: Root5.Runtime.conditions.canDock,
  title: i18nLazyString6(UIStrings6.captureNodeScreenshot)
});
Common4.Settings.registerSettingExtension({
  category: "MOBILE",
  settingName: "show-media-query-inspector",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString6(UIStrings6.showMediaQueries)
    },
    {
      value: false,
      title: i18nLazyString6(UIStrings6.hideMediaQueries)
    }
  ],
  tags: [i18nLazyString6(UIStrings6.device)]
});
Common4.Settings.registerSettingExtension({
  category: "MOBILE",
  settingName: "emulation.show-rulers",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString6(UIStrings6.showRulers)
    },
    {
      value: false,
      title: i18nLazyString6(UIStrings6.hideRulers)
    }
  ],
  tags: [i18nLazyString6(UIStrings6.device)]
});
Common4.Settings.registerSettingExtension({
  category: "MOBILE",
  settingName: "emulation.show-device-outline",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString6(UIStrings6.showDeviceFrame)
    },
    {
      value: false,
      title: i18nLazyString6(UIStrings6.hideDeviceFrame)
    }
  ],
  tags: [i18nLazyString6(UIStrings6.device)]
});
UI6.Toolbar.registerToolbarItem({
  actionId: "emulation.toggle-device-mode",
  condition: Root5.Runtime.conditions.canDock,
  location: "main-toolbar-left",
  order: 1,
  loadItem: void 0,
  separator: void 0
});
Common4.AppProvider.registerAppProvider({
  async loadAppProvider() {
    const Emulation = await loadEmulationModule();
    return Emulation.AdvancedApp.AdvancedAppProvider.instance();
  },
  condition: Root5.Runtime.conditions.canDock,
  order: 0
});
UI6.ContextMenu.registerItem({
  location: "deviceModeMenu/save",
  order: 12,
  actionId: "emulation.capture-screenshot"
});
UI6.ContextMenu.registerItem({
  location: "deviceModeMenu/save",
  order: 13,
  actionId: "emulation.capture-full-height-screenshot"
});

// gen/front_end/panels/sensors/sensors-meta.js
import * as Common5 from "./../../core/common/common.js";
import * as i18n13 from "./../../core/i18n/i18n.js";
import * as UI7 from "./../../ui/legacy/legacy.js";
var UIStrings7 = {
  /**
   * @description Title of the Sensors tool. The sensors tool contains GPS, orientation sensors, touch
   * settings, etc.
   */
  sensors: "Sensors",
  /**
   * @description A tag of Sensors tool that can be searched in the command menu
   */
  geolocation: "geolocation",
  /**
   * @description A tag of Sensors tool that can be searched in the command menu
   */
  timezones: "timezones",
  /**
   * @description Text in Sensors View of the Device Toolbar
   */
  locale: "locale",
  /**
   * @description A tag of Sensors tool that can be searched in the command menu
   */
  locales: "locales",
  /**
   * @description A tag of Sensors tool that can be searched in the command menu
   */
  accelerometer: "accelerometer",
  /**
   * @description A tag of Sensors tool that can be searched in the command menu. Refers to the
   * orientation of a device (e.g. phone) in 3D space, e.g. tilted right/left.
   */
  deviceOrientation: "device orientation",
  /**
   * @description Title of Locations settings. Refers to geographic locations for GPS.
   */
  locations: "Locations",
  /**
   * @description Text for the touch type to simulate on a device. Refers to touch input as opposed to
   * mouse input.
   */
  touch: "Touch",
  /**
   * @description Text in Sensors View of the Device Toolbar. Refers to device-based touch input,
   *which means the input type will be 'touch' only if the device normally has touch input e.g. a
   *phone or tablet.
   */
  devicebased: "Device-based",
  /**
   * @description Text in Sensors View of the Device Toolbar. Means that touch input will be forced
   *on, even if the device type e.g. desktop computer does not normally have touch input.
   */
  forceEnabled: "Force enabled",
  /**
   * @description Title of a section option in Sensors tab for idle emulation. This is a command, to
   *emulate the state of the 'Idle Detector'.
   */
  emulateIdleDetectorState: "Emulate Idle Detector state",
  /**
   * @description Title of an option in Sensors tab idle emulation drop-down. Turns off emulation of idle state.
   */
  noIdleEmulation: "No idle emulation",
  /**
   * @description Title of an option in Sensors tab idle emulation drop-down.
   */
  userActiveScreenUnlocked: "User active, screen unlocked",
  /**
   * @description Title of an option in Sensors tab idle emulation drop-down.
   */
  userActiveScreenLocked: "User active, screen locked",
  /**
   * @description Title of an option in Sensors tab idle emulation drop-down.
   */
  userIdleScreenUnlocked: "User idle, screen unlocked",
  /**
   * @description Title of an option in Sensors tab idle emulation drop-down.
   */
  userIdleScreenLocked: "User idle, screen locked",
  /**
   * @description Command that opens the Sensors view/tool. The sensors tool contains GPS,
   * orientation sensors, touch settings, etc.
   */
  showSensors: "Show Sensors",
  /**
   * @description Command that shows geographic locations.
   */
  showLocations: "Show Locations",
  /**
   * @description Text for the CPU Pressure type to simulate on a device.
   */
  cpuPressure: "CPU Pressure",
  /**
   * @description Title of an option in Sensors tab cpu pressure emulation drop-down. Turns off emulation of cpu pressure state.
   */
  noPressureEmulation: "No override",
  /**
   * @description An option that appears in a drop-down that represents the nominal state.
   */
  nominal: "Nominal",
  /**
   * @description An option that appears in a drop-down that represents the fair state.
   */
  fair: "Fair",
  /**
   * @description An option that appears in a drop-down that represents the serious state.
   */
  serious: "Serious",
  /**
   * @description An option that appears in a drop-down that represents the critical state.
   */
  critical: "Critical"
};
var str_7 = i18n13.i18n.registerUIStrings("panels/sensors/sensors-meta.ts", UIStrings7);
var i18nLazyString7 = i18n13.i18n.getLazilyComputedLocalizedString.bind(void 0, str_7);
var loadedSensorsModule;
async function loadEmulationModule2() {
  if (!loadedSensorsModule) {
    loadedSensorsModule = await import("./../../panels/sensors/sensors.js");
  }
  return loadedSensorsModule;
}
UI7.ViewManager.registerViewExtension({
  location: "drawer-view",
  commandPrompt: i18nLazyString7(UIStrings7.showSensors),
  title: i18nLazyString7(UIStrings7.sensors),
  id: "sensors",
  persistence: "closeable",
  order: 100,
  async loadView() {
    const Sensors = await loadEmulationModule2();
    return new Sensors.SensorsView.SensorsView();
  },
  tags: [
    i18nLazyString7(UIStrings7.geolocation),
    i18nLazyString7(UIStrings7.timezones),
    i18nLazyString7(UIStrings7.locale),
    i18nLazyString7(UIStrings7.locales),
    i18nLazyString7(UIStrings7.accelerometer),
    i18nLazyString7(UIStrings7.deviceOrientation)
  ]
});
UI7.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "emulation-locations",
  commandPrompt: i18nLazyString7(UIStrings7.showLocations),
  title: i18nLazyString7(UIStrings7.locations),
  order: 40,
  async loadView() {
    const Sensors = await loadEmulationModule2();
    return new Sensors.LocationsSettingsTab.LocationsSettingsTab();
  },
  settings: [
    "emulation.locations"
  ],
  iconName: "location-on"
});
Common5.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "emulation.locations",
  settingType: "array",
  // TODO(crbug.com/1136655): http://crrev.com/c/2666426 regressed localization of city titles.
  // These titles should be localized since they are displayed to users.
  defaultValue: [
    {
      title: "Berlin",
      lat: 52.520007,
      long: 13.404954,
      timezoneId: "Europe/Berlin",
      locale: "de-DE",
      accuracy: 150
    },
    {
      title: "London",
      lat: 51.507351,
      long: -0.127758,
      timezoneId: "Europe/London",
      locale: "en-GB",
      accuracy: 150
    },
    {
      title: "Moscow",
      lat: 55.755826,
      long: 37.6173,
      timezoneId: "Europe/Moscow",
      locale: "ru-RU",
      accuracy: 150
    },
    {
      title: "Mountain View",
      lat: 37.386052,
      long: -122.083851,
      timezoneId: "America/Los_Angeles",
      locale: "en-US",
      accuracy: 150
    },
    {
      title: "Mumbai",
      lat: 19.075984,
      long: 72.877656,
      timezoneId: "Asia/Kolkata",
      locale: "mr-IN",
      accuracy: 150
    },
    {
      title: "San Francisco",
      lat: 37.774929,
      long: -122.419416,
      timezoneId: "America/Los_Angeles",
      locale: "en-US",
      accuracy: 150
    },
    {
      title: "Shanghai",
      lat: 31.230416,
      long: 121.473701,
      timezoneId: "Asia/Shanghai",
      locale: "zh-Hans-CN",
      accuracy: 150
    },
    {
      title: "S\xE3o Paulo",
      lat: -23.55052,
      long: -46.633309,
      timezoneId: "America/Sao_Paulo",
      locale: "pt-BR",
      accuracy: 150
    },
    {
      title: "Tokyo",
      lat: 35.689487,
      long: 139.691706,
      timezoneId: "Asia/Tokyo",
      locale: "ja-JP",
      accuracy: 150
    }
  ]
});
Common5.Settings.registerSettingExtension({
  title: i18nLazyString7(UIStrings7.cpuPressure),
  reloadRequired: true,
  settingName: "emulation.cpu-pressure",
  settingType: "enum",
  defaultValue: "none",
  options: [
    {
      value: "none",
      title: i18nLazyString7(UIStrings7.noPressureEmulation),
      text: i18nLazyString7(UIStrings7.noPressureEmulation)
    },
    {
      value: "nominal",
      title: i18nLazyString7(UIStrings7.nominal),
      text: i18nLazyString7(UIStrings7.nominal)
    },
    {
      value: "fair",
      title: i18nLazyString7(UIStrings7.fair),
      text: i18nLazyString7(UIStrings7.fair)
    },
    {
      value: "serious",
      title: i18nLazyString7(UIStrings7.serious),
      text: i18nLazyString7(UIStrings7.serious)
    },
    {
      value: "critical",
      title: i18nLazyString7(UIStrings7.critical),
      text: i18nLazyString7(UIStrings7.critical)
    }
  ]
});
Common5.Settings.registerSettingExtension({
  title: i18nLazyString7(UIStrings7.touch),
  reloadRequired: true,
  settingName: "emulation.touch",
  settingType: "enum",
  defaultValue: "none",
  options: [
    {
      value: "none",
      title: i18nLazyString7(UIStrings7.devicebased),
      text: i18nLazyString7(UIStrings7.devicebased)
    },
    {
      value: "force",
      title: i18nLazyString7(UIStrings7.forceEnabled),
      text: i18nLazyString7(UIStrings7.forceEnabled)
    }
  ]
});
Common5.Settings.registerSettingExtension({
  title: i18nLazyString7(UIStrings7.emulateIdleDetectorState),
  settingName: "emulation.idle-detection",
  settingType: "enum",
  defaultValue: "none",
  options: [
    {
      value: "none",
      title: i18nLazyString7(UIStrings7.noIdleEmulation),
      text: i18nLazyString7(UIStrings7.noIdleEmulation)
    },
    {
      value: '{"isUserActive":true,"isScreenUnlocked":true}',
      title: i18nLazyString7(UIStrings7.userActiveScreenUnlocked),
      text: i18nLazyString7(UIStrings7.userActiveScreenUnlocked)
    },
    {
      value: '{"isUserActive":true,"isScreenUnlocked":false}',
      title: i18nLazyString7(UIStrings7.userActiveScreenLocked),
      text: i18nLazyString7(UIStrings7.userActiveScreenLocked)
    },
    {
      value: '{"isUserActive":false,"isScreenUnlocked":true}',
      title: i18nLazyString7(UIStrings7.userIdleScreenUnlocked),
      text: i18nLazyString7(UIStrings7.userIdleScreenUnlocked)
    },
    {
      value: '{"isUserActive":false,"isScreenUnlocked":false}',
      title: i18nLazyString7(UIStrings7.userIdleScreenLocked),
      text: i18nLazyString7(UIStrings7.userIdleScreenLocked)
    }
  ]
});

// gen/front_end/panels/accessibility/accessibility-meta.js
import * as i18n15 from "./../../core/i18n/i18n.js";
import * as UI8 from "./../../ui/legacy/legacy.js";
var loadedAccessibilityModule;
var UIStrings8 = {
  /**
   * @description Text for accessibility of the web page
   */
  accessibility: "Accessibility",
  /**
   * @description Command for showing the 'Accessibility' tool
   */
  shoAccessibility: "Show Accessibility"
};
var str_8 = i18n15.i18n.registerUIStrings("panels/accessibility/accessibility-meta.ts", UIStrings8);
var i18nLazyString8 = i18n15.i18n.getLazilyComputedLocalizedString.bind(void 0, str_8);
async function loadAccessibilityModule() {
  if (!loadedAccessibilityModule) {
    loadedAccessibilityModule = await import("./../../panels/accessibility/accessibility.js");
  }
  return loadedAccessibilityModule;
}
UI8.ViewManager.registerViewExtension({
  location: "elements-sidebar",
  id: "accessibility.view",
  title: i18nLazyString8(UIStrings8.accessibility),
  commandPrompt: i18nLazyString8(UIStrings8.shoAccessibility),
  order: 10,
  persistence: "permanent",
  async loadView() {
    const Accessibility = await loadAccessibilityModule();
    return Accessibility.AccessibilitySidebarView.AccessibilitySidebarView.instance();
  }
});

// gen/front_end/panels/animation/animation-meta.js
import * as Common6 from "./../../core/common/common.js";
import * as i18n17 from "./../../core/i18n/i18n.js";
import * as SDK4 from "./../../core/sdk/sdk.js";
import * as UI9 from "./../../ui/legacy/legacy.js";
var loadedAnimationModule;
var UIStrings9 = {
  /**
   * @description Title for the 'Animations' tool in the bottom drawer
   */
  animations: "Animations",
  /**
   * @description Command for showing the 'Animations' tool in the bottom drawer
   */
  showAnimations: "Show Animations"
};
var str_9 = i18n17.i18n.registerUIStrings("panels/animation/animation-meta.ts", UIStrings9);
var i18nLazyString9 = i18n17.i18n.getLazilyComputedLocalizedString.bind(void 0, str_9);
async function loadAnimationModule() {
  if (!loadedAnimationModule) {
    loadedAnimationModule = await import("./../../panels/animation/animation.js");
  }
  return loadedAnimationModule;
}
UI9.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "animations",
  title: i18nLazyString9(UIStrings9.animations),
  commandPrompt: i18nLazyString9(UIStrings9.showAnimations),
  persistence: "closeable",
  order: 0,
  async loadView() {
    const Animation = await loadAnimationModule();
    return Animation.AnimationTimeline.AnimationTimeline.instance();
  }
});
Common6.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK4.AnimationModel.AnimationGroup
    ];
  },
  destination: Common6.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Animation = await loadAnimationModule();
    return new Animation.AnimationTimeline.AnimationGroupRevealer();
  }
});

// gen/front_end/panels/developer_resources/developer_resources-meta.js
import * as Common7 from "./../../core/common/common.js";
import * as i18n19 from "./../../core/i18n/i18n.js";
import * as SDK5 from "./../../core/sdk/sdk.js";
import * as UI10 from "./../../ui/legacy/legacy.js";
var UIStrings10 = {
  /**
   * @description Title for developer resources panel
   */
  developerResources: "Developer resources",
  /**
   * @description Command for showing the developer resources panel
   */
  showDeveloperResources: "Show Developer resources"
};
var str_10 = i18n19.i18n.registerUIStrings("panels/developer_resources/developer_resources-meta.ts", UIStrings10);
var i18nLazyString10 = i18n19.i18n.getLazilyComputedLocalizedString.bind(void 0, str_10);
var loadedDeveloperResourcesModule;
async function loadDeveloperResourcesModule() {
  if (!loadedDeveloperResourcesModule) {
    loadedDeveloperResourcesModule = await import("./../../panels/developer_resources/developer_resources.js");
  }
  return loadedDeveloperResourcesModule;
}
UI10.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "developer-resources",
  title: i18nLazyString10(UIStrings10.developerResources),
  commandPrompt: i18nLazyString10(UIStrings10.showDeveloperResources),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const DeveloperResources = await loadDeveloperResourcesModule();
    return new DeveloperResources.DeveloperResourcesView.DeveloperResourcesView();
  }
});
Common7.Revealer.registerRevealer({
  contextTypes() {
    return [SDK5.PageResourceLoader.ResourceKey];
  },
  destination: Common7.Revealer.RevealerDestination.DEVELOPER_RESOURCES_PANEL,
  async loadRevealer() {
    const DeveloperResources = await loadDeveloperResourcesModule();
    return new DeveloperResources.DeveloperResourcesView.DeveloperResourcesRevealer();
  }
});

// gen/front_end/panels/autofill/autofill-meta.js
import * as i18n21 from "./../../core/i18n/i18n.js";
import * as UI11 from "./../../ui/legacy/legacy.js";
var UIStrings11 = {
  /**
   * @description Label for the autofill pane
   */
  autofill: "Autofill",
  /**
   * @description Command for showing the 'Autofill' pane
   */
  showAutofill: "Show Autofill"
};
var str_11 = i18n21.i18n.registerUIStrings("panels/autofill/autofill-meta.ts", UIStrings11);
var i18nLazyString11 = i18n21.i18n.getLazilyComputedLocalizedString.bind(void 0, str_11);
var loadedAutofillModule;
async function loadAutofillModule() {
  if (!loadedAutofillModule) {
    loadedAutofillModule = await import("./../../panels/autofill/autofill.js");
  }
  return loadedAutofillModule;
}
UI11.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "autofill-view",
  title: i18nLazyString11(UIStrings11.autofill),
  commandPrompt: i18nLazyString11(UIStrings11.showAutofill),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const Autofill = await loadAutofillModule();
    return new Autofill.AutofillView.AutofillView();
  }
});

// gen/front_end/entrypoints/inspector_main/inspector_main-meta.js
import * as Common8 from "./../../core/common/common.js";
import * as i18n23 from "./../../core/i18n/i18n.js";
import * as UI12 from "./../../ui/legacy/legacy.js";
var UIStrings12 = {
  /**
   * @description Title of the Rendering tool. The rendering tool is a collection of settings that
   * lets the user debug the rendering (i.e. how the website is drawn onto the screen) of the
   * website.
   * https://developer.chrome.com/docs/devtools/evaluate-performance/reference#rendering
   */
  rendering: "Rendering",
  /**
   * @description Command for showing the 'Rendering' tool
   */
  showRendering: "Show Rendering",
  /**
   * @description Command Menu search query that points to the Rendering tool. This refers to the
   * process of drawing pixels onto the screen (called painting).
   */
  paint: "paint",
  /**
   * @description Command Menu search query that points to the Rendering tool. Layout is a phase of
   * rendering a website where the browser calculates where different elements in the website will go
   * on the screen.
   */
  layout: "layout",
  /**
   * @description Command Menu search query that points to the Rendering tool. 'fps' is an acronym
   * for 'Frames per second'. It is in lowercase here because the search box the user will type this
   * into is case-insensitive. If there is an equivalent acronym/shortening in the target language
   * then a translation would be appropriate, otherwise it can be left in English.
   */
  fps: "fps",
  /**
   * @description Command Menu search query that points to the Rendering tool.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types. This is something the user
   * might type in to search for the setting to change the CSS media type.
   */
  cssMediaType: "CSS media type",
  /**
   * @description Command Menu search query that points to the Rendering tool.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features This is something the
   * user might type in to search for the setting to change the value of various CSS media features.
   */
  cssMediaFeature: "CSS media feature",
  /**
   * @description Command Menu search query that points to the Rendering tool. Possible search term
   * when the user wants to find settings related to visual impairment e.g. blurry vision, blindness.
   */
  visionDeficiency: "vision deficiency",
  /**
   * @description Command Menu search query that points to the Rendering tool. Possible search term
   * when the user wants to find settings related to color vision deficiency/color blindness.
   */
  colorVisionDeficiency: "color vision deficiency",
  /**
   * @description Title of an action that reloads the inspected page.
   */
  reloadPage: "Reload page",
  /**
   * @description Title of an action that 'hard' reloads the inspected page. A hard reload also
   * clears the browser's cache, forcing it to reload the most recent version of the page.
   */
  hardReloadPage: "Hard reload page",
  /**
   * @description Title of a setting under the Network category in Settings. All ads on the site will
   * be blocked (the setting is forced on).
   */
  forceAdBlocking: "Force ad blocking on this site",
  /**
   * @description A command available in the command menu to block all ads on the current site.
   */
  blockAds: "Block ads on this site",
  /**
   * @description A command available in the command menu to disable ad blocking on the current site.
   */
  showAds: "Show ads on this site, if allowed",
  /**
   * @description A command available in the command menu to automatically open DevTools when
   * webpages create new popup windows.
   */
  autoOpenDevTools: "Auto-open DevTools for popups",
  /**
   * @description A command available in the command menu to stop automatically opening DevTools when
   * webpages create new popup windows.
   */
  doNotAutoOpen: "Do not auto-open DevTools for popups",
  /**
   * @description Title of a setting under the Appearance category in Settings. When the webpage is
   * paused by devtools, an overlay is shown on top of the page to indicate that it is paused. The
   * overlay is a pause/unpause button and some text, which appears on top of the paused page. This
   * setting turns off this overlay.
   */
  disablePaused: "Disable paused state overlay",
  /**
   * @description Title of an action that toggle
   * "forces CSS prefers-color-scheme" color
   */
  toggleCssPrefersColorSchemeMedia: "Toggle CSS media feature prefers-color-scheme"
};
var str_12 = i18n23.i18n.registerUIStrings("entrypoints/inspector_main/inspector_main-meta.ts", UIStrings12);
var i18nLazyString12 = i18n23.i18n.getLazilyComputedLocalizedString.bind(void 0, str_12);
var loadedInspectorMainModule;
async function loadInspectorMainModule() {
  if (!loadedInspectorMainModule) {
    loadedInspectorMainModule = await import("./../inspector_main/inspector_main.js");
  }
  return loadedInspectorMainModule;
}
UI12.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "rendering",
  title: i18nLazyString12(UIStrings12.rendering),
  commandPrompt: i18nLazyString12(UIStrings12.showRendering),
  persistence: "closeable",
  order: 50,
  async loadView() {
    const InspectorMain = await loadInspectorMainModule();
    return new InspectorMain.RenderingOptions.RenderingOptionsView();
  },
  tags: [
    i18nLazyString12(UIStrings12.paint),
    i18nLazyString12(UIStrings12.layout),
    i18nLazyString12(UIStrings12.fps),
    i18nLazyString12(UIStrings12.cssMediaType),
    i18nLazyString12(UIStrings12.cssMediaFeature),
    i18nLazyString12(UIStrings12.visionDeficiency),
    i18nLazyString12(UIStrings12.colorVisionDeficiency)
  ]
});
UI12.ActionRegistration.registerActionExtension({
  category: "NAVIGATION",
  actionId: "inspector-main.reload",
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule();
    return new InspectorMain.InspectorMain.ReloadActionDelegate();
  },
  iconClass: "refresh",
  title: i18nLazyString12(UIStrings12.reloadPage),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+R"
    },
    {
      platform: "windows,linux",
      shortcut: "F5"
    },
    {
      platform: "mac",
      shortcut: "Meta+R"
    }
  ]
});
UI12.ActionRegistration.registerActionExtension({
  category: "NAVIGATION",
  actionId: "inspector-main.hard-reload",
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule();
    return new InspectorMain.InspectorMain.ReloadActionDelegate();
  },
  title: i18nLazyString12(UIStrings12.hardReloadPage),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Shift+Ctrl+R"
    },
    {
      platform: "windows,linux",
      shortcut: "Shift+F5"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+F5"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+F5"
    },
    {
      platform: "mac",
      shortcut: "Shift+Meta+R"
    }
  ]
});
UI12.ActionRegistration.registerActionExtension({
  actionId: "rendering.toggle-prefers-color-scheme",
  category: "RENDERING",
  title: i18nLazyString12(UIStrings12.toggleCssPrefersColorSchemeMedia),
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule();
    return new InspectorMain.RenderingOptions.ReloadActionDelegate();
  }
});
Common8.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString12(UIStrings12.forceAdBlocking),
  settingName: "network.ad-blocking-enabled",
  settingType: "boolean",
  storageType: "Session",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString12(UIStrings12.blockAds)
    },
    {
      value: false,
      title: i18nLazyString12(UIStrings12.showAds)
    }
  ]
});
Common8.Settings.registerSettingExtension({
  category: "GLOBAL",
  storageType: "Synced",
  title: i18nLazyString12(UIStrings12.autoOpenDevTools),
  settingName: "auto-attach-to-created-pages",
  settingType: "boolean",
  order: 2,
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString12(UIStrings12.autoOpenDevTools)
    },
    {
      value: false,
      title: i18nLazyString12(UIStrings12.doNotAutoOpen)
    }
  ]
});
Common8.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: i18nLazyString12(UIStrings12.disablePaused),
  settingName: "disable-paused-state-overlay",
  settingType: "boolean",
  defaultValue: false
});
UI12.Toolbar.registerToolbarItem({
  async loadItem() {
    const InspectorMain = await loadInspectorMainModule();
    return InspectorMain.InspectorMain.NodeIndicatorProvider.instance();
  },
  order: 2,
  location: "main-toolbar-left"
});
UI12.Toolbar.registerToolbarItem({
  async loadItem() {
    const InspectorMain = await loadInspectorMainModule();
    return InspectorMain.OutermostTargetSelector.OutermostTargetSelector.instance();
  },
  order: 97,
  location: "main-toolbar-right"
});

// gen/front_end/panels/application/application-meta.js
import * as Common9 from "./../../core/common/common.js";
import * as i18n25 from "./../../core/i18n/i18n.js";
import * as SDK6 from "./../../core/sdk/sdk.js";
import * as UI13 from "./../../ui/legacy/legacy.js";
import * as PreloadingHelper from "./../../panels/application/preloading/helper/helper.js";
var UIStrings13 = {
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
var str_13 = i18n25.i18n.registerUIStrings("panels/application/application-meta.ts", UIStrings13);
var i18nLazyString13 = i18n25.i18n.getLazilyComputedLocalizedString.bind(void 0, str_13);
var loadedResourcesModule;
async function loadResourcesModule() {
  if (!loadedResourcesModule) {
    loadedResourcesModule = await import("./../../panels/application/application.js");
  }
  return loadedResourcesModule;
}
function maybeRetrieveContextTypes4(getClassCallBack) {
  if (loadedResourcesModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedResourcesModule);
}
UI13.ViewManager.registerViewExtension({
  location: "panel",
  id: "resources",
  title: i18nLazyString13(UIStrings13.application),
  commandPrompt: i18nLazyString13(UIStrings13.showApplication),
  order: 70,
  async loadView() {
    const Resources = await loadResourcesModule();
    return Resources.ResourcesPanel.ResourcesPanel.instance();
  },
  tags: [i18nLazyString13(UIStrings13.pwa)]
});
UI13.ActionRegistration.registerActionExtension({
  category: "RESOURCES",
  actionId: "resources.clear",
  title: i18nLazyString13(UIStrings13.clearSiteData),
  async loadActionDelegate() {
    const Resources = await loadResourcesModule();
    return new Resources.StorageView.ActionDelegate();
  }
});
UI13.ActionRegistration.registerActionExtension({
  category: "RESOURCES",
  actionId: "resources.clear-incl-third-party-cookies",
  title: i18nLazyString13(UIStrings13.clearSiteDataIncludingThirdparty),
  async loadActionDelegate() {
    const Resources = await loadResourcesModule();
    return new Resources.StorageView.ActionDelegate();
  }
});
UI13.ActionRegistration.registerActionExtension({
  actionId: "background-service.toggle-recording",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes4((Resources) => [Resources.BackgroundServiceView.BackgroundServiceView]);
  },
  async loadActionDelegate() {
    const Resources = await loadResourcesModule();
    return new Resources.BackgroundServiceView.ActionDelegate();
  },
  category: "BACKGROUND_SERVICES",
  options: [
    {
      value: true,
      title: i18nLazyString13(UIStrings13.startRecordingEvents)
    },
    {
      value: false,
      title: i18nLazyString13(UIStrings13.stopRecordingEvents)
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
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK6.Resource.Resource
    ];
  },
  destination: Common9.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.ResourceRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK6.ResourceTreeModel.ResourceTreeFrame
    ];
  },
  destination: Common9.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.FrameDetailsRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [PreloadingHelper.PreloadingForward.RuleSetView];
  },
  destination: Common9.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.RuleSetViewRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [PreloadingHelper.PreloadingForward.AttemptViewWithFilter];
  },
  destination: Common9.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.AttemptViewWithFilterRevealer();
  }
});

// gen/front_end/panels/issues/issues-meta.js
import * as Common10 from "./../../core/common/common.js";
import * as i18n27 from "./../../core/i18n/i18n.js";
import * as IssuesManager from "./../../models/issues_manager/issues_manager.js";
import * as UI14 from "./../../ui/legacy/legacy.js";
var UIStrings14 = {
  /**
   * @description Label for the issues pane
   */
  issues: "Issues",
  /**
   * @description Command for showing the 'Issues' tool
   */
  showIssues: "Show Issues"
};
var str_14 = i18n27.i18n.registerUIStrings("panels/issues/issues-meta.ts", UIStrings14);
var i18nLazyString14 = i18n27.i18n.getLazilyComputedLocalizedString.bind(void 0, str_14);
var loadedIssuesModule;
async function loadIssuesModule() {
  if (!loadedIssuesModule) {
    loadedIssuesModule = await import("./../../panels/issues/issues.js");
  }
  return loadedIssuesModule;
}
UI14.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "issues-pane",
  title: i18nLazyString14(UIStrings14.issues),
  commandPrompt: i18nLazyString14(UIStrings14.showIssues),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const Issues = await loadIssuesModule();
    return new Issues.IssuesPane.IssuesPane();
  }
});
Common10.Revealer.registerRevealer({
  contextTypes() {
    return [
      IssuesManager.Issue.Issue
    ];
  },
  destination: Common10.Revealer.RevealerDestination.ISSUES_VIEW,
  async loadRevealer() {
    const Issues = await loadIssuesModule();
    return new Issues.IssueRevealer.IssueRevealer();
  }
});

// gen/front_end/panels/layers/layers-meta.js
import * as i18n29 from "./../../core/i18n/i18n.js";
import * as UI15 from "./../../ui/legacy/legacy.js";
var UIStrings15 = {
  /**
   * @description Title of the Layers tool
   */
  layers: "Layers",
  /**
   * @description Command for showing the Layers tool
   */
  showLayers: "Show Layers"
};
var str_15 = i18n29.i18n.registerUIStrings("panels/layers/layers-meta.ts", UIStrings15);
var i18nLazyString15 = i18n29.i18n.getLazilyComputedLocalizedString.bind(void 0, str_15);
var loadedLayersModule;
async function loadLayersModule() {
  if (!loadedLayersModule) {
    loadedLayersModule = await import("./../../panels/layers/layers.js");
  }
  return loadedLayersModule;
}
UI15.ViewManager.registerViewExtension({
  location: "panel",
  id: "layers",
  title: i18nLazyString15(UIStrings15.layers),
  commandPrompt: i18nLazyString15(UIStrings15.showLayers),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const Layers = await loadLayersModule();
    return Layers.LayersPanel.LayersPanel.instance();
  }
});

// gen/front_end/panels/lighthouse/lighthouse-meta.js
import * as i18n31 from "./../../core/i18n/i18n.js";
import * as UI16 from "./../../ui/legacy/legacy.js";
var UIStrings16 = {
  /**
   * @description Command for showing the 'Lighthouse' tool
   */
  showLighthouse: "Show `Lighthouse`"
};
var str_16 = i18n31.i18n.registerUIStrings("panels/lighthouse/lighthouse-meta.ts", UIStrings16);
var i18nLazyString16 = i18n31.i18n.getLazilyComputedLocalizedString.bind(void 0, str_16);
var loadedLighthouseModule;
async function loadLighthouseModule() {
  if (!loadedLighthouseModule) {
    loadedLighthouseModule = await import("./../../panels/lighthouse/lighthouse.js");
  }
  return loadedLighthouseModule;
}
UI16.ViewManager.registerViewExtension({
  location: "panel",
  id: "lighthouse",
  title: i18n31.i18n.lockedLazyString("Lighthouse"),
  commandPrompt: i18nLazyString16(UIStrings16.showLighthouse),
  order: 90,
  async loadView() {
    const Lighthouse = await loadLighthouseModule();
    return Lighthouse.LighthousePanel.LighthousePanel.instance();
  },
  tags: [
    i18n31.i18n.lockedLazyString("lighthouse"),
    i18n31.i18n.lockedLazyString("pwa")
  ]
});

// gen/front_end/panels/media/media-meta.js
import * as i18n33 from "./../../core/i18n/i18n.js";
import * as UI17 from "./../../ui/legacy/legacy.js";
var UIStrings17 = {
  /**
   * @description Text that appears on a button for the media resource type filter.
   */
  media: "Media",
  /**
   * @description The type of media. Lower case.
   */
  video: "video",
  /**
   * @description Command for showing the media tool.
   */
  showMedia: "Show Media"
};
var str_17 = i18n33.i18n.registerUIStrings("panels/media/media-meta.ts", UIStrings17);
var i18nLazyString17 = i18n33.i18n.getLazilyComputedLocalizedString.bind(void 0, str_17);
var loadedMediaModule;
async function loadMediaModule() {
  if (!loadedMediaModule) {
    loadedMediaModule = await import("./../../panels/media/media.js");
  }
  return loadedMediaModule;
}
UI17.ViewManager.registerViewExtension({
  location: "panel",
  id: "medias",
  title: i18nLazyString17(UIStrings17.media),
  commandPrompt: i18nLazyString17(UIStrings17.showMedia),
  persistence: "closeable",
  order: 100,
  async loadView() {
    const Media = await loadMediaModule();
    return new Media.MainView.MainView();
  },
  tags: [
    i18nLazyString17(UIStrings17.media),
    i18nLazyString17(UIStrings17.video)
  ]
});

// gen/front_end/panels/mobile_throttling/mobile_throttling-meta.js
import * as Common11 from "./../../core/common/common.js";
import * as i18n35 from "./../../core/i18n/i18n.js";
import * as UI18 from "./../../ui/legacy/legacy.js";
var UIStrings18 = {
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
var str_18 = i18n35.i18n.registerUIStrings("panels/mobile_throttling/mobile_throttling-meta.ts", UIStrings18);
var i18nLazyString18 = i18n35.i18n.getLazilyComputedLocalizedString.bind(void 0, str_18);
var loadedMobileThrottlingModule;
async function loadMobileThrottlingModule() {
  if (!loadedMobileThrottlingModule) {
    loadedMobileThrottlingModule = await import("./../../panels/mobile_throttling/mobile_throttling.js");
  }
  return loadedMobileThrottlingModule;
}
UI18.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "throttling-conditions",
  title: i18nLazyString18(UIStrings18.throttling),
  commandPrompt: i18nLazyString18(UIStrings18.showThrottling),
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
UI18.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-offline",
  category: "NETWORK",
  title: i18nLazyString18(UIStrings18.goOffline),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString18(UIStrings18.device),
    i18nLazyString18(UIStrings18.throttlingTag)
  ]
});
UI18.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-low-end-mobile",
  category: "NETWORK",
  title: i18nLazyString18(UIStrings18.enableSlowGThrottling),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString18(UIStrings18.device),
    i18nLazyString18(UIStrings18.throttlingTag)
  ]
});
UI18.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-mid-tier-mobile",
  category: "NETWORK",
  title: i18nLazyString18(UIStrings18.enableFastGThrottling),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString18(UIStrings18.device),
    i18nLazyString18(UIStrings18.throttlingTag)
  ]
});
UI18.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-online",
  category: "NETWORK",
  title: i18nLazyString18(UIStrings18.goOnline),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString18(UIStrings18.device),
    i18nLazyString18(UIStrings18.throttlingTag)
  ]
});
Common11.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "custom-network-conditions",
  settingType: "array",
  defaultValue: []
});

// gen/front_end/panels/performance_monitor/performance_monitor-meta.js
import * as i18n37 from "./../../core/i18n/i18n.js";
import * as UI19 from "./../../ui/legacy/legacy.js";
var UIStrings19 = {
  /**
   * @description Title of the 'Performance monitor' tool in the bottom drawer
   */
  performanceMonitor: "Performance monitor",
  /**
   * @description A tag of Performance Monitor that can be searched in the command menu
   */
  performance: "performance",
  /**
   * @description A tag of Performance Monitor that can be searched in the command menu
   */
  systemMonitor: "system monitor",
  /**
   * @description A tag of Performance Monitor that can be searched in the command menu
   */
  monitor: "monitor",
  /**
   * @description A tag of Performance Monitor that can be searched in the command menu
   */
  activity: "activity",
  /**
   * @description A tag of Performance Monitor that can be searched in the command menu
   */
  metrics: "metrics",
  /**
   * @description Command for showing the 'Performance monitor' tool in the bottom drawer
   */
  showPerformanceMonitor: "Show Performance monitor"
};
var str_19 = i18n37.i18n.registerUIStrings("panels/performance_monitor/performance_monitor-meta.ts", UIStrings19);
var i18nLazyString19 = i18n37.i18n.getLazilyComputedLocalizedString.bind(void 0, str_19);
var loadedPerformanceMonitorModule;
async function loadPerformanceMonitorModule() {
  if (!loadedPerformanceMonitorModule) {
    loadedPerformanceMonitorModule = await import("./../../panels/performance_monitor/performance_monitor.js");
  }
  return loadedPerformanceMonitorModule;
}
UI19.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "performance.monitor",
  title: i18nLazyString19(UIStrings19.performanceMonitor),
  commandPrompt: i18nLazyString19(UIStrings19.showPerformanceMonitor),
  persistence: "closeable",
  order: 100,
  async loadView() {
    const PerformanceMonitor = await loadPerformanceMonitorModule();
    return new PerformanceMonitor.PerformanceMonitor.PerformanceMonitorImpl();
  },
  tags: [
    i18nLazyString19(UIStrings19.performance),
    i18nLazyString19(UIStrings19.systemMonitor),
    i18nLazyString19(UIStrings19.monitor),
    i18nLazyString19(UIStrings19.activity),
    i18nLazyString19(UIStrings19.metrics)
  ]
});

// gen/front_end/panels/timeline/timeline-meta.js
import * as Common12 from "./../../core/common/common.js";
import * as i18n39 from "./../../core/i18n/i18n.js";
import * as SDK7 from "./../../core/sdk/sdk.js";
import * as UI20 from "./../../ui/legacy/legacy.js";
var UIStrings20 = {
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
var str_20 = i18n39.i18n.registerUIStrings("panels/timeline/timeline-meta.ts", UIStrings20);
var i18nLazyString20 = i18n39.i18n.getLazilyComputedLocalizedString.bind(void 0, str_20);
var loadedTimelineModule;
async function loadTimelineModule() {
  if (!loadedTimelineModule) {
    loadedTimelineModule = await import("./../../panels/timeline/timeline.js");
  }
  return loadedTimelineModule;
}
function maybeRetrieveContextTypes5(getClassCallBack) {
  if (loadedTimelineModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedTimelineModule);
}
UI20.ViewManager.registerViewExtension({
  location: "panel",
  id: "timeline",
  title: i18nLazyString20(UIStrings20.performance),
  commandPrompt: i18nLazyString20(UIStrings20.showPerformance),
  order: 50,
  async loadView() {
    const Timeline = await loadTimelineModule();
    return Timeline.TimelinePanel.TimelinePanel.instance();
  }
});
UI20.ActionRegistration.registerActionExtension({
  actionId: "timeline.toggle-recording",
  category: "PERFORMANCE",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  options: [
    {
      value: true,
      title: i18nLazyString20(UIStrings20.record)
    },
    {
      value: false,
      title: i18nLazyString20(UIStrings20.stop)
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
UI20.ActionRegistration.registerActionExtension({
  actionId: "timeline.record-reload",
  iconClass: "refresh",
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  category: "PERFORMANCE",
  title: i18nLazyString20(UIStrings20.recordAndReload),
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
UI20.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.save-to-file",
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString20(UIStrings20.saveProfile),
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
UI20.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.load-from-file",
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString20(UIStrings20.loadProfile),
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
UI20.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-previous-frame",
  category: "PERFORMANCE",
  title: i18nLazyString20(UIStrings20.previousFrame),
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI20.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-next-frame",
  category: "PERFORMANCE",
  title: i18nLazyString20(UIStrings20.nextFrame),
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI20.ActionRegistration.registerActionExtension({
  actionId: "timeline.show-history",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  category: "PERFORMANCE",
  title: i18nLazyString20(UIStrings20.showRecentTimelineSessions),
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI20.ActionRegistration.registerActionExtension({
  actionId: "timeline.previous-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString20(UIStrings20.previousRecording),
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI20.ActionRegistration.registerActionExtension({
  actionId: "timeline.next-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString20(UIStrings20.nextRecording),
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
Common12.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString20(UIStrings20.hideChromeFrameInLayersView),
  settingName: "frame-viewer-hide-chrome-window",
  settingType: "boolean",
  defaultValue: false
});
Common12.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  settingName: "annotations-hidden",
  settingType: "boolean",
  defaultValue: false
});
Common12.Linkifier.registerLinkifier({
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.CLSLinkifier.CLSRect]);
  },
  async loadLinkifier() {
    const Timeline = await loadTimelineModule();
    return Timeline.CLSLinkifier.Linkifier.instance();
  }
});
UI20.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.load-from-file",
  order: 10
});
UI20.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.save-to-file",
  order: 15
});
Common12.Revealer.registerRevealer({
  contextTypes() {
    return [SDK7.TraceObject.TraceObject];
  },
  destination: Common12.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.TraceRevealer();
  }
});
Common12.Revealer.registerRevealer({
  contextTypes() {
    return [SDK7.TraceObject.RevealableEvent];
  },
  destination: Common12.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.EventRevealer();
  }
});
Common12.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes5((Timeline) => [Timeline.Utils.Helpers.RevealableInsight]);
  },
  destination: Common12.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.InsightRevealer();
  }
});

// gen/front_end/panels/web_audio/web_audio-meta.js
import * as i18n41 from "./../../core/i18n/i18n.js";
import * as UI21 from "./../../ui/legacy/legacy.js";
var UIStrings21 = {
  /**
   * @description Title of the WebAudio tool
   */
  webaudio: "WebAudio",
  /**
   * @description A tags of WebAudio tool that can be searched in the command menu
   */
  audio: "audio",
  /**
   * @description Command for showing the WebAudio tool
   */
  showWebaudio: "Show WebAudio"
};
var str_21 = i18n41.i18n.registerUIStrings("panels/web_audio/web_audio-meta.ts", UIStrings21);
var i18nLazyString21 = i18n41.i18n.getLazilyComputedLocalizedString.bind(void 0, str_21);
var loadedWebAudioModule;
async function loadWebAudioModule() {
  if (!loadedWebAudioModule) {
    loadedWebAudioModule = await import("./../../panels/web_audio/web_audio.js");
  }
  return loadedWebAudioModule;
}
UI21.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "web-audio",
  title: i18nLazyString21(UIStrings21.webaudio),
  commandPrompt: i18nLazyString21(UIStrings21.showWebaudio),
  persistence: "closeable",
  order: 100,
  async loadView() {
    const WebAudio = await loadWebAudioModule();
    return new WebAudio.WebAudioView.WebAudioView();
  },
  tags: [i18nLazyString21(UIStrings21.audio)]
});

// gen/front_end/panels/webauthn/webauthn-meta.js
import * as i18n43 from "./../../core/i18n/i18n.js";
import * as UI22 from "./../../ui/legacy/legacy.js";
var UIStrings22 = {
  /**
   * @description Title of WebAuthn tab in bottom drawer.
   */
  webauthn: "WebAuthn",
  /**
   * @description Command for showing the WebAuthn tab in bottom drawer.
   */
  showWebauthn: "Show WebAuthn"
};
var str_22 = i18n43.i18n.registerUIStrings("panels/webauthn/webauthn-meta.ts", UIStrings22);
var i18nLazyString22 = i18n43.i18n.getLazilyComputedLocalizedString.bind(void 0, str_22);
var loadedWebauthnModule;
async function loadWebauthnModule() {
  if (!loadedWebauthnModule) {
    loadedWebauthnModule = await import("./../../panels/webauthn/webauthn.js");
  }
  return loadedWebauthnModule;
}
UI22.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "webauthn-pane",
  title: i18nLazyString22(UIStrings22.webauthn),
  commandPrompt: i18nLazyString22(UIStrings22.showWebauthn),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const Webauthn = await loadWebauthnModule();
    return new Webauthn.WebauthnPane.WebauthnPaneImpl();
  }
});

// gen/front_end/panels/layer_viewer/layer_viewer-meta.js
import * as i18n45 from "./../../core/i18n/i18n.js";
import * as UI23 from "./../../ui/legacy/legacy.js";
var UIStrings23 = {
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
var str_23 = i18n45.i18n.registerUIStrings("panels/layer_viewer/layer_viewer-meta.ts", UIStrings23);
var i18nLazyString23 = i18n45.i18n.getLazilyComputedLocalizedString.bind(void 0, str_23);
UI23.ActionRegistration.registerActionExtension({
  actionId: "layers.reset-view",
  category: "LAYERS",
  title: i18nLazyString23(UIStrings23.resetView),
  bindings: [
    {
      shortcut: "0"
    }
  ]
});
UI23.ActionRegistration.registerActionExtension({
  actionId: "layers.pan-mode",
  category: "LAYERS",
  title: i18nLazyString23(UIStrings23.switchToPanMode),
  bindings: [
    {
      shortcut: "x"
    }
  ]
});
UI23.ActionRegistration.registerActionExtension({
  actionId: "layers.rotate-mode",
  category: "LAYERS",
  title: i18nLazyString23(UIStrings23.switchToRotateMode),
  bindings: [
    {
      shortcut: "v"
    }
  ]
});
UI23.ActionRegistration.registerActionExtension({
  actionId: "layers.zoom-in",
  category: "LAYERS",
  title: i18nLazyString23(UIStrings23.zoomIn),
  bindings: [
    {
      shortcut: "Shift+Plus"
    },
    {
      shortcut: "NumpadPlus"
    }
  ]
});
UI23.ActionRegistration.registerActionExtension({
  actionId: "layers.zoom-out",
  category: "LAYERS",
  title: i18nLazyString23(UIStrings23.zoomOut),
  bindings: [
    {
      shortcut: "Shift+Minus"
    },
    {
      shortcut: "NumpadMinus"
    }
  ]
});
UI23.ActionRegistration.registerActionExtension({
  actionId: "layers.up",
  category: "LAYERS",
  title: i18nLazyString23(UIStrings23.panOrRotateUp),
  bindings: [
    {
      shortcut: "Up"
    },
    {
      shortcut: "w"
    }
  ]
});
UI23.ActionRegistration.registerActionExtension({
  actionId: "layers.down",
  category: "LAYERS",
  title: i18nLazyString23(UIStrings23.panOrRotateDown),
  bindings: [
    {
      shortcut: "Down"
    },
    {
      shortcut: "s"
    }
  ]
});
UI23.ActionRegistration.registerActionExtension({
  actionId: "layers.left",
  category: "LAYERS",
  title: i18nLazyString23(UIStrings23.panOrRotateLeft),
  bindings: [
    {
      shortcut: "Left"
    },
    {
      shortcut: "a"
    }
  ]
});
UI23.ActionRegistration.registerActionExtension({
  actionId: "layers.right",
  category: "LAYERS",
  title: i18nLazyString23(UIStrings23.panOrRotateRight),
  bindings: [
    {
      shortcut: "Right"
    },
    {
      shortcut: "d"
    }
  ]
});

// gen/front_end/panels/recorder/recorder-meta.js
import * as i18n47 from "./../../core/i18n/i18n.js";
import * as UI24 from "./../../ui/legacy/legacy.js";
var UIStrings24 = {
  /**
   * @description Title of the Recorder Panel
   */
  recorder: "Recorder",
  /**
   * @description Title of the Recorder Panel
   */
  showRecorder: "Show Recorder",
  /**
   * @description Title of start/stop recording action in command menu
   */
  startStopRecording: "Start/Stop recording",
  /**
   * @description Title of create a new recording action in command menu
   */
  createRecording: "Create a new recording",
  /**
   * @description Title of start a new recording action in command menu
   */
  replayRecording: "Replay recording",
  /**
   * @description Title for toggling code action in command menu
   */
  toggleCode: "Toggle code view"
};
var str_24 = i18n47.i18n.registerUIStrings("panels/recorder/recorder-meta.ts", UIStrings24);
var i18nLazyString24 = i18n47.i18n.getLazilyComputedLocalizedString.bind(void 0, str_24);
var loadedRecorderModule;
async function loadRecorderModule() {
  if (!loadedRecorderModule) {
    loadedRecorderModule = await import("./../../panels/recorder/recorder.js");
  }
  return loadedRecorderModule;
}
function maybeRetrieveContextTypes6(getClassCallBack, actionId) {
  if (loadedRecorderModule === void 0) {
    return [];
  }
  if (actionId && loadedRecorderModule.RecorderPanel.RecorderPanel.instance().isActionPossible(actionId)) {
    return getClassCallBack(loadedRecorderModule);
  }
  return [];
}
var viewId = "chrome-recorder";
UI24.ViewManager.defaultOptionsForTabs[viewId] = true;
UI24.ViewManager.registerViewExtension({
  location: "panel",
  id: viewId,
  commandPrompt: i18nLazyString24(UIStrings24.showRecorder),
  title: i18nLazyString24(UIStrings24.recorder),
  order: 90,
  persistence: "closeable",
  async loadView() {
    const Recorder = await loadRecorderModule();
    return Recorder.RecorderPanel.RecorderPanel.instance();
  }
});
UI24.ActionRegistration.registerActionExtension({
  category: "RECORDER",
  actionId: "chrome-recorder.create-recording",
  title: i18nLazyString24(UIStrings24.createRecording),
  async loadActionDelegate() {
    const Recorder = await loadRecorderModule();
    return new Recorder.RecorderPanel.ActionDelegate();
  }
});
UI24.ActionRegistration.registerActionExtension({
  category: "RECORDER",
  actionId: "chrome-recorder.start-recording",
  title: i18nLazyString24(UIStrings24.startStopRecording),
  contextTypes() {
    return maybeRetrieveContextTypes6(
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
UI24.ActionRegistration.registerActionExtension({
  category: "RECORDER",
  actionId: "chrome-recorder.replay-recording",
  title: i18nLazyString24(UIStrings24.replayRecording),
  contextTypes() {
    return maybeRetrieveContextTypes6(
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
UI24.ActionRegistration.registerActionExtension({
  category: "RECORDER",
  actionId: "chrome-recorder.toggle-code-view",
  title: i18nLazyString24(UIStrings24.toggleCode),
  contextTypes() {
    return maybeRetrieveContextTypes6(
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

// gen/front_end/panels/whats_new/whats_new-meta.js
import * as Common13 from "./../../core/common/common.js";
import * as i18n49 from "./../../core/i18n/i18n.js";
import * as UI25 from "./../../ui/legacy/legacy.js";
var UIStrings25 = {
  /**
   * @description Title of the 'What's New' tool in the bottom drawer
   */
  whatsNew: "What's new",
  /**
   * @description Command for showing the 'What's New' tool in the bottom drawer
   */
  showWhatsNew: "Show what's new",
  /**
   * @description Title of an action in the 'What's New' tool to release notes
   */
  releaseNotes: "Release notes",
  /**
   * @description Title of an action in the 'What's New' tool to file an issue
   */
  reportADevtoolsIssue: "Report a DevTools issue",
  /**
   * @description A search term referring to a software defect (i.e. bug) that can be entered in the command menu
   */
  bug: "bug",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  showWhatsNewAfterEachUpdate: "Show what's new after each update",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  doNotShowWhatsNewAfterEachUpdate: "Don't show what's new after each update"
};
var str_25 = i18n49.i18n.registerUIStrings("panels/whats_new/whats_new-meta.ts", UIStrings25);
var i18nLazyString25 = i18n49.i18n.getLazilyComputedLocalizedString.bind(void 0, str_25);
var loadedHelpModule;
async function loadWhatsNewModule() {
  if (!loadedHelpModule) {
    loadedHelpModule = await import("./../../panels/whats_new/whats_new.js");
  }
  return loadedHelpModule;
}
UI25.ViewManager.maybeRemoveViewExtension("release-note");
UI25.ActionRegistration.maybeRemoveActionExtension("help.release-notes");
UI25.ActionRegistration.maybeRemoveActionExtension("help.report-issue");
Common13.Settings.maybeRemoveSettingExtension("help.show-release-note");
UI25.ContextMenu.maybeRemoveItem({
  location: "mainMenuHelp/default",
  actionId: "help.release-notes",
  order: void 0
});
UI25.ContextMenu.maybeRemoveItem({
  location: "mainMenuHelp/default",
  actionId: "help.report-issue",
  order: void 0
});
Common13.Runnable.maybeRemoveLateInitializationRunnable("whats-new");
UI25.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "release-note",
  title: i18nLazyString25(UIStrings25.whatsNew),
  commandPrompt: i18nLazyString25(UIStrings25.showWhatsNew),
  persistence: "closeable",
  order: 1,
  async loadView() {
    const WhatsNew = await loadWhatsNewModule();
    return new WhatsNew.ReleaseNoteView.ReleaseNoteView();
  }
});
UI25.ActionRegistration.registerActionExtension({
  category: "HELP",
  actionId: "help.release-notes",
  title: i18nLazyString25(UIStrings25.releaseNotes),
  async loadActionDelegate() {
    const WhatsNew = await loadWhatsNewModule();
    return WhatsNew.WhatsNew.ReleaseNotesActionDelegate.instance();
  }
});
UI25.ActionRegistration.registerActionExtension({
  category: "HELP",
  actionId: "help.report-issue",
  title: i18nLazyString25(UIStrings25.reportADevtoolsIssue),
  async loadActionDelegate() {
    const WhatsNew = await loadWhatsNewModule();
    return WhatsNew.WhatsNew.ReportIssueActionDelegate.instance();
  },
  tags: [i18nLazyString25(UIStrings25.bug)]
});
Common13.Settings.registerSettingExtension({
  category: "APPEARANCE",
  title: i18nLazyString25(UIStrings25.showWhatsNewAfterEachUpdate),
  settingName: "help.show-release-note",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString25(UIStrings25.showWhatsNewAfterEachUpdate)
    },
    {
      value: false,
      title: i18nLazyString25(UIStrings25.doNotShowWhatsNewAfterEachUpdate)
    }
  ]
});
UI25.ContextMenu.registerItem({
  location: "mainMenuHelp/default",
  actionId: "help.release-notes",
  order: 10
});
UI25.ContextMenu.registerItem({
  location: "mainMenuHelp/default",
  actionId: "help.report-issue",
  order: 11
});
Common13.Runnable.registerLateInitializationRunnable({
  id: "whats-new",
  async loadRunnable() {
    const WhatsNew = await loadWhatsNewModule();
    return WhatsNew.WhatsNew.HelpLateInitialization.instance();
  }
});

// gen/front_end/entrypoints/devtools_app/devtools_app.prebundle.js
import * as Root6 from "./../../core/root/root.js";
import * as Main from "./../main/main.js";
self.runtime = Root6.Runtime.Runtime.instance({ forceNew: true });
new Main.MainImpl.MainImpl();
//# sourceMappingURL=devtools_app.js.map
