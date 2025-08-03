var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/issues/IssueAggregator.js
var IssueAggregator_exports = {};
__export(IssueAggregator_exports, {
  AggregatedIssue: () => AggregatedIssue,
  IssueAggregator: () => IssueAggregator
});
import * as Common from "./../../core/common/common.js";
import * as IssuesManager from "./../../models/issues_manager/issues_manager.js";
var AggregatedIssue = class extends IssuesManager.Issue.Issue {
  #affectedCookies = /* @__PURE__ */ new Map();
  #affectedRawCookieLines = /* @__PURE__ */ new Map();
  #affectedRequests = [];
  #affectedRequestIds = /* @__PURE__ */ new Set();
  #affectedLocations = /* @__PURE__ */ new Map();
  #heavyAdIssues = /* @__PURE__ */ new Set();
  #blockedByResponseDetails = /* @__PURE__ */ new Map();
  #bounceTrackingSites = /* @__PURE__ */ new Set();
  #corsIssues = /* @__PURE__ */ new Set();
  #cspIssues = /* @__PURE__ */ new Set();
  #deprecationIssues = /* @__PURE__ */ new Set();
  #issueKind = "Improvement";
  #lowContrastIssues = /* @__PURE__ */ new Set();
  #cookieDeprecationMetadataIssues = /* @__PURE__ */ new Set();
  #mixedContentIssues = /* @__PURE__ */ new Set();
  #partitioningBlobURLIssues = /* @__PURE__ */ new Set();
  #sharedArrayBufferIssues = /* @__PURE__ */ new Set();
  #quirksModeIssues = /* @__PURE__ */ new Set();
  #attributionReportingIssues = /* @__PURE__ */ new Set();
  #genericIssues = /* @__PURE__ */ new Set();
  #elementAccessibilityIssues = /* @__PURE__ */ new Set();
  #representative;
  #aggregatedIssuesCount = 0;
  #key;
  constructor(code, aggregationKey) {
    super(code);
    this.#key = aggregationKey;
  }
  primaryKey() {
    throw new Error("This should never be called");
  }
  aggregationKey() {
    return this.#key;
  }
  getBlockedByResponseDetails() {
    return this.#blockedByResponseDetails.values();
  }
  cookies() {
    return Array.from(this.#affectedCookies.values()).map((x) => x.cookie);
  }
  getRawCookieLines() {
    return this.#affectedRawCookieLines.values();
  }
  sources() {
    return this.#affectedLocations.values();
  }
  getBounceTrackingSites() {
    return this.#bounceTrackingSites.values();
  }
  cookiesWithRequestIndicator() {
    return this.#affectedCookies.values();
  }
  getHeavyAdIssues() {
    return this.#heavyAdIssues;
  }
  getCookieDeprecationMetadataIssues() {
    return this.#cookieDeprecationMetadataIssues;
  }
  getMixedContentIssues() {
    return this.#mixedContentIssues;
  }
  getCorsIssues() {
    return this.#corsIssues;
  }
  getCspIssues() {
    return this.#cspIssues;
  }
  getDeprecationIssues() {
    return this.#deprecationIssues;
  }
  getLowContrastIssues() {
    return this.#lowContrastIssues;
  }
  requests() {
    return this.#affectedRequests.values();
  }
  getSharedArrayBufferIssues() {
    return this.#sharedArrayBufferIssues;
  }
  getQuirksModeIssues() {
    return this.#quirksModeIssues;
  }
  getAttributionReportingIssues() {
    return this.#attributionReportingIssues;
  }
  getGenericIssues() {
    return this.#genericIssues;
  }
  getElementAccessibilityIssues() {
    return this.#elementAccessibilityIssues;
  }
  getDescription() {
    if (this.#representative) {
      return this.#representative.getDescription();
    }
    return null;
  }
  getCategory() {
    if (this.#representative) {
      return this.#representative.getCategory();
    }
    return "Other";
  }
  getAggregatedIssuesCount() {
    return this.#aggregatedIssuesCount;
  }
  getPartitioningBlobURLIssues() {
    return this.#partitioningBlobURLIssues;
  }
  /**
   * Produces a primary key for a cookie. Use this instead of `JSON.stringify` in
   * case new fields are added to `AffectedCookie`.
   */
  #keyForCookie(cookie) {
    const { domain, path, name } = cookie;
    return `${domain};${path};${name}`;
  }
  addInstance(issue) {
    this.#aggregatedIssuesCount++;
    if (!this.#representative) {
      this.#representative = issue;
    }
    this.#issueKind = IssuesManager.Issue.unionIssueKind(this.#issueKind, issue.getKind());
    let hasRequest = false;
    for (const request of issue.requests()) {
      const { requestId } = request;
      hasRequest = true;
      if (requestId === void 0) {
        this.#affectedRequests.push(request);
      } else if (!this.#affectedRequestIds.has(requestId)) {
        this.#affectedRequests.push(request);
        this.#affectedRequestIds.add(requestId);
      }
    }
    for (const cookie of issue.cookies()) {
      const key = this.#keyForCookie(cookie);
      if (!this.#affectedCookies.has(key)) {
        this.#affectedCookies.set(key, { cookie, hasRequest });
      }
    }
    for (const rawCookieLine of issue.rawCookieLines()) {
      if (!this.#affectedRawCookieLines.has(rawCookieLine)) {
        this.#affectedRawCookieLines.set(rawCookieLine, { rawCookieLine, hasRequest });
      }
    }
    for (const site of issue.trackingSites()) {
      if (!this.#bounceTrackingSites.has(site)) {
        this.#bounceTrackingSites.add(site);
      }
    }
    for (const location of issue.sources()) {
      const key = JSON.stringify(location);
      if (!this.#affectedLocations.has(key)) {
        this.#affectedLocations.set(key, location);
      }
    }
    if (issue instanceof IssuesManager.CookieDeprecationMetadataIssue.CookieDeprecationMetadataIssue) {
      this.#cookieDeprecationMetadataIssues.add(issue);
    }
    if (issue instanceof IssuesManager.MixedContentIssue.MixedContentIssue) {
      this.#mixedContentIssues.add(issue);
    }
    if (issue instanceof IssuesManager.HeavyAdIssue.HeavyAdIssue) {
      this.#heavyAdIssues.add(issue);
    }
    for (const details of issue.getBlockedByResponseDetails()) {
      const key = JSON.stringify(details, ["parentFrame", "blockedFrame", "requestId", "frameId", "reason", "request"]);
      this.#blockedByResponseDetails.set(key, details);
    }
    if (issue instanceof IssuesManager.ContentSecurityPolicyIssue.ContentSecurityPolicyIssue) {
      this.#cspIssues.add(issue);
    }
    if (issue instanceof IssuesManager.DeprecationIssue.DeprecationIssue) {
      this.#deprecationIssues.add(issue);
    }
    if (issue instanceof IssuesManager.SharedArrayBufferIssue.SharedArrayBufferIssue) {
      this.#sharedArrayBufferIssues.add(issue);
    }
    if (issue instanceof IssuesManager.LowTextContrastIssue.LowTextContrastIssue) {
      this.#lowContrastIssues.add(issue);
    }
    if (issue instanceof IssuesManager.CorsIssue.CorsIssue) {
      this.#corsIssues.add(issue);
    }
    if (issue instanceof IssuesManager.QuirksModeIssue.QuirksModeIssue) {
      this.#quirksModeIssues.add(issue);
    }
    if (issue instanceof IssuesManager.AttributionReportingIssue.AttributionReportingIssue) {
      this.#attributionReportingIssues.add(issue);
    }
    if (issue instanceof IssuesManager.GenericIssue.GenericIssue) {
      this.#genericIssues.add(issue);
    }
    if (issue instanceof IssuesManager.ElementAccessibilityIssue.ElementAccessibilityIssue) {
      this.#elementAccessibilityIssues.add(issue);
    }
    if (issue instanceof IssuesManager.PartitioningBlobURLIssue.PartitioningBlobURLIssue) {
      this.#partitioningBlobURLIssues.add(issue);
    }
  }
  getKind() {
    return this.#issueKind;
  }
  isHidden() {
    return this.#representative?.isHidden() || false;
  }
  setHidden(_value) {
    throw new Error("Should not call setHidden on aggregatedIssue");
  }
};
var IssueAggregator = class extends Common.ObjectWrapper.ObjectWrapper {
  issuesManager;
  #aggregatedIssuesByKey = /* @__PURE__ */ new Map();
  #hiddenAggregatedIssuesByKey = /* @__PURE__ */ new Map();
  constructor(issuesManager) {
    super();
    this.issuesManager = issuesManager;
    this.issuesManager.addEventListener("IssueAdded", this.#onIssueAdded, this);
    this.issuesManager.addEventListener("FullUpdateRequired", this.#onFullUpdateRequired, this);
    for (const issue of this.issuesManager.issues()) {
      this.#aggregateIssue(issue);
    }
  }
  #onIssueAdded(event) {
    this.#aggregateIssue(event.data.issue);
  }
  #onFullUpdateRequired() {
    this.#aggregatedIssuesByKey.clear();
    this.#hiddenAggregatedIssuesByKey.clear();
    for (const issue of this.issuesManager.issues()) {
      this.#aggregateIssue(issue);
    }
    this.dispatchEventToListeners(
      "FullUpdateRequired"
      /* Events.FULL_UPDATE_REQUIRED */
    );
  }
  #aggregateIssue(issue) {
    if (IssuesManager.CookieIssue.CookieIssue.isThirdPartyCookiePhaseoutRelatedIssue(issue)) {
      return;
    }
    const map = issue.isHidden() ? this.#hiddenAggregatedIssuesByKey : this.#aggregatedIssuesByKey;
    const aggregatedIssue = this.#aggregateIssueByStatus(map, issue);
    this.dispatchEventToListeners("AggregatedIssueUpdated", aggregatedIssue);
    return aggregatedIssue;
  }
  #aggregateIssueByStatus(aggregatedIssuesMap, issue) {
    const key = issue.code();
    let aggregatedIssue = aggregatedIssuesMap.get(key);
    if (!aggregatedIssue) {
      aggregatedIssue = new AggregatedIssue(issue.code(), key);
      aggregatedIssuesMap.set(key, aggregatedIssue);
    }
    aggregatedIssue.addInstance(issue);
    return aggregatedIssue;
  }
  aggregatedIssues() {
    return [...this.#aggregatedIssuesByKey.values(), ...this.#hiddenAggregatedIssuesByKey.values()];
  }
  aggregatedIssueCodes() {
    return /* @__PURE__ */ new Set([...this.#aggregatedIssuesByKey.keys(), ...this.#hiddenAggregatedIssuesByKey.keys()]);
  }
  aggregatedIssueCategories() {
    const result = /* @__PURE__ */ new Set();
    for (const issue of this.#aggregatedIssuesByKey.values()) {
      result.add(issue.getCategory());
    }
    return result;
  }
  aggregatedIssueKinds() {
    const result = /* @__PURE__ */ new Set();
    for (const issue of this.#aggregatedIssuesByKey.values()) {
      result.add(issue.getKind());
    }
    return result;
  }
  numberOfAggregatedIssues() {
    return this.#aggregatedIssuesByKey.size;
  }
  numberOfHiddenAggregatedIssues() {
    return this.#hiddenAggregatedIssuesByKey.size;
  }
  keyForIssue(issue) {
    return issue.code();
  }
};

// gen/front_end/panels/issues/IssueRevealer.js
var IssueRevealer_exports = {};
__export(IssueRevealer_exports, {
  IssueRevealer: () => IssueRevealer
});
import * as UI7 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/issues/IssuesPane.js
var IssuesPane_exports = {};
__export(IssuesPane_exports, {
  IssuesPane: () => IssuesPane,
  getGroupIssuesByCategorySetting: () => getGroupIssuesByCategorySetting
});
import "./../../ui/legacy/legacy.js";
import * as Common7 from "./../../core/common/common.js";
import * as i18n41 from "./../../core/i18n/i18n.js";
import * as IssuesManager13 from "./../../models/issues_manager/issues_manager.js";
import * as IssueCounter5 from "./../../ui/components/issue_counter/issue_counter.js";
import * as UI6 from "./../../ui/legacy/legacy.js";
import * as VisualLogging6 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/issues/HiddenIssuesRow.js
import "./../../ui/components/adorners/adorners.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as IssuesManager2 from "./../../models/issues_manager/issues_manager.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI from "./../../ui/legacy/legacy.js";
import { html, render } from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";
var UIStrings = {
  /**
   * @description Title for the hidden issues row
   */
  hiddenIssues: "Hidden issues",
  /**
   * @description Label for the button to unhide all hidden issues
   */
  unhideAll: "Unhide all"
};
var str_ = i18n.i18n.registerUIStrings("panels/issues/HiddenIssuesRow.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var DEFAULT_VIEW = (input, _output, target) => {
  const stopPropagationForEnter = (event) => {
    if (event.key === "Enter") {
      event.stopImmediatePropagation();
    }
  };
  render(html`
  <div class="header">
    <devtools-adorner class="aggregated-issues-count"
                      .data=${{ name: "countWrapper" }}>
      <span>${input.count}</span>
    </devtools-adorner>
    <div class="title">${i18nString(UIStrings.hiddenIssues)}</div>
    <devtools-button class="unhide-all-issues-button"
                     jslog=${VisualLogging.action().track({ click: true }).context("issues.unhide-all-hiddes")}
                     @click=${input.onUnhideAllIssues}
                     @keydown=${stopPropagationForEnter}
                     .variant=${"outlined"}>${i18nString(UIStrings.unhideAll)}</devtools-button>
  </div>`, target, { host: input });
};
var HiddenIssuesRow = class extends UI.TreeOutline.TreeElement {
  #view;
  constructor(view = DEFAULT_VIEW) {
    super(void 0, true);
    this.#view = view;
    this.toggleOnClick = true;
    this.listItemElement.classList.add("issue-category", "hidden-issues");
    this.childrenListElement.classList.add("hidden-issues-body");
    this.update(0);
  }
  update(count) {
    const issuesManager = IssuesManager2.IssuesManager.IssuesManager.instance();
    const onUnhideAllIssues = issuesManager.unhideAllIssues.bind(issuesManager);
    const input = {
      count,
      onUnhideAllIssues
    };
    const output = void 0;
    this.#view(input, output, this.listItemElement);
  }
};

// gen/front_end/panels/issues/IssueKindView.js
import * as Common2 from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as IssuesManager4 from "./../../models/issues_manager/issues_manager.js";
import * as Adorners from "./../../ui/components/adorners/adorners.js";
import * as IconButton from "./../../ui/components/icon_button/icon_button.js";
import * as IssueCounter from "./../../ui/components/issue_counter/issue_counter.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as Components from "./components/components.js";
var UIStrings2 = {
  /**
   * @description Menu entry for hiding all current Page Errors.
   */
  hideAllCurrentPageErrors: "Hide all current Page Errors",
  /**
   * @description Menu entry for hiding all current Breaking Changes.
   */
  hideAllCurrentBreakingChanges: "Hide all current Breaking Changes",
  /**
   * @description Menu entry for hiding all current Page Errors.
   */
  hideAllCurrentImprovements: "Hide all current Improvements"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/issues/IssueKindView.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
function getGroupIssuesByKindSetting() {
  return Common2.Settings.Settings.instance().createSetting("group-issues-by-kind", false);
}
function issueKindViewSortPriority(a, b) {
  if (a.getKind() === b.getKind()) {
    return 0;
  }
  if (a.getKind() === "PageError") {
    return -1;
  }
  if (a.getKind() === "BreakingChange" && b.getKind() === "Improvement") {
    return -1;
  }
  return 1;
}
function getClassNameFromKind(kind) {
  switch (kind) {
    case "BreakingChange":
      return "breaking-changes";
    case "Improvement":
      return "improvements";
    case "PageError":
      return "page-errors";
  }
}
var IssueKindView = class extends UI2.TreeOutline.TreeElement {
  #kind;
  #issueCount;
  constructor(kind) {
    super(void 0, true);
    this.#kind = kind;
    this.#issueCount = document.createElement("span");
    this.toggleOnClick = true;
    this.listItemElement.classList.add("issue-kind");
    this.listItemElement.classList.add(getClassNameFromKind(kind));
    this.childrenListElement.classList.add("issue-kind-body");
  }
  getKind() {
    return this.#kind;
  }
  getHideAllCurrentKindString() {
    switch (this.#kind) {
      case "PageError":
        return i18nString2(UIStrings2.hideAllCurrentPageErrors);
      case "Improvement":
        return i18nString2(UIStrings2.hideAllCurrentImprovements);
      case "BreakingChange":
        return i18nString2(UIStrings2.hideAllCurrentBreakingChanges);
    }
  }
  #appendHeader() {
    const header = document.createElement("div");
    header.classList.add("header");
    const issueKindIcon = new IconButton.Icon.Icon();
    issueKindIcon.data = IssueCounter.IssueCounter.getIssueKindIconData(this.#kind);
    issueKindIcon.classList.add("leading-issue-icon");
    const countAdorner = new Adorners.Adorner.Adorner();
    countAdorner.data = {
      name: "countWrapper",
      content: this.#issueCount
    };
    countAdorner.classList.add("aggregated-issues-count");
    this.#issueCount.textContent = "0";
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = IssuesManager4.Issue.getIssueKindName(this.#kind);
    const hideAvailableIssuesBtn = new Components.HideIssuesMenu.HideIssuesMenu();
    hideAvailableIssuesBtn.classList.add("hide-available-issues");
    hideAvailableIssuesBtn.data = {
      menuItemLabel: this.getHideAllCurrentKindString(),
      menuItemAction: () => {
        const setting = IssuesManager4.IssuesManager.getHideIssueByCodeSetting();
        const values = setting.get();
        for (const issue of IssuesManager4.IssuesManager.IssuesManager.instance().issues()) {
          if (issue.getKind() === this.#kind) {
            values[issue.code()] = "Hidden";
          }
        }
        setting.set(values);
      }
    };
    header.appendChild(issueKindIcon);
    header.appendChild(countAdorner);
    header.appendChild(title);
    header.appendChild(hideAvailableIssuesBtn);
    this.listItemElement.appendChild(header);
  }
  onattach() {
    this.#appendHeader();
    this.expand();
  }
  update(count) {
    this.#issueCount.textContent = `${count}`;
  }
};

// gen/front_end/panels/issues/issuesPane.css.js
var issuesPane_css_default = `/*
 * Copyright (c) 2020 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.issues-pane {
  overflow: hidden;
}

.issues-toolbar-container {
  display: flex;
  flex: none;
}

.issues-toolbar-container > devtools-toolbar {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
}

.issues-toolbar-left {
  flex: 1 1 auto;
}

.issues-toolbar-right {
  padding-right: 6px;
}

/*# sourceURL=${import.meta.resolve("./issuesPane.css")} */`;

// gen/front_end/panels/issues/issuesTree.css.js
var issuesTree_css_default = `/*
 * Copyright (c) 2020 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

/* Remove container padding from TreeOutline.
 * Allows issues to touch the edges of the container. */
:host,
.issues {
  padding: 0;
  overflow: auto;
}

.issues {
  --issue-indent: 8px;
}

/* The top most parents need to be larger, as they may include an unhide button. */
.tree-outline.issues > li {
  min-height: var(--sys-size-13);
}

/* Override whitespace behavior for tree items to allow wrapping */
.issues li {
  white-space: normal;
  align-items: flex-start;
}

/* Hide toggle for tree items which cannot be collapsed */
.issues .always-parent::before {
  display: none;
}

.issues li.parent::before {
  margin-top: 7px;
}

.issues .affected-resources li.parent::before {
  margin-top: 0;
}

.issue-category,
.issue-kind,
.issue {
  padding: 0 8px;
  padding-left: var(--issue-indent);
  overflow: hidden;
  flex: none;
  transition: background-color 200ms;
  border: 1px solid var(--sys-color-divider);
  border-width: 0 0 1px;
}

.issue-category.hidden-issues.parent.expanded,
.issue-kind.parent.expanded {
  border-width: 0 0 1px;
  background-color: var(--sys-color-surface2);
}

.issue-category + .children .issue,
.issue.expanded {
  background: var(--sys-color-cdt-base-container);
}

.issue.expanded {
  border-width: 0;
}

.issue.selected,
.issue.expanded.selected {
  background-color: var(--sys-color-surface2);

  &:focus {
    background-color: var(--sys-color-tonal-container);
  }
}

.tree-outline li:not(.selected):hover .selection {
  background-color: unset;
}

.tree-outline li.issue:not(.expanded, .selected):hover .selection {
  background-color: var(--sys-color-state-hover-on-subtle);
}

.tree-outline li.issue.expanded:not(.selected):hover {
  background-color: var(--sys-color-state-hover-on-subtle);
}

.unhide-all-issues-button {
  margin: 0;
}

p {
  margin-block: 2px;
}

/* Override selected tree item styles for issues to avoid changing width. */
.tree-outline-disclosure:not(.tree-outline-disclosure-hide-overflow) .tree-outline.hide-selection-when-blurred .issue-category.selected:focus-visible,
.tree-outline-disclosure:not(.tree-outline-disclosure-hide-overflow) .tree-outline.hide-selection-when-blurred .issue-kind.selected:focus-visible,
.tree-outline-disclosure:not(.tree-outline-disclosure-hide-overflow) .tree-outline.hide-selection-when-blurred .issue.selected:focus-visible {
  width: auto;
  padding-right: 8px;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 0;
  cursor: pointer;
  width: 100%;

  & > :not(.unhide-all-issues-button) {
    margin-top: var(--sys-size-2);
  }
}

.header devtools-hide-issues-menu {
  visibility: hidden;
}

.header:hover devtools-hide-issues-menu,
.issue.selected devtools-hide-issues-menu {
  visibility: visible;
}

.title {
  flex: 1;
  font-size: 12px;
  color: var(--sys-color-on-surface);
  font-weight: normal;
  user-select: text;
  padding-top: 2px;
}

.issue.expanded .title {
  font-weight: 450;
}

.issue-body.children {
  border-bottom: 1px solid var(--sys-color-divider);
  padding: 6px 0;
  position: relative;
  padding-left: calc(var(--issue-indent) + 43px);
  padding-bottom: 26px;
  padding-right: 8px;
}

.issue-category + .children,
.issue-kind + .children {
  --issue-indent: 24px;

  padding-left: 0;
}

/* Show a colored border on the left side of opened issues. */
.issue-body::before {
  content: "";
  display: block;
  position: absolute;
  left: calc(var(--issue-indent) + 23px);
  top: 0;
  bottom: 20px;
  width: 2px;
}

.issue-kind-breaking-change.issue-body::before {
  border-left: 2px solid var(--issue-color-yellow);
}

.issue-kind-page-error.issue-body::before {
  border-left: 2px solid var(--issue-color-red);
}

.issue-kind-improvement.issue-body::before {
  border-left: 2px solid var(--issue-color-blue);
}

.tree-outline .issue-body li:hover:not(:has(devtools-checkbox)) .selection {
  background-color: unset;
}

devtools-icon.leading-issue-icon {
  margin: 1px 0 -1px 7px;
}

.message {
  line-height: 18px;
  font-size: 12px;
  color: var(--sys-color-token-subtle);
  margin-bottom: 4px;
  user-select: text;
}

.message p {
  margin-bottom: 16px;
}

.message li {
  margin-top: 8px;
}

.message code {
  color: var(--sys-color-on-surface);
  padding: 0 2px;
  font-size: 12px;
  user-select: text;
  cursor: text;
  background: var(--sys-color-surface2);
}

.separator::before {
  content: "\xB7";
  padding-left: 1ex;
  padding-right: 1ex;
}

.link {
  font-size: 12px;
  color: var(--sys-color-primary);
}

.link-wrapper {
  margin-top: 15px;
  user-select: text;
}

.affected-resources-label,
.resolutions-label {
  margin-top: 5px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sys-color-on-surface);
  display: inline-block;
}

.link-list {
  list-style-type: none;
  list-style-position: inside;
  padding-inline-start: 0;
}

.resolutions-list {
  list-style-type: none;
  list-style-position: inside;
  padding-inline-start: 0;
}

/* We inherit all the styles from treeoutline, but these are simple text <li>, so we override some styles */
.link-list li::before {
  content: none;
  mask-image: none;
}

.resolutions-list li::before {
  content: "\u2192";
  mask-image: none;
  padding-right: 5px;
  position: relative;
  top: -1px;
}

.resolutions-list li {
  display: list-item;
}

ul > li.plain-enum {
  display: list-item;
}

/* This is a hack because the tree view's CSS overrides list styling in a non-compositional way. This
   can be removed once we've moved to proper components. */
ul > li.plain-enum::before {
  content: "";
  padding: 0;
  margin: 0;
  max-width: 0;
}

.affected-resources-label + .affected-resources {
  padding: 3px 0 0;
  position: relative;
  user-select: text;
}

.affected-resource-label {
  font-size: 12px;
  line-height: 18px;
  color: var(--sys-color-on-surface);
  position: relative;
  cursor: pointer;
}

.affected-resource-cookie {
  font-size: 12px;
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
}

.affected-resource-element {
  font-size: 12px;
  line-height: 18px;
  color: var(--sys-color-primary);
  border: 0;
  border-collapse: collapse;
}

.affected-resource-row {
  font-size: 12px;
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
  vertical-align: top;
}

.affected-resource-mixed-content {
  font-size: 12px;
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
}

.affected-resource-heavy-ad {
  font-size: 12px;
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
}

.affected-resource-request {
  font-size: 12px;
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
}

.affected-resource-source {
  font-size: 12px;
  line-height: 18px;
  color: var(--sys-color-primary);
  border: 0;
  border-collapse: collapse;
}

.affected-resource-list {
  border-spacing: 10px 0;
  margin-left: -12px;
}

.affected-resource-header {
  font-size: 12px;
  color: var(--sys-color-on-surface);
  padding-left: 2px;
}

.code-example {
  font-family: var(--monospace-font-family);
  font-size: var(--monospace-font-size);
}

.affected-resource-blocked-status {
  color: var(--issue-color-red);
}

.affected-resource-report-only-status {
  color: var(--issue-color-yellow);
}

.affected-resource-cookie-info {
  color: var(--sys-color-token-subtle);
  padding: 2px;
  text-align: right;
}

.affected-resource-cookie-info-header {
  text-align: right;
}

.affected-resource-mixed-content-info {
  color: var(--sys-color-token-subtle);
  padding: 2px;
}

.affected-resource-heavy-ad-info {
  color: var(--sys-color-token-subtle);
  padding: 2px;
}

.affected-resource-heavy-ad-info-frame {
  display: flex;
  align-items: center;
  color: var(--sys-color-token-subtle);
  padding: 2px;
}

.affected-resource-cell {
  color: var(--sys-color-token-subtle);
  padding: 2px;
}

.affected-resource-cell.link {
  color: var(--sys-color-primary);
}

.affected-resource-cell span.icon {
  margin-right: 0.5ex;
  vertical-align: sub;
}

.affected-resources > .parent {
  margin-top: 0;
  padding: 2px 5px 0;
}

.affected-resources > .parent.expanded {
  background: var(--sys-color-cdt-base-container);
}

.affected-resources > .children.expanded {
  background: var(--sys-color-cdt-base-container);
  padding: 6px 0 9px 5px;
}

.aggregated-issues-count {
  padding: 3px 7px 0;
}

.affected-resource-directive-info-header {
  text-align: left;
}

.affected-resource-directive {
  font-size: 12px;
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
}

.affected-resource-directive-info {
  color: var(--sys-color-token-subtle);
  padding: 2px;
  text-align: left;
}

.devtools-link {
  padding-top: 4px;
}

devtools-icon.link-icon {
  vertical-align: sub;
  margin-right: 0.5ch;
}

devtools-icon.elements-panel,
devtools-icon.network-panel {
  margin-right: 0.5ex;
  vertical-align: baseline;
  height: 14px;
}

@media (forced-colors: active) {
  .title {
    color: ButtonText;
  }

  .tree-outline:not(.hide-selection-when-blurred) .selected .header .title,
  .tree-outline.hide-selection-when-blurred .selected:focus-visible .header .title {
    color: HighlightText;
  }
}

/*# sourceURL=${import.meta.resolve("./issuesTree.css")} */`;

// gen/front_end/panels/issues/IssueView.js
var IssueView_exports = {};
__export(IssueView_exports, {
  IssueView: () => IssueView
});
import * as Common6 from "./../../core/common/common.js";
import * as Host7 from "./../../core/host/host.js";
import * as i18n39 from "./../../core/i18n/i18n.js";
import * as IssuesManager11 from "./../../models/issues_manager/issues_manager.js";
import * as NetworkForward3 from "./../network/forward/forward.js";
import * as Adorners2 from "./../../ui/components/adorners/adorners.js";
import * as IconButton3 from "./../../ui/components/icon_button/icon_button.js";
import * as IssueCounter3 from "./../../ui/components/issue_counter/issue_counter.js";
import * as MarkdownView from "./../../ui/components/markdown_view/markdown_view.js";
import * as UI5 from "./../../ui/legacy/legacy.js";
import * as VisualLogging5 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/issues/AffectedBlockedByResponseView.js
import * as Host2 from "./../../core/host/host.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as IssuesManager6 from "./../../models/issues_manager/issues_manager.js";

// gen/front_end/panels/issues/AffectedResourcesView.js
import * as Common3 from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Logs from "./../../models/logs/logs.js";
import * as IconButton2 from "./../../ui/components/icon_button/icon_button.js";
import * as RequestLinkIcon from "./../../ui/components/request_link_icon/request_link_icon.js";
import * as Components2 from "./../../ui/legacy/components/utils/utils.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";
var UIStrings3 = {
  /**
   *@description Text in Object Properties Section
   */
  unknown: "unknown",
  /**
   *@description Tooltip for button linking to the Elements panel
   */
  clickToRevealTheFramesDomNodeIn: "Click to reveal the frame's DOM node in the Elements panel",
  /**
   *@description Replacement text for a link to an HTML element which is not available (anymore).
   */
  unavailable: "unavailable"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/issues/AffectedResourcesView.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var extractShortPath = (path) => {
  return (/[^/]+$/.exec(path) || /[^/]+\/$/.exec(path) || [""])[0];
};
var AffectedResourcesView = class extends UI3.TreeOutline.TreeElement {
  #parentView;
  issue;
  affectedResourcesCountElement;
  affectedResources;
  #affectedResourcesCount;
  #frameListeners;
  #unresolvedFrameIds;
  requestResolver;
  constructor(parent, issue, jslogContext) {
    super(
      /* title */
      void 0,
      /* expandable */
      void 0,
      jslogContext
    );
    this.#parentView = parent;
    this.issue = issue;
    this.toggleOnClick = true;
    this.affectedResourcesCountElement = this.createAffectedResourcesCounter();
    this.affectedResources = this.createAffectedResources();
    this.#affectedResourcesCount = 0;
    this.requestResolver = new Logs.RequestResolver.RequestResolver();
    this.#frameListeners = [];
    this.#unresolvedFrameIds = /* @__PURE__ */ new Set();
  }
  /**
   * Sets the issue to take the resources from. Does not
   * trigger an update, the caller needs to do that explicitly.
   */
  setIssue(issue) {
    this.issue = issue;
  }
  createAffectedResourcesCounter() {
    const counterLabel = document.createElement("div");
    counterLabel.classList.add("affected-resource-label");
    this.listItemElement.appendChild(counterLabel);
    return counterLabel;
  }
  createAffectedResources() {
    const body = new UI3.TreeOutline.TreeElement();
    const affectedResources = document.createElement("table");
    affectedResources.classList.add("affected-resource-list");
    body.listItemElement.appendChild(affectedResources);
    this.appendChild(body);
    return affectedResources;
  }
  updateAffectedResourceCount(count) {
    this.#affectedResourcesCount = count;
    this.affectedResourcesCountElement.textContent = this.getResourceNameWithCount(count);
    this.hidden = this.#affectedResourcesCount === 0;
    this.#parentView.updateAffectedResourceVisibility();
  }
  isEmpty() {
    return this.#affectedResourcesCount === 0;
  }
  clear() {
    this.affectedResources.textContent = "";
    this.requestResolver.clear();
  }
  expandIfOneResource() {
    if (this.#affectedResourcesCount === 1) {
      this.expand();
    }
  }
  /**
   * This function resolves a frameId to a ResourceTreeFrame. If the frameId does not resolve, or hasn't navigated yet,
   * a listener is installed that takes care of updating the view if the frame is added. This is useful if the issue is
   * added before the frame gets reported.
   */
  #resolveFrameId(frameId) {
    const frame = SDK.FrameManager.FrameManager.instance().getFrame(frameId);
    if (!frame || !frame.url) {
      this.#unresolvedFrameIds.add(frameId);
      if (!this.#frameListeners.length) {
        const addListener = SDK.FrameManager.FrameManager.instance().addEventListener("FrameAddedToTarget", this.#onFrameChanged, this);
        const navigateListener = SDK.FrameManager.FrameManager.instance().addEventListener("FrameNavigated", this.#onFrameChanged, this);
        this.#frameListeners = [addListener, navigateListener];
      }
    }
    return frame;
  }
  #onFrameChanged(event) {
    const frame = event.data.frame;
    if (!frame.url) {
      return;
    }
    const frameWasUnresolved = this.#unresolvedFrameIds.delete(frame.id);
    if (this.#unresolvedFrameIds.size === 0 && this.#frameListeners.length) {
      Common3.EventTarget.removeEventListeners(this.#frameListeners);
      this.#frameListeners = [];
    }
    if (frameWasUnresolved) {
      this.update();
    }
  }
  createFrameCell(frameId, issueCategory) {
    const frame = this.#resolveFrameId(frameId);
    const url = frame && (frame.unreachableUrl() || frame.url) || i18nString3(UIStrings3.unknown);
    const frameCell = document.createElement("td");
    frameCell.classList.add("affected-resource-cell");
    if (frame) {
      const icon = new IconButton2.Icon.Icon();
      icon.data = { iconName: "code-circle", color: "var(--icon-link)", width: "16px", height: "16px" };
      icon.classList.add("link", "elements-panel");
      icon.onclick = async () => {
        Host.userMetrics.issuesPanelResourceOpened(
          issueCategory,
          "Element"
          /* AffectedItem.ELEMENT */
        );
        const frame2 = SDK.FrameManager.FrameManager.instance().getFrame(frameId);
        if (frame2) {
          const ownerNode = await frame2.getOwnerDOMNodeOrDocument();
          if (ownerNode) {
            void Common3.Revealer.reveal(ownerNode);
          }
        }
      };
      icon.title = i18nString3(UIStrings3.clickToRevealTheFramesDomNodeIn);
      frameCell.appendChild(icon);
    }
    frameCell.appendChild(document.createTextNode(url));
    frameCell.onmouseenter = () => {
      const frame2 = SDK.FrameManager.FrameManager.instance().getFrame(frameId);
      if (frame2) {
        void frame2.highlight();
      }
    };
    frameCell.onmouseleave = () => SDK.OverlayModel.OverlayModel.hideDOMNodeHighlight();
    return frameCell;
  }
  createRequestCell(affectedRequest, options = {}) {
    const requestCell = document.createElement("td");
    requestCell.classList.add("affected-resource-cell");
    const requestLinkIcon = new RequestLinkIcon.RequestLinkIcon.RequestLinkIcon();
    requestLinkIcon.data = { ...options, affectedRequest, requestResolver: this.requestResolver, displayURL: true };
    requestCell.appendChild(requestLinkIcon);
    return requestCell;
  }
  async createElementCell({ backendNodeId, nodeName, target }, issueCategory) {
    if (!target) {
      const cellElement2 = document.createElement("td");
      cellElement2.textContent = nodeName || i18nString3(UIStrings3.unavailable);
      return cellElement2;
    }
    function sendTelemetry() {
      Host.userMetrics.issuesPanelResourceOpened(
        issueCategory,
        "Element"
        /* AffectedItem.ELEMENT */
      );
    }
    const deferredDOMNode = new SDK.DOMModel.DeferredDOMNode(target, backendNodeId);
    const anchorElement = await Common3.Linkifier.Linkifier.linkify(deferredDOMNode);
    anchorElement.textContent = nodeName;
    anchorElement.addEventListener("click", () => sendTelemetry());
    anchorElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        sendTelemetry();
      }
    });
    const cellElement = document.createElement("td");
    cellElement.classList.add("affected-resource-element", "devtools-link");
    cellElement.appendChild(anchorElement);
    return cellElement;
  }
  appendSourceLocation(element, sourceLocation, target) {
    const sourceCodeLocation = document.createElement("td");
    sourceCodeLocation.classList.add("affected-source-location");
    if (sourceLocation) {
      const maxLengthForDisplayedURLs = 40;
      const linkifier = new Components2.Linkifier.Linkifier(maxLengthForDisplayedURLs);
      const sourceAnchor = linkifier.linkifyScriptLocation(target || null, sourceLocation.scriptId || null, sourceLocation.url, sourceLocation.lineNumber, { columnNumber: sourceLocation.columnNumber, inlineFrameIndex: 0 });
      sourceAnchor.setAttribute("jslog", `${VisualLogging2.link("source-location").track({ click: true })}`);
      sourceCodeLocation.appendChild(sourceAnchor);
    }
    element.appendChild(sourceCodeLocation);
  }
  appendColumnTitle(header, title, additionalClass = null) {
    const info = document.createElement("td");
    info.classList.add("affected-resource-header");
    if (additionalClass) {
      info.classList.add(additionalClass);
    }
    info.textContent = title;
    header.appendChild(info);
  }
  createIssueDetailCell(textContent, additionalClass = null) {
    const cell = document.createElement("td");
    if (typeof textContent === "string") {
      cell.textContent = textContent;
    } else {
      cell.appendChild(textContent);
    }
    if (additionalClass) {
      cell.classList.add(additionalClass);
    }
    return cell;
  }
  appendIssueDetailCell(element, textContent, additionalClass = null) {
    const cell = this.createIssueDetailCell(textContent, additionalClass);
    element.appendChild(cell);
    return cell;
  }
};

// gen/front_end/panels/issues/AffectedBlockedByResponseView.js
var UIStrings4 = {
  /**
   *@description Noun for singular or plural network requests. Label for the affected resources section in the issue view.
   */
  nRequests: "{n, plural, =1 {# request} other {# requests}}",
  /**
   *@description Noun for a singular network request. Label for a column in the affected resources table in the issue view.
   */
  requestC: "Request",
  /**
   *@description Noun for a singular parent frame. Label for a column in the affected resources table in the issue view.
   */
  parentFrame: "Parent Frame",
  /**
   *@description Noun for a singular resource that was blocked (an example for a blocked resource would be a frame). Label for a column in the affected resources table in the issue view.
   */
  blockedResource: "Blocked Resource"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/issues/AffectedBlockedByResponseView.ts", UIStrings4);
var i18nString4 = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var AffectedBlockedByResponseView = class extends AffectedResourcesView {
  #appendDetails(details) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString4(UIStrings4.requestC));
    this.appendColumnTitle(header, i18nString4(UIStrings4.parentFrame));
    this.appendColumnTitle(header, i18nString4(UIStrings4.blockedResource));
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const detail of details) {
      this.#appendDetail(detail);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
  getResourceNameWithCount(count) {
    return i18nString4(UIStrings4.nRequests, { n: count });
  }
  #appendDetail(details) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-row");
    const requestCell = this.createRequestCell(details.request, {
      additionalOnClickAction() {
        Host2.userMetrics.issuesPanelResourceOpened(
          "CrossOriginEmbedderPolicy",
          "Request"
          /* AffectedItem.REQUEST */
        );
      }
    });
    element.appendChild(requestCell);
    if (details.parentFrame) {
      const frameUrl = this.createFrameCell(details.parentFrame.frameId, this.issue.getCategory());
      element.appendChild(frameUrl);
    } else {
      element.appendChild(document.createElement("td"));
    }
    if (details.blockedFrame) {
      const frameUrl = this.createFrameCell(details.blockedFrame.frameId, this.issue.getCategory());
      element.appendChild(frameUrl);
    } else {
      element.appendChild(document.createElement("td"));
    }
    this.affectedResources.appendChild(element);
  }
  update() {
    this.clear();
    this.#appendDetails(this.issue.getBlockedByResponseDetails());
  }
};

// gen/front_end/panels/issues/AffectedCookiesView.js
import * as Common4 from "./../../core/common/common.js";
import * as Host3 from "./../../core/host/host.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as NetworkForward from "./../network/forward/forward.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";
var UIStrings5 = {
  /**
   *@description Noun, singular or plural. Label for the kind and number of affected resources associated with a DevTools issue. A cookie is a small piece of data that a server sends to the user's web browser. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies.
   */
  nCookies: "{n, plural, =1 {# cookie} other {# cookies}}",
  /**
   *@description Noun, singular. Label for a column in a table which lists cookies in the affected resources section of a DevTools issue. Each cookie has a name.
   */
  name: "Name",
  /**
   *@description Noun, singular. Label for a column in a table which lists cookies in the affected resources section of a DevTools issue. Cookies may have a 'Domain' attribute: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies.#define_where_cookies_are_sent
   */
  domain: "Domain",
  /**
   *@description Noun, singular. Label for a column in a table which lists cookies in the affected resources section of a DevTools issue. Cookies may have a 'Path' attribute: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies.#define_where_cookies_are_sent
   */
  path: "Path",
  /**
   *@description Label for the the number of affected `Set-Cookie` lines associated with a DevTools issue. `Set-Cookie` is a specific header line in an HTTP network request and consists of a single line of text.
   */
  nRawCookieLines: "{n, plural, =1 {1 Raw `Set-Cookie` header} other {# Raw `Set-Cookie` headers}}",
  /**
   *@description Title for text button in the Issues panel. Clicking the button navigates the user to the Network Panel. `Set-Cookie` is a specific header line in an HTTP network request and consists of a single line of text.
   */
  filterSetCookieTitle: "Show network requests that include this `Set-Cookie` header in the network panel"
};
var str_5 = i18n9.i18n.registerUIStrings("panels/issues/AffectedCookiesView.ts", UIStrings5);
var i18nString5 = i18n9.i18n.getLocalizedString.bind(void 0, str_5);
var AffectedCookiesView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString5(UIStrings5.nCookies, { n: count });
  }
  #appendAffectedCookies(cookies) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString5(UIStrings5.name));
    this.appendColumnTitle(header, i18nString5(UIStrings5.domain) + " & " + i18nString5(UIStrings5.path), "affected-resource-cookie-info-header");
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const cookie of cookies) {
      count++;
      this.#appendAffectedCookie(cookie.cookie, cookie.hasRequest);
    }
    this.updateAffectedResourceCount(count);
  }
  #appendAffectedCookie(cookie, hasAssociatedRequest) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-cookie");
    const name = document.createElement("td");
    if (hasAssociatedRequest) {
      const link5 = document.createElement("button");
      link5.classList.add("link", "devtools-link");
      link5.textContent = cookie.name;
      link5.tabIndex = 0;
      link5.setAttribute("jslog", `${VisualLogging3.link("issues.filter-network-requests-by-cookie").track({ click: true })}`);
      link5.addEventListener("click", () => {
        Host3.userMetrics.issuesPanelResourceOpened(
          this.issue.getCategory(),
          "Cookie"
          /* AffectedItem.COOKIE */
        );
        void Common4.Revealer.reveal(NetworkForward.UIFilter.UIRequestFilter.filters([
          {
            filterType: NetworkForward.UIFilter.FilterType.CookieDomain,
            filterValue: cookie.domain
          },
          {
            filterType: NetworkForward.UIFilter.FilterType.CookieName,
            filterValue: cookie.name
          },
          {
            filterType: NetworkForward.UIFilter.FilterType.CookiePath,
            filterValue: cookie.path
          }
        ]));
      });
      name.appendChild(link5);
    } else {
      name.textContent = cookie.name;
    }
    element.appendChild(name);
    this.appendIssueDetailCell(element, `${cookie.domain}${cookie.path}`, "affected-resource-cookie-info");
    this.affectedResources.appendChild(element);
  }
  update() {
    this.clear();
    this.#appendAffectedCookies(this.issue.cookiesWithRequestIndicator());
  }
};
var AffectedRawCookieLinesView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString5(UIStrings5.nRawCookieLines, { n: count });
  }
  update() {
    this.clear();
    const cookieLinesWithRequestIndicator = this.issue.getRawCookieLines();
    let count = 0;
    for (const cookie of cookieLinesWithRequestIndicator) {
      const row = document.createElement("tr");
      row.classList.add("affected-resource-directive");
      if (cookie.hasRequest) {
        const cookieLine = document.createElement("td");
        const link5 = document.createElement("button");
        link5.classList.add("link", "devtools-link");
        link5.textContent = cookie.rawCookieLine;
        link5.title = i18nString5(UIStrings5.filterSetCookieTitle);
        link5.tabIndex = 0;
        link5.setAttribute("jslog", `${VisualLogging3.link("issues.filter-network-requests-by-raw-cookie").track({ click: true })}`);
        link5.addEventListener("click", () => {
          void Common4.Revealer.reveal(NetworkForward.UIFilter.UIRequestFilter.filters([
            {
              filterType: NetworkForward.UIFilter.FilterType.ResponseHeaderValueSetCookie,
              filterValue: cookie.rawCookieLine
            }
          ]));
        });
        cookieLine.appendChild(link5);
        row.appendChild(cookieLine);
      } else {
        this.appendIssueDetailCell(row, cookie.rawCookieLine);
      }
      this.affectedResources.appendChild(row);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
};

// gen/front_end/panels/issues/AffectedDescendantsWithinSelectElementView.js
import * as i18n13 from "./../../core/i18n/i18n.js";

// gen/front_end/panels/issues/AffectedElementsView.js
import * as i18n11 from "./../../core/i18n/i18n.js";
var UIStrings6 = {
  /**
   *@description Noun for singular or plural number of affected element resource indication in issue view.
   */
  nElements: "{n, plural, =1 {# element} other {# elements}}"
};
var str_6 = i18n11.i18n.registerUIStrings("panels/issues/AffectedElementsView.ts", UIStrings6);
var i18nString6 = i18n11.i18n.getLocalizedString.bind(void 0, str_6);
var AffectedElementsView = class extends AffectedResourcesView {
  async #appendAffectedElements(affectedElements) {
    let count = 0;
    for (const element of affectedElements) {
      await this.#appendAffectedElement(element);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
  getResourceNameWithCount(count) {
    return i18nString6(UIStrings6.nElements, { n: count });
  }
  async #appendAffectedElement(element) {
    const cellElement = await this.createElementCell(element, this.issue.getCategory());
    const rowElement = document.createElement("tr");
    rowElement.appendChild(cellElement);
    this.affectedResources.appendChild(rowElement);
  }
  update() {
    this.clear();
    void this.#appendAffectedElements(this.issue.elements());
  }
};

// gen/front_end/panels/issues/AffectedDescendantsWithinSelectElementView.js
var UIStrings7 = {
  /**
   *@description Noun for singular or plural number of affected descendant nodes indication in issue view.
   */
  nDescendants: "{n, plural, =1 { descendant} other { descendants}}",
  /**
   *@description Label for the disallowed node link in the issue view.
   */
  disallowedNode: "Disallowed descendant"
};
var str_7 = i18n13.i18n.registerUIStrings("panels/issues/AffectedDescendantsWithinSelectElementView.ts", UIStrings7);
var i18nString7 = i18n13.i18n.getLocalizedString.bind(void 0, str_7);
var AffectedDescendantsWithinSelectElementView = class extends AffectedElementsView {
  #runningUpdatePromise = Promise.resolve();
  update() {
    this.#runningUpdatePromise = this.#runningUpdatePromise.then(this.#doUpdate.bind(this));
  }
  getResourceName(count) {
    return i18nString7(UIStrings7.nDescendants, { n: count });
  }
  async #doUpdate() {
    this.clear();
    await this.#appendDisallowedSelectDescendants(this.issue.getElementAccessibilityIssues());
  }
  async #appendDisallowedSelectDescendant(issue) {
    const row = document.createElement("tr");
    row.classList.add("affected-resource-select-element-descendant");
    const details = issue.details();
    const target = issue.model()?.target() || null;
    row.appendChild(await this.createElementCell({ nodeName: i18nString7(UIStrings7.disallowedNode), backendNodeId: details.nodeId, target }, issue.getCategory()));
    this.affectedResources.appendChild(row);
  }
  async #appendDisallowedSelectDescendants(issues) {
    let count = 0;
    for (const issue of issues) {
      count++;
      await this.#appendDisallowedSelectDescendant(issue);
    }
    this.updateAffectedResourceCount(count);
  }
};

