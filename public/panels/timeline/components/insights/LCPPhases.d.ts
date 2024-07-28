import * as TraceEngine from '../../../../models/trace/trace.js';
import { type ActiveInsight, InsightsCategories } from './types.js';
export declare const InsightName = "lcp-phases";
export declare class LCPPhases extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    set insights(insights: TraceEngine.Insights.Types.TraceInsightData | null);
    set navigationId(navigationId: string | null);
    set activeInsight(activeInsight: ActiveInsight);
    set activeCategory(activeCategory: InsightsCategories);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-lcp-by-phases': LCPPhases;
    }
}
