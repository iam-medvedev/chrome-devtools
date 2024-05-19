import type * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
export declare class Log {
    static pseudoWallTime(request: SDK.NetworkRequest.NetworkRequest, monotonicTime: number): Date;
    static build(requests: SDK.NetworkRequest.NetworkRequest[]): Promise<LogDTO>;
    private creator;
    private buildPages;
    private convertPage;
    private pageEventTime;
}
export declare class Entry {
    private request;
    constructor(request: SDK.NetworkRequest.NetworkRequest);
    static toMilliseconds(time: number): number;
    static build(request: SDK.NetworkRequest.NetworkRequest): Promise<EntryDTO>;
    private buildRequest;
    private buildResponse;
    private buildContent;
    private buildTimings;
    private buildPostData;
    private buildParameters;
    private buildRequestURL;
    private buildCookies;
    private buildCookie;
    private requestBodySize;
    get responseBodySize(): number;
    get responseCompression(): number | undefined;
}
export interface Timing {
    blocked: number;
    dns: number;
    ssl: number;
    connect: number;
    send: number;
    wait: number;
    receive: number;
    _blocked_queueing: number;
    _blocked_proxy?: number;
    _workerStart?: number;
    _workerReady?: number;
    _workerFetchStart?: number;
    _workerRespondWithSettled?: number;
}
export interface Parameter {
    name: string;
    value: string;
}
export interface Content {
    size: number;
    mimeType: string;
    compression?: number;
    text?: string;
    encoding?: string;
}
export interface Request {
    method: string;
    url: Platform.DevToolsPath.UrlString;
    httpVersion: string;
    headers: Object;
    queryString: Parameter[];
    cookies: CookieDTO[];
    headersSize: number;
    bodySize: number;
    postData?: PostData;
}
export interface Response {
    status: number;
    statusText: string;
    httpVersion: string;
    headers: Object;
    cookies: CookieDTO[];
    content: Content;
    redirectURL: string;
    headersSize: number;
    bodySize: number;
    _transferSize: number;
    _error: string | null;
    _fetchedViaServiceWorker: boolean;
    _responseCacheStorageCacheName: string | undefined;
    _serviceWorkerResponseSource: Protocol.Network.ServiceWorkerResponseSource | undefined;
}
export interface EntryDTO {
    _fromCache?: string;
    _initiator: Protocol.Network.Initiator | null;
    _priority: Protocol.Network.ResourcePriority | null;
    _resourceType: string;
    _webSocketMessages?: Object[];
    cache: Object;
    connection?: string;
    pageref?: string;
    request: Request;
    response: Response;
    serverIPAddress: string;
    startedDateTime: string | Object;
    time: number;
    timings: Timing;
}
export interface PostData {
    mimeType: string;
    params?: Parameter[];
    text: string;
}
export interface CookieDTO {
    name: string;
    value: string;
    path: string;
    domain: string;
    expires: Date | null;
    httpOnly: boolean;
    secure: boolean;
    sameSite?: Protocol.Network.CookieSameSite;
    partitionKey?: string;
}
export interface Page {
    startedDateTime: string | Object;
    id: string;
    title: string;
    pageTimings: {
        onContentLoad: number;
        onLoad: number;
    };
}
export interface Creator {
    version: string;
    name: string;
}
export interface LogDTO {
    version: string;
    creator: Creator;
    pages: Page[];
    entries: EntryDTO[];
}
