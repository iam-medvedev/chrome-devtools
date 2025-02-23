import '../../../ui/components/icon_button/icon_button.js';
import * as Trace from '../../../models/trace/trace.js';
import * as Lit from '../../../ui/lit/lit.js';
import * as TimelineUtils from '../utils/utils.js';
export interface NetworkTooltipData {
    networkRequest: Trace.Types.Events.SyntheticNetworkRequest | null;
    entityMapper: TimelineUtils.EntityMapper.EntityMapper | null;
}
export declare class NetworkRequestTooltip extends HTMLElement {
    #private;
    connectedCallback(): void;
    set data(data: NetworkTooltipData);
    static renderPriorityValue(networkRequest: Trace.Types.Events.SyntheticNetworkRequest): Lit.TemplateResult;
    static renderTimings(networkRequest: Trace.Types.Events.SyntheticNetworkRequest): Lit.TemplateResult | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-network-request-tooltip': NetworkRequestTooltip;
    }
}
