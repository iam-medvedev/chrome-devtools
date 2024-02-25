export interface AidaRequest {
    input: string;
    client: string;
    options?: {
        temperature?: Number;
        model_id?: string;
    };
}
export interface AidaResponse {
    explanation: string;
    metadata: {
        rpcGlobalId?: number;
    };
}
export declare class AidaClient {
    static buildApiRequest(input: string): AidaRequest;
    fetch(input: string): AsyncGenerator<AidaResponse, void, void>;
}
