import * as Common from '../../core/common/common.js';
import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as TraceEngine from '../../models/trace/trace.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import { CompatibilityTracksAppender, type TrackAppenderName } from './CompatibilityTracksAppender.js';
import { type PerformanceModel } from './PerformanceModel.js';
import { TimelineSelection } from './TimelineSelection.js';
export type TimelineFlameChartEntry = (TraceEngine.Legacy.Event | TraceEngine.Handlers.ModelHandlers.Frames.TimelineFrame | TraceEngine.Types.TraceEvents.TraceEventData);
export declare class TimelineFlameChartDataProvider extends Common.ObjectWrapper.ObjectWrapper<EventTypes> implements PerfUI.FlameChart.FlameChartDataProvider {
    #private;
    private droppedFramePatternCanvas;
    private partialFramePatternCanvas;
    private timelineDataInternal;
    private currentLevel;
    private legacyPerformanceModel;
    private compatibilityTracksAppender;
    private legacyTimelineModel;
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
    private asyncColorByCategory;
    private lastInitiatorEntry;
    private entryParent;
    private lastSelection?;
    private colorForEvent?;
    constructor();
    modifyTree(group: PerfUI.FlameChart.Group, node: number, action: TraceEngine.EntriesFilter.FilterAction, flameChartView: PerfUI.FlameChart.FlameChart): void;
    findPossibleContextMenuActions(group: PerfUI.FlameChart.Group, node: number): TraceEngine.EntriesFilter.PossibleFilterActions | void;
    private buildGroupStyle;
    setModel(performanceModel: PerformanceModel | null, newTraceEngineData: TraceEngine.Handlers.Types.TraceParseData | null, isCpuProfile?: boolean): void;
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
    groupTrack(group: PerfUI.FlameChart.Group): TimelineModel.TimelineModel.Track | null;
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
    private processInspectorTrace;
    /**
     * Appends a track in the flame chart using the legacy system.
     * @param track the legacy track to be rendered.
     * @param expanded if the track is expanded.
     */
    appendLegacyTrackData(track: TimelineModel.TimelineModel.Track, expanded?: boolean): void;
    minimumBoundary(): number;
    totalTime(): number;
    /**
     * Narrows an entry of type TimelineFlameChartEntry to the 2 types of
     * simple trace events (legacy and new engine definitions).
     */
    static isEntryRegularEvent(entry: TimelineFlameChartEntry): entry is (TraceEngine.Types.TraceEvents.TraceEventData | TraceEngine.Legacy.Event);
    search(startTime: number, endTime: number, filter: TimelineModel.TimelineModelFilter.TimelineModelFilter): number[];
    private appendSyncEvents;
    isIgnoreListedEvent(event: TraceEngine.Legacy.CompatibleTraceEvent): boolean;
    private isIgnoreListedURL;
    private appendAsyncEventsGroup;
    getEntryTypeForLevel(level: number): EntryType;
    private appendFrames;
    private entryType;
    prepareHighlightedEntryInfo(entryIndex: number): Element | null;
    entryColor(entryIndex: number): string;
    private genericTraceEventColor;
    private preparePatternCanvas;
    private drawFrame;
    private drawScreenshot;
    decorateEntry(entryIndex: number, context: CanvasRenderingContext2D, text: string | null, barX: number, barY: number, barWidth: number, barHeight: number, unclippedBarX: number, timeToPixelRatio: number): boolean;
    forceDecoration(entryIndex: number): boolean;
    private appendHeader;
    private appendEvent;
    private appendAsyncEvent;
    createSelection(entryIndex: number): TimelineSelection | null;
    formatValue(value: number, precision?: number): string;
    canJumpToEntry(_entryIndex: number): boolean;
    entryIndexForSelection(selection: TimelineSelection | null): number;
    getIndexForEvent(targetEvent: TraceEngine.Types.TraceEvents.TraceEventData): number | null;
    buildFlowForInitiator(entryIndex: number): boolean;
    eventByIndex(entryIndex: number): TraceEngine.Legacy.CompatibleTraceEvent | null;
    setEventColorMapping(colorForEvent: (arg0: TraceEngine.Legacy.Event) => string): void;
    get performanceModel(): PerformanceModel | null;
}
export declare const InstantEventVisibleDurationMs = 0.001;
export declare enum Events {
    DataChanged = "DataChanged"
}
export type EventTypes = {
    [Events.DataChanged]: void;
};
export declare enum EntryType {
    Frame = "Frame",
    Event = "Event",
    TrackAppender = "TrackAppender",
    Screenshot = "Screenshot"
}
