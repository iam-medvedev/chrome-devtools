import '../../../../ui/components/icon_button/icon_button.js';
import './Table.js';
import type { ImageDeliveryInsightModel } from '../../../../models/trace/insights/ImageDelivery.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class ImageDelivery extends BaseInsightComponent<ImageDeliveryInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getEstimatedSavingsBytes(): number | null;
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-image-delivery': ImageDelivery;
    }
}
