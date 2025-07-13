var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/models/workspace/FileManager.js
var FileManager_exports = {};
__export(FileManager_exports, {
  FileManager: () => FileManager
});
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
var fileManagerInstance;
var FileManager = class _FileManager extends Common.ObjectWrapper.ObjectWrapper {
  #saveCallbacks = /* @__PURE__ */ new Map();
  constructor() {
    super();
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.SavedURL, this.savedURL, this);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.CanceledSaveURL, this.#canceledSavedURL, this);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.AppendedToURL, this.appendedToURL, this);
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!fileManagerInstance || forceNew) {
      fileManagerInstance = new _FileManager();
    }
    return fileManagerInstance;
  }
  /**
   * {@link FileManager.close | close} *must* be called, for the InspectorFrontendHostStub case, to complete the saving.
   */
  save(url, contentData, forceSaveAs) {
    const result = new Promise((resolve) => this.#saveCallbacks.set(url, resolve));
    const { isTextContent } = contentData;
    const content = isTextContent ? contentData.text : contentData.base64;
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.save(url, content, forceSaveAs, !isTextContent);
    return result;
  }
  /**
   * Used in web tests
   */
  savedURL(event) {
    const { url, fileSystemPath } = event.data;
    const callback = this.#saveCallbacks.get(url);
    this.#saveCallbacks.delete(url);
    if (callback) {
      callback({ fileSystemPath });
    }
  }
  #canceledSavedURL({ data: url }) {
    const callback = this.#saveCallbacks.get(url);
    this.#saveCallbacks.delete(url);
    if (callback) {
      callback(null);
    }
  }
  append(url, content) {
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.append(url, content);
  }
  close(url) {
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.close(url);
  }
  /**
   * Used in web tests
   */
  appendedToURL({ data: url }) {
    this.dispatchEventToListeners("AppendedToURL", url);
  }
};

// gen/front_end/models/workspace/SearchConfig.js
var SearchConfig_exports = {};
__export(SearchConfig_exports, {
  SearchConfig: () => SearchConfig
});
import * as Platform from "./../../core/platform/platform.js";
var SearchConfig = class _SearchConfig {
  #query;
  #ignoreCase;
  #isRegex;
  #queries;
  #fileRegexQueries;
  constructor(query, ignoreCase, isRegex) {
    this.#query = query;
    this.#ignoreCase = ignoreCase;
    this.#isRegex = isRegex;
    const { queries, fileRegexQueries } = _SearchConfig.#parse(query, ignoreCase, isRegex);
    this.#queries = queries;
    this.#fileRegexQueries = fileRegexQueries;
  }
  static fromPlainObject(object) {
    return new _SearchConfig(object.query, object.ignoreCase, object.isRegex);
  }
  filePathMatchesFileQuery(filePath) {
    return this.#fileRegexQueries.every(({ regex, shouldMatch }) => Boolean(filePath.match(regex)) === shouldMatch);
  }
  queries() {
    return this.#queries;
  }
  query() {
    return this.#query;
  }
  ignoreCase() {
    return this.#ignoreCase;
  }
  isRegex() {
    return this.#isRegex;
  }
  toPlainObject() {
    return { query: this.query(), ignoreCase: this.ignoreCase(), isRegex: this.isRegex() };
  }
  static #parse(query, ignoreCase, isRegex) {
    const quotedPattern = /"([^\\"]|\\.)+"/;
    const unquotedWordPattern = /(\s*(?!-?f(ile)?:)[^\\ ]|\\.)+/;
    const unquotedPattern = unquotedWordPattern.source + "(\\s+" + unquotedWordPattern.source + ")*";
    const pattern = [
      "(\\s*" + FilePatternRegex.source + "\\s*)",
      "(" + quotedPattern.source + ")",
      "(" + unquotedPattern + ")"
    ].join("|");
    const regexp = new RegExp(pattern, "g");
    const queryParts = query.match(regexp) || [];
    const queries = [];
    const fileRegexQueries = [];
    for (const queryPart of queryParts) {
      if (!queryPart) {
        continue;
      }
      const fileQuery = _SearchConfig.#parseFileQuery(queryPart);
      if (fileQuery) {
        const regex = new RegExp(fileQuery.text, ignoreCase ? "i" : "");
        fileRegexQueries.push({ regex, shouldMatch: fileQuery.shouldMatch });
      } else if (isRegex) {
        queries.push(queryPart);
      } else if (queryPart.startsWith('"') && queryPart.endsWith('"')) {
        queries.push(_SearchConfig.#parseQuotedQuery(queryPart));
      } else {
        queries.push(_SearchConfig.#parseUnquotedQuery(queryPart));
      }
    }
    return { queries, fileRegexQueries };
  }
  static #parseUnquotedQuery(query) {
    return query.replace(/\\(.)/g, "$1");
  }
  static #parseQuotedQuery(query) {
    return query.substring(1, query.length - 1).replace(/\\(.)/g, "$1");
  }
  static #parseFileQuery(query) {
    const match = query.match(FilePatternRegex);
    if (!match) {
      return null;
    }
    query = match[3];
    let result = "";
    for (let i = 0; i < query.length; ++i) {
      const char = query[i];
      if (char === "*") {
        result += ".*";
      } else if (char === "\\") {
        ++i;
        const nextChar = query[i];
        if (nextChar === " ") {
          result += " ";
        }
      } else {
        if (Platform.StringUtilities.regexSpecialCharacters().indexOf(query.charAt(i)) !== -1) {
          result += "\\";
        }
        result += query.charAt(i);
      }
    }
    const shouldMatch = !Boolean(match[1]);
    return { text: result, shouldMatch };
  }
};
var FilePatternRegex = /(-)?f(ile)?:((?:[^\\ ]|\\.)+)/;

