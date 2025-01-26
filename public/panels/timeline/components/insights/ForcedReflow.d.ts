import './Table.js';
import type { ForcedReflowInsightModel } from '../../../../models/trace/insights/ForcedReflow.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class ForcedReflow extends BaseInsightComponent<ForcedReflowInsightModel> {
    #private;
    static readonly litTagName: LitHtml.StaticHtml.StaticValue;
    internalName: string;
    renderContent(): LitHtml.LitTemplate;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-forced-reflow': ForcedReflow;
    }
}
