import * as TraceEngine from '../../../models/trace/trace.js';
export declare class LayoutShiftDetails extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    setData(layoutShift: TraceEngine.Types.TraceEvents.SyntheticLayoutShift, traceInsightsData: TraceEngine.Insights.Types.TraceInsightData | null, traceEngineData: TraceEngine.Handlers.Types.TraceParseData | null, isFreshRecording: Boolean): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-layout-shift-details': LayoutShiftDetails;
    }
}
