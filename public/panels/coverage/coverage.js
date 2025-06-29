var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/coverage/CoverageModel.js
var CoverageModel_exports = {};
__export(CoverageModel_exports, {
  CoverageInfo: () => CoverageInfo,
  CoverageModel: () => CoverageModel,
  Events: () => Events,
  SourceURLCoverageInfo: () => SourceURLCoverageInfo,
  URLCoverageInfo: () => URLCoverageInfo,
  mergeSegments: () => mergeSegments
});
import * as Common from "./../../core/common/common.js";
import * as Platform from "./../../core/platform/platform.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as TextUtils from "./../../models/text_utils/text_utils.js";
import * as Workspace from "./../../models/workspace/workspace.js";
var Events;
(function(Events2) {
  Events2["CoverageUpdated"] = "CoverageUpdated";
  Events2["CoverageReset"] = "CoverageReset";
  Events2["SourceMapResolved"] = "SourceMapResolved";
})(Events || (Events = {}));
var COVERAGE_POLLING_PERIOD_MS = 200;
var RESOLVE_SOURCEMAP_TIMEOUT = 500;
var CoverageModel = class _CoverageModel extends SDK.SDKModel.SDKModel {
  cpuProfilerModel;
  cssModel;
  debuggerModel;
  coverageByURL;
  coverageByContentProvider;
  coverageUpdateTimes;
  suspensionState;
  pollTimer;
  currentPollPromise;
  shouldResumePollingOnResume;
  jsBacklog;
  cssBacklog;
  performanceTraceRecording;
  sourceMapManager;
  willResolveSourceMaps;
  processSourceMapBacklog;
  constructor(target) {
    super(target);
    this.cpuProfilerModel = target.model(SDK.CPUProfilerModel.CPUProfilerModel);
    this.cssModel = target.model(SDK.CSSModel.CSSModel);
    this.debuggerModel = target.model(SDK.DebuggerModel.DebuggerModel);
    this.sourceMapManager = this.debuggerModel?.sourceMapManager() || null;
    this.sourceMapManager?.addEventListener(SDK.SourceMapManager.Events.SourceMapAttached, this.sourceMapAttached, this);
    this.coverageByURL = /* @__PURE__ */ new Map();
    this.coverageByContentProvider = /* @__PURE__ */ new Map();
    this.coverageUpdateTimes = /* @__PURE__ */ new Set();
    this.suspensionState = "Active";
    this.pollTimer = null;
    this.currentPollPromise = null;
    this.shouldResumePollingOnResume = false;
    this.jsBacklog = [];
    this.cssBacklog = [];
    this.performanceTraceRecording = false;
    this.willResolveSourceMaps = false;
    this.processSourceMapBacklog = [];
  }
  async start(jsCoveragePerBlock) {
    if (this.suspensionState !== "Active") {
      throw new Error("Cannot start CoverageModel while it is not active.");
    }
    const promises = [];
    if (this.cssModel) {
      this.clearCSS();
      this.cssModel.addEventListener(SDK.CSSModel.Events.StyleSheetAdded, this.handleStyleSheetAdded, this);
      promises.push(this.cssModel.startCoverage());
    }
    if (this.cpuProfilerModel) {
      promises.push(this.cpuProfilerModel.startPreciseCoverage(jsCoveragePerBlock, this.preciseCoverageDeltaUpdate.bind(this)));
    }
    await Promise.all(promises);
    return Boolean(this.cssModel || this.cpuProfilerModel);
  }
  async sourceMapAttached(event) {
    const script = event.data.client;
    const sourceMap = event.data.sourceMap;
    this.processSourceMapBacklog.push({ script, sourceMap });
    if (!this.willResolveSourceMaps) {
      this.willResolveSourceMaps = true;
      setTimeout(this.resolveSourceMapsAndUpdate.bind(this), RESOLVE_SOURCEMAP_TIMEOUT);
    }
  }
  async resolveSourceMapsAndUpdate() {
    this.willResolveSourceMaps = false;
    const currentBacklog = this.processSourceMapBacklog;
    this.processSourceMapBacklog = [];
    await Promise.all(currentBacklog.map(({ script, sourceMap }) => this.resolveSourceMap(script, sourceMap)));
    this.dispatchEventToListeners(Events.SourceMapResolved);
  }
  async resolveSourceMap(script, sourceMap) {
    const url = script.sourceURL;
    const urlCoverage = this.coverageByURL.get(url);
    if (!urlCoverage) {
      return;
    }
    if (urlCoverage.sourcesURLCoverageInfo.size === 0) {
      const generatedContent = TextUtils.ContentData.ContentData.contentDataOrEmpty(await script.requestContentData());
      const [sourceSizeMap, sourceSegments] = this.calculateSizeForSources(sourceMap, generatedContent.textObj, script.contentLength);
      urlCoverage.setSourceSegments(sourceSegments);
      for (const sourceURL of sourceMap.sourceURLs()) {
        this.addCoverageForSource(sourceURL, sourceSizeMap.get(sourceURL) || 0, urlCoverage.type(), urlCoverage);
      }
    }
  }
  async preciseCoverageDeltaUpdate(timestamp, coverageData) {
    this.coverageUpdateTimes.add(timestamp);
    const result = await this.backlogOrProcessJSCoverage(coverageData, timestamp);
    if (result.length) {
      this.dispatchEventToListeners(Events.CoverageUpdated, result);
    }
  }
  async stop() {
    await this.stopPolling();
    const promises = [];
    if (this.cpuProfilerModel) {
      promises.push(this.cpuProfilerModel.stopPreciseCoverage());
    }
    if (this.cssModel) {
      promises.push(this.cssModel.stopCoverage());
      this.cssModel.removeEventListener(SDK.CSSModel.Events.StyleSheetAdded, this.handleStyleSheetAdded, this);
    }
    await Promise.all(promises);
  }
  reset() {
    this.coverageByURL = /* @__PURE__ */ new Map();
    this.coverageByContentProvider = /* @__PURE__ */ new Map();
    this.coverageUpdateTimes = /* @__PURE__ */ new Set();
    this.dispatchEventToListeners(Events.CoverageReset);
  }
  async startPolling() {
    if (this.currentPollPromise || this.suspensionState !== "Active") {
      return;
    }
    await this.pollLoop();
  }
  async pollLoop() {
    this.clearTimer();
    this.currentPollPromise = this.pollAndCallback();
    await this.currentPollPromise;
    if (this.suspensionState === "Active" || this.performanceTraceRecording) {
      this.pollTimer = window.setTimeout(() => this.pollLoop(), COVERAGE_POLLING_PERIOD_MS);
    }
  }
  async stopPolling() {
    this.clearTimer();
    await this.currentPollPromise;
    this.currentPollPromise = null;
    await this.pollAndCallback();
  }
  async pollAndCallback() {
    if (this.suspensionState === "Suspended" && !this.performanceTraceRecording) {
      return;
    }
    const updates = await this.takeAllCoverage();
    console.assert(this.suspensionState !== "Suspended" || Boolean(this.performanceTraceRecording), "CoverageModel was suspended while polling.");
    if (updates.length) {
      this.dispatchEventToListeners(Events.CoverageUpdated, updates);
    }
  }
  clearTimer() {
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
  }
  /**
   * Stops polling as preparation for suspension. This function is idempotent
   * due because it changes the state to suspending.
   */
  async preSuspendModel(reason) {
    if (this.suspensionState !== "Active") {
      return;
    }
    this.suspensionState = "Suspending";
    if (reason === "performance-timeline") {
      this.performanceTraceRecording = true;
      return;
    }
    if (this.currentPollPromise) {
      await this.stopPolling();
      this.shouldResumePollingOnResume = true;
    }
  }
  async suspendModel(_reason) {
    this.suspensionState = "Suspended";
  }
  async resumeModel() {
  }
  /**
   * Restarts polling after suspension. Note that the function is idempotent
   * because starting polling is idempotent.
   */
  async postResumeModel() {
    this.suspensionState = "Active";
    this.performanceTraceRecording = false;
    if (this.shouldResumePollingOnResume) {
      this.shouldResumePollingOnResume = false;
      await this.startPolling();
    }
  }
  entries() {
    return Array.from(this.coverageByURL.values());
  }
  getCoverageForUrl(url) {
    return this.coverageByURL.get(url) || null;
  }
  usageForRange(contentProvider, startOffset, endOffset) {
    const coverageInfo = this.coverageByContentProvider.get(contentProvider);
    return coverageInfo?.usageForRange(startOffset, endOffset);
  }
  clearCSS() {
    for (const entry of this.coverageByContentProvider.values()) {
      if (entry.type() !== 1) {
        continue;
      }
      const contentProvider = entry.getContentProvider();
      this.coverageByContentProvider.delete(contentProvider);
      const urlEntry = this.coverageByURL.get(entry.url());
      if (!urlEntry) {
        continue;
      }
      const key = `${contentProvider.startLine}:${contentProvider.startColumn}`;
      urlEntry.removeCoverageEntry(key, entry);
      if (urlEntry.numberOfEntries() === 0) {
        this.coverageByURL.delete(entry.url());
      }
    }
    if (this.cssModel) {
      for (const styleSheetHeader of this.cssModel.getAllStyleSheetHeaders()) {
        this.addStyleSheetToCSSCoverage(styleSheetHeader);
      }
    }
  }
  async takeAllCoverage() {
    const [updatesCSS, updatesJS] = await Promise.all([this.takeCSSCoverage(), this.takeJSCoverage()]);
    return [...updatesCSS, ...updatesJS];
  }
  async takeJSCoverage() {
    if (!this.cpuProfilerModel) {
      return [];
    }
    const { coverage, timestamp } = await this.cpuProfilerModel.takePreciseCoverage();
    this.coverageUpdateTimes.add(timestamp);
    return await this.backlogOrProcessJSCoverage(coverage, timestamp);
  }
  async backlogOrProcessJSCoverage(freshRawCoverageData, freshTimestamp) {
    if (freshRawCoverageData.length > 0) {
      this.jsBacklog.push({ rawCoverageData: freshRawCoverageData, stamp: freshTimestamp });
    }
    if (this.suspensionState !== "Active") {
      return [];
    }
    const ascendingByTimestamp = (x, y) => x.stamp - y.stamp;
    const results = [];
    for (const { rawCoverageData, stamp } of this.jsBacklog.sort(ascendingByTimestamp)) {
      results.push(await this.processJSCoverage(rawCoverageData, stamp));
    }
    this.jsBacklog = [];
    return results.flat();
  }
  async processJSBacklog() {
    void this.backlogOrProcessJSCoverage([], 0);
  }
  async processJSCoverage(scriptsCoverage, stamp) {
    if (!this.debuggerModel) {
      return [];
    }
    const updatedEntries = [];
    for (const entry of scriptsCoverage) {
      const script = this.debuggerModel.scriptForId(entry.scriptId);
      if (!script) {
        continue;
      }
      const ranges = [];
      let type = 2;
      for (const func of entry.functions) {
        if (func.isBlockCoverage === false && !(func.ranges.length === 1 && !func.ranges[0].count)) {
          type |= 4;
        }
        for (const range of func.ranges) {
          ranges.push(range);
        }
      }
      const subentry = await this.addCoverage(script, script.contentLength, script.lineOffset, script.columnOffset, ranges, type, stamp);
      if (subentry) {
        updatedEntries.push(...subentry);
      }
    }
    return updatedEntries;
  }
  handleStyleSheetAdded(event) {
    this.addStyleSheetToCSSCoverage(event.data);
  }
  async takeCSSCoverage() {
    if (!this.cssModel || this.suspensionState !== "Active") {
      return [];
    }
    const { coverage, timestamp } = await this.cssModel.takeCoverageDelta();
    this.coverageUpdateTimes.add(timestamp);
    return await this.backlogOrProcessCSSCoverage(coverage, timestamp);
  }
  async backlogOrProcessCSSCoverage(freshRawCoverageData, freshTimestamp) {
    if (freshRawCoverageData.length > 0) {
      this.cssBacklog.push({ rawCoverageData: freshRawCoverageData, stamp: freshTimestamp });
    }
    if (this.suspensionState !== "Active") {
      return [];
    }
    const ascendingByTimestamp = (x, y) => x.stamp - y.stamp;
    const results = [];
    for (const { rawCoverageData, stamp } of this.cssBacklog.sort(ascendingByTimestamp)) {
      results.push(await this.processCSSCoverage(rawCoverageData, stamp));
    }
    this.cssBacklog = [];
    return results.flat();
  }
  async processCSSCoverage(ruleUsageList, stamp) {
    if (!this.cssModel) {
      return [];
    }
    const updatedEntries = [];
    const rulesByStyleSheet = /* @__PURE__ */ new Map();
    for (const rule of ruleUsageList) {
      const styleSheetHeader = this.cssModel.styleSheetHeaderForId(rule.styleSheetId);
      if (!styleSheetHeader) {
        continue;
      }
      let ranges = rulesByStyleSheet.get(styleSheetHeader);
      if (!ranges) {
        ranges = [];
        rulesByStyleSheet.set(styleSheetHeader, ranges);
      }
      ranges.push({ startOffset: rule.startOffset, endOffset: rule.endOffset, count: Number(rule.used) });
    }
    for (const entry of rulesByStyleSheet) {
      const styleSheetHeader = entry[0];
      const ranges = entry[1];
      const subentry = await this.addCoverage(styleSheetHeader, styleSheetHeader.contentLength, styleSheetHeader.startLine, styleSheetHeader.startColumn, ranges, 1, stamp);
      if (subentry) {
        updatedEntries.push(...subentry);
      }
    }
    return updatedEntries;
  }
  static convertToDisjointSegments(ranges, stamp) {
    ranges.sort((a, b) => a.startOffset - b.startOffset);
    const result = [];
    const stack = [];
    for (const entry of ranges) {
      let top = stack[stack.length - 1];
      while (top && top.endOffset <= entry.startOffset) {
        append(top.endOffset, top.count);
        stack.pop();
        top = stack[stack.length - 1];
      }
      append(entry.startOffset, top ? top.count : 0);
      stack.push(entry);
    }
    for (let top = stack.pop(); top; top = stack.pop()) {
      append(top.endOffset, top.count);
    }
    function append(end, count) {
      const last = result[result.length - 1];
      if (last) {
        if (last.end === end) {
          return;
        }
        if (last.count === count) {
          last.end = end;
          return;
        }
      }
      result.push({ end, count, stamp });
    }
    return result;
  }
  addStyleSheetToCSSCoverage(styleSheetHeader) {
    void this.addCoverage(styleSheetHeader, styleSheetHeader.contentLength, styleSheetHeader.startLine, styleSheetHeader.startColumn, [], 1, Date.now());
  }
  calculateSizeForSources(sourceMap, text, contentLength) {
    const sourceSizeMap = /* @__PURE__ */ new Map();
    const sourceSegments = [];
    const calculateSize = function(startLine, startCol, endLine, endCol) {
      if (startLine === endLine) {
        return endCol - startCol;
      }
      if (text) {
        const startOffset = text.offsetFromPosition(startLine, startCol);
        const endOffset = text.offsetFromPosition(endLine, endCol);
        return endOffset - startOffset;
      }
      return endCol;
    };
    const mappings = sourceMap.mappings();
    if (mappings.length === 0) {
      return [sourceSizeMap, sourceSegments];
    }
    let lastEntry = mappings[0];
    let totalSegmentSize = 0;
    if (text) {
      totalSegmentSize += text.offsetFromPosition(lastEntry.lineNumber, lastEntry.columnNumber);
    } else {
      totalSegmentSize += calculateSize(0, 0, lastEntry.lineNumber, lastEntry.columnNumber);
    }
    sourceSegments.push({ end: totalSegmentSize, sourceUrl: "" });
    for (let i = 0; i < mappings.length; i++) {
      const curEntry = mappings[i];
      const entryRange = sourceMap.findEntryRanges(curEntry.lineNumber, curEntry.columnNumber);
      if (entryRange) {
        const range = entryRange.range;
        const sourceURL = entryRange.sourceURL;
        const oldSize = sourceSizeMap.get(sourceURL) || 0;
        let size = 0;
        if (i === mappings.length - 1) {
          const startOffset = text.offsetFromPosition(range.startLine, range.startColumn);
          size = contentLength - startOffset;
        } else {
          size = calculateSize(range.startLine, range.startColumn, range.endLine, range.endColumn);
        }
        sourceSizeMap.set(sourceURL, oldSize + size);
      }
      const segmentSize = calculateSize(lastEntry.lineNumber, lastEntry.columnNumber, curEntry.lineNumber, curEntry.columnNumber);
      totalSegmentSize += segmentSize;
      if (curEntry.sourceURL !== lastEntry.sourceURL) {
        if (text) {
          const endOffsetForLastEntry = text.offsetFromPosition(curEntry.lineNumber, curEntry.columnNumber);
          sourceSegments.push({ end: endOffsetForLastEntry, sourceUrl: lastEntry.sourceURL || "" });
        } else {
          sourceSegments.push({ end: totalSegmentSize, sourceUrl: lastEntry.sourceURL || "" });
        }
      }
      lastEntry = curEntry;
      if (i === mappings.length - 1) {
        sourceSegments.push({ end: contentLength, sourceUrl: curEntry.sourceURL || "" });
      }
    }
    return [sourceSizeMap, sourceSegments];
  }
  async addCoverage(contentProvider, contentLength, startLine, startColumn, ranges, type, stamp) {
    const coverageInfoArray = [];
    const url = contentProvider.contentURL();
    if (!url) {
      return null;
    }
    let urlCoverage = this.coverageByURL.get(url);
    let isNewUrlCoverage = false;
    if (!urlCoverage) {
      isNewUrlCoverage = true;
      urlCoverage = new URLCoverageInfo(url);
      this.coverageByURL.set(url, urlCoverage);
      const sourceMap = await this.sourceMapManager?.sourceMapForClientPromise(contentProvider);
      if (sourceMap) {
        const generatedContent = TextUtils.ContentData.ContentData.contentDataOrEmpty(await contentProvider.requestContentData());
        const [sourceSizeMap, sourceSegments] = this.calculateSizeForSources(sourceMap, generatedContent.textObj, contentLength);
        urlCoverage.setSourceSegments(sourceSegments);
        for (const sourceURL of sourceMap.sourceURLs()) {
          const subentry = this.addCoverageForSource(sourceURL, sourceSizeMap.get(sourceURL) || 0, type, urlCoverage);
          if (subentry) {
            coverageInfoArray.push(subentry);
          }
        }
      }
    }
    const coverageInfo = urlCoverage.ensureEntry(contentProvider, contentLength, startLine, startColumn, type);
    this.coverageByContentProvider.set(contentProvider, coverageInfo);
    const segments = _CoverageModel.convertToDisjointSegments(ranges, stamp);
    const last = segments[segments.length - 1];
    if (last && last.end < contentLength) {
      segments.push({ end: contentLength, stamp, count: 0 });
    }
    const usedSizeDelta = coverageInfo.mergeCoverage(segments);
    if (!isNewUrlCoverage && usedSizeDelta === 0) {
      return null;
    }
    urlCoverage.addToSizes(usedSizeDelta, 0);
    for (const [sourceUrl, sizeDelta] of coverageInfo.sourceDeltaMap) {
      const sourceURLCoverageInfo = urlCoverage.sourcesURLCoverageInfo.get(sourceUrl);
      if (sourceURLCoverageInfo) {
        sourceURLCoverageInfo.addToSizes(sizeDelta, 0);
        sourceURLCoverageInfo.lastSourceUsedRange = coverageInfo.sourceUsedRangeMap.get(sourceUrl) || [];
      }
    }
    coverageInfoArray.push(coverageInfo);
    return coverageInfoArray;
  }
  addCoverageForSource(url, size, type, generatedUrlCoverage) {
    const uiSourceCode = Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(url);
    const contentProvider = uiSourceCode;
    const urlCoverage = new SourceURLCoverageInfo(url, generatedUrlCoverage);
    const coverageInfo = urlCoverage.ensureEntry(contentProvider, size, 0, 0, type);
    generatedUrlCoverage.sourcesURLCoverageInfo.set(url, urlCoverage);
    return coverageInfo;
  }
  async exportReport(fos) {
    const result = [];
    const coverageByUrlKeys = Array.from(this.coverageByURL.keys()).sort();
    for (const urlInfoKey of coverageByUrlKeys) {
      const urlInfo = this.coverageByURL.get(urlInfoKey);
      if (!urlInfo) {
        continue;
      }
      const url = urlInfo.url();
      if (url.startsWith("extensions::") || Common.ParsedURL.schemeIs(url, "chrome-extension:")) {
        continue;
      }
      result.push(...await urlInfo.entriesForExport());
    }
    await fos.write(JSON.stringify(result, void 0, 2));
    void fos.close();
  }
};
SDK.SDKModel.SDKModel.register(CoverageModel, { capabilities: 0, autostart: false });
function locationCompare(a, b) {
  const [aLine, aPos] = a.split(":");
  const [bLine, bPos] = b.split(":");
  return Number.parseInt(aLine, 10) - Number.parseInt(bLine, 10) || Number.parseInt(aPos, 10) - Number.parseInt(bPos, 10);
}
var URLCoverageInfo = class _URLCoverageInfo extends Common.ObjectWrapper.ObjectWrapper {
  urlInternal;
  coverageInfoByLocation;
  sizeInternal;
  usedSizeInternal;
  typeInternal;
  isContentScriptInternal;
  sourcesURLCoverageInfo = /* @__PURE__ */ new Map();
  sourceSegments;
  constructor(url) {
    super();
    this.urlInternal = url;
    this.coverageInfoByLocation = /* @__PURE__ */ new Map();
    this.sizeInternal = 0;
    this.usedSizeInternal = 0;
    this.isContentScriptInternal = false;
  }
  url() {
    return this.urlInternal;
  }
  type() {
    return this.typeInternal;
  }
  size() {
    return this.sizeInternal;
  }
  usedSize() {
    return this.usedSizeInternal;
  }
  unusedSize() {
    return this.sizeInternal - this.usedSizeInternal;
  }
  usedPercentage() {
    if (this.sizeInternal === 0) {
      return 0;
    }
    if (!this.unusedSize() || !this.size()) {
      return 0;
    }
    return this.usedSize() / this.size();
  }
  unusedPercentage() {
    if (this.sizeInternal === 0) {
      return 1;
    }
    return this.unusedSize() / this.size();
  }
  isContentScript() {
    return this.isContentScriptInternal;
  }
  entries() {
    return this.coverageInfoByLocation.values();
  }
  numberOfEntries() {
    return this.coverageInfoByLocation.size;
  }
  removeCoverageEntry(key, entry) {
    if (!this.coverageInfoByLocation.delete(key)) {
      return;
    }
    this.addToSizes(-entry.getUsedSize(), -entry.getSize());
  }
  addToSizes(usedSize, size) {
    this.usedSizeInternal += usedSize;
    this.sizeInternal += size;
    if (usedSize !== 0 || size !== 0) {
      this.dispatchEventToListeners(_URLCoverageInfo.Events.SizesChanged);
    }
  }
  setSourceSegments(segments) {
    this.sourceSegments = segments;
  }
  ensureEntry(contentProvider, contentLength, lineOffset, columnOffset, type) {
    const key = `${lineOffset}:${columnOffset}`;
    let entry = this.coverageInfoByLocation.get(key);
    if (type & 2 && !this.coverageInfoByLocation.size && contentProvider instanceof SDK.Script.Script) {
      this.isContentScriptInternal = contentProvider.isContentScript();
    }
    this.typeInternal |= type;
    if (entry) {
      entry.addCoverageType(type);
      return entry;
    }
    if (type & 2 && !this.coverageInfoByLocation.size && contentProvider instanceof SDK.Script.Script) {
      this.isContentScriptInternal = contentProvider.isContentScript();
    }
    entry = new CoverageInfo(contentProvider, contentLength, lineOffset, columnOffset, type, this);
    this.coverageInfoByLocation.set(key, entry);
    this.addToSizes(0, contentLength);
    return entry;
  }
  async getFullText() {
    let useFullText = false;
    const url = this.url();
    for (const info of this.coverageInfoByLocation.values()) {
      const { lineOffset, columnOffset } = info.getOffsets();
      if (lineOffset || columnOffset) {
        useFullText = Boolean(url);
        break;
      }
    }
    if (!useFullText) {
      return null;
    }
    const resource = SDK.ResourceTreeModel.ResourceTreeModel.resourceForURL(url);
    if (!resource) {
      return null;
    }
    const content = TextUtils.ContentData.ContentData.contentDataOrEmpty(await resource.requestContentData());
    return content.textObj;
  }
  entriesForExportBasedOnFullText(fullText) {
    const coverageByLocationKeys = Array.from(this.coverageInfoByLocation.keys()).sort(locationCompare);
    const entry = { url: this.url(), ranges: [], text: fullText.value() };
    for (const infoKey of coverageByLocationKeys) {
      const info = this.coverageInfoByLocation.get(infoKey);
      if (!info) {
        continue;
      }
      const { lineOffset, columnOffset } = info.getOffsets();
      const offset = fullText ? fullText.offsetFromPosition(lineOffset, columnOffset) : 0;
      entry.ranges.push(...info.rangesForExport(offset));
    }
    return entry;
  }
  async entriesForExportBasedOnContent() {
    const coverageByLocationKeys = Array.from(this.coverageInfoByLocation.keys()).sort(locationCompare);
    const result = [];
    for (const infoKey of coverageByLocationKeys) {
      const info = this.coverageInfoByLocation.get(infoKey);
      if (!info) {
        continue;
      }
      const entry = {
        url: this.url(),
        ranges: info.rangesForExport(),
        text: TextUtils.ContentData.ContentData.textOr(await info.getContentProvider().requestContentData(), null)
      };
      result.push(entry);
    }
    return result;
  }
  async entriesForExport() {
    const fullText = await this.getFullText();
    if (fullText) {
      return [await this.entriesForExportBasedOnFullText(fullText)];
    }
    return await this.entriesForExportBasedOnContent();
  }
};
var SourceURLCoverageInfo = class extends URLCoverageInfo {
  generatedURLCoverageInfo;
  lastSourceUsedRange = [];
  constructor(sourceUrl, generatedUrlCoverage) {
    super(sourceUrl);
    this.generatedURLCoverageInfo = generatedUrlCoverage;
  }
};
(function(URLCoverageInfo2) {
  let Events2;
  (function(Events3) {
    Events3["SizesChanged"] = "SizesChanged";
  })(Events2 = URLCoverageInfo2.Events || (URLCoverageInfo2.Events = {}));
})(URLCoverageInfo || (URLCoverageInfo = {}));
var mergeSegments = (segmentsA, segmentsB) => {
  const result = [];
  let indexA = 0;
  let indexB = 0;
  while (indexA < segmentsA.length && indexB < segmentsB.length) {
    const a = segmentsA[indexA];
    const b = segmentsB[indexB];
    const count = (a.count || 0) + (b.count || 0);
    const end = Math.min(a.end, b.end);
    const last = result[result.length - 1];
    const stamp = Math.min(a.stamp, b.stamp);
    if (!last || last.count !== count || last.stamp !== stamp) {
      result.push({ end, count, stamp });
    } else {
      last.end = end;
    }
    if (a.end <= b.end) {
      indexA++;
    }
    if (a.end >= b.end) {
      indexB++;
    }
  }
  for (; indexA < segmentsA.length; indexA++) {
    result.push(segmentsA[indexA]);
  }
  for (; indexB < segmentsB.length; indexB++) {
    result.push(segmentsB[indexB]);
  }
  return result;
};
var CoverageInfo = class {
  contentProvider;
  size;
  usedSize;
  statsByTimestamp;
  lineOffset;
  columnOffset;
  coverageType;
  segments;
  generatedUrlCoverageInfo;
  sourceUsedSizeMap = /* @__PURE__ */ new Map();
  sourceDeltaMap = /* @__PURE__ */ new Map();
  sourceUsedRangeMap = /* @__PURE__ */ new Map();
  constructor(contentProvider, size, lineOffset, columnOffset, type, generatedUrlCoverageInfo) {
    this.contentProvider = contentProvider;
    this.size = size;
    this.usedSize = 0;
    this.statsByTimestamp = /* @__PURE__ */ new Map();
    this.lineOffset = lineOffset;
    this.columnOffset = columnOffset;
    this.coverageType = type;
    this.generatedUrlCoverageInfo = generatedUrlCoverageInfo;
    this.segments = [];
  }
  getContentProvider() {
    return this.contentProvider;
  }
  url() {
    return this.contentProvider.contentURL();
  }
  type() {
    return this.coverageType;
  }
  addCoverageType(type) {
    this.coverageType |= type;
  }
  getOffsets() {
    return { lineOffset: this.lineOffset, columnOffset: this.columnOffset };
  }
  /**
   * Returns the delta by which usedSize increased.
   */
  mergeCoverage(segments) {
    const oldUsedSize = this.usedSize;
    this.segments = mergeSegments(this.segments, segments);
    this.updateStats();
    if (this.generatedUrlCoverageInfo.sourceSegments && this.generatedUrlCoverageInfo.sourceSegments.length > 0) {
      this.updateSourceCoverage();
    }
    return this.usedSize - oldUsedSize;
  }
  getSize() {
    return this.size;
  }
  getUsedSize() {
    return this.usedSize;
  }
  usageForRange(start, end) {
    let index = Platform.ArrayUtilities.upperBound(this.segments, start, (position, segment) => position - segment.end);
    for (; index < this.segments.length && this.segments[index].end < end; ++index) {
      if (this.segments[index].count) {
        return true;
      }
    }
    return index < this.segments.length && Boolean(this.segments[index].count);
  }
  updateStats() {
    this.statsByTimestamp = /* @__PURE__ */ new Map();
    this.usedSize = 0;
    let last = 0;
    for (const segment of this.segments) {
      let previousCount = this.statsByTimestamp.get(segment.stamp);
      if (previousCount === void 0) {
        previousCount = 0;
      }
      if (segment.count) {
        const used = segment.end - last;
        this.usedSize += used;
        this.statsByTimestamp.set(segment.stamp, previousCount + used);
      }
      last = segment.end;
    }
  }
  updateSourceCoverage() {
    const sourceCoverage = /* @__PURE__ */ new Map();
    this.sourceDeltaMap = /* @__PURE__ */ new Map();
    this.sourceUsedRangeMap = /* @__PURE__ */ new Map();
    const ranges = this.generatedUrlCoverageInfo.sourceSegments || [];
    let segmentStart = 0;
    let lastFoundRange = 0;
    for (const segment of this.segments) {
      const segmentEnd = segment.end;
      if (segment.count) {
        for (let i = lastFoundRange; i < ranges.length; i++) {
          const rangeStart = i === 0 ? 0 : ranges[i - 1].end + 1;
          const rangeEnd = ranges[i].end;
          const overlapStart = Math.max(segmentStart, rangeStart);
          const overlapEnd = Math.min(segmentEnd, rangeEnd);
          if (overlapStart <= overlapEnd) {
            const overlapSize = overlapEnd - overlapStart + 1;
            const overlapRange = { start: overlapStart, end: overlapEnd };
            if (!sourceCoverage.has(ranges[i].sourceUrl)) {
              sourceCoverage.set(ranges[i].sourceUrl, overlapSize);
            } else {
              sourceCoverage.set(ranges[i].sourceUrl, sourceCoverage.get(ranges[i].sourceUrl) + overlapSize);
            }
            if (!this.sourceUsedRangeMap.has(ranges[i].sourceUrl)) {
              this.sourceUsedRangeMap.set(ranges[i].sourceUrl, [overlapRange]);
            } else {
              this.sourceUsedRangeMap.get(ranges[i].sourceUrl)?.push(overlapRange);
            }
            lastFoundRange = i;
          }
          if (segmentEnd < rangeEnd) {
            break;
          }
        }
      }
      segmentStart = segmentEnd + 1;
    }
    for (const [url, size] of sourceCoverage) {
      const oldSize = this.sourceUsedSizeMap.get(url) || 0;
      if (oldSize !== size) {
        this.sourceUsedSizeMap.set(url, size);
        this.sourceDeltaMap.set(url, size - oldSize);
      }
    }
  }
  rangesForExport(offset = 0) {
    const ranges = [];
    let start = 0;
    for (const segment of this.segments) {
      if (segment.count) {
        const last = ranges.length > 0 ? ranges[ranges.length - 1] : null;
        if (last && last.end === start + offset) {
          last.end = segment.end + offset;
        } else {
          ranges.push({ start: start + offset, end: segment.end + offset });
        }
      }
      start = segment.end;
    }
    return ranges;
  }
};

