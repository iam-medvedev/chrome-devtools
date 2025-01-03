import './Table.js';
import type { RenderBlockingInsightModel } from '../../../../models/trace/insights/RenderBlocking.js';
import type * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class RenderBlocking extends BaseInsightComponent<RenderBlockingInsightModel> {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getEstimatedSavingsTime(): Trace.Types.Timing.MilliSeconds | null;
    renderContent(): LitHtml.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-render-blocking-requests': RenderBlocking;
    }
}
