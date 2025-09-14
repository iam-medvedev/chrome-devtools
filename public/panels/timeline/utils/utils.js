var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/timeline/utils/AICallTree.js
var AICallTree_exports = {};
__export(AICallTree_exports, {
  AICallTree: () => AICallTree,
  ExcludeCompileCodeFilter: () => ExcludeCompileCodeFilter,
  MinDurationFilter: () => MinDurationFilter,
  SelectedEventDurationFilter: () => SelectedEventDurationFilter
});
import * as Root from "./../../../core/root/root.js";
import * as Trace from "./../../../models/trace/trace.js";
import * as SourceMapsResolver from "./../../../models/trace_source_maps_resolver/trace_source_maps_resolver.js";
function depthFirstWalk(nodes, callback) {
  for (const node of nodes) {
    if (callback?.(node)) {
      break;
    }
    depthFirstWalk(node.children().values(), callback);
  }
}
var AICallTree = class _AICallTree {
  selectedNode;
  rootNode;
  parsedTrace;
  constructor(selectedNode, rootNode, parsedTrace) {
    this.selectedNode = selectedNode;
    this.rootNode = rootNode;
    this.parsedTrace = parsedTrace;
  }
  static findEventsForThread({ thread, parsedTrace, bounds }) {
    const threadEvents = parsedTrace.data.Renderer.processes.get(thread.pid)?.threads.get(thread.tid)?.entries;
    if (!threadEvents) {
      return null;
    }
    return threadEvents.filter((e) => Trace.Helpers.Timing.eventIsInBounds(e, bounds));
  }
  static findMainThreadTasks({ thread, parsedTrace, bounds }) {
    const threadEvents = parsedTrace.data.Renderer.processes.get(thread.pid)?.threads.get(thread.tid)?.entries;
    if (!threadEvents) {
      return null;
    }
    return threadEvents.filter(Trace.Types.Events.isRunTask).filter((e) => Trace.Helpers.Timing.eventIsInBounds(e, bounds));
  }
  /**
   * Builds a call tree representing all calls within the given timeframe for
   * the provided thread.
   * Events that are less than 0.05% of the range duration are removed.
   */
  static fromTimeOnThread({ thread, parsedTrace, bounds }) {
    const overlappingEvents = this.findEventsForThread({ thread, parsedTrace, bounds });
    if (!overlappingEvents) {
      return null;
    }
    const visibleEventsFilter = new Trace.Extras.TraceFilter.VisibleEventsFilter(Trace.Styles.visibleTypes());
    const minDuration = Trace.Types.Timing.Micro(bounds.range * 5e-3);
    const minDurationFilter = new MinDurationFilter(minDuration);
    const compileCodeFilter = new ExcludeCompileCodeFilter();
    const rootNode = new Trace.Extras.TraceTree.TopDownRootNode(overlappingEvents, {
      filters: [minDurationFilter, compileCodeFilter, visibleEventsFilter],
      startTime: Trace.Helpers.Timing.microToMilli(bounds.min),
      endTime: Trace.Helpers.Timing.microToMilli(bounds.max),
      doNotAggregate: true,
      includeInstantEvents: true
    });
    const instance2 = new _AICallTree(null, rootNode, parsedTrace);
    return instance2;
  }
  /**
   * Attempts to build an AICallTree from a given selected event. It also
   * validates that this event is one that we support being used with the AI
   * Assistance panel, which [as of January 2025] means:
   * 1. It is on the main thread.
   * 2. It exists in either the Renderer or Sample handler's entryToNode map.
   * This filters out other events we make such as SyntheticLayoutShifts which are not valid
   * If the event is not valid, or there is an unexpected error building the tree, `null` is returned.
   */
  static fromEvent(selectedEvent, parsedTrace) {
    if (Trace.Types.Events.isPerformanceMark(selectedEvent)) {
      return null;
    }
    const threads = Trace.Handlers.Threads.threadsInTrace(parsedTrace.data);
    const thread = threads.find((t) => t.pid === selectedEvent.pid && t.tid === selectedEvent.tid);
    if (!thread) {
      return null;
    }
    if (thread.type !== "MAIN_THREAD" && thread.type !== "CPU_PROFILE") {
      return null;
    }
    const data = parsedTrace.data;
    if (!data.Renderer.entryToNode.has(selectedEvent) && !data.Samples.entryToNode.has(selectedEvent)) {
      return null;
    }
    const allEventsEnabled = Root.Runtime.experiments.isEnabled("timeline-show-all-events");
    const { startTime, endTime } = Trace.Helpers.Timing.eventTimingsMilliSeconds(selectedEvent);
    const selectedEventBounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(Trace.Helpers.Timing.milliToMicro(startTime), Trace.Helpers.Timing.milliToMicro(endTime));
    let threadEvents = data.Renderer.processes.get(selectedEvent.pid)?.threads.get(selectedEvent.tid)?.entries;
    if (!threadEvents) {
      threadEvents = data.Samples.profilesInProcess.get(selectedEvent.pid)?.get(selectedEvent.tid)?.profileCalls;
    }
    if (!threadEvents) {
      console.warn(`AICallTree: could not find thread for selected entry: ${selectedEvent}`);
      return null;
    }
    const overlappingEvents = threadEvents.filter((e) => Trace.Helpers.Timing.eventIsInBounds(e, selectedEventBounds));
    const filters = [new SelectedEventDurationFilter(selectedEvent), new ExcludeCompileCodeFilter(selectedEvent)];
    if (!allEventsEnabled) {
      filters.push(new Trace.Extras.TraceFilter.VisibleEventsFilter(Trace.Styles.visibleTypes()));
    }
    const rootNode = new Trace.Extras.TraceTree.TopDownRootNode(overlappingEvents, {
      filters,
      startTime,
      endTime,
      includeInstantEvents: true
    });
    let selectedNode = null;
    depthFirstWalk([rootNode].values(), (node) => {
      if (node.event === selectedEvent) {
        selectedNode = node;
        return true;
      }
      return;
    });
    if (selectedNode === null) {
      console.warn(`Selected event ${selectedEvent} not found within its own tree.`);
      return null;
    }
    const instance2 = new _AICallTree(selectedNode, rootNode, parsedTrace);
    return instance2;
  }
  /**
   * Iterates through nodes level by level using a Breadth-First Search (BFS) algorithm.
   * BFS is important here because the serialization process assumes that direct child nodes
   * will have consecutive IDs (horizontally across each depth).
   *
   * Example tree with IDs:
   *
   *             1
   *            / \
   *           2   3
   *        / / /   \
   *      4  5 6     7
   *
   * Here, node with an ID 2 has consecutive children in the 4-6 range.
   *
   * To optimize for space, the provided `callback` function is called to serialize
   * each node as it's visited during the BFS traversal.
   *
   * When serializing a node, the callback receives:
   * 1. The current node being visited.
   * 2. The ID assigned to this current node (a simple incrementing index based on visit order).
   * 3. The predicted starting ID for the children of this current node.
   *
   * A serialized node needs to know the ID range of its children. However,
   * child node IDs are only assigned when those children are themselves visited.
   * To handle this, we predict the starting ID for a node's children. This prediction
   * is based on a running count of all nodes that have ever been added to the BFS queue.
   * Since IDs are assigned consecutively as nodes are processed from the queue, and a
   * node's children are added to the end of the queue when the parent is visited,
   * their eventual IDs will follow this running count.
   */
  breadthFirstWalk(nodes, serializeNodeCallback) {
    const queue = Array.from(nodes);
    let nodeIndex = 1;
    let nodesAddedToQueueCount = queue.length;
    let currentNode = queue.shift();
    while (currentNode) {
      if (currentNode.children().size > 0) {
        serializeNodeCallback(currentNode, nodeIndex, nodesAddedToQueueCount + 1);
      } else {
        serializeNodeCallback(currentNode, nodeIndex);
      }
      queue.push(...Array.from(currentNode.children().values()));
      nodesAddedToQueueCount += currentNode.children().size;
      currentNode = queue.shift();
      nodeIndex++;
    }
  }
  serialize(headerLevel = 1) {
    const header = "#".repeat(headerLevel);
    const allUrls = [];
    let nodesStr = "";
    this.breadthFirstWalk(this.rootNode.children().values(), (node, nodeId, childStartingNode) => {
      nodesStr += "\n" + this.stringifyNode(node, nodeId, this.parsedTrace, this.selectedNode, allUrls, childStartingNode);
    });
    let output = "";
    if (allUrls.length) {
      output += `
${header} All URLs:

` + allUrls.map((url, index) => `  * ${index}: ${url}`).join("\n");
    }
    output += `

${header} Call tree:
${nodesStr}`;
    return output;
  }
  /*
  * Each node is serialized into a single line to minimize token usage in the context window.
  * The format is a semicolon-separated string with the following fields:
  * Format: `id;name;duration;selfTime;urlIndex;childRange;[S]
  *
  *   1. `id`: A unique numerical identifier for the node assigned by BFS.
  *   2. `name`: The name of the event represented by the node.
  *   3. `duration`: The total duration of the event in milliseconds, rounded to one decimal place.
  *   4. `selfTime`: The self time of the event in milliseconds, rounded to one decimal place.
  *   5. `urlIndex`: An index referencing a URL in the `allUrls` array. If no URL is present, this is an empty string.
  *   6. `childRange`: A string indicating the range of IDs for the node's children. Children should always have consecutive IDs.
  *                    If there is only one child, it's a single ID.
  *   7. `[S]`: An optional marker indicating that this node is the selected node.
  *
  * Example:
  *   `1;Parse HTML;2.5;0.3;0;2-5;S`
  *   This represents:
  *     - Node ID 1
  *     - Name "Parse HTML"
  *     - Total duration of 2.5ms
  *     - Self time of 0.3ms
  *     - URL index 0 (meaning the URL is the first one in the `allUrls` array)
  *     - Child range of IDs 2 to 5
  *     - This node is the selected node (S marker)
  */
  stringifyNode(node, nodeId, parsedTrace, selectedNode, allUrls, childStartingNodeIndex) {
    const event = node.event;
    if (!event) {
      throw new Error("Event required");
    }
    const idStr = String(nodeId);
    const name = Trace.Name.forEntry(event, parsedTrace);
    const roundToTenths = (num) => {
      if (!num) {
        return "";
      }
      return String(Math.round(num * 10) / 10);
    };
    const durationStr = roundToTenths(node.totalTime);
    const selfTimeStr = roundToTenths(node.selfTime);
    const url = SourceMapsResolver.SourceMapsResolver.resolvedURLForEntry(parsedTrace, event);
    let urlIndexStr = "";
    if (url) {
      const existingIndex = allUrls.indexOf(url);
      if (existingIndex === -1) {
        urlIndexStr = String(allUrls.push(url) - 1);
      } else {
        urlIndexStr = String(existingIndex);
      }
    }
    const children = Array.from(node.children().values());
    let childRangeStr = "";
    if (childStartingNodeIndex) {
      childRangeStr = children.length === 1 ? String(childStartingNodeIndex) : `${childStartingNodeIndex}-${childStartingNodeIndex + children.length}`;
    }
    const selectedMarker = selectedNode?.event === node.event ? "S" : "";
    let line = idStr;
    line += ";" + name;
    line += ";" + durationStr;
    line += ";" + selfTimeStr;
    line += ";" + urlIndexStr;
    line += ";" + childRangeStr;
    if (selectedMarker) {
      line += ";" + selectedMarker;
    }
    return line;
  }
  // Only used for debugging.
  logDebug() {
    const str = this.serialize();
    console.log("\u{1F386}", str);
    if (str.length > 45e3) {
      console.warn("Output will likely not fit in the context window. Expect an AIDA error.");
    }
  }
};
var ExcludeCompileCodeFilter = class extends Trace.Extras.TraceFilter.TraceFilter {
  #selectedEvent = null;
  constructor(selectedEvent) {
    super();
    this.#selectedEvent = selectedEvent ?? null;
  }
  accept(event) {
    if (this.#selectedEvent && event === this.#selectedEvent) {
      return true;
    }
    return event.name !== "V8.CompileCode";
  }
};
var SelectedEventDurationFilter = class extends Trace.Extras.TraceFilter.TraceFilter {
  #minDuration;
  #selectedEvent;
  constructor(selectedEvent) {
    super();
    this.#minDuration = Trace.Types.Timing.Micro((selectedEvent.dur ?? 1) * 5e-3);
    this.#selectedEvent = selectedEvent;
  }
  accept(event) {
    if (event === this.#selectedEvent) {
      return true;
    }
    return event.dur ? event.dur >= this.#minDuration : false;
  }
};
var MinDurationFilter = class extends Trace.Extras.TraceFilter.TraceFilter {
  #minDuration;
  constructor(minDuration) {
    super();
    this.#minDuration = minDuration;
  }
  accept(event) {
    return event.dur ? event.dur >= this.#minDuration : false;
  }
};

