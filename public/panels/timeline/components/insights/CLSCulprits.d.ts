import type { CLSCulpritsInsightModel } from '../../../../models/trace/insights/CLSCulprits.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class CLSCulprits extends BaseInsightComponent<CLSCulpritsInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-cls-culprits': CLSCulprits;
    }
}