// gen/front_end/panels/issues/AffectedDirectivesView.js
import * as Common5 from "./../../core/common/common.js";
import * as Host4 from "./../../core/host/host.js";
import * as i18n15 from "./../../core/i18n/i18n.js";
import * as Platform from "./../../core/platform/platform.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as IssuesManager7 from "./../../models/issues_manager/issues_manager.js";
import * as IssuesComponents from "./components/components.js";
var UIStrings8 = {
  /**
   *@description Singular or plural label for number of affected CSP (content security policy,
   * see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) directives in issue view.
   */
  nDirectives: "{n, plural, =1 {# directive} other {# directives}}",
  /**
   *@description Indicates that a CSP error should be treated as a warning
   */
  reportonly: "report-only",
  /**
   *@description The kind of resolution for a mixed content issue
   */
  blocked: "blocked",
  /**
   *@description Tooltip for button linking to the Elements panel
   */
  clickToRevealTheViolatingDomNode: "Click to reveal the violating DOM node in the Elements panel",
  /**
   *@description Header for the section listing affected directives
   */
  directiveC: "Directive",
  /**
   *@description Label for the column in the element list in the CSS overview report
   */
  element: "Element",
  /**
   *@description Header for the source location column
   */
  sourceLocation: "Source location",
  /**
   *@description Text for the status of something
   */
  status: "Status",
  /**
   *@description Text that refers to the resources of the web page
   */
  resourceC: "Resource"
};
var str_8 = i18n15.i18n.registerUIStrings("panels/issues/AffectedDirectivesView.ts", UIStrings8);
var i18nString8 = i18n15.i18n.getLocalizedString.bind(void 0, str_8);
var AffectedDirectivesView = class extends AffectedResourcesView {
  #appendStatus(element, isReportOnly) {
    const status = document.createElement("td");
    if (isReportOnly) {
      status.classList.add("affected-resource-report-only-status");
      status.textContent = i18nString8(UIStrings8.reportonly);
    } else {
      status.classList.add("affected-resource-blocked-status");
      status.textContent = i18nString8(UIStrings8.blocked);
    }
    element.appendChild(status);
  }
  getResourceNameWithCount(count) {
    return i18nString8(UIStrings8.nDirectives, { n: count });
  }
  #appendViolatedDirective(element, directive) {
    const violatedDirective = document.createElement("td");
    violatedDirective.textContent = directive;
    element.appendChild(violatedDirective);
  }
  #appendBlockedURL(element, url) {
    const info = document.createElement("td");
    info.classList.add("affected-resource-directive-info");
    info.textContent = url;
    element.appendChild(info);
  }
  #appendBlockedElement(element, nodeId, model) {
    const elementsPanelLinkComponent = new IssuesComponents.ElementsPanelLink.ElementsPanelLink();
    if (nodeId) {
      const violatingNodeId = nodeId;
      elementsPanelLinkComponent.title = i18nString8(UIStrings8.clickToRevealTheViolatingDomNode);
      const onElementRevealIconClick = () => {
        const target = model.getTargetIfNotDisposed();
        if (target) {
          Host4.userMetrics.issuesPanelResourceOpened(
            this.issue.getCategory(),
            "Element"
            /* AffectedItem.ELEMENT */
          );
          const deferredDOMNode = new SDK2.DOMModel.DeferredDOMNode(target, violatingNodeId);
          void Common5.Revealer.reveal(deferredDOMNode);
        }
      };
      const onElementRevealIconMouseEnter = () => {
        const target = model.getTargetIfNotDisposed();
        if (target) {
          const deferredDOMNode = new SDK2.DOMModel.DeferredDOMNode(target, violatingNodeId);
          if (deferredDOMNode) {
            deferredDOMNode.highlight();
          }
        }
      };
      const onElementRevealIconMouseLeave = () => {
        SDK2.OverlayModel.OverlayModel.hideDOMNodeHighlight();
      };
      elementsPanelLinkComponent.data = { onElementRevealIconClick, onElementRevealIconMouseEnter, onElementRevealIconMouseLeave };
    }
    const violatingNode = document.createElement("td");
    violatingNode.classList.add("affected-resource-csp-info-node");
    violatingNode.appendChild(elementsPanelLinkComponent);
    element.appendChild(violatingNode);
  }
  #appendAffectedContentSecurityPolicyDetails(cspIssues) {
    const header = document.createElement("tr");
    if (this.issue.code() === IssuesManager7.ContentSecurityPolicyIssue.inlineViolationCode) {
      this.appendColumnTitle(header, i18nString8(UIStrings8.directiveC));
      this.appendColumnTitle(header, i18nString8(UIStrings8.element));
      this.appendColumnTitle(header, i18nString8(UIStrings8.sourceLocation));
      this.appendColumnTitle(header, i18nString8(UIStrings8.status));
    } else if (this.issue.code() === IssuesManager7.ContentSecurityPolicyIssue.urlViolationCode) {
      this.appendColumnTitle(header, i18nString8(UIStrings8.resourceC), "affected-resource-directive-info-header");
      this.appendColumnTitle(header, i18nString8(UIStrings8.status));
      this.appendColumnTitle(header, i18nString8(UIStrings8.directiveC));
      this.appendColumnTitle(header, i18nString8(UIStrings8.sourceLocation));
    } else if (this.issue.code() === IssuesManager7.ContentSecurityPolicyIssue.evalViolationCode) {
      this.appendColumnTitle(header, i18nString8(UIStrings8.sourceLocation));
      this.appendColumnTitle(header, i18nString8(UIStrings8.directiveC));
      this.appendColumnTitle(header, i18nString8(UIStrings8.status));
    } else if (this.issue.code() === IssuesManager7.ContentSecurityPolicyIssue.trustedTypesSinkViolationCode) {
      this.appendColumnTitle(header, i18nString8(UIStrings8.sourceLocation));
      this.appendColumnTitle(header, i18nString8(UIStrings8.status));
    } else if (this.issue.code() === IssuesManager7.ContentSecurityPolicyIssue.trustedTypesPolicyViolationCode) {
      this.appendColumnTitle(header, i18nString8(UIStrings8.sourceLocation));
      this.appendColumnTitle(header, i18nString8(UIStrings8.directiveC));
      this.appendColumnTitle(header, i18nString8(UIStrings8.status));
    } else {
      this.updateAffectedResourceCount(0);
      return;
    }
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const cspIssue of cspIssues) {
      count++;
      this.#appendAffectedContentSecurityPolicyDetail(cspIssue);
    }
    this.updateAffectedResourceCount(count);
  }
  #appendAffectedContentSecurityPolicyDetail(cspIssue) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-directive");
    const cspIssueDetails = cspIssue.details();
    const location = IssuesManager7.Issue.toZeroBasedLocation(cspIssueDetails.sourceCodeLocation);
    const model = cspIssue.model();
    const maybeTarget = cspIssue.model()?.getTargetIfNotDisposed();
    if (this.issue.code() === IssuesManager7.ContentSecurityPolicyIssue.inlineViolationCode && model) {
      this.#appendViolatedDirective(element, cspIssueDetails.violatedDirective);
      this.#appendBlockedElement(element, cspIssueDetails.violatingNodeId, model);
      this.appendSourceLocation(element, location, maybeTarget);
      this.#appendStatus(element, cspIssueDetails.isReportOnly);
    } else if (this.issue.code() === IssuesManager7.ContentSecurityPolicyIssue.urlViolationCode) {
      const url = cspIssueDetails.blockedURL ? cspIssueDetails.blockedURL : Platform.DevToolsPath.EmptyUrlString;
      this.#appendBlockedURL(element, url);
      this.#appendStatus(element, cspIssueDetails.isReportOnly);
      this.#appendViolatedDirective(element, cspIssueDetails.violatedDirective);
      this.appendSourceLocation(element, location, maybeTarget);
    } else if (this.issue.code() === IssuesManager7.ContentSecurityPolicyIssue.evalViolationCode) {
      this.appendSourceLocation(element, location, maybeTarget);
      this.#appendViolatedDirective(element, cspIssueDetails.violatedDirective);
      this.#appendStatus(element, cspIssueDetails.isReportOnly);
    } else if (this.issue.code() === IssuesManager7.ContentSecurityPolicyIssue.trustedTypesSinkViolationCode) {
      this.appendSourceLocation(element, location, maybeTarget);
      this.#appendStatus(element, cspIssueDetails.isReportOnly);
    } else if (this.issue.code() === IssuesManager7.ContentSecurityPolicyIssue.trustedTypesPolicyViolationCode) {
      this.appendSourceLocation(element, location, maybeTarget);
      this.#appendViolatedDirective(element, cspIssueDetails.violatedDirective);
      this.#appendStatus(element, cspIssueDetails.isReportOnly);
    } else {
      return;
    }
    this.affectedResources.appendChild(element);
  }
  update() {
    this.clear();
    this.#appendAffectedContentSecurityPolicyDetails(this.issue.getCspIssues());
  }
};

