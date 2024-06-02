import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Spec from './web-vitals-injected/spec/spec.js';
export declare class LiveMetrics extends Common.ObjectWrapper.ObjectWrapper<EventTypes> implements SDK.TargetManager.Observer {
    #private;
    constructor();
    targetAdded(target: SDK.Target.Target): void;
    targetRemoved(target: SDK.Target.Target): void;
    enable(target: SDK.Target.Target): Promise<void>;
    disable(): Promise<void>;
}
export declare const enum Events {
    LCPChanged = "lcp_changed",
    CLSChanged = "cls_changed",
    INPChanged = "inp_changed",
    Reset = "reset"
}
export type MetricChangeEvent = Pick<Spec.MetricChangeEvent, 'value' | 'rating'>;
export interface LCPChangeEvent extends MetricChangeEvent {
    node?: SDK.DOMModel.DOMNode;
}
export interface INPChangeEvent extends MetricChangeEvent {
    interactionType: Spec.INPChangeEvent['interactionType'];
    node?: SDK.DOMModel.DOMNode;
}
export type CLSChangeEvent = MetricChangeEvent;
type EventTypes = {
    [Events.LCPChanged]: LCPChangeEvent;
    [Events.CLSChanged]: CLSChangeEvent;
    [Events.INPChanged]: INPChangeEvent;
    [Events.Reset]: void;
};
export {};
