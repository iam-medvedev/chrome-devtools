import * as Platform from '../../../core/platform/platform.js';
import * as Handlers from '../handlers/handlers.js';
import type * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext } from './types.js';
export declare const UIStrings: {
    /**
     * @description Title of an insight that recommends using HTTP/2 over HTTP/1.1 because of the performance benefits. "HTTP" should not be translated.
     */
    readonly title: "Modern HTTP";
    /**
     * @description Description of an insight that recommends recommends using HTTP/2 over HTTP/1.1 because of the performance benefits. "HTTP" should not be translated.
     */
    readonly description: "HTTP/2 and HTTP/3 offer many benefits over HTTP/1.1, such as multiplexing. [Learn more about using modern HTTP](https://developer.chrome.com/docs/lighthouse/best-practices/uses-http2/).";
    /**
     * @description Column header for a table where each cell represents a network request.
     */
    readonly request: "Request";
    /**
     * @description Column header for a table where each cell represents the protocol of a network request.
     */
    readonly protocol: "Protocol";
    /**
     * @description Text explaining that there were not requests that were slowed down by using HTTP/1.1. "HTTP/1.1" should not be translated.
     */
    readonly noOldProtocolRequests: "No requests used HTTP/1.1";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => Platform.UIString.LocalizedString;
export type UseModernHTTPInsightModel = InsightModel<typeof UIStrings, {
    requests: Types.Events.SyntheticNetworkRequest[];
}>;
/**
 * Determine the set of resources that aren't HTTP/2 but should be.
 * We're a little conservative about what we surface for a few reasons:
 *
 *    - The simulator approximation of HTTP/2 is a little more generous than reality.
 *    - There's a bit of debate surrounding HTTP/2 due to its worse performance in environments with high packet loss. [1][2][3]
 *    - It's something that you'd have absolutely zero control over with a third-party (can't defer to fix it for example).
 *
 * Therefore, we only surface requests that were...
 *
 *    - Served over HTTP/1.1 or earlier
 *    - Served over an origin that serves at least 6 static asset requests
 *      (if there aren't more requests than browser's max/host, multiplexing isn't as big a deal)
 *    - Not served on localhost (h2 is a pain to deal with locally & and CI)
 *
 * [1] https://news.ycombinator.com/item?id=19086639
 * [2] https://www.twilio.com/blog/2017/10/http2-issues.html
 * [3] https://www.cachefly.com/http-2-is-not-a-magic-bullet/
 */
export declare function determineNonHttp2Resources(requests: Types.Events.SyntheticNetworkRequest[], entityMappings: Handlers.Helpers.EntityMappings, firstPartyEntity: Handlers.Helpers.Entity | null): Types.Events.SyntheticNetworkRequest[];
export declare function generateInsight(parsedTrace: Handlers.Types.ParsedTrace, context: InsightSetContext): UseModernHTTPInsightModel;
