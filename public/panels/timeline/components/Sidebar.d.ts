import type * as Handlers from '../../../models/trace/handlers/handlers.js';
import type * as TraceEngine from '../../../models/trace/trace.js';
import * as UI from '../../../ui/legacy/legacy.js';
export declare class SidebarWidget extends UI.SplitWidget.SplitWidget {
    #private;
    constructor();
    set data(insights: TraceEngine.Insights.Types.TraceInsightData<typeof Handlers.ModelHandlers>);
}
export declare class SidebarUI extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    getLCPInsightData(): Array<{
        phase: string;
        timing: number | TraceEngine.Types.Timing.MilliSeconds;
        percent: string;
    }>;
    connectedCallback(): void;
    set expanded(expanded: boolean);
    set insights(insights: TraceEngine.Insights.Types.TraceInsightData<typeof Handlers.ModelHandlers>);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar': SidebarWidget;
    }
}
