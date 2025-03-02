import * as SDK from '../../core/sdk/sdk.js';
import type * as CodeMirror from '../../third_party/codemirror.next/codemirror.next.js';
export interface MatchRenderer<MatchT extends SDK.CSSPropertyParser.Match> {
    readonly matchType: SDK.CSSPropertyParser.Constructor<MatchT>;
    render(match: MatchT, context: RenderingContext): Node[];
}
export declare function rendererBase<MatchT extends SDK.CSSPropertyParser.Match>(matchT: SDK.CSSPropertyParser.Constructor<MatchT>): abstract new () => {
    readonly matchType: SDK.CSSPropertyParser.Constructor<MatchT>;
    render(_match: MatchT, _context: RenderingContext): Node[];
};
export declare class TracingContext {
    #private;
    constructor(matchedResult?: SDK.CSSPropertyParser.BottomUpTreeMatching);
    renderingContext(context: RenderingContext): RenderingContext;
    nextSubstitution(): boolean;
    nextEvaluation(): boolean;
    didApplyEvaluations(): boolean;
    evaluation(args: unknown[]): TracingContext[] | null;
    applyEvaluation(children: TracingContext[]): boolean;
    substitution(): TracingContext | null;
}
export declare class RenderingContext {
    readonly ast: SDK.CSSPropertyParser.SyntaxTree;
    readonly renderers: Map<SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParser.Match>, MatchRenderer<SDK.CSSPropertyParser.Match>>;
    readonly matchedResult: SDK.CSSPropertyParser.BottomUpTreeMatching;
    readonly cssControls?: SDK.CSSPropertyParser.CSSControlMap | undefined;
    readonly options: {
        readonly?: boolean;
    };
    readonly tracing?: TracingContext | undefined;
    constructor(ast: SDK.CSSPropertyParser.SyntaxTree, renderers: Map<SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParser.Match>, MatchRenderer<SDK.CSSPropertyParser.Match>>, matchedResult: SDK.CSSPropertyParser.BottomUpTreeMatching, cssControls?: SDK.CSSPropertyParser.CSSControlMap | undefined, options?: {
        readonly?: boolean;
    }, tracing?: TracingContext | undefined);
    addControl(cssType: string, control: HTMLElement): void;
}
export declare class Renderer extends SDK.CSSPropertyParser.TreeWalker {
    #private;
    constructor(ast: SDK.CSSPropertyParser.SyntaxTree, renderers: Map<SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParser.Match>, MatchRenderer<SDK.CSSPropertyParser.Match>>, matchedResult: SDK.CSSPropertyParser.BottomUpTreeMatching, cssControls: SDK.CSSPropertyParser.CSSControlMap, options: {
        readonly?: boolean;
    }, tracing: TracingContext | undefined);
    static render(nodeOrNodes: CodeMirror.SyntaxNode | CodeMirror.SyntaxNode[], context: RenderingContext): {
        nodes: Node[];
        cssControls: SDK.CSSPropertyParser.CSSControlMap;
    };
    static renderInto(nodeOrNodes: CodeMirror.SyntaxNode | CodeMirror.SyntaxNode[], context: RenderingContext, parent: Node): {
        nodes: Node[];
        cssControls: SDK.CSSPropertyParser.CSSControlMap;
    };
    renderedMatchForTest(_nodes: Node[], _match: SDK.CSSPropertyParser.Match): void;
    protected enter({ node }: SDK.CSSPropertyParser.SyntaxNodeRef): boolean;
    static renderNameElement(name: string): HTMLElement;
    static renderValueElement(name: string, value: string, matchedResult: SDK.CSSPropertyParser.BottomUpTreeMatching | null, renderers: Array<MatchRenderer<SDK.CSSPropertyParser.Match>>, tracing?: TracingContext): {
        valueElement: HTMLElement;
        cssControls: SDK.CSSPropertyParser.CSSControlMap;
    };
}
declare const URLRenderer_base: abstract new () => {
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.URLMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.URLMatch, _context: RenderingContext): Node[];
};
export declare class URLRenderer extends URLRenderer_base {
    private readonly rule;
    private readonly node;
    constructor(rule: SDK.CSSRule.CSSRule | null, node: SDK.DOMModel.DOMNode | null);
    render(match: SDK.CSSPropertyParserMatchers.URLMatch): Node[];
}
declare const StringRenderer_base: abstract new () => {
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.StringMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.StringMatch, _context: RenderingContext): Node[];
};
export declare class StringRenderer extends StringRenderer_base {
    render(match: SDK.CSSPropertyParserMatchers.StringMatch): Node[];
}
declare const BinOpRenderer_base: abstract new () => {
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.BinOpMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.BinOpMatch, _context: RenderingContext): Node[];
};
export declare class BinOpRenderer extends BinOpRenderer_base {
    render(match: SDK.CSSPropertyParserMatchers.BinOpMatch, context: RenderingContext): Node[];
}
export {};
