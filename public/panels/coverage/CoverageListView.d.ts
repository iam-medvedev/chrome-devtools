import type * as Platform from '../../core/platform/platform.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
import { CoverageType } from './CoverageModel.js';
export interface CoverageListItem {
    url: Platform.DevToolsPath.UrlString;
    type: CoverageType;
    size: number;
    usedSize: number;
    unusedSize: number;
    usedPercentage: number;
    unusedPercentage: number;
    sources: CoverageListItem[];
    isContentScript: boolean;
    generatedUrl?: Platform.DevToolsPath.UrlString;
}
export declare function coverageTypeToString(type: CoverageType): string;
export declare class CoverageListView extends UI.Widget.VBox {
    private readonly nodeForUrl;
    private highlightRegExp;
    private dataGrid;
    constructor();
    update(coverageInfo: CoverageListItem[], highlightRegExp: RegExp | null): void;
    updateSourceNodes(sources: CoverageListItem[], maxSize: number, node: GridNode): void;
    reset(): void;
    private appendNodeByType;
    selectByUrl(url: string): void;
    private onOpenedNode;
    private revealSourceForSelectedNode;
}
export declare class GridNode extends DataGrid.SortableDataGrid.SortableDataGridNode<GridNode> {
    #private;
    coverageInfo: CoverageListItem;
    private lastUsedSize;
    private url;
    private maxSize;
    private highlightRegExp;
    constructor(coverageInfo: CoverageListItem, maxSize: number);
    setHighlight(highlightRegExp: RegExp | null): void;
    refreshIfNeeded(maxSize: number, coverageInfo: CoverageListItem): boolean;
    createCell(columnId: string): HTMLElement;
    private highlight;
}
