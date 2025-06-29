// gen/front_end/panels/accessibility/accessibility-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var loadedAccessibilityModule;
var UIStrings = {
  /**
   * @description Text for accessibility of the web page
   */
  accessibility: "Accessibility",
  /**
   * @description Command for showing the 'Accessibility' tool
   */
  shoAccessibility: "Show Accessibility"
};
var str_ = i18n.i18n.registerUIStrings("panels/accessibility/accessibility-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
async function loadAccessibilityModule() {
  if (!loadedAccessibilityModule) {
    loadedAccessibilityModule = await import("./accessibility.js");
  }
  return loadedAccessibilityModule;
}
UI.ViewManager.registerViewExtension({
  location: "elements-sidebar",
  id: "accessibility.view",
  title: i18nLazyString(UIStrings.accessibility),
  commandPrompt: i18nLazyString(UIStrings.shoAccessibility),
  order: 10,
  persistence: "permanent",
  async loadView() {
    const Accessibility = await loadAccessibilityModule();
    return Accessibility.AccessibilitySidebarView.AccessibilitySidebarView.instance();
  }
});
//# sourceMappingURL=accessibility-meta.js.map
