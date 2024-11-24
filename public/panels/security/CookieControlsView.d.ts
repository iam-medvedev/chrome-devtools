import '../../ui/components/switch/switch.js';
import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare const i18nString: (id: string, values?: import("../../core/i18n/i18nTypes.js").Values | undefined) => Common.UIString.LocalizedString;
export declare const i18nFormatString: (stringId: string, placeholders: Record<string, Object>) => Element;
export interface ViewInput {
    inputChanged: (newValue: boolean, setting: Common.Settings.Setting<boolean>) => void;
    openChromeCookieSettings: () => void;
}
export interface ViewOutput {
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class CookieControlsView extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    doUpdate(): Promise<void>;
    inputChanged(newValue: boolean, setting: Common.Settings.Setting<boolean>): void;
    openChromeCookieSettings(): void;
    wasShown(): void;
}
