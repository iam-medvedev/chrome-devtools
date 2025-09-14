import '../../../ui/components/icon_button/icon_button.js';
import * as Host from '../../../core/host/host.js';
import * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import * as Trace from '../../trace/trace.js';
import type { ConversationType } from '../AiHistoryStorage.js';
import { type AgentOptions, AiAgent, type ContextResponse, ConversationContext, type ConversationSuggestion, type ParsedResponse, type RequestOptions, type ResponseData } from './AiAgent.js';
export declare class PerformanceTraceContext extends ConversationContext<TimelineUtils.AIContext.AgentFocus> {
    #private;
    static full(parsedTrace: Trace.TraceModel.ParsedTrace): PerformanceTraceContext;
    static fromInsight(parsedTrace: Trace.TraceModel.ParsedTrace, insight: Trace.Insights.Types.InsightModel): PerformanceTraceContext;
    static fromCallTree(callTree: TimelineUtils.AICallTree.AICallTree): PerformanceTraceContext;
    constructor(focus: TimelineUtils.AIContext.AgentFocus);
    getOrigin(): string;
    getItem(): TimelineUtils.AIContext.AgentFocus;
    getTitle(): string;
    /**
     * Presents the default suggestions that are shown when the user first clicks
     * "Ask AI".
     */
    getSuggestions(): Promise<[ConversationSuggestion, ...ConversationSuggestion[]] | undefined>;
}
/**
 * Union of all the performance conversation types, which are all implemented by this file.
 * This temporary until all Performance Panel AI features use the "Full" type. go/chrome-devtools:more-powerful-performance-agent-design
 */
type PerformanceConversationType = ConversationType.PERFORMANCE_FULL | ConversationType.PERFORMANCE_CALL_TREE | ConversationType.PERFORMANCE_INSIGHT;
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export declare class PerformanceAgent extends AiAgent<TimelineUtils.AIContext.AgentFocus> {
    #private;
    constructor(opts: AgentOptions, conversationType: PerformanceConversationType);
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
}
export {};
