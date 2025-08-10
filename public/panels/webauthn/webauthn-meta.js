// gen/front_end/panels/webauthn/webauthn-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Title of WebAuthn tab in bottom drawer.
   */
  webauthn: "WebAuthn",
  /**
   * @description Command for showing the WebAuthn tab in bottom drawer.
   */
  showWebauthn: "Show WebAuthn"
};
var str_ = i18n.i18n.registerUIStrings("panels/webauthn/webauthn-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedWebauthnModule;
async function loadWebauthnModule() {
  if (!loadedWebauthnModule) {
    loadedWebauthnModule = await import("./webauthn.js");
  }
  return loadedWebauthnModule;
}
UI.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "webauthn-pane",
  title: i18nLazyString(UIStrings.webauthn),
  commandPrompt: i18nLazyString(UIStrings.showWebauthn),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const Webauthn = await loadWebauthnModule();
    return new Webauthn.WebauthnPane.WebauthnPaneImpl();
  }
});
//# sourceMappingURL=webauthn-meta.js.map
