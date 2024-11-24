import * as Common from '../../core/common/common.js';
import * as Trace from '../../models/trace/trace.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import { CompatibilityTracksAppender, type DrawOverride, type TrackAppenderName } from './CompatibilityTracksAppender.js';
import { type TimelineSelection } from './TimelineSelection.js';
export declare class TimelineFlameChartDataProvider extends Common.ObjectWrapper.ObjectWrapper<EventTypes> implements PerfUI.FlameChart.FlameChartDataProvider {
    #private;
    private droppedFramePatternCanvas;
    private partialFramePatternCanvas;
    private timelineDataInternal;
    private currentLevel;
    private compatibilityTracksAppender;
    private parsedTrace;
    private isCpuProfile;
    private minimumBoundaryInternal;
    private timeSpan;
    private readonly headerLevel1;
    private readonly headerLevel2;
    private readonly staticHeader;
    private framesHeader;
    private readonly screenshotsHeader;
    private entryData;
    private entryTypeByLevel;
    private entryIndexToTitle;
    private lastInitiatorEntry;
    private lastInitiatorsData;
    private lastSelection?;
    constructor();
    hasTrackConfigurationMode(): boolean;
    getPossibleActions(entryIndex: number, groupIndex: number): PerfUI.FlameChart.PossibleFilterActions | void;
    customizedContextMenu(event: MouseEvent, entryIndex: number, groupIndex: number): UI.ContextMenu.ContextMenu | undefined;
    entryHasAnnotations(entryIndex: number): boolean;
    deleteAnnotationsForEntry(entryIndex: number): void;
    modifyTree(action: PerfUI.FlameChart.FilterAction, entryIndex: number): void;
    findPossibleContextMenuActions(entryIndex: number): PerfUI.FlameChart.PossibleFilterActions | void;
    handleFlameChartTransformKeyboardEvent(event: KeyboardEvent, entryIndex: number, groupIndex: number): void;
    private buildGroupStyle;
    setModel(parsedTrace: Trace.Handlers.Types.ParsedTrace | null, isCpuProfile?: boolean): void;
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
    buildFromTrackAppenders(options?: {
        filterThreadsByName?: string;
        expandedTracks?: Set<TrackAppenderName>;
    }): void;
    groupTreeEvents(group: PerfUI.FlameChart.Group): Trace.Types.Events.Event[] | null;
    mainFrameNavigationStartEvents(): readonly Trace.Types.Events.NavigationStart[];
    entryTitle(entryIndex: number): string | null;
    textColor(index: number): string;
    entryFont(_index: number): string | null;
    reset(resetCompatibilityTracksAppender?: boolean): void;
    maxStackDepth(): number;
    /**
     * Builds the flame chart data using the tracks appender (which use
     * the new trace engine) and the legacy code paths present in this
     * file. The result built data is cached and returned.
     */
    timelineData(rebuild?: boolean): PerfUI.FlameChart.FlameChartTimelineData;
    minimumBoundary(): number;
    totalTime(): number;
    search(visibleWindow: Trace.Types.Timing.TraceWindowMicroSeconds, filter?: Trace.Extras.TraceFilter.TraceFilter): PerfUI.FlameChart.DataProviderSearchResult[];
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
export declare const InstantEventVisibleDurationMs: Trace.Types.Timing.MilliSeconds;
export declare const enum Events {
    DATA_CHANGED = "DataChanged",
    FLAME_CHART_ITEM_HOVERED = "FlameChartItemHovered"
}
export type EventTypes = {
    [Events.DATA_CHANGED]: void;
    [Events.FLAME_CHART_ITEM_HOVERED]: Trace.Types.Events.Event | null;
};
export declare const enum EntryType {
    FRAME = "Frame",
    TRACK_APPENDER = "TrackAppender",
    SCREENSHOT = "Screenshot"
}
