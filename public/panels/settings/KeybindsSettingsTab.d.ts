import '../../ui/kit/kit.js';
import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ShortcutRowViewData {
    shortcut: UI.KeyboardShortcut.KeyboardShortcut;
    isModified: boolean;
    value: string;
    keys: string[];
    isInvalid: boolean;
    isAutofocus: boolean;
}
export interface ActionRowViewData {
    action: UI.ActionRegistration.Action;
    actionId: string;
    actionTitle: string;
    isEditing: boolean;
    isAutofocus: boolean;
    tabIndex: number;
    hasEmptyInfo: boolean;
    hasDefaultShortcutWhenEmpty: boolean;
    rows: ShortcutRowViewData[];
    errorMessage: string | null;
    isConfirmDisabled: boolean;
}
export type KeybindsViewItem = UI.ActionRegistration.ActionCategory | ActionRowViewData;
export interface ViewInput {
    keybindsSetSetting: Common.Settings.Setting<string>;
    items: KeybindsViewItem[];
    onRestoreDefaultShortcuts: () => void;
    onListKeyDown: (event: KeyboardEvent) => void;
    onActionFocused: (action: UI.ActionRegistration.Action) => void;
    onStartEditing: (action: UI.ActionRegistration.Action) => void;
    onAddShortcut: () => void;
    onResetShortcutsToDefaults: () => void;
    onConfirmChanges: () => void;
    onDiscardChanges: () => void;
    onEditingRowKeyDown: (event: KeyboardEvent) => void;
    onShortcutInputKeyDown: (shortcut: UI.KeyboardShortcut.KeyboardShortcut, event: KeyboardEvent) => void;
    onShortcutInputFocus: (shortcut: UI.KeyboardShortcut.KeyboardShortcut) => void;
    onShortcutInputBlur: () => void;
    onDeleteShortcut: (shortcut: UI.KeyboardShortcut.KeyboardShortcut) => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement | DocumentFragment) => void;
export declare const DEFAULT_VIEW: View;
export declare class KeybindsSettingsTab extends UI.Widget.VBox<ShadowRoot> {
    #private;
    constructor(view?: View);
    wasShown(): void;
    performUpdate(): void;
    commitChanges(item: UI.ActionRegistration.Action, editedShortcuts: Map<UI.KeyboardShortcut.KeyboardShortcut, UI.KeyboardShortcut.Descriptor[] | null>): void;
    startEditing(action: UI.ActionRegistration.Action): void;
    stopEditing(_action: UI.ActionRegistration.Action): void;
    onEscapeKeyPressed(event: Event): void;
    update(): void;
    willHide(): void;
}
export type KeybindsItem = UI.ActionRegistration.ActionCategory | UI.ActionRegistration.Action;
