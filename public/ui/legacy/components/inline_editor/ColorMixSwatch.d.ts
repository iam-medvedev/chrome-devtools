import * as Common from '../../../../core/common/common.js';
import * as Platform from '../../../../core/platform/platform.js';
export declare const enum Events {
    COLOR_CHANGED = "colorChanged"
}
export interface EventTypes {
    [Events.COLOR_CHANGED]: {
        text: string;
    };
}
declare const ColorMixSwatch_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends Events.COLOR_CHANGED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends Events.COLOR_CHANGED>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends Events.COLOR_CHANGED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: Events.COLOR_CHANGED): boolean;
    dispatchEventToListeners<T extends Events.COLOR_CHANGED>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & {
    new (): HTMLElement;
    prototype: HTMLElement;
};
export declare class ColorMixSwatch extends ColorMixSwatch_base {
    #private;
    static readonly litTagName: import("../../../lit-html/static.js").Static;
    private readonly shadow;
    private colorMixText;
    private firstColorText;
    private secondColorText;
    constructor();
    get icon(): Element | null;
    mixedColor(): Common.Color.Color | null;
    setFirstColor(text: string): void;
    setSecondColor(text: string): void;
    setColorMixText(text: string): void;
    setRegisterPopoverCallback(callback: (swatch: ColorMixSwatch) => void): void;
    getText(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-color-mix-swatch': ColorMixSwatch;
    }
}
export {};