// gen/front_end/panels/issues/AffectedDocumentsInQuirksModeView.js
import * as i18n17 from "./../../core/i18n/i18n.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
var UIStrings9 = {
  /**
   *@description Noun for singular or plural number of affected document nodes indication in issue view.
   */
  nDocuments: "{n, plural, =1 { document} other { documents}}",
  /**
   *@description Column title for the Document in the DOM tree column in the quirks mode issue view
   */
  documentInTheDOMTree: "Document in the DOM tree",
  /**
   *@description Column title for the url column in the quirks mode issue view
   */
  url: "URL",
  /**
   *@description Column title for the Mode column in the quirks mode issue view
   */
  mode: "Mode"
};
var str_9 = i18n17.i18n.registerUIStrings("panels/issues/AffectedDocumentsInQuirksModeView.ts", UIStrings9);
var i18nString9 = i18n17.i18n.getLocalizedString.bind(void 0, str_9);
var AffectedDocumentsInQuirksModeView = class extends AffectedElementsView {
  #runningUpdatePromise = Promise.resolve();
  update() {
    this.#runningUpdatePromise = this.#runningUpdatePromise.then(this.#doUpdate.bind(this));
  }
  getResourceName(count) {
    return i18nString9(UIStrings9.nDocuments, { n: count });
  }
  async #doUpdate() {
    this.clear();
    await this.#appendQuirksModeDocuments(this.issue.getQuirksModeIssues());
  }
  async #appendQuirksModeDocument(issue) {
    const row = document.createElement("tr");
    row.classList.add("affected-resource-quirks-mode");
    const details = issue.details();
    const target = SDK3.FrameManager.FrameManager.instance().getFrame(details.frameId)?.resourceTreeModel().target() || null;
    row.appendChild(await this.createElementCell({ nodeName: "document", backendNodeId: details.documentNodeId, target }, issue.getCategory()));
    this.appendIssueDetailCell(row, details.isLimitedQuirksMode ? "Limited Quirks Mode" : "Quirks Mode");
    this.appendIssueDetailCell(row, details.url);
    this.affectedResources.appendChild(row);
  }
  async #appendQuirksModeDocuments(issues) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString9(UIStrings9.documentInTheDOMTree));
    this.appendColumnTitle(header, i18nString9(UIStrings9.mode));
    this.appendColumnTitle(header, i18nString9(UIStrings9.url));
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const issue of issues) {
      count++;
      await this.#appendQuirksModeDocument(issue);
    }
    this.updateAffectedResourceCount(count);
  }
};

