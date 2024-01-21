import * as Platform from '../../../core/platform/platform.js';
import type * as Protocol from '../../../generated/protocol.js';
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => Platform.UIString.LocalizedString;
export declare class ReportsGridStatusHeader extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
}
export interface ReportsGridData {
    reports: Protocol.Network.ReportingApiReport[];
}
export declare class ReportsGrid extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    set data(data: ReportsGridData);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-resources-reports-grid-status-header': ReportsGridStatusHeader;
        'devtools-resources-reports-grid': ReportsGrid;
    }
}
