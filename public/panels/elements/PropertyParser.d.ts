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
export interface Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    computedText?(): string | null;
}
export type Constructor<T = any> = (abstract new (...args: any[]) => T) | (new (...args: any[]) => T);
export interface Matcher<MatchT extends Match> {
    readonly matchType: Constructor<MatchT>;
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class BottomUpTreeMatching extends TreeWalker {
    #private;
    readonly computedText: ComputedText;
    constructor(ast: SyntaxTree, matchers: Matcher<Match>[]);
    protected leave({ node }: SyntaxNodeRef): void;
    matchText(node: CodeMirror.SyntaxNode): void;
    getMatch(node: CodeMirror.SyntaxNode): Match | undefined;
    hasUnresolvedVars(node: CodeMirror.SyntaxNode): boolean;
    hasUnresolvedVarsRange(from: CodeMirror.SyntaxNode, to: CodeMirror.SyntaxNode): boolean;
    getComputedText(node: CodeMirror.SyntaxNode, substitutions?: Map<Match, string>): string;
    getComputedTextRange(from: CodeMirror.SyntaxNode, to: CodeMirror.SyntaxNode, substitutions?: Map<Match, string>): string;
}
export declare class ComputedText {
    #private;
    readonly text: string;
    constructor(text: string);
    clear(): void;
    get chunkCount(): number;
    push(match: Match, offset: number): void;
    hasUnresolvedVars(begin: number, end: number): boolean;
    get(begin: number, end: number, substitutions?: Map<Match, string>): string;
}
export declare function requiresSpace(a: string, b: string): boolean;
export declare function requiresSpace(a: Node[], b: Node[]): boolean;
export declare const CSSControlMap: {
    new (entries?: readonly (readonly [string, HTMLElement[]])[] | null | undefined): Map<string, HTMLElement[]>;
    new (iterable?: Iterable<readonly [string, HTMLElement[]]> | null | undefined): Map<string, HTMLElement[]>;
    readonly prototype: Map<any, any>;
    groupBy<K, T>(items: Iterable<T>, keySelector: (item: T, index: number) => K): Map<K, T[]>;
    readonly [Symbol.species]: MapConstructor;
};
export type CSSControlMap = Map<string, HTMLElement[]>;
export declare namespace ASTUtils {
    function siblings(node: CodeMirror.SyntaxNode | null): CodeMirror.SyntaxNode[];
    function children(node: CodeMirror.SyntaxNode | null): CodeMirror.SyntaxNode[];
    function declValue(node: CodeMirror.SyntaxNode): CodeMirror.SyntaxNode | null;
    function stripComments(nodes: CodeMirror.SyntaxNode[]): Generator<CodeMirror.SyntaxNode>;
    function split(nodes: CodeMirror.SyntaxNode[]): CodeMirror.SyntaxNode[][];
    function callArgs(node: CodeMirror.SyntaxNode): CodeMirror.SyntaxNode[][];
}
export declare class AngleMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(text: string, node: CodeMirror.SyntaxNode);
    computedText(): string;
}
declare const AngleMatcher_base: {
    new (): {
        matchType: Constructor<AngleMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class AngleMatcher extends AngleMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class ColorMixMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly space: CodeMirror.SyntaxNode[];
    readonly color1: CodeMirror.SyntaxNode[];
    readonly color2: CodeMirror.SyntaxNode[];
    constructor(text: string, node: CodeMirror.SyntaxNode, space: CodeMirror.SyntaxNode[], color1: CodeMirror.SyntaxNode[], color2: CodeMirror.SyntaxNode[]);
}
declare const ColorMixMatcher_base: {
    new (): {
        matchType: Constructor<ColorMixMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class ColorMixMatcher extends ColorMixMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class VariableMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly name: string;
    readonly fallback: CodeMirror.SyntaxNode[];
    readonly matching: BottomUpTreeMatching;
    readonly computedTextCallback: (match: VariableMatch, matching: BottomUpTreeMatching) => string | null;
    constructor(text: string, node: CodeMirror.SyntaxNode, name: string, fallback: CodeMirror.SyntaxNode[], matching: BottomUpTreeMatching, computedTextCallback: (match: VariableMatch, matching: BottomUpTreeMatching) => string | null);
    computedText(): string | null;
}
declare const VariableMatcher_base: {
    new (): {
        matchType: Constructor<VariableMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class VariableMatcher extends VariableMatcher_base {
    #private;
    constructor(computedTextCallback: (match: VariableMatch, matching: BottomUpTreeMatching) => string | null);
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class URLMatch implements Match {
    readonly url: Platform.DevToolsPath.UrlString;
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(url: Platform.DevToolsPath.UrlString, text: string, node: CodeMirror.SyntaxNode);
}
declare const URLMatcher_base: {
    new (): {
        matchType: Constructor<URLMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class URLMatcher extends URLMatcher_base {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class LinearGradientMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(text: string, node: CodeMirror.SyntaxNode);
}
declare const LinearGradientMatcher_base: {
    new (): {
        matchType: Constructor<LinearGradientMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class LinearGradientMatcher extends LinearGradientMatcher_base {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
    accepts(propertyName: string): boolean;
}
export declare class ColorMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(text: string, node: CodeMirror.SyntaxNode);
}
declare const ColorMatcher_base: {
    new (): {
        matchType: Constructor<ColorMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class ColorMatcher extends ColorMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class LightDarkColorMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly light: CodeMirror.SyntaxNode[];
    readonly dark: CodeMirror.SyntaxNode[];
    constructor(text: string, node: CodeMirror.SyntaxNode, light: CodeMirror.SyntaxNode[], dark: CodeMirror.SyntaxNode[]);
}
declare const LightDarkColorMatcher_base: {
    new (): {
        matchType: Constructor<LightDarkColorMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class LightDarkColorMatcher extends LightDarkColorMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare const enum LinkableNameProperties {
    Animation = "animation",
    AnimationName = "animation-name",
    FontPalette = "font-palette",
    PositionFallback = "position-fallback",
    PositionTryOptions = "position-try-options",
    PositionTry = "position-try"
}
declare const enum AnimationLonghandPart {
    Direction = "direction",
    FillMode = "fill-mode",
    PlayState = "play-state",
    IterationCount = "iteration-count",
    EasingFunction = "easing-function"
}
export declare class LinkableNameMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly properyName: LinkableNameProperties;
    constructor(text: string, node: CodeMirror.SyntaxNode, properyName: LinkableNameProperties);
}
declare const LinkableNameMatcher_base: {
    new (): {
        matchType: Constructor<LinkableNameMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class LinkableNameMatcher extends LinkableNameMatcher_base {
    private static isLinkableNameProperty;
    static readonly identifierAnimationLonghandMap: Map<string, AnimationLonghandPart>;
    private matchAnimationNameInShorthand;
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class BezierMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(text: string, node: CodeMirror.SyntaxNode);
}
declare const BezierMatcher_base: {
    new (): {
        matchType: Constructor<BezierMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class BezierMatcher extends BezierMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class StringMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(text: string, node: CodeMirror.SyntaxNode);
}
declare const StringMatcher_base: {
    new (): {
        matchType: Constructor<StringMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class StringMatcher extends StringMatcher_base {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare const enum ShadowType {
    BoxShadow = "boxShadow",
    TextShadow = "textShadow"
}
export declare class ShadowMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly shadowType: ShadowType;
    constructor(text: string, node: CodeMirror.SyntaxNode, shadowType: ShadowType);
}
declare const ShadowMatcher_base: {
    new (): {
        matchType: Constructor<ShadowMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class ShadowMatcher extends ShadowMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class FontMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(text: string, node: CodeMirror.SyntaxNode);
}
declare const FontMatcher_base: {
    new (): {
        matchType: Constructor<FontMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class FontMatcher extends FontMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class LengthMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(text: string, node: CodeMirror.SyntaxNode);
}
declare const LengthMatcher_base: {
    new (): {
        matchType: Constructor<LengthMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class LengthMatcher extends LengthMatcher_base {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class TextMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    computedText?: () => string;
    constructor(text: string, node: CodeMirror.SyntaxNode);
    render(): Node[];
}
export declare class GridTemplateMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly lines: CodeMirror.SyntaxNode[][];
    constructor(text: string, node: CodeMirror.SyntaxNode, lines: CodeMirror.SyntaxNode[][]);
}
declare const GridTemplateMatcher_base: {
    new (): {
        matchType: Constructor<GridTemplateMatch>;
        accepts(_propertyName: string): boolean;
        matches(_node: CodeMirror.SyntaxNode, _matching: BottomUpTreeMatching): Match | null;
    };
};
export declare class GridTemplateMatcher extends GridTemplateMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare function tokenizeDeclaration(propertyName: string, propertyValue: string): SyntaxTree | null;
export declare function tokenizePropertyName(name: string): string | null;
export {};
