import type * as CPUProfile from '../../cpu_profile/cpu_profile.js';
import * as Types from '../types/types.js';
type MatchedPairType<T extends Types.TraceEvents.TraceEventPairableAsync> = Types.TraceEvents.SyntheticEventPair<T>;
type MatchingPairableAsyncEvents = {
    begin: Types.TraceEvents.TraceEventPairableAsyncBegin | null;
    end: Types.TraceEvents.TraceEventPairableAsyncEnd | null;
    instant?: Types.TraceEvents.TraceEventPairableAsyncInstant[];
};
export declare function extractOriginFromTrace(firstNavigationURL: string): string | null;
export type EventsInThread<T extends Types.TraceEvents.TraceEventData> = Map<Types.TraceEvents.ThreadID, T[]>;
export declare function addEventToProcessThread<T extends Types.TraceEvents.TraceEventData>(event: T, eventsInProcessThread: Map<Types.TraceEvents.ProcessID, EventsInThread<T>>): void;
type TimeSpan = {
    ts: Types.Timing.MicroSeconds;
    dur?: Types.Timing.MicroSeconds;
};
export declare function eventTimeComparator(a: TimeSpan, b: TimeSpan): -1 | 0 | 1;
/**
 * Sorts all the events in place, in order, by their start time. If they have
 * the same start time, orders them by longest first.
 */
export declare function sortTraceEventsInPlace(events: {
    ts: Types.Timing.MicroSeconds;
    dur?: Types.Timing.MicroSeconds;
}[]): void;
/**
 * Returns an array of ordered events that results after merging the two
 * ordered input arrays.
 */
export declare function mergeEventsInOrder<T1 extends Types.TraceEvents.TraceEventData, T2 extends Types.TraceEvents.TraceEventData>(eventsArray1: readonly T1[], eventsArray2: readonly T2[]): (T1 | T2)[];
export declare function getNavigationForTraceEvent(event: Types.TraceEvents.TraceEventData, eventFrameId: string, navigationsByFrameId: Map<string, Types.TraceEvents.TraceEventNavigationStart[]>): Types.TraceEvents.TraceEventNavigationStart | null;
export declare function extractId(event: Types.TraceEvents.TraceEventPairableAsync | MatchedPairType<Types.TraceEvents.TraceEventPairableAsync>): string | undefined;
export declare function activeURLForFrameAtTime(frameId: string, time: Types.Timing.MicroSeconds, rendererProcessesByFrame: Map<string, Map<Types.TraceEvents.ProcessID, {
    frame: Types.TraceEvents.TraceFrame;
    window: Types.Timing.TraceWindowMicroSeconds;
}[]>>): string | null;
export declare function makeProfileCall(node: CPUProfile.ProfileTreeModel.ProfileNode, ts: Types.Timing.MicroSeconds, pid: Types.TraceEvents.ProcessID, tid: Types.TraceEvents.ThreadID): Types.TraceEvents.SyntheticProfileCall;
export declare function makeSyntheticTraceEntry(name: string, ts: Types.Timing.MicroSeconds, pid: Types.TraceEvents.ProcessID, tid: Types.TraceEvents.ThreadID): Types.TraceEvents.SyntheticTraceEntry;
/**
 * Matches beginning events with TraceEventPairableAsyncEnd and TraceEventPairableAsyncInstant (ASYNC_NESTABLE_INSTANT)
 * if provided, though currently only coming from Animations. Traces may contain multiple instant events so we need to
 * account for that.
 *
 * @returns {Map<string, MatchingPairableAsyncEvents>} Map of the animation's ID to it's matching events.
 */
export declare function matchEvents(unpairedEvents: Types.TraceEvents.TraceEventPairableAsync[]): Map<string, MatchingPairableAsyncEvents>;
export declare function createSortedSyntheticEvents<T extends Types.TraceEvents.TraceEventPairableAsync>(matchedPairs: Map<string, {
    begin: Types.TraceEvents.TraceEventPairableAsyncBegin | null;
    end: Types.TraceEvents.TraceEventPairableAsyncEnd | null;
    instant?: Types.TraceEvents.TraceEventPairableAsyncInstant[];
}>, syntheticEventCallback?: (syntheticEvent: MatchedPairType<T>) => void): MatchedPairType<T>[];
export declare function createMatchedSortedSyntheticEvents<T extends Types.TraceEvents.TraceEventPairableAsync>(unpairedAsyncEvents: T[], syntheticEventCallback?: (syntheticEvent: MatchedPairType<T>) => void): MatchedPairType<T>[];
/**
 * Different trace events return line/column numbers that are 1 or 0 indexed.
 * This function knows which events return 1 indexed numbers and normalizes
 * them. The UI expects 0 indexed line numbers, so that is what we return.
 */
export declare function getZeroIndexedLineAndColumnForEvent(event: Types.TraceEvents.TraceEventData): {
    lineNumber?: number;
    columnNumber?: number;
};
/**
 * Different trace events contain stack traces with line/column numbers
 * that are 1 or 0 indexed.
 * This function knows which events return 1 indexed numbers and normalizes
 * them. The UI expects 0 indexed line numbers, so that is what we return.
 */
export declare function getZeroIndexedStackTraceForEvent(event: Types.TraceEvents.TraceEventData): Types.TraceEvents.TraceEventCallFrame[] | null;
export declare function frameIDForEvent(event: Types.TraceEvents.TraceEventData): string | null;
export declare function findUpdateLayoutTreeEvents(events: Types.TraceEvents.TraceEventData[], startTime: Types.Timing.MicroSeconds, endTime?: Types.Timing.MicroSeconds): Types.TraceEvents.TraceEventUpdateLayoutTree[];
export {};
