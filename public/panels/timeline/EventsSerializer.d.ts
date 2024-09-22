import * as Trace from '../../models/trace/trace.js';
export declare class EventsSerializer {
    #private;
    keyForEvent(event: Trace.Types.Events.Event): Trace.Types.File.SerializableKey | null;
    eventForKey(key: Trace.Types.File.SerializableKey, parsedTrace: Trace.Handlers.Types.ParsedTrace): Trace.Types.Events.Event;
    static isProfileCallKey(key: Trace.Types.File.SerializableKeyValues): key is Trace.Types.File.ProfileCallKeyValues;
    static isLegacyTimelineFrameKey(key: Trace.Types.File.SerializableKeyValues): key is Trace.Types.File.LegacyTimelineFrameKeyValues;
    static isRawEventKey(key: Trace.Types.File.SerializableKeyValues): key is Trace.Types.File.RawEventKeyValues;
    static isSyntheticEventKey(key: Trace.Types.File.SerializableKeyValues): key is Trace.Types.File.SyntheticEventKeyValues;
}
