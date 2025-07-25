import * as Host from '../../../core/host/host.js';
import * as Root from '../../../core/root/root.js';
import * as SDK from '../../../core/sdk/sdk.js';
import { type TemplateResult } from '../../../ui/lit/lit.js';
import { ChangeManager } from '../ChangeManager.js';
import { type AgentOptions as BaseAgentOptions, AiAgent, type ContextResponse, ConversationContext, type ConversationSuggestion, type FunctionCallHandlerResult, MultimodalInputType, type ParsedAnswer, type ParsedResponse, type RequestOptions } from './AiAgent.js';
declare function executeJsCode(functionDeclaration: string, { throwOnSideEffect, contextNode }: {
    throwOnSideEffect: boolean;
    contextNode: SDK.DOMModel.DOMNode | null;
}): Promise<string>;
type CreateExtensionScopeFunction = (changes: ChangeManager) => {
    install(): Promise<void>;
    uninstall(): Promise<void>;
};
interface AgentOptions extends BaseAgentOptions {
    changeManager?: ChangeManager;
    createExtensionScope?: CreateExtensionScopeFunction;
    execJs?: typeof executeJsCode;
}
export declare class NodeContext extends ConversationContext<SDK.DOMModel.DOMNode> {
    #private;
    constructor(node: SDK.DOMModel.DOMNode);
    getOrigin(): string;
    getItem(): SDK.DOMModel.DOMNode;
    getIcon(): undefined;
    getTitle(opts: {
        disabled: boolean;
    }): string | TemplateResult;
    getSuggestions(): Promise<[ConversationSuggestion, ...ConversationSuggestion[]] | undefined>;
}
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export declare class StylingAgent extends AiAgent<SDK.DOMModel.DOMNode> {
    #private;
    protected functionCallEmulationEnabled: boolean;
    preamble: string;
    readonly clientFeature = Host.AidaClient.ClientFeature.CHROME_STYLING_AGENT;
    get userTier(): string | undefined;
    get executionMode(): Root.Runtime.HostConfigFreestylerExecutionMode;
    get options(): RequestOptions;
    get multimodalInputEnabled(): boolean;
    parseTextResponse(text: string): ParsedResponse;
    constructor(opts: AgentOptions);
    onPrimaryPageChanged(): void;
    protected emulateFunctionCall(aidaResponse: Host.AidaClient.DoConversationResponse): Host.AidaClient.AidaFunctionCallResponse | 'no-function-call' | 'wait-for-completion';
    generateObservation(action: string, { throwOnSideEffect, }: {
        throwOnSideEffect: boolean;
    }): Promise<{
        observation: string;
        sideEffect: boolean;
        canceled: boolean;
    }>;
    static describeElement(element: SDK.DOMModel.DOMNode): Promise<string>;
    executeAction(action: string, options?: {
        signal?: AbortSignal;
        approved?: boolean;
    }): Promise<FunctionCallHandlerResult<unknown>>;
    handleContextDetails(selectedElement: ConversationContext<SDK.DOMModel.DOMNode> | null): AsyncGenerator<ContextResponse, void, void>;
    enhanceQuery(query: string, selectedElement: ConversationContext<SDK.DOMModel.DOMNode> | null, multimodalInputType?: MultimodalInputType): Promise<string>;
    formatParsedAnswer({ answer }: ParsedAnswer): string;
}
export declare class StylingAgentWithFunctionCalling extends StylingAgent {
    functionCallEmulationEnabled: boolean;
    preamble: string;
    formatParsedAnswer({ answer }: ParsedAnswer): string;
    preambleFeatures(): string[];
    parseTextResponse(text: string): ParsedResponse;
}
export {};
