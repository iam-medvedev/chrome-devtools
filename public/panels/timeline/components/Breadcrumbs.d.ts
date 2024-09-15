import type * as TraceEngine from '../../../models/trace/trace.js';
export declare function flattenBreadcrumbs(initialBreadcrumb: TraceEngine.Types.File.Breadcrumb): TraceEngine.Types.File.Breadcrumb[];
export interface SetActiveBreadcrumbOptions {
    removeChildBreadcrumbs: boolean;
    updateVisibleWindow: boolean;
}
export declare class Breadcrumbs {
    initialBreadcrumb: TraceEngine.Types.File.Breadcrumb;
    activeBreadcrumb: TraceEngine.Types.File.Breadcrumb;
    constructor(initialTraceWindow: TraceEngine.Types.Timing.TraceWindowMicroSeconds);
    add(newBreadcrumbTraceWindow: TraceEngine.Types.Timing.TraceWindowMicroSeconds): TraceEngine.Types.File.Breadcrumb;
    isTraceWindowWithinTraceWindow(child: TraceEngine.Types.Timing.TraceWindowMicroSeconds, parent: TraceEngine.Types.Timing.TraceWindowMicroSeconds): boolean;
    setInitialBreadcrumbFromLoadedModifications(initialBreadcrumb: TraceEngine.Types.File.Breadcrumb): void;
    /**
     * Sets a breadcrumb to be active.
     * Doing this will update the minimap bounds and optionally based on the
     * `updateVisibleWindow` parameter, it will also update the active window.
     * The reason `updateVisibleWindow` is configurable is because if we are
     * changing which breadcrumb is active because we want to reveal something to
     * the user, we may have already updated the visible timeline window, but we
     * are activating the breadcrumb to show the user that they are now within
     * this breadcrumb. This is used when revealing insights and annotations.
     */
    setActiveBreadcrumb(activeBreadcrumb: TraceEngine.Types.File.Breadcrumb, options: SetActiveBreadcrumbOptions): void;
}
