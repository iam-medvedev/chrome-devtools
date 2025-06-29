// gen/front_end/panels/security/security-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as Security from "./security.js";
var UIStrings = {
  /**
   *@description Default Title of the security panel
   */
  security: "Security",
  /**
   *@description Title of privacy and security panel. This is used when the kDevToolsPrivacyUI feature flag is enabled.
   */
  PrivacyAndSecurity: "Privacy and security",
  /**
   *@description Default command to open the security panel
   */
  showSecurity: "Show Security",
  /**
   *@description Command to open the privacy and security panel. This is used when the kDevToolPrivacyUI feature flag is enabled
   */
  showPrivacyAndSecurity: "Show Privacy and security"
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
  title: () => Root.Runtime.hostConfig.devToolsPrivacyUI?.enabled ? i18nLazyString(UIStrings.PrivacyAndSecurity)() : i18nLazyString(UIStrings.security)(),
  commandPrompt: () => Root.Runtime.hostConfig.devToolsPrivacyUI?.enabled ? i18nLazyString(UIStrings.showPrivacyAndSecurity)() : i18nLazyString(UIStrings.showSecurity)(),
  order: 80,
  persistence: "closeable",
  async loadView() {
    const Security2 = await loadSecurityModule();
    return Security2.SecurityPanel.SecurityPanel.instance();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [
      Security.CookieReportView.CookieReportView
    ];
  },
  destination: Common.Revealer.RevealerDestination.SECURITY_PANEL,
  async loadRevealer() {
    const Security2 = await loadSecurityModule();
    return new Security2.SecurityPanel.SecurityRevealer();
  }
});
//# sourceMappingURL=security-meta.js.map
