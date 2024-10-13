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
 * More components are included until a limit of 20 characters is reached.
 * No querystring is included.
 *
 * If the last path component is larger than 20 characters, the middle is elided.
 */
export declare function shortenUrl(url: URL): string;
