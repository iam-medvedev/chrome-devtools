/// <reference types="mocha" />
import type * as Protocol from '../generated/protocol.js';
import * as TimelineModel from '../models/timeline_model/timeline_model.js';
import * as TraceEngine from '../models/trace/trace.js';
import * as Timeline from '../panels/timeline/timeline.js';
export type AllModelsLoaded = Readonly<{
    tracingModel: TraceEngine.Legacy.TracingModel;
    timelineModel: TimelineModel.TimelineModel.TimelineModelImpl;
    performanceModel: Timeline.PerformanceModel.PerformanceModel;
    traceParsedData: TraceEngine.Handlers.Types.TraceParseData;
}>;
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
    static fixtureContents(context: Mocha.Context | Mocha.Suite | null, name: string): Promise<TraceEngine.Types.File.Contents>;
    /**
     * Load an array of raw events from the trace file.
     * Will default to typing those events using the types from TraceEngine, but
     * can be overriden by passing the legacy EventPayload type as the generic.
     **/
    static rawEvents<T extends TraceEngine.Types.TraceEvents.TraceEventData | TraceEngine.TracingManager.EventPayload = TraceEngine.Types.TraceEvents.TraceEventData>(context: Mocha.Context | Mocha.Suite | null, name: string): Promise<readonly T[]>;
    /**
     * Load an array of raw events from the trace file.
     * Will default to typing those events using the types from TraceEngine, but
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
     * @param config The config the new trace engine should run with. Optional,
     * will fall back to the Default config if not provided.
     */
    static traceEngine(context: Mocha.Context | Mocha.Suite | null, name: string, config?: TraceEngine.Types.Configuration.Configuration): Promise<TraceEngine.Handlers.Types.TraceParseData>;
    /**
     * Returns tracingModel, timelineModel, performanceModel, traceParsedData
     * from the given trace file.
     *
     * @param context The Mocha test context. |allModelsFromFile| function easily
     * takes up more than our default Mocha timeout, which is 2s. So we have to
     * increase this test's timeout. It might be null when we only render a
     * component example.
     * @param file The name of the trace file to be loaded. The trace file should
     * be in ../panels/timeline/fixtures/traces folder.
     * @returns tracingModel, timelineModel, performanceModel, traceParsedData
     * from this trace file
     */
    static allModels(context: Mocha.Context | Mocha.Suite | null, name: string): Promise<AllModelsLoaded>;
    static executeTraceEngineOnFileContents(contents: TraceEngine.Types.File.Contents, emulateFreshRecording?: boolean, traceEngineConfig?: TraceEngine.Types.Configuration.Configuration): Promise<{
        metadata: TraceEngine.Types.File.MetaData;
        traceParsedData: TraceEngine.Handlers.Types.TraceParseData;
    }>;
}
