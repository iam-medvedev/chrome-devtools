import * as Types from '../types/types.js';
export declare function reset(): void;
export declare function handleEvent(event: Types.Events.Event): void;
export declare function finalize(): Promise<void>;
export interface PageFrameData {
    frames: Map<string, Types.Events.TraceFrame>;
}
export declare function data(): PageFrameData;
