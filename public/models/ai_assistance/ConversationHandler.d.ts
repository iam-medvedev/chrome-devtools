import * as Host from '../../core/host/host.js';
import type * as Trace from '../trace/trace.js';
import { type AiAgent, type ExternalRequestResponse, type ResponseData } from './agents/AiAgent.js';
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
export interface ExternalPerformanceInsightsRequestParameters {
    conversationType: ConversationType.PERFORMANCE_INSIGHT;
    prompt: string;
    insightTitle: string;
    traceModel: Trace.TraceModel.Model;
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
    handleExternalRequest(parameters: ExternalStylingRequestParameters | ExternalNetworkRequestParameters | ExternalPerformanceInsightsRequestParameters): Promise<AsyncGenerator<ExternalRequestResponse, ExternalRequestResponse>>;
    handleConversationWithHistory(items: AsyncIterable<ResponseData, void, void>, conversation: Conversation | undefined): AsyncGenerator<ResponseData, void, void>;
    createAgent(conversationType: ConversationType, changeManager?: ChangeManager): AiAgent<unknown>;
}
export {};
