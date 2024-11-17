import '../../../../ui/components/icon_button/icon_button.js';
import type { DocumentLatencyInsightModel } from '../../../../models/trace/insights/DocumentLatency.js';
import * as Trace from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class DocumentLatency extends BaseInsightComponent<DocumentLatencyInsightModel> {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getEstimatedSavingsTime(): Trace.Types.Timing.MilliSeconds | null;
    getEstimatedSavingsBytes(): number | null;
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-document-latency': DocumentLatency;
    }
}
