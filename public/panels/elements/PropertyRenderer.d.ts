import type * as SDK from '../../core/sdk/sdk.js';
import type * as CodeMirror from '../../third_party/codemirror.next/codemirror.next.js';
import { BottomUpTreeMatching, type Constructor, CSSControlMap, type Match, type Matcher, type StringMatch, StringMatcher, type SyntaxNodeRef, type SyntaxTree, TreeWalker, type URLMatch, URLMatcher } from './PropertyParser.js';
export interface MatchRenderer<MatchT extends Match> {
    matcher(): Matcher<MatchT>;
    render(match: MatchT, context: RenderingContext): Node[];
}
export declare class RenderingContext {
    readonly ast: SyntaxTree;
    readonly renderers: Map<Constructor<Match>, MatchRenderer<Match>>;
    readonly matchedResult: BottomUpTreeMatching;
    readonly cssControls?: CSSControlMap | undefined;
    readonly options: {
        readonly: boolean;
    };
    constructor(ast: SyntaxTree, renderers: Map<Constructor<Match>, MatchRenderer<Match>>, matchedResult: BottomUpTreeMatching, cssControls?: CSSControlMap | undefined, options?: {
        readonly: boolean;
    });
    addControl(cssType: string, control: HTMLElement): void;
}
export declare class Renderer extends TreeWalker {
    #private;
    constructor(ast: SyntaxTree, renderers: Map<Constructor<Match>, MatchRenderer<Match>>, matchedResult: BottomUpTreeMatching, cssControls: CSSControlMap, options: {
        readonly: boolean;
    });
    static render(nodeOrNodes: CodeMirror.SyntaxNode | CodeMirror.SyntaxNode[], context: RenderingContext): {
        nodes: Node[];
        cssControls: CSSControlMap;
    };
    static renderInto(nodeOrNodes: CodeMirror.SyntaxNode | CodeMirror.SyntaxNode[], context: RenderingContext, parent: Node): {
        nodes: Node[];
        cssControls: CSSControlMap;
    };
    renderedMatchForTest(_nodes: Node[], _match: Match): void;
    protected enter({ node }: SyntaxNodeRef): boolean;
    static renderNameElement(name: string): HTMLElement;
    static renderValueElement(propertyName: string, propertyValue: string, renderers: MatchRenderer<Match>[]): HTMLElement;
}
export declare class URLRenderer implements MatchRenderer<URLMatch> {
    private readonly rule;
    private readonly node;
    constructor(rule: SDK.CSSRule.CSSRule | null, node: SDK.DOMModel.DOMNode | null);
    render(match: URLMatch): Node[];
    matcher(): URLMatcher;
}
export declare class StringRenderer implements MatchRenderer<StringMatch> {
    render(match: StringMatch): Node[];
    matcher(): StringMatcher;
}
