import type * as Overlays from '../../overlays/overlays.js';
export interface ActiveInsight {
    name: string;
    insightSetKey: string;
    createOverlayFn: (() => Overlays.Overlays.TimelineOverlay[]);
}
