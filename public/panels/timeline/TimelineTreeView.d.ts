import '../../ui/legacy/legacy.js';
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as Trace from '../../models/trace/trace.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { TimelineRegExp } from './TimelineFilters.js';
import { type TimelineSelection } from './TimelineSelection.js';
import * as Utils from './utils/utils.js';
declare const TimelineTreeView_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<TimelineTreeView.EventTypes>;
    addEventListener<T extends keyof TimelineTreeView.EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<TimelineTreeView.EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<TimelineTreeView.EventTypes, T>;
    once<T extends keyof TimelineTreeView.EventTypes>(eventType: T): Promise<TimelineTreeView.EventTypes[T]>;
    removeEventListener<T extends keyof TimelineTreeView.EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<TimelineTreeView.EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof TimelineTreeView.EventTypes): boolean;
    dispatchEventToListeners<T extends keyof TimelineTreeView.EventTypes>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<TimelineTreeView.EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class TimelineTreeView extends TimelineTreeView_base implements UI.SearchableView.Searchable {
    #private;
    private searchResults;
    linkifier: Components.Linkifier.Linkifier;
    dataGrid: DataGrid.SortableDataGrid.SortableDataGrid<GridNode>;
    private lastHoveredProfileNode;
    private textFilterInternal;
    private taskFilter;
    protected startTime: Trace.Types.Timing.MilliSeconds;
    protected endTime: Trace.Types.Timing.MilliSeconds;
    splitWidget: UI.SplitWidget.SplitWidget;
    detailsView: UI.Widget.Widget;
    private searchableView;
    private currentThreadSetting?;
    private lastSelectedNodeInternal?;
    private root?;
    private currentResult?;
    textFilterUI?: UI.Toolbar.ToolbarInput;
    private caseSensitiveButton;
    private regexButton;
    private matchWholeWord;
    eventToTreeNode: WeakMap<Trace.Types.Events.Event, Trace.Extras.TraceTree.Node>;
    constructor();
    setSearchableView(searchableView: UI.SearchableView.SearchableView): void;
    setModelWithEvents(selectedEvents: Trace.Types.Events.Event[] | null, parsedTrace?: Trace.Handlers.Types.ParsedTrace | null, entityMappings?: Utils.EntityMapper.EntityMapper | null): void;
    entityMapper(): Utils.EntityMapper.EntityMapper | null;
    parsedTrace(): Trace.Handlers.Types.ParsedTrace | null;
    init(): void;
    lastSelectedNode(): Trace.Extras.TraceTree.Node | null | undefined;
    updateContents(selection: TimelineSelection): void;
    setRange(startTime: Trace.Types.Timing.MilliSeconds, endTime: Trace.Types.Timing.MilliSeconds): void;
    highlightEventInTree(event: Trace.Types.Events.Event | null): void;
    filters(): Trace.Extras.TraceFilter.TraceFilter[];
    filtersWithoutTextFilter(): Trace.Extras.TraceFilter.TraceFilter[];
    textFilter(): TimelineRegExp;
    exposePercentages(): boolean;
    populateToolbar(toolbar: UI.Toolbar.Toolbar): void;
    selectedEvents(): Trace.Types.Events.Event[];
    appendContextMenuItems(_contextMenu: UI.ContextMenu.ContextMenu, _node: Trace.Extras.TraceTree.Node): void;
    selectProfileNode(treeNode: Trace.Extras.TraceTree.Node, suppressSelectedEvent: boolean): void;
    refreshTree(): void;
    buildTree(): Trace.Extras.TraceTree.Node;
    buildTopDownTree(doNotAggregate: boolean, groupIdCallback: ((arg0: Trace.Types.Events.Event) => string) | null): Trace.Extras.TraceTree.Node;
    populateColumns(columns: DataGrid.DataGrid.ColumnDescriptor[]): void;
    sortingChanged(): void;
    getSortingFunction(columnId: string): ((a: DataGrid.SortableDataGrid.SortableDataGridNode<GridNode>, b: DataGrid.SortableDataGrid.SortableDataGridNode<GridNode>) => number) | null;
    private onShowModeChanged;
    private updateDetailsForSelection;
    showDetailsForNode(_node: Trace.Extras.TraceTree.Node): boolean;
    private onMouseMove;
    onHover(node: Trace.Extras.TraceTree.Node | null): void;
    onGridNodeOpened(): void;
    private onContextMenu;
    dataGridElementForEvent(event: Trace.Types.Events.Event | null): HTMLElement | null;
    dataGridNodeForTreeNode(treeNode: Trace.Extras.TraceTree.Node): GridNode | null;
    onSearchCanceled(): void;
    performSearch(searchConfig: UI.SearchableView.SearchConfig, _shouldJump: boolean, _jumpBackwards?: boolean): void;
    jumpToNextSearchResult(): void;
    jumpToPreviousSearchResult(): void;
    supportsCaseSensitiveSearch(): boolean;
    supportsRegexSearch(): boolean;
}
export declare namespace TimelineTreeView {
    const enum Events {
        TREE_ROW_HOVERED = "TreeRowHovered",
        THIRD_PARTY_ROW_HOVERED = "ThirdPartyRowHovered"
    }
    interface EventTypes {
        [Events.TREE_ROW_HOVERED]: Trace.Extras.TraceTree.Node | null;
        [Events.THIRD_PARTY_ROW_HOVERED]: Trace.Types.Events.Event[] | null;
    }
}
export declare class GridNode extends DataGrid.SortableDataGrid.SortableDataGridNode<GridNode> {
    protected populated: boolean;
    profileNode: Trace.Extras.TraceTree.Node;
    protected treeView: TimelineTreeView;
    protected grandTotalTime: number;
    protected maxSelfTime: number;
    protected maxTotalTime: number;
    linkElement: Element | null;
    constructor(profileNode: Trace.Extras.TraceTree.Node, grandTotalTime: number, maxSelfTime: number, maxTotalTime: number, treeView: TimelineTreeView);
    createCell(columnId: string): HTMLElement;
    private createNameCell;
    private createValueCell;
}
export declare class TreeGridNode extends GridNode {
    constructor(profileNode: Trace.Extras.TraceTree.Node, grandTotalTime: number, maxSelfTime: number, maxTotalTime: number, treeView: TimelineTreeView);
    populate(): void;
}
export declare class AggregatedTimelineTreeView extends TimelineTreeView {
    protected readonly groupBySetting: Common.Settings.Setting<AggregatedTimelineTreeView.GroupBy>;
    private readonly stackView;
    private executionContextNamesByOrigin;
    constructor();
    setGroupBySettingForTests(groupBy: AggregatedTimelineTreeView.GroupBy): void;
    updateContents(selection: TimelineSelection): void;
    private updateExtensionResolver;
    private beautifyDomainName;
    displayInfoForGroupNode(node: Trace.Extras.TraceTree.Node): {
        name: string;
        color: string;
        icon: (Element | undefined);
    };
    populateToolbar(toolbar: UI.Toolbar.Toolbar): void;
    private buildHeaviestStack;
    exposePercentages(): boolean;
    private onStackViewSelectionChanged;
    showDetailsForNode(node: Trace.Extras.TraceTree.Node): boolean;
    protected groupingFunction(groupBy: AggregatedTimelineTreeView.GroupBy): ((arg0: Trace.Types.Events.Event) => string) | null;
    private domainByEvent;
    private static isExtensionInternalURL;
    private static isV8NativeURL;
    private static readonly extensionInternalPrefix;
    private static readonly v8NativePrefix;
}
export declare namespace AggregatedTimelineTreeView {
    enum GroupBy {
        None = "None",
        EventName = "EventName",
        Category = "Category",
        Domain = "Domain",
        Subdomain = "Subdomain",
        URL = "URL",
        Frame = "Frame",
        ThirdParties = "ThirdParties"
    }
}
export declare class CallTreeTimelineTreeView extends AggregatedTimelineTreeView {
    constructor();
    buildTree(): Trace.Extras.TraceTree.Node;
}
export declare class BottomUpTimelineTreeView extends AggregatedTimelineTreeView {
    constructor();
    buildTree(): Trace.Extras.TraceTree.Node;
}
declare const TimelineStackView_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<TimelineStackView.EventTypes>;
    addEventListener<T extends TimelineStackView.Events.SELECTION_CHANGED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<TimelineStackView.EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<TimelineStackView.EventTypes, T>;
    once<T extends TimelineStackView.Events.SELECTION_CHANGED>(eventType: T): Promise<TimelineStackView.EventTypes[T]>;
    removeEventListener<T extends TimelineStackView.Events.SELECTION_CHANGED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<TimelineStackView.EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: TimelineStackView.Events.SELECTION_CHANGED): boolean;
    dispatchEventToListeners<T extends TimelineStackView.Events.SELECTION_CHANGED>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<TimelineStackView.EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class TimelineStackView extends TimelineStackView_base {
    private readonly treeView;
    private readonly dataGrid;
    constructor(treeView: TimelineTreeView);
    setStack(stack: Trace.Extras.TraceTree.Node[], selectedNode: Trace.Extras.TraceTree.Node): void;
    selectedTreeNode(): Trace.Extras.TraceTree.Node | null;
    private onSelectionChanged;
}
export declare namespace TimelineStackView {
    const enum Events {
        SELECTION_CHANGED = "SelectionChanged"
    }
    interface EventTypes {
        [Events.SELECTION_CHANGED]: void;
    }
}
export {};
