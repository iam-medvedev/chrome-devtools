// gen/front_end/testing/TraceLoader.js
import * as Common from "./../../../../core/common/common.js";
import * as SDK from "./../../../../core/sdk/sdk.js";
import * as Trace from "./../../trace.js";
import * as Timeline from "./../../../../panels/timeline/timeline.js";
import * as TraceBounds from "./../../../../services/trace_bounds/trace_bounds.js";
var fileContentsCache = /* @__PURE__ */ new Map();
var traceEngineCache = /* @__PURE__ */ new Map();
var TraceLoader = class _TraceLoader {
  /**
   * Parsing some trace files easily takes up more than our default Mocha timeout
   * which is 2seconds. So for most tests that include parsing a trace, we have to
   * increase the timeout. We use this function to ensure we set a consistent
   * timeout across all trace model tests.
   **/
  static setTestTimeout(context) {
    if (context.timeout() > 0) {
      context.timeout(Math.max(context.timeout(), 3e4));
    }
  }
  /**
   * Loads a trace file into memory and returns its contents after
   * JSON.parse-ing them
   *
   **/
  static async fixtureContents(context, name) {
    if (context) {
      _TraceLoader.setTestTimeout(context);
    }
    const cached = fileContentsCache.get(name);
    if (cached) {
      return cached;
    }
    const urlForTest = new URL(`../panels/timeline/fixtures/traces/${name}`, import.meta.url);
    const contents = await _TraceLoader.loadTraceFileFromURL(urlForTest);
    fileContentsCache.set(name, contents);
    return contents;
  }
  static async traceFile(context, name) {
    const contents = await _TraceLoader.fixtureContents(context, name);
    const traceEvents = "traceEvents" in contents ? contents.traceEvents : contents;
    const metadata = "metadata" in contents ? contents.metadata : {};
    return { traceEvents, metadata };
  }
  /**
   * Load an array of raw events from the trace file.
   **/
  static async rawEvents(context, name) {
    const contents = await _TraceLoader.fixtureContents(context, name);
    const events = "traceEvents" in contents ? contents.traceEvents : contents;
    return events;
  }
  /**
   * Load the metadata from a trace file (throws if not present).
   **/
  static async metadata(context, name) {
    const contents = await _TraceLoader.fixtureContents(context, name);
    const metadata = "metadata" in contents ? contents.metadata : null;
    if (!metadata) {
      throw new Error("expected metadata but found none");
    }
    return metadata;
  }
  /**
   * Load an array of raw events from the trace file.
   * Will default to typing those events using the types from Trace Engine, but
   * can be overriden by passing the legacy EventPayload type as the generic.
   **/
  static async rawCPUProfile(context, name) {
    const contents = await _TraceLoader.fixtureContents(context, name);
    return contents;
  }
  /**
   * Executes only the new trace engine on the fixture and returns the resulting parsed data.
   *
   * @param context The Mocha test context. Processing a trace can easily
   * takes up longer than the default Mocha timeout, which is 2s. So we have to
   * increase this test's timeout. It might be null when we only render a
   * component example. See TraceLoader.setTestTimeout.
   * @param file The name of the trace file to be loaded.
   * The trace file should be in ../panels/timeline/fixtures/traces folder.
   * @param options Additional trace options.
   * @param options.initTraceBounds (defaults to `true`) after the trace is
   * loaded, the TraceBounds manager will automatically be initialised using
   * the bounds from the trace.
   * @param config The config the new trace engine should run with. Optional,
   * will fall back to the Default config if not provided.
   */
  static async traceEngine(context, name, config = Trace.Types.Configuration.defaults()) {
    if (context) {
      _TraceLoader.setTestTimeout(context);
    }
    TraceBounds.TraceBounds.BoundsManager.instance({ forceNew: true });
    const configCacheKey = Trace.Types.Configuration.configToCacheKey(config);
    const fromCache = traceEngineCache.get(name)?.get(configCacheKey);
    if (fromCache) {
      const parsedTrace = fromCache.parsedTrace;
      await wrapInTimeout(context, () => {
        const syntheticEventsManager = fromCache.model.syntheticTraceEventsManager(0);
        if (!syntheticEventsManager) {
          throw new Error("Cached trace engine result did not have a synthetic events manager instance");
        }
        Trace.Helpers.SyntheticEvents.SyntheticEventsManager.activate(syntheticEventsManager);
        _TraceLoader.initTraceBoundsManager(parsedTrace);
        Timeline.ModificationsManager.ModificationsManager.reset();
        Timeline.ModificationsManager.ModificationsManager.initAndActivateModificationsManager(fromCache.model, 0);
      }, 4e3, "Initializing state for cached trace");
      return parsedTrace;
    }
    const fileContents = await wrapInTimeout(context, async () => {
      return await _TraceLoader.fixtureContents(context, name);
    }, 15e3, `Loading fixtureContents for ${name}`);
    const parsedTraceFileAndModel = await wrapInTimeout(context, async () => {
      return await _TraceLoader.executeTraceEngineOnFileContents(
        fileContents,
        /* emulate fresh recording */
        false,
        config
      );
    }, 15e3, `Executing traceEngine for ${name}`);
    const cacheByName = traceEngineCache.get(name) ?? /* @__PURE__ */ new Map();
    cacheByName.set(configCacheKey, parsedTraceFileAndModel);
    traceEngineCache.set(name, cacheByName);
    _TraceLoader.initTraceBoundsManager(parsedTraceFileAndModel.parsedTrace);
    await wrapInTimeout(context, () => {
      Timeline.ModificationsManager.ModificationsManager.reset();
      Timeline.ModificationsManager.ModificationsManager.initAndActivateModificationsManager(parsedTraceFileAndModel.model, 0);
    }, 5e3, `Creating modification manager for ${name}`);
    return parsedTraceFileAndModel.parsedTrace;
  }
  /**
   * Initialise the BoundsManager with the bounds from a trace.
   * This isn't always required, but some of our code - particularly at the UI
   * level - rely on this being set. This is always set in the actual panel, but
   * parsing a trace in a test does not automatically set it.
   **/
  static initTraceBoundsManager(parsedTrace) {
    TraceBounds.TraceBounds.BoundsManager.instance({
      forceNew: true
    }).resetWithNewBounds(parsedTrace.data.Meta.traceBounds);
  }
  static async executeTraceEngineOnFileContents(contents, emulateFreshRecording = false, traceEngineConfig) {
    const events = "traceEvents" in contents ? contents.traceEvents : contents;
    const metadata = "metadata" in contents ? contents.metadata : {};
    return await new Promise((resolve, reject) => {
      const model = Trace.TraceModel.Model.createWithAllHandlers(traceEngineConfig);
      model.addEventListener(Trace.TraceModel.ModelUpdateEvent.eventName, (event) => {
        const { data } = event;
        if (Trace.TraceModel.isModelUpdateDataComplete(data)) {
          const parsedTrace = model.parsedTrace(0);
          if (!parsedTrace) {
            reject(new Error("Unable to load trace"));
            return;
          }
          resolve({
            model,
            parsedTrace
          });
        }
      });
      void model.parse(events, {
        metadata,
        isFreshRecording: emulateFreshRecording,
        async resolveSourceMap(params) {
          const { sourceUrl, sourceMapUrl, cachedRawSourceMap } = params;
          if (cachedRawSourceMap) {
            return new SDK.SourceMap.SourceMap(sourceUrl, sourceMapUrl, cachedRawSourceMap);
          }
          if (sourceMapUrl.startsWith("data:")) {
            const rawSourceMap = await (await fetch(sourceMapUrl)).json();
            return new SDK.SourceMap.SourceMap(sourceUrl, sourceMapUrl, rawSourceMap);
          }
          return null;
        }
      }).catch((e) => console.error(e));
    });
  }
  static async loadTraceFileFromURL(url) {
    const contents = await fetchFileAsText(url);
    const traceContents = JSON.parse(contents);
    return traceContents;
  }
  /**
   * Karma test run in a single context if we load all the traces
   * we risk getting out of memory
   */
  static resetCache() {
    fileContentsCache.clear();
    traceEngineCache.clear();
  }
};
async function fetchFileAsText(url) {
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`Unable to load ${url}`);
  }
  const buffer = await response.arrayBuffer();
  const contents = await Common.Gzip.arrayBufferToString(buffer);
  return contents;
}
async function wrapInTimeout(mochaContext, callback, timeoutMs, stepName) {
  const timeout = Promise.withResolvers();
  const timeoutId = setTimeout(() => {
    let testTitle = "(unknown test)";
    if (mochaContext) {
      if (isMochaContext(mochaContext)) {
        testTitle = mochaContext.currentTest?.fullTitle() ?? testTitle;
      } else {
        testTitle = mochaContext.fullTitle();
      }
    }
    console.error(`TraceLoader: [${stepName}]: took longer than ${timeoutMs}ms in test "${testTitle}"`);
    timeout.reject(new Error(`Timeout for TraceLoader: '${stepName}' after ${timeoutMs}ms.`));
  }, timeoutMs);
  try {
    const cbResult = await Promise.race([callback(), timeout.promise]);
    timeout.resolve();
    return cbResult;
  } finally {
    clearTimeout(timeoutId);
  }
}
function isMochaContext(arg) {
  return typeof arg === "object" && arg !== null && "currentTest" in arg;
}

