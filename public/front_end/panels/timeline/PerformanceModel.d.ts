import * as Common from '../../core/common/common.js';
import type * as SDK from '../../core/sdk/sdk.js';
import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as TraceEngine from '../../models/trace/trace.js';
export declare class PerformanceModel extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    private mainTargetInternal;
    private tracingModelInternal;
    private filtersInternal;
    private readonly timelineModelInternal;
    private readonly frameModelInternal;
    private windowInternal;
    private recordStartTimeInternal?;
    constructor();
    setMainTarget(target: SDK.Target.Target): void;
    mainTarget(): SDK.Target.Target | null;
    setRecordStartTime(time: number): void;
    recordStartTime(): number | undefined;
    setFilters(filters: TimelineModel.TimelineModelFilter.TimelineModelFilter[]): void;
    filters(): TimelineModel.TimelineModelFilter.TimelineModelFilter[];
    isVisible(event: TraceEngine.Legacy.Event): boolean;
    setTracingModel(model: TraceEngine.Legacy.TracingModel, isFreshRecording?: boolean): Promise<void>;
    tracingModel(): TraceEngine.Legacy.TracingModel;
    timelineModel(): TimelineModel.TimelineModel.TimelineModelImpl;
    frames(): TimelineModel.TimelineFrameModel.TimelineFrame[];
    frameModel(): TimelineModel.TimelineFrameModel.TimelineFrameModel;
    setWindow(window: Window, animate?: boolean, breadcrumb?: TraceEngine.Types.Timing.TraceWindow): void;
    window(): Window;
    minimumRecordTime(): number;
    maximumRecordTime(): number;
    calculateWindowForMainThreadActivity(): {
        left: TraceEngine.Types.Timing.MilliSeconds;
        right: TraceEngine.Types.Timing.MilliSeconds;
    };
}
export declare enum Events {
    WindowChanged = "WindowChanged",
    NamesResolved = "NamesResolved"
}
export interface WindowChangedEvent {
    window: Window;
    animate: boolean | undefined;
    breadcrumbWindow?: TraceEngine.Types.Timing.TraceWindow;
}
export type EventTypes = {
    [Events.WindowChanged]: WindowChangedEvent;
    [Events.NamesResolved]: void;
};
export interface Window {
    left: number;
    right: number;
}
