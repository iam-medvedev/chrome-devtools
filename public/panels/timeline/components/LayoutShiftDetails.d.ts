import * as Trace from '../../../models/trace/trace.js';
export declare class LayoutShiftDetails extends HTMLElement {
    #private;
    connectedCallback(): void;
    setData(event: Trace.Types.Events.SyntheticLayoutShift | Trace.Types.Events.SyntheticLayoutShiftCluster, traceInsightsSets: Trace.Insights.Types.TraceInsightSets | null, parsedTrace: Trace.Handlers.Types.ParsedTrace | null, isFreshRecording: boolean): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-layout-shift-details': LayoutShiftDetails;
    }
}
