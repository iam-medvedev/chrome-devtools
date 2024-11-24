import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { NetworkThrottlingSelector } from './NetworkThrottlingSelector.js';
export declare class ThrottlingManager {
    #private;
    private readonly cpuThrottlingControls;
    private readonly cpuThrottlingRates;
    private readonly customNetworkConditionsSetting;
    private readonly currentNetworkThrottlingConditionsSetting;
    private lastNetworkThrottlingConditions;
    private readonly cpuThrottlingManager;
    get hardwareConcurrencyOverrideEnabled(): boolean;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): ThrottlingManager;
    decorateSelectWithNetworkThrottling(selectElement: HTMLSelectElement, recommendedConditions?: SDK.NetworkManager.Conditions | null): NetworkThrottlingSelector;
    createOfflineToolbarCheckbox(): UI.Toolbar.ToolbarCheckbox;
    createMobileThrottlingButton(): UI.Toolbar.ToolbarMenuButton;
    private updatePanelIcon;
    setCPUThrottlingRate(rate: number): void;
    onCPUThrottlingRateChangedOnSDK(rate: number): void;
    createCPUThrottlingSelector(recommendedRate?: number | null): UI.Toolbar.ToolbarComboBox;
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
