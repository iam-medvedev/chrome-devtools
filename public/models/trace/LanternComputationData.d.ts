import * as Handlers from './handlers/handlers.js';
import * as Lantern from './lantern/lantern.js';
import type * as Types from './types/types.js';
type NetworkRequest = Lantern.Types.NetworkRequest<Types.TraceEvents.SyntheticNetworkRequest>;
declare function createProcessedNavigation(traceEngineData: Handlers.Types.TraceParseData, frameId: string, navigationId: string): Lantern.Types.Simulation.ProcessedNavigation;
declare function createNetworkRequests(trace: Lantern.Types.Trace, traceEngineData: Handlers.Types.TraceParseData, startTime?: number, endTime?: number): NetworkRequest[];
declare function createGraph(requests: Lantern.Types.NetworkRequest[], trace: Lantern.Types.Trace, traceEngineData: Handlers.Types.TraceParseData, url?: Lantern.Types.Simulation.URL): Lantern.Graph.Node<Types.TraceEvents.SyntheticNetworkRequest>;
export { createProcessedNavigation, createNetworkRequests, createGraph, };
