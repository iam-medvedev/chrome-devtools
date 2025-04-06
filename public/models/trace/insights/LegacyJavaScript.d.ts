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
    readonly description: "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile [Baseline](https://web.dev/articles/baseline-and-polyfills) features, unless you know you must support legacy browsers. [Learn why most sites can deploy ES6+ code without transpiling](https://philipwalton.com/articles/the-state-of-es5-on-the-web/)";
    /** Label for a column in a data table; entries will be the individual JavaScript scripts. */
    readonly columnScript: "Script";
    /** Label for a column in a data table; entries will be the number of wasted bytes (aka the estimated savings in terms of bytes). */
    readonly columnWastedBytes: "Wasted bytes";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export interface PatternMatchResult {
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
