import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class DOMBreakpointsSidebarPane extends UI.Widget.VBox implements UI.ContextFlavorListener.ContextFlavorListener, UI.ListControl.ListDelegate<SDK.DOMDebuggerModel.DOMBreakpoint> {
    #private;
    elementToCheckboxes: WeakMap<Element, UI.UIUtils.CheckboxLabel>;
    private constructor();
    static instance(): DOMBreakpointsSidebarPane;
    createElementForItem(item: SDK.DOMDebuggerModel.DOMBreakpoint): Element;
    heightForItem(_item: SDK.DOMDebuggerModel.DOMBreakpoint): number;
    isItemSelectable(_item: SDK.DOMDebuggerModel.DOMBreakpoint): boolean;
    updateSelectedItemARIA(_fromElement: Element | null, _toElement: Element | null): boolean;
    selectedItemChanged(_from: SDK.DOMDebuggerModel.DOMBreakpoint | null, _to: SDK.DOMDebuggerModel.DOMBreakpoint | null, fromElement: HTMLElement | null, toElement: HTMLElement | null): void;
    private breakpointAdded;
    private breakpointToggled;
    private breakpointsRemoved;
    private addBreakpoint;
    private contextMenu;
    private checkboxClicked;
    flavorChanged(_object: Object | null): void;
    update(): void;
}
export declare class ContextMenuProvider implements UI.ContextMenu.Provider<SDK.DOMModel.DOMNode> {
    appendApplicableItems(_event: Event, contextMenu: UI.ContextMenu.ContextMenu, node: SDK.DOMModel.DOMNode): void;
}
