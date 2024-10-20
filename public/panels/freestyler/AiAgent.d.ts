import * as Host from '../../core/host/host.js';
export declare enum ResponseType {
    CONTEXT = "context",
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
    suggestions?: [string, ...string[]];
}
export interface ErrorResponse {
    type: ResponseType.ERROR;
    error: ErrorType;
    rpcId?: number;
}
export interface ContextDetail {
    title: string;
    text: string;
    codeLang?: string;
}
export interface ContextResponse {
    type: ResponseType.CONTEXT;
    title: string;
    details: [ContextDetail, ...ContextDetail[]];
}
export interface TitleResponse {
    type: ResponseType.TITLE;
    title: string;
    rpcId?: number;
}
export interface ThoughtResponse {
    type: ResponseType.THOUGHT;
    thought: string;
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
export type ResponseData = AnswerResponse | ErrorResponse | ActionResponse | SideEffectResponse | ThoughtResponse | TitleResponse | QueryResponse | ContextResponse;
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
interface ParsedResponseAnswer {
    answer: string;
    suggestions?: [string, ...string[]];
}
interface ParsedResponseStep {
    thought?: string;
    title?: string;
    action?: string;
}
export type ParsedResponse = ParsedResponseAnswer | ParsedResponseStep;
export declare abstract class AiAgent<T> {
    #private;
    static validTemperature(temperature: number | undefined): number | undefined;
    abstract readonly preamble: string;
    abstract readonly options: AidaRequestOptions;
    abstract readonly clientFeature: Host.AidaClient.ClientFeature;
    abstract readonly userTier: string | undefined;
    abstract handleContextDetails(select: T | null): AsyncGenerator<ContextResponse, void, void>;
    constructor(opts: AgentOptions);
    get historyEntry(): Array<HistoryChunk>;
    get chatHistoryForTesting(): Array<HistoryChunk>;
    set chatHistoryForTesting(history: Map<number, HistoryChunk[]>);
    removeHistoryRun(id: number): void;
    addToHistory(options: {
        id: number;
        query: string;
        response: ParsedResponse;
    }): void;
    aidaFetch(input: string, options?: {
        signal?: AbortSignal;
    }): Promise<{
        response: string;
        rpcId?: number;
    }>;
    buildRequest(opts: AidaBuildRequestOptions): Host.AidaClient.AidaRequest;
    handleAction(_action: string, _rpcId?: number): AsyncGenerator<SideEffectResponse, ActionResponse, void>;
    enhanceQuery(query: string, selected: T | null): Promise<string>;
    parseResponse(response: string): ParsedResponse;
    run(query: string, options: {
        signal?: AbortSignal;
        selected: T | null;
    }): AsyncGenerator<ResponseData, void, void>;
}
export declare function isDebugMode(): boolean;
export declare function debugLog(...log: unknown[]): void;
export {};
