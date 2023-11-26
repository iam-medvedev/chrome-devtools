import * as TraceEngine from '../../models/trace/trace.js';
export interface InitiatorPair {
    event: TraceEngine.Types.TraceEvents.TraceEventData;
    initiator: TraceEngine.Types.TraceEvents.TraceEventData;
}
/**
 * Given an event that the user has selected, this function returns all the
 * pairs of events and their initiators that need to be drawn on the flamechart.
 * The reason that this can return multiple pairs is because we draw the
 * entire chain: for each event's initiator, we see if it had an initiator, and
 * work backwards to draw each one.
 */
export declare function eventInitiatorPairsToDraw(traceEngineData: TraceEngine.Handlers.Types.TraceParseData, selectedEvent: TraceEngine.Types.TraceEvents.TraceEventData): readonly InitiatorPair[];
