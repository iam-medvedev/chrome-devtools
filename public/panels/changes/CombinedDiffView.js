// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as Persistence from '../../models/persistence/persistence.js';
import * as WorkspaceDiff from '../../models/workspace_diff/workspace_diff.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as PanelUtils from '../utils/utils.js';
import combinedDiffViewStyles from './combinedDiffView.css.js';
const COPIED_TO_CLIPBOARD_TEXT_TIMEOUT_MS = 1000;
const { html } = Lit;
const UIStrings = {
    /**
     * @description The title of the button after it was pressed and the text was copied to clipboard.
     */
    copied: 'Copied to clipboard',
};
const str_ = i18n.i18n.registerUIStrings('panels/changes/CombinedDiffView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
function renderSingleDiffView(singleDiffViewInput) {
    const { fileName, fileUrl, mimeType, icon, diff, copied, onCopy, onFileNameClick } = singleDiffViewInput;
    return html `
    <details open>
      <summary>
        <div class="summary-left">
          <devtools-icon class="drop-down-icon" .name=${'arrow-drop-down'}></devtools-icon>
          ${icon}
          <button class="file-name-link" @click=${() => onFileNameClick(fileUrl)}>${fileName}</button>
        </div>
        <div class="summary-right">
          ${copied ? html `<span class="copied">${i18nString(UIStrings.copied)}</span>` : html `
            <devtools-button
              title=${'Copy'}
              .size=${"SMALL" /* Buttons.Button.Size.SMALL */}
              .iconName=${'copy'}
              .jslogContext=${'combined-diff-view.copy'}
              .variant=${"icon" /* Buttons.Button.Variant.ICON */}
              @click=${() => onCopy(fileUrl)}></devtools-button>
          `}
        </div>
      </summary>
      <div class='diff-view-container'>
        <devtools-diff-view
          .data=${{ diff, mimeType }}>
        </devtools-diff-view>
      </div>
    </details>
  `;
}
export class CombinedDiffView extends UI.Widget.Widget {
    #workspaceDiff;
    #modifiedUISourceCodes = [];
    #copiedFiles = {};
    #view;
    constructor(element, view = (input, _output, target) => {
        Lit.render(html `
      <div class="combined-diff-view">
        ${input.singleDiffViewInputs.map(singleDiffViewInput => renderSingleDiffView(singleDiffViewInput))}
      </div>
    `, target, { host: target });
    }) {
        super(false, false, element);
        this.registerRequiredCSS(combinedDiffViewStyles);
        this.#view = view;
    }
    wasShown() {
        super.wasShown();
        this.#workspaceDiff?.addEventListener("ModifiedStatusChanged" /* WorkspaceDiff.WorkspaceDiff.Events.MODIFIED_STATUS_CHANGED */, this.#onDiffModifiedStatusChanged, this);
        void this.#initializeModifiedUISourceCodes();
    }
    willHide() {
        this.#workspaceDiff?.removeEventListener("ModifiedStatusChanged" /* WorkspaceDiff.WorkspaceDiff.Events.MODIFIED_STATUS_CHANGED */, this.#onDiffModifiedStatusChanged, this);
    }
    set workspaceDiff(workspaceDiff) {
        this.#workspaceDiff = workspaceDiff;
        void this.#initializeModifiedUISourceCodes();
    }
    async #onCopyFileContent(fileUrl) {
        const file = this.#modifiedUISourceCodes.find(uiSource => uiSource.url() === fileUrl);
        if (!file) {
            return;
        }
        const content = file.workingCopyContentData();
        if (!content.isTextContent) {
            return;
        }
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(content.text);
        this.#copiedFiles[fileUrl] = true;
        this.requestUpdate();
        setTimeout(() => {
            delete this.#copiedFiles[fileUrl];
            this.requestUpdate();
        }, COPIED_TO_CLIPBOARD_TEXT_TIMEOUT_MS);
    }
    #onFileNameClick(fileUrl) {
        const uiSourceCode = this.#modifiedUISourceCodes.find(uiSourceCode => uiSourceCode.url() === fileUrl);
        void Common.Revealer.reveal(uiSourceCode);
    }
    async #initializeModifiedUISourceCodes() {
        if (!this.#workspaceDiff) {
            return;
        }
        const currentModifiedUISourceCodes = this.#modifiedUISourceCodes;
        const nextModifiedUISourceCodes = this.#workspaceDiff.modifiedUISourceCodes();
        // Find the now non modified UI source codes and unsubscribe from their diff changes.
        const nowNonModifiedUISourceCodes = currentModifiedUISourceCodes.filter(uiSourceCode => !nextModifiedUISourceCodes.includes(uiSourceCode));
        nowNonModifiedUISourceCodes.forEach(nonModifiedUISourceCode => this.#workspaceDiff?.unsubscribeFromDiffChange(nonModifiedUISourceCode, this.requestUpdate, this));
        // Find the newly modified UI source codes and subscribe for their diff changes.
        const newlyModifiedUISourceCodes = nextModifiedUISourceCodes.filter(uiSourceCode => !currentModifiedUISourceCodes.includes(uiSourceCode));
        newlyModifiedUISourceCodes.forEach(modifiedUISourceCode => this.#workspaceDiff?.subscribeToDiffChange(modifiedUISourceCode, this.requestUpdate, this));
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
        const uiSourceCodeAndDiffs = await Promise.all(this.#modifiedUISourceCodes.map(async (modifiedUISourceCode) => {
            // `requestDiff` caches the response from the previous `requestDiff` calls if the file did not change
            // so we can safely call it here without concerns for performance.
            const diffResponse = await this.#workspaceDiff?.requestDiff(modifiedUISourceCode);
            return {
                diff: diffResponse?.diff,
                uiSourceCode: modifiedUISourceCode,
            };
        }));
        const singleDiffViewInputs = uiSourceCodeAndDiffs.filter(uiSourceCodeAndDiff => Boolean(uiSourceCodeAndDiff.diff))
            .map(({ uiSourceCode, diff }) => {
            let displayText = uiSourceCode.fullDisplayName();
            // If the UISourceCode is backed by a workspace, we show the path as "{workspace-name}/path/relative/to/workspace"
            const fileSystemUiSourceCode = Persistence.Persistence.PersistenceImpl.instance().fileSystem(uiSourceCode);
            if (fileSystemUiSourceCode) {
                displayText = [
                    fileSystemUiSourceCode.project().displayName(),
                    ...Persistence.FileSystemWorkspaceBinding.FileSystemWorkspaceBinding.relativePath(fileSystemUiSourceCode)
                ].join('/');
            }
            return {
                diff: diff, // We already filter above the ones that does not have `diff`.
                fileName: `${uiSourceCode.isDirty() ? '*' : ''}${displayText}`,
                fileUrl: uiSourceCode.url(),
                mimeType: uiSourceCode.mimeType(),
                icon: PanelUtils.PanelUtils.getIconForSourceFile(uiSourceCode, { width: 18, height: 18 }),
                copied: this.#copiedFiles[uiSourceCode.url()],
                onCopy: this.#onCopyFileContent.bind(this),
                onFileNameClick: this.#onFileNameClick.bind(this),
            };
        })
            .sort((a, b) => Platform.StringUtilities.compare(a.fileName, b.fileName));
        this.#view({ singleDiffViewInputs }, undefined, this.contentElement);
    }
}
//# sourceMappingURL=CombinedDiffView.js.map