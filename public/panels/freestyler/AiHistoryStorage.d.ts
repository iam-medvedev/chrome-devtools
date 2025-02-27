import type { SerializedAgent } from './AiAgent.js';
export declare class AiHistoryStorage {
    #private;
    constructor();
    clearForTest(): void;
    upsertHistoryEntry(agentEntry: SerializedAgent): Promise<void>;
    deleteHistoryEntry(id: string): Promise<void>;
    deleteAll(): Promise<void>;
    getHistory(): SerializedAgent[];
    static instance(): AiHistoryStorage;
}
