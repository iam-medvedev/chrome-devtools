import * as Trace from '../../models/trace/trace.js';
import { type CompatibilityTracksAppender, type HighlightedEntryInfo, type TrackAppender, type TrackAppenderName } from './CompatibilityTracksAppender.js';
export declare class ThreadAppender implements TrackAppender {
    #private;
    readonly appenderName: TrackAppenderName;
    readonly threadType: Trace.Handlers.Threads.ThreadType;
    readonly isOnMainFrame: boolean;
    constructor(compatibilityBuilder: CompatibilityTracksAppender, parsedTrace: Trace.Handlers.Types.ParsedTrace, processId: Trace.Types.Events.ProcessID, threadId: Trace.Types.Events.ThreadID, threadName: string | null, type: Trace.Handlers.Threads.ThreadType);
    processId(): Trace.Types.Events.ProcessID;
    threadId(): Trace.Types.Events.ThreadID;
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
    setHeaderNestingLevel(level: number): void;
    setHeaderAppended(headerAppended: boolean): void;
    headerAppended(): boolean;
    trackName(): string;
    getUrl(): string;
    getEntries(): Trace.Types.Events.Event[];
    isIgnoreListedEntry(entry: Trace.Types.Events.Event): boolean;
    private isIgnoreListedURL;
    /**
     * Gets the color an event added by this appender should be rendered with.
     */
    colorForEvent(event: Trace.Types.Events.Event): string;
    /**
     * Gets the title an event added by this appender should be rendered with.
     */
    titleForEvent(entry: Trace.Types.Events.Event): string;
    /**
     * Returns the info shown when an event added by this appender
     * is hovered in the timeline.
     */
    highlightedEntryInfo(event: Trace.Types.Events.Event): HighlightedEntryInfo;
}
