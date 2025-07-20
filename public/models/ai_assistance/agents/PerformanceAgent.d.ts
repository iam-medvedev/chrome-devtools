import '../../../ui/components/icon_button/icon_button.js';
import * as Host from '../../../core/host/host.js';
import * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import { type TemplateResult } from '../../../ui/lit/lit.js';
import { ConversationType } from '../AiHistoryStorage.js';
import { type AgentOptions, AiAgent, type ContextResponse, ConversationContext, type ConversationSuggestion, type ParsedResponse, type RequestOptions, type ResponseData } from './AiAgent.js';
export declare class PerformanceTraceContext extends ConversationContext<TimelineUtils.AIContext.AgentFocus> {
    #private;
    static fromInsight(insight: TimelineUtils.InsightAIContext.ActiveInsight): PerformanceTraceContext;
    static fromCallTree(callTree: TimelineUtils.AICallTree.AICallTree): PerformanceTraceContext;
    constructor(focus: TimelineUtils.AIContext.AgentFocus);
    getOrigin(): string;
    getItem(): TimelineUtils.AIContext.AgentFocus;
    getIcon(): TemplateResult;
    getTitle(): string;
    /**
     * Presents the default suggestions that are shown when the user first clicks
     * "Ask AI".
     */
    getSuggestions(): Promise<[ConversationSuggestion, ...ConversationSuggestion[]] | undefined>;
}
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export declare class PerformanceAgent extends AiAgent<TimelineUtils.AIContext.AgentFocus> {
    #private;
    constructor(opts: AgentOptions, conversationType: ConversationType.PERFORMANCE | ConversationType.PERFORMANCE_INSIGHT);
    get preamble(): string;
    get clientFeature(): Host.AidaClient.ClientFeature;
    get userTier(): string | undefined;
    get options(): RequestOptions;
    getConversationType(): ConversationType;
    handleContextDetails(context: ConversationContext<TimelineUtils.AIContext.AgentFocus> | null): AsyncGenerator<ContextResponse, void, void>;
    parseTextResponse(response: string): ParsedResponse;
    enhanceQuery(query: string, context: ConversationContext<TimelineUtils.AIContext.AgentFocus> | null): Promise<string>;
    run(initialQuery: string, options: {
        selected: ConversationContext<TimelineUtils.AIContext.AgentFocus> | null;
        signal?: AbortSignal;
    }): AsyncGenerator<ResponseData, void, void>;
    private declareFunctions;
}
