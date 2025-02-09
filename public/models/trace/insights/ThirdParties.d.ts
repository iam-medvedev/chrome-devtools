import * as Extras from '../extras/extras.js';
import type * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /** Title of an insight that provides details about the code on a web page that the user doesn't control (referred to as "third-party code"). */
    title: string;
    /**
     * @description Description of a DevTools insight that identifies the code on the page that the user doesn't control.
     * This is displayed after a user expands the section to see more. No character length limits.
     */
    description: string;
    /** Label for a table column that displays the name of a third-party provider. */
    columnThirdParty: string;
    /** Label for a column in a data table; entries will be the download size of a web resource in kilobytes. */
    columnTransferSize: string;
    /** Label for a table column that displays how much time each row spent running on the main thread, entries will be the number of milliseconds spent. */
    columnMainThreadTime: string;
    /**
     * @description Text block indicating that no third party content was detected on the page
     */
    noThirdParties: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export declare function deps(): ['Meta', 'NetworkRequests', 'Renderer', 'ImagePainting'];
export type ThirdPartiesInsightModel = InsightModel<typeof UIStrings, {
    eventsByEntity: Map<Extras.ThirdParties.Entity, Types.Events.Event[]>;
    summaryByEntity: Map<Extras.ThirdParties.Entity, Extras.ThirdParties.Summary>;
    summaryByUrl: Map<string, Extras.ThirdParties.Summary>;
    urlsByEntity: Map<Extras.ThirdParties.Entity, Set<string>>;
    /** The entity for this navigation's URL. Any other entity is from a third party. */
    firstPartyEntity?: Extras.ThirdParties.Entity;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): ThirdPartiesInsightModel;
