import * as Host from '../../core/host/host.js';
import type * as Platform from '../../core/platform/platform.js';
import * as Root from '../../core/root/root.js';
import type { Key, Modifier } from './KeyboardShortcut.js';
import { type SoftContextMenuDescriptor } from './SoftContextMenu.js';
export declare class Item {
    #private;
    private readonly typeInternal;
    protected readonly label: string | undefined;
    protected accelerator?: Host.InspectorFrontendHostAPI.AcceleratorDescriptor;
    protected featureName?: string;
    protected readonly previewFeature: boolean;
    protected disabled: boolean | undefined;
    private readonly checked;
    protected isDevToolsPerformanceMenuItem: boolean;
    protected contextMenu: ContextMenu | null;
    protected idInternal: number | undefined;
    customElement?: Element;
    private shortcut?;
    protected jslogContext: string | undefined;
    constructor(contextMenu: ContextMenu | null, type: 'checkbox' | 'item' | 'separator' | 'subMenu', label?: string, isPreviewFeature?: boolean, disabled?: boolean, checked?: boolean, accelerator?: Host.InspectorFrontendHostAPI.AcceleratorDescriptor, tooltip?: Platform.UIString.LocalizedString, jslogContext?: string, featureName?: string);
    id(): number;
    type(): string;
    isPreviewFeature(): boolean;
    isEnabled(): boolean;
    setEnabled(enabled: boolean): void;
    buildDescriptor(): SoftContextMenuDescriptor | Host.InspectorFrontendHostAPI.ContextMenuDescriptor;
    setAccelerator(key: Key, modifiers: Modifier[]): void;
    setIsDevToolsPerformanceMenuItem(isDevToolsPerformanceMenuItem: boolean): void;
    setShortcut(shortcut: string): void;
}
export declare class Section {
    readonly contextMenu: ContextMenu | null;
    readonly items: Item[];
    constructor(contextMenu: ContextMenu | null);
    appendItem(label: string, handler: () => void, options?: {
        accelerator?: Host.InspectorFrontendHostAPI.AcceleratorDescriptor;
        isPreviewFeature?: boolean;
        disabled?: boolean;
        additionalElement?: Element;
        tooltip?: Platform.UIString.LocalizedString;
        jslogContext?: string;
        featureName?: string;
    }): Item;
    appendCustomItem(element: Element, jslogContext?: string): Item;
    appendSeparator(): Item;
    appendAction(actionId: string, label?: string, optional?: boolean, jslogContext?: string, feature?: string): void;
    appendSubMenuItem(label: string, disabled?: boolean, jslogContext?: string, featureName?: string): SubMenu;
    appendCheckboxItem(label: string, handler: () => void, options?: {
        checked?: boolean;
        disabled?: boolean;
        experimental?: boolean;
        additionalElement?: Element;
        tooltip?: Platform.UIString.LocalizedString;
        jslogContext?: string;
        featureName?: string;
    }): Item;
}
export declare class SubMenu extends Item {
    readonly sections: Map<string, Section>;
    private readonly sectionList;
    constructor(contextMenu: ContextMenu | null, label?: string, disabled?: boolean, jslogContext?: string, featureName?: string);
    init(): void;
    section(name?: string): Section;
    headerSection(): Section;
    newSection(): Section;
    revealSection(): Section;
    clipboardSection(): Section;
    editSection(): Section;
    debugSection(): Section;
    viewSection(): Section;
    defaultSection(): Section;
    overrideSection(): Section;
    saveSection(): Section;
    annotationSection(): Section;
    footerSection(): Section;
    buildDescriptor(): SoftContextMenuDescriptor | Host.InspectorFrontendHostAPI.ContextMenuDescriptor;
    appendItemsAtLocation(location: string): void;
}
export interface ContextMenuOptions {
    useSoftMenu?: boolean;
    keepOpen?: boolean;
    onSoftMenuClosed?: () => void;
    x?: number;
    y?: number;
}
export declare class ContextMenu extends SubMenu {
    protected contextMenu: this;
    private pendingTargets;
    private readonly event;
    private readonly useSoftMenu;
    private readonly keepOpen;
    private x;
    private y;
    private onSoftMenuClosed?;
    private readonly handlers;
    idInternal: number;
    private softMenu?;
    private contextMenuLabel?;
    private openHostedMenu;
    private eventTarget;
    private loggableParent;
    constructor(event: Event, options?: ContextMenuOptions);
    static initialize(): void;
    static installHandler(doc: Document): void;
    nextId(): number;
    isHostedMenuOpen(): boolean;
    getItems(): SoftContextMenuDescriptor[];
    setChecked(item: SoftContextMenuDescriptor, checked: boolean): void;
    show(): Promise<void>;
    discard(): void;
    private registerLoggablesWithin;
    private innerShow;
    setX(x: number): void;
    setY(y: number): void;
    setHandler(id: number, handler: () => void): void;
    invokeHandler(id: number): void;
    private buildMenuDescriptors;
    private onItemSelected;
    private itemSelected;
    private menuCleared;
    /**
     * Appends the `target` to the list of pending targets for which context menu providers
     * will be loaded when showing the context menu. If the `target` was already appended
     * before, it just ignores this call.
     *
     * @param target an object for which we can have registered menu item providers.
     */
    appendApplicableItems(target: unknown): void;
    markAsMenuItemCheckBox(): void;
    private static pendingMenu;
    private static useSoftMenu;
    static readonly groupWeights: string[];
}
/**
 * @property jslogContext - Reflects the `"jslogContext"` attribute.
 * @property populateMenuCall - Callback function to populate the menu.
 * @property softMenu - Reflects the `"soft-menu"` attribute.
 * @property keepOpen -Reflects the `"keep-open"` attribute.
 * @property iconName - Reflects the `"icon-name"` attribute.
 * @property disabled - Reflects the `"disabled"` attribute.
 * @attribute soft-menu - Whether to use the soft menu implementation.
 * @attribute keep-open - Whether the menu should stay open after an item is clicked.
 * @attribute icon-name - Name of the icon to display on the button.
 * @attribute disabled - Whether the menu button is disabled
 * @attribute jslogContext - The jslog context for the button.
 *
 */
