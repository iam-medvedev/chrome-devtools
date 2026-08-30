// gen/front_end/entrypoints/main/main-meta.js
import * as Common from "../../core/common/common.js";
import * as Host from "../../core/host/host.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as Root from "../../core/root/root.js";
import * as SDK from "../../core/sdk/sdk.js";
import * as Badges from "../../models/badges/badges.js";
import * as Persistence from "../../models/persistence/persistence.js";
import * as Workspace from "../../models/workspace/workspace.js";
import * as Components from "../../ui/legacy/components/utils/utils.js";
import * as UI from "../../ui/legacy/legacy.js";
import * as SettingsUI from "../../ui/settings/settings.js";
var UIStrings = {
  /**
   * @description Title of a setting under the Persistence category in Settings.
   */
  localOverrides: "Local overrides",
  /**
   * @description A tag of enable local overrides setting that can be searched in the command menu.
   */
  interception: "interception",
  /**
   * @description A tag of enable local overrides setting that can be searched in the command menu.
   */
  override: "override",
  /**
   * @description A tag of group network by frame setting that can be searched in the command menu.
   */
  network: "network",
  /**
   * @description A tag of enable local overrides setting that can be searched in the command menu.
   */
  rewrite: "rewrite",
  /**
   * @description A tag of enable local overrides setting that can be searched in the command menu.
   * Noun for network request.
   */
  request: "request",
  /**
   * @description Title of an option under the Persistence category that can be invoked through the command menu.
   */
  enableOverrideNetworkRequests: "Enable override network requests",
  /**
   * @description Title of an option under the Persistence category that can be invoked through the command menu.
   */
  disableOverrideNetworkRequests: "Disable override network requests",
  /**
   * @description Label for a checkbox in the settings UI. Allows developers to opt-in/opt-out
   * of receiving Google Developer Program (GDP) badges based on their activity in Chrome DevTools.
   */
  earnBadges: "Earn badges",
  /**
   * @description Title of a setting under the Appearance category in Settings. When the webpage is
   * paused by devtools, an overlay is shown on top of the page to indicate that it is paused. The
   * overlay is a pause/unpause button and some text, which appears on top of the paused page. This
   * setting turns off this overlay.
   */
  disablePaused: "Disable paused state overlay",
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
    loadedMainModule = await import("../main/main.js");
  }
  return loadedMainModule;
}
async function loadInspectorMainModule() {
  if (!loadedInspectorMainModule) {
    loadedInspectorMainModule = await import("../inspector_main/inspector_main.js");
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
SettingsUI.SettingUIRegistration.register(SettingsUI.MainSettings.uiThemeSettingDescriptor, {
  category: "APPEARANCE",
  title: i18nLazyString(UIStrings.theme),
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
SettingsUI.SettingUIRegistration.register(SettingsUI.MainSettings.chromeThemeColorsSettingDescriptor, {
  category: "APPEARANCE",
  title: i18nLazyString(UIStrings.matchChromeColorScheme),
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
SettingsUI.SettingUIRegistration.register(SettingsUI.MainSettings.sidebarPositionSettingDescriptor, {
  category: "APPEARANCE",
  title: i18nLazyString(UIStrings.panelLayout),
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
SettingsUI.SettingUIRegistration.register(SettingsUI.MainSettings.languageSettingDescriptor, {
  category: "APPEARANCE",
  title: i18nLazyString(UIStrings.language),
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
SettingsUI.SettingUIRegistration.register(SettingsUI.MainSettings.shortcutPanelSwitchSettingDescriptor, {
  category: "APPEARANCE",
  title: Host.Platform.platform() === "mac" ? i18nLazyString(UIStrings.enableShortcutToSwitchPanels) : i18nLazyString(UIStrings.enableCtrlShortcutToSwitchPanels)
});
SettingsUI.SettingUIRegistration.register(SDK.SDKSettings.disablePausedStateOverlaySettingDescriptor, {
  category: "APPEARANCE",
  title: i18nLazyString(UIStrings.disablePaused)
});
SettingsUI.SettingUIRegistration.register(SettingsUI.MainSettings.currentDockStateSettingDescriptor, {
  category: "GLOBAL",
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
SettingsUI.SettingUIRegistration.register(SettingsUI.MainSettings.activeKeybindSetSettingDescriptor, {
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
SettingsUI.SettingUIRegistration.register(SettingsUI.MainSettings.syncPreferencesSettingDescriptor, {
  category: "ACCOUNT",
  title: i18nLazyString(UIStrings.saveSettings),
  reloadRequired: true
});
SettingsUI.SettingUIRegistration.register(Badges.receiveGdpBadgesSettingDescriptor, {
  category: "ACCOUNT",
  title: i18nLazyString(UIStrings.earnBadges),
  reloadRequired: true
});
SettingsUI.SettingUIRegistration.register(Persistence.NetworkPersistenceManager.persistenceNetworkOverridesEnabledSettingDescriptor, {
  category: "PERSISTENCE",
  title: i18nLazyString(UIStrings.localOverrides),
  tags: [
    i18nLazyString(UIStrings.interception),
    i18nLazyString(UIStrings.override),
    i18nLazyString(UIStrings.network),
    i18nLazyString(UIStrings.rewrite),
    i18nLazyString(UIStrings.request)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.enableOverrideNetworkRequests)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.disableOverrideNetworkRequests)
    }
  ]
});
SettingsUI.SettingUIRegistration.register(SettingsUI.MainSettings.searchAsYouTypeSettingDescriptor, {
  category: "GLOBAL",
  title: i18nLazyString(UIStrings.searchAsYouTypeSetting),
  order: 3,
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
    const isGeoRestricted2 = config?.aidaAvailability?.blockedByGeo === true;
    const isPolicyRestricted2 = config?.aidaAvailability?.blockedByEnterprisePolicy === true;
    return Boolean(isFlagEnabled && !isGeoRestricted2 && !isPolicyRestricted2);
  },
  loadItem: Common.Lazy.lazy(async () => {
    const Main2 = await loadMainModule();
    return new Main2.GlobalAiButton.GlobalAiButtonToolbarProvider();
  }),
  order: 98,
  location: "main-toolbar-right"
});
UI.Toolbar.registerToolbarItem({
  loadItem: Common.Lazy.lazy(async () => {
    const Main2 = await loadMainModule();
    return new Main2.MainImpl.SettingsButtonProvider();
  }),
  order: 99,
  location: "main-toolbar-right"
});
UI.Toolbar.registerToolbarItem({
  condition: () => !Root.Runtime.Runtime.isTraceApp(),
  loadItem: Common.Lazy.lazy(async () => {
    const Main2 = await loadMainModule();
    return new Main2.MainImpl.MainMenuItem();
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
    const Main2 = await loadMainModule();
    return new Main2.SimpleApp.SimpleAppProvider();
  },
  order: 10
});

// gen/front_end/entrypoints/inspector_main/inspector_main-meta.js
import * as Common2 from "../../core/common/common.js";
import * as i18n3 from "../../core/i18n/i18n.js";
import * as SDK2 from "../../core/sdk/sdk.js";
import * as UI2 from "../../ui/legacy/legacy.js";
import * as SettingsUI2 from "../../ui/settings/settings.js";
var UIStrings2 = {
  /**
   * @description The name of a checkbox setting in the Rendering tool. This setting
   * emulates that the webpage is in auto dark mode.
   */
  emulateAutoDarkMode: "Emulate auto dark mode",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  showPaintFlashingRectangles: "Show paint flashing rectangles",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  hidePaintFlashingRectangles: "Hide paint flashing rectangles",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  showLayoutShiftRegions: "Show layout shift regions",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  hideLayoutShiftRegions: "Hide layout shift regions",
  /**
   * @description Text to highlight the rendering frames for ads.
   */
  highlightAdFrames: "Highlight ad frames",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  doNotHighlightAdFrames: "Do not highlight ad frames",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  showLayerBorders: "Show layer borders",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  hideLayerBorders: "Hide layer borders",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  showFramesPerSecondFpsMeter: "Show frames per second (FPS) meter",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  hideFramesPerSecondFpsMeter: "Hide frames per second (FPS) meter",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  showScrollPerformanceBottlenecks: "Show scroll performance bottlenecks",
  /**
   * @description Title of an option under the Rendering category that can be invoked through the Command Menu.
   */
  hideScrollPerformanceBottlenecks: "Hide scroll performance bottlenecks",
  /**
   * @description Title of a Rendering setting that can be invoked through the Command Menu.
   */
  emulateAFocusedPage: "Emulate a focused page",
  /**
   * @description Title of a Rendering setting that can be invoked through the Command Menu.
   */
  doNotEmulateAFocusedPage: "Do not emulate a focused page",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu.
   */
  doNotEmulateCssMediaType: "Do not emulate CSS media type",
  /**
   * @description A drop-down menu option to do not emulate css media type.
   */
  noEmulation: "No emulation",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu.
   */
  emulateCssPrintMediaType: "Emulate CSS print media type",
  /**
   * @description A drop-down menu option to emulate css print media type.
   */
  print: "print",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu.
   */
  emulateCssScreenMediaType: "Emulate CSS screen media type",
  /**
   * @description A drop-down menu option to emulate css screen media type.
   */
  screen: "screen",
  /**
   * @description A tag of Emulate CSS screen media type setting that can be searched in the command menu.
   */
  query: "query",
  /**
   * @description Title of a setting under the Rendering drawer.
   */
  emulateCssMediaType: "Emulate CSS media type",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu.
   * @example {prefers-color-scheme} PH1
   */
  doNotEmulateCss: "Do not emulate CSS {PH1}",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu.
   * @example {prefers-color-scheme: light} PH1
   */
  emulateCss: "Emulate CSS {PH1}",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu.
   * @example {prefers-color-scheme} PH1
   */
  emulateCssMediaFeature: "Emulate CSS media feature {PH1}",
  /**
   * @description Title of the Rendering panel. The Rendering panel is a collection of settings that
   * lets the user debug the rendering (i.e. how the website is drawn onto the screen) of the
   * website (https://developer.chrome.com/docs/devtools/evaluate-performance/reference#rendering).
   */
  rendering: "Rendering",
  /**
   * @description Command for showing the Rendering panel.
   */
  showRendering: "Show Rendering",
  /**
   * @description Command Menu search query that points to the Rendering panel. This refers to the
   * process of drawing pixels onto the screen (called painting).
   */
  paint: "paint",
  /**
   * @description Command Menu search query that points to the Rendering panel. Layout is a phase of
   * rendering a website where the browser calculates where different elements in the website will go
   * on the screen.
   */
  layout: "layout",
  /**
   * @description Command Menu search query that points to the Rendering panel. 'fps' is an acronym
   * for 'Frames per second'. It is in lowercase here because the search box the user will type this
   * into is case-insensitive. If there is an equivalent acronym/shortening in the target language
   * then a translation would be appropriate, otherwise it can be left in English.
   */
  fps: "fps",
  /**
   * @description Command Menu search query that points to the Rendering panel
   * (https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types). This is something the user
   * might type in to search for the setting to change the CSS media type.
   */
  cssMediaType: "CSS media type",
  /**
   * @description Command Menu search query that points to the Rendering panel
   * (https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features). This is something the
   * user might type in to search for the setting to change the value of various CSS media features.
   */
  cssMediaFeature: "CSS media feature",
  /**
   * @description Command Menu search query that points to the Rendering panel. Possible search term
   * when the user wants to find settings related to visual impairment e.g. blurry vision, blindness.
   */
  visionDeficiency: "vision deficiency",
  /**
   * @description Command Menu search query that points to the Rendering panel. Possible search term
   * when the user wants to find settings related to color vision deficiency/color blindness.
   */
  colorVisionDeficiency: "color vision deficiency",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu.
   */
  doNotEmulateAnyVisionDeficiency: "Do not emulate any vision deficiency",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu.
   */
  emulateBlurredVision: "Emulate blurred vision",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu.
   */
  emulateReducedContrast: "Emulate reduced contrast",
  /**
   * @description Name of a vision deficiency that can be emulated via the Rendering drawer.
   */
  blurredVision: "Blurred vision",
  /**
   * @description Name of a vision deficiency that can be emulated via the Rendering drawer.
   */
  reducedContrast: "Reduced contrast",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu.
   */
  emulateProtanopia: "Emulate protanopia (no red)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer.
   */
  protanopia: "Protanopia (no red)",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu.
   */
  emulateDeuteranopia: "Emulate deuteranopia (no green)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer.
   */
  deuteranopia: "Deuteranopia (no green)",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu.
   */
  emulateTritanopia: "Emulate tritanopia (no blue)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer.
   */
  tritanopia: "Tritanopia (no blue)",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu.
   */
  emulateAchromatopsia: "Emulate achromatopsia (no color)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer.
   */
  achromatopsia: "Achromatopsia (no color)",
  /**
   * @description Title of a setting under the Rendering drawer.
   */
  emulateVisionDeficiencies: "Emulate vision deficiencies",
  /**
   * @description Title of a setting under the Rendering drawer.
   */
  emulateOsTextScale: "Emulate OS text scale",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu.
   */
  doNotEmulateOsTextScale: "Do not emulate OS text scale",
  /**
   * @description A drop-down menu option to not emulate OS text scale.
   */
  osTextScaleEmulationNone: "No emulation",
  /**
   * @description A drop-down menu option to emulate an OS text scale 85%.
   */
  osTextScaleEmulation85: "85%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 100%.
   */
  osTextScaleEmulation100: "100% (default)",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 115%.
   */
  osTextScaleEmulation115: "115%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 130%.
   */
  osTextScaleEmulation130: "130%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 150%.
   */
  osTextScaleEmulation150: "150%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 180%.
   */
  osTextScaleEmulation180: "180%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 200%.
   */
  osTextScaleEmulation200: "200%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 250%.
   */
  osTextScaleEmulation250: "250%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 300%.
   */
  osTextScaleEmulation300: "300%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 350%.
   */
  osTextScaleEmulation350: "350%",
  /**
   * @description Text that refers to disabling local fonts.
   */
  disableLocalFonts: "Disable local fonts",
  /**
   * @description Text that refers to enabling local fonts.
   */
  enableLocalFonts: "Enable local fonts",
  /**
   * @description Title of a setting that disables AVIF format.
   */
  disableAvifFormat: "Disable `AVIF` format",
  /**
   * @description Title of a setting that enables AVIF format.
   */
  enableAvifFormat: "Enable `AVIF` format",
  /**
   * @description Title of a setting that disables JPEG XL format.
   */
  disableJpegXlFormat: "Disable `JPEG XL` format",
  /**
   * @description Title of a setting that enables JPEG XL format.
   */
  enableJpegXlFormat: "Enable `JPEG XL` format",
  /**
   * @description Title of a setting that disables WebP format.
   */
  disableWebpFormat: "Disable `WebP` format",
  /**
   * @description Title of a setting that enables WebP format.
   */
  enableWebpFormat: "Enable `WebP` format",
  /**
   * @description Title of an action that reloads the inspected page.
   */
  reloadPage: "Reload page",
  /**
   * @description Title of an action that hard reloads the inspected page. A hard reload also
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
   * @description Title of an action that toggles the "forces CSS prefers-color-scheme" media feature.
   */
  toggleCssPrefersColorSchemeMedia: "Toggle CSS media feature `prefers-color-scheme`"
};
var str_2 = i18n3.i18n.registerUIStrings("entrypoints/inspector_main/inspector_main-meta.ts", UIStrings2);
var i18nLazyString2 = i18n3.i18n.getLazilyComputedLocalizedString.bind(void 0, str_2);
var loadedInspectorMainModule2;
async function loadInspectorMainModule2() {
  if (!loadedInspectorMainModule2) {
    loadedInspectorMainModule2 = await import("../inspector_main/inspector_main.js");
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
SettingsUI2.SettingUIRegistration.register(SettingsUI2.InspectorMainSettings.adBlockingEnabledSettingDescriptor, {
  category: "NETWORK",
  title: i18nLazyString2(UIStrings2.forceAdBlocking),
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
SettingsUI2.SettingUIRegistration.register(SettingsUI2.InspectorMainSettings.autoAttachToCreatedPagesSettingDescriptor, {
  category: "GLOBAL",
  title: i18nLazyString2(UIStrings2.autoOpenDevTools),
  order: 2,
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
UI2.Toolbar.registerToolbarItem({
  async loadItem() {
    const InspectorMain = await loadInspectorMainModule2();
    return new InspectorMain.InspectorMain.NodeIndicatorProvider();
  },
  order: 2,
  location: "main-toolbar-left"
});
UI2.Toolbar.registerToolbarItem({
  loadItem: Common2.Lazy.lazy(async () => {
    const InspectorMain = await loadInspectorMainModule2();
    return new InspectorMain.OutermostTargetSelector.OutermostTargetSelector();
  }),
  order: 97,
  location: "main-toolbar-right"
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.showPaintRectsSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.showPaintFlashingRectangles)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.hidePaintFlashingRectangles)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.showLayoutShiftRegionsSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.showLayoutShiftRegions)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.hideLayoutShiftRegions)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.showAdHighlightsSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.highlightAdFrames)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.doNotHighlightAdFrames)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.showDebugBordersSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.showLayerBorders)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.hideLayerBorders)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.showFPSCounterSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.showFramesPerSecondFpsMeter)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.hideFramesPerSecondFpsMeter)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.showScrollBottleneckRectsSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.showScrollPerformanceBottlenecks)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.hideScrollPerformanceBottlenecks)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatePageFocusSettingDescriptor, {
  category: "RENDERING",
  title: i18nLazyString2(UIStrings2.emulateAFocusedPage),
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.emulateAFocusedPage)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.doNotEmulateAFocusedPage)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatedCSSMediaSettingDescriptor, {
  category: "RENDERING",
  title: i18nLazyString2(UIStrings2.emulateCssMediaType),
  options: [
    {
      title: i18nLazyString2(UIStrings2.doNotEmulateCssMediaType),
      text: i18nLazyString2(UIStrings2.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCssPrintMediaType),
      text: i18nLazyString2(UIStrings2.print),
      value: "print"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCssScreenMediaType),
      text: i18nLazyString2(UIStrings2.screen),
      value: "screen"
    }
  ],
  tags: [
    i18nLazyString2(UIStrings2.query)
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatedCSSMediaFeaturePrefersColorSchemeSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      title: i18nLazyString2(UIStrings2.doNotEmulateCss, { PH1: "prefers-color-scheme" }),
      text: i18nLazyString2(UIStrings2.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "prefers-color-scheme: light" }),
      text: i18n3.i18n.lockedLazyString("prefers-color-scheme: light"),
      value: "light"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "prefers-color-scheme: dark" }),
      text: i18n3.i18n.lockedLazyString("prefers-color-scheme: dark"),
      value: "dark"
    }
  ],
  tags: [
    i18nLazyString2(UIStrings2.query)
  ],
  title: i18nLazyString2(UIStrings2.emulateCssMediaFeature, { PH1: "prefers-color-scheme" })
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatedCSSMediaFeatureForcedColorsSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      title: i18nLazyString2(UIStrings2.doNotEmulateCss, { PH1: "forced-colors" }),
      text: i18nLazyString2(UIStrings2.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "forced-colors: active" }),
      text: i18n3.i18n.lockedLazyString("forced-colors: active"),
      value: "active"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "forced-colors: none" }),
      text: i18n3.i18n.lockedLazyString("forced-colors: none"),
      value: "none"
    }
  ],
  tags: [
    i18nLazyString2(UIStrings2.query)
  ],
  title: i18nLazyString2(UIStrings2.emulateCssMediaFeature, { PH1: "forced-colors" })
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatedCSSMediaFeaturePrefersReducedMotionSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      title: i18nLazyString2(UIStrings2.doNotEmulateCss, { PH1: "prefers-reduced-motion" }),
      text: i18nLazyString2(UIStrings2.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "prefers-reduced-motion: reduce" }),
      text: i18n3.i18n.lockedLazyString("prefers-reduced-motion: reduce"),
      value: "reduce"
    }
  ],
  tags: [
    i18nLazyString2(UIStrings2.query)
  ],
  title: i18nLazyString2(UIStrings2.emulateCssMediaFeature, { PH1: "prefers-reduced-motion" })
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatedCSSMediaFeaturePrefersContrastSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      title: i18nLazyString2(UIStrings2.doNotEmulateCss, { PH1: "prefers-contrast" }),
      text: i18nLazyString2(UIStrings2.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "prefers-contrast: more" }),
      text: i18n3.i18n.lockedLazyString("prefers-contrast: more"),
      value: "more"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "prefers-contrast: less" }),
      text: i18n3.i18n.lockedLazyString("prefers-contrast: less"),
      value: "less"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "prefers-contrast: custom" }),
      text: i18n3.i18n.lockedLazyString("prefers-contrast: custom"),
      value: "custom"
    }
  ],
  tags: [
    i18nLazyString2(UIStrings2.query)
  ],
  title: i18nLazyString2(UIStrings2.emulateCssMediaFeature, { PH1: "prefers-contrast" })
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatedCSSMediaFeaturePrefersReducedDataSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      title: i18nLazyString2(UIStrings2.doNotEmulateCss, { PH1: "prefers-reduced-data" }),
      text: i18nLazyString2(UIStrings2.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "prefers-reduced-data: reduce" }),
      text: i18n3.i18n.lockedLazyString("prefers-reduced-data: reduce"),
      value: "reduce"
    }
  ],
  tags: [
    i18nLazyString2(UIStrings2.query)
  ],
  title: i18nLazyString2(UIStrings2.emulateCssMediaFeature, { PH1: "prefers-reduced-data" })
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatedCSSMediaFeaturePrefersReducedTransparencySettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      title: i18nLazyString2(UIStrings2.doNotEmulateCss, { PH1: "prefers-reduced-transparency" }),
      text: i18nLazyString2(UIStrings2.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "prefers-reduced-transparency: reduce" }),
      text: i18n3.i18n.lockedLazyString("prefers-reduced-transparency: reduce"),
      value: "reduce"
    }
  ],
  tags: [
    i18nLazyString2(UIStrings2.query)
  ],
  title: i18nLazyString2(UIStrings2.emulateCssMediaFeature, { PH1: "prefers-reduced-transparency" })
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatedCSSMediaFeatureColorGamutSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      title: i18nLazyString2(UIStrings2.doNotEmulateCss, { PH1: "color-gamut" }),
      text: i18nLazyString2(UIStrings2.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "color-gamut: srgb" }),
      text: i18n3.i18n.lockedLazyString("color-gamut: srgb"),
      value: "srgb"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "color-gamut: p3" }),
      text: i18n3.i18n.lockedLazyString("color-gamut: p3"),
      value: "p3"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateCss, { PH1: "color-gamut: rec2020" }),
      text: i18n3.i18n.lockedLazyString("color-gamut: rec2020"),
      value: "rec2020"
    }
  ],
  tags: [
    i18nLazyString2(UIStrings2.query)
  ],
  title: i18nLazyString2(UIStrings2.emulateCssMediaFeature, { PH1: "color-gamut" })
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatedVisionDeficiencySettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      title: i18nLazyString2(UIStrings2.doNotEmulateAnyVisionDeficiency),
      text: i18nLazyString2(UIStrings2.noEmulation),
      value: "none"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateBlurredVision),
      text: i18nLazyString2(UIStrings2.blurredVision),
      value: "blurredVision"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateReducedContrast),
      text: i18nLazyString2(UIStrings2.reducedContrast),
      value: "reducedContrast"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateProtanopia),
      text: i18nLazyString2(UIStrings2.protanopia),
      value: "protanopia"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateDeuteranopia),
      text: i18nLazyString2(UIStrings2.deuteranopia),
      value: "deuteranopia"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateTritanopia),
      text: i18nLazyString2(UIStrings2.tritanopia),
      value: "tritanopia"
    },
    {
      title: i18nLazyString2(UIStrings2.emulateAchromatopsia),
      text: i18nLazyString2(UIStrings2.achromatopsia),
      value: "achromatopsia"
    }
  ],
  tags: [
    i18nLazyString2(UIStrings2.query)
  ],
  title: i18nLazyString2(UIStrings2.emulateVisionDeficiencies)
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulatedOSTextScaleSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      title: i18nLazyString2(UIStrings2.doNotEmulateOsTextScale),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulationNone),
      value: ""
    },
    {
      title: i18nLazyString2(UIStrings2.osTextScaleEmulation85),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulation85),
      value: "0.85"
    },
    {
      title: i18nLazyString2(UIStrings2.osTextScaleEmulation100),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulation100),
      value: "1"
    },
    {
      title: i18nLazyString2(UIStrings2.osTextScaleEmulation115),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulation115),
      value: "1.15"
    },
    {
      title: i18nLazyString2(UIStrings2.osTextScaleEmulation130),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulation130),
      value: "1.3"
    },
    {
      title: i18nLazyString2(UIStrings2.osTextScaleEmulation150),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulation150),
      value: "1.5"
    },
    {
      title: i18nLazyString2(UIStrings2.osTextScaleEmulation180),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulation180),
      value: "1.8"
    },
    {
      title: i18nLazyString2(UIStrings2.osTextScaleEmulation200),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulation200),
      value: "2"
    },
    {
      title: i18nLazyString2(UIStrings2.osTextScaleEmulation250),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulation250),
      value: "2.5"
    },
    {
      title: i18nLazyString2(UIStrings2.osTextScaleEmulation300),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulation300),
      value: "3"
    },
    {
      title: i18nLazyString2(UIStrings2.osTextScaleEmulation350),
      text: i18nLazyString2(UIStrings2.osTextScaleEmulation350),
      value: "3.5"
    }
  ],
  tags: [
    i18nLazyString2(UIStrings2.query)
  ],
  title: i18nLazyString2(UIStrings2.emulateOsTextScale)
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.localFontsDisabledSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.disableLocalFonts)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.enableLocalFonts)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.avifFormatDisabledSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.disableAvifFormat)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.enableAvifFormat)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.jpegXlFormatDisabledSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.disableJpegXlFormat)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.enableJpegXlFormat)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.webpFormatDisabledSettingDescriptor, {
  category: "RENDERING",
  options: [
    {
      value: true,
      title: i18nLazyString2(UIStrings2.disableWebpFormat)
    },
    {
      value: false,
      title: i18nLazyString2(UIStrings2.enableWebpFormat)
    }
  ]
});
SettingsUI2.SettingUIRegistration.register(SDK2.SDKSettings.emulateAutoDarkModeSettingDescriptor, {
  category: "RENDERING",
  title: i18nLazyString2(UIStrings2.emulateAutoDarkMode)
});

