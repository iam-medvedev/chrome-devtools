import * as TimelineModel from '../../../models/timeline_model/timeline_model.js';
import * as Trace from '../../../models/trace/trace.js';
export declare class AICallTree {
    selectedNode: TimelineModel.TimelineProfileTree.Node;
    rootNode: TimelineModel.TimelineProfileTree.TopDownRootNode;
    parsedTrace: Trace.Handlers.Types.ParsedTrace;
    constructor(selectedNode: TimelineModel.TimelineProfileTree.Node, rootNode: TimelineModel.TimelineProfileTree.TopDownRootNode, parsedTrace: Trace.Handlers.Types.ParsedTrace);
    static from(selectedEvent: Trace.Types.Events.Event, events: Trace.Types.Events.Event[], parsedTrace: Trace.Handlers.Types.ParsedTrace): AICallTree;
    /** Define precisely how the call tree is serialized. Typically called from within `DrJonesPerformanceAgent` */
    serialize(): string;
    static stringifyNode(node: TimelineModel.TimelineProfileTree.Node, parsedTrace: Trace.Handlers.Types.ParsedTrace, selectedNode: TimelineModel.TimelineProfileTree.Node, nodeToIdMap: Map<TimelineModel.TimelineProfileTree.Node, number>, allUrls: string[]): string;
    logDebug(): void;
}
export declare class AITreeFilter extends TimelineModel.TimelineModelFilter.TimelineModelFilter {
    #private;
    constructor(eventDuration: Trace.Types.Timing.MilliSeconds);
    accept(event: Trace.Types.Events.Event): boolean;
}
