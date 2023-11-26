import * as TraceEngine from '../../models/trace/trace.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import { type CompatibilityTracksAppender, type HighlightedEntryInfo, type TrackAppender, type TrackAppenderName } from './CompatibilityTracksAppender.js';
export declare const enum ThreadType {
    MAIN_THREAD = "MAIN_THREAD",
    WORKER = "WORKER",
    RASTERIZER = "RASTERIZER",
    THREAD_POOL = "THREAD_POOL",
    AUCTION_WORKLET = "AUCTION_WORKLET",
    OTHER = "OTHER",
    CPU_PROFILE = "CPU_PROFILE"
}
export declare class ThreadAppender implements TrackAppender {
    #private;
    readonly appenderName: TrackAppenderName;
    readonly threadType: ThreadType;
    readonly isOnMainFrame: boolean;
    constructor(compatibilityBuilder: CompatibilityTracksAppender, traceParsedData: TraceEngine.Handlers.Types.TraceParseData, processId: TraceEngine.Types.TraceEvents.ProcessID, threadId: TraceEngine.Types.TraceEvents.ThreadID, threadName: string | null, type: ThreadType);
    modifyTree(traceEvent: TraceEngine.Types.TraceEvents.TraceEntry, action: TraceEngine.EntriesFilter.FilterAction, flameChartView: PerfUI.FlameChart.FlameChart): void;
    processId(): TraceEngine.Types.TraceEvents.ProcessID;
    threadId(): TraceEngine.Types.TraceEvents.ThreadID;
    /**
     * Appends into the flame chart data the data corresponding to the
     * this thread.
     * @param trackStartLevel the horizontal level of the flame chart events where
     * the track's events will start being appended.
     * @param expanded wether the track should be rendered expanded.
     * @returns the first available level to append more data after having
     * appended the track's events.
     */
    appendTrackAtLevel(trackStartLevel: number, expanded?: boolean): number;
    setHeaderAppended(headerAppended: boolean): void;
    headerAppended(): boolean;
    trackName(): string;
    isIgnoreListedEntry(entry: TraceEngine.Types.TraceEvents.TraceEventData): boolean;
    private isIgnoreListedURL;
    /**
     * Gets the color an event added by this appender should be rendered with.
     */
    colorForEvent(event: TraceEngine.Types.TraceEvents.TraceEventData): string;
    /**
     * Gets the title an event added by this appender should be rendered with.
     */
    titleForEvent(entry: TraceEngine.Types.TraceEvents.TraceEventData): string;
    /**
     * Returns the info shown when an event added by this appender
     * is hovered in the timeline.
     */
    highlightedEntryInfo(event: TraceEngine.Types.TraceEvents.SyntheticEventWithSelfTime): HighlightedEntryInfo;
}
