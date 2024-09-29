import type * as Protocol from '../../../generated/protocol.js';
export declare function loadCodeLocationResolvingScenario(): Promise<{
    authoredScriptURL: string;
    genScriptURL: string;
    scriptId: Protocol.Runtime.ScriptId;
}>;
