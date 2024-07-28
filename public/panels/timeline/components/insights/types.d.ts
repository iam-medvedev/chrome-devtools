import type * as Overlays from '../../overlays/overlays.js';
export declare enum InsightsCategories {
    ALL = "All",
    INP = "INP",
    LCP = "LCP",
    CLS = "CLS",
    OTHER = "Other"
}
export interface ActiveInsight {
    name: string;
    navigationId: string;
    createOverlayFn: (() => Overlays.Overlays.TimelineOverlay[]);
}
