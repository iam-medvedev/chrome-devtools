import type * as Common from '../../core/common/common.js';
import type * as Platform from '../../core/platform/platform.js';
export declare abstract class ContentProvider {
    abstract contentURL(): Platform.DevToolsPath.UrlString;
    abstract contentType(): Common.ResourceType.ResourceType;
    abstract requestContent(): Promise<DeferredContent>;
    abstract searchInContent(query: string, caseSensitive: boolean, isRegex: boolean): Promise<SearchMatch[]>;
}
export declare class SearchMatch {
    readonly lineNumber: number;
    readonly lineContent: string;
    readonly columnNumber: number;
    readonly matchLength: number;
    constructor(lineNumber: number, lineContent: string, columnNumber: number, matchLength: number);
    static comparator(a: SearchMatch, b: SearchMatch): number;
}
export declare const contentAsDataURL: (content: string | null, mimeType: string, contentEncoded: boolean, charset?: string | null, limitSize?: boolean) => string | null;
export type DeferredContent = {
    content: string;
    isEncoded: boolean;
} | {
    content: '';
    isEncoded: false;
    wasmDisassemblyInfo: Common.WasmDisassembly.WasmDisassembly;
} | {
    content: null;
    error: string;
    isEncoded: boolean;
};
