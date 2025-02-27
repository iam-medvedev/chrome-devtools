// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
const UIStrings = {
    /**
     * @description Assertion error message when failing to load a file.
     */
    unableToReadFilesWithThis: '`PlatformFileSystem` cannot read files.',
};
const str_ = i18n.i18n.registerUIStrings('models/persistence/PlatformFileSystem.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class PlatformFileSystem {
    pathInternal;
    typeInternal;
    constructor(path, type) {
        this.pathInternal = path;
        this.typeInternal = type;
    }
    getMetadata(_path) {
        return Promise.resolve(null);
    }
    initialFilePaths() {
        return [];
    }
    initialGitFolders() {
        return [];
    }
    path() {
        return this.pathInternal;
    }
    embedderPath() {
        throw new Error('Not implemented');
    }
    type() {
        // TODO(kozyatinskiy): remove type, overrides should implement this interface.
        return this.typeInternal;
    }
    async createFile(_path, _name) {
        return await Promise.resolve(null);
    }
    deleteFile(_path) {
        return Promise.resolve(false);
    }
    deleteDirectoryRecursively(_path) {
        return Promise.resolve(false);
    }
    requestFileBlob(_path) {
        return Promise.resolve(null);
    }
    async requestFileContent(_path) {
        return { error: i18nString(UIStrings.unableToReadFilesWithThis) };
    }
    setFileContent(_path, _content, _isBase64) {
        throw new Error('Not implemented');
    }
    renameFile(_path, _newName, callback) {
        callback(false);
    }
    addExcludedFolder(_path) {
    }
    removeExcludedFolder(_path) {
    }
    fileSystemRemoved() {
    }
    isFileExcluded(_folderPath) {
        return false;
    }
    excludedFolders() {
        return new Set();
    }
    searchInPath(_query, _progress) {
        return Promise.resolve([]);
    }
    indexContent(progress) {
        queueMicrotask(() => {
            progress.done();
        });
    }
    mimeFromPath(_path) {
        throw new Error('Not implemented');
    }
    canExcludeFolder(_path) {
        return false;
    }
    contentType(_path) {
        throw new Error('Not implemented');
    }
    tooltipForURL(_url) {
        throw new Error('Not implemented');
    }
    supportsAutomapping() {
        throw new Error('Not implemented');
    }
}
//# sourceMappingURL=PlatformFileSystem.js.map