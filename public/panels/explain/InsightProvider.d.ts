export interface AidaRequest {
    input: string;
    client: string;
    options?: {
        temperature: Number;
    };
}
export declare class InsightProvider {
    static buildApiRequest(input: string): AidaRequest;
    getInsights(input: string): Promise<string>;
}
