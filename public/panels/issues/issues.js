var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/panels/issues/AffectedLazyLoadImagesView.ts
var AffectedLazyLoadImagesView_exports = {};
__export(AffectedLazyLoadImagesView_exports, {
  AffectedLazyLoadImagesView: () => AffectedLazyLoadImagesView,
  DEFAULT_VIEW: () => DEFAULT_VIEW
});
import * as i18n3 from "../../core/i18n/i18n.js";
import { html, render as render2 } from "../../ui/lit/lit.js";

// ../../front_end/panels/issues/AffectedResourcesView.ts
import * as Common from "../../core/common/common.js";
import * as Host from "../../core/host/host.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as SDK from "../../core/sdk/sdk.js";
import * as Logs from "../../models/logs/logs.js";
import * as RequestLinkIcon from "../../ui/components/request_link_icon/request_link_icon.js";
import { Icon } from "../../ui/kit/kit.js";
import * as Components from "../../ui/legacy/components/utils/utils.js";
import * as UI from "../../ui/legacy/legacy.js";
import { render } from "../../ui/lit/lit.js";
import * as VisualLogging from "../../ui/visual_logging/visual_logging.js";
import * as PanelsCommon from "../common/common.js";
var UIStrings = {
  /**
   * @description Fallback text in the Issues panel when a frame URL is unknown in the affected resources table.
   */
  unknown: "Unknown",
  /**
   * @description Tooltip in the Issues panel for the button to reveal a frame's DOM node in the Elements panel.
   */
  clickToRevealTheFramesDomNodeIn: "Click to reveal the frame\u2019s DOM node in the Elements panel",
  /**
   * @description Fallback text in the Issues panel when an HTML element is unavailable in the affected resources table.
   */
  unavailable: "Unavailable"
};
var str_ = i18n.i18n.registerUIStrings("panels/issues/AffectedResourcesView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var extractShortPath = (path) => {
  return (/[^/]+$/.exec(path) || /[^/]+\/$/.exec(path) || [""])[0];
};
var AffectedResourcesView = class extends UI.TreeOutline.TreeElement {
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
    this.requestResolver = new Logs.RequestResolver.RequestResolver(Logs.NetworkLog.NetworkLog.instance());
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
    const body = new UI.TreeOutline.TreeElement();
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
    if (!frame?.url) {
      this.#unresolvedFrameIds.add(frameId);
      if (!this.#frameListeners.length) {
        const addListener = SDK.FrameManager.FrameManager.instance().addEventListener(
          SDK.FrameManager.Events.FRAME_ADDED_TO_TARGET,
          this.#onFrameChanged,
          this
        );
        const navigateListener = SDK.FrameManager.FrameManager.instance().addEventListener(
          SDK.FrameManager.Events.FRAME_NAVIGATED,
          this.#onFrameChanged,
          this
        );
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
      Common.EventTarget.removeEventListeners(this.#frameListeners);
      this.#frameListeners = [];
    }
    if (frameWasUnresolved) {
      this.update();
    }
  }
  createFrameCell(frameId, issueCategory) {
    const frame = this.#resolveFrameId(frameId);
    const url = frame && (frame.unreachableUrl() || frame.url) || i18nString(UIStrings.unknown);
    const frameCell = document.createElement("td");
    frameCell.classList.add("affected-resource-cell");
    if (frame) {
      const icon = new Icon();
      icon.name = "code-circle";
      icon.classList.add("link", "elements-panel", "medium");
      icon.onclick = async () => {
        Host.userMetrics.issuesPanelResourceOpened(issueCategory, "Element" /* ELEMENT */);
        const frame2 = SDK.FrameManager.FrameManager.instance().getFrame(frameId);
        if (frame2) {
          const ownerNode = await frame2.getOwnerDOMNodeOrDocument();
          if (ownerNode) {
            void Common.Revealer.reveal(ownerNode);
          }
        }
      };
      icon.title = i18nString(UIStrings.clickToRevealTheFramesDomNodeIn);
      frameCell.appendChild(icon);
    }
    frameCell.appendChild(document.createTextNode(url));
    frameCell.onmouseenter = () => {
      const frame2 = SDK.FrameManager.FrameManager.instance().getFrame(frameId);
      if (frame2) {
        void frame2.highlight();
      }
    };
    frameCell.onmouseleave = () => SDK.OverlayModel.OverlayModel.hideDOMNodeHighlight(SDK.TargetManager.TargetManager.instance());
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
      cellElement2.textContent = nodeName || i18nString(UIStrings.unavailable);
      return cellElement2;
    }
    function sendTelemetry() {
      Host.userMetrics.issuesPanelResourceOpened(issueCategory, "Element" /* ELEMENT */);
    }
    const deferredDOMNode = new SDK.DOMModel.DeferredDOMNode(target, backendNodeId);
    const anchor = PanelsCommon.DOMLinkifier.Linkifier.instance().linkify(
      deferredDOMNode,
      { textContent: nodeName || void 0, onClick: sendTelemetry }
    );
    const cellElement = document.createElement("td");
    cellElement.classList.add("affected-resource-element", "devtools-link");
    render(anchor, cellElement);
    return cellElement;
  }
  appendSourceLocation(element, sourceLocation, target) {
    const sourceCodeLocation = document.createElement("td");
    sourceCodeLocation.classList.add("affected-source-location");
    if (sourceLocation) {
      const linkifier = new Components.Linkifier.Linkifier(UI.UIUtils.MaxLengthForDisplayedURLsInConsole);
      const sourceAnchor = linkifier.linkifyScriptLocation(
        target || null,
        sourceLocation.scriptId || null,
        sourceLocation.url,
        sourceLocation.lineNumber,
        { columnNumber: sourceLocation.columnNumber }
      );
      sourceAnchor.setAttribute("jslog", `${VisualLogging.link("source-location").track({ click: true })}`);
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

// ../../front_end/panels/issues/AffectedLazyLoadImagesView.ts
var UIStrings2 = {
  /**
   * @description Label in the Issues panel for the number of affected elements for lazy-load image issues.
   */
  nElements: "{n, plural, =1 {# element} other {# elements}}"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/issues/AffectedLazyLoadImagesView.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var DEFAULT_VIEW = async (input, _output, target) => {
  const templates = [];
  for (const issue of input.issues) {
    for (const element of issue.elements()) {
      templates.push(html`<tr>
        ${await input.createElementCell(element, input.issueCategory)}
      </tr>`);
    }
  }
  render2(html`${templates}`, target);
};
var AffectedLazyLoadImagesView = class extends AffectedResourcesView {
  #view;
  constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
    super(parent, issue, jslogContext);
    this.#view = view;
  }
  update() {
    this.requestResolver.clear();
    void this.#render();
  }
  getResourceNameWithCount(count) {
    return i18nString2(UIStrings2.nElements, { n: count });
  }
  async #render() {
    const issues = this.issue.getLazyLoadImageIssues();
    let count = 0;
    for (const issue of issues) {
      count += issue.elementCount();
    }
    this.updateAffectedResourceCount(count);
    const input = {
      issues,
      issueCategory: this.issue.getCategory(),
      createElementCell: this.createElementCell.bind(this)
    };
    await this.#view(input, {}, this.affectedResources);
  }
};

// ../../front_end/panels/issues/AffectedSelectivePermissionsInterventionView.ts
var AffectedSelectivePermissionsInterventionView_exports = {};
__export(AffectedSelectivePermissionsInterventionView_exports, {
  AffectedSelectivePermissionsInterventionView: () => AffectedSelectivePermissionsInterventionView
});
import * as i18n5 from "../../core/i18n/i18n.js";
import * as Bindings from "../../models/bindings/bindings.js";
import * as Components2 from "../../ui/legacy/components/utils/utils.js";
import * as UI2 from "../../ui/legacy/legacy.js";
import { Directives, html as html2, nothing, render as render3 } from "../../ui/lit/lit.js";
var UIStrings3 = {
  /**
   * @description Label in the Issues panel for the number of affected violations in the selective permissions intervention table.
   */
  nViolations: "{n, plural, =1 {# violation} other {# violations}}",
  /**
   * @description Column header in the Issues panel for API names in the selective permissions intervention affected resources table.
   */
  api: "API",
  /**
   * @description Column header in the Issues panel for scripts in the selective permissions intervention affected resources table.
   */
  script: "Script",
  /**
   * @description Column header in the Issues panel for ad ancestry in the selective permissions intervention affected resources table.
   */
  adAncestry: "Ad ancestry",
  /**
   * @description Fallback text in the Issues panel when a stack trace is unknown in the selective permissions intervention affected resources table.
   */
  unknown: "Unknown",
  /**
   * @description Text in the Issues panel displayed while a stack trace is loading in the selective permissions intervention affected resources table.
   */
  loading: "Loading\u2026"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/issues/AffectedSelectivePermissionsInterventionView.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var { widget } = UI2.Widget;
var AffectedSelectivePermissionsInterventionView = class extends AffectedResourcesView {
  #linkifier = new Components2.Linkifier.Linkifier();
  getResourceNameWithCount(count) {
    return i18nString3(UIStrings3.nViolations, { n: count });
  }
  #render() {
    const issues = Array.from(this.issue.getSelectivePermissionsInterventionIssues());
    render3(
      html2`
      <tr>
        <td class="affected-resource-header">${i18nString3(UIStrings3.api)}</td>
        <td class="affected-resource-header">${i18nString3(UIStrings3.script)}</td>
        <td class="affected-resource-header">${i18nString3(UIStrings3.adAncestry)}</td>
      </tr>
      ${issues.map((issue) => this.#renderDetail(issue))}
    `,
      this.affectedResources,
      { host: this }
    );
    this.updateAffectedResourceCount(issues.length);
  }
  #renderDetail(issue) {
    const details = issue.details();
    const issuesModel = issue.model();
    const stackTracePromise = details.stackTrace && issuesModel ? this.#resolveStackTrace(details.stackTrace, issuesModel) : Promise.resolve(html2`<span>${i18nString3(UIStrings3.unknown)}</span>`);
    const target = issuesModel ? issuesModel.target() : null;
    return html2`
      <tr class="affected-resource-directive">
        <td>${details.apiName}</td>
        <td>${Directives.until(stackTracePromise, html2`<span>${i18nString3(UIStrings3.loading)}</span>`)}</td>
        <td class="affected-resource-cell">
          <div class="ad-ancestry-list">
            ${(details.adAncestry?.ancestryChain || []).map((script) => {
      const link4 = this.#linkifier.linkifyScriptLocation(target, script.scriptId, "", 0);
      return html2`<div>${link4}</div>`;
    })}
            ${details.adAncestry?.rootScriptFilterlistRule ? html2`<div>Rule: ${details.adAncestry.rootScriptFilterlistRule}</div>` : nothing}
          </div>
        </td>
      </tr>
    `;
  }
  async #resolveStackTrace(stackTrace, issuesModel) {
    const debuggerWorkspaceBinding = Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
    const stackTraceTranslated = await debuggerWorkspaceBinding.createStackTraceFromProtocolRuntime(stackTrace, issuesModel.target());
    return html2`${widget(Components2.JSPresentationUtils.StackTracePreviewContent, {
      stackTrace: stackTraceTranslated,
      options: { expandable: true }
    })}`;
  }
  update() {
    this.requestResolver.clear();
    this.#linkifier.reset();
    this.#render();
  }
};

// ../../front_end/panels/issues/IssueRevealer.ts
var IssueRevealer_exports = {};
__export(IssueRevealer_exports, {
  IssueRevealer: () => IssueRevealer
});
import * as UI7 from "../../ui/legacy/legacy.js";

// ../../front_end/panels/issues/IssuesPane.ts
var IssuesPane_exports = {};
__export(IssuesPane_exports, {
  IssuesPane: () => IssuesPane,
  getGroupIssuesByCategorySetting: () => getGroupIssuesByCategorySetting
});
import "../../ui/legacy/legacy.js";
import * as Common6 from "../../core/common/common.js";
import * as i18n43 from "../../core/i18n/i18n.js";
import * as Platform5 from "../../core/platform/platform.js";
import * as IssuesManager11 from "../../models/issues_manager/issues_manager.js";
import * as IssueCounter5 from "../../ui/components/issue_counter/issue_counter.js";
import * as UI6 from "../../ui/legacy/legacy.js";
import * as VisualLogging7 from "../../ui/visual_logging/visual_logging.js";

// ../../front_end/panels/issues/HiddenIssuesRow.ts
import "../../ui/components/adorners/adorners.js";
import * as i18n7 from "../../core/i18n/i18n.js";
import * as IssuesManager from "../../models/issues_manager/issues_manager.js";
import * as Buttons from "../../ui/components/buttons/buttons.js";
import * as UI3 from "../../ui/legacy/legacy.js";
import { html as html3, render as render4 } from "../../ui/lit/lit.js";
import * as VisualLogging2 from "../../ui/visual_logging/visual_logging.js";
var UIStrings4 = {
  /**
   * @description Title in the Issues panel for the hidden issues row.
   */
  hiddenIssues: "Hidden issues",
  /**
   * @description Label in the Issues panel for the button to unhide all hidden issues.
   */
  unhideAll: "Unhide all"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/issues/HiddenIssuesRow.ts", UIStrings4);
var i18nString4 = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var DEFAULT_VIEW2 = (input, _output, target) => {
  const stopPropagationForEnter = (event) => {
    if (event.key === "Enter") {
      event.stopImmediatePropagation();
    }
  };
  render4(html3`
  <div class="header">
    <devtools-adorner class="aggregated-issues-count" .name=${"countWrapper"}>
      <span>${input.count}</span>
    </devtools-adorner>
    <div class="title">${i18nString4(UIStrings4.hiddenIssues)}</div>
    <devtools-button class="unhide-all-issues-button"
                     jslog=${VisualLogging2.action().track({ click: true }).context("issues.unhide-all-hiddes")}
                     @click=${input.onUnhideAllIssues}
                     @keydown=${stopPropagationForEnter}
                     .variant=${Buttons.Button.Variant.OUTLINED}>${i18nString4(UIStrings4.unhideAll)}</devtools-button>
  </div>`, target);
};
var HiddenIssuesRow = class extends UI3.TreeOutline.TreeElement {
  #view;
  constructor(view = DEFAULT_VIEW2) {
    super(void 0, true, "hidden-issues");
    this.#view = view;
    this.toggleOnClick = true;
    this.listItemElement.classList.add("issue-category", "hidden-issues");
    this.childrenListElement.classList.add("hidden-issues-body");
    this.update(0);
  }
  update(count) {
    const issuesManager = IssuesManager.IssuesManager.IssuesManager.instance();
    const onUnhideAllIssues = issuesManager.unhideAllIssues.bind(issuesManager);
    const input = {
      count,
      onUnhideAllIssues
    };
    const output = void 0;
    this.#view(input, output, this.listItemElement);
  }
};

// ../../front_end/panels/issues/IssueKindView.ts
import * as Common2 from "../../core/common/common.js";
import * as i18n9 from "../../core/i18n/i18n.js";
import * as Platform from "../../core/platform/platform.js";
import * as IssuesManager3 from "../../models/issues_manager/issues_manager.js";
import * as Adorners from "../../ui/components/adorners/adorners.js";
import * as IssueCounter from "../../ui/components/issue_counter/issue_counter.js";
import { Icon as Icon2 } from "../../ui/kit/kit.js";
import * as UI4 from "../../ui/legacy/legacy.js";
import * as Components3 from "./components/components.js";
var UIStrings5 = {
  /**
   * @description Context menu item in the Issues panel to hide all current page errors.
   */
  hideAllCurrentPageErrors: "Hide all current page errors",
  /**
   * @description Context menu item in the Issues panel to hide all current breaking changes.
   */
  hideAllCurrentBreakingChanges: "Hide all current breaking changes",
  /**
   * @description Context menu item in the Issues panel to hide all current improvements.
   */
  hideAllCurrentImprovements: "Hide all current improvements"
};
var str_5 = i18n9.i18n.registerUIStrings("panels/issues/IssueKindView.ts", UIStrings5);
var i18nString5 = i18n9.i18n.getLocalizedString.bind(void 0, str_5);
function getGroupIssuesByKindSetting() {
  return Common2.Settings.Settings.instance().createSetting("group-issues-by-kind", false);
}
function issueKindViewSortPriority(a, b) {
  if (a.getKind() === b.getKind()) {
    return 0;
  }
  if (a.getKind() === IssuesManager3.Issue.IssueKind.PAGE_ERROR) {
    return -1;
  }
  if (a.getKind() === IssuesManager3.Issue.IssueKind.BREAKING_CHANGE && b.getKind() === IssuesManager3.Issue.IssueKind.IMPROVEMENT) {
    return -1;
  }
  return 1;
}
function getClassNameFromKind(kind) {
  switch (kind) {
    case IssuesManager3.Issue.IssueKind.BREAKING_CHANGE:
      return "breaking-changes";
    case IssuesManager3.Issue.IssueKind.IMPROVEMENT:
      return "improvements";
    case IssuesManager3.Issue.IssueKind.PAGE_ERROR:
      return "page-errors";
  }
}
var IssueKindView = class extends UI4.TreeOutline.TreeElement {
  #kind;
  #issueCount;
  constructor(kind) {
    super(void 0, true, Platform.StringUtilities.toKebabCase(kind));
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
      case IssuesManager3.Issue.IssueKind.PAGE_ERROR:
        return i18nString5(UIStrings5.hideAllCurrentPageErrors);
      case IssuesManager3.Issue.IssueKind.IMPROVEMENT:
        return i18nString5(UIStrings5.hideAllCurrentImprovements);
      case IssuesManager3.Issue.IssueKind.BREAKING_CHANGE:
        return i18nString5(UIStrings5.hideAllCurrentBreakingChanges);
    }
  }
  #appendHeader() {
    const header = document.createElement("div");
    header.classList.add("header");
    const issueKindIcon = new Icon2();
    issueKindIcon.name = IssueCounter.IssueCounter.getIssueKindIconName(this.#kind);
    issueKindIcon.classList.add("leading-issue-icon", "extra-large");
    const countAdorner = new Adorners.Adorner.Adorner();
    countAdorner.name = "countWrapper";
    countAdorner.append(this.#issueCount);
    countAdorner.classList.add("aggregated-issues-count");
    this.#issueCount.textContent = "0";
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = IssuesManager3.Issue.getIssueKindName(this.#kind);
    const hideAvailableIssuesBtn = new Components3.HideIssuesMenu.HideIssuesMenu();
    hideAvailableIssuesBtn.classList.add("hide-available-issues");
    hideAvailableIssuesBtn.data = {
      menuItemLabel: this.getHideAllCurrentKindString(),
      menuItemAction: () => {
        const setting = IssuesManager3.IssuesManager.getHideIssueByCodeSetting();
        const values = setting.get();
        for (const issue of IssuesManager3.IssuesManager.IssuesManager.instance().issues()) {
          if (issue.getKind() === this.#kind) {
            values[issue.code()] = IssuesManager3.IssuesManager.IssueStatus.HIDDEN;
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
 * Copyright 2020 The Chromium Authors
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
  border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
}

.issues-toolbar-left {
  flex: 1 1 auto;
}

.issues-toolbar-right {
  padding-right: var(--sys-size-4);
}

/*# sourceURL=${import.meta.resolve("./issuesPane.css")} */`;

// gen/front_end/panels/issues/issuesTree.css.js
var issuesTree_css_default = `/*
 * Copyright 2020 The Chromium Authors
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
  --issue-indent: var(--sys-size-5);
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
  padding: 0 var(--sys-size-5);
  padding-left: var(--issue-indent);
  overflow: hidden;
  flex: none;
  transition: background-color 200ms;
  border: var(--sys-size-1) solid var(--sys-color-divider);
  border-width: 0 0 var(--sys-size-1);
}

.issue-category.hidden-issues.parent.expanded,
.issue-kind.parent.expanded {
  border-width: 0 0 var(--sys-size-1);
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
  margin-block: var(--sys-size-2);
}

/* Override selected tree item styles for issues to avoid changing width. */
.tree-outline-disclosure:not(.tree-outline-disclosure-hide-overflow) .tree-outline.hide-selection-when-blurred .issue-category.selected:focus-visible,
.tree-outline-disclosure:not(.tree-outline-disclosure-hide-overflow) .tree-outline.hide-selection-when-blurred .issue-kind.selected:focus-visible,
.tree-outline-disclosure:not(.tree-outline-disclosure-hide-overflow) .tree-outline.hide-selection-when-blurred .issue.selected:focus-visible {
  width: auto;
  padding-right: var(--sys-size-5);
}

.header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: var(--sys-size-3) 0;
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
  font-size: var(--sys-typescale-body4-size);
  color: var(--sys-color-on-surface);
  font-weight: normal;
  user-select: text;
  padding-top: var(--sys-size-2);
}

.issue.expanded .title {
  font-weight: 450;
}

.issue-body.children {
  border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
  padding: var(--sys-size-4) 0;
  position: relative;
  padding-left: calc(var(--issue-indent) + 43px);
  padding-bottom: 26px;
  padding-right: var(--sys-size-5);
}

.issue-category + .children,
.issue-kind + .children {
  --issue-indent: var(--sys-size-11);

  padding-left: 0;
}

/* Show a colored border on the left side of opened issues. */
.issue-body::before {
  content: "";
  display: block;
  position: absolute;
  left: calc(var(--issue-indent) + 23px);
  top: 0;
  bottom: var(--sys-size-9);
  width: var(--sys-size-2);
}

.issue-kind-breaking-change.issue-body::before {
  border-left: var(--sys-size-2) solid var(--issue-color-yellow);
}

.issue-kind-page-error.issue-body::before {
  border-left: var(--sys-size-2) solid var(--issue-color-red);
}

.issue-kind-improvement.issue-body::before {
  border-left: var(--sys-size-2) solid var(--issue-color-blue);
}

.tree-outline .issue-body li:hover:not(:has(devtools-checkbox)) .selection {
  background-color: unset;
}

devtools-icon.leading-issue-icon {
  margin: var(--sys-size-1) 0 calc(-1 * var(--sys-size-1)) 7px;
}

.message {
  line-height: 18px;
  font-size: var(--sys-typescale-body4-size);
  color: var(--sys-color-token-subtle);
  margin-bottom: var(--sys-size-3);
  user-select: text;
}

.message p {
  margin-bottom: var(--sys-size-8);
}

.message li {
  margin-top: var(--sys-size-5);
}

.message code {
  color: var(--sys-color-on-surface);
  padding: 0 var(--sys-size-2);
  font-size: var(--sys-typescale-body4-size);
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
  font-size: var(--sys-typescale-body4-size);
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
  top: calc(-1 * var(--sys-size-1));
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
  font-size: var(--sys-typescale-body4-size);
  line-height: 18px;
  color: var(--sys-color-on-surface);
  position: relative;
  cursor: pointer;
}

.affected-resource-cookie {
  font-size: var(--sys-typescale-body4-size);
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
}

.affected-resource-element {
  font-size: var(--sys-typescale-body4-size);
  line-height: 18px;
  color: var(--sys-color-primary);
  border: 0;
  border-collapse: collapse;
}

.affected-resource-row {
  font-size: var(--sys-typescale-body4-size);
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
  vertical-align: top;
}

.affected-resource-mixed-content {
  font-size: var(--sys-typescale-body4-size);
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
}

.affected-resource-heavy-ad {
  font-size: var(--sys-typescale-body4-size);
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
}

.affected-resource-request {
  font-size: var(--sys-typescale-body4-size);
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
}

.affected-resource-source {
  font-size: var(--sys-typescale-body4-size);
  line-height: 18px;
  color: var(--sys-color-primary);
  border: 0;
  border-collapse: collapse;
}

.affected-resource-list {
  border-spacing: 10px 0;
  margin-left: calc(-1 * var(--sys-size-6));
}

.affected-resource-header {
  font-size: var(--sys-typescale-body4-size);
  color: var(--sys-color-on-surface);
  padding-left: var(--sys-size-2);
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
  padding: var(--sys-size-2);
  text-align: right;
}

.affected-resource-cookie-info-header {
  text-align: right;
}

.affected-resource-mixed-content-info {
  color: var(--sys-color-token-subtle);
  padding: var(--sys-size-2);
}

.affected-resource-heavy-ad-info {
  color: var(--sys-color-token-subtle);
  padding: var(--sys-size-2);
}

.affected-resource-heavy-ad-info-frame {
  display: flex;
  align-items: center;
  color: var(--sys-color-token-subtle);
  padding: var(--sys-size-2);
}

.affected-resource-cell {
  color: var(--sys-color-token-subtle);
  padding: var(--sys-size-2);
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
  padding: var(--sys-size-2) 5px 0;
}

.affected-resources > .parent.expanded {
  background: var(--sys-color-cdt-base-container);
}

.affected-resources > .children.expanded {
  background: var(--sys-color-cdt-base-container);
  padding: var(--sys-size-4) 0 9px 5px;
}

.aggregated-issues-count {
  padding: 3px 7px 0;
}

.affected-resource-directive-info-header {
  text-align: left;
}

.affected-resource-directive {
  font-size: var(--sys-typescale-body4-size);
  line-height: 18px;
  border: 0;
  border-collapse: collapse;
}

.affected-resource-directive-info {
  color: var(--sys-color-token-subtle);
  padding: var(--sys-size-2);
  text-align: left;
}

.devtools-link {
  padding-top: var(--sys-size-3);
}

devtools-icon.link-icon {
  vertical-align: sub;
  margin-right: 0.5ch;
}

devtools-icon.elements-panel,
devtools-icon.network-panel {
  margin-right: 0.5ex;
  vertical-align: baseline;
  height: var(--sys-size-7);
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

// ../../front_end/panels/issues/IssueView.ts
var IssueView_exports = {};
__export(IssueView_exports, {
  IssueView: () => IssueView
});
import * as Common5 from "../../core/common/common.js";
import * as Host6 from "../../core/host/host.js";
import * as i18n41 from "../../core/i18n/i18n.js";
import * as Platform4 from "../../core/platform/platform.js";

// ../../front_end/generated/protocol.ts
var Accessibility;
((Accessibility2) => {
  let AXValueType;
  ((AXValueType2) => {
    AXValueType2["Boolean"] = "boolean";
    AXValueType2["Tristate"] = "tristate";
    AXValueType2["BooleanOrUndefined"] = "booleanOrUndefined";
    AXValueType2["Idref"] = "idref";
    AXValueType2["IdrefList"] = "idrefList";
    AXValueType2["Integer"] = "integer";
    AXValueType2["Node"] = "node";
    AXValueType2["NodeList"] = "nodeList";
    AXValueType2["Number"] = "number";
    AXValueType2["String"] = "string";
    AXValueType2["ComputedString"] = "computedString";
    AXValueType2["Token"] = "token";
    AXValueType2["TokenList"] = "tokenList";
    AXValueType2["DomRelation"] = "domRelation";
    AXValueType2["Role"] = "role";
    AXValueType2["InternalRole"] = "internalRole";
    AXValueType2["ValueUndefined"] = "valueUndefined";
  })(AXValueType = Accessibility2.AXValueType || (Accessibility2.AXValueType = {}));
  let AXValueSourceType;
  ((AXValueSourceType2) => {
    AXValueSourceType2["Attribute"] = "attribute";
    AXValueSourceType2["Implicit"] = "implicit";
    AXValueSourceType2["Style"] = "style";
    AXValueSourceType2["Contents"] = "contents";
    AXValueSourceType2["Placeholder"] = "placeholder";
    AXValueSourceType2["RelatedElement"] = "relatedElement";
  })(AXValueSourceType = Accessibility2.AXValueSourceType || (Accessibility2.AXValueSourceType = {}));
  let AXValueNativeSourceType;
  ((AXValueNativeSourceType2) => {
    AXValueNativeSourceType2["Description"] = "description";
    AXValueNativeSourceType2["Figcaption"] = "figcaption";
    AXValueNativeSourceType2["Label"] = "label";
    AXValueNativeSourceType2["Labelfor"] = "labelfor";
    AXValueNativeSourceType2["Labelwrapped"] = "labelwrapped";
    AXValueNativeSourceType2["Legend"] = "legend";
    AXValueNativeSourceType2["Rubyannotation"] = "rubyannotation";
    AXValueNativeSourceType2["Tablecaption"] = "tablecaption";
    AXValueNativeSourceType2["Title"] = "title";
    AXValueNativeSourceType2["Other"] = "other";
  })(AXValueNativeSourceType = Accessibility2.AXValueNativeSourceType || (Accessibility2.AXValueNativeSourceType = {}));
  let AXPropertyName;
  ((AXPropertyName2) => {
    AXPropertyName2["Actions"] = "actions";
    AXPropertyName2["Busy"] = "busy";
    AXPropertyName2["Disabled"] = "disabled";
    AXPropertyName2["Editable"] = "editable";
    AXPropertyName2["Focusable"] = "focusable";
    AXPropertyName2["Focused"] = "focused";
    AXPropertyName2["Hidden"] = "hidden";
    AXPropertyName2["HiddenRoot"] = "hiddenRoot";
    AXPropertyName2["Invalid"] = "invalid";
    AXPropertyName2["Keyshortcuts"] = "keyshortcuts";
    AXPropertyName2["Settable"] = "settable";
    AXPropertyName2["Roledescription"] = "roledescription";
    AXPropertyName2["Live"] = "live";
    AXPropertyName2["Atomic"] = "atomic";
    AXPropertyName2["Relevant"] = "relevant";
    AXPropertyName2["Root"] = "root";
    AXPropertyName2["Autocomplete"] = "autocomplete";
    AXPropertyName2["HasPopup"] = "hasPopup";
    AXPropertyName2["Level"] = "level";
    AXPropertyName2["Multiselectable"] = "multiselectable";
    AXPropertyName2["Orientation"] = "orientation";
    AXPropertyName2["Multiline"] = "multiline";
    AXPropertyName2["Readonly"] = "readonly";
    AXPropertyName2["Required"] = "required";
    AXPropertyName2["Valuemin"] = "valuemin";
    AXPropertyName2["Valuemax"] = "valuemax";
    AXPropertyName2["Valuetext"] = "valuetext";
    AXPropertyName2["Checked"] = "checked";
    AXPropertyName2["Expanded"] = "expanded";
    AXPropertyName2["Modal"] = "modal";
    AXPropertyName2["Pressed"] = "pressed";
    AXPropertyName2["Selected"] = "selected";
    AXPropertyName2["Activedescendant"] = "activedescendant";
    AXPropertyName2["Controls"] = "controls";
    AXPropertyName2["Describedby"] = "describedby";
    AXPropertyName2["Details"] = "details";
    AXPropertyName2["Errormessage"] = "errormessage";
    AXPropertyName2["Flowto"] = "flowto";
    AXPropertyName2["Labelledby"] = "labelledby";
    AXPropertyName2["Owns"] = "owns";
    AXPropertyName2["Url"] = "url";
    AXPropertyName2["ActiveFullscreenElement"] = "activeFullscreenElement";
    AXPropertyName2["ActiveModalDialog"] = "activeModalDialog";
    AXPropertyName2["ActiveAriaModalDialog"] = "activeAriaModalDialog";
    AXPropertyName2["AriaHiddenElement"] = "ariaHiddenElement";
    AXPropertyName2["AriaHiddenSubtree"] = "ariaHiddenSubtree";
    AXPropertyName2["EmptyAlt"] = "emptyAlt";
    AXPropertyName2["EmptyText"] = "emptyText";
    AXPropertyName2["InertElement"] = "inertElement";
    AXPropertyName2["InertSubtree"] = "inertSubtree";
    AXPropertyName2["LabelContainer"] = "labelContainer";
    AXPropertyName2["LabelFor"] = "labelFor";
    AXPropertyName2["NotRendered"] = "notRendered";
    AXPropertyName2["NotVisible"] = "notVisible";
    AXPropertyName2["PresentationalRole"] = "presentationalRole";
    AXPropertyName2["ProbablyPresentational"] = "probablyPresentational";
    AXPropertyName2["InactiveCarouselTabContent"] = "inactiveCarouselTabContent";
    AXPropertyName2["Uninteresting"] = "uninteresting";
  })(AXPropertyName = Accessibility2.AXPropertyName || (Accessibility2.AXPropertyName = {}));
})(Accessibility || (Accessibility = {}));
var Animation;
((Animation2) => {
  let AnimationType;
  ((AnimationType2) => {
    AnimationType2["CSSTransition"] = "CSSTransition";
    AnimationType2["CSSAnimation"] = "CSSAnimation";
    AnimationType2["WebAnimation"] = "WebAnimation";
  })(AnimationType = Animation2.AnimationType || (Animation2.AnimationType = {}));
})(Animation || (Animation = {}));
var Audits;
((Audits2) => {
  let CookieExclusionReason;
  ((CookieExclusionReason2) => {
    CookieExclusionReason2["ExcludeSameSiteUnspecifiedTreatedAsLax"] = "ExcludeSameSiteUnspecifiedTreatedAsLax";
    CookieExclusionReason2["ExcludeSameSiteNoneInsecure"] = "ExcludeSameSiteNoneInsecure";
    CookieExclusionReason2["ExcludeSameSiteLax"] = "ExcludeSameSiteLax";
    CookieExclusionReason2["ExcludeSameSiteStrict"] = "ExcludeSameSiteStrict";
    CookieExclusionReason2["ExcludeDomainNonASCII"] = "ExcludeDomainNonASCII";
    CookieExclusionReason2["ExcludeThirdPartyCookieBlockedInFirstPartySet"] = "ExcludeThirdPartyCookieBlockedInFirstPartySet";
    CookieExclusionReason2["ExcludeThirdPartyPhaseout"] = "ExcludeThirdPartyPhaseout";
    CookieExclusionReason2["ExcludePortMismatch"] = "ExcludePortMismatch";
    CookieExclusionReason2["ExcludeSchemeMismatch"] = "ExcludeSchemeMismatch";
  })(CookieExclusionReason = Audits2.CookieExclusionReason || (Audits2.CookieExclusionReason = {}));
  let CookieWarningReason;
  ((CookieWarningReason2) => {
    CookieWarningReason2["WarnSameSiteUnspecifiedCrossSiteContext"] = "WarnSameSiteUnspecifiedCrossSiteContext";
    CookieWarningReason2["WarnSameSiteNoneInsecure"] = "WarnSameSiteNoneInsecure";
    CookieWarningReason2["WarnSameSiteUnspecifiedLaxAllowUnsafe"] = "WarnSameSiteUnspecifiedLaxAllowUnsafe";
    CookieWarningReason2["WarnSameSiteStrictLaxDowngradeStrict"] = "WarnSameSiteStrictLaxDowngradeStrict";
    CookieWarningReason2["WarnSameSiteStrictCrossDowngradeStrict"] = "WarnSameSiteStrictCrossDowngradeStrict";
    CookieWarningReason2["WarnSameSiteStrictCrossDowngradeLax"] = "WarnSameSiteStrictCrossDowngradeLax";
    CookieWarningReason2["WarnSameSiteLaxCrossDowngradeStrict"] = "WarnSameSiteLaxCrossDowngradeStrict";
    CookieWarningReason2["WarnSameSiteLaxCrossDowngradeLax"] = "WarnSameSiteLaxCrossDowngradeLax";
    CookieWarningReason2["WarnAttributeValueExceedsMaxSize"] = "WarnAttributeValueExceedsMaxSize";
    CookieWarningReason2["WarnDomainNonASCII"] = "WarnDomainNonASCII";
    CookieWarningReason2["WarnThirdPartyPhaseout"] = "WarnThirdPartyPhaseout";
    CookieWarningReason2["WarnCrossSiteRedirectDowngradeChangesInclusion"] = "WarnCrossSiteRedirectDowngradeChangesInclusion";
    CookieWarningReason2["WarnDeprecationTrialMetadata"] = "WarnDeprecationTrialMetadata";
    CookieWarningReason2["WarnThirdPartyCookieHeuristic"] = "WarnThirdPartyCookieHeuristic";
  })(CookieWarningReason = Audits2.CookieWarningReason || (Audits2.CookieWarningReason = {}));
  let CookieOperation;
  ((CookieOperation2) => {
    CookieOperation2["SetCookie"] = "SetCookie";
    CookieOperation2["ReadCookie"] = "ReadCookie";
  })(CookieOperation = Audits2.CookieOperation || (Audits2.CookieOperation = {}));
  let InsightType;
  ((InsightType2) => {
    InsightType2["GitHubResource"] = "GitHubResource";
    InsightType2["GracePeriod"] = "GracePeriod";
    InsightType2["Heuristics"] = "Heuristics";
  })(InsightType = Audits2.InsightType || (Audits2.InsightType = {}));
  let PerformanceIssueType;
  ((PerformanceIssueType2) => {
    PerformanceIssueType2["DocumentCookie"] = "DocumentCookie";
  })(PerformanceIssueType = Audits2.PerformanceIssueType || (Audits2.PerformanceIssueType = {}));
  let MixedContentResolutionStatus;
  ((MixedContentResolutionStatus2) => {
    MixedContentResolutionStatus2["MixedContentBlocked"] = "MixedContentBlocked";
    MixedContentResolutionStatus2["MixedContentAutomaticallyUpgraded"] = "MixedContentAutomaticallyUpgraded";
    MixedContentResolutionStatus2["MixedContentWarning"] = "MixedContentWarning";
  })(MixedContentResolutionStatus = Audits2.MixedContentResolutionStatus || (Audits2.MixedContentResolutionStatus = {}));
  let MixedContentResourceType;
  ((MixedContentResourceType2) => {
    MixedContentResourceType2["Audio"] = "Audio";
    MixedContentResourceType2["Beacon"] = "Beacon";
    MixedContentResourceType2["CSPReport"] = "CSPReport";
    MixedContentResourceType2["Download"] = "Download";
    MixedContentResourceType2["EventSource"] = "EventSource";
    MixedContentResourceType2["Favicon"] = "Favicon";
    MixedContentResourceType2["Font"] = "Font";
    MixedContentResourceType2["Form"] = "Form";
    MixedContentResourceType2["Frame"] = "Frame";
    MixedContentResourceType2["Image"] = "Image";
    MixedContentResourceType2["Import"] = "Import";
    MixedContentResourceType2["JSON"] = "JSON";
    MixedContentResourceType2["Manifest"] = "Manifest";
    MixedContentResourceType2["Ping"] = "Ping";
    MixedContentResourceType2["PluginData"] = "PluginData";
    MixedContentResourceType2["PluginResource"] = "PluginResource";
    MixedContentResourceType2["Prefetch"] = "Prefetch";
    MixedContentResourceType2["Resource"] = "Resource";
    MixedContentResourceType2["Script"] = "Script";
    MixedContentResourceType2["ServiceWorker"] = "ServiceWorker";
    MixedContentResourceType2["SharedWorker"] = "SharedWorker";
    MixedContentResourceType2["SpeculationRules"] = "SpeculationRules";
    MixedContentResourceType2["Stylesheet"] = "Stylesheet";
    MixedContentResourceType2["Track"] = "Track";
    MixedContentResourceType2["Video"] = "Video";
    MixedContentResourceType2["Worker"] = "Worker";
    MixedContentResourceType2["XMLHttpRequest"] = "XMLHttpRequest";
    MixedContentResourceType2["XSLT"] = "XSLT";
  })(MixedContentResourceType = Audits2.MixedContentResourceType || (Audits2.MixedContentResourceType = {}));
  let BlockedByResponseReason;
  ((BlockedByResponseReason2) => {
    BlockedByResponseReason2["CoepFrameResourceNeedsCoepHeader"] = "CoepFrameResourceNeedsCoepHeader";
    BlockedByResponseReason2["CoopSandboxedIFrameCannotNavigateToCoopPage"] = "CoopSandboxedIFrameCannotNavigateToCoopPage";
    BlockedByResponseReason2["CorpNotSameOrigin"] = "CorpNotSameOrigin";
    BlockedByResponseReason2["CorpNotSameOriginAfterDefaultedToSameOriginByCoep"] = "CorpNotSameOriginAfterDefaultedToSameOriginByCoep";
    BlockedByResponseReason2["CorpNotSameOriginAfterDefaultedToSameOriginByDip"] = "CorpNotSameOriginAfterDefaultedToSameOriginByDip";
    BlockedByResponseReason2["CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip"] = "CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip";
    BlockedByResponseReason2["CorpNotSameSite"] = "CorpNotSameSite";
    BlockedByResponseReason2["SRIMessageSignatureMismatch"] = "SRIMessageSignatureMismatch";
  })(BlockedByResponseReason = Audits2.BlockedByResponseReason || (Audits2.BlockedByResponseReason = {}));
  let HeavyAdResolutionStatus;
  ((HeavyAdResolutionStatus2) => {
    HeavyAdResolutionStatus2["HeavyAdBlocked"] = "HeavyAdBlocked";
    HeavyAdResolutionStatus2["HeavyAdWarning"] = "HeavyAdWarning";
  })(HeavyAdResolutionStatus = Audits2.HeavyAdResolutionStatus || (Audits2.HeavyAdResolutionStatus = {}));
  let HeavyAdReason;
  ((HeavyAdReason2) => {
    HeavyAdReason2["NetworkTotalLimit"] = "NetworkTotalLimit";
    HeavyAdReason2["CpuTotalLimit"] = "CpuTotalLimit";
    HeavyAdReason2["CpuPeakLimit"] = "CpuPeakLimit";
  })(HeavyAdReason = Audits2.HeavyAdReason || (Audits2.HeavyAdReason = {}));
  let ContentSecurityPolicyViolationType;
  ((ContentSecurityPolicyViolationType2) => {
    ContentSecurityPolicyViolationType2["KInlineViolation"] = "kInlineViolation";
    ContentSecurityPolicyViolationType2["KEvalViolation"] = "kEvalViolation";
    ContentSecurityPolicyViolationType2["KURLViolation"] = "kURLViolation";
    ContentSecurityPolicyViolationType2["KSRIViolation"] = "kSRIViolation";
    ContentSecurityPolicyViolationType2["KTrustedTypesSinkViolation"] = "kTrustedTypesSinkViolation";
    ContentSecurityPolicyViolationType2["KTrustedTypesPolicyViolation"] = "kTrustedTypesPolicyViolation";
    ContentSecurityPolicyViolationType2["KWasmEvalViolation"] = "kWasmEvalViolation";
  })(ContentSecurityPolicyViolationType = Audits2.ContentSecurityPolicyViolationType || (Audits2.ContentSecurityPolicyViolationType = {}));
  let SharedArrayBufferIssueType;
  ((SharedArrayBufferIssueType2) => {
    SharedArrayBufferIssueType2["TransferIssue"] = "TransferIssue";
    SharedArrayBufferIssueType2["CreationIssue"] = "CreationIssue";
  })(SharedArrayBufferIssueType = Audits2.SharedArrayBufferIssueType || (Audits2.SharedArrayBufferIssueType = {}));
  let SharedDictionaryError;
  ((SharedDictionaryError2) => {
    SharedDictionaryError2["UseErrorCrossOriginNoCorsRequest"] = "UseErrorCrossOriginNoCorsRequest";
    SharedDictionaryError2["UseErrorDictionaryLoadFailure"] = "UseErrorDictionaryLoadFailure";
    SharedDictionaryError2["UseErrorMatchingDictionaryNotUsed"] = "UseErrorMatchingDictionaryNotUsed";
    SharedDictionaryError2["UseErrorUnexpectedContentDictionaryHeader"] = "UseErrorUnexpectedContentDictionaryHeader";
    SharedDictionaryError2["WriteErrorCossOriginNoCorsRequest"] = "WriteErrorCossOriginNoCorsRequest";
    SharedDictionaryError2["WriteErrorDisallowedBySettings"] = "WriteErrorDisallowedBySettings";
    SharedDictionaryError2["WriteErrorExpiredResponse"] = "WriteErrorExpiredResponse";
    SharedDictionaryError2["WriteErrorFeatureDisabled"] = "WriteErrorFeatureDisabled";
    SharedDictionaryError2["WriteErrorInsufficientResources"] = "WriteErrorInsufficientResources";
    SharedDictionaryError2["WriteErrorInvalidMatchField"] = "WriteErrorInvalidMatchField";
    SharedDictionaryError2["WriteErrorInvalidStructuredHeader"] = "WriteErrorInvalidStructuredHeader";
    SharedDictionaryError2["WriteErrorInvalidTTLField"] = "WriteErrorInvalidTTLField";
    SharedDictionaryError2["WriteErrorNavigationRequest"] = "WriteErrorNavigationRequest";
    SharedDictionaryError2["WriteErrorNoMatchField"] = "WriteErrorNoMatchField";
    SharedDictionaryError2["WriteErrorNonIntegerTTLField"] = "WriteErrorNonIntegerTTLField";
    SharedDictionaryError2["WriteErrorNonListMatchDestField"] = "WriteErrorNonListMatchDestField";
    SharedDictionaryError2["WriteErrorNonSecureContext"] = "WriteErrorNonSecureContext";
    SharedDictionaryError2["WriteErrorNonStringIdField"] = "WriteErrorNonStringIdField";
    SharedDictionaryError2["WriteErrorNonStringInMatchDestList"] = "WriteErrorNonStringInMatchDestList";
    SharedDictionaryError2["WriteErrorInvalidMatchDestList"] = "WriteErrorInvalidMatchDestList";
    SharedDictionaryError2["WriteErrorNonStringMatchField"] = "WriteErrorNonStringMatchField";
    SharedDictionaryError2["WriteErrorNonTokenTypeField"] = "WriteErrorNonTokenTypeField";
    SharedDictionaryError2["WriteErrorRequestAborted"] = "WriteErrorRequestAborted";
    SharedDictionaryError2["WriteErrorShuttingDown"] = "WriteErrorShuttingDown";
    SharedDictionaryError2["WriteErrorTooLongIdField"] = "WriteErrorTooLongIdField";
    SharedDictionaryError2["WriteErrorUnsupportedType"] = "WriteErrorUnsupportedType";
  })(SharedDictionaryError = Audits2.SharedDictionaryError || (Audits2.SharedDictionaryError = {}));
  let SRIMessageSignatureError;
  ((SRIMessageSignatureError2) => {
    SRIMessageSignatureError2["MissingSignatureHeader"] = "MissingSignatureHeader";
    SRIMessageSignatureError2["MissingSignatureInputHeader"] = "MissingSignatureInputHeader";
    SRIMessageSignatureError2["InvalidSignatureHeader"] = "InvalidSignatureHeader";
    SRIMessageSignatureError2["InvalidSignatureInputHeader"] = "InvalidSignatureInputHeader";
    SRIMessageSignatureError2["SignatureHeaderValueIsNotByteSequence"] = "SignatureHeaderValueIsNotByteSequence";
    SRIMessageSignatureError2["SignatureHeaderValueIsParameterized"] = "SignatureHeaderValueIsParameterized";
    SRIMessageSignatureError2["SignatureHeaderValueIsIncorrectLength"] = "SignatureHeaderValueIsIncorrectLength";
    SRIMessageSignatureError2["SignatureInputHeaderMissingLabel"] = "SignatureInputHeaderMissingLabel";
    SRIMessageSignatureError2["SignatureInputHeaderValueNotInnerList"] = "SignatureInputHeaderValueNotInnerList";
    SRIMessageSignatureError2["SignatureInputHeaderValueMissingComponents"] = "SignatureInputHeaderValueMissingComponents";
    SRIMessageSignatureError2["SignatureInputHeaderInvalidComponentType"] = "SignatureInputHeaderInvalidComponentType";
    SRIMessageSignatureError2["SignatureInputHeaderInvalidComponentName"] = "SignatureInputHeaderInvalidComponentName";
    SRIMessageSignatureError2["SignatureInputHeaderInvalidHeaderComponentParameter"] = "SignatureInputHeaderInvalidHeaderComponentParameter";
    SRIMessageSignatureError2["SignatureInputHeaderInvalidDerivedComponentParameter"] = "SignatureInputHeaderInvalidDerivedComponentParameter";
    SRIMessageSignatureError2["SignatureInputHeaderKeyIdLength"] = "SignatureInputHeaderKeyIdLength";
    SRIMessageSignatureError2["SignatureInputHeaderInvalidParameter"] = "SignatureInputHeaderInvalidParameter";
    SRIMessageSignatureError2["SignatureInputHeaderMissingRequiredParameters"] = "SignatureInputHeaderMissingRequiredParameters";
    SRIMessageSignatureError2["ValidationFailedSignatureExpired"] = "ValidationFailedSignatureExpired";
    SRIMessageSignatureError2["ValidationFailedInvalidLength"] = "ValidationFailedInvalidLength";
    SRIMessageSignatureError2["ValidationFailedSignatureMismatch"] = "ValidationFailedSignatureMismatch";
    SRIMessageSignatureError2["ValidationFailedIntegrityMismatch"] = "ValidationFailedIntegrityMismatch";
    SRIMessageSignatureError2["SignatureBaseUnknownDerivedComponent"] = "SignatureBaseUnknownDerivedComponent";
    SRIMessageSignatureError2["SignatureBaseMissingHeader"] = "SignatureBaseMissingHeader";
    SRIMessageSignatureError2["SignatureBaseInvalidUnencodedDigest"] = "SignatureBaseInvalidUnencodedDigest";
    SRIMessageSignatureError2["SignatureBaseUnsupportedComponent"] = "SignatureBaseUnsupportedComponent";
  })(SRIMessageSignatureError = Audits2.SRIMessageSignatureError || (Audits2.SRIMessageSignatureError = {}));
  let UnencodedDigestError;
  ((UnencodedDigestError2) => {
    UnencodedDigestError2["MalformedDictionary"] = "MalformedDictionary";
    UnencodedDigestError2["UnknownAlgorithm"] = "UnknownAlgorithm";
    UnencodedDigestError2["IncorrectDigestType"] = "IncorrectDigestType";
    UnencodedDigestError2["IncorrectDigestLength"] = "IncorrectDigestLength";
  })(UnencodedDigestError = Audits2.UnencodedDigestError || (Audits2.UnencodedDigestError = {}));
  let ConnectionAllowlistError;
  ((ConnectionAllowlistError2) => {
    ConnectionAllowlistError2["InvalidHeader"] = "InvalidHeader";
    ConnectionAllowlistError2["MoreThanOneList"] = "MoreThanOneList";
    ConnectionAllowlistError2["ItemNotInnerList"] = "ItemNotInnerList";
    ConnectionAllowlistError2["InvalidAllowlistItemType"] = "InvalidAllowlistItemType";
    ConnectionAllowlistError2["ReportingEndpointNotToken"] = "ReportingEndpointNotToken";
    ConnectionAllowlistError2["InvalidUrlPattern"] = "InvalidUrlPattern";
    ConnectionAllowlistError2["IFrameAttributeLoosensEmbeddingRequirement"] = "IFrameAttributeLoosensEmbeddingRequirement";
    ConnectionAllowlistError2["InvalidAllowConnectionAllowlistFrom"] = "InvalidAllowConnectionAllowlistFrom";
    ConnectionAllowlistError2["EmbeddingRequirementNotSatisfied"] = "EmbeddingRequirementNotSatisfied";
  })(ConnectionAllowlistError = Audits2.ConnectionAllowlistError || (Audits2.ConnectionAllowlistError = {}));
  let GenericIssueErrorType;
  ((GenericIssueErrorType2) => {
    GenericIssueErrorType2["FormLabelForNameError"] = "FormLabelForNameError";
    GenericIssueErrorType2["FormDuplicateIdForInputError"] = "FormDuplicateIdForInputError";
    GenericIssueErrorType2["FormInputWithNoLabelError"] = "FormInputWithNoLabelError";
    GenericIssueErrorType2["FormAutocompleteAttributeEmptyError"] = "FormAutocompleteAttributeEmptyError";
    GenericIssueErrorType2["FormEmptyIdAndNameAttributesForInputError"] = "FormEmptyIdAndNameAttributesForInputError";
    GenericIssueErrorType2["FormAriaLabelledByToNonExistingIdError"] = "FormAriaLabelledByToNonExistingIdError";
    GenericIssueErrorType2["FormInputAssignedAutocompleteValueToIdOrNameAttributeError"] = "FormInputAssignedAutocompleteValueToIdOrNameAttributeError";
    GenericIssueErrorType2["FormLabelHasNeitherForNorNestedInputError"] = "FormLabelHasNeitherForNorNestedInputError";
    GenericIssueErrorType2["FormLabelForMatchesNonExistingIdError"] = "FormLabelForMatchesNonExistingIdError";
    GenericIssueErrorType2["FormInputHasWrongButWellIntendedAutocompleteValueError"] = "FormInputHasWrongButWellIntendedAutocompleteValueError";
    GenericIssueErrorType2["ResponseWasBlockedByORB"] = "ResponseWasBlockedByORB";
    GenericIssueErrorType2["NavigationEntryMarkedSkippable"] = "NavigationEntryMarkedSkippable";
    GenericIssueErrorType2["BackUINavigationWouldSkipAd"] = "BackUINavigationWouldSkipAd";
    GenericIssueErrorType2["AutofillAndManualTextPolicyControlledFeaturesInfo"] = "AutofillAndManualTextPolicyControlledFeaturesInfo";
    GenericIssueErrorType2["AutofillPolicyControlledFeatureInfo"] = "AutofillPolicyControlledFeatureInfo";
    GenericIssueErrorType2["ManualTextPolicyControlledFeatureInfo"] = "ManualTextPolicyControlledFeatureInfo";
    GenericIssueErrorType2["FormModelContextParameterMissingTitleAndDescription"] = "FormModelContextParameterMissingTitleAndDescription";
    GenericIssueErrorType2["FormModelContextMissingToolName"] = "FormModelContextMissingToolName";
    GenericIssueErrorType2["FormModelContextMissingToolDescription"] = "FormModelContextMissingToolDescription";
    GenericIssueErrorType2["FormModelContextRequiredParameterMissingName"] = "FormModelContextRequiredParameterMissingName";
    GenericIssueErrorType2["FormModelContextParameterMissingName"] = "FormModelContextParameterMissingName";
  })(GenericIssueErrorType = Audits2.GenericIssueErrorType || (Audits2.GenericIssueErrorType = {}));
  let ClientHintIssueReason;
  ((ClientHintIssueReason2) => {
    ClientHintIssueReason2["MetaTagAllowListInvalidOrigin"] = "MetaTagAllowListInvalidOrigin";
    ClientHintIssueReason2["MetaTagModifiedHTML"] = "MetaTagModifiedHTML";
  })(ClientHintIssueReason = Audits2.ClientHintIssueReason || (Audits2.ClientHintIssueReason = {}));
  let FederatedAuthRequestIssueReason;
  ((FederatedAuthRequestIssueReason2) => {
    FederatedAuthRequestIssueReason2["ShouldEmbargo"] = "ShouldEmbargo";
    FederatedAuthRequestIssueReason2["TooManyRequests"] = "TooManyRequests";
    FederatedAuthRequestIssueReason2["WellKnownHttpNotFound"] = "WellKnownHttpNotFound";
    FederatedAuthRequestIssueReason2["WellKnownNoResponse"] = "WellKnownNoResponse";
    FederatedAuthRequestIssueReason2["WellKnownBlockedByConnectionAllowlist"] = "WellKnownBlockedByConnectionAllowlist";
    FederatedAuthRequestIssueReason2["WellKnownInvalidResponse"] = "WellKnownInvalidResponse";
    FederatedAuthRequestIssueReason2["WellKnownListEmpty"] = "WellKnownListEmpty";
    FederatedAuthRequestIssueReason2["WellKnownInvalidContentType"] = "WellKnownInvalidContentType";
    FederatedAuthRequestIssueReason2["ConfigNotInWellKnown"] = "ConfigNotInWellKnown";
    FederatedAuthRequestIssueReason2["WellKnownTooBig"] = "WellKnownTooBig";
    FederatedAuthRequestIssueReason2["ConfigHttpNotFound"] = "ConfigHttpNotFound";
    FederatedAuthRequestIssueReason2["ConfigNoResponse"] = "ConfigNoResponse";
    FederatedAuthRequestIssueReason2["ConfigBlockedByConnectionAllowlist"] = "ConfigBlockedByConnectionAllowlist";
    FederatedAuthRequestIssueReason2["ConfigInvalidResponse"] = "ConfigInvalidResponse";
    FederatedAuthRequestIssueReason2["ConfigInvalidContentType"] = "ConfigInvalidContentType";
    FederatedAuthRequestIssueReason2["IdpNotPotentiallyTrustworthy"] = "IdpNotPotentiallyTrustworthy";
    FederatedAuthRequestIssueReason2["DisabledInSettings"] = "DisabledInSettings";
    FederatedAuthRequestIssueReason2["DisabledInFlags"] = "DisabledInFlags";
    FederatedAuthRequestIssueReason2["ErrorFetchingSignin"] = "ErrorFetchingSignin";
    FederatedAuthRequestIssueReason2["InvalidSigninResponse"] = "InvalidSigninResponse";
    FederatedAuthRequestIssueReason2["AccountsHttpNotFound"] = "AccountsHttpNotFound";
    FederatedAuthRequestIssueReason2["AccountsNoResponse"] = "AccountsNoResponse";
    FederatedAuthRequestIssueReason2["AccountsBlockedByConnectionAllowlist"] = "AccountsBlockedByConnectionAllowlist";
    FederatedAuthRequestIssueReason2["AccountsInvalidResponse"] = "AccountsInvalidResponse";
    FederatedAuthRequestIssueReason2["AccountsListEmpty"] = "AccountsListEmpty";
    FederatedAuthRequestIssueReason2["AccountsInvalidContentType"] = "AccountsInvalidContentType";
    FederatedAuthRequestIssueReason2["IdTokenHttpNotFound"] = "IdTokenHttpNotFound";
    FederatedAuthRequestIssueReason2["IdTokenNoResponse"] = "IdTokenNoResponse";
    FederatedAuthRequestIssueReason2["IdTokenBlockedByConnectionAllowlist"] = "IdTokenBlockedByConnectionAllowlist";
    FederatedAuthRequestIssueReason2["IdTokenInvalidResponse"] = "IdTokenInvalidResponse";
    FederatedAuthRequestIssueReason2["IdTokenIdpErrorResponse"] = "IdTokenIdpErrorResponse";
    FederatedAuthRequestIssueReason2["IdTokenCrossSiteIdpErrorResponse"] = "IdTokenCrossSiteIdpErrorResponse";
    FederatedAuthRequestIssueReason2["IdTokenInvalidRequest"] = "IdTokenInvalidRequest";
    FederatedAuthRequestIssueReason2["IdTokenInvalidContentType"] = "IdTokenInvalidContentType";
    FederatedAuthRequestIssueReason2["ErrorIdToken"] = "ErrorIdToken";
    FederatedAuthRequestIssueReason2["Canceled"] = "Canceled";
    FederatedAuthRequestIssueReason2["RpPageNotVisible"] = "RpPageNotVisible";
    FederatedAuthRequestIssueReason2["SilentMediationFailure"] = "SilentMediationFailure";
    FederatedAuthRequestIssueReason2["NotSignedInWithIdp"] = "NotSignedInWithIdp";
    FederatedAuthRequestIssueReason2["MissingTransientUserActivation"] = "MissingTransientUserActivation";
    FederatedAuthRequestIssueReason2["ReplacedByActiveMode"] = "ReplacedByActiveMode";
    FederatedAuthRequestIssueReason2["RelyingPartyOriginIsOpaque"] = "RelyingPartyOriginIsOpaque";
    FederatedAuthRequestIssueReason2["TypeNotMatching"] = "TypeNotMatching";
    FederatedAuthRequestIssueReason2["UiDismissedNoEmbargo"] = "UiDismissedNoEmbargo";
    FederatedAuthRequestIssueReason2["CorsError"] = "CorsError";
    FederatedAuthRequestIssueReason2["SuppressedBySegmentationPlatform"] = "SuppressedBySegmentationPlatform";
  })(FederatedAuthRequestIssueReason = Audits2.FederatedAuthRequestIssueReason || (Audits2.FederatedAuthRequestIssueReason = {}));
  let FederatedAuthUserInfoRequestIssueReason;
  ((FederatedAuthUserInfoRequestIssueReason2) => {
    FederatedAuthUserInfoRequestIssueReason2["NotSameOrigin"] = "NotSameOrigin";
    FederatedAuthUserInfoRequestIssueReason2["NotIframe"] = "NotIframe";
    FederatedAuthUserInfoRequestIssueReason2["NotPotentiallyTrustworthy"] = "NotPotentiallyTrustworthy";
    FederatedAuthUserInfoRequestIssueReason2["NoAPIPermission"] = "NoApiPermission";
    FederatedAuthUserInfoRequestIssueReason2["NotSignedInWithIdp"] = "NotSignedInWithIdp";
    FederatedAuthUserInfoRequestIssueReason2["NoAccountSharingPermission"] = "NoAccountSharingPermission";
    FederatedAuthUserInfoRequestIssueReason2["InvalidConfigOrWellKnown"] = "InvalidConfigOrWellKnown";
    FederatedAuthUserInfoRequestIssueReason2["InvalidAccountsResponse"] = "InvalidAccountsResponse";
    FederatedAuthUserInfoRequestIssueReason2["NoReturningUserFromFetchedAccounts"] = "NoReturningUserFromFetchedAccounts";
  })(FederatedAuthUserInfoRequestIssueReason = Audits2.FederatedAuthUserInfoRequestIssueReason || (Audits2.FederatedAuthUserInfoRequestIssueReason = {}));
  let EmailVerificationRequestIssueReason;
  ((EmailVerificationRequestIssueReason2) => {
    EmailVerificationRequestIssueReason2["InvalidEmail"] = "InvalidEmail";
    EmailVerificationRequestIssueReason2["DnsFetchFailed"] = "DnsFetchFailed";
    EmailVerificationRequestIssueReason2["DnsInvalidRecord"] = "DnsInvalidRecord";
    EmailVerificationRequestIssueReason2["WellKnownHttpNotFound"] = "WellKnownHttpNotFound";
    EmailVerificationRequestIssueReason2["WellKnownNoResponse"] = "WellKnownNoResponse";
    EmailVerificationRequestIssueReason2["WellKnownInvalidResponse"] = "WellKnownInvalidResponse";
    EmailVerificationRequestIssueReason2["WellKnownListEmpty"] = "WellKnownListEmpty";
    EmailVerificationRequestIssueReason2["WellKnownInvalidContentType"] = "WellKnownInvalidContentType";
    EmailVerificationRequestIssueReason2["WellKnownMissingIssuanceEndpoint"] = "WellKnownMissingIssuanceEndpoint";
    EmailVerificationRequestIssueReason2["WellKnownIssuanceEndpointCrossOrigin"] = "WellKnownIssuanceEndpointCrossOrigin";
    EmailVerificationRequestIssueReason2["WellKnownUnsupportedSigningAlgorithm"] = "WellKnownUnsupportedSigningAlgorithm";
    EmailVerificationRequestIssueReason2["TokenHttpNotFound"] = "TokenHttpNotFound";
    EmailVerificationRequestIssueReason2["TokenNoResponse"] = "TokenNoResponse";
    EmailVerificationRequestIssueReason2["TokenInvalidResponse"] = "TokenInvalidResponse";
    EmailVerificationRequestIssueReason2["TokenInvalidContentType"] = "TokenInvalidContentType";
    EmailVerificationRequestIssueReason2["TokenMalformedSdJwt"] = "TokenMalformedSdJwt";
    EmailVerificationRequestIssueReason2["TokenInvalidSdJwt"] = "TokenInvalidSdJwt";
    EmailVerificationRequestIssueReason2["KeyBindingSigningFailed"] = "KeyBindingSigningFailed";
    EmailVerificationRequestIssueReason2["RpOriginIsOpaque"] = "RpOriginIsOpaque";
    EmailVerificationRequestIssueReason2["WellKnownMissingAccountsEndpoint"] = "WellKnownMissingAccountsEndpoint";
    EmailVerificationRequestIssueReason2["UserLoggedOut"] = "UserLoggedOut";
    EmailVerificationRequestIssueReason2["WellKnownAccountsEndpointCrossOrigin"] = "WellKnownAccountsEndpointCrossOrigin";
    EmailVerificationRequestIssueReason2["AccountsHttpNotFound"] = "AccountsHttpNotFound";
    EmailVerificationRequestIssueReason2["AccountsNoResponse"] = "AccountsNoResponse";
    EmailVerificationRequestIssueReason2["AccountsInvalidResponse"] = "AccountsInvalidResponse";
    EmailVerificationRequestIssueReason2["AccountsInvalidContentType"] = "AccountsInvalidContentType";
    EmailVerificationRequestIssueReason2["AccountsEmptyList"] = "AccountsEmptyList";
    EmailVerificationRequestIssueReason2["EmailVerificationWellKnownHttpNotFound"] = "EmailVerificationWellKnownHttpNotFound";
    EmailVerificationRequestIssueReason2["EmailVerificationWellKnownNoResponse"] = "EmailVerificationWellKnownNoResponse";
    EmailVerificationRequestIssueReason2["EmailVerificationWellKnownInvalidResponse"] = "EmailVerificationWellKnownInvalidResponse";
    EmailVerificationRequestIssueReason2["EmailVerificationWellKnownInvalidContentType"] = "EmailVerificationWellKnownInvalidContentType";
    EmailVerificationRequestIssueReason2["JwksHttpNotFound"] = "JwksHttpNotFound";
    EmailVerificationRequestIssueReason2["JwksInvalidResponse"] = "JwksInvalidResponse";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtUnsupportedHeaderAlg"] = "TokenVerificationSdJwtUnsupportedHeaderAlg";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidTyp"] = "TokenVerificationSdJwtInvalidTyp";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtMissingIss"] = "TokenVerificationSdJwtMissingIss";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtMissingIat"] = "TokenVerificationSdJwtMissingIat";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtMissingCnf"] = "TokenVerificationSdJwtMissingCnf";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtMissingEmail"] = "TokenVerificationSdJwtMissingEmail";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidIssuedAt"] = "TokenVerificationSdJwtInvalidIssuedAt";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidIssuer"] = "TokenVerificationSdJwtInvalidIssuer";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtJwksMissingKeys"] = "TokenVerificationSdJwtJwksMissingKeys";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtSignatureFailed"] = "TokenVerificationSdJwtSignatureFailed";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidEmailVerified"] = "TokenVerificationSdJwtInvalidEmailVerified";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidEmail"] = "TokenVerificationSdJwtInvalidEmail";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidHolderKey"] = "TokenVerificationSdJwtInvalidHolderKey";
    EmailVerificationRequestIssueReason2["TokenVerificationKbInvalidTyp"] = "TokenVerificationKbInvalidTyp";
    EmailVerificationRequestIssueReason2["TokenVerificationKbMissingAud"] = "TokenVerificationKbMissingAud";
    EmailVerificationRequestIssueReason2["TokenVerificationKbMissingNonce"] = "TokenVerificationKbMissingNonce";
    EmailVerificationRequestIssueReason2["TokenVerificationKbMissingIat"] = "TokenVerificationKbMissingIat";
    EmailVerificationRequestIssueReason2["TokenVerificationKbMissingSdHash"] = "TokenVerificationKbMissingSdHash";
    EmailVerificationRequestIssueReason2["TokenVerificationKbInvalidIssuedAt"] = "TokenVerificationKbInvalidIssuedAt";
    EmailVerificationRequestIssueReason2["TokenVerificationKbInvalidAudience"] = "TokenVerificationKbInvalidAudience";
    EmailVerificationRequestIssueReason2["TokenVerificationKbInvalidNonce"] = "TokenVerificationKbInvalidNonce";
    EmailVerificationRequestIssueReason2["TokenVerificationKbInvalidSdHash"] = "TokenVerificationKbInvalidSdHash";
    EmailVerificationRequestIssueReason2["TokenVerificationKbMissingCnf"] = "TokenVerificationKbMissingCnf";
    EmailVerificationRequestIssueReason2["TokenVerificationKbSignatureFailed"] = "TokenVerificationKbSignatureFailed";
  })(EmailVerificationRequestIssueReason = Audits2.EmailVerificationRequestIssueReason || (Audits2.EmailVerificationRequestIssueReason = {}));
  let PartitioningBlobURLInfo;
  ((PartitioningBlobURLInfo2) => {
    PartitioningBlobURLInfo2["BlockedCrossPartitionFetching"] = "BlockedCrossPartitionFetching";
    PartitioningBlobURLInfo2["EnforceNoopenerForNavigation"] = "EnforceNoopenerForNavigation";
  })(PartitioningBlobURLInfo = Audits2.PartitioningBlobURLInfo || (Audits2.PartitioningBlobURLInfo = {}));
  let ElementAccessibilityIssueReason;
  ((ElementAccessibilityIssueReason2) => {
    ElementAccessibilityIssueReason2["DisallowedSelectChild"] = "DisallowedSelectChild";
    ElementAccessibilityIssueReason2["DisallowedOptGroupChild"] = "DisallowedOptGroupChild";
    ElementAccessibilityIssueReason2["NonPhrasingContentOptionChild"] = "NonPhrasingContentOptionChild";
    ElementAccessibilityIssueReason2["InteractiveContentOptionChild"] = "InteractiveContentOptionChild";
    ElementAccessibilityIssueReason2["InteractiveContentLegendChild"] = "InteractiveContentLegendChild";
    ElementAccessibilityIssueReason2["InteractiveContentSummaryDescendant"] = "InteractiveContentSummaryDescendant";
  })(ElementAccessibilityIssueReason = Audits2.ElementAccessibilityIssueReason || (Audits2.ElementAccessibilityIssueReason = {}));
  let StyleSheetLoadingIssueReason;
  ((StyleSheetLoadingIssueReason2) => {
    StyleSheetLoadingIssueReason2["LateImportRule"] = "LateImportRule";
    StyleSheetLoadingIssueReason2["RequestFailed"] = "RequestFailed";
  })(StyleSheetLoadingIssueReason = Audits2.StyleSheetLoadingIssueReason || (Audits2.StyleSheetLoadingIssueReason = {}));
  let PropertyRuleIssueReason;
  ((PropertyRuleIssueReason2) => {
    PropertyRuleIssueReason2["InvalidSyntax"] = "InvalidSyntax";
    PropertyRuleIssueReason2["InvalidInitialValue"] = "InvalidInitialValue";
    PropertyRuleIssueReason2["InvalidInherits"] = "InvalidInherits";
    PropertyRuleIssueReason2["InvalidName"] = "InvalidName";
  })(PropertyRuleIssueReason = Audits2.PropertyRuleIssueReason || (Audits2.PropertyRuleIssueReason = {}));
  let UserReidentificationIssueType;
  ((UserReidentificationIssueType2) => {
    UserReidentificationIssueType2["BlockedFrameNavigation"] = "BlockedFrameNavigation";
    UserReidentificationIssueType2["BlockedSubresource"] = "BlockedSubresource";
    UserReidentificationIssueType2["NoisedCanvasReadback"] = "NoisedCanvasReadback";
  })(UserReidentificationIssueType = Audits2.UserReidentificationIssueType || (Audits2.UserReidentificationIssueType = {}));
  let PermissionElementIssueType;
  ((PermissionElementIssueType2) => {
    PermissionElementIssueType2["InvalidType"] = "InvalidType";
    PermissionElementIssueType2["FencedFrameDisallowed"] = "FencedFrameDisallowed";
    PermissionElementIssueType2["CspFrameAncestorsMissing"] = "CspFrameAncestorsMissing";
    PermissionElementIssueType2["PermissionsPolicyBlocked"] = "PermissionsPolicyBlocked";
    PermissionElementIssueType2["PaddingRightUnsupported"] = "PaddingRightUnsupported";
    PermissionElementIssueType2["PaddingBottomUnsupported"] = "PaddingBottomUnsupported";
    PermissionElementIssueType2["InsetBoxShadowUnsupported"] = "InsetBoxShadowUnsupported";
    PermissionElementIssueType2["RequestInProgress"] = "RequestInProgress";
    PermissionElementIssueType2["UntrustedEvent"] = "UntrustedEvent";
    PermissionElementIssueType2["RegistrationFailed"] = "RegistrationFailed";
    PermissionElementIssueType2["TypeNotSupported"] = "TypeNotSupported";
    PermissionElementIssueType2["InvalidTypeActivation"] = "InvalidTypeActivation";
    PermissionElementIssueType2["SecurityChecksFailed"] = "SecurityChecksFailed";
    PermissionElementIssueType2["ActivationDisabled"] = "ActivationDisabled";
    PermissionElementIssueType2["GeolocationDeprecated"] = "GeolocationDeprecated";
    PermissionElementIssueType2["InvalidDisplayStyle"] = "InvalidDisplayStyle";
    PermissionElementIssueType2["NonOpaqueColor"] = "NonOpaqueColor";
    PermissionElementIssueType2["LowContrast"] = "LowContrast";
    PermissionElementIssueType2["FontSizeTooSmall"] = "FontSizeTooSmall";
    PermissionElementIssueType2["FontSizeTooLarge"] = "FontSizeTooLarge";
    PermissionElementIssueType2["InvalidSizeValue"] = "InvalidSizeValue";
    PermissionElementIssueType2["NonSecureContext"] = "NonSecureContext";
    PermissionElementIssueType2["MissingTransientUserActivation"] = "MissingTransientUserActivation";
  })(PermissionElementIssueType = Audits2.PermissionElementIssueType || (Audits2.PermissionElementIssueType = {}));
  let InspectorIssueCode;
  ((InspectorIssueCode2) => {
    InspectorIssueCode2["CookieIssue"] = "CookieIssue";
    InspectorIssueCode2["MixedContentIssue"] = "MixedContentIssue";
    InspectorIssueCode2["BlockedByResponseIssue"] = "BlockedByResponseIssue";
    InspectorIssueCode2["HeavyAdIssue"] = "HeavyAdIssue";
    InspectorIssueCode2["ContentSecurityPolicyIssue"] = "ContentSecurityPolicyIssue";
    InspectorIssueCode2["SharedArrayBufferIssue"] = "SharedArrayBufferIssue";
    InspectorIssueCode2["CorsIssue"] = "CorsIssue";
    InspectorIssueCode2["QuirksModeIssue"] = "QuirksModeIssue";
    InspectorIssueCode2["PartitioningBlobURLIssue"] = "PartitioningBlobURLIssue";
    InspectorIssueCode2["NavigatorUserAgentIssue"] = "NavigatorUserAgentIssue";
    InspectorIssueCode2["GenericIssue"] = "GenericIssue";
    InspectorIssueCode2["DeprecationIssue"] = "DeprecationIssue";
    InspectorIssueCode2["ClientHintIssue"] = "ClientHintIssue";
    InspectorIssueCode2["FederatedAuthRequestIssue"] = "FederatedAuthRequestIssue";
    InspectorIssueCode2["BounceTrackingIssue"] = "BounceTrackingIssue";
    InspectorIssueCode2["CookieDeprecationMetadataIssue"] = "CookieDeprecationMetadataIssue";
    InspectorIssueCode2["StylesheetLoadingIssue"] = "StylesheetLoadingIssue";
    InspectorIssueCode2["FederatedAuthUserInfoRequestIssue"] = "FederatedAuthUserInfoRequestIssue";
    InspectorIssueCode2["PropertyRuleIssue"] = "PropertyRuleIssue";
    InspectorIssueCode2["SharedDictionaryIssue"] = "SharedDictionaryIssue";
    InspectorIssueCode2["ElementAccessibilityIssue"] = "ElementAccessibilityIssue";
    InspectorIssueCode2["SRIMessageSignatureIssue"] = "SRIMessageSignatureIssue";
    InspectorIssueCode2["UnencodedDigestIssue"] = "UnencodedDigestIssue";
    InspectorIssueCode2["ConnectionAllowlistIssue"] = "ConnectionAllowlistIssue";
    InspectorIssueCode2["UserReidentificationIssue"] = "UserReidentificationIssue";
    InspectorIssueCode2["PermissionElementIssue"] = "PermissionElementIssue";
    InspectorIssueCode2["PerformanceIssue"] = "PerformanceIssue";
    InspectorIssueCode2["SelectivePermissionsInterventionIssue"] = "SelectivePermissionsInterventionIssue";
    InspectorIssueCode2["EmailVerificationRequestIssue"] = "EmailVerificationRequestIssue";
    InspectorIssueCode2["LazyLoadImageIssue"] = "LazyLoadImageIssue";
  })(InspectorIssueCode = Audits2.InspectorIssueCode || (Audits2.InspectorIssueCode = {}));
  let GetEncodedResponseRequestEncoding;
  ((GetEncodedResponseRequestEncoding2) => {
    GetEncodedResponseRequestEncoding2["Webp"] = "webp";
    GetEncodedResponseRequestEncoding2["Jpeg"] = "jpeg";
    GetEncodedResponseRequestEncoding2["Png"] = "png";
  })(GetEncodedResponseRequestEncoding = Audits2.GetEncodedResponseRequestEncoding || (Audits2.GetEncodedResponseRequestEncoding = {}));
})(Audits || (Audits = {}));
var Autofill;
((Autofill2) => {
  let FillingStrategy;
  ((FillingStrategy2) => {
    FillingStrategy2["AutocompleteAttribute"] = "autocompleteAttribute";
    FillingStrategy2["AutofillInferred"] = "autofillInferred";
  })(FillingStrategy = Autofill2.FillingStrategy || (Autofill2.FillingStrategy = {}));
})(Autofill || (Autofill = {}));
var BackgroundService;
((BackgroundService2) => {
  let ServiceName;
  ((ServiceName2) => {
    ServiceName2["BackgroundFetch"] = "backgroundFetch";
    ServiceName2["BackgroundSync"] = "backgroundSync";
    ServiceName2["PushMessaging"] = "pushMessaging";
    ServiceName2["Notifications"] = "notifications";
    ServiceName2["PaymentHandler"] = "paymentHandler";
    ServiceName2["PeriodicBackgroundSync"] = "periodicBackgroundSync";
  })(ServiceName = BackgroundService2.ServiceName || (BackgroundService2.ServiceName = {}));
})(BackgroundService || (BackgroundService = {}));
var BluetoothEmulation;
((BluetoothEmulation2) => {
  let CentralState;
  ((CentralState2) => {
    CentralState2["Absent"] = "absent";
    CentralState2["PoweredOff"] = "powered-off";
    CentralState2["PoweredOn"] = "powered-on";
  })(CentralState = BluetoothEmulation2.CentralState || (BluetoothEmulation2.CentralState = {}));
  let GATTOperationType;
  ((GATTOperationType2) => {
    GATTOperationType2["Connection"] = "connection";
    GATTOperationType2["Discovery"] = "discovery";
  })(GATTOperationType = BluetoothEmulation2.GATTOperationType || (BluetoothEmulation2.GATTOperationType = {}));
  let CharacteristicWriteType;
  ((CharacteristicWriteType2) => {
    CharacteristicWriteType2["WriteDefaultDeprecated"] = "write-default-deprecated";
    CharacteristicWriteType2["WriteWithResponse"] = "write-with-response";
    CharacteristicWriteType2["WriteWithoutResponse"] = "write-without-response";
  })(CharacteristicWriteType = BluetoothEmulation2.CharacteristicWriteType || (BluetoothEmulation2.CharacteristicWriteType = {}));
  let CharacteristicOperationType;
  ((CharacteristicOperationType2) => {
    CharacteristicOperationType2["Read"] = "read";
    CharacteristicOperationType2["Write"] = "write";
    CharacteristicOperationType2["SubscribeToNotifications"] = "subscribe-to-notifications";
    CharacteristicOperationType2["UnsubscribeFromNotifications"] = "unsubscribe-from-notifications";
  })(CharacteristicOperationType = BluetoothEmulation2.CharacteristicOperationType || (BluetoothEmulation2.CharacteristicOperationType = {}));
  let DescriptorOperationType;
  ((DescriptorOperationType2) => {
    DescriptorOperationType2["Read"] = "read";
    DescriptorOperationType2["Write"] = "write";
  })(DescriptorOperationType = BluetoothEmulation2.DescriptorOperationType || (BluetoothEmulation2.DescriptorOperationType = {}));
})(BluetoothEmulation || (BluetoothEmulation = {}));
var Browser;
((Browser2) => {
  let WindowState;
  ((WindowState2) => {
    WindowState2["Normal"] = "normal";
    WindowState2["Minimized"] = "minimized";
    WindowState2["Maximized"] = "maximized";
    WindowState2["Fullscreen"] = "fullscreen";
  })(WindowState = Browser2.WindowState || (Browser2.WindowState = {}));
  let PermissionType;
  ((PermissionType2) => {
    PermissionType2["Ar"] = "ar";
    PermissionType2["AudioCapture"] = "audioCapture";
    PermissionType2["AutomaticFullscreen"] = "automaticFullscreen";
    PermissionType2["BackgroundFetch"] = "backgroundFetch";
    PermissionType2["BackgroundSync"] = "backgroundSync";
    PermissionType2["CameraPanTiltZoom"] = "cameraPanTiltZoom";
    PermissionType2["CapturedSurfaceControl"] = "capturedSurfaceControl";
    PermissionType2["ClipboardReadWrite"] = "clipboardReadWrite";
    PermissionType2["ClipboardSanitizedWrite"] = "clipboardSanitizedWrite";
    PermissionType2["DisplayCapture"] = "displayCapture";
    PermissionType2["DurableStorage"] = "durableStorage";
    PermissionType2["Geolocation"] = "geolocation";
    PermissionType2["HandTracking"] = "handTracking";
    PermissionType2["IdleDetection"] = "idleDetection";
    PermissionType2["KeyboardLock"] = "keyboardLock";
    PermissionType2["LocalFonts"] = "localFonts";
    PermissionType2["LocalNetwork"] = "localNetwork";
    PermissionType2["LocalNetworkAccess"] = "localNetworkAccess";
    PermissionType2["LoopbackNetwork"] = "loopbackNetwork";
    PermissionType2["Midi"] = "midi";
    PermissionType2["MidiSysex"] = "midiSysex";
    PermissionType2["Nfc"] = "nfc";
    PermissionType2["Notifications"] = "notifications";
    PermissionType2["PaymentHandler"] = "paymentHandler";
    PermissionType2["PeriodicBackgroundSync"] = "periodicBackgroundSync";
    PermissionType2["PointerLock"] = "pointerLock";
    PermissionType2["ProtectedMediaIdentifier"] = "protectedMediaIdentifier";
    PermissionType2["Sensors"] = "sensors";
    PermissionType2["SmartCard"] = "smartCard";
    PermissionType2["SpeakerSelection"] = "speakerSelection";
    PermissionType2["StorageAccess"] = "storageAccess";
    PermissionType2["TopLevelStorageAccess"] = "topLevelStorageAccess";
    PermissionType2["VideoCapture"] = "videoCapture";
    PermissionType2["Vr"] = "vr";
    PermissionType2["WakeLockScreen"] = "wakeLockScreen";
    PermissionType2["WakeLockSystem"] = "wakeLockSystem";
    PermissionType2["WebAppInstallation"] = "webAppInstallation";
    PermissionType2["WebPrinting"] = "webPrinting";
    PermissionType2["WindowManagement"] = "windowManagement";
  })(PermissionType = Browser2.PermissionType || (Browser2.PermissionType = {}));
  let PermissionSetting;
  ((PermissionSetting2) => {
    PermissionSetting2["Granted"] = "granted";
    PermissionSetting2["Denied"] = "denied";
    PermissionSetting2["Prompt"] = "prompt";
  })(PermissionSetting = Browser2.PermissionSetting || (Browser2.PermissionSetting = {}));
  let BrowserCommandId;
  ((BrowserCommandId2) => {
    BrowserCommandId2["OpenTabSearch"] = "openTabSearch";
    BrowserCommandId2["CloseTabSearch"] = "closeTabSearch";
    BrowserCommandId2["OpenGlic"] = "openGlic";
  })(BrowserCommandId = Browser2.BrowserCommandId || (Browser2.BrowserCommandId = {}));
  let SetDownloadBehaviorRequestBehavior;
  ((SetDownloadBehaviorRequestBehavior2) => {
    SetDownloadBehaviorRequestBehavior2["Deny"] = "deny";
    SetDownloadBehaviorRequestBehavior2["Allow"] = "allow";
    SetDownloadBehaviorRequestBehavior2["AllowAndName"] = "allowAndName";
    SetDownloadBehaviorRequestBehavior2["Default"] = "default";
  })(SetDownloadBehaviorRequestBehavior = Browser2.SetDownloadBehaviorRequestBehavior || (Browser2.SetDownloadBehaviorRequestBehavior = {}));
  let DownloadProgressEventState;
  ((DownloadProgressEventState2) => {
    DownloadProgressEventState2["InProgress"] = "inProgress";
    DownloadProgressEventState2["Completed"] = "completed";
    DownloadProgressEventState2["Canceled"] = "canceled";
  })(DownloadProgressEventState = Browser2.DownloadProgressEventState || (Browser2.DownloadProgressEventState = {}));
})(Browser || (Browser = {}));
var CSS;
((CSS2) => {
  let StyleSheetOrigin;
  ((StyleSheetOrigin2) => {
    StyleSheetOrigin2["Injected"] = "injected";
    StyleSheetOrigin2["UserAgent"] = "user-agent";
    StyleSheetOrigin2["Inspector"] = "inspector";
    StyleSheetOrigin2["Regular"] = "regular";
  })(StyleSheetOrigin = CSS2.StyleSheetOrigin || (CSS2.StyleSheetOrigin = {}));
  let CSSRuleType;
  ((CSSRuleType2) => {
    CSSRuleType2["MediaRule"] = "MediaRule";
    CSSRuleType2["SupportsRule"] = "SupportsRule";
    CSSRuleType2["ContainerRule"] = "ContainerRule";
    CSSRuleType2["LayerRule"] = "LayerRule";
    CSSRuleType2["ScopeRule"] = "ScopeRule";
    CSSRuleType2["StyleRule"] = "StyleRule";
    CSSRuleType2["StartingStyleRule"] = "StartingStyleRule";
    CSSRuleType2["NavigationRule"] = "NavigationRule";
  })(CSSRuleType = CSS2.CSSRuleType || (CSS2.CSSRuleType = {}));
  let CSSMediaSource;
  ((CSSMediaSource2) => {
    CSSMediaSource2["MediaRule"] = "mediaRule";
    CSSMediaSource2["ImportRule"] = "importRule";
    CSSMediaSource2["LinkedSheet"] = "linkedSheet";
    CSSMediaSource2["InlineSheet"] = "inlineSheet";
  })(CSSMediaSource = CSS2.CSSMediaSource || (CSS2.CSSMediaSource = {}));
  let CSSAtRuleType;
  ((CSSAtRuleType2) => {
    CSSAtRuleType2["FontFace"] = "font-face";
    CSSAtRuleType2["FontFeatureValues"] = "font-feature-values";
    CSSAtRuleType2["FontPaletteValues"] = "font-palette-values";
    CSSAtRuleType2["CounterStyle"] = "counter-style";
  })(CSSAtRuleType = CSS2.CSSAtRuleType || (CSS2.CSSAtRuleType = {}));
  let CSSAtRuleSubsection;
  ((CSSAtRuleSubsection2) => {
    CSSAtRuleSubsection2["Swash"] = "swash";
    CSSAtRuleSubsection2["Annotation"] = "annotation";
    CSSAtRuleSubsection2["Ornaments"] = "ornaments";
    CSSAtRuleSubsection2["Stylistic"] = "stylistic";
    CSSAtRuleSubsection2["Styleset"] = "styleset";
    CSSAtRuleSubsection2["CharacterVariant"] = "character-variant";
  })(CSSAtRuleSubsection = CSS2.CSSAtRuleSubsection || (CSS2.CSSAtRuleSubsection = {}));
})(CSS || (CSS = {}));
var CacheStorage;
((CacheStorage2) => {
  let CachedResponseType;
  ((CachedResponseType2) => {
    CachedResponseType2["Basic"] = "basic";
    CachedResponseType2["Cors"] = "cors";
    CachedResponseType2["Default"] = "default";
    CachedResponseType2["Error"] = "error";
    CachedResponseType2["OpaqueResponse"] = "opaqueResponse";
    CachedResponseType2["OpaqueRedirect"] = "opaqueRedirect";
  })(CachedResponseType = CacheStorage2.CachedResponseType || (CacheStorage2.CachedResponseType = {}));
})(CacheStorage || (CacheStorage = {}));
var DOM;
((DOM2) => {
  let PseudoType;
  ((PseudoType2) => {
    PseudoType2["FirstLine"] = "first-line";
    PseudoType2["FirstLetter"] = "first-letter";
    PseudoType2["Checkmark"] = "checkmark";
    PseudoType2["Before"] = "before";
    PseudoType2["After"] = "after";
    PseudoType2["ExpandIcon"] = "expand-icon";
    PseudoType2["PickerIcon"] = "picker-icon";
    PseudoType2["InterestButton"] = "interest-button";
    PseudoType2["Marker"] = "marker";
    PseudoType2["Backdrop"] = "backdrop";
    PseudoType2["Column"] = "column";
    PseudoType2["Selection"] = "selection";
    PseudoType2["SearchText"] = "search-text";
    PseudoType2["TargetText"] = "target-text";
    PseudoType2["SpellingError"] = "spelling-error";
    PseudoType2["GrammarError"] = "grammar-error";
    PseudoType2["Highlight"] = "highlight";
    PseudoType2["FirstLineInherited"] = "first-line-inherited";
    PseudoType2["ScrollMarker"] = "scroll-marker";
    PseudoType2["ScrollMarkerGroup"] = "scroll-marker-group";
    PseudoType2["ScrollButton"] = "scroll-button";
    PseudoType2["Scrollbar"] = "scrollbar";
    PseudoType2["ScrollbarThumb"] = "scrollbar-thumb";
    PseudoType2["ScrollbarButton"] = "scrollbar-button";
    PseudoType2["ScrollbarTrack"] = "scrollbar-track";
    PseudoType2["ScrollbarTrackPiece"] = "scrollbar-track-piece";
    PseudoType2["ScrollbarCorner"] = "scrollbar-corner";
    PseudoType2["Resizer"] = "resizer";
    PseudoType2["InputListButton"] = "input-list-button";
    PseudoType2["ViewTransition"] = "view-transition";
    PseudoType2["ViewTransitionGroup"] = "view-transition-group";
    PseudoType2["ViewTransitionImagePair"] = "view-transition-image-pair";
    PseudoType2["ViewTransitionGroupChildren"] = "view-transition-group-children";
    PseudoType2["ViewTransitionOld"] = "view-transition-old";
    PseudoType2["ViewTransitionNew"] = "view-transition-new";
    PseudoType2["Placeholder"] = "placeholder";
    PseudoType2["FileSelectorButton"] = "file-selector-button";
    PseudoType2["DetailsContent"] = "details-content";
    PseudoType2["Picker"] = "picker";
    PseudoType2["SelectListbox"] = "select-listbox";
    PseudoType2["PermissionIcon"] = "permission-icon";
    PseudoType2["OverscrollAreaParent"] = "overscroll-area-parent";
    PseudoType2["OverscrollBackdrop"] = "overscroll-backdrop";
    PseudoType2["Skeleton"] = "skeleton";
  })(PseudoType = DOM2.PseudoType || (DOM2.PseudoType = {}));
  let ShadowRootType;
  ((ShadowRootType2) => {
    ShadowRootType2["UserAgent"] = "user-agent";
    ShadowRootType2["Open"] = "open";
    ShadowRootType2["Closed"] = "closed";
  })(ShadowRootType = DOM2.ShadowRootType || (DOM2.ShadowRootType = {}));
  let CompatibilityMode;
  ((CompatibilityMode2) => {
    CompatibilityMode2["QuirksMode"] = "QuirksMode";
    CompatibilityMode2["LimitedQuirksMode"] = "LimitedQuirksMode";
    CompatibilityMode2["NoQuirksMode"] = "NoQuirksMode";
  })(CompatibilityMode = DOM2.CompatibilityMode || (DOM2.CompatibilityMode = {}));
  let PhysicalAxes;
  ((PhysicalAxes2) => {
    PhysicalAxes2["Horizontal"] = "Horizontal";
    PhysicalAxes2["Vertical"] = "Vertical";
    PhysicalAxes2["Both"] = "Both";
  })(PhysicalAxes = DOM2.PhysicalAxes || (DOM2.PhysicalAxes = {}));
  let LogicalAxes;
  ((LogicalAxes2) => {
    LogicalAxes2["Inline"] = "Inline";
    LogicalAxes2["Block"] = "Block";
    LogicalAxes2["Both"] = "Both";
  })(LogicalAxes = DOM2.LogicalAxes || (DOM2.LogicalAxes = {}));
  let ScrollOrientation;
  ((ScrollOrientation2) => {
    ScrollOrientation2["Horizontal"] = "horizontal";
    ScrollOrientation2["Vertical"] = "vertical";
  })(ScrollOrientation = DOM2.ScrollOrientation || (DOM2.ScrollOrientation = {}));
  let EnableRequestIncludeWhitespace;
  ((EnableRequestIncludeWhitespace2) => {
    EnableRequestIncludeWhitespace2["None"] = "none";
    EnableRequestIncludeWhitespace2["All"] = "all";
  })(EnableRequestIncludeWhitespace = DOM2.EnableRequestIncludeWhitespace || (DOM2.EnableRequestIncludeWhitespace = {}));
  let GetElementByRelationRequestRelation;
  ((GetElementByRelationRequestRelation2) => {
    GetElementByRelationRequestRelation2["PopoverTarget"] = "PopoverTarget";
    GetElementByRelationRequestRelation2["InterestTarget"] = "InterestTarget";
    GetElementByRelationRequestRelation2["CommandFor"] = "CommandFor";
  })(GetElementByRelationRequestRelation = DOM2.GetElementByRelationRequestRelation || (DOM2.GetElementByRelationRequestRelation = {}));
})(DOM || (DOM = {}));
var DOMDebugger;
((DOMDebugger2) => {
  let DOMBreakpointType;
  ((DOMBreakpointType2) => {
    DOMBreakpointType2["SubtreeModified"] = "subtree-modified";
    DOMBreakpointType2["AttributeModified"] = "attribute-modified";
    DOMBreakpointType2["NodeRemoved"] = "node-removed";
  })(DOMBreakpointType = DOMDebugger2.DOMBreakpointType || (DOMDebugger2.DOMBreakpointType = {}));
  let CSPViolationType;
  ((CSPViolationType2) => {
    CSPViolationType2["TrustedtypeSinkViolation"] = "trustedtype-sink-violation";
    CSPViolationType2["TrustedtypePolicyViolation"] = "trustedtype-policy-violation";
  })(CSPViolationType = DOMDebugger2.CSPViolationType || (DOMDebugger2.CSPViolationType = {}));
})(DOMDebugger || (DOMDebugger = {}));
var DigitalCredentials;
((DigitalCredentials2) => {
  let VirtualWalletAction;
  ((VirtualWalletAction2) => {
    VirtualWalletAction2["Respond"] = "respond";
    VirtualWalletAction2["Decline"] = "decline";
    VirtualWalletAction2["Wait"] = "wait";
    VirtualWalletAction2["Clear"] = "clear";
  })(VirtualWalletAction = DigitalCredentials2.VirtualWalletAction || (DigitalCredentials2.VirtualWalletAction = {}));
})(DigitalCredentials || (DigitalCredentials = {}));
var Emulation;
((Emulation2) => {
  let ScreenOrientationType;
  ((ScreenOrientationType2) => {
    ScreenOrientationType2["PortraitPrimary"] = "portraitPrimary";
    ScreenOrientationType2["PortraitSecondary"] = "portraitSecondary";
    ScreenOrientationType2["LandscapePrimary"] = "landscapePrimary";
    ScreenOrientationType2["LandscapeSecondary"] = "landscapeSecondary";
  })(ScreenOrientationType = Emulation2.ScreenOrientationType || (Emulation2.ScreenOrientationType = {}));
  let DisplayFeatureOrientation;
  ((DisplayFeatureOrientation2) => {
    DisplayFeatureOrientation2["Vertical"] = "vertical";
    DisplayFeatureOrientation2["Horizontal"] = "horizontal";
  })(DisplayFeatureOrientation = Emulation2.DisplayFeatureOrientation || (Emulation2.DisplayFeatureOrientation = {}));
  let DevicePostureType;
  ((DevicePostureType2) => {
    DevicePostureType2["Continuous"] = "continuous";
    DevicePostureType2["Folded"] = "folded";
  })(DevicePostureType = Emulation2.DevicePostureType || (Emulation2.DevicePostureType = {}));
  let VirtualTimePolicy;
  ((VirtualTimePolicy2) => {
    VirtualTimePolicy2["Advance"] = "advance";
    VirtualTimePolicy2["Pause"] = "pause";
    VirtualTimePolicy2["PauseIfNetworkFetchesPending"] = "pauseIfNetworkFetchesPending";
  })(VirtualTimePolicy = Emulation2.VirtualTimePolicy || (Emulation2.VirtualTimePolicy = {}));
  let SensorType;
  ((SensorType2) => {
    SensorType2["AbsoluteOrientation"] = "absolute-orientation";
    SensorType2["Accelerometer"] = "accelerometer";
    SensorType2["AmbientLight"] = "ambient-light";
    SensorType2["Gravity"] = "gravity";
    SensorType2["Gyroscope"] = "gyroscope";
    SensorType2["LinearAcceleration"] = "linear-acceleration";
    SensorType2["Magnetometer"] = "magnetometer";
    SensorType2["RelativeOrientation"] = "relative-orientation";
  })(SensorType = Emulation2.SensorType || (Emulation2.SensorType = {}));
  let PressureSource;
  ((PressureSource2) => {
    PressureSource2["Cpu"] = "cpu";
  })(PressureSource = Emulation2.PressureSource || (Emulation2.PressureSource = {}));
  let PressureState;
  ((PressureState2) => {
    PressureState2["Nominal"] = "nominal";
    PressureState2["Fair"] = "fair";
    PressureState2["Serious"] = "serious";
    PressureState2["Critical"] = "critical";
  })(PressureState = Emulation2.PressureState || (Emulation2.PressureState = {}));
  let DisabledImageType;
  ((DisabledImageType2) => {
    DisabledImageType2["Avif"] = "avif";
    DisabledImageType2["Jxl"] = "jxl";
    DisabledImageType2["Webp"] = "webp";
  })(DisabledImageType = Emulation2.DisabledImageType || (Emulation2.DisabledImageType = {}));
  let SetDeviceMetricsOverrideRequestScrollbarType;
  ((SetDeviceMetricsOverrideRequestScrollbarType2) => {
    SetDeviceMetricsOverrideRequestScrollbarType2["Overlay"] = "overlay";
    SetDeviceMetricsOverrideRequestScrollbarType2["Default"] = "default";
  })(SetDeviceMetricsOverrideRequestScrollbarType = Emulation2.SetDeviceMetricsOverrideRequestScrollbarType || (Emulation2.SetDeviceMetricsOverrideRequestScrollbarType = {}));
  let SetEmitTouchEventsForMouseRequestConfiguration;
  ((SetEmitTouchEventsForMouseRequestConfiguration2) => {
    SetEmitTouchEventsForMouseRequestConfiguration2["Mobile"] = "mobile";
    SetEmitTouchEventsForMouseRequestConfiguration2["Desktop"] = "desktop";
  })(SetEmitTouchEventsForMouseRequestConfiguration = Emulation2.SetEmitTouchEventsForMouseRequestConfiguration || (Emulation2.SetEmitTouchEventsForMouseRequestConfiguration = {}));
  let SetEmulatedVisionDeficiencyRequestType;
  ((SetEmulatedVisionDeficiencyRequestType2) => {
    SetEmulatedVisionDeficiencyRequestType2["None"] = "none";
    SetEmulatedVisionDeficiencyRequestType2["BlurredVision"] = "blurredVision";
    SetEmulatedVisionDeficiencyRequestType2["ReducedContrast"] = "reducedContrast";
    SetEmulatedVisionDeficiencyRequestType2["Achromatopsia"] = "achromatopsia";
    SetEmulatedVisionDeficiencyRequestType2["Deuteranopia"] = "deuteranopia";
    SetEmulatedVisionDeficiencyRequestType2["Protanopia"] = "protanopia";
    SetEmulatedVisionDeficiencyRequestType2["Tritanopia"] = "tritanopia";
  })(SetEmulatedVisionDeficiencyRequestType = Emulation2.SetEmulatedVisionDeficiencyRequestType || (Emulation2.SetEmulatedVisionDeficiencyRequestType = {}));
  let SetCPUPerformanceOverrideRequestPerformanceTier;
  ((SetCPUPerformanceOverrideRequestPerformanceTier2) => {
    SetCPUPerformanceOverrideRequestPerformanceTier2["Unknown"] = "unknown";
    SetCPUPerformanceOverrideRequestPerformanceTier2["Low"] = "low";
    SetCPUPerformanceOverrideRequestPerformanceTier2["Mid"] = "mid";
    SetCPUPerformanceOverrideRequestPerformanceTier2["High"] = "high";
    SetCPUPerformanceOverrideRequestPerformanceTier2["Ultra"] = "ultra";
  })(SetCPUPerformanceOverrideRequestPerformanceTier = Emulation2.SetCPUPerformanceOverrideRequestPerformanceTier || (Emulation2.SetCPUPerformanceOverrideRequestPerformanceTier = {}));
})(Emulation || (Emulation = {}));
var Extensions;
((Extensions2) => {
  let StorageArea;
  ((StorageArea2) => {
    StorageArea2["Session"] = "session";
    StorageArea2["Local"] = "local";
    StorageArea2["Sync"] = "sync";
    StorageArea2["Managed"] = "managed";
  })(StorageArea = Extensions2.StorageArea || (Extensions2.StorageArea = {}));
})(Extensions || (Extensions = {}));
var FedCm;
((FedCm2) => {
  let LoginState;
  ((LoginState2) => {
    LoginState2["SignIn"] = "SignIn";
    LoginState2["SignUp"] = "SignUp";
  })(LoginState = FedCm2.LoginState || (FedCm2.LoginState = {}));
  let DialogType;
  ((DialogType2) => {
    DialogType2["AccountChooser"] = "AccountChooser";
    DialogType2["AutoReauthn"] = "AutoReauthn";
    DialogType2["ConfirmIdpLogin"] = "ConfirmIdpLogin";
    DialogType2["Error"] = "Error";
  })(DialogType = FedCm2.DialogType || (FedCm2.DialogType = {}));
  let DialogButton;
  ((DialogButton2) => {
    DialogButton2["ConfirmIdpLoginContinue"] = "ConfirmIdpLoginContinue";
    DialogButton2["ErrorGotIt"] = "ErrorGotIt";
    DialogButton2["ErrorMoreDetails"] = "ErrorMoreDetails";
  })(DialogButton = FedCm2.DialogButton || (FedCm2.DialogButton = {}));
  let AccountUrlType;
  ((AccountUrlType2) => {
    AccountUrlType2["TermsOfService"] = "TermsOfService";
    AccountUrlType2["PrivacyPolicy"] = "PrivacyPolicy";
  })(AccountUrlType = FedCm2.AccountUrlType || (FedCm2.AccountUrlType = {}));
})(FedCm || (FedCm = {}));
var Fetch;
((Fetch2) => {
  let RequestStage;
  ((RequestStage2) => {
    RequestStage2["Request"] = "Request";
    RequestStage2["Response"] = "Response";
  })(RequestStage = Fetch2.RequestStage || (Fetch2.RequestStage = {}));
  let AuthChallengeSource;
  ((AuthChallengeSource2) => {
    AuthChallengeSource2["Server"] = "Server";
    AuthChallengeSource2["Proxy"] = "Proxy";
  })(AuthChallengeSource = Fetch2.AuthChallengeSource || (Fetch2.AuthChallengeSource = {}));
  let AuthChallengeResponseResponse;
  ((AuthChallengeResponseResponse2) => {
    AuthChallengeResponseResponse2["Default"] = "Default";
    AuthChallengeResponseResponse2["CancelAuth"] = "CancelAuth";
    AuthChallengeResponseResponse2["ProvideCredentials"] = "ProvideCredentials";
  })(AuthChallengeResponseResponse = Fetch2.AuthChallengeResponseResponse || (Fetch2.AuthChallengeResponseResponse = {}));
})(Fetch || (Fetch = {}));
var HeadlessExperimental;
((HeadlessExperimental2) => {
  let ScreenshotParamsFormat;
  ((ScreenshotParamsFormat2) => {
    ScreenshotParamsFormat2["Jpeg"] = "jpeg";
    ScreenshotParamsFormat2["Png"] = "png";
    ScreenshotParamsFormat2["Webp"] = "webp";
  })(ScreenshotParamsFormat = HeadlessExperimental2.ScreenshotParamsFormat || (HeadlessExperimental2.ScreenshotParamsFormat = {}));
})(HeadlessExperimental || (HeadlessExperimental = {}));
var IndexedDB;
((IndexedDB2) => {
  let KeyType;
  ((KeyType2) => {
    KeyType2["Number"] = "number";
    KeyType2["String"] = "string";
    KeyType2["Date"] = "date";
    KeyType2["Array"] = "array";
  })(KeyType = IndexedDB2.KeyType || (IndexedDB2.KeyType = {}));
  let KeyPathType;
  ((KeyPathType2) => {
    KeyPathType2["Null"] = "null";
    KeyPathType2["String"] = "string";
    KeyPathType2["Array"] = "array";
  })(KeyPathType = IndexedDB2.KeyPathType || (IndexedDB2.KeyPathType = {}));
})(IndexedDB || (IndexedDB = {}));
var Input;
((Input2) => {
  let GestureSourceType;
  ((GestureSourceType2) => {
    GestureSourceType2["Default"] = "default";
    GestureSourceType2["Touch"] = "touch";
    GestureSourceType2["Mouse"] = "mouse";
  })(GestureSourceType = Input2.GestureSourceType || (Input2.GestureSourceType = {}));
  let MouseButton;
  ((MouseButton2) => {
    MouseButton2["None"] = "none";
    MouseButton2["Left"] = "left";
    MouseButton2["Middle"] = "middle";
    MouseButton2["Right"] = "right";
    MouseButton2["Back"] = "back";
    MouseButton2["Forward"] = "forward";
  })(MouseButton = Input2.MouseButton || (Input2.MouseButton = {}));
  let DispatchDragEventRequestType;
  ((DispatchDragEventRequestType2) => {
    DispatchDragEventRequestType2["DragEnter"] = "dragEnter";
    DispatchDragEventRequestType2["DragOver"] = "dragOver";
    DispatchDragEventRequestType2["Drop"] = "drop";
    DispatchDragEventRequestType2["DragCancel"] = "dragCancel";
  })(DispatchDragEventRequestType = Input2.DispatchDragEventRequestType || (Input2.DispatchDragEventRequestType = {}));
  let DispatchKeyEventRequestType;
  ((DispatchKeyEventRequestType2) => {
    DispatchKeyEventRequestType2["KeyDown"] = "keyDown";
    DispatchKeyEventRequestType2["KeyUp"] = "keyUp";
    DispatchKeyEventRequestType2["RawKeyDown"] = "rawKeyDown";
    DispatchKeyEventRequestType2["Char"] = "char";
  })(DispatchKeyEventRequestType = Input2.DispatchKeyEventRequestType || (Input2.DispatchKeyEventRequestType = {}));
  let DispatchMouseEventRequestType;
  ((DispatchMouseEventRequestType2) => {
    DispatchMouseEventRequestType2["MousePressed"] = "mousePressed";
    DispatchMouseEventRequestType2["MouseReleased"] = "mouseReleased";
    DispatchMouseEventRequestType2["MouseMoved"] = "mouseMoved";
    DispatchMouseEventRequestType2["MouseWheel"] = "mouseWheel";
  })(DispatchMouseEventRequestType = Input2.DispatchMouseEventRequestType || (Input2.DispatchMouseEventRequestType = {}));
  let DispatchMouseEventRequestPointerType;
  ((DispatchMouseEventRequestPointerType2) => {
    DispatchMouseEventRequestPointerType2["Mouse"] = "mouse";
    DispatchMouseEventRequestPointerType2["Pen"] = "pen";
  })(DispatchMouseEventRequestPointerType = Input2.DispatchMouseEventRequestPointerType || (Input2.DispatchMouseEventRequestPointerType = {}));
  let DispatchTouchEventRequestType;
  ((DispatchTouchEventRequestType2) => {
    DispatchTouchEventRequestType2["TouchStart"] = "touchStart";
    DispatchTouchEventRequestType2["TouchEnd"] = "touchEnd";
    DispatchTouchEventRequestType2["TouchMove"] = "touchMove";
    DispatchTouchEventRequestType2["TouchCancel"] = "touchCancel";
  })(DispatchTouchEventRequestType = Input2.DispatchTouchEventRequestType || (Input2.DispatchTouchEventRequestType = {}));
  let EmulateTouchFromMouseEventRequestType;
  ((EmulateTouchFromMouseEventRequestType2) => {
    EmulateTouchFromMouseEventRequestType2["MousePressed"] = "mousePressed";
    EmulateTouchFromMouseEventRequestType2["MouseReleased"] = "mouseReleased";
    EmulateTouchFromMouseEventRequestType2["MouseMoved"] = "mouseMoved";
    EmulateTouchFromMouseEventRequestType2["MouseWheel"] = "mouseWheel";
  })(EmulateTouchFromMouseEventRequestType = Input2.EmulateTouchFromMouseEventRequestType || (Input2.EmulateTouchFromMouseEventRequestType = {}));
})(Input || (Input = {}));
var LayerTree;
((LayerTree2) => {
  let ScrollRectType;
  ((ScrollRectType2) => {
    ScrollRectType2["RepaintsOnScroll"] = "RepaintsOnScroll";
    ScrollRectType2["TouchEventHandler"] = "TouchEventHandler";
    ScrollRectType2["WheelEventHandler"] = "WheelEventHandler";
  })(ScrollRectType = LayerTree2.ScrollRectType || (LayerTree2.ScrollRectType = {}));
})(LayerTree || (LayerTree = {}));
var Log;
((Log2) => {
  let LogEntrySource;
  ((LogEntrySource2) => {
    LogEntrySource2["XML"] = "xml";
    LogEntrySource2["Javascript"] = "javascript";
    LogEntrySource2["Network"] = "network";
    LogEntrySource2["Storage"] = "storage";
    LogEntrySource2["Appcache"] = "appcache";
    LogEntrySource2["Rendering"] = "rendering";
    LogEntrySource2["Security"] = "security";
    LogEntrySource2["Deprecation"] = "deprecation";
    LogEntrySource2["Worker"] = "worker";
    LogEntrySource2["Violation"] = "violation";
    LogEntrySource2["Intervention"] = "intervention";
    LogEntrySource2["Recommendation"] = "recommendation";
    LogEntrySource2["Other"] = "other";
  })(LogEntrySource = Log2.LogEntrySource || (Log2.LogEntrySource = {}));
  let LogEntryLevel;
  ((LogEntryLevel2) => {
    LogEntryLevel2["Verbose"] = "verbose";
    LogEntryLevel2["Info"] = "info";
    LogEntryLevel2["Warning"] = "warning";
    LogEntryLevel2["Error"] = "error";
  })(LogEntryLevel = Log2.LogEntryLevel || (Log2.LogEntryLevel = {}));
  let LogEntryCategory;
  ((LogEntryCategory2) => {
    LogEntryCategory2["Cors"] = "cors";
  })(LogEntryCategory = Log2.LogEntryCategory || (Log2.LogEntryCategory = {}));
  let ViolationSettingName;
  ((ViolationSettingName2) => {
    ViolationSettingName2["LongTask"] = "longTask";
    ViolationSettingName2["LongLayout"] = "longLayout";
    ViolationSettingName2["BlockedEvent"] = "blockedEvent";
    ViolationSettingName2["BlockedParser"] = "blockedParser";
    ViolationSettingName2["DiscouragedAPIUse"] = "discouragedAPIUse";
    ViolationSettingName2["Handler"] = "handler";
    ViolationSettingName2["RecurringHandler"] = "recurringHandler";
  })(ViolationSettingName = Log2.ViolationSettingName || (Log2.ViolationSettingName = {}));
})(Log || (Log = {}));
var Media;
((Media2) => {
  let PlayerMessageLevel;
  ((PlayerMessageLevel2) => {
    PlayerMessageLevel2["Error"] = "error";
    PlayerMessageLevel2["Warning"] = "warning";
    PlayerMessageLevel2["Info"] = "info";
    PlayerMessageLevel2["Debug"] = "debug";
  })(PlayerMessageLevel = Media2.PlayerMessageLevel || (Media2.PlayerMessageLevel = {}));
})(Media || (Media = {}));
var Memory;
((Memory2) => {
  let PressureLevel;
  ((PressureLevel2) => {
    PressureLevel2["Moderate"] = "moderate";
    PressureLevel2["Critical"] = "critical";
  })(PressureLevel = Memory2.PressureLevel || (Memory2.PressureLevel = {}));
})(Memory || (Memory = {}));
var Network;
((Network2) => {
  let ResourceType;
  ((ResourceType2) => {
    ResourceType2["Document"] = "Document";
    ResourceType2["Stylesheet"] = "Stylesheet";
    ResourceType2["Image"] = "Image";
    ResourceType2["Media"] = "Media";
    ResourceType2["Font"] = "Font";
    ResourceType2["Script"] = "Script";
    ResourceType2["TextTrack"] = "TextTrack";
    ResourceType2["XHR"] = "XHR";
    ResourceType2["Fetch"] = "Fetch";
    ResourceType2["Prefetch"] = "Prefetch";
    ResourceType2["EventSource"] = "EventSource";
    ResourceType2["WebSocket"] = "WebSocket";
    ResourceType2["Manifest"] = "Manifest";
    ResourceType2["SignedExchange"] = "SignedExchange";
    ResourceType2["Ping"] = "Ping";
    ResourceType2["CSPViolationReport"] = "CSPViolationReport";
    ResourceType2["Preflight"] = "Preflight";
    ResourceType2["FedCM"] = "FedCM";
    ResourceType2["Other"] = "Other";
  })(ResourceType = Network2.ResourceType || (Network2.ResourceType = {}));
  let ErrorReason;
  ((ErrorReason2) => {
    ErrorReason2["Failed"] = "Failed";
    ErrorReason2["Aborted"] = "Aborted";
    ErrorReason2["TimedOut"] = "TimedOut";
    ErrorReason2["AccessDenied"] = "AccessDenied";
    ErrorReason2["ConnectionClosed"] = "ConnectionClosed";
    ErrorReason2["ConnectionReset"] = "ConnectionReset";
    ErrorReason2["ConnectionRefused"] = "ConnectionRefused";
    ErrorReason2["ConnectionAborted"] = "ConnectionAborted";
    ErrorReason2["ConnectionFailed"] = "ConnectionFailed";
    ErrorReason2["NameNotResolved"] = "NameNotResolved";
    ErrorReason2["InternetDisconnected"] = "InternetDisconnected";
    ErrorReason2["AddressUnreachable"] = "AddressUnreachable";
    ErrorReason2["BlockedByClient"] = "BlockedByClient";
    ErrorReason2["BlockedByResponse"] = "BlockedByResponse";
  })(ErrorReason = Network2.ErrorReason || (Network2.ErrorReason = {}));
  let ConnectionType;
  ((ConnectionType2) => {
    ConnectionType2["None"] = "none";
    ConnectionType2["Cellular2g"] = "cellular2g";
    ConnectionType2["Cellular3g"] = "cellular3g";
    ConnectionType2["Cellular4g"] = "cellular4g";
    ConnectionType2["Bluetooth"] = "bluetooth";
    ConnectionType2["Ethernet"] = "ethernet";
    ConnectionType2["Wifi"] = "wifi";
    ConnectionType2["Wimax"] = "wimax";
    ConnectionType2["Other"] = "other";
  })(ConnectionType = Network2.ConnectionType || (Network2.ConnectionType = {}));
  let CookieSameSite;
  ((CookieSameSite2) => {
    CookieSameSite2["Strict"] = "Strict";
    CookieSameSite2["Lax"] = "Lax";
    CookieSameSite2["None"] = "None";
  })(CookieSameSite = Network2.CookieSameSite || (Network2.CookieSameSite = {}));
  let CookiePriority;
  ((CookiePriority2) => {
    CookiePriority2["Low"] = "Low";
    CookiePriority2["Medium"] = "Medium";
    CookiePriority2["High"] = "High";
  })(CookiePriority = Network2.CookiePriority || (Network2.CookiePriority = {}));
  let CookieSourceScheme;
  ((CookieSourceScheme2) => {
    CookieSourceScheme2["Unset"] = "Unset";
    CookieSourceScheme2["NonSecure"] = "NonSecure";
    CookieSourceScheme2["Secure"] = "Secure";
  })(CookieSourceScheme = Network2.CookieSourceScheme || (Network2.CookieSourceScheme = {}));
  let ResourcePriority;
  ((ResourcePriority2) => {
    ResourcePriority2["VeryLow"] = "VeryLow";
    ResourcePriority2["Low"] = "Low";
    ResourcePriority2["Medium"] = "Medium";
    ResourcePriority2["High"] = "High";
    ResourcePriority2["VeryHigh"] = "VeryHigh";
  })(ResourcePriority = Network2.ResourcePriority || (Network2.ResourcePriority = {}));
  let RenderBlockingBehavior;
  ((RenderBlockingBehavior2) => {
    RenderBlockingBehavior2["Blocking"] = "Blocking";
    RenderBlockingBehavior2["InBodyParserBlocking"] = "InBodyParserBlocking";
    RenderBlockingBehavior2["NonBlocking"] = "NonBlocking";
    RenderBlockingBehavior2["NonBlockingDynamic"] = "NonBlockingDynamic";
    RenderBlockingBehavior2["PotentiallyBlocking"] = "PotentiallyBlocking";
  })(RenderBlockingBehavior = Network2.RenderBlockingBehavior || (Network2.RenderBlockingBehavior = {}));
  let RequestReferrerPolicy;
  ((RequestReferrerPolicy2) => {
    RequestReferrerPolicy2["UnsafeUrl"] = "unsafe-url";
    RequestReferrerPolicy2["NoReferrerWhenDowngrade"] = "no-referrer-when-downgrade";
    RequestReferrerPolicy2["NoReferrer"] = "no-referrer";
    RequestReferrerPolicy2["Origin"] = "origin";
    RequestReferrerPolicy2["OriginWhenCrossOrigin"] = "origin-when-cross-origin";
    RequestReferrerPolicy2["SameOrigin"] = "same-origin";
    RequestReferrerPolicy2["StrictOrigin"] = "strict-origin";
    RequestReferrerPolicy2["StrictOriginWhenCrossOrigin"] = "strict-origin-when-cross-origin";
  })(RequestReferrerPolicy = Network2.RequestReferrerPolicy || (Network2.RequestReferrerPolicy = {}));
  let CertificateTransparencyCompliance;
  ((CertificateTransparencyCompliance2) => {
    CertificateTransparencyCompliance2["Unknown"] = "unknown";
    CertificateTransparencyCompliance2["NotCompliant"] = "not-compliant";
    CertificateTransparencyCompliance2["Compliant"] = "compliant";
  })(CertificateTransparencyCompliance = Network2.CertificateTransparencyCompliance || (Network2.CertificateTransparencyCompliance = {}));
  let BlockedReason;
  ((BlockedReason2) => {
    BlockedReason2["Other"] = "other";
    BlockedReason2["Csp"] = "csp";
    BlockedReason2["MixedContent"] = "mixed-content";
    BlockedReason2["Origin"] = "origin";
    BlockedReason2["Inspector"] = "inspector";
    BlockedReason2["Integrity"] = "integrity";
    BlockedReason2["SubresourceFilter"] = "subresource-filter";
    BlockedReason2["ContentType"] = "content-type";
    BlockedReason2["CoepFrameResourceNeedsCoepHeader"] = "coep-frame-resource-needs-coep-header";
    BlockedReason2["CoopSandboxedIframeCannotNavigateToCoopPage"] = "coop-sandboxed-iframe-cannot-navigate-to-coop-page";
    BlockedReason2["CorpNotSameOrigin"] = "corp-not-same-origin";
    BlockedReason2["CorpNotSameOriginAfterDefaultedToSameOriginByCoep"] = "corp-not-same-origin-after-defaulted-to-same-origin-by-coep";
    BlockedReason2["CorpNotSameOriginAfterDefaultedToSameOriginByDip"] = "corp-not-same-origin-after-defaulted-to-same-origin-by-dip";
    BlockedReason2["CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip"] = "corp-not-same-origin-after-defaulted-to-same-origin-by-coep-and-dip";
    BlockedReason2["CorpNotSameSite"] = "corp-not-same-site";
    BlockedReason2["SriMessageSignatureMismatch"] = "sri-message-signature-mismatch";
  })(BlockedReason = Network2.BlockedReason || (Network2.BlockedReason = {}));
  let CorsError;
  ((CorsError2) => {
    CorsError2["DisallowedByMode"] = "DisallowedByMode";
    CorsError2["InvalidResponse"] = "InvalidResponse";
    CorsError2["WildcardOriginNotAllowed"] = "WildcardOriginNotAllowed";
    CorsError2["MissingAllowOriginHeader"] = "MissingAllowOriginHeader";
    CorsError2["MultipleAllowOriginValues"] = "MultipleAllowOriginValues";
    CorsError2["InvalidAllowOriginValue"] = "InvalidAllowOriginValue";
    CorsError2["AllowOriginMismatch"] = "AllowOriginMismatch";
    CorsError2["InvalidAllowCredentials"] = "InvalidAllowCredentials";
    CorsError2["CorsDisabledScheme"] = "CorsDisabledScheme";
    CorsError2["PreflightInvalidStatus"] = "PreflightInvalidStatus";
    CorsError2["PreflightDisallowedRedirect"] = "PreflightDisallowedRedirect";
    CorsError2["PreflightWildcardOriginNotAllowed"] = "PreflightWildcardOriginNotAllowed";
    CorsError2["PreflightMissingAllowOriginHeader"] = "PreflightMissingAllowOriginHeader";
    CorsError2["PreflightMultipleAllowOriginValues"] = "PreflightMultipleAllowOriginValues";
    CorsError2["PreflightInvalidAllowOriginValue"] = "PreflightInvalidAllowOriginValue";
    CorsError2["PreflightAllowOriginMismatch"] = "PreflightAllowOriginMismatch";
    CorsError2["PreflightInvalidAllowCredentials"] = "PreflightInvalidAllowCredentials";
    CorsError2["PreflightMissingAllowExternal"] = "PreflightMissingAllowExternal";
    CorsError2["PreflightInvalidAllowExternal"] = "PreflightInvalidAllowExternal";
    CorsError2["InvalidAllowMethodsPreflightResponse"] = "InvalidAllowMethodsPreflightResponse";
    CorsError2["InvalidAllowHeadersPreflightResponse"] = "InvalidAllowHeadersPreflightResponse";
    CorsError2["MethodDisallowedByPreflightResponse"] = "MethodDisallowedByPreflightResponse";
    CorsError2["HeaderDisallowedByPreflightResponse"] = "HeaderDisallowedByPreflightResponse";
    CorsError2["RedirectContainsCredentials"] = "RedirectContainsCredentials";
    CorsError2["InsecureLocalNetwork"] = "InsecureLocalNetwork";
    CorsError2["InvalidLocalNetworkAccess"] = "InvalidLocalNetworkAccess";
    CorsError2["NoCorsRedirectModeNotFollow"] = "NoCorsRedirectModeNotFollow";
    CorsError2["LocalNetworkAccessPermissionDenied"] = "LocalNetworkAccessPermissionDenied";
  })(CorsError = Network2.CorsError || (Network2.CorsError = {}));
  let ServiceWorkerResponseSource;
  ((ServiceWorkerResponseSource2) => {
    ServiceWorkerResponseSource2["CacheStorage"] = "cache-storage";
    ServiceWorkerResponseSource2["HttpCache"] = "http-cache";
    ServiceWorkerResponseSource2["FallbackCode"] = "fallback-code";
    ServiceWorkerResponseSource2["Network"] = "network";
  })(ServiceWorkerResponseSource = Network2.ServiceWorkerResponseSource || (Network2.ServiceWorkerResponseSource = {}));
  let TrustTokenParamsRefreshPolicy;
  ((TrustTokenParamsRefreshPolicy2) => {
    TrustTokenParamsRefreshPolicy2["UseCached"] = "UseCached";
    TrustTokenParamsRefreshPolicy2["Refresh"] = "Refresh";
  })(TrustTokenParamsRefreshPolicy = Network2.TrustTokenParamsRefreshPolicy || (Network2.TrustTokenParamsRefreshPolicy = {}));
  let TrustTokenOperationType;
  ((TrustTokenOperationType2) => {
    TrustTokenOperationType2["Issuance"] = "Issuance";
    TrustTokenOperationType2["Redemption"] = "Redemption";
    TrustTokenOperationType2["Signing"] = "Signing";
  })(TrustTokenOperationType = Network2.TrustTokenOperationType || (Network2.TrustTokenOperationType = {}));
  let AlternateProtocolUsage;
  ((AlternateProtocolUsage2) => {
    AlternateProtocolUsage2["AlternativeJobWonWithoutRace"] = "alternativeJobWonWithoutRace";
    AlternateProtocolUsage2["AlternativeJobWonRace"] = "alternativeJobWonRace";
    AlternateProtocolUsage2["MainJobWonRace"] = "mainJobWonRace";
    AlternateProtocolUsage2["MappingMissing"] = "mappingMissing";
    AlternateProtocolUsage2["Broken"] = "broken";
    AlternateProtocolUsage2["DnsAlpnH3JobWonWithoutRace"] = "dnsAlpnH3JobWonWithoutRace";
    AlternateProtocolUsage2["DnsAlpnH3JobWonRace"] = "dnsAlpnH3JobWonRace";
    AlternateProtocolUsage2["UnspecifiedReason"] = "unspecifiedReason";
  })(AlternateProtocolUsage = Network2.AlternateProtocolUsage || (Network2.AlternateProtocolUsage = {}));
  let ServiceWorkerRouterSource;
  ((ServiceWorkerRouterSource2) => {
    ServiceWorkerRouterSource2["Network"] = "network";
    ServiceWorkerRouterSource2["Cache"] = "cache";
    ServiceWorkerRouterSource2["FetchEvent"] = "fetch-event";
    ServiceWorkerRouterSource2["RaceNetworkAndFetchHandler"] = "race-network-and-fetch-handler";
    ServiceWorkerRouterSource2["RaceNetworkAndCache"] = "race-network-and-cache";
  })(ServiceWorkerRouterSource = Network2.ServiceWorkerRouterSource || (Network2.ServiceWorkerRouterSource = {}));
  let InitiatorType;
  ((InitiatorType2) => {
    InitiatorType2["Parser"] = "parser";
    InitiatorType2["Script"] = "script";
    InitiatorType2["Preload"] = "preload";
    InitiatorType2["SignedExchange"] = "SignedExchange";
    InitiatorType2["Preflight"] = "preflight";
    InitiatorType2["FedCM"] = "FedCM";
    InitiatorType2["Other"] = "other";
  })(InitiatorType = Network2.InitiatorType || (Network2.InitiatorType = {}));
  let SetCookieBlockedReason;
  ((SetCookieBlockedReason2) => {
    SetCookieBlockedReason2["SecureOnly"] = "SecureOnly";
    SetCookieBlockedReason2["SameSiteStrict"] = "SameSiteStrict";
    SetCookieBlockedReason2["SameSiteLax"] = "SameSiteLax";
    SetCookieBlockedReason2["SameSiteUnspecifiedTreatedAsLax"] = "SameSiteUnspecifiedTreatedAsLax";
    SetCookieBlockedReason2["SameSiteNoneInsecure"] = "SameSiteNoneInsecure";
    SetCookieBlockedReason2["UserPreferences"] = "UserPreferences";
    SetCookieBlockedReason2["ThirdPartyPhaseout"] = "ThirdPartyPhaseout";
    SetCookieBlockedReason2["ThirdPartyBlockedInFirstPartySet"] = "ThirdPartyBlockedInFirstPartySet";
    SetCookieBlockedReason2["SyntaxError"] = "SyntaxError";
    SetCookieBlockedReason2["SchemeNotSupported"] = "SchemeNotSupported";
    SetCookieBlockedReason2["OverwriteSecure"] = "OverwriteSecure";
    SetCookieBlockedReason2["InvalidDomain"] = "InvalidDomain";
    SetCookieBlockedReason2["InvalidPrefix"] = "InvalidPrefix";
    SetCookieBlockedReason2["UnknownError"] = "UnknownError";
    SetCookieBlockedReason2["SchemefulSameSiteStrict"] = "SchemefulSameSiteStrict";
    SetCookieBlockedReason2["SchemefulSameSiteLax"] = "SchemefulSameSiteLax";
    SetCookieBlockedReason2["SchemefulSameSiteUnspecifiedTreatedAsLax"] = "SchemefulSameSiteUnspecifiedTreatedAsLax";
    SetCookieBlockedReason2["NameValuePairExceedsMaxSize"] = "NameValuePairExceedsMaxSize";
    SetCookieBlockedReason2["DisallowedCharacter"] = "DisallowedCharacter";
    SetCookieBlockedReason2["NoCookieContent"] = "NoCookieContent";
  })(SetCookieBlockedReason = Network2.SetCookieBlockedReason || (Network2.SetCookieBlockedReason = {}));
  let CookieBlockedReason;
  ((CookieBlockedReason2) => {
    CookieBlockedReason2["SecureOnly"] = "SecureOnly";
    CookieBlockedReason2["NotOnPath"] = "NotOnPath";
    CookieBlockedReason2["DomainMismatch"] = "DomainMismatch";
    CookieBlockedReason2["SameSiteStrict"] = "SameSiteStrict";
    CookieBlockedReason2["SameSiteLax"] = "SameSiteLax";
    CookieBlockedReason2["SameSiteUnspecifiedTreatedAsLax"] = "SameSiteUnspecifiedTreatedAsLax";
    CookieBlockedReason2["SameSiteNoneInsecure"] = "SameSiteNoneInsecure";
    CookieBlockedReason2["UserPreferences"] = "UserPreferences";
    CookieBlockedReason2["ThirdPartyPhaseout"] = "ThirdPartyPhaseout";
    CookieBlockedReason2["ThirdPartyBlockedInFirstPartySet"] = "ThirdPartyBlockedInFirstPartySet";
    CookieBlockedReason2["UnknownError"] = "UnknownError";
    CookieBlockedReason2["SchemefulSameSiteStrict"] = "SchemefulSameSiteStrict";
    CookieBlockedReason2["SchemefulSameSiteLax"] = "SchemefulSameSiteLax";
    CookieBlockedReason2["SchemefulSameSiteUnspecifiedTreatedAsLax"] = "SchemefulSameSiteUnspecifiedTreatedAsLax";
    CookieBlockedReason2["NameValuePairExceedsMaxSize"] = "NameValuePairExceedsMaxSize";
    CookieBlockedReason2["PortMismatch"] = "PortMismatch";
    CookieBlockedReason2["SchemeMismatch"] = "SchemeMismatch";
    CookieBlockedReason2["AnonymousContext"] = "AnonymousContext";
  })(CookieBlockedReason = Network2.CookieBlockedReason || (Network2.CookieBlockedReason = {}));
  let CookieExemptionReason;
  ((CookieExemptionReason2) => {
    CookieExemptionReason2["None"] = "None";
    CookieExemptionReason2["UserSetting"] = "UserSetting";
    CookieExemptionReason2["EnterprisePolicy"] = "EnterprisePolicy";
    CookieExemptionReason2["StorageAccess"] = "StorageAccess";
    CookieExemptionReason2["TopLevelStorageAccess"] = "TopLevelStorageAccess";
    CookieExemptionReason2["Scheme"] = "Scheme";
    CookieExemptionReason2["SameSiteNoneCookiesInSandbox"] = "SameSiteNoneCookiesInSandbox";
  })(CookieExemptionReason = Network2.CookieExemptionReason || (Network2.CookieExemptionReason = {}));
  let AuthChallengeSource;
  ((AuthChallengeSource2) => {
    AuthChallengeSource2["Server"] = "Server";
    AuthChallengeSource2["Proxy"] = "Proxy";
  })(AuthChallengeSource = Network2.AuthChallengeSource || (Network2.AuthChallengeSource = {}));
  let AuthChallengeResponseResponse;
  ((AuthChallengeResponseResponse2) => {
    AuthChallengeResponseResponse2["Default"] = "Default";
    AuthChallengeResponseResponse2["CancelAuth"] = "CancelAuth";
    AuthChallengeResponseResponse2["ProvideCredentials"] = "ProvideCredentials";
  })(AuthChallengeResponseResponse = Network2.AuthChallengeResponseResponse || (Network2.AuthChallengeResponseResponse = {}));
  let SignedExchangeErrorField;
  ((SignedExchangeErrorField2) => {
    SignedExchangeErrorField2["SignatureSig"] = "signatureSig";
    SignedExchangeErrorField2["SignatureIntegrity"] = "signatureIntegrity";
    SignedExchangeErrorField2["SignatureCertUrl"] = "signatureCertUrl";
    SignedExchangeErrorField2["SignatureCertSha256"] = "signatureCertSha256";
    SignedExchangeErrorField2["SignatureValidityUrl"] = "signatureValidityUrl";
    SignedExchangeErrorField2["SignatureTimestamps"] = "signatureTimestamps";
  })(SignedExchangeErrorField = Network2.SignedExchangeErrorField || (Network2.SignedExchangeErrorField = {}));
  let DirectSocketDnsQueryType;
  ((DirectSocketDnsQueryType2) => {
    DirectSocketDnsQueryType2["Ipv4"] = "ipv4";
    DirectSocketDnsQueryType2["Ipv6"] = "ipv6";
  })(DirectSocketDnsQueryType = Network2.DirectSocketDnsQueryType || (Network2.DirectSocketDnsQueryType = {}));
  let LocalNetworkAccessRequestPolicy;
  ((LocalNetworkAccessRequestPolicy2) => {
    LocalNetworkAccessRequestPolicy2["Allow"] = "Allow";
    LocalNetworkAccessRequestPolicy2["BlockFromInsecureToMorePrivate"] = "BlockFromInsecureToMorePrivate";
    LocalNetworkAccessRequestPolicy2["WarnFromInsecureToMorePrivate"] = "WarnFromInsecureToMorePrivate";
    LocalNetworkAccessRequestPolicy2["PermissionBlock"] = "PermissionBlock";
    LocalNetworkAccessRequestPolicy2["PermissionWarn"] = "PermissionWarn";
  })(LocalNetworkAccessRequestPolicy = Network2.LocalNetworkAccessRequestPolicy || (Network2.LocalNetworkAccessRequestPolicy = {}));
  let IPAddressSpace;
  ((IPAddressSpace2) => {
    IPAddressSpace2["Loopback"] = "Loopback";
    IPAddressSpace2["Local"] = "Local";
    IPAddressSpace2["Public"] = "Public";
    IPAddressSpace2["Unknown"] = "Unknown";
  })(IPAddressSpace = Network2.IPAddressSpace || (Network2.IPAddressSpace = {}));
  let CrossOriginOpenerPolicyValue;
  ((CrossOriginOpenerPolicyValue2) => {
    CrossOriginOpenerPolicyValue2["SameOrigin"] = "SameOrigin";
    CrossOriginOpenerPolicyValue2["SameOriginAllowPopups"] = "SameOriginAllowPopups";
    CrossOriginOpenerPolicyValue2["RestrictProperties"] = "RestrictProperties";
    CrossOriginOpenerPolicyValue2["UnsafeNone"] = "UnsafeNone";
    CrossOriginOpenerPolicyValue2["SameOriginPlusCoep"] = "SameOriginPlusCoep";
    CrossOriginOpenerPolicyValue2["RestrictPropertiesPlusCoep"] = "RestrictPropertiesPlusCoep";
    CrossOriginOpenerPolicyValue2["NoopenerAllowPopups"] = "NoopenerAllowPopups";
  })(CrossOriginOpenerPolicyValue = Network2.CrossOriginOpenerPolicyValue || (Network2.CrossOriginOpenerPolicyValue = {}));
  let CrossOriginEmbedderPolicyValue;
  ((CrossOriginEmbedderPolicyValue2) => {
    CrossOriginEmbedderPolicyValue2["None"] = "None";
    CrossOriginEmbedderPolicyValue2["Credentialless"] = "Credentialless";
    CrossOriginEmbedderPolicyValue2["RequireCorp"] = "RequireCorp";
  })(CrossOriginEmbedderPolicyValue = Network2.CrossOriginEmbedderPolicyValue || (Network2.CrossOriginEmbedderPolicyValue = {}));
  let ContentSecurityPolicySource;
  ((ContentSecurityPolicySource2) => {
    ContentSecurityPolicySource2["HTTP"] = "HTTP";
    ContentSecurityPolicySource2["Meta"] = "Meta";
  })(ContentSecurityPolicySource = Network2.ContentSecurityPolicySource || (Network2.ContentSecurityPolicySource = {}));
  let ReportStatus;
  ((ReportStatus2) => {
    ReportStatus2["Queued"] = "Queued";
    ReportStatus2["Pending"] = "Pending";
    ReportStatus2["MarkedForRemoval"] = "MarkedForRemoval";
    ReportStatus2["Success"] = "Success";
  })(ReportStatus = Network2.ReportStatus || (Network2.ReportStatus = {}));
  let DeviceBoundSessionWithUsageUsage;
  ((DeviceBoundSessionWithUsageUsage2) => {
    DeviceBoundSessionWithUsageUsage2["NotInScope"] = "NotInScope";
    DeviceBoundSessionWithUsageUsage2["InScopeRefreshNotYetNeeded"] = "InScopeRefreshNotYetNeeded";
    DeviceBoundSessionWithUsageUsage2["InScopeRefreshNotAllowed"] = "InScopeRefreshNotAllowed";
    DeviceBoundSessionWithUsageUsage2["ProactiveRefreshNotPossible"] = "ProactiveRefreshNotPossible";
    DeviceBoundSessionWithUsageUsage2["ProactiveRefreshAttempted"] = "ProactiveRefreshAttempted";
    DeviceBoundSessionWithUsageUsage2["Deferred"] = "Deferred";
  })(DeviceBoundSessionWithUsageUsage = Network2.DeviceBoundSessionWithUsageUsage || (Network2.DeviceBoundSessionWithUsageUsage = {}));
  let DeviceBoundSessionUrlRuleRuleType;
  ((DeviceBoundSessionUrlRuleRuleType2) => {
    DeviceBoundSessionUrlRuleRuleType2["Exclude"] = "Exclude";
    DeviceBoundSessionUrlRuleRuleType2["Include"] = "Include";
  })(DeviceBoundSessionUrlRuleRuleType = Network2.DeviceBoundSessionUrlRuleRuleType || (Network2.DeviceBoundSessionUrlRuleRuleType = {}));
  let DeviceBoundSessionFetchResult;
  ((DeviceBoundSessionFetchResult2) => {
    DeviceBoundSessionFetchResult2["Success"] = "Success";
    DeviceBoundSessionFetchResult2["SigningKeyGenerationError"] = "SigningKeyGenerationError";
    DeviceBoundSessionFetchResult2["AttestationKeyGenerationError"] = "AttestationKeyGenerationError";
    DeviceBoundSessionFetchResult2["SigningError"] = "SigningError";
    DeviceBoundSessionFetchResult2["TransientSigningError"] = "TransientSigningError";
    DeviceBoundSessionFetchResult2["ServerRequestedTermination"] = "ServerRequestedTermination";
    DeviceBoundSessionFetchResult2["InvalidSessionId"] = "InvalidSessionId";
    DeviceBoundSessionFetchResult2["InvalidChallenge"] = "InvalidChallenge";
    DeviceBoundSessionFetchResult2["TooManyChallenges"] = "TooManyChallenges";
    DeviceBoundSessionFetchResult2["InvalidFetcherUrl"] = "InvalidFetcherUrl";
    DeviceBoundSessionFetchResult2["InvalidRefreshUrl"] = "InvalidRefreshUrl";
    DeviceBoundSessionFetchResult2["TransientHttpError"] = "TransientHttpError";
    DeviceBoundSessionFetchResult2["ScopeOriginSameSiteMismatch"] = "ScopeOriginSameSiteMismatch";
    DeviceBoundSessionFetchResult2["RefreshUrlSameSiteMismatch"] = "RefreshUrlSameSiteMismatch";
    DeviceBoundSessionFetchResult2["MismatchedSessionId"] = "MismatchedSessionId";
    DeviceBoundSessionFetchResult2["MissingScope"] = "MissingScope";
    DeviceBoundSessionFetchResult2["NoCredentials"] = "NoCredentials";
    DeviceBoundSessionFetchResult2["SubdomainRegistrationWellKnownUnavailable"] = "SubdomainRegistrationWellKnownUnavailable";
    DeviceBoundSessionFetchResult2["SubdomainRegistrationUnauthorized"] = "SubdomainRegistrationUnauthorized";
    DeviceBoundSessionFetchResult2["SubdomainRegistrationWellKnownMalformed"] = "SubdomainRegistrationWellKnownMalformed";
    DeviceBoundSessionFetchResult2["SessionProviderWellKnownUnavailable"] = "SessionProviderWellKnownUnavailable";
    DeviceBoundSessionFetchResult2["RelyingPartyWellKnownUnavailable"] = "RelyingPartyWellKnownUnavailable";
    DeviceBoundSessionFetchResult2["FederatedKeyThumbprintMismatch"] = "FederatedKeyThumbprintMismatch";
    DeviceBoundSessionFetchResult2["InvalidFederatedSessionUrl"] = "InvalidFederatedSessionUrl";
    DeviceBoundSessionFetchResult2["InvalidFederatedKey"] = "InvalidFederatedKey";
    DeviceBoundSessionFetchResult2["TooManyRelyingOriginLabels"] = "TooManyRelyingOriginLabels";
    DeviceBoundSessionFetchResult2["BoundCookieSetForbidden"] = "BoundCookieSetForbidden";
    DeviceBoundSessionFetchResult2["NetError"] = "NetError";
    DeviceBoundSessionFetchResult2["ProxyError"] = "ProxyError";
    DeviceBoundSessionFetchResult2["EmptySessionConfig"] = "EmptySessionConfig";
    DeviceBoundSessionFetchResult2["InvalidCredentialsConfig"] = "InvalidCredentialsConfig";
    DeviceBoundSessionFetchResult2["InvalidCredentialsType"] = "InvalidCredentialsType";
    DeviceBoundSessionFetchResult2["InvalidCredentialsEmptyName"] = "InvalidCredentialsEmptyName";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookie"] = "InvalidCredentialsCookie";
    DeviceBoundSessionFetchResult2["PersistentHttpError"] = "PersistentHttpError";
    DeviceBoundSessionFetchResult2["RegistrationAttemptedChallenge"] = "RegistrationAttemptedChallenge";
    DeviceBoundSessionFetchResult2["InvalidScopeOrigin"] = "InvalidScopeOrigin";
    DeviceBoundSessionFetchResult2["ScopeOriginContainsPath"] = "ScopeOriginContainsPath";
    DeviceBoundSessionFetchResult2["RefreshInitiatorNotString"] = "RefreshInitiatorNotString";
    DeviceBoundSessionFetchResult2["RefreshInitiatorInvalidHostPattern"] = "RefreshInitiatorInvalidHostPattern";
    DeviceBoundSessionFetchResult2["InvalidScopeSpecification"] = "InvalidScopeSpecification";
    DeviceBoundSessionFetchResult2["MissingScopeSpecificationType"] = "MissingScopeSpecificationType";
    DeviceBoundSessionFetchResult2["EmptyScopeSpecificationDomain"] = "EmptyScopeSpecificationDomain";
    DeviceBoundSessionFetchResult2["EmptyScopeSpecificationPath"] = "EmptyScopeSpecificationPath";
    DeviceBoundSessionFetchResult2["InvalidScopeSpecificationType"] = "InvalidScopeSpecificationType";
    DeviceBoundSessionFetchResult2["InvalidScopeIncludeSite"] = "InvalidScopeIncludeSite";
    DeviceBoundSessionFetchResult2["MissingScopeIncludeSite"] = "MissingScopeIncludeSite";
    DeviceBoundSessionFetchResult2["FederatedNotAuthorizedByProvider"] = "FederatedNotAuthorizedByProvider";
    DeviceBoundSessionFetchResult2["FederatedNotAuthorizedByRelyingParty"] = "FederatedNotAuthorizedByRelyingParty";
    DeviceBoundSessionFetchResult2["SessionProviderWellKnownMalformed"] = "SessionProviderWellKnownMalformed";
    DeviceBoundSessionFetchResult2["SessionProviderWellKnownHasProviderOrigin"] = "SessionProviderWellKnownHasProviderOrigin";
    DeviceBoundSessionFetchResult2["RelyingPartyWellKnownMalformed"] = "RelyingPartyWellKnownMalformed";
    DeviceBoundSessionFetchResult2["RelyingPartyWellKnownHasRelyingOrigins"] = "RelyingPartyWellKnownHasRelyingOrigins";
    DeviceBoundSessionFetchResult2["InvalidFederatedSessionProviderSessionMissing"] = "InvalidFederatedSessionProviderSessionMissing";
    DeviceBoundSessionFetchResult2["InvalidFederatedSessionWrongProviderOrigin"] = "InvalidFederatedSessionWrongProviderOrigin";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookieCreationTime"] = "InvalidCredentialsCookieCreationTime";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookieName"] = "InvalidCredentialsCookieName";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookieParsing"] = "InvalidCredentialsCookieParsing";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookieUnpermittedAttribute"] = "InvalidCredentialsCookieUnpermittedAttribute";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookieInvalidDomain"] = "InvalidCredentialsCookieInvalidDomain";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookiePrefix"] = "InvalidCredentialsCookiePrefix";
    DeviceBoundSessionFetchResult2["InvalidScopeRulePath"] = "InvalidScopeRulePath";
    DeviceBoundSessionFetchResult2["InvalidScopeRuleHostPattern"] = "InvalidScopeRuleHostPattern";
    DeviceBoundSessionFetchResult2["ScopeRuleOriginScopedHostPatternMismatch"] = "ScopeRuleOriginScopedHostPatternMismatch";
    DeviceBoundSessionFetchResult2["ScopeRuleSiteScopedHostPatternMismatch"] = "ScopeRuleSiteScopedHostPatternMismatch";
    DeviceBoundSessionFetchResult2["SigningQuotaExceeded"] = "SigningQuotaExceeded";
    DeviceBoundSessionFetchResult2["InvalidConfigJson"] = "InvalidConfigJson";
    DeviceBoundSessionFetchResult2["InvalidFederatedSessionProviderFailedToRestoreKey"] = "InvalidFederatedSessionProviderFailedToRestoreKey";
    DeviceBoundSessionFetchResult2["FailedToUnwrapKey"] = "FailedToUnwrapKey";
    DeviceBoundSessionFetchResult2["SessionDeletedDuringRefresh"] = "SessionDeletedDuringRefresh";
    DeviceBoundSessionFetchResult2["CrossOriginRegistrationSiteNotIncluded"] = "CrossOriginRegistrationSiteNotIncluded";
    DeviceBoundSessionFetchResult2["InvalidPreProvisionedKeyInitiatorMissing"] = "InvalidPreProvisionedKeyInitiatorMissing";
    DeviceBoundSessionFetchResult2["PreProvisionedKeyAccessNotGranted"] = "PreProvisionedKeyAccessNotGranted";
    DeviceBoundSessionFetchResult2["PreProvisionedKeyNotFound"] = "PreProvisionedKeyNotFound";
    DeviceBoundSessionFetchResult2["AttestationCertificationError"] = "AttestationCertificationError";
    DeviceBoundSessionFetchResult2["AttestationSigningError"] = "AttestationSigningError";
  })(DeviceBoundSessionFetchResult = Network2.DeviceBoundSessionFetchResult || (Network2.DeviceBoundSessionFetchResult = {}));
  let RefreshEventDetailsRefreshResult;
  ((RefreshEventDetailsRefreshResult2) => {
    RefreshEventDetailsRefreshResult2["Refreshed"] = "Refreshed";
    RefreshEventDetailsRefreshResult2["InitializedService"] = "InitializedService";
    RefreshEventDetailsRefreshResult2["Unreachable"] = "Unreachable";
    RefreshEventDetailsRefreshResult2["ServerError"] = "ServerError";
    RefreshEventDetailsRefreshResult2["FatalError"] = "FatalError";
    RefreshEventDetailsRefreshResult2["SigningQuotaExceeded"] = "SigningQuotaExceeded";
    RefreshEventDetailsRefreshResult2["RefreshedAsWaiter"] = "RefreshedAsWaiter";
    RefreshEventDetailsRefreshResult2["TransientSigningError"] = "TransientSigningError";
    RefreshEventDetailsRefreshResult2["InScopeRefreshNotYetNeeded"] = "InScopeRefreshNotYetNeeded";
  })(RefreshEventDetailsRefreshResult = Network2.RefreshEventDetailsRefreshResult || (Network2.RefreshEventDetailsRefreshResult = {}));
  let TerminationEventDetailsDeletionReason;
  ((TerminationEventDetailsDeletionReason2) => {
    TerminationEventDetailsDeletionReason2["Expired"] = "Expired";
    TerminationEventDetailsDeletionReason2["FailedToRestoreKey"] = "FailedToRestoreKey";
    TerminationEventDetailsDeletionReason2["FailedToUnwrapKey"] = "FailedToUnwrapKey";
    TerminationEventDetailsDeletionReason2["StoragePartitionCleared"] = "StoragePartitionCleared";
    TerminationEventDetailsDeletionReason2["ClearBrowsingData"] = "ClearBrowsingData";
    TerminationEventDetailsDeletionReason2["ServerRequested"] = "ServerRequested";
    TerminationEventDetailsDeletionReason2["InvalidSessionParams"] = "InvalidSessionParams";
    TerminationEventDetailsDeletionReason2["RefreshFatalError"] = "RefreshFatalError";
    TerminationEventDetailsDeletionReason2["DevTools"] = "DevTools";
  })(TerminationEventDetailsDeletionReason = Network2.TerminationEventDetailsDeletionReason || (Network2.TerminationEventDetailsDeletionReason = {}));
  let ChallengeEventDetailsChallengeResult;
  ((ChallengeEventDetailsChallengeResult2) => {
    ChallengeEventDetailsChallengeResult2["Success"] = "Success";
    ChallengeEventDetailsChallengeResult2["NoSessionId"] = "NoSessionId";
    ChallengeEventDetailsChallengeResult2["NoSessionMatch"] = "NoSessionMatch";
    ChallengeEventDetailsChallengeResult2["CantSetBoundCookie"] = "CantSetBoundCookie";
  })(ChallengeEventDetailsChallengeResult = Network2.ChallengeEventDetailsChallengeResult || (Network2.ChallengeEventDetailsChallengeResult = {}));
  let TrustTokenOperationDoneEventStatus;
  ((TrustTokenOperationDoneEventStatus2) => {
    TrustTokenOperationDoneEventStatus2["Ok"] = "Ok";
    TrustTokenOperationDoneEventStatus2["InvalidArgument"] = "InvalidArgument";
    TrustTokenOperationDoneEventStatus2["MissingIssuerKeys"] = "MissingIssuerKeys";
    TrustTokenOperationDoneEventStatus2["FailedPrecondition"] = "FailedPrecondition";
    TrustTokenOperationDoneEventStatus2["ResourceExhausted"] = "ResourceExhausted";
    TrustTokenOperationDoneEventStatus2["AlreadyExists"] = "AlreadyExists";
    TrustTokenOperationDoneEventStatus2["ResourceLimited"] = "ResourceLimited";
    TrustTokenOperationDoneEventStatus2["Unauthorized"] = "Unauthorized";
    TrustTokenOperationDoneEventStatus2["BadResponse"] = "BadResponse";
    TrustTokenOperationDoneEventStatus2["InternalError"] = "InternalError";
    TrustTokenOperationDoneEventStatus2["UnknownError"] = "UnknownError";
    TrustTokenOperationDoneEventStatus2["FulfilledLocally"] = "FulfilledLocally";
    TrustTokenOperationDoneEventStatus2["SiteIssuerLimit"] = "SiteIssuerLimit";
  })(TrustTokenOperationDoneEventStatus = Network2.TrustTokenOperationDoneEventStatus || (Network2.TrustTokenOperationDoneEventStatus = {}));
})(Network || (Network = {}));
var Overlay;
((Overlay2) => {
  let LineStylePattern;
  ((LineStylePattern2) => {
    LineStylePattern2["Dashed"] = "dashed";
    LineStylePattern2["Dotted"] = "dotted";
  })(LineStylePattern = Overlay2.LineStylePattern || (Overlay2.LineStylePattern = {}));
  let ContrastAlgorithm;
  ((ContrastAlgorithm2) => {
    ContrastAlgorithm2["Aa"] = "aa";
    ContrastAlgorithm2["Aaa"] = "aaa";
    ContrastAlgorithm2["Apca"] = "apca";
  })(ContrastAlgorithm = Overlay2.ContrastAlgorithm || (Overlay2.ContrastAlgorithm = {}));
  let ColorFormat;
  ((ColorFormat2) => {
    ColorFormat2["Rgb"] = "rgb";
    ColorFormat2["Hsl"] = "hsl";
    ColorFormat2["Hwb"] = "hwb";
    ColorFormat2["Hex"] = "hex";
  })(ColorFormat = Overlay2.ColorFormat || (Overlay2.ColorFormat = {}));
  let DisplayCutoutShape;
  ((DisplayCutoutShape2) => {
    DisplayCutoutShape2["Pill"] = "pill";
    DisplayCutoutShape2["Notch"] = "notch";
    DisplayCutoutShape2["Circle"] = "circle";
    DisplayCutoutShape2["Rectangle"] = "rectangle";
  })(DisplayCutoutShape = Overlay2.DisplayCutoutShape || (Overlay2.DisplayCutoutShape = {}));
  let InspectMode;
  ((InspectMode2) => {
    InspectMode2["SearchForNode"] = "searchForNode";
    InspectMode2["SearchForUAShadowDOM"] = "searchForUAShadowDOM";
    InspectMode2["CaptureAreaScreenshot"] = "captureAreaScreenshot";
    InspectMode2["None"] = "none";
  })(InspectMode = Overlay2.InspectMode || (Overlay2.InspectMode = {}));
})(Overlay || (Overlay = {}));
var PWA;
((PWA2) => {
  let DisplayMode;
  ((DisplayMode2) => {
    DisplayMode2["Standalone"] = "standalone";
    DisplayMode2["Browser"] = "browser";
  })(DisplayMode = PWA2.DisplayMode || (PWA2.DisplayMode = {}));
})(PWA || (PWA = {}));
var Page;
((Page2) => {
  let AdFrameType;
  ((AdFrameType2) => {
    AdFrameType2["None"] = "none";
    AdFrameType2["Child"] = "child";
    AdFrameType2["Root"] = "root";
  })(AdFrameType = Page2.AdFrameType || (Page2.AdFrameType = {}));
  let AdFrameExplanation;
  ((AdFrameExplanation2) => {
    AdFrameExplanation2["ParentIsAd"] = "ParentIsAd";
    AdFrameExplanation2["CreatedByAdScript"] = "CreatedByAdScript";
    AdFrameExplanation2["MatchedBlockingRule"] = "MatchedBlockingRule";
  })(AdFrameExplanation = Page2.AdFrameExplanation || (Page2.AdFrameExplanation = {}));
  let SecureContextType;
  ((SecureContextType2) => {
    SecureContextType2["Secure"] = "Secure";
    SecureContextType2["SecureLocalhost"] = "SecureLocalhost";
    SecureContextType2["InsecureScheme"] = "InsecureScheme";
    SecureContextType2["InsecureAncestor"] = "InsecureAncestor";
  })(SecureContextType = Page2.SecureContextType || (Page2.SecureContextType = {}));
  let CrossOriginIsolatedContextType;
  ((CrossOriginIsolatedContextType2) => {
    CrossOriginIsolatedContextType2["Isolated"] = "Isolated";
    CrossOriginIsolatedContextType2["NotIsolated"] = "NotIsolated";
    CrossOriginIsolatedContextType2["NotIsolatedFeatureDisabled"] = "NotIsolatedFeatureDisabled";
  })(CrossOriginIsolatedContextType = Page2.CrossOriginIsolatedContextType || (Page2.CrossOriginIsolatedContextType = {}));
  let GatedAPIFeatures;
  ((GatedAPIFeatures2) => {
    GatedAPIFeatures2["SharedArrayBuffers"] = "SharedArrayBuffers";
    GatedAPIFeatures2["SharedArrayBuffersTransferAllowed"] = "SharedArrayBuffersTransferAllowed";
    GatedAPIFeatures2["PerformanceMeasureMemory"] = "PerformanceMeasureMemory";
    GatedAPIFeatures2["PerformanceProfile"] = "PerformanceProfile";
  })(GatedAPIFeatures = Page2.GatedAPIFeatures || (Page2.GatedAPIFeatures = {}));
  let PermissionsPolicyFeature;
  ((PermissionsPolicyFeature2) => {
    PermissionsPolicyFeature2["Accelerometer"] = "accelerometer";
    PermissionsPolicyFeature2["AllScreensCapture"] = "all-screens-capture";
    PermissionsPolicyFeature2["AmbientLightSensor"] = "ambient-light-sensor";
    PermissionsPolicyFeature2["AriaNotify"] = "aria-notify";
    PermissionsPolicyFeature2["Autofill"] = "autofill";
    PermissionsPolicyFeature2["Autoplay"] = "autoplay";
    PermissionsPolicyFeature2["Bluetooth"] = "bluetooth";
    PermissionsPolicyFeature2["BrowsingTopics"] = "browsing-topics";
    PermissionsPolicyFeature2["Camera"] = "camera";
    PermissionsPolicyFeature2["CapturedSurfaceControl"] = "captured-surface-control";
    PermissionsPolicyFeature2["ChDpr"] = "ch-dpr";
    PermissionsPolicyFeature2["ChDeviceMemory"] = "ch-device-memory";
    PermissionsPolicyFeature2["ChDownlink"] = "ch-downlink";
    PermissionsPolicyFeature2["ChEct"] = "ch-ect";
    PermissionsPolicyFeature2["ChPrefersColorScheme"] = "ch-prefers-color-scheme";
    PermissionsPolicyFeature2["ChPrefersReducedMotion"] = "ch-prefers-reduced-motion";
    PermissionsPolicyFeature2["ChPrefersReducedTransparency"] = "ch-prefers-reduced-transparency";
    PermissionsPolicyFeature2["ChRtt"] = "ch-rtt";
    PermissionsPolicyFeature2["ChSaveData"] = "ch-save-data";
    PermissionsPolicyFeature2["ChUa"] = "ch-ua";
    PermissionsPolicyFeature2["ChUaArch"] = "ch-ua-arch";
    PermissionsPolicyFeature2["ChUaBitness"] = "ch-ua-bitness";
    PermissionsPolicyFeature2["ChUaHighEntropyValues"] = "ch-ua-high-entropy-values";
    PermissionsPolicyFeature2["ChUaPlatform"] = "ch-ua-platform";
    PermissionsPolicyFeature2["ChUaModel"] = "ch-ua-model";
    PermissionsPolicyFeature2["ChUaMobile"] = "ch-ua-mobile";
    PermissionsPolicyFeature2["ChUaFormFactors"] = "ch-ua-form-factors";
    PermissionsPolicyFeature2["ChUaFullVersion"] = "ch-ua-full-version";
    PermissionsPolicyFeature2["ChUaFullVersionList"] = "ch-ua-full-version-list";
    PermissionsPolicyFeature2["ChUaPlatformVersion"] = "ch-ua-platform-version";
    PermissionsPolicyFeature2["ChUaWow64"] = "ch-ua-wow64";
    PermissionsPolicyFeature2["ChViewportHeight"] = "ch-viewport-height";
    PermissionsPolicyFeature2["ChViewportWidth"] = "ch-viewport-width";
    PermissionsPolicyFeature2["ChWidth"] = "ch-width";
    PermissionsPolicyFeature2["ClipboardRead"] = "clipboard-read";
    PermissionsPolicyFeature2["ClipboardWrite"] = "clipboard-write";
    PermissionsPolicyFeature2["ComputePressure"] = "compute-pressure";
    PermissionsPolicyFeature2["ControlledFrame"] = "controlled-frame";
    PermissionsPolicyFeature2["CrossOriginIsolated"] = "cross-origin-isolated";
    PermissionsPolicyFeature2["DeferredFetch"] = "deferred-fetch";
    PermissionsPolicyFeature2["DeferredFetchMinimal"] = "deferred-fetch-minimal";
    PermissionsPolicyFeature2["DeviceAttributes"] = "device-attributes";
    PermissionsPolicyFeature2["DigitalCredentialsCreate"] = "digital-credentials-create";
    PermissionsPolicyFeature2["DigitalCredentialsGet"] = "digital-credentials-get";
    PermissionsPolicyFeature2["DirectSockets"] = "direct-sockets";
    PermissionsPolicyFeature2["DirectSocketsMulticast"] = "direct-sockets-multicast";
    PermissionsPolicyFeature2["DisplayCapture"] = "display-capture";
    PermissionsPolicyFeature2["DocumentDomain"] = "document-domain";
    PermissionsPolicyFeature2["EncryptedMedia"] = "encrypted-media";
    PermissionsPolicyFeature2["ExecutionWhileOutOfViewport"] = "execution-while-out-of-viewport";
    PermissionsPolicyFeature2["ExecutionWhileNotRendered"] = "execution-while-not-rendered";
    PermissionsPolicyFeature2["FocusWithoutUserActivation"] = "focus-without-user-activation";
    PermissionsPolicyFeature2["Fullscreen"] = "fullscreen";
    PermissionsPolicyFeature2["Frobulate"] = "frobulate";
    PermissionsPolicyFeature2["Gamepad"] = "gamepad";
    PermissionsPolicyFeature2["Geolocation"] = "geolocation";
    PermissionsPolicyFeature2["Gyroscope"] = "gyroscope";
    PermissionsPolicyFeature2["Haptics"] = "haptics";
    PermissionsPolicyFeature2["Hid"] = "hid";
    PermissionsPolicyFeature2["IdentityCredentialsGet"] = "identity-credentials-get";
    PermissionsPolicyFeature2["IdleDetection"] = "idle-detection";
    PermissionsPolicyFeature2["InterestCohort"] = "interest-cohort";
    PermissionsPolicyFeature2["KeyboardMap"] = "keyboard-map";
    PermissionsPolicyFeature2["LanguageDetector"] = "language-detector";
    PermissionsPolicyFeature2["LanguageModel"] = "language-model";
    PermissionsPolicyFeature2["LocalFonts"] = "local-fonts";
    PermissionsPolicyFeature2["LocalNetwork"] = "local-network";
    PermissionsPolicyFeature2["LocalNetworkAccess"] = "local-network-access";
    PermissionsPolicyFeature2["LoopbackNetwork"] = "loopback-network";
    PermissionsPolicyFeature2["Magnetometer"] = "magnetometer";
    PermissionsPolicyFeature2["ManualText"] = "manual-text";
    PermissionsPolicyFeature2["MediaPlaybackWhileNotVisible"] = "media-playback-while-not-visible";
    PermissionsPolicyFeature2["Microphone"] = "microphone";
    PermissionsPolicyFeature2["Midi"] = "midi";
    PermissionsPolicyFeature2["OnDeviceSpeechRecognition"] = "on-device-speech-recognition";
    PermissionsPolicyFeature2["OtpCredentials"] = "otp-credentials";
    PermissionsPolicyFeature2["Payment"] = "payment";
    PermissionsPolicyFeature2["PictureInPicture"] = "picture-in-picture";
    PermissionsPolicyFeature2["PrivateStateTokenIssuance"] = "private-state-token-issuance";
    PermissionsPolicyFeature2["PrivateStateTokenRedemption"] = "private-state-token-redemption";
    PermissionsPolicyFeature2["PublickeyCredentialsCreate"] = "publickey-credentials-create";
    PermissionsPolicyFeature2["PublickeyCredentialsGet"] = "publickey-credentials-get";
    PermissionsPolicyFeature2["Rewriter"] = "rewriter";
    PermissionsPolicyFeature2["ScreenWakeLock"] = "screen-wake-lock";
    PermissionsPolicyFeature2["Serial"] = "serial";
    PermissionsPolicyFeature2["SharedStorage"] = "shared-storage";
    PermissionsPolicyFeature2["SharedStorageSelectUrl"] = "shared-storage-select-url";
    PermissionsPolicyFeature2["SmartCard"] = "smart-card";
    PermissionsPolicyFeature2["SpeakerSelection"] = "speaker-selection";
    PermissionsPolicyFeature2["StorageAccess"] = "storage-access";
    PermissionsPolicyFeature2["SubApps"] = "sub-apps";
    PermissionsPolicyFeature2["Summarizer"] = "summarizer";
    PermissionsPolicyFeature2["SyncXhr"] = "sync-xhr";
    PermissionsPolicyFeature2["Tools"] = "tools";
    PermissionsPolicyFeature2["Translator"] = "translator";
    PermissionsPolicyFeature2["Unload"] = "unload";
    PermissionsPolicyFeature2["Usb"] = "usb";
    PermissionsPolicyFeature2["UsbUnrestricted"] = "usb-unrestricted";
    PermissionsPolicyFeature2["VerticalScroll"] = "vertical-scroll";
    PermissionsPolicyFeature2["WebAppInstallation"] = "web-app-installation";
    PermissionsPolicyFeature2["Webnn"] = "webnn";
    PermissionsPolicyFeature2["WebPrinting"] = "web-printing";
    PermissionsPolicyFeature2["WebShare"] = "web-share";
    PermissionsPolicyFeature2["WindowManagement"] = "window-management";
    PermissionsPolicyFeature2["Writer"] = "writer";
    PermissionsPolicyFeature2["XrSpatialTracking"] = "xr-spatial-tracking";
  })(PermissionsPolicyFeature = Page2.PermissionsPolicyFeature || (Page2.PermissionsPolicyFeature = {}));
  let PermissionsPolicyBlockReason;
  ((PermissionsPolicyBlockReason2) => {
    PermissionsPolicyBlockReason2["Header"] = "Header";
    PermissionsPolicyBlockReason2["IframeAttribute"] = "IframeAttribute";
    PermissionsPolicyBlockReason2["InFencedFrameTree"] = "InFencedFrameTree";
    PermissionsPolicyBlockReason2["InIsolatedApp"] = "InIsolatedApp";
  })(PermissionsPolicyBlockReason = Page2.PermissionsPolicyBlockReason || (Page2.PermissionsPolicyBlockReason = {}));
  let OriginTrialTokenStatus;
  ((OriginTrialTokenStatus2) => {
    OriginTrialTokenStatus2["Success"] = "Success";
    OriginTrialTokenStatus2["NotSupported"] = "NotSupported";
    OriginTrialTokenStatus2["Insecure"] = "Insecure";
    OriginTrialTokenStatus2["Expired"] = "Expired";
    OriginTrialTokenStatus2["WrongOrigin"] = "WrongOrigin";
    OriginTrialTokenStatus2["InvalidSignature"] = "InvalidSignature";
    OriginTrialTokenStatus2["Malformed"] = "Malformed";
    OriginTrialTokenStatus2["WrongVersion"] = "WrongVersion";
    OriginTrialTokenStatus2["FeatureDisabled"] = "FeatureDisabled";
    OriginTrialTokenStatus2["TokenDisabled"] = "TokenDisabled";
    OriginTrialTokenStatus2["FeatureDisabledForUser"] = "FeatureDisabledForUser";
    OriginTrialTokenStatus2["UnknownTrial"] = "UnknownTrial";
  })(OriginTrialTokenStatus = Page2.OriginTrialTokenStatus || (Page2.OriginTrialTokenStatus = {}));
  let OriginTrialStatus;
  ((OriginTrialStatus2) => {
    OriginTrialStatus2["Enabled"] = "Enabled";
    OriginTrialStatus2["ValidTokenNotProvided"] = "ValidTokenNotProvided";
    OriginTrialStatus2["OSNotSupported"] = "OSNotSupported";
    OriginTrialStatus2["TrialNotAllowed"] = "TrialNotAllowed";
  })(OriginTrialStatus = Page2.OriginTrialStatus || (Page2.OriginTrialStatus = {}));
  let OriginTrialUsageRestriction;
  ((OriginTrialUsageRestriction2) => {
    OriginTrialUsageRestriction2["None"] = "None";
    OriginTrialUsageRestriction2["Subset"] = "Subset";
  })(OriginTrialUsageRestriction = Page2.OriginTrialUsageRestriction || (Page2.OriginTrialUsageRestriction = {}));
  let TransitionType;
  ((TransitionType2) => {
    TransitionType2["Link"] = "link";
    TransitionType2["Typed"] = "typed";
    TransitionType2["Address_bar"] = "address_bar";
    TransitionType2["Auto_bookmark"] = "auto_bookmark";
    TransitionType2["Auto_subframe"] = "auto_subframe";
    TransitionType2["Manual_subframe"] = "manual_subframe";
    TransitionType2["Generated"] = "generated";
    TransitionType2["Auto_toplevel"] = "auto_toplevel";
    TransitionType2["Form_submit"] = "form_submit";
    TransitionType2["Reload"] = "reload";
    TransitionType2["Keyword"] = "keyword";
    TransitionType2["Keyword_generated"] = "keyword_generated";
    TransitionType2["Other"] = "other";
  })(TransitionType = Page2.TransitionType || (Page2.TransitionType = {}));
  let DialogType;
  ((DialogType2) => {
    DialogType2["Alert"] = "alert";
    DialogType2["Confirm"] = "confirm";
    DialogType2["Prompt"] = "prompt";
    DialogType2["Beforeunload"] = "beforeunload";
  })(DialogType = Page2.DialogType || (Page2.DialogType = {}));
  let ClientNavigationReason;
  ((ClientNavigationReason2) => {
    ClientNavigationReason2["AnchorClick"] = "anchorClick";
    ClientNavigationReason2["FormSubmissionGet"] = "formSubmissionGet";
    ClientNavigationReason2["FormSubmissionPost"] = "formSubmissionPost";
    ClientNavigationReason2["HttpHeaderRefresh"] = "httpHeaderRefresh";
    ClientNavigationReason2["InitialFrameNavigation"] = "initialFrameNavigation";
    ClientNavigationReason2["MetaTagRefresh"] = "metaTagRefresh";
    ClientNavigationReason2["Other"] = "other";
    ClientNavigationReason2["PageBlockInterstitial"] = "pageBlockInterstitial";
    ClientNavigationReason2["Reload"] = "reload";
    ClientNavigationReason2["ScriptInitiated"] = "scriptInitiated";
  })(ClientNavigationReason = Page2.ClientNavigationReason || (Page2.ClientNavigationReason = {}));
  let ClientNavigationDisposition;
  ((ClientNavigationDisposition2) => {
    ClientNavigationDisposition2["CurrentTab"] = "currentTab";
    ClientNavigationDisposition2["NewTab"] = "newTab";
    ClientNavigationDisposition2["NewWindow"] = "newWindow";
    ClientNavigationDisposition2["Download"] = "download";
  })(ClientNavigationDisposition = Page2.ClientNavigationDisposition || (Page2.ClientNavigationDisposition = {}));
  let ReferrerPolicy;
  ((ReferrerPolicy2) => {
    ReferrerPolicy2["NoReferrer"] = "noReferrer";
    ReferrerPolicy2["NoReferrerWhenDowngrade"] = "noReferrerWhenDowngrade";
    ReferrerPolicy2["Origin"] = "origin";
    ReferrerPolicy2["OriginWhenCrossOrigin"] = "originWhenCrossOrigin";
    ReferrerPolicy2["SameOrigin"] = "sameOrigin";
    ReferrerPolicy2["StrictOrigin"] = "strictOrigin";
    ReferrerPolicy2["StrictOriginWhenCrossOrigin"] = "strictOriginWhenCrossOrigin";
    ReferrerPolicy2["UnsafeUrl"] = "unsafeUrl";
  })(ReferrerPolicy = Page2.ReferrerPolicy || (Page2.ReferrerPolicy = {}));
  let NavigationType;
  ((NavigationType2) => {
    NavigationType2["Navigation"] = "Navigation";
    NavigationType2["BackForwardCacheRestore"] = "BackForwardCacheRestore";
  })(NavigationType = Page2.NavigationType || (Page2.NavigationType = {}));
  let BackForwardCacheNotRestoredReason;
  ((BackForwardCacheNotRestoredReason2) => {
    BackForwardCacheNotRestoredReason2["NotPrimaryMainFrame"] = "NotPrimaryMainFrame";
    BackForwardCacheNotRestoredReason2["BackForwardCacheDisabled"] = "BackForwardCacheDisabled";
    BackForwardCacheNotRestoredReason2["RelatedActiveContentsExist"] = "RelatedActiveContentsExist";
    BackForwardCacheNotRestoredReason2["HTTPStatusNotOK"] = "HTTPStatusNotOK";
    BackForwardCacheNotRestoredReason2["SchemeNotHTTPOrHTTPS"] = "SchemeNotHTTPOrHTTPS";
    BackForwardCacheNotRestoredReason2["Loading"] = "Loading";
    BackForwardCacheNotRestoredReason2["WasGrantedMediaAccess"] = "WasGrantedMediaAccess";
    BackForwardCacheNotRestoredReason2["DisableForRenderFrameHostCalled"] = "DisableForRenderFrameHostCalled";
    BackForwardCacheNotRestoredReason2["DomainNotAllowed"] = "DomainNotAllowed";
    BackForwardCacheNotRestoredReason2["HTTPMethodNotGET"] = "HTTPMethodNotGET";
    BackForwardCacheNotRestoredReason2["SubframeIsNavigating"] = "SubframeIsNavigating";
    BackForwardCacheNotRestoredReason2["Timeout"] = "Timeout";
    BackForwardCacheNotRestoredReason2["CacheLimit"] = "CacheLimit";
    BackForwardCacheNotRestoredReason2["JavaScriptExecution"] = "JavaScriptExecution";
    BackForwardCacheNotRestoredReason2["RendererProcessKilled"] = "RendererProcessKilled";
    BackForwardCacheNotRestoredReason2["RendererProcessCrashed"] = "RendererProcessCrashed";
    BackForwardCacheNotRestoredReason2["SchedulerTrackedFeatureUsed"] = "SchedulerTrackedFeatureUsed";
    BackForwardCacheNotRestoredReason2["ConflictingBrowsingInstance"] = "ConflictingBrowsingInstance";
    BackForwardCacheNotRestoredReason2["CacheFlushed"] = "CacheFlushed";
    BackForwardCacheNotRestoredReason2["ServiceWorkerVersionActivation"] = "ServiceWorkerVersionActivation";
    BackForwardCacheNotRestoredReason2["SessionRestored"] = "SessionRestored";
    BackForwardCacheNotRestoredReason2["ServiceWorkerPostMessage"] = "ServiceWorkerPostMessage";
    BackForwardCacheNotRestoredReason2["EnteredBackForwardCacheBeforeServiceWorkerHostAdded"] = "EnteredBackForwardCacheBeforeServiceWorkerHostAdded";
    BackForwardCacheNotRestoredReason2["RenderFrameHostReused_SameSite"] = "RenderFrameHostReused_SameSite";
    BackForwardCacheNotRestoredReason2["RenderFrameHostReused_CrossSite"] = "RenderFrameHostReused_CrossSite";
    BackForwardCacheNotRestoredReason2["ServiceWorkerClaim"] = "ServiceWorkerClaim";
    BackForwardCacheNotRestoredReason2["IgnoreEventAndEvict"] = "IgnoreEventAndEvict";
    BackForwardCacheNotRestoredReason2["HaveInnerContents"] = "HaveInnerContents";
    BackForwardCacheNotRestoredReason2["TimeoutPuttingInCache"] = "TimeoutPuttingInCache";
    BackForwardCacheNotRestoredReason2["BackForwardCacheDisabledByLowMemory"] = "BackForwardCacheDisabledByLowMemory";
    BackForwardCacheNotRestoredReason2["BackForwardCacheDisabledByCommandLine"] = "BackForwardCacheDisabledByCommandLine";
    BackForwardCacheNotRestoredReason2["NetworkRequestDatAPIpeDrainedAsBytesConsumer"] = "NetworkRequestDatapipeDrainedAsBytesConsumer";
    BackForwardCacheNotRestoredReason2["NetworkRequestRedirected"] = "NetworkRequestRedirected";
    BackForwardCacheNotRestoredReason2["NetworkRequestTimeout"] = "NetworkRequestTimeout";
    BackForwardCacheNotRestoredReason2["NetworkExceedsBufferLimit"] = "NetworkExceedsBufferLimit";
    BackForwardCacheNotRestoredReason2["NavigationCancelledWhileRestoring"] = "NavigationCancelledWhileRestoring";
    BackForwardCacheNotRestoredReason2["NotMostRecentNavigationEntry"] = "NotMostRecentNavigationEntry";
    BackForwardCacheNotRestoredReason2["BackForwardCacheDisabledForPrerender"] = "BackForwardCacheDisabledForPrerender";
    BackForwardCacheNotRestoredReason2["UserAgentOverrideDiffers"] = "UserAgentOverrideDiffers";
    BackForwardCacheNotRestoredReason2["ForegroundCacheLimit"] = "ForegroundCacheLimit";
    BackForwardCacheNotRestoredReason2["ForwardCacheDisabled"] = "ForwardCacheDisabled";
    BackForwardCacheNotRestoredReason2["BrowsingInstanceNotSwapped"] = "BrowsingInstanceNotSwapped";
    BackForwardCacheNotRestoredReason2["BackForwardCacheDisabledForDelegate"] = "BackForwardCacheDisabledForDelegate";
    BackForwardCacheNotRestoredReason2["UnloadHandlerExistsInMainFrame"] = "UnloadHandlerExistsInMainFrame";
    BackForwardCacheNotRestoredReason2["UnloadHandlerExistsInSubFrame"] = "UnloadHandlerExistsInSubFrame";
    BackForwardCacheNotRestoredReason2["ServiceWorkerUnregistration"] = "ServiceWorkerUnregistration";
    BackForwardCacheNotRestoredReason2["CacheControlNoStore"] = "CacheControlNoStore";
    BackForwardCacheNotRestoredReason2["CacheControlNoStoreCookieModified"] = "CacheControlNoStoreCookieModified";
    BackForwardCacheNotRestoredReason2["CacheControlNoStoreHTTPOnlyCookieModified"] = "CacheControlNoStoreHTTPOnlyCookieModified";
    BackForwardCacheNotRestoredReason2["NoResponseHead"] = "NoResponseHead";
    BackForwardCacheNotRestoredReason2["Unknown"] = "Unknown";
    BackForwardCacheNotRestoredReason2["ActivationNavigationsDisallowedForBug1234857"] = "ActivationNavigationsDisallowedForBug1234857";
    BackForwardCacheNotRestoredReason2["ErrorDocument"] = "ErrorDocument";
    BackForwardCacheNotRestoredReason2["FencedFramesEmbedder"] = "FencedFramesEmbedder";
    BackForwardCacheNotRestoredReason2["CookieDisabled"] = "CookieDisabled";
    BackForwardCacheNotRestoredReason2["HTTPAuthRequired"] = "HTTPAuthRequired";
    BackForwardCacheNotRestoredReason2["CookieFlushed"] = "CookieFlushed";
    BackForwardCacheNotRestoredReason2["BroadcastChannelOnMessage"] = "BroadcastChannelOnMessage";
    BackForwardCacheNotRestoredReason2["WebViewSettingsChanged"] = "WebViewSettingsChanged";
    BackForwardCacheNotRestoredReason2["WebViewJavaScriptObjectChanged"] = "WebViewJavaScriptObjectChanged";
    BackForwardCacheNotRestoredReason2["WebViewMessageListenerInjected"] = "WebViewMessageListenerInjected";
    BackForwardCacheNotRestoredReason2["WebViewSafeBrowsingAllowlistChanged"] = "WebViewSafeBrowsingAllowlistChanged";
    BackForwardCacheNotRestoredReason2["WebViewDocumentStartJavascriptChanged"] = "WebViewDocumentStartJavascriptChanged";
    BackForwardCacheNotRestoredReason2["WebSocket"] = "WebSocket";
    BackForwardCacheNotRestoredReason2["WebTransport"] = "WebTransport";
    BackForwardCacheNotRestoredReason2["WebRTC"] = "WebRTC";
    BackForwardCacheNotRestoredReason2["MainResourceHasCacheControlNoStore"] = "MainResourceHasCacheControlNoStore";
    BackForwardCacheNotRestoredReason2["MainResourceHasCacheControlNoCache"] = "MainResourceHasCacheControlNoCache";
    BackForwardCacheNotRestoredReason2["SubresourceHasCacheControlNoStore"] = "SubresourceHasCacheControlNoStore";
    BackForwardCacheNotRestoredReason2["SubresourceHasCacheControlNoCache"] = "SubresourceHasCacheControlNoCache";
    BackForwardCacheNotRestoredReason2["ContainsPlugins"] = "ContainsPlugins";
    BackForwardCacheNotRestoredReason2["DocumentLoaded"] = "DocumentLoaded";
    BackForwardCacheNotRestoredReason2["OutstandingNetworkRequestOthers"] = "OutstandingNetworkRequestOthers";
    BackForwardCacheNotRestoredReason2["RequestedMIDIPermission"] = "RequestedMIDIPermission";
    BackForwardCacheNotRestoredReason2["RequestedAudioCapturePermission"] = "RequestedAudioCapturePermission";
    BackForwardCacheNotRestoredReason2["RequestedVideoCapturePermission"] = "RequestedVideoCapturePermission";
    BackForwardCacheNotRestoredReason2["RequestedBackForwardCacheBlockedSensors"] = "RequestedBackForwardCacheBlockedSensors";
    BackForwardCacheNotRestoredReason2["RequestedBackgroundWorkPermission"] = "RequestedBackgroundWorkPermission";
    BackForwardCacheNotRestoredReason2["BroadcastChannel"] = "BroadcastChannel";
    BackForwardCacheNotRestoredReason2["WebXR"] = "WebXR";
    BackForwardCacheNotRestoredReason2["SharedWorker"] = "SharedWorker";
    BackForwardCacheNotRestoredReason2["SharedWorkerMessage"] = "SharedWorkerMessage";
    BackForwardCacheNotRestoredReason2["SharedWorkerWithNoActiveClient"] = "SharedWorkerWithNoActiveClient";
    BackForwardCacheNotRestoredReason2["WebLocks"] = "WebLocks";
    BackForwardCacheNotRestoredReason2["WebLocksContention"] = "WebLocksContention";
    BackForwardCacheNotRestoredReason2["WebHID"] = "WebHID";
    BackForwardCacheNotRestoredReason2["WebBluetooth"] = "WebBluetooth";
    BackForwardCacheNotRestoredReason2["WebShare"] = "WebShare";
    BackForwardCacheNotRestoredReason2["RequestedStorageAccessGrant"] = "RequestedStorageAccessGrant";
    BackForwardCacheNotRestoredReason2["WebNfc"] = "WebNfc";
    BackForwardCacheNotRestoredReason2["OutstandingNetworkRequestFetch"] = "OutstandingNetworkRequestFetch";
    BackForwardCacheNotRestoredReason2["OutstandingNetworkRequestXHR"] = "OutstandingNetworkRequestXHR";
    BackForwardCacheNotRestoredReason2["AppBanner"] = "AppBanner";
    BackForwardCacheNotRestoredReason2["Printing"] = "Printing";
    BackForwardCacheNotRestoredReason2["WebDatabase"] = "WebDatabase";
    BackForwardCacheNotRestoredReason2["PictureInPicture"] = "PictureInPicture";
    BackForwardCacheNotRestoredReason2["SpeechRecognizer"] = "SpeechRecognizer";
    BackForwardCacheNotRestoredReason2["IdleManager"] = "IdleManager";
    BackForwardCacheNotRestoredReason2["PaymentManager"] = "PaymentManager";
    BackForwardCacheNotRestoredReason2["SpeechSynthesis"] = "SpeechSynthesis";
    BackForwardCacheNotRestoredReason2["KeyboardLock"] = "KeyboardLock";
    BackForwardCacheNotRestoredReason2["WebOTPService"] = "WebOTPService";
    BackForwardCacheNotRestoredReason2["OutstandingNetworkRequestDirectSocket"] = "OutstandingNetworkRequestDirectSocket";
    BackForwardCacheNotRestoredReason2["InjectedJavascript"] = "InjectedJavascript";
    BackForwardCacheNotRestoredReason2["InjectedStyleSheet"] = "InjectedStyleSheet";
    BackForwardCacheNotRestoredReason2["KeepaliveRequest"] = "KeepaliveRequest";
    BackForwardCacheNotRestoredReason2["IndexedDBEvent"] = "IndexedDBEvent";
    BackForwardCacheNotRestoredReason2["Dummy"] = "Dummy";
    BackForwardCacheNotRestoredReason2["JsNetworkRequestReceivedCacheControlNoStoreResource"] = "JsNetworkRequestReceivedCacheControlNoStoreResource";
    BackForwardCacheNotRestoredReason2["WebRTCUsedWithCCNS"] = "WebRTCUsedWithCCNS";
    BackForwardCacheNotRestoredReason2["WebTransportUsedWithCCNS"] = "WebTransportUsedWithCCNS";
    BackForwardCacheNotRestoredReason2["WebSocketUsedWithCCNS"] = "WebSocketUsedWithCCNS";
    BackForwardCacheNotRestoredReason2["SmartCard"] = "SmartCard";
    BackForwardCacheNotRestoredReason2["LiveMediaStreamTrack"] = "LiveMediaStreamTrack";
    BackForwardCacheNotRestoredReason2["UnloadHandler"] = "UnloadHandler";
    BackForwardCacheNotRestoredReason2["ParserAborted"] = "ParserAborted";
    BackForwardCacheNotRestoredReason2["ContentSecurityHandler"] = "ContentSecurityHandler";
    BackForwardCacheNotRestoredReason2["ContentWebAuthenticationAPI"] = "ContentWebAuthenticationAPI";
    BackForwardCacheNotRestoredReason2["ContentFileChooser"] = "ContentFileChooser";
    BackForwardCacheNotRestoredReason2["ContentSerial"] = "ContentSerial";
    BackForwardCacheNotRestoredReason2["ContentFileSystemAccess"] = "ContentFileSystemAccess";
    BackForwardCacheNotRestoredReason2["ContentMediaDevicesDispatcherHost"] = "ContentMediaDevicesDispatcherHost";
    BackForwardCacheNotRestoredReason2["ContentWebBluetooth"] = "ContentWebBluetooth";
    BackForwardCacheNotRestoredReason2["ContentWebUSB"] = "ContentWebUSB";
    BackForwardCacheNotRestoredReason2["ContentMediaSessionService"] = "ContentMediaSessionService";
    BackForwardCacheNotRestoredReason2["ContentScreenReader"] = "ContentScreenReader";
    BackForwardCacheNotRestoredReason2["ContentDiscarded"] = "ContentDiscarded";
    BackForwardCacheNotRestoredReason2["EmbedderPopupBlockerTabHelper"] = "EmbedderPopupBlockerTabHelper";
    BackForwardCacheNotRestoredReason2["EmbedderSafeBrowsingTriggeredPopupBlocker"] = "EmbedderSafeBrowsingTriggeredPopupBlocker";
    BackForwardCacheNotRestoredReason2["EmbedderSafeBrowsingThreatDetails"] = "EmbedderSafeBrowsingThreatDetails";
    BackForwardCacheNotRestoredReason2["EmbedderAppBannerManager"] = "EmbedderAppBannerManager";
    BackForwardCacheNotRestoredReason2["EmbedderDomDistillerViewerSource"] = "EmbedderDomDistillerViewerSource";
    BackForwardCacheNotRestoredReason2["EmbedderDomDistillerSelfDeletingRequestDelegate"] = "EmbedderDomDistillerSelfDeletingRequestDelegate";
    BackForwardCacheNotRestoredReason2["EmbedderOomInterventionTabHelper"] = "EmbedderOomInterventionTabHelper";
    BackForwardCacheNotRestoredReason2["EmbedderOfflinePage"] = "EmbedderOfflinePage";
    BackForwardCacheNotRestoredReason2["EmbedderChromePasswordManagerClientBindCredentialManager"] = "EmbedderChromePasswordManagerClientBindCredentialManager";
    BackForwardCacheNotRestoredReason2["EmbedderPermissionRequestManager"] = "EmbedderPermissionRequestManager";
    BackForwardCacheNotRestoredReason2["EmbedderModalDialog"] = "EmbedderModalDialog";
    BackForwardCacheNotRestoredReason2["EmbedderExtensions"] = "EmbedderExtensions";
    BackForwardCacheNotRestoredReason2["EmbedderExtensionMessaging"] = "EmbedderExtensionMessaging";
    BackForwardCacheNotRestoredReason2["EmbedderExtensionMessagingForOpenPort"] = "EmbedderExtensionMessagingForOpenPort";
    BackForwardCacheNotRestoredReason2["EmbedderExtensionSentMessageToCachedFrame"] = "EmbedderExtensionSentMessageToCachedFrame";
    BackForwardCacheNotRestoredReason2["EmbedderExtensionFrame"] = "EmbedderExtensionFrame";
    BackForwardCacheNotRestoredReason2["EmbedderPrivilegedWebContents"] = "EmbedderPrivilegedWebContents";
    BackForwardCacheNotRestoredReason2["RequestedByWebViewClient"] = "RequestedByWebViewClient";
    BackForwardCacheNotRestoredReason2["PostMessageByWebViewClient"] = "PostMessageByWebViewClient";
    BackForwardCacheNotRestoredReason2["CacheControlNoStoreDeviceBoundSessionTerminated"] = "CacheControlNoStoreDeviceBoundSessionTerminated";
    BackForwardCacheNotRestoredReason2["CacheLimitPrunedOnModerateMemoryPressure"] = "CacheLimitPrunedOnModerateMemoryPressure";
    BackForwardCacheNotRestoredReason2["CacheLimitPrunedOnCriticalMemoryPressure"] = "CacheLimitPrunedOnCriticalMemoryPressure";
  })(BackForwardCacheNotRestoredReason = Page2.BackForwardCacheNotRestoredReason || (Page2.BackForwardCacheNotRestoredReason = {}));
  let BackForwardCacheNotRestoredReasonType;
  ((BackForwardCacheNotRestoredReasonType2) => {
    BackForwardCacheNotRestoredReasonType2["SupportPending"] = "SupportPending";
    BackForwardCacheNotRestoredReasonType2["PageSupportNeeded"] = "PageSupportNeeded";
    BackForwardCacheNotRestoredReasonType2["Circumstantial"] = "Circumstantial";
  })(BackForwardCacheNotRestoredReasonType = Page2.BackForwardCacheNotRestoredReasonType || (Page2.BackForwardCacheNotRestoredReasonType = {}));
  let CaptureScreenshotRequestFormat;
  ((CaptureScreenshotRequestFormat2) => {
    CaptureScreenshotRequestFormat2["Jpeg"] = "jpeg";
    CaptureScreenshotRequestFormat2["Png"] = "png";
    CaptureScreenshotRequestFormat2["Webp"] = "webp";
  })(CaptureScreenshotRequestFormat = Page2.CaptureScreenshotRequestFormat || (Page2.CaptureScreenshotRequestFormat = {}));
  let CaptureSnapshotRequestFormat;
  ((CaptureSnapshotRequestFormat2) => {
    CaptureSnapshotRequestFormat2["MHTML"] = "mhtml";
  })(CaptureSnapshotRequestFormat = Page2.CaptureSnapshotRequestFormat || (Page2.CaptureSnapshotRequestFormat = {}));
  let PrintToPDFRequestTransferMode;
  ((PrintToPDFRequestTransferMode2) => {
    PrintToPDFRequestTransferMode2["ReturnAsBase64"] = "ReturnAsBase64";
    PrintToPDFRequestTransferMode2["ReturnAsStream"] = "ReturnAsStream";
  })(PrintToPDFRequestTransferMode = Page2.PrintToPDFRequestTransferMode || (Page2.PrintToPDFRequestTransferMode = {}));
  let SetDownloadBehaviorRequestBehavior;
  ((SetDownloadBehaviorRequestBehavior2) => {
    SetDownloadBehaviorRequestBehavior2["Deny"] = "deny";
    SetDownloadBehaviorRequestBehavior2["Allow"] = "allow";
    SetDownloadBehaviorRequestBehavior2["Default"] = "default";
  })(SetDownloadBehaviorRequestBehavior = Page2.SetDownloadBehaviorRequestBehavior || (Page2.SetDownloadBehaviorRequestBehavior = {}));
  let SetTouchEmulationEnabledRequestConfiguration;
  ((SetTouchEmulationEnabledRequestConfiguration2) => {
    SetTouchEmulationEnabledRequestConfiguration2["Mobile"] = "mobile";
    SetTouchEmulationEnabledRequestConfiguration2["Desktop"] = "desktop";
  })(SetTouchEmulationEnabledRequestConfiguration = Page2.SetTouchEmulationEnabledRequestConfiguration || (Page2.SetTouchEmulationEnabledRequestConfiguration = {}));
  let StartScreencastRequestFormat;
  ((StartScreencastRequestFormat2) => {
    StartScreencastRequestFormat2["Jpeg"] = "jpeg";
    StartScreencastRequestFormat2["Png"] = "png";
  })(StartScreencastRequestFormat = Page2.StartScreencastRequestFormat || (Page2.StartScreencastRequestFormat = {}));
  let SetWebLifecycleStateRequestState;
  ((SetWebLifecycleStateRequestState2) => {
    SetWebLifecycleStateRequestState2["Frozen"] = "frozen";
    SetWebLifecycleStateRequestState2["Active"] = "active";
  })(SetWebLifecycleStateRequestState = Page2.SetWebLifecycleStateRequestState || (Page2.SetWebLifecycleStateRequestState = {}));
  let SetSPCTransactionModeRequestMode;
  ((SetSPCTransactionModeRequestMode2) => {
    SetSPCTransactionModeRequestMode2["None"] = "none";
    SetSPCTransactionModeRequestMode2["AutoAccept"] = "autoAccept";
    SetSPCTransactionModeRequestMode2["AutoChooseToAuthAnotherWay"] = "autoChooseToAuthAnotherWay";
    SetSPCTransactionModeRequestMode2["AutoReject"] = "autoReject";
    SetSPCTransactionModeRequestMode2["AutoOptOut"] = "autoOptOut";
  })(SetSPCTransactionModeRequestMode = Page2.SetSPCTransactionModeRequestMode || (Page2.SetSPCTransactionModeRequestMode = {}));
  let SetRPHRegistrationModeRequestMode;
  ((SetRPHRegistrationModeRequestMode2) => {
    SetRPHRegistrationModeRequestMode2["None"] = "none";
    SetRPHRegistrationModeRequestMode2["AutoAccept"] = "autoAccept";
    SetRPHRegistrationModeRequestMode2["AutoReject"] = "autoReject";
  })(SetRPHRegistrationModeRequestMode = Page2.SetRPHRegistrationModeRequestMode || (Page2.SetRPHRegistrationModeRequestMode = {}));
  let FileChooserOpenedEventMode;
  ((FileChooserOpenedEventMode2) => {
    FileChooserOpenedEventMode2["SelectSingle"] = "selectSingle";
    FileChooserOpenedEventMode2["SelectMultiple"] = "selectMultiple";
  })(FileChooserOpenedEventMode = Page2.FileChooserOpenedEventMode || (Page2.FileChooserOpenedEventMode = {}));
  let FrameDetachedEventReason;
  ((FrameDetachedEventReason2) => {
    FrameDetachedEventReason2["Remove"] = "remove";
    FrameDetachedEventReason2["Swap"] = "swap";
  })(FrameDetachedEventReason = Page2.FrameDetachedEventReason || (Page2.FrameDetachedEventReason = {}));
  let FrameStartedNavigatingEventNavigationType;
  ((FrameStartedNavigatingEventNavigationType2) => {
    FrameStartedNavigatingEventNavigationType2["Reload"] = "reload";
    FrameStartedNavigatingEventNavigationType2["ReloadBypassingCache"] = "reloadBypassingCache";
    FrameStartedNavigatingEventNavigationType2["Restore"] = "restore";
    FrameStartedNavigatingEventNavigationType2["RestoreWithPost"] = "restoreWithPost";
    FrameStartedNavigatingEventNavigationType2["HistorySameDocument"] = "historySameDocument";
    FrameStartedNavigatingEventNavigationType2["HistoryDifferentDocument"] = "historyDifferentDocument";
    FrameStartedNavigatingEventNavigationType2["SameDocument"] = "sameDocument";
    FrameStartedNavigatingEventNavigationType2["DifferentDocument"] = "differentDocument";
  })(FrameStartedNavigatingEventNavigationType = Page2.FrameStartedNavigatingEventNavigationType || (Page2.FrameStartedNavigatingEventNavigationType = {}));
  let DownloadProgressEventState;
  ((DownloadProgressEventState2) => {
    DownloadProgressEventState2["InProgress"] = "inProgress";
    DownloadProgressEventState2["Completed"] = "completed";
    DownloadProgressEventState2["Canceled"] = "canceled";
  })(DownloadProgressEventState = Page2.DownloadProgressEventState || (Page2.DownloadProgressEventState = {}));
  let NavigatedWithinDocumentEventNavigationType;
  ((NavigatedWithinDocumentEventNavigationType2) => {
    NavigatedWithinDocumentEventNavigationType2["Fragment"] = "fragment";
    NavigatedWithinDocumentEventNavigationType2["HistoryAPI"] = "historyApi";
    NavigatedWithinDocumentEventNavigationType2["Other"] = "other";
  })(NavigatedWithinDocumentEventNavigationType = Page2.NavigatedWithinDocumentEventNavigationType || (Page2.NavigatedWithinDocumentEventNavigationType = {}));
})(Page || (Page = {}));
var Performance;
((Performance2) => {
  let EnableRequestTimeDomain;
  ((EnableRequestTimeDomain2) => {
    EnableRequestTimeDomain2["TimeTicks"] = "timeTicks";
    EnableRequestTimeDomain2["ThreadTicks"] = "threadTicks";
  })(EnableRequestTimeDomain = Performance2.EnableRequestTimeDomain || (Performance2.EnableRequestTimeDomain = {}));
  let SetTimeDomainRequestTimeDomain;
  ((SetTimeDomainRequestTimeDomain2) => {
    SetTimeDomainRequestTimeDomain2["TimeTicks"] = "timeTicks";
    SetTimeDomainRequestTimeDomain2["ThreadTicks"] = "threadTicks";
  })(SetTimeDomainRequestTimeDomain = Performance2.SetTimeDomainRequestTimeDomain || (Performance2.SetTimeDomainRequestTimeDomain = {}));
})(Performance || (Performance = {}));
var Preload;
((Preload2) => {
  let RuleSetErrorType;
  ((RuleSetErrorType2) => {
    RuleSetErrorType2["SourceIsNotJsonObject"] = "SourceIsNotJsonObject";
    RuleSetErrorType2["InvalidRulesSkipped"] = "InvalidRulesSkipped";
    RuleSetErrorType2["InvalidRulesetLevelTag"] = "InvalidRulesetLevelTag";
  })(RuleSetErrorType = Preload2.RuleSetErrorType || (Preload2.RuleSetErrorType = {}));
  let SpeculationAction;
  ((SpeculationAction2) => {
    SpeculationAction2["Prefetch"] = "Prefetch";
    SpeculationAction2["Prerender"] = "Prerender";
    SpeculationAction2["PrerenderUntilScript"] = "PrerenderUntilScript";
  })(SpeculationAction = Preload2.SpeculationAction || (Preload2.SpeculationAction = {}));
  let SpeculationTargetHint;
  ((SpeculationTargetHint2) => {
    SpeculationTargetHint2["Blank"] = "Blank";
    SpeculationTargetHint2["Self"] = "Self";
  })(SpeculationTargetHint = Preload2.SpeculationTargetHint || (Preload2.SpeculationTargetHint = {}));
  let PrerenderFinalStatus;
  ((PrerenderFinalStatus2) => {
    PrerenderFinalStatus2["Activated"] = "Activated";
    PrerenderFinalStatus2["Destroyed"] = "Destroyed";
    PrerenderFinalStatus2["LowEndDevice"] = "LowEndDevice";
    PrerenderFinalStatus2["InvalidSchemeRedirect"] = "InvalidSchemeRedirect";
    PrerenderFinalStatus2["InvalidSchemeNavigation"] = "InvalidSchemeNavigation";
    PrerenderFinalStatus2["NavigationRequestBlockedByCsp"] = "NavigationRequestBlockedByCsp";
    PrerenderFinalStatus2["MojoBinderPolicy"] = "MojoBinderPolicy";
    PrerenderFinalStatus2["RendererProcessCrashed"] = "RendererProcessCrashed";
    PrerenderFinalStatus2["RendererProcessKilled"] = "RendererProcessKilled";
    PrerenderFinalStatus2["Download"] = "Download";
    PrerenderFinalStatus2["TriggerDestroyed"] = "TriggerDestroyed";
    PrerenderFinalStatus2["NavigationNotCommitted"] = "NavigationNotCommitted";
    PrerenderFinalStatus2["NavigationBadHttpStatus"] = "NavigationBadHttpStatus";
    PrerenderFinalStatus2["ClientCertRequested"] = "ClientCertRequested";
    PrerenderFinalStatus2["NavigationRequestNetworkError"] = "NavigationRequestNetworkError";
    PrerenderFinalStatus2["CancelAllHostsForTesting"] = "CancelAllHostsForTesting";
    PrerenderFinalStatus2["DidFailLoad"] = "DidFailLoad";
    PrerenderFinalStatus2["Stop"] = "Stop";
    PrerenderFinalStatus2["SslCertificateError"] = "SslCertificateError";
    PrerenderFinalStatus2["LoginAuthRequested"] = "LoginAuthRequested";
    PrerenderFinalStatus2["UaChangeRequiresReload"] = "UaChangeRequiresReload";
    PrerenderFinalStatus2["BlockedByClient"] = "BlockedByClient";
    PrerenderFinalStatus2["AudioOutputDeviceRequested"] = "AudioOutputDeviceRequested";
    PrerenderFinalStatus2["MixedContent"] = "MixedContent";
    PrerenderFinalStatus2["TriggerBackgrounded"] = "TriggerBackgrounded";
    PrerenderFinalStatus2["MemoryLimitExceeded"] = "MemoryLimitExceeded";
    PrerenderFinalStatus2["DataSaverEnabled"] = "DataSaverEnabled";
    PrerenderFinalStatus2["TriggerUrlHasEffectiveUrl"] = "TriggerUrlHasEffectiveUrl";
    PrerenderFinalStatus2["ActivatedBeforeStarted"] = "ActivatedBeforeStarted";
    PrerenderFinalStatus2["InactivePageRestriction"] = "InactivePageRestriction";
    PrerenderFinalStatus2["StartFailed"] = "StartFailed";
    PrerenderFinalStatus2["TimeoutBackgrounded"] = "TimeoutBackgrounded";
    PrerenderFinalStatus2["CrossSiteRedirectInInitialNavigation"] = "CrossSiteRedirectInInitialNavigation";
    PrerenderFinalStatus2["CrossSiteNavigationInInitialNavigation"] = "CrossSiteNavigationInInitialNavigation";
    PrerenderFinalStatus2["SameSiteCrossOriginRedirectNotOptInInInitialNavigation"] = "SameSiteCrossOriginRedirectNotOptInInInitialNavigation";
    PrerenderFinalStatus2["SameSiteCrossOriginNavigationNotOptInInInitialNavigation"] = "SameSiteCrossOriginNavigationNotOptInInInitialNavigation";
    PrerenderFinalStatus2["ActivationNavigationParameterMismatch"] = "ActivationNavigationParameterMismatch";
    PrerenderFinalStatus2["ActivatedInBackground"] = "ActivatedInBackground";
    PrerenderFinalStatus2["EmbedderHostDisallowed"] = "EmbedderHostDisallowed";
    PrerenderFinalStatus2["ActivationNavigationDestroyedBeforeSuccess"] = "ActivationNavigationDestroyedBeforeSuccess";
    PrerenderFinalStatus2["TabClosedByUserGesture"] = "TabClosedByUserGesture";
    PrerenderFinalStatus2["TabClosedWithoutUserGesture"] = "TabClosedWithoutUserGesture";
    PrerenderFinalStatus2["PrimaryMainFrameRendererProcessCrashed"] = "PrimaryMainFrameRendererProcessCrashed";
    PrerenderFinalStatus2["PrimaryMainFrameRendererProcessKilled"] = "PrimaryMainFrameRendererProcessKilled";
    PrerenderFinalStatus2["ActivationFramePolicyNotCompatible"] = "ActivationFramePolicyNotCompatible";
    PrerenderFinalStatus2["PreloadingDisabled"] = "PreloadingDisabled";
    PrerenderFinalStatus2["BatterySaverEnabled"] = "BatterySaverEnabled";
    PrerenderFinalStatus2["ActivatedDuringMainFrameNavigation"] = "ActivatedDuringMainFrameNavigation";
    PrerenderFinalStatus2["PreloadingUnsupportedByWebContents"] = "PreloadingUnsupportedByWebContents";
    PrerenderFinalStatus2["CrossSiteRedirectInMainFrameNavigation"] = "CrossSiteRedirectInMainFrameNavigation";
    PrerenderFinalStatus2["CrossSiteNavigationInMainFrameNavigation"] = "CrossSiteNavigationInMainFrameNavigation";
    PrerenderFinalStatus2["SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation"] = "SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation";
    PrerenderFinalStatus2["SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation"] = "SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation";
    PrerenderFinalStatus2["MemoryPressureOnTrigger"] = "MemoryPressureOnTrigger";
    PrerenderFinalStatus2["MemoryPressureAfterTriggered"] = "MemoryPressureAfterTriggered";
    PrerenderFinalStatus2["PrerenderingDisabledByDevTools"] = "PrerenderingDisabledByDevTools";
    PrerenderFinalStatus2["SpeculationRuleRemoved"] = "SpeculationRuleRemoved";
    PrerenderFinalStatus2["ActivatedWithAuxiliaryBrowsingContexts"] = "ActivatedWithAuxiliaryBrowsingContexts";
    PrerenderFinalStatus2["MaxNumOfRunningEagerPrerendersExceeded"] = "MaxNumOfRunningEagerPrerendersExceeded";
    PrerenderFinalStatus2["MaxNumOfRunningNonEagerPrerendersExceeded"] = "MaxNumOfRunningNonEagerPrerendersExceeded";
    PrerenderFinalStatus2["MaxNumOfRunningEmbedderPrerendersExceeded"] = "MaxNumOfRunningEmbedderPrerendersExceeded";
    PrerenderFinalStatus2["PrerenderingUrlHasEffectiveUrl"] = "PrerenderingUrlHasEffectiveUrl";
    PrerenderFinalStatus2["RedirectedPrerenderingUrlHasEffectiveUrl"] = "RedirectedPrerenderingUrlHasEffectiveUrl";
    PrerenderFinalStatus2["ActivationUrlHasEffectiveUrl"] = "ActivationUrlHasEffectiveUrl";
    PrerenderFinalStatus2["JavaScriptInterfaceAdded"] = "JavaScriptInterfaceAdded";
    PrerenderFinalStatus2["JavaScriptInterfaceRemoved"] = "JavaScriptInterfaceRemoved";
    PrerenderFinalStatus2["AllPrerenderingCanceled"] = "AllPrerenderingCanceled";
    PrerenderFinalStatus2["WindowClosed"] = "WindowClosed";
    PrerenderFinalStatus2["SlowNetwork"] = "SlowNetwork";
    PrerenderFinalStatus2["OtherPrerenderedPageActivated"] = "OtherPrerenderedPageActivated";
    PrerenderFinalStatus2["V8OptimizerDisabled"] = "V8OptimizerDisabled";
    PrerenderFinalStatus2["PrerenderFailedDuringPrefetch"] = "PrerenderFailedDuringPrefetch";
    PrerenderFinalStatus2["BrowsingDataRemoved"] = "BrowsingDataRemoved";
    PrerenderFinalStatus2["PrerenderHostReused"] = "PrerenderHostReused";
    PrerenderFinalStatus2["FormSubmitWhenPrerendering"] = "FormSubmitWhenPrerendering";
    PrerenderFinalStatus2["CrossDocumentRestart"] = "CrossDocumentRestart";
  })(PrerenderFinalStatus = Preload2.PrerenderFinalStatus || (Preload2.PrerenderFinalStatus = {}));
  let PreloadingStatus;
  ((PreloadingStatus2) => {
    PreloadingStatus2["Pending"] = "Pending";
    PreloadingStatus2["Running"] = "Running";
    PreloadingStatus2["Ready"] = "Ready";
    PreloadingStatus2["Success"] = "Success";
    PreloadingStatus2["Failure"] = "Failure";
    PreloadingStatus2["NotSupported"] = "NotSupported";
  })(PreloadingStatus = Preload2.PreloadingStatus || (Preload2.PreloadingStatus = {}));
  let PrefetchStatus;
  ((PrefetchStatus2) => {
    PrefetchStatus2["PrefetchAllowed"] = "PrefetchAllowed";
    PrefetchStatus2["PrefetchFailedIneligibleRedirect"] = "PrefetchFailedIneligibleRedirect";
    PrefetchStatus2["PrefetchFailedInvalidRedirect"] = "PrefetchFailedInvalidRedirect";
    PrefetchStatus2["PrefetchFailedMIMENotSupported"] = "PrefetchFailedMIMENotSupported";
    PrefetchStatus2["PrefetchFailedNetError"] = "PrefetchFailedNetError";
    PrefetchStatus2["PrefetchFailedNon2XX"] = "PrefetchFailedNon2XX";
    PrefetchStatus2["PrefetchEvictedAfterBrowsingDataRemoved"] = "PrefetchEvictedAfterBrowsingDataRemoved";
    PrefetchStatus2["PrefetchEvictedAfterCandidateRemoved"] = "PrefetchEvictedAfterCandidateRemoved";
    PrefetchStatus2["PrefetchEvictedForNewerPrefetch"] = "PrefetchEvictedForNewerPrefetch";
    PrefetchStatus2["PrefetchHeldback"] = "PrefetchHeldback";
    PrefetchStatus2["PrefetchIneligibleRetryAfter"] = "PrefetchIneligibleRetryAfter";
    PrefetchStatus2["PrefetchIsPrivacyDecoy"] = "PrefetchIsPrivacyDecoy";
    PrefetchStatus2["PrefetchIsStale"] = "PrefetchIsStale";
    PrefetchStatus2["PrefetchNotEligibleBlockedByConnectionAllowlist"] = "PrefetchNotEligibleBlockedByConnectionAllowlist";
    PrefetchStatus2["PrefetchNotEligibleBrowserContextOffTheRecord"] = "PrefetchNotEligibleBrowserContextOffTheRecord";
    PrefetchStatus2["PrefetchNotEligibleCrossOrigin"] = "PrefetchNotEligibleCrossOrigin";
    PrefetchStatus2["PrefetchNotEligibleDataSaverEnabled"] = "PrefetchNotEligibleDataSaverEnabled";
    PrefetchStatus2["PrefetchNotEligibleExistingProxy"] = "PrefetchNotEligibleExistingProxy";
    PrefetchStatus2["PrefetchNotEligibleHostIsNonUnique"] = "PrefetchNotEligibleHostIsNonUnique";
    PrefetchStatus2["PrefetchNotEligibleNonDefaultStoragePartition"] = "PrefetchNotEligibleNonDefaultStoragePartition";
    PrefetchStatus2["PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy"] = "PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy";
    PrefetchStatus2["PrefetchNotEligibleSchemeIsNotHttps"] = "PrefetchNotEligibleSchemeIsNotHttps";
    PrefetchStatus2["PrefetchNotEligibleUserHasCookies"] = "PrefetchNotEligibleUserHasCookies";
    PrefetchStatus2["PrefetchNotEligibleUserHasServiceWorker"] = "PrefetchNotEligibleUserHasServiceWorker";
    PrefetchStatus2["PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler"] = "PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler";
    PrefetchStatus2["PrefetchNotEligibleRedirectFromServiceWorker"] = "PrefetchNotEligibleRedirectFromServiceWorker";
    PrefetchStatus2["PrefetchNotEligibleRedirectToServiceWorker"] = "PrefetchNotEligibleRedirectToServiceWorker";
    PrefetchStatus2["PrefetchNotEligibleBatterySaverEnabled"] = "PrefetchNotEligibleBatterySaverEnabled";
    PrefetchStatus2["PrefetchNotEligiblePreloadingDisabled"] = "PrefetchNotEligiblePreloadingDisabled";
    PrefetchStatus2["PrefetchNotFinishedInTime"] = "PrefetchNotFinishedInTime";
    PrefetchStatus2["PrefetchNotStarted"] = "PrefetchNotStarted";
    PrefetchStatus2["PrefetchNotUsedCookiesChanged"] = "PrefetchNotUsedCookiesChanged";
    PrefetchStatus2["PrefetchProxyNotAvailable"] = "PrefetchProxyNotAvailable";
    PrefetchStatus2["PrefetchResponseUsed"] = "PrefetchResponseUsed";
    PrefetchStatus2["PrefetchSuccessfulButNotUsed"] = "PrefetchSuccessfulButNotUsed";
    PrefetchStatus2["PrefetchNotUsedProbeFailed"] = "PrefetchNotUsedProbeFailed";
    PrefetchStatus2["PrefetchCancelledOnUserNavigation"] = "PrefetchCancelledOnUserNavigation";
  })(PrefetchStatus = Preload2.PrefetchStatus || (Preload2.PrefetchStatus = {}));
})(Preload || (Preload = {}));
var Security;
((Security2) => {
  let MixedContentType;
  ((MixedContentType2) => {
    MixedContentType2["Blockable"] = "blockable";
    MixedContentType2["OptionallyBlockable"] = "optionally-blockable";
    MixedContentType2["None"] = "none";
  })(MixedContentType = Security2.MixedContentType || (Security2.MixedContentType = {}));
  let SecurityState;
  ((SecurityState2) => {
    SecurityState2["Unknown"] = "unknown";
    SecurityState2["Neutral"] = "neutral";
    SecurityState2["Insecure"] = "insecure";
    SecurityState2["Secure"] = "secure";
    SecurityState2["Info"] = "info";
    SecurityState2["InsecureBroken"] = "insecure-broken";
  })(SecurityState = Security2.SecurityState || (Security2.SecurityState = {}));
  let SafetyTipStatus;
  ((SafetyTipStatus2) => {
    SafetyTipStatus2["BadReputation"] = "badReputation";
    SafetyTipStatus2["Lookalike"] = "lookalike";
  })(SafetyTipStatus = Security2.SafetyTipStatus || (Security2.SafetyTipStatus = {}));
  let CertificateErrorAction;
  ((CertificateErrorAction2) => {
    CertificateErrorAction2["Continue"] = "continue";
    CertificateErrorAction2["Cancel"] = "cancel";
  })(CertificateErrorAction = Security2.CertificateErrorAction || (Security2.CertificateErrorAction = {}));
})(Security || (Security = {}));
var ServiceWorker;
((ServiceWorker2) => {
  let ServiceWorkerVersionRunningStatus;
  ((ServiceWorkerVersionRunningStatus2) => {
    ServiceWorkerVersionRunningStatus2["Stopped"] = "stopped";
    ServiceWorkerVersionRunningStatus2["Starting"] = "starting";
    ServiceWorkerVersionRunningStatus2["Running"] = "running";
    ServiceWorkerVersionRunningStatus2["Stopping"] = "stopping";
  })(ServiceWorkerVersionRunningStatus = ServiceWorker2.ServiceWorkerVersionRunningStatus || (ServiceWorker2.ServiceWorkerVersionRunningStatus = {}));
  let ServiceWorkerVersionStatus;
  ((ServiceWorkerVersionStatus2) => {
    ServiceWorkerVersionStatus2["New"] = "new";
    ServiceWorkerVersionStatus2["Installing"] = "installing";
    ServiceWorkerVersionStatus2["Installed"] = "installed";
    ServiceWorkerVersionStatus2["Activating"] = "activating";
    ServiceWorkerVersionStatus2["Activated"] = "activated";
    ServiceWorkerVersionStatus2["Redundant"] = "redundant";
  })(ServiceWorkerVersionStatus = ServiceWorker2.ServiceWorkerVersionStatus || (ServiceWorker2.ServiceWorkerVersionStatus = {}));
  let ServiceWorkerRouterSourceType;
  ((ServiceWorkerRouterSourceType2) => {
    ServiceWorkerRouterSourceType2["Cache"] = "cache";
    ServiceWorkerRouterSourceType2["FetchEvent"] = "fetchEvent";
    ServiceWorkerRouterSourceType2["Network"] = "network";
    ServiceWorkerRouterSourceType2["RaceNetworkAndFetchHandler"] = "raceNetworkAndFetchHandler";
    ServiceWorkerRouterSourceType2["RaceNetworkAndCache"] = "raceNetworkAndCache";
    ServiceWorkerRouterSourceType2["SourceDict"] = "sourceDict";
  })(ServiceWorkerRouterSourceType = ServiceWorker2.ServiceWorkerRouterSourceType || (ServiceWorker2.ServiceWorkerRouterSourceType = {}));
})(ServiceWorker || (ServiceWorker = {}));
var SmartCardEmulation;
((SmartCardEmulation2) => {
  let ResultCode;
  ((ResultCode2) => {
    ResultCode2["Success"] = "success";
    ResultCode2["RemovedCard"] = "removed-card";
    ResultCode2["ResetCard"] = "reset-card";
    ResultCode2["UnpoweredCard"] = "unpowered-card";
    ResultCode2["UnresponsiveCard"] = "unresponsive-card";
    ResultCode2["UnsupportedCard"] = "unsupported-card";
    ResultCode2["ReaderUnavailable"] = "reader-unavailable";
    ResultCode2["SharingViolation"] = "sharing-violation";
    ResultCode2["NotTransacted"] = "not-transacted";
    ResultCode2["NoSmartcard"] = "no-smartcard";
    ResultCode2["ProtoMismatch"] = "proto-mismatch";
    ResultCode2["SystemCancelled"] = "system-cancelled";
    ResultCode2["NotReady"] = "not-ready";
    ResultCode2["Cancelled"] = "cancelled";
    ResultCode2["InsufficientBuffer"] = "insufficient-buffer";
    ResultCode2["InvalidHandle"] = "invalid-handle";
    ResultCode2["InvalidParameter"] = "invalid-parameter";
    ResultCode2["InvalidValue"] = "invalid-value";
    ResultCode2["NoMemory"] = "no-memory";
    ResultCode2["Timeout"] = "timeout";
    ResultCode2["UnknownReader"] = "unknown-reader";
    ResultCode2["UnsupportedFeature"] = "unsupported-feature";
    ResultCode2["NoReadersAvailable"] = "no-readers-available";
    ResultCode2["ServiceStopped"] = "service-stopped";
    ResultCode2["NoService"] = "no-service";
    ResultCode2["CommError"] = "comm-error";
    ResultCode2["InternalError"] = "internal-error";
    ResultCode2["ServerTooBusy"] = "server-too-busy";
    ResultCode2["Unexpected"] = "unexpected";
    ResultCode2["Shutdown"] = "shutdown";
    ResultCode2["UnknownCard"] = "unknown-card";
    ResultCode2["Unknown"] = "unknown";
  })(ResultCode = SmartCardEmulation2.ResultCode || (SmartCardEmulation2.ResultCode = {}));
  let ShareMode;
  ((ShareMode2) => {
    ShareMode2["Shared"] = "shared";
    ShareMode2["Exclusive"] = "exclusive";
    ShareMode2["Direct"] = "direct";
  })(ShareMode = SmartCardEmulation2.ShareMode || (SmartCardEmulation2.ShareMode = {}));
  let Disposition;
  ((Disposition2) => {
    Disposition2["LeaveCard"] = "leave-card";
    Disposition2["ResetCard"] = "reset-card";
    Disposition2["UnpowerCard"] = "unpower-card";
    Disposition2["EjectCard"] = "eject-card";
  })(Disposition = SmartCardEmulation2.Disposition || (SmartCardEmulation2.Disposition = {}));
  let ConnectionState;
  ((ConnectionState2) => {
    ConnectionState2["Absent"] = "absent";
    ConnectionState2["Present"] = "present";
    ConnectionState2["Swallowed"] = "swallowed";
    ConnectionState2["Powered"] = "powered";
    ConnectionState2["Negotiable"] = "negotiable";
    ConnectionState2["Specific"] = "specific";
  })(ConnectionState = SmartCardEmulation2.ConnectionState || (SmartCardEmulation2.ConnectionState = {}));
  let Protocol;
  ((Protocol2) => {
    Protocol2["T0"] = "t0";
    Protocol2["T1"] = "t1";
    Protocol2["Raw"] = "raw";
  })(Protocol = SmartCardEmulation2.Protocol || (SmartCardEmulation2.Protocol = {}));
})(SmartCardEmulation || (SmartCardEmulation = {}));
var Storage;
((Storage2) => {
  let StorageType;
  ((StorageType2) => {
    StorageType2["Cookies"] = "cookies";
    StorageType2["File_systems"] = "file_systems";
    StorageType2["Indexeddb"] = "indexeddb";
    StorageType2["Local_storage"] = "local_storage";
    StorageType2["Shader_cache"] = "shader_cache";
    StorageType2["Websql"] = "websql";
    StorageType2["Service_workers"] = "service_workers";
    StorageType2["Cache_storage"] = "cache_storage";
    StorageType2["Storage_buckets"] = "storage_buckets";
    StorageType2["All"] = "all";
    StorageType2["Other"] = "other";
  })(StorageType = Storage2.StorageType || (Storage2.StorageType = {}));
  let StorageBucketsDurability;
  ((StorageBucketsDurability2) => {
    StorageBucketsDurability2["Relaxed"] = "relaxed";
    StorageBucketsDurability2["Strict"] = "strict";
  })(StorageBucketsDurability = Storage2.StorageBucketsDurability || (Storage2.StorageBucketsDurability = {}));
})(Storage || (Storage = {}));
var SystemInfo;
((SystemInfo2) => {
  let SubsamplingFormat;
  ((SubsamplingFormat2) => {
    SubsamplingFormat2["Yuv420"] = "yuv420";
    SubsamplingFormat2["Yuv422"] = "yuv422";
    SubsamplingFormat2["Yuv444"] = "yuv444";
  })(SubsamplingFormat = SystemInfo2.SubsamplingFormat || (SystemInfo2.SubsamplingFormat = {}));
  let ImageType;
  ((ImageType2) => {
    ImageType2["Jpeg"] = "jpeg";
    ImageType2["Webp"] = "webp";
    ImageType2["Unknown"] = "unknown";
  })(ImageType = SystemInfo2.ImageType || (SystemInfo2.ImageType = {}));
})(SystemInfo || (SystemInfo = {}));
var Target;
((Target2) => {
  let WindowState;
  ((WindowState2) => {
    WindowState2["Normal"] = "normal";
    WindowState2["Minimized"] = "minimized";
    WindowState2["Maximized"] = "maximized";
    WindowState2["Fullscreen"] = "fullscreen";
  })(WindowState = Target2.WindowState || (Target2.WindowState = {}));
})(Target || (Target = {}));
var Tracing;
((Tracing2) => {
  let TraceConfigRecordMode;
  ((TraceConfigRecordMode2) => {
    TraceConfigRecordMode2["RecordUntilFull"] = "recordUntilFull";
    TraceConfigRecordMode2["RecordContinuously"] = "recordContinuously";
    TraceConfigRecordMode2["RecordAsMuchAsPossible"] = "recordAsMuchAsPossible";
    TraceConfigRecordMode2["EchoToConsole"] = "echoToConsole";
  })(TraceConfigRecordMode = Tracing2.TraceConfigRecordMode || (Tracing2.TraceConfigRecordMode = {}));
  let StreamFormat;
  ((StreamFormat2) => {
    StreamFormat2["Json"] = "json";
    StreamFormat2["Proto"] = "proto";
  })(StreamFormat = Tracing2.StreamFormat || (Tracing2.StreamFormat = {}));
  let StreamCompression;
  ((StreamCompression2) => {
    StreamCompression2["None"] = "none";
    StreamCompression2["Gzip"] = "gzip";
  })(StreamCompression = Tracing2.StreamCompression || (Tracing2.StreamCompression = {}));
  let MemoryDumpLevelOfDetail;
  ((MemoryDumpLevelOfDetail2) => {
    MemoryDumpLevelOfDetail2["Background"] = "background";
    MemoryDumpLevelOfDetail2["Light"] = "light";
    MemoryDumpLevelOfDetail2["Detailed"] = "detailed";
  })(MemoryDumpLevelOfDetail = Tracing2.MemoryDumpLevelOfDetail || (Tracing2.MemoryDumpLevelOfDetail = {}));
  let TracingBackend;
  ((TracingBackend2) => {
    TracingBackend2["Auto"] = "auto";
    TracingBackend2["Chrome"] = "chrome";
    TracingBackend2["System"] = "system";
  })(TracingBackend = Tracing2.TracingBackend || (Tracing2.TracingBackend = {}));
  let StartRequestTransferMode;
  ((StartRequestTransferMode2) => {
    StartRequestTransferMode2["ReportEvents"] = "ReportEvents";
    StartRequestTransferMode2["ReturnAsStream"] = "ReturnAsStream";
  })(StartRequestTransferMode = Tracing2.StartRequestTransferMode || (Tracing2.StartRequestTransferMode = {}));
})(Tracing || (Tracing = {}));
var WebAudio;
((WebAudio2) => {
  let ContextType;
  ((ContextType2) => {
    ContextType2["Realtime"] = "realtime";
    ContextType2["Offline"] = "offline";
  })(ContextType = WebAudio2.ContextType || (WebAudio2.ContextType = {}));
  let ContextState;
  ((ContextState2) => {
    ContextState2["Suspended"] = "suspended";
    ContextState2["Running"] = "running";
    ContextState2["Closed"] = "closed";
    ContextState2["Interrupted"] = "interrupted";
  })(ContextState = WebAudio2.ContextState || (WebAudio2.ContextState = {}));
  let ChannelCountMode;
  ((ChannelCountMode2) => {
    ChannelCountMode2["ClampedMax"] = "clamped-max";
    ChannelCountMode2["Explicit"] = "explicit";
    ChannelCountMode2["Max"] = "max";
  })(ChannelCountMode = WebAudio2.ChannelCountMode || (WebAudio2.ChannelCountMode = {}));
  let ChannelInterpretation;
  ((ChannelInterpretation2) => {
    ChannelInterpretation2["Discrete"] = "discrete";
    ChannelInterpretation2["Speakers"] = "speakers";
  })(ChannelInterpretation = WebAudio2.ChannelInterpretation || (WebAudio2.ChannelInterpretation = {}));
  let AutomationRate;
  ((AutomationRate2) => {
    AutomationRate2["ARate"] = "a-rate";
    AutomationRate2["KRate"] = "k-rate";
  })(AutomationRate = WebAudio2.AutomationRate || (WebAudio2.AutomationRate = {}));
})(WebAudio || (WebAudio = {}));
var WebAuthn;
((WebAuthn2) => {
  let AuthenticatorProtocol;
  ((AuthenticatorProtocol2) => {
    AuthenticatorProtocol2["U2f"] = "u2f";
    AuthenticatorProtocol2["Ctap2"] = "ctap2";
  })(AuthenticatorProtocol = WebAuthn2.AuthenticatorProtocol || (WebAuthn2.AuthenticatorProtocol = {}));
  let Ctap2Version;
  ((Ctap2Version2) => {
    Ctap2Version2["Ctap2_0"] = "ctap2_0";
    Ctap2Version2["Ctap2_1"] = "ctap2_1";
    Ctap2Version2["Ctap2_2"] = "ctap2_2";
  })(Ctap2Version = WebAuthn2.Ctap2Version || (WebAuthn2.Ctap2Version = {}));
  let AuthenticatorTransport;
  ((AuthenticatorTransport2) => {
    AuthenticatorTransport2["Usb"] = "usb";
    AuthenticatorTransport2["Nfc"] = "nfc";
    AuthenticatorTransport2["Ble"] = "ble";
    AuthenticatorTransport2["Cable"] = "cable";
    AuthenticatorTransport2["Hybrid"] = "hybrid";
    AuthenticatorTransport2["SmartCard"] = "smart-card";
    AuthenticatorTransport2["Internal"] = "internal";
  })(AuthenticatorTransport = WebAuthn2.AuthenticatorTransport || (WebAuthn2.AuthenticatorTransport = {}));
})(WebAuthn || (WebAuthn = {}));
var WebMCP;
((WebMCP2) => {
  let InvocationStatus;
  ((InvocationStatus2) => {
    InvocationStatus2["Completed"] = "Completed";
    InvocationStatus2["Canceled"] = "Canceled";
    InvocationStatus2["Error"] = "Error";
  })(InvocationStatus = WebMCP2.InvocationStatus || (WebMCP2.InvocationStatus = {}));
})(WebMCP || (WebMCP = {}));
var Debugger;
((Debugger2) => {
  let ScopeType;
  ((ScopeType2) => {
    ScopeType2["Global"] = "global";
    ScopeType2["Local"] = "local";
    ScopeType2["With"] = "with";
    ScopeType2["Closure"] = "closure";
    ScopeType2["Catch"] = "catch";
    ScopeType2["Block"] = "block";
    ScopeType2["Script"] = "script";
    ScopeType2["Eval"] = "eval";
    ScopeType2["Module"] = "module";
    ScopeType2["WasmExpressionStack"] = "wasm-expression-stack";
  })(ScopeType = Debugger2.ScopeType || (Debugger2.ScopeType = {}));
  let BreakLocationType;
  ((BreakLocationType2) => {
    BreakLocationType2["DebuggerStatement"] = "debuggerStatement";
    BreakLocationType2["Call"] = "call";
    BreakLocationType2["Return"] = "return";
  })(BreakLocationType = Debugger2.BreakLocationType || (Debugger2.BreakLocationType = {}));
  let ScriptLanguage;
  ((ScriptLanguage2) => {
    ScriptLanguage2["JavaScript"] = "JavaScript";
    ScriptLanguage2["WebAssembly"] = "WebAssembly";
  })(ScriptLanguage = Debugger2.ScriptLanguage || (Debugger2.ScriptLanguage = {}));
  let DebugSymbolsType;
  ((DebugSymbolsType2) => {
    DebugSymbolsType2["SourceMap"] = "SourceMap";
    DebugSymbolsType2["EmbeddedDWARF"] = "EmbeddedDWARF";
    DebugSymbolsType2["ExternalDWARF"] = "ExternalDWARF";
  })(DebugSymbolsType = Debugger2.DebugSymbolsType || (Debugger2.DebugSymbolsType = {}));
  let ContinueToLocationRequestTargetCallFrames;
  ((ContinueToLocationRequestTargetCallFrames2) => {
    ContinueToLocationRequestTargetCallFrames2["Any"] = "any";
    ContinueToLocationRequestTargetCallFrames2["Current"] = "current";
  })(ContinueToLocationRequestTargetCallFrames = Debugger2.ContinueToLocationRequestTargetCallFrames || (Debugger2.ContinueToLocationRequestTargetCallFrames = {}));
  let RestartFrameRequestMode;
  ((RestartFrameRequestMode2) => {
    RestartFrameRequestMode2["StepInto"] = "StepInto";
  })(RestartFrameRequestMode = Debugger2.RestartFrameRequestMode || (Debugger2.RestartFrameRequestMode = {}));
  let SetInstrumentationBreakpointRequestInstrumentation;
  ((SetInstrumentationBreakpointRequestInstrumentation2) => {
    SetInstrumentationBreakpointRequestInstrumentation2["BeforeScriptExecution"] = "beforeScriptExecution";
    SetInstrumentationBreakpointRequestInstrumentation2["BeforeScriptWithSourceMapExecution"] = "beforeScriptWithSourceMapExecution";
  })(SetInstrumentationBreakpointRequestInstrumentation = Debugger2.SetInstrumentationBreakpointRequestInstrumentation || (Debugger2.SetInstrumentationBreakpointRequestInstrumentation = {}));
  let SetPauseOnExceptionsRequestState;
  ((SetPauseOnExceptionsRequestState2) => {
    SetPauseOnExceptionsRequestState2["None"] = "none";
    SetPauseOnExceptionsRequestState2["Caught"] = "caught";
    SetPauseOnExceptionsRequestState2["Uncaught"] = "uncaught";
    SetPauseOnExceptionsRequestState2["All"] = "all";
  })(SetPauseOnExceptionsRequestState = Debugger2.SetPauseOnExceptionsRequestState || (Debugger2.SetPauseOnExceptionsRequestState = {}));
  let SetScriptSourceResponseStatus;
  ((SetScriptSourceResponseStatus2) => {
    SetScriptSourceResponseStatus2["Ok"] = "Ok";
    SetScriptSourceResponseStatus2["CompileError"] = "CompileError";
    SetScriptSourceResponseStatus2["BlockedByActiveGenerator"] = "BlockedByActiveGenerator";
    SetScriptSourceResponseStatus2["BlockedByActiveFunction"] = "BlockedByActiveFunction";
    SetScriptSourceResponseStatus2["BlockedByTopLevelEsModuleChange"] = "BlockedByTopLevelEsModuleChange";
  })(SetScriptSourceResponseStatus = Debugger2.SetScriptSourceResponseStatus || (Debugger2.SetScriptSourceResponseStatus = {}));
  let PausedEventReason;
  ((PausedEventReason2) => {
    PausedEventReason2["Ambiguous"] = "ambiguous";
    PausedEventReason2["Assert"] = "assert";
    PausedEventReason2["CSPViolation"] = "CSPViolation";
    PausedEventReason2["DebugCommand"] = "debugCommand";
    PausedEventReason2["DOM"] = "DOM";
    PausedEventReason2["EventListener"] = "EventListener";
    PausedEventReason2["Exception"] = "exception";
    PausedEventReason2["Instrumentation"] = "instrumentation";
    PausedEventReason2["OOM"] = "OOM";
    PausedEventReason2["Other"] = "other";
    PausedEventReason2["PromiseRejection"] = "promiseRejection";
    PausedEventReason2["XHR"] = "XHR";
    PausedEventReason2["Step"] = "step";
  })(PausedEventReason = Debugger2.PausedEventReason || (Debugger2.PausedEventReason = {}));
})(Debugger || (Debugger = {}));
var Runtime;
((Runtime2) => {
  let SerializationOptionsSerialization;
  ((SerializationOptionsSerialization2) => {
    SerializationOptionsSerialization2["Deep"] = "deep";
    SerializationOptionsSerialization2["Json"] = "json";
    SerializationOptionsSerialization2["IdOnly"] = "idOnly";
  })(SerializationOptionsSerialization = Runtime2.SerializationOptionsSerialization || (Runtime2.SerializationOptionsSerialization = {}));
  let DeepSerializedValueType;
  ((DeepSerializedValueType2) => {
    DeepSerializedValueType2["Undefined"] = "undefined";
    DeepSerializedValueType2["Null"] = "null";
    DeepSerializedValueType2["String"] = "string";
    DeepSerializedValueType2["Number"] = "number";
    DeepSerializedValueType2["Boolean"] = "boolean";
    DeepSerializedValueType2["Bigint"] = "bigint";
    DeepSerializedValueType2["Regexp"] = "regexp";
    DeepSerializedValueType2["Date"] = "date";
    DeepSerializedValueType2["Symbol"] = "symbol";
    DeepSerializedValueType2["Array"] = "array";
    DeepSerializedValueType2["Object"] = "object";
    DeepSerializedValueType2["Function"] = "function";
    DeepSerializedValueType2["Map"] = "map";
    DeepSerializedValueType2["Set"] = "set";
    DeepSerializedValueType2["Weakmap"] = "weakmap";
    DeepSerializedValueType2["Weakset"] = "weakset";
    DeepSerializedValueType2["Error"] = "error";
    DeepSerializedValueType2["Proxy"] = "proxy";
    DeepSerializedValueType2["Promise"] = "promise";
    DeepSerializedValueType2["Typedarray"] = "typedarray";
    DeepSerializedValueType2["Arraybuffer"] = "arraybuffer";
    DeepSerializedValueType2["Node"] = "node";
    DeepSerializedValueType2["Window"] = "window";
    DeepSerializedValueType2["Generator"] = "generator";
  })(DeepSerializedValueType = Runtime2.DeepSerializedValueType || (Runtime2.DeepSerializedValueType = {}));
  let RemoteObjectType;
  ((RemoteObjectType2) => {
    RemoteObjectType2["Object"] = "object";
    RemoteObjectType2["Function"] = "function";
    RemoteObjectType2["Undefined"] = "undefined";
    RemoteObjectType2["String"] = "string";
    RemoteObjectType2["Number"] = "number";
    RemoteObjectType2["Boolean"] = "boolean";
    RemoteObjectType2["Symbol"] = "symbol";
    RemoteObjectType2["Bigint"] = "bigint";
  })(RemoteObjectType = Runtime2.RemoteObjectType || (Runtime2.RemoteObjectType = {}));
  let RemoteObjectSubtype;
  ((RemoteObjectSubtype2) => {
    RemoteObjectSubtype2["Array"] = "array";
    RemoteObjectSubtype2["Null"] = "null";
    RemoteObjectSubtype2["Node"] = "node";
    RemoteObjectSubtype2["Regexp"] = "regexp";
    RemoteObjectSubtype2["Date"] = "date";
    RemoteObjectSubtype2["Map"] = "map";
    RemoteObjectSubtype2["Set"] = "set";
    RemoteObjectSubtype2["Weakmap"] = "weakmap";
    RemoteObjectSubtype2["Weakset"] = "weakset";
    RemoteObjectSubtype2["Iterator"] = "iterator";
    RemoteObjectSubtype2["Generator"] = "generator";
    RemoteObjectSubtype2["Error"] = "error";
    RemoteObjectSubtype2["Proxy"] = "proxy";
    RemoteObjectSubtype2["Promise"] = "promise";
    RemoteObjectSubtype2["Typedarray"] = "typedarray";
    RemoteObjectSubtype2["Arraybuffer"] = "arraybuffer";
    RemoteObjectSubtype2["Dataview"] = "dataview";
    RemoteObjectSubtype2["Webassemblymemory"] = "webassemblymemory";
    RemoteObjectSubtype2["Wasmvalue"] = "wasmvalue";
    RemoteObjectSubtype2["Trustedtype"] = "trustedtype";
  })(RemoteObjectSubtype = Runtime2.RemoteObjectSubtype || (Runtime2.RemoteObjectSubtype = {}));
  let ObjectPreviewType;
  ((ObjectPreviewType2) => {
    ObjectPreviewType2["Object"] = "object";
    ObjectPreviewType2["Function"] = "function";
    ObjectPreviewType2["Undefined"] = "undefined";
    ObjectPreviewType2["String"] = "string";
    ObjectPreviewType2["Number"] = "number";
    ObjectPreviewType2["Boolean"] = "boolean";
    ObjectPreviewType2["Symbol"] = "symbol";
    ObjectPreviewType2["Bigint"] = "bigint";
  })(ObjectPreviewType = Runtime2.ObjectPreviewType || (Runtime2.ObjectPreviewType = {}));
  let ObjectPreviewSubtype;
  ((ObjectPreviewSubtype2) => {
    ObjectPreviewSubtype2["Array"] = "array";
    ObjectPreviewSubtype2["Null"] = "null";
    ObjectPreviewSubtype2["Node"] = "node";
    ObjectPreviewSubtype2["Regexp"] = "regexp";
    ObjectPreviewSubtype2["Date"] = "date";
    ObjectPreviewSubtype2["Map"] = "map";
    ObjectPreviewSubtype2["Set"] = "set";
    ObjectPreviewSubtype2["Weakmap"] = "weakmap";
    ObjectPreviewSubtype2["Weakset"] = "weakset";
    ObjectPreviewSubtype2["Iterator"] = "iterator";
    ObjectPreviewSubtype2["Generator"] = "generator";
    ObjectPreviewSubtype2["Error"] = "error";
    ObjectPreviewSubtype2["Proxy"] = "proxy";
    ObjectPreviewSubtype2["Promise"] = "promise";
    ObjectPreviewSubtype2["Typedarray"] = "typedarray";
    ObjectPreviewSubtype2["Arraybuffer"] = "arraybuffer";
    ObjectPreviewSubtype2["Dataview"] = "dataview";
    ObjectPreviewSubtype2["Webassemblymemory"] = "webassemblymemory";
    ObjectPreviewSubtype2["Wasmvalue"] = "wasmvalue";
    ObjectPreviewSubtype2["Trustedtype"] = "trustedtype";
  })(ObjectPreviewSubtype = Runtime2.ObjectPreviewSubtype || (Runtime2.ObjectPreviewSubtype = {}));
  let PropertyPreviewType;
  ((PropertyPreviewType2) => {
    PropertyPreviewType2["Object"] = "object";
    PropertyPreviewType2["Function"] = "function";
    PropertyPreviewType2["Undefined"] = "undefined";
    PropertyPreviewType2["String"] = "string";
    PropertyPreviewType2["Number"] = "number";
    PropertyPreviewType2["Boolean"] = "boolean";
    PropertyPreviewType2["Symbol"] = "symbol";
    PropertyPreviewType2["Accessor"] = "accessor";
    PropertyPreviewType2["Bigint"] = "bigint";
  })(PropertyPreviewType = Runtime2.PropertyPreviewType || (Runtime2.PropertyPreviewType = {}));
  let PropertyPreviewSubtype;
  ((PropertyPreviewSubtype2) => {
    PropertyPreviewSubtype2["Array"] = "array";
    PropertyPreviewSubtype2["Null"] = "null";
    PropertyPreviewSubtype2["Node"] = "node";
    PropertyPreviewSubtype2["Regexp"] = "regexp";
    PropertyPreviewSubtype2["Date"] = "date";
    PropertyPreviewSubtype2["Map"] = "map";
    PropertyPreviewSubtype2["Set"] = "set";
    PropertyPreviewSubtype2["Weakmap"] = "weakmap";
    PropertyPreviewSubtype2["Weakset"] = "weakset";
    PropertyPreviewSubtype2["Iterator"] = "iterator";
    PropertyPreviewSubtype2["Generator"] = "generator";
    PropertyPreviewSubtype2["Error"] = "error";
    PropertyPreviewSubtype2["Proxy"] = "proxy";
    PropertyPreviewSubtype2["Promise"] = "promise";
    PropertyPreviewSubtype2["Typedarray"] = "typedarray";
    PropertyPreviewSubtype2["Arraybuffer"] = "arraybuffer";
    PropertyPreviewSubtype2["Dataview"] = "dataview";
    PropertyPreviewSubtype2["Webassemblymemory"] = "webassemblymemory";
    PropertyPreviewSubtype2["Wasmvalue"] = "wasmvalue";
    PropertyPreviewSubtype2["Trustedtype"] = "trustedtype";
  })(PropertyPreviewSubtype = Runtime2.PropertyPreviewSubtype || (Runtime2.PropertyPreviewSubtype = {}));
  let ConsoleAPICalledEventType;
  ((ConsoleAPICalledEventType2) => {
    ConsoleAPICalledEventType2["Log"] = "log";
    ConsoleAPICalledEventType2["Debug"] = "debug";
    ConsoleAPICalledEventType2["Info"] = "info";
    ConsoleAPICalledEventType2["Error"] = "error";
    ConsoleAPICalledEventType2["Warning"] = "warning";
    ConsoleAPICalledEventType2["Dir"] = "dir";
    ConsoleAPICalledEventType2["DirXML"] = "dirxml";
    ConsoleAPICalledEventType2["Table"] = "table";
    ConsoleAPICalledEventType2["Trace"] = "trace";
    ConsoleAPICalledEventType2["Clear"] = "clear";
    ConsoleAPICalledEventType2["StartGroup"] = "startGroup";
    ConsoleAPICalledEventType2["StartGroupCollapsed"] = "startGroupCollapsed";
    ConsoleAPICalledEventType2["EndGroup"] = "endGroup";
    ConsoleAPICalledEventType2["Assert"] = "assert";
    ConsoleAPICalledEventType2["Profile"] = "profile";
    ConsoleAPICalledEventType2["ProfileEnd"] = "profileEnd";
    ConsoleAPICalledEventType2["Count"] = "count";
    ConsoleAPICalledEventType2["TimeEnd"] = "timeEnd";
  })(ConsoleAPICalledEventType = Runtime2.ConsoleAPICalledEventType || (Runtime2.ConsoleAPICalledEventType = {}));
})(Runtime || (Runtime = {}));

// ../../front_end/panels/issues/IssueView.ts
import * as IssuesManager9 from "../../models/issues_manager/issues_manager.js";
import * as NetworkForward3 from "../network/forward/forward.js";
import * as Adorners2 from "../../ui/components/adorners/adorners.js";
import * as IssueCounter3 from "../../ui/components/issue_counter/issue_counter.js";
import * as MarkdownView from "../../ui/components/markdown_view/markdown_view.js";
import { Icon as Icon3 } from "../../ui/kit/kit.js";
import * as UI5 from "../../ui/legacy/legacy.js";
import { html as html6, render as render7 } from "../../ui/lit/lit.js";
import * as VisualLogging6 from "../../ui/visual_logging/visual_logging.js";

// ../../front_end/panels/issues/AffectedBlockedByResponseView.ts
import * as Host2 from "../../core/host/host.js";
import * as i18n11 from "../../core/i18n/i18n.js";
import * as IssuesManager5 from "../../models/issues_manager/issues_manager.js";
var UIStrings6 = {
  /**
   * @description Label in the Issues panel for the number of affected network requests.
   */
  nRequests: "{n, plural, =1 {# request} other {# requests}}",
  /**
   * @description Column header in the Issues panel for network requests in the blocked-by-response affected resources table.
   */
  requestC: "Request",
  /**
   * @description Column header in the Issues panel for parent frames in the blocked-by-response affected resources table.
   */
  parentFrame: "Parent frame",
  /**
   * @description Column header in the Issues panel for blocked resources in the blocked-by-response affected resources table.
   */
  blockedResource: "Blocked resource"
};
var str_6 = i18n11.i18n.registerUIStrings("panels/issues/AffectedBlockedByResponseView.ts", UIStrings6);
var i18nString6 = i18n11.i18n.getLocalizedString.bind(void 0, str_6);
var AffectedBlockedByResponseView = class extends AffectedResourcesView {
  #appendDetails(details) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString6(UIStrings6.requestC));
    this.appendColumnTitle(header, i18nString6(UIStrings6.parentFrame));
    this.appendColumnTitle(header, i18nString6(UIStrings6.blockedResource));
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const detail of details) {
      this.#appendDetail(detail);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
  getResourceNameWithCount(count) {
    return i18nString6(UIStrings6.nRequests, { n: count });
  }
  #appendDetail(details) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-row");
    const requestCell = this.createRequestCell(details.request, {
      additionalOnClickAction() {
        Host2.userMetrics.issuesPanelResourceOpened(
          IssuesManager5.Issue.IssueCategory.CROSS_ORIGIN_EMBEDDER_POLICY,
          "Request" /* REQUEST */
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

// ../../front_end/panels/issues/AffectedCookiesView.ts
import * as Common3 from "../../core/common/common.js";
import * as Host3 from "../../core/host/host.js";
import * as i18n13 from "../../core/i18n/i18n.js";
import * as NetworkForward from "../network/forward/forward.js";
import * as VisualLogging3 from "../../ui/visual_logging/visual_logging.js";
var UIStrings7 = {
  /**
   * @description Label in the Issues panel for the number of affected cookies. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies.
   */
  nCookies: "{n, plural, =1 {# cookie} other {# cookies}}",
  /**
   * @description Column header in the Issues panel for cookie names in the affected cookies table.
   */
  name: "Name",
  /**
   * @description Column header in the Issues panel for cookie domains in the affected cookies table. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#define_where_cookies_are_sent.
   */
  domain: "Domain",
  /**
   * @description Column header in the Issues panel for cookie paths in the affected cookies table. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#define_where_cookies_are_sent.
   */
  path: "Path",
  /**
   * @description Label in the Issues panel for the number of affected raw Set-Cookie headers.
   */
  nRawCookieLines: "{n, plural, =1 {1 raw `Set-Cookie` header} other {# raw `Set-Cookie` headers}}",
  /**
   * @description Tooltip in the Issues panel for the button to filter network requests by this Set-Cookie header in the Network panel.
   */
  filterSetCookieTitle: "Show network requests that include this `Set-Cookie` header in the Network panel"
};
var str_7 = i18n13.i18n.registerUIStrings("panels/issues/AffectedCookiesView.ts", UIStrings7);
var i18nString7 = i18n13.i18n.getLocalizedString.bind(void 0, str_7);
var AffectedCookiesView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString7(UIStrings7.nCookies, { n: count });
  }
  #appendAffectedCookies(cookies) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString7(UIStrings7.name));
    this.appendColumnTitle(
      header,
      i18nString7(UIStrings7.domain) + " & " + i18nString7(UIStrings7.path),
      "affected-resource-cookie-info-header"
    );
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
    element.setAttribute("jslog", `${VisualLogging3.tableRow("affected-cookie")}`);
    const name = document.createElement("td");
    if (hasAssociatedRequest) {
      const link4 = document.createElement("button");
      link4.classList.add("link", "devtools-link");
      link4.textContent = cookie.name;
      link4.tabIndex = 0;
      link4.setAttribute(
        "jslog",
        `${VisualLogging3.link("issues.filter-network-requests-by-cookie").track({ click: true })}`
      );
      link4.addEventListener("click", () => {
        Host3.userMetrics.issuesPanelResourceOpened(this.issue.getCategory(), "Cookie" /* COOKIE */);
        void Common3.Revealer.reveal(NetworkForward.UIFilter.UIRequestFilter.filters([
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
      name.appendChild(link4);
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
    return i18nString7(UIStrings7.nRawCookieLines, { n: count });
  }
  update() {
    this.clear();
    const cookieLinesWithRequestIndicator = this.issue.getRawCookieLines();
    let count = 0;
    for (const cookie of cookieLinesWithRequestIndicator) {
      const row = document.createElement("tr");
      row.classList.add("affected-resource-directive");
      row.setAttribute("jslog", `${VisualLogging3.tableRow("affected-raw-cookie")}`);
      if (cookie.hasRequest) {
        const cookieLine = document.createElement("td");
        const link4 = document.createElement("button");
        link4.classList.add("link", "devtools-link");
        link4.textContent = cookie.rawCookieLine;
        link4.title = i18nString7(UIStrings7.filterSetCookieTitle);
        link4.tabIndex = 0;
        link4.setAttribute(
          "jslog",
          `${VisualLogging3.link("issues.filter-network-requests-by-raw-cookie").track({ click: true })}`
        );
        link4.addEventListener("click", () => {
          void Common3.Revealer.reveal(NetworkForward.UIFilter.UIRequestFilter.filters([
            {
              filterType: NetworkForward.UIFilter.FilterType.ResponseHeaderValueSetCookie,
              filterValue: cookie.rawCookieLine
            }
          ]));
        });
        cookieLine.appendChild(link4);
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

// ../../front_end/panels/issues/AffectedDescendantsWithinSelectElementView.ts
import * as i18n17 from "../../core/i18n/i18n.js";

// ../../front_end/panels/issues/AffectedElementsView.ts
import * as i18n15 from "../../core/i18n/i18n.js";
import * as VisualLogging4 from "../../ui/visual_logging/visual_logging.js";
var UIStrings8 = {
  /**
   * @description Label in the Issues panel for the number of affected elements.
   */
  nElements: "{n, plural, =1 {# element} other {# elements}}"
};
var str_8 = i18n15.i18n.registerUIStrings("panels/issues/AffectedElementsView.ts", UIStrings8);
var i18nString8 = i18n15.i18n.getLocalizedString.bind(void 0, str_8);
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
    return i18nString8(UIStrings8.nElements, { n: count });
  }
  async #appendAffectedElement(element) {
    const cellElement = await this.createElementCell(element, this.issue.getCategory());
    const rowElement = document.createElement("tr");
    rowElement.setAttribute("jslog", `${VisualLogging4.tableRow("affected-element")}`);
    if (element.backendNodeId) {
      rowElement.setAttribute("data-backend-node-id", String(element.backendNodeId));
    }
    rowElement.appendChild(cellElement);
    this.affectedResources.appendChild(rowElement);
  }
  update() {
    this.clear();
    void this.#appendAffectedElements(this.issue.elements());
  }
};

// ../../front_end/panels/issues/AffectedDescendantsWithinSelectElementView.ts
var UIStrings9 = {
  /**
   * @description Label in the Issues panel for the number of affected descendant nodes.
   */
  nDescendants: "{n, plural, =1 { descendant} other { descendants}}",
  /**
   * @description Link text in the Issues panel for a disallowed descendant node.
   */
  disallowedNode: "Disallowed descendant"
};
var str_9 = i18n17.i18n.registerUIStrings("panels/issues/AffectedDescendantsWithinSelectElementView.ts", UIStrings9);
var i18nString9 = i18n17.i18n.getLocalizedString.bind(void 0, str_9);
var AffectedDescendantsWithinSelectElementView = class extends AffectedElementsView {
  #runningUpdatePromise = Promise.resolve();
  update() {
    this.#runningUpdatePromise = this.#runningUpdatePromise.then(this.#doUpdate.bind(this));
  }
  getResourceName(count) {
    return i18nString9(UIStrings9.nDescendants, { n: count });
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
    row.appendChild(await this.createElementCell(
      { nodeName: i18nString9(UIStrings9.disallowedNode), backendNodeId: details.nodeId, target },
      issue.getCategory()
    ));
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

// ../../front_end/panels/issues/AffectedDirectivesView.ts
import * as Common4 from "../../core/common/common.js";
import * as Host4 from "../../core/host/host.js";
import * as i18n19 from "../../core/i18n/i18n.js";
import * as Platform2 from "../../core/platform/platform.js";
import * as SDK2 from "../../core/sdk/sdk.js";
import * as IssuesManager6 from "../../models/issues_manager/issues_manager.js";
import * as IssuesComponents from "./components/components.js";
var UIStrings10 = {
  /**
   * @description Label in the Issues panel for the number of affected Content Security Policy (CSP) directives. See https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP.
   */
  nDirectives: "{n, plural, =1 {# directive} other {# directives}}",
  /**
   * @description Resolution status in the Issues panel indicating that a Content Security Policy violation is report-only.
   */
  reportonly: "Report-only",
  /**
   * @description Resolution status in the Issues panel indicating that a Content Security Policy violation was blocked.
   */
  blocked: "Blocked",
  /**
   * @description Tooltip in the Issues panel for the button to reveal a violating DOM node in the Elements panel.
   */
  clickToRevealTheViolatingDomNode: "Click to reveal the violating DOM node in the Elements panel",
  /**
   * @description Column header in the Issues panel for Content Security Policy directives in the affected directives table.
   */
  directiveC: "Directive",
  /**
   * @description Column header in the Issues panel for DOM elements in the affected directives table.
   */
  element: "Element",
  /**
   * @description Column header in the Issues panel for source locations in the affected directives table.
   */
  sourceLocation: "Source location",
  /**
   * @description Column header in the Issues panel for violation status in the affected directives table.
   */
  status: "Status",
  /**
   * @description Column header in the Issues panel for blocked resources in the affected directives table.
   */
  resourceC: "Resource"
};
var str_10 = i18n19.i18n.registerUIStrings("panels/issues/AffectedDirectivesView.ts", UIStrings10);
var i18nString10 = i18n19.i18n.getLocalizedString.bind(void 0, str_10);
var AffectedDirectivesView = class extends AffectedResourcesView {
  #appendStatus(element, isReportOnly) {
    const status = document.createElement("td");
    if (isReportOnly) {
      status.classList.add("affected-resource-report-only-status");
      status.textContent = i18nString10(UIStrings10.reportonly);
    } else {
      status.classList.add("affected-resource-blocked-status");
      status.textContent = i18nString10(UIStrings10.blocked);
    }
    element.appendChild(status);
  }
  getResourceNameWithCount(count) {
    return i18nString10(UIStrings10.nDirectives, { n: count });
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
      elementsPanelLinkComponent.title = i18nString10(UIStrings10.clickToRevealTheViolatingDomNode);
      const onElementRevealIconClick = () => {
        const target = model.getTargetIfNotDisposed();
        if (target) {
          Host4.userMetrics.issuesPanelResourceOpened(this.issue.getCategory(), "Element" /* ELEMENT */);
          const deferredDOMNode = new SDK2.DOMModel.DeferredDOMNode(target, violatingNodeId);
          void Common4.Revealer.reveal(deferredDOMNode);
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
        SDK2.OverlayModel.OverlayModel.hideDOMNodeHighlight(SDK2.TargetManager.TargetManager.instance());
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
    if (this.issue.code() === IssuesManager6.ContentSecurityPolicyIssue.inlineViolationCode) {
      this.appendColumnTitle(header, i18nString10(UIStrings10.directiveC));
      this.appendColumnTitle(header, i18nString10(UIStrings10.element));
      this.appendColumnTitle(header, i18nString10(UIStrings10.sourceLocation));
      this.appendColumnTitle(header, i18nString10(UIStrings10.status));
    } else if (this.issue.code() === IssuesManager6.ContentSecurityPolicyIssue.urlViolationCode) {
      this.appendColumnTitle(header, i18nString10(UIStrings10.resourceC), "affected-resource-directive-info-header");
      this.appendColumnTitle(header, i18nString10(UIStrings10.status));
      this.appendColumnTitle(header, i18nString10(UIStrings10.directiveC));
      this.appendColumnTitle(header, i18nString10(UIStrings10.sourceLocation));
    } else if (this.issue.code() === IssuesManager6.ContentSecurityPolicyIssue.evalViolationCode) {
      this.appendColumnTitle(header, i18nString10(UIStrings10.sourceLocation));
      this.appendColumnTitle(header, i18nString10(UIStrings10.directiveC));
      this.appendColumnTitle(header, i18nString10(UIStrings10.status));
    } else if (this.issue.code() === IssuesManager6.ContentSecurityPolicyIssue.trustedTypesSinkViolationCode) {
      this.appendColumnTitle(header, i18nString10(UIStrings10.sourceLocation));
      this.appendColumnTitle(header, i18nString10(UIStrings10.status));
    } else if (this.issue.code() === IssuesManager6.ContentSecurityPolicyIssue.trustedTypesPolicyViolationCode) {
      this.appendColumnTitle(header, i18nString10(UIStrings10.sourceLocation));
      this.appendColumnTitle(header, i18nString10(UIStrings10.directiveC));
      this.appendColumnTitle(header, i18nString10(UIStrings10.status));
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
    const location = IssuesManager6.Issue.toZeroBasedLocation(cspIssueDetails.sourceCodeLocation);
    const model = cspIssue.model();
    const maybeTarget = cspIssue.model()?.getTargetIfNotDisposed();
    if (this.issue.code() === IssuesManager6.ContentSecurityPolicyIssue.inlineViolationCode && model) {
      this.#appendViolatedDirective(element, cspIssueDetails.violatedDirective);
      this.#appendBlockedElement(element, cspIssueDetails.violatingNodeId, model);
      this.appendSourceLocation(element, location, maybeTarget);
      this.#appendStatus(element, cspIssueDetails.isReportOnly);
    } else if (this.issue.code() === IssuesManager6.ContentSecurityPolicyIssue.urlViolationCode) {
      const url = cspIssueDetails.blockedURL ? cspIssueDetails.blockedURL : Platform2.DevToolsPath.EmptyUrlString;
      this.#appendBlockedURL(element, url);
      this.#appendStatus(element, cspIssueDetails.isReportOnly);
      this.#appendViolatedDirective(element, cspIssueDetails.violatedDirective);
      this.appendSourceLocation(element, location, maybeTarget);
    } else if (this.issue.code() === IssuesManager6.ContentSecurityPolicyIssue.evalViolationCode) {
      this.appendSourceLocation(element, location, maybeTarget);
      this.#appendViolatedDirective(element, cspIssueDetails.violatedDirective);
      this.#appendStatus(element, cspIssueDetails.isReportOnly);
    } else if (this.issue.code() === IssuesManager6.ContentSecurityPolicyIssue.trustedTypesSinkViolationCode) {
      this.appendSourceLocation(element, location, maybeTarget);
      this.#appendStatus(element, cspIssueDetails.isReportOnly);
    } else if (this.issue.code() === IssuesManager6.ContentSecurityPolicyIssue.trustedTypesPolicyViolationCode) {
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

// ../../front_end/panels/issues/AffectedDocumentsInQuirksModeView.ts
import * as i18n21 from "../../core/i18n/i18n.js";
import * as SDK3 from "../../core/sdk/sdk.js";
var UIStrings11 = {
  /**
   * @description Label in the Issues panel for the number of affected document nodes.
   */
  nDocuments: "{n, plural, =1 { document} other { documents}}",
  /**
   * @description Column header in the Issues panel for document DOM nodes in the quirks mode affected documents table.
   */
  documentInTheDOMTree: "Document in the DOM tree",
  /**
   * @description Column header in the Issues panel for URLs in the quirks mode affected documents table.
   */
  url: "URL",
  /**
   * @description Column header in the Issues panel for document quirks mode in the quirks mode affected documents table.
   */
  mode: "Mode"
};
var str_11 = i18n21.i18n.registerUIStrings("panels/issues/AffectedDocumentsInQuirksModeView.ts", UIStrings11);
var i18nString11 = i18n21.i18n.getLocalizedString.bind(void 0, str_11);
var AffectedDocumentsInQuirksModeView = class extends AffectedElementsView {
  #runningUpdatePromise = Promise.resolve();
  update() {
    this.#runningUpdatePromise = this.#runningUpdatePromise.then(this.#doUpdate.bind(this));
  }
  getResourceName(count) {
    return i18nString11(UIStrings11.nDocuments, { n: count });
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
    row.appendChild(await this.createElementCell(
      { nodeName: "document", backendNodeId: details.documentNodeId, target },
      issue.getCategory()
    ));
    this.appendIssueDetailCell(row, details.isLimitedQuirksMode ? "Limited Quirks Mode" : "Quirks Mode");
    this.appendIssueDetailCell(row, details.url);
    this.affectedResources.appendChild(row);
  }
  async #appendQuirksModeDocuments(issues) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString11(UIStrings11.documentInTheDOMTree));
    this.appendColumnTitle(header, i18nString11(UIStrings11.mode));
    this.appendColumnTitle(header, i18nString11(UIStrings11.url));
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const issue of issues) {
      count++;
      await this.#appendQuirksModeDocument(issue);
    }
    this.updateAffectedResourceCount(count);
  }
};

// ../../front_end/panels/issues/AffectedHeavyAdView.ts
import * as i18n23 from "../../core/i18n/i18n.js";
var UIStrings12 = {
  /**
   * @description Label in the Issues panel for the number of affected heavy ad resources.
   */
  nResources: "{n, plural, =1 {# resource} other {# resources}}",
  /**
   * @description Column header in the Issues panel for the exceeded limit type in the heavy ads affected resources table.
   */
  limitExceeded: "Limit exceeded",
  /**
   * @description Column header in the Issues panel for the resolution status in the heavy ads affected resources table.
   */
  resolutionStatus: "Resolution status",
  /**
   * @description Column header in the Issues panel for the frame URL in the heavy ads affected resources table.
   */
  frameUrl: "Frame URL",
  /**
   * @description Resolution status in the Issues panel indicating that a heavy ad was removed.
   */
  removed: "Removed",
  /**
   * @description Resolution status in the Issues panel indicating that a heavy ad received a warning.
   */
  warned: "Warned",
  /**
   * @description Reason in the Issues panel for a heavy ad issue indicating peak CPU usage limit was exceeded.
   */
  cpuPeakLimit: "CPU peak limit",
  /**
   * @description Reason in the Issues panel for a heavy ad issue indicating total CPU usage limit was exceeded.
   */
  cpuTotalLimit: "CPU total limit",
  /**
   * @description Reason in the Issues panel for a heavy ad issue indicating total network bandwidth limit was exceeded.
   */
  networkLimit: "Network limit"
};
var str_12 = i18n23.i18n.registerUIStrings("panels/issues/AffectedHeavyAdView.ts", UIStrings12);
var i18nString12 = i18n23.i18n.getLocalizedString.bind(void 0, str_12);
var AffectedHeavyAdView = class extends AffectedResourcesView {
  #appendAffectedHeavyAds(heavyAds) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString12(UIStrings12.limitExceeded));
    this.appendColumnTitle(header, i18nString12(UIStrings12.resolutionStatus));
    this.appendColumnTitle(header, i18nString12(UIStrings12.frameUrl));
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const heavyAd of heavyAds) {
      this.#appendAffectedHeavyAd(heavyAd.details());
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
  getResourceNameWithCount(count) {
    return i18nString12(UIStrings12.nResources, { n: count });
  }
  #statusToString(status) {
    switch (status) {
      case Audits.HeavyAdResolutionStatus.HeavyAdBlocked:
        return i18nString12(UIStrings12.removed);
      case Audits.HeavyAdResolutionStatus.HeavyAdWarning:
        return i18nString12(UIStrings12.warned);
    }
    return "";
  }
  #limitToString(status) {
    switch (status) {
      case Audits.HeavyAdReason.CpuPeakLimit:
        return i18nString12(UIStrings12.cpuPeakLimit);
      case Audits.HeavyAdReason.CpuTotalLimit:
        return i18nString12(UIStrings12.cpuTotalLimit);
      case Audits.HeavyAdReason.NetworkTotalLimit:
        return i18nString12(UIStrings12.networkLimit);
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

// ../../front_end/panels/issues/AffectedMetadataAllowedSitesView.ts
import * as i18n25 from "../../core/i18n/i18n.js";
import { Link } from "../../ui/kit/kit.js";
var UIStrings13 = {
  /**
   * @description Label in the Issues panel for the number of affected websites allowed to access cookies. See https://developer.mozilla.org/en-US/docs/Glossary/eTLD.
   */
  nAllowedSites: "{n, plural, =1 {1 website allowed to access cookies} other {# websites allowed to access cookies}}"
};
var str_13 = i18n25.i18n.registerUIStrings("panels/issues/AffectedMetadataAllowedSitesView.ts", UIStrings13);
var i18nString13 = i18n25.i18n.getLocalizedString.bind(void 0, str_13);
var AffectedMetadataAllowedSitesView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString13(UIStrings13.nAllowedSites, { n: count });
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
        const linkElement = Link.create("https://developers.google.com/privacy-sandbox/blog/grace-period-opt-out", "learn more");
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

// ../../front_end/panels/issues/AffectedPartitioningBlobURLView.ts
import * as i18n27 from "../../core/i18n/i18n.js";
var UIStrings14 = {
  /**
   * @description Description in the Issues panel for a partitioning blob URL issue when cross-partition fetching is blocked.
   * @example {blob:https://web-platform.test:8444/example} url
   */
  blockedCrossPartitionFetching: "Access to the Blob URL {url} was blocked because it was performed from a cross-partition context.",
  /**
   * @description Description in the Issues panel for a partitioning blob URL issue when noopener is enforced for navigation.
   * @example {blob:https://web-platform.test:8444/example} url
   */
  enforceNoopenerForNavigation: "Blob URL {url} top-level navigation had 'noopener' set because the Blob URL origin was cross-site with the top-level site of the context that initiated the navigation.",
  /**
   * @description Label in the Issues panel for the number of blob URL issues.
   * @example {1} count
   */
  blobURLCount: "Blob URL issues count: {count}",
  /**
   * @description Message in the Issues panel shown when no blob URL is available for a partitioning blob URL issue.
   */
  noBlobURLAvailable: "No Blob URL available for this issue."
};
var str_14 = i18n27.i18n.registerUIStrings("panels/issues/AffectedPartitioningBlobURLView.ts", UIStrings14);
var i18nString14 = i18n27.i18n.getLocalizedString.bind(void 0, str_14);
var AffectedPartitioningBlobURLView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString14(UIStrings14.blobURLCount, { count });
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
          case Audits.PartitioningBlobURLInfo.BlockedCrossPartitionFetching:
            description = i18nString14(UIStrings14.blockedCrossPartitionFetching, { url: blobURL });
            break;
          case Audits.PartitioningBlobURLInfo.EnforceNoopenerForNavigation:
            description = i18nString14(UIStrings14.enforceNoopenerForNavigation, { url: blobURL });
            break;
        }
        const descriptionElement = document.createElement("div");
        descriptionElement.textContent = description;
        this.affectedResources.appendChild(descriptionElement);
        count++;
      } else {
        const noURLMessage = document.createElement("div");
        noURLMessage.textContent = i18nString14(UIStrings14.noBlobURLAvailable);
        this.affectedResources.appendChild(noURLMessage);
      }
    }
    this.updateAffectedResourceCount(count);
  }
};

// ../../front_end/panels/issues/AffectedPermissionElementsView.ts
import * as i18n29 from "../../core/i18n/i18n.js";
import { html as html4, render as render5 } from "../../ui/lit/lit.js";
var UIStrings15 = {
  /**
   * @description Label in the Issues panel for the number of affected permission elements.
   */
  nElements: "{n, plural, =1 {# element} other {# elements}}"
};
var str_15 = i18n29.i18n.registerUIStrings("panels/issues/AffectedPermissionElementsView.ts", UIStrings15);
var i18nString15 = i18n29.i18n.getLocalizedString.bind(void 0, str_15);
var AffectedPermissionElementsView = class extends AffectedElementsView {
  update() {
    this.clear();
    void this.#appendAffectedElements(this.issue.getPermissionElementIssues());
  }
  getResourceNameWithCount(count) {
    return i18nString15(UIStrings15.nElements, { n: count });
  }
  async #appendAffectedElements(issues) {
    let count = 0;
    const templates = [];
    for (const issue of issues) {
      for (const element of issue.elements()) {
        count++;
        templates.push(html4`<tr>
          ${await this.createElementCell(element, this.issue.getCategory())}
        </tr>`);
      }
    }
    render5(html4`${templates}`, this.affectedResources);
    this.updateAffectedResourceCount(count);
  }
};

// ../../front_end/panels/issues/AffectedSharedArrayBufferIssueDetailsView.ts
import * as i18n31 from "../../core/i18n/i18n.js";
import * as IssuesManager7 from "../../models/issues_manager/issues_manager.js";
var UIStrings16 = {
  /**
   * @description Label in the Issues panel for the number of affected violations in the SharedArrayBuffer affected resources table.
   */
  nViolations: "{n, plural, =1 {# violation} other {# violations}}",
  /**
   * @description Violation status in the Issues panel indicating that a SharedArrayBuffer issue produced a warning.
   */
  warning: "Warning",
  /**
   * @description Violation status in the Issues panel indicating that a SharedArrayBuffer operation was blocked.
   */
  blocked: "Blocked",
  /**
   * @description Trigger type in the Issues panel indicating that a SharedArrayBuffer was instantiated.
   */
  instantiation: "Instantiation",
  /**
   * @description Tooltip in the Issues panel explaining that a SharedArrayBuffer was instantiated in a non-cross-origin-isolated context.
   */
  aSharedarraybufferWas: "A `SharedArrayBuffer` was instantiated in a context that is not cross-origin isolated",
  /**
   * @description Trigger type in the Issues panel indicating that a SharedArrayBuffer was transferred.
   */
  transfer: "Transfer",
  /**
   * @description Tooltip in the Issues panel explaining that a SharedArrayBuffer was transferred to a non-cross-origin-isolated context.
   */
  sharedarraybufferWasTransferedTo: "`SharedArrayBuffer` was transferred to a context that is not cross-origin isolated",
  /**
   * @description Column header in the Issues panel for source locations in the SharedArrayBuffer affected resources table.
   */
  sourceLocation: "Source location",
  /**
   * @description Column header in the Issues panel for trigger types in the SharedArrayBuffer affected resources table.
   */
  trigger: "Trigger",
  /**
   * @description Column header in the Issues panel for violation status in the SharedArrayBuffer affected resources table.
   */
  status: "Status"
};
var str_16 = i18n31.i18n.registerUIStrings("panels/issues/AffectedSharedArrayBufferIssueDetailsView.ts", UIStrings16);
var i18nString16 = i18n31.i18n.getLocalizedString.bind(void 0, str_16);
var AffectedSharedArrayBufferIssueDetailsView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString16(UIStrings16.nViolations, { n: count });
  }
  #appendStatus(element, isWarning) {
    const status = document.createElement("td");
    if (isWarning) {
      status.classList.add("affected-resource-report-only-status");
      status.textContent = i18nString16(UIStrings16.warning);
    } else {
      status.classList.add("affected-resource-blocked-status");
      status.textContent = i18nString16(UIStrings16.blocked);
    }
    element.appendChild(status);
  }
  #appendType(element, type) {
    const status = document.createElement("td");
    switch (type) {
      case Audits.SharedArrayBufferIssueType.CreationIssue:
        status.textContent = i18nString16(UIStrings16.instantiation);
        status.title = i18nString16(UIStrings16.aSharedarraybufferWas);
        break;
      case Audits.SharedArrayBufferIssueType.TransferIssue:
        status.textContent = i18nString16(UIStrings16.transfer);
        status.title = i18nString16(UIStrings16.sharedarraybufferWasTransferedTo);
        break;
    }
    element.appendChild(status);
  }
  #appendDetails(sabIssues) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString16(UIStrings16.sourceLocation));
    this.appendColumnTitle(header, i18nString16(UIStrings16.trigger));
    this.appendColumnTitle(header, i18nString16(UIStrings16.status));
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
    const location = IssuesManager7.Issue.toZeroBasedLocation(sabIssueDetails.sourceCodeLocation);
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

// ../../front_end/panels/issues/AffectedSourcesView.ts
import * as i18n33 from "../../core/i18n/i18n.js";
import * as Components4 from "../../ui/legacy/components/utils/utils.js";
import * as VisualLogging5 from "../../ui/visual_logging/visual_logging.js";
var UIStrings17 = {
  /**
   * @description Label in the Issues panel for the number of affected source code locations.
   */
  nSources: "{n, plural, =1 {# source} other {# sources}}"
};
var str_17 = i18n33.i18n.registerUIStrings("panels/issues/AffectedSourcesView.ts", UIStrings17);
var i18nString17 = i18n33.i18n.getLocalizedString.bind(void 0, str_17);
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
    return i18nString17(UIStrings17.nSources, { n: count });
  }
  #appendAffectedSource({ url, lineNumber, columnNumber }) {
    const cellElement = document.createElement("td");
    const linkifierURLOptions = { columnNumber, lineNumber, tabStop: true, showColumnNumber: false };
    const anchorElement = Components4.Linkifier.Linkifier.linkifyURL(url, linkifierURLOptions);
    anchorElement.setAttribute("jslog", `${VisualLogging5.link("source-location").track({ click: true })}`);
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

// ../../front_end/panels/issues/AffectedTrackingSitesView.ts
import * as i18n35 from "../../core/i18n/i18n.js";
import { html as html5, render as render6 } from "../../ui/lit/lit.js";
var UIStrings18 = {
  /**
   * @description Label in the Issues panel for the number of affected potentially tracking websites. See https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md and https://developer.mozilla.org/en-US/docs/Glossary/eTLD.
   */
  nTrackingSites: "{n, plural, =1 {1 potentially tracking website} other {# potentially tracking websites}}"
};
var str_18 = i18n35.i18n.registerUIStrings("panels/issues/AffectedTrackingSitesView.ts", UIStrings18);
var i18nString18 = i18n35.i18n.getLocalizedString.bind(void 0, str_18);
function defaultView(input, output, target) {
  render6(
    html5`
      <tbody>
        ${input.trackingSites.map((site) => html5`
          <tr class="affected-resource-directive">
            <td class="affected-resource-cell" title=${site}>${site}</td>
          </tr>
        `)}
      </tbody>
    `,
    target
  );
}
var AffectedTrackingSitesView = class extends AffectedResourcesView {
  #view = defaultView;
  getResourceNameWithCount(count) {
    return i18nString18(UIStrings18.nTrackingSites, { n: count });
  }
  update() {
    const trackingSites = Array.from(this.issue.getBounceTrackingSites());
    this.#view({ trackingSites }, {}, this.affectedResources);
    this.updateAffectedResourceCount(trackingSites.length);
  }
};

// ../../front_end/panels/issues/IssueView.ts
import * as Components5 from "./components/components.js";

// ../../front_end/panels/issues/CorsIssueDetailsView.ts
import * as Host5 from "../../core/host/host.js";
import * as i18n37 from "../../core/i18n/i18n.js";
import * as Platform3 from "../../core/platform/platform.js";
import * as IssuesManager8 from "../../models/issues_manager/issues_manager.js";
import * as NetworkForward2 from "../network/forward/forward.js";
var UIStrings19 = {
  /**
   * @description Label in the Issues panel for the number of affected requests in the CORS affected resources table.
   */
  nRequests: "{n, plural, =1 {# request} other {# requests}}",
  /**
   * @description Violation status in the Issues panel indicating that a CORS issue produced a warning.
   */
  warning: "Warning",
  /**
   * @description Violation status in the Issues panel indicating that a CORS request was blocked.
   */
  blocked: "Blocked",
  /**
   * @description Column header in the Issues panel for request status in the CORS affected resources table.
   */
  status: "Status",
  /**
   * @description Column header in the Issues panel for network requests in the CORS affected resources table.
   */
  request: "Request",
  /**
   * @description Column header in the Issues panel for resource addresses in the CORS affected resources table.
   */
  resourceAddressSpace: "Resource address",
  /**
   * @description Column header in the Issues panel for initiator addresses in the CORS affected resources table.
   */
  initiatorAddressSpace: "Initiator address",
  /**
   * @description Context status in the Issues panel indicating a secure initiator context.
   */
  secure: "Secure",
  /**
   * @description Context status in the Issues panel indicating an insecure initiator context.
   */
  insecure: "Insecure",
  /**
   * @description Column header in the Issues panel for initiator context in the CORS affected resources table.
   */
  initiatorContext: "Initiator context",
  /**
   * @description Column header in the Issues panel for preflight requests when problematic in the CORS affected resources table.
   */
  preflightRequestIfProblematic: "Preflight request (if problematic)",
  /**
   * @description Column header in the Issues panel for preflight requests in the CORS affected resources table.
   */
  preflightRequest: "Preflight request",
  /**
   * @description Column header in the Issues panel for HTTP header names in the CORS affected resources table.
   */
  header: "Header",
  /**
   * @description Column header in the Issues panel for problem descriptions in the CORS affected resources table.
   */
  problem: "Problem",
  /**
   * @description Column header in the Issues panel for invalid header values in the CORS affected resources table.
   */
  invalidValue: "Invalid value (if available)",
  /**
   * @description Problem description in the Issues panel indicating that a required CORS response header was missing.
   */
  problemMissingHeader: "Missing header",
  /**
   * @description Problem description in the Issues panel indicating that a CORS response header contained multiple values.
   */
  problemMultipleValues: "Multiple values",
  /**
   * @description Problem description in the Issues panel indicating that a CORS response header contained an invalid value.
   */
  problemInvalidValue: "Invalid value",
  /**
   * @description Problem description in the Issues panel indicating that the preflight response was a redirect.
   */
  preflightDisallowedRedirect: "Response to preflight was a redirect",
  /**
   * @description Problem description in the Issues panel indicating that the preflight request HTTP status was not successful.
   */
  preflightInvalidStatus: "HTTP status of preflight request didn\u2019t indicate success",
  /**
   * @description Column header in the Issues panel for allowed origins in the CORS affected resources table.
   */
  allowedOrigin: "Allowed origin (from header)",
  /**
   * @description Column header in the Issues panel for the Access-Control-Allow-Credentials header value in the CORS affected resources table.
   */
  allowCredentialsValueFromHeader: "`Access-Control-Allow-Credentials` header value",
  /**
   * @description Column header in the Issues panel for disallowed request methods in the CORS affected resources table.
   */
  disallowedRequestMethod: "Disallowed request method",
  /**
   * @description Column header in the Issues panel for disallowed request headers in the CORS affected resources table.
   */
  disallowedRequestHeader: "Disallowed request header",
  /**
   * @description Column header in the Issues panel for source locations in the CORS affected resources table.
   */
  sourceLocation: "Source location",
  /**
   * @description Column header in the Issues panel for unsupported URL schemes in the CORS affected resources table.
   */
  unsupportedScheme: "Unsupported scheme",
  /**
   * @description Problem description in the Issues panel indicating that a network request failed.
   */
  failedRequest: "Failed request"
};
var str_19 = i18n37.i18n.registerUIStrings("panels/issues/CorsIssueDetailsView.ts", UIStrings19);
var i18nString19 = i18n37.i18n.getLocalizedString.bind(void 0, str_19);
var CorsIssueDetailsView = class _CorsIssueDetailsView extends AffectedResourcesView {
  constructor(parent, issue, jslogContext) {
    super(parent, issue, jslogContext);
    this.affectedResourcesCountElement.classList.add("cors-issue-affected-resource-label");
  }
  #appendStatus(element, isWarning) {
    const status = document.createElement("td");
    if (isWarning) {
      status.classList.add("affected-resource-report-only-status");
      status.textContent = i18nString19(UIStrings19.warning);
    } else {
      status.classList.add("affected-resource-blocked-status");
      status.textContent = i18nString19(UIStrings19.blocked);
    }
    element.appendChild(status);
  }
  getResourceNameWithCount(count) {
    return i18nString19(UIStrings19.nRequests, { n: count });
  }
  #appendDetails(issueCode, issues) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString19(UIStrings19.request));
    this.appendColumnTitle(header, i18nString19(UIStrings19.status));
    switch (issueCode) {
      case IssuesManager8.CorsIssue.IssueCode.INVALID_HEADER_VALUES:
        this.appendColumnTitle(header, i18nString19(UIStrings19.preflightRequestIfProblematic));
        this.appendColumnTitle(header, i18nString19(UIStrings19.header));
        this.appendColumnTitle(header, i18nString19(UIStrings19.problem));
        this.appendColumnTitle(header, i18nString19(UIStrings19.invalidValue));
        break;
      case IssuesManager8.CorsIssue.IssueCode.WILDCARD_ORIGN_NOT_ALLOWED:
        this.appendColumnTitle(header, i18nString19(UIStrings19.preflightRequestIfProblematic));
        break;
      case IssuesManager8.CorsIssue.IssueCode.PREFLIGHT_RESPONSE_INVALID:
        this.appendColumnTitle(header, i18nString19(UIStrings19.preflightRequest));
        this.appendColumnTitle(header, i18nString19(UIStrings19.problem));
        break;
      case IssuesManager8.CorsIssue.IssueCode.ORIGIN_MISMATCH:
        this.appendColumnTitle(header, i18nString19(UIStrings19.preflightRequestIfProblematic));
        this.appendColumnTitle(header, i18nString19(UIStrings19.initiatorContext));
        this.appendColumnTitle(header, i18nString19(UIStrings19.allowedOrigin));
        break;
      case IssuesManager8.CorsIssue.IssueCode.ALLOW_CREDENTIALS_REQUIRED:
        this.appendColumnTitle(header, i18nString19(UIStrings19.preflightRequestIfProblematic));
        this.appendColumnTitle(header, i18nString19(UIStrings19.allowCredentialsValueFromHeader));
        break;
      case IssuesManager8.CorsIssue.IssueCode.INSECURE_LOCAL_NETWORK:
        this.appendColumnTitle(header, i18nString19(UIStrings19.resourceAddressSpace));
        this.appendColumnTitle(header, i18nString19(UIStrings19.initiatorAddressSpace));
        this.appendColumnTitle(header, i18nString19(UIStrings19.initiatorContext));
        break;
      case IssuesManager8.CorsIssue.IssueCode.METHOD_DISALLOWED_BY_PREFLIGHT_RESPONSE:
        this.appendColumnTitle(header, i18nString19(UIStrings19.preflightRequest));
        this.appendColumnTitle(header, i18nString19(UIStrings19.disallowedRequestMethod));
        break;
      case IssuesManager8.CorsIssue.IssueCode.HEADER_DISALLOWED_BY_PREFLIGHT_RESPONSE:
        this.appendColumnTitle(header, i18nString19(UIStrings19.preflightRequest));
        this.appendColumnTitle(header, i18nString19(UIStrings19.disallowedRequestHeader));
        break;
      case IssuesManager8.CorsIssue.IssueCode.REDIRECT_CONTAINS_CREDENTIALS:
        break;
      case IssuesManager8.CorsIssue.IssueCode.DISALLOWED_BY_MODE:
        this.appendColumnTitle(header, i18nString19(UIStrings19.initiatorContext));
        this.appendColumnTitle(header, i18nString19(UIStrings19.sourceLocation));
        break;
      case IssuesManager8.CorsIssue.IssueCode.CORS_DISABLED_SCHEME:
        this.appendColumnTitle(header, i18nString19(UIStrings19.initiatorContext));
        this.appendColumnTitle(header, i18nString19(UIStrings19.sourceLocation));
        this.appendColumnTitle(header, i18nString19(UIStrings19.unsupportedScheme));
        break;
      case IssuesManager8.CorsIssue.IssueCode.NO_CORS_REDIRECT_MODE_NOT_FOLLOW:
        this.appendColumnTitle(header, i18nString19(UIStrings19.sourceLocation));
        break;
      case IssuesManager8.CorsIssue.IssueCode.PREFLIGHT_MISSING_ALLOW_EXTERNAL:
      case IssuesManager8.CorsIssue.IssueCode.PREFLIGHT_INVALID_ALLOW_EXTERNAL:
      case IssuesManager8.CorsIssue.IssueCode.INVALID_LOCAL_NETWORK_ACCESS:
      case IssuesManager8.CorsIssue.IssueCode.LOCAL_NETWORK_ACCESS_PERMISSION_DENIED:
        break;
      default:
        Platform3.assertNever(issueCode, "Unknow issue code " + issueCode);
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
    this.appendIssueDetailCell(
      element,
      isSecureContext ? i18nString19(UIStrings19.secure) : i18nString19(UIStrings19.insecure)
    );
  }
  static getHeaderFromError(corsError) {
    switch (corsError) {
      case Network.CorsError.InvalidAllowHeadersPreflightResponse:
        return "Access-Control-Allow-Headers";
      case Network.CorsError.InvalidAllowMethodsPreflightResponse:
      case Network.CorsError.MethodDisallowedByPreflightResponse:
        return "Access-Control-Allow-Methods";
      case Network.CorsError.PreflightMissingAllowOriginHeader:
      case Network.CorsError.PreflightMultipleAllowOriginValues:
      case Network.CorsError.PreflightInvalidAllowOriginValue:
      case Network.CorsError.MissingAllowOriginHeader:
      case Network.CorsError.MultipleAllowOriginValues:
      case Network.CorsError.InvalidAllowOriginValue:
      case Network.CorsError.WildcardOriginNotAllowed:
      case Network.CorsError.PreflightWildcardOriginNotAllowed:
      case Network.CorsError.AllowOriginMismatch:
      case Network.CorsError.PreflightAllowOriginMismatch:
        return "Access-Control-Allow-Origin";
      case Network.CorsError.InvalidAllowCredentials:
      case Network.CorsError.PreflightInvalidAllowCredentials:
        return "Access-Control-Allow-Credentials";
      case Network.CorsError.RedirectContainsCredentials:
      case Network.CorsError.PreflightDisallowedRedirect:
        return "Location";
      case Network.CorsError.PreflightInvalidStatus:
        return "Status-Code";
    }
    return "";
  }
  static getProblemFromError(corsErrorStatus) {
    switch (corsErrorStatus.corsError) {
      case Network.CorsError.InvalidAllowHeadersPreflightResponse:
      case Network.CorsError.InvalidAllowMethodsPreflightResponse:
      case Network.CorsError.PreflightInvalidAllowOriginValue:
      case Network.CorsError.InvalidAllowOriginValue:
        return i18nString19(UIStrings19.problemInvalidValue);
      case Network.CorsError.PreflightMultipleAllowOriginValues:
      case Network.CorsError.MultipleAllowOriginValues:
        return i18nString19(UIStrings19.problemMultipleValues);
      case Network.CorsError.MissingAllowOriginHeader:
      case Network.CorsError.PreflightMissingAllowOriginHeader:
        return i18nString19(UIStrings19.problemMissingHeader);
      case Network.CorsError.PreflightInvalidStatus:
        return i18nString19(UIStrings19.preflightInvalidStatus);
      case Network.CorsError.PreflightDisallowedRedirect:
        return i18nString19(UIStrings19.preflightDisallowedRedirect);
      case Network.CorsError.InvalidResponse:
        return i18nString19(UIStrings19.failedRequest);
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
      section: NetworkForward2.UIRequestLocation.UIHeaderSection.RESPONSE,
      name: _CorsIssueDetailsView.getHeaderFromError(corsError)
    };
    const opts = {
      additionalOnClickAction() {
        Host5.userMetrics.issuesPanelResourceOpened(IssuesManager8.Issue.IssueCategory.CORS, "Request" /* REQUEST */);
      }
    };
    switch (issueCode) {
      case IssuesManager8.CorsIssue.IssueCode.INVALID_HEADER_VALUES:
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        if (corsError.includes("Preflight")) {
          element.appendChild(
            this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader })
          );
        } else {
          this.appendIssueDetailCell(element, "");
        }
        this.appendIssueDetailCell(element, _CorsIssueDetailsView.getHeaderFromError(corsError), "code-example");
        this.appendIssueDetailCell(element, _CorsIssueDetailsView.getProblemFromError(details.corsErrorStatus));
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        break;
      case IssuesManager8.CorsIssue.IssueCode.WILDCARD_ORIGN_NOT_ALLOWED:
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        if (corsError.includes("Preflight")) {
          element.appendChild(
            this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader })
          );
        } else {
          this.appendIssueDetailCell(element, "");
        }
        break;
      case IssuesManager8.CorsIssue.IssueCode.PREFLIGHT_RESPONSE_INVALID: {
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        const specialHighlightHeader = corsError === Network.CorsError.PreflightInvalidStatus ? {
          section: NetworkForward2.UIRequestLocation.UIHeaderSection.GENERAL,
          name: "Status-Code"
        } : highlightHeader;
        element.appendChild(this.createRequestCell(
          details.request,
          { ...opts, linkToPreflight: true, highlightHeader: specialHighlightHeader }
        ));
        this.appendIssueDetailCell(element, _CorsIssueDetailsView.getProblemFromError(details.corsErrorStatus));
        break;
      }
      case IssuesManager8.CorsIssue.IssueCode.ORIGIN_MISMATCH:
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        if (corsError.includes("Preflight")) {
          element.appendChild(
            this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader })
          );
        } else {
          this.appendIssueDetailCell(element, "");
        }
        this.appendIssueDetailCell(element, details.initiatorOrigin ?? "", "code-example");
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        break;
      case IssuesManager8.CorsIssue.IssueCode.ALLOW_CREDENTIALS_REQUIRED:
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        if (corsError.includes("Preflight")) {
          element.appendChild(
            this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader })
          );
        } else {
          this.appendIssueDetailCell(element, "");
        }
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        break;
      case IssuesManager8.CorsIssue.IssueCode.INSECURE_LOCAL_NETWORK:
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        this.appendIssueDetailCell(element, details.resourceIPAddressSpace ?? "");
        this.appendIssueDetailCell(element, details.clientSecurityState?.initiatorIPAddressSpace ?? "");
        this.#appendSecureContextCell(element, details.clientSecurityState?.initiatorIsSecureContext);
        break;
      case IssuesManager8.CorsIssue.IssueCode.METHOD_DISALLOWED_BY_PREFLIGHT_RESPONSE:
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        element.appendChild(this.createRequestCell(details.request, { ...opts, linkToPreflight: true, highlightHeader }));
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        break;
      case IssuesManager8.CorsIssue.IssueCode.HEADER_DISALLOWED_BY_PREFLIGHT_RESPONSE:
        element.appendChild(this.createRequestCell(details.request, {
          ...opts,
          highlightHeader: {
            section: NetworkForward2.UIRequestLocation.UIHeaderSection.REQUEST,
            name: corsErrorStatus.failedParameter
          }
        }));
        this.#appendStatus(element, details.isWarning);
        element.appendChild(this.createRequestCell(details.request, {
          ...opts,
          linkToPreflight: true,
          highlightHeader: {
            section: NetworkForward2.UIRequestLocation.UIHeaderSection.RESPONSE,
            name: "Access-Control-Allow-Headers"
          }
        }));
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter, "code-example");
        break;
      case IssuesManager8.CorsIssue.IssueCode.REDIRECT_CONTAINS_CREDENTIALS:
        element.appendChild(this.createRequestCell(details.request, {
          ...opts,
          highlightHeader: {
            section: NetworkForward2.UIRequestLocation.UIHeaderSection.RESPONSE,
            name: _CorsIssueDetailsView.getHeaderFromError(corsError)
          }
        }));
        this.#appendStatus(element, details.isWarning);
        break;
      case IssuesManager8.CorsIssue.IssueCode.DISALLOWED_BY_MODE:
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        this.appendIssueDetailCell(element, details.initiatorOrigin ?? "", "code-example");
        this.appendSourceLocation(element, details.location, issue.model()?.getTargetIfNotDisposed());
        break;
      case IssuesManager8.CorsIssue.IssueCode.CORS_DISABLED_SCHEME:
        element.appendChild(this.createRequestCell(details.request, {
          ...opts,
          highlightHeader: {
            section: NetworkForward2.UIRequestLocation.UIHeaderSection.RESPONSE,
            name: _CorsIssueDetailsView.getHeaderFromError(corsError)
          }
        }));
        this.#appendStatus(element, details.isWarning);
        this.appendIssueDetailCell(element, details.initiatorOrigin ?? "", "code-example");
        this.appendSourceLocation(element, details.location, issue.model()?.getTargetIfNotDisposed());
        this.appendIssueDetailCell(element, details.corsErrorStatus.failedParameter ?? "", "code-example");
        break;
      case IssuesManager8.CorsIssue.IssueCode.NO_CORS_REDIRECT_MODE_NOT_FOLLOW:
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        this.appendSourceLocation(element, details.location, issue.model()?.getTargetIfNotDisposed());
        break;
      case IssuesManager8.CorsIssue.IssueCode.PREFLIGHT_MISSING_ALLOW_EXTERNAL:
      case IssuesManager8.CorsIssue.IssueCode.PREFLIGHT_INVALID_ALLOW_EXTERNAL:
      case IssuesManager8.CorsIssue.IssueCode.INVALID_LOCAL_NETWORK_ACCESS:
      case IssuesManager8.CorsIssue.IssueCode.LOCAL_NETWORK_ACCESS_PERMISSION_DENIED:
        element.appendChild(this.createRequestCell(details.request, opts));
        this.#appendStatus(element, details.isWarning);
        break;
      default:
        Platform3.assertNever(issueCode, "Unknown issue code: " + issueCode);
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

// ../../front_end/panels/issues/GenericIssueDetailsView.ts
import * as i18n39 from "../../core/i18n/i18n.js";
var UIStrings20 = {
  /**
   * @description Label in the Issues panel for the number of affected resources in the generic issue affected resources table.
   */
  nResources: "{n, plural, =1 {# resource} other {# resources}}",
  /**
   * @description Column header in the Issues panel for frames in the generic issue affected resources table.
   */
  frameId: "Frame",
  /**
   * @description Link text in the Issues panel for the violating DOM node in the generic issue affected resources table.
   */
  violatingNode: "Violating node"
};
var str_20 = i18n39.i18n.registerUIStrings("panels/issues/GenericIssueDetailsView.ts", UIStrings20);
var i18nString20 = i18n39.i18n.getLocalizedString.bind(void 0, str_20);
var GenericIssueDetailsView = class extends AffectedResourcesView {
  getResourceNameWithCount(count) {
    return i18nString20(UIStrings20.nResources, { n: count });
  }
  #appendDetails(genericIssues) {
    const header = document.createElement("tr");
    const sampleIssueDetails = genericIssues.values().next().value?.details();
    if (sampleIssueDetails?.frameId) {
      this.appendColumnTitle(header, i18nString20(UIStrings20.frameId));
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
      element.appendChild(await this.createElementCell(
        { backendNodeId: details.violatingNodeId, nodeName: this.violatingNodeIdName(details.errorType), target },
        genericIssue.getCategory()
      ));
    }
    this.affectedResources.appendChild(element);
  }
  violatingNodeIdName(errorType) {
    switch (errorType) {
      case Audits.GenericIssueErrorType.FormLabelForNameError:
        return i18n39.i18n.lockedString("Label");
      default:
        return i18nString20(UIStrings20.violatingNode);
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

// ../../front_end/panels/issues/IssueView.ts
var UIStrings21 = {
  /**
   * @description Column header in the Issues panel for the resource name in the mixed content affected resources table.
   */
  name: "Name",
  /**
   * @description Resolution status in the Issues panel indicating that a mixed content resource was blocked.
   */
  blocked: "Blocked",
  /**
   * @description Label in the Issues panel for the number of affected network requests.
   */
  nRequests: "{n, plural, =1 {# request} other {# requests}}",
  /**
   * @description Label in the Issues panel for the number of affected mixed content resources.
   */
  nResources: "{n, plural, =1 {# resource} other {# resources}}",
  /**
   * @description Column header in the Issues panel for the restriction status of a mixed content resource.
   */
  restrictionStatus: "Restriction status",
  /**
   * @description Resolution status in the Issues panel indicating that a mixed content resource produced a warning.
   */
  warned: "Warned",
  /**
   * @description Header in the Issues panel for the section listing affected resources for an issue.
   */
  affectedResources: "Affected resources",
  /**
   * @description Link text in the Issues panel to learn more about an issue.
   * @example {SameSite Cookies Explained} PH1
   */
  learnMoreS: "Learn more: {PH1}",
  /**
   * @description Resolution status in the Issues panel indicating that a mixed content resource was automatically upgraded to HTTPS.
   */
  automaticallyUpgraded: "Automatically upgraded",
  /**
   * @description Context menu item in the Issues panel to hide issues of the same type.
   */
  hideIssuesLikeThis: "Hide issues like this",
  /**
   * @description Context menu item in the Issues panel to unhide issues of the same type.
   */
  unhideIssuesLikeThis: "Unhide issues like this"
};
var str_21 = i18n41.i18n.registerUIStrings("panels/issues/IssueView.ts", UIStrings21);
var i18nString21 = i18n41.i18n.getLocalizedString.bind(void 0, str_21);
var AffectedRequestsView = class extends AffectedResourcesView {
  #appendAffectedRequests(affectedRequests) {
    let count = 0;
    for (const affectedRequest of affectedRequests) {
      const element = document.createElement("tr");
      element.classList.add("affected-resource-request");
      element.setAttribute("jslog", `${VisualLogging6.tableRow("affected-request")}`);
      if (affectedRequest.requestId) {
        element.setAttribute("data-network-request-id", affectedRequest.requestId);
      }
      const category = this.issue.getCategory();
      const tab = issueTypeToNetworkHeaderMap.get(category) || NetworkForward3.UIRequestLocation.UIRequestTabs.HEADERS_COMPONENT;
      element.appendChild(this.createRequestCell(affectedRequest, {
        networkTab: tab,
        additionalOnClickAction() {
          Host6.userMetrics.issuesPanelResourceOpened(category, "Request" /* REQUEST */);
        }
      }));
      this.affectedResources.appendChild(element);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
  getResourceNameWithCount(count) {
    return i18nString21(UIStrings21.nRequests, { n: count });
  }
  update() {
    this.clear();
    for (const unused of this.issue.getBlockedByResponseDetails()) {
      this.updateAffectedResourceCount(0);
      return;
    }
    if (this.issue.getCategory() === IssuesManager9.Issue.IssueCategory.MIXED_CONTENT) {
      this.updateAffectedResourceCount(0);
      return;
    }
    this.#appendAffectedRequests(this.issue.requests());
  }
};
var issueTypeToNetworkHeaderMap = /* @__PURE__ */ new Map([
  [
    IssuesManager9.Issue.IssueCategory.COOKIE,
    NetworkForward3.UIRequestLocation.UIRequestTabs.COOKIES
  ],
  [
    IssuesManager9.Issue.IssueCategory.CROSS_ORIGIN_EMBEDDER_POLICY,
    NetworkForward3.UIRequestLocation.UIRequestTabs.HEADERS_COMPONENT
  ],
  [
    IssuesManager9.Issue.IssueCategory.MIXED_CONTENT,
    NetworkForward3.UIRequestLocation.UIRequestTabs.HEADERS_COMPONENT
  ]
]);
var AffectedMixedContentView = class _AffectedMixedContentView extends AffectedResourcesView {
  #appendAffectedMixedContentDetails(mixedContentIssues) {
    const header = document.createElement("tr");
    this.appendColumnTitle(header, i18nString21(UIStrings21.name));
    this.appendColumnTitle(header, i18nString21(UIStrings21.restrictionStatus));
    this.affectedResources.appendChild(header);
    let count = 0;
    for (const issue of mixedContentIssues) {
      const details = issue.details();
      this.appendAffectedMixedContent(details);
      count++;
    }
    this.updateAffectedResourceCount(count);
  }
  getResourceNameWithCount(count) {
    return i18nString21(UIStrings21.nResources, { n: count });
  }
  appendAffectedMixedContent(mixedContent) {
    const element = document.createElement("tr");
    element.classList.add("affected-resource-mixed-content");
    if (mixedContent.request) {
      const networkTab = issueTypeToNetworkHeaderMap.get(this.issue.getCategory()) || NetworkForward3.UIRequestLocation.UIRequestTabs.HEADERS_COMPONENT;
      element.appendChild(this.createRequestCell(mixedContent.request, {
        networkTab,
        additionalOnClickAction() {
          Host6.userMetrics.issuesPanelResourceOpened(
            IssuesManager9.Issue.IssueCategory.MIXED_CONTENT,
            "Request" /* REQUEST */
          );
        }
      }));
    } else {
      const filename = extractShortPath(mixedContent.insecureURL);
      const cell = this.appendIssueDetailCell(element, filename, "affected-resource-mixed-content-info");
      cell.title = mixedContent.insecureURL;
    }
    this.appendIssueDetailCell(
      element,
      _AffectedMixedContentView.translateStatus(mixedContent.resolutionStatus),
      "affected-resource-mixed-content-info"
    );
    this.affectedResources.appendChild(element);
  }
  static translateStatus(resolutionStatus) {
    switch (resolutionStatus) {
      case Audits.MixedContentResolutionStatus.MixedContentBlocked:
        return i18nString21(UIStrings21.blocked);
      case Audits.MixedContentResolutionStatus.MixedContentAutomaticallyUpgraded:
        return i18nString21(UIStrings21.automaticallyUpgraded);
      case Audits.MixedContentResolutionStatus.MixedContentWarning:
        return i18nString21(UIStrings21.warned);
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
    super(void 0, void 0, Platform4.StringUtilities.toKebabCase(issue.getCategory()));
    this.#issue = issue;
    this.#description = description;
    this.#throttle = new Common5.Throttler.Throttler(250);
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
      new CorsIssueDetailsView(this, this.#issue, "cors-details"),
      new GenericIssueDetailsView(this, this.#issue, "generic-details"),
      new AffectedDocumentsInQuirksModeView(this, this.#issue, "affected-documents"),
      new AffectedRawCookieLinesView(this, this.#issue, "affected-raw-cookies"),
      new AffectedTrackingSitesView(this, this.#issue, "tracking-sites-details"),
      new AffectedMetadataAllowedSitesView(this, this.#issue, "metadata-allowed-sites-details"),
      new AffectedDescendantsWithinSelectElementView(this, this.#issue, "disallowed-select-descendants-details"),
      new AffectedPartitioningBlobURLView(this, this.#issue, "partitioning-blob-url-details"),
      new AffectedPermissionElementsView(this, this.#issue, "permission-element-elements"),
      new AffectedLazyLoadImagesView(this, this.#issue, "lazy-load-image-details"),
      new AffectedSelectivePermissionsInterventionView(this, this.#issue, "selective-permissions-intervention-details")
    ];
    this.#hiddenIssuesMenu = new Components5.HideIssuesMenu.HideIssuesMenu();
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
      case IssuesManager9.Issue.IssueKind.BREAKING_CHANGE:
        return "issue-kind-breaking-change";
      case IssuesManager9.Issue.IssueKind.PAGE_ERROR:
        return "issue-kind-page-error";
      case IssuesManager9.Issue.IssueKind.IMPROVEMENT:
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
    this.#issueKindIcon = new Icon3();
    this.#issueKindIcon.classList.add("leading-issue-icon", "extra-large");
    this.#aggregatedIssuesCount = document.createElement("span");
    const countAdorner = new Adorners2.Adorner.Adorner();
    countAdorner.name = "countWrapper";
    countAdorner.append(this.#aggregatedIssuesCount);
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
    if (category === IssuesManager9.Issue.IssueCategory.COOKIE) {
      const cookieIssueSubCategory = IssuesManager9.CookieIssue.CookieIssue.getSubCategory(this.#issue.code());
      Host6.userMetrics.issuesPanelIssueExpanded(cookieIssueSubCategory);
    } else {
      Host6.userMetrics.issuesPanelIssueExpanded(category);
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
      this.#issueKindIcon.name = IssueCounter3.IssueCounter.getIssueKindIconName(kind);
      this.#issueKindIcon.title = IssuesManager9.Issue.getIssueKindDescription(kind);
    }
    if (this.#aggregatedIssuesCount) {
      this.#aggregatedIssuesCount.textContent = `${this.#issue.getAggregatedIssuesCount()}`;
    }
    this.listItemElement.classList.toggle("hidden-issue", this.#issue.isHidden());
    if (this.#hiddenIssuesMenu) {
      const data = {
        menuItemLabel: this.#issue.isHidden() ? i18nString21(UIStrings21.unhideIssuesLikeThis) : i18nString21(UIStrings21.hideIssuesLikeThis),
        menuItemAction: () => {
          const setting = IssuesManager9.IssuesManager.getHideIssueByCodeSetting();
          const values = setting.get();
          values[this.#issue.code()] = this.#issue.isHidden() ? IssuesManager9.IssuesManager.IssueStatus.UNHIDDEN : IssuesManager9.IssuesManager.IssueStatus.HIDDEN;
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
    const wrapper = new UI5.TreeOutline.TreeElement(void 0, false, "affected-resources");
    wrapper.setCollapsible(false);
    wrapper.setExpandable(true);
    wrapper.expand();
    wrapper.selectable = false;
    wrapper.listItemElement.classList.add("affected-resources-label");
    wrapper.listItemElement.textContent = i18nString21(UIStrings21.affectedResources);
    wrapper.childrenListElement.classList.add("affected-resources");
    UI5.ARIAUtils.setPositionInSet(wrapper.listItemElement, 2);
    UI5.ARIAUtils.setSetSize(wrapper.listItemElement, this.#description.links.length === 0 ? 2 : 3);
    return wrapper;
  }
  #createBody() {
    const messageElement = new UI5.TreeOutline.TreeElement(void 0, false, "issue-description");
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
      const linkListItem = linkList.createChild("li");
      render7(
        html6`<devtools-link class="link devtools-link" href=${description.link} jslogcontext="learn-more">${i18nString21(UIStrings21.learnMoreS, { PH1: description.linkTitle })}</devtools-link>`,
        linkListItem
      );
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

// ../../front_end/panels/issues/IssuesPane.ts
var UIStrings22 = {
  /**
   * @description Category title in the Issues panel for a group of Cross-Origin Embedder Policy (COEP) issues.
   */
  crossOriginEmbedderPolicy: "Cross-Origin Embedder Policy",
  /**
   * @description Category title in the Issues panel for a group of mixed content issues.
   */
  mixedContent: "Mixed content",
  /**
   * @description Category title in the Issues panel for a group of SameSite cookie issues.
   */
  samesiteCookie: "SameSite cookie",
  /**
   * @description Category title in the Issues panel for a group of heavy ads issues.
   */
  heavyAds: "Heavy ads",
  /**
   * @description Category title in the Issues panel for a group of Content Security Policy (CSP) issues.
   */
  contentSecurityPolicy: "Content Security Policy",
  /**
   * @description Category title in the Issues panel for other types of issues.
   */
  other: "Other",
  /**
   * @description Category title in the Issues panel for a group of low text contrast issues.
   */
  lowTextContrast: "Low text contrast",
  /**
   * @description Category title in the Issues panel for a group of Cross-Origin Resource Sharing (CORS) issues.
   */
  cors: "Cross-Origin Resource Sharing",
  /**
   * @description Tooltip in the Issues panel for the checkbox to group issues by category.
   */
  groupDisplayedIssuesUnder: "Group displayed issues under associated categories",
  /**
   * @description Label in the Issues panel for the checkbox to group issues by category.
   */
  groupByCategory: "Group by category",
  /**
   * @description Tooltip in the Issues panel for the checkbox to group issues by kind.
   */
  groupDisplayedIssuesUnderKind: "Group displayed issues as page errors, breaking changes, and improvements",
  /**
   * @description Label in the Issues panel for the checkbox to group issues by kind.
   */
  groupByKind: "Group by kind",
  /**
   * @description Tooltip in the Issues panel for the checkbox to include cookie issues caused by third-party sites.
   */
  includeCookieIssuesCausedBy: "Include cookie issues caused by third-party sites",
  /**
   * @description Label in the Issues panel for the checkbox to include cookie issues caused by third-party sites.
   */
  includeThirdpartyCookieIssues: "Include third-party cookie issues",
  /**
   * @description Message in the Issues panel displayed when only third-party cookie issues are detected.
   */
  onlyThirdpartyCookieIssues: "Only third-party cookie issues detected",
  /**
   * @description Message in the Issues panel displayed when no issues are detected.
   */
  noIssues: "No issues detected",
  /**
   * @description Explanation text in the Issues panel shown when no issues are detected.
   */
  issuesPanelDescription: "On this page you can find warnings from the browser.",
  /**
   * @description Category title in the Issues panel for a group of quirks mode issues.
   */
  quirksMode: "Quirks mode",
  /**
   * @description Category title in the Issues panel for a group of generic issues.
   */
  generic: "Generic",
  /**
   * @description Category title in the Issues panel for a group of permission element issues.
   */
  permissionElement: "Permission element",
  /**
   * @description Category title in the Issues panel for a group of selective permissions intervention issues.
   */
  selectivePermissionsIntervention: "Selective permissions intervention"
};
var str_22 = i18n43.i18n.registerUIStrings("panels/issues/IssuesPane.ts", UIStrings22);
var i18nString22 = i18n43.i18n.getLocalizedString.bind(void 0, str_22);
var ISSUES_PANEL_EXPLANATION_URL = "https://developer.chrome.com/docs/devtools/issues";
var IssueCategoryView = class extends UI6.TreeOutline.TreeElement {
  #category;
  constructor(category) {
    super(void 0, void 0, Platform5.StringUtilities.toKebabCase(category));
    this.#category = category;
    this.toggleOnClick = true;
    this.listItemElement.classList.add("issue-category");
    this.childrenListElement.classList.add("issue-category-body");
  }
  getCategoryName() {
    switch (this.#category) {
      case IssuesManager11.Issue.IssueCategory.CROSS_ORIGIN_EMBEDDER_POLICY:
        return i18nString22(UIStrings22.crossOriginEmbedderPolicy);
      case IssuesManager11.Issue.IssueCategory.MIXED_CONTENT:
        return i18nString22(UIStrings22.mixedContent);
      case IssuesManager11.Issue.IssueCategory.COOKIE:
        return i18nString22(UIStrings22.samesiteCookie);
      case IssuesManager11.Issue.IssueCategory.HEAVY_AD:
        return i18nString22(UIStrings22.heavyAds);
      case IssuesManager11.Issue.IssueCategory.CONTENT_SECURITY_POLICY:
        return i18nString22(UIStrings22.contentSecurityPolicy);
      case IssuesManager11.Issue.IssueCategory.LOW_TEXT_CONTRAST:
        return i18nString22(UIStrings22.lowTextContrast);
      case IssuesManager11.Issue.IssueCategory.CORS:
        return i18nString22(UIStrings22.cors);
      case IssuesManager11.Issue.IssueCategory.QUIRKS_MODE:
        return i18nString22(UIStrings22.quirksMode);
      case IssuesManager11.Issue.IssueCategory.GENERIC:
        return i18nString22(UIStrings22.generic);
      case IssuesManager11.Issue.IssueCategory.PERMISSION_ELEMENT:
        return i18nString22(UIStrings22.permissionElement);
      case IssuesManager11.Issue.IssueCategory.SELECTIVE_PERMISSIONS_INTERVENTION:
        return i18nString22(UIStrings22.selectivePermissionsIntervention);
      case IssuesManager11.Issue.IssueCategory.OTHER:
        return i18nString22(UIStrings22.other);
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
  return Common6.Settings.Settings.instance().createSetting("group-issues-by-category", false);
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
    super({
      jslog: `${VisualLogging7.panel("issues")}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(issuesPane_css_default);
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
    this.#noIssuesMessageDiv = new UI6.EmptyWidget.EmptyWidget("", i18nString22(UIStrings22.issuesPanelDescription));
    this.#noIssuesMessageDiv.link = ISSUES_PANEL_EXPLANATION_URL;
    this.#noIssuesMessageDiv.show(this.contentElement);
    this.#issuesManager = IssuesManager11.IssuesManager.IssuesManager.instance();
    this.#aggregator = new IssuesManager11.IssueAggregator.IssueAggregator(this.#issuesManager);
    this.#aggregator.addEventListener(
      IssuesManager11.IssueAggregator.Events.AGGREGATED_ISSUE_UPDATED,
      this.#issueUpdated,
      this
    );
    this.#aggregator.addEventListener(
      IssuesManager11.IssueAggregator.Events.FULL_UPDATE_REQUIRED,
      this.#onFullUpdate,
      this
    );
    this.#hiddenIssuesRow.hidden = this.#issuesManager.numberOfHiddenIssues() === 0;
    this.#onFullUpdate();
    this.#issuesManager.addEventListener(
      IssuesManager11.IssuesManager.Events.ISSUES_COUNT_UPDATED,
      this.#updateCounts,
      this
    );
  }
  elementsToRestoreScrollPositionsFor() {
    return [this.#issuesTree.element];
  }
  #createToolbars() {
    const toolbarContainer = this.contentElement.createChild("div", "issues-toolbar-container");
    toolbarContainer.setAttribute("jslog", `${VisualLogging7.toolbar()}`);
    toolbarContainer.role = "toolbar";
    const leftToolbar = toolbarContainer.createChild("devtools-toolbar", "issues-toolbar-left");
    leftToolbar.role = "presentation";
    const rightToolbar = toolbarContainer.createChild("devtools-toolbar", "issues-toolbar-right");
    rightToolbar.role = "presentation";
    const groupByCategorySetting = getGroupIssuesByCategorySetting();
    const groupByCategoryCheckbox = new UI6.Toolbar.ToolbarSettingCheckbox(
      groupByCategorySetting,
      i18nString22(UIStrings22.groupDisplayedIssuesUnder),
      i18nString22(UIStrings22.groupByCategory)
    );
    groupByCategoryCheckbox.setVisible(false);
    rightToolbar.appendToolbarItem(groupByCategoryCheckbox);
    groupByCategorySetting.addChangeListener(() => {
      this.#fullUpdate(true);
    });
    const groupByKindSetting = getGroupIssuesByKindSetting();
    const groupByKindSettingCheckbox = new UI6.Toolbar.ToolbarSettingCheckbox(
      groupByKindSetting,
      i18nString22(UIStrings22.groupDisplayedIssuesUnderKind),
      i18nString22(UIStrings22.groupByKind)
    );
    rightToolbar.appendToolbarItem(groupByKindSettingCheckbox);
    groupByKindSetting.addChangeListener(() => {
      this.#fullUpdate(true);
    });
    groupByKindSettingCheckbox.setVisible(true);
    const thirdPartySetting = IssuesManager11.Issue.getShowThirdPartyIssuesSetting(Common6.Settings.Settings.instance());
    this.#showThirdPartyCheckbox = new UI6.Toolbar.ToolbarSettingCheckbox(
      thirdPartySetting,
      i18nString22(UIStrings22.includeCookieIssuesCausedBy),
      i18nString22(UIStrings22.includeThirdpartyCookieIssues)
    );
    rightToolbar.appendToolbarItem(this.#showThirdPartyCheckbox);
    rightToolbar.appendSeparator();
    const issueCounter = new IssueCounter5.IssueCounter.IssueCounter();
    issueCounter.data = {
      clickHandler: () => {
        const summary = IssueCounter5.IssueCounter.getIssueCountsEnumeration(
          IssuesManager11.IssuesManager.IssuesManager.instance(),
          false
        );
        UI6.ARIAUtils.LiveAnnouncer.alert(summary);
      },
      tooltipCallback: () => {
        const issueEnumeration = IssueCounter5.IssueCounter.getIssueCountsEnumeration(
          IssuesManager11.IssuesManager.IssuesManager.instance(),
          false
        );
        issueCounter.title = issueEnumeration;
      },
      displayMode: IssueCounter5.IssueCounter.DisplayMode.SHOW_ALWAYS,
      issuesManager: IssuesManager11.IssuesManager.IssuesManager.instance()
    };
    issueCounter.id = "console-issues-counter";
    issueCounter.setAttribute("jslog", `${VisualLogging7.counter("issues")}`);
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
      const markdownDescription = await IssuesManager11.MarkdownIssueDescription.createIssueDescriptionFromMarkdown(description);
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
      view.parent?.removeChild(view);
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
    this.#showIssuesTreeOrNoIssuesDetectedMessage(
      this.#issuesManager.numberOfIssues(),
      this.#issuesManager.numberOfHiddenIssues()
    );
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
      const hasOnlyThirdPartyIssues = this.#issuesManager.numberOfAllStoredIssues() - this.#issuesManager.numberOfThirdPartyCookiePhaseoutIssues() > 0;
      this.#noIssuesMessageDiv.header = hasOnlyThirdPartyIssues ? i18nString22(UIStrings22.onlyThirdpartyCookieIssues) : i18nString22(UIStrings22.noIssues);
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

// ../../front_end/panels/issues/IssueRevealer.ts
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
  AffectedLazyLoadImagesView_exports as AffectedLazyLoadImagesView,
  AffectedSelectivePermissionsInterventionView_exports as AffectedSelectivePermissionsInterventionView,
  IssueRevealer_exports as IssueRevealer,
  IssueView_exports as IssueView,
  IssuesPane_exports as IssuesPane
};
//# sourceMappingURL=issues.js.map
