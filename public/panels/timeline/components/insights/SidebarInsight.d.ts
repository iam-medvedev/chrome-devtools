import type * as Trace from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
export interface InsightDetails {
    title: string;
    description: string;
    internalName: string;
    expanded: boolean;
    estimatedSavings?: number | undefined;
}
export declare class InsightActivated extends Event {
    name: string;
    insightSetKey: string;
    overlays: Overlays.Overlays.TimelineOverlay[];
    static readonly eventName = "insightactivated";
    constructor(name: string, insightSetKey: string, overlays: Overlays.Overlays.TimelineOverlay[]);
}
export declare class InsightDeactivated extends Event {
    static readonly eventName = "insightdeactivated";
    constructor();
}
export declare class InsightSetHovered extends Event {
    bounds?: Trace.Types.Timing.TraceWindowMicroSeconds | undefined;
    static readonly eventName = "insightsethovered";
    constructor(bounds?: Trace.Types.Timing.TraceWindowMicroSeconds | undefined);
}
export declare class InsightProvideOverlays extends Event {
    overlays: Array<Overlays.Overlays.TimelineOverlay>;
    options: Overlays.Overlays.TimelineOverlaySetOptions;
    static readonly eventName = "insightprovideoverlays";
    constructor(overlays: Array<Overlays.Overlays.TimelineOverlay>, options: Overlays.Overlays.TimelineOverlaySetOptions);
}
declare global {
    interface GlobalEventHandlersEventMap {
        [InsightActivated.eventName]: InsightActivated;
        [InsightDeactivated.eventName]: InsightDeactivated;
        [InsightSetHovered.eventName]: InsightSetHovered;
        [InsightProvideOverlays.eventName]: InsightProvideOverlays;
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
