/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
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
import * as Common from '../../core/common/common.js';
import { UISourceCode } from './UISourceCode.js';
/* eslint-disable @typescript-eslint/naming-convention -- Used by web_tests. */
export var projectTypes;
(function (projectTypes) {
    projectTypes["Debugger"] = "debugger";
    projectTypes["Formatter"] = "formatter";
    projectTypes["Network"] = "network";
    projectTypes["FileSystem"] = "filesystem";
    projectTypes["ConnectableFileSystem"] = "connectablefilesystem";
    projectTypes["ContentScripts"] = "contentscripts";
    projectTypes["Service"] = "service";
})(projectTypes || (projectTypes = {}));
/* eslint-enable @typescript-eslint/naming-convention */
export class ProjectStore {
    #workspace;
    #id;
    #type;
    #displayName;
    #uiSourceCodes = new Map();
    constructor(workspace, id, type, displayName) {
        this.#workspace = workspace;
        this.#id = id;
        this.#type = type;
        this.#displayName = displayName;
    }
    id() {
        return this.#id;
    }
    type() {
        return this.#type;
    }
    displayName() {
        return this.#displayName;
    }
    workspace() {
        return this.#workspace;
    }
    createUISourceCode(url, contentType) {
        return new UISourceCode(this, url, contentType);
    }
    addUISourceCode(uiSourceCode) {
        const url = uiSourceCode.url();
        if (this.uiSourceCodeForURL(url)) {
            return false;
        }
        this.#uiSourceCodes.set(url, uiSourceCode);
        this.#workspace.dispatchEventToListeners(Events.UISourceCodeAdded, uiSourceCode);
        return true;
    }
    removeUISourceCode(url) {
        const uiSourceCode = this.#uiSourceCodes.get(url);
        if (uiSourceCode === undefined) {
            return;
        }
        this.#uiSourceCodes.delete(url);
        this.#workspace.dispatchEventToListeners(Events.UISourceCodeRemoved, uiSourceCode);
    }
    removeProject() {
        this.#workspace.removeProject(this);
        this.#uiSourceCodes.clear();
    }
    uiSourceCodeForURL(url) {
        return this.#uiSourceCodes.get(url) ?? null;
    }
    uiSourceCodes() {
        return this.#uiSourceCodes.values();
    }
    renameUISourceCode(uiSourceCode, newName) {
        const oldPath = uiSourceCode.url();
        const newPath = uiSourceCode.parentURL() ?
            Common.ParsedURL.ParsedURL.urlFromParentUrlAndName(uiSourceCode.parentURL(), newName) :
            Common.ParsedURL.ParsedURL.preEncodeSpecialCharactersInPath(newName);
        this.#uiSourceCodes.set(newPath, uiSourceCode);
        this.#uiSourceCodes.delete(oldPath);
    }
    // No-op implementation for a handful of interface methods.
    rename(_uiSourceCode, _newName, _callback) {
    }
    excludeFolder(_path) {
    }
    deleteFile(_uiSourceCode) {
    }
    deleteDirectoryRecursively(_path) {
        return Promise.resolve(false);
    }
    remove() {
    }
    indexContent(_progress) {
    }
}
let workspaceInstance;
export class WorkspaceImpl extends Common.ObjectWrapper.ObjectWrapper {
    #projects = new Map();
    #hasResourceContentTrackingExtensions = false;
    constructor() {
        super();
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!workspaceInstance || forceNew) {
            workspaceInstance = new WorkspaceImpl();
        }
        return workspaceInstance;
    }
    static removeInstance() {
        workspaceInstance = undefined;
    }
    uiSourceCode(projectId, url) {
        const project = this.#projects.get(projectId);
        return project ? project.uiSourceCodeForURL(url) : null;
    }
    uiSourceCodeForURL(url) {
        for (const project of this.#projects.values()) {
            const uiSourceCode = project.uiSourceCodeForURL(url);
            if (uiSourceCode) {
                return uiSourceCode;
            }
        }
        return null;
    }
    findCompatibleUISourceCodes(uiSourceCode) {
        const url = uiSourceCode.url();
        const contentType = uiSourceCode.contentType();
        const result = [];
        for (const project of this.#projects.values()) {
            if (uiSourceCode.project().type() !== project.type()) {
                continue;
            }
            const candidate = project.uiSourceCodeForURL(url);
            if (candidate && candidate.url() === url && candidate.contentType() === contentType) {
                result.push(candidate);
            }
        }
        return result;
    }
    uiSourceCodesForProjectType(type) {
        const result = [];
        for (const project of this.#projects.values()) {
            if (project.type() === type) {
                for (const uiSourceCode of project.uiSourceCodes()) {
                    result.push(uiSourceCode);
                }
            }
        }
        return result;
    }
    addProject(project) {
        console.assert(!this.#projects.has(project.id()), `A project with id ${project.id()} already exists!`);
        this.#projects.set(project.id(), project);
        this.dispatchEventToListeners(Events.ProjectAdded, project);
    }
    removeProject(project) {
        this.#projects.delete(project.id());
        this.dispatchEventToListeners(Events.ProjectRemoved, project);
    }
    project(projectId) {
        return this.#projects.get(projectId) || null;
    }
    projectForFileSystemRoot(root) {
        const projectId = Common.ParsedURL.ParsedURL.rawPathToUrlString(root);
        return this.project(projectId);
    }
    projects() {
        return [...this.#projects.values()];
    }
    projectsForType(type) {
        function filterByType(project) {
            return project.type() === type;
        }
        return this.projects().filter(filterByType);
    }
    uiSourceCodes() {
        const result = [];
        for (const project of this.#projects.values()) {
            for (const uiSourceCode of project.uiSourceCodes()) {
                result.push(uiSourceCode);
            }
        }
        return result;
    }
    setHasResourceContentTrackingExtensions(hasExtensions) {
        this.#hasResourceContentTrackingExtensions = hasExtensions;
    }
    hasResourceContentTrackingExtensions() {
        return this.#hasResourceContentTrackingExtensions;
    }
}
export var Events;
(function (Events) {
    /* eslint-disable @typescript-eslint/naming-convention -- Used by web_tests. */
    Events["UISourceCodeAdded"] = "UISourceCodeAdded";
    Events["UISourceCodeRemoved"] = "UISourceCodeRemoved";
    Events["UISourceCodeRenamed"] = "UISourceCodeRenamed";
    Events["WorkingCopyChanged"] = "WorkingCopyChanged";
    Events["WorkingCopyCommitted"] = "WorkingCopyCommitted";
    Events["WorkingCopyCommittedByUser"] = "WorkingCopyCommittedByUser";
    Events["ProjectAdded"] = "ProjectAdded";
    Events["ProjectRemoved"] = "ProjectRemoved";
    /* eslint-enable @typescript-eslint/naming-convention */
})(Events || (Events = {}));
//# sourceMappingURL=WorkspaceImpl.js.map