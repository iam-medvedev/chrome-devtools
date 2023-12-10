import type * as TraceEngine from '../../../models/trace/trace.js';
export interface Breadcrumb {
    window: TraceEngine.Types.Timing.TraceWindowMicroSeconds;
    child: Breadcrumb | null;
}
export declare function flattenBreadcrumbs(initialBreadcrumb: Breadcrumb): Breadcrumb[];
export declare class Breadcrumbs {
    readonly initialBreadcrumb: Breadcrumb;
    lastBreadcrumb: Breadcrumb;
    constructor(initialTraceWindow: TraceEngine.Types.Timing.TraceWindowMicroSeconds);
    add(newBreadcrumbTraceWindow: TraceEngine.Types.Timing.TraceWindowMicroSeconds): void;
    isTraceWindowWithinTraceWindow(child: TraceEngine.Types.Timing.TraceWindowMicroSeconds, parent: TraceEngine.Types.Timing.TraceWindowMicroSeconds): boolean;
    makeBreadcrumbActive(newLastBreadcrumb: Breadcrumb): void;
}
