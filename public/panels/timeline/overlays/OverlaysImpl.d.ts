import * as Trace from '../../../models/trace/trace.js';
import type * as PerfUI from '../../../ui/legacy/components/perf_ui/perf_ui.js';
import * as Components from './components/components.js';
/**
 * Represents which flamechart an entry is rendered in.
 * We need to know this because when we place an overlay for an entry we need
 * to adjust its Y value if it's in the main chart which is drawn below the
 * network chart
 */
export type EntryChartLocation = 'main' | 'network';
/**
 * You can add overlays to trace events, but also right now frames are drawn on
 * the timeline but they are not trace events, so we need to allow for that.
 * In the future when the frames track has been migrated to be powered by
 * animation frames (crbug.com/345144583), we can remove the requirement to
 * support TimelineFrame instances (which themselves will be removed from the
 * codebase.)
 */
export type OverlayEntry = Trace.Types.Events.Event | Trace.Types.Events.LegacyTimelineFrame;
/**
 * Represents when a user has selected an entry in the timeline
 */
export interface EntrySelected {
    type: 'ENTRY_SELECTED';
    entry: OverlayEntry;
}
/**
 * Drawn around an entry when we want to highlight it to the user.
 */
export interface EntryOutline {
    type: 'ENTRY_OUTLINE';
    entry: OverlayEntry;
    outlineReason: 'ERROR' | 'INFO';
}
/**
 * Represents an object created when a user creates a label for an entry in the timeline.
 */
export interface EntryLabel {
    type: 'ENTRY_LABEL';
    entry: OverlayEntry;
    label: string;
}
export interface EntriesLink {
    type: 'ENTRIES_LINK';
    state: Trace.Types.File.EntriesLinkState;
    entryFrom: OverlayEntry;
    entryTo?: OverlayEntry;
}
/**
 * Represents a time range on the trace. Also used when the user shift+clicks
 * and drags to create a time range.
 */
export interface TimeRangeLabel {
    type: 'TIME_RANGE';
    bounds: Trace.Types.Timing.TraceWindowMicroSeconds;
    label: string;
    showDuration: boolean;
}
/**
 * Given a list of overlays, this method will calculate the smallest possible
 * trace window that will contain all of the overlays.
 * `overlays` is expected to be non-empty.
 */
export declare function traceWindowContainingOverlays(overlays: TimelineOverlay[]): Trace.Types.Timing.TraceWindowMicroSeconds;
/**
 * Get a list of entries for a given overlay.
 */
export declare function entriesForOverlay(overlay: TimelineOverlay): readonly OverlayEntry[];
export declare function chartForEntry(entry: OverlayEntry): EntryChartLocation;
/**
 * Used to highlight with a red-candy stripe a time range. It takes an entry
 * because this entry is the row that will be used to place the candy stripe,
 * and its height will be set to the height of that row.
 */
export interface CandyStripedTimeRange {
    type: 'CANDY_STRIPED_TIME_RANGE';
    bounds: Trace.Types.Timing.TraceWindowMicroSeconds;
    entry: Trace.Types.Events.Event;
}
/**
 * Represents a timespan on a trace broken down into parts. Each part has a label to it.
 * If an entry is defined, the breakdown will be vertically positioned based on it.
 */
export interface TimespanBreakdown {
    type: 'TIMESPAN_BREAKDOWN';
    sections: Array<Components.TimespanBreakdownOverlay.EntryBreakdown>;
    entry?: Trace.Types.Events.Event;
    renderLocation?: 'BOTTOM_OF_TIMELINE' | 'BELOW_EVENT' | 'ABOVE_EVENT';
}
export interface CursorTimestampMarker {
    type: 'CURSOR_TIMESTAMP_MARKER';
    timestamp: Trace.Types.Timing.MicroSeconds;
}
/**
 * All supported overlay types.
 */
export type TimelineOverlay = EntrySelected | EntryOutline | TimeRangeLabel | EntryLabel | EntriesLink | TimespanBreakdown | CursorTimestampMarker | CandyStripedTimeRange;
export interface TimelineOverlaySetOptions {
    updateTraceWindow: boolean;
}
/**
 * Denotes overlays that are singletons; only one of these will be allowed to
 * exist at any given time. If one exists and the add() method is called, the
 * new overlay will replace the existing one.
 */
type SingletonOverlay = EntrySelected | CursorTimestampMarker;
export declare function overlayIsSingleton(overlay: TimelineOverlay): overlay is SingletonOverlay;
/**
 * The dimensions each flame chart reports. Note that in the current UI they
 * will always have the same width, so theoretically we could only gather that
 * from one chart, but we gather it from both for simplicity and to cover us in
 * the future should the UI change and the charts have different widths.
 */
interface FlameChartDimensions {
    widthPixels: number;
    heightPixels: number;
    scrollOffsetPixels: number;
    allGroupsCollapsed: boolean;
}
export interface TimelineCharts {
    mainChart: PerfUI.FlameChart.FlameChart;
    mainProvider: PerfUI.FlameChart.FlameChartDataProvider;
    networkChart: PerfUI.FlameChart.FlameChart;
    networkProvider: PerfUI.FlameChart.FlameChartDataProvider;
}
export interface OverlayEntryQueries {
    isEntryCollapsedByUser: (entry: Trace.Types.Events.Event) => boolean;
    firstVisibleParentForEntry: (entry: Trace.Types.Events.Event) => Trace.Types.Events.Event | null;
}
export type UpdateAction = 'Remove' | 'Update';
export declare class AnnotationOverlayActionEvent extends Event {
    overlay: TimelineOverlay;
    action: UpdateAction;
    static readonly eventName = "annotationoverlayactionsevent";
    constructor(overlay: TimelineOverlay, action: UpdateAction);
}
/**
 * This class manages all the overlays that get drawn onto the performance
 * timeline. Overlays are DOM and are drawn above the network and main flame
 * chart.
 *
 * For more documentation, see `timeline/README.md` which has a section on overlays.
 */
