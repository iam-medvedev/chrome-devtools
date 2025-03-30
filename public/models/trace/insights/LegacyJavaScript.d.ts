import type * as Handlers from '../handlers/handlers.js';
import { type InsightModel, type InsightSetContext } from './types.js';
export declare const UIStrings: {
    /**
     * @description Title of an insight that identifies polyfills for modern JavaScript features, and recommends their removal.
     */
    readonly title: "Legacy JavaScript";
    /**
     * @description Description of an insight that identifies polyfills for modern JavaScript features, and recommends their removal.
     */
    readonly description: "Legacy JavaScript";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
interface PatternMatchResult {
    name: string;
    line: number;
    column: number;
}
interface LegacyJavaScriptResult {
    matches: PatternMatchResult[];
    estimatedByteSavings: number;
}
type LegacyJavaScriptResults = Map<Handlers.ModelHandlers.Scripts.Script, LegacyJavaScriptResult>;
export type LegacyJavaScriptInsightModel = InsightModel<typeof UIStrings, {
    legacyJavaScriptResults: LegacyJavaScriptResults;
}>;
export declare function generateInsight(parsedTrace: Handlers.Types.ParsedTrace, context: InsightSetContext): LegacyJavaScriptInsightModel;
export {};
