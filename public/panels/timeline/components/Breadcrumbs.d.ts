import type * as TraceEngine from '../../../models/trace/trace.js';
export declare function flattenBreadcrumbs(initialBreadcrumb: TraceEngine.Types.File.Breadcrumb): TraceEngine.Types.File.Breadcrumb[];
export declare class Breadcrumbs {
    initialBreadcrumb: TraceEngine.Types.File.Breadcrumb;
    activeBreadcrumb: TraceEngine.Types.File.Breadcrumb;
    constructor(initialTraceWindow: TraceEngine.Types.Timing.TraceWindowMicroSeconds);
    add(newBreadcrumbTraceWindow: TraceEngine.Types.Timing.TraceWindowMicroSeconds): TraceEngine.Types.File.Breadcrumb;
    isTraceWindowWithinTraceWindow(child: TraceEngine.Types.Timing.TraceWindowMicroSeconds, parent: TraceEngine.Types.Timing.TraceWindowMicroSeconds): boolean;
    setInitialBreadcrumbFromLoadedModifications(initialBreadcrumb: TraceEngine.Types.File.Breadcrumb): void;
    setActiveBreadcrumb(activeBreadcrumb: TraceEngine.Types.File.Breadcrumb, removeChildBreadcrumbs?: boolean): void;
}
