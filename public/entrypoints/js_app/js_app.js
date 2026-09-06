// ../../front_end/entrypoints/js_app/js_app.ts
import "../shell/shell.js";
import "../../panels/timeline/timeline-meta.js";
import "../../panels/mobile_throttling/mobile_throttling-meta.js";
import "../../panels/network/network-meta.js";
import * as Common from "../../core/common/common.js";
import * as Host from "../../core/host/host.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as SDK from "../../core/sdk/sdk.js";
import * as Components from "../../ui/legacy/components/utils/utils.js";
import * as UI from "../../ui/legacy/legacy.js";
import * as Main from "../main/main.js";
var UIStrings = {
  /**
   * @description Name of the primary target connection when debugging Node.js.
   */
  main: "Main",
  /**
   * @description Title of the 'Scripts' tab in the navigation tree inside the Sources panel.
   */
  networkTitle: "Scripts",
  /**
   * @description Command in the command menu for showing the 'Scripts' tab in the navigation tree inside the Sources panel.
   */
  showNode: "Show Scripts"
};
var str_ = i18n.i18n.registerUIStrings(
  "entrypoints/js_app/js_app.ts",
  UIStrings
);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(
  void 0,
  str_
);
var jsMainImplInstance;
var loadedSourcesModule;
async function loadSourcesModule() {
  if (!loadedSourcesModule) {
    loadedSourcesModule = await import("../../panels/sources/sources.js");
  }
  return loadedSourcesModule;
}
var JsMainImpl = class _JsMainImpl {
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!jsMainImplInstance || forceNew) {
      jsMainImplInstance = new _JsMainImpl();
    }
    return jsMainImplInstance;
  }
  async run() {
    Host.userMetrics.actionTaken(
      Host.UserMetrics.Action.ConnectToNodeJSDirectly
    );
    void SDK.Connections.initMainConnection(async () => {
      const target = SDK.TargetManager.TargetManager.instance().createTarget(
        "main",
        i18nString(UIStrings.main),
        SDK.Target.Type.NODE,
        null
      );
      void target.runtimeAgent().invoke_runIfWaitingForDebugger();
    }, Components.TargetDetachedDialog.TargetDetachedDialog.connectionLost);
  }
};
UI.ViewManager.registerViewExtension({
  location: UI.ViewManager.ViewLocationValues.NAVIGATOR_VIEW,
  id: "navigator-network",
  title: i18nLazyString(UIStrings.networkTitle),
  commandPrompt: i18nLazyString(UIStrings.showNode),
  order: 2,
  persistence: UI.ViewManager.ViewPersistence.PERMANENT,
  async loadView(universe) {
    const Sources = await loadSourcesModule();
    return Sources.SourcesNavigator.NetworkNavigatorView.instance({
      forceNew: null,
      networkProjectManager: universe.networkProjectManager
    });
  }
});
Common.Runnable.registerEarlyInitializationRunnable(JsMainImpl.instance);
new Main.MainImpl.MainImpl();
export {
  JsMainImpl
};
//# sourceMappingURL=js_app.js.map