export declare class MenuButton extends HTMLElement {
    #private;
    static readonly observedAttributes: string[];
    /**
     * Sets the callback function used to populate the context menu when the button is clicked.
     * @param populateCall A function that takes a `ContextMenu` instance and adds items to it.
     */
    set populateMenuCall(populateCall: (arg0: ContextMenu) => void);
    /**
     * Reflects the `soft-menu` attribute. If true, uses the `SoftContextMenu` implementation.
     * @default false
     */
    get softMenu(): boolean;
    set softMenu(softMenu: boolean);
    /**
     * Reflects the `keep-open` attribute. If true, the menu stays open after an item click.
     * @default false
     */
    get keepOpen(): boolean;
    set keepOpen(keepOpen: boolean);
    /**
     * Reflects the `icon-name` attribute. Sets the icon to display on the button.
     */
    set iconName(iconName: string);
    get iconName(): string | null;
    /**
     * Reflects the `jslogContext` attribute. Sets the visual logging context for the button.
     */
    set jslogContext(jslogContext: string);
    get jslogContext(): string | null;
    /**
     * Reflects the `disabled` attribute. If true, the button is disabled and cannot be clicked.
     * @default false
     */
    get disabled(): boolean;
    set disabled(disabled: boolean);
    attributeChangedCallback(_: string, oldValue: string, newValue: string): void;
    connectedCallback(): void;
}
export interface Provider<T> {
    appendApplicableItems(event: Event, contextMenu: ContextMenu, target: T): void;
}
export declare function registerProvider<T>(registration: ProviderRegistration<T>): void;
export declare function registerItem(registration: ContextMenuItemRegistration): void;
export declare function maybeRemoveItem(registration: ContextMenuItemRegistration): boolean;
export declare const enum ItemLocation {
    DEVICE_MODE_MENU_SAVE = "deviceModeMenu/save",
    MAIN_MENU = "mainMenu",
    MAIN_MENU_DEFAULT = "mainMenu/default",
    MAIN_MENU_FOOTER = "mainMenu/footer",
    MAIN_MENU_HELP_DEFAULT = "mainMenuHelp/default",
    NAVIGATOR_MENU_DEFAULT = "navigatorMenu/default",
    PROFILER_MENU_DEFAULT = "profilerMenu/default",
    TIMELINE_MENU_OPEN = "timelineMenu/open"
}
export interface ProviderRegistration<T> {
    contextTypes: () => Array<abstract new (...any: any[]) => T>;
    loadProvider: () => Promise<Provider<T>>;
    experiment?: Root.Runtime.ExperimentName;
}
export interface ContextMenuItemRegistration {
    location: ItemLocation;
    actionId: string;
    order?: number;
    experiment?: Root.Runtime.ExperimentName;
}