// gen/front_end/models/workspace/UISourceCode.js
var UISourceCode_exports = {};
__export(UISourceCode_exports, {
  Events: () => Events2,
  Message: () => Message,
  UILocation: () => UILocation,
  UILocationRange: () => UILocationRange,
  UISourceCode: () => UISourceCode,
  UISourceCodeMetadata: () => UISourceCodeMetadata
});
import * as Common3 from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import * as TextUtils from "./../text_utils/text_utils.js";

// gen/front_end/models/workspace/WorkspaceImpl.js
var WorkspaceImpl_exports = {};
__export(WorkspaceImpl_exports, {
  Events: () => Events,
  ProjectStore: () => ProjectStore,
  WorkspaceImpl: () => WorkspaceImpl,
  projectTypes: () => projectTypes
});
import * as Common2 from "./../../core/common/common.js";
var projectTypes;
(function(projectTypes2) {
  projectTypes2["Debugger"] = "debugger";
  projectTypes2["Formatter"] = "formatter";
  projectTypes2["Network"] = "network";
  projectTypes2["FileSystem"] = "filesystem";
  projectTypes2["ConnectableFileSystem"] = "connectablefilesystem";
  projectTypes2["ContentScripts"] = "contentscripts";
  projectTypes2["Service"] = "service";
})(projectTypes || (projectTypes = {}));
var ProjectStore = class {
  #workspace;
  #id;
  #type;
  #displayName;
  #uiSourceCodes = /* @__PURE__ */ new Map();
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
    if (uiSourceCode === void 0) {
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
    const newPath = uiSourceCode.parentURL() ? Common2.ParsedURL.ParsedURL.urlFromParentUrlAndName(uiSourceCode.parentURL(), newName) : Common2.ParsedURL.ParsedURL.preEncodeSpecialCharactersInPath(newName);
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
};
var workspaceInstance;
var WorkspaceImpl = class _WorkspaceImpl extends Common2.ObjectWrapper.ObjectWrapper {
  #projects = /* @__PURE__ */ new Map();
  #hasResourceContentTrackingExtensions = false;
  constructor() {
    super();
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!workspaceInstance || forceNew) {
      workspaceInstance = new _WorkspaceImpl();
    }
    return workspaceInstance;
  }
  static removeInstance() {
    workspaceInstance = void 0;
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
    const projectId = Common2.ParsedURL.ParsedURL.rawPathToUrlString(root);
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
};
var Events;
(function(Events3) {
  Events3["UISourceCodeAdded"] = "UISourceCodeAdded";
  Events3["UISourceCodeRemoved"] = "UISourceCodeRemoved";
  Events3["UISourceCodeRenamed"] = "UISourceCodeRenamed";
  Events3["WorkingCopyChanged"] = "WorkingCopyChanged";
  Events3["WorkingCopyCommitted"] = "WorkingCopyCommitted";
  Events3["WorkingCopyCommittedByUser"] = "WorkingCopyCommittedByUser";
  Events3["ProjectAdded"] = "ProjectAdded";
  Events3["ProjectRemoved"] = "ProjectRemoved";
})(Events || (Events = {}));

// gen/front_end/models/workspace/UISourceCode.js
var UIStrings = {
  /**
   *@description Text for the index of something
   */
  index: "(index)",
  /**
   *@description Text in UISource Code of the DevTools local workspace
   */
  thisFileWasChangedExternally: "This file was changed externally. Would you like to reload it?"
};
var str_ = i18n.i18n.registerUIStrings("models/workspace/UISourceCode.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var UISourceCode = class extends Common3.ObjectWrapper.ObjectWrapper {
  #origin;
  #parentURL;
  #project;
  #url;
  #name;
  #contentType;
  #requestContentPromise = null;
  #decorations = /* @__PURE__ */ new Map();
  #hasCommits = false;
  #messages = null;
  #content = null;
  #forceLoadOnCheckContent = false;
  #checkingContent = false;
  #lastAcceptedContent = null;
  #workingCopy = null;
  #workingCopyGetter = null;
  #disableEdit = false;
  #contentEncoded;
  #isKnownThirdParty = false;
  #isUnconditionallyIgnoreListed = false;
  #containsAiChanges = false;
  constructor(project, url, contentType) {
    super();
    this.#project = project;
    this.#url = url;
    const parsedURL = Common3.ParsedURL.ParsedURL.fromString(url);
    if (parsedURL) {
      this.#origin = parsedURL.securityOrigin();
      this.#parentURL = Common3.ParsedURL.ParsedURL.concatenate(this.#origin, parsedURL.folderPathComponents);
      if (parsedURL.queryParams && !(parsedURL.lastPathComponent && contentType.isFromSourceMap())) {
        this.#name = parsedURL.lastPathComponent + "?" + parsedURL.queryParams;
      } else {
        try {
          this.#name = decodeURIComponent(parsedURL.lastPathComponent);
        } catch {
          this.#name = parsedURL.lastPathComponent;
        }
      }
    } else {
      this.#origin = Platform2.DevToolsPath.EmptyUrlString;
      this.#parentURL = Platform2.DevToolsPath.EmptyUrlString;
      this.#name = url;
    }
    this.#contentType = contentType;
  }
  requestMetadata() {
    return this.#project.requestMetadata(this);
  }
  name() {
    return this.#name;
  }
  mimeType() {
    return this.#project.mimeType(this);
  }
  url() {
    return this.#url;
  }
  // Identifier used for deduplicating scripts that are considered by the
  // DevTools UI to be the same script. For now this is just the url but this
  // is likely to change in the future.
  canonicalScriptId() {
    return `${this.#contentType.name()},${this.#url}`;
  }
  parentURL() {
    return this.#parentURL;
  }
  origin() {
    return this.#origin;
  }
  fullDisplayName() {
    return this.#project.fullDisplayName(this);
  }
  displayName(skipTrim) {
    if (!this.#name) {
      return i18nString(UIStrings.index);
    }
    const name = this.#name;
    return skipTrim ? name : Platform2.StringUtilities.trimEndWithMaxLength(name, 100);
  }
  canRename() {
    return this.#project.canRename();
  }
  rename(newName) {
    const { resolve, promise } = Promise.withResolvers();
    this.#project.rename(this, newName, innerCallback.bind(this));
    return promise;
    function innerCallback(success, newName2, newURL, newContentType) {
      if (success) {
        this.#updateName(newName2, newURL, newContentType);
      }
      resolve(success);
    }
  }
  remove() {
    this.#project.deleteFile(this);
  }
  #updateName(name, url, contentType) {
    const oldURL = this.#url;
    this.#name = name;
    if (url) {
      this.#url = url;
    } else {
      this.#url = Common3.ParsedURL.ParsedURL.relativePathToUrlString(name, oldURL);
    }
    if (contentType) {
      this.#contentType = contentType;
    }
    this.dispatchEventToListeners(Events2.TitleChanged, this);
    this.project().workspace().dispatchEventToListeners(Events.UISourceCodeRenamed, { oldURL, uiSourceCode: this });
  }
  contentURL() {
    return this.url();
  }
  contentType() {
    return this.#contentType;
  }
  project() {
    return this.#project;
  }
  requestContentData({ cachedWasmOnly } = {}) {
    if (this.#requestContentPromise) {
      return this.#requestContentPromise;
    }
    if (this.#content) {
      return Promise.resolve(this.#content);
    }
    if (cachedWasmOnly && this.mimeType() === "application/wasm") {
      return Promise.resolve(new TextUtils.WasmDisassembly.WasmDisassembly([], [], []));
    }
    this.#requestContentPromise = this.#requestContent();
    return this.#requestContentPromise;
  }
  async #requestContent() {
    if (this.#content) {
      throw new Error("Called UISourceCode#requestContentImpl even though content is available for " + this.#url);
    }
    try {
      this.#content = await this.#project.requestFileContent(this);
    } catch (err) {
      this.#content = { error: err ? String(err) : "" };
    }
    return this.#content;
  }
  #decodeContent(content) {
    if (!content) {
      return null;
    }
    return content.isEncoded && content.content ? window.atob(content.content) : content.content;
  }
  /** Only used to compare whether content changed */
  #unsafeDecodeContentData(content) {
    if (!content || TextUtils.ContentData.ContentData.isError(content)) {
      return null;
    }
    return content.createdFromBase64 ? window.atob(content.base64) : content.text;
  }
  async checkContentUpdated() {
    if (!this.#content && !this.#forceLoadOnCheckContent) {
      return;
    }
    if (!this.#project.canSetFileContent() || this.#checkingContent) {
      return;
    }
    this.#checkingContent = true;
    const updatedContent = TextUtils.ContentData.ContentData.asDeferredContent(await this.#project.requestFileContent(this));
    if ("error" in updatedContent) {
      return;
    }
    this.#checkingContent = false;
    if (updatedContent.content === null) {
      const workingCopy = this.workingCopy();
      this.#contentCommitted("", false);
      this.setWorkingCopy(workingCopy);
      return;
    }
    if (this.#lastAcceptedContent === updatedContent.content) {
      return;
    }
    if (this.#unsafeDecodeContentData(this.#content) === this.#decodeContent(updatedContent)) {
      this.#lastAcceptedContent = null;
      return;
    }
    if (!this.isDirty() || this.#workingCopy === updatedContent.content) {
      this.#contentCommitted(updatedContent.content, false);
      return;
    }
    await Common3.Revealer.reveal(this);
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    const shouldUpdate = window.confirm(i18nString(UIStrings.thisFileWasChangedExternally));
    if (shouldUpdate) {
      this.#contentCommitted(updatedContent.content, false);
    } else {
      this.#lastAcceptedContent = updatedContent.content;
    }
  }
  forceLoadOnCheckContent() {
    this.#forceLoadOnCheckContent = true;
  }
  #commitContent(content) {
    if (this.#project.canSetFileContent()) {
      void this.#project.setFileContent(this, content, false);
    }
    this.#contentCommitted(content, true);
  }
  #contentCommitted(content, committedByUser) {
    this.#lastAcceptedContent = null;
    this.#content = new TextUtils.ContentData.ContentData(content, Boolean(this.#contentEncoded), this.mimeType());
    this.#requestContentPromise = null;
    this.#hasCommits = true;
    this.#resetWorkingCopy();
    const data = { uiSourceCode: this, content, encoded: this.#contentEncoded };
    this.dispatchEventToListeners(Events2.WorkingCopyCommitted, data);
    this.#project.workspace().dispatchEventToListeners(Events.WorkingCopyCommitted, data);
    if (committedByUser) {
      this.#project.workspace().dispatchEventToListeners(Events.WorkingCopyCommittedByUser, data);
    }
  }
  addRevision(content) {
    this.#commitContent(content);
  }
  hasCommits() {
    return this.#hasCommits;
  }
  workingCopy() {
    return this.workingCopyContent().content || "";
  }
  workingCopyContent() {
    return this.workingCopyContentData().asDeferedContent();
  }
  workingCopyContentData() {
    if (this.#workingCopyGetter) {
      this.#workingCopy = this.#workingCopyGetter();
      this.#workingCopyGetter = null;
    }
    const contentData = this.#content ? TextUtils.ContentData.ContentData.contentDataOrEmpty(this.#content) : TextUtils.ContentData.EMPTY_TEXT_CONTENT_DATA;
    if (this.#workingCopy !== null) {
      return new TextUtils.ContentData.ContentData(
        this.#workingCopy,
        /* isBase64 */
        false,
        contentData.mimeType
      );
    }
    return contentData;
  }
  resetWorkingCopy() {
    this.#resetWorkingCopy();
    this.#workingCopyChanged();
  }
  #resetWorkingCopy() {
    this.#workingCopy = null;
    this.#workingCopyGetter = null;
    this.setContainsAiChanges(false);
  }
  setWorkingCopy(newWorkingCopy) {
    this.#workingCopy = newWorkingCopy;
    this.#workingCopyGetter = null;
    this.#workingCopyChanged();
  }
  setContainsAiChanges(containsAiChanges) {
    this.#containsAiChanges = containsAiChanges;
  }
  containsAiChanges() {
    return this.#containsAiChanges;
  }
  setContent(content, isBase64) {
    this.#contentEncoded = isBase64;
    if (this.#project.canSetFileContent()) {
      void this.#project.setFileContent(this, content, isBase64);
    }
    this.#contentCommitted(content, true);
  }
  setWorkingCopyGetter(workingCopyGetter) {
    this.#workingCopyGetter = workingCopyGetter;
    this.#workingCopyChanged();
  }
  #workingCopyChanged() {
    this.#removeAllMessages();
    this.dispatchEventToListeners(Events2.WorkingCopyChanged, this);
    this.#project.workspace().dispatchEventToListeners(Events.WorkingCopyChanged, { uiSourceCode: this });
  }
  removeWorkingCopyGetter() {
    if (!this.#workingCopyGetter) {
      return;
    }
    this.#workingCopy = this.#workingCopyGetter();
    this.#workingCopyGetter = null;
  }
  commitWorkingCopy() {
    if (this.isDirty()) {
      this.#commitContent(this.workingCopy());
    }
  }
  isDirty() {
    return this.#workingCopy !== null || this.#workingCopyGetter !== null;
  }
  isKnownThirdParty() {
    return this.#isKnownThirdParty;
  }
  markKnownThirdParty() {
    this.#isKnownThirdParty = true;
  }
  /**
   * {@link markAsUnconditionallyIgnoreListed}
   */
  isUnconditionallyIgnoreListed() {
    return this.#isUnconditionallyIgnoreListed;
  }
  isFetchXHR() {
    return [Common3.ResourceType.resourceTypes.XHR, Common3.ResourceType.resourceTypes.Fetch].includes(this.contentType());
  }
  /**
   * Unconditionally ignore list this UISourcecode, ignoring any user
   * setting. We use this to mark breakpoint/logpoint condition scripts for now.
   */
  markAsUnconditionallyIgnoreListed() {
    this.#isUnconditionallyIgnoreListed = true;
  }
  extension() {
    return Common3.ParsedURL.ParsedURL.extractExtension(this.#name);
  }
  content() {
    if (!this.#content || "error" in this.#content) {
      return "";
    }
    return this.#content.text;
  }
  loadError() {
    return this.#content && "error" in this.#content && this.#content.error || null;
  }
  searchInContent(query, caseSensitive, isRegex) {
    if (!this.#content || "error" in this.#content) {
      return this.#project.searchInFileContent(this, query, caseSensitive, isRegex);
    }
    return Promise.resolve(TextUtils.TextUtils.performSearchInContentData(this.#content, query, caseSensitive, isRegex));
  }
  contentLoaded() {
    return Boolean(this.#content);
  }
  uiLocation(lineNumber, columnNumber) {
    return new UILocation(this, lineNumber, columnNumber);
  }
  messages() {
    return this.#messages ? new Set(this.#messages) : /* @__PURE__ */ new Set();
  }
  addLineMessage(level, text, lineNumber, columnNumber, clickHandler) {
    const range = TextUtils.TextRange.TextRange.createFromLocation(lineNumber, columnNumber || 0);
    const message = new Message(level, text, clickHandler, range);
    this.addMessage(message);
    return message;
  }
  addMessage(message) {
    if (!this.#messages) {
      this.#messages = /* @__PURE__ */ new Set();
    }
    this.#messages.add(message);
    this.dispatchEventToListeners(Events2.MessageAdded, message);
  }
  removeMessage(message) {
    if (this.#messages?.delete(message)) {
      this.dispatchEventToListeners(Events2.MessageRemoved, message);
    }
  }
  #removeAllMessages() {
    if (!this.#messages) {
      return;
    }
    for (const message of this.#messages) {
      this.dispatchEventToListeners(Events2.MessageRemoved, message);
    }
    this.#messages = null;
  }
  setDecorationData(type, data) {
    if (data !== this.#decorations.get(type)) {
      this.#decorations.set(type, data);
      this.dispatchEventToListeners(Events2.DecorationChanged, type);
    }
  }
  getDecorationData(type) {
    return this.#decorations.get(type);
  }
  disableEdit() {
    this.#disableEdit = true;
  }
  editDisabled() {
    return this.#disableEdit;
  }
};
var Events2;
(function(Events3) {
  Events3["WorkingCopyChanged"] = "WorkingCopyChanged";
  Events3["WorkingCopyCommitted"] = "WorkingCopyCommitted";
  Events3["TitleChanged"] = "TitleChanged";
  Events3["MessageAdded"] = "MessageAdded";
  Events3["MessageRemoved"] = "MessageRemoved";
  Events3["DecorationChanged"] = "DecorationChanged";
})(Events2 || (Events2 = {}));
var UILocation = class {
  uiSourceCode;
  lineNumber;
  columnNumber;
  constructor(uiSourceCode, lineNumber, columnNumber) {
    this.uiSourceCode = uiSourceCode;
    this.lineNumber = lineNumber;
    this.columnNumber = columnNumber;
  }
  linkText(skipTrim = false, showColumnNumber = false) {
    const displayName = this.uiSourceCode.displayName(skipTrim);
    const lineAndColumnText = this.lineAndColumnText(showColumnNumber);
    let text = lineAndColumnText ? displayName + ":" + lineAndColumnText : displayName;
    if (this.uiSourceCode.isDirty()) {
      text = "*" + text;
    }
    return text;
  }
  lineAndColumnText(showColumnNumber = false) {
    let lineAndColumnText;
    if (this.uiSourceCode.mimeType() === "application/wasm") {
      if (typeof this.columnNumber === "number") {
        lineAndColumnText = `0x${this.columnNumber.toString(16)}`;
      }
    } else {
      lineAndColumnText = `${this.lineNumber + 1}`;
      if (showColumnNumber && typeof this.columnNumber === "number") {
        lineAndColumnText += ":" + (this.columnNumber + 1);
      }
    }
    return lineAndColumnText;
  }
  id() {
    if (typeof this.columnNumber === "number") {
      return this.uiSourceCode.project().id() + ":" + this.uiSourceCode.url() + ":" + this.lineNumber + ":" + this.columnNumber;
    }
    return this.lineId();
  }
  lineId() {
    return this.uiSourceCode.project().id() + ":" + this.uiSourceCode.url() + ":" + this.lineNumber;
  }
  static comparator(location1, location2) {
    return location1.compareTo(location2);
  }
  compareTo(other) {
    if (this.uiSourceCode.url() !== other.uiSourceCode.url()) {
      return this.uiSourceCode.url() > other.uiSourceCode.url() ? 1 : -1;
    }
    if (this.lineNumber !== other.lineNumber) {
      return this.lineNumber - other.lineNumber;
    }
    if (this.columnNumber === other.columnNumber) {
      return 0;
    }
    if (typeof this.columnNumber !== "number") {
      return -1;
    }
    if (typeof other.columnNumber !== "number") {
      return 1;
    }
    return this.columnNumber - other.columnNumber;
  }
};
var UILocationRange = class {
  uiSourceCode;
  range;
  constructor(uiSourceCode, range) {
    this.uiSourceCode = uiSourceCode;
    this.range = range;
  }
};
var Message = class {
  #level;
  #text;
  range;
  #clickHandler;
  constructor(level, text, clickHandler, range) {
    this.#level = level;
    this.#text = text;
    this.range = range ?? new TextUtils.TextRange.TextRange(0, 0, 0, 0);
    this.#clickHandler = clickHandler;
  }
  level() {
    return this.#level;
  }
  text() {
    return this.#text;
  }
  clickHandler() {
    return this.#clickHandler;
  }
  lineNumber() {
    return this.range.startLine;
  }
  columnNumber() {
    return this.range.startColumn;
  }
  isEqual(another) {
    return this.text() === another.text() && this.level() === another.level() && this.range.equal(another.range);
  }
};
var UISourceCodeMetadata = class {
  modificationTime;
  contentSize;
  constructor(modificationTime, contentSize) {
    this.modificationTime = modificationTime;
    this.contentSize = contentSize;
  }
};
export {
  FileManager_exports as FileManager,
  SearchConfig_exports as SearchConfig,
  UISourceCode_exports as UISourceCode,
  WorkspaceImpl_exports as Workspace
};
//# sourceMappingURL=workspace.js.map
