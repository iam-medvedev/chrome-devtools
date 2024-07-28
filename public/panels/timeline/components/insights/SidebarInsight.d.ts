import type * as Overlays from '../../overlays/overlays.js';
export interface InsightDetails {
    title: string;
    expanded: boolean;
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
declare global {
    interface GlobalEventHandlersEventMap {
        [InsightActivated.eventName]: InsightActivated;
        [InsightDeactivated.eventName]: InsightDeactivated;
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
