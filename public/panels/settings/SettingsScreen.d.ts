import '../../ui/kit/kit.js';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import type * as Platform from '../../core/platform/platform.js';
import * as Root from '../../core/root/root.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as SettingUIRegistration from '../../ui/settings/settings.js';
export interface SettingsScreenViewInput {
    views: UI.View.View[];
    selectedTabId: string;
    focusTabHeader: boolean;
    onTabInvoked: (eventData: {
        tabId: string;
        prevTabId?: string;
        isUserGesture?: boolean;
    }) => void;
}
export type SettingsScreenView = (input: SettingsScreenViewInput, output: undefined, target: HTMLElement) => void;
export declare const SETTINGS_SCREEN_DEFAULT_VIEW: SettingsScreenView;
export declare class SettingsScreen extends UI.Widget.VBox implements UI.View.ViewLocationResolver, UI.View.ViewLocation {
    #private;
    private keybindsTab?;
    private reportTabOnReveal;
    constructor(view?: SettingsScreenView);
    wasShown(): void;
    performUpdate(): void;
    static instance(opts?: {
        forceNew: boolean | null;
    }): SettingsScreen;
    static removeInstanceForTesting(): void;
    private static revealSettingsScreen;
    static showSettingsScreen(options?: ShowSettingsScreenOptions): Promise<void>;
    resolveLocation(_locationName: string): UI.View.ViewLocation | null;
    appendApplicableItems(locationName: string): void;
    appendView(view: UI.View.View, insertBefore?: UI.View.View | null): void;
    showView(view: UI.View.View, insertBefore?: UI.View.View | null, userGesture?: boolean, omitFocus?: boolean, shouldSelectTab?: boolean): Promise<void>;
    removeView(view: UI.View.View): void;
    isViewVisible(view: UI.View.View): boolean;
    widget(): UI.Widget.AnyWidget;
    reveal(): void;
    private selectTab;
    private tabInvoked;
    private reportSettingsPanelShown;
    private onEscapeKeyPressed;
}
interface SettingsTab {
    highlightObject(object: Object): void;
}
export interface GenericSettingsSection {
    category: Common.Settings.SettingCategory;
    heading: Common.UIString.LocalizedString;
    settings: Array<Common.Settings.Setting<unknown>>;
}
export interface GenericSettingsTabViewInput {
    sections: GenericSettingsSection[];
    syncInfo: Host.InspectorFrontendHostAPI.SyncInformation;
    onRestoreDefaults: () => void;
}
export interface GenericSettingsTabViewOutput {
    highlightSetting?: (setting: Common.Settings.Setting<unknown>) => void;
}
export type GenericSettingsTabView = (input: GenericSettingsTabViewInput, output: GenericSettingsTabViewOutput, target: HTMLElement) => void;
export declare const GENERIC_SETTINGS_TAB_DEFAULT_VIEW: GenericSettingsTabView;
export declare class GenericSettingsTab extends UI.Widget.VBox implements SettingsTab {
    #private;
    constructor(element?: HTMLElement, view?: GenericSettingsTabView);
    performUpdate(): void;
    static isSettingVisible(setting: SettingUIRegistration.SettingUIRegistration.RegisteredSettingUI): boolean;
    wasShown(): void;
    willHide(): void;
    private updateSyncSection;
    private createSectionElement;
    highlightObject(setting: Object): void;
}
export interface ExperimentsSettingsTabViewInput {
    filterText: string;
    experiments: Root.Runtime.Experiment[];
    onFilterChanged: (filterText: string) => void;
    onExperimentToggled: (experiment: Root.Runtime.Experiment, enabled: boolean) => void;
    onOpenDocumentation: (url: Platform.DevToolsPath.UrlString) => void;
}
export interface ExperimentsSettingsTabViewOutput {
    setExperimentElement: (experiment: Root.Runtime.Experiment, element: HTMLElement) => void;
}
export type ExperimentsSettingsTabView = (input: ExperimentsSettingsTabViewInput, output: ExperimentsSettingsTabViewOutput, target: HTMLElement) => void;
export declare const EXPERIMENTS_SETTINGS_TAB_DEFAULT_VIEW: ExperimentsSettingsTabView;
export declare class ExperimentsSettingsTab extends UI.Widget.Widget implements SettingsTab {
    #private;
    constructor(element?: HTMLElement, view?: ExperimentsSettingsTabView);
    performUpdate(): void;
    highlightObject(experiment: Object): void;
    wasShown(): void;
    willHide(): void;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
}
export declare class Revealer implements Common.Revealer.Revealer<Root.Runtime.Experiment | Common.Settings.Setting<unknown>> {
    reveal(object: Root.Runtime.Experiment | Common.Settings.Setting<unknown>): Promise<void>;
}
export interface ShowSettingsScreenOptions {
    name?: string;
    focusTabHeader?: boolean;
}
export {};
