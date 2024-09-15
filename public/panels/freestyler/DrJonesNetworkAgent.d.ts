import * as Host from '../../core/host/host.js';
import type * as SDK from '../../core/sdk/sdk.js';
export declare enum DrJonesNetworkAgentResponseType {
    ANSWER = "answer",
    ERROR = "error"
}
export interface AnswerResponse {
    type: DrJonesNetworkAgentResponseType.ANSWER;
    text: string;
    rpcId?: number;
}
export interface ErrorResponse {
    type: DrJonesNetworkAgentResponseType.ERROR;
    rpcId?: number;
}
export type ResponseData = AnswerResponse | ErrorResponse;
type HistoryChunk = {
    text: string;
    entity: Host.AidaClient.Entity;
};
type AgentOptions = {
    aidaClient: Host.AidaClient.AidaClient;
    serverSideLoggingEnabled?: boolean;
};
interface AidaRequestOptions {
    input: string;
    preamble?: string;
    chatHistory?: Host.AidaClient.Chunk[];
    /**
     * @default false
     */
    serverSideLoggingEnabled?: boolean;
    sessionId?: string;
}
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
export declare function formatNetworkRequest(request: Pick<SDK.NetworkRequest.NetworkRequest, 'url' | 'requestHeaders' | 'responseHeaders' | 'statusCode' | 'statusText'>): string;
export {};