// gen/front_end/panels/issues/AffectedElementsWithLowContrastView.js
import * as i18n19 from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
var AffectedElementsWithLowContrastView = class extends AffectedElementsView {
  #runningUpdatePromise = Promise.resolve();
  update() {
    this.#runningUpdatePromise = this.#runningUpdatePromise.then(this.#doUpdate.bind(this));
  }
  async #doUpdate() {
    this.clear();
    await this.#appendLowContrastElements(this.issue.getLowContrastIssues());
  }
  async #appendLowContrastElement(issue) {
    const row = document.createElement("tr");
    row.classList.add("affected-resource-low-contrast");
    const details = issue.details();
    const target = issue.model()?.target() || null;
    row.appendChild(await this.createElementCell({ nodeName: details.violatingNodeSelector, backendNodeId: details.violatingNodeId, target }, issue.getCategory()));
    this.appendIssueDetailCell(row, String(Platform2.NumberUtilities.floor(details.contrastRatio, 2)));
    this.appendIssueDetailCell(row, String(details.thresholdAA));
    this.appendIssueDetailCell(row, String(details.thresholdAAA));
    this.appendIssueDetailCell(row, details.fontSize);
    this.appendIssueDetailCell(row, details.fontWeight);
    this.affectedResources.appendChild(row);
  }
  async #appendLowContrastElements(issues) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString10(UIStrings10.element));
    this.appendColumnTitle(header, i18nString10(UIStrings10.contrastRatio));
    this.appendColumnTitle(header, i18nString10(UIStrings10.minimumAA));
    this.appendColumnTitle(header, i18nString10(UIStrings10.minimumAAA));
    this.appendColumnTitle(header, i18nString10(UIStrings10.textSize));
    this.appendColumnTitle(header, i18nString10(UIStrings10.textWeight));
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const lowContrastIssue of issues) {
      count++;
      await this.#appendLowContrastElement(lowContrastIssue);
    }
    this.updateAffectedResourceCount(count);
  }
};
var UIStrings10 = {
  /**
   *@description Column title for the element column in the low contrast issue view
   */
  element: "Element",
  /**
   *@description Column title for the contrast ratio column in the low contrast issue view
   */
  contrastRatio: "Contrast ratio",
  /**
   *@description Column title for the minimum AA contrast ratio column in the low contrast issue view
   */
  minimumAA: "Minimum AA ratio",
  /**
   *@description Column title for the minimum AAA contrast ratio column in the low contrast issue view
   */
  minimumAAA: "Minimum AAA ratio",
  /**
   *@description Column title for the text size column in the low contrast issue view
   */
  textSize: "Text size",
  /**
   *@description Column title for the text weight column in the low contrast issue view
   */
  textWeight: "Text weight"
};
var str_10 = i18n19.i18n.registerUIStrings("panels/issues/AffectedElementsWithLowContrastView.ts", UIStrings10);
var i18nString10 = i18n19.i18n.getLocalizedString.bind(void 0, str_10);

// gen/front_end/panels/issues/AffectedHeavyAdView.js
import * as i18n21 from "./../../core/i18n/i18n.js";
var UIStrings11 = {
  /**
   *@description Label for number of affected resources indication in issue view
   */
  nResources: "{n, plural, =1 {# resource} other {# resources}}",
  /**
   *@description Title for a column in an Heavy Ads issue view
   */
  limitExceeded: "Limit exceeded",
  /**
   *@description Title for a column in an Heavy Ads issue view
   */
  resolutionStatus: "Resolution Status",
  /**
   *@description Title for a column in an Heavy Ads issue view
   */
  frameUrl: "Frame URL",
  /**
   * @description When there is a Heavy Ad, the browser can choose to deal with it in different ways.
   * This string indicates that the ad was bad enough that it was removed.
   */
  removed: "Removed",
  /**
   * @description When there is a Heavy Ad, the browser can choose to deal with it in different ways.
   * This string indicates that the ad was only warned, and not removed.
   */
  warned: "Warned",
  /**
   *@description Reason for a Heavy Ad being flagged in issue view. The Ad has been flagged as a
   *Heavy Ad because it exceeded the set limit for peak CPU usage, e.g. it blocked the main thread
   *for more than 15 seconds in any 30-second window.
   */
  cpuPeakLimit: "CPU peak limit",
  /**
   *@description Reason for a Heavy Ad being flagged in issue view
   */
  cpuTotalLimit: "CPU total limit",
  /**
   *@description Reason for a Heavy Ad being flagged in issue view
   */
  networkLimit: "Network limit"
};
var str_11 = i18n21.i18n.registerUIStrings("panels/issues/AffectedHeavyAdView.ts", UIStrings11);
var i18nString11 = i18n21.i18n.getLocalizedString.bind(void 0, str_11);
var AffectedHeavyAdView = class extends AffectedResourcesView {
  #appendAffectedHeavyAds(heavyAds) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString11(UIStrings11.limitExceeded));
    this.appendColumnTitle(header, i18nString11(UIStrings11.resolutionStatus));
    this.appendColumnTitle(header, i18nString11(UIStrings11.frameUrl));
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const heavyAd of heavyAds) {
      this.#appendAffectedHeavyAd(heavyAd.details());
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
  getResourceNameWithCount(count) {
    return i18nString11(UIStrings11.nResources, { n: count });
  }
  #statusToString(status) {
    switch (status) {
      case "HeavyAdBlocked":
        return i18nString11(UIStrings11.removed);
      case "HeavyAdWarning":
        return i18nString11(UIStrings11.warned);
    }
    return "";
  }
  #limitToString(status) {
    switch (status) {
      case "CpuPeakLimit":
        return i18nString11(UIStrings11.cpuPeakLimit);
      case "CpuTotalLimit":
        return i18nString11(UIStrings11.cpuTotalLimit);
      case "NetworkTotalLimit":
        return i18nString11(UIStrings11.networkLimit);
    }
    return "";
  }
  #appendAffectedHeavyAd(heavyAd) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-heavy-ad");
    const reason = document.createElement("td");
    reason.classList.add("affected-resource-heavy-ad-info");
    reason.textContent = this.#limitToString(heavyAd.reason);
    element.appendChild(reason);
    const status = document.createElement("td");
    status.classList.add("affected-resource-heavy-ad-info");
    status.textContent = this.#statusToString(heavyAd.resolution);
    element.appendChild(status);
    const frameId = heavyAd.frame.frameId;
    const frameUrl = this.createFrameCell(frameId, this.issue.getCategory());
    element.appendChild(frameUrl);
    this.affectedResources.appendChild(element);
  }
  update() {
    this.clear();
    this.#appendAffectedHeavyAds(this.issue.getHeavyAdIssues());
  }
};

// gen/front_end/panels/issues/AffectedMetadataAllowedSitesView.js
import * as i18n23 from "./../../core/i18n/i18n.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
var UIStrings12 = {
  /**
   *@description Label for the the number of affected `Allowed Sites` associated with a
   *DevTools issue. In this context, `Allowed` refers to permission to access cookies
   *via the third-party cookie deprecation global metadata, and `Site` is equivalent
   *to eTLD+1.
   *See https://developer.mozilla.org/en-US/docs/Glossary/eTLD.
   */
  nAllowedSites: "{n, plural, =1 {1 website allowed to access cookies} other {# websites allowed to access cookies}}"
};
var str_12 = i18n23.i18n.registerUIStrings("panels/issues/AffectedMetadataAllowedSitesView.ts", UIStrings12);
var i18nString12 = i18n23.i18n.getLocalizedString.bind(void 0, str_12);
var AffectedMetadataAllowedSitesView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString12(UIStrings12.nAllowedSites, { n: count });
  }
  update() {
    this.clear();
    const issues = this.issue.getCookieDeprecationMetadataIssues();
    let count = 0;
    for (const issueData of issues) {
      const row = document.createElement("tr");
      row.classList.add("affected-resource-directive");
      const textContentElement = document.createElement("div");
      const textElement = document.createElement("span");
      textElement.textContent = issueData.details().allowedSites.join(", ");
      textContentElement.appendChild(textElement);
      if (!issueData.details().isOptOutTopLevel && issueData.details().optOutPercentage > 0) {
        const optOutTextElement = document.createElement("span");
        optOutTextElement.textContent = " (opt-out: " + issueData.details().optOutPercentage + "% - ";
        textContentElement.appendChild(optOutTextElement);
        const linkElement = UI4.XLink.XLink.create("https://developers.google.com/privacy-sandbox/blog/grace-period-opt-out", "learn more");
        textContentElement.appendChild(linkElement);
        const endTextElement = document.createElement("span");
        endTextElement.textContent = ")";
        textContentElement.appendChild(endTextElement);
      }
      this.appendIssueDetailCell(row, textContentElement);
      this.affectedResources.appendChild(row);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
};

// gen/front_end/panels/issues/AffectedPartitioningBlobURLView.js
import * as i18n25 from "./../../core/i18n/i18n.js";
var UIStrings13 = {
  /**
   * @description Description for Partitioning BlobURL issue when PartitioningBlobURLInfo is BlockedCrossPartitionFetching.
   * @example {blob:https://web-platform.test:8444/example} url
   */
  blockedCrossPartitionFetching: "Access to the Blob URL {url} was blocked because it was performed from a cross-partition context.",
  /**
   * @description Description for Partitioning BlobURL issue when PartitioningBlobURLInfo is EnforceNoopenerForNavigation.
   * @example {blob:https://web-platform.test:8444/example} url
   */
  enforceNoopenerForNavigation: "Blob URL {url} top-level navigation had 'noopener' set because the Blob URL origin was cross-site with the top-level site of the context that initiated the navigation.",
  /**
   * @description Blob URL issue count
   * @example {1} count
   */
  blobURLCount: "Blob URL issues count: {count}",
  /**
   * @description Message shown when no Blob URL is available for a Partitioning Blob URL issue.
   */
  noBlobURLAvailable: "No Blob URL available for this issue."
};
var str_13 = i18n25.i18n.registerUIStrings("panels/issues/AffectedPartitioningBlobURLView.ts", UIStrings13);
var i18nString13 = i18n25.i18n.getLocalizedString.bind(void 0, str_13);
var AffectedPartitioningBlobURLView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString13(UIStrings13.blobURLCount, { count });
  }
  update() {
    this.clear();
    let count = 0;
    const partitioningBlobURLIssues = this.issue.getPartitioningBlobURLIssues();
    for (const issue of partitioningBlobURLIssues) {
      const blobURL = issue.details().url;
      const partitioningBlobURLInfo = issue.details().partitioningBlobURLInfo;
      if (blobURL) {
        let description;
        switch (partitioningBlobURLInfo) {
          case "BlockedCrossPartitionFetching":
            description = i18nString13(UIStrings13.blockedCrossPartitionFetching, { url: blobURL });
            break;
          case "EnforceNoopenerForNavigation":
            description = i18nString13(UIStrings13.enforceNoopenerForNavigation, { url: blobURL });
            break;
        }
        const descriptionElement = document.createElement("div");
        descriptionElement.textContent = description;
        this.affectedResources.appendChild(descriptionElement);
        count++;
      } else {
        const noURLMessage = document.createElement("div");
        noURLMessage.textContent = i18nString13(UIStrings13.noBlobURLAvailable);
        this.affectedResources.appendChild(noURLMessage);
      }
    }
    this.updateAffectedResourceCount(count);
  }
};

