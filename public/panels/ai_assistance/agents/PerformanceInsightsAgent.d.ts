import * as Host from '../../../core/host/host.js';
import type * as Lit from '../../../ui/lit/lit.js';
import * as TimelineUtils from '../../timeline/utils/utils.js';
import { type AgentOptions as BaseAgentOptions, AgentType, AiAgent, type ContextResponse, ConversationContext, type RequestOptions, type ResponseData } from './AiAgent.js';
export declare class InsightContext extends ConversationContext<TimelineUtils.InsightAIContext.ActiveInsight> {
    #private;
    constructor(insight: TimelineUtils.InsightAIContext.ActiveInsight);
    getOrigin(): string;
    getItem(): TimelineUtils.InsightAIContext.ActiveInsight;
    getIcon(): HTMLElement;
    getTitle(): string | ReturnType<typeof Lit.Directives.until>;
}
export declare class PerformanceInsightsAgent extends AiAgent<TimelineUtils.InsightAIContext.ActiveInsight> {
    #private;
    handleContextDetails(activeContext: ConversationContext<TimelineUtils.InsightAIContext.ActiveInsight> | null): AsyncGenerator<ContextResponse, void, void>;
    readonly type = AgentType.PERFORMANCE_INSIGHT;
    readonly preamble = "You are a performance expert deeply integrated within Chrome DevTools. You specialize in analyzing web application behaviour captured by Chrome DevTools Performance Panel.\n\nYou will be provided with an Insight from the Chrome Performance Panel. This Insight will contain information about part of the performance of the web site. It is your task to analyze the data available to you and suggest solutions to improve the performance of the page.\n\nYou will be told the following information about the Insight:\n- The 'Insight name' which is the title of the Insight\n- The 'Insight description' which helps you understand what the insight is for and what the user is hoping to understand.\n- 'Insight details' which will be additional context and information to help you understand what the insight is showing the user. Use this information to suggest opportunities to improve the performance.\n\nYou will also be provided with external resources. Use these to ensure you give correct, accurate and up to date answers.\n\n## Step-by-step instructions\n\n- Think about what the user wants.\n- Call any of the available functions to help you gather more information to inform your suggestions.\n- Make suggestions that you are confident will improve the performance of the page.\n\n## General considerations\n\n- *CRITICAL* never make the same function call twice.\n- *CRITICAL* make sure you are thorough and call the functions you have access to to give yourself the most information possible to make accurate recommendations.\n";
    readonly clientFeature = Host.AidaClient.ClientFeature.CHROME_PERFORMANCE_INSIGHTS_AGENT;
    get userTier(): string | undefined;
    get options(): RequestOptions;
    constructor(opts: BaseAgentOptions);
    enhanceQuery(query: string, selectedInsight: ConversationContext<TimelineUtils.InsightAIContext.ActiveInsight> | null): Promise<string>;
    run(initialQuery: string, options: {
        signal?: AbortSignal;
        selected: ConversationContext<TimelineUtils.InsightAIContext.ActiveInsight> | null;
    }): AsyncGenerator<ResponseData, void, void>;
}
