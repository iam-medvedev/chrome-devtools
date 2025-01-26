import './SidebarSingleInsightSet.js';
import * as Trace from '../../../models/trace/trace.js';
import type { ActiveInsight } from './Sidebar.js';
export declare class SidebarInsightsTab extends HTMLElement {
    #private;
    connectedCallback(): void;
    set parsedTrace(data: Trace.Handlers.Types.ParsedTrace | null);
    set traceMetadata(data: Trace.Types.File.MetaData | null);
    set insights(data: Trace.Insights.Types.TraceInsightSets | null);
    set activeInsight(active: ActiveInsight | null);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-insights': SidebarInsightsTab;
    }
}
