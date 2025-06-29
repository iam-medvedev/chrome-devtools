// gen/front_end/panels/autofill/autofill-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as LegacyWrapper from "./../../ui/components/legacy_wrapper/legacy_wrapper.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Label for the autofill pane
   */
  autofill: "Autofill",
  /**
   *@description Command for showing the 'Autofill' pane
   */
  showAutofill: "Show Autofill"
};
var str_ = i18n.i18n.registerUIStrings("panels/autofill/autofill-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedAutofillModule;
async function loadAutofillModule() {
  if (!loadedAutofillModule) {
    loadedAutofillModule = await import("./autofill.js");
  }
  return loadedAutofillModule;
}
UI.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "autofill-view",
  title: i18nLazyString(UIStrings.autofill),
  commandPrompt: i18nLazyString(UIStrings.showAutofill),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const Autofill = await loadAutofillModule();
    return LegacyWrapper.LegacyWrapper.legacyWrapper(UI.Widget.Widget, new Autofill.AutofillView.AutofillView());
  }
});
//# sourceMappingURL=autofill-meta.js.map
