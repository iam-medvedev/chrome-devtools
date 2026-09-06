// ../../front_end/panels/screencast/screencast-meta.ts
import * as UI from "../../ui/legacy/legacy.js";
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
  location: UI.Toolbar.ToolbarItemLocation.MAIN_TOOLBAR_LEFT
});
UI.AppProvider.registerAppProvider({
  async loadAppProvider() {
    const Screencast = await loadScreencastModule();
    return Screencast.ScreencastApp.ScreencastAppProvider.instance();
  },
  order: 1
});
UI.ContextMenu.registerItem({
  location: UI.ContextMenu.ItemLocation.MAIN_MENU,
  order: 10,
  actionId: "components.request-app-banner"
});
//# sourceMappingURL=screencast-meta.js.map
