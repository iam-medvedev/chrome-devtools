var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/changes/ChangesView.js
var ChangesView_exports = {};
__export(ChangesView_exports, {
  ChangesView: () => ChangesView
});
import "./../../ui/legacy/legacy.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as WorkspaceDiff3 from "./../../models/workspace_diff/workspace_diff.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/changes/ChangesSidebar.js
var ChangesSidebar_exports = {};
__export(ChangesSidebar_exports, {
  ChangesSidebar: () => ChangesSidebar,
  DEFAULT_VIEW: () => DEFAULT_VIEW
});
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as WorkspaceDiff from "./../../models/workspace_diff/workspace_diff.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";
import * as Snippets from "./../snippets/snippets.js";

// gen/front_end/panels/changes/changesSidebar.css.js
var changesSidebar_css_default = `/*
 * Copyright 2021 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
.tree-outline li {
  min-height: 20px;
}

devtools-icon {
  color: var(--icon-file-default);
  margin-right: var(--sys-size-4);
}

.navigator-sm-script-tree-item devtools-icon,
.navigator-script-tree-item devtools-icon,
.navigator-snippet-tree-item devtools-icon {
  color: var(--icon-file-script);
}

.navigator-sm-stylesheet-tree-item devtools-icon,
.navigator-stylesheet-tree-item devtools-icon {
  color: var(--icon-file-styles);
}

.navigator-image-tree-item devtools-icon {
  color: var(--icon-file-image);
}

.navigator-font-tree-item devtools-icon {
  color: var(--icon-file-font);
}

.tree-outline li:hover:not(.selected) .selection {
  display: block;

  & devtools-icon {
    color: var(--icon-default-hover);
  }
}

@media (forced-colors: active) {
  li,
  devtools-icon {
    forced-color-adjust: none;
    color: ButtonText !important; /* stylelint-disable-line declaration-no-important */
  }
}
}

/*# sourceURL=${import.meta.resolve("./changesSidebar.css")} */`;

