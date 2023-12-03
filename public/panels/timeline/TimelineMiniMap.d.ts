import * as Common from '../../core/common/common.js';
import * as TraceEngine from '../../models/trace/trace.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as TimelineComponents from './components/components.js';
import { type TimelineEventOverview } from './TimelineEventOverview.js';
export interface OverviewData {
    traceParsedData: TraceEngine.Handlers.Types.TraceParseData;
    isCpuProfile?: boolean;
    settings: {
        showScreenshots: boolean;
        showMemory: boolean;
    };
}
declare const TimelineMiniMap_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<PerfUI.TimelineOverviewPane.EventTypes>;
    addEventListener<T extends keyof PerfUI.TimelineOverviewPane.EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<PerfUI.TimelineOverviewPane.EventTypes[T], any>) => void, thisObject?: Object | undefined): Common.EventTarget.EventDescriptor<PerfUI.TimelineOverviewPane.EventTypes, T>;
    once<T_1 extends keyof PerfUI.TimelineOverviewPane.EventTypes>(eventType: T_1): Promise<PerfUI.TimelineOverviewPane.EventTypes[T_1]>;
    removeEventListener<T_2 extends keyof PerfUI.TimelineOverviewPane.EventTypes>(eventType: T_2, listener: (arg0: Common.EventTarget.EventTargetEvent<PerfUI.TimelineOverviewPane.EventTypes[T_2], any>) => void, thisObject?: Object | undefined): void;
    hasEventListeners(eventType: keyof PerfUI.TimelineOverviewPane.EventTypes): boolean;
    dispatchEventToListeners<T_3 extends keyof PerfUI.TimelineOverviewPane.EventTypes>(eventType: import("../../core/platform/typescript-utilities.js").NoUnion<T_3>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<PerfUI.TimelineOverviewPane.EventTypes, T_3>): void;
}) & typeof UI.Widget.VBox;
/**
 * This component wraps the generic PerfUI Overview component and configures it
 * specifically for the Performance Panel, including injecting the CSS we use
 * to customise how the components render within the Performance Panel.
 */
export declare class TimelineMiniMap extends TimelineMiniMap_base {
    #private;
    breadcrumbsActivated: boolean;
    breadcrumbs: TimelineComponents.Breadcrumbs.Breadcrumbs | null;
    constructor();
    activateBreadcrumbs(): void;
    breadcrumbWindowBounds(breadcrumbWindow: PerfUI.TimelineOverviewPane.BreadcrumbAddedEvent): PerfUI.TimelineOverviewPane.BreadcrumbAddedEvent;
    addBreadcrumb({ startTime, endTime }: PerfUI.TimelineOverviewPane.BreadcrumbAddedEvent): void;
    removeBreadcrumb(breadcrumb: TimelineComponents.Breadcrumbs.Breadcrumb): void;
    wasShown(): void;
    reset(): void;
    setBounds(min: TraceEngine.Types.Timing.MilliSeconds, max: TraceEngine.Types.Timing.MilliSeconds): void;
    setWindowTimes(left: number, right: number): void;
    getControls(): TimelineEventOverview[];
    setData(data: OverviewData): void;
    addInitialBreadcrumb(): void;
}
export {};
