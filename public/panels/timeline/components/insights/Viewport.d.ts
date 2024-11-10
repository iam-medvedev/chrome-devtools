import './NodeLink.js';
import type { ViewportInsightModel } from '../../../../models/trace/insights/Viewport.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './Helpers.js';
import { Category } from './types.js';
export declare class Viewport extends BaseInsightComponent<ViewportInsightModel> {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: Category;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-viewport': Viewport;
    }
}