// gen/front_end/panels/issues/AffectedSharedArrayBufferIssueDetailsView.js
import * as i18n27 from "./../../core/i18n/i18n.js";
import * as IssuesManager8 from "./../../models/issues_manager/issues_manager.js";
var UIStrings14 = {
  /**
   *@description Label for number of affected resources indication in issue view
   */
  nViolations: "{n, plural, =1 {# violation} other {# violations}}",
  /**
   *@description Value for the status column in SharedArrayBuffer issues
   */
  warning: "warning",
  /**
   *@description The kind of resolution for a mixed content issue
   */
  blocked: "blocked",
  /**
   *@description Value for the 'Trigger' column in the SAB affected resources list
   */
  instantiation: "Instantiation",
  /**
   *@description Tooltip for the 'Trigger' column in the SAB affected resources list
   */
  aSharedarraybufferWas: "A `SharedArrayBuffer` was instantiated in a context that is not cross-origin isolated",
  /**
   *@description Value for the 'Trigger' column in the SAB affected resources list
   */
  transfer: "Transfer",
  /**
   *@description Tooltip for the 'Trigger' column in the SAB affected resources list
   */
  sharedarraybufferWasTransferedTo: "`SharedArrayBuffer` was transfered to a context that is not cross-origin isolated",
  /**
   *@description Header for the source location column
   */
  sourceLocation: "Source Location",
  /**
   *@description Title for the 'Trigger' column in the SAB affected resources list
   */
  trigger: "Trigger",
  /**
   *@description Title for the status column in the SAB affected resources list
   */
  status: "Status"
};
var str_14 = i18n27.i18n.registerUIStrings("panels/issues/AffectedSharedArrayBufferIssueDetailsView.ts", UIStrings14);
var i18nString14 = i18n27.i18n.getLocalizedString.bind(void 0, str_14);
var AffectedSharedArrayBufferIssueDetailsView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString14(UIStrings14.nViolations, { n: count });
  }
  #appendStatus(element, isWarning) {
    const status = document.createElement("td");
    if (isWarning) {
      status.classList.add("affected-resource-report-only-status");
      status.textContent = i18nString14(UIStrings14.warning);
    } else {
      status.classList.add("affected-resource-blocked-status");
      status.textContent = i18nString14(UIStrings14.blocked);
    }
    element.appendChild(status);
  }
  #appendType(element, type) {
    const status = document.createElement("td");
    switch (type) {
      case "CreationIssue":
        status.textContent = i18nString14(UIStrings14.instantiation);
        status.title = i18nString14(UIStrings14.aSharedarraybufferWas);
        break;
      case "TransferIssue":
        status.textContent = i18nString14(UIStrings14.transfer);
        status.title = i18nString14(UIStrings14.sharedarraybufferWasTransferedTo);
        break;
    }
    element.appendChild(status);
  }
  #appendDetails(sabIssues) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString14(UIStrings14.sourceLocation));
    this.appendColumnTitle(header, i18nString14(UIStrings14.trigger));
    this.appendColumnTitle(header, i18nString14(UIStrings14.status));
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const sabIssue of sabIssues) {
      count++;
      this.#appendDetail(sabIssue);
    }
    this.updateAffectedResourceCount(count);
  }
  #appendDetail(sabIssue) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-directive");
    const sabIssueDetails = sabIssue.details();
    const location = IssuesManager8.Issue.toZeroBasedLocation(sabIssueDetails.sourceCodeLocation);
    this.appendSourceLocation(element, location, sabIssue.model()?.getTargetIfNotDisposed());
    this.#appendType(element, sabIssueDetails.type);
    this.#appendStatus(element, sabIssueDetails.isWarning);
    this.affectedResources.appendChild(element);
  }
  update() {
    this.clear();
    this.#appendDetails(this.issue.getSharedArrayBufferIssues());
  }
};

// gen/front_end/panels/issues/AffectedSourcesView.js
import * as i18n29 from "./../../core/i18n/i18n.js";
import * as Components3 from "./../../ui/legacy/components/utils/utils.js";
import * as VisualLogging4 from "./../../ui/visual_logging/visual_logging.js";
var UIStrings15 = {
  /**
   *@description Singular or Plural label for number of affected sources (consisting of (source) file name + line number) in issue view
   */
  nSources: "{n, plural, =1 {# source} other {# sources}}"
};
var str_15 = i18n29.i18n.registerUIStrings("panels/issues/AffectedSourcesView.ts", UIStrings15);
var i18nString15 = i18n29.i18n.getLocalizedString.bind(void 0, str_15);
var AffectedSourcesView = class extends AffectedResourcesView {
  #appendAffectedSources(affectedSources) {
    let count = 0;
    for (const source of affectedSources) {
      this.#appendAffectedSource(source);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
  getResourceNameWithCount(count) {
    return i18nString15(UIStrings15.nSources, { n: count });
  }
  #appendAffectedSource({ url, lineNumber, columnNumber }) {
    const cellElement = document.createElement("td");
    const linkifierURLOptions = { columnNumber, lineNumber, tabStop: true, showColumnNumber: false, inlineFrameIndex: 0 };
    const anchorElement = Components3.Linkifier.Linkifier.linkifyURL(url, linkifierURLOptions);
    anchorElement.setAttribute("jslog", `${VisualLogging4.link("source-location").track({ click: true })}`);
    cellElement.appendChild(anchorElement);
    const rowElement = document.createElement("tr");
    rowElement.classList.add("affected-resource-source");
    rowElement.appendChild(cellElement);
    this.affectedResources.appendChild(rowElement);
  }
  update() {
    this.clear();
    this.#appendAffectedSources(this.issue.sources());
  }
};

// gen/front_end/panels/issues/AffectedTrackingSitesView.js
import * as i18n31 from "./../../core/i18n/i18n.js";
var UIStrings16 = {
  /**
   *@description Label for the the number of affected `Potentially-tracking Sites` associated with a
   *DevTools issue. In this context, `tracking` refers to bounce tracking and `Site` is equivalent
   *to eTLD+1.
   *See https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md
   *and https://developer.mozilla.org/en-US/docs/Glossary/eTLD.
   */
  nTrackingSites: "{n, plural, =1 {1 potentially tracking website} other {# potentially tracking websites}}"
};
var str_16 = i18n31.i18n.registerUIStrings("panels/issues/AffectedTrackingSitesView.ts", UIStrings16);
var i18nString16 = i18n31.i18n.getLocalizedString.bind(void 0, str_16);
var AffectedTrackingSitesView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString16(UIStrings16.nTrackingSites, { n: count });
  }
  update() {
    this.clear();
    const trackingSites = this.issue.getBounceTrackingSites();
    let count = 0;
    for (const site of trackingSites) {
      const row = document.createElement("tr");
      row.classList.add("affected-resource-directive");
      this.appendIssueDetailCell(row, site);
      this.affectedResources.appendChild(row);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
};

// gen/front_end/panels/issues/AttributionReportingIssueDetailsView.js
import * as Host5 from "./../../core/host/host.js";
import * as i18n33 from "./../../core/i18n/i18n.js";
import * as IssuesManager9 from "./../../models/issues_manager/issues_manager.js";
var UIStrings17 = {
  /**
   * @description Label for number of rows in the issue details table.
   */
  nViolations: "{n, plural, =1 {# violation} other {# violations}}",
  /**
   * @description Noun, label for the column showing the associated HTML element in the issue details table.
   */
  element: "Element",
  /**
   * @description Noun, label for the column showing the invalid header value in the issue details table.
   */
  invalidHeaderValue: "Invalid Header Value",
  /**
   * @description Noun, label for the column showing the associated network request in the issue details table.
   */
  request: "Request",
  /**
   * @description Label for the column showing the invalid URL used in an HTML anchor element ("a link").
   * A origin is (roughly said) the front part of a URL.
   */
  untrustworthyOrigin: "Untrustworthy origin"
};
var str_17 = i18n33.i18n.registerUIStrings("panels/issues/AttributionReportingIssueDetailsView.ts", UIStrings17);
var i18nString17 = i18n33.i18n.getLocalizedString.bind(void 0, str_17);
var AttributionReportingIssueDetailsView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString17(UIStrings17.nViolations, { n: count });
  }
  update() {
    this.clear();
    const issues = this.issue.getAttributionReportingIssues();
    const issue = issues.values().next();
    if (issue.done) {
      this.updateAffectedResourceCount(0);
    } else {
      this.#appendDetails(issue.value.code(), issues);
    }
  }
  #appendDetails(issueCode, issues) {
    const header = document.createElement("tr");
    switch (issueCode) {
      case "AttributionReportingIssue::InvalidRegisterSourceHeader":
      case "AttributionReportingIssue::InvalidRegisterTriggerHeader":
      case "AttributionReportingIssue::InvalidRegisterOsSourceHeader":
      case "AttributionReportingIssue::InvalidRegisterOsTriggerHeader":
      case "AttributionReportingIssue::OsSourceIgnored":
      case "AttributionReportingIssue::OsTriggerIgnored":
      case "AttributionReportingIssue::SourceIgnored":
      case "AttributionReportingIssue::TriggerIgnored":
      case "AttributionReportingIssue::InvalidInfoHeader":
      case "AttributionReportingIssue::NavigationRegistrationUniqueScopeAlreadySet":
        this.appendColumnTitle(header, i18nString17(UIStrings17.request));
        this.appendColumnTitle(header, i18nString17(UIStrings17.invalidHeaderValue));
        break;
      case "AttributionReportingIssue::InsecureContext":
      case "AttributionReportingIssue::UntrustworthyReportingOrigin":
        this.appendColumnTitle(header, i18nString17(UIStrings17.element));
        this.appendColumnTitle(header, i18nString17(UIStrings17.request));
        this.appendColumnTitle(header, i18nString17(UIStrings17.untrustworthyOrigin));
        break;
      case "AttributionReportingIssue::PermissionPolicyDisabled":
        this.appendColumnTitle(header, i18nString17(UIStrings17.element));
        this.appendColumnTitle(header, i18nString17(UIStrings17.request));
        break;
      case "AttributionReportingIssue::SourceAndTriggerHeaders":
      case "AttributionReportingIssue::WebAndOsHeaders":
      case "AttributionReportingIssue::NoWebOrOsSupport":
      case "AttributionReportingIssue::NoRegisterSourceHeader":
      case "AttributionReportingIssue::NoRegisterTriggerHeader":
      case "AttributionReportingIssue::NoRegisterOsSourceHeader":
      case "AttributionReportingIssue::NoRegisterOsTriggerHeader":
        this.appendColumnTitle(header, i18nString17(UIStrings17.request));
        break;
      case "AttributionReportingIssue::NavigationRegistrationWithoutTransientUserActivation":
        this.appendColumnTitle(header, i18nString17(UIStrings17.element));
        break;
    }
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const issue of issues) {
      count++;
      void this.#appendDetail(issueCode, issue);
    }
    this.updateAffectedResourceCount(count);
  }
  async #appendDetail(issueCode, issue) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-directive");
    const details = issue.issueDetails;
    switch (issueCode) {
      case "AttributionReportingIssue::InvalidRegisterSourceHeader":
      case "AttributionReportingIssue::InvalidRegisterTriggerHeader":
      case "AttributionReportingIssue::InvalidRegisterOsSourceHeader":
      case "AttributionReportingIssue::InvalidRegisterOsTriggerHeader":
      case "AttributionReportingIssue::OsSourceIgnored":
      case "AttributionReportingIssue::OsTriggerIgnored":
      case "AttributionReportingIssue::SourceIgnored":
      case "AttributionReportingIssue::TriggerIgnored":
      case "AttributionReportingIssue::InvalidInfoHeader":
      case "AttributionReportingIssue::NavigationRegistrationUniqueScopeAlreadySet":
        this.#appendRequestOrEmptyCell(element, details.request);
        this.appendIssueDetailCell(element, details.invalidParameter || "");
        break;
      case "AttributionReportingIssue::InsecureContext":
      case "AttributionReportingIssue::UntrustworthyReportingOrigin":
        await this.#appendElementOrEmptyCell(element, issue);
        this.#appendRequestOrEmptyCell(element, details.request);
        this.appendIssueDetailCell(element, details.invalidParameter || "");
        break;
      case "AttributionReportingIssue::PermissionPolicyDisabled":
        await this.#appendElementOrEmptyCell(element, issue);
        this.#appendRequestOrEmptyCell(element, details.request);
        break;
      case "AttributionReportingIssue::SourceAndTriggerHeaders":
      case "AttributionReportingIssue::WebAndOsHeaders":
      case "AttributionReportingIssue::NoWebOrOsSupport":
      case "AttributionReportingIssue::NoRegisterSourceHeader":
      case "AttributionReportingIssue::NoRegisterTriggerHeader":
      case "AttributionReportingIssue::NoRegisterOsSourceHeader":
      case "AttributionReportingIssue::NoRegisterOsTriggerHeader":
        this.#appendRequestOrEmptyCell(element, details.request);
        break;
      case "AttributionReportingIssue::NavigationRegistrationWithoutTransientUserActivation":
        await this.#appendElementOrEmptyCell(element, issue);
        break;
    }
    this.affectedResources.appendChild(element);
  }
  async #appendElementOrEmptyCell(parent, issue) {
    const details = issue.issueDetails;
    if (details.violatingNodeId !== void 0) {
      const target = issue.model()?.target() || null;
      parent.appendChild(await this.createElementCell({ backendNodeId: details.violatingNodeId, target, nodeName: "Attribution source element" }, issue.getCategory()));
    } else {
      this.appendIssueDetailCell(parent, "");
    }
  }
  #appendRequestOrEmptyCell(parent, request) {
    if (!request) {
      this.appendIssueDetailCell(parent, "");
      return;
    }
    const opts = {
      additionalOnClickAction() {
        Host5.userMetrics.issuesPanelResourceOpened(
          "AttributionReporting",
          "Request"
          /* AffectedItem.REQUEST */
        );
      }
    };
    parent.appendChild(this.createRequestCell(request, opts));
  }
};

// gen/front_end/panels/issues/IssueView.js
import * as Components4 from "./components/components.js";

