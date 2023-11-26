import type * as TraceEngine from '../../models/trace/trace.js';
export declare class TimelineVisibleWindowChanged extends Event {
    state: Readonly<TraceWindows>;
    shouldAnimate: boolean;
    static readonly eventName = "timelinevisiblewindowchanged";
    constructor(state: Readonly<TraceWindows>, shouldAnimate: boolean);
}
export declare class MiniMapBoundsChanged extends Event {
    state: Readonly<TraceWindows>;
    static readonly eventName = "minimapboundschanged";
    constructor(state: Readonly<TraceWindows>);
}
export interface TraceWindows {
    /**
     * This is the bounds of the entire trace. Once a trace is imported/recorded
     * and this is set, it cannot be changed.
     */
    readonly entireTraceBounds: TraceEngine.Types.Timing.TraceWindow;
    /**
     * This is the bounds of the minimap and represents the left and right bound
     * being shown by the minimap. It can be changed by a user action: for
     * example, when a user creates a breadcrumb, that breadcrumb becomes the
     * minimap trace bounds. By default, and when a trace is first loaded, the
     * minimapTraceBounds are equivalent to the entireTraceBounds.
     */
    minimapTraceBounds: TraceEngine.Types.Timing.TraceWindow;
    /**
     * This represents the trace window that is being shown on the main timeline.
     * The reason this is called a "Window" rather than "Bounds" is because the
     * user is not bound by this value - they can use their mouse to pan/zoom
     * in/out beyond the limits of this window (the limit is the
     * minimapTraceBounds). Another way to think of this value is that the
     * min/max of this value is what is represented by the two drag handles on
     * the TimelineMiniMap that the user can drag to change their current window.
     */
    timelineTraceWindow: TraceEngine.Types.Timing.TraceWindow;
}
export declare class BoundsManager extends EventTarget {
    #private;
    static instance(opts?: {
        forceNew: boolean | null;
        initialBounds?: TraceEngine.Types.Timing.TraceWindow;
    }): BoundsManager;
    static removeInstance(): void;
    private constructor();
    get state(): Readonly<TraceWindows>;
    setMiniMapBounds(newBounds: TraceEngine.Types.Timing.TraceWindow): void;
    setTimelineVisibleWindow(newWindow: TraceEngine.Types.Timing.TraceWindow, options?: {
        shouldAnimate: boolean;
    }): void;
}
