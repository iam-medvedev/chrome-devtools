// gen/front_end/entrypoints/main/main-meta.js
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Text in Main
   */
  focusDebuggee: "Focus page",
  /**
   * @description Text in the Shortcuts page in settings to explain a keyboard shortcut
   */
  toggleDrawer: "Toggle drawer",
  /**
   * @description Title of an action that navigates to the next panel
   */
  nextPanel: "Next panel",
  /**
   * @description Title of an action that navigates to the previous panel
   */
  previousPanel: "Previous panel",
  /**
   * @description Title of an action that reloads the DevTools
   */
  reloadDevtools: "Reload DevTools",
  /**
   * @description Title of an action in the main tool to toggle dock
   */
  restoreLastDockPosition: "Restore last dock position",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (zoom in)
   */
  zoomIn: "Zoom in",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (zoom out)
   */
  zoomOut: "Zoom out",
  /**
   * @description Title of an action that reset the zoom level to its default
   */
  resetZoomLevel: "Reset zoom level",
  /**
   * @description Title of an action to search in panel
   */
  searchInPanel: "Search in panel",
  /**
   * @description Title of an action that cancels the current search
   */
  cancelSearch: "Cancel search",
  /**
   * @description Title of an action that finds the next search result
   */
  findNextResult: "Find next result",
  /**
   * @description Title of an action to find the previous search result
   */
  findPreviousResult: "Find previous result",
  /**
   * @description Title of a setting under the Appearance category in Settings
   */
  theme: "Theme:",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  switchToBrowserPreferredTheme: "Switch to browser's preferred theme",
  /**
   * @description A drop-down menu option to switch to the same (light or dark) theme as the browser
   */
  autoTheme: "Auto",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  switchToLightTheme: "Switch to light theme",
  /**
   * @description A drop-down menu option to switch to light theme
   */
  lightCapital: "Light",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  switchToDarkTheme: "Switch to dark theme",
  /**
   * @description A drop-down menu option to switch to dark theme
   */
  darkCapital: "Dark",
  /**
   * @description A tag of theme preference settings that can be searched in the command menu
   */
  darkLower: "dark",
  /**
   * @description A tag of theme preference settings that can be searched in the command menu
   */
  lightLower: "light",
  /**
   * @description Title of a setting under the Appearance category in Settings
   */
  panelLayout: "Panel layout:",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  useHorizontalPanelLayout: "Use horizontal panel layout",
  /**
   * @description A drop-down menu option to use horizontal panel layout
   */
  horizontal: "horizontal",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  useVerticalPanelLayout: "Use vertical panel layout",
  /**
   * @description A drop-down menu option to use vertical panel layout
   */
  vertical: "vertical",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  useAutomaticPanelLayout: "Use automatic panel layout",
  /**
   * @description Text short for automatic
   */
  auto: "auto",
  /**
   * @description Title of a setting under the Appearance category in Settings
   */
  enableCtrlShortcutToSwitchPanels: "Enable Ctrl + 1-9 shortcut to switch panels",
  /**
   * @description (Mac only) Title of a setting under the Appearance category in Settings
   */
  enableShortcutToSwitchPanels: "Enable \u2318 + 1-9 shortcut to switch panels",
  /**
   * @description A drop-down menu option to dock to right
   */
  right: "Right",
  /**
   * @description Text to dock the DevTools to the right of the browser tab
   */
  dockToRight: "Dock to right",
  /**
   * @description A drop-down menu option to dock to bottom
   */
  bottom: "Bottom",
  /**
   * @description Text to dock the DevTools to the bottom of the browser tab
   */
  dockToBottom: "Dock to bottom",
  /**
   * @description A drop-down menu option to dock to left
   */
  left: "Left",
  /**
   * @description Text to dock the DevTools to the left of the browser tab
   */
  dockToLeft: "Dock to left",
  /**
   * @description A drop-down menu option to undock into separate window
   */
  undocked: "Undocked",
  /**
   * @description Text to undock the DevTools
   */
  undockIntoSeparateWindow: "Undock into separate window",
  /**
   * @description Name of the default set of DevTools keyboard shortcuts
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
   * @description Label for a checkbox in the settings UI. Allows developers to opt-in/opt-out
   * of receiving Google Developer Program (GDP) badges based on their activity in Chrome DevTools.
   */
  earnBadges: "Earn badges",
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
  dontMatchChromeColorSchemeCommand: "Don't match Chrome color scheme",
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
    loadedMainModule = await import("./../main/main.js");
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
    const Main2 = await loadMainModule();
    return new Main2.MainImpl.ReloadActionDelegate();
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
    const Main2 = await loadMainModule();
    return new Main2.MainImpl.ZoomActionDelegate();
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
    const Main2 = await loadMainModule();
    return new Main2.MainImpl.ZoomActionDelegate();
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
    const Main2 = await loadMainModule();
    return new Main2.MainImpl.ZoomActionDelegate();
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
    const Main2 = await loadMainModule();
    return new Main2.MainImpl.SearchActionDelegate();
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
    const Main2 = await loadMainModule();
    return new Main2.MainImpl.SearchActionDelegate();
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
    const Main2 = await loadMainModule();
    return new Main2.MainImpl.SearchActionDelegate();
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
    const Main2 = await loadMainModule();
    return new Main2.MainImpl.SearchActionDelegate();
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
  category: "ACCOUNT",
  settingName: "receive-gdp-badges",
  settingType: "boolean",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.earnBadges),
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
  },
  experiment: void 0
});
UI.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Node
    ];
  },
  async loadProvider() {
    return new UI.XLink.ContextMenuProvider();
  },
  experiment: void 0
});
UI.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Node
    ];
  },
  async loadProvider() {
    return new Components.Linkifier.LinkContextMenuProvider();
  },
  experiment: void 0
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
    const devtoolsLocale = i18n.DevToolsLocale.DevToolsLocale.instance();
    const isLocaleRestricted = !devtoolsLocale.locale.startsWith("en-");
    const isGeoRestricted = config?.aidaAvailability?.blockedByGeo === true;
    const isPolicyRestricted = config?.aidaAvailability?.blockedByEnterprisePolicy === true;
    const isAgeRestricted = Boolean(config?.aidaAvailability?.blockedByAge);
    return Boolean(isFlagEnabled && !isLocaleRestricted && !isGeoRestricted && !isPolicyRestricted && !isAgeRestricted);
  },
  async loadItem() {
    const Main2 = await loadMainModule();
    return Main2.GlobalAiButton.GlobalAiButtonToolbarProvider.instance();
  },
  order: 98,
  location: "main-toolbar-right"
});
UI.Toolbar.registerToolbarItem({
  async loadItem() {
    const Main2 = await loadMainModule();
    return Main2.MainImpl.SettingsButtonProvider.instance();
  },
  order: 99,
  location: "main-toolbar-right"
});
UI.Toolbar.registerToolbarItem({
  async loadItem() {
    const Main2 = await loadMainModule();
    return Main2.MainImpl.MainMenuItem.instance();
  },
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
Common.AppProvider.registerAppProvider({
  async loadAppProvider() {
    const Main2 = await loadMainModule();
    return Main2.SimpleApp.SimpleAppProvider.instance();
  },
  order: 10
});

// gen/front_end/entrypoints/inspector_main/inspector_main-meta.js
import * as Common2 from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
var UIStrings2 = {
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
var str_2 = i18n3.i18n.registerUIStrings("entrypoints/inspector_main/inspector_main-meta.ts", UIStrings2);
var i18nLazyString2 = i18n3.i18n.getLazilyComputedLocalizedString.bind(void 0, str_2);
var loadedInspectorMainModule2;
async function loadInspectorMainModule2() {
  if (!loadedInspectorMainModule2) {
    loadedInspectorMainModule2 = await import("./../inspector_main/inspector_main.js");
  }
  return loadedInspectorMainModule2;
}
UI2.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "rendering",
  title: i18nLazyString2(UIStrings2.rendering),
  commandPrompt: i18nLazyString2(UIStrings2.showRendering),
  persistence: "closeable",
  order: 50,
  async loadView() {
    const InspectorMain = await loadInspectorMainModule2();
    return new InspectorMain.RenderingOptions.RenderingOptionsView();
  },
  tags: [
    i18nLazyString2(UIStrings2.paint),
    i18nLazyString2(UIStrings2.layout),
    i18nLazyString2(UIStrings2.fps),
    i18nLazyString2(UIStrings2.cssMediaType),
    i18nLazyString2(UIStrings2.cssMediaFeature),
    i18nLazyString2(UIStrings2.visionDeficiency),
    i18nLazyString2(UIStrings2.colorVisionDeficiency)
  ]
});
UI2.ActionRegistration.registerActionExtension({
  category: "NAVIGATION",
  actionId: "inspector-main.reload",
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule2();
    return new InspectorMain.InspectorMain.ReloadActionDelegate();
  },
  iconClass: "refresh",
  title: i18nLazyString2(UIStrings2.reloadPage),
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
UI2.ActionRegistration.registerActionExtension({
  category: "NAVIGATION",
  actionId: "inspector-main.hard-reload",
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule2();
    return new InspectorMain.InspectorMain.ReloadActionDelegate();
  },
  title: i18nLazyString2(UIStrings2.hardReloadPage),
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
UI2.ActionRegistration.registerActionExtension({
  actionId: "rendering.toggle-prefers-color-scheme",
  category: "RENDERING",
  title: i18nLazyString2(UIStrings2.toggleCssPrefersColorSchemeMedia),
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule2();
    return new InspectorMain.RenderingOptions.ReloadActionDelegate();
  }
});
Common2.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString2(UIStrings2.forceAdBlocking),
  settingName: "network.ad-blocking-enabled",
  settingType: "boolean",
  storageType: "Session",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.blockAds)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.showAds)
    }
  ]
});
Common2.Settings.registerSettingExtension({
  category: "GLOBAL",
  storageType: "Synced",
  title: i18nLazyString2(UIStrings2.autoOpenDevTools),
  settingName: "auto-attach-to-created-pages",
  settingType: "boolean",
  order: 2,
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.autoOpenDevTools)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.doNotAutoOpen)
    }
  ]
});
Common2.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: i18nLazyString2(UIStrings2.disablePaused),
  settingName: "disable-paused-state-overlay",
  settingType: "boolean",
  defaultValue: false
});
UI2.Toolbar.registerToolbarItem({
  async loadItem() {
    const InspectorMain = await loadInspectorMainModule2();
    return InspectorMain.InspectorMain.NodeIndicator.instance();
  },
  order: 2,
  location: "main-toolbar-left"
});
UI2.Toolbar.registerToolbarItem({
  async loadItem() {
    const InspectorMain = await loadInspectorMainModule2();
    return InspectorMain.OutermostTargetSelector.OutermostTargetSelector.instance();
  },
  order: 97,
  location: "main-toolbar-right"
});

