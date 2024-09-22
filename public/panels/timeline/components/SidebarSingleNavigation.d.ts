import * as Trace from '../../../models/trace/trace.js';
import { type ActiveInsight } from './Sidebar.js';
import { InsightsCategories } from './SidebarInsightsTab.js';
export interface SidebarSingleNavigationData {
    parsedTrace: Trace.Handlers.Types.ParsedTrace | null;
    insights: Trace.Insights.Types.TraceInsightSets | null;
    navigationId: string | null;
    activeCategory: InsightsCategories;
    activeInsight: ActiveInsight | null;
}
export declare class SidebarSingleNavigation extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    set data(data: SidebarSingleNavigationData);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-single-navigation': SidebarSingleNavigation;
    }
}
