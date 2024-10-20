/**
 * @fileoverview web-vitals.js doesn't provide a log of all interactions.
 * This solution is hacky but it was recommended by web-vitals devs:
 * b/371052022
 */
import * as WebVitals from '../../../third_party/web-vitals/web-vitals.js';
export declare function onEachInteraction(onReport: (metric: WebVitals.INPMetricWithAttribution) => void): void;
