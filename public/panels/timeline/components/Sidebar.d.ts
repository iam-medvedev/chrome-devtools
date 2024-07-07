import type * as Handlers from '../../../models/trace/handlers/handlers.js';
import * as TraceEngine from '../../../models/trace/trace.js';
import * as UI from '../../../ui/legacy/legacy.js';
declare enum InsightsCategories {
    ALL = "All",
    INP = "INP",
    LCP = "LCP",
    CLS = "CLS",
    OTHER = "Other"
}
export declare class ToggleSidebarInsights extends Event {
    static readonly eventName = "toggleinsightclick";
    constructor();
}
export declare class SidebarWidget extends UI.SplitWidget.SplitWidget {
    #private;
    constructor();
    setTraceParsedData(traceParsedData: TraceEngine.Handlers.Types.TraceParseData | null): void;
    set data(insights: TraceEngine.Insights.Types.TraceInsightData<typeof Handlers.ModelHandlers>);
}
export declare class SidebarUI extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    selectedCategory: InsightsCategories;
    connectedCallback(): void;
    set expanded(expanded: boolean);
    set insights(insights: TraceEngine.Insights.Types.TraceInsightData<typeof Handlers.ModelHandlers>);
    set traceParsedData(traceParsedData: TraceEngine.Handlers.Types.TraceParseData | null);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar': SidebarWidget;
    }
}
export {};
