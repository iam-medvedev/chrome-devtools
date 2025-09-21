import * as Host from '../../core/host/host.js';
import { type AiAgent, type ExternalRequestResponse, type ResponseData } from './agents/AiAgent.js';
import { type PerformanceTraceContext } from './agents/PerformanceAgent.js';
import { Conversation, ConversationType } from './AiHistoryStorage.js';
import type { ChangeManager } from './ChangeManager.js';
interface ExternalStylingRequestParameters {
    conversationType: ConversationType.STYLING;
    prompt: string;
    selector?: string;
}
interface ExternalNetworkRequestParameters {
    conversationType: ConversationType.NETWORK;
    prompt: string;
    requestUrl: string;
}
export interface ExternalPerformanceAIConversationData {
    conversationHandler: ConversationHandler;
    conversation: Conversation;
    agent: AiAgent<unknown>;
    selected: PerformanceTraceContext;
}
export interface ExternalPerformanceRequestParameters {
    conversationType: ConversationType.PERFORMANCE;
    prompt: string;
    data: ExternalPerformanceAIConversationData;
}
export declare class ConversationHandler {
    #private;
    private constructor();
    static instance(opts?: {
        aidaClient?: Host.AidaClient.AidaClient;
        aidaAvailability?: Host.AidaClient.AidaAccessPreconditions;
        forceNew?: boolean;
    }): ConversationHandler;
    static removeInstance(): void;
    /**
     * Handles an external request using the given prompt and uses the
     * conversation type to use the correct agent.
     */
    handleExternalRequest(parameters: ExternalStylingRequestParameters | ExternalNetworkRequestParameters | ExternalPerformanceRequestParameters): Promise<AsyncGenerator<ExternalRequestResponse, ExternalRequestResponse>>;
    handleConversationWithHistory(items: AsyncIterable<ResponseData, void, void>, conversation: Conversation | undefined): AsyncGenerator<ResponseData, void, void>;
    createAgent(conversationType: ConversationType, changeManager?: ChangeManager): AiAgent<unknown>;
}
export {};
