import type { SyntheticInteractionPair } from '../types/TraceEvents.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     * @description Text to tell the user about the longest user interaction.
     */
    description: string;
    /**
     * @description Title for the performance insight "INP by phase", which shows a breakdown of INP by phases / sections.
     */
    title: string;
    /**
     *@description Label used for the phase/component/stage/section of a larger duration.
     */
    phase: string;
    /**
     *@description Label used for a time duration.
     */
    duration: string;
    /**
     *@description Text shown next to the interaction event's input delay time in the detail view.
     */
    inputDelay: string;
    /**
     *@description Text shown next to the interaction event's thread processing duration in the detail view.
     */
    processingDuration: string;
    /**
     *@description Text shown next to the interaction event's presentation delay time in the detail view.
     */
    presentationDelay: string;
    /**
     * @description Text status indicating that no user interactions were detected.
     */
    noInteractions: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export declare function deps(): ['UserInteractions'];
export type INPInsightModel = InsightModel<typeof UIStrings, {
    longestInteractionEvent?: SyntheticInteractionPair;
    highPercentileInteractionEvent?: SyntheticInteractionPair;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): INPInsightModel;