// gen/front_end/panels/changes/ChangesSidebar.js
var UIStrings = {
  /**
   * @description Name of an item from source map
   * @example {compile.html} PH1
   */
  sFromSourceMap: "{PH1} (from source map)"
};
var str_ = i18n.i18n.registerUIStrings("panels/changes/ChangesSidebar.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var { render, html, Directives: { ref } } = Lit;
var DEFAULT_VIEW = (input, output, target) => {
  const tooltip = (uiSourceCode) => uiSourceCode.contentType().isFromSourceMap() ? i18nString(UIStrings.sFromSourceMap, { PH1: uiSourceCode.displayName() }) : uiSourceCode.url();
  const icon = (uiSourceCode) => Snippets.ScriptSnippetFileSystem.isSnippetsUISourceCode(uiSourceCode) ? "snippet" : "document";
  const configElements = /* @__PURE__ */ new WeakMap();
  const onSelect = (e) => input.onSelect(configElements.get(e.detail) ?? null);
  render(
    // clang-format off
    html`<devtools-tree
             @selected=${onSelect}
             navigation-variant
             hide-overflow .template=${html`
               <ul role="tree">
                 ${input.sourceCodes.values().map((uiSourceCode) => html`
                   <li
                     role="treeitem"
                     ${ref((e) => e instanceof HTMLLIElement && configElements.set(e, uiSourceCode))}
                     ?selected=${uiSourceCode === input.selectedSourceCode}>
                       <style>${changesSidebar_css_default}</style>
                       <div class=${"navigator-" + uiSourceCode.contentType().name() + "-tree-item"}>
                         <devtools-icon name=${icon(uiSourceCode)}></devtools-icon>
                         <span title=${tooltip(uiSourceCode)}>
                           <span ?hidden=${!uiSourceCode.isDirty()}>*</span>
                           ${uiSourceCode.displayName()}
                         </span>
                       </div>
                   </li>`)}
               </ul>`}></devtools-tree>`,
    // clang-format on
    target
  );
};
var ChangesSidebar = class extends Common.ObjectWrapper.eventMixin(UI.Widget.Widget) {
  #workspaceDiff;
  #view;
  #sourceCodes = /* @__PURE__ */ new Set();
  #selectedUISourceCode = null;
  constructor(workspaceDiff, target, view = DEFAULT_VIEW) {
    super({ jslog: `${VisualLogging.pane("sidebar").track({ resize: true })}` });
    this.#view = view;
    this.#workspaceDiff = workspaceDiff;
    this.#workspaceDiff.modifiedUISourceCodes().forEach(this.#addUISourceCode.bind(this));
    this.#workspaceDiff.addEventListener("ModifiedStatusChanged", this.uiSourceCodeModifiedStatusChanged, this);
    this.requestUpdate();
  }
  selectedUISourceCode() {
    return this.#selectedUISourceCode;
  }
  performUpdate() {
    const input = {
      onSelect: (uiSourceCode) => this.#selectionChanged(uiSourceCode),
      sourceCodes: this.#sourceCodes,
      selectedSourceCode: this.#selectedUISourceCode
    };
    this.#view(input, {}, this.contentElement);
  }
  #selectionChanged(selectedUISourceCode) {
    this.#selectedUISourceCode = selectedUISourceCode;
    this.dispatchEventToListeners(
      "SelectedUISourceCodeChanged"
      /* Events.SELECTED_UI_SOURCE_CODE_CHANGED */
    );
    this.requestUpdate();
  }
  #addUISourceCode(uiSourceCode) {
    this.#sourceCodes.add(uiSourceCode);
    uiSourceCode.addEventListener(Workspace.UISourceCode.Events.TitleChanged, this.requestUpdate, this);
    uiSourceCode.addEventListener(Workspace.UISourceCode.Events.WorkingCopyChanged, this.requestUpdate, this);
    uiSourceCode.addEventListener(Workspace.UISourceCode.Events.WorkingCopyCommitted, this.requestUpdate, this);
    this.requestUpdate();
  }
  #removeUISourceCode(uiSourceCode) {
    uiSourceCode.removeEventListener(Workspace.UISourceCode.Events.TitleChanged, this.requestUpdate, this);
    uiSourceCode.removeEventListener(Workspace.UISourceCode.Events.WorkingCopyChanged, this.requestUpdate, this);
    uiSourceCode.removeEventListener(Workspace.UISourceCode.Events.WorkingCopyCommitted, this.requestUpdate, this);
    if (uiSourceCode === this.#selectedUISourceCode) {
      let newSelection;
      for (const sourceCode of this.#sourceCodes.values()) {
        if (sourceCode === uiSourceCode) {
          break;
        }
        newSelection = sourceCode;
      }
      this.#sourceCodes.delete(uiSourceCode);
      this.#selectionChanged(newSelection ?? this.#sourceCodes.values().next().value ?? null);
    } else {
      this.#sourceCodes.delete(uiSourceCode);
    }
    this.requestUpdate();
  }
  uiSourceCodeModifiedStatusChanged(event) {
    const { isModified, uiSourceCode } = event.data;
    if (isModified) {
      this.#addUISourceCode(uiSourceCode);
    } else {
      this.#removeUISourceCode(uiSourceCode);
    }
    this.requestUpdate();
  }
};

// gen/front_end/panels/changes/changesView.css.js
var changesView_css_default = `/*
 * Copyright 2017 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

[slot="main"] {
  flex-direction: column;
  display: flex;
}

[slot="sidebar"] {
  overflow: auto;
}

.diff-container {
  flex: 1;
  overflow: auto;

  & .widget:first-child {
    height: 100%;
  }

  .combined-diff-view {
    padding-inline: var(--sys-size-6);
    padding-block: var(--sys-size-4);
  }
}

:focus.selected {
  background-color: var(--sys-color-tonal-container);
  color: var(--sys-color-on-tonal-container);
}

.changes-toolbar {
  background-color: var(--sys-color-cdt-base-container);
  border-top: 1px solid var(--sys-color-divider);
}

/*# sourceURL=${import.meta.resolve("./changesView.css")} */`;

// gen/front_end/panels/changes/CombinedDiffView.js
var CombinedDiffView_exports = {};
__export(CombinedDiffView_exports, {
  CombinedDiffView: () => CombinedDiffView
});
import * as Common2 from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as Persistence from "./../../models/persistence/persistence.js";
import * as WorkspaceDiff2 from "./../../models/workspace_diff/workspace_diff.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as CopyToClipboard from "./../../ui/components/copy_to_clipboard/copy_to_clipboard.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as Lit2 from "./../../ui/lit/lit.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";
import * as PanelUtils from "./../utils/utils.js";

