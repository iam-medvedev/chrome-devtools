import './SidebarSingleInsightSet.js';
import * as Trace from '../../../models/trace/trace.js';
import type { ActiveInsight } from './Sidebar.js';
export declare class SidebarInsightsTab extends HTMLElement {
    #private;
    set parsedTrace(data: Trace.Handlers.Types.ParsedTrace | null);
    set traceMetadata(data: Trace.Types.File.MetaData | null);
    set insights(data: Trace.Insights.Types.TraceInsightSets | null);
    get activeInsight(): ActiveInsight | null;
    set activeInsight(active: ActiveInsight | null);
    highlightActiveInsight(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-insights': SidebarInsightsTab;
    }
}
