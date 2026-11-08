import * as UI from '../../ui/legacy/legacy.js';
import { type TemplateResult } from '../../ui/lit/lit.js';
export interface BreakpointItem {
    url: string;
    enabled: boolean;
    title: string;
    isHit: boolean;
    isFocused: boolean;
    isEditing: boolean;
}
export interface ViewInput {
    isAdding: boolean;
    breakpoints: BreakpointItem[];
    onAddCommit: (newUrl: string) => void;
    onAddCancel: () => void;
    onBreakpointClick: (url: string) => void;
    onBreakpointCheckboxChange: (url: string) => void;
    onBreakpointContextMenu: (url: string, event: Event) => void;
    onBreakpointNavigate: (url: string, direction: 'ArrowUp' | 'ArrowDown' | 'Home' | 'End') => void;
    onStartEditing: (url: string) => void;
    onEditCommit: (oldUrl: string, newUrl: string) => void;
    onEditCancel: (url: string) => void;
    onEmptyContextMenu: (event: Event) => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement | DocumentFragment) => void;
export declare const DEFAULT_VIEW: View;
export declare class XHRBreakpointsSidebarPane extends UI.Widget.VBox<ShadowRoot> implements UI.ContextFlavorListener.ContextFlavorListener, UI.Toolbar.ItemsProvider {
    #private;
    constructor(view?: View);
    static instance(opts?: {
        forceNew: boolean | null;
        view?: View;
    }): XHRBreakpointsSidebarPane;
    static removeInstance(): void;
    toolbarItems(): TemplateResult;
    addButtonClicked(): Promise<void>;
    setBreakpoint(breakKeyword: string, enabled?: boolean): void;
    get focusedBreakpoint(): string | null;
    set focusedBreakpoint(url: string | null);
    flavorChanged(_object: Object | null): void;
    wasShown(): void;
    update(): void;
    performUpdate(): void;
}
