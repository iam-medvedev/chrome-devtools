import * as TraceEngine from '../../../models/trace/trace.js';
export declare class NetworkRequestTooltip extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    set networkRequest(networkRequest: TraceEngine.Types.TraceEvents.SyntheticNetworkRequest);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-network-request-tooltip': NetworkRequestTooltip;
    }
}
