// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Persistence from '../../models/persistence/persistence.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as UI from '../../ui/legacy/legacy.js';
const UIStrings = {
    /**
     *@description Default snippet name when a new snippet is created in the Sources panel
     *@example {1} PH1
     */
    scriptSnippet: 'Script snippet #{PH1}',
    /**
     *@description Text to show something is linked to another
     *@example {example.url} PH1
     */
    linkedTo: 'Linked to {PH1}',
};
const str_ = i18n.i18n.registerUIStrings('panels/snippets/ScriptSnippetFileSystem.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
function escapeSnippetName(name) {
    return Common.ParsedURL.ParsedURL.rawPathToEncodedPathString(name);
}
function unescapeSnippetName(name) {
    return Common.ParsedURL.ParsedURL.encodedPathToRawPathString(name);
}
export class SnippetFileSystem extends Persistence.PlatformFileSystem.PlatformFileSystem {
    lastSnippetIdentifierSetting;
    snippetsSetting;
    constructor() {
        super('snippet://', Persistence.PlatformFileSystem.PlatformFileSystemType.SNIPPETS, false);
        this.lastSnippetIdentifierSetting =
            Common.Settings.Settings.instance().createSetting('script-snippets-last-identifier', 0);
        this.snippetsSetting = Common.Settings.Settings.instance().createSetting('script-snippets', []);
    }
    initialFilePaths() {
        const savedSnippets = this.snippetsSetting.get();
        return savedSnippets.map(snippet => escapeSnippetName(snippet.name));
    }
    async createFile(_path, _name) {
        const nextId = this.lastSnippetIdentifierSetting.get() + 1;
        this.lastSnippetIdentifierSetting.set(nextId);
        const snippetName = i18nString(UIStrings.scriptSnippet, { PH1: nextId });
        const snippets = this.snippetsSetting.get();
        snippets.push({ name: snippetName, content: '' });
        this.snippetsSetting.set(snippets);
        return escapeSnippetName(snippetName);
    }
    async deleteFile(path) {
        const name = unescapeSnippetName(Common.ParsedURL.ParsedURL.substring(path, 1));
        const allSnippets = this.snippetsSetting.get();
        const snippets = allSnippets.filter(snippet => snippet.name !== name);
        if (allSnippets.length !== snippets.length) {
            this.snippetsSetting.set(snippets);
            return true;
        }
        return false;
    }
    async requestFileContent(path) {
        const name = unescapeSnippetName(Common.ParsedURL.ParsedURL.substring(path, 1));
        const snippets = this.snippetsSetting.get();
        const snippet = snippets.find(snippet => snippet.name === name);
        if (snippet) {
            return new TextUtils.ContentData.ContentData(snippet.content, /* isBase64 */ false, 'text/javascript');
        }
        return { error: `A snippet with name '${name}' was not found` };
    }
    async setFileContent(path, content, _isBase64) {
        const name = unescapeSnippetName(Common.ParsedURL.ParsedURL.substring(path, 1));
        const snippets = this.snippetsSetting.get();
        const snippet = snippets.find(snippet => snippet.name === name);
        if (snippet) {
            snippet.content = content;
            this.snippetsSetting.set(snippets);
            return true;
        }
        return false;
    }
    renameFile(path, newName, callback) {
        const name = unescapeSnippetName(Common.ParsedURL.ParsedURL.substring(path, 1));
        const snippets = this.snippetsSetting.get();
        const snippet = snippets.find(snippet => snippet.name === name);
        newName = Common.ParsedURL.ParsedURL.trim(newName);
        if (!snippet || newName.length === 0 || snippets.find(snippet => snippet.name === newName)) {
            callback(false);
            return;
        }
        snippet.name = newName;
        this.snippetsSetting.set(snippets);
        callback(true, newName);
    }
    async searchInPath(query, _progress) {
        const re = new RegExp(Platform.StringUtilities.escapeForRegExp(query), 'i');
        const allSnippets = this.snippetsSetting.get();
        const matchedSnippets = allSnippets.filter(snippet => snippet.content.match(re));
        return matchedSnippets.map(snippet => `snippet:///${escapeSnippetName(snippet.name)}`);
    }
    mimeFromPath(_path) {
        return 'text/javascript';
    }
    contentType(_path) {
        return Common.ResourceType.resourceTypes.Script;
    }
    tooltipForURL(url) {
        return i18nString(UIStrings.linkedTo, { PH1: unescapeSnippetName(Common.ParsedURL.ParsedURL.sliceUrlToEncodedPathString(url, this.path().length)) });
    }
    supportsAutomapping() {
        return true;
    }
}
export async function evaluateScriptSnippet(uiSourceCode) {
    if (!Common.ParsedURL.schemeIs(uiSourceCode.url(), 'snippet:')) {
        return;
    }
    const executionContext = UI.Context.Context.instance().flavor(SDK.RuntimeModel.ExecutionContext);
    if (!executionContext) {
        return;
    }
    const runtimeModel = executionContext.runtimeModel;
    const consoleModel = executionContext.target().model(SDK.ConsoleModel.ConsoleModel);
    await uiSourceCode.requestContentData();
    uiSourceCode.commitWorkingCopy();
    const expression = uiSourceCode.workingCopy();
    Common.Console.Console.instance().show();
    const url = uiSourceCode.url();
    const result = await executionContext.evaluate({
        expression: `${expression}\n//# sourceURL=${url}`,
        objectGroup: 'console',
        silent: false,
        includeCommandLineAPI: true,
        returnByValue: false,
        generatePreview: true,
        replMode: true,
    }, true, true);
    if ('exceptionDetails' in result && result.exceptionDetails) {
        consoleModel?.addMessage(SDK.ConsoleModel.ConsoleMessage.fromException(runtimeModel, result.exceptionDetails, /* messageType */ undefined, /* timestamp */ undefined, url));
        return;
    }
    if (!('object' in result) || !result.object) {
        return;
    }
    const scripts = executionContext.debuggerModel.scriptsForSourceURL(url);
    if (scripts.length < 1) {
        return;
    }
    const scriptId = scripts[scripts.length - 1].scriptId;
    const details = {
        type: SDK.ConsoleModel.FrontendMessageType.Result,
        url,
        parameters: [result.object],
        executionContextId: executionContext.id,
        scriptId,
    };
    consoleModel?.addMessage(new SDK.ConsoleModel.ConsoleMessage(runtimeModel, "javascript" /* Protocol.Log.LogEntrySource.Javascript */, "info" /* Protocol.Log.LogEntryLevel.Info */, '', details));
}
export function isSnippetsUISourceCode(uiSourceCode) {
    return Common.ParsedURL.schemeIs(uiSourceCode.url(), 'snippet:');
}
export function isSnippetsProject(project) {
    return project.type() === Workspace.Workspace.projectTypes.FileSystem &&
        Persistence.FileSystemWorkspaceBinding.FileSystemWorkspaceBinding.fileSystemType(project) ===
            Persistence.PlatformFileSystem.PlatformFileSystemType.SNIPPETS;
}
export function findSnippetsProject() {
    const workspaceProject = Workspace.Workspace.WorkspaceImpl.instance()
        .projectsForType(Workspace.Workspace.projectTypes.FileSystem)
        .find(project => Persistence.FileSystemWorkspaceBinding.FileSystemWorkspaceBinding.fileSystemType(project) ===
        'snippets');
    if (!workspaceProject) {
        throw new Error('Unable to find workspace project for the snippets file system');
    }
    return workspaceProject;
}
//# sourceMappingURL=ScriptSnippetFileSystem.js.map