/**
 * @fileoverview This file implements the current state of the "Scopes" proposal
 * for the source map spec.
 *
 * See https://github.com/tc39/source-map-rfc/blob/main/proposals/scopes.md.
 *
 * The proposal is still being worked on so we expect the implementation details
 * in this file to change frequently.
 */
import { type SourceMapV3Object } from './SourceMap.js';
/**
 * A scope in the authored source.
 */
export interface OriginalScope {
    start: Position;
    end: Position;
    /**
     * JavaScript-like languages are encouraged to use 'global', 'class', 'function' and 'block'.
     * Other languages might require language-specific scope kinds, in which case we'll print the
     * kind as-is.
     */
    kind?: string;
    name?: string;
    isStackFrame: boolean;
    variables: string[];
    children: OriginalScope[];
    parent?: OriginalScope;
}
/**
 * A range (can be a scope) in the generated JavaScript.
 */
export interface GeneratedRange {
    start: Position;
    end: Position;
    originalScope?: OriginalScope;
    /**
     * Whether this generated range is an actual JavaScript function in the generated code.
     */
    isStackFrame: boolean;
    /**
     * Whether calls to this generated range should be hidden from stack traces even if
     * this range has an `originalScope`.
     */
    isHidden: boolean;
    /**
     * If this `GeneratedRange` is the result of inlining `originalScope`, then `callsite`
     * refers to where `originalScope` was called in the original ("authored") code.
     */
    callsite?: OriginalPosition;
    /**
     * Expressions that compute the values of the variables of this OriginalScope. The length
     * of `values` must match the length of `originalScope.variables`.
     *
     * For each variable this can either be a single expression (valid for the full `GeneratedRange`),
     * or an array of `BindingRange`s, e.g. if computing the value requires different expressions
     * throughout the range or if the variable is only available in parts of the `GeneratedRange`.
     *
     * `undefined` denotes that the value of a variable is unavailble in the whole range.
     * This can happen e.g. if the variable was optimized out and can't be recomputed.
     */
    values: (string | undefined | BindingRange[])[];
    children: GeneratedRange[];
}
export interface BindingRange {
    value?: string;
    from: Position;
    to: Position;
}
export interface Position {
    line: number;
    column: number;
}
/** @returns 0 if both positions are equal, a negative number if a < b and a positive number if a > b */
export declare function comparePositions(a: Position, b: Position): number;
export interface OriginalPosition extends Position {
    sourceIndex: number;
}
interface OriginalScopeTree {
    readonly root: OriginalScope;
    readonly scopeForItemIndex: Map<number, OriginalScope>;
}
export declare function decodeScopes(map: Pick<SourceMapV3Object, 'names' | 'originalScopes' | 'generatedRanges'>, basePosition?: Position): {
    originalScopes: OriginalScope[];
    generatedRanges: GeneratedRange[];
};
export declare function decodeOriginalScopes(encodedOriginalScopes: string[], names: string[]): OriginalScopeTree[];
export declare const enum EncodedOriginalScopeFlag {
    HAS_NAME = 1,
    HAS_KIND = 2,
    IS_STACK_FRAME = 4
}
export declare function decodeGeneratedRanges(encodedGeneratedRange: string, originalScopeTrees: OriginalScopeTree[], names: string[], basePosition?: Position): GeneratedRange[];
export declare const enum EncodedGeneratedRangeFlag {
    HAS_DEFINITION = 1,
    HAS_CALLSITE = 2,
    IS_STACK_FRAME = 4,
    IS_HIDDEN = 8
}
export {};
