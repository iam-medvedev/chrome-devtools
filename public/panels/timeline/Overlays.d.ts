import * as TraceEngine from '../../models/trace/trace.js';
import type * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import { type TimelineFlameChartDataProvider } from './TimelineFlameChartDataProvider.js';
import { type TimelineFlameChartNetworkDataProvider } from './TimelineFlameChartNetworkDataProvider.js';
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
export type OverlayEntry = TraceEngine.Types.TraceEvents.TraceEventData | TraceEngine.Handlers.ModelHandlers.Frames.TimelineFrame;
/**
 * Represents when a user has selected an entry in the timeline
 */
export interface EntrySelected {
    type: 'ENTRY_SELECTED';
    entry: OverlayEntry;
}
/**
 * All supported overlay types. Expected to grow in time!
 */
export type TimelineOverlay = EntrySelected;
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
}
export interface TimelineCharts {
    mainChart: PerfUI.FlameChart.FlameChart;
    mainProvider: TimelineFlameChartDataProvider;
    networkChart: PerfUI.FlameChart.FlameChart;
    networkProvider: TimelineFlameChartNetworkDataProvider;
}
export declare class Overlays {
    #private;
    constructor(init: {
        container: HTMLElement;
        charts: TimelineCharts;
    });
    /**
     * Add a new overlay to the view.
     */
    addOverlay(overlay: TimelineOverlay): void;
    /**
     * @returns the list of overlays associated with a given entry.
     */
    overlaysForEntry(entry: OverlayEntry): TimelineOverlay[];
    /**
     * Removes any active overlays that match the provided type.
     */
    removeOverlaysOfType(type: TimelineOverlay['type']): void;
    /**
     * Update the dimenions of a chart.
     * IMPORTANT: this does not trigger a re-draw. You must call the render() method manually.
     */
    updateChartDimensions(chart: EntryChartLocation, dimensions: FlameChartDimensions): void;
    /**
     * Update the visible window of the UI.
     * IMPORTANT: this does not trigger a re-draw. You must call the render() method manually.
     */
    updateVisibleWindow(visibleWindow: TraceEngine.Types.Timing.TraceWindowMicroSeconds): void;
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
    update(): void;
    /**
     * @returns true if the entry is visible on chart, which means that both
     * horizontally and vertically it is at least partially in view.
     */
    entryIsVisibleOnChart(entry: OverlayEntry): boolean;
    /**
     * Calculate the X pixel position for an event on the timeline.
     * @param chartName - the chart that the event is on. It is expected that both
     * charts have the same width so this doesn't make a difference - but it might
     * in the future if the UI changes, hence asking for it.
     *
     * @param event - the trace event you want to get the pixel position of
     */
    xPixelForEventOnChart(event: OverlayEntry): number | null;
    /**
     * Calculate the Y pixel position for the event on the timeline relative to
     * the entire window.
     * This means if the event is in the main flame chart and below the network,
     * we add the height of the network chart to the Y value to position it
     * correctly.
     */
    yPixelForEventOnChart(event: OverlayEntry): number | null;
    /**
     * Calculate the height of the event on the timeline.
     */
    pixelHeightForEventOnChart(event: OverlayEntry): number | null;
}
export {};
