import * as Trace from '../../models/trace/trace.js';
import type * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as TimelineTreeView from './TimelineTreeView.js';
export declare class ThirdPartyTreeViewWidget extends TimelineTreeView.TimelineTreeView {
    #private;
    constructor();
    buildTree(): Trace.Extras.TraceTree.Node;
    protected groupingFunction(): ((arg0: Trace.Types.Events.Event) => string) | null;
    private domainByEvent;
    populateColumns(columns: DataGrid.DataGrid.ColumnDescriptor[]): void;
    populateToolbar(): void;
    private compareTransferSize;
    sortingChanged(): void;
    onHover(node: Trace.Extras.TraceTree.Node | null): void;
    displayInfoForGroupNode(node: Trace.Extras.TraceTree.Node): {
        name: string;
        color: string;
        icon: (Element | undefined);
    };
    extractThirdPartySummary(node: Trace.Extras.TraceTree.Node): {
        transferSize: number;
        mainThreadTime: Trace.Types.Timing.MicroSeconds;
    };
    nodeIsFirstParty(node: Trace.Extras.TraceTree.Node): boolean;
    nodeIsExtension(node: Trace.Extras.TraceTree.Node): boolean;
}
export declare class ThirdPartyTreeView extends UI.Widget.WidgetElement<UI.Widget.Widget> {
    #private;
    set treeView(treeView: ThirdPartyTreeViewWidget);
    constructor();
    createWidget(): UI.Widget.Widget;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-third-party-tree-view': ThirdPartyTreeView;
    }
}
