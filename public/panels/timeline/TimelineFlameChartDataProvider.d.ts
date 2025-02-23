import * as Common from '../../core/common/common.js';
import * as Trace from '../../models/trace/trace.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import { CompatibilityTracksAppender, type DrawOverride, type TrackAppenderName } from './CompatibilityTracksAppender.js';
import { type TimelineSelection } from './TimelineSelection.js';
import * as Utils from './utils/utils.js';
export declare class TimelineFlameChartDataProvider extends Common.ObjectWrapper.ObjectWrapper<EventTypes> implements PerfUI.FlameChart.FlameChartDataProvider {
    #private;
    private droppedFramePatternCanvas;
    private partialFramePatternCanvas;
    private timelineDataInternal;
    private currentLevel;
    private compatibilityTracksAppender;
    private parsedTrace;
    private timeSpan;
    private readonly framesGroupStyle;
    private readonly screenshotsGroupStyle;
    private entryData;
    private entryTypeByLevel;
    private entryIndexToTitle;
    private lastInitiatorEntry;
    private lastInitiatorsData;
    private lastSelection;
    constructor();
    hasTrackConfigurationMode(): boolean;
    getPossibleActions(entryIndex: number, groupIndex: number): PerfUI.FlameChart.PossibleFilterActions | void;
    customizedContextMenu(mouseEvent: MouseEvent, entryIndex: number, groupIndex: number): UI.ContextMenu.ContextMenu | undefined;
    entryHasAnnotations(entryIndex: number): boolean;
    deleteAnnotationsForEntry(entryIndex: number): void;
    modifyTree(action: PerfUI.FlameChart.FilterAction, entryIndex: number): void;
    findPossibleContextMenuActions(entryIndex: number): PerfUI.FlameChart.PossibleFilterActions | void;
    handleFlameChartTransformKeyboardEvent(event: KeyboardEvent, entryIndex: number, groupIndex: number): void;
    private buildGroupStyle;
    setModel(parsedTrace: Trace.Handlers.Types.ParsedTrace, entityMapper: Utils.EntityMapper.EntityMapper): void;
    /**
     * Instances and caches a CompatibilityTracksAppender using the
     * internal flame chart data and the trace parsed data coming from the
     * trace engine.
     * The model data must have been set to the data provider instance before
     * attempting to instance the CompatibilityTracksAppender.
     */
    compatibilityTracksAppenderInstance(forceNew?: boolean): CompatibilityTracksAppender;
    /**
     * Builds the flame chart data using the track appenders
     */
    buildFromTrackAppendersForTest(options?: {
        filterThreadsByName?: string;
        expandedTracks?: Set<TrackAppenderName>;
    }): void;
    groupTreeEvents(group: PerfUI.FlameChart.Group): Trace.Types.Events.Event[] | null;
    mainFrameNavigationStartEvents(): readonly Trace.Types.Events.NavigationStart[];
    entryTitle(entryIndex: number): string | null;
    textColor(index: number): string;
    entryFont(_index: number): string | null;
    /**
     * Clear the cache and rebuild the timeline data This should be called
     * when the trace file is the same but we want to rebuild the timeline
     * data. Some possible example: when we hide/unhide an event, or the
     * ignore list is changed etc.
     */
    rebuildTimelineData(): void;
    /**
     * Reset all data other than the UI elements.
     * This should be called when
     * - initialized the data provider
     * - a new trace file is coming (when `setModel()` is called)
     * etc.
     */
    reset(): void;
    maxStackDepth(): number;
    /**
     * Builds the flame chart data using the tracks appender (which use
     * the new trace engine). The result built data is cached and returned.
     */
    timelineData(rebuild?: boolean): PerfUI.FlameChart.FlameChartTimelineData;
    minimumBoundary(): number;
    totalTime(): number;
    search(visibleWindow: Trace.Types.Timing.TraceWindowMicro, filter?: Trace.Extras.TraceFilter.TraceFilter): PerfUI.FlameChart.DataProviderSearchResult[];
    getEntryTypeForLevel(level: number): EntryType;
    preparePopoverElement(entryIndex: number): Element | null;
    preparePopoverForCollapsedArrow(entryIndex: number): Element | null;
    getDrawOverride(entryIndex: number): DrawOverride | undefined;
    entryColor(entryIndex: number): string;
    private preparePatternCanvas;
    private drawFrame;
    private drawScreenshot;
    decorateEntry(entryIndex: number, context: CanvasRenderingContext2D, text: string | null, barX: number, barY: number, barWidth: number, barHeight: number, unclippedBarX: number, timeToPixelRatio: number, transformColor: (color: string) => string): boolean;
    forceDecoration(entryIndex: number): boolean;
    private appendHeader;
    createSelection(entryIndex: number): TimelineSelection | null;
    formatValue(value: number, precision?: number): string;
    groupForEvent(entryIndex: number): PerfUI.FlameChart.Group | null;
    canJumpToEntry(_entryIndex: number): boolean;
    entryIndexForSelection(selection: TimelineSelection | null): number;
    /**
     * Return the index for the given entry. Note that this method assumes that
     * timelineData() has been generated. If it hasn't, this method will return
     * null.
     */
    indexForEvent(targetEvent: Trace.Types.Events.Event): number | null;
    /**
     * Build the data for initiators and initiated entries.
     * @param entryIndex
     * @returns if we should re-render the flame chart (canvas)
     */
    buildFlowForInitiator(entryIndex: number): boolean;
    eventByIndex(entryIndex: number): Trace.Types.Events.Event | null;
}
export declare const InstantEventVisibleDurationMs: Trace.Types.Timing.Milli;
export declare const enum Events {
    DATA_CHANGED = "DataChanged",
    FLAME_CHART_ITEM_HOVERED = "FlameChartItemHovered"
}
export interface EventTypes {
    [Events.DATA_CHANGED]: void;
    [Events.FLAME_CHART_ITEM_HOVERED]: Trace.Types.Events.Event | null;
}
export declare const enum EntryType {
    FRAME = "Frame",
    TRACK_APPENDER = "TrackAppender",
    SCREENSHOT = "Screenshot"
}
