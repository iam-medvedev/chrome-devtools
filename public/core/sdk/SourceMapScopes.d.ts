/**
 * @fileoverview This file implements the current state of the "Scopes" proposal
 * for the source map spec.
 *
 * See https://github.com/tc39/source-map-rfc/blob/main/proposals/scopes.md.
 *
 * The proposal is still being worked on so we expect the implementation details
 * in this file to change frequently.
 */
import type * as Codec from '../../third_party/source-map-scopes-codec/source-map-scopes-codec.js';
import { type SourceMapV3Object } from './SourceMap.js';
export type OriginalScope = Codec.OriginalScope;
export type GeneratedRange = Codec.GeneratedRange;
export type Position = Codec.Position;
export type BindingRange = Codec.SubRangeBinding;
export type ScopeInfo = Codec.ScopeInfo;
/** @returns 0 if both positions are equal, a negative number if a < b and a positive number if a > b */
export declare function comparePositions(a: Position, b: Position): number;
export type OriginalPosition = Codec.OriginalPosition;
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
