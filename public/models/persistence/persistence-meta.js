// gen/front_end/models/persistence/persistence-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Workspace from "./../workspace/workspace.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Text of a DOM element in Workspace Settings Tab of the Workspace settings in Settings
   */
  workspace: "Workspace",
  /**
   *@description Command for showing the Workspace tool in Settings
   */
  showWorkspace: "Show Workspace settings",
  /**
   *@description Title of a setting under the Persistence category in Settings
   */
  enableLocalOverrides: "Enable Local Overrides",
  /**
   *@description A tag of Enable Local Overrides setting that can be searched in the command menu
   */
  interception: "interception",
  /**
   *@description A tag of Enable Local Overrides setting that can be searched in the command menu
   */
  override: "override",
  /**
   *@description A tag of Group Network by frame setting that can be searched in the command menu
   */
  network: "network",
  /**
   *@description A tag of Enable Local Overrides setting that can be searched in the command menu
   */
  rewrite: "rewrite",
  /**
   *@description A tag of Enable Local Overrides setting that can be searched in the command menu.
   *Noun for network request.
   */
  request: "request",
  /**
   *@description Title of a setting under the Persistence category that can be invoked through the Command Menu
   */
  enableOverrideNetworkRequests: "Enable override network requests",
  /**
   *@description Title of a setting under the Persistence category that can be invoked through the Command Menu
   */
  disableOverrideNetworkRequests: "Disable override network requests"
};
var str_ = i18n.i18n.registerUIStrings("models/persistence/persistence-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedPersistenceModule;
async function loadPersistenceModule() {
  if (!loadedPersistenceModule) {
    loadedPersistenceModule = await import("./persistence.js");
  }
  return loadedPersistenceModule;
}
UI.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "workspace",
  title: i18nLazyString(UIStrings.workspace),
  commandPrompt: i18nLazyString(UIStrings.showWorkspace),
  order: 1,
  async loadView() {
    const Persistence = await loadPersistenceModule();
    return new Persistence.WorkspaceSettingsTab.WorkspaceSettingsTab();
  },
  iconName: "folder"
});
Common.Settings.registerSettingExtension({
  category: "PERSISTENCE",
  title: i18nLazyString(UIStrings.enableLocalOverrides),
  settingName: "persistence-network-overrides-enabled",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString(UIStrings.interception),
    i18nLazyString(UIStrings.override),
    i18nLazyString(UIStrings.network),
    i18nLazyString(UIStrings.rewrite),
    i18nLazyString(UIStrings.request)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.enableOverrideNetworkRequests)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.disableOverrideNetworkRequests)
    }
  ]
});
UI.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Workspace.UISourceCode.UISourceCode,
      SDK.Resource.Resource,
      SDK.NetworkRequest.NetworkRequest
    ];
  },
  async loadProvider() {
    const Persistence = await loadPersistenceModule();
    return new Persistence.PersistenceActions.ContextMenuProvider();
  },
  experiment: void 0
});
//# sourceMappingURL=persistence-meta.js.map
