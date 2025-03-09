// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Persistence from '../../models/persistence/persistence.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import { html, render } from '../../ui/lit/lit.js';
import selectWorkspaceDialogStyles from './selectWorkspaceDialog.css.js';
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    /**
     *@description Heading of dialog box which asks user to select a workspace folder.
     */
    selectFolder: 'Select folder',
    /**
     *@description Button text for canceling workspace selection.
     */
    cancel: 'Cancel',
    /**
     *@description Button text for confirming the selected workspace folder.
     */
    select: 'Select',
    /*
     *@description Button text for adding a workspace folder.
     */
    addFolder: 'Add folder',
    /*
     *@description Explainer stating that selected folder's contents are being sent to Google.
     */
    sourceCodeSent: 'Source code from the selected folder is sent to Google to generate code suggestions'
};
const lockedString = i18n.i18n.lockedString;
export class SelectWorkspaceDialog extends UI.Widget.VBox {
    #view;
    #workspace = Workspace.Workspace.WorkspaceImpl.instance();
    #projects = [];
    #selectedIndex = 0;
    #handleProjectSelected;
    #boundOnKeyDown;
    #dialog;
    constructor(options, view) {
        super();
        this.registerRequiredCSS(selectWorkspaceDialogStyles);
        this.#boundOnKeyDown = this.#onKeyDown.bind(this);
        this.#handleProjectSelected = options.handleProjectSelected;
        this.#projects = this.#getProjects();
        this.#dialog = options.dialog;
        if (options.currentProject) {
            this.#selectedIndex = this.#projects.indexOf(options.currentProject);
        }
        // clang-format off
        this.#view = view ?? ((input, output, target) => {
            render(html `
          <div class="dialog-header">${lockedString(UIStringsNotTranslate.selectFolder)}</div>
          <div class="main-content">${lockedString(UIStringsNotTranslate.sourceCodeSent)}</div>
          <ul>
            ${input.projects.map((project, index) => {
                return html `
                <li
                  @click=${() => input.onProjectSelected(index)}
                  class=${index === input.selectedIndex ? 'selected' : ''}
                  title=${project.path}
                >
                  <devtools-icon class="folder-icon" .name=${'folder'}></devtools-icon>
                  ${project.name}
                </li>`;
            })}
          </ul>
          <div class="buttons">
            <devtools-button
              title=${lockedString(UIStringsNotTranslate.cancel)}
              aria-label="Cancel"
              .jslogContext=${'cancel'}
              @click=${input.onCancelButtonClick}
              .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}>${lockedString(UIStringsNotTranslate.cancel)}</devtools-button>
            <devtools-button
              class="add-folder-button"
              title=${lockedString(UIStringsNotTranslate.addFolder)}
              aria-label="Add folder"
              .iconName=${'plus'}
              .jslogContext=${'add-folder'}
              @click=${input.onAddFolderButtonClick}
              .variant=${"tonal" /* Buttons.Button.Variant.TONAL */}>${lockedString(UIStringsNotTranslate.addFolder)}</devtools-button>
            <devtools-button
              title=${lockedString(UIStringsNotTranslate.select)}
              aria-label="Select"
              @click=${input.onSelectButtonClick}
              .jslogContext=${'select'}
              .variant=${"primary" /* Buttons.Button.Variant.PRIMARY */}>${lockedString(UIStringsNotTranslate.select)}</devtools-button>
          </div>
        `, target, { host: target });
        });
        // clang-format on
        this.performUpdate();
    }
    wasShown() {
        const document = UI.InspectorView.InspectorView.instance().element.ownerDocument;
        document.addEventListener('keydown', this.#boundOnKeyDown, true);
        this.#workspace.addEventListener(Workspace.Workspace.Events.ProjectAdded, this.#onProjectAdded, this);
    }
    willHide() {
        const document = UI.InspectorView.InspectorView.instance().element.ownerDocument;
        document.removeEventListener('keydown', this.#boundOnKeyDown, true);
        this.#workspace.removeEventListener(Workspace.Workspace.Events.ProjectAdded, this.#onProjectAdded, this);
    }
    #onKeyDown(event) {
        switch (event.key) {
            case 'ArrowDown':
                this.#selectedIndex = Math.min(this.#selectedIndex + 1, this.#projects.length - 1);
                this.requestUpdate();
                break;
            case 'ArrowUp':
                this.#selectedIndex = Math.max(this.#selectedIndex - 1, 0);
                this.requestUpdate();
                break;
        }
    }
    performUpdate() {
        const viewInput = {
            projects: this.#projects.map(project => ({
                name: project.displayName(),
                path: Persistence.FileSystemWorkspaceBinding.FileSystemWorkspaceBinding.fileSystemPath((project?.id() || '')),
            })),
            selectedIndex: this.#selectedIndex,
            onProjectSelected: (index) => {
                this.#selectedIndex = index;
                this.requestUpdate();
            },
            onSelectButtonClick: () => {
                this.#dialog.hide();
                this.#handleProjectSelected(this.#projects[this.#selectedIndex]);
            },
            onCancelButtonClick: () => {
                this.#dialog.hide();
            },
            onAddFolderButtonClick: () => {
                void Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance().addFileSystem();
            }
        };
        this.#view(viewInput, undefined, this.contentElement);
    }
    #getProjects() {
        return this.#workspace.projectsForType(Workspace.Workspace.projectTypes.FileSystem)
            .filter(project => project instanceof Persistence.FileSystemWorkspaceBinding.FileSystem &&
            project.fileSystem().type() ===
                Persistence.PlatformFileSystem.PlatformFileSystemType.WORKSPACE_PROJECT);
    }
    #onProjectAdded() {
        this.#projects = this.#getProjects();
        this.requestUpdate();
    }
}
//# sourceMappingURL=SelectWorkspaceDialog.js.map