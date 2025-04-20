import * as Host from '../../../core/host/host.js';
import * as Root from '../../../core/root/root.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Lit from '../../../ui/lit/lit.js';
import { ChangeManager } from '../ChangeManager.js';
import { type AgentOptions as BaseAgentOptions, AiAgent, type ContextResponse, ConversationContext, type ConversationSuggestion, type FunctionCallHandlerResult, type ParsedAnswer, type ParsedResponse, type RequestOptions } from './AiAgent.js';
declare function executeJsCode(functionDeclaration: string, { throwOnSideEffect }: {
    throwOnSideEffect: boolean;
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
    getIcon(): HTMLElement;
    getTitle(): string | ReturnType<typeof Lit.Directives.until>;
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
    protected emulateFunctionCall(aidaResponse: Host.AidaClient.AidaResponse): Host.AidaClient.AidaFunctionCallResponse | 'no-function-call' | 'wait-for-completion';
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
    enhanceQuery(query: string, selectedElement: ConversationContext<SDK.DOMModel.DOMNode> | null, hasImageInput?: boolean): Promise<string>;
    formatParsedAnswer({ answer }: ParsedAnswer): string;
}
export declare class StylingAgentWithFunctionCalling extends StylingAgent {
    functionCallEmulationEnabled: boolean;
    preamble: string;
}
export {};
