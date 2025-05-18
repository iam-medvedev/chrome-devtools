import '../../ui/legacy/components/data_grid/data_grid.js';
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
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
interface ViewInput {
    items: Array<{
        data: PopulateNodesEventNodeTypes;
        link?: HTMLElement;
        showNode?: () => void;
    }>;
    visibility: Set<string>;
}
type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class ElementDetailsView extends UI.Widget.Widget {
    #private;
    constructor(domModel: SDK.DOMModel.DOMModel, cssModel: SDK.CSSModel.CSSModel, linkifier: Components.Linkifier.Linkifier, view?: View);
    set data(data: PopulateNodesEventNodes);
    performUpdate(): Promise<void>;
}
export {};
