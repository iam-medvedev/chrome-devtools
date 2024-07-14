import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
declare const InspectedPagePlaceholder_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends Events.Update>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T]>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends Events.Update>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends Events.Update>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T]>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: Events.Update): boolean;
    dispatchEventToListeners<T extends Events.Update>(eventType: import("../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.Widget;
export declare class InspectedPagePlaceholder extends InspectedPagePlaceholder_base {
    private updateId?;
    constructor();
    static instance(opts?: {
        forceNew: null;
    }): InspectedPagePlaceholder;
    onResize(): void;
    restoreMinimumSize(): void;
    clearMinimumSize(): void;
    private dipPageRect;
    update(force?: boolean): void;
}
export declare const enum Events {
    Update = "Update"
}
export interface Bounds {
    x: number;
    y: number;
    height: number;
    width: number;
}
export type EventTypes = {
    [Events.Update]: Bounds;
};
export {};
