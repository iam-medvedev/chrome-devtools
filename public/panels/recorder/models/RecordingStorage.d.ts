import type { UserFlow } from './Schema.js';
interface IdGenerator {
    next(): string;
}
export declare class RecordingStorage {
    #private;
    constructor();
    clearForTest(): void;
    setIdGeneratorForTest(idGenerator: IdGenerator): void;
    upsertRecording(flow: UserFlow, storageName?: string): Promise<StoredRecording>;
    deleteRecording(storageName: string): Promise<void>;
    getRecording(storageName: string): StoredRecording | undefined;
    getRecordings(): StoredRecording[];
    static instance(): RecordingStorage;
}
export interface StoredRecording {
    storageName: string;
    flow: UserFlow;
}
export {};
