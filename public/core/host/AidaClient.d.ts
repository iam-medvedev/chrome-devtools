import * as Common from '../common/common.js';
import type { AidaClientResult } from './InspectorFrontendHostAPI.js';
export declare enum Role {
    ROLE_UNSPECIFIED = 0,
    USER = 1,
    MODEL = 2
}
export declare const enum Rating {
    SENTIMENT_UNSPECIFIED = "SENTIMENT_UNSPECIFIED",
    POSITIVE = "POSITIVE",
    NEGATIVE = "NEGATIVE"
}
export interface Content {
    parts: Part[];
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
export interface FunctionObjectParam extends BaseFunctionParam {
    type: ParametersTypes.OBJECT;
    properties: {
        [Key in string]: FunctionPrimitiveParams | FunctionArrayParam;
    };
}
/**
 * More about function declaration can be read at
 * https://ai.google.dev/gemini-api/docs/function-calling
 */
export interface FunctionDeclaration {
    name: string;
    /**
     * A description for the LLM to understand what the specific function will do once called.
     */
    description: string;
    parameters: FunctionObjectParam | FunctionPrimitiveParams | FunctionArrayParam;
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
    CHROME_FILE_AGENT = 9,
    CHROME_PATCH_AGENT = 12
}
export declare enum UserTier {
    USER_TIER_UNSPECIFIED = 0,
    TESTERS = 1,
    BETA = 2,
    PUBLIC = 3
}
export type RpcGlobalId = string | number;
export interface AidaRequest {
    client: string;
    current_message: Content;
    preamble?: string;
    historical_contexts?: Content[];
    function_declarations?: FunctionDeclaration[];
    options?: {
        temperature?: number;
        model_id?: string;
    };
    metadata?: {
        disable_user_content_logging: boolean;
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
export interface Citation {
    startIndex: number;
    endIndex: number;
    url: string;
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
export type EventTypes = {
    [Events.AIDA_AVAILABILITY_CHANGED]: void;
};
export {};
