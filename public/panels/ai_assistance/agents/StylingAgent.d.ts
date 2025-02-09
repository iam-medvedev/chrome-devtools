import * as Host from '../../../core/host/host.js';
import * as Root from '../../../core/root/root.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Lit from '../../../ui/lit/lit.js';
import { ChangeManager } from '../ChangeManager.js';
import { type ActionResponse, type AgentOptions as BaseAgentOptions, AgentType, AiAgent, type ContextResponse, ConversationContext, type FunctionCallHandlerResult, type ParsedAnswer, type ParsedResponse, type RequestOptions, type SideEffectResponse } from './AiAgent.js';
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
}
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export declare class StylingAgent extends AiAgent<SDK.DOMModel.DOMNode> {
    #private;
    readonly type = AgentType.STYLING;
    preamble: string;
    readonly clientFeature = Host.AidaClient.ClientFeature.CHROME_STYLING_AGENT;
    get userTier(): string | undefined;
    get executionMode(): Root.Runtime.HostConfigFreestylerExecutionMode;
    get options(): RequestOptions;
    parseResponse(response: Host.AidaClient.AidaResponse): ParsedResponse;
    changes: ChangeManager;
    createExtensionScope: CreateExtensionScopeFunction;
    constructor(opts: AgentOptions);
    onPrimaryPageChanged(): void;
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
    handleAction(action: string, options?: {
        signal?: AbortSignal;
    }): AsyncGenerator<SideEffectResponse, ActionResponse, void>;
    handleContextDetails(selectedElement: ConversationContext<SDK.DOMModel.DOMNode> | null): AsyncGenerator<ContextResponse, void, void>;
    enhanceQuery(query: string, selectedElement: ConversationContext<SDK.DOMModel.DOMNode> | null): Promise<string>;
    formatParsedAnswer({ answer }: ParsedAnswer): string;
}
export declare class StylingAgentWithFunctionCalling extends StylingAgent {
    preamble: string;
    constructor(opts: AgentOptions);
    parseResponse(response: Host.AidaClient.AidaResponse): ParsedResponse;
}
export {};
