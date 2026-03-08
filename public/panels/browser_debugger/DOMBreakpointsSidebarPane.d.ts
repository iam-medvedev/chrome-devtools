import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface Breakpoint {
    breakpoint: SDK.DOMDebuggerModel.DOMBreakpoint;
    label: string;
    isHighlighted: boolean;
    isFocused: boolean;
}
export interface ViewInput {
    breakpoints: Breakpoint[];
    onBreakpointClick: (breakpoint: SDK.DOMDebuggerModel.DOMBreakpoint) => void;
    onBreakpointCheckboxClick: (breakpoint: SDK.DOMDebuggerModel.DOMBreakpoint) => void;
    onBreakpointContextMenu: (breakpoint: SDK.DOMDebuggerModel.DOMBreakpoint, event: Event) => void;
    onBreakpointKeyDown: (breakpoint: SDK.DOMDebuggerModel.DOMBreakpoint, event: Event) => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class DOMBreakpointsSidebarPane extends UI.Widget.VBox implements UI.ContextFlavorListener.ContextFlavorListener {
    #private;
    set highlightedBreakpoint(breakpoint: SDK.DOMDebuggerModel.DOMBreakpoint | null);
    set focusedBreakpoint(breakpoint: SDK.DOMDebuggerModel.DOMBreakpoint | null);
    constructor(view?: View);
    static instance(): DOMBreakpointsSidebarPane;
    performUpdate(): void;
    private onBreakpointClick;
    private onBreakpointKeyDown;
    private breakpointAdded;
    private breakpointToggled;
    private breakpointsRemoved;
    private addBreakpoint;
    private onBreakpointContextMenu;
    private onBreakpointCheckboxClick;
    flavorChanged(_object: Object | null): void;
    update(): void;
}
export declare class ContextMenuProvider implements UI.ContextMenu.Provider<SDK.DOMModel.DOMNode> {
    appendApplicableItems(_event: Event, contextMenu: UI.ContextMenu.ContextMenu, node: SDK.DOMModel.DOMNode): void;
}
