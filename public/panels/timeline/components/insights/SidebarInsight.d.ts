import type * as Trace from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
export interface InsightDetails {
    title: string;
    expanded: boolean;
    estimatedSavings?: number | undefined;
}
export declare class InsightActivated extends Event {
    name: string;
    navigationId: string;
    createOverlayFn: () => Array<Overlays.Overlays.TimelineOverlay>;
    static readonly eventName = "insightactivated";
    constructor(name: string, navigationId: string, createOverlayFn: () => Array<Overlays.Overlays.TimelineOverlay>);
}
export declare class InsightDeactivated extends Event {
    static readonly eventName = "insightdeactivated";
    constructor();
}
export declare class NavigationBoundsHovered extends Event {
    bounds?: Trace.Types.Timing.TraceWindowMicroSeconds | undefined;
    static readonly eventName = "navigationhovered";
    constructor(bounds?: Trace.Types.Timing.TraceWindowMicroSeconds | undefined);
}
export declare class InsightOverlayOverride extends Event {
    overlays: Array<Overlays.Overlays.TimelineOverlay> | null;
    static readonly eventName = "insightoverlayoverride";
    constructor(overlays: Array<Overlays.Overlays.TimelineOverlay> | null);
}
declare global {
    interface GlobalEventHandlersEventMap {
        [InsightActivated.eventName]: InsightActivated;
        [InsightDeactivated.eventName]: InsightDeactivated;
        [NavigationBoundsHovered.eventName]: NavigationBoundsHovered;
        [InsightOverlayOverride.eventName]: InsightOverlayOverride;
    }
}
export declare class SidebarInsight extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    set data(data: InsightDetails);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-insight': SidebarInsight;
    }
}