// gen/front_end/core/sdk/sdk-meta.js
import * as Common3 from "./../../core/common/common.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
var UIStrings3 = {
  /**
   * @description Title of a setting under the Console category that can be invoked through the Command Menu
   */
  preserveLogUponNavigation: "Preserve log upon navigation",
  /**
   * @description Title of a setting under the Console category that can be invoked through the Command Menu
   */
  doNotPreserveLogUponNavigation: "Do not preserve log upon navigation",
  /**
   * @description Text for pausing the debugger on exceptions
   */
  pauseOnExceptions: "Pause on exceptions",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu
   */
  doNotPauseOnExceptions: "Do not pause on exceptions",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu
   */
  disableJavascript: "Disable JavaScript",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu
   */
  enableJavascript: "Enable JavaScript",
  /**
   * @description Title of a setting under the Debugger category in Settings
   */
  disableAsyncStackTraces: "Disable async stack traces",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu
   */
  doNotCaptureAsyncStackTraces: "Do not capture async stack traces",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu
   */
  captureAsyncStackTraces: "Capture async stack traces",
  /**
   * @description Text of a setting that  turn on the measuring rulers when hover over a target
   */
  showRulersOnHover: "Show rulers on hover",
  /**
   * @description Text of a setting that do turn off the measuring rulers when hover over a target
   */
  doNotShowRulersOnHover: "Do not show rulers on hover",
  /**
   * @description Title of a setting that turns on grid area name labels
   */
  showAreaNames: "Show area names",
  /**
   * @description Title of a setting under the Grid category that turns CSS Grid Area highlighting on
   */
  showGridNamedAreas: "Show grid named areas",
  /**
   * @description Title of a setting under the Grid category that turns CSS Grid Area highlighting off
   */
  doNotShowGridNamedAreas: "Do not show grid named areas",
  /**
   * @description Title of a setting that turns on grid track size labels
   */
  showTrackSizes: "Show track sizes",
  /**
   * @description Title for CSS Grid tooling option
   */
  showGridTrackSizes: "Show grid track sizes",
  /**
   * @description Title for CSS Grid tooling option
   */
  doNotShowGridTrackSizes: "Do not show grid track sizes",
  /**
   * @description Title of a setting that turns on grid extension lines
   */
  extendGridLines: "Extend grid lines",
  /**
   * @description Title of a setting that turns off the grid extension lines
   */
  doNotExtendGridLines: "Do not extend grid lines",
  /**
   * @description Title of a setting that turns on grid line labels
   */
  showLineLabels: "Show line labels",
  /**
   * @description Title of a setting that turns off the grid line labels
   */
  hideLineLabels: "Hide line labels",
  /**
   * @description Title of a setting that turns on grid line number labels
   */
  showLineNumbers: "Show line numbers",
  /**
   * @description Title of a setting that turns on grid line name labels
   */
  showLineNames: "Show line names",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  showPaintFlashingRectangles: "Show paint flashing rectangles",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  hidePaintFlashingRectangles: "Hide paint flashing rectangles",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  showLayoutShiftRegions: "Show layout shift regions",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  hideLayoutShiftRegions: "Hide layout shift regions",
  /**
   * @description Text to highlight the rendering frames for ads
   */
  highlightAdFrames: "Highlight ad frames",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  doNotHighlightAdFrames: "Do not highlight ad frames",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  showLayerBorders: "Show layer borders",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  hideLayerBorders: "Hide layer borders",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  showFramesPerSecondFpsMeter: "Show frames per second (FPS) meter",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  hideFramesPerSecondFpsMeter: "Hide frames per second (FPS) meter",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  showScrollPerformanceBottlenecks: "Show scroll performance bottlenecks",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  hideScrollPerformanceBottlenecks: "Hide scroll performance bottlenecks",
  /**
   * @description Title of a Rendering setting that can be invoked through the Command Menu
   */
  emulateAFocusedPage: "Emulate a focused page",
  /**
   * @description Title of a Rendering setting that can be invoked through the Command Menu
   */
  doNotEmulateAFocusedPage: "Do not emulate a focused page",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  doNotEmulateCssMediaType: "Do not emulate CSS media type",
  /**
   * @description A drop-down menu option to do not emulate css media type
   */
  noEmulation: "No emulation",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  emulateCssPrintMediaType: "Emulate CSS print media type",
  /**
   * @description A drop-down menu option to emulate css print media type
   */
  print: "print",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  emulateCssScreenMediaType: "Emulate CSS screen media type",
  /**
   * @description A drop-down menu option to emulate css screen media type
   */
  screen: "screen",
  /**
   * @description A tag of Emulate CSS screen media type setting that can be searched in the command menu
   */
  query: "query",
  /**
   * @description Title of a setting under the Rendering drawer
   */
  emulateCssMediaType: "Emulate CSS media type",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   * @example {prefers-color-scheme} PH1
   */
  doNotEmulateCss: "Do not emulate CSS {PH1}",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   * @example {prefers-color-scheme: light} PH1
   */
  emulateCss: "Emulate CSS {PH1}",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   * @example {prefers-color-scheme} PH1
   */
  emulateCssMediaFeature: "Emulate CSS media feature {PH1}",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  doNotEmulateAnyVisionDeficiency: "Do not emulate any vision deficiency",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateBlurredVision: "Emulate blurred vision",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateReducedContrast: "Emulate reduced contrast",
  /**
   * @description Name of a vision deficiency that can be emulated via the Rendering drawer
   */
  blurredVision: "Blurred vision",
  /**
   * @description Name of a vision deficiency that can be emulated via the Rendering drawer
   */
  reducedContrast: "Reduced contrast",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateProtanopia: "Emulate protanopia (no red)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer
   */
  protanopia: "Protanopia (no red)",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateDeuteranopia: "Emulate deuteranopia (no green)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer
   */
  deuteranopia: "Deuteranopia (no green)",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateTritanopia: "Emulate tritanopia (no blue)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer
   */
  tritanopia: "Tritanopia (no blue)",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateAchromatopsia: "Emulate achromatopsia (no color)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer
   */
  achromatopsia: "Achromatopsia (no color)",
  /**
   * @description Title of a setting under the Rendering drawer
   */
  emulateVisionDeficiencies: "Emulate vision deficiencies",
  /**
   * @description Title of a setting under the Rendering drawer
   */
  emulateOsTextScale: "Emulate OS text scale",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  doNotEmulateOsTextScale: "Do not emulate OS text scale",
  /**
   * @description A drop-down menu option to not emulate OS text scale
   */
  osTextScaleEmulationNone: "No emulation",
  /**
   * @description A drop-down menu option to emulate an OS text scale 85%
   */
  osTextScaleEmulation85: "85%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 100%
   */
  osTextScaleEmulation100: "100% (default)",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 115%
   */
  osTextScaleEmulation115: "115%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 130%
   */
  osTextScaleEmulation130: "130%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 150%
   */
  osTextScaleEmulation150: "150%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 180%
   */
  osTextScaleEmulation180: "180%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 200%
   */
  osTextScaleEmulation200: "200%",
  /**
   * @description Text that refers to disabling local fonts
   */
  disableLocalFonts: "Disable local fonts",
  /**
   * @description Text that refers to enabling local fonts
   */
  enableLocalFonts: "Enable local fonts",
  /**
   * @description Title of a setting that disables AVIF format
   */
  disableAvifFormat: "Disable `AVIF` format",
  /**
   * @description Title of a setting that enables AVIF format
   */
  enableAvifFormat: "Enable `AVIF` format",
  /**
   * @description Title of a setting that disables WebP format
   */
  disableWebpFormat: "Disable `WebP` format",
  /**
   * @description Title of a setting that enables WebP format
   */
  enableWebpFormat: "Enable `WebP` format",
  /**
   * @description Title of a setting under the Console category in Settings
   */
  customFormatters: "Custom formatters",
  /**
   * @description Title of a setting under the Network category
   */
  networkRequestBlocking: "Network request blocking",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  enableNetworkRequestBlocking: "Enable network request blocking",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  disableNetworkRequestBlocking: "Disable network request blocking",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  enableCache: "Enable cache",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  disableCache: "Disable cache while DevTools is open",
  /**
   * @description The name of a checkbox setting in the Rendering tool. This setting
   * emulates that the webpage is in auto dark mode.
   */
  emulateAutoDarkMode: "Emulate auto dark mode",
  /**
   * @description Label of a checkbox in the DevTools settings UI.
   */
  enableRemoteFileLoading: "Allow `DevTools` to load resources, such as source maps, from remote file paths. Disabled by default for security reasons.",
  /**
   * @description Tooltip text for a setting that controls the network cache. Disabling the network cache can simulate the network connections of users that are visiting a page for the first time.
   */
  networkCacheExplanation: "Disabling the network cache will simulate a network experience similar to a first time visitor."
};
var str_3 = i18n5.i18n.registerUIStrings("core/sdk/sdk-meta.ts", UIStrings3);
var i18nLazyString3 = i18n5.i18n.getLazilyComputedLocalizedString.bind(void 0, str_3);
Common3.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "skip-stack-frames-pattern",
  settingType: "regex",
  defaultValue: "/node_modules/|^node:"
});
Common3.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "skip-content-scripts",
  settingType: "boolean",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "automatically-ignore-list-known-third-party-scripts",
  settingType: "boolean",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "skip-anonymous-scripts",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "enable-ignore-listing",
  settingType: "boolean",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  category: "CONSOLE",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.preserveLogUponNavigation),
  settingName: "preserve-console-log",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.preserveLogUponNavigation)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.doNotPreserveLogUponNavigation)
    }
  ]
});
Common3.Settings.registerSettingExtension({
  category: "DEBUGGER",
  settingName: "pause-on-exception-enabled",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.pauseOnExceptions)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.doNotPauseOnExceptions)
    }
  ]
});
Common3.Settings.registerSettingExtension({
  settingName: "pause-on-caught-exception",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  settingName: "pause-on-uncaught-exception",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "DEBUGGER",
  title: i18nLazyString3(UIStrings3.disableJavascript),
  settingName: "java-script-disabled",
  settingType: "boolean",
  storageType: "Session",
  order: 1,
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.disableJavascript)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.enableJavascript)
    }
  ]
});
Common3.Settings.registerSettingExtension({
  category: "DEBUGGER",
  title: i18nLazyString3(UIStrings3.disableAsyncStackTraces),
  settingName: "disable-async-stack-traces",
  settingType: "boolean",
  defaultValue: false,
  order: 2,
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.doNotCaptureAsyncStackTraces)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.captureAsyncStackTraces)
    }
  ]
});
Common3.Settings.registerSettingExtension({
  category: "DEBUGGER",
  settingName: "breakpoints-active",
  settingType: "boolean",
  storageType: "Session",
  defaultValue: true
});
Common3.Settings.registerSettingExtension({
  category: "ELEMENTS",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.showRulersOnHover),
  settingName: "show-metrics-rulers",
  settingType: "boolean",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.showRulersOnHover)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.doNotShowRulersOnHover)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "GRID",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.showAreaNames),
  settingName: "show-grid-areas",
  settingType: "boolean",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.showGridNamedAreas)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.doNotShowGridNamedAreas)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "GRID",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.showTrackSizes),
  settingName: "show-grid-track-sizes",
  settingType: "boolean",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.showGridTrackSizes)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.doNotShowGridTrackSizes)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "GRID",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.extendGridLines),
  settingName: "extend-grid-lines",
  settingType: "boolean",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.extendGridLines)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.doNotExtendGridLines)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "GRID",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.showLineLabels),
  settingName: "show-grid-line-labels",
  settingType: "enum",
  options: [
    {
      title: i18nLazyString3(UIStrings3.hideLineLabels),
      text: i18nLazyString3(UIStrings3.hideLineLabels),
      value: "none"
    },
    {
      title: i18nLazyString3(UIStrings3.showLineNumbers),
      text: i18nLazyString3(UIStrings3.showLineNumbers),
      value: "lineNumbers"
    },
    {
      title: i18nLazyString3(UIStrings3.showLineNames),
      text: i18nLazyString3(UIStrings3.showLineNames),
      value: "lineNames"
    }
  ],
  defaultValue: "lineNumbers"
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-paint-rects",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.showPaintFlashingRectangles)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.hidePaintFlashingRectangles)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-layout-shift-regions",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.showLayoutShiftRegions)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.hideLayoutShiftRegions)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-ad-highlights",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.highlightAdFrames)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.doNotHighlightAdFrames)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-debug-borders",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.showLayerBorders)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.hideLayerBorders)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-fps-counter",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.showFramesPerSecondFpsMeter)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.hideFramesPerSecondFpsMeter)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-scroll-bottleneck-rects",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.showScrollPerformanceBottlenecks)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.hideScrollPerformanceBottlenecks)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  title: i18nLazyString3(UIStrings3.emulateAFocusedPage),
  settingName: "emulate-page-focus",
  settingType: "boolean",
  storageType: "Local",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.emulateAFocusedPage)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.doNotEmulateAFocusedPage)
    }
  ]
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-css-media",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString3(UIStrings3.doNotEmulateCssMediaType),
      text: i18nLazyString3(UIStrings3.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCssPrintMediaType),
      text: i18nLazyString3(UIStrings3.print),
      value: "print"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCssScreenMediaType),
      text: i18nLazyString3(UIStrings3.screen),
      value: "screen"
    }
  ],
  tags: [
    i18nLazyString3(UIStrings3.query)
  ],
  title: i18nLazyString3(UIStrings3.emulateCssMediaType)
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-css-media-feature-prefers-color-scheme",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString3(UIStrings3.doNotEmulateCss, { PH1: "prefers-color-scheme" }),
      text: i18nLazyString3(UIStrings3.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "prefers-color-scheme: light" }),
      text: i18n5.i18n.lockedLazyString("prefers-color-scheme: light"),
      value: "light"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "prefers-color-scheme: dark" }),
      text: i18n5.i18n.lockedLazyString("prefers-color-scheme: dark"),
      value: "dark"
    }
  ],
  tags: [
    i18nLazyString3(UIStrings3.query)
  ],
  title: i18nLazyString3(UIStrings3.emulateCssMediaFeature, { PH1: "prefers-color-scheme" })
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-css-media-feature-forced-colors",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString3(UIStrings3.doNotEmulateCss, { PH1: "forced-colors" }),
      text: i18nLazyString3(UIStrings3.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "forced-colors: active" }),
      text: i18n5.i18n.lockedLazyString("forced-colors: active"),
      value: "active"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "forced-colors: none" }),
      text: i18n5.i18n.lockedLazyString("forced-colors: none"),
      value: "none"
    }
  ],
  tags: [
    i18nLazyString3(UIStrings3.query)
  ],
  title: i18nLazyString3(UIStrings3.emulateCssMediaFeature, { PH1: "forced-colors" })
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-css-media-feature-prefers-reduced-motion",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString3(UIStrings3.doNotEmulateCss, { PH1: "prefers-reduced-motion" }),
      text: i18nLazyString3(UIStrings3.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "prefers-reduced-motion: reduce" }),
      text: i18n5.i18n.lockedLazyString("prefers-reduced-motion: reduce"),
      value: "reduce"
    }
  ],
  tags: [
    i18nLazyString3(UIStrings3.query)
  ],
  title: i18nLazyString3(UIStrings3.emulateCssMediaFeature, { PH1: "prefers-reduced-motion" })
});
Common3.Settings.registerSettingExtension({
  settingName: "emulated-css-media-feature-prefers-contrast",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString3(UIStrings3.doNotEmulateCss, { PH1: "prefers-contrast" }),
      text: i18nLazyString3(UIStrings3.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "prefers-contrast: more" }),
      text: i18n5.i18n.lockedLazyString("prefers-contrast: more"),
      value: "more"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "prefers-contrast: less" }),
      text: i18n5.i18n.lockedLazyString("prefers-contrast: less"),
      value: "less"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "prefers-contrast: custom" }),
      text: i18n5.i18n.lockedLazyString("prefers-contrast: custom"),
      value: "custom"
    }
  ],
  tags: [
    i18nLazyString3(UIStrings3.query)
  ],
  title: i18nLazyString3(UIStrings3.emulateCssMediaFeature, { PH1: "prefers-contrast" })
});
Common3.Settings.registerSettingExtension({
  settingName: "emulated-css-media-feature-prefers-reduced-data",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString3(UIStrings3.doNotEmulateCss, { PH1: "prefers-reduced-data" }),
      text: i18nLazyString3(UIStrings3.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "prefers-reduced-data: reduce" }),
      text: i18n5.i18n.lockedLazyString("prefers-reduced-data: reduce"),
      value: "reduce"
    }
  ],
  title: i18nLazyString3(UIStrings3.emulateCssMediaFeature, { PH1: "prefers-reduced-data" })
});
Common3.Settings.registerSettingExtension({
  settingName: "emulated-css-media-feature-prefers-reduced-transparency",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString3(UIStrings3.doNotEmulateCss, { PH1: "prefers-reduced-transparency" }),
      text: i18nLazyString3(UIStrings3.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "prefers-reduced-transparency: reduce" }),
      text: i18n5.i18n.lockedLazyString("prefers-reduced-transparency: reduce"),
      value: "reduce"
    }
  ],
  title: i18nLazyString3(UIStrings3.emulateCssMediaFeature, { PH1: "prefers-reduced-transparency" })
});
Common3.Settings.registerSettingExtension({
  settingName: "emulated-css-media-feature-color-gamut",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString3(UIStrings3.doNotEmulateCss, { PH1: "color-gamut" }),
      text: i18nLazyString3(UIStrings3.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "color-gamut: srgb" }),
      text: i18n5.i18n.lockedLazyString("color-gamut: srgb"),
      value: "srgb"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "color-gamut: p3" }),
      text: i18n5.i18n.lockedLazyString("color-gamut: p3"),
      value: "p3"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateCss, { PH1: "color-gamut: rec2020" }),
      text: i18n5.i18n.lockedLazyString("color-gamut: rec2020"),
      value: "rec2020"
    }
  ],
  title: i18nLazyString3(UIStrings3.emulateCssMediaFeature, { PH1: "color-gamut" })
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-vision-deficiency",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "none",
  options: [
    {
      title: i18nLazyString3(UIStrings3.doNotEmulateAnyVisionDeficiency),
      text: i18nLazyString3(UIStrings3.noEmulation),
      value: "none"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateBlurredVision),
      text: i18nLazyString3(UIStrings3.blurredVision),
      value: "blurredVision"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateReducedContrast),
      text: i18nLazyString3(UIStrings3.reducedContrast),
      value: "reducedContrast"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateProtanopia),
      text: i18nLazyString3(UIStrings3.protanopia),
      value: "protanopia"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateDeuteranopia),
      text: i18nLazyString3(UIStrings3.deuteranopia),
      value: "deuteranopia"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateTritanopia),
      text: i18nLazyString3(UIStrings3.tritanopia),
      value: "tritanopia"
    },
    {
      title: i18nLazyString3(UIStrings3.emulateAchromatopsia),
      text: i18nLazyString3(UIStrings3.achromatopsia),
      value: "achromatopsia"
    }
  ],
  tags: [
    i18nLazyString3(UIStrings3.query)
  ],
  title: i18nLazyString3(UIStrings3.emulateVisionDeficiencies)
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-os-text-scale",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString3(UIStrings3.doNotEmulateOsTextScale),
      text: i18nLazyString3(UIStrings3.osTextScaleEmulationNone),
      value: ""
    },
    {
      title: i18nLazyString3(UIStrings3.osTextScaleEmulation85),
      text: i18nLazyString3(UIStrings3.osTextScaleEmulation85),
      value: "0.85"
    },
    {
      title: i18nLazyString3(UIStrings3.osTextScaleEmulation100),
      text: i18nLazyString3(UIStrings3.osTextScaleEmulation100),
      value: "1"
    },
    {
      title: i18nLazyString3(UIStrings3.osTextScaleEmulation115),
      text: i18nLazyString3(UIStrings3.osTextScaleEmulation115),
      value: "1.15"
    },
    {
      title: i18nLazyString3(UIStrings3.osTextScaleEmulation130),
      text: i18nLazyString3(UIStrings3.osTextScaleEmulation130),
      value: "1.3"
    },
    {
      title: i18nLazyString3(UIStrings3.osTextScaleEmulation150),
      text: i18nLazyString3(UIStrings3.osTextScaleEmulation150),
      value: "1.5"
    },
    {
      title: i18nLazyString3(UIStrings3.osTextScaleEmulation180),
      text: i18nLazyString3(UIStrings3.osTextScaleEmulation180),
      value: "1.8"
    },
    {
      title: i18nLazyString3(UIStrings3.osTextScaleEmulation200),
      text: i18nLazyString3(UIStrings3.osTextScaleEmulation200),
      value: "2"
    }
  ],
  tags: [
    i18nLazyString3(UIStrings3.query)
  ],
  title: i18nLazyString3(UIStrings3.emulateOsTextScale)
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "local-fonts-disabled",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.disableLocalFonts)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.enableLocalFonts)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "avif-format-disabled",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.disableAvifFormat)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.enableAvifFormat)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "webp-format-disabled",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.disableWebpFormat)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.enableWebpFormat)
    }
  ],
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "CONSOLE",
  title: i18nLazyString3(UIStrings3.customFormatters),
  settingName: "custom-formatters",
  settingType: "boolean",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString3(UIStrings3.networkRequestBlocking),
  settingName: "request-blocking-enabled",
  settingType: "boolean",
  storageType: "Local",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.enableNetworkRequestBlocking)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.disableNetworkRequestBlocking)
    }
  ]
});
Common3.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString3(UIStrings3.disableCache),
  settingName: "cache-disabled",
  settingType: "boolean",
  order: 0,
  defaultValue: false,
  userActionCondition: "hasOtherClients",
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.disableCache)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.enableCache)
    }
  ],
  learnMore: {
    tooltip: i18nLazyString3(UIStrings3.networkCacheExplanation)
  }
});
Common3.Settings.registerSettingExtension({
  category: "RENDERING",
  title: i18nLazyString3(UIStrings3.emulateAutoDarkMode),
  settingName: "emulate-auto-dark-mode",
  settingType: "boolean",
  storageType: "Session",
  defaultValue: false
});
Common3.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.enableRemoteFileLoading),
  settingName: "network.enable-remote-file-loading",
  settingType: "boolean",
  defaultValue: false
});