// gen/front_end/panels/timeline/utils/AIContext.js
var AIContext_exports = {};
__export(AIContext_exports, {
  AgentFocus: () => AgentFocus,
  getPerformanceAgentFocusFromModel: () => getPerformanceAgentFocusFromModel
});
import * as Trace2 from "./../../../models/trace/trace.js";
function getFirstInsightSet(insights) {
  return [...insights.values()].filter((insightSet) => insightSet.navigation).at(0) ?? null;
}
var AgentFocus = class _AgentFocus {
  static full(parsedTrace) {
    if (!parsedTrace.insights) {
      throw new Error("missing insights");
    }
    const insightSet = getFirstInsightSet(parsedTrace.insights);
    return new _AgentFocus({
      type: "full",
      parsedTrace,
      insightSet
    });
  }
  static fromInsight(parsedTrace, insight) {
    if (!parsedTrace.insights) {
      throw new Error("missing insights");
    }
    const insightSet = getFirstInsightSet(parsedTrace.insights);
    return new _AgentFocus({
      type: "insight",
      parsedTrace,
      insightSet,
      insight
    });
  }
  static fromCallTree(callTree) {
    const insights = callTree.parsedTrace.insights;
    let insightSet = null;
    if (insights) {
      const callTreeTimeRange = Trace2.Helpers.Timing.traceWindowFromEvent(callTree.rootNode.event);
      insightSet = insights.values().find((set) => Trace2.Helpers.Timing.boundsIncludeTimeRange({
        timeRange: callTreeTimeRange,
        bounds: set.bounds
      })) ?? getFirstInsightSet(insights);
    }
    return new _AgentFocus({ type: "call-tree", parsedTrace: callTree.parsedTrace, insightSet, callTree });
  }
  #data;
  constructor(data) {
    this.#data = data;
  }
  get data() {
    return this.#data;
  }
};
function getPerformanceAgentFocusFromModel(model) {
  const parsedTrace = model.parsedTrace();
  if (!parsedTrace) {
    return null;
  }
  return AgentFocus.full(parsedTrace);
}

