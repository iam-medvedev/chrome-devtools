// ../../front_end/panels/application/application-meta.ts
import * as Common from "../../core/common/common.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as SDK from "../../core/sdk/sdk.js";
import * as UI from "../../ui/legacy/legacy.js";
import * as PreloadingHelper from "./preloading/helper/helper.js";
var UIStrings = {
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  application: "Application",
  /**
   * @description Command for showing the 'Application' tool
   */
  showApplication: "Show Application",
  /**
   * @description A tag of Application Panel that can be searched in the command menu
   */
  pwa: "pwa",
  /**
   * @description Text of button in Clear Storage View of the Application panel
   */
  clearSiteData: "Clear site data",
  /**
   * @description Title of an action that clears all site data including 3rd party cookies
   */
  clearSiteDataIncludingThirdparty: "Clear site data (including third-party cookies)",
  /**
   * @description Title of an action under the Background Services category that can be invoked through the Command Menu
   */
  startRecordingEvents: "Start recording events",
  /**
   * @description Title of an action under the Background Services category that can be invoked through the Command Menu
   */
  stopRecordingEvents: "Stop recording events"
};
var str_ = i18n.i18n.registerUIStrings("panels/application/application-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedResourcesModule;
async function loadResourcesModule() {
  if (!loadedResourcesModule) {
    loadedResourcesModule = await import("./application.js");
  }
  return loadedResourcesModule;
}
function maybeRetrieveContextTypes(getClassCallBack) {
  if (loadedResourcesModule === void 0) {
    return [];
  }
  return getClassCallBack(loadedResourcesModule);
}
UI.ViewManager.registerViewExtension({
  location: UI.ViewManager.ViewLocationValues.PANEL,
  id: "resources",
  title: i18nLazyString(UIStrings.application),
  commandPrompt: i18nLazyString(UIStrings.showApplication),
  order: 70,
  async loadView() {
    const Resources = await loadResourcesModule();
    return Resources.ResourcesPanel.ResourcesPanel.instance();
  },
  tags: [i18nLazyString(UIStrings.pwa)]
});
UI.ActionRegistration.registerActionExtension({
  category: UI.ActionRegistration.ActionCategory.RESOURCES,
  actionId: "resources.clear",
  title: i18nLazyString(UIStrings.clearSiteData),
  async loadActionDelegate() {
    const Resources = await loadResourcesModule();
    return new Resources.StorageView.ActionDelegate();
  }
});
UI.ActionRegistration.registerActionExtension({
  category: UI.ActionRegistration.ActionCategory.RESOURCES,
  actionId: "resources.clear-incl-third-party-cookies",
  title: i18nLazyString(UIStrings.clearSiteDataIncludingThirdparty),
  async loadActionDelegate() {
    const Resources = await loadResourcesModule();
    return new Resources.StorageView.ActionDelegate();
  }
});
UI.ActionRegistration.registerActionExtension({
  actionId: "background-service.toggle-recording",
  iconClass: UI.ActionRegistration.IconClass.START_RECORDING,
  toggleable: true,
  toggledIconClass: UI.ActionRegistration.IconClass.STOP_RECORDING,
  toggleWithRedColor: true,
  contextTypes() {
    return maybeRetrieveContextTypes((Resources) => [Resources.BackgroundServiceView.BackgroundServiceView]);
  },
  async loadActionDelegate() {
    const Resources = await loadResourcesModule();
    return new Resources.BackgroundServiceView.ActionDelegate();
  },
  category: UI.ActionRegistration.ActionCategory.BACKGROUND_SERVICES,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.startRecordingEvents)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.stopRecordingEvents)
    }
  ],
  bindings: [
    {
      platform: UI.ActionRegistration.Platforms.WINDOWS_LINUX,
      shortcut: "Ctrl+E"
    },
    {
      platform: UI.ActionRegistration.Platforms.MAC,
      shortcut: "Meta+E"
    }
  ]
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK.Resource.Resource
    ];
  },
  destination: Common.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.ResourceRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [
      SDK.ResourceTreeModel.ResourceTreeFrame
    ];
  },
  destination: Common.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.FrameDetailsRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [PreloadingHelper.PreloadingForward.RuleSetView];
  },
  destination: Common.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.RuleSetViewRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [PreloadingHelper.PreloadingForward.AttemptViewWithFilter];
  },
  destination: Common.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.AttemptViewWithFilterRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes((Resources) => [Resources.Components.StorageMetadataView.StorageBucketRevealInfo]);
  },
  destination: Common.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.ResourcesPanel.StorageBucketRevealer();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return maybeRetrieveContextTypes((Resources) => [Resources.StorageView.StorageRevealable]);
  },
  destination: Common.Revealer.RevealerDestination.APPLICATION_PANEL,
  async loadRevealer() {
    const Resources = await loadResourcesModule();
    return new Resources.StorageView.StorageRevealer();
  }
});
//# sourceMappingURL=application-meta.js.map