// gen/front_end/entrypoints/rehydrated_devtools_app/rehydrated_devtools_app.prebundle.js
import "./../../Images/Images.js";

// gen/front_end/models/logs/logs-meta.js
import * as Common4 from "./../../core/common/common.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
var UIStrings4 = {
  /**
   * @description Text to preserve the log after refreshing
   */
  preserveLog: "Preserve log",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Preserve log on page reload / navigation'. This is an additional search term to help
   * user find the setting even when they don't know the exact name of it.
   */
  preserve: "preserve",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Preserve log on page reload / navigation'. This is an additional search term to help
   * user find the setting even when they don't know the exact name of it.
   */
  clear: "clear",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Preserve log on page reload / navigation'. This is an additional search term to help
   * user find the setting even when they don't know the exact name of it.
   */
  reset: "reset",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  preserveLogOnPageReload: "Preserve log on page reload / navigation",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  doNotPreserveLogOnPageReload: "Do not preserve log on page reload / navigation",
  /**
   * @description Title of an action in the network tool to toggle recording
   */
  recordNetworkLog: "Record network log"
};
var str_4 = i18n7.i18n.registerUIStrings("models/logs/logs-meta.ts", UIStrings4);
var i18nLazyString4 = i18n7.i18n.getLazilyComputedLocalizedString.bind(void 0, str_4);
Common4.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString4(UIStrings4.preserveLog),
  settingName: "network-log.preserve-log",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString4(UIStrings4.preserve),
    i18nLazyString4(UIStrings4.clear),
    i18nLazyString4(UIStrings4.reset)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString4(UIStrings4.preserveLogOnPageReload)
    },
    {
      value: false,
      title: i18nLazyString4(UIStrings4.doNotPreserveLogOnPageReload)
    }
  ]
});
Common4.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString4(UIStrings4.recordNetworkLog),
  settingName: "network-log.record-log",
  settingType: "boolean",
  defaultValue: true,
  storageType: "Session"
});

// gen/front_end/models/persistence/persistence-meta.js
import * as Common5 from "./../../core/common/common.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as Workspace2 from "./../../models/workspace/workspace.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
var UIStrings5 = {
  /**
   * @description Title of a setting under the Persistence category in Settings
   */
  enableLocalOverrides: "Enable Local Overrides",
  /**
   * @description A tag of Enable Local Overrides setting that can be searched in the command menu
   */
  interception: "interception",
  /**
   * @description A tag of Enable Local Overrides setting that can be searched in the command menu
   */
  override: "override",
  /**
   * @description A tag of Group Network by frame setting that can be searched in the command menu
   */
  network: "network",
  /**
   * @description A tag of Enable Local Overrides setting that can be searched in the command menu
   */
  rewrite: "rewrite",
  /**
   * @description A tag of Enable Local Overrides setting that can be searched in the command menu.
   *Noun for network request.
   */
  request: "request",
  /**
   * @description Title of a setting under the Persistence category that can be invoked through the Command Menu
   */
  enableOverrideNetworkRequests: "Enable override network requests",
  /**
   * @description Title of a setting under the Persistence category that can be invoked through the Command Menu
   */
  disableOverrideNetworkRequests: "Disable override network requests"
};
var str_5 = i18n9.i18n.registerUIStrings("models/persistence/persistence-meta.ts", UIStrings5);
var i18nLazyString5 = i18n9.i18n.getLazilyComputedLocalizedString.bind(void 0, str_5);
var loadedPersistenceModule;
async function loadPersistenceModule() {
  if (!loadedPersistenceModule) {
    loadedPersistenceModule = await import("./../../models/persistence/persistence.js");
  }
  return loadedPersistenceModule;
}
Common5.Settings.registerSettingExtension({
  category: "PERSISTENCE",
  title: i18nLazyString5(UIStrings5.enableLocalOverrides),
  settingName: "persistence-network-overrides-enabled",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString5(UIStrings5.interception),
    i18nLazyString5(UIStrings5.override),
    i18nLazyString5(UIStrings5.network),
    i18nLazyString5(UIStrings5.rewrite),
    i18nLazyString5(UIStrings5.request)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString5(UIStrings5.enableOverrideNetworkRequests)
    },
    {
      value: false,
      title: i18nLazyString5(UIStrings5.disableOverrideNetworkRequests)
    }
  ]
});
UI3.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Workspace2.UISourceCode.UISourceCode,
      SDK2.Resource.Resource,
      SDK2.NetworkRequest.NetworkRequest
    ];
  },
  async loadProvider() {
    const Persistence = await loadPersistenceModule();
    return new Persistence.PersistenceActions.ContextMenuProvider();
  },
  experiment: void 0
});

