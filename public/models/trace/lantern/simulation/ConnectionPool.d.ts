import type * as Lantern from '../types/types.js';
import { TCPConnection } from './TCPConnection.js';
export declare class ConnectionPool {
    _options: Required<Lantern.Simulation.Options>;
    _records: Lantern.NetworkRequest[];
    _connectionsByOrigin: Map<string, TCPConnection[]>;
    _connectionsByRequest: Map<Lantern.NetworkRequest, TCPConnection>;
    _connectionsInUse: Set<TCPConnection>;
    _connectionReusedByRequestId: Map<string, boolean>;
    constructor(records: Lantern.NetworkRequest[], options: Required<Lantern.Simulation.Options>);
    connectionsInUse(): TCPConnection[];
    _initializeConnections(): void;
    _findAvailableConnectionWithLargestCongestionWindow(connections: TCPConnection[]): TCPConnection | null;
    /**
     * This method finds an available connection to the origin specified by the network request or null
     * if no connection was available. If returned, connection will not be available for other network
     * records until release is called.
     */
    acquire(request: Lantern.NetworkRequest): TCPConnection | null;
    /**
     * Return the connection currently being used to fetch a request. If no connection
     * currently being used for this request, an error will be thrown.
     */
    acquireActiveConnectionFromRequest(request: Lantern.NetworkRequest): TCPConnection;
    release(request: Lantern.NetworkRequest): void;
}
