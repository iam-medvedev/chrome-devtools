import '../../ui/components/cards/cards.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Cards from '../../ui/components/cards/cards.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class CPUThrottlingCard {
    element: Cards.Card.Card;
    private readonly setting;
    private computePressurePromise?;
    private controller?;
    private lowTierMobileDeviceEl;
    private midTierMobileDeviceEl;
    private calibrateEl;
    private textEl;
    private calibrateButton;
    private cancelButton;
    private progress;
    private state;
    private warnings;
    constructor();
    wasShown(): void;
    willHide(): void;
    private updateState;
    private createTextWithIcon;
    private getCalibrationWarnings;
    private calibrateButtonClicked;
    private cancelButtonClicked;
    private runCalibration;
}
export declare class ThrottlingSettingsTab extends UI.Widget.VBox implements UI.ListWidget.Delegate<SDK.NetworkManager.Conditions> {
    private readonly list;
    private readonly customSetting;
    private editor?;
    private cpuThrottlingCard;
    constructor();
    wasShown(): void;
    willHide(): void;
    private conditionsUpdated;
    private addButtonClicked;
    renderItem(conditions: SDK.NetworkManager.Conditions, _editable: boolean): Element;
    removeItemRequested(_item: SDK.NetworkManager.Conditions, index: number): void;
    retrieveOptionsTitle(conditions: SDK.NetworkManager.Conditions): string;
    commitEdit(conditions: SDK.NetworkManager.Conditions, editor: UI.ListWidget.Editor<SDK.NetworkManager.Conditions>, isNew: boolean): void;
    beginEdit(conditions: SDK.NetworkManager.Conditions): UI.ListWidget.Editor<SDK.NetworkManager.Conditions>;
    private createEditor;
}
