// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Persistence from '../../models/persistence/persistence.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import { html, nothing, render } from '../../ui/lit/lit.js';
import selectWorkspaceDialogStyles from './selectWorkspaceDialog.css.js';
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    /**
     *@description Heading of dialog box which asks user to select a workspace folder.
     */
    selectFolder: 'Select project root folder',
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
     *@description Explanation for selecting the correct workspace folder.
     */
    selectProjectRoot: 'To save patches directly to your project, select the project root folder containing the source files of the inspected page.',
    /*
     *@description Explainer stating that selected folder's contents are being sent to Google.
     */
    sourceCodeSent: 'Relevant code snippets will be sent to Google to generate code suggestions.'
};
const lockedString = i18n.i18n.lockedString;
export class SelectWorkspaceDialog extends UI.Widget.VBox {
    #view;
    #workspace = Workspace.Workspace.WorkspaceImpl.instance();
    #projects = [];
    #selectedIndex = 0;
    #onProjectSelected;
    #boundOnKeyDown;
    #dialog;
    constructor(options, view) {
        super();
        this.element.classList.add('dialog-container');
        this.registerRequiredCSS(selectWorkspaceDialogStyles);
        this.#boundOnKeyDown = this.#onKeyDown.bind(this);
        this.#onProjectSelected = options.onProjectSelected;
        this.#projects = this.#getProjects();
        this.#dialog = options.dialog;
        if (options.currentProject) {
            this.#selectedIndex = this.#projects.indexOf(options.currentProject);
        }
        // clang-format off
        this.#view = view ?? ((input, output, target) => {
            const hasProjects = input.projects.length > 0;
            render(html `
          <div class="dialog-header">${lockedString(UIStringsNotTranslate.selectFolder)}</div>
          <div class="main-content">
            <div class="select-project-root">${lockedString(UIStringsNotTranslate.selectProjectRoot)}</div>
            <div>${lockedString(UIStringsNotTranslate.sourceCodeSent)}</div>
          </div>
          ${input.projects.length > 0 ? html `
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
          ` : nothing}
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
              .variant=${hasProjects ? "tonal" /* Buttons.Button.Variant.TONAL */ : "primary" /* Buttons.Button.Variant.PRIMARY */}>${lockedString(UIStringsNotTranslate.addFolder)}</devtools-button>
            ${hasProjects ? html `
              <devtools-button
                title=${lockedString(UIStringsNotTranslate.select)}
                aria-label="Select"
                @click=${input.onSelectButtonClick}
                .jslogContext=${'select'}
                .variant=${"primary" /* Buttons.Button.Variant.PRIMARY */}>${lockedString(UIStringsNotTranslate.select)}</devtools-button>
            ` : nothing}
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
        this.#workspace.addEventListener(Workspace.Workspace.Events.ProjectRemoved, this.#onProjectRemoved, this);
    }
    willHide() {
        const document = UI.InspectorView.InspectorView.instance().element.ownerDocument;
        document.removeEventListener('keydown', this.#boundOnKeyDown, true);
        this.#workspace.removeEventListener(Workspace.Workspace.Events.ProjectAdded, this.#onProjectAdded, this);
        this.#workspace.removeEventListener(Workspace.Workspace.Events.ProjectRemoved, this.#onProjectRemoved, this);
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
                this.#onProjectSelected(this.#projects[this.#selectedIndex]);
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
    #onProjectAdded(event) {
        const addedProject = event.data;
        this.#projects = this.#getProjects();
        const projectIndex = this.#projects.indexOf(addedProject);
        if (projectIndex !== -1) {
            this.#selectedIndex = projectIndex;
        }
        this.requestUpdate();
    }
    #onProjectRemoved() {
        const selectedProject = (this.#selectedIndex >= 0 && this.#selectedIndex < this.#projects.length) ?
            this.#projects[this.#selectedIndex] :
            null;
        this.#projects = this.#getProjects();
        if (selectedProject) {
            const projectIndex = this.#projects.indexOf(selectedProject);
            // If the previously selected project still exists, select it again.
            // If the previously selected project has been removed, select the project which is now in its
            // position. If the previously selected and now removed project was in last position, select
            // the project which is now in last position.
            this.#selectedIndex =
                projectIndex === -1 ? Math.min(this.#projects.length - 1, this.#selectedIndex) : projectIndex;
        }
        else {
            this.#selectedIndex = 0;
        }
        this.requestUpdate();
    }
    static show(onProjectSelected, currentProject) {
        const dialog = new UI.Dialog.Dialog('select-workspace');
        dialog.setMaxContentSize(new UI.Geometry.Size(384, 340));
        dialog.setSizeBehavior("SetExactWidthMaxHeight" /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */);
        dialog.setDimmed(true);
        new SelectWorkspaceDialog({ dialog, onProjectSelected, currentProject }).show(dialog.contentElement);
        dialog.show();
    }
}
//# sourceMappingURL=SelectWorkspaceDialog.js.map