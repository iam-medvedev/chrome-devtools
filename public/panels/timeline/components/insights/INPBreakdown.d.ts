import './Table.js';
import type { INPBreakdownInsightModel } from '../../../../models/trace/insights/INPBreakdown.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class INPBreakdown extends BaseInsightComponent<INPBreakdownInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    protected hasAskAiSupport(): boolean;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-inp-breakdown': INPBreakdown;
    }
}
