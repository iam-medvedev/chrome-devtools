import * as Bindings from '../models/bindings/bindings.js';
import * as Trace from '../models/trace/trace.js';
import * as Timeline from '../panels/timeline/timeline.js';
import * as PerfUI from '../ui/legacy/components/perf_ui/perf_ui.js';
export declare class MockFlameChartDelegate implements PerfUI.FlameChart.FlameChartDelegate {
    windowChanged(_startTime: number, _endTime: number, _animate: boolean): void;
    updateRangeSelection(_startTime: number, _endTime: number): void;
    updateSelectedGroup(_flameChart: PerfUI.FlameChart.FlameChart, _group: PerfUI.FlameChart.Group | null): void;
}
/**
 * @deprecated this will be removed once we have migrated from interaction tests for screenshots. Please use `renderFlameChartIntoDOM`.
 *
 * Draws a set of tracks track in the flame chart using the new system.
 * For this to work, every track that will be rendered must have a
 * corresponding track appender registered in the
 * CompatibilityTracksAppender.
 *
 * @param context The unit test context.
 * @param traceFileName The name of the trace file to be loaded into the
 * flame chart.
 * @param trackAppenderNames A Set with the names of the tracks to be
 * rendered. For example, Set("Timings").
 * @param expanded whether the track should be expanded
 * @param trackName optional param to filter tracks by their name.
 * @returns a flame chart element and its corresponding data provider.
 */
export declare function getMainFlameChartWithTracks(context: Mocha.Context | null, traceFileName: string, trackAppenderNames: Set<Timeline.CompatibilityTracksAppender.TrackAppenderName>, expanded: boolean, trackName?: string): Promise<{
    flameChart: PerfUI.FlameChart.FlameChart;
    dataProvider: Timeline.TimelineFlameChartDataProvider.TimelineFlameChartDataProvider;
}>;
export interface RenderFlameChartOptions {
    /**
     * The trace file to import. You must include `.json.gz` at the end of the file name.
     */
    traceFile: string;
    /**
     * Filter the tracks that will be rendered by their name. The name here is
     * the user visible name that is drawn onto the flame chart.
     */
    filterTracks?: (trackName: string, trackIndex: number) => boolean;
    /**
     * Choose which track(s) that have been drawn should be expanded. The name
     * here is the user visible name that is drawn onto the flame chart.
     */
    expandTracks?: (trackName: string, trackIndex: number) => boolean;
    customStartTime?: Trace.Types.Timing.Milli;
    customEndTime?: Trace.Types.Timing.Milli;
}
/**
 * Renders a flame chart into the unit test DOM.
 * It will take care of all the setup and configuration for you.
 */
export declare function renderFlameChartIntoDOM(context: Mocha.Context | null, options: RenderFlameChartOptions): Promise<{
    flameChart: PerfUI.FlameChart.FlameChart;
    dataProvider: Timeline.TimelineFlameChartDataProvider.TimelineFlameChartDataProvider;
    target: HTMLElement;
}>;
/**
 * Draws the network track in the flame chart using the legacy system.
 *
 * @param traceFileName The name of the trace file to be loaded to the flame
 * chart.
 * @param expanded if the track is expanded
 * @returns a flame chart element and its corresponding data provider.
 */
export declare function getNetworkFlameChart(traceFileName: string, expanded: boolean): Promise<{
    flameChart: PerfUI.FlameChart.FlameChart;
    dataProvider: Timeline.TimelineFlameChartNetworkDataProvider.TimelineFlameChartNetworkDataProvider;
}>;
export declare const defaultTraceEvent: Trace.Types.Events.Event;
/**
 * Gets the tree in a thread.
 * @see RendererHandler.ts
 */
export declare function getTree(thread: Trace.Handlers.ModelHandlers.Renderer.RendererThread): Trace.Helpers.TreeHelpers.TraceEntryTree;
/**
 * Gets the n-th root from a tree in a thread.
 * @see RendererHandler.ts
 */
export declare function getRootAt(thread: Trace.Handlers.ModelHandlers.Renderer.RendererThread, index: number): Trace.Helpers.TreeHelpers.TraceEntryNode;
/**
 * Gets all nodes in a thread. To finish this task, we Walk through all the nodes, starting from the root node.
 */
export declare function getAllNodes(roots: Set<Trace.Helpers.TreeHelpers.TraceEntryNode>): Trace.Helpers.TreeHelpers.TraceEntryNode[];
/**
 * Gets the node with an id from a tree in a thread.
 * @see RendererHandler.ts
 */
export declare function getNodeFor(thread: Trace.Handlers.ModelHandlers.Renderer.RendererThread, nodeId: Trace.Helpers.TreeHelpers.TraceEntryNodeId): Trace.Helpers.TreeHelpers.TraceEntryNode;
/**
 * Gets all the `events` for the `nodes`.
 */
export declare function getEventsIn(nodes: IterableIterator<Trace.Helpers.TreeHelpers.TraceEntryNode>): Trace.Types.Events.Event[];
/**
 * Pretty-prints a tree.
 */
