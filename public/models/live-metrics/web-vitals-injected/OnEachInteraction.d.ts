/**
 * @fileoverview web-vitals.js doesn't provide a log of all interactions.
 * This was largely copied from the web vitals extension:
 * https://github.com/GoogleChrome/web-vitals-extension/blob/main/src/browser_action/on-each-interaction.js
 */
import type * as WebVitals from '../../../third_party/web-vitals/web-vitals.js';
export interface InteractionWithAttribution {
    attribution: {
        interactionTargetElement: Node | null;
        interactionType: WebVitals.INPAttribution['interactionType'];
    };
    entries: PerformanceEventTiming[];
    value: number;
}
export declare function onEachInteraction(callback: (interaction: InteractionWithAttribution) => void): void;
