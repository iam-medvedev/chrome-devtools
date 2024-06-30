import * as Graph from '../graph/graph.js';
import type * as Lantern from '../types/types.js';
import { ConnectionPool } from './ConnectionPool.js';
import { DNSCache } from './DNSCache.js';
import { type CompleteNodeTiming, type ConnectionTiming, SimulatorTimingMap } from './SimulationTimingMap.js';
import { TCPConnection } from './TCPConnection.js';
export interface Result<T = Lantern.AnyNetworkObject> {
    timeInMs: number;
    nodeTimings: Map<Graph.Node<T>, Lantern.Simulation.NodeTiming>;
}
declare class Simulator<T = Lantern.AnyNetworkObject> {
    static createSimulator(settings: Lantern.Simulation.Settings): Simulator;
    _options: Required<Lantern.Simulation.Options>;
    _rtt: number;
    _throughput: number;
    _maximumConcurrentRequests: number;
    _cpuSlowdownMultiplier: number;
    _layoutTaskMultiplier: number;
    _cachedNodeListByStartPosition: Graph.Node[];
    _nodeTimings: SimulatorTimingMap;
    _numberInProgressByType: Map<string, number>;
    _nodes: Record<number, Set<Graph.Node>>;
    _dns: DNSCache;
    _connectionPool: ConnectionPool;
    constructor(options?: Lantern.Simulation.Options);
    get rtt(): number;
    _initializeConnectionPool(graph: Graph.Node): void;
    /**
     * Initializes the various state data structures such _nodeTimings and the _node Sets by state.
     */
    _initializeAuxiliaryData(): void;
    _numberInProgress(type: string): number;
    _markNodeAsReadyToStart(node: Graph.Node, queuedTime: number): void;
    _markNodeAsInProgress(node: Graph.Node, startTime: number): void;
    _markNodeAsComplete(node: Graph.Node, endTime: number, connectionTiming?: ConnectionTiming): void;
    _acquireConnection(request: Lantern.NetworkRequest): TCPConnection | null;
    _getNodesSortedByStartPosition(): Graph.Node[];
    _startNodeIfPossible(node: Graph.Node, totalElapsedTime: number): void;
    /**
     * Updates each connection in use with the available throughput based on the number of network requests
     * currently in flight.
     */
    _updateNetworkCapacity(): void;
    /**
     * Estimates the number of milliseconds remaining given current condidtions before the node is complete.
     */
    _estimateTimeRemaining(node: Graph.Node): number;
    _estimateCPUTimeRemaining(cpuNode: Graph.CPUNode): number;
    _estimateNetworkTimeRemaining(networkNode: Graph.NetworkNode): number;
    /**
     * Computes and returns the minimum estimated completion time of the nodes currently in progress.
     */
    _findNextNodeCompletionTime(): number;
    /**
     * Given a time period, computes the progress toward completion that the node made durin that time.
     */
    _updateProgressMadeInTimePeriod(node: Graph.Node, timePeriodLength: number, totalElapsedTime: number): void;
    _computeFinalNodeTimings(): {
        nodeTimings: Map<Graph.Node, Lantern.Simulation.NodeTiming>;
        completeNodeTimings: Map<Graph.Node, CompleteNodeTiming>;
    };
    getOptions(): Required<Lantern.Simulation.Options>;
    /**
     * Estimates the time taken to process all of the graph's nodes, returns the overall time along with
     * each node annotated by start/end times.
     *
     * Simulator/connection pool are allowed to deviate from what was
     * observed in the trace/devtoolsLog and start requests as soon as they are queued (i.e. do not
     * wait around for a warm connection to be available if the original request was fetched on a warm
     * connection).
     */
    simulate(graph: Graph.Node, options?: {
        label?: string;
    }): Result<T>;
    computeWastedMsFromWastedBytes(wastedBytes: number): number;
    static get allNodeTimings(): Map<string, Map<Graph.Node, CompleteNodeTiming>>;
    /**
     * We attempt to start nodes by their observed start time using the request priority as a tie breaker.
     * When simulating, just because a low priority image started 5ms before a high priority image doesn't mean
     * it would have happened like that when the network was slower.
     */
    static _computeNodeStartPosition(node: Graph.Node): number;
}
export { Simulator };
