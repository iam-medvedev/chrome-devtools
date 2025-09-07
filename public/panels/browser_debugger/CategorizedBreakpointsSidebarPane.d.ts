import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
interface ViewOutput {
    defaultFocus: Element | undefined;
    userExpandedCategories: Set<SDK.CategorizedBreakpoint.Category>;
}
interface ViewInput {
    onFilterChanged: (filterText: string | null) => void;
    onBreakpointChange: (breakpoint: SDK.CategorizedBreakpoint.CategorizedBreakpoint, enabled: boolean) => void;
    filterText: string | null;
    userExpandedCategories: Set<SDK.CategorizedBreakpoint.Category>;
    highlightedItem: SDK.CategorizedBreakpoint.CategorizedBreakpoint | null;
    categories: Map<SDK.CategorizedBreakpoint.Category, SDK.CategorizedBreakpoint.CategorizedBreakpoint[]>;
    sortedCategoryNames: SDK.CategorizedBreakpoint.Category[];
}
export type View = typeof DEFAULT_VIEW;
export declare const DEFAULT_VIEW: (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare abstract class CategorizedBreakpointsSidebarPane extends UI.Widget.VBox {
    #private;
    private readonly categories;
    constructor(breakpoints: SDK.CategorizedBreakpoint.CategorizedBreakpoint[], jslog: string, viewId: string, view?: (input: ViewInput, output: ViewOutput, target: HTMLElement) => void);
    protected getBreakpointFromPausedDetails(_details: SDK.DebuggerModel.DebuggerPausedDetails): SDK.CategorizedBreakpoint.CategorizedBreakpoint | null;
    update(): void;
    protected onBreakpointChanged(breakpoint: SDK.CategorizedBreakpoint.CategorizedBreakpoint, enabled: boolean): void;
    performUpdate(): void;
}
export {};
