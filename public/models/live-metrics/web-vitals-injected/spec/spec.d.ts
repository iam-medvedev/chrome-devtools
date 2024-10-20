import type { INPAttribution, MetricType } from '../../../../third_party/web-vitals/web-vitals.js';
export declare const EVENT_BINDING_NAME = "__chromium_devtools_metrics_reporter";
export declare const INTERNAL_KILL_SWITCH = "__chromium_devtools_kill_live_metrics";
export type MetricChangeEvent = Pick<MetricType, 'name' | 'value'>;
export type InteractionEntryGroupId = number & {
    _tag: 'InteractionEntryGroupId';
};
export type UniqueLayoutShiftId = `layout-shift-${number}-${number}`;
export declare function getUniqueLayoutShiftId(entry: LayoutShift): UniqueLayoutShiftId;
export interface LCPPhases {
    timeToFirstByte: number;
    resourceLoadDelay: number;
    resourceLoadTime: number;
    elementRenderDelay: number;
}
export interface INPPhases {
    inputDelay: number;
    processingDuration: number;
    presentationDelay: number;
}
export interface LCPChangeEvent extends MetricChangeEvent {
    name: 'LCP';
    phases: LCPPhases;
    nodeIndex?: number;
}
export interface CLSChangeEvent extends MetricChangeEvent {
    name: 'CLS';
    clusterShiftIds: UniqueLayoutShiftId[];
}
export interface INPChangeEvent extends MetricChangeEvent {
    name: 'INP';
    interactionType: INPAttribution['interactionType'];
    phases: INPPhases;
    startTime: number;
    entryGroupId: InteractionEntryGroupId;
}
/**
 * This event is not 1:1 with the interactions that the user sees in the interactions log.
 * It is 1:1 with a `PerformanceEventTiming` entry.
 */
export interface InteractionEntryEvent {
    name: 'InteractionEntry';
    interactionType: INPAttribution['interactionType'];
    eventName: string;
    entryGroupId: InteractionEntryGroupId;
    startTime: number;
    nextPaintTime: number;
    duration: number;
    phases: INPPhases;
    nodeIndex?: number;
}
export interface LayoutShiftEvent {
    name: 'LayoutShift';
    score: number;
    uniqueLayoutShiftId: UniqueLayoutShiftId;
    affectedNodeIndices: number[];
}
export interface ResetEvent {
    name: 'reset';
}
export type WebVitalsEvent = LCPChangeEvent | CLSChangeEvent | INPChangeEvent | InteractionEntryEvent | LayoutShiftEvent | ResetEvent;