// gen/front_end/panels/timeline/utils/EntryNodes.js
var EntryNodes_exports = {};
__export(EntryNodes_exports, {
  domNodesForBackendIds: () => domNodesForBackendIds,
  nodeIdsForEvent: () => nodeIdsForEvent,
  relatedDOMNodesForEvent: () => relatedDOMNodesForEvent
});
import * as SDK from "./../../../core/sdk/sdk.js";
import * as Trace3 from "./../../../models/trace/trace.js";
var nodeIdsForEventCache = /* @__PURE__ */ new WeakMap();
var domNodesForEventCache = /* @__PURE__ */ new WeakMap();
function nodeIdsForEvent(parsedTrace, event) {
  const fromCache = nodeIdsForEventCache.get(event);
  if (fromCache) {
    return fromCache;
  }
  const foundIds = /* @__PURE__ */ new Set();
  if (Trace3.Types.Events.isLayout(event)) {
    event.args.endData?.layoutRoots.forEach((root) => foundIds.add(root.nodeId));
  } else if (Trace3.Types.Events.isSyntheticLayoutShift(event) && event.args.data?.impacted_nodes) {
    event.args.data.impacted_nodes.forEach((node) => foundIds.add(node.node_id));
  } else if (Trace3.Types.Events.isLargestContentfulPaintCandidate(event) && typeof event.args.data?.nodeId !== "undefined") {
    foundIds.add(event.args.data.nodeId);
  } else if (Trace3.Types.Events.isPaint(event) && typeof event.args.data.nodeId !== "undefined") {
    foundIds.add(event.args.data.nodeId);
  } else if (Trace3.Types.Events.isPaintImage(event) && typeof event.args.data.nodeId !== "undefined") {
    foundIds.add(event.args.data.nodeId);
  } else if (Trace3.Types.Events.isScrollLayer(event) && typeof event.args.data.nodeId !== "undefined") {
    foundIds.add(event.args.data.nodeId);
  } else if (Trace3.Types.Events.isSyntheticAnimation(event) && typeof event.args.data.beginEvent.args.data.nodeId !== "undefined") {
    foundIds.add(event.args.data.beginEvent.args.data.nodeId);
  } else if (Trace3.Types.Events.isDecodeImage(event)) {
    const paintImageEvent = parsedTrace.data.ImagePainting.paintImageForEvent.get(event);
    if (typeof paintImageEvent?.args.data.nodeId !== "undefined") {
      foundIds.add(paintImageEvent.args.data.nodeId);
    }
  } else if (Trace3.Types.Events.isDrawLazyPixelRef(event) && event.args?.LazyPixelRef) {
    const paintImageEvent = parsedTrace.data.ImagePainting.paintImageByDrawLazyPixelRef.get(event.args.LazyPixelRef);
    if (typeof paintImageEvent?.args.data.nodeId !== "undefined") {
      foundIds.add(paintImageEvent.args.data.nodeId);
    }
  } else if (Trace3.Types.Events.isParseMetaViewport(event) && typeof event.args?.data.node_id !== "undefined") {
    foundIds.add(event.args.data.node_id);
  }
  nodeIdsForEventCache.set(event, foundIds);
  return foundIds;
}
async function relatedDOMNodesForEvent(parsedTrace, event) {
  const fromCache = domNodesForEventCache.get(event);
  if (fromCache) {
    return fromCache;
  }
  const nodeIds = nodeIdsForEvent(parsedTrace, event);
  if (nodeIds.size) {
    const frame = event.args?.data?.frame;
    const result = await domNodesForBackendIds(frame, nodeIds);
    domNodesForEventCache.set(event, result);
    return result;
  }
  return null;
}
async function domNodesForBackendIds(frameId, nodeIds) {
  const target = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
  const domModel = target?.model(SDK.DOMModel.DOMModel);
  const resourceTreeModel = target?.model(SDK.ResourceTreeModel.ResourceTreeModel);
  if (!domModel || !resourceTreeModel) {
    return /* @__PURE__ */ new Map();
  }
  if (frameId && !resourceTreeModel.frames().some((frame) => frame.id === frameId)) {
    return /* @__PURE__ */ new Map();
  }
  return await domModel.pushNodesByBackendIdsToFrontend(nodeIds) || /* @__PURE__ */ new Map();
}

