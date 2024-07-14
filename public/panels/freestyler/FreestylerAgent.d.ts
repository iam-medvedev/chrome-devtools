import * as Host from '../../core/host/host.js';
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
export declare const FIX_THIS_ISSUE_PROMPT = "Fix this issue using JavaScript code execution";
declare function executeJsCode(code: string, { throwOnSideEffect }: {
    throwOnSideEffect: boolean;
}): Promise<string>;
type HistoryChunk = {
    text: string;
    entity: Host.AidaClient.Entity;
};
export declare class FreestylerAgent {
    #private;
    constructor({ aidaClient, execJs, confirmSideEffect, serverSideLoggingEnabled }: {
        aidaClient: Host.AidaClient.AidaClient;
        serverSideLoggingEnabled?: boolean;
        execJs?: typeof executeJsCode;
        confirmSideEffect: (action: string) => Promise<boolean>;
    });
    static buildRequest(input: string, preamble?: string, chatHistory?: Host.AidaClient.Chunk[], serverSideLoggingEnabled?: boolean): Host.AidaClient.AidaRequest;
    get chatHistoryForTesting(): Array<HistoryChunk>;
    static parseResponse(response: string): {
        thought?: string;
        action?: string;
        answer?: string;
    };
    resetHistory(): void;
    run(query: string, options?: {
        signal: AbortSignal;
    }): AsyncGenerator<StepData | QueryStepData, void, void>;
}
export {};