// gen/front_end/panels/browser_debugger/browser_debugger-meta.js
import * as i18n11 from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
var UIStrings6 = {
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
var str_6 = i18n11.i18n.registerUIStrings("panels/browser_debugger/browser_debugger-meta.ts", UIStrings6);
var i18nLazyString6 = i18n11.i18n.getLazilyComputedLocalizedString.bind(void 0, str_6);
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
UI4.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.EventListenerBreakpointsSidebarPane.EventListenerBreakpointsSidebarPane.instance();
  },
  id: "sources.event-listener-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString6(UIStrings6.showEventListenerBreakpoints),
  title: i18nLazyString6(UIStrings6.eventListenerBreakpoints),
  order: 9,
  persistence: "permanent"
});
UI4.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.CSPViolationBreakpointsSidebarPane.CSPViolationBreakpointsSidebarPane();
  },
  id: "sources.csp-violation-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString6(UIStrings6.showCspViolationBreakpoints),
  title: i18nLazyString6(UIStrings6.cspViolationBreakpoints),
  order: 10,
  persistence: "permanent"
});
UI4.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.XHRBreakpointsSidebarPane.XHRBreakpointsSidebarPane.instance();
  },
  id: "sources.xhr-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString6(UIStrings6.showXhrfetchBreakpoints),
  title: i18nLazyString6(UIStrings6.xhrfetchBreakpoints),
  order: 5,
  persistence: "permanent",
  hasToolbar: true
});
UI4.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance();
  },
  id: "sources.dom-breakpoints",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString6(UIStrings6.showDomBreakpoints),
  title: i18nLazyString6(UIStrings6.domBreakpoints),
  order: 7,
  persistence: "permanent"
});
UI4.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.ObjectEventListenersSidebarPane.ObjectEventListenersSidebarPane();
  },
  id: "sources.global-listeners",
  location: "sources.sidebar-bottom",
  commandPrompt: i18nLazyString6(UIStrings6.showGlobalListeners),
  title: i18nLazyString6(UIStrings6.globalListeners),
  order: 8,
  persistence: "permanent",
  hasToolbar: true
});
UI4.ViewManager.registerViewExtension({
  async loadView() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance();
  },
  id: "elements.dom-breakpoints",
  location: "elements-sidebar",
  commandPrompt: i18nLazyString6(UIStrings6.showDomBreakpoints),
  title: i18nLazyString6(UIStrings6.domBreakpoints),
  order: 6,
  persistence: "permanent"
});
UI4.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-network",
  title: i18nLazyString6(UIStrings6.page),
  commandPrompt: i18nLazyString6(UIStrings6.showPage),
  order: 2,
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.NetworkNavigatorView.instance();
  }
});
UI4.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-overrides",
  title: i18nLazyString6(UIStrings6.overrides),
  commandPrompt: i18nLazyString6(UIStrings6.showOverrides),
  order: 4,
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.OverridesNavigatorView.instance();
  }
});
UI4.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-content-scripts",
  title: i18nLazyString6(UIStrings6.contentScripts),
  commandPrompt: i18nLazyString6(UIStrings6.showContentScripts),
  order: 5,
  persistence: "permanent",
  condition: () => Root.Runtime.getPathName() !== "/bundled/worker_app.html",
  async loadView() {
    const Sources = await loadSourcesModule();
    return new Sources.SourcesNavigator.ContentScriptsNavigatorView();
  }
});
UI4.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "browser-debugger.refresh-global-event-listeners",
  async loadActionDelegate() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.ObjectEventListenersSidebarPane.ActionDelegate();
  },
  title: i18nLazyString6(UIStrings6.refreshGlobalListeners),
  iconClass: "refresh",
  contextTypes() {
    return maybeRetrieveContextTypes((BrowserDebugger) => [
      BrowserDebugger.ObjectEventListenersSidebarPane.ObjectEventListenersSidebarPane
    ]);
  }
});
UI4.ContextMenu.registerProvider({
  contextTypes() {
    return [
      SDK3.DOMModel.DOMNode
    ];
  },
  async loadProvider() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.DOMBreakpointsSidebarPane.ContextMenuProvider();
  },
  experiment: void 0
});
UI4.Context.registerListener({
  contextTypes() {
    return [SDK3.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.XHRBreakpointsSidebarPane.XHRBreakpointsSidebarPane.instance();
  }
});
UI4.Context.registerListener({
  contextTypes() {
    return [SDK3.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance();
  }
});

// gen/front_end/panels/developer_resources/developer_resources-meta.js
import * as Common6 from "./../../core/common/common.js";
import * as i18n13 from "./../../core/i18n/i18n.js";
import * as SDK4 from "./../../core/sdk/sdk.js";
import * as UI5 from "./../../ui/legacy/legacy.js";
var UIStrings7 = {
  /**
   * @description Title for developer resources panel
   */
  developerResources: "Developer resources",
  /**
   * @description Command for showing the developer resources panel
   */
  showDeveloperResources: "Show Developer resources"
};
var str_7 = i18n13.i18n.registerUIStrings("panels/developer_resources/developer_resources-meta.ts", UIStrings7);
var i18nLazyString7 = i18n13.i18n.getLazilyComputedLocalizedString.bind(void 0, str_7);
var loadedDeveloperResourcesModule;
async function loadDeveloperResourcesModule() {
  if (!loadedDeveloperResourcesModule) {
    loadedDeveloperResourcesModule = await import("./../../panels/developer_resources/developer_resources.js");
  }
  return loadedDeveloperResourcesModule;
}
UI5.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "developer-resources",
  title: i18nLazyString7(UIStrings7.developerResources),
  commandPrompt: i18nLazyString7(UIStrings7.showDeveloperResources),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const DeveloperResources = await loadDeveloperResourcesModule();
    return new DeveloperResources.DeveloperResourcesView.DeveloperResourcesView();
  }
});
Common6.Revealer.registerRevealer({
  contextTypes() {
    return [SDK4.PageResourceLoader.ResourceKey];
  },
  destination: Common6.Revealer.RevealerDestination.DEVELOPER_RESOURCES_PANEL,
  async loadRevealer() {
    const DeveloperResources = await loadDeveloperResourcesModule();
    return new DeveloperResources.DeveloperResourcesView.DeveloperResourcesRevealer();
  }
});

// gen/front_end/panels/mobile_throttling/mobile_throttling-meta.js
import * as Common7 from "./../../core/common/common.js";
import * as i18n15 from "./../../core/i18n/i18n.js";
import * as UI6 from "./../../ui/legacy/legacy.js";
var UIStrings8 = {
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
var str_8 = i18n15.i18n.registerUIStrings("panels/mobile_throttling/mobile_throttling-meta.ts", UIStrings8);
var i18nLazyString8 = i18n15.i18n.getLazilyComputedLocalizedString.bind(void 0, str_8);
var loadedMobileThrottlingModule;
async function loadMobileThrottlingModule() {
  if (!loadedMobileThrottlingModule) {
    loadedMobileThrottlingModule = await import("./../../panels/mobile_throttling/mobile_throttling.js");
  }
  return loadedMobileThrottlingModule;
}
UI6.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "throttling-conditions",
  title: i18nLazyString8(UIStrings8.throttling),
  commandPrompt: i18nLazyString8(UIStrings8.showThrottling),
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
UI6.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-offline",
  category: "NETWORK",
  title: i18nLazyString8(UIStrings8.goOffline),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString8(UIStrings8.device),
    i18nLazyString8(UIStrings8.throttlingTag)
  ]
});
UI6.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-low-end-mobile",
  category: "NETWORK",
  title: i18nLazyString8(UIStrings8.enableSlowGThrottling),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString8(UIStrings8.device),
    i18nLazyString8(UIStrings8.throttlingTag)
  ]
});
UI6.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-mid-tier-mobile",
  category: "NETWORK",
  title: i18nLazyString8(UIStrings8.enableFastGThrottling),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString8(UIStrings8.device),
    i18nLazyString8(UIStrings8.throttlingTag)
  ]
});
UI6.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-online",
  category: "NETWORK",
  title: i18nLazyString8(UIStrings8.goOnline),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString8(UIStrings8.device),
    i18nLazyString8(UIStrings8.throttlingTag)
  ]
});
Common7.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "custom-network-conditions",
  settingType: "array",
  defaultValue: []
});

// gen/front_end/panels/protocol_monitor/protocol_monitor-meta.js
import * as i18n17 from "./../../core/i18n/i18n.js";
import * as Root2 from "./../../core/root/root.js";
import * as UI7 from "./../../ui/legacy/legacy.js";
var UIStrings9 = {
  /**
   * @description Title of the 'Protocol monitor' tool in the bottom drawer. This is a tool for
   * viewing and inspecting 'protocol' messages which are sent/received by DevTools. 'protocol' here
   * could be left untranslated as this refers to the Chrome DevTools Protocol (CDP) which is a
   * specific API name.
   */
  protocolMonitor: "Protocol monitor",
  /**
   * @description Command for showing the 'Protocol monitor' tool in the bottom drawer
   */
  showProtocolMonitor: "Show Protocol monitor"
};
var str_9 = i18n17.i18n.registerUIStrings("panels/protocol_monitor/protocol_monitor-meta.ts", UIStrings9);
var i18nLazyString9 = i18n17.i18n.getLazilyComputedLocalizedString.bind(void 0, str_9);
var loadedProtocolMonitorModule;
async function loadProtocolMonitorModule() {
  if (!loadedProtocolMonitorModule) {
    loadedProtocolMonitorModule = await import("./../../panels/protocol_monitor/protocol_monitor.js");
  }
  return loadedProtocolMonitorModule;
}
UI7.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "protocol-monitor",
  title: i18nLazyString9(UIStrings9.protocolMonitor),
  commandPrompt: i18nLazyString9(UIStrings9.showProtocolMonitor),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const ProtocolMonitor = await loadProtocolMonitorModule();
    return new ProtocolMonitor.ProtocolMonitor.ProtocolMonitorImpl();
  },
  experiment: "protocol-monitor"
});

// gen/front_end/panels/settings/settings-meta.js
import * as i18n19 from "./../../core/i18n/i18n.js";
import * as UI8 from "./../../ui/legacy/legacy.js";
import * as Common8 from "./../../core/common/common.js";
import * as i18n32 from "./../../core/i18n/i18n.js";
import * as Root3 from "./../../core/root/root.js";
import * as LegacyWrapper from "./../../ui/components/legacy_wrapper/legacy_wrapper.js";
import * as UI22 from "./../../ui/legacy/legacy.js";
var UIStrings10 = {
  /**
   * @description Title of the Devices tab/tool. Devices refers to e.g. phones/tablets.
   */
  devices: "Devices",
  /**
   * @description Command that opens the device emulation view.
   */
  showDevices: "Show Devices"
};
var str_10 = i18n19.i18n.registerUIStrings("panels/settings/emulation/emulation-meta.ts", UIStrings10);
var i18nLazyString10 = i18n19.i18n.getLazilyComputedLocalizedString.bind(void 0, str_10);
var loadedEmulationModule;
async function loadEmulationModule() {
  if (!loadedEmulationModule) {
    loadedEmulationModule = await import("./../../panels/settings/emulation/emulation.js");
  }
  return loadedEmulationModule;
}
UI8.ViewManager.registerViewExtension({
  location: "settings-view",
  commandPrompt: i18nLazyString10(UIStrings10.showDevices),
  title: i18nLazyString10(UIStrings10.devices),
  order: 30,
  async loadView() {
    const Emulation = await loadEmulationModule();
    return new Emulation.DevicesSettingsTab.DevicesSettingsTab();
  },
  id: "devices",
  settings: [
    "standard-emulated-device-list",
    "custom-emulated-device-list"
  ],
  iconName: "devices"
});
var UIStrings22 = {
  /**
   * @description Text for keyboard shortcuts
   */
  shortcuts: "Shortcuts",
  /**
   * @description Text in Settings Screen of the Settings
   */
  preferences: "Preferences",
  /**
   * @description Text in Settings Screen of the Settings
   */
  experiments: "Experiments",
  /**
   * @description Title of Ignore list settings
   */
  ignoreList: "Ignore list",
  /**
   * @description Command for showing the keyboard shortcuts in Settings
   */
  showShortcuts: "Show Shortcuts",
  /**
   * @description Command for showing the preference tab in the Settings Screen
   */
  showPreferences: "Show Preferences",
  /**
   * @description Command for showing the experiments tab in the Settings Screen
   */
  showExperiments: "Show Experiments",
  /**
   * @description Command for showing the Ignore list settings
   */
  showIgnoreList: "Show Ignore list",
  /**
   * @description Name of the Settings view
   */
  settings: "Settings",
  /**
   * @description Text for the documentation of something
   */
  documentation: "Documentation",
  /**
   * @description Text for AI innovation settings
   */
  aiInnovations: "AI innovations",
  /**
   * @description Command for showing the AI innovation settings
   */
  showAiInnovations: "Show AI innovations",
  /**
   * @description Text of a DOM element in Workspace Settings Tab of the Workspace settings in Settings
   */
  workspace: "Workspace",
  /**
   * @description Command for showing the Workspace tool in Settings
   */
  showWorkspace: "Show Workspace settings"
};
var str_22 = i18n32.i18n.registerUIStrings("panels/settings/settings-meta.ts", UIStrings22);
var i18nLazyString22 = i18n32.i18n.getLazilyComputedLocalizedString.bind(void 0, str_22);
var loadedSettingsModule;
async function loadSettingsModule() {
  if (!loadedSettingsModule) {
    loadedSettingsModule = await import("./../../panels/settings/settings.js");
  }
  return loadedSettingsModule;
}
UI22.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "preferences",
  title: i18nLazyString22(UIStrings22.preferences),
  commandPrompt: i18nLazyString22(UIStrings22.showPreferences),
  order: 0,
  async loadView() {
    const Settings22 = await loadSettingsModule();
    return new Settings22.SettingsScreen.GenericSettingsTab();
  },
  iconName: "gear"
});
UI22.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "workspace",
  title: i18nLazyString22(UIStrings22.workspace),
  commandPrompt: i18nLazyString22(UIStrings22.showWorkspace),
  order: 1,
  async loadView() {
    const Settings22 = await loadSettingsModule();
    return new Settings22.WorkspaceSettingsTab.WorkspaceSettingsTab();
  },
  iconName: "folder"
});
UI22.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "chrome-ai",
  title: i18nLazyString22(UIStrings22.aiInnovations),
  commandPrompt: i18nLazyString22(UIStrings22.showAiInnovations),
  order: 2,
  async loadView() {
    const Settings22 = await loadSettingsModule();
    return LegacyWrapper.LegacyWrapper.legacyWrapper(UI22.Widget.VBox, new Settings22.AISettingsTab.AISettingsTab());
  },
  iconName: "button-magic",
  settings: ["console-insights-enabled"],
  condition: (config) => {
    return (config?.aidaAvailability?.enabled && (config?.devToolsConsoleInsights?.enabled || config?.devToolsFreestyler?.enabled)) ?? false;
  }
});
UI22.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "experiments",
  title: i18nLazyString22(UIStrings22.experiments),
  commandPrompt: i18nLazyString22(UIStrings22.showExperiments),
  order: 3,
  experiment: "*",
  async loadView() {
    const Settings22 = await loadSettingsModule();
    return new Settings22.SettingsScreen.ExperimentsSettingsTab();
  },
  iconName: "experiment"
});
UI22.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "blackbox",
  title: i18nLazyString22(UIStrings22.ignoreList),
  commandPrompt: i18nLazyString22(UIStrings22.showIgnoreList),
  order: 4,
  async loadView() {
    const Settings22 = await loadSettingsModule();
    return new Settings22.FrameworkIgnoreListSettingsTab.FrameworkIgnoreListSettingsTab();
  },
  iconName: "clear-list"
});
UI22.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "keybinds",
  title: i18nLazyString22(UIStrings22.shortcuts),
  commandPrompt: i18nLazyString22(UIStrings22.showShortcuts),
  order: 100,
  async loadView() {
    const Settings22 = await loadSettingsModule();
    return new Settings22.KeybindsSettingsTab.KeybindsSettingsTab();
  },
  iconName: "keyboard"
});
UI22.ActionRegistration.registerActionExtension({
  category: "SETTINGS",
  actionId: "settings.show",
  title: i18nLazyString22(UIStrings22.settings),
  async loadActionDelegate() {
    const Settings22 = await loadSettingsModule();
    return new Settings22.SettingsScreen.ActionDelegate();
  },
  iconClass: "gear",
  bindings: [
    {
      shortcut: "F1",
      keybindSets: [
        "devToolsDefault"
      ]
    },
    {
      shortcut: "Shift+?"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+,",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+,",
      keybindSets: [
        "vsCode"
      ]
    }
  ]
});
UI22.ActionRegistration.registerActionExtension({
  category: "SETTINGS",
  actionId: "settings.documentation",
  title: i18nLazyString22(UIStrings22.documentation),
  async loadActionDelegate() {
    const Settings22 = await loadSettingsModule();
    return new Settings22.SettingsScreen.ActionDelegate();
  }
});
UI22.ActionRegistration.registerActionExtension({
  category: "SETTINGS",
  actionId: "settings.shortcuts",
  title: i18nLazyString22(UIStrings22.showShortcuts),
  async loadActionDelegate() {
    const Settings22 = await loadSettingsModule();
    return new Settings22.SettingsScreen.ActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+K Ctrl+S",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+K Meta+S",
      keybindSets: [
        "vsCode"
      ]
    }
  ]
});
UI22.ViewManager.registerLocationResolver({
  name: "settings-view",
  category: "SETTINGS",
  async loadResolver() {
    const Settings22 = await loadSettingsModule();
    return Settings22.SettingsScreen.SettingsScreen.instance();
  }
});
Common8.Revealer.registerRevealer({
  contextTypes() {
    return [
      Common8.Settings.Setting,
      Root3.Runtime.Experiment
    ];
  },
  destination: void 0,
  async loadRevealer() {
    const Settings22 = await loadSettingsModule();
    return new Settings22.SettingsScreen.Revealer();
  }
});
UI22.ContextMenu.registerItem({
  location: "mainMenu/footer",
  actionId: "settings.shortcuts",
  order: void 0
});
UI22.ContextMenu.registerItem({
  location: "mainMenuHelp/default",
  actionId: "settings.documentation",
  order: void 0
});

