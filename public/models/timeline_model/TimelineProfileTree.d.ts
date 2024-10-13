import type * as Protocol from '../../generated/protocol.js';
import * as Trace from '../../models/trace/trace.js';
import type { TimelineModelFilter } from './TimelineModelFilter.js';
export declare class Node {
    totalTime: number;
    selfTime: number;
    id: string | symbol;
    event: Trace.Types.Events.Event | null;
    parent: Node | null;
    groupId: string;
    isGroupNodeInternal: boolean;
    depth: number;
    constructor(id: string | symbol, event: Trace.Types.Events.Event | null);
    isGroupNode(): boolean;
    hasChildren(): boolean;
    setHasChildren(_value: boolean): void;
    /**
     * Returns the direct descendants of this node.
     * @returns a map with ordered <nodeId, Node> tuples.
     */
    children(): ChildrenCache;
    searchTree(matchFunction: (arg0: Trace.Types.Events.Event) => boolean, results?: Node[]): Node[];
}
export declare class TopDownNode extends Node {
    root: TopDownRootNode | null;
    private hasChildrenInternal;
    childrenInternal: ChildrenCache | null;
    parent: TopDownNode | null;
    constructor(id: string | symbol, event: Trace.Types.Events.Event | null, parent: TopDownNode | null);
    hasChildren(): boolean;
    setHasChildren(value: boolean): void;
    children(): ChildrenCache;
    private buildChildren;
    getRoot(): TopDownRootNode | null;
}
export declare class TopDownRootNode extends TopDownNode {
    readonly filter: (e: Trace.Types.Events.Event) => boolean;
    readonly events: Trace.Types.Events.Event[];
    readonly startTime: Trace.Types.Timing.MilliSeconds;
    readonly endTime: Trace.Types.Timing.MilliSeconds;
    eventGroupIdCallback: ((arg0: Trace.Types.Events.Event) => string) | null | undefined;
    readonly doNotAggregate: boolean | undefined;
    totalTime: number;
    selfTime: number;
    constructor(events: Trace.Types.Events.Event[], filters: TimelineModelFilter[], startTime: Trace.Types.Timing.MilliSeconds, endTime: Trace.Types.Timing.MilliSeconds, doNotAggregate?: boolean, eventGroupIdCallback?: ((arg0: Trace.Types.Events.Event) => string) | null);
    children(): ChildrenCache;
    private grouppedTopNodes;
    getEventGroupIdCallback(): ((arg0: Trace.Types.Events.Event) => string) | null | undefined;
}
export declare class BottomUpRootNode extends Node {
    private childrenInternal;
    readonly events: Trace.Types.Events.Event[];
    private textFilter;
    readonly filter: (e: Trace.Types.Events.Event) => boolean;
    readonly startTime: Trace.Types.Timing.MilliSeconds;
    readonly endTime: Trace.Types.Timing.MilliSeconds;
    private eventGroupIdCallback;
    totalTime: number;
    constructor(events: Trace.Types.Events.Event[], textFilter: TimelineModelFilter, filters: TimelineModelFilter[], startTime: Trace.Types.Timing.MilliSeconds, endTime: Trace.Types.Timing.MilliSeconds, eventGroupIdCallback: ((arg0: Trace.Types.Events.Event) => string) | null);
    hasChildren(): boolean;
    filterChildren(children: ChildrenCache): ChildrenCache;
    children(): ChildrenCache;
    private ungrouppedTopNodes;
    private grouppedTopNodes;
}
export declare class GroupNode extends Node {
    private readonly childrenInternal;
    isGroupNodeInternal: boolean;
    constructor(id: string, parent: BottomUpRootNode | TopDownRootNode, event: Trace.Types.Events.Event);
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
    constructor(root: BottomUpRootNode, id: string, event: Trace.Types.Events.Event, hasChildren: boolean, parent: Node);
    hasChildren(): boolean;
    setHasChildren(value: boolean): void;
    children(): ChildrenCache;
    searchTree(matchFunction: (arg0: Trace.Types.Events.Event) => boolean, results?: Node[]): Node[];
}
export declare function eventStackFrame(event: Trace.Types.Events.Event): Protocol.Runtime.CallFrame | null;
export declare function generateEventID(event: Trace.Types.Events.Event): string;
export type ChildrenCache = Map<string | symbol, Node>;
