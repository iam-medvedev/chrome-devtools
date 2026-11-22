// ../../front_end/panels/lighthouse/lighthouse-meta.ts
import * as Common from "../../core/common/common.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as UI from "../../ui/legacy/legacy.js";
import * as SettingsUI from "../../ui/settings/settings.js";
import * as Lighthouse from "./lighthouse.js";
var UIStrings = {
  /**
   * @description Command for showing the Lighthouse panel.
   */
  showLighthouse: "Show `Lighthouse`",
  /**
   * @description Title of Lighthouse performance category setting.
   */
  performance: "Performance",
  /**
   * @description Title of Lighthouse accessibility category setting.
   */
  accessibility: "Accessibility",
  /**
   * @description Title of Lighthouse best practices category setting.
   */
  bestPractices: "Best practices",
  /**
   * @description Title of Lighthouse SEO category setting.
   */
  seo: "SEO",
  /**
   * @description Title of Lighthouse agentic browsing category setting.
   */
  agenticBrowsing: "Agentic browsing",
  /**
   * @description Title of Lighthouse device type setting.
   */
  device: "Apply mobile emulation",
  /**
   * @description Title of Lighthouse mode setting.
   */
  mode: "Lighthouse mode",
  /**
   * @description Title of Lighthouse throttling setting.
   */
  throttling: "Throttling method",
  /**
   * @description Title of Lighthouse clear storage setting.
   */
  clearStorage: "Clear storage",
  /**
   * @description Title of Lighthouse JavaScript sampling setting.
   */
  enableSampling: "Enable JS sampling"
};
var str_ = i18n.i18n.registerUIStrings("panels/lighthouse/lighthouse-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedLighthouseModule;
async function loadLighthouseModule() {
  if (!loadedLighthouseModule) {
    loadedLighthouseModule = await import("./lighthouse.js");
  }
  return loadedLighthouseModule;
}
UI.ViewManager.registerViewExtension({
  location: UI.ViewManager.ViewLocationValues.PANEL,
  id: "lighthouse",
  title: i18n.i18n.lockedLazyString("Lighthouse"),
  commandPrompt: i18nLazyString(UIStrings.showLighthouse),
  order: 90,
  async loadView() {
    const Lighthouse2 = await loadLighthouseModule();
    return Lighthouse2.LighthousePanel.LighthousePanel.instance();
  },
  tags: [
    i18n.i18n.lockedLazyString("lighthouse"),
    i18n.i18n.lockedLazyString("pwa")
  ]
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [
      Lighthouse.LighthousePanel.ActiveLighthouseReport
    ];
  },
  destination: Common.Revealer.RevealerDestination.LIGHTHOUSE_PANEL,
  async loadRevealer() {
    const Lighthouse2 = await loadLighthouseModule();
    return new Lighthouse2.LighthousePanel.ReportRevealer();
  }
});
SettingsUI.SettingUIRegistration.register(SettingsUI.LighthouseSettings.catPerfSettingDescriptor, {
  category: Common.Settings.SettingCategory.NONE,
  title: i18nLazyString(UIStrings.performance)
});
SettingsUI.SettingUIRegistration.register(SettingsUI.LighthouseSettings.catA11ySettingDescriptor, {
  category: Common.Settings.SettingCategory.NONE,
  title: i18nLazyString(UIStrings.accessibility)
});
SettingsUI.SettingUIRegistration.register(SettingsUI.LighthouseSettings.catBestPracticesSettingDescriptor, {
  category: Common.Settings.SettingCategory.NONE,
  title: i18nLazyString(UIStrings.bestPractices)
});
SettingsUI.SettingUIRegistration.register(SettingsUI.LighthouseSettings.catSeoSettingDescriptor, {
  category: Common.Settings.SettingCategory.NONE,
  title: i18nLazyString(UIStrings.seo)
});
SettingsUI.SettingUIRegistration.register(SettingsUI.LighthouseSettings.catAgenticBrowsingSettingDescriptor, {
  category: Common.Settings.SettingCategory.NONE,
  title: i18nLazyString(UIStrings.agenticBrowsing)
});
SettingsUI.SettingUIRegistration.register(SettingsUI.LighthouseSettings.deviceTypeSettingDescriptor, {
  category: Common.Settings.SettingCategory.NONE,
  title: i18nLazyString(UIStrings.device)
});
SettingsUI.SettingUIRegistration.register(SettingsUI.LighthouseSettings.modeSettingDescriptor, {
  category: Common.Settings.SettingCategory.NONE,
  title: i18nLazyString(UIStrings.mode)
});
SettingsUI.SettingUIRegistration.register(SettingsUI.LighthouseSettings.throttlingSettingDescriptor, {
  category: Common.Settings.SettingCategory.NONE,
  title: i18nLazyString(UIStrings.throttling)
});
SettingsUI.SettingUIRegistration.register(SettingsUI.LighthouseSettings.clearStorageSettingDescriptor, {
  category: Common.Settings.SettingCategory.NONE,
  title: i18nLazyString(UIStrings.clearStorage)
});
SettingsUI.SettingUIRegistration.register(SettingsUI.LighthouseSettings.enableSamplingSettingDescriptor, {
  category: Common.Settings.SettingCategory.NONE,
  title: i18nLazyString(UIStrings.enableSampling)
});
//# sourceMappingURL=lighthouse-meta.js.map
