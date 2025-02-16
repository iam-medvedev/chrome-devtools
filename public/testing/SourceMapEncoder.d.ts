import * as SDK from '../core/sdk/sdk.js';
export declare function encodeVlq(n: number): string;
export declare function encodeVlqList(list: number[]): string;
export declare function encodeSourceMap(textMap: string[], sourceRoot?: string): SDK.SourceMap.SourceMapV3Object;
export declare class OriginalScopeBuilder {
    #private;
    /** The 'names' field of the SourceMap. The builder will modify it. */
    constructor(names: string[]);
    start(line: number, column: number, options?: {
        name?: string;
        kind?: string;
        isStackFrame?: boolean;
        variables?: string[];
    }): this;
    end(line: number, column: number): this;
    build(): string;
}
export declare class GeneratedRangeBuilder {
    #private;
    /** The 'names' field of the SourceMap. The builder will modify it. */
    constructor(names: string[]);
    start(line: number, column: number, options?: {
        isStackFrame?: boolean;
        isHidden?: boolean;
        definition?: {
            sourceIdx: number;
            scopeIdx: number;
        };
        callsite?: {
            sourceIdx: number;
            line: number;
            column: number;
        };
        bindings?: Array<string | undefined | Array<{
            line: number;
            column: number;
            name: string | undefined;
        }>>;
    }): this;
    end(line: number, column: number): this;
    build(): string;
}
