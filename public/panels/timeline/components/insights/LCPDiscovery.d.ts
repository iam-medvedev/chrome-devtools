import * as TraceEngine from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsight } from './Helpers.js';
import { InsightsCategories } from './types.js';
export declare function getLCPInsightData(insights: TraceEngine.Insights.Types.TraceInsightData | null, navigationId: string | null): TraceEngine.Insights.Types.InsightResults['LargestContentfulPaint'] | null;
export declare class LCPDiscovery extends BaseInsight {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: InsightsCategories;
    internalName: string;
    userVisibleTitle: string;
    connectedCallback(): void;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-lcp-discovery': LCPDiscovery;
    }
}
