import * as Common from '../common/common.js';
import type { AidaClientResult } from './InspectorFrontendHostAPI.js';
export declare enum Role {
    /** Provide this role when giving a function call response  */
    ROLE_UNSPECIFIED = 0,
    /** Tags the content came from the user */
    USER = 1,
    /** Tags the content came from the LLM */
    MODEL = 2
}
export declare const enum Rating {
    SENTIMENT_UNSPECIFIED = "SENTIMENT_UNSPECIFIED",
    POSITIVE = "POSITIVE",
    NEGATIVE = "NEGATIVE"
}
/**
 * A `Content` represents a single turn message.
 */
export interface Content {
    parts: Part[];
    /** The producer of the content. */
    role: Role;
}
export type Part = {
    text: string;
} | {
    functionCall: {
        name: string;
        args: Record<string, unknown>;
    };
} | {
    functionResponse: {
        name: string;
        response: Record<string, unknown>;
    };
} | {
    /** Inline media bytes. */
    inlineData: MediaBlob;
};
export declare const enum ParametersTypes {
    STRING = 1,
    NUMBER = 2,
    INTEGER = 3,
    BOOLEAN = 4,
    ARRAY = 5,
    OBJECT = 6
}
interface BaseFunctionParam {
    description: string;
    nullable?: boolean;
}
export interface FunctionPrimitiveParams extends BaseFunctionParam {
    type: ParametersTypes.BOOLEAN | ParametersTypes.INTEGER | ParametersTypes.STRING | ParametersTypes.BOOLEAN;
}
interface FunctionArrayParam extends BaseFunctionParam {
    type: ParametersTypes.ARRAY;
    items: FunctionPrimitiveParams;
}
export interface FunctionObjectParam<T extends string | number | symbol = string> extends BaseFunctionParam {
    type: ParametersTypes.OBJECT;
    properties: Record<T, FunctionPrimitiveParams | FunctionArrayParam>;
}
/**
 * More about function declaration can be read at
 * https://ai.google.dev/gemini-api/docs/function-calling
 */
