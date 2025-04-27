import '../../../../ui/components/icon_button/icon_button.js';
import type { ImageDeliveryInsightModel } from '../../../../models/trace/insights/ImageDelivery.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { type TableDataRow } from './Table.js';
export declare class ImageDelivery extends BaseInsightComponent<ImageDeliveryInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    mapToRow(image: Trace.Insights.Models.ImageDelivery.OptimizableImage): TableDataRow;
    createAggregatedTableRow(remaining: Trace.Insights.Models.ImageDelivery.OptimizableImage[]): TableDataRow;
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-image-delivery': ImageDelivery;
    }
}
