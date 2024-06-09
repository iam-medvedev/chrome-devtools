export interface AidaRequest {
    input: string;
    client: string;
    options?: {
        temperature?: Number;
        model_id?: string;
    };
    metadata?: {
        disable_user_content_logging: boolean;
    };
}
export interface AidaResponse {
    explanation: string;
    metadata: {
        rpcGlobalId?: number;
    };
}
export declare class AidaClient {
    static buildConsoleInsightsRequest(input: string): AidaRequest;
    fetch(request: AidaRequest): AsyncGenerator<AidaResponse, void, void>;
}