// gen/front_end/entrypoints/trace_app/trace_app.prebundle.js
import "../../Images/Images.js";

// gen/front_end/panels/browser_debugger/browser_debugger-meta.js
import * as Common3 from "../../core/common/common.js";
import * as i18n5 from "../../core/i18n/i18n.js";
import * as Root2 from "../../core/root/root.js";
import * as SDK3 from "../../core/sdk/sdk.js";
import * as UI3 from "../../ui/legacy/legacy.js";
var UIStrings3 = {
  /**
   * @description Command for showing the Event listener breakpoints sidebar in the Sources panel.
   */
  showEventListenerBreakpoints: "Show Event listener breakpoints",
  /**
   * @description Title of the Event listener breakpoints sidebar in the Sources panel.
   */
  eventListenerBreakpoints: "Event listener breakpoints",
  /**
   * @description Command for showing the CSP violation breakpoints sidebar in the Sources panel.
   */
  showCspViolationBreakpoints: "Show CSP violation breakpoints",
  /**
   * @description Title of the CSP violation breakpoints sidebar in the Sources panel.
   */
  cspViolationBreakpoints: "CSP violation breakpoints",
  /**
   * @description Command for showing the XHR/fetch breakpoints sidebar in the Sources panel.
   */
  showXhrfetchBreakpoints: "Show XHR/fetch breakpoints",
  /**
   * @description Title of the XHR/fetch breakpoints sidebar in the Sources panel.
   */
  xhrfetchBreakpoints: "XHR/fetch breakpoints",
  /**
   * @description Command for showing the DOM breakpoints sidebar.
   */
  showDomBreakpoints: "Show DOM breakpoints",
  /**
   * @description Title of the DOM breakpoints sidebar.
   */
  domBreakpoints: "DOM breakpoints",
  /**
   * @description Command for showing the Global listeners sidebar in the Sources panel.
   */
  showGlobalListeners: "Show Global listeners",
  /**
   * @description Title of the Global listeners sidebar in the Sources panel.
   */
  globalListeners: "Global listeners",
  /**
   * @description Title of the Page tab in the Sources panel.
   */
  page: "Page",
  /**
   * @description Command for showing the Page tab in the Sources panel.
   */
  showPage: "Show Page",
  /**
   * @description Title of the Overrides tab in the Sources panel.
   */
  overrides: "Overrides",
  /**
   * @description Command for showing the Overrides tab in the Sources panel.
   */
  showOverrides: "Show Overrides",
  /**
   * @description Title of the Content scripts tab in the Sources panel.
   */
  contentScripts: "Content scripts",
  /**
   * @description Command for showing the Content scripts tab in the Sources panel.
   */
  showContentScripts: "Show Content scripts",
  /**
   * @description Label for a button in the Sources panel that refreshes the list of global event listeners.
   */
  refreshGlobalListeners: "Refresh global listeners"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/browser_debugger/browser_debugger-meta.ts", UIStrings3);
var i18nLazyString3 = i18n5.i18n.getLazilyComputedLocalizedString.bind(void 0, str_3);
var loadedBrowserDebuggerModule;
async function loadBrowserDebuggerModule() {
  if (!loadedBrowserDebuggerModule) {
    loadedBrowserDebuggerModule = await import("../../panels/browser_debugger/browser_debugger.js");
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
    loadedSourcesModule = await import("../../panels/sources/sources.js");
  }
  return loadedSourcesModule;
}
UI3.ViewManager.registerViewExtension({
  loadView: Common3.Lazy.lazy(async (universe) => {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return new BrowserDebugger.EventListenerBreakpointsSidebarPane.EventListenerBreakpointsSidebarPane(universe.eventBreakpointsManager);
  }),
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
  async loadView(universe) {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.NetworkNavigatorView.instance({ forceNew: null, networkProjectManager: universe.networkProjectManager });
  }
});
UI3.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-overrides",
  title: i18nLazyString3(UIStrings3.overrides),
  commandPrompt: i18nLazyString3(UIStrings3.showOverrides),
  order: 4,
  persistence: "permanent",
  condition: () => !Root2.Runtime.Runtime.isTraceApp(),
  async loadView(universe) {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.OverridesNavigatorView.instance({ forceNew: null, networkProjectManager: universe.networkProjectManager });
  }
});
UI3.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-content-scripts",
  title: i18nLazyString3(UIStrings3.contentScripts),
  commandPrompt: i18nLazyString3(UIStrings3.showContentScripts),
  order: 5,
  persistence: "permanent",
  condition: () => Root2.Runtime.getPathName() !== "/bundled/worker_app.html" && !Root2.Runtime.Runtime.isTraceApp(),
  async loadView(universe) {
    const Sources = await loadSourcesModule();
    return new Sources.SourcesNavigator.ContentScriptsNavigatorView(universe.networkProjectManager);
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
    return maybeRetrieveContextTypes((BrowserDebugger) => [
      BrowserDebugger.ObjectEventListenersSidebarPane.ObjectEventListenersSidebarPane
    ]);
  }
});
UI3.ContextMenu.registerProvider({
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
UI3.Context.registerListener({
  contextTypes() {
    return [SDK3.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.XHRBreakpointsSidebarPane.XHRBreakpointsSidebarPane.instance();
  }
});
UI3.Context.registerListener({
  contextTypes() {
    return [SDK3.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const BrowserDebugger = await loadBrowserDebuggerModule();
    return BrowserDebugger.DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance();
  }
});

// gen/front_end/panels/developer_resources/developer_resources-meta.js
import * as Common4 from "../../core/common/common.js";
import * as i18n7 from "../../core/i18n/i18n.js";
import * as SDK4 from "../../core/sdk/sdk.js";
import * as UI4 from "../../ui/legacy/legacy.js";
var UIStrings4 = {
  /**
   * @description Title for the Developer resources panel.
   */
  developerResources: "Developer resources",
  /**
   * @description Command for showing the Developer resources panel.
   */
  showDeveloperResources: "Show Developer resources"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/developer_resources/developer_resources-meta.ts", UIStrings4);
var i18nLazyString4 = i18n7.i18n.getLazilyComputedLocalizedString.bind(void 0, str_4);
var loadedDeveloperResourcesModule;
async function loadDeveloperResourcesModule() {
  if (!loadedDeveloperResourcesModule) {
    loadedDeveloperResourcesModule = await import("../../panels/developer_resources/developer_resources.js");
  }
  return loadedDeveloperResourcesModule;
}
UI4.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "developer-resources",
  title: i18nLazyString4(UIStrings4.developerResources),
  commandPrompt: i18nLazyString4(UIStrings4.showDeveloperResources),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const DeveloperResources = await loadDeveloperResourcesModule();
    return new DeveloperResources.DeveloperResourcesView.DeveloperResourcesView();
  }
});
Common4.Revealer.registerRevealer({
  contextTypes() {
    return [SDK4.PageResourceLoader.ResourceKey];
  },
  destination: Common4.Revealer.RevealerDestination.DEVELOPER_RESOURCES_PANEL,
  async loadRevealer() {
    const DeveloperResources = await loadDeveloperResourcesModule();
    return new DeveloperResources.DeveloperResourcesView.DeveloperResourcesRevealer();
  }
});

// gen/front_end/panels/mobile_throttling/mobile_throttling-meta.js
import * as Common5 from "../../core/common/common.js";
import * as i18n9 from "../../core/i18n/i18n.js";
import * as UI5 from "../../ui/legacy/legacy.js";
var UIStrings5 = {
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
var str_5 = i18n9.i18n.registerUIStrings("panels/mobile_throttling/mobile_throttling-meta.ts", UIStrings5);
var i18nLazyString5 = i18n9.i18n.getLazilyComputedLocalizedString.bind(void 0, str_5);
var loadedMobileThrottlingModule;
async function loadMobileThrottlingModule() {
  if (!loadedMobileThrottlingModule) {
    loadedMobileThrottlingModule = await import("../../panels/mobile_throttling/mobile_throttling.js");
  }
  return loadedMobileThrottlingModule;
}
UI5.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "throttling-conditions",
  title: i18nLazyString5(UIStrings5.throttling),
  commandPrompt: i18nLazyString5(UIStrings5.showThrottling),
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
UI5.ActionRegistration.registerActionExtension({
  actionId: "network-conditions.network-offline",
  category: "NETWORK",
  title: i18nLazyString5(UIStrings5.goOffline),
  async loadActionDelegate() {
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
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
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
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
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
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
    const MobileThrottling = await loadMobileThrottlingModule();
    return new MobileThrottling.ThrottlingManager.ActionDelegate();
  },
  tags: [
    i18nLazyString5(UIStrings5.device),
    i18nLazyString5(UIStrings5.throttlingTag)
  ]
});
Common5.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "custom-network-conditions",
  settingType: "array",
  defaultValue: []
});

// gen/front_end/panels/protocol_monitor/protocol_monitor-meta.js
import * as i18n11 from "../../core/i18n/i18n.js";
import * as Root3 from "../../core/root/root.js";
import * as UI6 from "../../ui/legacy/legacy.js";
var UIStrings6 = {
  /**
   * @description Title of the 'Protocol monitor' tool in the bottom drawer. This is a tool for
   * viewing and inspecting 'protocol' messages which are sent/received by DevTools. 'protocol' here
   * could be left untranslated as this refers to the Chrome DevTools Protocol (CDP) which is a
   * specific API name.
   */
  protocolMonitor: "Protocol monitor",
  /**
   * @description Command in the command menu for showing the 'Protocol monitor' tool in the bottom drawer.
   */
  showProtocolMonitor: "Show Protocol monitor"
};
var str_6 = i18n11.i18n.registerUIStrings("panels/protocol_monitor/protocol_monitor-meta.ts", UIStrings6);
var i18nLazyString6 = i18n11.i18n.getLazilyComputedLocalizedString.bind(void 0, str_6);
var loadedProtocolMonitorModule;
async function loadProtocolMonitorModule() {
  if (!loadedProtocolMonitorModule) {
    loadedProtocolMonitorModule = await import("../../panels/protocol_monitor/protocol_monitor.js");
  }
  return loadedProtocolMonitorModule;
}
UI6.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "protocol-monitor",
  title: i18nLazyString6(UIStrings6.protocolMonitor),
  commandPrompt: i18nLazyString6(UIStrings6.showProtocolMonitor),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const ProtocolMonitor = await loadProtocolMonitorModule();
    return new ProtocolMonitor.ProtocolMonitor.ProtocolMonitorImpl();
  },
  experiment: Root3.ExperimentNames.ExperimentName.PROTOCOL_MONITOR
});

