import * as Trace from '../../../models/trace/trace.js';
export declare class AICallTree {
    selectedNode: Trace.Extras.TraceTree.Node | null;
    rootNode: Trace.Extras.TraceTree.TopDownRootNode;
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    constructor(selectedNode: Trace.Extras.TraceTree.Node | null, rootNode: Trace.Extras.TraceTree.TopDownRootNode, parsedTrace: Trace.Handlers.Types.ParsedTrace);
    /**
     * Builds a call tree representing all calls within the given timeframe.
     * Only includes events that:
     * 1. Are on the main thread
     * 2. Are known to the Renderer / Samples handler.
     * 3. Are at least 0.05% in duration of the total range.
     */
    static fromTime(start: Trace.Types.Timing.Micro, end: Trace.Types.Timing.Micro, parsedTrace: Trace.Handlers.Types.ParsedTrace): AICallTree | null;
    /**
     * Attempts to build an AICallTree from a given selected event. It also
     * validates that this event is one that we support being used with the AI
     * Assistance panel, which [as of January 2025] means:
     * 1. It is on the main thread.
     * 2. It exists in either the Renderer or Sample handler's entryToNode map.
     * This filters out other events we make such as SyntheticLayoutShifts which are not valid
     * If the event is not valid, or there is an unexpected error building the tree, `null` is returned.
     */
    static fromEvent(selectedEvent: Trace.Types.Events.Event, parsedTrace: Trace.Handlers.Types.ParsedTrace): AICallTree | null;
    /** Define precisely how the call tree is serialized. Typically called from within `PerformanceAgent` */
    serialize(): string;
    static stringifyNode(node: Trace.Extras.TraceTree.Node, parsedTrace: Trace.Handlers.Types.ParsedTrace, selectedNode: Trace.Extras.TraceTree.Node | null, nodeToIdMap: Map<Trace.Extras.TraceTree.Node, number>, allUrls: string[]): string;
    logDebug(): void;
}
/**
 * These events are very noisy and take up room in the context window for no real benefit.
 */
export declare class ExcludeCompileCodeFilter extends Trace.Extras.TraceFilter.TraceFilter {
    #private;
    constructor(selectedEvent?: Trace.Types.Events.Event);
    accept(event: Trace.Types.Events.Event): boolean;
}
export declare class SelectedEventDurationFilter extends Trace.Extras.TraceFilter.TraceFilter {
    #private;
    constructor(selectedEvent: Trace.Types.Events.Event);
    accept(event: Trace.Types.Events.Event): boolean;
}
export declare class MinDurationFilter extends Trace.Extras.TraceFilter.TraceFilter {
    #private;
    constructor(minDuration: Trace.Types.Timing.Micro);
    accept(event: Trace.Types.Events.Event): boolean;
}