// gen/front_end/panels/timeline/utils/FreshRecording.js
var FreshRecording_exports = {};
__export(FreshRecording_exports, {
  Tracker: () => Tracker
});
var instance = null;
var Tracker = class _Tracker {
  #freshRecordings = /* @__PURE__ */ new WeakSet();
  static instance(opts = { forceNew: false }) {
    if (!instance || opts.forceNew) {
      instance = new _Tracker();
    }
    return instance;
  }
  registerFreshRecording(data) {
    this.#freshRecordings.add(data);
  }
  recordingIsFresh(data) {
    return this.#freshRecordings.has(data);
  }
};

// gen/front_end/panels/timeline/utils/Helpers.js
var Helpers_exports = {};
__export(Helpers_exports, {
  RevealableInsight: () => RevealableInsight,
  createUrlLabels: () => createUrlLabels,
  formatOriginWithEntity: () => formatOriginWithEntity,
  getThrottlingRecommendations: () => getThrottlingRecommendations,
  shortenUrl: () => shortenUrl
});
import * as Platform from "./../../../core/platform/platform.js";
import * as SDK2 from "./../../../core/sdk/sdk.js";
import * as CrUXManager from "./../../../models/crux-manager/crux-manager.js";
var MAX_ORIGIN_LENGTH = 60;
function getThrottlingRecommendations() {
  let cpuOption = SDK2.CPUThrottlingManager.CalibratedMidTierMobileThrottlingOption;
  if (cpuOption.rate() === 0) {
    cpuOption = SDK2.CPUThrottlingManager.MidTierThrottlingOption;
  }
  let networkConditions = null;
  const response = CrUXManager.CrUXManager.instance().getSelectedFieldMetricData("round_trip_time");
  if (response?.percentiles) {
    const rtt = Number(response.percentiles.p75);
    networkConditions = SDK2.NetworkManager.getRecommendedNetworkPreset(rtt);
  }
  return {
    cpuOption,
    networkConditions
  };
}
function createTrimmedUrlSearch(url) {
  const maxSearchValueLength = 8;
  let search = "";
  for (const [key, value] of url.searchParams) {
    if (search) {
      search += "&";
    }
    if (value) {
      search += `${key}=${Platform.StringUtilities.trimEndWithMaxLength(value, maxSearchValueLength)}`;
    } else {
      search += key;
    }
  }
  if (search) {
    search = "?" + search;
  }
  return search;
}
function createUrlLabels(urls) {
  const labels = [];
  const isAllHttps = urls.every((url) => url.protocol === "https:");
  for (const [index, url] of urls.entries()) {
    const previousUrl = urls[index - 1];
    const sameHostAndProtocol = previousUrl && url.host === previousUrl.host && url.protocol === previousUrl.protocol;
    let elideHost = sameHostAndProtocol;
    let elideProtocol = isAllHttps;
    if (index === 0 && isAllHttps) {
      elideHost = true;
      elideProtocol = true;
    }
    const search = createTrimmedUrlSearch(url);
    if (!elideProtocol) {
      labels.push(`${url.protocol}//${url.host}${url.pathname}${search}`);
    } else if (!elideHost) {
      labels.push(`${url.host}${url.pathname}${search}`);
    } else {
      labels.push(`${url.pathname}${search}`);
    }
  }
  return labels.map((label) => label.length > 1 && label.endsWith("/") ? label.substring(0, label.length - 1) : label);
}
function shortenUrl(url, maxChars = 20) {
  const parts = url.pathname === "/" ? [url.host] : url.pathname.split("/");
  let shortenedUrl = parts.at(-1) ?? "";
  if (shortenedUrl.length > maxChars) {
    return Platform.StringUtilities.trimMiddle(shortenedUrl, maxChars);
  }
  let i = parts.length - 1;
  while (--i >= 0) {
    if (shortenedUrl.length + parts[i].length <= maxChars) {
      shortenedUrl = `${parts[i]}/${shortenedUrl}`;
    }
  }
  return shortenedUrl;
}
function formatOriginWithEntity(url, entity, parenthesizeEntity) {
  const origin = url.origin.replace("https://", "");
  if (!entity) {
    return origin;
  }
  let originWithEntity;
  if (entity.isUnrecognized) {
    originWithEntity = `${origin}`;
  } else {
    originWithEntity = parenthesizeEntity ? `${origin} (${entity.name})` : `${origin} - ${entity.name}`;
  }
  originWithEntity = Platform.StringUtilities.trimEndWithMaxLength(originWithEntity, MAX_ORIGIN_LENGTH);
  return originWithEntity;
}
var RevealableInsight = class {
  insight;
  constructor(insight) {
    this.insight = insight;
  }
};

