// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Trace from '../models/trace/trace.js';
import * as Timeline from '../panels/timeline/timeline.js';
import * as TraceBounds from '../services/trace_bounds/trace_bounds.js';
// We maintain two caches:
// 1. The file contents JSON.parsed for a given trace file.
// 2. The trace engine models for a given file (used by the traceEngine function)
// Both the file contents and the model data are not expected to change during
// the lifetime of an instance of DevTools, so they are safe to cache and
// re-use across tests to avoid extra time spent loading and parsing the same
// inputs.
// In the future once the data layer migration is complete, we can hopefully
// simplify this into one method that loads the new engine and none of the old
// ones.
const fileContentsCache = new Map();
// The new engine cache is a map of maps of:
// trace file name => trace engine configuration => trace data
//
// The first map is a Map of string (which is the name of the trace file) to a
// new map, where the key is the trace engine configuration stringified.
// This ensures that we cache as much as we can, but if you load the same trace
// file with different trace engine configurations, we will not use the cache
// and will reparse. This is required as some of the settings and experiments
// change if events are kept and dropped.
const traceEngineCache = new Map();
/**
 * Loads trace files defined as fixtures in front_end/panels/timeline/fixtures/traces.
 *
 * Will automatically cache the results to save time processing the same trace
 * multiple times in a run of the test suite.
 **/
