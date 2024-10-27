import type * as Trace from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
export interface InsightDetails {
    title: string;
    description: string;
    internalName: string;
    expanded: boolean;
    estimatedSavingsTime?: Trace.Types.Timing.MilliSeconds;
    estimatedSavingsBytes?: number;
}
export declare class InsightActivated extends Event {
    name: string;
    insightSetKey: string;
    overlays: Overlays.Overlays.TimelineOverlay[];
    relatedEvents: Trace.Types.Events.Event[];
    static readonly eventName = "insightactivated";
    constructor(name: string, insightSetKey: string, overlays: Overlays.Overlays.TimelineOverlay[], relatedEvents: Trace.Types.Events.Event[]);
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
export declare class InsightSetZoom extends Event {
    bounds: Trace.Types.Timing.TraceWindowMicroSeconds;
    static readonly eventName = "insightsetzoom";
    constructor(bounds: Trace.Types.Timing.TraceWindowMicroSeconds);
}
export declare class InsightProvideOverlays extends Event {
    overlays: Array<Overlays.Overlays.TimelineOverlay>;
    options: Overlays.Overlays.TimelineOverlaySetOptions;
    static readonly eventName = "insightprovideoverlays";
    constructor(overlays: Array<Overlays.Overlays.TimelineOverlay>, options: Overlays.Overlays.TimelineOverlaySetOptions);
}
export declare class InsightProvideRelatedEvents extends Event {
    label: string;
    events: Array<Trace.Types.Events.Event>;
    activateInsight: () => void;
    static readonly eventName = "insightproviderelatedevents";
    constructor(label: string, events: Array<Trace.Types.Events.Event>, activateInsight: () => void);
}
declare global {
    interface GlobalEventHandlersEventMap {
        [InsightActivated.eventName]: InsightActivated;
        [InsightDeactivated.eventName]: InsightDeactivated;
        [InsightSetHovered.eventName]: InsightSetHovered;
        [InsightSetZoom.eventName]: InsightSetZoom;
        [InsightProvideOverlays.eventName]: InsightProvideOverlays;
        [InsightProvideRelatedEvents.eventName]: InsightProvideRelatedEvents;
    }
}
export declare class SidebarInsight extends HTMLElement {
    #private;
    set data(data: InsightDetails);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-insight': SidebarInsight;
    }
}