// gen/front_end/panels/timeline/utils/IgnoreList.js
var IgnoreList_exports = {};
__export(IgnoreList_exports, {
  getIgnoredReasonString: () => getIgnoredReasonString,
  isIgnoreListedEntry: () => isIgnoreListedEntry
});
import * as i18n from "./../../../core/i18n/i18n.js";
import * as Trace4 from "./../../../models/trace/trace.js";
import * as SourceMapsResolver3 from "./../../../models/trace_source_maps_resolver/trace_source_maps_resolver.js";
import * as Workspace from "./../../../models/workspace/workspace.js";
var UIStrings = {
  /**
   * @description Refers to when skipping content scripts is enabled and the current script is ignored because it's a content script.
   */
  skipContentScripts: "Content script",
  /**
   * @description Refers to when skipping known third party scripts is enabled and the current script is ignored because it's a known third party script.
   */
  skip3rdPartyScripts: "Marked with ignoreList in source map",
  /**
   * @description Refers to when skipping anonymous scripts is enabled and the current script is ignored because is an anonymous script.
   */
  skipAnonymousScripts: "Anonymous script",
  /**
   * @description Refers to when the current script is ignored because of an unknown rule.
   */
  unknown: "Unknown"
};
var str_ = i18n.i18n.registerUIStrings("panels/timeline/utils/IgnoreList.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
function getUrlAndIgnoreListOptions(entry) {
  const rawUrl = entry.callFrame.url;
  const sourceMappedData = SourceMapsResolver3.SourceMapsResolver.resolvedCodeLocationForEntry(entry);
  const script = sourceMappedData?.script;
  const uiSourceCode = sourceMappedData?.devtoolsLocation?.uiSourceCode;
  const resolvedUrl = uiSourceCode?.url();
  const isKnownThirdParty = uiSourceCode?.isKnownThirdParty();
  const isContentScript = script?.isContentScript();
  const ignoreListOptions = { isContentScript, isKnownThirdParty };
  const url = resolvedUrl || rawUrl;
  return { url, ignoreListOptions };
}
function isIgnoreListedEntry(entry) {
  if (!Trace4.Types.Events.isProfileCall(entry)) {
    return false;
  }
  const { url, ignoreListOptions } = getUrlAndIgnoreListOptions(entry);
  return isIgnoreListedURL(url, ignoreListOptions);
}
function isIgnoreListedURL(url, options) {
  return Workspace.IgnoreListManager.IgnoreListManager.instance().isUserIgnoreListedURL(url, options);
}
function getIgnoredReasonString(entry) {
  if (!Trace4.Types.Events.isProfileCall(entry)) {
    console.warn("Ignore list feature should only support ProfileCall.");
    return "";
  }
  const { url, ignoreListOptions } = getUrlAndIgnoreListOptions(entry);
  const ignoreListMgr = Workspace.IgnoreListManager.IgnoreListManager.instance();
  if (ignoreListOptions.isContentScript && ignoreListMgr.skipContentScripts) {
    return i18nString(UIStrings.skipContentScripts);
  }
  if (ignoreListOptions.isKnownThirdParty && ignoreListMgr.automaticallyIgnoreListKnownThirdPartyScripts) {
    return i18nString(UIStrings.skip3rdPartyScripts);
  }
  if (!url) {
    if (ignoreListMgr.skipAnonymousScripts) {
      return i18nString(UIStrings.skipAnonymousScripts);
    }
    return "";
  }
  const regex = ignoreListMgr.getFirstMatchedRegex(url);
  return regex ? regex.source : i18nString(UIStrings.unknown);
}

// gen/front_end/panels/timeline/utils/ImageCache.js
var ImageCache_exports = {};
__export(ImageCache_exports, {
  cacheForTesting: () => cacheForTesting,
  emitter: () => emitter,
  getOrQueue: () => getOrQueue,
  loadImageForTesting: () => loadImageForTesting,
  preload: () => preload
});
import * as Trace5 from "./../../../models/trace/trace.js";
var imageCache = /* @__PURE__ */ new WeakMap();
var emitter = new EventTarget();
function getOrQueue(screenshot) {
  if (imageCache.has(screenshot)) {
    return imageCache.get(screenshot) ?? null;
  }
  const uri = Trace5.Handlers.ModelHandlers.Screenshots.screenshotImageDataUri(screenshot);
  loadImage(uri).then((imageOrNull) => {
    imageCache.set(screenshot, imageOrNull);
    emitter.dispatchEvent(new CustomEvent("screenshot-loaded", { detail: { screenshot, image: imageOrNull } }));
  }).catch(() => {
  });
  return null;
}
function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => resolve(null));
    image.src = url;
  });
}
function preload(screenshots) {
  const promises = screenshots.map((screenshot) => {
    if (imageCache.has(screenshot)) {
      return;
    }
    const uri = Trace5.Handlers.ModelHandlers.Screenshots.screenshotImageDataUri(screenshot);
    return loadImage(uri).then((image) => {
      imageCache.set(screenshot, image);
      return;
    });
  });
  return Promise.all(promises);
}
var cacheForTesting = imageCache;
var loadImageForTesting = loadImage;

