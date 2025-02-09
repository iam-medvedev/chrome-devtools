import type * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /** Title of an insight that provides details about if the page's viewport is optimized for mobile viewing. */
    title: string;
    /**
     * @description Text to tell the user how a viewport meta element can improve performance. \xa0 is a non-breaking space
     */
    description: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export declare function deps(): ['Meta', 'UserInteractions'];
export type ViewportInsightModel = InsightModel<typeof UIStrings, {
    mobileOptimized: boolean | null;
    viewportEvent?: Types.Events.ParseMetaViewport;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): ViewportInsightModel;
