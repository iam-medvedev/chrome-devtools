import * as TraceEngine from '../../../models/trace/trace.js';
/**
 * Calculates the display name for a given entry. If the trace data is provided
 * as the second argument it can be used to find source map resolved names for
 * profile calls.
 */
export declare function nameForEntry(entry: TraceEngine.Types.TraceEvents.TraceEventData, traceParsedData?: TraceEngine.Handlers.Types.TraceParseData): string;
