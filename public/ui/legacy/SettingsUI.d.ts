import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import { CheckboxLabel } from './UIUtils.js';
export declare function createSettingCheckbox(name: Common.UIString.LocalizedString, setting: Common.Settings.Setting<boolean>, tooltip?: string): CheckboxLabel;
export declare const bindCheckbox: (inputElement: Element, setting: Common.Settings.Setting<boolean>, metric?: UserMetricOptions) => void;
export declare const createCustomSetting: (name: string, element: Element) => Element;
export declare const createControlForSetting: (setting: Common.Settings.Setting<unknown>, subtitle?: string) => HTMLElement | null;
export interface SettingUI {
    settingElement(): Element | null;
}
/**
 * Track toggle action as a whole or
 * track on and off action separately.
 */
export interface UserMetricOptions {
    toggle?: Host.UserMetrics.Action;
    enable?: Host.UserMetrics.Action;
    disable?: Host.UserMetrics.Action;
}
