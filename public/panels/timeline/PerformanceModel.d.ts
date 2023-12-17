import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import type * as TraceEngine from '../../models/trace/trace.js';
export declare class PerformanceModel {
    private tracingModelInternal;
    private readonly timelineModelInternal;
    constructor();
    setTracingModel(model: TraceEngine.Legacy.TracingModel, isFreshRecording?: boolean): Promise<void>;
    tracingModel(): TraceEngine.Legacy.TracingModel;
    timelineModel(): TimelineModel.TimelineModel.TimelineModelImpl;
}
