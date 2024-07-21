import * as Host from '../../core/host/host.js';
export declare const FIX_THIS_ISSUE_PROMPT = "Fix this issue using JavaScript code execution";
export declare enum Step {
    THOUGHT = "thought",
    ACTION = "action",
    ANSWER = "answer",
    ERROR = "error",
    QUERYING = "querying"
}
export interface CommonStepData {
    step: Step.THOUGHT | Step.ANSWER | Step.ERROR;
    text: string;
    rpcId?: number;
}
export interface ActionStepData {
    step: Step.ACTION;
    code: string;
    output: string;
    rpcId?: number;
}
export interface QueryStepData {
    step: Step.QUERYING;
}
export type StepData = CommonStepData | ActionStepData;
declare function executeJsCode(code: string, { throwOnSideEffect }: {
    throwOnSideEffect: boolean;
}): Promise<string>;
type HistoryChunk = {
    text: string;
    entity: Host.AidaClient.Entity;
};
interface AgentOptions {
    aidaClient: Host.AidaClient.AidaClient;
    serverSideLoggingEnabled?: boolean;
    execJs?: typeof executeJsCode;
    confirmSideEffect: (action: string) => Promise<boolean>;
}
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
        action?: string;
        answer?: string;
    };
    constructor(opts: AgentOptions);
    get chatHistoryForTesting(): Array<HistoryChunk>;
    run(query: string, options?: {
        signal?: AbortSignal;
        isFixQuery: boolean;
    }): AsyncGenerator<StepData | QueryStepData, void, void>;
}
export {};
