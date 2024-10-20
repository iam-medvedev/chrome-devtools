import '../../../ui/components/icon_button/icon_button.js';
import * as Trace from '../../../models/trace/trace.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
export declare class NetworkRequestTooltip extends HTMLElement {
    #private;
    connectedCallback(): void;
    set networkRequest(networkRequest: Trace.Types.Events.SyntheticNetworkRequest);
    static renderPriorityValue(networkRequest: Trace.Types.Events.SyntheticNetworkRequest): LitHtml.TemplateResult;
    static renderTimings(networkRequest: Trace.Types.Events.SyntheticNetworkRequest): LitHtml.TemplateResult | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-network-request-tooltip': NetworkRequestTooltip;
    }
}
