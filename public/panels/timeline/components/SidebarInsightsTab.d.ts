import * as Trace from '../../../models/trace/trace.js';
import { type ActiveInsight } from './Sidebar.js';
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
