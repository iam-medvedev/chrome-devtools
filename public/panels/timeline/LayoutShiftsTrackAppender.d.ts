import * as Trace from '../../models/trace/trace.js';
import { type CompatibilityTracksAppender, type DrawOverride, type HighlightedEntryInfo, type TrackAppender, type TrackAppenderName } from './CompatibilityTracksAppender.js';
export declare const LAYOUT_SHIFT_SYNTHETIC_DURATION: Trace.Types.Timing.MicroSeconds;
export declare class LayoutShiftsTrackAppender implements TrackAppender {
    #private;
    readonly appenderName: TrackAppenderName;
    constructor(compatibilityBuilder: CompatibilityTracksAppender, parsedTrace: Trace.Handlers.Types.ParsedTrace);
    /**
     * Appends into the flame chart data the data corresponding to the
     * layout shifts track.
     * @param trackStartLevel the horizontal level of the flame chart events where
     * the track's events will start being appended.
     * @param expanded wether the track should be rendered expanded.
     * @returns the first available level to append more data after having
     * appended the track's events.
     */
    appendTrackAtLevel(trackStartLevel: number, expanded?: boolean): number;
    /**
     * Gets the color an event added by this appender should be rendered with.
     */
    colorForEvent(_event: Trace.Types.Events.Event): string;
    /**
     * Gets the title an event added by this appender should be rendered with.
     */
    titleForEvent(event: Trace.Types.Events.Event): string;
    /**
     * Returns the info shown when an event added by this appender
     * is hovered in the timeline.
     */
    highlightedEntryInfo(event: Trace.Types.Events.LayoutShift): HighlightedEntryInfo;
    getDrawOverride(event: Trace.Types.Events.Event): DrawOverride | undefined;
}
