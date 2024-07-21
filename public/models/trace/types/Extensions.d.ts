import { type SyntheticTraceEntry, type TraceEventArgs, type TraceEventData } from './TraceEvents.js';
export type ExtensionEntryType = 'track-entry' | 'marker';
declare const extensionPalette: readonly ["primary", "primary-light", "primary-dark", "secondary", "secondary-light", "secondary-dark", "tertiary", "tertiary-light", "tertiary-dark", "error"];
export type ExtensionColorFromPalette = typeof extensionPalette[number];
export declare function colorIsValid(color: string): boolean;
export interface ExtensionDataPayloadBase {
    color?: ExtensionColorFromPalette;
    properties?: [string, string][];
    tooltipText?: string;
}
export type ExtensionDataPayload = ExtensionTrackEntryPayload | ExtensionMarkerPayload;
export interface ExtensionTrackEntryPayload extends ExtensionDataPayloadBase {
    dataType?: 'track-entry';
    track: string;
    trackGroup?: string;
}
export interface ExtensionMarkerPayload extends ExtensionDataPayloadBase {
    dataType: 'marker';
}
/**
 * Synthetic events created for extension tracks.
 */
export interface SyntheticExtensionTrackChartEntry extends SyntheticTraceEntry {
    args: TraceEventArgs & ExtensionTrackEntryPayload;
    cat: 'devtools.extension';
}
/**
 * Synthetic events created for extension marks.
 */
export interface SyntheticExtensionMarker extends SyntheticTraceEntry {
    args: TraceEventArgs & ExtensionMarkerPayload;
    cat: 'devtools.extension';
}
export type SyntheticExtensionEntry = SyntheticExtensionTrackChartEntry | SyntheticExtensionMarker;
export declare function isExtensionPayloadMarker(payload: {
    dataType?: string;
}): payload is ExtensionMarkerPayload;
export declare function isExtensionPayloadTrackEntry(payload: {
    track?: string;
    dataType?: string;
}): payload is ExtensionTrackEntryPayload;
export declare function isValidExtensionPayload(payload: {
    track?: string;
    dataType?: string;
}): payload is ExtensionDataPayload;
export declare function isSyntheticExtensionEntry(entry: TraceEventData): entry is SyntheticExtensionEntry;
export interface ExtensionTrackData {
    name: string;
    isTrackGroup: boolean;
    entriesByTrack: {
        [x: string]: SyntheticExtensionTrackChartEntry[];
    };
}
export {};
