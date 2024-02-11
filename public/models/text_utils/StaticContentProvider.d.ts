import type * as Common from '../../core/common/common.js';
import type * as Platform from '../../core/platform/platform.js';
import { type ContentDataOrError } from './ContentData.js';
import { type ContentProvider, type DeferredContent, type SafeContentProvider, type SearchMatch } from './ContentProvider.js';
export declare class StaticContentProvider implements ContentProvider {
    private readonly contentURLInternal;
    private readonly contentTypeInternal;
    private readonly lazyContent;
    constructor(contentURL: Platform.DevToolsPath.UrlString, contentType: Common.ResourceType.ResourceType, lazyContent: () => Promise<DeferredContent>);
    static fromString(contentURL: Platform.DevToolsPath.UrlString, contentType: Common.ResourceType.ResourceType, content: string): StaticContentProvider;
    contentURL(): Platform.DevToolsPath.UrlString;
    contentType(): Common.ResourceType.ResourceType;
    requestContent(): Promise<DeferredContent>;
    searchInContent(query: string, caseSensitive: boolean, isRegex: boolean): Promise<SearchMatch[]>;
}
export declare class SafeStaticContentProvider implements SafeContentProvider {
    #private;
    constructor(contentURL: Platform.DevToolsPath.UrlString, contentType: Common.ResourceType.ResourceType, lazyContent: () => Promise<ContentDataOrError>);
    contentURL(): Platform.DevToolsPath.UrlString;
    contentType(): Common.ResourceType.ResourceType;
    requestContent(): Promise<DeferredContent>;
    requestContentData(): Promise<ContentDataOrError>;
    searchInContent(query: string, caseSensitive: boolean, isRegex: boolean): Promise<SearchMatch[]>;
}
