import * as Common from '../../core/common/common.js';
import type * as Platform from '../../core/platform/platform.js';
import * as IconButton from '../../ui/components/icon_button/icon_button.js';
import * as UI from '../../ui/legacy/legacy.js';
import { ConsoleFilter } from './ConsoleFilter.js';
import type { ConsoleViewMessage } from './ConsoleViewMessage.js';
declare const ConsoleSidebar_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends Events.FILTER_SELECTED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends Events.FILTER_SELECTED>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends Events.FILTER_SELECTED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: Events.FILTER_SELECTED): boolean;
    dispatchEventToListeners<T extends Events.FILTER_SELECTED>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class ConsoleSidebar extends ConsoleSidebar_base {
    private readonly tree;
    private selectedTreeElement;
    private readonly treeElements;
    constructor();
    private appendGroup;
    clear(): void;
    onMessageAdded(viewMessage: ConsoleViewMessage): void;
    shouldBeVisible(viewMessage: ConsoleViewMessage): boolean;
    private selectionChanged;
}
export declare const enum Events {
    FILTER_SELECTED = "FilterSelected"
}
export interface EventTypes {
    [Events.FILTER_SELECTED]: void;
}
declare class ConsoleSidebarTreeElement extends UI.TreeOutline.TreeElement {
    protected filterInternal: ConsoleFilter;
    constructor(title: string | Node, filter: ConsoleFilter);
    filter(): ConsoleFilter;
}
export declare class URLGroupTreeElement extends ConsoleSidebarTreeElement {
    private countElement;
    private messageCount;
    constructor(filter: ConsoleFilter);
    incrementAndUpdateCounter(): void;
}
export declare class FilterTreeElement extends ConsoleSidebarTreeElement {
    private readonly selectedFilterSetting;
    private readonly urlTreeElements;
    private messageCount;
    private uiStringForFilterCount;
    constructor(filter: ConsoleFilter, icon: IconButton.Icon.Icon, selectedFilterSetting: Common.Settings.Setting<string | null>);
    clear(): void;
    name(): string;
    onselect(selectedByUser?: boolean): boolean;
    private updateCounter;
    private updateGroupTitle;
    onMessageAdded(viewMessage: ConsoleViewMessage): void;
    private childElement;
}
export {};
