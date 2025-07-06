import type * as Types from '../types/types.js';
export declare class SyntheticEventsManager {
    #private;
    static activate(manager: SyntheticEventsManager): void;
    static createAndActivate(rawEvents: readonly Types.Events.Event[]): SyntheticEventsManager;
    static getActiveManager(): SyntheticEventsManager;
    static reset(): void;
    static registerSyntheticEvent<T extends Types.Events.SyntheticBased>(syntheticEvent: Omit<T, '_tag'>): T;
    private constructor();
    syntheticEventForRawEventIndex(rawEventIndex: number): Types.Events.SyntheticBased;
    getSyntheticTraces(): Types.Events.SyntheticBased[];
    getRawTraceEvents(): readonly Types.Events.Event[];
}