// gen/front_end/panels/settings/settings-meta.js
import * as i18n13 from "../../core/i18n/i18n.js";
import * as UI7 from "../../ui/legacy/legacy.js";
import * as Common6 from "../../core/common/common.js";
import * as i18n32 from "../../core/i18n/i18n.js";
import * as Root4 from "../../core/root/root.js";
import * as UI22 from "../../ui/legacy/legacy.js";
var UIStrings7 = {
  /**
   * @description Title of the Devices tab/tool. Devices refers to e.g., phones/tablets.
   */
  devices: "Devices",
  /**
   * @description Command that opens the device emulation view.
   */
  showDevices: "Show Devices"
};
var str_7 = i18n13.i18n.registerUIStrings("panels/settings/emulation/emulation-meta.ts", UIStrings7);
var i18nLazyString7 = i18n13.i18n.getLazilyComputedLocalizedString.bind(void 0, str_7);
var loadedEmulationModule;
async function loadEmulationModule() {
  if (!loadedEmulationModule) {
    loadedEmulationModule = await import("../../panels/settings/emulation/emulation.js");
  }
  return loadedEmulationModule;
}
UI7.ViewManager.registerViewExtension({
  location: "settings-view",
  commandPrompt: i18nLazyString7(UIStrings7.showDevices),
  title: i18nLazyString7(UIStrings7.devices),
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
   * @description Text for keyboard shortcuts.
   */
  shortcuts: "Shortcuts",
  /**
   * @description Text in Settings.
   */
  preferences: "Preferences",
  /**
   * @description Text in Settings.
   */
  experiments: "Experiments",
  /**
   * @description Title of Ignore list settings.
   */
  ignoreList: "Ignore list",
  /**
   * @description Command for showing the keyboard shortcuts in Settings.
   */
  showShortcuts: "Show Shortcuts",
  /**
   * @description Command for showing the Preferences tab in Settings.
   */
  showPreferences: "Show Preferences",
  /**
   * @description Command for showing the Experiments tab in Settings.
   */
  showExperiments: "Show Experiments",
  /**
   * @description Command for showing the Ignore list settings.
   */
  showIgnoreList: "Show Ignore list",
  /**
   * @description Name of the Settings view.
   */
  settings: "Settings",
  /**
   * @description Text for the documentation of something.
   */
  documentation: "Documentation",
  /**
   * @description Text for AI innovations settings.
   */
  aiInnovations: "AI innovations",
  /**
   * @description Command for showing the AI innovations settings.
   */
  showAiInnovations: "Show AI innovations",
  /**
   * @description Text of a DOM element in Workspace settings tab of the Workspace settings in Settings.
   */
  workspace: "Workspace",
  /**
   * @description Command for showing the Workspace tool in Settings.
   */
  showWorkspace: "Show Workspace settings"
};
var str_22 = i18n32.i18n.registerUIStrings("panels/settings/settings-meta.ts", UIStrings22);
var i18nLazyString22 = i18n32.i18n.getLazilyComputedLocalizedString.bind(void 0, str_22);
var loadedSettingsModule;
async function loadSettingsModule() {
  if (!loadedSettingsModule) {
    loadedSettingsModule = await import("../../panels/settings/settings.js");
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
    return new Settings22.AISettingsTab.AISettingsTab();
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
  experiment: Root4.ExperimentNames.ExperimentName.ALL,
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
Common6.Revealer.registerRevealer({
  contextTypes() {
    return [
      Common6.Settings.Setting,
      Root4.Runtime.Experiment
    ];
  },
  async loadRevealer() {
    const Settings22 = await loadSettingsModule();
    return new Settings22.SettingsScreen.Revealer();
  }
});
UI22.ContextMenu.registerItem({
  location: "mainMenu/footer",
  actionId: "settings.shortcuts"
});
UI22.ContextMenu.registerItem({
  location: "mainMenuHelp/default",
  actionId: "settings.documentation"
});

// gen/front_end/panels/sources/sources-meta.js
import * as Common7 from "../../core/common/common.js";
import * as Host2 from "../../core/host/host.js";
import * as i18n16 from "../../core/i18n/i18n.js";
import * as Root5 from "../../core/root/root.js";
import * as SDK5 from "../../core/sdk/sdk.js";
import * as Breakpoints from "../../models/breakpoints/breakpoints.js";
import * as StackTrace from "../../models/stack_trace/stack_trace.js";
import * as Workspace2 from "../../models/workspace/workspace.js";
import * as ObjectUI from "../../ui/legacy/components/object_ui/object_ui.js";
import * as QuickOpen from "../../ui/legacy/components/quick_open/quick_open.js";
import * as UI8 from "../../ui/legacy/legacy.js";
import * as SettingsUI3 from "../../ui/settings/settings.js";
var UIStrings8 = {
  /**
   * @description Label of a checkbox in the DevTools settings UI.
   */
  enableRemoteFileLoading: "Allow loading remote file path resources in DevTools",
  /**
   * @description Tooltip text for a setting that controls whether external resource can be loaded in DevTools.
   */
  remoteFileLoadingInfo: "Example resources are source maps. Disabled by default for security reasons.",
  /**
   * @description Title of a setting under the Debugger category in Settings.
   */
  disableAsyncStackTraces: "Disable async stack traces",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu.
   */
  doNotCaptureAsyncStackTraces: "Do not capture async stack traces",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu.
   */
  captureAsyncStackTraces: "Capture async stack traces",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu.
   */
  disableJavascript: "Disable JavaScript",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu.
   */
  enableJavascript: "Enable JavaScript",
  /**
   * @description Text for pausing the debugger on exceptions.
   */
  pauseOnExceptions: "Pause on exceptions",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu.
   */
  doNotPauseOnExceptions: "Do not pause on exceptions",
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
   * @description Title of an action under the Debugger category that can be invoked through the command menu
   */
  pauseScriptExecution: "Pause script execution",
  /**
   * @description Title of an action under the Debugger category that can be invoked through the command menu
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
   * @description Text in JavaScript breakpoint sidebar of the Sources panel.
   */
  deactivateBreakpoints: "Deactivate breakpoints",
  /**
   * @description Text in JavaScript breakpoint sidebar of the Sources panel.
   */
  activateBreakpoints: "Activate breakpoints",
  /**
   * @description Title of an action in the sources tool to add to watch.
   */
  addSelectedTextToWatches: "Add selected text to watches",
  /**
   * @description Title of an action in the debugger tool to evaluate selection.
   */
  evaluateSelectedTextInConsole: "Evaluate selected text in console",
  /**
   * @description Title of an action that switches files in the Sources panel.
   */
  switchFile: "Switch file",
  /**
   * @description Title of a sources panel action that renames a file.
   */
  rename: "Rename",
  /**
   * @description Title of an action in the sources tool to close all.
   */
  closeAll: "Close all",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (jump to previous editing location in text editor).
   */
  jumpToPreviousEditingLocation: "Jump to previous editing location",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (jump to next editing location in text editor).
   */
  jumpToNextEditingLocation: "Jump to next editing location",
  /**
   * @description Title of an action that closes the active editor tab in the Sources panel.
   */
  closeTheActiveTab: "Close the active tab",
  /**
   * @description Text to go to a given line.
   */
  goToLine: "Go to line",
  /**
   * @description Title of an action that opens the go to member menu.
   */
  goToAFunctionDeclarationruleSet: "Go to a function declaration/rule set",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (toggle breakpoint in debugger).
   */
  toggleBreakpoint: "Toggle breakpoint",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (enable toggle breakpoint shortcut in debugger).
   */
  toggleBreakpointEnabled: "Toggle breakpoint enabled",
  /**
   * @description Title of a sources panel action that opens the breakpoint input window.
   */
  toggleBreakpointInputWindow: "Toggle breakpoint input window",
  /**
   * @description Text to save something.
   */
  save: "Save",
  /**
   * @description Title of an action to save all files in the Sources panel.
   */
  saveAll: "Save all",
  /**
   * @description Title of an action in the sources tool to create a snippet.
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
   * @description Title of an action in the debugger tool to previous call frame.
   */
  previousCallFrame: "Previous call frame",
  /**
   * @description Title of an action in the debugger tool to next call frame.
   */
  nextCallFrame: "Next call frame",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (increment CSS unit by the amount passed in the placeholder in Styles pane).
   * @example {10} PH1
   */
  incrementCssUnitBy: "Increment CSS unit by {PH1}",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (decrement CSS unit by the amount passed in the placeholder in Styles pane).
   * @example {10} PH1
   */
  decrementCssUnitBy: "Decrement CSS unit by {PH1}",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  searchInAnonymousAndContent: "Search in anonymous and content scripts",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  doNotSearchInAnonymousAndContent: "Do not search in anonymous and content scripts",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  automaticallyRevealFilesIn: "Automatically reveal files in sidebar",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  doNotAutomaticallyRevealFilesIn: "Do not automatically reveal files in sidebar",
  /**
   * @description Title of a setting under the Sources category.
   *'tab moves focus' is the name of the setting, which means that when the user
   *hits the tab key, the focus in the UI will be moved to the next part of the
   *text editor, as opposed to inserting a tab character into the text in the
   *text editor.
   */
  tabMovesFocus: "Tab moves focus",
  /**
   * @description Title of a setting that can be invoked through the command menu.
   *'tab moves focus' is the name of the setting, which means that when the user
   *hits the tab key, the focus in the UI will be moved to the next part of the
   *text editor, as opposed to inserting a tab character into the text in the
   *text editor.
   */
  enableTabMovesFocus: "Enable tab moves focus",
  /**
   * @description Title of a setting that can be invoked through the command menu.
   *'tab moves focus' is the name of the setting, which means that when the user
   *hits the tab key, the focus in the UI will be moved to the next part of the
   *text editor, as opposed to inserting a tab character into the text in the
   *text editor.
   */
  disableTabMovesFocus: "Disable tab moves focus",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  detectIndentation: "Detect indentation",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  doNotDetectIndentation: "Do not detect indentation",
  /**
   * @description Title of a setting under Sources category that can be invoked through the command menu.
   *This setting turns on the automatic formatting of source files in the Sources panel that are detected
   *to be minified.
   */
  automaticallyPrettyPrintMinifiedSources: "Automatically pretty print minified sources",
  /**
   * @description Title of a setting under Sources category that can be invoked through the command menu.
   *This setting turns off the automatic formatting of source files in the Sources panel that are detected
   *to be minified.
   */
  doNotAutomaticallyPrettyPrintMinifiedSources: "Do not automatically pretty print minified sources",
  /**
   * @description Text for autocompletion.
   */
  autocompletion: "Autocompletion",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  enableAutocompletion: "Enable autocompletion",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  disableAutocompletion: "Disable autocompletion",
  /**
   * @description Title of a setting under the Sources category in Settings.
   */
  bracketClosing: "Auto closing brackets",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  enableBracketClosing: "Enable auto closing brackets",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  disableBracketClosing: "Disable auto closing brackets",
  /**
   * @description Title of a setting under the Sources category in Settings.
   */
  bracketMatching: "Bracket matching",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  enableBracketMatching: "Enable bracket matching",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  disableBracketMatching: "Disable bracket matching",
  /**
   * @description Title of a setting under the Sources category in Settings.
   */
  codeFolding: "Code folding",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  enableCodeFolding: "Enable code folding",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  disableCodeFolding: "Disable code folding",
  /**
   * @description Title of a setting under the Sources category in Settings.
   */
  showWhitespaceCharacters: "Show whitespace characters:",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  doNotShowWhitespaceCharacters: "Do not show whitespace characters",
  /**
   * @description One value of an option that can be set to 'none', 'all', or 'trailing'. The setting
   * controls how whitespace characters are shown in a text editor.
   */
  none: "None",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  showAllWhitespaceCharacters: "Show all whitespace characters",
  /**
   * @description Text for everything.
   */
  all: "All",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  showTrailingWhitespaceCharacters: "Show trailing whitespace characters",
  /**
   * @description A drop-down menu option to show trailing whitespace characters.
   */
  trailing: "Trailing",
  /**
   * @description Title of a setting under the Sources category.
   */
  variableValuesInlineWhile: "Variable values inline",
  /**
   * @description Title of an option under the Sources category that can be invoked through the command menu.
   */
  displayVariableValuesInlineWhile: "Display variable values inline while debugging",
  /**
   * @description Title of an option under the Sources category that can be invoked through the command menu.
   */
  doNotDisplayVariableValuesInline: "Don\u2019t show variable values inline",
  /**
   * @description Title of a setting under the Sources category in Settings.
   */
  allowScrollingPastEndOfFile: "Allow scrolling past end of file",
  /**
   * @description Title of a setting under the Sources category in Settings.
   */
  disallowScrollingPastEndOfFile: "Disallow scrolling past end of file",
  /**
   * @description Title of a setting under the Sources category in Settings.
   */
  wasmAutoStepping: "Wasm auto-stepping bytecode",
  /**
   * @description Tooltip text for a setting that controls Wasm will try to skip wasm bytecode.
   */
  wasmAutoSteppingInfo: "When debugging Wasm with debug information, try to skip wasm bytecode",
  /**
   * @description Title of a setting under the Sources category in Settings.
   */
  enableWasmAutoStepping: "Enable Wasm auto-stepping",
  /**
   * @description Title of a setting under the Sources category in Settings.
   */
  disableWasmAutoStepping: "Disable Wasm auto-stepping",
  /**
   * @description Text for command prefix of go to a given line or symbol.
   */
  goTo: "Go to",
  /**
   * @description Text for command suggestion of go to a given line.
   */
  line: "Line",
  /**
   * @description Text for command suggestion of go to a given symbol.
   */
  symbol: "Symbol",
  /**
   * @description Text for help title of go to symbol menu.
   */
  goToSymbol: "Go to symbol",
  /**
   * @description Text for command prefix of open a file.
   */
  open: "Open",
  /**
   * @description Text for command suggestion of open a file.
   */
  file: "File",
  /**
   * @description Text for help title of open file menu.
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
   * @description Title of an action to reveal the active file in the navigator sidebar of the Sources panel.
   */
  revealActiveFileInSidebar: "Reveal active file in navigator sidebar",
  /**
   * @description Text for command of toggling navigator sidebar in Sources panel.
   */
  toggleNavigatorSidebar: "Toggle navigator sidebar",
  /**
   * @description Text for command of toggling debugger sidebar in Sources panel.
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
  toggleWordWrap: "Toggle word wrap",
  /**
   * @description Setting under the Sources category to toggle usage of JavaScript source maps.
   */
  javaScriptSourceMaps: "JavaScript source maps",
  /**
   * @description Title of an option under the Sources category that can be invoked through the Command Menu.
   */
  enableJavaScriptSourceMaps: "Enable JavaScript source maps",
  /**
   * @description Title of an option under the Sources category that can be invoked through the Command Menu.
   */
  disableJavaScriptSourceMaps: "Disable JavaScript source maps",
  /**
   * @description Setting under the Sources category to toggle usage of CSS source maps.
   */
  cssSourceMaps: "CSS source maps",
  /**
   * @description Title of an option under the Sources category that can be invoked through the Command Menu.
   */
  enableCssSourceMaps: "Enable CSS source maps",
  /**
   * @description Title of an option under the Sources category that can be invoked through the Command Menu.
   */
  disableCssSourceMaps: "Disable CSS source maps"
};
var str_8 = i18n16.i18n.registerUIStrings("panels/sources/sources-meta.ts", UIStrings8);
var i18nLazyString8 = i18n16.i18n.getLazilyComputedLocalizedString.bind(void 0, str_8);
var loadedSourcesModule2;
async function loadSourcesModule2() {
  if (!loadedSourcesModule2) {
    loadedSourcesModule2 = await import("../../panels/sources/sources.js");
  }
  return loadedSourcesModule2;
}
function maybeRetrieveContextTypes2(getClassCallBack) {
  if (loadedSourcesModule2 === void 0) {
    return [];
  }
  return getClassCallBack(loadedSourcesModule2);
}
UI8.ViewManager.registerViewExtension({
  location: "panel",
  id: "sources",
  commandPrompt: i18nLazyString8(UIStrings8.showSources),
  title: i18nLazyString8(UIStrings8.sources),
  order: 30,
  async loadView() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI8.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-files",
  commandPrompt: i18nLazyString8(UIStrings8.showWorkspace),
  title: i18nLazyString8(UIStrings8.workspace),
  order: 3,
  persistence: "permanent",
  condition: () => !Root5.Runtime.Runtime.isTraceApp(),
  async loadView(universe) {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesNavigator.FilesNavigatorView(universe.networkProjectManager);
  }
});
UI8.ViewManager.registerViewExtension({
  location: "navigator-view",
  id: "navigator-snippets",
  commandPrompt: i18nLazyString8(UIStrings8.showSnippets),
  title: i18nLazyString8(UIStrings8.snippets),
  order: 6,
  persistence: "permanent",
  condition: () => !Root5.Runtime.Runtime.isTraceApp(),
  async loadView(universe) {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesNavigator.SnippetsNavigatorView(universe.networkProjectManager);
  }
});
UI8.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "sources.search-sources-tab",
  commandPrompt: i18nLazyString8(UIStrings8.showSearch),
  title: i18nLazyString8(UIStrings8.search),
  order: 7,
  persistence: "closeable",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return new Sources.SearchSourcesView.SearchSourcesView();
  }
});
UI8.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "sources.quick",
  commandPrompt: i18nLazyString8(UIStrings8.showQuickSource),
  title: i18nLazyString8(UIStrings8.quickSource),
  persistence: "closeable",
  order: 1e3,
  async loadView() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.QuickSourceView();
  }
});
UI8.ViewManager.registerViewExtension({
  id: "sources.threads",
  commandPrompt: i18nLazyString8(UIStrings8.showThreads),
  title: i18nLazyString8(UIStrings8.threads),
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return new Sources.ThreadsSidebarPane.ThreadsSidebarPane();
  }
});
UI8.ViewManager.registerViewExtension({
  id: "sources.scope-chain",
  commandPrompt: i18nLazyString8(UIStrings8.showScope),
  title: i18nLazyString8(UIStrings8.scope),
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return Sources.ScopeChainSidebarPane.ScopeChainSidebarPane.instance();
  }
});
UI8.ViewManager.registerViewExtension({
  id: "sources.watch",
  commandPrompt: i18nLazyString8(UIStrings8.showWatch),
  title: i18nLazyString8(UIStrings8.watch),
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return Sources.WatchExpressionsSidebarPane.WatchExpressionsSidebarPane.instance();
  },
  hasToolbar: true
});
UI8.ViewManager.registerViewExtension({
  id: "sources.js-breakpoints",
  commandPrompt: i18nLazyString8(UIStrings8.showBreakpoints),
  title: i18nLazyString8(UIStrings8.breakpoints),
  persistence: "permanent",
  async loadView() {
    const Sources = await loadSourcesModule2();
    return Sources.BreakpointsView.BreakpointsView.instance();
  }
});
UI8.ActionRegistration.registerActionExtension({
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
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView, UI8.ShortcutRegistry.ForwardedShortcut]);
  },
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.pauseScriptExecution)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.resumeScriptExecution)
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
UI8.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.step-over",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.stepOverNextFunctionCall),
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
UI8.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.step-into",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.stepIntoNextFunctionCall),
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
UI8.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.step",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.step),
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
UI8.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.step-out",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.stepOutOfCurrentFunction),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "debugger.run-snippet",
  category: "DEBUGGER",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.runSnippet),
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
UI8.ActionRegistration.registerActionExtension({
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
      title: i18nLazyString8(UIStrings8.deactivateBreakpoints)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.activateBreakpoints)
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.add-to-watch",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return Sources.WatchExpressionsSidebarPane.WatchExpressionsSidebarPane.instance();
  },
  category: "DEBUGGER",
  title: i18nLazyString8(UIStrings8.addSelectedTextToWatches),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "debugger.evaluate-selection",
  category: "DEBUGGER",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.evaluateSelectedTextInConsole),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.switch-file",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.switchFile),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.rename",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.rename),
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
UI8.ActionRegistration.registerActionExtension({
  category: "SOURCES",
  actionId: "sources.close-all",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesView.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.closeAll),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.jump-to-previous-location",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.jumpToPreviousEditingLocation),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.jump-to-next-location",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.jumpToNextEditingLocation),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.close-editor-tab",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.closeTheActiveTab),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.next-editor-tab",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.nextEditorTab),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.previous-editor-tab",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.previousEditorTab),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.go-to-line",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.goToLine),
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
    },
    {
      shortcut: "Alt+g",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+g",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.go-to-member",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.goToAFunctionDeclarationruleSet),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "debugger.toggle-breakpoint",
  category: "DEBUGGER",
  title: i18nLazyString8(UIStrings8.toggleBreakpoint),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "debugger.toggle-breakpoint-enabled",
  category: "DEBUGGER",
  title: i18nLazyString8(UIStrings8.toggleBreakpointEnabled),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "debugger.breakpoint-input-window",
  category: "DEBUGGER",
  title: i18nLazyString8(UIStrings8.toggleBreakpointInputWindow),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.save",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.save),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.save-all",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.saveAll),
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
UI8.ActionRegistration.registerActionExtension({
  category: "SOURCES",
  actionId: "sources.create-snippet",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesNavigator.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.createNewSnippet)
});
UI8.ActionRegistration.registerActionExtension({
  category: "SOURCES",
  actionId: "sources.add-folder-to-workspace",
  condition: () => !Host2.InspectorFrontendHost.InspectorFrontendHostInstance.isHostedMode(),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesNavigator.ActionDelegate();
  },
  iconClass: "plus",
  title: i18nLazyString8(UIStrings8.addFolderToWorkspace)
});
UI8.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.previous-call-frame",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.CallStackSidebarPane.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.previousCallFrame),
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  bindings: [
    {
      shortcut: "Ctrl+,"
    },
    {
      platform: "mac",
      shortcut: "Meta+,"
    }
  ]
});
UI8.ActionRegistration.registerActionExtension({
  category: "DEBUGGER",
  actionId: "debugger.next-call-frame",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.CallStackSidebarPane.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.nextCallFrame),
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  bindings: [
    {
      shortcut: "Ctrl+."
    },
    {
      platform: "mac",
      shortcut: "Meta+."
    }
  ]
});
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.search",
  title: i18nLazyString8(UIStrings8.search),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.increment-css",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.incrementCssUnitBy, { PH1: 1 }),
  bindings: [
    {
      shortcut: "Alt+Up"
    }
  ]
});
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.increment-css-by-ten",
  title: i18nLazyString8(UIStrings8.incrementCssUnitBy, { PH1: 10 }),
  category: "SOURCES",
  bindings: [
    {
      shortcut: "Alt+PageUp"
    }
  ]
});
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.decrement-css",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.decrementCssUnitBy, { PH1: 1 }),
  bindings: [
    {
      shortcut: "Alt+Down"
    }
  ]
});
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.decrement-css-by-ten",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.decrementCssUnitBy, { PH1: 10 }),
  bindings: [
    {
      shortcut: "Alt+PageDown"
    }
  ]
});
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.reveal-in-navigator-sidebar",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.revealActiveFileInSidebar),
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SourcesView.SourcesView]);
  }
});
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.toggle-navigator-sidebar",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.toggleNavigatorSidebar),
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
UI8.ActionRegistration.registerActionExtension({
  actionId: "sources.toggle-debugger-sidebar",
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.toggleDebuggerSidebar),
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
Common7.Settings.registerSettingExtension({
  settingName: "navigator-group-by-folder",
  settingType: "boolean",
  defaultValue: true
});
Common7.Settings.registerSettingExtension({
  settingName: "navigator-group-by-authored",
  settingType: "boolean",
  defaultValue: false
});
Common7.Settings.registerSettingExtension({
  settingName: "navigator-just-my-code",
  settingType: "boolean",
  defaultValue: false
});
SettingsUI3.SettingUIRegistration.register(SDK5.SDKSettings.jsSourceMapsEnabledSettingDescriptor, {
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.javaScriptSourceMaps),
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.enableJavaScriptSourceMaps)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.disableJavaScriptSourceMaps)
    }
  ]
});
SettingsUI3.SettingUIRegistration.register(SDK5.SDKSettings.cssSourceMapsEnabledSettingDescriptor, {
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.cssSourceMaps),
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.enableCssSourceMaps)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.disableCssSourceMaps)
    }
  ]
});
SettingsUI3.SettingUIRegistration.register(SDK5.SDKSettings.enableRemoteFileLoadingSettingDescriptor, {
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.enableRemoteFileLoading),
  learnMore: {
    tooltip: i18nLazyString8(UIStrings8.remoteFileLoadingInfo)
  }
});
SettingsUI3.SettingUIRegistration.register(SDK5.SDKSettings.javaScriptDisabledSettingDescriptor, {
  category: "DEBUGGER",
  title: i18nLazyString8(UIStrings8.disableJavascript),
  order: 1,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.disableJavascript)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.enableJavascript)
    }
  ]
});
SettingsUI3.SettingUIRegistration.register(SDK5.SDKSettings.disableAsyncStackTracesSettingDescriptor, {
  category: "DEBUGGER",
  title: i18nLazyString8(UIStrings8.disableAsyncStackTraces),
  order: 2,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.doNotCaptureAsyncStackTraces)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.captureAsyncStackTraces)
    }
  ]
});
SettingsUI3.SettingUIRegistration.register(SDK5.SDKSettings.pauseOnExceptionEnabledSettingDescriptor, {
  category: "DEBUGGER",
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.pauseOnExceptions)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.doNotPauseOnExceptions)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.searchInAnonymousAndContent),
  settingName: "search-in-anonymous-and-content-scripts",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.searchInAnonymousAndContent)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.doNotSearchInAnonymousAndContent)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.automaticallyRevealFilesIn),
  settingName: "auto-reveal-in-navigator",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.automaticallyRevealFilesIn)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.doNotAutomaticallyRevealFilesIn)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.tabMovesFocus),
  settingName: "text-editor-tab-moves-focus",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.enableTabMovesFocus)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.disableTabMovesFocus)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.detectIndentation),
  settingName: "text-editor-auto-detect-indent",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.detectIndentation)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.doNotDetectIndentation)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.autocompletion),
  settingName: "text-editor-autocompletion",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.enableAutocompletion)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.disableAutocompletion)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.bracketClosing),
  settingName: "text-editor-bracket-closing",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.enableBracketClosing)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.disableBracketClosing)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  title: i18nLazyString8(UIStrings8.bracketMatching),
  settingName: "text-editor-bracket-matching",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.enableBracketMatching)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.disableBracketMatching)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.codeFolding),
  settingName: "text-editor-code-folding",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.enableCodeFolding)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.disableCodeFolding)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.showWhitespaceCharacters),
  settingName: "show-whitespaces-in-editor",
  settingType: "enum",
  defaultValue: "original",
  options: [
    {
      title: i18nLazyString8(UIStrings8.doNotShowWhitespaceCharacters),
      text: i18nLazyString8(UIStrings8.none),
      value: "none"
    },
    {
      title: i18nLazyString8(UIStrings8.showAllWhitespaceCharacters),
      text: i18nLazyString8(UIStrings8.all),
      value: "all"
    },
    {
      title: i18nLazyString8(UIStrings8.showTrailingWhitespaceCharacters),
      text: i18nLazyString8(UIStrings8.trailing),
      value: "trailing"
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.wordWrap),
  settingName: "sources.word-wrap",
  settingType: "boolean",
  defaultValue: false
});
UI8.ActionRegistration.registerActionExtension({
  category: "SOURCES",
  actionId: "sources.toggle-word-wrap",
  async loadActionDelegate() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.ActionDelegate();
  },
  title: i18nLazyString8(UIStrings8.toggleWordWrap),
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
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.variableValuesInlineWhile),
  settingName: "inline-variable-values",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.displayVariableValuesInlineWhile)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.doNotDisplayVariableValuesInline)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.enableAutoFocusOnDebuggerPaused),
  settingName: "auto-focus-on-debugger-paused-enabled",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.enableAutoFocusOnDebuggerPaused)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.disableAutoFocusOnDebuggerPaused)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.automaticallyPrettyPrintMinifiedSources),
  settingName: "auto-pretty-print-minified",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.automaticallyPrettyPrintMinifiedSources)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.doNotAutomaticallyPrettyPrintMinifiedSources)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString8(UIStrings8.allowScrollingPastEndOfFile),
  settingName: "allow-scroll-past-eof",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.allowScrollingPastEndOfFile)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.disallowScrollingPastEndOfFile)
    }
  ]
});
Common7.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Local",
  title: i18nLazyString8(UIStrings8.wasmAutoStepping),
  settingName: "wasm-auto-stepping",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString8(UIStrings8.enableWasmAutoStepping)
    },
    {
      value: false,
      title: i18nLazyString8(UIStrings8.disableWasmAutoStepping)
    }
  ],
  learnMore: {
    tooltip: i18nLazyString8(UIStrings8.wasmAutoSteppingInfo)
  }
});
UI8.ViewManager.registerLocationResolver({
  name: "navigator-view",
  category: "SOURCES",
  async loadResolver() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI8.ViewManager.registerLocationResolver({
  name: "sources.sidebar-top",
  category: "SOURCES",
  async loadResolver() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI8.ViewManager.registerLocationResolver({
  name: "sources.sidebar-bottom",
  category: "SOURCES",
  async loadResolver() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI8.ViewManager.registerLocationResolver({
  name: "sources.sidebar-tabs",
  category: "SOURCES",
  async loadResolver() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI8.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Workspace2.UISourceCode.UISourceCode,
      Workspace2.UISourceCode.UILocation,
      SDK5.RemoteObject.RemoteObject,
      SDK5.NetworkRequest.NetworkRequest,
      ...maybeRetrieveContextTypes2((Sources) => [Sources.UISourceCodeFrame.UISourceCodeFrame])
    ];
  },
  async loadProvider() {
    const Sources = await loadSourcesModule2();
    return Sources.SourcesPanel.SourcesPanel.instance();
  }
});
UI8.ContextMenu.registerProvider({
  async loadProvider() {
    const Sources = await loadSourcesModule2();
    return Sources.WatchExpressionsSidebarPane.WatchExpressionsSidebarPane.instance();
  },
  contextTypes() {
    return [
      ObjectUI.ObjectPropertiesSection.ObjectPropertyTreeElement,
      ...maybeRetrieveContextTypes2((Sources) => [Sources.UISourceCodeFrame.UISourceCodeFrame])
    ];
  }
});
Common7.Revealer.registerRevealer({
  contextTypes() {
    return [
      Workspace2.UISourceCode.UILocation
    ];
  },
  destination: Common7.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.UILocationRevealer();
  }
});
Common7.Revealer.registerRevealer({
  contextTypes() {
    return [
      Workspace2.UISourceCode.UILocationRange
    ];
  },
  destination: Common7.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.UILocationRangeRevealer();
  }
});
Common7.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK5.DebuggerModel.Location
    ];
  },
  destination: Common7.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.DebuggerLocationRevealer();
  }
});
Common7.Revealer.registerRevealer({
  contextTypes() {
    return [
      Workspace2.UISourceCode.UISourceCode
    ];
  },
  destination: Common7.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.UISourceCodeRevealer();
  }
});
Common7.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK5.DebuggerModel.DebuggerPausedDetails
    ];
  },
  destination: Common7.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SourcesPanel.DebuggerPausedDetailsRevealer();
  }
});
Common7.Revealer.registerRevealer({
  contextTypes() {
    return [
      Breakpoints.BreakpointManager.BreakpointLocation
    ];
  },
  destination: Common7.Revealer.RevealerDestination.SOURCES_PANEL,
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.DebuggerPlugin.BreakpointLocationRevealer();
  }
});
Common7.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes2((Sources) => [Sources.SearchSourcesView.SearchSources]);
  },
  async loadRevealer() {
    const Sources = await loadSourcesModule2();
    return new Sources.SearchSourcesView.Revealer();
  }
});
UI8.Toolbar.registerToolbarItem({
  actionId: "sources.add-folder-to-workspace",
  location: "files-navigator-toolbar",
  label: i18nLazyString8(UIStrings8.addFolderManually)
});
UI8.Context.registerListener({
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const Sources = await loadSourcesModule2();
    return Sources.BreakpointsView.BreakpointsSidebarController.instance();
  }
});
UI8.Context.registerListener({
  contextTypes() {
    return [SDK5.DebuggerModel.DebuggerPausedDetails];
  },
  async loadListener() {
    const Sources = await loadSourcesModule2();
    return Sources.CallStackSidebarPane.CallStackSidebarPane.instance();
  }
});
UI8.Context.registerListener({
  contextTypes() {
    return [StackTrace.StackTrace.DebuggableFrameFlavor];
  },
  async loadListener() {
    const Sources = await loadSourcesModule2();
    return Sources.ScopeChainSidebarPane.ScopeChainSidebarPane.instance();
  }
});
UI8.ContextMenu.registerItem({
  location: "navigatorMenu/default",
  actionId: "quick-open.show"
});
UI8.ContextMenu.registerItem({
  location: "mainMenu/default",
  actionId: "sources.search"
});
QuickOpen.FilteredListWidget.registerProvider({
  prefix: "@",
  iconName: "symbol",
  async provider() {
    const Sources = await loadSourcesModule2();
    return new Sources.OutlineQuickOpen.OutlineQuickOpen();
  },
  helpTitle: i18nLazyString8(UIStrings8.goToSymbol),
  titlePrefix: i18nLazyString8(UIStrings8.goTo),
  titleSuggestion: i18nLazyString8(UIStrings8.symbol),
  jslogContext: "source-symbol"
});
QuickOpen.FilteredListWidget.registerProvider({
  prefix: ":",
  iconName: "colon",
  async provider() {
    const Sources = await loadSourcesModule2();
    return new Sources.GoToLineQuickOpen.GoToLineQuickOpen();
  },
  helpTitle: i18nLazyString8(UIStrings8.goToLine),
  titlePrefix: i18nLazyString8(UIStrings8.goTo),
  titleSuggestion: i18nLazyString8(UIStrings8.line),
  jslogContext: "source-line"
});
QuickOpen.FilteredListWidget.registerProvider({
  prefix: "",
  iconName: "document",
  async provider() {
    const Sources = await loadSourcesModule2();
    return new Sources.OpenFileQuickOpen.OpenFileQuickOpen();
  },
  helpTitle: i18nLazyString8(UIStrings8.openFile),
  titlePrefix: i18nLazyString8(UIStrings8.open),
  titleSuggestion: i18nLazyString8(UIStrings8.file),
  jslogContext: "source-file"
});
UI8.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Workspace2.UISourceCode.UISourceCode,
      SDK5.Resource.Resource,
      SDK5.NetworkRequest.NetworkRequest
    ];
  },
  async loadProvider() {
    const Sources = await loadSourcesModule2();
    return new Sources.PersistenceActions.ContextMenuProvider();
  }
});

