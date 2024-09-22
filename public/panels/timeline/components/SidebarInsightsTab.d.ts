import type * as Trace from '../../../models/trace/trace.js';
import { type ActiveInsight } from './Sidebar.js';
export declare enum InsightsCategories {
    ALL = "All",
    INP = "INP",
    LCP = "LCP",
    CLS = "CLS",
    OTHER = "Other"
}
export declare class SidebarInsightsTab extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    set parsedTrace(data: Trace.Handlers.Types.ParsedTrace | null);
    set insights(data: Trace.Insights.Types.TraceInsightSets | null);
    set activeInsight(active: ActiveInsight | null);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-insights': SidebarInsightsTab;
    }
}
