import * as Host from '../../core/host/host.js';
export declare enum ResponseType {
    TITLE = "title",
    THOUGHT = "thought",
    ACTION = "action",
    SIDE_EFFECT = "side-effect",
    ANSWER = "answer",
    ERROR = "error",
    QUERYING = "querying"
}
export declare const enum ErrorType {
    UNKNOWN = "unknown",
    ABORT = "abort",
    MAX_STEPS = "max-steps"
}
export interface AnswerResponse {
    type: ResponseType.ANSWER;
    text: string;
    rpcId?: number;
    suggestions?: string[];
}
export interface ErrorResponse {
    type: ResponseType.ERROR;
    error: ErrorType;
    rpcId?: number;
}
export interface TitleResponse {
    type: ResponseType.TITLE;
    title: string;
    rpcId?: number;
}
export interface ThoughtResponse {
    type: ResponseType.THOUGHT;
    thought?: string;
    contextDetails?: [ContextDetail, ...ContextDetail[]];
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
    canceled: boolean;
    rpcId?: number;
}
export interface QueryResponse {
    type: ResponseType.QUERYING;
}
export type ResponseData = AnswerResponse | ErrorResponse | ActionResponse | SideEffectResponse | ThoughtResponse | TitleResponse | QueryResponse;
export interface ContextDetail {
    title: string;
    text: string;
    codeLang?: string;
}
export interface AidaBuildRequestOptions {
    input: string;
}
export interface HistoryChunk {
    text: string;
    entity: Host.AidaClient.Entity;
}
export interface AidaRequestOptions {
    temperature?: number;
    model_id?: string;
}
type AgentOptions = {
    aidaClient: Host.AidaClient.AidaClient;
    serverSideLoggingEnabled?: boolean;
};
export declare abstract class AiAgent {
    #private;
    abstract readonly preamble: string;
    abstract readonly options: AidaRequestOptions;
    abstract readonly clientFeature: Host.AidaClient.ClientFeature;
    abstract readonly userTier: string | undefined;
    constructor(opts: AgentOptions);
    get historyEntry(): Array<HistoryChunk>;
    get chatHistoryForTesting(): Array<HistoryChunk>;
    set chatHistoryForTesting(history: Map<number, HistoryChunk[]>);
    removeHistoryRun(id: number): void;
    addToHistory({ id, query, output, }: {
        id: number;
        query: string;
        output: string;
    }): void;
    aidaFetch(input: string, options?: {
        signal?: AbortSignal;
    }): Promise<{
        response: string;
        rpcId: number | undefined;
    }>;
    buildRequest(opts: AidaBuildRequestOptions): Host.AidaClient.AidaRequest;
    static validTemperature(temperature: number | undefined): number | undefined;
}
export declare function isDebugMode(): boolean;
export declare function debugLog(...log: unknown[]): void;
export {};
