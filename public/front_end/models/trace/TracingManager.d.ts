import * as Protocol from '../../generated/protocol.js';
import * as SDK from '../../core/sdk/sdk.js';
import { type ObjectSnapshot } from './LegacyTracingModel.js';
import type * as Types from './types/types.js';
export declare class TracingManager extends SDK.SDKModel.SDKModel<void> {
    #private;
    constructor(target: SDK.Target.Target);
    bufferUsage(usage?: number, eventCount?: number, percentFull?: number): void;
    eventsCollected(events: EventPayload[]): void;
    tracingComplete(): void;
    reset(): Promise<void>;
    start(client: TracingManagerClient, categoryFilter: string, options: string): Promise<Protocol.ProtocolResponseWithError>;
    warmupJsProfiler(): Promise<void>;
    stop(): void;
}
export interface TracingManagerClient {
    traceEventsCollected(events: EventPayload[]): void;
    tracingComplete(): void;
    tracingBufferUsage(usage: number): void;
    eventsRetrievalProgress(progress: number): void;
}
export interface EventPayload {
    cat?: string;
    pid: number;
    tid: number;
    ts: number;
    ph: Types.TraceEvents.Phase;
    name: string;
    args: {
        sort_index: number;
        name: string;
        snapshot: ObjectSnapshot;
        data: Object | null;
    };
    dur: number;
    id?: string;
    id2?: {
        global: (string | undefined);
        local: (string | undefined);
    };
    scope: string;
}