// gen/front_end/panels/sensors/sensors-meta.js
import * as Common8 from "../../core/common/common.js";
import * as i18n18 from "../../core/i18n/i18n.js";
import * as SDK6 from "../../core/sdk/sdk.js";
import * as UI9 from "../../ui/legacy/legacy.js";
import * as SettingsUI4 from "../../ui/settings/settings.js";
var UIStrings9 = {
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
  critical: "Critical",
  /**
   * @description Text for the touch type to simulate on a device. Refers to touch input as opposed to
   * mouse input.
   */
  touch: "Touch",
  /**
   * @description Text in Sensors View of the Device Toolbar. Means that touch input will be forced
   *on, even if the device type e.g. desktop computer does not normally have touch input.
   */
  forceEnabled: "Force enabled",
  /**
   * @description Text in Sensors View of the Device Toolbar. Refers to device-based touch input,
   *which means the input type will be 'touch' only if the device normally has touch input e.g. a
   *phone or tablet.
   */
  devicebased: "Device-based",
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
   * @description Title of the Sensors view. The Sensors view contains GPS, orientation sensors, touch
   * settings, and more.
   */
  sensors: "Sensors",
  /**
   * @description A tag of the Sensors view that can be searched in the command menu.
   */
  geolocation: "geolocation",
  /**
   * @description A tag of the Sensors view that can be searched in the command menu.
   */
  timezones: "timezones",
  /**
   * @description Text in the Sensors view of the Device toolbar.
   */
  locale: "locale",
  /**
   * @description A tag of the Sensors view that can be searched in the command menu.
   */
  locales: "locales",
  /**
   * @description A tag of the Sensors view that can be searched in the command menu.
   */
  accelerometer: "accelerometer",
  /**
   * @description A tag of the Sensors view that can be searched in the command menu. Refers to the
   * orientation of a device (for example, a phone) in 3D space, tilted right or left.
   */
  deviceOrientation: "device orientation",
  /**
   * @description Title of the Locations settings tab. Refers to geographic locations for GPS.
   */
  locations: "Locations",
  /**
   * @description Command that opens the Sensors view. The Sensors view contains GPS,
   * orientation sensors, touch settings, and more.
   */
  showSensors: "Show Sensors",
  /**
   * @description Command that shows the Locations settings tab.
   */
  showLocations: "Show Locations"
};
var str_9 = i18n18.i18n.registerUIStrings("panels/sensors/sensors-meta.ts", UIStrings9);
var i18nLazyString9 = i18n18.i18n.getLazilyComputedLocalizedString.bind(void 0, str_9);
var loadedSensorsModule;
async function loadEmulationModule2() {
  if (!loadedSensorsModule) {
    loadedSensorsModule = await import("../../panels/sensors/sensors.js");
  }
  return loadedSensorsModule;
}
UI9.ViewManager.registerViewExtension({
  location: "drawer-view",
  commandPrompt: i18nLazyString9(UIStrings9.showSensors),
  title: i18nLazyString9(UIStrings9.sensors),
  id: "sensors",
  persistence: "closeable",
  order: 100,
  async loadView() {
    const Sensors = await loadEmulationModule2();
    return new Sensors.SensorsView.SensorsView();
  },
  tags: [
    i18nLazyString9(UIStrings9.geolocation),
    i18nLazyString9(UIStrings9.timezones),
    i18nLazyString9(UIStrings9.locale),
    i18nLazyString9(UIStrings9.locales),
    i18nLazyString9(UIStrings9.accelerometer),
    i18nLazyString9(UIStrings9.deviceOrientation)
  ]
});
UI9.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "emulation-locations",
  commandPrompt: i18nLazyString9(UIStrings9.showLocations),
  title: i18nLazyString9(UIStrings9.locations),
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
Common8.Settings.registerSettingExtension({
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
SettingsUI4.SettingUIRegistration.register(SDK6.SDKSettings.cpuPressureSettingDescriptor, {
  title: i18nLazyString9(UIStrings9.cpuPressure),
  reloadRequired: true,
  options: [
    {
      value: "none",
      title: i18nLazyString9(UIStrings9.noPressureEmulation),
      text: i18nLazyString9(UIStrings9.noPressureEmulation)
    },
    {
      value: "nominal",
      title: i18nLazyString9(UIStrings9.nominal),
      text: i18nLazyString9(UIStrings9.nominal)
    },
    {
      value: "fair",
      title: i18nLazyString9(UIStrings9.fair),
      text: i18nLazyString9(UIStrings9.fair)
    },
    {
      value: "serious",
      title: i18nLazyString9(UIStrings9.serious),
      text: i18nLazyString9(UIStrings9.serious)
    },
    {
      value: "critical",
      title: i18nLazyString9(UIStrings9.critical),
      text: i18nLazyString9(UIStrings9.critical)
    }
  ]
});
SettingsUI4.SettingUIRegistration.register(SDK6.SDKSettings.touchSettingDescriptor, {
  title: i18nLazyString9(UIStrings9.touch),
  reloadRequired: true,
  options: [
    {
      value: "none",
      title: i18nLazyString9(UIStrings9.devicebased),
      text: i18nLazyString9(UIStrings9.devicebased)
    },
    {
      value: "force",
      title: i18nLazyString9(UIStrings9.forceEnabled),
      text: i18nLazyString9(UIStrings9.forceEnabled)
    }
  ]
});
SettingsUI4.SettingUIRegistration.register(SDK6.SDKSettings.idleDetectionSettingDescriptor, {
  title: i18nLazyString9(UIStrings9.emulateIdleDetectorState),
  options: [
    {
      value: "none",
      title: i18nLazyString9(UIStrings9.noIdleEmulation),
      text: i18nLazyString9(UIStrings9.noIdleEmulation)
    },
    {
      value: '{"isUserActive":true,"isScreenUnlocked":true}',
      title: i18nLazyString9(UIStrings9.userActiveScreenUnlocked),
      text: i18nLazyString9(UIStrings9.userActiveScreenUnlocked)
    },
    {
      value: '{"isUserActive":true,"isScreenUnlocked":false}',
      title: i18nLazyString9(UIStrings9.userActiveScreenLocked),
      text: i18nLazyString9(UIStrings9.userActiveScreenLocked)
    },
    {
      value: '{"isUserActive":false,"isScreenUnlocked":true}',
      title: i18nLazyString9(UIStrings9.userIdleScreenUnlocked),
      text: i18nLazyString9(UIStrings9.userIdleScreenUnlocked)
    },
    {
      value: '{"isUserActive":false,"isScreenUnlocked":false}',
      title: i18nLazyString9(UIStrings9.userIdleScreenLocked),
      text: i18nLazyString9(UIStrings9.userIdleScreenLocked)
    }
  ]
});

// gen/front_end/panels/timeline/timeline-meta.js
import * as Common9 from "../../core/common/common.js";
import * as i18n20 from "../../core/i18n/i18n.js";
import * as SDK7 from "../../core/sdk/sdk.js";
import * as LiveMetrics from "../../models/live-metrics/live-metrics.js";
import * as UI10 from "../../ui/legacy/legacy.js";
import * as SettingsUI5 from "../../ui/settings/settings.js";
var UIStrings10 = {
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
var str_10 = i18n20.i18n.registerUIStrings("panels/timeline/timeline-meta.ts", UIStrings10);
var i18nLazyString10 = i18n20.i18n.getLazilyComputedLocalizedString.bind(void 0, str_10);
var loadedTimelineModule;
async function loadTimelineModule() {
  if (!loadedTimelineModule) {
    loadedTimelineModule = await import("../../panels/timeline/timeline.js");
  }
  return loadedTimelineModule;
}
function maybeRetrieveContextTypes3(getClassCallBack) {
  if (loadedTimelineModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedTimelineModule);
}
UI10.ViewManager.registerViewExtension({
  location: "panel",
  id: "timeline",
  title: i18nLazyString10(UIStrings10.performance),
  commandPrompt: i18nLazyString10(UIStrings10.showPerformance),
  order: 50,
  async loadView(universe) {
    const Timeline = await loadTimelineModule();
    const { pageResourceLoader: resourceLoader, targetManager, isolateManager } = universe;
    return Timeline.TimelinePanel.TimelinePanel.instance({ forceNew: true, resourceLoader, targetManager, isolateManager });
  }
});
UI10.ActionRegistration.registerActionExtension({
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
      title: i18nLazyString10(UIStrings10.record)
    },
    {
      value: false,
      title: i18nLazyString10(UIStrings10.stop)
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
UI10.ActionRegistration.registerActionExtension({
  actionId: "timeline.record-reload",
  iconClass: "refresh",
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  category: "PERFORMANCE",
  title: i18nLazyString10(UIStrings10.recordAndReload),
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
UI10.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.save-to-file",
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString10(UIStrings10.saveProfile),
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
UI10.ActionRegistration.registerActionExtension({
  category: "PERFORMANCE",
  actionId: "timeline.load-from-file",
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.TimelinePanel]);
  },
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString10(UIStrings10.loadProfile),
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
UI10.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-previous-frame",
  category: "PERFORMANCE",
  title: i18nLazyString10(UIStrings10.previousFrame),
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
UI10.ActionRegistration.registerActionExtension({
  actionId: "timeline.jump-to-next-frame",
  category: "PERFORMANCE",
  title: i18nLazyString10(UIStrings10.nextFrame),
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
UI10.ActionRegistration.registerActionExtension({
  actionId: "timeline.show-history",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  category: "PERFORMANCE",
  title: i18nLazyString10(UIStrings10.showRecentTimelineSessions),
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
UI10.ActionRegistration.registerActionExtension({
  actionId: "timeline.previous-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString10(UIStrings10.previousRecording),
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
UI10.ActionRegistration.registerActionExtension({
  actionId: "timeline.next-recording",
  category: "PERFORMANCE",
  async loadActionDelegate() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ActionDelegate();
  },
  title: i18nLazyString10(UIStrings10.nextRecording),
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
Common9.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString10(UIStrings10.chromeFrameInLayersView),
  settingName: "frame-viewer-chrome-window",
  settingType: "boolean",
  defaultValue: true
});
Common9.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString10(UIStrings10.timelineInvalidationTracking),
  settingName: "timeline-invalidation-tracking",
  settingType: "boolean",
  defaultValue: false
});
Common9.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString10(UIStrings10.timelineShowAllEvents),
  settingName: "timeline-show-all-events",
  settingType: "boolean",
  defaultValue: false
});
SettingsUI5.SettingUIRegistration.register(LiveMetrics.timelineEnableSoftNavigationsSettingDescriptor, {
  category: "PERFORMANCE",
  title: i18nLazyString10(UIStrings10.enableSoftNavigations)
});
Common9.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString10(UIStrings10.timelineDebugMode),
  settingName: "timeline-debug-mode",
  settingType: "boolean",
  defaultValue: false
});
Common9.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  settingName: "annotations-hidden",
  settingType: "boolean",
  defaultValue: false
});
UI10.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.load-from-file",
  order: 10
});
UI10.ContextMenu.registerItem({
  location: "timelineMenu/open",
  actionId: "timeline.save-to-file",
  order: 15
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [SDK7.TraceObject.TraceObject];
  },
  destination: Common9.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.TraceRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.TimelinePanel.ParsedTraceRevealable]);
  },
  destination: Common9.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ParsedTraceRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [SDK7.TraceObject.RevealableEvent];
  },
  destination: Common9.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.EventRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.Utils.Helpers.RevealableInsight]);
  },
  destination: Common9.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.InsightRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.Utils.Helpers.RevealableCoreVitals]);
  },
  destination: Common9.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.CoreVitalsRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.Utils.Helpers.RevealableTimeRange]);
  },
  destination: Common9.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.TimeRangeRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes3((Timeline) => [Timeline.Utils.Helpers.RevealableBottomUpProfile]);
  },
  destination: Common9.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.BottomUpProfileRevealer();
  }
});
Common9.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK7.CPUProfilerModel.ProfileFinishedData
    ];
  },
  destination: Common9.Revealer.RevealerDestination.TIMELINE_PANEL,
  async loadRevealer() {
    const Timeline = await loadTimelineModule();
    return new Timeline.TimelinePanel.ProfileFinishedRevealer();
  }
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString10(UIStrings10.disableJavascriptSamples),
  settingName: "timeline-disable-js-sampling",
  settingType: "boolean",
  defaultValue: false
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString10(UIStrings10.enableAdvancedPaint),
  settingName: "timeline-capture-layers-and-pictures",
  settingType: "boolean",
  defaultValue: false
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString10(UIStrings10.enableSelectorStats),
  settingName: "timeline-capture-selector-stats",
  settingType: "boolean",
  defaultValue: false
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString10(UIStrings10.screenshotCapture),
  settingName: "timeline-screenshot-capture-mode",
  settingType: "enum",
  defaultValue: "auto"
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString10(UIStrings10.screenshots),
  settingName: "timeline-show-screenshots",
  settingType: "boolean",
  defaultValue: true
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString10(UIStrings10.memory),
  settingName: "timeline-show-memory",
  settingType: "boolean",
  defaultValue: false
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Session",
  title: i18nLazyString10(UIStrings10.dimThirdParties),
  settingName: "timeline-dim-third-parties",
  settingType: "boolean",
  defaultValue: false
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString10(UIStrings10.showCustomtracks),
  settingName: "timeline-show-extension-data",
  settingType: "boolean",
  defaultValue: true
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString10(UIStrings10.jsHeap),
  settingName: "timeline-counters-graph-js-heap-size-used",
  settingType: "boolean",
  defaultValue: true
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString10(UIStrings10.documents),
  settingName: "timeline-counters-graph-documents",
  settingType: "boolean",
  defaultValue: true
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString10(UIStrings10.nodes),
  settingName: "timeline-counters-graph-nodes",
  settingType: "boolean",
  defaultValue: true
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString10(UIStrings10.listeners),
  settingName: "timeline-counters-graph-js-event-listeners",
  settingType: "boolean",
  defaultValue: true
});
Common9.Settings.registerSettingExtension({
  category: "",
  storageType: "Global",
  title: i18nLazyString10(UIStrings10.gpuMemory),
  settingName: "timeline-counters-graph-gpu-memory-used-kb",
  settingType: "boolean",
  defaultValue: true
});

