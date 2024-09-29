import type * as Host from '../../core/host/host.js';
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
    suggestions: string[];
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
    thought: string;
    contextDetails?: ContextDetail[];
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
}
export interface AidaRequestOptions {
    input: string;
    preamble?: string;
    chatHistory?: Host.AidaClient.Chunk[];
    /**
     * @default false
     */
    serverSideLoggingEnabled?: boolean;
    sessionId?: string;
}
export interface HistoryChunk {
    text: string;
    entity: Host.AidaClient.Entity;
}
