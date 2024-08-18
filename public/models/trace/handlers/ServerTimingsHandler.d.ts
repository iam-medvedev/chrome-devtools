import * as Types from '../types/types.js';
import { type TraceEventHandlerName } from './types.js';
export declare function reset(): void;
export declare function initialize(): void;
export declare function handleEvent(_event: Types.TraceEvents.TraceEventData): void;
export declare function finalize(): Promise<void>;
export declare function data(): {
    serverTimings: Types.TraceEvents.SyntheticServerTiming[];
};
export declare function deps(): TraceEventHandlerName[];