// gen/front_end/panels/sources/sources-meta.js
import * as Common9 from "./../../core/common/common.js";
import * as Host2 from "./../../core/host/host.js";
import * as i18n22 from "./../../core/i18n/i18n.js";
import * as SDK5 from "./../../core/sdk/sdk.js";
import * as Breakpoints from "./../../models/breakpoints/breakpoints.js";
import * as Workspace3 from "./../../models/workspace/workspace.js";
import * as ObjectUI from "./../../ui/legacy/components/object_ui/object_ui.js";
import * as QuickOpen from "./../../ui/legacy/components/quick_open/quick_open.js";
import * as UI9 from "./../../ui/legacy/legacy.js";
var UIStrings11 = {
  /**
   * @description Command for showing the 'Sources' tool
   */
  showSources: "Show Sources",
  /**
   * @description Name of the Sources panel
   */
  sources: "Sources",
  /**
   * @description Command for showing the 'Workspace' tool
   */
  showWorkspace: "Show Workspace",
  /**
   * @description Title of the 'Filesystem' tool in the Files Navigator View, which is part of the Sources tool
   */
  workspace: "Workspace",
  /**
   * @description Command for showing the 'Snippets' tool
   */
  showSnippets: "Show Snippets",
  /**
   * @description Title of the 'Snippets' tool in the Snippets Navigator View, which is part of the Sources tool
   */
  snippets: "Snippets",
  /**
   * @description Command for showing the 'Search' tool
   */
  showSearch: "Show Search",
  /**
   * @description Title of a search bar or tool
   */
  search: "Search",
  /**
   * @description Command for showing the 'Quick source' tool
   */
  showQuickSource: "Show Quick source",
  /**
   * @description Title of the 'Quick source' tool in the bottom drawer
   */
  quickSource: "Quick source",
  /**
   * @description Command for showing the 'Threads' tool
   */
  showThreads: "Show Threads",
  /**
   * @description Title of the sources threads
   */
  threads: "Threads",
  /**
   * @description Command for showing the 'Scope' tool
   */
  showScope: "Show Scope",
  /**
   * @description Title of the sources scopeChain
   */
  scope: "Scope",
  /**
   * @description Command for showing the 'Watch' tool
   */
  showWatch: "Show Watch",
  /**
   * @description Title of the sources watch
   */
  watch: "Watch",
  /**
   * @description Command for showing the 'Breakpoints' tool
   */
  showBreakpoints: "Show Breakpoints",
  /**
   * @description Title of the sources jsBreakpoints
   */
  breakpoints: "Breakpoints",
  /**
   * @description Title of an action under the Debugger category that can be invoked through the Command Menu
   */
  pauseScriptExecution: "Pause script execution",
  /**
   * @description Title of an action under the Debugger category that can be invoked through the Command Menu
   */
  resumeScriptExecution: "Resume script execution",
  /**
   * @description Title of an action in the debugger tool to step over
   */
  stepOverNextFunctionCall: "Step over next function call",
  /**
   * @description Title of an action in the debugger tool to step into
   */
  stepIntoNextFunctionCall: "Step into next function call",
  /**
   * @description Title of an action in the debugger tool to step
   */
  step: "Step",
  /**
   * @description Title of an action in the debugger tool to step out
   */
  stepOutOfCurrentFunction: "Step out of current function",
  /**
   * @description Text to run a code snippet
   */
  runSnippet: "Run snippet",
  /**
   * @description Text in Java Script Breakpoints Sidebar Pane of the Sources panel
   */
  deactivateBreakpoints: "Deactivate breakpoints",
  /**
   * @description Text in Java Script Breakpoints Sidebar Pane of the Sources panel
   */
  activateBreakpoints: "Activate breakpoints",
  /**
   * @description Title of an action in the sources tool to add to watch
   */
  addSelectedTextToWatches: "Add selected text to watches",
  /**
   * @description Title of an action in the debugger tool to evaluate selection
   */
  evaluateSelectedTextInConsole: "Evaluate selected text in console",
  /**
   * @description Title of an action that switches files in the Sources panel
   */
  switchFile: "Switch file",
  /**
   * @description Title of a sources panel action that renames a file
   */
  rename: "Rename",
  /**
   * @description Title of an action in the sources tool to close all
   */
  closeAll: "Close all",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (jump to previous editing location in text editor)
   */
  jumpToPreviousEditingLocation: "Jump to previous editing location",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (jump to next editing location in text editor)
   */
  jumpToNextEditingLocation: "Jump to next editing location",
  /**
   * @description Title of an action that closes the active editor tab in the Sources panel
   */
  closeTheActiveTab: "Close the active tab",
  /**
   * @description Text to go to a given line
   */
  goToLine: "Go to line",
  /**
   * @description Title of an action that opens the go to member menu
   */
  goToAFunctionDeclarationruleSet: "Go to a function declaration/rule set",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (toggle breakpoint in debugger)
   */
  toggleBreakpoint: "Toggle breakpoint",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (enable toggle breakpoint shortcut in debugger)
   */
  toggleBreakpointEnabled: "Toggle breakpoint enabled",
  /**
   * @description Title of a sources panel action that opens the breakpoint input window
   */
  toggleBreakpointInputWindow: "Toggle breakpoint input window",
  /**
   * @description Text to save something
   */
  save: "Save",
  /**
   * @description Title of an action to save all files in the Sources panel
   */
  saveAll: "Save all",
  /**
   * @description Title of an action in the sources tool to create snippet
   */
  createNewSnippet: "Create new snippet",
  /**
   * @description Button in the Workspace tab of the Sources panel, used to
   *              (manually) add a folder to the workspace.
   */
  addFolderManually: "Add folder manually",
  /**
   * @description Title of an action in the Sources panel command menu to (manually)
   *              add a folder to the workspace.
   */
  addFolderToWorkspace: "Add folder to workspace",
  /**
   * @description Title of an action in the debugger tool to previous call frame
   */
  previousCallFrame: "Previous call frame",
  /**
   * @description Title of an action in the debugger tool to next call frame
   */
  nextCallFrame: "Next call frame",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (increment CSS unit by the amount passed in the placeholder in Styles pane)
   * @example {10} PH1
   */
  incrementCssUnitBy: "Increment CSS unit by {PH1}",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (decrement CSS unit by the amount passed in the placeholder in Styles pane)
   * @example {10} PH1
   */
  decrementCssUnitBy: "Decrement CSS unit by {PH1}",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  searchInAnonymousAndContent: "Search in anonymous and content scripts",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  doNotSearchInAnonymousAndContent: "Do not search in anonymous and content scripts",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  automaticallyRevealFilesIn: "Automatically reveal files in sidebar",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  doNotAutomaticallyRevealFilesIn: "Do not automatically reveal files in sidebar",
  /**
   * @description Setting under the Sources category to toggle usage of JavaScript source maps.
   */
  javaScriptSourceMaps: "JavaScript source maps",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  enableJavaScriptSourceMaps: "Enable JavaScript source maps",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  disableJavaScriptSourceMaps: "Disable JavaScript source maps",
  /**
   * @description Title of a setting under the Sources category.
   *'tab moves focus' is the name of the setting, which means that when the user
   *hits the tab key, the focus in the UI will be moved to the next part of the
   *text editor, as opposed to inserting a tab character into the text in the
   *text editor.
   */
  tabMovesFocus: "Tab moves focus",
  /**
   * @description Title of a setting that can be invoked through the Command Menu.
   *'tab moves focus' is the name of the setting, which means that when the user
   *hits the tab key, the focus in the UI will be moved to the next part of the
   *text editor, as opposed to inserting a tab character into the text in the
   *text editor.
   */
  enableTabMovesFocus: "Enable tab moves focus",
  /**
   * @description Title of a setting that can be invoked through the Command Menu.
   *'tab moves focus' is the name of the setting, which means that when the user
   *hits the tab key, the focus in the UI will be moved to the next part of the
   *text editor, as opposed to inserting a tab character into the text in the
   *text editor.
   */
  disableTabMovesFocus: "Disable tab moves focus",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  detectIndentation: "Detect indentation",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  doNotDetectIndentation: "Do not detect indentation",
  /**
   * @description Title of a setting under Sources category that can be invoked through the Command Menu.
   *This setting turns on the automatic formatting of source files in the Sources panel that are detected
   *to be minified.
   */
  automaticallyPrettyPrintMinifiedSources: "Automatically pretty print minified sources",
  /**
   * @description Title of a setting under Sources category that can be invoked through the Command Menu.
   *This setting turns off the automatic formatting of source files in the Sources panel that are detected
   *to be minified.
   */
  doNotAutomaticallyPrettyPrintMinifiedSources: "Do not automatically pretty print minified sources",
  /**
   * @description Text for autocompletion
   */
  autocompletion: "Autocompletion",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  enableAutocompletion: "Enable autocompletion",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  disableAutocompletion: "Disable autocompletion",
  /**
   * @description Title of a setting under the Sources category in Settings
   */
  bracketClosing: "Auto closing brackets",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  enableBracketClosing: "Enable auto closing brackets",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  disableBracketClosing: "Disable auto closing brackets",
  /**
   * @description Title of a setting under the Sources category in Settings
   */
  bracketMatching: "Bracket matching",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  enableBracketMatching: "Enable bracket matching",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  disableBracketMatching: "Disable bracket matching",
  /**
   * @description Title of a setting under the Sources category in Settings
   */
  codeFolding: "Code folding",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  enableCodeFolding: "Enable code folding",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  disableCodeFolding: "Disable code folding",
  /**
   * @description Title of a setting under the Sources category in Settings
   */
  showWhitespaceCharacters: "Show whitespace characters:",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  doNotShowWhitespaceCharacters: "Do not show whitespace characters",
  /**
   * @description One value of an option that can be set to 'none', 'all', or 'trailing'. The setting
   * controls how whitespace characters are shown in a text editor.
   */
  none: "None",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  showAllWhitespaceCharacters: "Show all whitespace characters",
  /**
   * @description Text for everything
   */
  all: "All",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  showTrailingWhitespaceCharacters: "Show trailing whitespace characters",
  /**
   * @description A drop-down menu option to show trailing whitespace characters
   */
  trailing: "Trailing",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  displayVariableValuesInlineWhile: "Display variable values inline while debugging",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  doNotDisplayVariableValuesInline: "Do not display variable values inline while debugging",
  /**
   * @description Title of a setting under the Sources category
   */
  cssSourceMaps: "CSS source maps",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  enableCssSourceMaps: "Enable CSS source maps",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  disableCssSourceMaps: "Disable CSS source maps",
  /**
   * @description Title of a setting under the Sources category in Settings
   */
  allowScrollingPastEndOfFile: "Allow scrolling past end of file",
  /**
   * @description Title of a setting under the Sources category in Settings
   */
  disallowScrollingPastEndOfFile: "Disallow scrolling past end of file",
  /**
   * @description Title of a setting under the Sources category in Settings
   */
  wasmAutoStepping: "When debugging Wasm with debug information, do not pause on wasm bytecode if possible",
  /**
   * @description Title of a setting under the Sources category in Settings
   */
  enableWasmAutoStepping: "Enable Wasm auto-stepping",
  /**
   * @description Title of a setting under the Sources category in Settings
   */
  disableWasmAutoStepping: "Disable Wasm auto-stepping",
  /**
   * @description Text for command prefix of go to a given line or symbol
   */
  goTo: "Go to",
  /**
   * @description Text for command suggestion of go to a given line
   */
  line: "Line",
  /**
   * @description Text for command suggestion of go to a given symbol
   */
  symbol: "Symbol",
  /**
   * @description Text for help title of go to symbol menu
   */
  goToSymbol: "Go to symbol",
  /**
   * @description Text for command prefix of open a file
   */
  open: "Open",
  /**
   * @description Text for command suggestion of open a file
   */
  file: "File",
  /**
   * @description Text for help title of open file menu
   */
  openFile: "Open file",
  /**
   * @description  Title of a setting under the Sources category in Settings. If this option is off,
   * the sources panel will not be automatically be focused whenever the application hits a breakpoint
   * and comes to a halt.
   */
  disableAutoFocusOnDebuggerPaused: "Do not focus Sources panel when triggering a breakpoint",
  /**
   * @description  Title of a setting under the Sources category in Settings. If this option is on,
   * the sources panel will be automatically shown whenever the application hits a breakpoint and
   * comes to a halt.
   */
  enableAutoFocusOnDebuggerPaused: "Focus Sources panel when triggering a breakpoint",
  /**
   * @description Title of an action to reveal the active file in the navigator sidebar of the Sources panel
   */
  revealActiveFileInSidebar: "Reveal active file in navigator sidebar",
  /**
   * @description Text for command of toggling navigator sidebar in Sources panel
   */
  toggleNavigatorSidebar: "Toggle navigator sidebar",
  /**
   * @description Text for command of toggling debugger sidebar in Sources panel
   */
  toggleDebuggerSidebar: "Toggle debugger sidebar",
  /**
   * @description Title of an action that navigates to the next editor in the Sources panel.
   */
  nextEditorTab: "Next editor",
  /**
   * @description Title of an action that navigates to the next editor in the Sources panel.
   */
  previousEditorTab: "Previous editor",
  /**
   * @description Title of a setting under the Sources category in Settings. If
   *              this option is on, the Sources panel will automatically wrap
   *              long lines and try to avoid showing a horizontal scrollbar if
   *              possible.
   */
  wordWrap: "Word wrap",
  /**
   * @description Title of an action in the Sources panel that toggles the 'Word
   *              wrap' setting.
   */
  toggleWordWrap: "Toggle word wrap"
};
var str_11 = i18n22.i18n.registerUIStrings("panels/sources/sources-meta.ts", UIStrings11);
var i18nLazyString11 = i18n22.i18n.getLazilyComputedLocalizedString.bind(void 0, str_11);
var loadedSourcesModule2;
async function loadSourcesModule2() {
  if (!loadedSourcesModule2) {
    loadedSourcesModule2 = await import("./../../panels/sources/sources.js");
  }
  return loadedSourcesModule2;
}
function maybeRetrieveContextTypes2(getClassCallBack) {
  if (loadedSourcesModule2 === void 0) {
    return [];
  }
  return getClassCallBack(loadedSourcesModule2);
}
UI9.ViewManager.registerViewExtension({
  location: "panel",
  id: "sources",
  commandPrompt: i18nLazyString11(UIStrings11.showSources),
  title: i18nLazyString11(UIStrings11.sources),
  order: 30,
  async loadView() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI9.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-files",
  commandPrompt: i18nLazyString11(UIStrings11.showWorkspace),
  title: i18nLazyString11(UIStrings11.workspace),
  order: 3,
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesNavigator.FilesNavigatorView();
  }
});
UI9.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-snippets",
  commandPrompt: i18nLazyString11(UIStrings11.showSnippets),
  title: i18nLazyString11(UIStrings11.snippets),
  order: 6,
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesNavigator.SnippetsNavigatorView();
  }
});
UI9.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "sources.search-sources-tab",
  commandPrompt: i18nLazyString11(UIStrings11.showSearch),
  title: i18nLazyString11(UIStrings11.search),
  order: 7,
  persistence: "closeable",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return new Sources.SearchSourcesView.SearchSourcesView();
  }
});
UI9.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "sources.quick",
  commandPrompt: i18nLazyString11(UIStrings11.showQuickSource),
  title: i18nLazyString11(UIStrings11.quickSource),
  persistence: "closeable",
  order: 1e3,
  async loadView() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.QuickSourceView();
  }
});
UI9.ViewManager.registerViewExtension({
  id: "sources.threads",
  commandPrompt: i18nLazyString11(UIStrings11.showThreads),
  title: i18nLazyString11(UIStrings11.threads),
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return new Sources.ThreadsSidebarPane.ThreadsSidebarPane();
  }
});
UI9.ViewManager.registerViewExtension({
  id: "sources.scope-chain",
  commandPrompt: i18nLazyString11(UIStrings11.showScope),
  title: i18nLazyString11(UIStrings11.scope),
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return Sources.ScopeChainSidebarPane.ScopeChainSidebarPane.instance();
  }
});
UI9.ViewManager.registerViewExtension({
  id: "sources.watch",
  commandPrompt: i18nLazyString11(UIStrings11.showWatch),
  title: i18nLazyString11(UIStrings11.watch),
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return Sources.WatchExpressionsSidebarPane.WatchExpressionsSidebarPane.instance();
  },
  hasToolbar: true
});
UI9.ViewManager.registerViewExtension({
  id: "sources.js-breakpoints",
  commandPrompt: i18nLazyString11(UIStrings11.showBreakpoints),
  title: i18nLazyString11(UIStrings11.breakpoints),
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return Sources.BreakpointsView.BreakpointsView.instance();
  }
});
UI9.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.toggle-pause",
  iconClass: "pause",
  toggleable: true,
  toggledIconClass: "resume",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.RevealingActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView, UI9.ShortcutRegistry.ForwardedShortcut]);
  },
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.pauseScriptExecution)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.resumeScriptExecution)
    }
  ],
  bindings: [
    {
      shortcut: "F8",
      keybindSets: [
        "devToolsDefault"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+\\"
    },
    {
      shortcut: "F5",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      shortcut: "Shift+F5",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+\\"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.step-over",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.stepOverNextFunctionCall),
  iconClass: "step-over",
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  bindings: [
    {
      shortcut: "F10",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+'"
    },
    {
      platform: "mac",
      shortcut: "Meta+'"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.step-into",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.stepIntoNextFunctionCall),
  iconClass: "step-into",
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  bindings: [
    {
      shortcut: "F11",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+;"
    },
    {
      platform: "mac",
      shortcut: "Meta+;"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.step",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.step),
  iconClass: "step",
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  bindings: [
    {
      shortcut: "F9",
      keybindSets: [
        "devToolsDefault"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.step-out",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.stepOutOfCurrentFunction),
  iconClass: "step-out",
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  bindings: [
    {
      shortcut: "Shift+F11",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Shift+Ctrl+;"
    },
    {
      platform: "mac",
      shortcut: "Shift+Meta+;"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "debugger.run-snippet",
  category: "DEBUGGER",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.runSnippet),
  iconClass: "play",
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Enter"
    },
    {
      platform: "mac",
      shortcut: "Meta+Enter"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.toggle-breakpoints-active",
  iconClass: "breakpoint-crossed",
  toggledIconClass: "breakpoint-crossed-filled",
  toggleable: true,
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.deactivateBreakpoints)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.activateBreakpoints)
    }
  ],
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+F8"
    },
    {
      platform: "mac",
      shortcut: "Meta+F8"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.add-to-watch",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return Sources.WatchExpressionsSidebarPane.WatchExpressionsSidebarPane.instance();
  },
  category: "DEBUGGER",
  title: i18nLazyString11(UIStrings11.addSelectedTextToWatches),
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.UISourceCodeFrame.UISourceCodeFrame]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+A"
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+A"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "debugger.evaluate-selection",
  category: "DEBUGGER",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.evaluateSelectedTextInConsole),
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.UISourceCodeFrame.UISourceCodeFrame]);
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
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.switch-file",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.switchFile),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.SwitchFileActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      shortcut: "Alt+O"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.rename",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.rename),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "F2"
    },
    {
      platform: "mac",
      shortcut: "Enter"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  category: "SOURCES",
  actionId: "sources.close-all",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.closeAll),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+K W",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+K W",
      keybindSets: [
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.jump-to-previous-location",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.jumpToPreviousEditingLocation),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      shortcut: "Alt+Minus"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.jump-to-next-location",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.jumpToNextEditingLocation),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      shortcut: "Alt+Plus"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.close-editor-tab",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.closeTheActiveTab),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      shortcut: "Alt+w"
    },
    {
      shortcut: "Ctrl+W",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      platform: "windows",
      shortcut: "Ctrl+F4",
      keybindSets: [
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.next-editor-tab",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.nextEditorTab),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+PageDown",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+PageDown",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.previous-editor-tab",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.previousEditorTab),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+PageUp",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+PageUp",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.go-to-line",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.goToLine),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      shortcut: "Ctrl+g",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.go-to-member",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.goToAFunctionDeclarationruleSet),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+o",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+o",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+T",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+T",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      shortcut: "F12",
      keybindSets: [
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "debugger.toggle-breakpoint",
  category: "DEBUGGER",
  title: i18nLazyString11(UIStrings11.toggleBreakpoint),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+b",
      keybindSets: [
        "devToolsDefault"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+b",
      keybindSets: [
        "devToolsDefault"
      ]
    },
    {
      shortcut: "F9",
      keybindSets: [
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "debugger.toggle-breakpoint-enabled",
  category: "DEBUGGER",
  title: i18nLazyString11(UIStrings11.toggleBreakpointEnabled),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+b"
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+b"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "debugger.breakpoint-input-window",
  category: "DEBUGGER",
  title: i18nLazyString11(UIStrings11.toggleBreakpointInputWindow),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Alt+b"
    },
    {
      platform: "mac",
      shortcut: "Meta+Alt+b"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.save",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.save),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+s",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+s",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.save-all",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.saveAll),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+s"
    },
    {
      platform: "mac",
      shortcut: "Meta+Alt+s"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+K S",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+Alt+S",
      keybindSets: [
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  category: "SOURCES",
  actionId: "sources.create-snippet",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesNavigator.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.createNewSnippet)
});
if (!Host2.InspectorFrontendHost.InspectorFrontendHostInstance.isHostedMode()) {
  UI9.ActionRegistration.registerActionExtension({
    category: "SOURCES",
    actionId: "sources.add-folder-to-workspace",
    async loadActionDelegate() {
      const Sources = await loadSourcesModule2();
      return new Sources.SourcesNavigator.ActionDelegate();
    },
    iconClass: "plus",
    title: i18nLazyString11(UIStrings11.addFolderToWorkspace)
  });
}
UI9.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.previous-call-frame",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.CallStackSidebarPane.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.previousCallFrame),
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  bindings: [
    {
      shortcut: "Ctrl+,"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.next-call-frame",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.CallStackSidebarPane.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.nextCallFrame),
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  bindings: [
    {
      shortcut: "Ctrl+."
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.search",
  title: i18nLazyString11(UIStrings11.search),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SearchSourcesView.ActionDelegate();
  },
  category: "SOURCES",
  bindings: [
    {
      platform: "mac",
      shortcut: "Meta+Alt+F",
      keybindSets: [
        "devToolsDefault"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+F",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+J",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+F",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+J",
      keybindSets: [
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.increment-css",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.incrementCssUnitBy, { PH1: 1 }),
  bindings: [
    {
      shortcut: "Alt+Up"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.increment-css-by-ten",
  title: i18nLazyString11(UIStrings11.incrementCssUnitBy, { PH1: 10 }),
  category: "SOURCES",
  bindings: [
    {
      shortcut: "Alt+PageUp"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.decrement-css",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.decrementCssUnitBy, { PH1: 1 }),
  bindings: [
    {
      shortcut: "Alt+Down"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.decrement-css-by-ten",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.decrementCssUnitBy, { PH1: 10 }),
  bindings: [
    {
      shortcut: "Alt+PageDown"
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.reveal-in-navigator-sidebar",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.revealActiveFileInSidebar),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  }
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.toggle-navigator-sidebar",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.toggleNavigatorSidebar),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+y",
      keybindSets: [
        "devToolsDefault"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+y",
      keybindSets: [
        "devToolsDefault"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+b",
      keybindSets: [
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Meta+b",
      keybindSets: [
        "vsCode"
      ]
    }
  ]
});
UI9.ActionRegistration.registerActionExtension({
  actionId: "sources.toggle-debugger-sidebar",
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.toggleDebuggerSidebar),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+h"
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+h"
    }
  ]
});
Common9.Settings.registerSettingExtension({
  settingName: "navigator-group-by-folder",
  settingType: "boolean",
  defaultValue: true
});
Common9.Settings.registerSettingExtension({
  settingName: "navigator-group-by-authored",
  settingType: "boolean",
  defaultValue: false
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.searchInAnonymousAndContent),
  settingName: "search-in-anonymous-and-content-scripts",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.searchInAnonymousAndContent)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.doNotSearchInAnonymousAndContent)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.automaticallyRevealFilesIn),
  settingName: "auto-reveal-in-navigator",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.automaticallyRevealFilesIn)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.doNotAutomaticallyRevealFilesIn)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.javaScriptSourceMaps),
  settingName: "js-source-maps-enabled",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.enableJavaScriptSourceMaps)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.disableJavaScriptSourceMaps)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.tabMovesFocus),
  settingName: "text-editor-tab-moves-focus",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.enableTabMovesFocus)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.disableTabMovesFocus)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.detectIndentation),
  settingName: "text-editor-auto-detect-indent",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.detectIndentation)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.doNotDetectIndentation)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.autocompletion),
  settingName: "text-editor-autocompletion",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.enableAutocompletion)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.disableAutocompletion)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.bracketClosing),
  settingName: "text-editor-bracket-closing",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.enableBracketClosing)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.disableBracketClosing)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  title: i18nLazyString11(UIStrings11.bracketMatching),
  settingName: "text-editor-bracket-matching",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.enableBracketMatching)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.disableBracketMatching)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.codeFolding),
  settingName: "text-editor-code-folding",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.enableCodeFolding)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.disableCodeFolding)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.showWhitespaceCharacters),
  settingName: "show-whitespaces-in-editor",
  settingType: "enum",
  defaultValue: "original",
  options: [
    {
      title: i18nLazyString11(UIStrings11.doNotShowWhitespaceCharacters),
      text: i18nLazyString11(UIStrings11.none),
      value: "none"
    },
    {
      title: i18nLazyString11(UIStrings11.showAllWhitespaceCharacters),
      text: i18nLazyString11(UIStrings11.all),
      value: "all"
    },
    {
      title: i18nLazyString11(UIStrings11.showTrailingWhitespaceCharacters),
      text: i18nLazyString11(UIStrings11.trailing),
      value: "trailing"
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.wordWrap),
  settingName: "sources.word-wrap",
  settingType: "boolean",
  defaultValue: false
});
UI9.ActionRegistration.registerActionExtension({
  category: "SOURCES",
  actionId: "sources.toggle-word-wrap",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString11(UIStrings11.toggleWordWrap),
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
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
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.displayVariableValuesInlineWhile),
  settingName: "inline-variable-values",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.displayVariableValuesInlineWhile)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.doNotDisplayVariableValuesInline)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.enableAutoFocusOnDebuggerPaused),
  settingName: "auto-focus-on-debugger-paused-enabled",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.enableAutoFocusOnDebuggerPaused)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.disableAutoFocusOnDebuggerPaused)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.automaticallyPrettyPrintMinifiedSources),
  settingName: "auto-pretty-print-minified",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.automaticallyPrettyPrintMinifiedSources)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.doNotAutomaticallyPrettyPrintMinifiedSources)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.cssSourceMaps),
  settingName: "css-source-maps-enabled",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.enableCssSourceMaps)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.disableCssSourceMaps)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings11.allowScrollingPastEndOfFile),
  settingName: "allow-scroll-past-eof",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.allowScrollingPastEndOfFile)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.disallowScrollingPastEndOfFile)
    }
  ]
});
Common9.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Local",
  title: i18nLazyString11(UIStrings11.wasmAutoStepping),
  settingName: "wasm-auto-stepping",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString11(UIStrings11.enableWasmAutoStepping)
    },
    {
      value: false,
      title: i18nLazyString11(UIStrings11.disableWasmAutoStepping)
    }
  ]
});
UI9.ViewManager.registerLocationResolver({
  name: "navigator-view",
  category: "SOURCES",
  async loadResolver() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI9.ViewManager.registerLocationResolver({
  name: "sources.sidebar-top",
  category: "SOURCES",
  async loadResolver() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI9.ViewManager.registerLocationResolver({
  name: "sources.sidebar-bottom",
  category: "SOURCES",
  async loadResolver() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI9.ViewManager.registerLocationResolver({
  name: "sources.sidebar-tabs",
  category: "SOURCES",
  async loadResolver() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI9.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Workspace3.UISourceCode.UISourceCode,
      Workspace3.UISourceCode.UILocation,
      SDK5.RemoteObject.RemoteObject,
      SDK5.NetworkRequest.NetworkRequest,
      ...maybeRetrieveContextTypes2((Sources) => [Sources.UISourceCodeFrame.UISourceCodeFrame])
    ];
  },
  async loadProvider() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  },
  experiment: void 0
});
UI9.ContextMenu.registerProvider({
  async loadProvider() {
    const Sources = await loadSourcesModule2();
    return Sources.WatchExpressionsSidebarPane.WatchExpressionsSidebarPane.instance();
  },
  contextTypes() {
    return [
      ObjectUI.ObjectPropertiesSection.ObjectPropertyTreeElement,
      ...maybeRetrieveContextTypes2((Sources) => [Sources.UISourceCodeFrame.UISourceCodeFrame])
    ];
  },
  experiment: void 0
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [
      Workspace3.UISourceCode.UILocation
    ];
  },
  destination: Common9.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.UILocationRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [
      Workspace3.UISourceCode.UILocationRange
    ];
  },
  destination: Common9.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.UILocationRangeRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK5.DebuggerModel.Location
    ];
  },
  destination: Common9.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.DebuggerLocationRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [
      Workspace3.UISourceCode.UISourceCode
    ];
  },
  destination: Common9.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.UISourceCodeRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK5.DebuggerModel.DebuggerPausedDetails
    ];
  },
  destination: Common9.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.DebuggerPausedDetailsRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [
      Breakpoints.BreakpointManager.BreakpointLocation
    ];
  },
  destination: Common9.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.DebuggerPlugin.BreakpointLocationRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SearchSourcesView.SearchSources]);
  },
  destination: void 0,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SearchSourcesView.Revealer();
  }
});
UI9.Toolbar.registerToolbarItem({
  actionId: "sources.add-folder-to-workspace",
  location: "files-navigator-toolbar",
  label: i18nLazyString11(UIStrings11.addFolderManually),
  loadItem: void 0,
  order: void 0,
  separator: void 0
});
UI9.Context.registerListener({
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const Sources = await loadSourcesModule2();
    return Sources.BreakpointsView.BreakpointsSidebarController.instance();
  }
});
UI9.Context.registerListener({
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const Sources = await loadSourcesModule2();
    return Sources.CallStackSidebarPane.CallStackSidebarPane.instance();
  }
});
UI9.Context.registerListener({
  contextTypes() {
    return [SDK5.DebuggerModel.CallFrame];
  },
  async loadListener() {
    const Sources = await loadSourcesModule2();
    return Sources.ScopeChainSidebarPane.ScopeChainSidebarPane.instance();
  }
});
UI9.ContextMenu.registerItem({
  location: "navigatorMenu/default",
  actionId: "quick-open.show",
  order: void 0
});
UI9.ContextMenu.registerItem({
  location: "mainMenu/default",
  actionId: "sources.search",
  order: void 0
});
QuickOpen.FilteredListWidget.registerProvider({
  prefix: "@",
  iconName: "symbol",
  async provider() {
    const Sources = await loadSourcesModule2();
    return new Sources.OutlineQuickOpen.OutlineQuickOpen();
  },
  helpTitle: i18nLazyString11(UIStrings11.goToSymbol),
  titlePrefix: i18nLazyString11(UIStrings11.goTo),
  titleSuggestion: i18nLazyString11(UIStrings11.symbol)
});
QuickOpen.FilteredListWidget.registerProvider({
  prefix: ":",
  iconName: "colon",
  async provider() {
    const Sources = await loadSourcesModule2();
    return new Sources.GoToLineQuickOpen.GoToLineQuickOpen();
  },
  helpTitle: i18nLazyString11(UIStrings11.goToLine),
  titlePrefix: i18nLazyString11(UIStrings11.goTo),
  titleSuggestion: i18nLazyString11(UIStrings11.line)
});
QuickOpen.FilteredListWidget.registerProvider({
  prefix: "",
  iconName: "document",
  async provider() {
    const Sources = await loadSourcesModule2();
    return new Sources.OpenFileQuickOpen.OpenFileQuickOpen();
  },
  helpTitle: i18nLazyString11(UIStrings11.openFile),
  titlePrefix: i18nLazyString11(UIStrings11.open),
  titleSuggestion: i18nLazyString11(UIStrings11.file)
});