// gen/front_end/panels/issues/CorsIssueDetailsView.js
import * as Host6 from "./../../core/host/host.js";
import * as i18n35 from "./../../core/i18n/i18n.js";
import * as Platform3 from "./../../core/platform/platform.js";
import * as IssuesManager10 from "./../../models/issues_manager/issues_manager.js";
import * as NetworkForward2 from "./../network/forward/forward.js";
var UIStrings18 = {
  /**
   *@description Label for number of affected resources indication in issue view
   */
  nRequests: "{n, plural, =1 {# request} other {# requests}}",
  /**
   *@description Value for the status column in SharedArrayBuffer issues
   */
  warning: "warning",
  /**
   *@description The kind of resolution for a mixed content issue
   */
  blocked: "blocked",
  /**
   *@description Text for the status column in the item list in the CORS issue details view
   */
  status: "Status",
  /**
   *@description Text for the column showing the associated network request in the item list in the CORS issue details view
   */
  request: "Request",
  /**
   *@description Text for the column showing the resource's address in the item list in the CORS issue details view
   */
  resourceAddressSpace: "Resource Address",
  /**
   *@description Text for the column showing the address of the resource load initiator in the item list in the CORS issue details view
   */
  initiatorAddressSpace: "Initiator Address",
  /**
   *@description Text for the status of the initiator context
   */
  secure: "secure",
  /**
   *@description Text for the status of the initiator context
   */
  insecure: "insecure",
  /**
   *@description Title for a column showing the status of the initiator context. The initiator context is either secure or insecure depending on whether it was loaded via HTTP or HTTPS.
   */
  initiatorContext: "Initiator Context",
  /**
   *@description Title for a column in the affected resources for a CORS issue showing a link to the associated preflight request in case the preflight request caused the issue.
   */
  preflightRequestIfProblematic: "Preflight Request (if problematic)",
  /**
   *@description Title for a column in the affected resources for a CORS issue showing a link to the associated preflight request.
   */
  preflightRequest: "Preflight Request",
  /**
   *@description Title for a column in the affected resources for a CORS issue showing the name of the problematic HTTP response header.
   */
  header: "Header",
  /**
   *@description Title for a column in the affected resources for a CORS issue showing the problem associated with the resource.
   */
  problem: "Problem",
  /**
   *@description Title for a column in the affected resources for a CORS issue showing the value that was invalid and caused the problem if it is available.
   */
  invalidValue: "Invalid Value (if available)",
  /**
   *@description Content for the problem column in the affected resources table for a CORS issue that indicates that a response header was missing.
   */
  problemMissingHeader: "Missing Header",
  /**
   *@description Content for the problem column in the affected resources table for a CORS issue that indicates that a response header contained multiple values.
   */
  problemMultipleValues: "Multiple Values",
  /**
   *@description Content for the problem column in the affected resources table for a CORS issue that indicates that a response header contained an invalid value.
   */
  problemInvalidValue: "Invalid Value",
  /**
   *@description Content for the problem column in the affected resources table for a CORS issue that indicates that the response to the preflight request was a redirect.
   */
  preflightDisallowedRedirect: "Response to preflight was a redirect",
  /**
   *@description Content for the problem column in the affected resources table for a CORS issue that indicates that the HTTP status the preflight request was not successful.
   */
  preflightInvalidStatus: "HTTP status of preflight request didn't indicate success",
  /**
   *@description Title for a column in the affected resources for a CORS issue showing the origin that was allowed according to CORS headers.
   */
  allowedOrigin: "Allowed Origin (from header)",
  /**
   *@description Title for a column in the affected resources for a CORS issue showing the value of the Access-Control-Allow-Credentials response header.
   */
  allowCredentialsValueFromHeader: "`Access-Control-Allow-Credentials` Header Value",
  /**
   *@description Title for a column in the affected resources for a CORS issue showing the request method that was disallowed.
   */
  disallowedRequestMethod: "Disallowed Request Method",
  /**
   *@description Title for a column in the affected resources for a CORS issue showing the request header that was disallowed.
   */
  disallowedRequestHeader: "Disallowed Request Header",
  /**
   *@description Header for the source location column
   */
  sourceLocation: "Source Location",
  /**
   *@description Header for the column with the URL scheme that is not supported by fetch
   */
  unsupportedScheme: "Unsupported Scheme",
  /**
   *@description A failed network request.
   */
  failedRequest: "Failed Request"
};
var str_18 = i18n35.i18n.registerUIStrings("panels/issues/CorsIssueDetailsView.ts", UIStrings18);
var i18nString18 = i18n35.i18n.getLocalizedString.bind(void 0, str_18);
var CorsIssueDetailsView = class _CorsIssueDetailsView extends AffectedResourcesView {
  constructor(parent, issue, jslogContext) {
    super(parent, issue, jslogContext);
    this.affectedResourcesCountElement.classList.add("cors-issue-affected-resource-label");
  }
  #appendStatus(element, isWarning) {
    const status = document.createElement("td");
    if (isWarning) {
      status.classList.add("affected-resource-report-only-status");
      status.textContent = i18nString18(UIStrings18.warning);
    } else {
      status.classList.add("affected-resource-blocked-status");
      status.textContent = i18nString18(UIStrings18.blocked);
    }
    element.appendChild(status);
  }
  getResourceNameWithCount(count) {
    return i18nString18(UIStrings18.nRequests, { n: count });
  }
  #appendDetails(issueCode, issues) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString18(UIStrings18.request));
    this.appendColumnTitle(header, i18nString18(UIStrings18.status));
    switch (issueCode) {
      case "CorsIssue::InvalidHeaders":
        this.appendColumnTitle(header, i18nString18(UIStrings18.preflightRequestIfProblematic));
        this.appendColumnTitle(header, i18nString18(UIStrings18.header));
        this.appendColumnTitle(header, i18nString18(UIStrings18.problem));
        this.appendColumnTitle(header, i18nString18(UIStrings18.invalidValue));
        break;
      case "CorsIssue::WildcardOriginWithCredentials":
        this.appendColumnTitle(header, i18nString18(UIStrings18.preflightRequestIfProblematic));
        break;
      case "CorsIssue::PreflightResponseInvalid":
        this.appendColumnTitle(header, i18nString18(UIStrings18.preflightRequest));
        this.appendColumnTitle(header, i18nString18(UIStrings18.problem));
        break;
      case "CorsIssue::OriginMismatch":
        this.appendColumnTitle(header, i18nString18(UIStrings18.preflightRequestIfProblematic));
        this.appendColumnTitle(header, i18nString18(UIStrings18.initiatorContext));
        this.appendColumnTitle(header, i18nString18(UIStrings18.allowedOrigin));
        break;
      case "CorsIssue::AllowCredentialsRequired":
        this.appendColumnTitle(header, i18nString18(UIStrings18.preflightRequestIfProblematic));
        this.appendColumnTitle(header, i18nString18(UIStrings18.allowCredentialsValueFromHeader));
        break;
      case "CorsIssue::InsecurePrivateNetwork":
        this.appendColumnTitle(header, i18nString18(UIStrings18.resourceAddressSpace));
        this.appendColumnTitle(header, i18nString18(UIStrings18.initiatorAddressSpace));
        this.appendColumnTitle(header, i18nString18(UIStrings18.initiatorContext));
        break;
      case "CorsIssue::PreflightAllowPrivateNetworkError":
        this.appendColumnTitle(header, i18nString18(UIStrings18.preflightRequest));
        this.appendColumnTitle(header, i18nString18(UIStrings18.invalidValue));
        this.appendColumnTitle(header, i18nString18(UIStrings18.initiatorAddressSpace));
        this.appendColumnTitle(header, i18nString18(UIStrings18.initiatorContext));
        break;
      case "CorsIssue::PreflightMissingPrivateNetworkAccessId":
      case "CorsIssue::PreflightMissingPrivateNetworkAccessName":
        this.appendColumnTitle(header, i18nString18(UIStrings18.preflightRequest));
        this.appendColumnTitle(header, i18nString18(UIStrings18.invalidValue));
        this.appendColumnTitle(header, i18nString18(UIStrings18.resourceAddressSpace));
        this.appendColumnTitle(header, i18nString18(UIStrings18.initiatorAddressSpace));
        this.appendColumnTitle(header, i18nString18(UIStrings18.initiatorContext));
        break;
      case "CorsIssue::MethodDisallowedByPreflightResponse":
        this.appendColumnTitle(header, i18nString18(UIStrings18.preflightRequest));
        this.appendColumnTitle(header, i18nString18(UIStrings18.disallowedRequestMethod));
        break;
      case "CorsIssue::HeaderDisallowedByPreflightResponse":
        this.appendColumnTitle(header, i18nString18(UIStrings18.preflightRequest));
        this.appendColumnTitle(header, i18nString18(UIStrings18.disallowedRequestHeader));
        break;
      case "CorsIssue::RedirectContainsCredentials":
        break;
      case "CorsIssue::DisallowedByMode":
        this.appendColumnTitle(header, i18nString18(UIStrings18.initiatorContext));
        this.appendColumnTitle(header, i18nString18(UIStrings18.sourceLocation));
        break;
      case "CorsIssue::CorsDisabledScheme":
        this.appendColumnTitle(header, i18nString18(UIStrings18.initiatorContext));
        this.appendColumnTitle(header, i18nString18(UIStrings18.sourceLocation));
        this.appendColumnTitle(header, i18nString18(UIStrings18.unsupportedScheme));
        break;
      case "CorsIssue::NoCorsRedirectModeNotFollow":
        this.appendColumnTitle(header, i18nString18(UIStrings18.sourceLocation));
        break;
      default:
        Platform3.assertUnhandled(issueCode);
    }
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const issue of issues) {
      count++;
      this.#appendDetail(issueCode, issue);
    }
    this.updateAffectedResourceCount(count);
  }
  #appendSecureContextCell(element, isSecureContext) {
    if (isSecureContext === void 0) {
      this.appendIssueDetailCell(element, "");
      return;
    }
    this.appendIssueDetailCell(element, isSecureContext ? i18nString18(UIStrings18.secure) : i18nString18(UIStrings18.insecure));
  }
  static getHeaderFromError(corsError) {
    switch (corsError) {
      case "InvalidAllowHeadersPreflightResponse":
        return "Access-Control-Allow-Headers";
      case "InvalidAllowMethodsPreflightResponse":
      case "MethodDisallowedByPreflightResponse":
        return "Access-Control-Allow-Methods";
      case "PreflightMissingAllowOriginHeader":
      case "PreflightMultipleAllowOriginValues":
      case "PreflightInvalidAllowOriginValue":
      case "MissingAllowOriginHeader":
      case "MultipleAllowOriginValues":
      case "InvalidAllowOriginValue":
      case "WildcardOriginNotAllowed":
      case "PreflightWildcardOriginNotAllowed":
      case "AllowOriginMismatch":
      case "PreflightAllowOriginMismatch":
        return "Access-Control-Allow-Origin";
      case "InvalidAllowCredentials":
      case "PreflightInvalidAllowCredentials":
        return "Access-Control-Allow-Credentials";
      case "PreflightMissingAllowPrivateNetwork":
      case "PreflightInvalidAllowPrivateNetwork":
        return "Access-Control-Allow-Private-Network";
      case "RedirectContainsCredentials":
      case "PreflightDisallowedRedirect":
        return "Location";
      case "PreflightInvalidStatus":
        return "Status-Code";
      case "PreflightMissingPrivateNetworkAccessId":
        return "Private-Network-Access-Id";
      case "PreflightMissingPrivateNetworkAccessName":
        return "Private-Network-Access-Name";
    }
    return "";
  }
  static getProblemFromError(corsErrorStatus) {
    switch (corsErrorStatus.corsError) {
      case "InvalidAllowHeadersPreflightResponse":
      case "InvalidAllowMethodsPreflightResponse":
      case "PreflightInvalidAllowOriginValue":
      case "InvalidAllowOriginValue":
        return i18nString18(UIStrings18.problemInvalidValue);
      case "PreflightMultipleAllowOriginValues":
      case "MultipleAllowOriginValues":
        return i18nString18(UIStrings18.problemMultipleValues);
      case "MissingAllowOriginHeader":
      case "PreflightMissingAllowOriginHeader":
        return i18nString18(UIStrings18.problemMissingHeader);
      case "PreflightInvalidStatus":
        return i18nString18(UIStrings18.preflightInvalidStatus);
      case "PreflightDisallowedRedirect":
        return i18nString18(UIStrings18.preflightDisallowedRedirect);
      case "InvalidResponse":
        return i18nString18(UIStrings18.failedRequest);
    }
    throw new Error("Invalid Argument");
  }
  #appendDetail(issueCode, issue) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-directive");
    const details = issue.details();
    const corsErrorStatus = details.corsErrorStatus;
    const corsError = details.corsErrorStatus.corsError;
    const highlightHeader = {
      section: "Response",
      name: _CorsIssueDetailsView.getHeaderFromError(corsError)
    };
    const opts = {
      additionalOnClickAction() {
        Host6.userMetrics.issuesPanelResourceOpened(
          "Cors",
          "Request"
          /* AffectedItem.REQUEST */
        );
      }
    };
    switch (issueCode) {
      case "CorsIssue::InvalidHeaders":
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        if (corsError.includes("Preflight")) {
          element.appendChild(this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader }));
        } else {
          this.appendIssueDetailCell(element, "");
        }
        this.appendIssueDetailCell(element, _CorsIssueDetailsView.getHeaderFromError(corsError), "code-example");
        this.appendIssueDetailCell(element, _CorsIssueDetailsView.getProblemFromError(details.corsErrorStatus));
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        break;
      case "CorsIssue::WildcardOriginWithCredentials":
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        if (corsError.includes("Preflight")) {
          element.appendChild(this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader }));
        } else {
          this.appendIssueDetailCell(element, "");
        }
        break;
      case "CorsIssue::PreflightResponseInvalid": {
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        const specialHighlightHeader = corsError === "PreflightInvalidStatus" ? {
          section: "General",
          name: "Status-Code"
        } : highlightHeader;
        element.appendChild(this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader: specialHighlightHeader }));
        this.appendIssueDetailCell(element, _CorsIssueDetailsView.getProblemFromError(details.corsErrorStatus));
        break;
      }
      case "CorsIssue::OriginMismatch":
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        if (corsError.includes("Preflight")) {
          element.appendChild(this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader }));
        } else {
          this.appendIssueDetailCell(element, "");
        }
        this.appendIssueDetailCell(element, details.initiatorOrigin ?? "", "code-example");
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        break;
      case "CorsIssue::AllowCredentialsRequired":
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        if (corsError.includes("Preflight")) {
          element.appendChild(this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader }));
        } else {
          this.appendIssueDetailCell(element, "");
        }
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        break;
      case "CorsIssue::InsecurePrivateNetwork":
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        this.appendIssueDetailCell(element, details.resourceIPAddressSpace ?? "");
        this.appendIssueDetailCell(element, details.clientSecurityState?.initiatorIPAddressSpace ?? "");
        this.#appendSecureContextCell(element, details.clientSecurityState?.initiatorIsSecureContext);
        break;
      case "CorsIssue::PreflightAllowPrivateNetworkError": {
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        element.appendChild(this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader }));
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        this.appendIssueDetailCell(element, details.clientSecurityState?.initiatorIPAddressSpace ?? "");
        this.#appendSecureContextCell(element, details.clientSecurityState?.initiatorIsSecureContext);
        break;
      }
      case "CorsIssue::MethodDisallowedByPreflightResponse":
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        element.appendChild(this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader }));
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        break;
      case "CorsIssue::HeaderDisallowedByPreflightResponse":
        element.appendChild(this.createRequestCell(details.request, {
          ...opts,
          highlightHeader: {
            section: "Request",
            name: corsErrorStatus.failedParameter
          }
        }));
        this.#appendStatus(element, details.isWarning);
        element.appendChild(this.createRequestCell(details.request, {
          ...opts,
          linkToPreflight: true,
          highlightHeader: {
            section: "Response",
            name: "Access-Control-Allow-Headers"
          }
        }));
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        break;
      case "CorsIssue::RedirectContainsCredentials":
        element.appendChild(this.createRequestCell(details.request, {
          ...opts,
          highlightHeader: {
            section: "Response",
            name: _CorsIssueDetailsView.getHeaderFromError(corsError)
          }
        }));
        this.#appendStatus(element, details.isWarning);
        break;
      case "CorsIssue::DisallowedByMode":
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        this.appendIssueDetailCell(element, details.initiatorOrigin ?? "", "code-example");
        this.appendSourceLocation(element, details.location, issue.model()?.getTargetIfNotDisposed());
        break;
      case "CorsIssue::CorsDisabledScheme":
        element.appendChild(this.createRequestCell(details.request, {
          ...opts,
          highlightHeader: {
            section: "Response",
            name: _CorsIssueDetailsView.getHeaderFromError(corsError)
          }
        }));
        this.#appendStatus(element, details.isWarning);
        this.appendIssueDetailCell(element, details.initiatorOrigin ?? "", "code-example");
        this.appendSourceLocation(element, details.location, issue.model()?.getTargetIfNotDisposed());
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter ?? "", "code-example");
        break;
      case "CorsIssue::NoCorsRedirectModeNotFollow":
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        this.appendSourceLocation(element, details.location, issue.model()?.getTargetIfNotDisposed());
        break;
      case "CorsIssue::PreflightMissingPrivateNetworkAccessId":
      case "CorsIssue::PreflightMissingPrivateNetworkAccessName":
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        element.appendChild(this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader }));
        this.appendIssueDetailCell(element, _CorsIssueDetailsView.getHeaderFromError(corsError));
        this.appendIssueDetailCell(element, details.resourceIPAddressSpace ?? "");
        this.appendIssueDetailCell(element, details.clientSecurityState?.initiatorIPAddressSpace ?? "");
        this.#appendSecureContextCell(element, details.clientSecurityState?.initiatorIsSecureContext);
        break;
      default:
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        Platform3.assertUnhandled(issueCode);
        break;
    }
    this.affectedResources.appendChild(element);
  }
  update() {
    this.clear();
    const issues = this.issue.getCorsIssues();
    const issue = issues.values().next();
    if (issue.done) {
      this.updateAffectedResourceCount(0);
    } else {
      this.#appendDetails(issue.value.code(), issues);
    }
  }
};

