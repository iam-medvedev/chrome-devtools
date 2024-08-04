import { type AidaClientResult } from './InspectorFrontendHostAPI.js';
export declare enum Entity {
    UNKNOWN = 0,
    USER = 1,
    SYSTEM = 2
}
export declare const enum Rating {
    POSITIVE = "POSITIVE",
    NEGATIVE = "NEGATIVE"
}
export interface Chunk {
    text: string;
    entity: Entity;
}
export declare enum FunctionalityType {
    FUNCTIONALITY_TYPE_UNSPECIFIED = 0,
    CHAT = 1,
    EXPLAIN_ERROR = 2
}
export declare enum ClientFeature {
    CLIENT_FEATURE_UNSPECIFIED = 0,
    CHROME_CONSOLE_INSIGHTS = 1,
    CHROME_FREESTYLER = 2
}
export interface AidaRequest {
    input: string;
    preamble?: string;
    chat_history?: Chunk[];
    client: string;
    options?: {
        temperature?: Number;
        model_id?: string;
    };
    metadata?: {
        disable_user_content_logging: boolean;
        string_session_id?: string;
    };
    functionality_type?: FunctionalityType;
    client_feature?: ClientFeature;
}
export interface AidaDoConversationClientEvent {
    corresponding_aida_rpc_global_id: number;
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
export interface AidaResponseMetadata {
    rpcGlobalId?: number;
    attributionMetadata?: AttributionMetadata[];
}
export interface AidaResponse {
    explanation: string;
    metadata: AidaResponseMetadata;
}
export declare const enum AidaAccessPreconditions {
    AVAILABLE = "available",
    NO_ACCOUNT_EMAIL = "no-account-email",
    NO_ACTIVE_SYNC = "no-active-sync",
    NO_INTERNET = "no-internet"
}
export declare const CLIENT_NAME = "CHROME_DEVTOOLS";
export declare class AidaClient {
    static buildConsoleInsightsRequest(input: string): AidaRequest;
    static checkAccessPreconditions(): Promise<AidaAccessPreconditions>;
    fetch(request: AidaRequest): AsyncGenerator<AidaResponse, void, void>;
    registerClientEvent(clientEvent: AidaDoConversationClientEvent): Promise<AidaClientResult>;
}
