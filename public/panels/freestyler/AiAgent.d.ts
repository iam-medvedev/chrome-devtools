import * as Host from '../../core/host/host.js';
import type * as LitHtml from '../../ui/lit-html/lit-html.js';
export declare const enum ResponseType {
    CONTEXT = "context",
    TITLE = "title",
    THOUGHT = "thought",
    ACTION = "action",
    SIDE_EFFECT = "side-effect",
    ANSWER = "answer",
    ERROR = "error",
    QUERYING = "querying",
    USER_QUERY = "user-query"
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
    query: string;
}
export interface UserQuery {
    type: ResponseType.USER_QUERY;
    query: string;
}
export type ResponseData = AnswerResponse | ErrorResponse | ActionResponse | SideEffectResponse | ThoughtResponse | TitleResponse | QueryResponse | ContextResponse | UserQuery;
export interface BuildRequestOptions {
    input: string;
}
export interface RequestOptions {
    temperature?: number;
    modelId?: string;
}
export interface AgentOptions {
    aidaClient: Host.AidaClient.AidaClient;
    serverSideLoggingEnabled?: boolean;
}
export interface ParsedAnswer {
    answer: string;
    suggestions?: [string, ...string[]];
}
export interface ParsedStep {
    thought?: string;
    title?: string;
    action?: string;
}
export type ParsedResponse = ParsedAnswer | ParsedStep;
export declare const enum AgentType {
    FREESTYLER = "freestyler",
    DRJONES_FILE = "drjones-file",
    DRJONES_NETWORK_REQUEST = "drjones-network-request",
    DRJONES_PERFORMANCE = "drjones-performance"
}
export interface SerializedAgent {
    id: string;
    type: AgentType;
    history: HistoryEntryStorage;
}
export type HistoryEntryStorage = ResponseData[];
export declare abstract class ConversationContext<T> {
    abstract getOrigin(): string;
    abstract getItem(): T;
    abstract getIcon(): HTMLElement;
    abstract getTitle(): string | ReturnType<typeof LitHtml.Directives.until>;
    isOriginAllowed(agentOrigin: string | undefined): boolean;
}
export declare abstract class AiAgent<T> {
    #private;
    static validTemperature(temperature: number | undefined): number | undefined;
    abstract type: AgentType;
    abstract readonly preamble: string;
    abstract readonly options: RequestOptions;
    abstract readonly clientFeature: Host.AidaClient.ClientFeature;
    abstract readonly userTier: string | undefined;
    abstract handleContextDetails(select: ConversationContext<T> | null): AsyncGenerator<ContextResponse, void, void>;
    constructor(opts: AgentOptions);
    get chatHistoryForTesting(): Array<Host.AidaClient.HistoryChunk>;
    set chatNewHistoryForTesting(history: HistoryEntryStorage);
    get id(): string;
    get isEmpty(): boolean;
    get origin(): string | undefined;
    get context(): ConversationContext<T> | undefined;
    get title(): string | undefined;
    get isHistoryEntry(): boolean;
    serialized(): SerializedAgent;
    populateHistoryFromStorage(entry: SerializedAgent): void;
    aidaFetch(request: Host.AidaClient.AidaRequest, options?: {
        signal?: AbortSignal;
    }): AsyncGenerator<{
        parsedResponse: ParsedResponse;
        completed: boolean;
        rpcId?: number;
    }, void, void>;
    buildRequest(opts: BuildRequestOptions): Host.AidaClient.AidaRequest;
    handleAction(action: string, rpcId?: number): AsyncGenerator<SideEffectResponse, ActionResponse, void>;
    enhanceQuery(query: string, selected: ConversationContext<T> | null): Promise<string>;
    parseResponse(response: string): ParsedResponse;
    formatParsedAnswer({ answer }: ParsedAnswer): string;
    formatParsedStep(step: ParsedStep): string;
    run(query: string, options: {
        signal?: AbortSignal;
        selected: ConversationContext<T> | null;
    }): AsyncGenerator<ResponseData, void, void>;
    runFromHistory(): AsyncGenerator<ResponseData, void, void>;
}
export declare function isDebugMode(): boolean;
export declare function debugLog(...log: unknown[]): void;
export declare function isHistoryEnabled(): boolean;
