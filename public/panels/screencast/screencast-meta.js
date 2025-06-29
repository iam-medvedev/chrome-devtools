// gen/front_end/panels/screencast/screencast-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as UI from "./../../ui/legacy/legacy.js";
var loadedScreencastModule;
async function loadScreencastModule() {
  if (!loadedScreencastModule) {
    loadedScreencastModule = await import("./screencast.js");
  }
  return loadedScreencastModule;
}
UI.Toolbar.registerToolbarItem({
  async loadItem() {
    const Screencast = await loadScreencastModule();
    return Screencast.ScreencastApp.ToolbarButtonProvider.instance();
  },
  order: 1,
  location: "main-toolbar-left"
});
Common.AppProvider.registerAppProvider({
  async loadAppProvider() {
    const Screencast = await loadScreencastModule();
    return Screencast.ScreencastApp.ScreencastAppProvider.instance();
  },
  order: 1
});
UI.ContextMenu.registerItem({
  location: "mainMenu",
  order: 10,
  actionId: "components.request-app-banner"
});
//# sourceMappingURL=screencast-meta.js.map
