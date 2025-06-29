// gen/front_end/panels/developer_resources/developer_resources-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Title for developer resources panel
   */
  developerResources: "Developer resources",
  /**
   * @description Command for showing the developer resources panel
   */
  showDeveloperResources: "Show Developer resources"
};
var str_ = i18n.i18n.registerUIStrings("panels/developer_resources/developer_resources-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedDeveloperResourcesModule;
async function loadDeveloperResourcesModule() {
  if (!loadedDeveloperResourcesModule) {
    loadedDeveloperResourcesModule = await import("./developer_resources.js");
  }
  return loadedDeveloperResourcesModule;
}
UI.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "developer-resources",
  title: i18nLazyString(UIStrings.developerResources),
  commandPrompt: i18nLazyString(UIStrings.showDeveloperResources),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const DeveloperResources = await loadDeveloperResourcesModule();
    return new DeveloperResources.DeveloperResourcesView.DeveloperResourcesView();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [SDK.PageResourceLoader.ResourceKey];
  },
  destination: Common.Revealer.RevealerDestination.DEVELOPER_RESOURCES_PANEL,
  async loadRevealer() {
    const DeveloperResources = await loadDeveloperResourcesModule();
    return new DeveloperResources.DeveloperResourcesView.DeveloperResourcesRevealer();
  }
});
//# sourceMappingURL=developer_resources-meta.js.map
