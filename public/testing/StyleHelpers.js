// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../core/sdk/sdk.js';
export function getMatchedStylesWithStylesheet(cssModel, origin, styleSheetId, header, payload = {}) {
    cssModel.styleSheetAdded({
        styleSheetId,
        frameId: '',
        sourceURL: '',
        origin,
        title: '',
        disabled: false,
        isInline: false,
        isMutable: false,
        isConstructed: false,
        startLine: 0,
        startColumn: 0,
        length: 0,
        endLine: 0,
        endColumn: 0,
        ...header,
    });
    return getMatchedStyles({ cssModel, ...payload });
}
export function getMatchedStylesWithBlankRule(cssModel, selector = 'div', range = undefined, origin = "regular" /* Protocol.CSS.StyleSheetOrigin.Regular */, styleSheetId = '0', payload = {}) {
    return getMatchedStylesWithProperties(cssModel, {}, selector, range, origin, styleSheetId, payload);
}
export function createCSSStyle(cssProperties, range, styleSheetId = '0') {
    return {
        cssProperties,
        styleSheetId,
        range,
        shorthandEntries: [],
    };
}
function getSimpleList(selector) {
    return {
        selectors: [{ text: selector }],
        text: selector,
    };
}
export function ruleMatch(selectorOrList, properties, options = {}) {
    const { range, origin = "regular" /* Protocol.CSS.StyleSheetOrigin.Regular */, styleSheetId, matchingSelectorsIndexes, nestingSelectors, } = options;
    const cssProperties = Array.isArray(properties) ? properties : Object.keys(properties).map(name => ({ name, value: properties[name] }));
    const selectorList = typeof selectorOrList === 'string' ? getSimpleList(selectorOrList) : selectorOrList;
    const matchingSelectors = matchingSelectorsIndexes ?? selectorList.selectors.map((_, index) => index);
    return {
        rule: {
            nestingSelectors,
            selectorList,
            origin,
            style: createCSSStyle(cssProperties, range, styleSheetId),
            styleSheetId,
        },
        matchingSelectors,
    };
}
export function getMatchedStylesWithProperties(cssModel, properties, selector = 'div', range = undefined, origin = "regular" /* Protocol.CSS.StyleSheetOrigin.Regular */, styleSheetId = '0', payload = {}) {
    const matchedPayload = [ruleMatch(selector, properties, { range, origin, styleSheetId })];
    return getMatchedStylesWithStylesheet(cssModel, origin, styleSheetId, {}, { matchedPayload, ...payload });
}
export function getMatchedStyles(payload = {}) {
    let node = payload.node;
    if (!node) {
        node = sinon.createStubInstance(SDK.DOMModel.DOMNode);
        node.id = 1;
    }
    let cssModel = payload.cssModel;
    if (!cssModel) {
        cssModel = sinon.createStubInstance(SDK.CSSModel.CSSModel);
    }
    return SDK.CSSMatchedStyles.CSSMatchedStyles.create({
        cssModel,
        node,
        inlinePayload: null,
        attributesPayload: null,
        matchedPayload: [],
        pseudoPayload: [],
        inheritedPayload: [],
        inheritedPseudoPayload: [],
        animationsPayload: [],
        parentLayoutNodeId: undefined,
        positionTryRules: [],
        propertyRules: [],
        cssPropertyRegistrations: [],
        fontPaletteValuesRule: undefined,
        activePositionFallbackIndex: -1,
        animationStylesPayload: [],
        transitionsStylePayload: null,
        inheritedAnimatedPayload: [],
        ...payload,
    });
}
//# sourceMappingURL=StyleHelpers.js.map