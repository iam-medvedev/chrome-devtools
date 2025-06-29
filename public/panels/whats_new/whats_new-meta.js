// gen/front_end/panels/whats_new/whats_new-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Title of the 'What's New' tool in the bottom drawer
   */
  whatsNew: "What's new",
  /**
   *@description Command for showing the 'What's New' tool in the bottom drawer
   */
  showWhatsNew: "Show what's new",
  /**
   *@description Title of an action in the 'What's New' tool to release notes
   */
  releaseNotes: "Release notes",
  /**
   *@description Title of an action in the 'What's New' tool to file an issue
   */
  reportADevtoolsIssue: "Report a DevTools issue",
  /**
   *@description A search term referring to a software defect (i.e. bug) that can be entered in the command menu
   */
  bug: "bug",
  /**
   *@description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  showWhatsNewAfterEachUpdate: "Show what's new after each update",
  /**
   *@description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  doNotShowWhatsNewAfterEachUpdate: "Don't show what's new after each update"
};
var str_ = i18n.i18n.registerUIStrings("panels/whats_new/whats_new-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedHelpModule;
async function loadWhatsNewModule() {
  if (!loadedHelpModule) {
    loadedHelpModule = await import("./whats_new.js");
  }
  return loadedHelpModule;
}
UI.ViewManager.maybeRemoveViewExtension("release-note");
UI.ActionRegistration.maybeRemoveActionExtension("help.release-notes");
UI.ActionRegistration.maybeRemoveActionExtension("help.report-issue");
Common.Settings.maybeRemoveSettingExtension("help.show-release-note");
UI.ContextMenu.maybeRemoveItem({
  location: "mainMenuHelp/default",
  actionId: "help.release-notes",
  order: void 0
});
UI.ContextMenu.maybeRemoveItem({
  location: "mainMenuHelp/default",
  actionId: "help.report-issue",
  order: void 0
});
Common.Runnable.maybeRemoveLateInitializationRunnable("whats-new");
UI.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "release-note",
  title: i18nLazyString(UIStrings.whatsNew),
  commandPrompt: i18nLazyString(UIStrings.showWhatsNew),
  persistence: "closeable",
  order: 1,
  async loadView() {
    const WhatsNew = await loadWhatsNewModule();
    return new WhatsNew.ReleaseNoteView.ReleaseNoteView();
  }
});
UI.ActionRegistration.registerActionExtension({
  category: "HELP",
  actionId: "help.release-notes",
  title: i18nLazyString(UIStrings.releaseNotes),
  async loadActionDelegate() {
    const WhatsNew = await loadWhatsNewModule();
    return WhatsNew.WhatsNew.ReleaseNotesActionDelegate.instance();
  }
});
UI.ActionRegistration.registerActionExtension({
  category: "HELP",
  actionId: "help.report-issue",
  title: i18nLazyString(UIStrings.reportADevtoolsIssue),
  async loadActionDelegate() {
    const WhatsNew = await loadWhatsNewModule();
    return WhatsNew.WhatsNew.ReportIssueActionDelegate.instance();
  },
  tags: [i18nLazyString(UIStrings.bug)]
});
Common.Settings.registerSettingExtension({
  category: "APPEARANCE",
  title: i18nLazyString(UIStrings.showWhatsNewAfterEachUpdate),
  settingName: "help.show-release-note",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showWhatsNewAfterEachUpdate)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.doNotShowWhatsNewAfterEachUpdate)
    }
  ]
});
UI.ContextMenu.registerItem({
  location: "mainMenuHelp/default",
  actionId: "help.release-notes",
  order: 10
});
UI.ContextMenu.registerItem({
  location: "mainMenuHelp/default",
  actionId: "help.report-issue",
  order: 11
});
Common.Runnable.registerLateInitializationRunnable({
  id: "whats-new",
  async loadRunnable() {
    const WhatsNew = await loadWhatsNewModule();
    return WhatsNew.WhatsNew.HelpLateInitialization.instance();
  }
});
//# sourceMappingURL=whats_new-meta.js.map