// gen/front_end/panels/ai_assistance/ai_assistance-meta.js
import * as Common10 from "../../core/common/common.js";
import * as i18n22 from "../../core/i18n/i18n.js";
import * as Root6 from "../../core/root/root.js";
import * as AiAssistanceModel from "../../models/ai_assistance/ai_assistance.js";
import * as UI11 from "../../ui/legacy/legacy.js";
import * as SettingUIRegistration6 from "../../ui/settings/settings.js";
var UIStrings11 = {
  /**
   * @description The title of the AI assistance panel.
   */
  aiAssistance: "AI assistance",
  /**
   * @description The title of the command menu action for showing the AI assistance panel.
   */
  showAiAssistance: "Show AI assistance",
  /**
   * @description The setting title to enable the AI assistance via
   * the settings tab.
   */
  enableAiAssistance: "Enable AI assistance",
  /**
   * @description Text of a context menu item to redirect to the AI assistance panel with
   * the current context.
   */
  debugWithAi: "Debug with AI",
  /**
   * @description The title of the Gemini panel.
   */
  gemini: "Gemini",
  /**
   * @description The title of the command menu action for showing the Gemini panel.
   */
  showGemini: "Show Gemini",
  /**
   * @description The setting title to enable the Gemini via the settings tab.
   */
  enableGemini: "Enable Gemini",
  /**
   * @description Text of a context menu item to redirect to the Gemini panel with the current context.
   */
  debugWithGemini: "Debug with Gemini"
};
var str_11 = i18n22.i18n.registerUIStrings("panels/ai_assistance/ai_assistance-meta.ts", UIStrings11);
var i18nString = i18n22.i18n.getLocalizedString.bind(void 0, str_11);
function i18nAiBrandedString(gemini, assistance) {
  return () => Root6.Runtime.hostConfig.devToolsGeminiRebranding?.enabled ? i18nString(gemini) : i18nString(assistance);
}
function isGeoRestricted(config) {
  return config?.aidaAvailability?.blockedByGeo === true;
}
function isPolicyRestricted(config) {
  return config?.aidaAvailability?.blockedByEnterprisePolicy === true;
}
var loadedAiAssistanceModule;
async function loadAiAssistanceModule() {
  if (!loadedAiAssistanceModule) {
    loadedAiAssistanceModule = await import("../../panels/ai_assistance/ai_assistance.js");
  }
  return loadedAiAssistanceModule;
}
function isStylingAgentFeatureAvailable(config) {
  return (config?.aidaAvailability?.enabled && config?.devToolsFreestyler?.enabled) === true;
}
function isNetworkAgentFeatureAvailable(config) {
  return (config?.aidaAvailability?.enabled && config?.devToolsAiAssistanceNetworkAgent?.enabled) === true;
}
function isPerformanceAgentFeatureAvailable(config) {
  return (config?.aidaAvailability?.enabled && config?.devToolsAiAssistancePerformanceAgent?.enabled) === true;
}
function isFileAgentFeatureAvailable(config) {
  return (config?.aidaAvailability?.enabled && config?.devToolsAiAssistanceFileAgent?.enabled) === true;
}
function isStorageAgentFeatureAvailable(config) {
  return (config?.aidaAvailability?.enabled && config?.devToolsAiAssistanceStorageAgent?.enabled) === true;
}
function isAnyFeatureAvailable(config) {
  return isStylingAgentFeatureAvailable(config) || isNetworkAgentFeatureAvailable(config) || isPerformanceAgentFeatureAvailable(config) || isFileAgentFeatureAvailable(config) || isStorageAgentFeatureAvailable(config);
}
UI11.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "freestyler",
  commandPrompt: i18nAiBrandedString(UIStrings11.showGemini, UIStrings11.showAiAssistance),
  title: i18nAiBrandedString(UIStrings11.gemini, UIStrings11.aiAssistance),
  order: 10,
  persistence: "closeable",
  hasToolbar: false,
  condition: (config) => isAnyFeatureAvailable(config) && !isPolicyRestricted(config),
  async loadView() {
    const AiAssistance = await loadAiAssistanceModule();
    return await AiAssistance.AiAssistancePanel.instance();
  }
});
SettingUIRegistration6.SettingUIRegistration.register(AiAssistanceModel.AiUtils.aiAssistanceEnabledSettingDescriptor, {
  category: "AI",
  title: i18nAiBrandedString(UIStrings11.enableGemini, UIStrings11.enableAiAssistance)
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "freestyler.main-menu",
  contextTypes() {
    return [];
  },
  category: "GLOBAL",
  title: i18nAiBrandedString(UIStrings11.debugWithGemini, UIStrings11.debugWithAi),
  configurableBindings: false,
  async loadActionDelegate() {
    const AiAssistance = await loadAiAssistanceModule();
    return new AiAssistance.ActionDelegate();
  },
  condition: (config) => isAnyFeatureAvailable(config) && !isPolicyRestricted(config) && !isGeoRestricted(config)
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "freestyler.elements-floating-button",
  contextTypes() {
    return [];
  },
  category: "GLOBAL",
  title: i18nAiBrandedString(UIStrings11.debugWithGemini, UIStrings11.debugWithAi),
  configurableBindings: false,
  async loadActionDelegate() {
    const AiAssistance = await loadAiAssistanceModule();
    return new AiAssistance.ActionDelegate();
  },
  condition: (config) => isStylingAgentFeatureAvailable(config) && !isPolicyRestricted(config) && !isGeoRestricted(config)
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "freestyler.element-panel-context",
  contextTypes() {
    return [];
  },
  category: "GLOBAL",
  title: i18nAiBrandedString(UIStrings11.debugWithGemini, UIStrings11.debugWithAi),
  configurableBindings: false,
  async loadActionDelegate() {
    const AiAssistance = await loadAiAssistanceModule();
    return new AiAssistance.ActionDelegate();
  },
  condition: (config) => isStylingAgentFeatureAvailable(config) && !isPolicyRestricted(config) && !isGeoRestricted(config)
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "drjones.network-floating-button",
  contextTypes() {
    return [];
  },
  category: "GLOBAL",
  title: i18nAiBrandedString(UIStrings11.debugWithGemini, UIStrings11.debugWithAi),
  configurableBindings: false,
  async loadActionDelegate() {
    const AiAssistance = await loadAiAssistanceModule();
    return new AiAssistance.ActionDelegate();
  },
  condition: (config) => isNetworkAgentFeatureAvailable(config) && !isPolicyRestricted(config) && !isGeoRestricted(config)
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "drjones.network-panel-context",
  contextTypes() {
    return [];
  },
  category: "GLOBAL",
  title: i18nAiBrandedString(UIStrings11.debugWithGemini, UIStrings11.debugWithAi),
  configurableBindings: false,
  async loadActionDelegate() {
    const AiAssistance = await loadAiAssistanceModule();
    return new AiAssistance.ActionDelegate();
  },
  condition: (config) => isNetworkAgentFeatureAvailable(config) && !isPolicyRestricted(config) && !isGeoRestricted(config)
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "drjones.performance-panel-context",
  contextTypes() {
    return [];
  },
  category: "GLOBAL",
  title: i18nAiBrandedString(UIStrings11.debugWithGemini, UIStrings11.debugWithAi),
  configurableBindings: false,
  async loadActionDelegate() {
    const AiAssistance = await loadAiAssistanceModule();
    return new AiAssistance.ActionDelegate();
  },
  condition: (config) => isPerformanceAgentFeatureAvailable(config) && !isPolicyRestricted(config) && !isGeoRestricted(config)
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "drjones.sources-floating-button",
  contextTypes() {
    return [];
  },
  category: "GLOBAL",
  title: i18nAiBrandedString(UIStrings11.debugWithGemini, UIStrings11.debugWithAi),
  configurableBindings: false,
  async loadActionDelegate() {
    const AiAssistance = await loadAiAssistanceModule();
    return new AiAssistance.ActionDelegate();
  },
  condition: (config) => isFileAgentFeatureAvailable(config) && !isPolicyRestricted(config) && !isGeoRestricted(config)
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "drjones.sources-panel-context",
  contextTypes() {
    return [];
  },
  category: "GLOBAL",
  title: i18nAiBrandedString(UIStrings11.debugWithGemini, UIStrings11.debugWithAi),
  configurableBindings: false,
  async loadActionDelegate() {
    const AiAssistance = await loadAiAssistanceModule();
    return new AiAssistance.ActionDelegate();
  },
  condition: (config) => isFileAgentFeatureAvailable(config) && !isPolicyRestricted(config) && !isGeoRestricted(config)
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "ai-assistance.storage-floating-button",
  contextTypes() {
    return [];
  },
  category: "GLOBAL",
  title: i18nAiBrandedString(UIStrings11.debugWithGemini, UIStrings11.debugWithAi),
  configurableBindings: false,
  async loadActionDelegate() {
    const AiAssistance = await loadAiAssistanceModule();
    return new AiAssistance.ActionDelegate();
  },
  condition: (config) => isStorageAgentFeatureAvailable(config) && !isPolicyRestricted(config) && !isGeoRestricted(config)
});
UI11.ActionRegistration.registerActionExtension({
  actionId: "ai-assistance.application-panel-context",
  contextTypes() {
    return [];
  },
  category: "GLOBAL",
  title: i18nAiBrandedString(UIStrings11.debugWithGemini, UIStrings11.debugWithAi),
  configurableBindings: false,
  async loadActionDelegate() {
    const AiAssistance = await loadAiAssistanceModule();
    return new AiAssistance.ActionDelegate();
  },
  condition: (config) => isStorageAgentFeatureAvailable(config) && !isPolicyRestricted(config) && !isGeoRestricted(config)
});

