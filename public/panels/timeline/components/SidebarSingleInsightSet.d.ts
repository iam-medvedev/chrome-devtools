import * as Trace from '../../../models/trace/trace.js';
import type { ActiveInsight } from './Sidebar.js';
export interface SidebarSingleInsightSetData {
    insights: Trace.Insights.Types.TraceInsightSets | null;
    insightSetKey: Trace.Types.Events.NavigationId | null;
    activeCategory: Trace.Insights.Types.InsightCategory;
    activeInsight: ActiveInsight | null;
}
export declare class SidebarSingleInsightSet extends HTMLElement {
    #private;
    set data(data: SidebarSingleInsightSetData);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-single-navigation': SidebarSingleInsightSet;
    }
}
