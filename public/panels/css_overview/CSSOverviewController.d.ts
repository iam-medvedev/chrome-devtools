import * as Common from '../../core/common/common.js';
import type * as Protocol from '../../generated/protocol.js';
import { type ContrastIssue } from './CSSOverviewCompletedView.js';
import { type UnusedDeclaration } from './CSSOverviewUnusedDeclarations.js';
export declare class OverviewController extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    currentUrl: string;
    constructor();
}
export type PopulateNodesEvent = {
    type: 'contrast';
    key: string;
    section: string | undefined;
    nodes: ContrastIssue[];
} | {
    type: 'color';
    color: string;
    section: string | undefined;
    nodes: {
        nodeId: Protocol.DOM.BackendNodeId;
    }[];
} | {
    type: 'unused-declarations';
    declaration: string;
    nodes: UnusedDeclaration[];
} | {
    type: 'media-queries';
    text: string;
    nodes: Protocol.CSS.CSSMedia[];
} | {
    type: 'font-info';
    name: string;
    nodes: {
        nodeId: Protocol.DOM.BackendNodeId;
    }[];
};
export type PopulateNodesEventNodes = PopulateNodesEvent['nodes'];
export type PopulateNodesEventNodeTypes = PopulateNodesEventNodes[0];
export declare const enum Events {
    REQUEST_OVERVIEW_START = "RequestOverviewStart",
    REQUEST_NODE_HIGHLIGHT = "RequestNodeHighlight",
    POPULATE_NODES = "PopulateNodes",
    REQUEST_OVERVIEW_CANCEL = "RequestOverviewCancel",
    OVERVIEW_COMPLETED = "OverviewCompleted",
    RESET = "Reset"
}
export type EventTypes = {
    [Events.REQUEST_OVERVIEW_START]: void;
    [Events.REQUEST_NODE_HIGHLIGHT]: number;
    [Events.POPULATE_NODES]: {
        payload: PopulateNodesEvent;
    };
    [Events.REQUEST_OVERVIEW_CANCEL]: void;
    [Events.OVERVIEW_COMPLETED]: void;
    [Events.RESET]: void;
};
