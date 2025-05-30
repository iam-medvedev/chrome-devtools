import * as Platform from '../../core/platform/platform.js';
import type * as CPUProfile from '../../models/cpu_profile/cpu_profile.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class ProfileDataGridNode extends DataGrid.DataGrid.DataGridNode<unknown> {
    searchMatchedSelfColumn: boolean;
    searchMatchedTotalColumn: boolean;
    searchMatchedFunctionColumn: boolean;
    profileNode: CPUProfile.ProfileTreeModel.ProfileNode;
    tree: ProfileDataGridTree;
    childrenByCallUID: Map<string, ProfileDataGridNode>;
    lastComparator: unknown;
    callUID: string;
    self: number;
    total: number;
    functionName: string;
    readonly deoptReason: string;
    url: Platform.DevToolsPath.UrlString;
    linkElement: Element | null;
    populated: boolean;
    savedSelf?: number;
    savedTotal?: number;
    savedChildren?: Array<DataGrid.DataGrid.DataGridNode<unknown>>;
    constructor(profileNode: CPUProfile.ProfileTreeModel.ProfileNode, owningTree: ProfileDataGridTree, hasChildren: boolean);
    static sort<T>(gridNodeGroups: ProfileDataGridNode[][], comparator: (arg0: T, arg1: T) => number, force: boolean): void;
    static merge(container: ProfileDataGridTree | ProfileDataGridNode, child: ProfileDataGridNode, shouldAbsorb: boolean): void;
    static populate(container: ProfileDataGridTree | ProfileDataGridNode): void;
    createCell(columnId: string): HTMLElement;
    createValueCell(value: number, percent: number, columnId: string): HTMLElement;
    sort(comparator: (arg0: ProfileDataGridNode, arg1: ProfileDataGridNode) => number, force: boolean): void;
    insertChild(child: DataGrid.DataGrid.DataGridNode<unknown>, index: number): void;
    removeChild(profileDataGridNode: DataGrid.DataGrid.DataGridNode<unknown>): void;
    removeChildren(): void;
    findChild(node: CPUProfile.ProfileTreeModel.ProfileNode): ProfileDataGridNode | null;
    get selfPercent(): number;
    get totalPercent(): number;
    populate(): void;
    populateChildren(): void;
    save(): void;
    /**
     * When focusing and collapsing we modify lots of nodes in the tree.
     * This allows us to restore them all to their original state when we revert.
     */
    restore(): void;
    merge(child: ProfileDataGridNode, shouldAbsorb: boolean): void;
}
export declare class ProfileDataGridTree implements UI.SearchableView.Searchable {
    tree: this;
    self: number;
    children: ProfileDataGridNode[];
    readonly formatter: Formatter;
    readonly searchableView: UI.SearchableView.SearchableView;
    total: number;
    lastComparator: ((arg0: ProfileDataGridNode, arg1: ProfileDataGridNode) => number) | null;
    childrenByCallUID: Map<string, ProfileDataGridNode>;
    deepSearch: boolean;
    populated: boolean;
    searchResults: Array<{
        profileNode: ProfileDataGridNode;
    }>;
    savedTotal?: number;
    savedChildren?: ProfileDataGridNode[] | null;
    searchResultIndex: number;
    constructor(formatter: Formatter, searchableView: UI.SearchableView.SearchableView, total: number);
    static propertyComparator(property: string, isAscending: boolean): (arg0: Record<string, unknown>, arg1: Record<string, unknown>) => number;
    get expanded(): boolean;
    appendChild(child: ProfileDataGridNode): void;
    focus(_profileDataGridNode: ProfileDataGridNode): void;
    exclude(_profileDataGridNode: ProfileDataGridNode): void;
    insertChild(child: ProfileDataGridNode, index: number): void;
    removeChildren(): void;
    populateChildren(): void;
    findChild(node: CPUProfile.ProfileTreeModel.ProfileNode): ProfileDataGridNode | null;
    sort<T>(comparator: (arg0: T, arg1: T) => number, force: boolean): void;
    save(): void;
    restore(): void;
    matchFunction(searchConfig: UI.SearchableView.SearchConfig): ((arg0: ProfileDataGridNode) => boolean) | null;
    performSearch(searchConfig: UI.SearchableView.SearchConfig, _shouldJump: boolean, jumpBackwards?: boolean): void;
    onSearchCanceled(): void;
    jumpToNextSearchResult(): void;
    jumpToPreviousSearchResult(): void;
    supportsCaseSensitiveSearch(): boolean;
    supportsRegexSearch(): boolean;
    jumpToSearchResult(index: number): void;
}
export interface Formatter {
    formatValue(value: number, node: ProfileDataGridNode): string;
    formatValueAccessibleText(value: number, node: ProfileDataGridNode): string;
    formatPercent(value: number, node: ProfileDataGridNode): string;
    linkifyNode(node: ProfileDataGridNode): Element | null;
}
