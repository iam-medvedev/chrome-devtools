import * as SDK from '../core/sdk/sdk.js';
import type * as Protocol from '../generated/protocol.js';
export declare function getMatchedStylesWithStylesheet(cssModel: SDK.CSSModel.CSSModel, origin: Protocol.CSS.StyleSheetOrigin, styleSheetId: Protocol.CSS.StyleSheetId, header: Partial<Protocol.CSS.CSSStyleSheetHeader>, payload?: Partial<SDK.CSSMatchedStyles.CSSMatchedStylesPayload>): Promise<SDK.CSSMatchedStyles.CSSMatchedStyles>;
export declare function getMatchedStyles(payload?: Partial<SDK.CSSMatchedStyles.CSSMatchedStylesPayload>): Promise<SDK.CSSMatchedStyles.CSSMatchedStyles>;
