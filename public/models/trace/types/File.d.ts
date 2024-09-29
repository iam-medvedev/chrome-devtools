import type * as Protocol from '../../../generated/protocol.js';
import { type TraceWindowMicroSeconds } from './Timing.js';
import { type Event, type LegacyTimelineFrame, type ProcessID, type SampleIndex, type ThreadID } from './TraceEvents.js';
export type TraceFile = {
    traceEvents: readonly Event[];
    metadata: MetaData;
};
export interface Breadcrumb {
    window: TraceWindowMicroSeconds;
    child: Breadcrumb | null;
}
export declare const enum DataOrigin {
    CPU_PROFILE = "CPUProfile",
    TRACE_EVENTS = "TraceEvents"
}
/**
 * The Entries link can have 3 stated:
 *  1. The Link creation is not started yet, meaning only the button that needs to be clicked to start creating the link is visible.
 *  2. Pending to event - the creation is started, but the entry that the link points to has not been chosen yet
 *  3. Link connected - final state, both entries present
 */
export declare const enum EntriesLinkState {
    CREATION_NOT_STARTED = "creation_not_started",
    PENDING_TO_EVENT = "pending_to_event",
    CONNECTED = "connected"
}
export declare const enum EventKeyType {
    RAW_EVENT = "r",
    SYNTHETIC_EVENT = "s",
    PROFILE_CALL = "p",
    LEGACY_TIMELINE_FRAME = "l"
}
/**
 * Represents an object that is saved in the file when user created annotations in the timeline.
 *
 * Expected to add more annotations.
 */
export interface SerializedAnnotations {
    entryLabels: EntryLabelAnnotationSerialized[];
    labelledTimeRanges: TimeRangeAnnotationSerialized[];
    linksBetweenEntries: EntriesLinkAnnotationSerialized[];
}
/**
 * Represents an object that is used to store the Entry Label annotation that is created when a user creates a label for an entry in the timeline.
 */
export interface EntryLabelAnnotation {
    type: 'ENTRY_LABEL';
    entry: Event | LegacyTimelineFrame;
    label: string;
}
/**
 * Represents an object that is used to store the Labelled Time Range Annotation that is created when a user creates a Time Range Selection in the timeline.
 */
export interface TimeRangeAnnotation {
    type: 'TIME_RANGE';
    label: string;
    bounds: TraceWindowMicroSeconds;
}
export interface EntriesLinkAnnotation {
    type: 'ENTRIES_LINK';
    state: EntriesLinkState;
    entryFrom: Event;
    entryTo?: Event;
}
/**
 * Represents an object that is saved in the file when a user creates a label for an entry in the timeline.
 */
export interface EntryLabelAnnotationSerialized {
    entry: SerializableKey;
    label: string;
}
/**
 * Represents an object that is saved in the file when a user creates a time range with a label in the timeline.
 */
export interface TimeRangeAnnotationSerialized {
    bounds: TraceWindowMicroSeconds;
    label: string;
}
/**
 * Represents an object that is saved in the file when a user creates a link between entries in the timeline.
 */
export interface EntriesLinkAnnotationSerialized {
    entryFrom: SerializableKey;
    entryTo: SerializableKey;
}
/**
 * `Annotation` are the user-created annotations that are saved into the metadata.
 * Those annotations are rendered on the timeline by `Overlays.ts`
 *
 * TODO: Implement other OverlayAnnotations (annotated time ranges, links between entries).
 * TODO: Save/load overlay annotations to/from the trace file.
 */
export type Annotation = EntryLabelAnnotation | TimeRangeAnnotation | EntriesLinkAnnotation;
export declare function isTimeRangeAnnotation(annotation: Annotation): annotation is TimeRangeAnnotation;
export declare function isEntryLabelAnnotation(annotation: Annotation): annotation is EntryLabelAnnotation;
export declare function isEntriesLinkAnnotation(annotation: Annotation): annotation is EntriesLinkAnnotation;
export type RawEventKey = `${EventKeyType.RAW_EVENT}-${number}`;
export type SyntheticEventKey = `${EventKeyType.SYNTHETIC_EVENT}-${number}`;
export type ProfileCallKey = `${EventKeyType.PROFILE_CALL}-${ProcessID}-${ThreadID}-${SampleIndex}-${Protocol.integer}`;
export type LegacyTimelineFrameKey = `${EventKeyType.LEGACY_TIMELINE_FRAME}-${number}`;
export type SerializableKey = RawEventKey | ProfileCallKey | SyntheticEventKey | LegacyTimelineFrameKey;
export type RawEventKeyValues = {
    type: EventKeyType.RAW_EVENT;
    rawIndex: number;
};
export type SyntheticEventKeyValues = {
    type: EventKeyType.SYNTHETIC_EVENT;
    rawIndex: number;
};
export type ProfileCallKeyValues = {
    type: EventKeyType.PROFILE_CALL;
    processID: ProcessID;
    threadID: ThreadID;
    sampleIndex: SampleIndex;
    protocol: Protocol.integer;
};
export type LegacyTimelineFrameKeyValues = {
    type: EventKeyType.LEGACY_TIMELINE_FRAME;
    rawIndex: number;
};
export type SerializableKeyValues = RawEventKeyValues | ProfileCallKeyValues | SyntheticEventKeyValues | LegacyTimelineFrameKeyValues;
export interface Modifications {
    entriesModifications: {
        hiddenEntries: SerializableKey[];
        expandableEntries: SerializableKey[];
    };
    initialBreadcrumb: Breadcrumb;
    annotations: SerializedAnnotations;
}
/**
 * Trace metadata that we persist to the file. This will allow us to
 * store specifics for the trace, e.g., which tracks should be visible
 * on load.
 */
export interface MetaData {
    source?: 'DevTools';
    startTime?: string;
    networkThrottling?: string;
    cpuThrottling?: number;
    hardwareConcurrency?: number;
    dataOrigin?: DataOrigin;
    modifications?: Modifications;
    enhancedTraceVersion?: number;
}
export type Contents = TraceFile | Event[];
export declare function traceEventKeyToValues(key: SerializableKey): SerializableKeyValues;
