import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Spec from './web-vitals-injected/spec/spec.js';
export declare class LiveMetrics extends Common.ObjectWrapper.ObjectWrapper<EventTypes> implements SDK.TargetManager.Observer {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): LiveMetrics;
    get lcpValue(): LCPValue | undefined;
    get clsValue(): CLSValue | undefined;
    get inpValue(): INPValue | undefined;
    get interactions(): Interaction[];
    get layoutShifts(): LayoutShift[];
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
export type MetricValue = Pick<Spec.MetricChangeEvent, 'value'>;
export interface LCPValue extends MetricValue {
    phases: Spec.LCPPhases;
    node?: SDK.DOMModel.DOMNode;
}
export interface INPValue extends MetricValue {
    phases: Spec.INPPhases;
    uniqueInteractionId: Spec.UniqueInteractionId;
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
    interactionType: Spec.InteractionEvent['interactionType'];
    duration: Spec.InteractionEvent['duration'];
    uniqueInteractionId: Spec.UniqueInteractionId;
    node?: SDK.DOMModel.DOMNode;
}
export interface StatusEvent {
    lcp?: LCPValue;
    cls?: CLSValue;
    inp?: INPValue;
    interactions: Interaction[];
    layoutShifts: LayoutShift[];
}
type EventTypes = {
    [Events.STATUS]: StatusEvent;
};
export {};
