import type * as TraceEngine from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
export declare class LCPPhases extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    set insights(insights: TraceEngine.Insights.Types.TraceInsightData | null);
    set navigationId(navigationId: string | null);
    getPhaseData(insights: TraceEngine.Insights.Types.TraceInsightData | null, navigationId: string | null): Array<{
        phase: string;
        timing: number | TraceEngine.Types.Timing.MilliSeconds;
        percent: string;
    }>;
    renderLCPPhases(): LitHtml.LitTemplate;
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-lcp-by-phases': LCPPhases;
    }
}
