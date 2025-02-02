import './Table.js';
import type { ForcedReflowInsightModel } from '../../../../models/trace/insights/ForcedReflow.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class ForcedReflow extends BaseInsightComponent<ForcedReflowInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    renderContent(): Lit.LitTemplate;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-forced-reflow': ForcedReflow;
    }
}
