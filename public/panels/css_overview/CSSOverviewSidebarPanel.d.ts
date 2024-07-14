import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
declare const CSSOverviewSidebarPanel_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T]>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T]>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: import("../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class CSSOverviewSidebarPanel extends CSSOverviewSidebarPanel_base {
    #private;
    containerElement: HTMLDivElement;
    constructor();
    addItem(name: string, id: string): void;
    select(id: string, focus: boolean): void;
    wasShown(): void;
}
export declare const enum SidebarEvents {
    ItemSelected = "ItemSelected",
    Reset = "Reset"
}
export interface ItemSelectedEvent {
    id: string;
    isMouseEvent: boolean;
    key: string | undefined;
}
export type EventTypes = {
    [SidebarEvents.ItemSelected]: ItemSelectedEvent;
    [SidebarEvents.Reset]: void;
};
export {};
