var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/models/trace/trace.prebundle.js
import * as Extras from "./extras/extras.js";
import * as Handlers4 from "./handlers/handlers.js";
import * as Helpers3 from "./helpers/helpers.js";
import * as Insights2 from "./insights/insights.js";
import * as Lantern3 from "./lantern/lantern.js";

// gen/front_end/models/trace/LanternComputationData.js
var LanternComputationData_exports = {};
__export(LanternComputationData_exports, {
  createGraph: () => createGraph,
  createNetworkRequests: () => createNetworkRequests,
  createProcessedNavigation: () => createProcessedNavigation
});
import * as Handlers from "./handlers/handlers.js";
import * as Lantern from "./lantern/lantern.js";
function createProcessedNavigation(parsedTrace, frameId, navigationId) {
  const scoresByNav = parsedTrace.PageLoadMetrics.metricScoresByFrameId.get(frameId);
  if (!scoresByNav) {
    throw new Lantern.Core.LanternError("missing metric scores for frame");
  }
  const scores = scoresByNav.get(navigationId);
  if (!scores) {
    throw new Lantern.Core.LanternError("missing metric scores for specified navigation");
  }
  const getTimestampOrUndefined = (metric) => {
    const metricScore = scores.get(metric);
    if (!metricScore?.event) {
      return;
    }
    return metricScore.event.ts;
  };
  const getTimestamp = (metric) => {
    const metricScore = scores.get(metric);
    if (!metricScore?.event) {
      throw new Lantern.Core.LanternError(`missing metric: ${metric}`);
    }
    return metricScore.event.ts;
  };
  return {
    timestamps: {
      firstContentfulPaint: getTimestamp(
        "FCP"
        /* Handlers.ModelHandlers.PageLoadMetrics.MetricName.FCP */
      ),
      largestContentfulPaint: getTimestampOrUndefined(
        "LCP"
        /* Handlers.ModelHandlers.PageLoadMetrics.MetricName.LCP */
      )
    }
  };
}
function createParsedUrl(url) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  return {
    scheme: url.protocol.split(":")[0],
    // Intentional, DevTools uses different terminology
    host: url.hostname,
    securityOrigin: url.origin
  };
}
function findWorkerThreads(trace) {
  const workerThreads = /* @__PURE__ */ new Map();
  const workerCreationEvents = ["ServiceWorker thread", "DedicatedWorker thread"];
  for (const event of trace.traceEvents) {
    if (event.name !== "thread_name" || !event.args.name) {
      continue;
    }
    if (!workerCreationEvents.includes(event.args.name)) {
      continue;
    }
    const tids = workerThreads.get(event.pid);
    if (tids) {
      tids.push(event.tid);
    } else {
      workerThreads.set(event.pid, [event.tid]);
    }
  }
  return workerThreads;
}
function createLanternRequest(parsedTrace, workerThreads, request) {
  if (request.args.data.hasResponse && request.args.data.connectionId === void 0) {
    throw new Lantern.Core.LanternError("Trace is too old");
  }
  let url;
  try {
    url = new URL(request.args.data.url);
  } catch {
    return;
  }
  const timing = request.args.data.timing ? {
    // These two timings are not included in the trace.
    workerFetchStart: -1,
    workerRespondWithSettled: -1,
    ...request.args.data.timing
  } : void 0;
  const networkRequestTime = timing ? timing.requestTime * 1e3 : request.args.data.syntheticData.downloadStart / 1e3;
  let fromWorker = false;
  const tids = workerThreads.get(request.pid);
  if (tids?.includes(request.tid)) {
    fromWorker = true;
  }
  if (parsedTrace.Workers.workerIdByThread.has(request.tid)) {
    fromWorker = true;
  }
  const initiator = request.args.data.initiator ?? {
    type: "other"
    /* Protocol.Network.InitiatorType.Other */
  };
  if (request.args.data.stackTrace) {
    const callFrames = request.args.data.stackTrace.map((f) => {
      return {
        scriptId: String(f.scriptId),
        url: f.url,
        lineNumber: f.lineNumber - 1,
        columnNumber: f.columnNumber - 1,
        functionName: f.functionName
      };
    });
    initiator.stack = { callFrames };
  }
  let resourceType = request.args.data.resourceType;
  if (request.args.data.initiator?.fetchType === "xmlhttprequest") {
    resourceType = "XHR";
  } else if (request.args.data.initiator?.fetchType === "fetch") {
    resourceType = "Fetch";
  }
  let resourceSize = request.args.data.decodedBodyLength ?? 0;
  if (url.protocol === "data:" && resourceSize === 0) {
    const commaIndex = url.pathname.indexOf(",");
    if (url.pathname.substring(0, commaIndex).includes(";base64")) {
      resourceSize = atob(url.pathname.substring(commaIndex + 1)).length;
    } else {
      resourceSize = url.pathname.length - commaIndex - 1;
    }
  }
  return {
    rawRequest: request,
    requestId: request.args.data.requestId,
    connectionId: request.args.data.connectionId ?? 0,
    connectionReused: request.args.data.connectionReused ?? false,
    url: request.args.data.url,
    protocol: request.args.data.protocol,
    parsedURL: createParsedUrl(url),
    documentURL: request.args.data.requestingFrameUrl,
    rendererStartTime: request.ts / 1e3,
    networkRequestTime,
    responseHeadersEndTime: request.args.data.syntheticData.downloadStart / 1e3,
    networkEndTime: request.args.data.syntheticData.finishTime / 1e3,
    transferSize: request.args.data.encodedDataLength,
    resourceSize,
    fromDiskCache: request.args.data.syntheticData.isDiskCached,
    fromMemoryCache: request.args.data.syntheticData.isMemoryCached,
    isLinkPreload: request.args.data.isLinkPreload,
    finished: request.args.data.finished,
    failed: request.args.data.failed,
    statusCode: request.args.data.statusCode,
    initiator,
    timing,
    resourceType,
    mimeType: request.args.data.mimeType,
    priority: request.args.data.priority,
    frameId: request.args.data.frame,
    fromWorker,
    // Set later.
    redirects: void 0,
    redirectSource: void 0,
    redirectDestination: void 0,
    initiatorRequest: void 0
  };
}
function chooseInitiatorRequest(request, requestsByURL) {
  if (request.redirectSource) {
    return request.redirectSource;
  }
  const initiatorURL = Lantern.Graph.PageDependencyGraph.getNetworkInitiators(request)[0];
  let candidates = requestsByURL.get(initiatorURL) || [];
  candidates = candidates.filter((c) => {
    return c.responseHeadersEndTime <= request.rendererStartTime && c.finished && !c.failed;
  });
  if (candidates.length > 1) {
    const nonPrefetchCandidates = candidates.filter((cand) => cand.resourceType !== Lantern.Types.NetworkRequestTypes.Other);
    if (nonPrefetchCandidates.length) {
      candidates = nonPrefetchCandidates;
    }
  }
  if (candidates.length > 1) {
    const sameFrameCandidates = candidates.filter((cand) => cand.frameId === request.frameId);
    if (sameFrameCandidates.length) {
      candidates = sameFrameCandidates;
    }
  }
  if (candidates.length > 1 && request.initiator.type === "parser") {
    const documentCandidates = candidates.filter((cand) => cand.resourceType === Lantern.Types.NetworkRequestTypes.Document);
    if (documentCandidates.length) {
      candidates = documentCandidates;
    }
  }
  if (candidates.length > 1) {
    const linkPreloadCandidates = candidates.filter((c) => c.isLinkPreload);
    if (linkPreloadCandidates.length) {
      const nonPreloadCandidates = candidates.filter((c) => !c.isLinkPreload);
      const allPreloaded = nonPreloadCandidates.every((c) => c.fromDiskCache || c.fromMemoryCache);
      if (nonPreloadCandidates.length && allPreloaded) {
        candidates = linkPreloadCandidates;
      }
    }
  }
  return candidates.length === 1 ? candidates[0] : null;
}
function linkInitiators(lanternRequests) {
  const requestsByURL = /* @__PURE__ */ new Map();
  for (const request of lanternRequests) {
    const requests = requestsByURL.get(request.url) || [];
    requests.push(request);
    requestsByURL.set(request.url, requests);
  }
  for (const request of lanternRequests) {
    const initiatorRequest = chooseInitiatorRequest(request, requestsByURL);
    if (initiatorRequest) {
      request.initiatorRequest = initiatorRequest;
    }
  }
}
function createNetworkRequests(trace, parsedTrace, startTime = 0, endTime = Number.POSITIVE_INFINITY) {
  const workerThreads = findWorkerThreads(trace);
  const lanternRequestsNoRedirects = [];
  for (const request of parsedTrace.NetworkRequests.byTime) {
    if (request.ts >= startTime && request.ts < endTime) {
      const lanternRequest = createLanternRequest(parsedTrace, workerThreads, request);
      if (lanternRequest) {
        lanternRequestsNoRedirects.push(lanternRequest);
      }
    }
  }
  const lanternRequests = [];
  for (const request of [...lanternRequestsNoRedirects]) {
    if (!request.rawRequest) {
      continue;
    }
    const redirects = request.rawRequest.args.data.redirects;
    if (!redirects.length) {
      lanternRequests.push(request);
      continue;
    }
    const requestChain = [];
    for (const redirect of redirects) {
      const redirectedRequest = structuredClone(request);
      redirectedRequest.networkRequestTime = redirect.ts / 1e3;
      redirectedRequest.rendererStartTime = redirectedRequest.networkRequestTime;
      redirectedRequest.networkEndTime = (redirect.ts + redirect.dur) / 1e3;
      redirectedRequest.responseHeadersEndTime = redirectedRequest.networkEndTime;
      redirectedRequest.timing = {
        requestTime: redirectedRequest.networkRequestTime / 1e3,
        receiveHeadersStart: redirectedRequest.responseHeadersEndTime,
        receiveHeadersEnd: redirectedRequest.responseHeadersEndTime,
        proxyStart: -1,
        proxyEnd: -1,
        dnsStart: -1,
        dnsEnd: -1,
        connectStart: -1,
        connectEnd: -1,
        sslStart: -1,
        sslEnd: -1,
        sendStart: -1,
        sendEnd: -1,
        workerStart: -1,
        workerReady: -1,
        workerFetchStart: -1,
        workerRespondWithSettled: -1,
        pushStart: -1,
        pushEnd: -1
      };
      redirectedRequest.url = redirect.url;
      redirectedRequest.parsedURL = createParsedUrl(redirect.url);
      redirectedRequest.statusCode = 302;
      redirectedRequest.resourceType = void 0;
      redirectedRequest.transferSize = 400;
      requestChain.push(redirectedRequest);
      lanternRequests.push(redirectedRequest);
    }
    requestChain.push(request);
    lanternRequests.push(request);
    for (let i = 0; i < requestChain.length; i++) {
      const request2 = requestChain[i];
      if (i > 0) {
        request2.redirectSource = requestChain[i - 1];
        request2.redirects = requestChain.slice(0, i);
      }
      if (i !== requestChain.length - 1) {
        request2.redirectDestination = requestChain[i + 1];
      }
    }
    for (let i = 1; i < requestChain.length; i++) {
      requestChain[i].requestId = `${requestChain[i - 1].requestId}:redirect`;
    }
  }
  linkInitiators(lanternRequests);
  return lanternRequests;
}
function collectMainThreadEvents(trace, parsedTrace) {
  const Meta = parsedTrace.Meta;
  const mainFramePids = Meta.mainFrameNavigations.length ? new Set(Meta.mainFrameNavigations.map((nav) => nav.pid)) : Meta.topLevelRendererIds;
  const rendererPidToTid = /* @__PURE__ */ new Map();
  for (const pid of mainFramePids) {
    const threads = Meta.threadsInProcess.get(pid) ?? [];
    let found = false;
    for (const [tid, thread] of threads) {
      if (thread.args.name === "CrRendererMain") {
        rendererPidToTid.set(pid, tid);
        found = true;
        break;
      }
    }
    if (found) {
      continue;
    }
    for (const [tid, thread] of threads) {
      if (thread.args.name === "CrBrowserMain") {
        rendererPidToTid.set(pid, tid);
        found = true;
        break;
      }
    }
  }
  return trace.traceEvents.filter((e) => rendererPidToTid.get(e.pid) === e.tid);
}
function createGraph(requests, trace, parsedTrace, url) {
  const mainThreadEvents = collectMainThreadEvents(trace, parsedTrace);
  if (!url) {
    url = {
      requestedUrl: requests[0].url,
      mainDocumentUrl: ""
    };
    let request = requests[0];
    while (request.redirectDestination) {
      request = request.redirectDestination;
    }
    url.mainDocumentUrl = request.url;
  }
  return Lantern.Graph.PageDependencyGraph.createGraph(mainThreadEvents, requests, url);
}

