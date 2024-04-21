import * as TraceEngine from '../models/trace/trace.js';
import * as Timeline from '../panels/timeline/timeline.js';
import * as PerfUI from '../ui/legacy/components/perf_ui/perf_ui.js';
export declare class MockFlameChartDelegate implements PerfUI.FlameChart.FlameChartDelegate {
    windowChanged(_startTime: number, _endTime: number, _animate: boolean): void;
    updateRangeSelection(_startTime: number, _endTime: number): void;
    updateSelectedGroup(_flameChart: PerfUI.FlameChart.FlameChart, _group: PerfUI.FlameChart.Group | null): void;
}
/**
 * Draws a set of tracks track in the flame chart using the new system.
 * For this to work, every track that will be rendered must have a
 * corresponding track appender registered in the
 * CompatibilityTracksAppender.
 *
 * @param traceFileName The name of the trace file to be loaded into the
 * flame chart.
 * @param trackAppenderNames A Set with the names of the tracks to be
 * rendered. For example, Set("Timings").
 * @param expanded whether the track should be expanded
 * @param trackName optional param to filter tracks by their name.
 * @returns a flame chart element and its corresponding data provider.
 */
export declare function getMainFlameChartWithTracks(traceFileName: string, trackAppenderNames: Set<Timeline.CompatibilityTracksAppender.TrackAppenderName>, expanded: boolean, trackName?: string): Promise<{
    flameChart: PerfUI.FlameChart.FlameChart;
    dataProvider: Timeline.TimelineFlameChartDataProvider.TimelineFlameChartDataProvider;
}>;
/**
 * Draws the network track in the flame chart using the legacy system.
 *
 * @param traceFileName The name of the trace file to be loaded to the flame
 * chart.
 * @param expanded if the track is expanded
 * @returns a flame chart element and its corresponding data provider.
 */
export declare function getNetworkFlameChartWithLegacyTrack(traceFileName: string, expanded: boolean): Promise<{
    flameChart: PerfUI.FlameChart.FlameChart;
    dataProvider: Timeline.TimelineFlameChartNetworkDataProvider.TimelineFlameChartNetworkDataProvider;
}>;
/**
 * Takes a TracingModel and returns a set of all events that have a payload, sorted by timestamp.
 * Useful in tests to locate a legacy SDK Event to use for tests.
 **/
export declare function getAllTracingModelPayloadEvents(tracingModel: TraceEngine.Legacy.TracingModel): TraceEngine.Legacy.PayloadEvent[];
export declare const defaultTraceEvent: TraceEngine.Types.TraceEvents.TraceEventData;
/**
 * Gets the tree in a thread.
 * @see RendererHandler.ts
 */
export declare function getTree(thread: TraceEngine.Handlers.ModelHandlers.Renderer.RendererThread): TraceEngine.Helpers.TreeHelpers.TraceEntryTree;
/**
 * Gets the n-th root from a tree in a thread.
 * @see RendererHandler.ts
 */
export declare function getRootAt(thread: TraceEngine.Handlers.ModelHandlers.Renderer.RendererThread, index: number): TraceEngine.Helpers.TreeHelpers.TraceEntryNode;
/**
 * Gets all nodes in a thread. To finish this task, we Walk through all the nodes, starting from the root node.
 */
export declare function getAllNodes(roots: Set<TraceEngine.Helpers.TreeHelpers.TraceEntryNode>): TraceEngine.Helpers.TreeHelpers.TraceEntryNode[];
/**
 * Gets the node with an id from a tree in a thread.
 * @see RendererHandler.ts
 */
export declare function getNodeFor(thread: TraceEngine.Handlers.ModelHandlers.Renderer.RendererThread, nodeId: TraceEngine.Helpers.TreeHelpers.TraceEntryNodeId): TraceEngine.Helpers.TreeHelpers.TraceEntryNode;
/**
 * Gets all the `events` for the `nodes`.
 */
export declare function getEventsIn(nodes: IterableIterator<TraceEngine.Helpers.TreeHelpers.TraceEntryNode>): TraceEngine.Types.TraceEvents.TraceEventData[];
/**
 * Pretty-prints a tree.
 */
export declare function prettyPrint(tree: TraceEngine.Helpers.TreeHelpers.TraceEntryTree, predicate?: (node: TraceEngine.Helpers.TreeHelpers.TraceEntryNode, event: TraceEngine.Types.TraceEvents.SyntheticTraceEntry) => boolean, indentation?: number, delimiter?: string, prefix?: string, newline?: string, out?: string): string;
/**
 * Builds a mock TraceEventComplete.
 */
export declare function makeCompleteEvent(name: string, ts: number, dur: number, cat?: string, pid?: number, tid?: number): TraceEngine.Types.TraceEvents.TraceEventComplete;
export declare function makeCompleteEventInMilliseconds(name: string, tsMillis: number, durMillis: number, cat?: string, pid?: number, tid?: number): TraceEngine.Types.TraceEvents.TraceEventComplete;
/**
 * Builds a mock TraceEventInstant.
 */
