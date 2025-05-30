import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare abstract class CategorizedBreakpointsSidebarPane extends UI.Widget.VBox {
    #private;
    constructor(breakpoints: SDK.CategorizedBreakpoint.CategorizedBreakpoint[], viewId: string, detailsPausedReason: Protocol.Debugger.PausedEventReason);
    get categories(): Map<SDK.CategorizedBreakpoint.Category, Item>;
    get breakpoints(): Map<SDK.CategorizedBreakpoint.CategorizedBreakpoint, Item>;
    focus(): void;
    private handleSpaceKeyEventOnBreakpoint;
    private createCategory;
    protected createBreakpoint(breakpoint: SDK.CategorizedBreakpoint.CategorizedBreakpoint): void;
    protected getBreakpointFromPausedDetails(_details: SDK.DebuggerModel.DebuggerPausedDetails): SDK.CategorizedBreakpoint.CategorizedBreakpoint | null;
    update(): void;
    private categoryCheckboxClicked;
    protected toggleBreakpoint(breakpoint: SDK.CategorizedBreakpoint.CategorizedBreakpoint, enabled: boolean): void;
    private breakpointCheckboxClicked;
}
export interface Item {
    element: UI.TreeOutline.TreeElement;
    checkbox: UI.UIUtils.CheckboxLabel;
}
