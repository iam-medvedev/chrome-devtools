import type { SyntheticInteractionPair } from '../types/TraceEvents.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     * @description Text to tell the user about the longest user interaction.
     */
    readonly description: "Start investigating with the longest phase. [Delays can be minimized](https://web.dev/articles/optimize-inp#optimize_interactions). To reduce processing duration, [optimize the main-thread costs](https://web.dev/articles/optimize-long-tasks), often JS.";
    /**
     * @description Title for the performance insight "INP by phase", which shows a breakdown of INP by phases / sections.
     */
    readonly title: "INP by phase";
    /**
     *@description Label used for the phase/component/stage/section of a larger duration.
     */
    readonly phase: "Phase";
    /**
     *@description Label used for a time duration.
     */
    readonly duration: "Duration";
    /**
     *@description Text shown next to the interaction event's input delay time in the detail view.
     */
    readonly inputDelay: "Input delay";
    /**
     *@description Text shown next to the interaction event's thread processing duration in the detail view.
     */
    readonly processingDuration: "Processing duration";
    /**
     *@description Text shown next to the interaction event's presentation delay time in the detail view.
     */
    readonly presentationDelay: "Presentation delay";
    /**
     * @description Text status indicating that no user interactions were detected.
     */
    readonly noInteractions: "No interactions detected";
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export declare function deps(): ['UserInteractions'];
export type INPInsightModel = InsightModel<typeof UIStrings, {
    longestInteractionEvent?: SyntheticInteractionPair;
    highPercentileInteractionEvent?: SyntheticInteractionPair;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): INPInsightModel;
