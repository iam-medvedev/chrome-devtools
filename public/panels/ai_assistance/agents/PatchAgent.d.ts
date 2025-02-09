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
    readonly preamble = "You are responsible for changing the source code on behalf of the user.\nThe user query defines what changes are to be made.\nYou have a number of functions to get information about source files in the project.\nUse those functions to fulfill the user query.\n\n## Step-by-step instructions\n\n- Think about what the user wants.\n- List all files in the project or search for relevant files.\n- Identify the files that are likely to be modified.\n- Retrieve the content of those files.\n- Rewrite the files according to the user query.\n\n## General considerations\n\n- Avoid requesting too many files.\n- Always prefer changing the true source files and not the build output.\n- The build output is usually in dist/, out/, build/ folders.\n- *CRITICAL* never make the same function call twice.\n- *CRITICAL* do not make any changes if not prompted.\n\nInstead of using the writeFile function you can also produce  the following diff format:\n\n```\nsrc/index.html\n<meta charset=\"utf-8\">\n<title>Test</title>\n```\n\nFirst output the filename (example, src/index.html), then output the SEARCH block,\nfollowed by the REPLACE block.\n\n";
    readonly clientFeature = Host.AidaClient.ClientFeature.CHROME_PATCH_AGENT;
    get userTier(): string | undefined;
    get options(): RequestOptions;
    constructor(opts: BaseAgentOptions);
    run(initialQuery: string, options: {
        signal?: AbortSignal;
        selected: ConversationContext<Workspace.Workspace.Project> | null;
    }): AsyncGenerator<ResponseData, void, void>;
}
