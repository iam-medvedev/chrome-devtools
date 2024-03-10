import type * as Platform from '../../core/platform/platform.js';
import * as CodeMirror from '../../third_party/codemirror.next/codemirror.next.js';
export declare class SyntaxTree {
    readonly propertyValue: string;
    readonly rule: string;
    readonly tree: CodeMirror.SyntaxNode;
    readonly trailingNodes: CodeMirror.SyntaxNode[];
    readonly propertyName: string | undefined;
    constructor(propertyValue: string, rule: string, tree: CodeMirror.SyntaxNode, propertyName?: string, trailingNodes?: CodeMirror.SyntaxNode[]);
    text(node?: CodeMirror.SyntaxNode | null): string;
    textRange(from: CodeMirror.SyntaxNode, to: CodeMirror.SyntaxNode): string;
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
    iterateDeclaration(tree: CodeMirror.SyntaxNode): void;
    protected iterate(tree: CodeMirror.SyntaxNode): void;
    protected iterateExcludingSuccessors(tree: CodeMirror.SyntaxNode): void;
    protected enter(_node: SyntaxNodeRef): boolean;
    protected leave(_node: SyntaxNodeRef): void;
}
export declare class RenderingContext {
    readonly ast: SyntaxTree;
    readonly matchedResult: BottomUpTreeMatching;
    readonly cssControls?: CSSControlMap | undefined;
    readonly options: {
        readonly: boolean;
    };
    constructor(ast: SyntaxTree, matchedResult: BottomUpTreeMatching, cssControls?: CSSControlMap | undefined, options?: {
        readonly: boolean;
    });
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
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare abstract class MatcherBase<MatchT extends Constructor> implements Matcher {
    readonly createMatch: MatchFactory<MatchT>;
    constructor(createMatch: MatchFactory<MatchT>);
    accepts(_propertyName: string): boolean;
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
    hasUnresolvedVarsRange(from: CodeMirror.SyntaxNode, to: CodeMirror.SyntaxNode): boolean;
    getComputedText(node: CodeMirror.SyntaxNode): string;
    getComputedTextRange(from: CodeMirror.SyntaxNode, to: CodeMirror.SyntaxNode): string;
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
    constructor(ast: SyntaxTree, matchedResult: BottomUpTreeMatching, cssControls: CSSControlMap, options: {
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
}
export declare namespace ASTUtils {
    function siblings(node: CodeMirror.SyntaxNode | null): CodeMirror.SyntaxNode[];
    function children(node: CodeMirror.SyntaxNode | null): CodeMirror.SyntaxNode[];
    function declValue(node: CodeMirror.SyntaxNode): CodeMirror.SyntaxNode | null;
    function stripComments(nodes: CodeMirror.SyntaxNode[]): Generator<CodeMirror.SyntaxNode>;
    function split(nodes: CodeMirror.SyntaxNode[]): CodeMirror.SyntaxNode[][];
    function callArgs(node: CodeMirror.SyntaxNode): CodeMirror.SyntaxNode[][];
}
export declare abstract class AngleMatch implements Match {
    readonly text: string;
    readonly type: string;
    constructor(text: string);
    abstract render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
}
export declare class AngleMatcher extends MatcherBase<typeof AngleMatch> {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare abstract class ColorMixMatch implements Match {
    readonly text: string;
    readonly space: CodeMirror.SyntaxNode[];
    readonly color1: CodeMirror.SyntaxNode[];
    readonly color2: CodeMirror.SyntaxNode[];
    readonly type = "color-mix";
    constructor(text: string, space: CodeMirror.SyntaxNode[], color1: CodeMirror.SyntaxNode[], color2: CodeMirror.SyntaxNode[]);
    abstract render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
}
export declare class ColorMixMatcher extends MatcherBase<typeof ColorMixMatch> {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
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
export declare abstract class URLMatch implements Match {
    readonly url: Platform.DevToolsPath.UrlString;
    readonly text: string;
    readonly type = "url";
    constructor(url: Platform.DevToolsPath.UrlString, text: string);
    abstract render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
}
export declare class URLMatcher extends MatcherBase<typeof URLMatch> {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare abstract class ColorMatch implements Match {
    readonly text: string;
    readonly type = "color";
    constructor(text: string);
    abstract render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
}
export declare class ColorMatcher extends MatcherBase<typeof ColorMatch> {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare const enum LinkableNameProperties {
    Animation = "animation",
    AnimationName = "animation-name",
    FontPalette = "font-palette",
    PositionFallback = "position-fallback"
}
declare const enum AnimationLonghandPart {
    Direction = "direction",
    FillMode = "fill-mode",
    PlayState = "play-state",
    IterationCount = "iteration-count",
    EasingFunction = "easing-function"
}
export declare abstract class LinkableNameMatch implements Match {
    readonly text: string;
    readonly properyName: LinkableNameProperties;
    readonly type = "linkable-name";
    constructor(text: string, properyName: LinkableNameProperties);
    abstract render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
}
export declare class LinkableNameMatcher extends MatcherBase<typeof LinkableNameMatch> {
    private static isLinkableNameProperty;
    static readonly identifierAnimationLonghandMap: Map<string, AnimationLonghandPart>;
    private matchAnimationNameInShorthand;
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare abstract class BezierMatch implements Match {
    readonly text: string;
    readonly type: string;
    constructor(text: string);
    abstract render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
}
export declare class BezierMatcher extends MatcherBase<typeof BezierMatch> {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare abstract class StringMatch implements Match {
    readonly text: string;
    readonly type: string;
    constructor(text: string);
    abstract render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
}
export declare class StringMatcher extends MatcherBase<typeof StringMatch> {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare const enum ShadowType {
    BoxShadow = "boxShadow",
    TextShadow = "textShadow"
}
export declare abstract class ShadowMatch implements Match {
    readonly text: string;
    readonly shadowType: ShadowType;
    readonly type: string;
    constructor(text: string, shadowType: ShadowType);
    abstract render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
}
export declare class ShadowMatcher extends MatcherBase<typeof ShadowMatch> {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
type LegacyRegexHandler = (text: string, readonly: boolean) => Node | null;
export declare class LegacyRegexMatcher implements Matcher {
    readonly regexp: RegExp;
    readonly processor: LegacyRegexHandler;
    constructor(regexp: RegExp, processor: LegacyRegexHandler);
    accepts(): boolean;
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
export declare function tokenizeDeclaration(propertyName: string, propertyValue: string): SyntaxTree | null;
export declare function tokenizePropertyName(name: string): string | null;
export declare function renderPropertyValue(propertyName: string, propertyValue: string, matchers: Matcher[]): Node[];
export {};
