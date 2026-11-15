import '../../ui/components/menus/menus.js';
import '../../ui/kit/kit.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface TargetItem {
    title: string;
    subtitle: string;
}
export interface ViewInput {
    items: TargetItem[];
    selectedIndex: number;
    open: boolean;
    onToggleMenu: () => void;
    onCloseMenu: () => void;
    onSelect: (index: number) => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class OutermostTargetSelector extends UI.Widget.Widget implements SDK.TargetManager.Observer, UI.Toolbar.Provider {
    #private;
    constructor(element?: HTMLElement, view?: View);
    show(parentElement: Element | DocumentFragment, insertBefore?: Node | null, suppressOrphanWidgetError?: boolean): void;
    wasShown(): void;
    performUpdate(): void;
    item(): UI.Toolbar.ToolbarItem;
    targetAdded(target: SDK.Target.Target): void;
    targetRemoved(target: SDK.Target.Target): void;
}
