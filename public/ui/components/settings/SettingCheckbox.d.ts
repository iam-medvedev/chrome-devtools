import type * as Common from '../../../core/common/common.js';
import * as LitHtml from '../../lit-html/lit-html.js';
export interface SettingCheckboxData {
    setting: Common.Settings.Setting<boolean>;
    textOverride?: string;
}
/**
 * A simple checkbox that is backed by a boolean setting.
 */
export declare class SettingCheckbox extends HTMLElement {
    #private;
    static readonly litTagName: import("../../lit-html/static.js").Static;
    connectedCallback(): void;
    set data(data: SettingCheckboxData);
    icon(): LitHtml.TemplateResult | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'setting-checkbox': SettingCheckbox;
    }
}
