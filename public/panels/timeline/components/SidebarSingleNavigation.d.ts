import * as TraceEngine from '../../../models/trace/trace.js';
import { InsightsCategories } from './Sidebar.js';
export interface SidebarSingleNavigationData {
    traceParsedData: TraceEngine.Handlers.Types.TraceParseData | null;
    insights: TraceEngine.Insights.Types.TraceInsightData | null;
    navigationId: string | null;
    activeCategory: InsightsCategories;
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
