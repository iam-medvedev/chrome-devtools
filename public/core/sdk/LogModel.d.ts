import type * as ProtocolProxyApi from '../../generated/protocol-proxy-api.js';
import * as Protocol from '../../generated/protocol.js';
import { type Target } from './Target.js';
import { SDKModel } from './SDKModel.js';
export declare class LogModel extends SDKModel<EventTypes> implements ProtocolProxyApi.LogDispatcher {
    #private;
    constructor(target: Target);
    entryAdded({ entry }: Protocol.Log.EntryAddedEvent): void;
    requestClear(): void;
}
export declare const enum Events {
    ENTRY_ADDED = "EntryAdded"
}
export interface EntryAddedEvent {
    logModel: LogModel;
    entry: Protocol.Log.LogEntry;
}
export type EventTypes = {
    [Events.ENTRY_ADDED]: EntryAddedEvent;
};
