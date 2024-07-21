import * as SDK from '../core/sdk/sdk.js';
export declare function encodeVlq(n: number): string;
export declare function encodeVlqList(list: number[]): string;
export declare function encodeSourceMap(textMap: string[], sourceRoot?: string): SDK.SourceMap.SourceMapV3Object;
export declare class OriginalScopeBuilder {
    #private;
    /** The 'names' field of the SourceMap. The builder will modify it. */
    constructor(names: string[]);
    start(line: number, column: number, kind: SDK.SourceMapScopes.ScopeKind, name?: string, variables?: string[]): this;
    end(line: number, column: number): this;
    build(): string;
}
export declare class GeneratedRangeBuilder {
    #private;
    /** The 'names' field of the SourceMap. The builder will modify it. */
    constructor(names: string[]);
    start(line: number, column: number, options?: {
        isScope?: boolean;
        definition?: {
            sourceIdx: number;
            scopeIdx: number;
        };
        callsite?: {
            sourceIdx: number;
            line: number;
            column: number;
        };
        bindings?: (string | undefined | {
            line: number;
            column: number;
            name: string | undefined;
        }[])[];
    }): this;
    end(line: number, column: number): this;
    build(): string;
}
