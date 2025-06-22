import './NodeLink.js';
import type { ViewportInsightModel } from '../../../../models/trace/insights/Viewport.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class Viewport extends BaseInsightComponent<ViewportInsightModel> {
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getEstimatedSavingsTime(): Trace.Types.Timing.Milli | null;
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-viewport': Viewport;
    }
}
