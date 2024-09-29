import * as Trace from '../../../models/trace/trace.js';
export declare class LayoutShiftClusterDetails extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    setData(cluster: Trace.Types.Events.SyntheticLayoutShiftCluster, parsedTrace: Trace.Handlers.Types.ParsedTrace | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-layout-shift-cluster-details': LayoutShiftClusterDetails;
    }
}
