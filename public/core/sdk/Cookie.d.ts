import type * as Platform from '../platform/platform.js';
import type * as Protocol from '../../generated/protocol.js';
export declare class Cookie {
    #private;
    constructor(name: string, value: string, type?: Type | null, priority?: Protocol.Network.CookiePriority);
    static fromProtocolCookie(protocolCookie: Protocol.Network.Cookie): Cookie;
    isEqual(other: Cookie): boolean;
    key(): string;
    name(): string;
    value(): string;
    type(): Type | null | undefined;
    httpOnly(): boolean;
    secure(): boolean;
    partitioned(): boolean;
    sameSite(): Protocol.Network.CookieSameSite;
    partitionKey(): string;
    setPartitionKey(key: string): void;
    partitionKeyOpaque(): boolean;
    setPartitionKeyOpaque(): void;
    priority(): Protocol.Network.CookiePriority;
    session(): boolean;
    path(): string;
    domain(): string;
    expires(): number;
    maxAge(): number;
    sourcePort(): number;
    sourceScheme(): Protocol.Network.CookieSourceScheme;
    size(): number;
    /**
     * @deprecated
     */
    url(): Platform.DevToolsPath.UrlString | null;
    setSize(size: number): void;
    expiresDate(requestDate: Date): Date | null;
    addAttribute(key: Attribute | null, value?: string | number | boolean): void;
    setCookieLine(cookieLine: string): void;
    getCookieLine(): string | null;
    matchesSecurityOrigin(securityOrigin: string): boolean;
    static isDomainMatch(domain: string, hostname: string): boolean;
}
export declare const enum Type {
    Request = 0,
    Response = 1
}
export declare const enum Attribute {
    Name = "name",
    Value = "value",
    Size = "size",
    Domain = "domain",
    Path = "path",
    Expires = "expires",
    MaxAge = "max-age",
    HttpOnly = "http-only",
    Secure = "secure",
    SameSite = "same-site",
    SourceScheme = "source-scheme",
    SourcePort = "source-port",
    Priority = "priority",
    Partitioned = "partitioned",
    PartitionKey = "partition-key"
}
