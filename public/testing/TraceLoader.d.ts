import type * as Protocol from '../generated/protocol.js';
import * as Trace from '../models/trace/trace.js';
export interface TraceEngineLoaderOptions {
    initTraceBounds: boolean;
}
/**
 * Loads trace files defined as fixtures in front_end/panels/timeline/fixtures/traces.
 *
 * Will automatically cache the results to save time processing the same trace
 * multiple times in a run of the test suite.
 **/
export declare class TraceLoader {
    /**
     * Parsing some trace files easily takes up more than our default Mocha timeout
     * which is 2seconds. So for most tests that include parsing a trace, we have to
     * increase the timeout. We use this function to ensure we set a consistent
     * timeout across all trace model tests.
     * The context might be null when we only render a component example.
     **/
    static setTestTimeout(context: Mocha.Context | Mocha.Suite | null): void;
    /**
     * Loads a trace file into memory and returns its contents after
     * JSON.parse-ing them
     *
     **/
    static fixtureContents(context: Mocha.Context | Mocha.Suite | null, name: string): Promise<Trace.Types.File.Contents>;
    /**
     * Load an array of raw events from the trace file.
     **/
    static rawEvents(context: Mocha.Context | Mocha.Suite | null, name: string): Promise<readonly Trace.Types.Events.Event[]>;
    /**
     * Load the metadata from a trace file (throws if not present).
     **/
    static metadata(context: Mocha.Context | Mocha.Suite | null, name: string): Promise<Trace.Types.File.MetaData>;
    /**
     * Load an array of raw events from the trace file.
     * Will default to typing those events using the types from Trace Engine, but
     * can be overriden by passing the legacy EventPayload type as the generic.
     **/
    static rawCPUProfile(context: Mocha.Context | Mocha.Suite | null, name: string): Promise<Protocol.Profiler.Profile>;
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
    static traceEngine(context: Mocha.Context | Mocha.Suite | null, name: string, config?: Trace.Types.Configuration.Configuration): Promise<{
        parsedTrace: Trace.Handlers.Types.ParsedTrace;
        insights: Trace.Insights.Types.TraceInsightSets | null;
        metadata: Trace.Types.File.MetaData | null;
    }>;
    /**
     * Initialise the BoundsManager with the bounds from a trace.
     * This isn't always required, but some of our code - particularly at the UI
     * level - rely on this being set. This is always set in the actual panel, but
     * parsing a trace in a test does not automatically set it.
     **/
    static initTraceBoundsManager(data: Trace.Handlers.Types.ParsedTrace): void;
    static executeTraceEngineOnFileContents(contents: Trace.Types.File.Contents, emulateFreshRecording?: boolean, traceEngineConfig?: Trace.Types.Configuration.Configuration): Promise<{
        model: Trace.TraceModel.Model;
        metadata: Trace.Types.File.MetaData;
        parsedTrace: Trace.Handlers.Types.ParsedTrace;
        insights: Trace.Insights.Types.TraceInsightSets | null;
    }>;
}
export declare function fetchFixture(url: URL): Promise<string>;
