import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { NetworkThrottlingSelector } from './NetworkThrottlingSelector.js';
export interface CPUThrottlingSelectorWrapper {
    control: UI.Toolbar.ToolbarComboBox;
    updateRecommendedOption(recommendedOption: SDK.CPUThrottlingManager.CPUThrottlingOption | null): void;
}
export interface NetworkThrottlingSelectorWrapper {
    selector: NetworkThrottlingSelector;
    updateRecommendedConditions(recommendedConditions: SDK.NetworkManager.Conditions | null): void;
}
export declare class ThrottlingManager {
    #private;
    private readonly cpuThrottlingControls;
    private readonly cpuThrottlingOptions;
    private readonly customNetworkConditionsSetting;
    private readonly currentNetworkThrottlingConditionKeySetting;
    private readonly calibratedCpuThrottlingSetting;
    private lastNetworkThrottlingConditions;
    private readonly cpuThrottlingManager;
    get hardwareConcurrencyOverrideEnabled(): boolean;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): ThrottlingManager;
    createOfflineToolbarCheckbox(): UI.Toolbar.ToolbarCheckbox;
    createMobileThrottlingButton(): UI.Toolbar.ToolbarMenuButton;
    private updatePanelIcon;
    setCPUThrottlingOption(option: SDK.CPUThrottlingManager.CPUThrottlingOption): void;
    onCPUThrottlingRateChangedOnSDK(rate: number): void;
    createNetworkThrottlingSelector(selectElement: HTMLSelectElement): NetworkThrottlingSelectorWrapper;
    createCPUThrottlingSelector(): CPUThrottlingSelectorWrapper;
    /** Hardware Concurrency doesn't store state in a setting. */
    createHardwareConcurrencySelector(): {
        numericInput: UI.Toolbar.ToolbarItem;
        reset: UI.Toolbar.ToolbarButton;
        warning: UI.Toolbar.ToolbarItem;
        checkbox: UI.UIUtils.CheckboxLabel;
    };
    setHardwareConcurrency(concurrency: number): void;
    private isDirty;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
}
export declare function throttlingManager(): ThrottlingManager;
