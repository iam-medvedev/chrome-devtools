import type { ActionDelegate as ActionDelegateInterface } from './ActionRegistration.js';
import type { Context } from './Context.js';
import type { ContextMenu } from './ContextMenu.js';
import type { Panel } from './Panel.js';
import { SplitWidget } from './SplitWidget.js';
import { type TabbedPane, type TabbedPaneTabDelegate } from './TabbedPane.js';
import type { View, ViewLocation, ViewLocationResolver } from './View.js';
import { VBox, type Widget } from './Widget.js';
export declare class InspectorView extends VBox implements ViewLocationResolver {
    #private;
    private readonly drawerSplitWidget;
    private readonly tabDelegate;
    private readonly drawerTabbedLocation;
    private drawerTabbedPane;
    private infoBarDiv;
    private readonly tabbedLocation;
    readonly tabbedPane: TabbedPane;
    private readonly keyDownBound;
    private currentPanelLocked?;
    private focusRestorer?;
    private ownerSplitWidget?;
    private reloadRequiredInfobar?;
    constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    } | undefined): InspectorView;
    static maybeGetInspectorViewInstance(): InspectorView | null;
    static removeInstance(): void;
    wasShown(): void;
    willHide(): void;
    resolveLocation(locationName: string): ViewLocation | null;
    createToolbars(): Promise<void>;
    addPanel(view: View): void;
    hasPanel(panelName: string): boolean;
    panel(panelName: string): Promise<Panel>;
    onSuspendStateChanged(allTargetsSuspended: boolean): void;
    canSelectPanel(panelName: string): boolean;
    showPanel(panelName: string): Promise<void>;
    setPanelWarnings(tabId: string, warnings: string[]): void;
    private emitDrawerChangeEvent;
    private getTabbedPaneForTabId;
    currentPanelDeprecated(): Widget | null;
    showDrawer({ focus, hasTargetDrawer }: {
        focus: boolean;
        hasTargetDrawer: boolean;
    }): void;
    drawerVisible(): boolean;
    closeDrawer(): void;
    toggleDrawerOrientation(): void;
    setDrawerMinimumSize(): void;
    setDrawerMinimized(minimized: boolean): void;
    drawerSize(): number;
    setDrawerSize(size: number): void;
    totalSize(): number;
    isDrawerMinimized(): boolean;
    private keyDown;
    onResize(): void;
    topResizerElement(): Element;
    toolbarItemResized(): void;
    private tabSelected;
    setOwnerSplit(splitWidget: SplitWidget): void;
    ownerSplit(): SplitWidget | null;
    minimize(): void;
    restore(): void;
    displayDebuggedTabReloadRequiredWarning(message: string): void;
    removeDebuggedTabReloadRequiredWarning(): void;
    displayReloadRequiredWarning(message: string): void;
    displaySelectOverrideFolderInfobar(callback: () => void): void;
    private createInfoBarDiv;
    private attachInfobar;
}
export declare class ActionDelegate implements ActionDelegateInterface {
    handleAction(_context: Context, actionId: string): boolean;
}
export declare class InspectorViewTabDelegate implements TabbedPaneTabDelegate {
    closeTabs(tabbedPane: TabbedPane, ids: string[]): void;
    moveToDrawer(tabId: string): void;
    moveToMainPanel(tabId: string): void;
    onContextMenu(tabId: string, contextMenu: ContextMenu): void;
}
export declare const enum Events {
    DRAWER_CHANGE = "drawerchange"
}
