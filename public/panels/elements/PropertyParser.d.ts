import * as CodeMirror from '../../third_party/codemirror.next/codemirror.next.js';
export declare class SyntaxTree {
    readonly propertyValue: string;
    readonly rule: string;
    readonly tree: CodeMirror.SyntaxNode;
    readonly trailingNodes: CodeMirror.SyntaxNode[];
    readonly propertyName: string | undefined;
    constructor(propertyValue: string, rule: string, tree: CodeMirror.SyntaxNode, propertyName?: string, trailingNodes?: CodeMirror.SyntaxNode[]);
    text(node?: CodeMirror.SyntaxNode): string;
    subtree(node: CodeMirror.SyntaxNode): SyntaxTree;
}
export interface SyntaxNodeRef {
    node: CodeMirror.SyntaxNode;
}
export declare abstract class TreeWalker {
    readonly ast: SyntaxTree;
    constructor(ast: SyntaxTree);
    static walkExcludingSuccessors<T extends TreeWalker, ArgTs extends unknown[]>(this: {
        new (ast: SyntaxTree, ...args: ArgTs): T;
    }, propertyValue: SyntaxTree, ...args: ArgTs): T;
    static walk<T extends TreeWalker, ArgTs extends unknown[]>(this: {
        new (ast: SyntaxTree, ...args: ArgTs): T;
    }, propertyValue: SyntaxTree, ...args: ArgTs): T;
    protected iterate(tree: CodeMirror.SyntaxNode): void;
    protected iterateExcludingSuccessors(tree: CodeMirror.SyntaxNode): void;
    protected enter(_node: SyntaxNodeRef): boolean;
    protected leave(_node: SyntaxNodeRef): void;
}
export declare class RenderingContext {
    readonly ast: SyntaxTree;
    readonly matchedResult: BottomUpTreeMatching;
    readonly cssControls?: CSSControlMap | undefined;
    constructor(ast: SyntaxTree, matchedResult: BottomUpTreeMatching, cssControls?: CSSControlMap | undefined);
    addControl(cssType: string, control: HTMLElement): void;
}
export interface Match {
    readonly text: string;
    readonly type: string;
    render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
    computedText?(): string | null;
}
type Constructor = (abstract new (...args: any[]) => any) | (new (...args: any[]) => any);
export type MatchFactory<MatchT extends Constructor> = (...args: ConstructorParameters<MatchT>) => InstanceType<MatchT>;
export interface Matcher {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare abstract class MatcherBase<MatchT extends Constructor> implements Matcher {
    readonly createMatch: MatchFactory<MatchT>;
    constructor(createMatch: MatchFactory<MatchT>);
    abstract matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class BottomUpTreeMatching extends TreeWalker {
    #private;
    readonly computedText: ComputedText;
    constructor(ast: SyntaxTree, matchers: Matcher[]);
    protected leave({ node }: SyntaxNodeRef): void;
    matchText(node: CodeMirror.SyntaxNode): void;
    getMatch(node: CodeMirror.SyntaxNode): Match | undefined;
    hasUnresolvedVars(node: CodeMirror.SyntaxNode): boolean;
    getComputedText(node: CodeMirror.SyntaxNode): string;
}
export declare class ComputedText {
    #private;
    readonly text: string;
    constructor(text: string);
    clear(): void;
    get chunkCount(): number;
    push(match: Match, offset: number): void;
    hasUnresolvedVars(begin: number, end: number): boolean;
    get(begin: number, end: number): string;
}
export declare function requiresSpace(a: string, b: string): boolean;
export declare function requiresSpace(a: Node[], b: Node[]): boolean;
export declare const CSSControlMap: {
    new (entries?: readonly (readonly [string, HTMLElement[]])[] | null | undefined): Map<string, HTMLElement[]>;
    new (iterable?: Iterable<readonly [string, HTMLElement[]]> | null | undefined): Map<string, HTMLElement[]>;
    readonly prototype: Map<any, any>;
    readonly [Symbol.species]: MapConstructor;
};
export type CSSControlMap = Map<string, HTMLElement[]>;
export declare class Renderer extends TreeWalker {
    #private;
    constructor(ast: SyntaxTree, matchedResult: BottomUpTreeMatching, cssControls: CSSControlMap);
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
}
export declare function children(node: CodeMirror.SyntaxNode): CodeMirror.SyntaxNode[];
export declare abstract class VariableMatch implements Match {
    readonly text: string;
    readonly name: string;
    readonly fallback: CodeMirror.SyntaxNode[];
    protected readonly matching: BottomUpTreeMatching;
    readonly type: string;
    constructor(text: string, name: string, fallback: CodeMirror.SyntaxNode[], matching: BottomUpTreeMatching);
    abstract render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
}
export declare class VariableMatcher extends MatcherBase<typeof VariableMatch> {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare abstract class ColorMatch implements Match {
    readonly text: string;
    readonly type = "color";
    constructor(text: string);
    abstract render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
}
export declare class ColorMatcher extends MatcherBase<typeof ColorMatch> {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class LegacyRegexMatcher implements Matcher {
    readonly regexp: RegExp;
    readonly processor: (text: string) => Node | null;
    constructor(regexp: RegExp, processor: (text: string) => Node | null);
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class TextMatch implements Match {
    readonly text: string;
    readonly isComment: boolean;
    readonly type = "text";
    computedText?: () => string;
    constructor(text: string, isComment: boolean);
    render(): Node[];
}
export declare function tokenizePropertyValue(propertyValue: string, propertyName?: string): SyntaxTree | null;
export declare function tokenizePropertyName(name: string): string | null;
export declare function renderPropertyValue(value: string, matchers: Matcher[], propertyName?: string): Node[];
export {};
