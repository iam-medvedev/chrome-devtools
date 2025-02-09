import * as Host from '../../../core/host/host.js';
import type * as Lit from '../../../ui/lit/lit.js';
export declare const enum ResponseType {
    CONTEXT = "context",
    TITLE = "title",
    THOUGHT = "thought",
    ACTION = "action",
    SIDE_EFFECT = "side-effect",
    SUGGESTIONS = "suggestions",
    ANSWER = "answer",
    ERROR = "error",
    QUERYING = "querying",
    USER_QUERY = "user-query"
}
export declare const enum ErrorType {
    UNKNOWN = "unknown",
    ABORT = "abort",
    MAX_STEPS = "max-steps",
    BLOCK = "block"
}
export interface AnswerResponse {
    type: ResponseType.ANSWER;
    text: string;
    rpcId?: Host.AidaClient.RpcGlobalId;
    suggestions?: [string, ...string[]];
}
export interface SuggestionsResponse {
    type: ResponseType.SUGGESTIONS;
    suggestions: [string, ...string[]];
}
export interface ErrorResponse {
    type: ResponseType.ERROR;
    error: ErrorType;
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
    rpcId?: Host.AidaClient.RpcGlobalId;
}
export interface ThoughtResponse {
    type: ResponseType.THOUGHT;
    thought: string;
    rpcId?: Host.AidaClient.RpcGlobalId;
}
export interface SideEffectResponse {
    type: ResponseType.SIDE_EFFECT;
    code?: string;
    confirm: (confirm: boolean) => void;
}
export interface ActionResponse {
    type: ResponseType.ACTION;
    code?: string;
    output?: string;
    canceled: boolean;
}
export interface QueryResponse {
    type: ResponseType.QUERYING;
    query?: string;
}
export interface UserQuery {
    type: ResponseType.USER_QUERY;
    query: string;
}
export type ResponseData = AnswerResponse | SuggestionsResponse | ErrorResponse | ActionResponse | SideEffectResponse | ThoughtResponse | TitleResponse | QueryResponse | ContextResponse | UserQuery;
export type FunctionCallResponseData = TitleResponse | ThoughtResponse | ActionResponse | SideEffectResponse | SuggestionsResponse;
export interface BuildRequestOptions {
    text: string;
}
export interface RequestOptions {
    temperature?: number;
    modelId?: string;
}
export interface AgentOptions {
    aidaClient: Host.AidaClient.AidaClient;
    serverSideLoggingEnabled?: boolean;
    confirmSideEffectForTest?: typeof Promise.withResolvers;
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
    STYLING = "freestyler",
    FILE = "drjones-file",
    NETWORK = "drjones-network-request",
    PERFORMANCE = "drjones-performance",
    PATCH = "patch"
}
export declare const MAX_STEPS = 10;
export declare abstract class ConversationContext<T> {
    abstract getOrigin(): string;
    abstract getItem(): T;
    abstract getIcon(): HTMLElement;
    abstract getTitle(): string | ReturnType<typeof Lit.Directives.until>;
    isOriginAllowed(agentOrigin: string | undefined): boolean;
    /**
     * This method is called at the start of `AiAgent.run`.
     * It will be overridden in subclasses to fetch data related to the context item.
     */
    refresh(): Promise<void>;
}
export type FunctionCallHandlerResult<Result> = {
    result: Result;
} | {
    requiresApproval: true;
} | {
    error: string;
};
export interface FunctionDeclaration<Args extends Record<string, unknown>, ReturnType> {
    /**
     * Description of function, this is send to the LLM
     * to explain what will the function do.
     */
    description: string;
    /**
     * JSON schema like representation of the parameters
     * the function needs to be called with.
     * Provide description to all parameters as this is
     * send to the LLM.
     */
    parameters: Host.AidaClient.FunctionObjectParam<keyof Args>;
    /**
     * Provided a way to give information back to
     * the UI before running the the handler
     */
    displayInfoFromArgs?: (args: Args) => {
        title?: string;
        thought?: string;
        code?: string;
        suggestions?: [string, ...string[]];
    };
    /**
     * Function implementation that the LLM will try to execute,
     */
    handler: (args: Args, options?: {
        /**
         * Shows that the user approved
         * the execution if it was required
         */
        approved?: boolean;
        signal?: AbortSignal;
    }) => Promise<FunctionCallHandlerResult<ReturnType>>;
}
export declare abstract class AiAgent<T> {
    #private;
    /** Subclasses need to define these. */
    abstract readonly type: AgentType;
    abstract readonly preamble: string | undefined;
    abstract readonly options: RequestOptions;
    abstract readonly clientFeature: Host.AidaClient.ClientFeature;
    abstract readonly userTier: string | undefined;
    abstract handleContextDetails(select: ConversationContext<T> | null): AsyncGenerator<ContextResponse, void, void>;
    readonly confirmSideEffect: typeof Promise.withResolvers;
    constructor(opts: AgentOptions);
    enhanceQuery(query: string, selected: ConversationContext<T> | null): Promise<string>;
    buildRequest(part: Host.AidaClient.Part, role: Host.AidaClient.Role.USER | Host.AidaClient.Role.ROLE_UNSPECIFIED): Host.AidaClient.AidaRequest;
    get id(): string;
    get isEmpty(): boolean;
    get origin(): string | undefined;
    parseResponse(response: Host.AidaClient.AidaResponse): ParsedResponse;
    /**
     * Declare a function that the AI model can call.
     * @param name - The name of the function
     * @param declaration - the function declaration. Currently functions must:
     * 1. Return an object of serializable key/value pairs. You cannot return
     *    anything other than a plain JavaScript object that can be serialized.
     * 2. Take one parameter which is an object that can have
     *    multiple keys and values. For example, rather than a function being called
     *    with two args, `foo` and `bar`, you should instead have the function be
     *    called with one object with `foo` and `bar` keys.
     */
    protected declareFunction<Args extends Record<string, unknown>, ReturnType = unknown>(name: string, declaration: FunctionDeclaration<Args, ReturnType>): void;
    protected formatParsedAnswer({ answer }: ParsedAnswer): string;
    protected handleAction(action: string, options?: {
        signal?: AbortSignal;
    }): AsyncGenerator<SideEffectResponse, ActionResponse, void>;
    run(initialQuery: string, options: {
        signal?: AbortSignal;
        selected: ConversationContext<T> | null;
    }): AsyncGenerator<ResponseData, void, void>;
}