// gen/front_end/panels/issues/GenericIssueDetailsView.js
import * as i18n37 from "./../../core/i18n/i18n.js";
var UIStrings19 = {
  /**
   *@description Label for number of affected resources indication in issue view
   */
  nResources: "{n, plural, =1 {# resource} other {# resources}}",
  /**
   *@description Title for the 'Frame' column.
   */
  frameId: "Frame",
  /**
   *@description Label for the violating node link in the issue view.
   */
  violatingNode: "Violating node"
};
var str_19 = i18n37.i18n.registerUIStrings("panels/issues/GenericIssueDetailsView.ts", UIStrings19);
var i18nString19 = i18n37.i18n.getLocalizedString.bind(void 0, str_19);
var GenericIssueDetailsView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString19(UIStrings19.nResources, { n: count });
  }
  #appendDetails(genericIssues) {
    const header = document.createElement("tr");
    const sampleIssueDetails = genericIssues.values().next().value?.details();
    if (sampleIssueDetails?.frameId) {
      this.appendColumnTitle(header, i18nString19(UIStrings19.frameId));
    }
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const genericIssue of genericIssues) {
      const hasAffectedResource = genericIssue.details().frameId || genericIssue.details().violatingNodeId;
      if (hasAffectedResource) {
        count++;
        void this.#appendDetail(genericIssue);
      }
    }
    this.updateAffectedResourceCount(count);
  }
  async #appendDetail(genericIssue) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-directive");
    const details = genericIssue.details();
    if (details.frameId) {
      element.appendChild(this.createFrameCell(details.frameId, genericIssue.getCategory()));
    }
    if (details.violatingNodeId) {
      const target = genericIssue.model()?.target() || null;
      element.appendChild(await this.createElementCell({ backendNodeId: details.violatingNodeId, nodeName: this.violatingNodeIdName(details.errorType), target }, genericIssue.getCategory()));
    }
    this.affectedResources.appendChild(element);
  }
  violatingNodeIdName(errorType) {
    switch (errorType) {
      case "FormLabelForNameError":
        return i18n37.i18n.lockedString("Label");
      default:
        return i18nString19(UIStrings19.violatingNode);
    }
  }
  update() {
    this.clear();
    const issues = this.issue.getGenericIssues();
    if (issues.size > 0) {
      this.#appendDetails(issues);
    } else {
      this.updateAffectedResourceCount(0);
    }
  }
};

