import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import { type NetworkThrottlingConditionsGroup } from './ThrottlingPresets.js';
interface ViewInput {
    recommendedConditions: SDK.NetworkManager.Conditions | null;
    selectedConditions: SDK.NetworkManager.Conditions;
    throttlingGroups: NetworkThrottlingConditionsGroup[];
    customConditionsGroup: NetworkThrottlingConditionsGroup;
    jslogContext: string;
    title: string;
    onSelect: (conditions: SDK.NetworkManager.Conditions) => void;
    onAddCustomConditions: () => void;
}
export type ViewFunction = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: ViewFunction;
export declare const enum Events {
    CONDITIONS_CHANGED = "conditionsChanged"
}
export interface EventTypes {
    [Events.CONDITIONS_CHANGED]: SDK.NetworkManager.Conditions;
}
export declare class NetworkThrottlingSelect extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    static createForGlobalConditions(element: HTMLElement, title: string): NetworkThrottlingSelect;
    constructor(element: HTMLElement, title: string, jslogContext: string, currentConditions: SDK.NetworkManager.Conditions, view?: ViewFunction);
    set recommendedConditions(recommendedConditions: SDK.NetworkManager.Conditions | null);
    set currentConditions(currentConditions: SDK.NetworkManager.Conditions);
}
export {};
