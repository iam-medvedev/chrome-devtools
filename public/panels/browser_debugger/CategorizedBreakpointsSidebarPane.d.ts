import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
interface ViewInput {
    onFilterChanged: (ev: CustomEvent<string | null>) => void;
}
type View = (input: ViewInput, output: object, target: HTMLElement) => void;
declare const FilterToolbar_base: (new (...args: any[]) => {
    addEventListener<T extends FilterToolbar.Events.FILTER_CHANGED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<FilterToolbar.EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<FilterToolbar.EventTypes, T>;
    once<T extends FilterToolbar.Events.FILTER_CHANGED>(eventType: T): Promise<FilterToolbar.EventTypes[T]>;
    removeEventListener<T extends FilterToolbar.Events.FILTER_CHANGED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<FilterToolbar.EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: FilterToolbar.Events.FILTER_CHANGED): boolean;
    dispatchEventToListeners<T extends FilterToolbar.Events.FILTER_CHANGED>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<FilterToolbar.EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class FilterToolbar extends FilterToolbar_base {
    #private;
    constructor(element?: HTMLElement, view?: View);
    get filterText(): string | null;
    performUpdate(): void;
}
export declare namespace FilterToolbar {
    enum Events {
        FILTER_CHANGED = "filter-changed"
    }
    interface EventTypes {
        [Events.FILTER_CHANGED]: string | null;
    }
}
export declare abstract class CategorizedBreakpointsSidebarPane extends UI.Widget.VBox {
    #private;
    protected readonly filterToolbar: FilterToolbar;
    constructor(breakpoints: SDK.CategorizedBreakpoint.CategorizedBreakpoint[], viewId: string, detailsPausedReason: Protocol.Debugger.PausedEventReason);
    get categories(): Map<SDK.CategorizedBreakpoint.Category, Item>;
    get breakpoints(): Map<SDK.CategorizedBreakpoint.CategorizedBreakpoint, Item>;
    protected get treeOutline(): UI.TreeOutline.TreeOutline;
    focus(): void;
    private handleSpaceKeyEventOnBreakpoint;
    private createCategory;
    protected createBreakpoint(breakpoint: SDK.CategorizedBreakpoint.CategorizedBreakpoint): void;
    protected getBreakpointFromPausedDetails(_details: SDK.DebuggerModel.DebuggerPausedDetails): SDK.CategorizedBreakpoint.CategorizedBreakpoint | null;
    update(): void;
    protected populate(filterText?: string | null): void;
    private categoryCheckboxClicked;
    protected toggleBreakpoint(breakpoint: SDK.CategorizedBreakpoint.CategorizedBreakpoint, enabled: boolean): void;
    private breakpointCheckboxClicked;
}
export interface Item {
    element: UI.TreeOutline.TreeElement;
    checkbox: UI.UIUtils.CheckboxLabel;
    category: SDK.CategorizedBreakpoint.Category;
}
export {};
