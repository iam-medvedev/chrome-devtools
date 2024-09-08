import * as Common from '../../core/common/common.js';
import { GlassPane } from './GlassPane.js';
declare const Dialog_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends Events.HIDDEN>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends Events.HIDDEN>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends Events.HIDDEN>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: Events.HIDDEN): boolean;
    dispatchEventToListeners<T extends Events.HIDDEN>(eventType: import("../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof GlassPane;
export declare class Dialog extends Dialog_base {
    private tabIndexBehavior;
    private tabIndexMap;
    private focusRestorer;
    private closeOnEscape;
    private targetDocument;
    private readonly targetDocumentKeyDownHandler;
    private escapeKeyCallback;
    constructor(jslogContext?: string);
    static hasInstance(): boolean;
    static getInstance(): Dialog | null;
    show(where?: Document | Element): void;
    hide(): void;
    setCloseOnEscape(close: boolean): void;
    setEscapeKeyCallback(callback: (arg0: Event) => void): void;
    addCloseButton(): void;
    setOutsideTabIndexBehavior(tabIndexBehavior: OutsideTabIndexBehavior): void;
    private disableTabIndexOnElements;
    private getMainWidgetTabIndexElements;
    private restoreTabIndexOnElements;
    private onKeyDown;
    private static instance;
}
export declare const enum Events {
    HIDDEN = "hidden"
}
export type EventTypes = {
    [Events.HIDDEN]: void;
};
export declare const enum OutsideTabIndexBehavior {
    DISABLE_ALL_OUTSIDE_TAB_INDEX = "DisableAllTabIndex",
    PRESERVE_MAIN_VIEW_TAB_INDEX = "PreserveMainViewTabIndex",
    PRESERVE_TAB_INDEX = "PreserveTabIndex"
}
export {};
