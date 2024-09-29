import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsight } from './Helpers.js';
import { Category } from './types.js';
export declare class Viewport extends BaseInsight {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: Category;
    internalName: string;
    userVisibleTitle: string;
    description: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-viewport': Viewport;
    }
}
