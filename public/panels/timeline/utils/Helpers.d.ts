import '../../../ui/components/markdown_view/markdown_view.js';
import type * as Common from '../../../core/common/common.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
export declare function getThrottlingRecommendations(): {
    cpuOption: SDK.CPUThrottlingManager.CPUThrottlingOption | null;
    networkConditions: SDK.NetworkManager.Conditions | null;
};
/**
 * Shortens URLs as much as possible while keeping important context.
 *
 * - Elides the host if the previous url is the same host+protocol
 * - Always elide search param values
 * - Always includes protocol/domain if there is a mix of protocols
 * - First URL is elided fully to show just the pathname, unless there is a mix of protocols (see above)
 */
export declare function createUrlLabels(urls: URL[]): string[];
/**
 * Shortens the provided URL for use within a narrow display usecase.
 *
 * The resulting string will at least contain the last path component of the URL.
 * More components are included until a limit of maxChars (default 20) is reached.
 * No querystring is included.
 *
 * If the last path component is larger than maxChars characters, the middle is elided.
 */
export declare function shortenUrl(url: URL, maxChars?: number): string;
/**
 * Returns a rendered MarkdownView component.
 *
 * This should only be used for markdown that is guaranteed to be valid,
 * and not contain any user-generated content.
 */
export declare function md(markdown: Common.UIString.LocalizedString): LitHtml.TemplateResult;
