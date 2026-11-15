import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type TemplateResult } from '../../ui/lit/lit.js';
import type { LocationDescription } from './LocationsSettingsTab.js';
interface LocationViewInput {
    location: SDK.EmulationModel.Location;
    locationOverrideEnabled: boolean;
    customLocations: LocationDescription[];
    selectedLocationIndex: number;
    timezoneError: string;
    localeError: string;
    onManageLocations: () => void;
    onLocationSelectChange: (event: Event) => void;
    onLocationChange: (event: Event) => void;
    onLocationKeyDown: (event: KeyboardEvent) => void;
}
interface OrientationViewInput {
    orientation: SDK.EmulationModel.DeviceOrientation;
    orientationOverrideEnabled: boolean;
    selectedOrientation: string;
    animateOrientation: boolean;
}
interface ViewInput extends LocationViewInput, OrientationViewInput {
    locationSection: TemplateResult;
    orientationSection: TemplateResult;
    touchSetting: Common.Settings.Setting<unknown>;
    idleDetectionSetting: Common.Settings.Setting<unknown>;
    hardwareConcurrencyCheckbox: HTMLElement;
    hardwareConcurrencyDetails: HTMLElement[];
    cpuPressureSetting: Common.Settings.Setting<unknown>;
    cpuPerformanceSetting: Common.Settings.Setting<unknown>;
    cpuPerformanceNoOverrideLabel: string;
}
declare const DEFAULT_VIEW: (input: ViewInput, _output: undefined, target: HTMLElement) => void;
type View = typeof DEFAULT_VIEW;
export declare class SensorsView extends UI.Widget.VBox {
    #private;
    private latitudeInput;
    private readonly deviceOrientationSetting;
    private deviceOrientation;
    private deviceOrientationOverrideEnabled;
    private stageElement;
    private alphaElement;
    private boxMatrix?;
    private mouseDownVector?;
    private originalBoxMatrix?;
    constructor(element?: HTMLElement, view?: View);
    performUpdate(): void;
    private applyLocationUserInput;
    private applyLocation;
    wasShown(): void;
    willHide(): void;
    private orientationSelectChanged;
    private applyDeviceOrientation;
    private applyDeviceOrientationUserInput;
    private resetDeviceOrientation;
    private setDeviceOrientation;
    private setBoxOrientation;
    private onBoxDrag;
    private onBoxDragStart;
    private calculateRadiusVector;
}
export declare const enum DeviceOrientationModificationSource {
    USER_INPUT = "userInput",
    USER_DRAG = "userDrag",
    RESET_BUTTON = "resetButton",
    SELECT_PRESET = "selectPreset"
}
export declare const NonPresetOptions: {
    NoOverride: string;
    Custom: string;
    Unavailable: string;
};
export declare const ShiftDragOrientationSpeed = 16;
export {};
