import * as Extras from '../extras/extras.js';
import type * as Handlers from '../handlers/handlers.js';
import { type InsightModel, type InsightSetContext } from './types.js';
export declare const UIStrings: {
    /**
     * @description Title of an insight that identifies multiple copies of the same JavaScript sources, and recommends removing the duplication.
     */
    readonly title: "Duplicated JavaScript";
    /**
     * @description Description of an insight that identifies multiple copies of the same JavaScript sources, and recommends removing the duplication.
     */
    readonly description: "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity.";
    /** Label for a column in a data table; entries will be the locations of JavaScript or CSS code, e.g. the name of a Javascript package or module. */
    readonly columnSource: "Source";
    /** Label for a column in a data table; entries will be the file size of a web resource in kilobytes. */
    readonly columnResourceSize: "Resource size";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export type DuplicateJavaScriptInsightModel = InsightModel<typeof UIStrings, {
    duplication: Extras.ScriptDuplication.ScriptDuplication;
    scriptsWithDuplication: Handlers.ModelHandlers.Scripts.Script[];
}>;
export declare function generateInsight(parsedTrace: Handlers.Types.ParsedTrace, context: InsightSetContext): DuplicateJavaScriptInsightModel;
