import type { CallFrame, ScopeChainEntry } from './DebuggerModel.js';
import type { SourceMap } from './SourceMap.js';
import type { GeneratedRange, OriginalPosition, OriginalScope, Position } from './SourceMapScopes.js';
export declare class SourceMapScopesInfo {
    #private;
    constructor(sourceMap: SourceMap, originalScopes: OriginalScope[], generatedRanges: GeneratedRange[]);
    addOriginalScopes(scopes: Array<OriginalScope | undefined>): void;
    addGeneratedRanges(ranges: GeneratedRange[]): void;
    hasOriginalScopes(sourceIdx: number): boolean;
    addOriginalScopesAtIndex(sourceIdx: number, scope: OriginalScope): void;
    /**
     * Given a generated position, returns the original name of the surrounding function as well as
     * all the original function names that got inlined into the surrounding generated function and their
     * respective callsites in the original code (ordered from inner to outer).
     *
     * @returns a list with inlined functions. Every entry in the list has a callsite in the orignal code,
     * except the last function (since the last function didn't get inlined).
     */
    findInlinedFunctions(generatedLine: number, generatedColumn: number): InlineInfo;
    /**
     * Takes a V8 provided call frame and expands any inlined frames into virtual call frames.
     *
     * For call frames where nothing was inlined, the result contains only a single element,
     * the provided frame but with the original name.
     *
     * For call frames where we are paused in inlined code, this function returns a list of
     * call frames from "inner to outer". This is the call frame at index 0
     * signifies the top of this stack trace fragment.
     *
     * The rest are "virtual" call frames and will have an "inlineFrameIndex" set in ascending
     * order, so the condition `result[index] === result[index].inlineFrameIndex` always holds.
     */
    expandCallFrame(callFrame: CallFrame): CallFrame[];
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
    /**
     * Returns the authored function name of the function containing the provided generated position.
     */
    findOriginalFunctionName({ line, column }: Position): string | null;
}
/**
 * Represents the inlining information for a given generated position.
 *
 * It contains a list of all the inlined original functions at the generated position
 * as well as the original function name of the generated position's surrounding
 * function.
 *
 * The inlined functions are sorted from inner to outer (or top to bottom on the stack).
 */
export interface InlineInfo {
    inlinedFunctions: Array<{
        name: string;
        callsite: OriginalPosition;
    }>;
    originalFunctionName: string;
}
export declare function contains(range: Pick<GeneratedRange, 'start' | 'end'>, line: number, column: number): boolean;