export declare function prettyPrint(tree: Trace.Helpers.TreeHelpers.TraceEntryTree, predicate?: (node: Trace.Helpers.TreeHelpers.TraceEntryNode, event: Trace.Types.Events.Event) => boolean, indentation?: number, delimiter?: string, prefix?: string, newline?: string, out?: string): string;
/**
 * Builds a mock Complete.
 */
export declare function makeCompleteEvent(name: string, ts: number, dur: number, cat?: string, pid?: number, tid?: number): Trace.Types.Events.Complete;
export declare function makeAsyncStartEvent(name: string, ts: number, pid?: number, tid?: number): Trace.Types.Events.Async;
export declare function makeAsyncEndEvent(name: string, ts: number, pid?: number, tid?: number): Trace.Types.Events.Async;
/**
 * Builds a mock flow phase event.
 */
export declare function makeFlowPhaseEvent(name: string, ts: number, cat: string | undefined, ph: Trace.Types.Events.Phase.FLOW_START | Trace.Types.Events.Phase.FLOW_END | Trace.Types.Events.Phase.FLOW_STEP, id?: number, pid?: number, tid?: number): Trace.Types.Events.FlowEvent;
/**
 * Builds flow phase events for a list of events belonging to the same
 * flow. `events` must be ordered.
 */
export declare function makeFlowEvents(events: Trace.Types.Events.Event[], flowId?: number): Trace.Types.Events.FlowEvent[];
/**
 * Builds a mock Instant.
 */
export declare function makeInstantEvent(name: string, tsMicroseconds: number, cat?: string, pid?: number, tid?: number, s?: Trace.Types.Events.Scope): Trace.Types.Events.Instant;
/**
 * Builds a mock Begin.
 */
export declare function makeBeginEvent(name: string, ts: number, cat?: string, pid?: number, tid?: number): Trace.Types.Events.Begin;
/**
 * Builds a mock End.
 */
export declare function makeEndEvent(name: string, ts: number, cat?: string, pid?: number, tid?: number): Trace.Types.Events.End;
export declare function makeProfileCall(functionName: string, tsUs: number, durUs: number, pid?: number, tid?: number, nodeId?: number, url?: string): Trace.Types.Events.SyntheticProfileCall;
export declare const DevToolsTimelineCategory = "disabled-by-default-devtools.timeline";
/**
 * Mocks an object compatible with the return type of the
 * RendererHandler using only an array of ordered entries.
 */
export declare function makeMockRendererHandlerData(entries: Trace.Types.Events.Event[], pid?: number, tid?: number): Trace.Handlers.ModelHandlers.Renderer.RendererHandlerData;
/**
 * Mocks an object compatible with the return type of the
 * SamplesHandler using only an array of ordered profile calls.
 */
export declare function makeMockSamplesHandlerData(profileCalls: Trace.Types.Events.SyntheticProfileCall[]): Trace.Handlers.ModelHandlers.Samples.SamplesHandlerData;
export declare function makeMockEntityData(events: Trace.Types.Events.Event[]): Trace.Handlers.Helpers.EntityMappings;
export declare class FakeFlameChartProvider implements PerfUI.FlameChart.FlameChartDataProvider {
    minimumBoundary(): number;
    hasTrackConfigurationMode(): boolean;
    totalTime(): number;
    formatValue(value: number): string;
    maxStackDepth(): number;
    preparePopoverElement(_entryIndex: number): Element | null;
    canJumpToEntry(_entryIndex: number): boolean;
    entryTitle(entryIndex: number): string | null;
    entryFont(_entryIndex: number): string | null;
    entryColor(entryIndex: number): string;
    decorateEntry(): boolean;
    forceDecoration(_entryIndex: number): boolean;
    textColor(_entryIndex: number): string;
    timelineData(): PerfUI.FlameChart.FlameChartTimelineData | null;
}
export declare function getMainThread(data: Trace.Handlers.ModelHandlers.Renderer.RendererHandlerData): Trace.Handlers.ModelHandlers.Renderer.RendererThread;
type ParsedTrace = Trace.Handlers.Types.ParsedTrace;
export declare function getBaseTraceParseModelData(overrides?: Partial<ParsedTrace>): ParsedTrace;
/**
 * A helper that will query the given array of events and find the first event
 * matching the predicate. It will also assert that a match is found, which
 * saves the need to do that for every test.
 */
export declare function getEventOfType<T extends Trace.Types.Events.Event>(events: Trace.Types.Events.Event[], predicate: (e: Trace.Types.Events.Event) => e is T): T;
/**
 * The Performance Panel is integrated with the IgnoreListManager so in tests
 * that render a flame chart or a track appender, it needs to be setup to avoid
 * errors.
 */
export declare function setupIgnoreListManagerEnvironment(): {
    ignoreListManager: Bindings.IgnoreListManager.IgnoreListManager;
};
export declare function microsecondsTraceWindow(min: number, max: number): Trace.Types.Timing.TraceWindowMicro;
export declare function microseconds(x: number): Trace.Types.Timing.Micro;
export declare function milliseconds(x: number): Trace.Types.Timing.Milli;
export {};
