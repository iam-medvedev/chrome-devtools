import * as TraceEngine from '../../models/trace/trace.js';
export declare class EventsSerializer {
    #private;
    keyForEvent(event: TraceEngine.Types.TraceEvents.TraceEventData): TraceEngine.Types.File.TraceEventSerializableKey | null;
    static isTraceEventSerializableKey(key: (number | string)[]): key is TraceEngine.Types.File.TraceEventSerializableKey;
    eventForKey(key: TraceEngine.Types.File.TraceEventSerializableKey, traceParsedData: TraceEngine.Handlers.Types.TraceParseData): TraceEngine.Types.TraceEvents.TraceEventData;
    static isProfileCallKey(key: TraceEngine.Types.File.TraceEventSerializableKey): key is TraceEngine.Types.File.ProfileCallKey;
    static isRawEventKey(key: TraceEngine.Types.File.TraceEventSerializableKey): key is TraceEngine.Types.File.RawEventKey;
    static isSyntheticEventKey(key: TraceEngine.Types.File.TraceEventSerializableKey): key is TraceEngine.Types.File.SyntheticEventKey;
}
