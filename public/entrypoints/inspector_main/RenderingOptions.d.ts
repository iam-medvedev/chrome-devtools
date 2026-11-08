import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    showPaintRectsSetting: Common.Settings.Setting<boolean>;
    showLayoutShiftRegionsSetting: Common.Settings.Setting<boolean>;
    showDebugBordersSetting: Common.Settings.Setting<boolean>;
    showFPSCounterSetting: Common.Settings.Setting<boolean>;
    showScrollBottleneckRectsSetting: Common.Settings.Setting<boolean>;
    showAdHighlightsSetting: Common.Settings.Setting<boolean> | null;
    localFontsDisabledSetting: Common.Settings.Setting<boolean>;
    emulatePageFocusSetting: Common.Settings.Setting<boolean>;
    onEmulatePageFocusChange: () => void;
    emulateAutoDarkModeSetting: Common.Settings.Setting<boolean>;
    prefersColorSchemeSetting: Common.Settings.Setting<string>;
    prefersColorSchemeDisabled: boolean;
    emulatedCSSMediaSetting: Common.Settings.Setting<string>;
    forcedColorsSetting: Common.Settings.Setting<string>;
    prefersContrastSetting: Common.Settings.Setting<string> | null;
    prefersReducedMotionSetting: Common.Settings.Setting<string>;
    prefersReducedDataSetting: Common.Settings.Setting<string> | null;
    prefersReducedTransparencySetting: Common.Settings.Setting<string> | null;
    colorGamutSetting: Common.Settings.Setting<string>;
    visionDeficiencySetting: Common.Settings.Setting<unknown>;
    osTextScaleSetting: Common.Settings.Setting<string>;
    avifFormatDisabledSetting: Common.Settings.Setting<boolean>;
    jpegXlFormatDisabledSetting: Common.Settings.Setting<boolean> | null;
    webpFormatDisabledSetting: Common.Settings.Setting<boolean>;
}
export type ViewOutput = undefined;
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class RenderingOptionsView extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    willHide(): void;
    performUpdate(): void;
}
export declare class ReloadActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
}
