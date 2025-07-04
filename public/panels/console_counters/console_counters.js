var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/console_counters/WarningErrorCounter.js
var WarningErrorCounter_exports = {};
__export(WarningErrorCounter_exports, {
  WarningErrorCounter: () => WarningErrorCounter
});
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as IssuesManager from "./../../models/issues_manager/issues_manager.js";
import * as IconButton from "./../../ui/components/icon_button/icon_button.js";
import * as IssueCounter from "./../../ui/components/issue_counter/issue_counter.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";
var UIStrings = {
  /**
   *@description The console error count in the Warning Error Counter shown in the main toolbar (top-left in DevTools). The error count refers to the number of errors currently present in the JavaScript console.
   */
  sErrors: "{n, plural, =1 {# error} other {# errors}}",
  /**
   *@description The console warning count in the Warning Error Counter shown in the main toolbar (top-left in DevTools). The warning count refers to the number of warnings currently present in the JavaScript console.
   */
  sWarnings: "{n, plural, =1 {# warning} other {# warnings}}",
  /**
   *@description Tooltip shown for a main toolbar button that opens the Console panel
   *@example {2 errors, 1 warning} PH1
   */
  openConsoleToViewS: "Open Console to view {PH1}",
  /**
   *@description Title for the issues count in the Issues Error Counter shown in the main toolbar (top-left in DevTools). The issues count refers to the number of issues in the issues tab.
   */
  openIssuesToView: "{n, plural, =1 {Open Issues to view # issue:} other {Open Issues to view # issues:}}"
};
var str_ = i18n.i18n.registerUIStrings("panels/console_counters/WarningErrorCounter.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var warningErrorCounterInstance;
var WarningErrorCounter = class _WarningErrorCounter {
  toolbarItem;
  consoleCounter;
  issueCounter;
  throttler;
  updatingForTest;
  constructor() {
    _WarningErrorCounter.instanceForTest = this;
    const countersWrapper = document.createElement("div");
    countersWrapper.classList.add("status-buttons");
    this.toolbarItem = new UI.Toolbar.ToolbarItemWithCompactLayout(countersWrapper);
    this.toolbarItem.setVisible(false);
    this.toolbarItem.addEventListener("CompactLayoutUpdated", this.onSetCompactLayout, this);
    this.consoleCounter = new IconButton.IconButton.IconButton();
    this.consoleCounter.setAttribute("jslog", `${VisualLogging.counter("console").track({ click: true })}`);
    countersWrapper.appendChild(this.consoleCounter);
    this.consoleCounter.data = {
      clickHandler: Common.Console.Console.instance().show.bind(Common.Console.Console.instance()),
      groups: [
        { iconName: "cross-circle-filled", iconColor: "var(--icon-error)", iconHeight: "14px", iconWidth: "14px" },
        { iconName: "warning-filled", iconColor: "var(--icon-warning)", iconHeight: "14px", iconWidth: "14px" }
      ]
    };
    const issuesManager = IssuesManager.IssuesManager.IssuesManager.instance();
    this.issueCounter = new IssueCounter.IssueCounter.IssueCounter();
    this.issueCounter.classList.add("main-toolbar");
    this.issueCounter.setAttribute("jslog", `${VisualLogging.counter("issue").track({ click: true })}`);
    countersWrapper.appendChild(this.issueCounter);
    this.issueCounter.data = {
      clickHandler: () => {
        Host.userMetrics.issuesPanelOpenedFrom(
          2
          /* Host.UserMetrics.IssueOpener.STATUS_BAR_ISSUES_COUNTER */
        );
        void UI.ViewManager.ViewManager.instance().showView("issues-pane");
      },
      issuesManager,
      displayMode: "OnlyMostImportant"
    };
    this.throttler = new Common.Throttler.Throttler(100);
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ConsoleModel.ConsoleModel, SDK.ConsoleModel.Events.ConsoleCleared, this.update, this);
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ConsoleModel.ConsoleModel, SDK.ConsoleModel.Events.MessageAdded, this.update, this);
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ConsoleModel.ConsoleModel, SDK.ConsoleModel.Events.MessageUpdated, this.update, this);
    issuesManager.addEventListener("IssuesCountUpdated", this.update, this);
    this.update();
  }
  onSetCompactLayout(event) {
    this.setCompactLayout(event.data);
  }
  setCompactLayout(enable) {
    this.consoleCounter.data = { ...this.consoleCounter.data, compact: enable };
    this.issueCounter.data = { ...this.issueCounter.data, compact: enable };
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!warningErrorCounterInstance || forceNew) {
      warningErrorCounterInstance = new _WarningErrorCounter();
    }
    return warningErrorCounterInstance;
  }
  updatedForTest() {
  }
  update() {
    this.updatingForTest = true;
    void this.throttler.schedule(this.updateThrottled.bind(this));
  }
  get titlesForTesting() {
    const button = this.consoleCounter.shadowRoot?.querySelector("button");
    return button ? button.getAttribute("aria-label") : null;
  }
  async updateThrottled() {
    const errors = SDK.ConsoleModel.ConsoleModel.allErrors();
    const warnings = SDK.ConsoleModel.ConsoleModel.allWarnings();
    const issuesManager = IssuesManager.IssuesManager.IssuesManager.instance();
    const issues = issuesManager.numberOfIssues();
    const countToText = (c) => c === 0 ? void 0 : `${c}`;
    const errorCountTitle = i18nString(UIStrings.sErrors, { n: errors });
    const warningCountTitle = i18nString(UIStrings.sWarnings, { n: warnings });
    const newConsoleTexts = [countToText(errors), countToText(warnings)];
    let consoleSummary = "";
    if (errors && warnings) {
      consoleSummary = `${errorCountTitle}, ${warningCountTitle}`;
    } else if (errors) {
      consoleSummary = errorCountTitle;
    } else if (warnings) {
      consoleSummary = warningCountTitle;
    }
    const consoleTitle = i18nString(UIStrings.openConsoleToViewS, { PH1: consoleSummary });
    const previousData = this.consoleCounter.data;
    this.consoleCounter.data = {
      ...previousData,
      groups: previousData.groups.map((g, i) => ({ ...g, text: newConsoleTexts[i] })),
      accessibleName: consoleTitle
    };
    UI.Tooltip.Tooltip.install(this.consoleCounter, consoleTitle);
    this.consoleCounter.classList.toggle("hidden", !(errors || warnings));
    const issueEnumeration = IssueCounter.IssueCounter.getIssueCountsEnumeration(issuesManager);
    const issuesTitleLead = i18nString(UIStrings.openIssuesToView, { n: issues });
    const issuesTitle = `${issuesTitleLead} ${issueEnumeration}`;
    UI.Tooltip.Tooltip.install(this.issueCounter, issuesTitle);
    this.issueCounter.data = {
      ...this.issueCounter.data,
      accessibleName: issuesTitle
    };
    this.issueCounter.classList.toggle("hidden", !issues);
    this.toolbarItem.setVisible(Boolean(errors || warnings || issues));
    UI.InspectorView.InspectorView.instance().toolbarItemResized();
    this.updatingForTest = false;
    this.updatedForTest();
    return;
  }
  item() {
    return this.toolbarItem;
  }
  static instanceForTest = null;
};
export {
  WarningErrorCounter_exports as WarningErrorCounter
};
//# sourceMappingURL=console_counters.js.map
