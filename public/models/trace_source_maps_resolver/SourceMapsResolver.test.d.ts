import type * as Protocol from '../../generated/protocol.js';
import { MockDebuggerBackend } from '../../testing/MockScopeChain.js';
export declare function loadCodeLocationResolvingScenario(backend: MockDebuggerBackend): Promise<{
    authoredScriptURL: string;
    genScriptURL: string;
    scriptId: Protocol.Runtime.ScriptId;
    ignoreListedURL: string;
    contentScriptURL: string;
    contentScriptId: Protocol.Runtime.ScriptId;
}>;