// gen/front_end/models/trace/lantern/testing/MetricTestUtils.js
import * as Trace2 from "./../../trace.js";
import * as Lantern from "./../lantern.js";
function toLanternTrace(traceEvents) {
  return {
    traceEvents
  };
}
async function runTraceProcessor(context, trace) {
  TraceLoader.setTestTimeout(context);
  const processor = Trace2.Processor.TraceProcessor.createWithAllHandlers();
  await processor.parse(trace.traceEvents, { isCPUProfile: false, isFreshRecording: true });
  if (!processor.data) {
    throw new Error("No data");
  }
  return processor.data;
}
async function getComputationDataFromFixture(context, { trace, settings, url }) {
  settings = settings ?? {};
  if (!settings.throttlingMethod) {
    settings.throttlingMethod = "simulate";
  }
  const data = await runTraceProcessor(context, trace);
  const requests = Trace2.LanternComputationData.createNetworkRequests(trace, data);
  const networkAnalysis = Lantern.Core.NetworkAnalyzer.analyze(requests);
  if (!networkAnalysis) {
    throw new Error("no networkAnalysis");
  }
  const frameId = data.Meta.mainFrameId;
  const navigationId = data.Meta.mainFrameNavigations[0].args.data?.navigationId;
  if (!navigationId) {
    throw new Error("no navigation id found");
  }
  return {
    simulator: Lantern.Simulation.Simulator.createSimulator({ ...settings, networkAnalysis }),
    graph: Trace2.LanternComputationData.createGraph(requests, trace, data, url),
    processedNavigation: Trace2.LanternComputationData.createProcessedNavigation(data, frameId, navigationId)
  };
}
export {
  getComputationDataFromFixture,
  runTraceProcessor as runTrace,
  toLanternTrace
};
//# sourceMappingURL=testing.js.map
