import type * as TraceEngine from '../../models/trace/trace.js';
/**
 * Represents when a user has selected an entry in the timeline
 */
export interface EntrySelected {
    type: 'ENTRY_SELECTED';
    entry: TraceEngine.Types.TraceEvents.TraceEventData;
}
/**
 * All supported overlay types. Expected to grow in time!
 */
export type TimelineOverlay = EntrySelected;
interface FlameChartDimensions {
    widthPixels: number;
    heightPixels: number;
    scrollOffsetPixels: number;
}
export declare class Overlays {
    #private;
    constructor(init: {
        container: HTMLElement;
    });
    /**
     * Add a new overlay to the view.
     */
    addOverlay(overlay: TimelineOverlay): void;
    /**
     * Update the dimenions of a chart.
     * IMPORTANT: this does not trigger a re-draw. You must call the render() method manually.
     */
    updateChartDimensions(chart: 'main' | 'network', dimensions: FlameChartDimensions): void;
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
    update(): void;
    /**
     * Calculate the X pixel position for an event on the timeline.
     * @param chart - the chart that the event is on. It is expected that both
     * charts have the same width so this doesn't make a difference - but it might
     * in the future if the UI changes, hence asking for it.
     *
     * @param event - the trace event you want to get the pixel position of
     */
    xPixelForEventOnChart(chart: 'main' | 'network', event: TraceEngine.Types.TraceEvents.TraceEventData): number;
}
export {};
