// gen/front_end/panels/css_overview/css_overview-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Title of the CSS overview panel
   */
  cssOverview: "CSS overview",
  /**
   *@description Title of the CSS overview panel
   */
  showCssOverview: "Show CSS overview"
};
var str_ = i18n.i18n.registerUIStrings("panels/css_overview/css_overview-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedCSSOverviewModule;
async function loadCSSOverviewModule() {
  if (!loadedCSSOverviewModule) {
    loadedCSSOverviewModule = await import("./css_overview.js");
  }
  return loadedCSSOverviewModule;
}
UI.ViewManager.registerViewExtension({
  location: "panel",
  id: "cssoverview",
  commandPrompt: i18nLazyString(UIStrings.showCssOverview),
  title: i18nLazyString(UIStrings.cssOverview),
  order: 95,
  persistence: "closeable",
  async loadView() {
    const CSSOverview = await loadCSSOverviewModule();
    return new CSSOverview.CSSOverviewPanel.CSSOverviewPanel();
  },
  isPreviewFeature: true
});
//# sourceMappingURL=css_overview-meta.js.map
