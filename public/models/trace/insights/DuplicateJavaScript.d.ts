import * as Extras from '../extras/extras.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     * @description Title of an insight that identifies multiple copies of the same JavaScript sources, and recommends removing the duplication.
     */
    readonly title: "Duplicate JavaScript";
    /**
     * @description Description of an insight that identifies multiple copies of the same JavaScript sources, and recommends removing the duplication.
     */
    readonly description: "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity.";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export type DuplicateJavaScriptInsightModel = InsightModel<typeof UIStrings, {
    duplication: Extras.ScriptDuplication.ScriptDuplication;
}>;
export declare function deps(): ['Scripts', 'NetworkRequests'];
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): DuplicateJavaScriptInsightModel;
