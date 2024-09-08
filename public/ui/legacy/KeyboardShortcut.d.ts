export declare class KeyboardShortcut {
    descriptors: Descriptor[];
    action: string;
    type: Type;
    keybindSets: Set<string>;
    constructor(descriptors: Descriptor[], action: string, type: Type, keybindSets?: Set<string>);
    title(): string;
    isDefault(): boolean;
    changeType(type: Type): KeyboardShortcut;
    changeKeys(descriptors: Descriptor[]): KeyboardShortcut;
    descriptorsMatch(descriptors: Descriptor[]): boolean;
    hasKeybindSet(keybindSet: string): boolean;
    equals(shortcut: KeyboardShortcut): boolean;
    static createShortcutFromSettingObject(settingObject: {
        action: string;
        descriptors: Array<Descriptor>;
        type: Type;
    }): KeyboardShortcut;
    /**
     * Creates a number encoding keyCode in the lower 8 bits and modifiers mask in the higher 8 bits.
     * It is useful for matching pressed keys.
     */
    static makeKey(keyCode: string | number, modifiers?: number): number;
    static makeKeyFromEvent(keyboardEvent: KeyboardEvent): number;
    static makeKeyFromEventIgnoringModifiers(keyboardEvent: KeyboardEvent): number;
    static eventHasCtrlEquivalentKey(event: KeyboardEvent | MouseEvent): boolean;
    static eventHasEitherCtrlOrMeta(event: KeyboardEvent | MouseEvent): boolean;
    static hasNoModifiers(event: Event): boolean;
    static makeDescriptor(key: string | Key, modifiers?: number): Descriptor;
    static makeDescriptorFromBindingShortcut(shortcut: string): Descriptor;
    static shortcutToString(key: string | Key, modifiers?: number): string;
    private static keyName;
    private static makeKeyFromCodeAndModifiers;
    static keyCodeAndModifiersFromKey(key: number): {
        keyCode: number;
        modifiers: number;
    };
    static isModifier(key: number): boolean;
    private static modifiersToString;
}
/**
 * Constants for encoding modifier key set as a bit mask.
 * see #makeKeyFromCodeAndModifiers
 */
export declare const Modifiers: {
    [x: string]: number;
};
export declare const Keys: {
    [x: string]: Key;
};
export declare const enum Type {
    USER_SHORTCUT = "UserShortcut",
    DEFAULT_SHORTCUT = "DefaultShortcut",
    DISABLED_DEFAULT = "DisabledDefault",
    UNSET_SHORTCUT = "UnsetShortcut",
    KEYBIND_SET_SHORTCUT = "KeybindSetShortcut"
}
export declare const KeyBindings: {
    [x: string]: Key;
};
export interface Key {
    code: number;
    name: string | {
        [x: string]: string;
    };
    shiftKey?: boolean;
}
export interface Descriptor {
    key: number;
    name: string;
}
