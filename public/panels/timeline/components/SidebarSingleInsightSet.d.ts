import * as Trace from '../../../models/trace/trace.js';
import * as Insights from './insights/insights.js';
import { type ActiveInsight } from './Sidebar.js';
export interface SidebarSingleInsightSetData {
    parsedTrace: Trace.Handlers.Types.ParsedTrace | null;
    insights: Trace.Insights.Types.TraceInsightSets | null;
    insightSetKey: string | null;
    activeCategory: Insights.Types.Category;
    activeInsight: ActiveInsight | null;
}
export declare class SidebarSingleInsightSet extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    set data(data: SidebarSingleInsightSetData);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-single-navigation': SidebarSingleInsightSet;
    }
}
