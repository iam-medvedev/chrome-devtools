import type * as TraceEngine from '../../../models/trace/trace.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
export interface InsightDetails {
    title: string;
    expanded: boolean;
}
export declare function getLCPInsightData(insights: TraceEngine.Insights.Types.TraceInsightData | null): Array<{
    phase: string;
    timing: number | TraceEngine.Types.Timing.MilliSeconds;
    percent: string;
}>;
export declare function renderLCPPhases(phaseData: Array<{
    phase: string;
    timing: number | TraceEngine.Types.Timing.MilliSeconds;
    percent: string;
}>, insightExpanded: boolean): LitHtml.LitTemplate;
export declare class SidebarInsight extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    set data(data: InsightDetails);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-insight': SidebarInsight;
    }
}
