import './SettingDeprecationWarning.js';
import type * as Common from '../../../core/common/common.js';
import * as Lit from '../../lit/lit.js';
export interface SettingCheckboxData {
    setting: Common.Settings.Setting<boolean>;
    textOverride?: string;
}
/**
 * A simple checkbox that is backed by a boolean setting.
 */
export declare class SettingCheckbox extends HTMLElement {
    #private;
    connectedCallback(): void;
    set data(data: SettingCheckboxData);
    icon(): Lit.TemplateResult | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'setting-checkbox': SettingCheckbox;
    }
}
