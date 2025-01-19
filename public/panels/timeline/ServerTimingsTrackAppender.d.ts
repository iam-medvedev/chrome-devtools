import type * as Trace from '../../models/trace/trace.js';
import { type CompatibilityTracksAppender, type TrackAppender, type TrackAppenderName } from './CompatibilityTracksAppender.js';
export declare class ServerTimingsTrackAppender implements TrackAppender {
    #private;
    readonly appenderName: TrackAppenderName;
    constructor(compatibilityBuilder: CompatibilityTracksAppender, parsedTrace: Trace.Handlers.Types.ParsedTrace);
    appendTrackAtLevel(trackStartLevel: number, expanded?: boolean): number;
    colorForEvent(): string;
}
