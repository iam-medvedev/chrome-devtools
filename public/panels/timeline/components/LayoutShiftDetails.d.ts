import * as Trace from '../../../models/trace/trace.js';
export declare class LayoutShiftDetails extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    setData(layoutShift: Trace.Types.Events.SyntheticLayoutShift, traceInsightsSets: Trace.Insights.Types.TraceInsightSets | null, parsedTrace: Trace.Handlers.Types.ParsedTrace | null, isFreshRecording: Boolean): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-layout-shift-details': LayoutShiftDetails;
    }
}
