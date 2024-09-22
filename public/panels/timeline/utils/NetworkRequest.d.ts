import type * as SDK from '../../../core/sdk/sdk.js';
import type * as Trace from '../../../models/trace/trace.js';
export declare function getNetworkRequest(syntheticNetworkRequest: Trace.Types.Events.SyntheticNetworkRequest): SDK.NetworkRequest.NetworkRequest | undefined | null;
export declare function createTimelineNetworkRequest(syntheticNetworkRequest: Trace.Types.Events.SyntheticNetworkRequest): TimelineNetworkRequest | null;
export declare class TimelineNetworkRequest {
    #private;
    constructor(request: SDK.NetworkRequest.NetworkRequest);
    get request(): SDK.NetworkRequest.NetworkRequest;
}
