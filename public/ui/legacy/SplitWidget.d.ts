import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import { Constraints } from './Geometry.js';
import { ToolbarButton } from './Toolbar.js';
import { Widget, WidgetElement } from './Widget.js';
declare const SplitWidget_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof Widget;
export declare class SplitWidget extends SplitWidget_base {
    private sidebarElementInternal;
    private mainElement;
    private resizerElementInternal;
    private resizerElementSize;
    private readonly resizerWidget;
    private defaultSidebarWidth;
    private defaultSidebarHeight;
    private readonly constraintsInDip;
    private resizeStartSizeDIP;
    private setting;
    private totalSizeCSS;
    private totalSizeOtherDimensionCSS;
    private mainWidgetInternal;
    private sidebarWidgetInternal;
    private animationFrameHandle;
    private animationCallback;
    private showSidebarButtonTitle;
    private hideSidebarButtonTitle;
    private shownSidebarString;
    private hiddenSidebarString;
    private showHideSidebarButton;
    private isVerticalInternal;
    private sidebarMinimized;
    private detaching;
    private sidebarSizeDIP;
    private savedSidebarSizeDIP;
    private secondIsSidebar;
    private shouldSaveShowMode;
    private savedVerticalMainSize;
    private savedHorizontalMainSize;
    private showModeInternal;
    private savedShowMode;
    private autoAdjustOrientation;
    constructor(isVertical: boolean, secondIsSidebar: boolean, settingName?: string, defaultSidebarWidth?: number, defaultSidebarHeight?: number, constraintsInDip?: boolean, element?: SplitWidgetElement);
    isVertical(): boolean;
    setVertical(isVertical: boolean): void;
    setAutoAdjustOrientation(autoAdjustOrientation: boolean): void;
    private innerSetVertical;
    private updateLayout;
    setMainWidget(widget: Widget): void;
    setSidebarWidget(widget: Widget): void;
    mainWidget(): Widget | null;
    sidebarWidget(): Widget | null;
    sidebarElement(): HTMLElement;
    childWasDetached(widget: Widget): void;
    isSidebarSecond(): boolean;
    enableShowModeSaving(): void;
    showMode(): string;
    sidebarIsShowing(): boolean;
    setSecondIsSidebar(secondIsSidebar: boolean): void;
    resizerElement(): Element;
    hideMain(animate?: boolean): void;
    hideSidebar(animate?: boolean): void;
    setSidebarMinimized(minimized: boolean): void;
    isSidebarMinimized(): boolean;
    private showOnly;
    private showFinishedForTest;
    private removeAllLayoutProperties;
    showBoth(animate?: boolean): void;
    setResizable(resizable: boolean): void;
    forceSetSidebarWidth(width: number): void;
    isResizable(): boolean;
    setSidebarSize(size: number): void;
    sidebarSize(): number;
    totalSize(): number;
    /**
     * Returns total size in DIP.
     */
    private totalSizeDIP;
    private updateShowMode;
    private innerSetSidebarSizeDIP;
    private animate;
    private cancelAnimation;
    private applyConstraints;
    wasShown(): void;
    willHide(): void;
    onResize(): void;
    onLayout(): void;
    calculateConstraints(): Constraints;
    private maybeAutoAdjustOrientation;
    private onResizeStart;
    private onResizeUpdate;
    private onResizeEnd;
    hideDefaultResizer(noSplitter?: boolean): void;
    installResizer(resizerElement: Element): void;
    uninstallResizer(resizerElement: Element): void;
    toggleResizer(resizer: Element, on: boolean): void;
    private settingForOrientation;
    private preferredSidebarSizeDIP;
    private restoreSidebarSizeFromSettings;
    private restoreAndApplyShowModeFromSettings;
    private saveShowModeToSettings;
    private saveSetting;
    private forceUpdateLayout;
    private onZoomChanged;
    createShowHideSidebarButton(showTitle: Common.UIString.LocalizedString, hideTitle: Common.UIString.LocalizedString, shownString: Common.UIString.LocalizedString, hiddenString: Common.UIString.LocalizedString, jslogContext?: string): ToolbarButton;
    /**
     * @returns true if this call makes the sidebar visible, and false otherwise.
     */
    toggleSidebar(): boolean;
    private updateShowHideSidebarButton;
}
export declare class SplitWidgetElement extends WidgetElement<SplitWidget> {
    static readonly observedAttributes: string[];
    createWidget(): SplitWidget;
    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void;
}
export declare const enum ShowMode {
    BOTH = "Both",
    ONLY_MAIN = "OnlyMain",
    ONLY_SIDEBAR = "OnlySidebar"
}
export declare const enum Events {
    SIDEBAR_SIZE_CHANGED = "SidebarSizeChanged",
    SHOW_MODE_CHANGED = "ShowModeChanged"
}
export interface EventTypes {
    [Events.SIDEBAR_SIZE_CHANGED]: number;
    [Events.SHOW_MODE_CHANGED]: string;
}
export interface SettingForOrientation {
    showMode: ShowMode;
    size: number;
}
export {};
