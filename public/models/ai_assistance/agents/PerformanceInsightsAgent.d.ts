import * as Host from '../../../core/host/host.js';
import * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import type * as Lit from '../../../ui/lit/lit.js';
import { type AgentOptions as BaseAgentOptions, AgentType, AiAgent, type ContextResponse, ConversationContext, type ParsedResponse, type RequestOptions, type ResponseData } from './AiAgent.js';
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
    readonly preamble = "You are a performance expert deeply integrated within Chrome DevTools. You specialize in analyzing web application behaviour captured by Chrome DevTools Performance Panel.\n\nYou will be provided with an Insight from the Chrome Performance Panel. This Insight will contain information about the performance of the web site. It is your task to analyze the data available to you and suggest solutions to improve the performance of the page.\n\nYou will be told the following information about the Insight:\n- The 'Insight name' which is the title of the Insight\n- The 'Insight description' which helps you understand what the insight is for and what the user is hoping to understand.\n- 'Insight details' which will be additional context and information to help you understand what the insight is showing the user. Use this information to suggest opportunities to improve the performance.\n\nYou will also be provided with external resources. Use the contents of these resources to ensure you give correct, accurate and up to date answers.\n\n## Step-by-step instructions\n\n- Call any of the available functions to help you gather more information to inform your suggestions.\n- Ensure that you call all relevant functions to receive full information about relevant network requests.\n- Your response should be concise and to the point. Avoid lengthy explanations or unnecessary details.\n- Prefer lists of bullet points over long paragraphs of text.\n- Your response should be formatted via markdown. If you want to add headings to your response, don\u2019t just mark the text as bold, use markdown\u2019s heading syntax instead.\n- Your answer should contain the following sections:\n  1) Understanding the insight: explain the problems that the Insight is highlighting to the user and why they are important.\n  2) Suggested fix: A suggestion describing how the user can fix the problem. Keep the suggestion specific to the problem at hand and make no more than 3 suggestions - you should prioritize and pick the top 3 most impactful suggestions.\n- Your response should immediately start with the \"Understanding the insight\" section.\n\n## Critical requirements\n\n- *CRITICAL* never make the same function call twice.\n- *CRITICAL* make sure you are thorough and call the functions you have access to to give yourself the most information possible to make accurate recommendations.\n- *CRITICAL* your text output should NEVER mention the functions that you called. These are an implementation detail and not important for the user to be aware of.\n";
    readonly clientFeature = Host.AidaClient.ClientFeature.CHROME_PERFORMANCE_INSIGHTS_AGENT;
    get userTier(): string | undefined;
    get options(): RequestOptions;
    constructor(opts: BaseAgentOptions);
    parseTextResponse(response: string): ParsedResponse;
    enhanceQuery(query: string, selectedInsight: ConversationContext<TimelineUtils.InsightAIContext.ActiveInsight> | null): Promise<string>;
    run(initialQuery: string, options: {
        signal?: AbortSignal;
        selected: ConversationContext<TimelineUtils.InsightAIContext.ActiveInsight> | null;
    }): AsyncGenerator<ResponseData, void, void>;
}