// gen/front_end/panels/coverage/CoverageListView.js
var CoverageListView_exports = {};
__export(CoverageListView_exports, {
  CoverageListView: () => CoverageListView,
  GridNode: () => GridNode,
  coverageTypeToString: () => coverageTypeToString
});
import * as Common2 from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as TextUtils2 from "./../../models/text_utils/text_utils.js";
import * as Workspace3 from "./../../models/workspace/workspace.js";
import * as DataGrid from "./../../ui/legacy/components/data_grid/data_grid.js";
import * as UI from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/coverage/coverageListView.css.js
var coverageListView_css_default = `/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.data-grid {
  border: none;
}

.data-grid td .url-outer {
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
}

.data-grid td .url-outer .filter-highlight {
  font-weight: bold;
}

.data-grid td .url-prefix {
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.data-grid td .url-suffix {
  flex: none;
}

.data-grid td .bar {
  display: inline-block;
  height: 8px;
  border: 1px solid transparent;
}

.data-grid td .bar-unused-size {
  background-color: var(--app-color-coverage-unused);
}

.data-grid td .bar-used-size {
  background-color: var(--app-color-coverage-used);
}

.data-grid td .percent-value {
  width: 7ex;
  display: inline-block;
  color: var(--sys-color-on-surface-subtle);
}

@media (forced-colors: active) {
  .data-grid td .bar-container {
    forced-color-adjust: none;
  }

  .data-grid td .bar-unused-size {
    background-color: ButtonText;
  }

  .data-grid td .bar-used-size {
    background-color: ButtonFace;
  }

  .data-grid td .bar {
    border-color: ButtonText;
  }

  .data-grid .selected td .bar {
    border-top-color: HighlightText;
    border-bottom-color: HighlightText;
  }

  .data-grid .selected td .bar:last-child {
    border-right-color: HighlightText;
  }

  .data-grid .selected td .bar:first-child {
    border-left-color: HighlightText;
  }

  .data-grid:focus tr.selected span.percent-value {
    color: HighlightText;
  }
}

/*# sourceURL=${import.meta.resolve("./coverageListView.css")} */`;