export class TraceLoader {
    /**
     * Parsing some trace files easily takes up more than our default Mocha timeout
     * which is 2seconds. So for most tests that include parsing a trace, we have to
     * increase the timeout. We use this function to ensure we set a consistent
     * timeout across all trace model tests.
     * The context might be null when we only render a component example.
     **/
    static setTestTimeout(context) {
        if (!context || context.timeout() >= 10_000) {
            return;
        }
        context?.timeout(10_000);
    }
    /**
     * Loads a trace file into memory and returns its contents after
     * JSON.parse-ing them
     *
     **/
    static async fixtureContents(context, name) {
        TraceLoader.setTestTimeout(context);
        const cached = fileContentsCache.get(name);
        if (cached) {
            return cached;
        }
        // Required URLs differ across the component server and the unit tests, so try both.
        const urlForTest = new URL(`../panels/timeline/fixtures/traces/${name}`, import.meta.url);
        const contents = await loadTraceFileFromURL(urlForTest);
        fileContentsCache.set(name, contents);
        return contents;
    }
    /**
     * Load an array of raw events from the trace file.
     **/
    static async rawEvents(context, name) {
        const contents = await TraceLoader.fixtureContents(context, name);
        const events = 'traceEvents' in contents ? contents.traceEvents : contents;
        return events;
    }
    /**
     * Load the metadata from a trace file (throws if not present).
     **/
    static async metadata(context, name) {
        const contents = await TraceLoader.fixtureContents(context, name);
        const metadata = 'metadata' in contents ? contents.metadata : null;
        if (!metadata) {
            throw new Error('expected metadata but found none');
        }
        return metadata;
    }
    /**
     * Load an array of raw events from the trace file.
     * Will default to typing those events using the types from Trace Engine, but
     * can be overriden by passing the legacy EventPayload type as the generic.
     **/
    static async rawCPUProfile(context, name) {
        const contents = await TraceLoader.fixtureContents(context, name);
        return contents;
    }
    /**
     * Executes only the new trace engine on the fixture and returns the resulting parsed data.
     *
     * @param context The Mocha test context. |allModelsFromFile| function easily
     * takes up more than our default Mocha timeout, which is 2s. So we have to
     * increase this test's timeout. It might be null when we only render a
     * component example.
     *
     * @param file The name of the trace file to be loaded.
     * The trace file should be in ../panels/timeline/fixtures/traces folder.
     *
     * @param options Additional trace options.
     * @param options.initTraceBounds (defaults to `true`) after the trace is
     * loaded, the TraceBounds manager will automatically be initialised using
     * the bounds from the trace.
     *
     * @param config The config the new trace engine should run with. Optional,
     * will fall back to the Default config if not provided.
     */
    static async traceEngine(context, name, config = Trace.Types.Configuration.defaults()) {
        // Force the TraceBounds to be reset to empty. This ensures that in
        // tests where we are using the new engine data we don't accidentally
        // rely on the fact that a previous test has set the BoundsManager.
        TraceBounds.TraceBounds.BoundsManager.instance({ forceNew: true });
        const configCacheKey = Trace.Types.Configuration.configToCacheKey(config);
        const fromCache = traceEngineCache.get(name)?.get(configCacheKey);
        // If we have results from the cache, we use those to ensure we keep the
        // tests speedy and don't re-parse trace files over and over again.
        if (fromCache) {
            const syntheticEventsManager = fromCache.model.syntheticTraceEventsManager(0);
            if (!syntheticEventsManager) {
                throw new Error('Cached trace engine result did not have a synthetic events manager instance');
            }
            Trace.Helpers.SyntheticEvents.SyntheticEventsManager.activate(syntheticEventsManager);
            TraceLoader.initTraceBoundsManager(fromCache.parsedTrace);
            Timeline.ModificationsManager.ModificationsManager.reset();
            Timeline.ModificationsManager.ModificationsManager.initAndActivateModificationsManager(fromCache.model, 0);
            return { parsedTrace: fromCache.parsedTrace, insights: fromCache.insights, metadata: fromCache.metadata };
        }
        const fileContents = await TraceLoader.fixtureContents(context, name);
        const parsedTraceData = await TraceLoader.executeTraceEngineOnFileContents(fileContents, /* emulate fresh recording */ false, config);
        const cacheByName = traceEngineCache.get(name) ?? new Map();
        cacheByName.set(configCacheKey, parsedTraceData);
        traceEngineCache.set(name, cacheByName);
        TraceLoader.initTraceBoundsManager(parsedTraceData.parsedTrace);
        Timeline.ModificationsManager.ModificationsManager.reset();
        Timeline.ModificationsManager.ModificationsManager.initAndActivateModificationsManager(parsedTraceData.model, 0);
        return {
            parsedTrace: parsedTraceData.parsedTrace,
            insights: parsedTraceData.insights,
            metadata: parsedTraceData.metadata,
        };
    }
    /**
     * Initialise the BoundsManager with the bounds from a trace.
     * This isn't always required, but some of our code - particularly at the UI
     * level - rely on this being set. This is always set in the actual panel, but
     * parsing a trace in a test does not automatically set it.
     **/
    static initTraceBoundsManager(data) {
        TraceBounds.TraceBounds.BoundsManager
            .instance({
            forceNew: true,
        })
            .resetWithNewBounds(data.Meta.traceBounds);
    }
    static async executeTraceEngineOnFileContents(contents, emulateFreshRecording = false, traceEngineConfig) {
        const events = 'traceEvents' in contents ? contents.traceEvents : contents;
        const metadata = 'metadata' in contents ? contents.metadata : {};
        return new Promise((resolve, reject) => {
            const model = Trace.TraceModel.Model.createWithAllHandlers(traceEngineConfig);
            model.addEventListener(Trace.TraceModel.ModelUpdateEvent.eventName, (event) => {
                const { data } = event;
                // When we receive the final update from the model, update the recording
                // state back to waiting.
                if (Trace.TraceModel.isModelUpdateDataComplete(data)) {
                    const metadata = model.metadata(0);
                    const parsedTrace = model.parsedTrace(0);
                    const insights = model.traceInsights(0);
                    if (metadata && parsedTrace) {
                        resolve({
                            model,
                            metadata,
                            parsedTrace,
                            insights,
                        });
                    }
                    else {
                        reject(new Error('Unable to load trace'));
                    }
                }
            });
            void model.parse(events, { metadata, isFreshRecording: emulateFreshRecording }).catch(e => console.error(e));
        });
    }
}
// Below this point are private methods used in the TraceLoader class. These
// are purposefully not exported, you should use one of the static methods
// defined above.
async function loadTraceFileFromURL(url) {
    const response = await fetch(url);
    if (response.status !== 200) {
        throw new Error(`Unable to load ${url}`);
    }
    const contentType = response.headers.get('content-type');
    const isGzipEncoded = contentType !== null && contentType.includes('gzip');
    let buffer = await response.arrayBuffer();
    if (isGzipEncoded) {
        buffer = await decodeGzipBuffer(buffer);
    }
    const decoder = new TextDecoder('utf-8');
    const contents = JSON.parse(decoder.decode(buffer));
    return contents;
}
function codec(buffer, codecStream) {
    const { readable, writable } = new TransformStream();
    const codecReadable = readable.pipeThrough(codecStream);
    const writer = writable.getWriter();
    void writer.write(buffer);
    void writer.close();
    // Wrap in a response for convenience.
    const response = new Response(codecReadable);
    return response.arrayBuffer();
}
function decodeGzipBuffer(buffer) {
    return codec(buffer, new DecompressionStream('gzip'));
}
export async function fetchFixture(url) {
    const response = await fetch(url);
    if (response.status !== 200) {
        throw new Error(`Unable to load ${url}`);
    }
    const contentType = response.headers.get('content-type');
    const isGzipEncoded = contentType !== null && contentType.includes('gzip');
    let buffer = await response.arrayBuffer();
    if (isGzipEncoded) {
        buffer = await decodeGzipBuffer(buffer);
    }
    const decoder = new TextDecoder('utf-8');
    const contents = decoder.decode(buffer);
    return contents;
}
//# sourceMappingURL=TraceLoader.js.map