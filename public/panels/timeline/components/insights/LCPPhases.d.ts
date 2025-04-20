import './Table.js';
import type { LCPPhasesInsightModel } from '../../../../models/trace/insights/LCPPhases.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class LCPPhases extends BaseInsightComponent<LCPPhasesInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    protected hasAskAiSupport(): boolean;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    toggleTemporaryOverlays(overlays: Overlays.Overlays.TimelineOverlay[] | null, options: Overlays.Overlays.TimelineOverlaySetOptions): void;
    getOverlayOptionsForInitialOverlays(): Overlays.Overlays.TimelineOverlaySetOptions;
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-lcp-by-phases': LCPPhases;
    }
}
