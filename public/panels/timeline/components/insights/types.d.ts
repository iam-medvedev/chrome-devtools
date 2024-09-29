import type * as Overlays from '../../overlays/overlays.js';
export declare enum Category {
    ALL = "All",
    INP = "INP",
    LCP = "LCP",
    CLS = "CLS"
}
export interface ActiveInsight {
    name: string;
    insightSetKey: string;
    createOverlayFn: (() => Overlays.Overlays.TimelineOverlay[]);
}
