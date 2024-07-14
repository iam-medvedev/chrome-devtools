import * as Common from '../../../../core/common/common.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as UI from '../../legacy.js';
declare const FontEditor_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T]>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T]>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class FontEditor extends FontEditor_base {
    private readonly selectedNode;
    private readonly propertyMap;
    private readonly fontSelectorSection;
    private fontSelectors;
    private fontsList;
    constructor(propertyMap: Map<string, string>);
    wasShown(): void;
    private createFontSelectorSection;
    private createFontsList;
    private splitComputedFontArray;
    private createFontSelector;
    private deleteFontSelector;
    private updateFontSelectorList;
    private getPropertyInfo;
    private createSelector;
    private onFontSelectorChanged;
    private updatePropertyValue;
    private resizePopout;
}
export declare const enum Events {
    FontChanged = "FontChanged",
    FontEditorResized = "FontEditorResized"
}
export interface FontChangedEvent {
    propertyName: string;
    value: string;
}
export type EventTypes = {
    [Events.FontChanged]: FontChangedEvent;
    [Events.FontEditorResized]: void;
};
export {};
