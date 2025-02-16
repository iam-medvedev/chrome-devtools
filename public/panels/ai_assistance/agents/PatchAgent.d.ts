import * as Host from '../../../core/host/host.js';
import type * as Workspace from '../../../models/workspace/workspace.js';
import type * as Lit from '../../../ui/lit/lit.js';
import { type AgentOptions as BaseAgentOptions, AgentType, AiAgent, type ContextResponse, ConversationContext, type RequestOptions, type ResponseData } from './AiAgent.js';
export declare class ProjectContext extends ConversationContext<Workspace.Workspace.Project> {
    #private;
    constructor(project: Workspace.Workspace.Project);
    getOrigin(): string;
    getItem(): Workspace.Workspace.Project;
    getIcon(): HTMLElement;
    getTitle(): string | ReturnType<typeof Lit.Directives.until>;
}
export declare class PatchAgent extends AiAgent<Workspace.Workspace.Project> {
    #private;
    handleContextDetails(_select: ConversationContext<Workspace.Workspace.Project> | null): AsyncGenerator<ContextResponse, void, void>;
    readonly type = AgentType.PATCH;
    readonly preamble: undefined;
    readonly clientFeature = Host.AidaClient.ClientFeature.CHROME_PATCH_AGENT;
    get userTier(): string | undefined;
    get options(): RequestOptions;
    constructor(opts: BaseAgentOptions);
    run(initialQuery: string, options: {
        signal?: AbortSignal;
        selected: ConversationContext<Workspace.Workspace.Project> | null;
    }): AsyncGenerator<ResponseData, void, void>;
}
