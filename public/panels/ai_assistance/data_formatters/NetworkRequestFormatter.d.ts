import type * as SDK from '../../../core/sdk/sdk.js';
export declare class NetworkRequestFormatter {
    #private;
    static allowHeader(headerName: string): boolean;
    static formatHeaders(title: string, headers: Array<{
        name: string;
        value: string;
    }>, addListPrefixToEachLine?: boolean): string;
    static formatInitiatorUrl(initiatorUrl: string, allowedOrigin: string): string;
    constructor(request: SDK.NetworkRequest.NetworkRequest);
    formatRequestHeaders(): string;
    formatResponseHeaders(): string;
    /**
     * Note: nothing here should include information from origins other than
     * the request's origin.
     */
    formatNetworkRequest(): string;
    /**
     * Note: nothing here should include information from origins other than
     * the request's origin.
     */
    formatRequestInitiatorChain(): string;
    formatNetworkRequestTiming(): string;
}
