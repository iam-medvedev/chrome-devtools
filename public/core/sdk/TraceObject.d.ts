import type * as Protocol from '../../generated/protocol.js';
import type { NetworkRequest } from './NetworkRequest.js';
export declare class TraceObject {
    readonly traceEvents: Protocol.Tracing.DataCollectedEvent['value'];
    readonly metadata: Object;
    constructor(traceEvents: Protocol.Tracing.DataCollectedEvent['value'], metadata?: Object);
}
export declare class RevealableEvent {
    event: any;
    constructor(event: any);
}
/**
 * Another wrapper class for revealing network requests in Network panel. The reason is the `Open in Network panel`
 * option is handled by the context menu provider, which will add this option for all supporting types. And there are a
 * lot of context menu providers that support `SDK.NetworkRequest.NetworkRequest`, for example `Override content` by
 * PersistenceActions, but we so far just want the one to reveal in network panel, so add a new class which will only be
 * supported by Network panel.
 *
 * Also we want to have a different behavior(select the network request) from the `SDK.NetworkRequest.NetworkRequest`
 * (highlight the network request once).
 */
export declare class RevealableNetworkRequest {
    networkRequest: NetworkRequest;
    constructor(networkRequest: NetworkRequest);
    static create(event: unknown): RevealableNetworkRequest | null;
}
