import type * as Common from '../../core/common/common.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare const i18nString: (id: string, values?: import("../../core/i18n/i18nTypes.js").Values | undefined) => Common.UIString.LocalizedString;
export interface ViewInput {
    gridData: DataGrid.DataGrid.DataGridNode<CookieReportNodeData>[];
    onFilterChanged: () => void;
    onSortingChanged: () => void;
}
export interface ViewOutput {
    namedBitSetFilterUI?: UI.FilterBar.NamedBitSetFilterUI;
    dataGrid?: DataGrid.DataGrid.DataGridImpl<CookieReportNodeData>;
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
    dataGrid?: DataGrid.DataGrid.DataGridImpl<CookieReportNodeData>;
    gridData: DataGrid.DataGrid.DataGridNode<CookieReportNodeData>[];
    constructor(element?: HTMLElement, view?: View);
    doUpdate(): Promise<void>;
    onFilterChanged(): void;
    onSortingChanged(): void;
    wasShown(): void;
    static getStatusString(status: IssuesManager.CookieIssue.CookieStatus): string;
}
