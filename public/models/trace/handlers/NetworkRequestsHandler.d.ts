import * as Types from '../types/types.js';
import { type TraceEventHandlerName } from './types.js';
export interface WebSocketTraceDataForFrame {
    frame: string;
    webSocketIdentifier: number;
    events: Types.TraceEvents.WebSocketEvent[];
    syntheticConnectionEvent: Types.TraceEvents.SyntheticWebSocketConnectionEvent | null;
}
export interface WebSocketTraceDataForWorker {
    workerId: string;
    webSocketIdentifier: number;
    events: Types.TraceEvents.WebSocketEvent[];
    syntheticConnectionEvent: Types.TraceEvents.SyntheticWebSocketConnectionEvent | null;
}
export type WebSocketTraceData = WebSocketTraceDataForFrame | WebSocketTraceDataForWorker;
interface NetworkRequestData {
    byOrigin: Map<string, {
        renderBlocking: Types.TraceEvents.SyntheticNetworkRequest[];
        nonRenderBlocking: Types.TraceEvents.SyntheticNetworkRequest[];
        all: Types.TraceEvents.SyntheticNetworkRequest[];
    }>;
    byTime: Types.TraceEvents.SyntheticNetworkRequest[];
    eventToInitiator: Map<Types.TraceEvents.SyntheticNetworkRequest, Types.TraceEvents.SyntheticNetworkRequest>;
    webSocket: WebSocketTraceData[];
}
export declare function reset(): void;
export declare function initialize(): void;
export declare function handleEvent(event: Types.TraceEvents.TraceEventData): void;
export declare function finalize(): Promise<void>;
export declare function data(): NetworkRequestData;
export declare function deps(): TraceEventHandlerName[];
export {};
