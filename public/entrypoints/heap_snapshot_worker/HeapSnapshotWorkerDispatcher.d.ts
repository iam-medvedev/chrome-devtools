import type * as PlatformApi from '../../core/platform/api/api.js';
import * as HeapSnapshotModel from '../../models/heap_snapshot/heap_snapshot.js';
export declare class HeapSnapshotWorkerDispatcher {
    #private;
    constructor(postMessage: PlatformApi.HostRuntime.Worker['postMessage']);
    sendEvent(name: string, data: unknown): void;
    dispatchMessage({ data, ports, }: PlatformApi.HostRuntime.WorkerMessageEvent<HeapSnapshotModel.HeapSnapshotModel.WorkerCommand>): Promise<void>;
}
