import * as Types from '../types/types.js';
import { type Checklist, type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     *@description Title of an insight that provides a breakdown for how long it took to download the main document.
     */
    title: string;
    /**
     *@description Description of an insight that provides a breakdown for how long it took to download the main document.
     */
    description: string;
    /**
     * @description Text to tell the user that the document request does not have redirects.
     */
    passingRedirects: string;
    /**
     * @description Text to tell the user that the document request had redirects.
     */
    failedRedirects: string;
    /**
     * @description Text to tell the user that the time starting the document request to when the server started responding is acceptable.
     */
    passingServerResponseTime: string;
    /**
     * @description Text to tell the user that the time starting the document request to when the server started responding is not acceptable.
     */
    failedServerResponseTime: string;
    /**
     * @description Text to tell the user that text compression (like gzip) was applied.
     */
    passingTextCompression: string;
    /**
     * @description Text to tell the user that text compression (like gzip) was not applied.
     */
    failedTextCompression: string;
    /**
     * @description Text for a label describing a network request event as having redirects.
     */
    redirectsLabel: string;
    /**
     * @description Text for a label describing a network request event as taking too long to start delivery by the server.
     */
    serverResponseTimeLabel: string;
    /**
     * @description Text for a label describing a network request event as taking longer to download because it wasn't compressed.
     */
    uncompressedDownload: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export type DocumentLatencyInsightModel = InsightModel<typeof UIStrings, {
    data?: {
        serverResponseTime: Types.Timing.Milli;
        redirectDuration: Types.Timing.Milli;
        uncompressedResponseBytes: number;
        documentRequest?: Types.Events.SyntheticNetworkRequest;
        checklist: Checklist<'noRedirects' | 'serverResponseIsFast' | 'usesCompression'>;
    };
}>;
export declare function deps(): ['Meta', 'NetworkRequests'];
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): DocumentLatencyInsightModel;
