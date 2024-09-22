import type * as SDK from '../../../core/sdk/sdk.js';
import * as Trace from '../../../models/trace/trace.js';
import * as LegacyComponents from '../../../ui/legacy/components/utils/utils.js';
export declare class NetworkRequestDetails extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor(linkifier: LegacyComponents.Linkifier.Linkifier);
    connectedCallback(): void;
    setData(parsedTrace: Trace.Handlers.Types.ParsedTrace, networkRequest: Trace.Types.Events.SyntheticNetworkRequest, maybeTarget: SDK.Target.Target | null): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-network-request-details': NetworkRequestDetails;
    }
}
