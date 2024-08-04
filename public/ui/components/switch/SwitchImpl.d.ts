export declare class SwitchChangeEvent extends Event {
    readonly checked: boolean;
    static readonly eventName = "switchchange";
    constructor(checked: boolean);
}
export declare class Switch extends HTMLElement {
    #private;
    static readonly litTagName: import("../../lit-html/static.js").Static;
    connectedCallback(): void;
    set checked(isChecked: boolean);
    get checked(): boolean;
    set disabled(isDisabled: boolean);
    get disabled(): boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-switch': Switch;
    }
}
declare global {
    interface HTMLElementEventMap {
        [SwitchChangeEvent.eventName]: SwitchChangeEvent;
    }
}
