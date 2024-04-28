import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import type * as TraceEngine from '../../models/trace/trace.js';
export declare class PerformanceModel {
    private readonly timelineModelInternal;
    constructor();
    setTracingModel(model: TraceEngine.Legacy.TracingModel): Promise<void>;
    timelineModel(): TimelineModel.TimelineModel.TimelineModelImpl;
}