// gen/front_end/panels/timeline/utils/InsightAIContext.js
var InsightAIContext_exports = {};
__export(InsightAIContext_exports, {
  AIQueries: () => AIQueries
});
import * as Trace6 from "./../../../models/trace/trace.js";
var AIQueries = class {
  static findMainThread(navigationId, parsedTrace) {
    let mainThreadPID = null;
    let mainThreadTID = null;
    if (navigationId) {
      const navigation = parsedTrace.data.Meta.navigationsByNavigationId.get(navigationId);
      if (navigation?.args.data?.isOutermostMainFrame) {
        mainThreadPID = navigation.pid;
        mainThreadTID = navigation.tid;
      }
    }
    const threads = Trace6.Handlers.Threads.threadsInTrace(parsedTrace.data);
    const thread = threads.find((thread2) => {
      if (mainThreadPID && mainThreadTID) {
        return thread2.pid === mainThreadPID && thread2.tid === mainThreadTID;
      }
      return thread2.type === "MAIN_THREAD";
    });
    return thread ?? null;
  }
  /**
   * Returns bottom up activity for the given range.
   */
  static mainThreadActivityBottomUp(navigationId, bounds, parsedTrace) {
    const thread = this.findMainThread(navigationId, parsedTrace);
    if (!thread) {
      return null;
    }
    const events = AICallTree.findEventsForThread({ thread, parsedTrace, bounds });
    if (!events) {
      return null;
    }
    const visibleEvents = Trace6.Helpers.Trace.VISIBLE_TRACE_EVENT_TYPES.values().toArray();
    const filter = new Trace6.Extras.TraceFilter.VisibleEventsFilter(visibleEvents.concat([
      "SyntheticNetworkRequest"
      /* Trace.Types.Events.Name.SYNTHETIC_NETWORK_REQUEST */
    ]));
    const startTime = Trace6.Helpers.Timing.microToMilli(bounds.min);
    const endTime = Trace6.Helpers.Timing.microToMilli(bounds.max);
    return new Trace6.Extras.TraceTree.BottomUpRootNode(events, {
      textFilter: new Trace6.Extras.TraceFilter.ExclusiveNameFilter([]),
      filters: [filter],
      startTime,
      endTime
    });
  }
  /**
   * Returns an AI Call Tree representing the activity on the main thread for
   * the relevant time range of the given insight.
   */
  static mainThreadActivityTopDown(navigationId, bounds, parsedTrace) {
    const thread = this.findMainThread(navigationId, parsedTrace);
    if (!thread) {
      return null;
    }
    return AICallTree.fromTimeOnThread({
      thread: {
        pid: thread.pid,
        tid: thread.tid
      },
      parsedTrace,
      bounds
    });
  }
  /**
   * Returns the top longest tasks as AI Call Trees.
   */
  static longestTasks(navigationId, bounds, parsedTrace, limit = 3) {
    const thread = this.findMainThread(navigationId, parsedTrace);
    if (!thread) {
      return null;
    }
    const tasks = AICallTree.findMainThreadTasks({ thread, parsedTrace, bounds });
    if (!tasks) {
      return null;
    }
    const topTasks = tasks.filter((e) => e.name === "RunTask").sort((a, b) => b.dur - a.dur).slice(0, limit);
    return topTasks.map((task) => {
      const tree = AICallTree.fromEvent(task, parsedTrace);
      if (tree) {
        tree.selectedNode = null;
      }
      return tree;
    }).filter((tree) => !!tree);
  }
};

