import * as Trace from '../../models/trace/trace.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as Timeline from './timeline.js';
export interface TimelineInvariants {
    /** Entries placed on the same flame chart row (`entryLevels[i]`) must not overlap in time. */
    levelPacking: string[];
    /**
     * Renderer and CPU sample `TraceEntryTree` nodes must nest within parent time bounds, must not overlap
     * siblings, and must satisfy `selfTime + sum(children.dur) === dur`.
     */
    treeIntegrity: string[];
    /** Events returned by `groupTreeEvents(group)` for each track must be ordered by non-decreasing `ts`. */
    trackEventOrder: string[];
    /** Force-rebuilding `timelineData(true)` in place must preserve entry counts and per-track `groupTreeEvents`. */
    rebuild: string[];
    /**
     * Creating a `TimelineSelection` from a flame chart entry index via `createSelection(i)` and resolving it
     * back via `entryIndexForSelection(selection)` must return `i`.
     */
    selectionRoundTrip: string[];
    /**
     * Serializing a flame chart event via `EventsSerializer.keyForEvent(event)` and resolving that key back via
     * `eventForKey(key, parsedTrace)` must return the identical `Event` reference.
     */
    eventsSerializerRoundTrip: string[];
    /**
     * Across Bottom-up, Call Tree, Event Log, and 1P/3P tree views (full and zoomed), each row must satisfy
     * `0 <= selfTime <= totalTime <= windowMicros`, and top-level `selfTime` values must sum to `<= windowMicros`.
     */
    treeViewAccounting: string[];
    /** Applying `EntriesFilter` merge/collapse actions and running `UNDO_ALL_ACTIONS` must restore all entries. */
    entriesFilterUndo: string[];
}
export interface InvariantCheckContext {
    parsedTrace: Trace.TraceModel.ParsedTrace;
    entityMapper?: Trace.EntityMapper.EntityMapper;
    mainProvider?: Timeline.TimelineFlameChartDataProvider.TimelineFlameChartDataProvider;
    networkProvider?: Timeline.TimelineFlameChartNetworkDataProvider.TimelineFlameChartNetworkDataProvider;
}
type AnyFlameChartProvider = Timeline.TimelineFlameChartDataProvider.TimelineFlameChartDataProvider | Timeline.TimelineFlameChartNetworkDataProvider.TimelineFlameChartNetworkDataProvider;
export declare function checkTimelineInvariants(context: InvariantCheckContext): TimelineInvariants;
export declare function formatEventId(event: Trace.Types.Events.Event, serializer: Trace.EventsSerializer.EventsSerializer, minTs: number): string;
export declare function uniqueTrackNames(groups: readonly PerfUI.FlameChart.Group[]): string[];
export declare function groupEventsByTrack(provider: Timeline.TimelineFlameChartDataProvider.TimelineFlameChartDataProvider): Map<string, Trace.Types.Events.Event[]>;
export declare function representativeProbes(provider: AnyFlameChartProvider): Array<{
    index: number;
    label: string;
}>;
export interface ConfiguredTreeView {
    name: string;
    view: Timeline.TimelineTreeView.TimelineTreeView;
    windowMicros: Trace.Types.Timing.Micro;
}
export declare function buildTimelineTreeViews(parsedTrace: Trace.TraceModel.ParsedTrace, entityMapper: Trace.EntityMapper.EntityMapper, selectedEvents: Trace.Types.Events.Event[], includeGrouped?: boolean): IterableIterator<ConfiguredTreeView>;
export declare function treeNodeLabel(view: Timeline.TimelineTreeView.TimelineTreeView, node: Trace.Extras.TraceTree.Node, minUs: number): string;
export {};
