import * as Trace from '../../../models/trace/trace.js';
export declare class AICallTree {
    selectedNode: Trace.Extras.TraceTree.Node;
    rootNode: Trace.Extras.TraceTree.TopDownRootNode;
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    constructor(selectedNode: Trace.Extras.TraceTree.Node, rootNode: Trace.Extras.TraceTree.TopDownRootNode, parsedTrace: Trace.Handlers.Types.ParsedTrace);
    static from(selectedEvent: Trace.Types.Events.Event, events: Trace.Types.Events.Event[], parsedTrace: Trace.Handlers.Types.ParsedTrace): AICallTree;
    /** Define precisely how the call tree is serialized. Typically called from within `DrJonesPerformanceAgent` */
    serialize(): string;
    static stringifyNode(node: Trace.Extras.TraceTree.Node, parsedTrace: Trace.Handlers.Types.ParsedTrace, selectedNode: Trace.Extras.TraceTree.Node, nodeToIdMap: Map<Trace.Extras.TraceTree.Node, number>, allUrls: string[]): string;
    logDebug(): void;
}
export declare class AITreeFilter extends Trace.Extras.TraceFilter.TraceFilter {
    #private;
    constructor(selectedEvent: Trace.Types.Events.Event);
    accept(event: Trace.Types.Events.Event): boolean;
}
