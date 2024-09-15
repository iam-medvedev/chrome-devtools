import * as TraceEngine from '../../../models/trace/trace.js';
/**
 * Calculates the display name for a given entry.
 * @param traceParsedData - If the trace data is provided
 * as the second argument it can be used to find source map resolved names for
 * profile calls.
 * Use this function to customise the user visible name for an entry. If no
 * custom name is found, we will fallback to the `name` property in the trace
 * entry.
 */
export declare function nameForEntry(entry: TraceEngine.Types.TraceEvents.TraceEventData, traceParsedData?: TraceEngine.Handlers.Types.TraceParseData): string;