// gen/front_end/ui/legacy/components/perf_ui/perf_ui-meta.js
import * as Common11 from "../../core/common/common.js";
import * as i18n24 from "../../core/i18n/i18n.js";
import * as UI12 from "../../ui/legacy/legacy.js";
var UIStrings12 = {
  /**
   * @description Title of a setting under the Performance category in Settings to select the navigation style for the Performance panel.
   */
  flamechartSelectedNavigation: "Flamechart navigation:",
  /**
   * @description Setting option for modern flame chart navigation in the Performance panel.
   */
  modern: "Modern",
  /**
   * @description Setting option for classic flame chart navigation in the Performance panel.
   */
  classic: "Classic",
  /**
   * @description Action title to trigger garbage collection.
   */
  collectGarbage: "Collect garbage"
};
var str_12 = i18n24.i18n.registerUIStrings("ui/legacy/components/perf_ui/perf_ui-meta.ts", UIStrings12);
var i18nLazyString11 = i18n24.i18n.getLazilyComputedLocalizedString.bind(void 0, str_12);
var loadedPerfUIModule;
async function loadPerfUIModule() {
  if (!loadedPerfUIModule) {
    loadedPerfUIModule = await import("../../ui/legacy/components/perf_ui/perf_ui.js");
  }
  return loadedPerfUIModule;
}
UI12.ActionRegistration.registerActionExtension({
  actionId: "components.collect-garbage",
  category: "PERFORMANCE",
  title: i18nLazyString11(UIStrings12.collectGarbage),
  iconClass: "mop",
  async loadActionDelegate() {
    const PerfUI = await loadPerfUIModule();
    return new PerfUI.GCActionDelegate.GCActionDelegate();
  }
});
Common11.Settings.registerSettingExtension({
  category: "PERFORMANCE",
  storageType: "Synced",
  title: i18nLazyString11(UIStrings12.flamechartSelectedNavigation),
  settingName: "flamechart-selected-navigation",
  settingType: "enum",
  defaultValue: "classic",
  options: [
    {
      title: i18nLazyString11(UIStrings12.modern),
      text: i18nLazyString11(UIStrings12.modern),
      value: "modern"
    },
    {
      title: i18nLazyString11(UIStrings12.classic),
      text: i18nLazyString11(UIStrings12.classic),
      value: "classic"
    }
  ]
});

