export interface AidaRequest {
    input: string;
    client: string;
    options?: {
        temperature?: Number;
        model_id?: string;
    };
}
export declare class InsightProvider {
    static buildApiRequest(input: string): AidaRequest;
    getInsights(input: string): Promise<string>;
}
