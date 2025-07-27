import * as Host from '../../../core/host/host.js';
import type * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import { AiAgent, type ContextResponse, type ConversationContext, type RequestOptions } from './AiAgent.js';
export declare class PerformanceAnnotationsAgent extends AiAgent<TimelineUtils.AIContext.AgentFocus> {
    preamble: string;
    get clientFeature(): Host.AidaClient.ClientFeature;
    get userTier(): string | undefined;
    get options(): RequestOptions;
    handleContextDetails(context: ConversationContext<TimelineUtils.AIContext.AgentFocus> | null): AsyncGenerator<ContextResponse, void, void>;
    enhanceQuery(query: string, context: ConversationContext<TimelineUtils.AIContext.AgentFocus> | null): Promise<string>;
    /**
     * Used in the Performance panel to automatically generate a label for a selected entry.
     */
    generateAIEntryLabel(callTree: TimelineUtils.AICallTree.AICallTree): Promise<string>;
}
