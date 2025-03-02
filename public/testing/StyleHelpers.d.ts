import * as SDK from '../core/sdk/sdk.js';
import * as Protocol from '../generated/protocol.js';
export declare function getMatchedStylesWithStylesheet(cssModel: SDK.CSSModel.CSSModel, origin: Protocol.CSS.StyleSheetOrigin, styleSheetId: Protocol.CSS.StyleSheetId, header: Partial<Protocol.CSS.CSSStyleSheetHeader>, payload?: Partial<SDK.CSSMatchedStyles.CSSMatchedStylesPayload>): Promise<SDK.CSSMatchedStyles.CSSMatchedStyles>;
export declare function getMatchedStylesWithBlankRule(cssModel: SDK.CSSModel.CSSModel, selector?: string, range?: Protocol.CSS.SourceRange | undefined, origin?: Protocol.CSS.StyleSheetOrigin, styleSheetId?: Protocol.CSS.StyleSheetId, payload?: Partial<SDK.CSSMatchedStyles.CSSMatchedStylesPayload>): Promise<SDK.CSSMatchedStyles.CSSMatchedStyles>;
export declare function createCSSStyle(cssProperties: Protocol.CSS.CSSProperty[], range?: Protocol.CSS.SourceRange, styleSheetId?: Protocol.CSS.StyleSheetId): Protocol.CSS.CSSStyle;
export declare function ruleMatch(selectorOrList: string | Protocol.CSS.SelectorList, properties: Protocol.CSS.CSSProperty[] | Record<string, string>, options?: {
    range?: Protocol.CSS.SourceRange;
    origin?: Protocol.CSS.StyleSheetOrigin;
    styleSheetId?: Protocol.CSS.StyleSheetId;
    /** Matches all selectors if undefined */
    matchingSelectorsIndexes?: number[];
    nestingSelectors?: string[];
}): Protocol.CSS.RuleMatch;
export declare function getMatchedStylesWithProperties(cssModel: SDK.CSSModel.CSSModel, properties: Protocol.CSS.CSSProperty[] | Record<string, string>, selector?: string, range?: Protocol.CSS.SourceRange | undefined, origin?: Protocol.CSS.StyleSheetOrigin, styleSheetId?: Protocol.CSS.StyleSheetId, payload?: Partial<SDK.CSSMatchedStyles.CSSMatchedStylesPayload>): Promise<SDK.CSSMatchedStyles.CSSMatchedStyles>;
export declare function getMatchedStyles(payload?: Partial<SDK.CSSMatchedStyles.CSSMatchedStylesPayload>): Promise<SDK.CSSMatchedStyles.CSSMatchedStyles>;
