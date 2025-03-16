import * as Trace from '../../../models/trace/trace.js';
export interface FromTimeOnThreadOptions {
    thread: {
        pid: Trace.Types.Events.ProcessID;
        tid: Trace.Types.Events.ThreadID;
    };
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    bounds: Trace.Types.Timing.TraceWindowMicro;
}
export declare class AICallTree {
    selectedNode: Trace.Extras.TraceTree.Node | null;
    rootNode: Trace.Extras.TraceTree.TopDownRootNode;
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    constructor(selectedNode: Trace.Extras.TraceTree.Node | null, rootNode: Trace.Extras.TraceTree.TopDownRootNode, parsedTrace: Trace.Handlers.Types.ParsedTrace);
    /**
     * Builds a call tree representing all calls within the given timeframe for
     * the provided thread.
     * Events that are less than 0.05% of the range duration are removed.
     */
    static fromTimeOnThread({ thread, parsedTrace, bounds }: FromTimeOnThreadOptions): AICallTree | null;
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
