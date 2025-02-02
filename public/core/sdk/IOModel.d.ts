import type * as Protocol from '../../generated/protocol.js';
import { RemoteObject } from './RemoteObject.js';
import { SDKModel } from './SDKModel.js';
import { type Target } from './Target.js';
export declare class IOModel extends SDKModel<void> {
    constructor(target: Target);
    read(handle: Protocol.IO.StreamHandle, size?: number, offset?: number): Promise<string | ArrayBuffer | null>;
    close(handle: Protocol.IO.StreamHandle): Promise<void>;
    resolveBlob(objectOrObjectId: Protocol.Runtime.RemoteObjectId | RemoteObject): Promise<string>;
    readToString(handle: Protocol.IO.StreamHandle): Promise<string>;
}
