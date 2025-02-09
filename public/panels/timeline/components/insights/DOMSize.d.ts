import '../../../../ui/components/icon_button/icon_button.js';
import './Table.js';
import './NodeLink.js';
import type { DOMSizeInsightModel } from '../../../../models/trace/insights/DOMSize.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class DOMSize extends BaseInsightComponent<DOMSizeInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-dom-size': DOMSize;
    }
}
