import * as Trace from '../../models/trace/trace.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as TimelineTreeView from './TimelineTreeView.js';
export declare class ThirdPartyTreeViewWidget extends TimelineTreeView.TimelineTreeView {
    #private;
    protected autoSelectFirstChildOnRefresh: boolean;
    constructor();
    buildTree(): Trace.Extras.TraceTree.Node;
    /**
     * Third party tree view doesn't require the select feature, as this expands the node.
     */
    selectProfileNode(): void;
    private groupingFunction;
    populateColumns(columns: DataGrid.DataGrid.ColumnDescriptor[]): void;
    populateToolbar(): void;
    private compareTransferSize;
    sortingChanged(): void;
    displayInfoForGroupNode(node: Trace.Extras.TraceTree.Node): {
        name: string;
        color: string;
        icon: (Element | undefined);
    };
    extractThirdPartySummary(node: Trace.Extras.TraceTree.Node): {
        transferSize: number;
    };
    nodeIsFirstParty(node: Trace.Extras.TraceTree.Node): boolean;
    nodeIsExtension(node: Trace.Extras.TraceTree.Node): boolean;
}
export declare class ThirdPartyTreeElement extends UI.Widget.WidgetElement<UI.Widget.Widget> {
    #private;
    set treeView(treeView: ThirdPartyTreeViewWidget);
    constructor();
    createWidget(): UI.Widget.Widget;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-third-party-tree-view': ThirdPartyTreeElement;
    }
}
