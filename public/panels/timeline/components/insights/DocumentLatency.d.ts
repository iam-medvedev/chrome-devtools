import '../../../../ui/components/icon_button/icon_button.js';
import type { DocumentLatencyInsightModel } from '../../../../models/trace/insights/DocumentLatency.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class DocumentLatency extends BaseInsightComponent<DocumentLatencyInsightModel> {
    #private;
    static readonly litTagName: LitHtml.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getEstimatedSavingsTime(): Trace.Types.Timing.Milli | null;
    getEstimatedSavingsBytes(): number | null;
    renderContent(): LitHtml.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-document-latency': DocumentLatency;
    }
}
