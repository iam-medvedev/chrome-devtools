// gen/front_end/panels/lighthouse/lighthouse-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Command for showing the 'Lighthouse' tool
   */
  showLighthouse: "Show `Lighthouse`"
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
  location: "panel",
  id: "lighthouse",
  title: i18n.i18n.lockedLazyString("Lighthouse"),
  commandPrompt: i18nLazyString(UIStrings.showLighthouse),
  order: 90,
  async loadView() {
    const Lighthouse = await loadLighthouseModule();
    return Lighthouse.LighthousePanel.LighthousePanel.instance();
  },
  tags: [
    i18n.i18n.lockedLazyString("lighthouse"),
    i18n.i18n.lockedLazyString("pwa")
  ]
});
//# sourceMappingURL=lighthouse-meta.js.map
