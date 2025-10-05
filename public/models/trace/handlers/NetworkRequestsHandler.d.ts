import * as Types from '../types/types.js';
import * as HandlerHelpers from './helpers.js';
import type { HandlerName } from './types.js';
/**
 * Network requests from traces are actually formed of 5 trace records.
 * This handler tracks all trace records based on the request ID, and
 * then creates a new synthetic trace event for those network requests.
 *
 * This interface, then, defines the shape of the object we intend to
 * keep for each request in the trace. In the finalize we will convert
 * these 5 types of trace records to a synthetic complete event that
 * represents a composite of these trace records.
 **/
export interface TraceEventsForNetworkRequest {
    changePriority?: Types.Events.ResourceChangePriority;
    willSendRequests?: Types.Events.ResourceWillSendRequest[];
    sendRequests?: Types.Events.ResourceSendRequest[];
    receiveResponse?: Types.Events.ResourceReceiveResponse;
    resourceFinish?: Types.Events.ResourceFinish;
    receivedData?: Types.Events.ResourceReceivedData[];
    resourceMarkAsCached?: Types.Events.ResourceMarkAsCached;
}
export interface WebSocketTraceDataForFrame {
    frame: string;
    webSocketIdentifier: number;
    events: Types.Events.WebSocketEvent[];
    syntheticConnection: Types.Events.SyntheticWebSocketConnection | null;
}
export interface WebSocketTraceDataForWorker {
    workerId: string;
    webSocketIdentifier: number;
    events: Types.Events.WebSocketEvent[];
    syntheticConnection: Types.Events.SyntheticWebSocketConnection | null;
}
export type WebSocketTraceData = WebSocketTraceDataForFrame | WebSocketTraceDataForWorker;
interface NetworkRequestData {
    byId: Map<string, Types.Events.SyntheticNetworkRequest>;
    byTime: Types.Events.SyntheticNetworkRequest[];
    eventToInitiator: Map<Types.Events.SyntheticNetworkRequest, Types.Events.SyntheticNetworkRequest>;
    webSocket: WebSocketTraceData[];
    entityMappings: HandlerHelpers.EntityMappings;
    linkPreconnectEvents: Types.Events.LinkPreconnect[];
}
export declare function reset(): void;
export declare function handleEvent(event: Types.Events.Event): void;
export declare function finalize(): Promise<void>;
export declare function data(): NetworkRequestData;
export declare function deps(): HandlerName[];
export {};
