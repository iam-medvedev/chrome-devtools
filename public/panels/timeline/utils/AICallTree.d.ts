import * as Trace from '../../../models/trace/trace.js';
export declare class AICallTree {
    selectedNode: Trace.Extras.TraceTree.Node;
    rootNode: Trace.Extras.TraceTree.TopDownRootNode;
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    constructor(selectedNode: Trace.Extras.TraceTree.Node, rootNode: Trace.Extras.TraceTree.TopDownRootNode, parsedTrace: Trace.Handlers.Types.ParsedTrace);
    /**
     * Attempts to build an AICallTree from a given selected event. It also
     * validates that this event is one that we support being used with the AI
     * Assistance panel, which [as of January 2025] means:
     * 1. It is on the main thread.
     * 2. It exists in either the Renderer or Sample handler's entryToNode map.
     * This filters out other events we make such as SyntheticLayoutShifts which are not valid
     * If the event is not valid, or there is an unexpected error building the tree, `null` is returned.
     */
    static from(selectedEvent: Trace.Types.Events.Event, parsedTrace: Trace.Handlers.Types.ParsedTrace): AICallTree | null;
    /** Define precisely how the call tree is serialized. Typically called from within `PerformanceAgent` */
    serialize(): string;
    static stringifyNode(node: Trace.Extras.TraceTree.Node, parsedTrace: Trace.Handlers.Types.ParsedTrace, selectedNode: Trace.Extras.TraceTree.Node, nodeToIdMap: Map<Trace.Extras.TraceTree.Node, number>, allUrls: string[]): string;
    logDebug(): void;
}
export declare class AITreeFilter extends Trace.Extras.TraceFilter.TraceFilter {
    #private;
    constructor(selectedEvent: Trace.Types.Events.Event);
    accept(event: Trace.Types.Events.Event): boolean;
}
