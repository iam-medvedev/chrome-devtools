import * as Host from '../../core/host/host.js';
import type * as SDK from '../../core/sdk/sdk.js';
import { type AidaRequestOptions, type HistoryChunk, type ResponseData } from './AiAgent.js';
type AgentOptions = {
    aidaClient: Host.AidaClient.AidaClient;
    serverSideLoggingEnabled?: boolean;
};
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export declare class DrJonesNetworkAgent {
    #private;
    static buildRequest(opts: AidaRequestOptions): Host.AidaClient.AidaRequest;
    constructor(opts: AgentOptions);
    get chatHistoryForTesting(): Array<HistoryChunk>;
    run(query: string, options: {
        signal?: AbortSignal;
        selectedNetworkRequest: SDK.NetworkRequest.NetworkRequest | null;
    }): AsyncGenerator<ResponseData, void, void>;
}
export declare function allowHeader(header: SDK.NetworkRequest.NameValue): boolean;
export declare function formatHeaders(title: string, headers: SDK.NetworkRequest.NameValue[]): string;
export declare function formatNetworkRequestTiming(request: SDK.NetworkRequest.NetworkRequest): string;
export declare function formatNetworkRequest(request: SDK.NetworkRequest.NetworkRequest): string;
export {};
