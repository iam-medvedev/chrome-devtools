import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type OverviewController, type PopulateNodesEventNodes, type PopulateNodesEventNodeTypes } from './CSSOverviewController.js';
import type { UnusedDeclaration } from './CSSOverviewUnusedDeclarations.js';
export type NodeStyleStats = Map<string, Set<number>>;
export interface ContrastIssue {
    nodeId: Protocol.DOM.BackendNodeId;
    contrastRatio: number;
    textColor: Common.Color.Color;
    backgroundColor: Common.Color.Color;
    thresholdsViolated: {
        aa: boolean;
        aaa: boolean;
        apca: boolean;
    };
}
export interface OverviewData {
    backgroundColors: Map<string, Set<Protocol.DOM.BackendNodeId>>;
    textColors: Map<string, Set<Protocol.DOM.BackendNodeId>>;
    textColorContrastIssues: Map<string, ContrastIssue[]>;
    fillColors: Map<string, Set<Protocol.DOM.BackendNodeId>>;
    borderColors: Map<string, Set<Protocol.DOM.BackendNodeId>>;
    globalStyleStats: {
        styleRules: number;
        inlineStyles: number;
        externalSheets: number;
        stats: {
            type: number;
            class: number;
            id: number;
            universal: number;
            attribute: number;
            nonSimple: number;
        };
    };
    fontInfo: Map<string, Map<string, Map<string, Protocol.DOM.BackendNodeId[]>>>;
    elementCount: number;
    mediaQueries: Map<string, Protocol.CSS.CSSMedia[]>;
    unusedDeclarations: Map<string, UnusedDeclaration[]>;
}
export type FontInfo = Map<string, Map<string, Map<string, number[]>>>;
export declare class CSSOverviewCompletedView extends UI.Widget.VBox {
    #private;
    constructor(controller: OverviewController);
    initializeModels(target: SDK.Target.Target): void;
    setOverviewData(data: OverviewData): void;
    static readonly pushedNodes: Set<Protocol.DOM.BackendNodeId>;
}
declare const DetailsView_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends Events.TAB_CLOSED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends Events.TAB_CLOSED>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends Events.TAB_CLOSED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: Events.TAB_CLOSED): boolean;
    dispatchEventToListeners<T extends Events.TAB_CLOSED>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class DetailsView extends DetailsView_base {
    #private;
    constructor();
    appendTab(id: string, tabTitle: string, view: UI.Widget.Widget, jslogContext?: string): void;
    closeTabs(): void;
}
export declare const enum Events {
    TAB_CLOSED = "TabClosed"
}
export interface EventTypes {
    [Events.TAB_CLOSED]: number;
}
export declare class ElementDetailsView extends UI.Widget.Widget {
    #private;
    constructor(controller: OverviewController, domModel: SDK.DOMModel.DOMModel, cssModel: SDK.CSSModel.CSSModel, linkifier: Components.Linkifier.Linkifier);
    populateNodes(data: PopulateNodesEventNodes): Promise<void>;
}
export declare class ElementNode extends DataGrid.SortableDataGrid.SortableDataGridNode<ElementNode> {
    #private;
    constructor(data: PopulateNodesEventNodeTypes, frontendNode: SDK.DOMModel.DOMNode | null | undefined, linkifier: Components.Linkifier.Linkifier, cssModel: SDK.CSSModel.CSSModel);
    createCell(columnId: string): HTMLElement;
}
export {};
