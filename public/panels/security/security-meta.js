// gen/front_end/panels/security/security-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Default Title of the security panel
   */
  security: "Security",
  /**
   * @description Default command to open the security panel
   */
  showSecurity: "Show Security"
};
var str_ = i18n.i18n.registerUIStrings("panels/security/security-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedSecurityModule;
async function loadSecurityModule() {
  if (!loadedSecurityModule) {
    loadedSecurityModule = await import("./security.js");
  }
  return loadedSecurityModule;
}
UI.ViewManager.registerViewExtension({
  location: "panel",
  id: "security",
  title: () => i18nLazyString(UIStrings.security)(),
  commandPrompt: () => i18nLazyString(UIStrings.showSecurity)(),
  order: 80,
  persistence: "closeable",
  async loadView() {
    const Security = await loadSecurityModule();
    return Security.SecurityPanel.SecurityPanel.instance();
  }
});
//# sourceMappingURL=security-meta.js.map