// gen/front_end/panels/coverage/CoverageListView.js
var UIStrings = {
  /**
   *@description Text that appears on a button for the css resource type filter.
   */
  css: "CSS",
  /**
   *@description Text in Coverage List View of the Coverage tab
   */
  jsPerFunction: "JS (per function)",
  /**
   *@description Text in Coverage List View of the Coverage tab
   */
  jsPerBlock: "JS (per block)",
  /**
   *@description Text for web URLs
   */
  url: "URL",
  /**
   *@description Text that refers to some types
   */
  type: "Type",
  /**
   *@description Text in Coverage List View of the Coverage tab
   */
  totalBytes: "Total Bytes",
  /**
   *@description Text in Coverage List View of the Coverage tab
   */
  unusedBytes: "Unused Bytes",
  /**
   *@description Text in the Coverage List View of the Coverage Tab
   */
  usageVisualization: "Usage Visualization",
  /**
   *@description Data grid name for Coverage data grids
   */
  codeCoverage: "Code Coverage",
  /**
   *@description Cell title in Coverage List View of the Coverage tab. The coverage tool tells
   *developers which functions (logical groups of lines of code) were actually run/executed. If a
   *function does get run, then it is marked in the UI to indicate that it was covered.
   */
  jsCoverageWithPerFunction: "JS coverage with per function granularity: Once a function was executed, the whole function is marked as covered.",
  /**
   *@description Cell title in Coverage List View of the Coverage tab. The coverage tool tells
   *developers which blocks (logical groups of lines of code, smaller than a function) were actually
   *run/executed. If a block does get run, then it is marked in the UI to indicate that it was
   *covered.
   */
  jsCoverageWithPerBlock: "JS coverage with per block granularity: Once a block of JavaScript was executed, that block is marked as covered.",
  /**
   *@description Accessible text for the value in bytes in memory allocation or coverage view.
   */
  sBytes: "{n, plural, =1 {# byte} other {# bytes}}",
  /**
   *@description Accessible text for the unused bytes column in the coverage tool that describes the total unused bytes and percentage of the file unused.
   *@example {88%} percentage
   */
  sBytesS: "{n, plural, =1 {# byte, {percentage}} other {# bytes, {percentage}}}",
  /**
   *@description Tooltip text for the bar in the coverage list view of the coverage tool that illustrates the relation between used and unused bytes.
   *@example {1000} PH1
   *@example {12.34} PH2
   */
  sBytesSBelongToFunctionsThatHave: "{PH1} bytes ({PH2}) belong to functions that have not (yet) been executed.",
  /**
   *@description Tooltip text for the bar in the coverage list view of the coverage tool that illustrates the relation between used and unused bytes.
   *@example {1000} PH1
   *@example {12.34} PH2
   */
  sBytesSBelongToBlocksOf: "{PH1} bytes ({PH2}) belong to blocks of JavaScript that have not (yet) been executed.",
  /**
   *@description Message in Coverage View of the Coverage tab
   *@example {1000} PH1
   *@example {12.34} PH2
   */
  sBytesSBelongToFunctionsThatHaveExecuted: "{PH1} bytes ({PH2}) belong to functions that have executed at least once.",
  /**
   *@description Message in Coverage View of the Coverage tab
   *@example {1000} PH1
   *@example {12.34} PH2
   */
  sBytesSBelongToBlocksOfJavascript: "{PH1} bytes ({PH2}) belong to blocks of JavaScript that have executed at least once.",
  /**
   *@description Accessible text for the visualization column of coverage tool. Contains percentage of unused bytes to used bytes.
   *@example {12.3} PH1
   *@example {12.3} PH2
   */
  sOfFileUnusedSOfFileUsed: "{PH1} % of file unused, {PH2} % of file used"
};
var str_ = i18n.i18n.registerUIStrings("panels/coverage/CoverageListView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
function coverageTypeToString(type) {
  const types = [];
  if (type & 1) {
    types.push(i18nString(UIStrings.css));
  }
  if (type & 4) {
    types.push(i18nString(UIStrings.jsPerFunction));
  } else if (type & 2) {
    types.push(i18nString(UIStrings.jsPerBlock));
  }
  return types.join("+");
}
var CoverageListView = class extends UI.Widget.VBox {
  nodeForCoverageInfo;
  isVisibleFilter;
  highlightRegExp;
  dataGrid;
  constructor(isVisibleFilter) {
    super(true);
    this.registerRequiredCSS(coverageListView_css_default);
    this.nodeForCoverageInfo = /* @__PURE__ */ new Map();
    this.isVisibleFilter = isVisibleFilter;
    this.highlightRegExp = null;
    const columns = [
      {
        id: "url",
        title: i18nString(UIStrings.url),
        width: "250px",
        weight: 3,
        fixedWidth: false,
        sortable: true,
        disclosure: true
      },
      { id: "type", title: i18nString(UIStrings.type), width: "45px", weight: 1, fixedWidth: true, sortable: true },
      {
        id: "size",
        title: i18nString(UIStrings.totalBytes),
        width: "60px",
        fixedWidth: true,
        sortable: true,
        align: "right",
        weight: 1
      },
      {
        id: "unused-size",
        title: i18nString(UIStrings.unusedBytes),
        width: "100px",
        fixedWidth: true,
        sortable: true,
        align: "right",
        sort: DataGrid.DataGrid.Order.Descending,
        weight: 1
      },
      {
        id: "bars",
        title: i18nString(UIStrings.usageVisualization),
        width: "250px",
        fixedWidth: false,
        sortable: true,
        weight: 1
      }
    ];
    this.dataGrid = new DataGrid.SortableDataGrid.SortableDataGrid({
      displayName: i18nString(UIStrings.codeCoverage),
      columns,
      refreshCallback: void 0,
      deleteCallback: void 0
    });
    this.dataGrid.setResizeMethod(
      "last"
      /* DataGrid.DataGrid.ResizeMethod.LAST */
    );
    this.dataGrid.setStriped(true);
    this.dataGrid.element.classList.add("flex-auto");
    this.dataGrid.addEventListener("OpenedNode", this.onOpenedNode, this);
    this.dataGrid.addEventListener("SortingChanged", this.sortingChanged, this);
    const dataGridWidget = this.dataGrid.asWidget();
    dataGridWidget.show(this.contentElement);
    this.setDefaultFocusedChild(dataGridWidget);
  }
  update(coverageInfo = []) {
    let hadUpdates = false;
    const maxSize = coverageInfo.reduce((acc, entry) => Math.max(acc, entry.size()), 0);
    const rootNode = this.dataGrid.rootNode();
    for (const entry of coverageInfo) {
      let node = this.nodeForCoverageInfo.get(entry);
      if (node) {
        if (this.isVisibleFilter(node.coverageInfo)) {
          hadUpdates = node.refreshIfNeeded(maxSize) || hadUpdates;
          if (entry.sourcesURLCoverageInfo.size > 0) {
            this.updateSourceNodes(entry.sourcesURLCoverageInfo, maxSize, node);
          }
        }
        continue;
      }
      node = new GridNode(entry, maxSize);
      this.nodeForCoverageInfo.set(entry, node);
      if (this.isVisibleFilter(node.coverageInfo)) {
        rootNode.appendChild(node);
        if (entry.sourcesURLCoverageInfo.size > 0) {
          void this.createSourceNodes(entry.sourcesURLCoverageInfo, maxSize, node);
        }
        hadUpdates = true;
      }
    }
    if (hadUpdates) {
      this.sortingChanged();
    }
  }
  updateSourceNodes(sourcesURLCoverageInfo, maxSize, node) {
    let shouldCreateSourceNodes = false;
    for (const coverageInfo of sourcesURLCoverageInfo.values()) {
      const sourceNode = this.nodeForCoverageInfo.get(coverageInfo);
      if (sourceNode) {
        sourceNode.refreshIfNeeded(maxSize);
      } else {
        shouldCreateSourceNodes = true;
        break;
      }
    }
    if (shouldCreateSourceNodes) {
      void this.createSourceNodes(sourcesURLCoverageInfo, maxSize, node);
    }
  }
  async createSourceNodes(sourcesURLCoverageInfo, maxSize, node) {
    for (const coverageInfo of sourcesURLCoverageInfo.values()) {
      const sourceNode = new GridNode(coverageInfo, maxSize);
      node.appendChild(sourceNode);
      this.nodeForCoverageInfo.set(coverageInfo, sourceNode);
    }
  }
  reset() {
    this.nodeForCoverageInfo.clear();
    this.dataGrid.rootNode().removeChildren();
  }
  updateFilterAndHighlight(highlightRegExp) {
    this.highlightRegExp = highlightRegExp;
    let hadTreeUpdates = false;
    for (const node of this.nodeForCoverageInfo.values()) {
      const shouldBeVisible = this.isVisibleFilter(node.coverageInfo);
      const isVisible = Boolean(node.parent);
      if (shouldBeVisible) {
        node.setHighlight(this.highlightRegExp);
      }
      if (shouldBeVisible === isVisible) {
        continue;
      }
      hadTreeUpdates = true;
      if (!shouldBeVisible) {
        node.remove();
      } else {
        this.appendNodeByType(node);
      }
    }
    if (hadTreeUpdates) {
      this.sortingChanged();
    }
  }
  appendNodeByType(node) {
    if (node.coverageInfo instanceof SourceURLCoverageInfo) {
      const parentNode = this.nodeForCoverageInfo.get(node.coverageInfo.generatedURLCoverageInfo);
      parentNode?.appendChild(node);
    } else {
      this.dataGrid.rootNode().appendChild(node);
    }
  }
  selectByUrl(url) {
    for (const [info, node] of this.nodeForCoverageInfo.entries()) {
      if (info.url() === url) {
        node.revealAndSelect();
        break;
      }
    }
  }
  onOpenedNode() {
    void this.revealSourceForSelectedNode();
  }
  async revealSourceForSelectedNode() {
    const node = this.dataGrid.selectedNode;
    if (!node) {
      return;
    }
    const coverageInfo = node.coverageInfo;
    const sourceCode = Workspace3.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(coverageInfo.url());
    if (!sourceCode) {
      return;
    }
    if (this.dataGrid.selectedNode !== node) {
      return;
    }
    void Common2.Revealer.reveal(sourceCode);
  }
  sortingChanged() {
    const columnId = this.dataGrid.sortColumnId();
    if (!columnId) {
      return;
    }
    const sortFunction = GridNode.sortFunctionForColumn(columnId);
    if (!sortFunction) {
      return;
    }
    this.dataGrid.sortNodes(sortFunction, !this.dataGrid.isSortOrderAscending());
  }
};
var percentageFormatter = null;
function getPercentageFormatter() {
  if (!percentageFormatter) {
    percentageFormatter = new Intl.NumberFormat(i18n.DevToolsLocale.DevToolsLocale.instance().locale, {
      style: "percent",
      maximumFractionDigits: 1
    });
  }
  return percentageFormatter;
}
var bytesFormatter = null;
function getBytesFormatter() {
  if (!bytesFormatter) {
    bytesFormatter = new Intl.NumberFormat(i18n.DevToolsLocale.DevToolsLocale.instance().locale);
  }
  return bytesFormatter;
}
var GridNode = class extends DataGrid.SortableDataGrid.SortableDataGridNode {
  coverageInfo;
  lastUsedSize;
  url;
  maxSize;
  highlightRegExp;
  constructor(coverageInfo, maxSize) {
    super();
    this.coverageInfo = coverageInfo;
    this.url = coverageInfo.url();
    this.maxSize = maxSize;
    this.highlightRegExp = null;
  }
  setHighlight(highlightRegExp) {
    if (this.highlightRegExp === highlightRegExp) {
      return;
    }
    this.highlightRegExp = highlightRegExp;
    this.refresh();
  }
  refreshIfNeeded(maxSize) {
    if (this.lastUsedSize === this.coverageInfo.usedSize() && maxSize === this.maxSize) {
      return false;
    }
    this.lastUsedSize = this.coverageInfo.usedSize();
    this.maxSize = maxSize;
    this.refresh();
    return true;
  }
  createCell(columnId) {
    const cell = this.createTD(columnId);
    switch (columnId) {
      case "url": {
        UI.Tooltip.Tooltip.install(cell, this.url);
        const outer = cell.createChild("div", "url-outer");
        const prefix = outer.createChild("div", "url-prefix");
        const suffix = outer.createChild("div", "url-suffix");
        const splitURL = /^(.*)(\/[^/]*)$/.exec(this.url);
        prefix.textContent = splitURL ? splitURL[1] : this.url;
        suffix.textContent = splitURL ? splitURL[2] : "";
        if (this.highlightRegExp) {
          this.highlight(outer, this.url);
        }
        this.setCellAccessibleName(this.url, cell, columnId);
        break;
      }
      case "type": {
        cell.textContent = coverageTypeToString(this.coverageInfo.type());
        if (this.coverageInfo.type() & 4) {
          UI.Tooltip.Tooltip.install(cell, i18nString(UIStrings.jsCoverageWithPerFunction));
        } else if (this.coverageInfo.type() & 2) {
          UI.Tooltip.Tooltip.install(cell, i18nString(UIStrings.jsCoverageWithPerBlock));
        }
        break;
      }
      case "size": {
        const size = this.coverageInfo.size() || 0;
        const sizeSpan = cell.createChild("span");
        const sizeFormatted = getBytesFormatter().format(size);
        sizeSpan.textContent = sizeFormatted;
        const sizeAccessibleName = i18nString(UIStrings.sBytes, { n: size });
        this.setCellAccessibleName(sizeAccessibleName, cell, columnId);
        break;
      }
      case "unused-size": {
        const unusedSize = this.coverageInfo.unusedSize() || 0;
        const unusedSizeSpan = cell.createChild("span");
        const unusedPercentsSpan = cell.createChild("span", "percent-value");
        const unusedSizeFormatted = getBytesFormatter().format(unusedSize);
        unusedSizeSpan.textContent = unusedSizeFormatted;
        const unusedPercentFormatted = getPercentageFormatter().format(this.coverageInfo.unusedPercentage());
        unusedPercentsSpan.textContent = unusedPercentFormatted;
        const unusedAccessibleName = i18nString(UIStrings.sBytesS, { n: unusedSize, percentage: unusedPercentFormatted });
        this.setCellAccessibleName(unusedAccessibleName, cell, columnId);
        break;
      }
      case "bars": {
        const barContainer = cell.createChild("div", "bar-container");
        const unusedPercent = getPercentageFormatter().format(this.coverageInfo.unusedPercentage());
        const usedPercent = getPercentageFormatter().format(this.coverageInfo.usedPercentage());
        if (this.coverageInfo.unusedSize() > 0) {
          const unusedSizeBar = barContainer.createChild("div", "bar bar-unused-size");
          unusedSizeBar.style.width = (this.coverageInfo.unusedSize() / this.maxSize * 100 || 0) + "%";
          if (this.coverageInfo.type() & 4) {
            UI.Tooltip.Tooltip.install(unusedSizeBar, i18nString(UIStrings.sBytesSBelongToFunctionsThatHave, { PH1: this.coverageInfo.unusedSize(), PH2: unusedPercent }));
          } else if (this.coverageInfo.type() & 2) {
            UI.Tooltip.Tooltip.install(unusedSizeBar, i18nString(UIStrings.sBytesSBelongToBlocksOf, { PH1: this.coverageInfo.unusedSize(), PH2: unusedPercent }));
          }
        }
        if (this.coverageInfo.usedSize() > 0) {
          const usedSizeBar = barContainer.createChild("div", "bar bar-used-size");
          usedSizeBar.style.width = (this.coverageInfo.usedSize() / this.maxSize * 100 || 0) + "%";
          if (this.coverageInfo.type() & 4) {
            UI.Tooltip.Tooltip.install(usedSizeBar, i18nString(UIStrings.sBytesSBelongToFunctionsThatHaveExecuted, { PH1: this.coverageInfo.usedSize(), PH2: usedPercent }));
          } else if (this.coverageInfo.type() & 2) {
            UI.Tooltip.Tooltip.install(usedSizeBar, i18nString(UIStrings.sBytesSBelongToBlocksOfJavascript, { PH1: this.coverageInfo.usedSize(), PH2: usedPercent }));
          }
        }
        this.setCellAccessibleName(i18nString(UIStrings.sOfFileUnusedSOfFileUsed, { PH1: unusedPercent, PH2: usedPercent }), cell, columnId);
      }
    }
    return cell;
  }
  highlight(element, textContent) {
    if (!this.highlightRegExp) {
      return;
    }
    const matches = this.highlightRegExp.exec(textContent);
    if (!matches?.length) {
      return;
    }
    const range = new TextUtils2.TextRange.SourceRange(matches.index, matches[0].length);
    UI.UIUtils.highlightRangesWithStyleClass(element, [range], "filter-highlight");
  }
  static sortFunctionForColumn(columnId) {
    const compareURL = (a, b) => a.url.localeCompare(b.url);
    switch (columnId) {
      case "url":
        return compareURL;
      case "type":
        return (a, b) => {
          const typeA = coverageTypeToString(a.coverageInfo.type());
          const typeB = coverageTypeToString(b.coverageInfo.type());
          return typeA.localeCompare(typeB) || compareURL(a, b);
        };
      case "size":
        return (a, b) => a.coverageInfo.size() - b.coverageInfo.size() || compareURL(a, b);
      case "bars":
      case "unused-size":
        return (a, b) => a.coverageInfo.unusedSize() - b.coverageInfo.unusedSize() || compareURL(a, b);
      default:
        console.assert(false, "Unknown sort field: " + columnId);
        return null;
    }
  }
};

// gen/front_end/panels/coverage/CoverageView.js
var CoverageView_exports = {};
__export(CoverageView_exports, {
  ActionDelegate: () => ActionDelegate,
  CoverageView: () => CoverageView
});
import "./../../ui/legacy/legacy.js";
import * as Common3 from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as Platform3 from "./../../core/platform/platform.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as Bindings from "./../../models/bindings/bindings.js";
import * as Workspace7 from "./../../models/workspace/workspace.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/coverage/CoverageDecorationManager.js
var CoverageDecorationManager_exports = {};
__export(CoverageDecorationManager_exports, {
  CoverageDecorationManager: () => CoverageDecorationManager,
  decoratorType: () => decoratorType
});
import * as Platform2 from "./../../core/platform/platform.js";
import * as TextUtils3 from "./../../models/text_utils/text_utils.js";
import * as Workspace5 from "./../../models/workspace/workspace.js";
var decoratorType = "coverage";
var CoverageDecorationManager = class _CoverageDecorationManager {
  coverageModel;
  textByProvider;
  uiSourceCodeByContentProvider;
  #workspace;
  #debuggerBinding;
  #cssBinding;
  constructor(coverageModel, workspace, debuggerBinding, cssBinding) {
    this.coverageModel = coverageModel;
    this.#workspace = workspace;
    this.#debuggerBinding = debuggerBinding;
    this.#cssBinding = cssBinding;
    this.textByProvider = /* @__PURE__ */ new Map();
    this.uiSourceCodeByContentProvider = new Platform2.MapUtilities.Multimap();
    for (const uiSourceCode of this.#workspace.uiSourceCodes()) {
      uiSourceCode.setDecorationData(decoratorType, this);
    }
    this.#workspace.addEventListener(Workspace5.Workspace.Events.UISourceCodeAdded, this.onUISourceCodeAdded, this);
  }
  reset() {
    for (const uiSourceCode of this.#workspace.uiSourceCodes()) {
      uiSourceCode.setDecorationData(decoratorType, void 0);
    }
  }
  dispose() {
    this.reset();
    this.#workspace.removeEventListener(Workspace5.Workspace.Events.UISourceCodeAdded, this.onUISourceCodeAdded, this);
  }
  update(updatedEntries) {
    for (const entry of updatedEntries) {
      for (const uiSourceCode of this.uiSourceCodeByContentProvider.get(entry.getContentProvider())) {
        uiSourceCode.setDecorationData(decoratorType, this);
      }
    }
  }
  /**
   * Returns the coverage per line of the provided uiSourceCode. The resulting array has the same length
   * as the provided `lines` array.
   *
   * @param uiSourceCode The UISourceCode for which to get the coverage info.
   * @param lineMappings The caller might have applied formatting to the UISourceCode. Each entry
   *                     in this array represents one line and the range specifies where it's found in
   *                     the original content.
   */
  async usageByLine(uiSourceCode, lineMappings) {
    const result = [];
    await this.updateTexts(uiSourceCode, lineMappings);
    for (const { startLine, startColumn, endLine, endColumn } of lineMappings) {
      const startLocationsPromise = this.rawLocationsForSourceLocation(uiSourceCode, startLine, startColumn);
      const endLocationsPromise = this.rawLocationsForSourceLocation(uiSourceCode, endLine, endColumn);
      const [startLocations, endLocations] = await Promise.all([startLocationsPromise, endLocationsPromise]);
      let used = void 0;
      for (let startIndex = 0, endIndex = 0; startIndex < startLocations.length; ++startIndex) {
        const start = startLocations[startIndex];
        while (endIndex < endLocations.length && _CoverageDecorationManager.compareLocations(start, endLocations[endIndex]) >= 0) {
          ++endIndex;
        }
        if (endIndex >= endLocations.length || endLocations[endIndex].id !== start.id) {
          continue;
        }
        const end = endLocations[endIndex++];
        const text = this.textByProvider.get(end.contentProvider);
        if (!text) {
          continue;
        }
        const textValue = text.value();
        let startOffset = Math.min(text.offsetFromPosition(start.line, start.column), textValue.length - 1);
        let endOffset = Math.min(text.offsetFromPosition(end.line, end.column), textValue.length - 1);
        while (startOffset <= endOffset && /\s/.test(textValue[startOffset])) {
          ++startOffset;
        }
        while (startOffset <= endOffset && /\s/.test(textValue[endOffset])) {
          --endOffset;
        }
        if (startOffset <= endOffset) {
          used = this.coverageModel.usageForRange(end.contentProvider, startOffset, endOffset);
        }
        if (used) {
          break;
        }
      }
      result.push(used);
    }
    return result;
  }
  async updateTexts(uiSourceCode, lineMappings) {
    const promises = [];
    for (const range of lineMappings) {
      for (const entry of await this.rawLocationsForSourceLocation(uiSourceCode, range.startLine, 0)) {
        if (this.textByProvider.has(entry.contentProvider)) {
          continue;
        }
        this.textByProvider.set(entry.contentProvider, null);
        this.uiSourceCodeByContentProvider.set(entry.contentProvider, uiSourceCode);
        promises.push(this.updateTextForProvider(entry.contentProvider));
      }
    }
    await Promise.all(promises);
  }
  async updateTextForProvider(contentProvider) {
    const contentData = TextUtils3.ContentData.ContentData.contentDataOrEmpty(await contentProvider.requestContentData());
    this.textByProvider.set(contentProvider, contentData.textObj);
  }
  async rawLocationsForSourceLocation(uiSourceCode, line, column) {
    const result = [];
    const contentType = uiSourceCode.contentType();
    if (contentType.hasScripts()) {
      let locations = await this.#debuggerBinding.uiLocationToRawLocations(uiSourceCode, line, column);
      locations = locations.filter((location) => !!location.script());
      for (const location of locations) {
        const script = location.script();
        if (!script) {
          continue;
        }
        if (script.isInlineScript() && contentType.isDocument()) {
          location.lineNumber -= script.lineOffset;
          if (!location.lineNumber) {
            location.columnNumber -= script.columnOffset;
          }
        }
        result.push({
          id: `js:${location.scriptId}`,
          contentProvider: script,
          line: location.lineNumber,
          column: location.columnNumber
        });
      }
    }
    if (contentType.isStyleSheet() || contentType.isDocument()) {
      const rawStyleLocations = this.#cssBinding.uiLocationToRawLocations(new Workspace5.UISourceCode.UILocation(uiSourceCode, line, column));
      for (const location of rawStyleLocations) {
        const header = location.header();
        if (!header) {
          continue;
        }
        if (header.isInline && contentType.isDocument()) {
          location.lineNumber -= header.startLine;
          if (!location.lineNumber) {
            location.columnNumber -= header.startColumn;
          }
        }
        result.push({
          id: `css:${location.styleSheetId}`,
          contentProvider: header,
          line: location.lineNumber,
          column: location.columnNumber
        });
      }
    }
    return result.sort(_CoverageDecorationManager.compareLocations);
  }
  static compareLocations(a, b) {
    return a.id.localeCompare(b.id) || a.line - b.line || a.column - b.column;
  }
  onUISourceCodeAdded(event) {
    const uiSourceCode = event.data;
    uiSourceCode.setDecorationData(decoratorType, this);
  }
};

// gen/front_end/panels/coverage/coverageView.css.js
var coverageView_css_default = `/*
 * Copyright (c) 2016 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  overflow: hidden;
}

.coverage-toolbar-container {
  display: flex;
  border-bottom: 1px solid var(--sys-color-divider);
  flex: 0 0 auto;
}

.coverage-toolbar {
  flex: auto;
}

.coverage-toolbar-summary {
  background-color: var(--sys-color-cdt-base-container);
  border-top: 1px solid var(--sys-color-divider);
  padding-left: 5px;
  flex: 0 0 19px;
  display: flex;
  padding-right: 5px;
}

.coverage-toolbar-summary .coverage-message {
  padding-top: 2px;
  padding-left: 1ex;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.coverage-results {
  overflow-y: auto;
  display: flex;
  flex: auto;
}

.bfcache-page,
.prerender-page {
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.bfcache-page .message,
.prerender-page .message {
  white-space: pre-line;
  text-align: center;
}

/*# sourceURL=${import.meta.resolve("./coverageView.css")} */`;

// gen/front_end/panels/coverage/CoverageView.js
var UIStrings2 = {
  /**
   *@description Tooltip in Coverage List View of the Coverage tab for selecting JavaScript coverage mode
   */
  chooseCoverageGranularityPer: "Choose coverage granularity: Per function has low overhead, per block has significant overhead.",
  /**
   *@description Text in Coverage List View of the Coverage tab
   */
  perFunction: "Per function",
  /**
   *@description Text in Coverage List View of the Coverage tab
   */
  perBlock: "Per block",
  /**
   *@description Text in Coverage View of the Coverage tab
   */
  filterByUrl: "Filter by URL",
  /**
   *@description Label for the type filter in the Converage Panel
   */
  filterCoverageByType: "Filter coverage by type",
  /**
   *@description Text for everything
   */
  all: "All",
  /**
   *@description Text that appears on a button for the css resource type filter.
   */
  css: "CSS",
  /**
   *@description Text in Timeline Tree View of the Performance panel
   */
  javascript: "JavaScript",
  /**
   *@description Tooltip text that appears on the setting when hovering over it in Coverage View of the Coverage tab
   */
  includeExtensionContentScripts: "Include extension content scripts",
  /**
   *@description Title for a type of source files
   */
  contentScripts: "Content scripts",
  /**
   *@description Message in Coverage View of the Coverage tab
   */
  noCoverageData: "No coverage data",
  /**
   *@description Message in Coverage View of the Coverage tab
   */
  reloadPage: "Reload page",
  /**
   *@description Message in Coverage View of the Coverage tab
   */
  startRecording: "Start recording",
  /**
   *@description Message in Coverage View of the Coverage tab
   *@example {Reload page} PH1
   */
  clickTheReloadButtonSToReloadAnd: 'Click the "{PH1}" button to reload and start capturing coverage.',
  /**
   *@description Message in Coverage View of the Coverage tab
   *@example {Start recording} PH1
   */
  clickTheRecordButtonSToStart: 'Click the "{PH1}" button to start capturing coverage.',
  /**
   *@description Message in the Coverage View explaining that DevTools could not capture coverage.
   */
  bfcacheNoCapture: "Could not capture coverage info because the page was served from the back/forward cache.",
  /**
   *@description  Message in the Coverage View explaining that DevTools could not capture coverage.
   */
  activationNoCapture: "Could not capture coverage info because the page was prerendered in the background.",
  /**
   *@description  Message in the Coverage View prompting the user to reload the page.
   *@example {reload button icon} PH1
   */
  reloadPrompt: "Click the reload button {PH1} to reload and get coverage.",
  /**
   *@description Footer message in Coverage View of the Coverage tab
   *@example {300k used, 600k unused} PH1
   *@example {500k used, 800k unused} PH2
   */
  filteredSTotalS: "Filtered: {PH1}  Total: {PH2}",
  /**
   *@description Footer message in Coverage View of the Coverage tab
   *@example {1.5 MB} PH1
   *@example {2.1 MB} PH2
   *@example {71%} PH3
   *@example {29%} PH4
   */
  sOfSSUsedSoFarSUnused: "{PH1} of {PH2} ({PH3}%) used so far, {PH4} unused."
};
var str_2 = i18n3.i18n.registerUIStrings("panels/coverage/CoverageView.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var coverageViewInstance;
var CoverageView = class _CoverageView extends UI2.Widget.VBox {
  model;
  decorationManager;
  coverageTypeComboBox;
  coverageTypeComboBoxSetting;
  toggleRecordAction;
  toggleRecordButton;
  inlineReloadButton;
  startWithReloadButton;
  clearAction;
  exportAction;
  textFilterRegExp;
  filterInput;
  typeFilterValue;
  filterByTypeComboBox;
  showContentScriptsSetting;
  contentScriptsCheckbox;
  coverageResultsElement;
  landingPage;
  bfcacheReloadPromptPage;
  activationReloadPromptPage;
  listView;
  statusToolbarElement;
  statusMessageElement;
  constructor() {
    super(true);
    this.registerRequiredCSS(coverageView_css_default);
    this.element.setAttribute("jslog", `${VisualLogging.panel("coverage").track({ resize: true })}`);
    this.model = null;
    this.decorationManager = null;
    const toolbarContainer = this.contentElement.createChild("div", "coverage-toolbar-container");
    toolbarContainer.setAttribute("jslog", `${VisualLogging.toolbar()}`);
    toolbarContainer.role = "toolbar";
    const toolbar2 = toolbarContainer.createChild("devtools-toolbar", "coverage-toolbar");
    toolbar2.role = "presentation";
    toolbar2.wrappable = true;
    this.coverageTypeComboBox = new UI2.Toolbar.ToolbarComboBox(this.onCoverageTypeComboBoxSelectionChanged.bind(this), i18nString2(UIStrings2.chooseCoverageGranularityPer), void 0, "coverage-type");
    const coverageTypes = [
      {
        label: i18nString2(UIStrings2.perFunction),
        value: 2 | 4
      },
      {
        label: i18nString2(UIStrings2.perBlock),
        value: 2
      }
    ];
    for (const type of coverageTypes) {
      this.coverageTypeComboBox.addOption(this.coverageTypeComboBox.createOption(type.label, `${type.value}`));
    }
    this.coverageTypeComboBoxSetting = Common3.Settings.Settings.instance().createSetting("coverage-view-coverage-type", 0);
    this.coverageTypeComboBox.setSelectedIndex(this.coverageTypeComboBoxSetting.get());
    this.coverageTypeComboBox.setEnabled(true);
    toolbar2.appendToolbarItem(this.coverageTypeComboBox);
    this.toggleRecordAction = UI2.ActionRegistry.ActionRegistry.instance().getAction("coverage.toggle-recording");
    this.toggleRecordButton = UI2.Toolbar.Toolbar.createActionButton(this.toggleRecordAction);
    toolbar2.appendToolbarItem(this.toggleRecordButton);
    const mainTarget = SDK2.TargetManager.TargetManager.instance().primaryPageTarget();
    const mainTargetSupportsRecordOnReload = mainTarget?.model(SDK2.ResourceTreeModel.ResourceTreeModel);
    this.inlineReloadButton = null;
    if (mainTargetSupportsRecordOnReload) {
      this.startWithReloadButton = UI2.Toolbar.Toolbar.createActionButton("coverage.start-with-reload");
      toolbar2.appendToolbarItem(this.startWithReloadButton);
      this.toggleRecordButton.setEnabled(false);
      this.toggleRecordButton.setVisible(false);
    }
    this.clearAction = UI2.ActionRegistry.ActionRegistry.instance().getAction("coverage.clear");
    this.clearAction.setEnabled(false);
    toolbar2.appendToolbarItem(UI2.Toolbar.Toolbar.createActionButton(this.clearAction));
    toolbar2.appendSeparator();
    this.exportAction = UI2.ActionRegistry.ActionRegistry.instance().getAction("coverage.export");
    this.exportAction.setEnabled(false);
    toolbar2.appendToolbarItem(UI2.Toolbar.Toolbar.createActionButton(this.exportAction));
    this.textFilterRegExp = null;
    toolbar2.appendSeparator();
    this.filterInput = new UI2.Toolbar.ToolbarFilter(i18nString2(UIStrings2.filterByUrl), 1, 1);
    this.filterInput.setEnabled(false);
    this.filterInput.addEventListener("TextChanged", this.onFilterChanged, this);
    toolbar2.appendToolbarItem(this.filterInput);
    toolbar2.appendSeparator();
    this.typeFilterValue = null;
    this.filterByTypeComboBox = new UI2.Toolbar.ToolbarComboBox(this.onFilterByTypeChanged.bind(this), i18nString2(UIStrings2.filterCoverageByType), void 0, "coverage-by-type");
    const options = [
      {
        label: i18nString2(UIStrings2.all),
        value: ""
      },
      {
        label: i18nString2(UIStrings2.css),
        value: 1
      },
      {
        label: i18nString2(UIStrings2.javascript),
        value: 2 | 4
      }
    ];
    for (const option of options) {
      this.filterByTypeComboBox.addOption(this.filterByTypeComboBox.createOption(option.label, `${option.value}`));
    }
    this.filterByTypeComboBox.setSelectedIndex(0);
    this.filterByTypeComboBox.setEnabled(false);
    toolbar2.appendToolbarItem(this.filterByTypeComboBox);
    toolbar2.appendSeparator();
    this.showContentScriptsSetting = Common3.Settings.Settings.instance().createSetting("show-content-scripts", false);
    this.showContentScriptsSetting.addChangeListener(this.onFilterChanged, this);
    this.contentScriptsCheckbox = new UI2.Toolbar.ToolbarSettingCheckbox(this.showContentScriptsSetting, i18nString2(UIStrings2.includeExtensionContentScripts), i18nString2(UIStrings2.contentScripts));
    this.contentScriptsCheckbox.setEnabled(false);
    toolbar2.appendToolbarItem(this.contentScriptsCheckbox);
    this.coverageResultsElement = this.contentElement.createChild("div", "coverage-results");
    this.landingPage = this.buildLandingPage();
    this.bfcacheReloadPromptPage = this.buildReloadPromptPage(i18nString2(UIStrings2.bfcacheNoCapture), "bfcache-page");
    this.activationReloadPromptPage = this.buildReloadPromptPage(i18nString2(UIStrings2.activationNoCapture), "prerender-page");
    this.listView = new CoverageListView(this.isVisible.bind(this, false));
    this.statusToolbarElement = this.contentElement.createChild("div", "coverage-toolbar-summary");
    this.statusMessageElement = this.statusToolbarElement.createChild("div", "coverage-message");
    this.landingPage.show(this.coverageResultsElement);
  }
  static instance() {
    if (!coverageViewInstance) {
      coverageViewInstance = new _CoverageView();
    }
    return coverageViewInstance;
  }
  static removeInstance() {
    coverageViewInstance = void 0;
  }
  buildLandingPage() {
    const widget = new UI2.EmptyWidget.EmptyWidget(i18nString2(UIStrings2.noCoverageData), "");
    widget.link = "https://developer.chrome.com/docs/devtools/coverage";
    if (this.startWithReloadButton) {
      const action = UI2.ActionRegistry.ActionRegistry.instance().getAction("coverage.start-with-reload");
      if (action) {
        widget.text = i18nString2(UIStrings2.clickTheReloadButtonSToReloadAnd, { PH1: i18nString2(UIStrings2.reloadPage) });
        const button = UI2.UIUtils.createTextButton(i18nString2(UIStrings2.reloadPage), () => action.execute(), {
          jslogContext: action.id(),
          variant: "tonal"
          /* Buttons.Button.Variant.TONAL */
        });
        widget.contentElement.append(button);
      }
    } else {
      widget.text = i18nString2(UIStrings2.clickTheRecordButtonSToStart, { PH1: i18nString2(UIStrings2.startRecording) });
      const button = UI2.UIUtils.createTextButton(i18nString2(UIStrings2.startRecording), () => this.toggleRecordAction.execute(), {
        jslogContext: this.toggleRecordAction.id(),
        variant: "tonal"
        /* Buttons.Button.Variant.TONAL */
      });
      widget.contentElement.append(button);
    }
    return widget;
  }
  buildReloadPromptPage(message, className) {
    const widget = new UI2.Widget.VBox();
    const reasonDiv = document.createElement("div");
    reasonDiv.classList.add("message");
    reasonDiv.textContent = message;
    widget.contentElement.appendChild(reasonDiv);
    this.inlineReloadButton = UI2.UIUtils.createInlineButton(UI2.Toolbar.Toolbar.createActionButton("inspector-main.reload"));
    const messageElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.reloadPrompt, { PH1: this.inlineReloadButton });
    messageElement.classList.add("message");
    widget.contentElement.appendChild(messageElement);
    widget.element.classList.add(className);
    return widget;
  }
  clear() {
    if (this.model) {
      this.model.reset();
    }
    this.reset();
  }
  reset() {
    if (this.decorationManager) {
      this.decorationManager.dispose();
      this.decorationManager = null;
    }
    this.listView.reset();
    this.listView.detach();
    this.landingPage.show(this.coverageResultsElement);
    this.statusMessageElement.textContent = "";
    this.filterInput.setEnabled(false);
    this.filterByTypeComboBox.setEnabled(false);
    this.contentScriptsCheckbox.setEnabled(false);
    this.exportAction.setEnabled(false);
  }
  toggleRecording() {
    const enable = !this.toggleRecordAction.toggled();
    if (enable) {
      void this.startRecording({ reload: false, jsCoveragePerBlock: this.isBlockCoverageSelected() });
    } else {
      void this.stopRecording();
    }
  }
  isBlockCoverageSelected() {
    const option = this.coverageTypeComboBox.selectedOption();
    const coverageType = Number(option ? option.value : Number.NaN);
    return coverageType === 2;
  }
  selectCoverageType(jsCoveragePerBlock) {
    const selectedIndex = jsCoveragePerBlock ? 1 : 0;
    this.coverageTypeComboBox.setSelectedIndex(selectedIndex);
  }
  onCoverageTypeComboBoxSelectionChanged() {
    this.coverageTypeComboBoxSetting.set(this.coverageTypeComboBox.selectedIndex());
  }
  async startRecording(options) {
    let hadFocus, reloadButtonFocused;
    if (this.startWithReloadButton?.element.hasFocus() || this.inlineReloadButton?.hasFocus()) {
      reloadButtonFocused = true;
    } else if (this.hasFocus()) {
      hadFocus = true;
    }
    this.reset();
    const mainTarget = SDK2.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!mainTarget) {
      return;
    }
    const { reload, jsCoveragePerBlock } = { reload: false, jsCoveragePerBlock: false, ...options };
    if (!this.model || reload) {
      this.model = mainTarget.model(CoverageModel);
    }
    if (!this.model) {
      return;
    }
    Host.userMetrics.actionTaken(Host.UserMetrics.Action.CoverageStarted);
    if (jsCoveragePerBlock) {
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.CoverageStartedPerBlock);
    }
    const success = await this.model.start(Boolean(jsCoveragePerBlock));
    if (!success) {
      return;
    }
    this.selectCoverageType(Boolean(jsCoveragePerBlock));
    this.model.addEventListener(Events.CoverageUpdated, this.onCoverageDataReceived, this);
    this.model.addEventListener(Events.SourceMapResolved, this.updateListView, this);
    const resourceTreeModel = mainTarget.model(SDK2.ResourceTreeModel.ResourceTreeModel);
    SDK2.TargetManager.TargetManager.instance().addModelListener(SDK2.ResourceTreeModel.ResourceTreeModel, SDK2.ResourceTreeModel.Events.PrimaryPageChanged, this.onPrimaryPageChanged, this);
    this.decorationManager = new CoverageDecorationManager(this.model, Workspace7.Workspace.WorkspaceImpl.instance(), Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance(), Bindings.CSSWorkspaceBinding.CSSWorkspaceBinding.instance());
    this.toggleRecordAction.setToggled(true);
    this.clearAction.setEnabled(false);
    if (this.startWithReloadButton) {
      this.startWithReloadButton.setEnabled(false);
      this.startWithReloadButton.setVisible(false);
      this.toggleRecordButton.setEnabled(true);
      this.toggleRecordButton.setVisible(true);
      if (reloadButtonFocused) {
        this.toggleRecordButton.focus();
      }
    }
    this.coverageTypeComboBox.setEnabled(false);
    this.filterInput.setEnabled(true);
    this.filterByTypeComboBox.setEnabled(true);
    this.contentScriptsCheckbox.setEnabled(true);
    if (this.landingPage.isShowing()) {
      this.landingPage.detach();
    }
    this.listView.show(this.coverageResultsElement);
    if (hadFocus && !reloadButtonFocused) {
      this.listView.focus();
    }
    if (reload && resourceTreeModel) {
      resourceTreeModel.reloadPage();
    } else {
      void this.model.startPolling();
    }
  }
  onCoverageDataReceived(event) {
    const data = event.data;
    this.updateViews(data);
  }
  updateListView() {
    this.listView.update(this.model?.entries() || []);
  }
  async stopRecording() {
    SDK2.TargetManager.TargetManager.instance().removeModelListener(SDK2.ResourceTreeModel.ResourceTreeModel, SDK2.ResourceTreeModel.Events.PrimaryPageChanged, this.onPrimaryPageChanged, this);
    if (this.hasFocus()) {
      this.listView.focus();
    }
    if (this.model) {
      await this.model.stop();
      this.model.removeEventListener(Events.CoverageUpdated, this.onCoverageDataReceived, this);
    }
    this.toggleRecordAction.setToggled(false);
    this.coverageTypeComboBox.setEnabled(true);
    if (this.startWithReloadButton) {
      this.startWithReloadButton.setEnabled(true);
      this.startWithReloadButton.setVisible(true);
      this.toggleRecordButton.setEnabled(false);
      this.toggleRecordButton.setVisible(false);
    }
    this.clearAction.setEnabled(true);
  }
  async onPrimaryPageChanged(event) {
    const frame = event.data.frame;
    const coverageModel = frame.resourceTreeModel().target().model(CoverageModel);
    if (!coverageModel) {
      return;
    }
    if (this.model !== coverageModel) {
      if (this.model) {
        await this.model.stop();
        this.model.removeEventListener(Events.CoverageUpdated, this.onCoverageDataReceived, this);
      }
      this.model = coverageModel;
      const success = await this.model.start(this.isBlockCoverageSelected());
      if (!success) {
        return;
      }
      this.model.addEventListener(Events.CoverageUpdated, this.onCoverageDataReceived, this);
      this.decorationManager = new CoverageDecorationManager(this.model, Workspace7.Workspace.WorkspaceImpl.instance(), Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance(), Bindings.CSSWorkspaceBinding.CSSWorkspaceBinding.instance());
    }
    if (this.bfcacheReloadPromptPage.isShowing()) {
      this.bfcacheReloadPromptPage.detach();
      this.listView.show(this.coverageResultsElement);
    }
    if (this.activationReloadPromptPage.isShowing()) {
      this.activationReloadPromptPage.detach();
      this.listView.show(this.coverageResultsElement);
    }
    if (frame.backForwardCacheDetails.restoredFromCache) {
      this.listView.detach();
      this.bfcacheReloadPromptPage.show(this.coverageResultsElement);
    }
    if (event.data.type === "Activation") {
      this.listView.detach();
      this.activationReloadPromptPage.show(this.coverageResultsElement);
    }
    this.model.reset();
    this.decorationManager && this.decorationManager.reset();
    this.listView.reset();
    void this.model.startPolling();
  }
  updateViews(updatedEntries) {
    this.updateStats();
    this.listView.update(this.model?.entries() || []);
    this.exportAction.setEnabled(this.model !== null && this.model.entries().length > 0);
    this.decorationManager && this.decorationManager.update(updatedEntries);
  }
  updateStats() {
    const all = { total: 0, unused: 0 };
    const filtered = { total: 0, unused: 0 };
    const filterApplied = this.textFilterRegExp !== null;
    if (this.model) {
      for (const info of this.model.entries()) {
        all.total += info.size();
        all.unused += info.unusedSize();
        if (this.isVisible(false, info)) {
          if (this.textFilterRegExp?.test(info.url())) {
            filtered.total += info.size();
            filtered.unused += info.unusedSize();
          } else {
            for (const childInfo of info.sourcesURLCoverageInfo.values()) {
              if (this.isVisible(false, childInfo)) {
                filtered.total += childInfo.size();
                filtered.unused += childInfo.unusedSize();
              }
            }
          }
        }
      }
    }
    this.statusMessageElement.textContent = filterApplied ? i18nString2(UIStrings2.filteredSTotalS, { PH1: formatStat(filtered), PH2: formatStat(all) }) : formatStat(all);
    function formatStat({ total, unused }) {
      const used = total - unused;
      const percentUsed = total ? Math.round(100 * used / total) : 0;
      return i18nString2(UIStrings2.sOfSSUsedSoFarSUnused, {
        PH1: i18n3.ByteUtilities.bytesToString(used),
        PH2: i18n3.ByteUtilities.bytesToString(total),
        PH3: percentUsed,
        PH4: i18n3.ByteUtilities.bytesToString(unused)
      });
    }
  }
  onFilterChanged() {
    if (!this.listView) {
      return;
    }
    const text = this.filterInput.value();
    this.textFilterRegExp = text ? Platform3.StringUtilities.createPlainTextSearchRegex(text, "i") : null;
    this.listView.updateFilterAndHighlight(this.textFilterRegExp);
    this.updateStats();
  }
  onFilterByTypeChanged() {
    if (!this.listView) {
      return;
    }
    Host.userMetrics.actionTaken(Host.UserMetrics.Action.CoverageReportFiltered);
    const option = this.filterByTypeComboBox.selectedOption();
    const type = option?.value;
    this.typeFilterValue = parseInt(type || "", 10) || null;
    this.listView.updateFilterAndHighlight(this.textFilterRegExp);
    this.updateStats();
  }
  isVisible(ignoreTextFilter, coverageInfo) {
    const url = coverageInfo.url();
    if (url.startsWith(_CoverageView.EXTENSION_BINDINGS_URL_PREFIX)) {
      return false;
    }
    if (coverageInfo.isContentScript() && !this.showContentScriptsSetting.get()) {
      return false;
    }
    if (this.typeFilterValue && !(coverageInfo.type() & this.typeFilterValue)) {
      return false;
    }
    if (coverageInfo.sourcesURLCoverageInfo.size > 0) {
      for (const sourceURLCoverageInfo of coverageInfo.sourcesURLCoverageInfo.values()) {
        if (this.isVisible(ignoreTextFilter, sourceURLCoverageInfo)) {
          return true;
        }
      }
    }
    return ignoreTextFilter || !this.textFilterRegExp || this.textFilterRegExp.test(url);
  }
  async exportReport() {
    const fos = new Bindings.FileUtils.FileOutputStream();
    const fileName = `Coverage-${Platform3.DateUtilities.toISO8601Compact(/* @__PURE__ */ new Date())}.json`;
    const accepted = await fos.open(fileName);
    if (!accepted) {
      return;
    }
    this.model && await this.model.exportReport(fos);
  }
  selectCoverageItemByUrl(url) {
    this.listView.selectByUrl(url);
  }
  static EXTENSION_BINDINGS_URL_PREFIX = "extensions::";
  wasShown() {
    UI2.Context.Context.instance().setFlavor(_CoverageView, this);
    super.wasShown();
  }
  willHide() {
    super.willHide();
    UI2.Context.Context.instance().setFlavor(_CoverageView, null);
  }
};
var ActionDelegate = class {
  handleAction(_context, actionId) {
    const coverageViewId = "coverage";
    void UI2.ViewManager.ViewManager.instance().showView(
      coverageViewId,
      /** userGesture= */
      false,
      /** omitFocus= */
      true
    ).then(() => {
      const view = UI2.ViewManager.ViewManager.instance().view(coverageViewId);
      return view?.widget();
    }).then((widget) => this.innerHandleAction(widget, actionId));
    return true;
  }
  innerHandleAction(coverageView, actionId) {
    switch (actionId) {
      case "coverage.toggle-recording":
        coverageView.toggleRecording();
        break;
      case "coverage.start-with-reload":
        void coverageView.startRecording({ reload: true, jsCoveragePerBlock: coverageView.isBlockCoverageSelected() });
        break;
      case "coverage.clear":
        coverageView.clear();
        break;
      case "coverage.export":
        void coverageView.exportReport();
        break;
      default:
        console.assert(false, `Unknown action: ${actionId}`);
    }
  }
};
export {
  CoverageDecorationManager_exports as CoverageDecorationManager,
  CoverageListView_exports as CoverageListView,
  CoverageModel_exports as CoverageModel,
  CoverageView_exports as CoverageView
};
//# sourceMappingURL=coverage.js.map
