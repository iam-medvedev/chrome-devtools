import * as UI from '../../ui/legacy/legacy.js';
export declare const i18nString: (id: string, values?: import("../../core/i18n/i18nTypes.js").Values | undefined) => import("../../core/platform/UIString.js").LocalizedString;
export interface ViewInput {
}
export interface ViewOutput {
    namedBitSetFilterUI?: UI.FilterBar.NamedBitSetFilterUI;
}
export interface CookieReportNodeData {
    name: string;
    domain: string;
    type: string;
    platform: string;
    status: string;
    recommendation: string;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class CookieReportView extends UI.Widget.VBox {
    #private;
    namedBitSetFilterUI?: UI.FilterBar.NamedBitSetFilterUI;
    constructor(element?: HTMLElement, view?: View);
    doUpdate(): void;
    wasShown(): void;
}
