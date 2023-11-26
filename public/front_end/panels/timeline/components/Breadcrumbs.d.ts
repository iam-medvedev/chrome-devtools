import type * as TraceEngine from '../../../models/trace/trace.js';
export interface Breadcrumb {
    window: TraceEngine.Types.Timing.TraceWindow;
    child: Breadcrumb | null;
}
export declare function flattenBreadcrumbs(initialBreadcrumb: Breadcrumb): Breadcrumb[];
export declare class Breadcrumbs {
    readonly initialBreadcrumb: Breadcrumb;
    lastBreadcrumb: Breadcrumb;
    constructor(initialTraceWindow: TraceEngine.Types.Timing.TraceWindow);
    add(newBreadcrumbTraceWindow: TraceEngine.Types.Timing.TraceWindow): void;
    isTraceWindowWithinTraceWindow(child: TraceEngine.Types.Timing.TraceWindow, parent: TraceEngine.Types.Timing.TraceWindow): boolean;
    makeBreadcrumbActive(newLastBreadcrumb: Breadcrumb): void;
}