// gen/front_end/panels/timeline/utils/Treemap.js
var Treemap_exports = {};
__export(Treemap_exports, {
  createTreemapData: () => createTreemapData,
  makeScriptNode: () => makeScriptNode,
  openTreemap: () => openTreemap
});
import * as Common from "./../../../core/common/common.js";
import * as i18n3 from "./../../../core/i18n/i18n.js";
import * as Trace7 from "./../../../models/trace/trace.js";
async function toCompressedBase64(string) {
  const compAb = await Common.Gzip.compress(string);
  const strb64 = await Common.Base64.encode(compAb);
  return strb64;
}
async function openTabWithUrlData(data, urlString, windowName) {
  const url = new URL(urlString);
  url.hash = await toCompressedBase64(JSON.stringify(data));
  url.searchParams.set("gzip", "1");
  window.open(url.toString(), windowName);
}
function openTreemap(treemapData, mainDocumentUrl, windowNameSuffix) {
  const treemapOptions = {
    lhr: {
      mainDocumentUrl,
      audits: {
        "script-treemap-data": {
          details: {
            type: "treemap-data",
            nodes: treemapData
          }
        }
      },
      configSettings: {
        locale: i18n3.DevToolsLocale.DevToolsLocale.instance().locale
      }
    },
    initialView: "duplicate-modules"
  };
  const url = "https://googlechrome.github.io/lighthouse/treemap/";
  const windowName = `treemap-${windowNameSuffix}`;
  void openTabWithUrlData(treemapOptions, url, windowName);
}
function makeScriptNode(src, sourceRoot, sourcesData) {
  function newNode(name) {
    return {
      name,
      resourceBytes: 0,
      encodedBytes: void 0
    };
  }
  const sourceRootNode = newNode(sourceRoot);
  function addAllNodesInSourcePath(source, data) {
    let node = sourceRootNode;
    sourceRootNode.resourceBytes += data.resourceBytes;
    const sourcePathSegments = source.replace(sourceRoot, "").split(/\/+/);
    sourcePathSegments.forEach((sourcePathSegment, i) => {
      if (sourcePathSegment.length === 0) {
        return;
      }
      const isLeaf = i === sourcePathSegments.length - 1;
      let child = node.children?.find((child2) => child2.name === sourcePathSegment);
      if (!child) {
        child = newNode(sourcePathSegment);
        node.children = node.children || [];
        node.children.push(child);
      }
      node = child;
      node.resourceBytes += data.resourceBytes;
      if (isLeaf && data.duplicatedNormalizedModuleName !== void 0) {
        node.duplicatedNormalizedModuleName = data.duplicatedNormalizedModuleName;
      }
    });
  }
  for (const [source, data] of Object.entries(sourcesData)) {
    addAllNodesInSourcePath(source, data);
  }
  function collapseAll(node) {
    while (node.children && node.children.length === 1) {
      const child = node.children[0];
      node.name += "/" + child.name;
      if (child.duplicatedNormalizedModuleName) {
        node.duplicatedNormalizedModuleName = child.duplicatedNormalizedModuleName;
      }
      node.children = child.children;
    }
    if (node.children) {
      for (const child of node.children) {
        collapseAll(child);
      }
    }
  }
  collapseAll(sourceRootNode);
  if (!sourceRootNode.name) {
    return {
      ...sourceRootNode,
      name: src,
      children: sourceRootNode.children
    };
  }
  const scriptNode = { ...sourceRootNode };
  scriptNode.name = src;
  scriptNode.children = [sourceRootNode];
  return scriptNode;
}
function getNetworkRequestSizes(request) {
  const resourceSize = request.args.data.decodedBodyLength;
  const transferSize = request.args.data.encodedDataLength;
  const headersTransferSize = 0;
  return { resourceSize, transferSize, headersTransferSize };
}
function createTreemapData(scripts, duplication) {
  const nodes = [];
  const htmlNodesByFrameId = /* @__PURE__ */ new Map();
  for (const script of scripts.scripts) {
    if (!script.url) {
      continue;
    }
    const name = script.url;
    const sizes = Trace7.Handlers.ModelHandlers.Scripts.getScriptGeneratedSizes(script);
    let node;
    if (script.sourceMap && sizes && !("errorMessage" in sizes)) {
      const sourcesData = {};
      for (const [source, resourceBytes] of Object.entries(sizes.files)) {
        const sourceData = {
          resourceBytes,
          encodedBytes: void 0
        };
        const key = Trace7.Extras.ScriptDuplication.normalizeSource(source);
        if (duplication.has(key)) {
          sourceData.duplicatedNormalizedModuleName = key;
        }
        sourcesData[source] = sourceData;
      }
      if (sizes.unmappedBytes) {
        const sourceData = {
          resourceBytes: sizes.unmappedBytes
        };
        sourcesData["(unmapped)"] = sourceData;
      }
      node = makeScriptNode(script.url, script.url, sourcesData);
    } else {
      node = {
        name,
        resourceBytes: script.content?.length ?? 0,
        encodedBytes: void 0
      };
    }
    if (script.inline) {
      let htmlNode = htmlNodesByFrameId.get(script.frame);
      if (!htmlNode) {
        htmlNode = {
          name,
          resourceBytes: 0,
          encodedBytes: void 0,
          children: []
        };
        htmlNodesByFrameId.set(script.frame, htmlNode);
        nodes.push(htmlNode);
      }
      htmlNode.resourceBytes += node.resourceBytes;
      node.name = script.content ? "(inline) " + script.content.trimStart().substring(0, 15) + "\u2026" : "(inline)";
      htmlNode.children?.push(node);
    } else {
      nodes.push(node);
      if (script.request) {
        const { transferSize, headersTransferSize } = getNetworkRequestSizes(script.request);
        const bodyTransferSize = transferSize - headersTransferSize;
        node.encodedBytes = bodyTransferSize;
      } else {
        node.encodedBytes = node.resourceBytes;
      }
    }
  }
  for (const [frameId, node] of htmlNodesByFrameId) {
    const script = scripts.scripts.find((s) => s.request?.args.data.resourceType === "Document" && s.request?.args.data.frame === frameId);
    if (script?.request) {
      const { resourceSize, transferSize, headersTransferSize } = getNetworkRequestSizes(script.request);
      const inlineScriptsPct = node.resourceBytes / resourceSize;
      const bodyTransferSize = transferSize - headersTransferSize;
      node.encodedBytes = Math.floor(bodyTransferSize * inlineScriptsPct);
    } else {
      node.encodedBytes = node.resourceBytes;
    }
  }
  return nodes;
}
export {
  AICallTree_exports as AICallTree,
  AIContext_exports as AIContext,
  EntryNodes_exports as EntryNodes,
  FreshRecording_exports as FreshRecording,
  Helpers_exports as Helpers,
  IgnoreList_exports as IgnoreList,
  ImageCache_exports as ImageCache,
  InsightAIContext_exports as InsightAIContext,
  Treemap_exports as Treemap
};
//# sourceMappingURL=utils.js.map