// gen/front_end/ui/legacy/components/quick_open/quick_open-meta.js
import * as i18n26 from "../../core/i18n/i18n.js";
import * as UI13 from "../../ui/legacy/legacy.js";
var UIStrings13 = {
  /**
   * @description Title of an action that opens a file.
   */
  openFile: "Open file",
  /**
   * @description Title of an action that opens the command menu.
   */
  runCommand: "Run command"
};
var str_13 = i18n26.i18n.registerUIStrings("ui/legacy/components/quick_open/quick_open-meta.ts", UIStrings13);
var i18nLazyString12 = i18n26.i18n.getLazilyComputedLocalizedString.bind(void 0, str_13);
var loadedQuickOpenModule;
async function loadQuickOpenModule() {
  if (!loadedQuickOpenModule) {
    loadedQuickOpenModule = await import("../../ui/legacy/components/quick_open/quick_open.js");
  }
  return loadedQuickOpenModule;
}
UI13.ActionRegistration.registerActionExtension({
  actionId: "quick-open.show-command-menu",
  category: "GLOBAL",
  title: i18nLazyString12(UIStrings13.runCommand),
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
  title: i18nLazyString12(UIStrings13.openFile),
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
  actionId: "quick-open.show-command-menu"
});
UI13.ContextMenu.registerItem({
  location: "mainMenu/default",
  actionId: "quick-open.show"
});

