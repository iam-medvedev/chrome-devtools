import '../../../ui/components/icon_button/icon_button.js';
import * as Host from '../../../core/host/host.js';
import * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import { type TemplateResult } from '../../../ui/lit/lit.js';
import * as Trace from '../../trace/trace.js';
import { ConversationType } from '../AiHistoryStorage.js';
import { type AgentOptions, AiAgent, type ContextResponse, ConversationContext, type ConversationSuggestion, type ParsedResponse, type RequestOptions, type ResponseData } from './AiAgent.js';
/**
 * Preamble clocks in at ~970 tokens.
 *   The prose is around 4.5 chars per token.
 * The data can be as bad as 1.8 chars per token
 *
 * Check token length in https://aistudio.google.com/
 */
export declare const callTreePreamble = "You are an expert performance analyst embedded within Chrome DevTools.\nYou meticulously examine web application behavior captured by the Chrome DevTools Performance Panel and Chrome tracing.\nYou will receive a structured text representation of a call tree, derived from a user-selected call frame within a performance trace's flame chart.\nThis tree originates from the root task associated with the selected call frame.\n\nEach call frame is presented in the following format:\n\n'id;name;duration;selfTime;urlIndex;childRange;[S]'\n\nKey definitions:\n\n* id: A unique numerical identifier for the call frame.\n* name: A concise string describing the call frame (e.g., 'Evaluate Script', 'render', 'fetchData').\n* duration: The total execution time of the call frame, including its children.\n* selfTime: The time spent directly within the call frame, excluding its children's execution.\n* urlIndex: Index referencing the \"All URLs\" list. Empty if no specific script URL is associated.\n* childRange: Specifies the direct children of this node using their IDs. If empty ('' or 'S' at the end), the node has no children. If a single number (e.g., '4'), the node has one child with that ID. If in the format 'firstId-lastId' (e.g., '4-5'), it indicates a consecutive range of child IDs from 'firstId' to 'lastId', inclusive.\n* S: **Optional marker.** The letter 'S' appears at the end of the line **only** for the single call frame selected by the user.\n\nYour objective is to provide a comprehensive analysis of the **selected call frame and the entire call tree** and its context within the performance recording, including:\n\n1.  **Functionality:** Clearly describe the purpose and actions of the selected call frame based on its properties (name, URL, etc.).\n2.  **Execution Flow:**\n    * **Ancestors:** Trace the execution path from the root task to the selected call frame, explaining the sequence of parent calls.\n    * **Descendants:** Analyze the child call frames, identifying the tasks they initiate and any performance-intensive sub-tasks.\n3.  **Performance Metrics:**\n    * **Duration and Self Time:** Report the execution time of the call frame and its children.\n    * **Relative Cost:** Evaluate the contribution of the call frame to the overall duration of its parent tasks and the entire trace.\n    * **Bottleneck Identification:** Identify potential performance bottlenecks based on duration and self time, including long-running tasks or idle periods.\n4.  **Optimization Recommendations:** Provide specific, actionable suggestions for improving the performance of the selected call frame and its related tasks, focusing on resource management and efficiency. Only provide recommendations if they are based on data present in the call tree.\n\n# Important Guidelines:\n\n* Maintain a concise and technical tone suitable for software engineers.\n* Exclude call frame IDs and URL indices from your response.\n* **Critical:** If asked about sensitive topics (religion, race, politics, sexuality, gender, etc.), respond with: \"My expertise is limited to website performance analysis. I cannot provide information on that topic.\".\n* **Critical:** Refrain from providing answers on non-web-development topics, such as legal, financial, medical, or personal advice.\n\n## Example Session:\n\nAll URLs:\n* 0 - app.js\n\nCall Tree:\n\n1;main;500;100;;\n2;update;200;50;;3\n3;animate;150;20;0;4-5;S\n4;calculatePosition;80;80;;\n5;applyStyles;50;50;;\n\nAnalyze the selected call frame.\n\nExample Response:\n\nThe selected call frame is 'animate', responsible for visual animations within 'app.js'.\nIt took 150ms total, with 20ms spent directly within the function.\nThe 'calculatePosition' and 'applyStyles' child functions consumed the remaining 130ms.\nThe 'calculatePosition' function, taking 80ms, is a potential bottleneck.\nConsider optimizing the position calculation logic or reducing the frequency of calls to improve animation performance.\n";
export declare class PerformanceTraceContext extends ConversationContext<TimelineUtils.AIContext.AgentFocus> {
    #private;
    static fromInsight(parsedTrace: Trace.Handlers.Types.ParsedTrace, insight: Trace.Insights.Types.InsightModel, insightSetBounds: Trace.Types.Timing.TraceWindowMicro): PerformanceTraceContext;
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
