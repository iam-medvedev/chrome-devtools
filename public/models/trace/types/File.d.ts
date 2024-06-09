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
export type RawEventKey = ['r', number];
export type ProfileCallKey = ['p', ProcessID, ThreadID, SampleIndex, Protocol.integer];
export type SyntheticEventKey = ['s', number];
export type TraceEventSerializableKey = RawEventKey | ProfileCallKey | SyntheticEventKey;
export interface Modifications {
    entriesModifications: {
        hiddenEntries: string[];
        expandableEntries: string[];
    };
    initialBreadcrumb: Breadcrumb;
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
}
export type Contents = TraceFile | TraceEventData[];