// gen/front_end/ui/legacy/components/source_frame/source_frame-meta.js
import * as Common12 from "../../core/common/common.js";
import * as i18n28 from "../../core/i18n/i18n.js";
var UIStrings14 = {
  /**
   * @description Title of a setting under the Sources category in settings.
   */
  defaultIndentation: "Default indentation",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  setIndentationToSpaces: "Set indentation to 2 spaces",
  /**
   * @description Option in a dropdown menu to set indentation to 2 spaces.
   */
  Spaces: "2 spaces",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  setIndentationToFSpaces: "Set indentation to 4 spaces",
  /**
   * @description Option in a dropdown menu to set indentation to 4 spaces.
   */
  fSpaces: "4 spaces",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  setIndentationToESpaces: "Set indentation to 8 spaces",
  /**
   * @description Option in a dropdown menu to set indentation to 8 spaces.
   */
  eSpaces: "8 spaces",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the command menu.
   */
  setIndentationToTabCharacter: "Set indentation to tab character",
  /**
   * @description Option in a dropdown menu to set indentation to tab character.
   */
  tabCharacter: "Tab character"
};
var str_14 = i18n28.i18n.registerUIStrings("ui/legacy/components/source_frame/source_frame-meta.ts", UIStrings14);
var i18nLazyString13 = i18n28.i18n.getLazilyComputedLocalizedString.bind(void 0, str_14);
Common12.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString13(UIStrings14.defaultIndentation),
  settingName: "text-editor-indent",
  settingType: "enum",
  defaultValue: "    ",
  options: [
    {
      title: i18nLazyString13(UIStrings14.setIndentationToSpaces),
      text: i18nLazyString13(UIStrings14.Spaces),
      value: "  "
    },
    {
      title: i18nLazyString13(UIStrings14.setIndentationToFSpaces),
      text: i18nLazyString13(UIStrings14.fSpaces),
      value: "    "
    },
    {
      title: i18nLazyString13(UIStrings14.setIndentationToESpaces),
      text: i18nLazyString13(UIStrings14.eSpaces),
      value: "        "
    },
    {
      title: i18nLazyString13(UIStrings14.setIndentationToTabCharacter),
      text: i18nLazyString13(UIStrings14.tabCharacter),
      value: "	"
    }
  ]
});

// gen/front_end/entrypoints/trace_app/trace_app.prebundle.js
import * as Main from "../main/main.js";
new Main.MainImpl.MainImpl();
//# sourceMappingURL=trace_app.js.map
