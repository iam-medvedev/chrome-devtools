import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as Platform from '../../core/platform/platform.js';
import * as Root from '../../core/root/root.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as Adorners from '../components/adorners/adorners.js';
import { type Action } from './ActionRegistration.js';
import { ContextMenu } from './ContextMenu.js';
import type { Suggestion } from './SuggestBox.js';
export declare class Toolbar {
    private items;
    element: HTMLElement;
    enabled: boolean;
    private readonly shadowRoot;
    private contentElement;
    private compactLayout;
    constructor(className: string, parentElement?: Element);
    hasCompactLayout(): boolean;
    registerCSSFiles(cssFiles: CSSStyleSheet[]): void;
    setCompactLayout(enable: boolean): void;
    static createLongPressActionButton(action: Action, toggledOptions: ToolbarButton[], untoggledOptions: ToolbarButton[]): ToolbarButton;
    static createActionButton(action: Action, options?: ToolbarButtonOptions | undefined): ToolbarButton;
    static createActionButtonForId(actionId: string, options?: ToolbarButtonOptions): ToolbarButton;
    gripElementForResize(): Element;
    makeWrappable(growVertically?: boolean): void;
    makeVertical(): void;
    renderAsLinks(): void;
    empty(): boolean;
    setEnabled(enabled: boolean): void;
    appendToolbarItem(item: ToolbarItem): void;
    hasItem(item: ToolbarItem): boolean;
    prependToolbarItem(item: ToolbarItem): void;
    appendSeparator(): void;
    appendSpacer(): void;
    appendText(text: string): void;
    removeToolbarItem(itemToRemove: ToolbarItem): void;
    removeToolbarItems(): void;
    setColor(color: string): void;
    setToggledColor(color: string): void;
    hideSeparatorDupes(): void;
    appendItemsAtLocation(location: string): Promise<void>;
}
export interface ToolbarButtonOptions {
    label?: () => Platform.UIString.LocalizedString;
    showLabel: boolean;
    userActionCode?: Host.UserMetrics.Action;
    ignoreToggleable?: boolean;
}
export declare class ToolbarItem<T = any> extends Common.ObjectWrapper.ObjectWrapper<T> {
    element: HTMLElement;
    private visibleInternal;
    enabled: boolean;
    toolbar: Toolbar | null;
    protected title?: string;
    constructor(element: Element);
    setTitle(title: string, actionId?: string | undefined): void;
    setEnabled(value: boolean): void;
    applyEnabledState(enabled: boolean): void;
    visible(): boolean;
    setVisible(x: boolean): void;
    setRightAligned(alignRight: boolean): void;
    setCompactLayout(_enable: boolean): void;
}
export declare const enum ToolbarItemWithCompactLayoutEvents {
    COMPACT_LAYOUT_UPDATED = "CompactLayoutUpdated"
}
type ToolbarItemWithCompactLayoutEventTypes = {
    [ToolbarItemWithCompactLayoutEvents.COMPACT_LAYOUT_UPDATED]: boolean;
};
export declare class ToolbarItemWithCompactLayout extends ToolbarItem<ToolbarItemWithCompactLayoutEventTypes> {
    constructor(element: Element);
    setCompactLayout(enable: boolean): void;
}
export declare class ToolbarText extends ToolbarItem<void> {
    constructor(text?: string);
    text(): string;
    setText(text: string): void;
}
export declare class ToolbarButton extends ToolbarItem<ToolbarButton.EventTypes> {
    private button;
    private text?;
    private adorner?;
    constructor(title: string, glyphOrAdorner?: string | Adorners.Adorner.Adorner, text?: string, jslogContext?: string);
    focus(): void;
    checked(checked: boolean): void;
    toggleOnClick(toggleOnClick: boolean): void;
    isToggled(): boolean;
    toggled(toggled: boolean): void;
    setToggleType(type: Buttons.Button.ToggleType): void;
    setLongClickable(longClickable: boolean): void;
    setSize(size: Buttons.Button.Size): void;
    setReducedFocusRing(): void;
    setText(text: string): void;
    setAdorner(adorner: Adorners.Adorner.Adorner): void;
    setGlyph(iconName: string): void;
    setToggledIcon(toggledIconName: string): void;
    setBackgroundImage(iconURL: string): void;
    setSecondary(): void;
    setDarkText(): void;
    turnIntoSelect(shrinkable?: boolean | undefined): void;
    clicked(event: Event): void;
    protected mouseDown(event: MouseEvent): void;
}
export declare class ToolbarCombobox extends ToolbarItem<ToolbarButton.EventTypes> {
    private textElement?;
    private text?;
    private iconName?;
    private adorner?;
    constructor(title: string, isIconDropdown?: boolean, jslogContext?: string, iconName?: string);
    setText(text: string): void;
    setAdorner(adorner: Adorners.Adorner.Adorner): void;
    setDarkText(): void;
    turnShrinkable(): void;
    clicked(event: Event): void;
    protected mouseDown(event: MouseEvent): void;
}
export declare namespace ToolbarButton {
    const enum Events {
        CLICK = "Click",
        MOUSE_DOWN = "MouseDown"
    }
    type EventTypes = {
        [Events.CLICK]: Event;
        [Events.MOUSE_DOWN]: MouseEvent;
    };
}
export declare class ToolbarInput extends ToolbarItem<ToolbarInput.EventTypes> {
    private prompt;
    private readonly proxyElement;
    constructor(placeholder: string, accessiblePlaceholder?: string, growFactor?: number, shrinkFactor?: number, tooltip?: string, completions?: ((arg0: string, arg1: string, arg2?: boolean | undefined) => Promise<Suggestion[]>), dynamicCompletions?: boolean, jslogContext?: string);
    applyEnabledState(enabled: boolean): void;
    setValue(value: string, notify?: boolean): void;
    value(): string;
    valueWithoutSuggestion(): string;
    clearAutocomplete(): void;
    focus(): void;
    private onKeydownCallback;
    private onChangeCallback;
    private updateEmptyStyles;
}
export declare class ToolbarFilter extends ToolbarInput {
    constructor(filterBy?: Common.UIString.LocalizedString, growFactor?: number, shrinkFactor?: number, tooltip?: string, completions?: ((arg0: string, arg1: string, arg2?: boolean | undefined) => Promise<Suggestion[]>), dynamicCompletions?: boolean, jslogContext?: string);
}
export declare namespace ToolbarInput {
    const enum Event {
        TEXT_CHANGED = "TextChanged",
        ENTER_PRESSED = "EnterPressed"
    }
    interface EventTypes {
        [Event.TEXT_CHANGED]: string;
        [Event.ENTER_PRESSED]: string;
    }
}
export declare class ToolbarToggle extends ToolbarButton {
    private readonly untoggledGlyph;
    private readonly toggledGlyph;
    constructor(title: string, glyph?: string, toggledGlyph?: string, jslogContext?: string, toggleOnClick?: boolean);
    setToggleOnClick(toggleOnClick: boolean): void;
    setToggled(toggled: boolean): void;
    setChecked(checked: boolean): void;
    setDefaultWithRedColor(withRedColor: boolean): void;
    enableToggleWithRedColor(): void;
}
export declare class ToolbarMenuButton extends ToolbarCombobox {
    #private;
    private readonly contextMenuHandler;
    private readonly useSoftMenu;
    private triggerTimeoutId?;
    constructor(contextMenuHandler: (arg0: ContextMenu) => void, isIconDropdown?: boolean, useSoftMenu?: boolean, jslogContext?: string, iconName?: string);
    setTriggerDelay(x: number): void;
    mouseDown(event: MouseEvent): void;
    private trigger;
    clicked(event: Event): void;
}
export declare class ToolbarSettingToggle extends ToolbarToggle {
    private readonly defaultTitle;
    private readonly setting;
    private willAnnounceState;
    constructor(setting: Common.Settings.Setting<boolean>, glyph: string, title: string, toggledGlyph?: string, jslogContext?: string);
    private settingChanged;
    clicked(event: Event): void;
}
export declare class ToolbarSeparator extends ToolbarItem<void> {
    constructor(spacer?: boolean);
}
export interface Provider {
    item(): ToolbarItem | null;
}
export interface ItemsProvider {
    toolbarItems(): ToolbarItem[];
}
export declare class ToolbarComboBox extends ToolbarItem<void> {
    protected selectElementInternal: HTMLSelectElement;
    constructor(changeHandler: ((arg0: Event) => void) | null, title: string, className?: string, jslogContext?: string);
    selectElement(): HTMLSelectElement;
    size(): number;
    options(): HTMLOptionElement[];
    addOption(option: Element): void;
    createOption(label: string, value?: string): HTMLOptionElement;
    applyEnabledState(enabled: boolean): void;
    removeOption(option: Element): void;
    removeOptions(): void;
    selectedOption(): HTMLOptionElement | null;
    select(option: Element): void;
    setSelectedIndex(index: number): void;
    selectedIndex(): number;
    setMaxWidth(width: number): void;
    setMinWidth(width: number): void;
}
export interface Option {
    value: string;
    label: string;
}
export declare class ToolbarSettingComboBox extends ToolbarComboBox {
    private optionsInternal;
    private readonly setting;
    private muteSettingListener?;
    constructor(options: Option[], setting: Common.Settings.Setting<string>, accessibleName: string);
    setOptions(options: Option[]): void;
    value(): string;
    private settingChanged;
    private valueChanged;
}
export declare class ToolbarCheckbox extends ToolbarItem<void> {
    inputElement: HTMLInputElement;
    constructor(text: Common.UIString.LocalizedString, tooltip?: Common.UIString.LocalizedString, listener?: ((arg0: MouseEvent) => void), jslogContext?: string, small?: boolean);
    checked(): boolean;
    setChecked(value: boolean): void;
    applyEnabledState(enabled: boolean): void;
    setIndeterminate(indeterminate: boolean): void;
}
export declare class ToolbarSettingCheckbox extends ToolbarCheckbox {
    constructor(setting: Common.Settings.Setting<boolean>, tooltip?: Common.UIString.LocalizedString, alternateTitle?: Common.UIString.LocalizedString);
}
export declare function registerToolbarItem(registration: ToolbarItemRegistration): void;
export interface ToolbarItemRegistration {
    order?: number;
    location: ToolbarItemLocation;
    separator?: boolean;
    label?: () => Platform.UIString.LocalizedString;
    showLabel?: boolean;
    actionId?: string;
    condition?: Root.Runtime.Condition;
    loadItem?: (() => Promise<Provider>);
    experiment?: string;
    jslog?: string;
}
export declare const enum ToolbarItemLocation {
    FILES_NAVIGATION_TOOLBAR = "files-navigator-toolbar",
    MAIN_TOOLBAR_RIGHT = "main-toolbar-right",
    MAIN_TOOLBAR_LEFT = "main-toolbar-left",
    STYLES_SIDEBARPANE_TOOLBAR = "styles-sidebarpane-toolbar"
}
export {};