// gen/front_end/panels/sensors/sensors-meta.js
import * as Common10 from "./../../core/common/common.js";
import * as i18n24 from "./../../core/i18n/i18n.js";
import * as UI10 from "./../../ui/legacy/legacy.js";
var UIStrings12 = {
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
var str_12 = i18n24.i18n.registerUIStrings("panels/sensors/sensors-meta.ts", UIStrings12);
var i18nLazyString12 = i18n24.i18n.getLazilyComputedLocalizedString.bind(void 0, str_12);
var loadedSensorsModule;
async function loadEmulationModule2() {
  if (!loadedSensorsModule) {
    loadedSensorsModule = await import("./../../panels/sensors/sensors.js");
  }
  return loadedSensorsModule;
}
UI10.ViewManager.registerViewExtension({
  location: "drawer-view",
  commandPrompt: i18nLazyString12(UIStrings12.showSensors),
  title: i18nLazyString12(UIStrings12.sensors),
  id: "sensors",
  persistence: "closeable",
  order: 100,
  async loadView() {
    const Sensors = await loadEmulationModule2();
    return new Sensors.SensorsView.SensorsView();
  },
  tags: [
    i18nLazyString12(UIStrings12.geolocation),
    i18nLazyString12(UIStrings12.timezones),
    i18nLazyString12(UIStrings12.locale),
    i18nLazyString12(UIStrings12.locales),
    i18nLazyString12(UIStrings12.accelerometer),
    i18nLazyString12(UIStrings12.deviceOrientation)
  ]
});
UI10.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "emulation-locations",
  commandPrompt: i18nLazyString12(UIStrings12.showLocations),
  title: i18nLazyString12(UIStrings12.locations),
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
Common10.Settings.registerSettingExtension({
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
Common10.Settings.registerSettingExtension({
  title: i18nLazyString12(UIStrings12.cpuPressure),
  reloadRequired: true,
  settingName: "emulation.cpu-pressure",
  settingType: "enum",
  defaultValue: "none",
  options: [
    {
      value: "none",
      title: i18nLazyString12(UIStrings12.noPressureEmulation),
      text: i18nLazyString12(UIStrings12.noPressureEmulation)
    },
    {
      value: "nominal",
      title: i18nLazyString12(UIStrings12.nominal),
      text: i18nLazyString12(UIStrings12.nominal)
    },
    {
      value: "fair",
      title: i18nLazyString12(UIStrings12.fair),
      text: i18nLazyString12(UIStrings12.fair)
    },
    {
      value: "serious",
      title: i18nLazyString12(UIStrings12.serious),
      text: i18nLazyString12(UIStrings12.serious)
    },
    {
      value: "critical",
      title: i18nLazyString12(UIStrings12.critical),
      text: i18nLazyString12(UIStrings12.critical)
    }
  ]
});
Common10.Settings.registerSettingExtension({
  title: i18nLazyString12(UIStrings12.touch),
  reloadRequired: true,
  settingName: "emulation.touch",
  settingType: "enum",
  defaultValue: "none",
  options: [
    {
      value: "none",
      title: i18nLazyString12(UIStrings12.devicebased),
      text: i18nLazyString12(UIStrings12.devicebased)
    },
    {
      value: "force",
      title: i18nLazyString12(UIStrings12.forceEnabled),
      text: i18nLazyString12(UIStrings12.forceEnabled)
    }
  ]
});
Common10.Settings.registerSettingExtension({
  title: i18nLazyString12(UIStrings12.emulateIdleDetectorState),
  settingName: "emulation.idle-detection",
  settingType: "enum",
  defaultValue: "none",
  options: [
    {
      value: "none",
      title: i18nLazyString12(UIStrings12.noIdleEmulation),
      text: i18nLazyString12(UIStrings12.noIdleEmulation)
    },
    {
      value: '{"isUserActive":true,"isScreenUnlocked":true}',
      title: i18nLazyString12(UIStrings12.userActiveScreenUnlocked),
      text: i18nLazyString12(UIStrings12.userActiveScreenUnlocked)
    },
    {
      value: '{"isUserActive":true,"isScreenUnlocked":false}',
      title: i18nLazyString12(UIStrings12.userActiveScreenLocked),
      text: i18nLazyString12(UIStrings12.userActiveScreenLocked)
    },
    {
      value: '{"isUserActive":false,"isScreenUnlocked":true}',
      title: i18nLazyString12(UIStrings12.userIdleScreenUnlocked),
      text: i18nLazyString12(UIStrings12.userIdleScreenUnlocked)
    },
    {
      value: '{"isUserActive":false,"isScreenUnlocked":false}',
      title: i18nLazyString12(UIStrings12.userIdleScreenLocked),
      text: i18nLazyString12(UIStrings12.userIdleScreenLocked)
    }
  ]
});

// gen/front_end/panels/timeline/timeline-meta.js
import * as Common11 from "./../../core/common/common.js";
import * as i18n26 from "./../../core/i18n/i18n.js";
import * as SDK6 from "./../../core/sdk/sdk.js";
import * as UI11 from "./../../ui/legacy/legacy.js";
var UIStrings13 = {
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
var str_13 = i18n26.i18n.registerUIStrings("panels/timeline/timeline-meta.ts", UIStrings13);
var i18nLazyString13 = i18n26.i18n.getLazilyComputedLocalizedString.bind(void 0, str_13);
var loadedTimelineModule;
async function loadTimelineModule() {
  if (!loadedTimelineModule) {
    loadedTimelineModule = await import("./../../panels/timeline/timeline.js");
  }
  return loadedTimelineModule;
}
function maybeRetrieveContextTypes3(getClassCallBack) {
  if (loadedTimelineModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedTimelineModule);
}
UI11.ViewManager.registerViewExtension({
  location: "panel",
  id: "timeline",
  title: i18nLazyString13(UIStrings13.performance),
  commandPrompt: i18nLazyString13(UIStrings13.showPerformance),
  order: 50,
  async loadView() {
    const Timeline = await loadTimelineModule();
    return Timeline.TimelinePanel.TimelinePanel.instance();
  }
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "timeline.toggle-recording",
  category: "PERFORMANCE",
  iconClass: "record-start",
  toggleable: true,
  toggledIconClass: "record-stop",
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  options: [
    {
      value: true,
      title: i18nLazyString13(UIStrings13.record)
    },
    {
      value: false,
      title: i18nLazyString13(UIStrings13.stop)
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
UI11.ActionRegistration.registerActionExtension({
  actionId: "timeline.record-reload",
  iconClass: "refresh",
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  category: "PERFORMANCE",
  title: i18nLazyString13(UIStrings13.recordAndReload),
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
UI11.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.save-to-file",
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString13(UIStrings13.saveProfile),
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
UI11.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.load-from-file",
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString13(UIStrings13.loadProfile),
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
UI11.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-previous-frame",
  category: "PERFORMANCE",
  title: i18nLazyString13(UIStrings13.previousFrame),
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI11.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-next-frame",
  category: "PERFORMANCE",
  title: i18nLazyString13(UIStrings13.nextFrame),
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI11.ActionRegistration.registerActionExtension({
  actionId: "timeline.show-history",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  category: "PERFORMANCE",
  title: i18nLazyString13(UIStrings13.showRecentTimelineSessions),
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI11.ActionRegistration.registerActionExtension({
  actionId: "timeline.previous-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString13(UIStrings13.previousRecording),
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
UI11.ActionRegistration.registerActionExtension({
  actionId: "timeline.next-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString13(UIStrings13.nextRecording),
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
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
Common11.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString13(UIStrings13.hideChromeFrameInLayersView),
  settingName: "frame-viewer-hide-chrome-window",
  settingType: "boolean",
  defaultValue: false
});
Common11.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  settingName: "annotations-hidden",
  settingType: "boolean",
  defaultValue: false
});
Common11.Linkifier.registerLinkifier({
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.CLSLinkifier.CLSRect]);
  },
  async loadLinkifier() {
    const Timeline = await loadTimelineModule();
    return Timeline.CLSLinkifier.Linkifier.instance();
  }
});
UI11.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.load-from-file",
  order: 10
});
UI11.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.save-to-file",
  order: 15
});
Common11.Revealer.registerRevealer({
  contextTypes() {
    return [SDK6.TraceObject.TraceObject];
  },
  destination: Common11.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.TraceRevealer();
  }
});
Common11.Revealer.registerRevealer({
  contextTypes() {
    return [SDK6.TraceObject.RevealableEvent];
  },
  destination: Common11.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.EventRevealer();
  }
});
Common11.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.Utils.Helpers.RevealableInsight]);
  },
  destination: Common11.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.InsightRevealer();
  }
});

