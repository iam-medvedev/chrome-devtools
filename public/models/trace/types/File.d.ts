import type * as Protocol from '../../../generated/protocol.js';
import { type TraceWindowMicroSeconds } from './Timing.js';
import { type ProcessID, type SampleIndex, type ThreadID, type TraceEventData } from './TraceEvents.js';
export type TraceFile = {
    traceEvents: readonly TraceEventData[];
    metadata: MetaData;
};
export interface Breadcrumb {
    window: TraceWindowMicroSeconds;
    child: Breadcrumb | null;
}
export declare const enum DataOrigin {
    CPUProfile = "CPUProfile",
    TraceEvents = "TraceEvents"
}
export declare const enum EventKeyType {
    RawEvent = "r",
    SyntheticEvent = "s",
    ProfileCall = "p"
}
/**
 * Represents an object that is saved in the file when user created annotations in the timeline.
 *
 * Expected to add more annotations.
 */
export interface SerializedAnnotations {
    entryLabels: EntryLabelAnnotationSerialized[];
    labelledTimeRanges: TimeRangeAnnotationSerialized[];
}
/**
 * Represents an object that is used to store the Entry Label annotation that is created when a user creates a label for an entry in the timeline.
 */
export interface EntryLabelAnnotation {
    type: 'ENTRY_LABEL';
    entry: TraceEventData;
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
/**
 * Represents an object that is saved in the file when a user creates a label for an entry in the timeline.
 */
export interface EntryLabelAnnotationSerialized {
    entry: TraceEventSerializableKey;
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
 * `Annotation` are the user-created annotations that are saved into the metadata.
 * Those annotations are rendered on the timeline by `Overlays.ts`
 *
 * TODO: Implement other OverlayAnnotations (annotated time ranges, links between entries).
 * TODO: Save/load overlay annotations to/from the trace file.
 */
export type Annotation = EntryLabelAnnotation | TimeRangeAnnotation;
export declare function isTimeRangeAnnotation(annotation: Annotation): annotation is TimeRangeAnnotation;
export declare function isEntryLabelAnnotation(annotation: Annotation): annotation is EntryLabelAnnotation;
export type RawEventKey = `${EventKeyType.RawEvent}-${number}`;
export type SyntheticEventKey = `${EventKeyType.SyntheticEvent}-${number}`;
export type ProfileCallKey = `${EventKeyType.ProfileCall}-${ProcessID}-${ThreadID}-${SampleIndex}-${Protocol.integer}`;
export type TraceEventSerializableKey = RawEventKey | ProfileCallKey | SyntheticEventKey;
export type RawEventKeyValues = {
    type: EventKeyType.RawEvent;
    rawIndex: number;
};
export type SyntheticEventKeyValues = {
    type: EventKeyType.SyntheticEvent;
    rawIndex: number;
};
export type ProfileCallKeyValues = {
    type: EventKeyType.ProfileCall;
    processID: ProcessID;
    threadID: ThreadID;
    sampleIndex: SampleIndex;
    protocol: Protocol.integer;
};
export type TraceEventSerializableKeyValues = RawEventKeyValues | ProfileCallKeyValues | SyntheticEventKeyValues;
export interface Modifications {
    entriesModifications: {
        hiddenEntries: TraceEventSerializableKey[];
        expandableEntries: TraceEventSerializableKey[];
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
export type Contents = TraceFile | TraceEventData[];
export declare function traceEventKeyToValues(key: TraceEventSerializableKey): TraceEventSerializableKeyValues;
