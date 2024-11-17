import * as Common from '../common/common.js';
import type { AidaClientResult } from './InspectorFrontendHostAPI.js';
export declare enum Entity {
    UNKNOWN = 0,
    USER = 1,
    SYSTEM = 2
}
export declare const enum Rating {
    SENTIMENT_UNSPECIFIED = "SENTIMENT_UNSPECIFIED",
    POSITIVE = "POSITIVE",
    NEGATIVE = "NEGATIVE"
}
export interface HistoryChunk {
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
    CHROME_FREESTYLER = 2,
    CHROME_DRJONES_NETWORK_AGENT = 7,
    CHROME_DRJONES_PERFORMANCE_AGENT = 8,
    CHROME_DRJONES_FILE_AGENT = 9
}
export declare enum UserTier {
    USER_TIER_UNSPECIFIED = 0,
    TESTERS = 1,
    BETA = 2,
    PUBLIC = 3
}
export interface AidaRequest {
    input: string;
    preamble?: string;
    chat_history?: HistoryChunk[];
    client: string;
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