// gen/front_end/ui/legacy/components/perf_ui/perf_ui-meta.js
import * as Common12 from "./../../core/common/common.js";
import * as i18n28 from "./../../core/i18n/i18n.js";
import * as Root4 from "./../../core/root/root.js";
import * as UI12 from "./../../ui/legacy/legacy.js";
var UIStrings14 = {
  /**
   * @description Title of a setting under the Performance category in Settings.
   * Selected navigation allows switching between 2 different sets of shortcuts
   * and actions (like zoom on scroll or crtl/cmd + scroll) for navigating the performance panel.
   */
  flamechartSelectedNavigation: "Flamechart navigation:",
  /**
   * @description Modern navigation option in the Performance Panel.
   */
  modern: "Modern",
  /**
   * @description Classic navigation option in the Performance Panel.
   */
  classic: "Classic",
  /**
   * @description Title of a setting under the Memory category in Settings. Live memory is memory
   * that is still in-use by the program (not dead). Allocation of live memory is when the program
   * creates new memory. This is a setting that turns on extra annotations in the UI to mark these
   * allocations.
   */
  liveMemoryAllocationAnnotations: "Live memory allocation annotations",
  /**
   * @description Title of a setting under the Memory category that can be invoked through the Command Menu
   */
  showLiveMemoryAllocation: "Show live memory allocation annotations",
  /**
   * @description Title of a setting under the Memory category that can be invoked through the Command Menu
   */
  hideLiveMemoryAllocation: "Hide live memory allocation annotations",
  /**
   * @description Title of an action in the components tool to collect garbage
   */
  collectGarbage: "Collect garbage"
};
var str_14 = i18n28.i18n.registerUIStrings("ui/legacy/components/perf_ui/perf_ui-meta.ts", UIStrings14);
var i18nLazyString14 = i18n28.i18n.getLazilyComputedLocalizedString.bind(void 0, str_14);
var loadedPerfUIModule;
async function loadPerfUIModule() {
  if (!loadedPerfUIModule) {
    loadedPerfUIModule = await import("./../../ui/legacy/components/perf_ui/perf_ui.js");
  }
  return loadedPerfUIModule;
}
UI12.ActionRegistration.registerActionExtension({
  actionId: "components.collect-garbage",
  category: "PERFORMANCE",
  title: i18nLazyString14(UIStrings14.collectGarbage),
  iconClass: "mop",
  async loadActionDelegate() {
    const PerfUI = await loadPerfUIModule();
    return new PerfUI.GCActionDelegate.GCActionDelegate();
  }
});
Common12.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString14(UIStrings14.flamechartSelectedNavigation),
  settingName: "flamechart-selected-navigation",
  settingType: "enum",
  defaultValue: "classic",
  options: [
    {
      title: i18nLazyString14(UIStrings14.modern),
      text: i18nLazyString14(UIStrings14.modern),
      value: "modern"
    },
    {
      title: i18nLazyString14(UIStrings14.classic),
      text: i18nLazyString14(UIStrings14.classic),
      value: "classic"
    }
  ]
});
Common12.Settings.registerSettingExtension({
  category: "MEMORY",
  experiment: "live-heap-profile",
  title: i18nLazyString14(UIStrings14.liveMemoryAllocationAnnotations),
  settingName: "memory-live-heap-profile",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString14(UIStrings14.showLiveMemoryAllocation)
    },
    {
      value: false,
      title: i18nLazyString14(UIStrings14.hideLiveMemoryAllocation)
    }
  ]
});