export declare class Overlays extends EventTarget {
    #private;
    constructor(init: {
        container: HTMLElement;
        flameChartsContainers: {
            main: HTMLElement;
            network: HTMLElement;
        };
        charts: TimelineCharts;
        entryQueries: OverlayEntryQueries;
    });
    /**
     * Add a new overlay to the view.
     */
    add<T extends TimelineOverlay>(newOverlay: T): T;
    /**
     * Update an existing overlay without destroying and recreating its
     * associated DOM.
     *
     * This is useful if you need to rapidly update an overlay's data - e.g.
     * dragging to create time ranges - without the thrashing of destroying the
     * old overlay and re-creating the new one.
     */
    updateExisting<T extends TimelineOverlay>(existingOverlay: T, newData: Partial<T>): void;
    enterLabelEditMode(overlay: EntryLabel): void;
    /**
     * @returns the list of overlays associated with a given entry.
     */
    overlaysForEntry(entry: OverlayEntry): TimelineOverlay[];
    /**
     * Removes any active overlays that match the provided type.
     * @returns the number of overlays that were removed.
     */
    removeOverlaysOfType(type: TimelineOverlay['type']): number;
    /**
     * @returns all overlays that match the provided type.
     */
    overlaysOfType<T extends TimelineOverlay>(type: T['type']): NoInfer<T>[];
    /**
     * Removes the provided overlay from the list of overlays and destroys any
     * DOM associated with it.
     */
    remove(overlay: TimelineOverlay): void;
    /**
     * Update the dimenions of a chart.
     * IMPORTANT: this does not trigger a re-draw. You must call the render() method manually.
     */
    updateChartDimensions(chart: EntryChartLocation, dimensions: FlameChartDimensions): void;
    /**
     * Update the visible window of the UI.
     * IMPORTANT: this does not trigger a re-draw. You must call the render() method manually.
     */
    updateVisibleWindow(visibleWindow: Trace.Types.Timing.TraceWindowMicroSeconds): void;
    /**
     * Clears all overlays and all data. Call this when the trace is changing
     * (e.g. the user has imported/recorded a new trace) and we need to start from
     * scratch and remove all overlays relating to the preivous trace.
     */
    reset(): void;
    /**
     * Updates the Overlays UI: new overlays will be rendered onto the view, and
     * existing overlays will have their positions changed to ensure they are
     * rendered in the right place.
     */
    update(): Promise<void>;
    /**
     * @returns true if the entry is visible on chart, which means that both
     * horizontally and vertically it is at least partially in view.
     */
    entryIsVisibleOnChart(entry: OverlayEntry): boolean;
    /**
     * Calculate the X pixel position for an event start on the timeline.
     * @param chartName - the chart that the event is on. It is expected that both
     * charts have the same width so this doesn't make a difference - but it might
     * in the future if the UI changes, hence asking for it.
     *
     * @param event - the trace event you want to get the pixel position of
     */
    xPixelForEventStartOnChart(event: OverlayEntry): number | null;
    /**
     * Calculate the X pixel position for an event end on the timeline.
     * @param chartName - the chart that the event is on. It is expected that both
     * charts have the same width so this doesn't make a difference - but it might
     * in the future if the UI changes, hence asking for it.
     *
     * @param event - the trace event you want to get the pixel position of
     */
    xPixelForEventEndOnChart(event: OverlayEntry): number | null;
    /**
     * Calculate the Y pixel position for the event on the timeline relative to
     * the entire window.
     * This means if the event is in the main flame chart and below the network,
     * we add the height of the network chart to the Y value to position it
     * correctly.
     * This can return null if any data was missing, or if the event is not
     * visible (if the level it's on is hidden because the track is collapsed,
     * for example)
     */
    yPixelForEventOnChart(event: OverlayEntry): number | null;
    /**
     * Calculate the height of the event on the timeline.
     */
    pixelHeightForEventOnChart(event: OverlayEntry): number | null;
    /**
     * Calculate the height of the network chart. If the network chart has
     * height, we also allow for the size of the resize handle shown between the
     * two charts.
     *
     * Note that it is possible for the chart to have 0 height if the user is
     * looking at a trace with no network requests.
     */
    networkChartOffsetHeight(): number;
}
/**
 * Because entries can be a TimelineFrame, which is not a trace event, this
 * helper exists to return a consistent set of timings regardless of the type
 * of entry.
 */
export declare function timingsForOverlayEntry(entry: OverlayEntry): Trace.Helpers.Timing.EventTimingsData<Trace.Types.Timing.MicroSeconds>;
/**
 * Defines if the overlay container `div` should have a jslog context attached.
 * Note that despite some of the overlays being used currently exclusively
 * for annotations, we log here with `overlays` to be generic as overlays can
 * be used for insights, annotations or in the future, who knows...
 */
export declare function jsLogContext(overlay: TimelineOverlay): string | null;
export {};
