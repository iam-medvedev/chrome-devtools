import '../../../ui/legacy/components/data_grid/data_grid.js';
import '../../../ui/components/icon_button/icon_button.js';
import '../../../ui/legacy/legacy.js';
import type * as Protocol from '../../../generated/protocol.js';
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export declare class ReportsGridStatusHeader extends HTMLElement {
    #private;
    connectedCallback(): void;
}
export interface ReportsGridData {
    reports: Protocol.Network.ReportingApiReport[];
}
export declare class ReportsGrid extends HTMLElement {
    #private;
    connectedCallback(): void;
    set data(data: ReportsGridData);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-resources-reports-grid-status-header': ReportsGridStatusHeader;
        'devtools-resources-reports-grid': ReportsGrid;
    }
}
