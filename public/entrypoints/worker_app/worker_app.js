// ../../front_end/entrypoints/worker_app/worker_app.ts
import "../shell/shell.js";
import "../../panels/browser_debugger/browser_debugger-meta.js";
import "../../panels/developer_resources/developer_resources-meta.js";
import "../../panels/issues/issues-meta.js";
import "../../panels/layer_viewer/layer_viewer-meta.js";
import "../../panels/mobile_throttling/mobile_throttling-meta.js";
import "../../panels/network/network-meta.js";
import "../../panels/application/application-meta.js";
import "../../panels/timeline/timeline-meta.js";

// ../../front_end/entrypoints/worker_app/WorkerMain.ts
import * as Common from "../../core/common/common.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as SDK from "../../core/sdk/sdk.js";
import * as MobileThrottling from "../../panels/mobile_throttling/mobile_throttling.js";
import * as Components from "../../ui/legacy/components/utils/utils.js";
var UIStrings = {
  /**
   * @description Name of the primary target connection when debugging a service worker or dedicated worker.
   */
  main: "Main"
};
var str_ = i18n.i18n.registerUIStrings("entrypoints/worker_app/WorkerMain.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var workerMainImplInstance;
var WorkerMainImpl = class _WorkerMainImpl {
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!workerMainImplInstance || forceNew) {
      workerMainImplInstance = new _WorkerMainImpl();
    }
    return workerMainImplInstance;
  }
  async run() {
    void SDK.Connections.initMainConnection(async () => {
      if (await SDK.TargetManager.TargetManager.instance().maybeAttachInitialTarget()) {
        return;
      }
      SDK.TargetManager.TargetManager.instance().createTarget(
        "main",
        i18nString(UIStrings.main),
        SDK.Target.Type.ServiceWorker,
        null
      );
    }, Components.TargetDetachedDialog.TargetDetachedDialog.connectionLost);
    new MobileThrottling.NetworkPanelIndicator.NetworkPanelIndicator();
  }
};
Common.Runnable.registerEarlyInitializationRunnable(WorkerMainImpl.instance);
SDK.ChildTargetManager.ChildTargetManager.install(async ({ target, waitingForDebugger }) => {
  if (target.parentTarget() || target.type() !== SDK.Target.Type.ServiceWorker || !waitingForDebugger) {
    return;
  }
  const debuggerModel = target.model(SDK.DebuggerModel.DebuggerModel);
  if (!debuggerModel) {
    return;
  }
  if (!debuggerModel.isReadyToPause()) {
    await debuggerModel.once(SDK.DebuggerModel.Events.DebuggerIsReadyToPause);
  }
  debuggerModel.pause();
});

// ../../front_end/entrypoints/worker_app/worker_app.ts
import * as Root from "../../core/root/root.js";
import * as Main from "../main/main.js";
self.runtime = Root.Runtime.Runtime.instance({ forceNew: true });
new Main.MainImpl.MainImpl();
//# sourceMappingURL=worker_app.js.map
