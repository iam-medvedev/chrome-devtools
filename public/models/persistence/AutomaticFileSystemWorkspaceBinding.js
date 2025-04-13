// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import * as Workspace from '../workspace/workspace.js';
/**
 * Placeholder project that acts as an empty file system within the workspace,
 * and automatically disappears when the user connects the automatic workspace
 * folder.
 *
 * @see AutomaticFileSystemWorkspaceBinding
 */
export class FileSystem {
    automaticFileSystem;
    automaticFileSystemManager;
    #workspace;
    constructor(automaticFileSystem, automaticFileSystemManager, workspace) {
        this.automaticFileSystem = automaticFileSystem;
        this.automaticFileSystemManager = automaticFileSystemManager;
        this.#workspace = workspace;
    }
    workspace() {
        return this.#workspace;
    }
    id() {
        return `${this.type()}:${this.automaticFileSystem.root}:${this.automaticFileSystem.uuid}`;
    }
    type() {
        return Workspace.Workspace.projectTypes.ConnectableFileSystem;
    }
    isServiceProject() {
        return false;
    }
    displayName() {
        const { root } = this.automaticFileSystem;
        let slash = root.lastIndexOf('/');
        if (slash === -1 && Host.Platform.isWin()) {
            slash = root.lastIndexOf('\\');
        }
        return root.substr(slash + 1);
    }
    async requestMetadata(_uiSourceCode) {
        throw new Error('Not implemented');
    }
    async requestFileContent(_uiSourceCode) {
        throw new Error('Not implemented');
    }
    canSetFileContent() {
        return false;
    }
    async setFileContent(_uiSourceCode, _newContent, _isBase64) {
        throw new Error('Not implemented');
    }
    fullDisplayName(_uiSourceCode) {
        throw new Error('Not implemented');
    }
    mimeType(_uiSourceCode) {
        throw new Error('Not implemented');
    }
    canRename() {
        return false;
    }
    rename(_uiSourceCode, _newName, _callback) {
        throw new Error('Not implemented');
    }
    excludeFolder(_path) {
        throw new Error('Not implemented');
    }
    canExcludeFolder(_path) {
        return false;
    }
    async createFile(_path, _name, _content, _isBase64) {
        throw new Error('Not implemented');
    }
    canCreateFile() {
        return false;
    }
    deleteFile(_uiSourceCode) {
        throw new Error('Not implemented');
    }
    async deleteDirectoryRecursively(_path) {
        throw new Error('Not implemented');
    }
    remove() {
    }
    removeUISourceCode(_url) {
        throw new Error('Not implemented');
    }
    async searchInFileContent(_uiSourceCode, _query, _caseSensitive, _isRegex) {
        return [];
    }
    async findFilesMatchingSearchRequest(_searchConfig, _filesMatchingFileQuery, _progress) {
        return new Map();
    }
    indexContent(_progress) {
    }
    uiSourceCodeForURL(_url) {
        return null;
    }
    uiSourceCodes() {
        return [];
    }
}
let automaticFileSystemWorkspaceBindingInstance;
/**
 * Provides a transient workspace `Project` that doesn't contain any `UISourceCode`s,
 * and only acts as a placeholder for the automatic file system, while it's not
 * connected yet. The placeholder project automatically disappears as soon as
 * the automatic file system is connected successfully.
 */
export class AutomaticFileSystemWorkspaceBinding {
    #automaticFileSystemManager;
    #fileSystem = null;
    #workspace;
    /**
     * @internal
     */
    constructor(automaticFileSystemManager, workspace) {
        this.#automaticFileSystemManager = automaticFileSystemManager;
        this.#workspace = workspace;
        this.#automaticFileSystemManager.addEventListener("AutomaticFileSystemChanged" /* Events.AUTOMATIC_FILE_SYSTEM_CHANGED */, this.#automaticFileSystemChanged, this);
        this.#automaticFileSystemChanged({ data: this.#automaticFileSystemManager.automaticFileSystem });
    }
    /**
     * Yields the `AutomaticFileSystemWorkspaceBinding` singleton.
     *
     * @returns the singleton.
     */
    static instance({ forceNew, automaticFileSystemManager, workspace } = { forceNew: false, automaticFileSystemManager: null, workspace: null }) {
        if (!automaticFileSystemWorkspaceBindingInstance || forceNew) {
            if (!automaticFileSystemManager || !workspace) {
                throw new Error('Unable to create AutomaticFileSystemWorkspaceBinding: ' +
                    'automaticFileSystemManager and workspace must be provided');
            }
            automaticFileSystemWorkspaceBindingInstance = new AutomaticFileSystemWorkspaceBinding(automaticFileSystemManager, workspace);
        }
        return automaticFileSystemWorkspaceBindingInstance;
    }
    /**
     * Clears the `AutomaticFileSystemWorkspaceBinding` singleton (if any);
     */
    static removeInstance() {
        if (automaticFileSystemWorkspaceBindingInstance) {
            automaticFileSystemWorkspaceBindingInstance.#dispose();
            automaticFileSystemWorkspaceBindingInstance = undefined;
        }
    }
    #dispose() {
        if (this.#fileSystem) {
            this.#workspace.removeProject(this.#fileSystem);
        }
        this.#automaticFileSystemManager.removeEventListener("AutomaticFileSystemChanged" /* Events.AUTOMATIC_FILE_SYSTEM_CHANGED */, this.#automaticFileSystemChanged, this);
    }
    #automaticFileSystemChanged(event) {
        const automaticFileSystem = event.data;
        if (this.#fileSystem !== null) {
            if (this.#fileSystem.automaticFileSystem === automaticFileSystem) {
                return;
            }
            this.#workspace.removeProject(this.#fileSystem);
            this.#fileSystem = null;
        }
        if (automaticFileSystem !== null && automaticFileSystem.state !== 'connected') {
            this.#fileSystem = new FileSystem(automaticFileSystem, this.#automaticFileSystemManager, this.#workspace);
            this.#workspace.addProject(this.#fileSystem);
        }
    }
}
//# sourceMappingURL=AutomaticFileSystemWorkspaceBinding.js.map