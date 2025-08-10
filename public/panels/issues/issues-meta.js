// gen/front_end/panels/issues/issues-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as IssuesManager from "./../../models/issues_manager/issues_manager.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Label for the issues pane
   */
  issues: "Issues",
  /**
   * @description Command for showing the 'Issues' tool
   */
  showIssues: "Show Issues"
};
var str_ = i18n.i18n.registerUIStrings("panels/issues/issues-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedIssuesModule;
async function loadIssuesModule() {
  if (!loadedIssuesModule) {
    loadedIssuesModule = await import("./issues.js");
  }
  return loadedIssuesModule;
}
UI.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "issues-pane",
  title: i18nLazyString(UIStrings.issues),
  commandPrompt: i18nLazyString(UIStrings.showIssues),
  order: 100,
  persistence: "closeable",
  async loadView() {
    const Issues = await loadIssuesModule();
    return new Issues.IssuesPane.IssuesPane();
  }
});
Common.Revealer.registerRevealer({
  contextTypes() {
    return [
      IssuesManager.Issue.Issue
    ];
  },
  destination: Common.Revealer.RevealerDestination.ISSUES_VIEW,
  async loadRevealer() {
    const Issues = await loadIssuesModule();
    return new Issues.IssueRevealer.IssueRevealer();
  }
});
//# sourceMappingURL=issues-meta.js.map
