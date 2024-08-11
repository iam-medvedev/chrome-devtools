import type * as SDK from '../../../core/sdk/sdk.js';
import type * as TraceEngine from '../../../models/trace/trace.js';
export declare function createTimelineNetworkRequest(syntheticNetworkRequest: TraceEngine.Types.TraceEvents.SyntheticNetworkRequest): TimelineNetworkRequest | null;
export declare class TimelineNetworkRequest {
    #private;
    constructor(request: SDK.NetworkRequest.NetworkRequest);
    get request(): SDK.NetworkRequest.NetworkRequest;
}
