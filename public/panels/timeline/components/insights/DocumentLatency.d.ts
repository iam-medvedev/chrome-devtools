import type * as TraceEngine from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsight } from './Helpers.js';
import { InsightsCategories } from './types.js';
export declare function getDocumentLatencyInsight(insights: TraceEngine.Insights.Types.TraceInsightData | null, navigationId: string | null): TraceEngine.Insights.Types.InsightResults['DocumentLatency'] | null;
export declare class DocumentLatency extends BaseInsight {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: InsightsCategories;
    internalName: string;
    userVisibleTitle: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-document-latency': DocumentLatency;
    }
}
