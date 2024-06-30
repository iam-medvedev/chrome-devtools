export declare enum Entity {
    UNKNOWN = 0,
    USER = 1,
    SYSTEM = 2
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
    };
    functionality_type?: FunctionalityType;
    client_feature?: ClientFeature;
}
export interface AidaResponse {
    explanation: string;
    metadata: {
        rpcGlobalId?: number;
    };
}
export declare enum AidaAvailability {
    AVAILABLE = "available",
    NO_ACCOUNT_EMAIL = "no-account-email",
    NO_ACTIVE_SYNC = "no-active-sync",
    NO_INTERNET = "no-internet"
}
export declare class AidaClient {
    static buildConsoleInsightsRequest(input: string): AidaRequest;
    static getAidaClientAvailability(): Promise<AidaAvailability>;
    fetch(request: AidaRequest): AsyncGenerator<AidaResponse, void, void>;
}
