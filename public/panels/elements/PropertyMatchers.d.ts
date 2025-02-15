import type * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as CodeMirror from '../../third_party/codemirror.next/codemirror.next.js';
type Match = SDK.CSSPropertyParser.Match;
type BottomUpTreeMatching = SDK.CSSPropertyParser.BottomUpTreeMatching;
export declare class AngleMatch implements SDK.CSSPropertyParser.Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(text: string, node: CodeMirror.SyntaxNode);
    computedText(): string;
}
declare const AngleMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<AngleMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
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
declare const ColorMixMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<ColorMixMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class ColorMixMatcher extends ColorMixMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class URLMatch implements Match {
    readonly url: Platform.DevToolsPath.UrlString;
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(url: Platform.DevToolsPath.UrlString, text: string, node: CodeMirror.SyntaxNode);
}
declare const URLMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<URLMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class URLMatcher extends URLMatcher_base {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class LinearGradientMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    constructor(text: string, node: CodeMirror.SyntaxNode);
}
declare const LinearGradientMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<LinearGradientMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class LinearGradientMatcher extends LinearGradientMatcher_base {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
    accepts(propertyName: string): boolean;
}
export declare class ColorMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    private readonly currentColorCallback?;
    computedText: (() => string | null) | undefined;
    constructor(text: string, node: CodeMirror.SyntaxNode, currentColorCallback?: (() => string | null) | undefined);
}
declare const ColorMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<ColorMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class ColorMatcher extends ColorMatcher_base {
    private readonly currentColorCallback?;
    constructor(currentColorCallback?: (() => string | null) | undefined);
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
declare const LightDarkColorMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<LightDarkColorMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class LightDarkColorMatcher extends LightDarkColorMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare const enum LinkableNameProperties {
    ANIMATION = "animation",
    ANIMATION_NAME = "animation-name",
    FONT_PALETTE = "font-palette",
    POSITION_TRY_FALLBACKS = "position-try-fallbacks",
    POSITION_TRY = "position-try"
}
declare const enum AnimationLonghandPart {
    DIRECTION = "direction",
    FILL_MODE = "fill-mode",
    PLAY_STATE = "play-state",
    ITERATION_COUNT = "iteration-count",
    EASING_FUNCTION = "easing-function"
}
export declare class LinkableNameMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly propertyName: LinkableNameProperties;
    constructor(text: string, node: CodeMirror.SyntaxNode, propertyName: LinkableNameProperties);
}
declare const LinkableNameMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<LinkableNameMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
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
declare const BezierMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<BezierMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
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
declare const StringMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<StringMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class StringMatcher extends StringMatcher_base {
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare const enum ShadowType {
    BOX_SHADOW = "boxShadow",
    TEXT_SHADOW = "textShadow"
}
export declare class ShadowMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly shadowType: ShadowType;
    constructor(text: string, node: CodeMirror.SyntaxNode, shadowType: ShadowType);
}
declare const ShadowMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<ShadowMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
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
declare const FontMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<FontMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class FontMatcher extends FontMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class FlexGridMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly isFlex: boolean;
    constructor(text: string, node: CodeMirror.SyntaxNode, isFlex: boolean);
}
declare const FlexGridMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<FlexGridMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class FlexGridMatcher extends FlexGridMatcher_base {
    static readonly FLEX: string[];
    static readonly GRID: string[];
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class GridTemplateMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly lines: CodeMirror.SyntaxNode[][];
    constructor(text: string, node: CodeMirror.SyntaxNode, lines: CodeMirror.SyntaxNode[][]);
}
declare const GridTemplateMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<GridTemplateMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class GridTemplateMatcher extends GridTemplateMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class AnchorFunctionMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly functionName: string | null;
    constructor(text: string, node: CodeMirror.SyntaxNode, functionName: string | null);
}
declare const AnchorFunctionMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<AnchorFunctionMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class AnchorFunctionMatcher extends AnchorFunctionMatcher_base {
    anchorFunction(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): string | null;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class PositionAnchorMatch implements Match {
    readonly text: string;
    readonly matching: BottomUpTreeMatching;
    readonly node: CodeMirror.SyntaxNode;
    constructor(text: string, matching: BottomUpTreeMatching, node: CodeMirror.SyntaxNode);
}
declare const PositionAnchorMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<PositionAnchorMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class PositionAnchorMatcher extends PositionAnchorMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class CSSWideKeywordMatch implements Match {
    readonly text: SDK.CSSMetadata.CSSWideKeyword;
    readonly node: CodeMirror.SyntaxNode;
    readonly property: SDK.CSSProperty.CSSProperty;
    readonly matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles;
    constructor(text: SDK.CSSMetadata.CSSWideKeyword, node: CodeMirror.SyntaxNode, property: SDK.CSSProperty.CSSProperty, matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles);
    resolveProperty(): SDK.CSSMatchedStyles.CSSValueSource | null;
    computedText?(): string | null;
}
declare const CSSWideKeywordMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<CSSWideKeywordMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class CSSWideKeywordMatcher extends CSSWideKeywordMatcher_base {
    readonly property: SDK.CSSProperty.CSSProperty;
    readonly matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles;
    constructor(property: SDK.CSSProperty.CSSProperty, matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles);
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export declare class PositionTryMatch implements Match {
    readonly text: string;
    readonly node: CodeMirror.SyntaxNode;
    readonly preamble: CodeMirror.SyntaxNode[];
    readonly fallbacks: CodeMirror.SyntaxNode[][];
    constructor(text: string, node: CodeMirror.SyntaxNode, preamble: CodeMirror.SyntaxNode[], fallbacks: CodeMirror.SyntaxNode[][]);
}
declare const PositionTryMatcher_base: new () => {
    matchType: SDK.CSSPropertyParser.Constructor<PositionTryMatch>;
    accepts(_propertyName: string): boolean;
    matches(_node: CodeMirror.SyntaxNode, _matching: SDK.CSSPropertyParser.BottomUpTreeMatching): SDK.CSSPropertyParser.Match | null;
};
export declare class PositionTryMatcher extends PositionTryMatcher_base {
    accepts(propertyName: string): boolean;
    matches(node: CodeMirror.SyntaxNode, matching: BottomUpTreeMatching): Match | null;
}
export {};
