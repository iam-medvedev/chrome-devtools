// gen/front_end/panels/emulation/emulation-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Title of an action in the emulation tool to toggle device mode
   */
  toggleDeviceToolbar: "Toggle device toolbar",
  /**
   *@description Title of an action in the emulation tool to capture screenshot
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
   *@description Command in the Device Mode Toolbar, to hide media query boundaries in the UI.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
   */
  hideMediaQueries: "Hide media queries",
  /**
   *@description Command that shows measuring rulers next to the emulated device.
   */
  showRulers: "Show rulers in the Device Mode toolbar",
  /**
   *@description Command that hides measuring rulers next to the emulated device.
   */
  hideRulers: "Hide rulers in the Device Mode toolbar",
  /**
   *@description Command that shows a frame (like a picture frame) around the emulated device.
   */
  showDeviceFrame: "Show device frame",
  /**
   *@description Command that hides a frame (like a picture frame) around the emulated device.
   */
  hideDeviceFrame: "Hide device frame"
};
var str_ = i18n.i18n.registerUIStrings("panels/emulation/emulation-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedEmulationModule;
async function loadEmulationModule() {
  if (!loadedEmulationModule) {
    loadedEmulationModule = await import("./emulation.js");
  }
  return loadedEmulationModule;
}
UI.ActionRegistration.registerActionExtension({
  category: "MOBILE",
  actionId: "emulation.toggle-device-mode",
  toggleable: true,
  async loadActionDelegate() {
    const Emulation = await loadEmulationModule();
    return new Emulation.DeviceModeWrapper.ActionDelegate();
  },
  condition: Root.Runtime.conditions.canDock,
  title: i18nLazyString(UIStrings.toggleDeviceToolbar),
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
UI.ActionRegistration.registerActionExtension({
  actionId: "emulation.capture-screenshot",
  category: "SCREENSHOT",
  async loadActionDelegate() {
    const Emulation = await loadEmulationModule();
    return new Emulation.DeviceModeWrapper.ActionDelegate();
  },
  condition: Root.Runtime.conditions.canDock,
  title: i18nLazyString(UIStrings.captureScreenshot)
});
UI.ActionRegistration.registerActionExtension({
  actionId: "emulation.capture-full-height-screenshot",
  category: "SCREENSHOT",
  async loadActionDelegate() {
    const Emulation = await loadEmulationModule();
    return new Emulation.DeviceModeWrapper.ActionDelegate();
  },
  condition: Root.Runtime.conditions.canDock,
  title: i18nLazyString(UIStrings.captureFullSizeScreenshot)
});
UI.ActionRegistration.registerActionExtension({
  actionId: "emulation.capture-node-screenshot",
  category: "SCREENSHOT",
  async loadActionDelegate() {
    const Emulation = await loadEmulationModule();
    return new Emulation.DeviceModeWrapper.ActionDelegate();
  },
  condition: Root.Runtime.conditions.canDock,
  title: i18nLazyString(UIStrings.captureNodeScreenshot)
});
Common.Settings.registerSettingExtension({
  category: "MOBILE",
  settingName: "show-media-query-inspector",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showMediaQueries)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.hideMediaQueries)
    }
  ],
  tags: [i18nLazyString(UIStrings.device)]
});
Common.Settings.registerSettingExtension({
  category: "MOBILE",
  settingName: "emulation.show-rulers",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showRulers)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.hideRulers)
    }
  ],
  tags: [i18nLazyString(UIStrings.device)]
});
Common.Settings.registerSettingExtension({
  category: "MOBILE",
  settingName: "emulation.show-device-outline",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showDeviceFrame)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.hideDeviceFrame)
    }
  ],
  tags: [i18nLazyString(UIStrings.device)]
});
UI.Toolbar.registerToolbarItem({
  actionId: "emulation.toggle-device-mode",
  condition: Root.Runtime.conditions.canDock,
  location: "main-toolbar-left",
  order: 1,
  loadItem: void 0,
  separator: void 0
});
Common.AppProvider.registerAppProvider({
  async loadAppProvider() {
    const Emulation = await loadEmulationModule();
    return Emulation.AdvancedApp.AdvancedAppProvider.instance();
  },
  condition: Root.Runtime.conditions.canDock,
  order: 0
});
UI.ContextMenu.registerItem({
  location: "deviceModeMenu/save",
  order: 12,
  actionId: "emulation.capture-screenshot"
});
UI.ContextMenu.registerItem({
  location: "deviceModeMenu/save",
  order: 13,
  actionId: "emulation.capture-full-height-screenshot"
});
//# sourceMappingURL=emulation-meta.js.map
