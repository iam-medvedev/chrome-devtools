// gen/front_end/entrypoints/main/main-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Action title to focus the page being debugged.
   */
  focusDebuggee: "Focus page",
  /**
   * @description Action title and shortcut description to toggle the Console drawer.
   */
  toggleDrawer: "Toggle drawer",
  /**
   * @description Title of an action that navigates to the next panel.
   */
  nextPanel: "Next panel",
  /**
   * @description Title of an action that navigates to the previous panel.
   */
  previousPanel: "Previous panel",
  /**
   * @description Title of an action that reloads DevTools.
   */
  reloadDevtools: "Reload DevTools",
  /**
   * @description Title of an action in the main toolbar to restore the last dock position.
   */
  restoreLastDockPosition: "Restore last dock position",
  /**
   * @description Shortcut description and action title to zoom in.
   */
  zoomIn: "Zoom in",
  /**
   * @description Shortcut description and action title to zoom out.
   */
  zoomOut: "Zoom out",
  /**
   * @description Title of an action that resets the zoom level to default.
   */
  resetZoomLevel: "Reset zoom level",
  /**
   * @description Title of an action to search within the current panel.
   */
  searchInPanel: "Search in panel",
  /**
   * @description Title of an action that cancels the current search.
   */
  cancelSearch: "Cancel search",
  /**
   * @description Title of an action that finds the next search result.
   */
  findNextResult: "Find next result",
  /**
   * @description Title of an action to find the previous search result.
   */
  findPreviousResult: "Find previous result",
  /**
   * @description Title of the theme setting under the Appearance category in Settings.
   */
  theme: "Theme:",
  /**
   * @description Command menu option to switch to the browser's preferred color theme.
   */
  switchToBrowserPreferredTheme: "Switch to browser\u2019s preferred theme",
  /**
   * @description Drop-down menu option to match the browser's color theme.
   */
  autoTheme: "Auto",
  /**
   * @description Command menu option to switch to the light color theme.
   */
  switchToLightTheme: "Switch to light theme",
  /**
   * @description Drop-down menu option to select the light color theme.
   */
  lightCapital: "Light",
  /**
   * @description Command menu option to switch to the dark color theme.
   */
  switchToDarkTheme: "Switch to dark theme",
  /**
   * @description Drop-down menu option to select the dark color theme.
   */
  darkCapital: "Dark",
  /**
   * @description Tag for theme preference settings when searched in the command menu.
   */
  darkLower: "dark",
  /**
   * @description Tag for theme preference settings when searched in the command menu.
   */
  lightLower: "light",
  /**
   * @description Title of the panel layout setting under the Appearance category in Settings.
   */
  panelLayout: "Panel layout:",
  /**
   * @description Command menu option to use a horizontal panel layout.
   */
  useHorizontalPanelLayout: "Use horizontal panel layout",
  /**
   * @description Drop-down menu option for horizontal panel layout.
   */
  horizontal: "horizontal",
  /**
   * @description Command menu option to use a vertical panel layout.
   */
  useVerticalPanelLayout: "Use vertical panel layout",
  /**
   * @description Drop-down menu option for vertical panel layout.
   */
  vertical: "vertical",
  /**
   * @description Command menu option to use automatic panel layout.
   */
  useAutomaticPanelLayout: "Use automatic panel layout",
  /**
   * @description Drop-down menu option for automatic panel layout.
   */
  auto: "auto",
  /**
   * @description Checkbox label for the setting to use Ctrl plus number keys to switch panels.
   */
  enableCtrlShortcutToSwitchPanels: "Use Ctrl + 1-9 to switch panels",
  /**
   * @description Checkbox label for the setting to use Command plus number keys to switch panels on Mac.
   */
  enableShortcutToSwitchPanels: "Use \u2318 + 1-9 to switch panels",
  /**
   * @description Drop-down menu option to dock DevTools to the right.
   */
  right: "Right",
  /**
   * @description Title of the action and setting option to dock DevTools to the right of the browser window.
   */
  dockToRight: "Dock to right",
  /**
   * @description Drop-down menu option to dock DevTools to the bottom.
   */
  bottom: "Bottom",
  /**
   * @description Title of the action and setting option to dock DevTools to the bottom of the browser window.
   */
  dockToBottom: "Dock to bottom",
  /**
   * @description Drop-down menu option to dock DevTools to the left.
   */
  left: "Left",
  /**
   * @description Title of the action and setting option to dock DevTools to the left of the browser window.
   */
  dockToLeft: "Dock to left",
  /**
   * @description Drop-down menu option for undocked DevTools in a separate window.
   */
  undocked: "Undocked",
  /**
   * @description Title of the action and setting option to undock DevTools into a separate window.
   */
  undockIntoSeparateWindow: "Undock into separate window",
  /**
   * @description Option label for the default set of DevTools keyboard shortcuts.
   */
  devtoolsDefault: "DevTools (Default)",
  /**
   * @description Title of the language setting that allows users to switch the locale
   * in which DevTools is presented.
   */
  language: "Language:",
  /**
   * @description Users can choose this option when picking the language in which
   * DevTools is presented. Choosing this option means that the DevTools language matches
   * Chrome's UI language.
   */
  browserLanguage: "Browser UI language",
  /**
   * @description Label for a checkbox in the settings UI. Allows developers to opt-in/opt-out
   * of saving settings to their Google account.
   */
  saveSettings: "Save `DevTools` settings to your `Google` account",
  /**
   * @description A command available in the command menu to perform searches, for example in the
   * elements panel, as user types, rather than only when they press Enter.
   */
  searchAsYouTypeSetting: "Search as you type",
  /**
   * @description A command available in the command menu to perform searches, for example in the
   * elements panel, as user types, rather than only when they press Enter.
   */
  searchAsYouTypeCommand: "Enable search as you type",
  /**
   * @description A command available in the command menu to perform searches, for example in the
   * elements panel, only when the user presses Enter.
   */
  searchOnEnterCommand: "Disable search as you type (press Enter to search)",
  /**
   * @description Label of a checkbox under the Appearance category in Settings. Allows developers
   * to opt-in / opt-out of syncing DevTools' color theme with Chrome's color theme.
   */
  matchChromeColorScheme: "Match Chrome color scheme",
  /**
   * @description Tooltip for the learn more link of the Match Chrome color scheme Setting.
   */
  matchChromeColorSchemeDocumentation: "Match DevTools colors to your customized Chrome theme (when enabled)",
  /**
   * @description Command to turn the browser color scheme matching on through the command menu.
   */
  matchChromeColorSchemeCommand: "Match Chrome color scheme",
  /**
   * @description Command to turn the browser color scheme matching off through the command menu.
   */
  dontMatchChromeColorSchemeCommand: "Don\u2019t match Chrome color scheme",
  /**
   * @description Command to toggle the drawer orientation.
   */
  toggleDrawerOrientation: "Toggle drawer orientation"
};
var str_ = i18n.i18n.registerUIStrings("entrypoints/main/main-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedMainModule;
var loadedInspectorMainModule;
async function loadMainModule() {
  if (!loadedMainModule) {
    loadedMainModule = await import("./main.js");
  }
  return loadedMainModule;
}
async function loadInspectorMainModule() {
  if (!loadedInspectorMainModule) {
    loadedInspectorMainModule = await import("./../inspector_main/inspector_main.js");
  }
  return loadedInspectorMainModule;
}
UI.ActionRegistration.registerActionExtension({
  category: "DRAWER",
  actionId: "inspector-main.focus-debuggee",
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule();
    return new InspectorMain.InspectorMain.FocusDebuggeeActionDelegate();
  },
  order: 100,
  title: i18nLazyString(UIStrings.focusDebuggee)
});
UI.ActionRegistration.registerActionExtension({
  category: "DRAWER",
  actionId: "main.toggle-drawer",
  async loadActionDelegate() {
    return new UI.InspectorView.ActionDelegate();
  },
  order: 101,
  title: i18nLazyString(UIStrings.toggleDrawer),
  bindings: [
    {
      shortcut: "Esc"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  category: "DRAWER",
  actionId: "main.toggle-drawer-orientation",
  async loadActionDelegate() {
    return new UI.InspectorView.ActionDelegate();
  },
  title: i18nLazyString(UIStrings.toggleDrawerOrientation),
  bindings: [
    {
      shortcut: "Shift+Esc"
    }
  ],
  condition: (config) => Boolean(config?.devToolsFlexibleLayout?.verticalDrawerEnabled)
});
UI.ActionRegistration.registerActionExtension({
  actionId: "main.next-tab",
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.nextPanel),
  async loadActionDelegate() {
    return new UI.InspectorView.ActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+]"
    },
    {
      platform: "mac",
      shortcut: "Meta+]"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "main.previous-tab",
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.previousPanel),
  async loadActionDelegate() {
    return new UI.InspectorView.ActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+["
    },
    {
      platform: "mac",
      shortcut: "Meta+["
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "main.debug-reload",
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.reloadDevtools),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.ReloadActionDelegate();
  },
  bindings: [
    {
      shortcut: "Alt+R"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.restoreLastDockPosition),
  actionId: "main.toggle-dock",
  async loadActionDelegate() {
    return new UI.DockController.ToggleDockActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+D"
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+D"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "main.zoom-in",
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.zoomIn),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.ZoomActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Plus",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+Plus"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+NumpadPlus"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+NumpadPlus"
    },
    {
      platform: "mac",
      shortcut: "Meta+Plus",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+Plus"
    },
    {
      platform: "mac",
      shortcut: "Meta+NumpadPlus"
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+NumpadPlus"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "main.zoom-out",
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.zoomOut),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.ZoomActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Minus",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+Minus"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+NumpadMinus"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+NumpadMinus"
    },
    {
      platform: "mac",
      shortcut: "Meta+Minus",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+Minus"
    },
    {
      platform: "mac",
      shortcut: "Meta+NumpadMinus"
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+NumpadMinus"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "main.zoom-reset",
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.resetZoomLevel),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.ZoomActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+0"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Numpad0"
    },
    {
      platform: "mac",
      shortcut: "Meta+Numpad0"
    },
    {
      platform: "mac",
      shortcut: "Meta+0"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "main.search-in-panel.find",
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.searchInPanel),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.SearchActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+F",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+F",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "F3"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "main.search-in-panel.cancel",
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.cancelSearch),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.SearchActionDelegate();
  },
  order: 10,
  bindings: [
    {
      shortcut: "Esc"
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "main.search-in-panel.find-next",
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.findNextResult),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.SearchActionDelegate();
  },
  bindings: [
    {
      platform: "mac",
      shortcut: "Meta+G",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+G"
    },
    {
      platform: "windows,linux",
      shortcut: "F3",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
UI.ActionRegistration.registerActionExtension({
  actionId: "main.search-in-panel.find-previous",
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.findPreviousResult),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.SearchActionDelegate();
  },
  bindings: [
    {
      platform: "mac",
      shortcut: "Meta+Shift+G",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+G"
    },
    {
      platform: "windows,linux",
      shortcut: "Shift+F3",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.theme),
  settingName: "ui-theme",
  settingType: "enum",
  defaultValue: "systemPreferred",
  reloadRequired: false,
  options: [
    {
      title: i18nLazyString(UIStrings.switchToBrowserPreferredTheme),
      text: i18nLazyString(UIStrings.autoTheme),
      value: "systemPreferred"
    },
    {
      title: i18nLazyString(UIStrings.switchToLightTheme),
      text: i18nLazyString(UIStrings.lightCapital),
      value: "default"
    },
    {
      title: i18nLazyString(UIStrings.switchToDarkTheme),
      text: i18nLazyString(UIStrings.darkCapital),
      value: "dark"
    }
  ],
  tags: [
    i18nLazyString(UIStrings.darkLower),
    i18nLazyString(UIStrings.lightLower)
  ]
});
Common.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.matchChromeColorScheme),
  settingName: "chrome-theme-colors",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.matchChromeColorSchemeCommand)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.dontMatchChromeColorSchemeCommand)
    }
  ],
  reloadRequired: true,
  learnMore: {
    url: "https://goo.gle/devtools-customize-theme",
    tooltip: i18nLazyString(UIStrings.matchChromeColorSchemeDocumentation)
  }
});
Common.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.panelLayout),
  settingName: "sidebar-position",
  settingType: "enum",
  defaultValue: "auto",
  options: [
    {
      title: i18nLazyString(UIStrings.useHorizontalPanelLayout),
      text: i18nLazyString(UIStrings.horizontal),
      value: "bottom"
    },
    {
      title: i18nLazyString(UIStrings.useVerticalPanelLayout),
      text: i18nLazyString(UIStrings.vertical),
      value: "right"
    },
    {
      title: i18nLazyString(UIStrings.useAutomaticPanelLayout),
      text: i18nLazyString(UIStrings.auto),
      value: "auto"
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  settingName: "language",
  settingType: "enum",
  title: i18nLazyString(UIStrings.language),
  defaultValue: "en-US",
  options: [
    {
      value: "browserLanguage",
      title: i18nLazyString(UIStrings.browserLanguage),
      text: i18nLazyString(UIStrings.browserLanguage)
    },
    ...i18n.i18n.getAllSupportedDevToolsLocales().sort().map((locale) => createOptionForLocale(locale))
  ],
  reloadRequired: true
});
Common.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: Host.Platform.platform() === "mac" ? i18nLazyString(UIStrings.enableShortcutToSwitchPanels) : i18nLazyString(UIStrings.enableCtrlShortcutToSwitchPanels),
  settingName: "shortcut-panel-switch",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "GLOBAL",
  settingName: "currentDockState",
  settingType: "enum",
  defaultValue: "right",
  options: [
    {
      value: "right",
      text: i18nLazyString(UIStrings.right),
      title: i18nLazyString(UIStrings.dockToRight)
    },
    {
      value: "bottom",
      text: i18nLazyString(UIStrings.bottom),
      title: i18nLazyString(UIStrings.dockToBottom)
    },
    {
      value: "left",
      text: i18nLazyString(UIStrings.left),
      title: i18nLazyString(UIStrings.dockToLeft)
    },
    {
      value: "undocked",
      text: i18nLazyString(UIStrings.undocked),
      title: i18nLazyString(UIStrings.undockIntoSeparateWindow)
    }
  ]
});
Common.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "active-keybind-set",
  settingType: "enum",
  defaultValue: "devToolsDefault",
  options: [
    {
      value: "devToolsDefault",
      title: i18nLazyString(UIStrings.devtoolsDefault),
      text: i18nLazyString(UIStrings.devtoolsDefault)
    },
    {
      value: "vsCode",
      title: i18n.i18n.lockedLazyString("Visual Studio Code"),
      text: i18n.i18n.lockedLazyString("Visual Studio Code")
    }
  ]
});
function createLazyLocalizedLocaleSettingText(localeString) {
  return () => i18n.i18n.getLocalizedLanguageRegion(localeString, i18n.DevToolsLocale.DevToolsLocale.instance());
}
function createOptionForLocale(localeString) {
  return {
    value: localeString,
    title: createLazyLocalizedLocaleSettingText(localeString),
    text: createLazyLocalizedLocaleSettingText(localeString)
  };
}
Common.Settings.registerSettingExtension({
  category: "ACCOUNT",
  // This name must be kept in sync with DevToolsSettings::kSyncDevToolsPreferencesFrontendName.
  settingName: "sync-preferences",
  settingType: "boolean",
  title: i18nLazyString(UIStrings.saveSettings),
  defaultValue: false,
  reloadRequired: true
});
Common.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "user-shortcuts",
  settingType: "array",
  defaultValue: []
});
Common.Settings.registerSettingExtension({
  category: "GLOBAL",
  storageType: "Local",
  title: i18nLazyString(UIStrings.searchAsYouTypeSetting),
  settingName: "search-as-you-type",
  settingType: "boolean",
  order: 3,
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.searchAsYouTypeCommand)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.searchOnEnterCommand)
    }
  ]
});
UI.ViewManager.registerLocationResolver({
  name: "drawer-view",
  category: "DRAWER",
  async loadResolver() {
    return UI.InspectorView.InspectorView.instance();
  }
});
UI.ViewManager.registerLocationResolver({
  name: "drawer-sidebar",
  category: "DRAWER_SIDEBAR",
  async loadResolver() {
    return UI.InspectorView.InspectorView.instance();
  }
});
UI.ViewManager.registerLocationResolver({
  name: "panel",
  category: "PANEL",
  async loadResolver() {
    return UI.InspectorView.InspectorView.instance();
  }
});
UI.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Workspace.UISourceCode.UISourceCode,
      SDK.Resource.Resource,
      SDK.NetworkRequest.NetworkRequest
    ];
  },
  async loadProvider() {
    return new Components.Linkifier.ContentProviderContextMenuProvider();
  }
});
UI.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Node
    ];
  },
  async loadProvider() {
    return new UI.LinkContextMenuProvider.LinkContextMenuProvider();
  }
});
UI.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Node
    ];
  },
  async loadProvider() {
    return new Components.Linkifier.LinkContextMenuProvider();
  }
});
UI.Toolbar.registerToolbarItem({
  separator: true,
  location: "main-toolbar-left",
  order: 100
});
UI.Toolbar.registerToolbarItem({
  separator: true,
  order: 96,
  location: "main-toolbar-right"
});
UI.Toolbar.registerToolbarItem({
  condition(config) {
    const isFlagEnabled = config?.devToolsGlobalAiButton?.enabled;
    const isGeoRestricted = config?.aidaAvailability?.blockedByGeo === true;
    const isPolicyRestricted = config?.aidaAvailability?.blockedByEnterprisePolicy === true;
    return Boolean(isFlagEnabled && !isGeoRestricted && !isPolicyRestricted);
  },
  loadItem: Common.Lazy.lazy(async () => {
    const Main = await loadMainModule();
    return new Main.GlobalAiButton.GlobalAiButtonToolbarProvider();
  }),
  order: 98,
  location: "main-toolbar-right"
});
UI.Toolbar.registerToolbarItem({
  loadItem: Common.Lazy.lazy(async () => {
    const Main = await loadMainModule();
    return new Main.MainImpl.SettingsButtonProvider();
  }),
  order: 99,
  location: "main-toolbar-right"
});
UI.Toolbar.registerToolbarItem({
  condition: () => !Root.Runtime.Runtime.isTraceApp(),
  loadItem: Common.Lazy.lazy(async () => {
    const Main = await loadMainModule();
    return new Main.MainImpl.MainMenuItem();
  }),
  order: 100,
  location: "main-toolbar-right"
});
UI.Toolbar.registerToolbarItem({
  async loadItem() {
    return UI.DockController.CloseButtonProvider.instance();
  },
  order: 101,
  location: "main-toolbar-right"
});
UI.AppProvider.registerAppProvider({
  async loadAppProvider() {
    const Main = await loadMainModule();
    return new Main.SimpleApp.SimpleAppProvider();
  },
  order: 10
});
//# sourceMappingURL=main-meta.js.map
