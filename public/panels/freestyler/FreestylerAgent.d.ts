import * as Host from '../../core/host/host.js';
import * as SDK from '../../core/sdk/sdk.js';
import { type AidaRequestOptions, type ResponseData } from './AiAgent.js';
import { ChangeManager } from './ChangeManager.js';
export declare const FIX_THIS_ISSUE_PROMPT = "Fix this issue using JavaScript code execution";
declare function executeJsCode(code: string, { throwOnSideEffect }: {
    throwOnSideEffect: boolean;
}): Promise<string>;
type HistoryChunk = {
    text: string;
    entity: Host.AidaClient.Entity;
};
type CreateExtensionScopeFunction = (changes: ChangeManager) => {
    install(): Promise<void>;
    uninstall(): Promise<void>;
};
type AgentOptions = {
    aidaClient: Host.AidaClient.AidaClient;
    changeManager?: ChangeManager;
    confirmSideEffectForTest?: typeof Promise.withResolvers;
    serverSideLoggingEnabled?: boolean;
    createExtensionScope?: CreateExtensionScopeFunction;
    execJs?: typeof executeJsCode;
};
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export declare class FreestylerAgent {
    #private;
    static buildRequest(opts: AidaRequestOptions): Host.AidaClient.AidaRequest;
    static parseResponse(response: string): {
        thought?: string;
        title?: string;
        action?: string;
    } | {
        answer: string;
        suggestions: string[];
    };
    constructor(opts: AgentOptions);
    onPrimaryPageChanged(): void;
    get chatHistoryForTesting(): Array<HistoryChunk>;
    static describeElement(element: SDK.DOMModel.DOMNode): Promise<string>;
    run(query: string, options: {
        signal?: AbortSignal;
        selectedElement: SDK.DOMModel.DOMNode | null;
    }): AsyncGenerator<ResponseData, void, void>;
}
export {};
