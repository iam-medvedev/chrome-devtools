import { type CallFrame, type ScopeChainEntry } from './DebuggerModel.js';
import { type SourceMap, type SourceMapV3Object } from './SourceMap.js';
import { type GeneratedRange, type OriginalPosition, type OriginalScope } from './SourceMapScopes.js';
export declare class SourceMapScopesInfo {
    #private;
    constructor(sourceMap: SourceMap, originalScopes: OriginalScope[], generatedRanges: GeneratedRange[]);
    static parseFromMap(sourceMap: SourceMap, sourceMapJson: Pick<SourceMapV3Object, 'names' | 'originalScopes' | 'generatedRanges'>): SourceMapScopesInfo;
    /**
     * Given a generated position, returns the original name of the surrounding function as well as
     * all the original function names that got inlined into the surrounding generated function and their
     * respective callsites in the original code (ordered from inner to outer).
     *
     * @returns a list with inlined functions. Every entry in the list has a callsite in the orignal code,
     * except the last function (since the last function didn't get inlined).
     */
    findInlinedFunctions(generatedLine: number, generatedColumn: number): {
        name: string;
        callsite?: OriginalPosition;
    }[];
    /**
     * @returns true if we have enough info (i.e. variable and binding expressions) to build
     * a scope view.
     */
    hasVariablesAndBindings(): boolean;
    /**
     * Constructs a scope chain based on the CallFrame's paused position.
     *
     * The algorithm to obtain the original scope chain is straight-forward:
     *
     *   1) Find the inner-most generated range that contains the CallFrame's
     *      paused position.
     *
     *   2) Does the found range have an associated original scope?
     *
     *      2a) If no, return null. This is a "hidden" range and technically
     *          we shouldn't be pausing here in the first place. This code doesn't
     *          correspond to anything in the authored code.
     *
     *      2b) If yes, the associated original scope is the inner-most
     *          original scope in the resulting scope chain.
     *
     *   3) Walk the parent chain of the found original scope outwards. This is
     *      our scope view. For each original scope we also try to find a
     *      corresponding generated range that contains the CallFrame's
     *      paused position. We need the generated range to resolve variable
     *      values.
     */
    resolveMappedScopeChain(callFrame: CallFrame): ScopeChainEntry[] | null;
}
export declare function contains(range: Pick<GeneratedRange, 'start' | 'end'>, line: number, column: number): boolean;
