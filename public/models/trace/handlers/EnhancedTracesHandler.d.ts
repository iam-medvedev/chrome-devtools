import * as Types from '../types/types.js';
export declare const EnhancedTracesVersion: number;
export interface Script {
    scriptId: number;
    isolate: string;
    url: string;
    executionContextId: number;
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
    hash: string;
    isModule?: boolean;
    hasSourceUrl?: boolean;
    sourceMapUrl?: string;
    length?: number;
    sourceText?: string;
}
export interface ExecutionContextAuxData {
    frameId?: string;
    isDefault?: boolean;
    type?: string;
}
export interface ExecutionContext {
    id: number;
    origin: string;
    v8Context?: string;
    auxData?: ExecutionContextAuxData;
}
export interface Target {
    id: string;
    type: string;
    url: string;
    pid?: number;
    isolate?: string;
}
export interface EnhancedTracesData {
    targets: Target[];
    executionContexts: ExecutionContext[];
    scripts: Script[];
}
export declare function initialize(): void;
export declare function reset(): void;
export declare function handleEvent(event: Types.TraceEvents.TraceEventData): void;
export declare function finalize(): Promise<void>;
export declare function data(): EnhancedTracesData;
