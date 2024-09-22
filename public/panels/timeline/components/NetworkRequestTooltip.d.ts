import * as Trace from '../../../models/trace/trace.js';
export declare class NetworkRequestTooltip extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    set networkRequest(networkRequest: Trace.Types.Events.SyntheticNetworkRequest);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-network-request-tooltip': NetworkRequestTooltip;
    }
}
