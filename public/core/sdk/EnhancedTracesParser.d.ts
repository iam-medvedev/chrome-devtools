import { type EnhancedTracesData } from './RehydratingObject.js';
export declare class EnhancedTracesParser {
    #private;
    static readonly enhancedTraceVersion: number;
    constructor(traceEvents: unknown[]);
    parseEnhancedTrace(traceEvents: unknown[]): void;
    data(): EnhancedTracesData;
    private getScriptIsolateId;
    private isTraceEvent;
    private isTargetRundownEvent;
    private isScriptRundownEvent;
    private isScriptRundownSourceEvent;
    private groupContextsAndScriptsUnderTarget;
}
