import * as Types from '../types/types.js';
export declare const makeTraceEntryNodeId: () => TraceEntryNodeId;
export declare const makeEmptyTraceEntryTree: () => TraceEntryTree;
export declare const makeEmptyTraceEntryNode: (entry: Types.TraceEvents.TraceEntry, id: TraceEntryNodeId) => TraceEntryNode;
export interface TraceEntryTree {
    roots: Set<TraceEntryNode>;
    maxDepth: number;
}
export interface TraceEntryNode {
    entry: Types.TraceEvents.TraceEntry;
    depth: number;
    id: TraceEntryNodeId;
    parent: TraceEntryNode | null;
    children: TraceEntryNode[];
}
declare class TraceEntryNodeIdTag {
    #private;
}
export type TraceEntryNodeId = number & TraceEntryNodeIdTag;
/**
 * Builds a hierarchy of the entries (trace events and profile calls) in
 * a particular thread of a particular process, assuming that they're
 * sorted, by iterating through all of the events in order.
 *
 * The approach is analogous to how a parser would be implemented. A
 * stack maintains local context. A scanner peeks and pops from the data
 * stream. Various "tokens" (events) are treated as "whitespace"
 * (ignored).
 *
 * The tree starts out empty and is populated as the hierarchy is built.
 * The nodes are also assumed to be created empty, with no known parent
 * or children.
 *
 * Complexity: O(n), where n = number of events
 */
export declare function treify(entries: Types.TraceEvents.TraceEntry[], options?: {
    filter: {
        has: (name: Types.TraceEvents.KnownEventName) => boolean;
    };
}): {
    tree: TraceEntryTree;
    entryToNode: Map<Types.TraceEvents.TraceEntry, TraceEntryNode>;
};
/**
 * Iterates events in a tree hierarchically, from top to bottom,
 * calling back on every event's start and end in the order
 * as it traverses down and then up the tree.
 *
 * For example, given this tree, the following callbacks
 * are expected to be made in the following order
 * |---------------A---------------|
 *  |------B------||-------D------|
 *    |---C---|
 *
 * 1. Start A
 * 3. Start B
 * 4. Start C
 * 5. End C
 * 6. End B
 * 7. Start D
 * 8. End D
 * 9. End A
 *
 */
export declare function walkTreeFromEntry(entryToNode: Map<Types.TraceEvents.TraceEntry, TraceEntryNode>, rootEntry: Types.TraceEvents.TraceEntry, onEntryStart: (entry: Types.TraceEvents.TraceEntry) => void, onEntryEnd: (entry: Types.TraceEvents.TraceEntry) => void): void;
/**
 * Given a Helpers.TreeHelpers.RendererTree, this will iterates events in hierarchically, visiting
 * each root node and working from top to bottom, calling back on every event's
 * start and end in the order as it traverses down and then up the tree.
 *
 * For example, given this tree, the following callbacks
 * are expected to be made in the following order
 * |------------- Task A -------------||-- Task E --|
 *  |-- Task B --||-- Task D --|
 *   |- Task C -|
 *
 * 1. Start A
 * 3. Start B
 * 4. Start C
 * 5. End C
 * 6. End B
 * 7. Start D
 * 8. End D
 * 9. End A
 * 10. Start E
 * 11. End E
 *
 */
export declare function walkEntireTree(entryToNode: Map<Types.TraceEvents.TraceEntry, TraceEntryNode>, tree: TraceEntryTree, onEntryStart: (entry: Types.TraceEvents.TraceEntry) => void, onEntryEnd: (entry: Types.TraceEvents.TraceEntry) => void, traceWindowToInclude?: Types.Timing.TraceWindow, minDuration?: Types.Timing.MicroSeconds): void;
export {};