// gen/front_end/models/trace/ModelImpl.js
var ModelImpl_exports = {};
__export(ModelImpl_exports, {
  Model: () => Model,
  ModelUpdateEvent: () => ModelUpdateEvent,
  isModelUpdateDataComplete: () => isModelUpdateDataComplete
});
import * as Platform from "./../../core/platform/platform.js";
import * as Handlers3 from "./handlers/handlers.js";
import * as Helpers2 from "./helpers/helpers.js";

// gen/front_end/models/trace/Processor.js
var Processor_exports = {};
__export(Processor_exports, {
  TraceParseProgressEvent: () => TraceParseProgressEvent,
  TraceProcessor: () => TraceProcessor,
  sortHandlers: () => sortHandlers
});
import * as Handlers2 from "./handlers/handlers.js";
import * as Helpers from "./helpers/helpers.js";
import * as Insights from "./insights/insights.js";
import * as Lantern2 from "./lantern/lantern.js";
import * as Types2 from "./types/types.js";
var TraceParseProgressEvent = class _TraceParseProgressEvent extends Event {
  data;
  static eventName = "traceparseprogress";
  constructor(data, init = { bubbles: true }) {
    super(_TraceParseProgressEvent.eventName, init);
    this.data = data;
  }
};
function calculateProgress(value, phase) {
  if (phase === 0.8) {
    return value * (0.8 - 0.2) + 0.2;
  }
  return value * phase;
}
var TraceProcessor = class _TraceProcessor extends EventTarget {
  // We force the Meta handler to be enabled, so the TraceHandlers type here is
  // the model handlers the user passes in and the Meta handler.
  #traceHandlers;
  #status = "IDLE";
  #modelConfiguration = Types2.Configuration.defaults();
  #data = null;
  #insights = null;
  static createWithAllHandlers() {
    return new _TraceProcessor(Handlers2.ModelHandlers, Types2.Configuration.defaults());
  }
  /**
   * This function is kept for testing with `stub`.
   */
  static getInsightRunners() {
    return { ...Insights.Models };
  }
  constructor(traceHandlers, modelConfiguration) {
    super();
    this.#verifyHandlers(traceHandlers);
    this.#traceHandlers = {
      Meta: Handlers2.ModelHandlers.Meta,
      ...traceHandlers
    };
    if (modelConfiguration) {
      this.#modelConfiguration = modelConfiguration;
    }
    this.#passConfigToHandlers();
  }
  #passConfigToHandlers() {
    for (const handler of Object.values(this.#traceHandlers)) {
      if ("handleUserConfig" in handler && handler.handleUserConfig) {
        handler.handleUserConfig(this.#modelConfiguration);
      }
    }
  }
  /**
   * When the user passes in a set of handlers, we want to ensure that we have all
   * the required handlers. Handlers can depend on other handlers, so if the user
   * passes in FooHandler which depends on BarHandler, they must also pass in
   * BarHandler too. This method verifies that all dependencies are met, and
   * throws if not.
   **/
  #verifyHandlers(providedHandlers) {
    if (Object.keys(providedHandlers).length === Object.keys(Handlers2.ModelHandlers).length) {
      return;
    }
    const requiredHandlerKeys = /* @__PURE__ */ new Set();
    for (const [handlerName, handler] of Object.entries(providedHandlers)) {
      requiredHandlerKeys.add(handlerName);
      const deps = "deps" in handler ? handler.deps() : [];
      for (const depName of deps) {
        requiredHandlerKeys.add(depName);
      }
    }
    const providedHandlerKeys = new Set(Object.keys(providedHandlers));
    requiredHandlerKeys.delete("Meta");
    for (const requiredKey of requiredHandlerKeys) {
      if (!providedHandlerKeys.has(requiredKey)) {
        throw new Error(`Required handler ${requiredKey} not provided.`);
      }
    }
  }
  reset() {
    if (this.#status === "PARSING") {
      throw new Error("Trace processor can't reset while parsing.");
    }
    const handlers = Object.values(this.#traceHandlers);
    for (const handler of handlers) {
      handler.reset();
    }
    this.#data = null;
    this.#insights = null;
    this.#status = "IDLE";
  }
  async parse(traceEvents, options) {
    if (this.#status !== "IDLE") {
      throw new Error(`Trace processor can't start parsing when not idle. Current state: ${this.#status}`);
    }
    options.logger?.start("total");
    try {
      this.#status = "PARSING";
      options.logger?.start("parse");
      await this.#computeParsedTrace(traceEvents, options);
      options.logger?.end("parse");
      if (this.#data && !options.isCPUProfile) {
        options.logger?.start("insights");
        this.#computeInsights(this.#data, traceEvents, options);
        options.logger?.end("insights");
      }
      this.#status = "FINISHED_PARSING";
    } catch (e) {
      this.#status = "ERRORED_WHILE_PARSING";
      throw e;
    } finally {
      options.logger?.end("total");
    }
  }
  /**
   * Run all the handlers and set the result to `#data`.
   */
  async #computeParsedTrace(traceEvents, options) {
    const eventsPerChunk = 5e4;
    const sortedHandlers = [...sortHandlers(this.#traceHandlers).entries()];
    for (const [, handler] of sortedHandlers) {
      handler.reset();
    }
    options.logger?.start("parse:handleEvent");
    for (let i = 0; i < traceEvents.length; ++i) {
      if (i % eventsPerChunk === 0 && i) {
        const percent = calculateProgress(
          i / traceEvents.length,
          0.2
          /* ProgressPhase.HANDLE_EVENT */
        );
        this.dispatchEvent(new TraceParseProgressEvent({ percent }));
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      const event = traceEvents[i];
      for (let j = 0; j < sortedHandlers.length; ++j) {
        const [, handler] = sortedHandlers[j];
        handler.handleEvent(event);
      }
    }
    options.logger?.end("parse:handleEvent");
    const finalizeOptions = {
      ...options,
      allTraceEvents: traceEvents
    };
    for (let i = 0; i < sortedHandlers.length; i++) {
      const [name, handler] = sortedHandlers[i];
      if (handler.finalize) {
        options.logger?.start(`parse:${name}:finalize`);
        await new Promise((resolve) => setTimeout(resolve, 0));
        await handler.finalize(finalizeOptions);
        options.logger?.end(`parse:${name}:finalize`);
      }
      const percent = calculateProgress(
        i / sortedHandlers.length,
        0.8
        /* ProgressPhase.FINALIZE */
      );
      this.dispatchEvent(new TraceParseProgressEvent({ percent }));
    }
    const shallowClone = (value, recurse = true) => {
      if (value instanceof Map) {
        return new Map(value);
      }
      if (value instanceof Set) {
        return new Set(value);
      }
      if (Array.isArray(value)) {
        return [...value];
      }
      if (typeof value === "object" && value && recurse) {
        const obj = {};
        for (const [key, v] of Object.entries(value)) {
          obj[key] = shallowClone(v, false);
        }
        return obj;
      }
      return value;
    };
    options.logger?.start("parse:clone");
    const parsedTrace = {};
    for (const [name, handler] of Object.entries(this.#traceHandlers)) {
      const data = shallowClone(handler.data());
      Object.assign(parsedTrace, { [name]: data });
    }
    options.logger?.end("parse:clone");
    this.dispatchEvent(new TraceParseProgressEvent({
      percent: 1
      /* ProgressPhase.CLONE */
    }));
    this.#data = parsedTrace;
  }
  get parsedTrace() {
    if (this.#status !== "FINISHED_PARSING") {
      return null;
    }
    return this.#data;
  }
  get insights() {
    if (this.#status !== "FINISHED_PARSING") {
      return null;
    }
    return this.#insights;
  }
  #createLanternContext(parsedTrace, traceEvents, frameId, navigationId, options) {
    if (!parsedTrace.NetworkRequests || !parsedTrace.Workers || !parsedTrace.PageLoadMetrics) {
      return;
    }
    if (!parsedTrace.NetworkRequests.byTime.length) {
      throw new Lantern2.Core.LanternError("No network requests found in trace");
    }
    const navStarts = parsedTrace.Meta.navigationsByFrameId.get(frameId);
    const navStartIndex = navStarts?.findIndex((n) => n.args.data?.navigationId === navigationId);
    if (!navStarts || navStartIndex === void 0 || navStartIndex === -1) {
      throw new Lantern2.Core.LanternError("Could not find navigation start");
    }
    const startTime = navStarts[navStartIndex].ts;
    const endTime = navStartIndex + 1 < navStarts.length ? navStarts[navStartIndex + 1].ts : Number.POSITIVE_INFINITY;
    const boundedTraceEvents = traceEvents.filter((e) => e.ts >= startTime && e.ts < endTime);
    const trace = {
      traceEvents: boundedTraceEvents
    };
    const requests = createNetworkRequests(trace, parsedTrace, startTime, endTime);
    const graph = createGraph(requests, trace, parsedTrace);
    const processedNavigation = createProcessedNavigation(parsedTrace, frameId, navigationId);
    const networkAnalysis = Lantern2.Core.NetworkAnalyzer.analyze(requests);
    if (!networkAnalysis) {
      return;
    }
    const lanternSettings = {
      // TODO(crbug.com/372674229): if devtools throttling was on, does this network analysis capture
      // that? Do we need to set 'devtools' throttlingMethod?
      networkAnalysis,
      throttlingMethod: "provided",
      ...options.lanternSettings
    };
    const simulator = Lantern2.Simulation.Simulator.createSimulator(lanternSettings);
    const computeData = { graph, simulator, processedNavigation };
    const fcpResult = Lantern2.Metrics.FirstContentfulPaint.compute(computeData);
    const lcpResult = Lantern2.Metrics.LargestContentfulPaint.compute(computeData, { fcpResult });
    const interactiveResult = Lantern2.Metrics.Interactive.compute(computeData, { lcpResult });
    const tbtResult = Lantern2.Metrics.TotalBlockingTime.compute(computeData, { fcpResult, interactiveResult });
    const metrics = {
      firstContentfulPaint: fcpResult,
      interactive: interactiveResult,
      largestContentfulPaint: lcpResult,
      totalBlockingTime: tbtResult
    };
    return { requests, graph, simulator, metrics };
  }
  /**
   * Sort the insight models based on the impact of each insight's estimated savings, additionally weighted by the
   * worst metrics according to field data (if present).
   */
  sortInsightSet(insightSet, metadata) {
    const baselineOrder = {
      INPBreakdown: null,
      LCPBreakdown: null,
      LCPDiscovery: null,
      CLSCulprits: null,
      RenderBlocking: null,
      NetworkDependencyTree: null,
      ImageDelivery: null,
      DocumentLatency: null,
      FontDisplay: null,
      Viewport: null,
      DOMSize: null,
      ThirdParties: null,
      DuplicatedJavaScript: null,
      SlowCSSSelector: null,
      ForcedReflow: null,
      Cache: null,
      ModernHTTP: null,
      LegacyJavaScript: null
    };
    const weights = Insights.Common.calculateMetricWeightsForSorting(insightSet, metadata);
    const observedLcpMicro = Insights.Common.getLCP(this.#insights, insightSet.id)?.value;
    const observedLcp = observedLcpMicro ? Helpers.Timing.microToMilli(observedLcpMicro) : Types2.Timing.Milli(0);
    const observedCls = Insights.Common.getCLS(this.#insights, insightSet.id).value;
    const observedInpMicro = Insights.Common.getINP(this.#insights, insightSet.id)?.value;
    const observedInp = observedInpMicro ? Helpers.Timing.microToMilli(observedInpMicro) : Types2.Timing.Milli(200);
    const observedLcpScore = observedLcp !== void 0 ? Insights.Common.evaluateLCPMetricScore(observedLcp) : void 0;
    const observedInpScore = Insights.Common.evaluateINPMetricScore(observedInp);
    const observedClsScore = Insights.Common.evaluateCLSMetricScore(observedCls);
    const insightToSortingRank = /* @__PURE__ */ new Map();
    for (const [name, model] of Object.entries(insightSet.model)) {
      const lcp = model.metricSavings?.LCP ?? 0;
      const inp = model.metricSavings?.INP ?? 0;
      const cls = model.metricSavings?.CLS ?? 0;
      const lcpPostSavings = observedLcp !== void 0 ? Math.max(0, observedLcp - lcp) : void 0;
      const inpPostSavings = Math.max(0, observedInp - inp);
      const clsPostSavings = Math.max(0, observedCls - cls);
      let score = 0;
      if (weights.lcp && lcp && observedLcpScore !== void 0 && lcpPostSavings !== void 0) {
        score += weights.lcp * (Insights.Common.evaluateLCPMetricScore(lcpPostSavings) - observedLcpScore);
      }
      if (weights.inp && inp && observedInpScore !== void 0) {
        score += weights.inp * (Insights.Common.evaluateINPMetricScore(inpPostSavings) - observedInpScore);
      }
      if (weights.cls && cls && observedClsScore !== void 0) {
        score += weights.cls * (Insights.Common.evaluateCLSMetricScore(clsPostSavings) - observedClsScore);
      }
      insightToSortingRank.set(name, score);
    }
    const baselineOrderKeys = Object.keys(baselineOrder);
    const orderedKeys = Object.keys(insightSet.model);
    orderedKeys.sort((a, b) => {
      const a1 = baselineOrderKeys.indexOf(a);
      const b1 = baselineOrderKeys.indexOf(b);
      if (a1 >= 0 && b1 >= 0) {
        return a1 - b1;
      }
      if (a1 >= 0) {
        return -1;
      }
      if (b1 >= 0) {
        return 1;
      }
      return 0;
    });
    orderedKeys.sort((a, b) => (insightToSortingRank.get(b) ?? 0) - (insightToSortingRank.get(a) ?? 0));
    const newModel = {};
    for (const key of orderedKeys) {
      const model = insightSet.model[key];
      newModel[key] = model;
    }
    insightSet.model = newModel;
  }
  #computeInsightSet(parsedTrace, context, options) {
    let id, urlString, navigation;
    if (context.navigation) {
      id = context.navigationId;
      urlString = parsedTrace.Meta.finalDisplayUrlByNavigationId.get(context.navigationId) ?? parsedTrace.Meta.mainFrameURL;
      navigation = context.navigation;
    } else {
      id = Types2.Events.NO_NAVIGATION;
      urlString = parsedTrace.Meta.finalDisplayUrlByNavigationId.get("") ?? parsedTrace.Meta.mainFrameURL;
    }
    const insightSetModel = {};
    for (const [name, insight] of Object.entries(_TraceProcessor.getInsightRunners())) {
      let model;
      try {
        options.logger?.start(`insights:${name}`);
        model = insight.generateInsight(parsedTrace, context);
        model.frameId = context.frameId;
        const navId = context.navigation?.args.data?.navigationId;
        if (navId) {
          model.navigationId = navId;
        }
        model.createOverlays = () => {
          return insight.createOverlays(model);
        };
      } catch (err) {
        model = err;
      } finally {
        options.logger?.end(`insights:${name}`);
      }
      Object.assign(insightSetModel, { [name]: model });
    }
    const isNavigation = id === Types2.Events.NO_NAVIGATION;
    const trivialThreshold = Helpers.Timing.milliToMicro(Types2.Timing.Milli(5e3));
    const everyInsightPasses = Object.values(insightSetModel).filter((model) => !(model instanceof Error)).every((model) => model.state === "pass");
    const noLcp = !insightSetModel.LCPBreakdown.lcpEvent;
    const noInp = !insightSetModel.INPBreakdown.longestInteractionEvent;
    const noLayoutShifts = insightSetModel.CLSCulprits.shifts?.size === 0;
    const shouldExclude = isNavigation && context.bounds.range < trivialThreshold && everyInsightPasses && noLcp && noInp && noLayoutShifts;
    if (shouldExclude) {
      return;
    }
    let url;
    try {
      url = new URL(urlString);
    } catch {
      return;
    }
    const insightSet = {
      id,
      url,
      navigation,
      frameId: context.frameId,
      bounds: context.bounds,
      model: insightSetModel
    };
    if (!this.#insights) {
      this.#insights = /* @__PURE__ */ new Map();
    }
    this.#insights.set(insightSet.id, insightSet);
    this.sortInsightSet(insightSet, options.metadata ?? null);
  }
  /**
   * Run all the insights and set the result to `#insights`.
   */
  #computeInsights(parsedTrace, traceEvents, options) {
    this.#insights = /* @__PURE__ */ new Map();
    const navigations = parsedTrace.Meta.mainFrameNavigations.filter((navigation) => navigation.args.frame && navigation.args.data?.navigationId);
    this.#computeInsightsForInitialTracePeriod(parsedTrace, navigations, options);
    for (const [index, navigation] of navigations.entries()) {
      const min = navigation.ts;
      const max = index + 1 < navigations.length ? navigations[index + 1].ts : parsedTrace.Meta.traceBounds.max;
      const bounds = Helpers.Timing.traceWindowFromMicroSeconds(min, max);
      this.#computeInsightsForNavigation(navigation, bounds, parsedTrace, traceEvents, options);
    }
  }
  /**
   * Computes insights for the period before the first navigation, or for the entire trace if no navigations exist.
   */
  #computeInsightsForInitialTracePeriod(parsedTrace, navigations, options) {
    const bounds = navigations.length > 0 ? Helpers.Timing.traceWindowFromMicroSeconds(parsedTrace.Meta.traceBounds.min, navigations[0].ts) : parsedTrace.Meta.traceBounds;
    const context = {
      bounds,
      frameId: parsedTrace.Meta.mainFrameId
      // No navigation or lantern context applies to this initial/no-navigation period.
    };
    this.#computeInsightSet(parsedTrace, context, options);
  }
  /**
   * Computes insights for a specific navigation event.
   */
  #computeInsightsForNavigation(navigation, bounds, parsedTrace, traceEvents, options) {
    const frameId = navigation.args.frame;
    const navigationId = navigation.args.data?.navigationId;
    let lantern;
    try {
      options.logger?.start("insights:createLanternContext");
      lantern = this.#createLanternContext(parsedTrace, traceEvents, frameId, navigationId, options);
    } catch (e) {
      const expectedErrors = [
        "mainDocumentRequest not found",
        "missing metric scores for main frame",
        "missing metric: FCP",
        "missing metric: LCP",
        "No network requests found in trace",
        "Trace is too old"
      ];
      if (!(e instanceof Lantern2.Core.LanternError)) {
        console.error(e);
      } else if (!expectedErrors.some((err) => e.message === err)) {
        console.error(e);
      }
    } finally {
      options.logger?.end("insights:createLanternContext");
    }
    const context = {
      bounds,
      frameId,
      navigation,
      navigationId,
      lantern
    };
    this.#computeInsightSet(parsedTrace, context, options);
  }
};
function sortHandlers(traceHandlers) {
  const sortedMap = /* @__PURE__ */ new Map();
  const visited = /* @__PURE__ */ new Set();
  const visitHandler = (handlerName) => {
    if (sortedMap.has(handlerName)) {
      return;
    }
    if (visited.has(handlerName)) {
      let stackPath = "";
      for (const handler2 of visited) {
        if (stackPath || handler2 === handlerName) {
          stackPath += `${handler2}->`;
        }
      }
      stackPath += handlerName;
      throw new Error(`Found dependency cycle in trace event handlers: ${stackPath}`);
    }
    visited.add(handlerName);
    const handler = traceHandlers[handlerName];
    if (!handler) {
      return;
    }
    const deps = handler.deps?.();
    if (deps) {
      deps.forEach(visitHandler);
    }
    sortedMap.set(handlerName, handler);
  };
  for (const handlerName of Object.keys(traceHandlers)) {
    visitHandler(handlerName);
  }
  return sortedMap;
}

// gen/front_end/models/trace/ModelImpl.js
import * as Types3 from "./types/types.js";
var Model = class _Model extends EventTarget {
  #traces = [];
  #nextNumberByDomain = /* @__PURE__ */ new Map();
  #recordingsAvailable = [];
  #lastRecordingIndex = 0;
  #processor;
  #config = Types3.Configuration.defaults();
  static createWithAllHandlers(config) {
    return new _Model(Handlers3.ModelHandlers, config);
  }
  /**
   * Runs only the provided handlers.
   *
   * Callers must ensure they are providing all dependant handlers (although Meta is included automatically),
   * and must know that the result of `.parsedTrace` will be limited to the handlers provided, even though
   * the type won't reflect that.
   */
  static createWithSubsetOfHandlers(traceHandlers, config) {
    return new _Model(traceHandlers, config);
  }
  constructor(handlers, config) {
    super();
    if (config) {
      this.#config = config;
    }
    this.#processor = new TraceProcessor(handlers, this.#config);
  }
  /**
   * Parses an array of trace events into a structured object containing all the
   * information parsed by the trace handlers.
   * You can `await` this function to pause execution until parsing is complete,
   * or instead rely on the `ModuleUpdateEvent` that is dispatched when the
   * parsing is finished.
   *
   * Once parsed, you then have to call the `parsedTrace` method, providing an
   * index of the trace you want to have the data for. This is because any model
   * can store a number of traces. Each trace is given an index, which starts at 0
   * and increments by one as a new trace is parsed.
   *
   * @example
   * // Awaiting the parse method() to block until parsing complete
   * await this.traceModel.parse(events);
   * const data = this.traceModel.parsedTrace(0)
   * @example
   * // Using an event listener to be notified when tracing is complete.
   * this.traceModel.addEventListener(Trace.ModelUpdateEvent.eventName, (event) => {
   *   if(event.data.data === 'done') {
   *     // trace complete
   *     const data = this.traceModel.parsedTrace(0);
   *   }
   * });
   * void this.traceModel.parse(events);
   **/
  async parse(traceEvents, config) {
    const metadata = config?.metadata || {};
    const isFreshRecording = config?.isFreshRecording || false;
    const isCPUProfile = metadata?.dataOrigin === "CPUProfile";
    const onTraceUpdate = (event) => {
      const { data } = event;
      this.dispatchEvent(new ModelUpdateEvent({ type: "PROGRESS_UPDATE", data }));
    };
    this.#processor.addEventListener(TraceParseProgressEvent.eventName, onTraceUpdate);
    const file = {
      traceEvents,
      metadata,
      parsedTrace: null,
      traceInsights: null,
      syntheticEventsManager: Helpers2.SyntheticEvents.SyntheticEventsManager.createAndActivate(traceEvents)
    };
    try {
      const parseConfig = {
        isFreshRecording,
        isCPUProfile,
        metadata,
        resolveSourceMap: config?.resolveSourceMap
      };
      if (window.location.href.includes("devtools/bundled") || window.location.search.includes("debugFrontend")) {
        const times = {};
        parseConfig.logger = {
          start(id) {
            times[id] = performance.now();
          },
          end(id) {
            performance.measure(id, { start: times[id] });
          }
        };
      }
      await this.#processor.parse(traceEvents, parseConfig);
      this.#storeParsedFileData(file, this.#processor.parsedTrace, this.#processor.insights);
      this.#traces.push(file);
    } catch (e) {
      throw e;
    } finally {
      this.#processor.removeEventListener(TraceParseProgressEvent.eventName, onTraceUpdate);
      this.dispatchEvent(new ModelUpdateEvent({ type: "COMPLETE", data: "done" }));
    }
  }
  #storeParsedFileData(file, data, insights) {
    file.parsedTrace = data;
    file.traceInsights = insights;
    this.#lastRecordingIndex++;
    let recordingName = `Trace ${this.#lastRecordingIndex}`;
    let origin = null;
    if (file.parsedTrace) {
      origin = Helpers2.Trace.extractOriginFromTrace(file.parsedTrace.Meta.mainFrameURL);
      if (origin) {
        const nextSequenceForDomain = Platform.MapUtilities.getWithDefault(this.#nextNumberByDomain, origin, () => 1);
        recordingName = `${origin} (${nextSequenceForDomain})`;
        this.#nextNumberByDomain.set(origin, nextSequenceForDomain + 1);
      }
    }
    this.#recordingsAvailable.push(recordingName);
  }
  lastTraceIndex() {
    return this.size() - 1;
  }
  /**
   * Returns the parsed trace data indexed by the order in which it was stored.
   * If no index is given, the last stored parsed data is returned.
   */
  parsedTrace(index = this.#traces.length - 1) {
    return this.#traces.at(index)?.parsedTrace ?? null;
  }
  traceInsights(index = this.#traces.length - 1) {
    return this.#traces.at(index)?.traceInsights ?? null;
  }
  metadata(index = this.#traces.length - 1) {
    return this.#traces.at(index)?.metadata ?? null;
  }
  overrideModifications(index, newModifications) {
    if (this.#traces[index]) {
      this.#traces[index].metadata.modifications = newModifications;
    }
  }
  rawTraceEvents(index = this.#traces.length - 1) {
    return this.#traces.at(index)?.traceEvents ?? null;
  }
  syntheticTraceEventsManager(index = this.#traces.length - 1) {
    return this.#traces.at(index)?.syntheticEventsManager ?? null;
  }
  size() {
    return this.#traces.length;
  }
  deleteTraceByIndex(recordingIndex) {
    this.#traces.splice(recordingIndex, 1);
    this.#recordingsAvailable.splice(recordingIndex, 1);
  }
  getRecordingsAvailable() {
    return this.#recordingsAvailable;
  }
  resetProcessor() {
    this.#processor.reset();
  }
};
var ModelUpdateEvent = class _ModelUpdateEvent extends Event {
  data;
  static eventName = "modelupdate";
  constructor(data) {
    super(_ModelUpdateEvent.eventName);
    this.data = data;
  }
};
function isModelUpdateDataComplete(eventData) {
  return eventData.type === "COMPLETE";
}

// gen/front_end/models/trace/trace.prebundle.js
import * as Types4 from "./types/types.js";
export {
  Extras,
  Handlers4 as Handlers,
  Helpers3 as Helpers,
  Insights2 as Insights,
  Lantern3 as Lantern,
  LanternComputationData_exports as LanternComputationData,
  Processor_exports as Processor,
  ModelImpl_exports as TraceModel,
  Types4 as Types
};
//# sourceMappingURL=trace.js.map
