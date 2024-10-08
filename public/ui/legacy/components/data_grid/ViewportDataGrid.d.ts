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
    stickToBottom: boolean;
    private updateIsFromUser;
    private lastScrollTop;
    private firstVisibleIsStriped;
    private isStriped;
    constructor(dataGridParameters: Parameters);
    setStriped(striped: boolean): void;
    private updateStripesClass;
    setScrollContainer(scrollContainer: HTMLElement): void;
    onResize(): void;
    setStickToBottom(stick: boolean): void;
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
