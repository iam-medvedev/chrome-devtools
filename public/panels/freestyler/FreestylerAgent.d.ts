import * as Host from '../../core/host/host.js';
import * as SDK from '../../core/sdk/sdk.js';
import { ChangeManager } from './ChangeManager.js';
export declare const FIX_THIS_ISSUE_PROMPT = "Fix this issue using JavaScript code execution";
export declare enum ResponseType {
    THOUGHT = "thought",
    ACTION = "action",
    SIDE_EFFECT = "side-effect",
    ANSWER = "answer",
    ERROR = "error",
    QUERYING = "querying"
}
export interface AnswerResponse {
    type: ResponseType.ANSWER;
    text: string;
    rpcId?: number;
    fixable: boolean;
}
export interface ErrorResponse {
    type: ResponseType.ERROR;
    error: string;
    rpcId?: number;
}
export interface ThoughtResponse {
    type: ResponseType.THOUGHT;
    thought: string;
    title?: string;
    rpcId?: number;
}
export interface SideEffectResponse {
    type: ResponseType.SIDE_EFFECT;
    code: string;
    confirm: (confirm: boolean) => void;
    rpcId?: number;
}
export interface ActionResponse {
    type: ResponseType.ACTION;
    code: string;
    output: string;
    rpcId?: number;
}
export interface QueryResponse {
    type: ResponseType.QUERYING;
}
export type ResponseData = AnswerResponse | ErrorResponse | ActionResponse | SideEffectResponse | ThoughtResponse | QueryResponse;
declare function executeJsCode(code: string, { throwOnSideEffect }: {
    throwOnSideEffect: boolean;
}): Promise<string>;
type HistoryChunk = {
    text: string;
    entity: Host.AidaClient.Entity;
};
type CreateExtensionScopeFunction = (changes: ChangeManager) => {
    install(): Promise<void>;
    uninstall(): Promise<void>;
};
type AgentOptions = {
    aidaClient: Host.AidaClient.AidaClient;
    changeManager?: ChangeManager;
    confirmSideEffectForTest?: typeof Promise.withResolvers;
    serverSideLoggingEnabled?: boolean;
    createExtensionScope?: CreateExtensionScopeFunction;
    execJs?: typeof executeJsCode;
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
export declare class FreestylerAgent {
    #private;
    static buildRequest(opts: AidaRequestOptions): Host.AidaClient.AidaRequest;
    static parseResponse(response: string): {
        thought?: string;
        title?: string;
        action?: string;
        answer?: string;
        fixable: boolean;
    };
    constructor(opts: AgentOptions);
    onPrimaryPageChanged(): void;
    get chatHistoryForTesting(): Array<HistoryChunk>;
    static describeElement(element: SDK.DOMModel.DOMNode): Promise<string>;
    run(query: string, options: {
        signal?: AbortSignal;
        selectedElement: SDK.DOMModel.DOMNode | null;
        isFixQuery: boolean;
    }): AsyncGenerator<ResponseData, void, void>;
}
export {};
