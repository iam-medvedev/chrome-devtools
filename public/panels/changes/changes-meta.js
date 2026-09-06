// ../../front_end/panels/changes/changes-meta.ts
import * as i18n from "../../core/i18n/i18n.js";
import * as UI from "../../ui/legacy/legacy.js";
var loadedChangesModule;
var UIStrings = {
  /**
   * @description Title of the Changes panel.
   */
  changes: "Changes",
  /**
   * @description Command for showing the Changes panel.
   */
  showChanges: "Show Changes"
};
var str_ = i18n.i18n.registerUIStrings("panels/changes/changes-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
async function loadChangesModule() {
  if (!loadedChangesModule) {
    loadedChangesModule = await import("./changes.js");
  }
  return loadedChangesModule;
}
UI.ViewManager.registerViewExtension({
  location: UI.ViewManager.ViewLocationValues.DRAWER_VIEW,
  id: "changes.changes",
  title: i18nLazyString(UIStrings.changes),
  commandPrompt: i18nLazyString(UIStrings.showChanges),
  persistence: UI.ViewManager.ViewPersistence.CLOSEABLE,
  async loadView() {
    const Changes = await loadChangesModule();
    return new Changes.ChangesView.ChangesView();
  }
});
//# sourceMappingURL=changes-meta.js.map
