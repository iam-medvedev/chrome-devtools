import type * as Protocol from '../../generated/protocol.js';
export declare class TraceObject {
    readonly traceEvents: Protocol.Tracing.DataCollectedEvent['value'];
    readonly metadata: Object;
    constructor(traceEvents: Protocol.Tracing.DataCollectedEvent['value'], metadata?: Object);
}
export declare class RevealableEvent {
    event: any;
    constructor(event: any);
}
