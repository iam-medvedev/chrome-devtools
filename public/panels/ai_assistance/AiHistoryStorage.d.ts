import { type ResponseData } from './agents/AiAgent.js';
export declare const enum ConversationType {
    STYLING = "freestyler",
    FILE = "drjones-file",
    NETWORK = "drjones-network-request",
    PERFORMANCE = "drjones-performance",
    PERFORMANCE_INSIGHT = "performance-insight"
}
export interface SerializedConversation {
    id: string;
    type: ConversationType;
    history: ResponseData[];
}
export declare class Conversation {
    static fromSerialized(serialized: SerializedConversation): Conversation;
    readonly id: string;
    readonly history: ResponseData[];
    readonly type: ConversationType;
    readonly isReadOnly: boolean;
    constructor(type: ConversationType, data?: ResponseData[], id?: string, isReadOnly?: boolean);
    get title(): string | undefined;
    get isEmpty(): boolean;
    addHistoryItem(item: ResponseData): void;
    serialize(): SerializedConversation;
}
export declare class AiHistoryStorage {
    #private;
    constructor();
    clearForTest(): void;
    upsertHistoryEntry(agentEntry: SerializedConversation): Promise<void>;
    deleteHistoryEntry(id: string): Promise<void>;
    deleteAll(): Promise<void>;
    getHistory(): SerializedConversation[];
    static instance(forceNew?: boolean): AiHistoryStorage;
}
