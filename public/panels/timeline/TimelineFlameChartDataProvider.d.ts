import * as Common from '../../core/common/common.js';
import type * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as TraceEngine from '../../models/trace/trace.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import { CompatibilityTracksAppender, type TrackAppenderName } from './CompatibilityTracksAppender.js';
import { TimelineSelection } from './TimelineSelection.js';
export type TimelineFlameChartEntry = TraceEngine.Handlers.ModelHandlers.Frames.TimelineFrame | TraceEngine.Types.TraceEvents.TraceEventData;
export declare class TimelineFlameChartDataProvider extends Common.ObjectWrapper.ObjectWrapper<EventTypes> implements PerfUI.FlameChart.FlameChartDataProvider {
    #private;
    private droppedFramePatternCanvas;
    private partialFramePatternCanvas;
    private timelineDataInternal;
    private currentLevel;
    private compatibilityTracksAppender;
    private traceEngineData;
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
    private screenshotImageCache;
    private entryIndexToTitle;
    private lastInitiatorEntry;
    private lastInitiatorsData;
    private lastSelection?;
    constructor();
    hasTrackConfigurationMode(): boolean;
    getPossibleActions(entryIndex: number, groupIndex: number): PerfUI.FlameChart.PossibleFilterActions | void;
    customizedContextMenu(event: MouseEvent, entryIndex: number, groupIndex: number): UI.ContextMenu.ContextMenu | undefined;
    modifyTree(action: PerfUI.FlameChart.FilterAction, entryIndex: number): void;
    findPossibleContextMenuActions(entryIndex: number): PerfUI.FlameChart.PossibleFilterActions | void;
    handleFlameChartTransformKeyboardEvent(event: KeyboardEvent, entryIndex: number, groupIndex: number): void;
    private buildGroupStyle;
    setModel(traceEngineData: TraceEngine.Handlers.Types.TraceParseData | null, isCpuProfile?: boolean): void;
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
    groupTreeEvents(group: PerfUI.FlameChart.Group): TraceEngine.Types.TraceEvents.TraceEventData[] | null;
    mainFrameNavigationStartEvents(): readonly TraceEngine.Types.TraceEvents.TraceEventNavigationStart[];
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
    static timelineEntryIsTraceEvent(entry: TimelineFlameChartEntry): entry is TraceEngine.Types.TraceEvents.TraceEventData;
    search(visibleWindow: TraceEngine.Types.Timing.TraceWindowMicroSeconds, filter: TimelineModel.TimelineModelFilter.TimelineModelFilter): PerfUI.FlameChart.DataProviderSearchResult[];
    isIgnoreListedEvent(event: TraceEngine.Types.TraceEvents.TraceEventData): boolean;
    private isIgnoreListedURL;
    getEntryTypeForLevel(level: number): EntryType;
    prepareHighlightedEntryInfo(entryIndex: number): Element | null;
    prepareHighlightedHiddenEntriesArrowInfo(entryIndex: number): Element | null;
    entryColor(entryIndex: number): string;
    private preparePatternCanvas;
    private drawFrame;
    private drawScreenshot;
    decorateEntry(entryIndex: number, context: CanvasRenderingContext2D, text: string | null, barX: number, barY: number, barWidth: number, barHeight: number, unclippedBarX: number, timeToPixelRatio: number): boolean;
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
    indexForEvent(targetEvent: TraceEngine.Types.TraceEvents.TraceEventData | TraceEngine.Handlers.ModelHandlers.Frames.TimelineFrame): number | null;
    /**
     * Build the data for initiators and initiated entries.
     * @param entryIndex
     * @returns if we should re-render the flame chart (canvas)
     */
    buildFlowForInitiator(entryIndex: number): boolean;
    eventByIndex(entryIndex: number): TraceEngine.Types.TraceEvents.TraceEventData | TraceEngine.Handlers.ModelHandlers.Frames.TimelineFrame | null;
}
export declare const InstantEventVisibleDurationMs: TraceEngine.Types.Timing.MilliSeconds;
export declare const enum Events {
    DATA_CHANGED = "DataChanged"
}
export type EventTypes = {
    [Events.DATA_CHANGED]: void;
};
export declare const enum EntryType {
    FRAME = "Frame",
    TRACK_APPENDER = "TrackAppender",
    SCREENSHOT = "Screenshot"
}
