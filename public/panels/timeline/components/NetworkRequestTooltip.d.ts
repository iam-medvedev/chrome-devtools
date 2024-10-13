import '../../../ui/components/icon_button/icon_button.js';
import * as Trace from '../../../models/trace/trace.js';
export declare class NetworkRequestTooltip extends HTMLElement {
    #private;
    connectedCallback(): void;
    set networkRequest(networkRequest: Trace.Types.Events.SyntheticNetworkRequest);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-network-request-tooltip': NetworkRequestTooltip;
    }
}
