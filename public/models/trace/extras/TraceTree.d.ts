import type * as Protocol from '../../../generated/protocol.js';
import * as Types from '../types/types.js';
import type { TraceFilter } from './TraceFilter.js';
export declare class Node {
    totalTime: number;
    selfTime: number;
    id: string | symbol;
    event: Types.Events.Event | null;
    parent: Node | null;
    groupId: string;
    isGroupNodeInternal: boolean;
    depth: number;
    constructor(id: string | symbol, event: Types.Events.Event | null);
    isGroupNode(): boolean;
    hasChildren(): boolean;
    setHasChildren(_value: boolean): void;
    /**
     * Returns the direct descendants of this node.
     * @returns a map with ordered <nodeId, Node> tuples.
     */
    children(): ChildrenCache;
    searchTree(matchFunction: (arg0: Types.Events.Event) => boolean, results?: Node[]): Node[];
}
export declare class TopDownNode extends Node {
    root: TopDownRootNode | null;
    private hasChildrenInternal;
    childrenInternal: ChildrenCache | null;
    parent: TopDownNode | null;
    constructor(id: string | symbol, event: Types.Events.Event | null, parent: TopDownNode | null);
    hasChildren(): boolean;
    setHasChildren(value: boolean): void;
    children(): ChildrenCache;
    private buildChildren;
    getRoot(): TopDownRootNode | null;
}
export declare class TopDownRootNode extends TopDownNode {
    readonly filter: (e: Types.Events.Event) => boolean;
    /** This is all events passed in to create the tree, and it's very likely that it included events outside of the passed startTime/endTime as that filtering is done in `Helpers.Trace.forEachEvent` */
    readonly events: Types.Events.Event[];
    readonly startTime: Types.Timing.MilliSeconds;
    readonly endTime: Types.Timing.MilliSeconds;
    eventGroupIdCallback: ((arg0: Types.Events.Event) => string) | null | undefined;
    /** Default behavior is to aggregate similar trace events into one Node based on generateEventID(), eventGroupIdCallback(), etc. Set true to keep nodes 1:1 with events. */
    readonly doNotAggregate: boolean | undefined;
    readonly includeInstantEvents?: boolean;
    totalTime: number;
    selfTime: number;
    constructor(events: Types.Events.Event[], filters: TraceFilter[], startTime: Types.Timing.MilliSeconds, endTime: Types.Timing.MilliSeconds, doNotAggregate?: boolean, eventGroupIdCallback?: ((arg0: Types.Events.Event) => string) | null, includeInstantEvents?: boolean);
    children(): ChildrenCache;
    private grouppedTopNodes;
    getEventGroupIdCallback(): ((arg0: Types.Events.Event) => string) | null | undefined;
}
export declare class BottomUpRootNode extends Node {
    private childrenInternal;
    readonly events: Types.Events.Event[];
    private textFilter;
    readonly filter: (e: Types.Events.Event) => boolean;
    readonly startTime: Types.Timing.MilliSeconds;
    readonly endTime: Types.Timing.MilliSeconds;
    private eventGroupIdCallback;
    totalTime: number;
    constructor(events: Types.Events.Event[], textFilter: TraceFilter, filters: TraceFilter[], startTime: Types.Timing.MilliSeconds, endTime: Types.Timing.MilliSeconds, eventGroupIdCallback: ((arg0: Types.Events.Event) => string) | null);
    hasChildren(): boolean;
    filterChildren(children: ChildrenCache): ChildrenCache;
    children(): ChildrenCache;
    private ungrouppedTopNodes;
    private grouppedTopNodes;
}
export declare class GroupNode extends Node {
    private readonly childrenInternal;
    isGroupNodeInternal: boolean;
    constructor(id: string, parent: BottomUpRootNode | TopDownRootNode, event: Types.Events.Event);
    addChild(child: BottomUpNode, selfTime: number, totalTime: number): void;
    hasChildren(): boolean;
    children(): ChildrenCache;
}
export declare class BottomUpNode extends Node {
    parent: Node;
    private root;
    depth: number;
    private cachedChildren;
    private hasChildrenInternal;
    constructor(root: BottomUpRootNode, id: string, event: Types.Events.Event, hasChildren: boolean, parent: Node);
    hasChildren(): boolean;
    setHasChildren(value: boolean): void;
    children(): ChildrenCache;
    searchTree(matchFunction: (arg0: Types.Events.Event) => boolean, results?: Node[]): Node[];
}
export declare function eventStackFrame(event: Types.Events.Event): Protocol.Runtime.CallFrame | null;
export declare function generateEventID(event: Types.Events.Event): string;
export type ChildrenCache = Map<string | symbol, Node>;
