import * as Host from '../../../core/host/host.js';
import type * as Workspace from '../../../models/workspace/workspace.js';
import { type AgentOptions as BaseAgentOptions, AgentType, AiAgent, type ContextResponse, type ConversationContext, type RequestOptions, type ResponseData } from './AiAgent.js';
export declare class PatchAgent extends AiAgent<Workspace.Workspace.Project> {
    #private;
    handleContextDetails(_select: ConversationContext<Workspace.Workspace.Project> | null): AsyncGenerator<ContextResponse, void, void>;
    readonly type = AgentType.PATCH;
    readonly preamble: undefined;
    readonly clientFeature = Host.AidaClient.ClientFeature.CHROME_PATCH_AGENT;
    get userTier(): string | undefined;
    get options(): RequestOptions;
    constructor(opts: BaseAgentOptions & {
        fileUpdateAgent?: FileUpdateAgent;
        project: Workspace.Workspace.Project;
    });
    applyChanges(changeSummary: string): AsyncGenerator<ResponseData, void, void>;
}
/**
 * This is an inner "agent" to apply a change to one file.
 */
export declare class FileUpdateAgent extends AiAgent<Workspace.Workspace.Project> {
    handleContextDetails(_select: ConversationContext<Workspace.Workspace.Project> | null): AsyncGenerator<ContextResponse, void, void>;
    readonly type = AgentType.PATCH;
    readonly preamble: undefined;
    readonly clientFeature = Host.AidaClient.ClientFeature.CHROME_PATCH_AGENT;
    get userTier(): string | undefined;
    get options(): RequestOptions;
}
