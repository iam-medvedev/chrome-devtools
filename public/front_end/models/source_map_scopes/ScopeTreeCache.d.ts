import type * as SDK from '../../core/sdk/sdk.js';
import * as Formatter from '../formatter/formatter.js';
type ScopeTreeNode = Formatter.FormatterWorkerPool.ScopeTreeNode;
/**
 * Caches scope trees for whole scripts.
 *
 * We use `SDK.Script` as a key to uniquely identify scripts.
 * `SDK.Script` boils down to "target" + "script ID". This duplicates work in case of
 * identitical script running on multiple targets (e.g. workers).
 */
export declare class ScopeTreeCache {
    #private;
    static instance(): ScopeTreeCache;
    scopeTreeForScript(script: SDK.Script.Script): Promise<ScopeTreeNode | null>;
}
export {};