// gen/front_end/panels/changes/combinedDiffView.css.js
var combinedDiffView_css_default = `/*
 * Copyright 2025 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.combined-diff-view {
  display: flex;
  flex-direction: column;
  gap: var(--sys-size-5);
  height: 100%;
  background-color: var(--sys-color-surface3);
  overflow: auto;

  details {
    flex-shrink: 0;
    border-radius: 12px;

    &.selected {
      outline: var(--sys-size-2) solid var(--sys-color-divider-on-tonal-container);
    }

    summary {
      background-color: var(--sys-color-surface1);
      border-radius: var(--sys-shape-corner-medium-small);
      height: var(--sys-size-12);
      padding: var(--sys-size-3);
      font: var(--sys-typescale-body5-bold);
      display: flex;
      justify-content: space-between;
      gap: var(--sys-size-2);

      &:focus-visible {
        outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
        /* Prevents outline clipping by drawing it inside the element's bounds instead of outside. */
        outline-offset: calc(-1 * var(--sys-size-2));
      }

      .summary-left {
        display: flex;
        align-items: center;
        min-width: 0;
        flex-grow: 0;

        .file-name-link {
          margin-left: var(--sys-size-5);
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          text-wrap-mode: nowrap;
          border: none;
          background: none;
          font: inherit;
          padding: 0;

          &:hover {
            color: var(--sys-color-primary);
            text-decoration: underline;
            cursor: pointer;
          }

          &:focus-visible {
            outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
            outline-offset: var(--sys-size-2);
          }
        }

        devtools-icon {
          transform: rotate(270deg);
        }

        devtools-file-source-icon {
          height: var(--sys-size-8);
          width: var(--sys-size-8);
          flex-shrink: 0;
        }
      }

      .summary-right {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: var(--sys-size-2);
        padding-right: var(--sys-size-4);

        .copied {
          font: var(--sys-typescale-body5-regular);
        }
      }

      &::marker {
        content: '';
      }
    }

    .diff-view-container {
      overflow-x: auto;
      background-color: var(--sys-color-cdt-base-container);
      border-bottom-left-radius: var(--sys-shape-corner-medium-small);
      border-bottom-right-radius: var(--sys-shape-corner-medium-small);
    }

    &[open] {
      summary {
        border-radius: 0;
        border-top-left-radius: var(--sys-shape-corner-medium-small);
        border-top-right-radius: var(--sys-shape-corner-medium-small);

        devtools-icon {
          transform: rotate(0deg);
        }
      }
    }
  }
}

/*# sourceURL=${import.meta.resolve("./combinedDiffView.css")} */`;

