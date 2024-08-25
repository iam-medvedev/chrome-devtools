import * as Host from '../../core/host/host.js';
import { ChangeManager } from './ChangeManager.js';
export declare const FIX_THIS_ISSUE_PROMPT = "Fix this issue using JavaScript code execution";
export declare enum Step {
    THOUGHT = "thought",
    ACTION = "action",
    ANSWER = "answer",
    ERROR = "error",
    QUERYING = "querying"
}
export interface CommonStepData {
    step: Step.ANSWER | Step.ERROR;
    id: string;
    text: string;
    rpcId?: number;
}
export interface ThoughtStepData {
    step: Step.THOUGHT;
    id: string;
    text: string;
    title?: string;
    rpcId?: number;
}
export interface ActionStepData {
    step: Step.ACTION;
    id: string;
    code: string;
    output: string;
    rpcId?: number;
}
export interface QueryStepData {
    step: Step.QUERYING;
    id: string;
}
export type StepData = CommonStepData | ActionStepData | ThoughtStepData | QueryStepData;
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
    confirmSideEffect: (action: string) => Promise<boolean>;
    changeManager?: ChangeManager;
    serverSideLoggingEnabled?: boolean;
    createExtensionScope?: CreateExtensionScopeFunction;
    execJs?: typeof executeJsCode;
    internalExecJs?: typeof executeJsCode;
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
    };
    constructor(opts: AgentOptions);
    get chatHistoryForTesting(): Array<HistoryChunk>;
    run(query: string, options?: {
        signal?: AbortSignal;
        isFixQuery: boolean;
    }): AsyncGenerator<StepData | QueryStepData, void, void>;
}
export {};
