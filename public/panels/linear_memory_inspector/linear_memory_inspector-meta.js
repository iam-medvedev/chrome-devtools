// gen/front_end/panels/linear_memory_inspector/linear_memory_inspector-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as ObjectUI from "./../../ui/legacy/components/object_ui/object_ui.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Title of the Linear Memory inspector tool
   */
  memoryInspector: "Memory inspector",
  /**
   *@description Command for showing the 'Memory inspector' tool
   */
  showMemoryInspector: "Show Memory inspector"
};
var str_ = i18n.i18n.registerUIStrings("panels/linear_memory_inspector/linear_memory_inspector-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedLinearMemoryInspectorModule;
async function loadLinearMemoryInspectorModule() {
  if (!loadedLinearMemoryInspectorModule) {
    loadedLinearMemoryInspectorModule = await import("./linear_memory_inspector.js");
  }
  return loadedLinearMemoryInspectorModule;
}
UI.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "linear-memory-inspector",
  title: i18nLazyString(UIStrings.memoryInspector),
  commandPrompt: i18nLazyString(UIStrings.showMemoryInspector),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const LinearMemoryInspector = await loadLinearMemoryInspectorModule();
    return LinearMemoryInspector.LinearMemoryInspectorPane.LinearMemoryInspectorPane.instance();
  }
});
UI.ContextMenu.registerProvider({
  async loadProvider() {
    const LinearMemoryInspector = await loadLinearMemoryInspectorModule();
    return LinearMemoryInspector.LinearMemoryInspectorController.LinearMemoryInspectorController.instance();
  },
  experiment: void 0,
  contextTypes() {
    return [
      ObjectUI.ObjectPropertiesSection.ObjectPropertyTreeElement
    ];
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [SDK.RemoteObject.LinearMemoryInspectable];
  },
  destination: Common.Revealer.RevealerDestination.MEMORY_INSPECTOR_PANEL,
  async loadRevealer() {
    const LinearMemoryInspector = await loadLinearMemoryInspectorModule();
    return LinearMemoryInspector.LinearMemoryInspectorController.LinearMemoryInspectorController.instance();
  }
});
//# sourceMappingURL=linear_memory_inspector-meta.js.map
