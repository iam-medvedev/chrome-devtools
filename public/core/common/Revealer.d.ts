import type * as Platform from '../platform/platform.js';
export interface Revealer<T> {
    reveal(revealable: T, omitFocus?: boolean): Promise<void>;
}
export declare let reveal: (revealable: unknown, omitFocus?: boolean) => Promise<void>;
export declare function setRevealForTest(newReveal: (revealable: unknown, omitFocus?: boolean) => Promise<void>): void;
export declare function revealDestination(revealable: unknown): string | null;
export declare function registerRevealer<T>(registration: RevealerRegistration<T>): void;
export interface RevealerRegistration<T> {
    contextTypes: () => Array<abstract new (...any: any) => T>;
    loadRevealer: () => Promise<Revealer<T>>;
    destination?: RevealerDestination;
}
export declare const RevealerDestination: {
    ELEMENTS_PANEL: () => Platform.UIString.LocalizedString;
    STYLES_SIDEBAR: () => Platform.UIString.LocalizedString;
    CHANGES_DRAWER: () => Platform.UIString.LocalizedString;
    ISSUES_VIEW: () => Platform.UIString.LocalizedString;
    NETWORK_PANEL: () => Platform.UIString.LocalizedString;
    APPLICATION_PANEL: () => Platform.UIString.LocalizedString;
    SOURCES_PANEL: () => Platform.UIString.LocalizedString;
};
export type RevealerDestination = () => Platform.UIString.LocalizedString;
