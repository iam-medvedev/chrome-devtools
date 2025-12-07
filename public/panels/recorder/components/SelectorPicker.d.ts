import * as SDK from '../../../core/sdk/sdk.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as Models from '../models/models.js';
export declare class RequestSelectorAttributeEvent extends Event {
    static readonly eventName = "requestselectorattribute";
    send: (attribute?: string) => void;
    constructor(send: (attribute?: string) => void);
}
export interface ViewInput {
    active: boolean;
    disabled: boolean;
    onClick: (event: MouseEvent) => void;
}
export type ViewOutput = object;
export declare const DEFAULT_VIEW: (input: ViewInput, _output: ViewOutput, target: HTMLElement) => void;
export declare class SelectorPicker extends UI.Widget.Widget implements SDK.TargetManager.Observer {
    #private;
    onSelectorPicked?: (data: Models.Schema.StepWithSelectors & Pick<Models.Schema.ClickAttributes, 'offsetX' | 'offsetY'>) => void;
    onAttributeRequested?: (send: (attribute?: string) => void) => void;
    constructor(element?: HTMLElement, view?: typeof DEFAULT_VIEW);
    set disabled(disabled: boolean);
    performUpdate(): void;
    targetAdded(target: SDK.Target.Target): void;
    targetRemoved(target: SDK.Target.Target): void;
    wasShown(): void;
    wasHidden(): void;
}
