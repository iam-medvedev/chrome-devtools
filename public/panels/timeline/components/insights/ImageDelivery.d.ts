import '../../../../ui/components/icon_button/icon_button.js';
import './Table.js';
import type { ImageDeliveryInsightModel } from '../../../../models/trace/insights/ImageDelivery.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class ImageDelivery extends BaseInsightComponent<ImageDeliveryInsightModel> {
    #private;
    static readonly litTagName: LitHtml.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getEstimatedSavingsBytes(): number | null;
    renderContent(): LitHtml.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-image-delivery': ImageDelivery;
    }
}
