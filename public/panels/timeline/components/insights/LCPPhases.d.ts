import './Table.js';
import type { LCPPhasesInsightModel } from '../../../../models/trace/insights/LCPPhases.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class LCPPhases extends BaseInsightComponent<LCPPhasesInsightModel> {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): LitHtml.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-lcp-by-phases': LCPPhases;
    }
}
