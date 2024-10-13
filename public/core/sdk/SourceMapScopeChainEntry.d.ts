import type { CallFrame, LocationRange, ScopeChainEntry } from './DebuggerModel.js';
import { type RemoteObject, RemoteObjectProperty } from './RemoteObject.js';
import type { GeneratedRange, OriginalScope } from './SourceMapScopes.js';
export declare class SourceMapScopeChainEntry implements ScopeChainEntry {
    #private;
    /**
     * @param isInnerMostFunction If `scope` is the innermost 'function' scope. Only used for labeling as we name the
     * scope of the paused function 'Local', while other outer 'function' scopes are named 'Closure'.
     */
    constructor(callFrame: CallFrame, scope: OriginalScope, range: GeneratedRange | undefined, isInnerMostFunction: boolean, returnValue: RemoteObject | undefined);
    extraProperties(): RemoteObjectProperty[];
    callFrame(): CallFrame;
    type(): string;
    typeName(): string;
    name(): string | undefined;
    range(): LocationRange | null;
    object(): RemoteObject;
    description(): string;
    icon(): string | undefined;
}
