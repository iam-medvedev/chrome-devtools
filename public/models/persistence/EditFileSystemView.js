/*
 * Copyright (C) 2013 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import '../../ui/legacy/components/data_grid/data_grid.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives, html, render } from '../../ui/lit/lit.js';
import editFileSystemViewStyles from './editFileSystemView.css.js';
const { styleMap } = Directives;
const UIStrings = {
    /**
     * @description Text in Edit File System View of the Workspace settings in Settings to indicate that the following string is a folder URL
     */
    url: 'URL',
    /**
     * @description Text in Edit File System View of the Workspace settings in Settings
     */
    excludedFolders: 'Excluded sub-folders',
    /**
     * @description Error message when a file system path is an empty string.
     */
    enterAPath: 'Enter a path',
    /**
     * @description Error message when a file system path is identical to an existing path.
     */
    enterAUniquePath: 'Enter a unique path',
};
const str_ = i18n.i18n.registerUIStrings('models/persistence/EditFileSystemView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
function statusString(status) {
    switch (status) {
        case 2 /* ExcludedFolderStatus.ERROR_NOT_A_PATH */:
            return i18nString(UIStrings.enterAPath);
        case 3 /* ExcludedFolderStatus.ERROR_NOT_UNIQUE */:
            return i18nString(UIStrings.enterAUniquePath);
        case 1 /* ExcludedFolderStatus.VALID */:
            throw new Error('unreachable');
    }
}
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
      <style>${UI.Widget.widgetScoped(editFileSystemViewStyles)}</style>
      <div class="excluded-folder-header">
        <span>${i18nString(UIStrings.url)}</span>
        <span class="excluded-folder-url">${input.fileSystemPath}</span>
        <devtools-data-grid
          @create=${input.onCreate}
          @edit=${input.onEdit}
          @delete=${input.onDelete}
          class="exclude-subfolders-table"
          parts="excluded-folder-row-with-error"
          inline striped>
          <table>
            <thead>
              <tr>
                <th id="url" editable>${i18nString(UIStrings.excludedFolders)}</th>
              </tr>
            </thead>
            <tbody>
            ${input.excludedFolderPaths.map((path, index) => html `
              <tr data-url=${path.path} data-index=${index}>
                <td style=${styleMap({ backgroundColor: path.status !== 1 /* ExcludedFolderStatus.VALID */ ? 'var(--sys-color-error-container)' : undefined })}>${path.path}</td>
              </tr>
            `)}
            <tr placeholder></tr>
            </tbody>
          </table>
        </devtools-data-grid>
        ${input.excludedFolderPaths.filter(({ status }) => status !== 1 /* ExcludedFolderStatus.VALID */).map(({ status }) => html `<span class="excluded-folder-error">${statusString(status)}</span>`)}
    </div>`, target);
    // clang-format on
};
export class EditFileSystemView extends UI.Widget.VBox {
    #fileSystem;
    #excludedFolderPaths = [];
    #view;
    constructor(element, view = DEFAULT_VIEW) {
        super(element);
        this.#view = view;
    }
    set fileSystem(fileSystem) {
        this.#fileSystem = fileSystem;
        this.#resyncExcludedFolderPaths();
        this.requestUpdate();
    }
    wasShown() {
        this.#resyncExcludedFolderPaths();
        this.requestUpdate();
    }
    #resyncExcludedFolderPaths() {
        this.#excludedFolderPaths = this.#fileSystem?.excludedFolders()
            .values()
            .map(path => ({ path, status: 1 /* ExcludedFolderStatus.VALID */ }))
            .toArray() ??
            [];
    }
    performUpdate() {
        const input = {
            fileSystemPath: this.#fileSystem?.path() ?? Platform.DevToolsPath.urlString ``,
            excludedFolderPaths: this.#excludedFolderPaths,
            onCreate: e => this.#onCreate(e.detail.url),
            onEdit: e => this.#onEdit(e.detail.node.dataset.index ?? '-1', e.detail.valueBeforeEditing, e.detail.newText),
            onDelete: e => this.#onDelete(e.detail.dataset.index ?? '-1'),
        };
        this.#view(input, {}, this.contentElement);
    }
    #onCreate(url) {
        if (url === undefined) {
            // The data grid fires onCreate even when the user just selects and then deselects the
            // creation row. Ignore those occurrences.
            return;
        }
        const pathWithStatus = this.#validateFolder(url);
        this.#excludedFolderPaths.push(pathWithStatus);
        if (pathWithStatus.status === 1 /* ExcludedFolderStatus.VALID */) {
            this.#fileSystem?.addExcludedFolder(pathWithStatus.path);
        }
        this.requestUpdate();
    }
    #onEdit(idx, valueBeforeEditing, newText) {
        const index = Number.parseInt(idx, 10);
        if (index < 0 || index >= this.#excludedFolderPaths.length) {
            return;
        }
        const pathWithStatus = this.#validateFolder(newText);
        const oldPathWithStatus = this.#excludedFolderPaths[index];
        this.#excludedFolderPaths[index] = pathWithStatus;
        if (oldPathWithStatus.status === 1 /* ExcludedFolderStatus.VALID */) {
            this.#fileSystem?.removeExcludedFolder(valueBeforeEditing);
        }
        if (pathWithStatus.status === 1 /* ExcludedFolderStatus.VALID */) {
            this.#fileSystem?.addExcludedFolder(pathWithStatus.path);
        }
        this.requestUpdate();
    }
    #onDelete(idx) {
        const index = Number.parseInt(idx, 10);
        if (index < 0 || index >= this.#excludedFolderPaths.length) {
            return;
        }
        this.#fileSystem?.removeExcludedFolder(this.#excludedFolderPaths[index].path);
        this.#excludedFolderPaths.splice(index, 1);
        this.requestUpdate();
    }
    #validateFolder(rawInput) {
        const path = EditFileSystemView.#normalizePrefix(rawInput.trim());
        if (!path) {
            return { path, status: 2 /* ExcludedFolderStatus.ERROR_NOT_A_PATH */ };
        }
        if (this.#excludedFolderPaths.findIndex(({ path: p }) => p === path) !== -1) {
            return { path, status: 3 /* ExcludedFolderStatus.ERROR_NOT_UNIQUE */ };
        }
        return { path, status: 1 /* ExcludedFolderStatus.VALID */ };
    }
    static #normalizePrefix(prefix) {
        if (!prefix) {
            return '';
        }
        return prefix + (prefix[prefix.length - 1] === '/' ? '' : '/');
    }
}
//# sourceMappingURL=EditFileSystemView.js.map