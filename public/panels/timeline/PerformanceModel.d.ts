import type * as TraceEngine from '../../models/trace/trace.js';
export declare class PerformanceModel {
    private readonly timelineModelInternal;
    constructor();
    setTracingModel(model: TraceEngine.Legacy.TracingModel): Promise<void>;
}
