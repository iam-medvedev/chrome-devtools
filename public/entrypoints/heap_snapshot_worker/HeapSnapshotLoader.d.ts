import { JSHeapSnapshot } from './HeapSnapshot.js';
import type { HeapSnapshotWorkerDispatcher } from './HeapSnapshotWorkerDispatcher.js';
export declare class HeapSnapshotLoader {
    #private;
    parsingComplete: Promise<void>;
    constructor(dispatcher: HeapSnapshotWorkerDispatcher);
    dispose(): void;
    close(): void;
    buildSnapshot(secondWorker: MessagePort): Promise<JSHeapSnapshot>;
    write(chunk: string): void;
}
