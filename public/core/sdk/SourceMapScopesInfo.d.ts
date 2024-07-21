import { type SourceMapV3Object } from './SourceMap.js';
import { type GeneratedRange, type OriginalPosition, type OriginalScope } from './SourceMapScopes.js';
export declare class SourceMapScopesInfo {
    #private;
    constructor(originalScopes: OriginalScope[], generatedRanges: GeneratedRange[]);
    static parseFromMap(sourceMap: Pick<SourceMapV3Object, 'names' | 'originalScopes' | 'generatedRanges'>): SourceMapScopesInfo;
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
}
