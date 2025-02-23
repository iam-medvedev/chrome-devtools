import * as Platform from '../../../core/platform/platform.js';
import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /** Title of an insight that provides details about the fonts used on the page, and the value of their `font-display` properties. */
    readonly title: "Font display";
    /**
     * @description Text to tell the user about the font-display CSS feature to help improve a the UX of a page.
     */
    readonly description: "Consider setting [`font-display`](https://developer.chrome.com/blog/font-display) to `swap` or `optional` to ensure text is consistently visible. `swap` can be further optimized to mitigate layout shifts with [font metric overrides](https://developer.chrome.com/blog/font-fallbacks).";
    /** Column for a font loaded by the page to render text. */
    readonly fontColumn: "Font";
    /** Column for the amount of time wasted. */
    readonly wastedTimeColumn: "Wasted time";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => Platform.UIString.LocalizedString;
export declare function deps(): ['Meta', 'NetworkRequests', 'LayoutShifts'];
export type FontDisplayInsightModel = InsightModel<typeof UIStrings, {
    fonts: Array<{
        request: Types.Events.SyntheticNetworkRequest;
        display: string;
        wastedTime: Types.Timing.Milli;
    }>;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): FontDisplayInsightModel;
