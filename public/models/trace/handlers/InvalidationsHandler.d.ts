import * as Types from '../types/types.js';
export declare function reset(): void;
export declare function handleUserConfig(userConfig: Types.Configuration.Configuration): void;
export declare function initialize(): void;
export declare function handleEvent(event: Types.TraceEvents.TraceEventData): void;
export declare function finalize(): Promise<void>;
interface InvalidationsData {
    invalidationsForEvent: Map<Types.TraceEvents.TraceEventData, Types.TraceEvents.InvalidationTrackingEvent[]>;
    invalidationCountForEvent: Map<Types.TraceEvents.TraceEventData, number>;
}
export declare function data(): InvalidationsData;
export {};
