import '../../ui/legacy/legacy.js';
import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
interface ViewInput {
    items: Array<{
        name: string;
        id: string;
    }>;
    selectedId?: string;
    onReset: () => void;
    onItemClick: (id: string) => void;
    onItemKeyDown: (id: string, key: string) => void;
}
type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
declare const CSSOverviewSidebarPanel_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: import("../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class CSSOverviewSidebarPanel extends CSSOverviewSidebarPanel_base {
    #private;
    constructor(view?: View);
    performUpdate(): void;
    set items(items: Array<{
        name: string;
        id: string;
    }>);
    set selectedId(id: string);
}
export declare const enum SidebarEvents {
    ITEM_SELECTED = "ItemSelected",
    RESET = "Reset"
}
export interface ItemSelectedEvent {
    id: string;
    isMouseEvent: boolean;
    key: string | undefined;
}
export interface EventTypes {
    [SidebarEvents.ITEM_SELECTED]: ItemSelectedEvent;
    [SidebarEvents.RESET]: void;
}
export {};