export interface FunctionDeclaration<T extends string | number | symbol = string> {
    name: string;
    /**
     * A description for the LLM to understand what the specific function will do once called.
     */
    description: string;
    parameters: FunctionObjectParam<T>;
}
export interface MediaBlob {
    mimeType: string;
    data: string;
}
export declare enum FunctionalityType {
    FUNCTIONALITY_TYPE_UNSPECIFIED = 0,
    CHAT = 1,
    EXPLAIN_ERROR = 2,
    AGENTIC_CHAT = 5
}
export declare enum ClientFeature {
    CLIENT_FEATURE_UNSPECIFIED = 0,
    CHROME_CONSOLE_INSIGHTS = 1,
    CHROME_STYLING_AGENT = 2,
    CHROME_NETWORK_AGENT = 7,
    CHROME_PERFORMANCE_AGENT = 8,
    CHROME_PERFORMANCE_ANNOTATIONS_AGENT = 20,
    CHROME_FILE_AGENT = 9,
    CHROME_PATCH_AGENT = 12,
    CHROME_PERFORMANCE_INSIGHTS_AGENT = 13
}
export declare enum UserTier {
    USER_TIER_UNSPECIFIED = 0,
    TESTERS = 1,
    BETA = 2,
    PUBLIC = 3
}
export interface RequestFactMetadata {
    /**
     * A description of where the fact comes from.
     */
    source: string;
    /**
     * Optional: a score to give this fact. Used because if there are more facts than space in the context window, higher scoring facts will be prioritised.
     */
    score?: number;
}
export interface RequestFact {
    /**
     * Content of the fact.
     */
    text: string;
    metadata: RequestFactMetadata;
}
export type RpcGlobalId = string | number;
export interface AidaRequest {
    client: string;
    current_message: Content;
    preamble?: string;
    historical_contexts?: Content[];
    function_declarations?: FunctionDeclaration[];
    facts?: RequestFact[];
    options?: {
        temperature?: number;
        model_id?: string;
    };
    metadata: {
        disable_user_content_logging: boolean;
        client_version: string;
        string_session_id?: string;
        user_tier?: UserTier;
    };
    functionality_type?: FunctionalityType;
    client_feature?: ClientFeature;
}
export interface AidaDoConversationClientEvent {
    corresponding_aida_rpc_global_id: RpcGlobalId;
    disable_user_content_logging: boolean;
    do_conversation_client_event: {
        user_feedback: {
            sentiment?: Rating;
            user_input?: {
                comment?: string;
            };
        };
    };
}
export declare enum RecitationAction {
    ACTION_UNSPECIFIED = "ACTION_UNSPECIFIED",
    CITE = "CITE",
    BLOCK = "BLOCK",
    NO_ACTION = "NO_ACTION",
    EXEMPT_FOUND_IN_PROMPT = "EXEMPT_FOUND_IN_PROMPT"
}
export declare enum CitationSourceType {
    CITATION_SOURCE_TYPE_UNSPECIFIED = "CITATION_SOURCE_TYPE_UNSPECIFIED",
    TRAINING_DATA = "TRAINING_DATA",
    WORLD_FACTS = "WORLD_FACTS",
    LOCAL_FACTS = "LOCAL_FACTS",
    INDIRECT = "INDIRECT"
}
export interface Citation {
    startIndex?: number;
    endIndex?: number;
    uri?: string;
    sourceType?: CitationSourceType;
    repository?: string;
}
export interface AttributionMetadata {
    attributionAction: RecitationAction;
    citations: Citation[];
}
export interface AidaFunctionCallResponse {
    name: string;
    args: Record<string, unknown>;
}
export interface FactualityFact {
    sourceUri?: string;
}
export interface FactualityMetadata {
    facts: FactualityFact[];
}
export interface AidaResponseMetadata {
    rpcGlobalId?: RpcGlobalId;
    attributionMetadata?: AttributionMetadata;
    factualityMetadata?: FactualityMetadata;
}
export interface AidaResponse {
    explanation: string;
    metadata: AidaResponseMetadata;
    functionCalls?: [AidaFunctionCallResponse, ...AidaFunctionCallResponse[]];
    completed: boolean;
}
export declare const enum AidaAccessPreconditions {
    AVAILABLE = "available",
    NO_ACCOUNT_EMAIL = "no-account-email",
    NO_INTERNET = "no-internet",
    SYNC_IS_PAUSED = "sync-is-paused"
}
export declare const CLIENT_NAME = "CHROME_DEVTOOLS";
export declare class AidaAbortError extends Error {
}
export declare class AidaBlockError extends Error {
}
export declare class AidaClient {
    static buildConsoleInsightsRequest(input: string): AidaRequest;
    static checkAccessPreconditions(): Promise<AidaAccessPreconditions>;
    fetch(request: AidaRequest, options?: {
        signal?: AbortSignal;
    }): AsyncGenerator<AidaResponse, void, void>;
    registerClientEvent(clientEvent: AidaDoConversationClientEvent): Promise<AidaClientResult>;
}
export declare function convertToUserTierEnum(userTier: string | undefined): UserTier;
export declare class HostConfigTracker extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    private constructor();
    static instance(): HostConfigTracker;
    addEventListener(eventType: Events, listener: Common.EventTarget.EventListener<EventTypes, Events>): Common.EventTarget.EventDescriptor<EventTypes>;
    removeEventListener(eventType: Events, listener: Common.EventTarget.EventListener<EventTypes, Events>): void;
    private pollAidaAvailability;
}
export declare const enum Events {
    AIDA_AVAILABILITY_CHANGED = "aidaAvailabilityChanged"
}
export interface EventTypes {
    [Events.AIDA_AVAILABILITY_CHANGED]: void;
}
export {};
