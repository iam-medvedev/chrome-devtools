import * as Trace from '../../models/trace/trace.js';
import { type CompatibilityTracksAppender, type TrackAppender, type TrackAppenderName } from './CompatibilityTracksAppender.js';
export declare class ExtensionTrackAppender implements TrackAppender {
    #private;
    readonly appenderName: TrackAppenderName;
    constructor(compatibilityBuilder: CompatibilityTracksAppender, extensionTracks: Trace.Types.Extensions.ExtensionTrackData);
    appendTrackAtLevel(trackStartLevel: number, expanded?: boolean): number;
    colorForEvent(event: Trace.Types.Events.Event): string;
    titleForEvent(event: Trace.Types.Events.Event): string;
}
