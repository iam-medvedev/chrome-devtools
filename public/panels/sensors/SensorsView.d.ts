import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Geometry from '../../ui/geometry/geometry.js';
import * as UI from '../../ui/legacy/legacy.js';
import type { LocationDescription } from './LocationsSettingsTab.js';
interface LocationViewInput {
    location: SDK.EmulationModel.Location;
    locationOverrideEnabled: boolean;
    customLocations: LocationDescription[];
    selectedLocationIndex: number;
    timezoneError: string;
    localeError: string;
    /** Tooltip of the latitude and longitude inputs, which names the platform's modifier key. */
    modifierKeyMessage: string;
    onManageLocations: () => void;
    onLocationSelectChange: (value: string) => void;
    onLocationFieldChange: (name: string, value: string) => void;
}
interface OrientationViewInput {
    orientation: SDK.EmulationModel.DeviceOrientation;
    orientationOverrideEnabled: boolean;
    selectedOrientation: string;
    animateOrientation: boolean;
    onOrientationSelectChange: (value: string) => void;
    onOrientationFieldChange: (name: string, value: string) => void;
    onOrientationReset: () => void;
    /** @returns whether the drag should start. */
    onStageDragStart: (mouseDownVector: Geometry.Vector) => boolean;
    onStageDrag: (mouseMoveVector: Geometry.Vector, shiftKey: boolean) => void;
}
interface ViewInput extends LocationViewInput, OrientationViewInput {
    touchSetting: Common.Settings.Setting<unknown>;
    idleDetectionSetting: Common.Settings.Setting<unknown>;
    cpuPressureSetting: Common.Settings.Setting<unknown>;
    cpuPerformanceSetting: Common.Settings.Setting<unknown>;
    cpuPerformanceNoOverrideLabel: string;
}
interface ViewOutput {
    focusLatitudeInput?: () => void;
    focusAlphaInput?: () => void;
}
declare const DEFAULT_VIEW: (input: ViewInput, output: ViewOutput, target: HTMLElement | DocumentFragment) => void;
type View = typeof DEFAULT_VIEW;
export declare class SensorsView extends UI.Widget.VBox<ShadowRoot> {
    #private;
    static readonly INJECT: readonly [
        typeof Common.Settings.Settings,
        typeof SDK.TargetManager.TargetManager,
        typeof SDK.CPUThrottlingManager.CPUThrottlingManager
    ];
    constructor(element: HTMLElement | undefined, [settings, targetManager, cpuThrottlingManager]: UI.Widget.WidgetDependencies<typeof SensorsView>, view?: View);
    performUpdate(): void;
    wasShown(): void;
    willHide(): void;
}
export {};