// gen/front_end/panels/changes/CombinedDiffView.js
var COPIED_TO_CLIPBOARD_TEXT_TIMEOUT_MS = 1e3;
var { html: html2, Directives: { classMap } } = Lit2;
var UIStrings2 = {
  /**
   * @description The title of the button after it was pressed and the text was copied to clipboard.
   */
  copied: "Copied to clipboard",
  /**
   * @description The title of the copy file to clipboard button
   * @example {index.css} PH1
   */
  copyFile: "Copy file {PH1} to clipboard"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/changes/CombinedDiffView.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
function renderSingleDiffView(singleDiffViewInput) {
  const { fileName, fileUrl, mimeType, icon, diff, copied, selectedFileUrl, onCopy, onFileNameClick } = singleDiffViewInput;
  const classes = classMap({
    selected: selectedFileUrl === fileUrl
  });
  return html2`
    <details open class=${classes}>
      <summary>
        <div class="summary-left">
          <devtools-icon class="drop-down-icon" name="arrow-drop-down"></devtools-icon>
          ${icon}
          <button class="file-name-link" jslog=${VisualLogging2.action("jump-to-file")} @click=${() => onFileNameClick(fileUrl)}>${fileName}</button>
        </div>
        <div class="summary-right">
          <devtools-button
            .title=${i18nString2(UIStrings2.copyFile, { PH1: fileName })}
            .size=${"SMALL"}
            .iconName=${"copy"}
            .jslogContext=${"combined-diff-view.copy"}
            .variant=${"icon"}
            @click=${() => onCopy(fileUrl)}
          ></devtools-button>
          ${copied ? html2`<span class="copied">${i18nString2(UIStrings2.copied)}</span>` : Lit2.nothing}
        </div>
      </summary>
      <div class="diff-view-container">
        <devtools-diff-view
          .data=${{ diff, mimeType }}>
        </devtools-diff-view>
      </div>
    </details>
  `;
}
var CombinedDiffView = class extends UI2.Widget.Widget {
  /**
   * Ignores urls that start with any in the list
   */
  ignoredUrls = [];
  #selectedFileUrl;
  #workspaceDiff;
  #modifiedUISourceCodes = [];
  #copiedFiles = {};
  #view;
  #viewOutput = {};
  constructor(element, view = (input, output, target) => {
    output.scrollToSelectedDiff = () => {
      target.querySelector("details.selected")?.scrollIntoView();
    };
    Lit2.render(html2`
      <div class="combined-diff-view">
        ${input.singleDiffViewInputs.map((singleDiffViewInput) => renderSingleDiffView(singleDiffViewInput))}
      </div>
    `, target, { host: target });
  }) {
    super(element);
    this.registerRequiredCSS(combinedDiffView_css_default);
    this.#view = view;
  }
  wasShown() {
    super.wasShown();
    this.#workspaceDiff?.addEventListener("ModifiedStatusChanged", this.#onDiffModifiedStatusChanged, this);
    void this.#initializeModifiedUISourceCodes();
  }
  willHide() {
    this.#workspaceDiff?.removeEventListener("ModifiedStatusChanged", this.#onDiffModifiedStatusChanged, this);
  }
  set workspaceDiff(workspaceDiff) {
    this.#workspaceDiff = workspaceDiff;
    void this.#initializeModifiedUISourceCodes();
  }
  set selectedFileUrl(fileUrl) {
    this.#selectedFileUrl = fileUrl;
    this.requestUpdate();
    void this.updateComplete.then(() => {
      this.#viewOutput.scrollToSelectedDiff?.();
    });
  }
  async #onCopyFileContent(fileUrl) {
    const file = this.#modifiedUISourceCodes.find((uiSource) => uiSource.url() === fileUrl);
    if (!file) {
      return;
    }
    const content = file.workingCopyContentData();
    if (!content.isTextContent) {
      return;
    }
    CopyToClipboard.copyTextToClipboard(content.text, i18nString2(UIStrings2.copied));
    this.#copiedFiles[fileUrl] = true;
    this.requestUpdate();
    setTimeout(() => {
      delete this.#copiedFiles[fileUrl];
      this.requestUpdate();
    }, COPIED_TO_CLIPBOARD_TEXT_TIMEOUT_MS);
  }
  #onFileNameClick(fileUrl) {
    const uiSourceCode = this.#modifiedUISourceCodes.find((uiSourceCode2) => uiSourceCode2.url() === fileUrl);
    void Common2.Revealer.reveal(uiSourceCode);
  }
  async #initializeModifiedUISourceCodes() {
    if (!this.#workspaceDiff) {
      return;
    }
    const currentModifiedUISourceCodes = this.#modifiedUISourceCodes;
    const nextModifiedUISourceCodes = this.#workspaceDiff.modifiedUISourceCodes();
    const nowNonModifiedUISourceCodes = currentModifiedUISourceCodes.filter((uiSourceCode) => !nextModifiedUISourceCodes.includes(uiSourceCode));
    nowNonModifiedUISourceCodes.forEach((nonModifiedUISourceCode) => this.#workspaceDiff?.unsubscribeFromDiffChange(nonModifiedUISourceCode, this.requestUpdate, this));
    const newlyModifiedUISourceCodes = nextModifiedUISourceCodes.filter((uiSourceCode) => !currentModifiedUISourceCodes.includes(uiSourceCode));
    newlyModifiedUISourceCodes.forEach((modifiedUISourceCode) => this.#workspaceDiff?.subscribeToDiffChange(modifiedUISourceCode, this.requestUpdate, this));
    this.#modifiedUISourceCodes = nextModifiedUISourceCodes;
    if (this.isShowing()) {
      this.requestUpdate();
    }
  }
  async #onDiffModifiedStatusChanged() {
    if (!this.#workspaceDiff) {
      return;
    }
    await this.#initializeModifiedUISourceCodes();
  }
  async performUpdate() {
    const uiSourceCodeAndDiffs = (await Promise.all(this.#modifiedUISourceCodes.map(async (modifiedUISourceCode) => {
      for (const ignoredUrl of this.ignoredUrls) {
        if (modifiedUISourceCode.url().startsWith(ignoredUrl)) {
          return;
        }
      }
      const diffResponse = await this.#workspaceDiff?.requestDiff(modifiedUISourceCode);
      return {
        diff: diffResponse?.diff ?? [],
        uiSourceCode: modifiedUISourceCode
      };
    }))).filter((uiSourceCodeAndDiff) => !!uiSourceCodeAndDiff);
    const singleDiffViewInputs = uiSourceCodeAndDiffs.map(({ uiSourceCode, diff }) => {
      let displayText = uiSourceCode.fullDisplayName();
      const fileSystemUiSourceCode = Persistence.Persistence.PersistenceImpl.instance().fileSystem(uiSourceCode);
      if (fileSystemUiSourceCode) {
        displayText = [
          fileSystemUiSourceCode.project().displayName(),
          ...Persistence.FileSystemWorkspaceBinding.FileSystemWorkspaceBinding.relativePath(fileSystemUiSourceCode)
        ].join("/");
      }
      return {
        diff,
        fileName: `${uiSourceCode.isDirty() ? "*" : ""}${displayText}`,
        fileUrl: uiSourceCode.url(),
        mimeType: uiSourceCode.mimeType(),
        icon: PanelUtils.PanelUtils.getIconForSourceFile(uiSourceCode),
        copied: this.#copiedFiles[uiSourceCode.url()],
        selectedFileUrl: this.#selectedFileUrl,
        onCopy: this.#onCopyFileContent.bind(this),
        onFileNameClick: this.#onFileNameClick.bind(this)
      };
    });
    this.#view({ singleDiffViewInputs }, this.#viewOutput, this.contentElement);
  }
};

