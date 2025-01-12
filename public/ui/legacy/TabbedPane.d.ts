import './Toolbar.js';
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as IconButton from '../components/icon_button/icon_button.js';
import { ContextMenu } from './ContextMenu.js';
import { Constraints } from './Geometry.js';
import type { Toolbar } from './Toolbar.js';
import { VBox, type Widget } from './Widget.js';
declare const TabbedPane_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof VBox;
export declare class TabbedPane extends TabbedPane_base {
    private readonly headerElementInternal;
    private readonly headerContentsElement;
    tabSlider: HTMLDivElement;
    readonly tabsElement: HTMLElement;
    private readonly contentElementInternal;
    private tabs;
    private readonly tabsHistory;
    tabsById: Map<string, TabbedPaneTab>;
    private currentTabLocked;
    private autoSelectFirstItemOnShow;
    private triggerDropDownTimeout;
    private dropDownButton;
    private currentDevicePixelRatio;
    private shrinkableTabs?;
    private verticalTabLayout?;
    private closeableTabs?;
    private delegate?;
    private currentTab?;
    private sliderEnabled?;
    private placeholderElement?;
    private focusedPlaceholderElement?;
    private placeholderContainerElement?;
    private lastSelectedOverflowTab?;
    private overflowDisabled?;
    private measuredDropDownButtonWidth?;
    private leftToolbarInternal?;
    private rightToolbarInternal?;
    allowTabReorder?: boolean;
    private automaticReorder?;
    constructor();
    setAccessibleName(name: string): void;
    setCurrentTabLocked(locked: boolean): void;
    setAutoSelectFirstItemOnShow(autoSelect: boolean): void;
    get visibleView(): Widget | null;
    tabIds(): string[];
    tabIndex(tabId: string): number;
    tabViews(): Widget[];
    tabView(tabId: string): Widget | null;
    get selectedTabId(): string | null;
    setShrinkableTabs(shrinkableTabs: boolean): void;
    makeVerticalTabLayout(): void;
    setCloseableTabs(closeableTabs: boolean): void;
    focus(): void;
    focusSelectedTabHeader(): void;
    headerElement(): Element;
    tabbedPaneContentElement(): Element;
    isTabCloseable(id: string): boolean;
    setTabDelegate(delegate: TabbedPaneTabDelegate): void;
    appendTab(id: string, tabTitle: string, view: Widget, tabTooltip?: string, userGesture?: boolean, isCloseable?: boolean, isPreviewFeature?: boolean, index?: number, jslogContext?: string): void;
    closeTab(id: string, userGesture?: boolean): void;
    closeTabs(ids: string[], userGesture?: boolean): void;
    private innerCloseTab;
    hasTab(tabId: string): boolean;
    otherTabs(id: string): string[];
    tabsToTheRight(id: string): string[];
    private viewHasFocus;
    selectTab(id: string, userGesture?: boolean, forceFocus?: boolean): boolean;
    selectNextTab(): void;
    selectPrevTab(): void;
    getTabIndex(id: string): number;
    moveTabBackward(id: string, index: number): void;
    moveTabForward(id: string, index: number): void;
    lastOpenedTabIds(tabsCount: number): string[];
    setTabIcon(id: string, icon: IconButton.Icon.Icon | null): void;
    setSuffixElement(id: string, suffixElement: HTMLElement | null): void;
    setTabEnabled(id: string, enabled: boolean): void;
    tabIsDisabled(id: string): boolean;
    tabIsEnabled(id: string): boolean;
    toggleTabClass(id: string, className: string, force?: boolean): void;
    private zoomChanged;
    private clearMeasuredWidths;
    changeTabTitle(id: string, tabTitle: string, tabTooltip?: string): void;
    changeTabView(id: string, view: Widget): void;
    onResize(): void;
    headerResized(): void;
    wasShown(): void;
    makeTabSlider(): void;
    private setTabSlider;
    calculateConstraints(): Constraints;
    private updateTabElements;
    setPlaceholderElement(element: Element, focusedElement?: Element): void;
    waitForTabElementUpdate(): Promise<void>;
    private innerUpdateTabElements;
    private adjustToolbarWidth;
    private showTabElement;
    private hideTabElement;
    private createDropDownButton;
    private dropDownClicked;
    private dropDownKeydown;
    private dropDownMenuItemSelected;
    private totalWidth;
    private numberOfTabsShown;
    disableOverflowMenu(): void;
    private updateTabsDropDown;
    private maybeShowDropDown;
    private measureDropDownButton;
    private updateWidths;
    private measureWidths;
    private calculateMaxWidth;
    private tabsToShowIndexes;
    private hideCurrentTab;
    private showTab;
    updateTabSlider(): void;
    private hideTab;
    elementsToRestoreScrollPositionsFor(): Element[];
    insertBefore(tab: TabbedPaneTab, index: number): void;
    leftToolbar(): Toolbar;
    rightToolbar(): Toolbar;
    setAllowTabReorder(allow: boolean, automatic?: boolean): void;
    private keyDown;
}
export interface EventData {
    prevTabId?: string;
    tabId: string;
    view?: Widget;
    isUserGesture?: boolean;
}
export declare enum Events {
    TabInvoked = "TabInvoked",
    TabSelected = "TabSelected",
    TabClosed = "TabClosed",
    TabOrderChanged = "TabOrderChanged"
}
export interface EventTypes {
    [Events.TabInvoked]: EventData;
    [Events.TabSelected]: EventData;
    [Events.TabClosed]: EventData;
    [Events.TabOrderChanged]: EventData;
}
export declare class TabbedPaneTab {
    closeable: boolean;
    previewFeature: boolean;
    private readonly tabbedPane;
    idInternal: string;
    private titleInternal;
    private tooltipInternal;
    private viewInternal;
    shown: boolean;
    measuredWidth: number | undefined;
    private tabElementInternal;
    private icon;
    private suffixElement;
    private widthInternal?;
    private delegate?;
    private titleElement?;
    private dragStartX?;
    private jslogContextInternal?;
    constructor(tabbedPane: TabbedPane, id: string, title: string, closeable: boolean, previewFeature: boolean, view: Widget, tooltip?: string, jslogContext?: string);
    get id(): string;
    get title(): string;
    set title(title: string);
    get jslogContext(): string;
    isCloseable(): boolean;
    setIcon(icon: IconButton.Icon.Icon | null): void;
    setSuffixElement(suffixElement: HTMLElement | null): void;
    toggleClass(className: string, force?: boolean): boolean;
    get view(): Widget;
    set view(view: Widget);
    get tooltip(): string | undefined;
    set tooltip(tooltip: string | undefined);
    get tabElement(): HTMLElement;
    width(): number;
    setWidth(width: number): void;
    setDelegate(delegate: TabbedPaneTabDelegate): void;
    private createIconElement;
    private createSuffixElement;
    private createMeasureClone;
    createTabElement(measuring: boolean): HTMLElement;
    private createCloseIconButton;
    private createPreviewIcon;
    private isCloseIconClicked;
    private tabClicked;
    private tabMouseDown;
    private tabMouseUp;
    private closeTabs;
    private tabContextMenu;
    private startTabDragging;
    private tabDragging;
    private endTabDragging;
}
export interface TabbedPaneTabDelegate {
    closeTabs(tabbedPane: TabbedPane, ids: string[]): void;
    onContextMenu(tabId: string, contextMenu: ContextMenu): void;
}
export {};
