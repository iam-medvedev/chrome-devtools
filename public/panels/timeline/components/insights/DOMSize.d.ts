import '../../../../ui/components/icon_button/icon_button.js';
import type { DOMSizeInsightModel } from '../../../../models/trace/insights/DOMSize.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class DOMSize extends BaseInsightComponent<DOMSizeInsightModel> {
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): LitHtml.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-dom-size': DOMSize;
    }
}
