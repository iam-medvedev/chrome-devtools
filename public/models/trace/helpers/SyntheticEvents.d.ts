import type * as Types from '../types/types.js';
export declare class SyntheticEventsManager {
    #private;
    static activate(manager: SyntheticEventsManager): void;
    static createAndActivate(rawEvents: readonly Types.TraceEvents.TraceEventData[]): SyntheticEventsManager;
    static getActiveManager(): SyntheticEventsManager;
    static reset(): void;
    static registerSyntheticBasedEvent<T extends Types.TraceEvents.SyntheticBasedEvent>(syntheticEvent: Omit<T, '_tag'>): T;
    static registerServerTiming(syntheticEvent: Omit<Types.TraceEvents.SyntheticServerTiming, '_tag'>): Types.TraceEvents.SyntheticServerTiming;
    private constructor();
    /**
     * Registers and returns a branded synthetic event. Synthetic events need to
     * be created with this method to ensure they are registered and made
     * available to load events using serialized keys.
     */
    registerSyntheticBasedEvent<T extends Types.TraceEvents.SyntheticBasedEvent>(syntheticEvent: Omit<T, '_tag'>): T;
    syntheticEventForRawEventIndex(rawEventIndex: number): Types.TraceEvents.SyntheticBasedEvent;
    getSyntheticTraceEvents(): Types.TraceEvents.SyntheticBasedEvent[];
    getRawTraceEvents(): readonly Types.TraceEvents.TraceEventData[];
}
