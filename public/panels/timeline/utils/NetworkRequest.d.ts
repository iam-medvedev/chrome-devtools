import type * as SDK from '../../../core/sdk/sdk.js';
import type * as TraceEngine from '../../../models/trace/trace.js';
export declare class TimelineNetworkRequest {
    #private;
    constructor(networkRequest: TraceEngine.Types.TraceEvents.SyntheticNetworkRequest);
    get request(): SDK.NetworkRequest.NetworkRequest | null;
}
