// gen/front_end/panels/layers/layers-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Title of the Layers tool
   */
  layers: "Layers",
  /**
   *@description Command for showing the Layers tool
   */
  showLayers: "Show Layers"
};
var str_ = i18n.i18n.registerUIStrings("panels/layers/layers-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedLayersModule;
async function loadLayersModule() {
  if (!loadedLayersModule) {
    loadedLayersModule = await import("./layers.js");
  }
  return loadedLayersModule;
}
UI.ViewManager.registerViewExtension({
  location: "panel",
  id: "layers",
  title: i18nLazyString(UIStrings.layers),
  commandPrompt: i18nLazyString(UIStrings.showLayers),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const Layers = await loadLayersModule();
    return Layers.LayersPanel.LayersPanel.instance();
  }
});
//# sourceMappingURL=layers-meta.js.map