// gen/front_end/ui/legacy/components/quick_open/quick_open-meta.js
import * as i18n30 from "./../../core/i18n/i18n.js";
import * as UI13 from "./../../ui/legacy/legacy.js";
var UIStrings15 = {
  /**
   * @description Title of action that opens a file
   */
  openFile: "Open file",
  /**
   * @description Title of command that runs a Quick Open command
   */
  runCommand: "Run command"
};
var str_15 = i18n30.i18n.registerUIStrings("ui/legacy/components/quick_open/quick_open-meta.ts", UIStrings15);
var i18nLazyString15 = i18n30.i18n.getLazilyComputedLocalizedString.bind(void 0, str_15);
var loadedQuickOpenModule;
async function loadQuickOpenModule() {
  if (!loadedQuickOpenModule) {
    loadedQuickOpenModule = await import("./../../ui/legacy/components/quick_open/quick_open.js");
  }
  return loadedQuickOpenModule;
}
UI13.ActionRegistration.registerActionExtension({
  actionId: "quick-open.show-command-menu",
  category: "GLOBAL",
  title: i18nLazyString15(UIStrings15.runCommand),
  async loadActionDelegate() {
    const QuickOpen2 = await loadQuickOpenModule();
    return new QuickOpen2.CommandMenu.ShowActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+P",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+P",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      shortcut: "F1",
      keybindSets: [
        "vsCode"
      ]
    }
  ]
});
UI13.ActionRegistration.registerActionExtension({
  actionId: "quick-open.show",
  category: "GLOBAL",
  title: i18nLazyString15(UIStrings15.openFile),
  async loadActionDelegate() {
    const QuickOpen2 = await loadQuickOpenModule();
    return new QuickOpen2.QuickOpen.ShowActionDelegate();
  },
  order: 100,
  bindings: [
    {
      platform: "mac",
      shortcut: "Meta+P",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+O",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+P",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+O",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
UI13.ContextMenu.registerItem({
  location: "mainMenu/default",
  actionId: "quick-open.show-command-menu",
  order: void 0
});
UI13.ContextMenu.registerItem({
  location: "mainMenu/default",
  actionId: "quick-open.show",
  order: void 0
});

// gen/front_end/ui/legacy/components/source_frame/source_frame-meta.js
import * as Common13 from "./../../core/common/common.js";
import * as i18n33 from "./../../core/i18n/i18n.js";
var UIStrings16 = {
  /**
   * @description Title of a setting under the Sources category in Settings
   */
  defaultIndentation: "Default indentation:",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  setIndentationToSpaces: "Set indentation to 2 spaces",
  /**
   * @description A drop-down menu option to set indentation to 2 spaces
   */
  Spaces: "2 spaces",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  setIndentationToFSpaces: "Set indentation to 4 spaces",
  /**
   * @description A drop-down menu option to set indentation to 4 spaces
   */
  fSpaces: "4 spaces",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  setIndentationToESpaces: "Set indentation to 8 spaces",
  /**
   * @description A drop-down menu option to set indentation to 8 spaces
   */
  eSpaces: "8 spaces",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  setIndentationToTabCharacter: "Set indentation to tab character",
  /**
   * @description A drop-down menu option to set indentation to tab character
   */
  tabCharacter: "Tab character"
};
var str_16 = i18n33.i18n.registerUIStrings("ui/legacy/components/source_frame/source_frame-meta.ts", UIStrings16);
var i18nLazyString16 = i18n33.i18n.getLazilyComputedLocalizedString.bind(void 0, str_16);
Common13.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString16(UIStrings16.defaultIndentation),
  settingName: "text-editor-indent",
  settingType: "enum",
  defaultValue: "    ",
  options: [
    {
      title: i18nLazyString16(UIStrings16.setIndentationToSpaces),
      text: i18nLazyString16(UIStrings16.Spaces),
      value: "  "
    },
    {
      title: i18nLazyString16(UIStrings16.setIndentationToFSpaces),
      text: i18nLazyString16(UIStrings16.fSpaces),
      value: "    "
    },
    {
      title: i18nLazyString16(UIStrings16.setIndentationToESpaces),
      text: i18nLazyString16(UIStrings16.eSpaces),
      value: "        "
    },
    {
      title: i18nLazyString16(UIStrings16.setIndentationToTabCharacter),
      text: i18nLazyString16(UIStrings16.tabCharacter),
      value: "	"
    }
  ]
});

// gen/front_end/entrypoints/rehydrated_devtools_app/rehydrated_devtools_app.prebundle.js
import * as Main from "./../main/main.js";
new Main.MainImpl.MainImpl();
//# sourceMappingURL=rehydrated_devtools_app.js.map
