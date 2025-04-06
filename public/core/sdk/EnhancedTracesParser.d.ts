import type { HydratingDataPerTarget, TraceFile } from './RehydratingObject.js';
export declare class EnhancedTracesParser {
    #private;
    static readonly enhancedTraceVersion: number;
    constructor(trace: TraceFile);
    parseEnhancedTrace(): void;
    data(): HydratingDataPerTarget[];
    private getEncodedSourceMapUrl;
    private getSourceMapFromMetadata;
    private getScriptIsolateId;
    private getExecutionContextIsolateId;
    private isTraceEvent;
    private isTargetRundownEvent;
    private isScriptRundownEvent;
    private isScriptRundownSourceEvent;
    private isTracingStartInBrowserEvent;
    private isFunctionCallEvent;
    private groupContextsAndScriptsUnderTarget;
}
