import '../../../ui/components/request_link_icon/request_link_icon.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Trace from '../../../models/trace/trace.js';
import * as LegacyComponents from '../../../ui/legacy/components/utils/utils.js';
import type * as TimelineUtils from '../utils/utils.js';
export declare class NetworkRequestDetails extends HTMLElement {
    #private;
    constructor(linkifier: LegacyComponents.Linkifier.Linkifier);
    setData(parsedTrace: Trace.Handlers.Types.ParsedTrace, networkRequest: Trace.Types.Events.SyntheticNetworkRequest, maybeTarget: SDK.Target.Target | null, entityMapper: TimelineUtils.EntityMapper.EntityMapper | null): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-network-request-details': NetworkRequestDetails;
    }
}