// gen/front_end/panels/issues/IssueView.js
var UIStrings20 = {
  /**
   *@description Noun, singular. Label for a column or field containing the name of an entity.
   */
  name: "Name",
  /**
   *@description The kind of resolution for a mixed content issue
   */
  blocked: "blocked",
  /**
   *@description Label for a type of issue that can appear in the Issues view. Noun for singular or plural number of network requests.
   */
  nRequests: "{n, plural, =1 {# request} other {# requests}}",
  /**
   *@description Label for singular or plural number of affected resources in issue view
   */
  nResources: "{n, plural, =1 {# resource} other {# resources}}",
  /**
   *@description Label for mixed content issue's restriction status
   */
  restrictionStatus: "Restriction Status",
  /**
   * @description When there is a Heavy Ad, the browser can choose to deal with it in different ways.
   * This string indicates that the ad was only warned, and not removed.
   */
  warned: "Warned",
  /**
   *@description Header for the section listing affected resources
   */
  affectedResources: "Affected Resources",
  /**
   *@description Title for a link to further information in issue view
   *@example {SameSite Cookies Explained} PH1
   */
  learnMoreS: "Learn more: {PH1}",
  /**
   *@description The kind of resolution for a mixed content issue
   */
  automaticallyUpgraded: "automatically upgraded",
  /**
   *@description Menu entry for hiding a particular issue, in the Hide Issues context menu.
   */
  hideIssuesLikeThis: "Hide issues like this",
  /**
   *@description Menu entry for unhiding a particular issue, in the Hide Issues context menu.
   */
  unhideIssuesLikeThis: "Unhide issues like this"
};
var str_20 = i18n39.i18n.registerUIStrings("panels/issues/IssueView.ts", UIStrings20);
var i18nString20 = i18n39.i18n.getLocalizedString.bind(void 0, str_20);
var AffectedRequestsView = class extends AffectedResourcesView {
  #appendAffectedRequests(affectedRequests) {
    let count = 0;
    for (const affectedRequest of affectedRequests) {
      const element = document.createElement("tr");
      element.classList.add("affected-resource-request");
      const category = this.issue.getCategory();
      const tab = issueTypeToNetworkHeaderMap.get(category) || "headers-component";
      element.appendChild(this.createRequestCell(affectedRequest, {
        networkTab: tab,
        additionalOnClickAction() {
          Host7.userMetrics.issuesPanelResourceOpened(
            category,
            "Request"
            /* AffectedItem.REQUEST */
          );
        }
      }));
      this.affectedResources.appendChild(element);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
  getResourceNameWithCount(count) {
    return i18nString20(UIStrings20.nRequests, { n: count });
  }
  update() {
    this.clear();
    for (const unused of this.issue.getBlockedByResponseDetails()) {
      this.updateAffectedResourceCount(0);
      return;
    }
    if (this.issue.getCategory() === "MixedContent") {
      this.updateAffectedResourceCount(0);
      return;
    }
    this.#appendAffectedRequests(this.issue.requests());
  }
};
var issueTypeToNetworkHeaderMap = /* @__PURE__ */ new Map([
  [
    "Cookie",
    "cookies"
  ],
  [
    "CrossOriginEmbedderPolicy",
    "headers-component"
  ],
  [
    "MixedContent",
    "headers-component"
  ]
]);
var AffectedMixedContentView = class _AffectedMixedContentView extends AffectedResourcesView {
  #appendAffectedMixedContentDetails(mixedContentIssues) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString20(UIStrings20.name));
    this.appendColumnTitle(header, i18nString20(UIStrings20.restrictionStatus));
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const issue of mixedContentIssues) {
      const details = issue.getDetails();
      this.appendAffectedMixedContent(details);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
  getResourceNameWithCount(count) {
    return i18nString20(UIStrings20.nResources, { n: count });
  }
  appendAffectedMixedContent(mixedContent) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-mixed-content");
    if (mixedContent.request) {
      const networkTab = issueTypeToNetworkHeaderMap.get(this.issue.getCategory()) || "headers-component";
      element.appendChild(this.createRequestCell(mixedContent.request, {
        networkTab,
        additionalOnClickAction() {
          Host7.userMetrics.issuesPanelResourceOpened(
            "MixedContent",
            "Request"
            /* AffectedItem.REQUEST */
          );
        }
      }));
    } else {
      const filename = extractShortPath(mixedContent.insecureURL);
      const cell = this.appendIssueDetailCell(element, filename, "affected-resource-mixed-content-info");
      cell.title = mixedContent.insecureURL;
    }
    this.appendIssueDetailCell(element, _AffectedMixedContentView.translateStatus(mixedContent.resolutionStatus), "affected-resource-mixed-content-info");
    this.affectedResources.appendChild(element);
  }
  static translateStatus(resolutionStatus) {
    switch (resolutionStatus) {
      case "MixedContentBlocked":
        return i18nString20(UIStrings20.blocked);
      case "MixedContentAutomaticallyUpgraded":
        return i18nString20(UIStrings20.automaticallyUpgraded);
      case "MixedContentWarning":
        return i18nString20(UIStrings20.warned);
    }
  }
  update() {
    this.clear();
    this.#appendAffectedMixedContentDetails(this.issue.getMixedContentIssues());
  }
};
var IssueView = class _IssueView extends UI5.TreeOutline.TreeElement {
  #issue;
  #description;
  toggleOnClick;
  affectedResources;
  #affectedResourceViews;
  #aggregatedIssuesCount;
  #issueKindIcon = null;
  #hasBeenExpandedBefore;
  #throttle;
  #needsUpdateOnExpand = true;
  #hiddenIssuesMenu;
  #contentCreated = false;
  constructor(issue, description) {
    super();
    this.#issue = issue;
    this.#description = description;
    this.#throttle = new Common6.Throttler.Throttler(250);
    this.toggleOnClick = true;
    this.listItemElement.classList.add("issue");
    this.childrenListElement.classList.add("issue-body");
    this.childrenListElement.classList.add(_IssueView.getBodyCSSClass(this.#issue.getKind()));
    this.affectedResources = this.#createAffectedResources();
    this.#affectedResourceViews = [
      new AffectedCookiesView(this, this.#issue, "affected-cookies"),
      new AffectedElementsView(this, this.#issue, "affected-elements"),
      new AffectedRequestsView(this, this.#issue, "affected-requests"),
      new AffectedMixedContentView(this, this.#issue, "mixed-content-details"),
      new AffectedSourcesView(this, this.#issue, "affected-sources"),
      new AffectedHeavyAdView(this, this.#issue, "heavy-ad-details"),
      new AffectedDirectivesView(this, this.#issue, "directives-details"),
      new AffectedBlockedByResponseView(this, this.#issue, "blocked-by-response-details"),
      new AffectedSharedArrayBufferIssueDetailsView(this, this.#issue, "sab-details"),
      new AffectedElementsWithLowContrastView(this, this.#issue, "low-contrast-details"),
      new CorsIssueDetailsView(this, this.#issue, "cors-details"),
      new GenericIssueDetailsView(this, this.#issue, "generic-details"),
      new AffectedDocumentsInQuirksModeView(this, this.#issue, "affected-documents"),
      new AttributionReportingIssueDetailsView(this, this.#issue, "attribution-reporting-details"),
      new AffectedRawCookieLinesView(this, this.#issue, "affected-raw-cookies"),
      new AffectedTrackingSitesView(this, this.#issue, "tracking-sites-details"),
      new AffectedMetadataAllowedSitesView(this, this.#issue, "metadata-allowed-sites-details"),
      new AffectedDescendantsWithinSelectElementView(this, this.#issue, "disallowed-select-descendants-details"),
      new AffectedPartitioningBlobURLView(this, this.#issue, "partitioning-blob-url-details")
    ];
    this.#hiddenIssuesMenu = new Components4.HideIssuesMenu.HideIssuesMenu();
    this.#aggregatedIssuesCount = null;
    this.#hasBeenExpandedBefore = false;
  }
  /**
   * Sets the issue to take the resources from. Assumes that the description
   * this IssueView was initialized with fits the new issue as well, i.e.
   * title and issue description will not be updated.
   */
  setIssue(issue) {
    if (this.#issue !== issue) {
      this.#needsUpdateOnExpand = true;
    }
    this.#issue = issue;
    this.#affectedResourceViews.forEach((view) => view.setIssue(issue));
  }
  static getBodyCSSClass(issueKind) {
    switch (issueKind) {
      case "BreakingChange":
        return "issue-kind-breaking-change";
      case "PageError":
        return "issue-kind-page-error";
      case "Improvement":
        return "issue-kind-improvement";
    }
  }
  getIssueTitle() {
    return this.#description.title;
  }
  onattach() {
    if (!this.#contentCreated) {
      this.createContent();
      return;
    }
    this.update();
  }
  createContent() {
    this.#appendHeader();
    this.#createBody();
    this.appendChild(this.affectedResources);
    const visibleAffectedResource = [];
    for (const view of this.#affectedResourceViews) {
      this.appendAffectedResource(view);
      view.update();
      if (!view.isEmpty()) {
        visibleAffectedResource.push(view);
      }
    }
    this.#updateAffectedResourcesPositionAndSize(visibleAffectedResource);
    this.#createReadMoreLinks();
    this.updateAffectedResourceVisibility();
    this.#contentCreated = true;
  }
  appendAffectedResource(resource) {
    this.affectedResources.appendChild(resource);
  }
  #updateAffectedResourcesPositionAndSize(visibleAffectedResource) {
    for (let i = 0; i < visibleAffectedResource.length; i++) {
      const element = visibleAffectedResource[i].listItemElement;
      UI5.ARIAUtils.setPositionInSet(element, i + 1);
      UI5.ARIAUtils.setSetSize(element, visibleAffectedResource.length);
    }
  }
  #appendHeader() {
    const header = document.createElement("div");
    header.classList.add("header");
    this.#issueKindIcon = new IconButton3.Icon.Icon();
    this.#issueKindIcon.classList.add("leading-issue-icon");
    this.#aggregatedIssuesCount = document.createElement("span");
    const countAdorner = new Adorners2.Adorner.Adorner();
    countAdorner.data = {
      name: "countWrapper",
      content: this.#aggregatedIssuesCount
    };
    countAdorner.classList.add("aggregated-issues-count");
    header.appendChild(this.#issueKindIcon);
    header.appendChild(countAdorner);
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = this.#description.title;
    header.appendChild(title);
    if (this.#hiddenIssuesMenu) {
      header.appendChild(this.#hiddenIssuesMenu);
    }
    this.#updateFromIssue();
    this.listItemElement.appendChild(header);
  }
  onexpand() {
    const category = this.#issue.getCategory();
    if (category === "Cookie") {
      const cookieIssueSubCategory = IssuesManager11.CookieIssue.CookieIssue.getSubCategory(this.#issue.code());
      Host7.userMetrics.issuesPanelIssueExpanded(cookieIssueSubCategory);
    } else {
      Host7.userMetrics.issuesPanelIssueExpanded(category);
    }
    if (this.#needsUpdateOnExpand) {
      this.#doUpdate();
    }
    if (!this.#hasBeenExpandedBefore) {
      this.#hasBeenExpandedBefore = true;
      for (const view of this.#affectedResourceViews) {
        view.expandIfOneResource();
      }
    }
  }
  #updateFromIssue() {
    if (this.#issueKindIcon) {
      const kind = this.#issue.getKind();
      this.#issueKindIcon.data = IssueCounter3.IssueCounter.getIssueKindIconData(kind);
      this.#issueKindIcon.title = IssuesManager11.Issue.getIssueKindDescription(kind);
    }
    if (this.#aggregatedIssuesCount) {
      this.#aggregatedIssuesCount.textContent = `${this.#issue.getAggregatedIssuesCount()}`;
    }
    this.listItemElement.classList.toggle("hidden-issue", this.#issue.isHidden());
    if (this.#hiddenIssuesMenu) {
      const data = {
        menuItemLabel: this.#issue.isHidden() ? i18nString20(UIStrings20.unhideIssuesLikeThis) : i18nString20(UIStrings20.hideIssuesLikeThis),
        menuItemAction: () => {
          const setting = IssuesManager11.IssuesManager.getHideIssueByCodeSetting();
          const values = setting.get();
          values[this.#issue.code()] = this.#issue.isHidden() ? "Unhidden" : "Hidden";
          setting.set(values);
        }
      };
      this.#hiddenIssuesMenu.data = data;
    }
  }
  updateAffectedResourceVisibility() {
    const noResources = this.#affectedResourceViews.every((view) => view.isEmpty());
    this.affectedResources.hidden = noResources;
  }
  #createAffectedResources() {
    const wrapper = new UI5.TreeOutline.TreeElement();
    wrapper.setCollapsible(false);
    wrapper.setExpandable(true);
    wrapper.expand();
    wrapper.selectable = false;
    wrapper.listItemElement.classList.add("affected-resources-label");
    wrapper.listItemElement.textContent = i18nString20(UIStrings20.affectedResources);
    wrapper.childrenListElement.classList.add("affected-resources");
    UI5.ARIAUtils.setPositionInSet(wrapper.listItemElement, 2);
    UI5.ARIAUtils.setSetSize(wrapper.listItemElement, this.#description.links.length === 0 ? 2 : 3);
    return wrapper;
  }
  #createBody() {
    const messageElement = new UI5.TreeOutline.TreeElement();
    messageElement.setCollapsible(false);
    messageElement.selectable = false;
    const markdownComponent = new MarkdownView.MarkdownView.MarkdownView();
    markdownComponent.data = { tokens: this.#description.markdown };
    messageElement.listItemElement.appendChild(markdownComponent);
    UI5.ARIAUtils.setPositionInSet(messageElement.listItemElement, 1);
    UI5.ARIAUtils.setSetSize(messageElement.listItemElement, this.#description.links.length === 0 ? 2 : 3);
    this.appendChild(messageElement);
  }
  #createReadMoreLinks() {
    if (this.#description.links.length === 0) {
      return;
    }
    const linkWrapper = new UI5.TreeOutline.TreeElement();
    linkWrapper.setCollapsible(false);
    linkWrapper.listItemElement.classList.add("link-wrapper");
    UI5.ARIAUtils.setPositionInSet(linkWrapper.listItemElement, 3);
    UI5.ARIAUtils.setSetSize(linkWrapper.listItemElement, 3);
    const linkList = linkWrapper.listItemElement.createChild("ul", "link-list");
    for (const description of this.#description.links) {
      const link5 = UI5.Fragment.html`<x-link class="link devtools-link" tabindex="0" href=${description.link}>${i18nString20(UIStrings20.learnMoreS, { PH1: description.linkTitle })}</x-link>`;
      link5.setAttribute("jslog", `${VisualLogging5.link("learn-more").track({ click: true })}`);
      const linkListItem = linkList.createChild("li");
      linkListItem.appendChild(link5);
    }
    this.appendChild(linkWrapper);
  }
  #doUpdate() {
    if (this.expanded) {
      this.#affectedResourceViews.forEach((view) => view.update());
      this.updateAffectedResourceVisibility();
    }
    this.#needsUpdateOnExpand = !this.expanded;
    this.#updateFromIssue();
  }
  update() {
    void this.#throttle.schedule(async () => this.#doUpdate());
  }
  clear() {
    this.#affectedResourceViews.forEach((view) => view.clear());
  }
  getIssueKind() {
    return this.#issue.getKind();
  }
  isForHiddenIssue() {
    return this.#issue.isHidden();
  }
  toggle(expand) {
    if (expand || expand === void 0 && !this.expanded) {
      this.expand();
    } else {
      this.collapse();
    }
  }
};

// gen/front_end/panels/issues/IssuesPane.js
var UIStrings21 = {
  /**
   * @description Category title for a group of cross origin embedder policy (COEP) issues
   */
  crossOriginEmbedderPolicy: "Cross Origin Embedder Policy",
  /**
   * @description Category title for a group of mixed content issues
   */
  mixedContent: "Mixed Content",
  /**
   * @description Category title for a group of SameSite cookie issues
   */
  samesiteCookie: "SameSite Cookie",
  /**
   * @description Category title for a group of heavy ads issues
   */
  heavyAds: "Heavy Ads",
  /**
   * @description Category title for a group of content security policy (CSP) issues
   */
  contentSecurityPolicy: "Content Security Policy",
  /**
   * @description Text for other types of items
   */
  other: "Other",
  /**
   * @description Category title for the different 'low text contrast' issues. Low text contrast refers
   *              to the difference between the color of a text and the background color where that text
   *              appears.
   */
  lowTextContrast: "Low Text Contrast",
  /**
   * @description Category title for the different 'Cross-Origin Resource Sharing' (CORS) issues. CORS
   *              refers to one origin (e.g 'a.com') loading resources from another origin (e.g. 'b.com').
   */
  cors: "Cross Origin Resource Sharing",
  /**
   * @description Title for a checkbox which toggles grouping by category in the issues tab
   */
  groupDisplayedIssuesUnder: "Group displayed issues under associated categories",
  /**
   * @description Label for a checkbox which toggles grouping by category in the issues tab
   */
  groupByCategory: "Group by category",
  /**
   * @description Title for a checkbox which toggles grouping by kind in the issues tab
   */
  groupDisplayedIssuesUnderKind: "Group displayed issues as Page errors, Breaking changes and Improvements",
  /**
   * @description Label for a checkbox which toggles grouping by kind in the issues tab
   */
  groupByKind: "Group by kind",
  /**
   * @description Title for a checkbox. Whether the issues tab should include third-party issues or not.
   */
  includeCookieIssuesCausedBy: "Include cookie Issues caused by third-party sites",
  /**
   * @description Label for a checkbox. Whether the issues tab should include third-party issues or not.
   */
  includeThirdpartyCookieIssues: "Include third-party cookie issues",
  /**
   * @description Label on the issues tab
   */
  onlyThirdpartyCookieIssues: "Only third-party cookie issues detected",
  /**
   * @description Label in the issues panel
   */
  noIssues: "No issues detected",
  /**
   * @description Text that explains the issues panel that is shown if no issues are shown.
   */
  issuesPanelDescription: "On this page you can find warnings from the browser.",
  /**
   * @description Category title for the different 'Attribution Reporting API' issues. The
   * Attribution Reporting API is a newly proposed web API (see https://github.com/WICG/conversion-measurement-api).
   */
  attributionReporting: "Attribution Reporting `API`",
  /**
   * @description Category title for the different 'Quirks Mode' issues. Quirks Mode refers
   *              to the legacy browser modes that displays web content according to outdated
   *              browser behaviors.
   */
  quirksMode: "Quirks Mode",
  /**
   * @description Category title for the different 'Generic' issues.
   */
  generic: "Generic"
};
var str_21 = i18n41.i18n.registerUIStrings("panels/issues/IssuesPane.ts", UIStrings21);
var i18nString21 = i18n41.i18n.getLocalizedString.bind(void 0, str_21);
var ISSUES_PANEL_EXPLANATION_URL = "https://developer.chrome.com/docs/devtools/issues";
var IssueCategoryView = class extends UI6.TreeOutline.TreeElement {
  #category;
  constructor(category) {
    super();
    this.#category = category;
    this.toggleOnClick = true;
    this.listItemElement.classList.add("issue-category");
    this.childrenListElement.classList.add("issue-category-body");
  }
  getCategoryName() {
    switch (this.#category) {
      case "CrossOriginEmbedderPolicy":
        return i18nString21(UIStrings21.crossOriginEmbedderPolicy);
      case "MixedContent":
        return i18nString21(UIStrings21.mixedContent);
      case "Cookie":
        return i18nString21(UIStrings21.samesiteCookie);
      case "HeavyAd":
        return i18nString21(UIStrings21.heavyAds);
      case "ContentSecurityPolicy":
        return i18nString21(UIStrings21.contentSecurityPolicy);
      case "LowTextContrast":
        return i18nString21(UIStrings21.lowTextContrast);
      case "Cors":
        return i18nString21(UIStrings21.cors);
      case "AttributionReporting":
        return i18nString21(UIStrings21.attributionReporting);
      case "QuirksMode":
        return i18nString21(UIStrings21.quirksMode);
      case "Generic":
        return i18nString21(UIStrings21.generic);
      case "Other":
        return i18nString21(UIStrings21.other);
    }
  }
  onattach() {
    this.#appendHeader();
  }
  #appendHeader() {
    const header = document.createElement("div");
    header.classList.add("header");
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = this.getCategoryName();
    header.appendChild(title);
    this.listItemElement.appendChild(header);
  }
};
function getGroupIssuesByCategorySetting() {
  return Common7.Settings.Settings.instance().createSetting("group-issues-by-category", false);
}
var IssuesPane = class extends UI6.Widget.VBox {
  #categoryViews;
  #issueViews;
  #kindViews;
  #showThirdPartyCheckbox;
  #issuesTree;
  #hiddenIssuesRow;
  #noIssuesMessageDiv;
  #issuesManager;
  #aggregator;
  #issueViewUpdatePromise = Promise.resolve();
  constructor() {
    super({ useShadowDom: true });
    this.registerRequiredCSS(issuesPane_css_default);
    this.element.setAttribute("jslog", `${VisualLogging6.panel("issues")}`);
    this.contentElement.classList.add("issues-pane");
    this.#categoryViews = /* @__PURE__ */ new Map();
    this.#kindViews = /* @__PURE__ */ new Map();
    this.#issueViews = /* @__PURE__ */ new Map();
    this.#showThirdPartyCheckbox = null;
    this.#createToolbars();
    this.#issuesTree = new UI6.TreeOutline.TreeOutlineInShadow();
    this.#issuesTree.setShowSelectionOnKeyboardFocus(true);
    this.#issuesTree.contentElement.classList.add("issues");
    this.#issuesTree.registerRequiredCSS(issuesTree_css_default);
    this.contentElement.appendChild(this.#issuesTree.element);
    this.#hiddenIssuesRow = new HiddenIssuesRow();
    this.#issuesTree.appendChild(this.#hiddenIssuesRow);
    this.#noIssuesMessageDiv = new UI6.EmptyWidget.EmptyWidget("", i18nString21(UIStrings21.issuesPanelDescription));
    this.#noIssuesMessageDiv.link = ISSUES_PANEL_EXPLANATION_URL;
    this.#noIssuesMessageDiv.show(this.contentElement);
    this.#issuesManager = IssuesManager13.IssuesManager.IssuesManager.instance();
    this.#aggregator = new IssueAggregator(this.#issuesManager);
    this.#aggregator.addEventListener("AggregatedIssueUpdated", this.#issueUpdated, this);
    this.#aggregator.addEventListener("FullUpdateRequired", this.#onFullUpdate, this);
    this.#hiddenIssuesRow.hidden = this.#issuesManager.numberOfHiddenIssues() === 0;
    this.#onFullUpdate();
    this.#issuesManager.addEventListener("IssuesCountUpdated", this.#updateCounts, this);
  }
  elementsToRestoreScrollPositionsFor() {
    return [this.#issuesTree.element];
  }
  #createToolbars() {
    const toolbarContainer = this.contentElement.createChild("div", "issues-toolbar-container");
    toolbarContainer.setAttribute("jslog", `${VisualLogging6.toolbar()}`);
    toolbarContainer.role = "toolbar";
    const leftToolbar = toolbarContainer.createChild("devtools-toolbar", "issues-toolbar-left");
    leftToolbar.role = "presentation";
    const rightToolbar = toolbarContainer.createChild("devtools-toolbar", "issues-toolbar-right");
    rightToolbar.role = "presentation";
    const groupByCategorySetting = getGroupIssuesByCategorySetting();
    const groupByCategoryCheckbox = new UI6.Toolbar.ToolbarSettingCheckbox(groupByCategorySetting, i18nString21(UIStrings21.groupDisplayedIssuesUnder), i18nString21(UIStrings21.groupByCategory));
    groupByCategoryCheckbox.setVisible(false);
    rightToolbar.appendToolbarItem(groupByCategoryCheckbox);
    groupByCategorySetting.addChangeListener(() => {
      this.#fullUpdate(true);
    });
    const groupByKindSetting = getGroupIssuesByKindSetting();
    const groupByKindSettingCheckbox = new UI6.Toolbar.ToolbarSettingCheckbox(groupByKindSetting, i18nString21(UIStrings21.groupDisplayedIssuesUnderKind), i18nString21(UIStrings21.groupByKind));
    rightToolbar.appendToolbarItem(groupByKindSettingCheckbox);
    groupByKindSetting.addChangeListener(() => {
      this.#fullUpdate(true);
    });
    groupByKindSettingCheckbox.setVisible(true);
    const thirdPartySetting = IssuesManager13.Issue.getShowThirdPartyIssuesSetting();
    this.#showThirdPartyCheckbox = new UI6.Toolbar.ToolbarSettingCheckbox(thirdPartySetting, i18nString21(UIStrings21.includeCookieIssuesCausedBy), i18nString21(UIStrings21.includeThirdpartyCookieIssues));
    rightToolbar.appendToolbarItem(this.#showThirdPartyCheckbox);
    this.setDefaultFocusedElement(this.#showThirdPartyCheckbox.element);
    rightToolbar.appendSeparator();
    const issueCounter = new IssueCounter5.IssueCounter.IssueCounter();
    issueCounter.data = {
      clickHandler: () => {
        this.focus();
      },
      tooltipCallback: () => {
        const issueEnumeration = IssueCounter5.IssueCounter.getIssueCountsEnumeration(IssuesManager13.IssuesManager.IssuesManager.instance(), false);
        issueCounter.title = issueEnumeration;
      },
      displayMode: "ShowAlways",
      issuesManager: IssuesManager13.IssuesManager.IssuesManager.instance()
    };
    issueCounter.id = "console-issues-counter";
    issueCounter.setAttribute("jslog", `${VisualLogging6.counter("issues")}`);
    const issuesToolbarItem = new UI6.Toolbar.ToolbarItem(issueCounter);
    rightToolbar.appendToolbarItem(issuesToolbarItem);
    return { toolbarContainer };
  }
  #issueUpdated(event) {
    this.#scheduleIssueViewUpdate(event.data);
  }
  #scheduleIssueViewUpdate(issue) {
    this.#issueViewUpdatePromise = this.#issueViewUpdatePromise.then(() => this.#updateIssueView(issue));
  }
  /** Don't call directly. Use `scheduleIssueViewUpdate` instead. */
  async #updateIssueView(issue) {
    let issueView = this.#issueViews.get(issue.aggregationKey());
    if (!issueView) {
      const description = issue.getDescription();
      if (!description) {
        console.warn("Could not find description for issue code:", issue.code());
        return;
      }
      const markdownDescription = await IssuesManager13.MarkdownIssueDescription.createIssueDescriptionFromMarkdown(description);
      issueView = new IssueView(issue, markdownDescription);
      this.#issueViews.set(issue.aggregationKey(), issueView);
      const parent = this.#getIssueViewParent(issue);
      this.appendIssueViewToParent(issueView, parent);
    } else {
      issueView.setIssue(issue);
      const newParent = this.#getIssueViewParent(issue);
      if (issueView.parent !== newParent && !(newParent instanceof UI6.TreeOutline.TreeOutline && issueView.parent === newParent.rootElement())) {
        issueView.parent?.removeChild(issueView);
        this.appendIssueViewToParent(issueView, newParent);
      }
    }
    issueView.update();
    this.#updateCounts();
  }
  appendIssueViewToParent(issueView, parent) {
    parent.appendChild(issueView, (a, b) => {
      if (a instanceof HiddenIssuesRow) {
        return 1;
      }
      if (b instanceof HiddenIssuesRow) {
        return -1;
      }
      if (a instanceof IssueView && b instanceof IssueView) {
        return a.getIssueTitle().localeCompare(b.getIssueTitle());
      }
      console.error("The issues tree should only contain IssueView objects as direct children");
      return 0;
    });
    if (parent instanceof UI6.TreeOutline.TreeElement) {
      this.#updateItemPositionAndSize(parent);
    }
  }
  #updateItemPositionAndSize(parent) {
    const childNodes = parent.childrenListNode.children;
    let treeItemCount = 0;
    for (let i = 0; i < childNodes.length; i++) {
      const node = childNodes[i];
      if (node.classList.contains("issue")) {
        UI6.ARIAUtils.setPositionInSet(node, ++treeItemCount);
        UI6.ARIAUtils.setSetSize(node, childNodes.length / 2);
      }
    }
  }
  #getIssueViewParent(issue) {
    if (issue.isHidden()) {
      return this.#hiddenIssuesRow;
    }
    if (getGroupIssuesByKindSetting().get()) {
      const kind = issue.getKind();
      const view = this.#kindViews.get(kind);
      if (view) {
        return view;
      }
      const newView = new IssueKindView(kind);
      this.#issuesTree.appendChild(newView, (a, b) => {
        if (a instanceof IssueKindView && b instanceof IssueKindView) {
          return issueKindViewSortPriority(a, b);
        }
        return 0;
      });
      this.#kindViews.set(kind, newView);
      return newView;
    }
    if (getGroupIssuesByCategorySetting().get()) {
      const category = issue.getCategory();
      const view = this.#categoryViews.get(category);
      if (view) {
        return view;
      }
      const newView = new IssueCategoryView(category);
      this.#issuesTree.appendChild(newView, (a, b) => {
        if (a instanceof IssueCategoryView && b instanceof IssueCategoryView) {
          return a.getCategoryName().localeCompare(b.getCategoryName());
        }
        return 0;
      });
      this.#categoryViews.set(category, newView);
      return newView;
    }
    return this.#issuesTree;
  }
  #clearViews(views, preservedSet) {
    for (const [key, view] of Array.from(views.entries())) {
      if (preservedSet?.has(key)) {
        continue;
      }
      view.parent && view.parent.removeChild(view);
      views.delete(key);
    }
  }
  #onFullUpdate() {
    this.#fullUpdate(false);
  }
  #fullUpdate(force) {
    this.#clearViews(this.#categoryViews, force ? void 0 : this.#aggregator.aggregatedIssueCategories());
    this.#clearViews(this.#kindViews, force ? void 0 : this.#aggregator.aggregatedIssueKinds());
    this.#clearViews(this.#issueViews, force ? void 0 : this.#aggregator.aggregatedIssueCodes());
    if (this.#aggregator) {
      for (const issue of this.#aggregator.aggregatedIssues()) {
        this.#scheduleIssueViewUpdate(issue);
      }
    }
    this.#updateCounts();
  }
  #updateIssueKindViewsCount() {
    for (const view of this.#kindViews.values()) {
      const count = this.#issuesManager.numberOfIssues(view.getKind());
      view.update(count);
    }
  }
  #updateCounts() {
    this.#showIssuesTreeOrNoIssuesDetectedMessage(this.#issuesManager.numberOfIssues(), this.#issuesManager.numberOfHiddenIssues());
    if (getGroupIssuesByKindSetting().get()) {
      this.#updateIssueKindViewsCount();
    }
  }
  #showIssuesTreeOrNoIssuesDetectedMessage(issuesCount, hiddenIssueCount) {
    if (issuesCount > 0 || hiddenIssueCount > 0) {
      this.#hiddenIssuesRow.hidden = hiddenIssueCount === 0;
      this.#hiddenIssuesRow.update(hiddenIssueCount);
      this.#issuesTree.element.hidden = false;
      this.#noIssuesMessageDiv.hideWidget();
      const firstChild = this.#issuesTree.firstChild();
      if (firstChild) {
        firstChild.select(
          /* omitFocus= */
          true
        );
        this.setDefaultFocusedElement(firstChild.listItemElement);
      }
    } else {
      this.#issuesTree.element.hidden = true;
      if (this.#showThirdPartyCheckbox) {
        this.setDefaultFocusedElement(this.#showThirdPartyCheckbox.element);
      }
      const hasOnlyThirdPartyIssues = this.#issuesManager.numberOfAllStoredIssues() - this.#issuesManager.numberOfThirdPartyCookiePhaseoutIssues() > 0;
      this.#noIssuesMessageDiv.header = hasOnlyThirdPartyIssues ? i18nString21(UIStrings21.onlyThirdpartyCookieIssues) : i18nString21(UIStrings21.noIssues);
      this.#noIssuesMessageDiv.showWidget();
    }
  }
  async reveal(issue) {
    await this.#issueViewUpdatePromise;
    const key = this.#aggregator.keyForIssue(issue);
    const issueView = this.#issueViews.get(key);
    if (issueView) {
      if (issueView.isForHiddenIssue()) {
        this.#hiddenIssuesRow.expand();
        this.#hiddenIssuesRow.reveal();
      }
      if (getGroupIssuesByKindSetting().get() && !issueView.isForHiddenIssue()) {
        const kindView = this.#kindViews.get(issueView.getIssueKind());
        kindView?.expand();
        kindView?.reveal();
      }
      issueView.expand();
      issueView.reveal();
      issueView.select(false, true);
    }
  }
};

// gen/front_end/panels/issues/IssueRevealer.js
var IssueRevealer = class {
  async reveal(issue) {
    await UI7.ViewManager.ViewManager.instance().showView("issues-pane");
    const view = UI7.ViewManager.ViewManager.instance().view("issues-pane");
    if (view) {
      const issuesPane = await view.widget();
      if (issuesPane instanceof IssuesPane) {
        await issuesPane.reveal(issue);
      } else {
        throw new Error("Expected issues pane to be an instance of IssuesPane");
      }
    }
  }
};
export {
  IssueAggregator_exports as IssueAggregator,
  IssueRevealer_exports as IssueRevealer,
  IssueView_exports as IssueView,
  IssuesPane_exports as IssuesPane
};
//# sourceMappingURL=issues.js.map