// gen/front_end/panels/changes/ChangesView.js
var CHANGES_VIEW_URL = "https://developer.chrome.com/docs/devtools/changes";
var UIStrings3 = {
  /**
   * @description Text in Changes View of the Changes tab if no change has been made so far.
   */
  noChanges: "No changes yet",
  /**
   * @description Text in Changes View of the Changes tab to explain the Changes panel.
   */
  changesViewDescription: "On this page you can track code changes made within DevTools."
};
var str_3 = i18n5.i18n.registerUIStrings("panels/changes/ChangesView.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var ChangesView = class _ChangesView extends UI3.Widget.VBox {
  emptyWidget;
  workspaceDiff;
  changesSidebar;
  selectedUISourceCode;
  diffContainer;
  combinedDiffView;
  constructor() {
    super({
      jslog: `${VisualLogging3.panel("changes").track({ resize: true })}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(changesView_css_default);
    const splitWidget = new UI3.SplitWidget.SplitWidget(
      true,
      false
      /* sidebar on left */
    );
    const mainWidget = new UI3.Widget.VBox();
    splitWidget.setMainWidget(mainWidget);
    splitWidget.show(this.contentElement);
    this.emptyWidget = new UI3.EmptyWidget.EmptyWidget("", "");
    this.emptyWidget.show(mainWidget.element);
    this.workspaceDiff = WorkspaceDiff3.WorkspaceDiff.workspaceDiff();
    this.changesSidebar = new ChangesSidebar(this.workspaceDiff);
    this.changesSidebar.addEventListener("SelectedUISourceCodeChanged", this.selectedUISourceCodeChanged, this);
    splitWidget.setSidebarWidget(this.changesSidebar);
    this.selectedUISourceCode = null;
    this.diffContainer = mainWidget.element.createChild("div", "diff-container");
    UI3.ARIAUtils.markAsTabpanel(this.diffContainer);
    this.combinedDiffView = new CombinedDiffView();
    this.combinedDiffView.workspaceDiff = this.workspaceDiff;
    this.combinedDiffView.show(this.diffContainer);
    this.hideDiff();
    this.selectedUISourceCodeChanged();
  }
  renderDiffOrEmptyState() {
    if (this.workspaceDiff.modifiedUISourceCodes().length > 0) {
      this.showDiff();
    } else {
      this.hideDiff();
    }
  }
  selectedUISourceCodeChanged() {
    const selectedUISourceCode = this.changesSidebar.selectedUISourceCode();
    if (!selectedUISourceCode || this.selectedUISourceCode === selectedUISourceCode) {
      return;
    }
    this.selectedUISourceCode = selectedUISourceCode;
    this.combinedDiffView.selectedFileUrl = selectedUISourceCode.url();
  }
  wasShown() {
    UI3.Context.Context.instance().setFlavor(_ChangesView, this);
    super.wasShown();
    this.renderDiffOrEmptyState();
    this.workspaceDiff.addEventListener("ModifiedStatusChanged", this.renderDiffOrEmptyState, this);
  }
  willHide() {
    super.willHide();
    UI3.Context.Context.instance().setFlavor(_ChangesView, null);
    this.workspaceDiff.removeEventListener("ModifiedStatusChanged", this.renderDiffOrEmptyState, this);
  }
  hideDiff() {
    this.diffContainer.style.display = "none";
    this.emptyWidget.header = i18nString3(UIStrings3.noChanges);
    this.emptyWidget.text = i18nString3(UIStrings3.changesViewDescription);
    this.emptyWidget.link = CHANGES_VIEW_URL;
    this.emptyWidget.showWidget();
  }
  showDiff() {
    this.emptyWidget.hideWidget();
    this.diffContainer.style.display = "block";
  }
};
export {
  ChangesSidebar_exports as ChangesSidebar,
  ChangesView_exports as ChangesView,
  CombinedDiffView_exports as CombinedDiffView
};
//# sourceMappingURL=changes.js.map
