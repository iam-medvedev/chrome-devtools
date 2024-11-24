import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Spec from './web-vitals-injected/spec/spec.js';
export type InteractionMap = Map<InteractionId, Interaction>;
export declare class LiveMetrics extends Common.ObjectWrapper.ObjectWrapper<EventTypes> implements SDK.TargetManager.Observer {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): LiveMetrics;
    get lcpValue(): LCPValue | undefined;
    get clsValue(): CLSValue | undefined;
    get inpValue(): INPValue | undefined;
    get interactions(): InteractionMap;
    get layoutShifts(): LayoutShift[];
    /**
     * Will create a log message describing the interaction's LoAF scripts.
     * Returns true if the message is successfully logged.
     */
    logInteractionScripts(interaction: Interaction): Promise<boolean>;
    setStatusForTesting(status: StatusEvent): void;
    clearInteractions(): void;
    clearLayoutShifts(): void;
    targetAdded(target: SDK.Target.Target): Promise<void>;
    targetRemoved(target: SDK.Target.Target): Promise<void>;
    enable(): Promise<void>;
    disable(): Promise<void>;
}
export declare const enum Events {
    STATUS = "status"
}
export type InteractionId = `interaction-${number}-${number}`;
export interface MetricValue {
    value: number;
    warnings?: string[];
}
export interface LCPValue extends MetricValue {
    phases: Spec.LCPPhases;
    node?: SDK.DOMModel.DOMNode;
}
export interface INPValue extends MetricValue {
    phases: Spec.INPPhases;
    interactionId: InteractionId;
}
export interface CLSValue extends MetricValue {
    clusterShiftIds: Spec.UniqueLayoutShiftId[];
}
export interface LayoutShift {
    score: number;
    uniqueLayoutShiftId: Spec.UniqueLayoutShiftId;
    affectedNodes: Array<{
        node: SDK.DOMModel.DOMNode;
    }>;
}
export interface Interaction {
    interactionId: InteractionId;
    interactionType: Spec.InteractionEntryEvent['interactionType'];
    eventNames: string[];
    duration: number;
    startTime: number;
    nextPaintTime: number;
    phases: Spec.INPPhases;
    longAnimationFrameTimings: Spec.PerformanceLongAnimationFrameTimingJSON[];
    node?: SDK.DOMModel.DOMNode;
}
export interface StatusEvent {
    lcp?: LCPValue;
    cls?: CLSValue;
    inp?: INPValue;
    interactions: InteractionMap;
    layoutShifts: LayoutShift[];
}
type EventTypes = {
    [Events.STATUS]: StatusEvent;
};
export {};
