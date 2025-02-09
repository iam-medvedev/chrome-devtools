import * as Platform from '../../../core/platform/platform.js';
import * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /** Title of an insight that provides details about the fonts used on the page, and the value of their `font-display` properties. */
    title: string;
    /**
     * @description Text to tell the user about the font-display CSS feature to help improve a the UX of a page.
     */
    description: string;
    /** Column for a font loaded by the page to render text. */
    fontColumn: string;
    /** Column for the amount of time wasted. */
    wastedTimeColumn: string;
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
