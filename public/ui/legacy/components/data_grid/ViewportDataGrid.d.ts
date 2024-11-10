import * as Common from '../../../../core/common/common.js';
import * as Platform from '../../../../core/platform/platform.js';
import { type DataGridData, DataGridImpl, DataGridNode, type Parameters } from './DataGrid.js';
declare const ViewportDataGrid_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T_1 extends Events.VIEWPORT_CALCULATED>(eventType: T_1, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T_1], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T_1>;
    once<T_1 extends Events.VIEWPORT_CALCULATED>(eventType: T_1): Promise<EventTypes[T_1]>;
    removeEventListener<T_1 extends Events.VIEWPORT_CALCULATED>(eventType: T_1, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T_1], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: Events.VIEWPORT_CALCULATED): boolean;
    dispatchEventToListeners<T_1 extends Events.VIEWPORT_CALCULATED>(eventType: Platform.TypeScriptUtilities.NoUnion<T_1>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T_1>): void;
}) & typeof DataGridImpl;
export declare class ViewportDataGrid<T> extends ViewportDataGrid_base<ViewportDataGridNode<T>> {
    private readonly onScrollBound;
    private visibleNodes;
    /** A datagrid preference to express that the grid represents an updating log of rows (eg Network panel request log, websocket messages).
     * If `true`, the datagrid will mostly keep the scroll at the bottom, so new items are visible.
     * If the data is sorted descending (eg Performance Call Tree, heap snapshot), keep the default of `false`.
     */
    enableAutoScrollToBottom: boolean;
    /** When true, the datagrid will manipulate the scrollTop to focus on the bottom, mostly so new additions are visible.
     * Some actions will unset this, like revealing or expanding a particular node.
     * Only matters if enableAutoScrollToBottom is true. */
    keepScrollingToBottom: boolean;
    private updateIsFromUser;
    private lastScrollTop;
    private firstVisibleIsStriped;
    private isStriped;
    constructor(dataGridParameters: Parameters);
    setStriped(striped: boolean): void;
    private updateStripesClass;
    setScrollContainer(scrollContainer: HTMLElement): void;
    onResize(): void;
    setEnableAutoScrollToBottom(stick: boolean): void;
    private onScroll;
    scheduleUpdateStructure(): void;
    scheduleUpdate(isFromUser?: boolean): void;
    updateInstantly(): void;
    renderInline(): void;
    private calculateVisibleNodes;
    private contentHeight;
    private update;
    revealViewportNode(node: ViewportDataGridNode<T>): void;
}
export declare const enum Events {
    VIEWPORT_CALCULATED = "ViewportCalculated"
}
export type EventTypes = {
    [Events.VIEWPORT_CALCULATED]: void;
};
export declare class ViewportDataGridNode<T> extends DataGridNode<ViewportDataGridNode<T>> {
    private stale;
    private flatNodes;
    private isStripedInternal;
    constructor(data?: DataGridData | null, hasChildren?: boolean);
    element(): Element;
    setStriped(isStriped: boolean): void;
    isStriped(): boolean;
    clearFlatNodes(): void;
    flatChildren(): ViewportDataGridNode<T>[];
    insertChild(child: DataGridNode<ViewportDataGridNode<T>>, index: number): void;
    removeChild(child: DataGridNode<ViewportDataGridNode<T>>): void;
    removeChildren(): void;
    private unlink;
    collapse(): void;
    expand(): void;
    attached(): boolean;
    refresh(): void;
    reveal(): void;
    recalculateSiblings(index: number): void;
}
export {};
