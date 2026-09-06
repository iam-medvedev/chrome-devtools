// ../../front_end/ui/legacy/components/perf_ui/perf_ui-meta.ts
import * as Common from "../../../../core/common/common.js";
import * as i18n from "../../../../core/i18n/i18n.js";
import * as UI from "../../legacy.js";
var UIStrings = {
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
var str_ = i18n.i18n.registerUIStrings("ui/legacy/components/perf_ui/perf_ui-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedPerfUIModule;
async function loadPerfUIModule() {
  if (!loadedPerfUIModule) {
    loadedPerfUIModule = await import("./perf_ui.js");
  }
  return loadedPerfUIModule;
}
UI.ActionRegistration.registerActionExtension({
  actionId: "components.collect-garbage",
  category: UI.ActionRegistration.ActionCategory.PERFORMANCE,
  title: i18nLazyString(UIStrings.collectGarbage),
  iconClass: UI.ActionRegistration.IconClass.MOP,
  async loadActionDelegate() {
    const PerfUI = await loadPerfUIModule();
    return new PerfUI.GCActionDelegate.GCActionDelegate();
  }
});
Common.Settings.registerSettingExtension({
  category: Common.Settings.SettingCategory.PERFORMANCE,
  storageType: Common.Settings.SettingStorageType.SYNCED,
  title: i18nLazyString(UIStrings.flamechartSelectedNavigation),
  settingName: "flamechart-selected-navigation",
  settingType: Common.Settings.SettingType.ENUM,
  defaultValue: "classic",
  options: [
    {
      title: i18nLazyString(UIStrings.modern),
      text: i18nLazyString(UIStrings.modern),
      value: "modern"
    },
    {
      title: i18nLazyString(UIStrings.classic),
      text: i18nLazyString(UIStrings.classic),
      value: "classic"
    }
  ]
});
//# sourceMappingURL=perf_ui-meta.js.map
