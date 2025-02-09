import type * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     * @description Title of an insight that recommends avoiding chaining critical requests.
     */
    title: string;
    /**
     * @description Description of an insight that recommends avoiding chaining critical requests.
     */
    description: string;
    /**
     * @description Text status indicating that there isn't long chaining critical network requests.
     */
    noLongCriticalNetworkTree: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export type LongCriticalNetworkTreeInsightModel = InsightModel<typeof UIStrings, {
    longChains: Types.Events.SyntheticNetworkRequest[][];
}>;
export declare function deps(): ['NetworkRequests'];
export declare function generateInsight(_parsedTrace: RequiredData<typeof deps>, _context: InsightSetContext): LongCriticalNetworkTreeInsightModel;
