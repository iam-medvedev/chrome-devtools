import * as Common from '../../core/common/common.js';
import * as Protocol from '../../generated/protocol.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
export declare const i18nString: (id: string, values?: import("../../core/i18n/i18nTypes.js").Values | undefined) => Common.UIString.LocalizedString;
export interface ViewInput {
    gridData: DataGrid.DataGrid.DataGridNode<CookieReportNodeData>[];
    filterItems: UI.FilterBar.Item[];
    onFilterChanged: () => void;
    onSortingChanged: () => void;
    populateContextMenu: (arg0: UI.ContextMenu.ContextMenu, arg1: DataGrid.DataGrid.DataGridNode<CookieReportNodeData>) => void;
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
    recommendation: HTMLElement;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class CookieReportView extends UI.Widget.VBox {
    #private;
    namedBitSetFilterUI?: UI.FilterBar.NamedBitSetFilterUI;
    dataGrid?: DataGrid.DataGrid.DataGridImpl<CookieReportNodeData>;
    gridData: DataGrid.DataGrid.DataGridNode<CookieReportNodeData>[];
    filterItems: UI.FilterBar.Item[];
    constructor(element?: HTMLElement, view?: View);
    performUpdate(): void;
    onFilterChanged(): void;
    onSortingChanged(): void;
    populateContextMenu(contextMenu: UI.ContextMenu.ContextMenu, gridNode: DataGrid.DataGrid.DataGridNode<CookieReportNodeData>): void;
    static getStatusString(status: IssuesManager.CookieIssue.CookieStatus): string;
    static getInsightTypeString(insight?: Protocol.Audits.CookieIssueInsight): string;
    static getRecommendation(domain: string, insight?: Protocol.Audits.CookieIssueInsight): HTMLElement;
    static getRecommendationText(domain: string, insight?: Protocol.Audits.CookieIssueInsight): Lit.TemplateResult;
    static getCookieTypeString(type?: string): string;
}