export declare function makeInstantEvent(name: string, ts: number, cat?: string, pid?: number, tid?: number, s?: TraceEngine.Types.TraceEvents.TraceEventScope): TraceEngine.Types.TraceEvents.TraceEventInstant;
/**
 * Builds a mock TraceEventBegin.
 */
export declare function makeBeginEvent(name: string, ts: number, cat?: string, pid?: number, tid?: number): TraceEngine.Types.TraceEvents.TraceEventBegin;
/**
 * Builds a mock TraceEventEnd.
 */
export declare function makeEndEvent(name: string, ts: number, cat?: string, pid?: number, tid?: number): TraceEngine.Types.TraceEvents.TraceEventEnd;
export declare function makeProfileCall(functionName: string, tsMs: number, durMs: number, pid?: TraceEngine.Types.TraceEvents.ProcessID, tid?: TraceEngine.Types.TraceEvents.ThreadID, nodeId?: number, url?: string): TraceEngine.Types.TraceEvents.SyntheticProfileCall;
/**
 * Provides a stubbed TraceEngine.Legacy.Thread instance.
 * IMPORTANT: this is not designed to be a fully stubbed Thread, but one that is
 * stubbed enough to be able to use it to instantiate an TraceEngine.Legacy.Event.
 * If you pass this fake thread around into places that expect actual threads,
 * you will get errors. Use this only for simple cases where you need a one off
 * event to test something. For anything more, you should use the helpers in
 * TraceHelpers.ts to load and parse a real trace to get real data.
 **/
export declare class StubbedThread {
    id: number;
    static make(id: number): TraceEngine.Legacy.Thread;
    constructor(id: number);
    getModel(): TraceEngine.Legacy.TracingModel;
}
export declare const DevToolsTimelineCategory = "disabled-by-default-devtools.timeline";
export interface FakeEventPayload {
    name: string;
    categories: string[];
    tid?: number;
    ts: number;
    pid?: number;
    dur?: number;
    ph: TraceEngine.Types.TraceEvents.Phase;
    args?: any;
    id?: string;
    scope?: string[];
    [x: string]: unknown;
}
/**
 * Creates an object that represents an EventPayload - one that looks exactly
 * like an event from a real trace could.
 * You must provide some of the options, but the others will revert to sensible
 * defaults. The goal here is not to use this to emulate an entire trace (you
 * should use an actual trace file if you need that), but to allow the
 * construction of single events to make testing utility methods easier.
 **/
export declare function makeFakeEventPayload(payload: FakeEventPayload): TraceEngine.TracingManager.EventPayload;
/**
 * Given an object representing a fake payload - see @FakeEventPayload - this
 * function will create a fake SDK Event with a stubbed thread that tries to
 * mimic the real thing. It is not designed to be used to emulate entire traces,
 * but more to create single events that can be used in unit tests.
 */
export declare function makeFakeSDKEventFromPayload(payloadOptions: FakeEventPayload): TraceEngine.Legacy.PayloadEvent;
/**
 * Mocks an object compatible with the return type of the
 * RendererHandler using only an array of ordered entries.
 */
export declare function makeMockRendererHandlerData(entries: TraceEngine.Types.TraceEvents.SyntheticTraceEntry[]): TraceEngine.Handlers.ModelHandlers.Renderer.RendererHandlerData;
/**
 * Mocks an object compatible with the return type of the
 * SamplesHandler using only an array of ordered profile calls.
 */
export declare function makeMockSamplesHandlerData(profileCalls: TraceEngine.Types.TraceEvents.SyntheticProfileCall[]): TraceEngine.Handlers.ModelHandlers.Samples.SamplesHandlerData;
export declare class FakeFlameChartProvider implements PerfUI.FlameChart.FlameChartDataProvider {
    minimumBoundary(): number;
    totalTime(): number;
    formatValue(value: number): string;
    maxStackDepth(): number;
    prepareHighlightedEntryInfo(_entryIndex: number): Element | null;
    canJumpToEntry(_entryIndex: number): boolean;
    entryTitle(entryIndex: number): string | null;
    entryFont(_entryIndex: number): string | null;
    entryColor(entryIndex: number): string;
    decorateEntry(): boolean;
    forceDecoration(_entryIndex: number): boolean;
    textColor(_entryIndex: number): string;
    timelineData(): PerfUI.FlameChart.FlameChartTimelineData | null;
}
export declare function getMainThread(data: TraceEngine.Handlers.ModelHandlers.Renderer.RendererHandlerData): TraceEngine.Handlers.ModelHandlers.Renderer.RendererThread;
type TraceParseData = TraceEngine.Handlers.Types.TraceParseData;
export declare function getBaseTraceParseModelData(overrides?: Partial<TraceParseData>): TraceParseData;
export {};
