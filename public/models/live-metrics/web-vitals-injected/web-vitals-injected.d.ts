declare global {
    interface PerformanceScriptTiming extends PerformanceEntry {
        invoker?: string;
        invokerType?: string;
        sourceFunctionName?: string;
        sourceURL?: string;
        sourceCharPosition?: number;
    }
    interface PerformanceLongAnimationFrameTiming extends PerformanceEntry {
        renderStart: DOMHighResTimeStamp;
        duration: DOMHighResTimeStamp;
        scripts: PerformanceScriptTiming[];
    }
}
export {};
