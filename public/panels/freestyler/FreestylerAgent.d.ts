import * as Host from '../../core/host/host.js';
export declare enum Step {
    THOUGHT = "thought",
    ACTION = "action",
    ANSWER = "answer",
    ERROR = "error"
}
export type StepData = {
    step: Step.THOUGHT | Step.ANSWER | Step.ERROR;
    text: string;
    rpcId?: number;
} | {
    step: Step.ACTION;
    code: string;
    output: string;
    rpcId?: number;
};
declare function executeJsCode(code: string): Promise<string>;
type HistoryChunk = {
    text: string;
    entity: Host.AidaClient.Entity;
};
export declare class FreestylerAgent {
    #private;
    constructor({ aidaClient, execJs }: {
        aidaClient: Host.AidaClient.AidaClient;
        execJs?: typeof executeJsCode;
    });
    static buildRequest(input: string, preamble?: string, chatHistory?: Host.AidaClient.Chunk[]): Host.AidaClient.AidaRequest;
    get chatHistoryForTesting(): Array<HistoryChunk>;
    static parseResponse(response: string): {
        thought?: string;
        action?: string;
        answer?: string;
    };
    resetHistory(): void;
    run(query: string, options?: {
        signal: AbortSignal;
    }): AsyncGenerator<StepData, void, void>;
}
export {};
