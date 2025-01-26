// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as InlineEditor from '../../ui/legacy/components/inline_editor/inline_editor.js';
import * as UI from '../../ui/legacy/legacy.js';
const ASTUtils = SDK.CSSPropertyParser.ASTUtils;
const matcherBase = SDK.CSSPropertyParser.matcherBase;
const tokenizeDeclaration = SDK.CSSPropertyParser.tokenizeDeclaration;
export class AngleMatch {
    text;
    node;
    constructor(text, node) {
        this.text = text;
        this.node = node;
    }
    computedText() {
        return this.text;
    }
}
// clang-format off
export class AngleMatcher extends matcherBase(AngleMatch) {
    // clang-format on
    accepts(propertyName) {
        return SDK.CSSMetadata.cssMetadata().isAngleAwareProperty(propertyName);
    }
    matches(node, matching) {
        if (node.name !== 'NumberLiteral') {
            return null;
        }
        const unit = node.getChild('Unit');
        // TODO(crbug/1138628) handle unitless 0
        if (!unit || !['deg', 'grad', 'rad', 'turn'].includes(matching.ast.text(unit))) {
            return null;
        }
        return new AngleMatch(matching.ast.text(node), node);
    }
}
function literalToNumber(node, ast) {
    if (node.type.name !== 'NumberLiteral') {
        return null;
    }
    const text = ast.text(node);
    return Number(text.substring(0, text.length - ast.text(node.getChild('Unit')).length));
}
export class ColorMixMatch {
    text;
    node;
    space;
    color1;
    color2;
    constructor(text, node, space, color1, color2) {
        this.text = text;
        this.node = node;
        this.space = space;
        this.color1 = color1;
        this.color2 = color2;
    }
}
// clang-format off
export class ColorMixMatcher extends matcherBase(ColorMixMatch) {
    // clang-format on
    accepts(propertyName) {
        return SDK.CSSMetadata.cssMetadata().isColorAwareProperty(propertyName);
    }
    matches(node, matching) {
        if (node.name !== 'CallExpression' || matching.ast.text(node.getChild('Callee')) !== 'color-mix') {
            return null;
        }
        const computedValueTree = tokenizeDeclaration('--property', matching.getComputedText(node));
        if (!computedValueTree) {
            return null;
        }
        const value = ASTUtils.declValue(computedValueTree.tree);
        if (!value) {
            return null;
        }
        const computedValueArgs = ASTUtils.callArgs(value);
        if (computedValueArgs.length !== 3) {
            return null;
        }
        const [space, color1, color2] = computedValueArgs;
        // Verify that all arguments are there, and that the space starts with a literal `in`.
        if (space.length < 2 || computedValueTree.text(ASTUtils.stripComments(space).next().value) !== 'in' ||
            color1.length < 1 || color2.length < 1) {
            return null;
        }
        // Verify there's at most one percentage value for each color.
        const p1 = color1.filter(n => n.type.name === 'NumberLiteral' && computedValueTree.text(n.getChild('Unit')) === '%');
        const p2 = color2.filter(n => n.type.name === 'NumberLiteral' && computedValueTree.text(n.getChild('Unit')) === '%');
        if (p1.length > 1 || p2.length > 1) {
            return null;
        }
        // Verify that if both colors carry percentages, they aren't both zero (which is an invalid property value).
        if (p1[0] && p2[0] && (literalToNumber(p1[0], computedValueTree) ?? 0) === 0 &&
            (literalToNumber(p2[0], computedValueTree) ?? 0) === 0) {
            return null;
        }
        const args = ASTUtils.callArgs(node);
        if (args.length !== 3) {
            return null;
        }
        return new ColorMixMatch(matching.ast.text(node), node, args[0], args[1], args[2]);
    }
}
// clang-format off
export class URLMatch {
    url;
    text;
    node;
    constructor(url, text, node) {
        this.url = url;
        this.text = text;
        this.node = node;
    }
}
// clang-format off
export class URLMatcher extends matcherBase(URLMatch) {
    // clang-format on
    matches(node, matching) {
        if (node.name !== 'CallLiteral') {
            return null;
        }
        const callee = node.getChild('CallTag');
        if (!callee || matching.ast.text(callee) !== 'url') {
            return null;
        }
        const [, lparenNode, urlNode, rparenNode] = ASTUtils.siblings(callee);
        if (matching.ast.text(lparenNode) !== '(' ||
            (urlNode.name !== 'ParenthesizedContent' && urlNode.name !== 'StringLiteral') ||
            matching.ast.text(rparenNode) !== ')') {
            return null;
        }
        const text = matching.ast.text(urlNode);
        const url = (urlNode.name === 'StringLiteral' ? text.substr(1, text.length - 2) : text.trim());
        return new URLMatch(url, matching.ast.text(node), node);
    }
}
export class LinearGradientMatch {
    text;
    node;
    constructor(text, node) {
        this.text = text;
        this.node = node;
    }
}
// clang-format off
export class LinearGradientMatcher extends matcherBase(LinearGradientMatch) {
    // clang-format on
    matches(node, matching) {
        const text = matching.ast.text(node);
        if (node.name === 'CallExpression' && matching.ast.text(node.getChild('Callee')) === 'linear-gradient') {
            return new LinearGradientMatch(text, node);
        }
        return null;
    }
    accepts(propertyName) {
        return ['background', 'background-image', '-webkit-mask-image'].includes(propertyName);
    }
}
export class ColorMatch {
    text;
    node;
    currentColorCallback;
    computedText;
    constructor(text, node, currentColorCallback) {
        this.text = text;
        this.node = node;
        this.currentColorCallback = currentColorCallback;
        this.computedText = currentColorCallback;
    }
}
// clang-format off
export class ColorMatcher extends matcherBase(ColorMatch) {
    currentColorCallback;
    constructor(currentColorCallback) {
        super();
        this.currentColorCallback = currentColorCallback;
    }
    // clang-format on
    accepts(propertyName) {
        return SDK.CSSMetadata.cssMetadata().isColorAwareProperty(propertyName);
    }
    matches(node, matching) {
        const text = matching.ast.text(node);
        if (node.name === 'ColorLiteral') {
            return new ColorMatch(text, node);
        }
        if (node.name === 'ValueName') {
            if (Common.Color.Nicknames.has(text)) {
                return new ColorMatch(text, node);
            }
            if (text.toLowerCase() === 'currentcolor' && this.currentColorCallback) {
                const callback = this.currentColorCallback;
                return new ColorMatch(text, node, () => callback() ?? text);
            }
        }
        if (node.name === 'CallExpression') {
            const callee = node.getChild('Callee');
            if (callee && matching.ast.text(callee).match(/^(rgba?|hsla?|hwba?|lab|lch|oklab|oklch|color)$/)) {
                return new ColorMatch(text, node);
            }
        }
        return null;
    }
}
export class LightDarkColorMatch {
    text;
    node;
    light;
    dark;
    constructor(text, node, light, dark) {
        this.text = text;
        this.node = node;
        this.light = light;
        this.dark = dark;
    }
}
// clang-format off
export class LightDarkColorMatcher extends matcherBase(LightDarkColorMatch) {
    // clang-format on
    accepts(propertyName) {
        return SDK.CSSMetadata.cssMetadata().isColorAwareProperty(propertyName);
    }
    matches(node, matching) {
        if (node.name !== 'CallExpression' || matching.ast.text(node.getChild('Callee')) !== 'light-dark') {
            return null;
        }
        const args = ASTUtils.callArgs(node);
        if (args.length !== 2 || args[0].length === 0 || args[1].length === 0) {
            return null;
        }
        return new LightDarkColorMatch(matching.ast.text(node), node, args[0], args[1]);
    }
}
export class LinkableNameMatch {
    text;
    node;
    propertyName;
    constructor(text, node, propertyName) {
        this.text = text;
        this.node = node;
        this.propertyName = propertyName;
    }
}
// clang-format off
export class LinkableNameMatcher extends matcherBase(LinkableNameMatch) {
    // clang-format on
    static isLinkableNameProperty(propertyName) {
        const names = [
            "animation" /* LinkableNameProperties.ANIMATION */,
            "animation-name" /* LinkableNameProperties.ANIMATION_NAME */,
            "font-palette" /* LinkableNameProperties.FONT_PALETTE */,
            "position-try-fallbacks" /* LinkableNameProperties.POSITION_TRY_FALLBACKS */,
            "position-try" /* LinkableNameProperties.POSITION_TRY */,
        ];
        return names.includes(propertyName);
    }
    static identifierAnimationLonghandMap = new Map(Object.entries({
        normal: "direction" /* AnimationLonghandPart.DIRECTION */,
        alternate: "direction" /* AnimationLonghandPart.DIRECTION */,
        reverse: "direction" /* AnimationLonghandPart.DIRECTION */,
        'alternate-reverse': "direction" /* AnimationLonghandPart.DIRECTION */,
        none: "fill-mode" /* AnimationLonghandPart.FILL_MODE */,
        forwards: "fill-mode" /* AnimationLonghandPart.FILL_MODE */,
        backwards: "fill-mode" /* AnimationLonghandPart.FILL_MODE */,
        both: "fill-mode" /* AnimationLonghandPart.FILL_MODE */,
        running: "play-state" /* AnimationLonghandPart.PLAY_STATE */,
        paused: "play-state" /* AnimationLonghandPart.PLAY_STATE */,
        infinite: "iteration-count" /* AnimationLonghandPart.ITERATION_COUNT */,
        linear: "easing-function" /* AnimationLonghandPart.EASING_FUNCTION */,
        ease: "easing-function" /* AnimationLonghandPart.EASING_FUNCTION */,
        'ease-in': "easing-function" /* AnimationLonghandPart.EASING_FUNCTION */,
        'ease-out': "easing-function" /* AnimationLonghandPart.EASING_FUNCTION */,
        'ease-in-out': "easing-function" /* AnimationLonghandPart.EASING_FUNCTION */,
        steps: "easing-function" /* AnimationLonghandPart.EASING_FUNCTION */,
        'step-start': "easing-function" /* AnimationLonghandPart.EASING_FUNCTION */,
        'step-end': "easing-function" /* AnimationLonghandPart.EASING_FUNCTION */,
    }));
    matchAnimationNameInShorthand(node, matching) {
        // Order is important within each animation definition for distinguishing <keyframes-name> values from other keywords.
        // When parsing, keywords that are valid for properties other than animation-name
        // whose values were not found earlier in the shorthand must be accepted for those properties rather than for animation-name.
        // See the details in: https://w3c.github.io/csswg-drafts/css-animations/#animation.
        const text = matching.ast.text(node);
        // This is not a known identifier, so return it as `animation-name`.
        if (!LinkableNameMatcher.identifierAnimationLonghandMap.has(text)) {
            return new LinkableNameMatch(text, node, "animation" /* LinkableNameProperties.ANIMATION */);
        }
        // There can be multiple `animation` declarations splitted by a comma.
        // So, we find the declaration nodes that are related to the node argument.
        const declarations = ASTUtils.split(ASTUtils.siblings(ASTUtils.declValue(matching.ast.tree)));
        const currentDeclarationNodes = declarations.find(declaration => declaration[0].from <= node.from && declaration[declaration.length - 1].to >= node.to);
        if (!currentDeclarationNodes) {
            return null;
        }
        // We reparse here until the node argument since a variable might be
        // providing a meaningful value such as a timing keyword,
        // that might change the meaning of the node.
        const computedText = matching.getComputedTextRange(currentDeclarationNodes[0], node);
        const tokenized = tokenizeDeclaration('--p', computedText);
        if (!tokenized) {
            return null;
        }
        const identifierCategory = LinkableNameMatcher.identifierAnimationLonghandMap.get(text); // The category of the node argument
        for (let itNode = ASTUtils.declValue(tokenized.tree); itNode?.nextSibling; itNode = itNode.nextSibling) {
            // Run through all the nodes that come before node argument
            // and check whether a value in the same category is found.
            // if so, it means our identifier is an `animation-name` keyword.
            if (itNode.name === 'ValueName') {
                const categoryValue = LinkableNameMatcher.identifierAnimationLonghandMap.get(tokenized.text(itNode));
                if (categoryValue && categoryValue === identifierCategory) {
                    return new LinkableNameMatch(text, node, "animation" /* LinkableNameProperties.ANIMATION */);
                }
            }
        }
        return null;
    }
    accepts(propertyName) {
        return LinkableNameMatcher.isLinkableNameProperty(propertyName);
    }
    matches(node, matching) {
        const { propertyName } = matching.ast;
        const text = matching.ast.text(node);
        const parentNode = node.parent;
        if (!parentNode) {
            return null;
        }
        const isParentADeclaration = parentNode.name === 'Declaration';
        const isInsideVarCall = parentNode.name === 'ArgList' && parentNode.prevSibling?.name === 'Callee' &&
            matching.ast.text(parentNode.prevSibling) === 'var';
        const isAParentDeclarationOrVarCall = isParentADeclaration || isInsideVarCall;
        // `position-try-fallbacks` and `position-try` only accept names with dashed ident.
        const shouldMatchOnlyVariableName = propertyName === "position-try" /* LinkableNameProperties.POSITION_TRY */ ||
            propertyName === "position-try-fallbacks" /* LinkableNameProperties.POSITION_TRY_FALLBACKS */;
        // We only mark top level nodes or nodes that are inside `var()` expressions as linkable names.
        if (!propertyName || (node.name !== 'ValueName' && node.name !== 'VariableName') ||
            !isAParentDeclarationOrVarCall || (node.name === 'ValueName' && shouldMatchOnlyVariableName)) {
            return null;
        }
        if (propertyName === 'animation') {
            return this.matchAnimationNameInShorthand(node, matching);
        }
        // The assertion here is safe since this matcher only runs for
        // properties with names inside `LinkableNameProperties` (See the `accepts` function.)
        return new LinkableNameMatch(text, node, propertyName);
    }
}
export class BezierMatch {
    text;
    node;
    constructor(text, node) {
        this.text = text;
        this.node = node;
    }
}
// clang-format off
export class BezierMatcher extends matcherBase(BezierMatch) {
    // clang-format on
    accepts(propertyName) {
        return SDK.CSSMetadata.cssMetadata().isBezierAwareProperty(propertyName);
    }
    matches(node, matching) {
        const text = matching.ast.text(node);
        const isCubicBezierKeyword = node.name === 'ValueName' && UI.Geometry.CubicBezier.KeywordValues.has(text);
        const isCubicBezierOrLinearFunction = node.name === 'CallExpression' &&
            ['cubic-bezier', 'linear'].includes(matching.ast.text(node.getChild('Callee')));
        if (!isCubicBezierKeyword && !isCubicBezierOrLinearFunction) {
            return null;
        }
        if (!InlineEditor.AnimationTimingModel.AnimationTimingModel.parse(text)) {
            return null;
        }
        return new BezierMatch(text, node);
    }
}
export class StringMatch {
    text;
    node;
    constructor(text, node) {
        this.text = text;
        this.node = node;
    }
}
// clang-format off
export class StringMatcher extends matcherBase(StringMatch) {
    // clang-format on
    matches(node, matching) {
        return node.name === 'StringLiteral' ? new StringMatch(matching.ast.text(node), node) : null;
    }
}
export class ShadowMatch {
    text;
    node;
    shadowType;
    constructor(text, node, shadowType) {
        this.text = text;
        this.node = node;
        this.shadowType = shadowType;
    }
}
// clang-format off
export class ShadowMatcher extends matcherBase(ShadowMatch) {
    // clang-format on
    accepts(propertyName) {
        return SDK.CSSMetadata.cssMetadata().isShadowProperty(propertyName);
    }
    matches(node, matching) {
        if (node.name !== 'Declaration') {
            return null;
        }
        const valueNodes = ASTUtils.siblings(ASTUtils.declValue(node));
        if (valueNodes.length === 0) {
            return null;
        }
        const valueText = matching.ast.textRange(valueNodes[0], valueNodes[valueNodes.length - 1]);
        return new ShadowMatch(valueText, node, matching.ast.propertyName === 'text-shadow' ? "textShadow" /* ShadowType.TEXT_SHADOW */ : "boxShadow" /* ShadowType.BOX_SHADOW */);
    }
}
export class FontMatch {
    text;
    node;
    constructor(text, node) {
        this.text = text;
        this.node = node;
    }
}
// clang-format off
export class FontMatcher extends matcherBase(FontMatch) {
    // clang-format on
    accepts(propertyName) {
        return SDK.CSSMetadata.cssMetadata().isFontAwareProperty(propertyName);
    }
    matches(node, matching) {
        if (node.name === 'Declaration') {
            return null;
        }
        const regex = matching.ast.propertyName === 'font-family' ? InlineEditor.FontEditorUtils.FontFamilyRegex :
            InlineEditor.FontEditorUtils.FontPropertiesRegex;
        const text = matching.ast.text(node);
        return regex.test(text) ? new FontMatch(text, node) : null;
    }
}
export class FlexGridMatch {
    text;
    node;
    isFlex;
    constructor(text, node, isFlex) {
        this.text = text;
        this.node = node;
        this.isFlex = isFlex;
    }
}
// clang-format off
export class FlexGridMatcher extends matcherBase(FlexGridMatch) {
    // clang-format on
    static FLEX = ['flex', 'inline-flex', 'block flex', 'inline flex'];
    static GRID = ['grid', 'inline-grid', 'block grid', 'inline grid'];
    accepts(propertyName) {
        return propertyName === 'display';
    }
    matches(node, matching) {
        if (node.name !== 'Declaration') {
            return null;
        }
        const valueNodes = ASTUtils.siblings(ASTUtils.declValue(node));
        if (valueNodes.length < 1) {
            return null;
        }
        const values = valueNodes.filter(node => node.name !== 'Important')
            .map(node => matching.getComputedText(node).trim())
            .filter(value => value);
        const text = values.join(' ');
        if (FlexGridMatcher.FLEX.includes(text)) {
            return new FlexGridMatch(matching.ast.text(node), node, true);
        }
        if (FlexGridMatcher.GRID.includes(text)) {
            return new FlexGridMatch(matching.ast.text(node), node, false);
        }
        return null;
    }
}
export class GridTemplateMatch {
    text;
    node;
    lines;
    constructor(text, node, lines) {
        this.text = text;
        this.node = node;
        this.lines = lines;
    }
}
// clang-format off
export class GridTemplateMatcher extends matcherBase(GridTemplateMatch) {
    // clang-format on
    accepts(propertyName) {
        return SDK.CSSMetadata.cssMetadata().isGridAreaDefiningProperty(propertyName);
    }
    matches(node, matching) {
        if (node.name !== 'Declaration' || matching.hasUnresolvedVars(node)) {
            return null;
        }
        const lines = [];
        let curLine = [];
        // The following two states are designed to consume different cases of LineNames:
        // 1. no LineNames in between StringLiterals;
        // 2. one LineNames in between, which means the LineNames belongs to the current line;
        // 3. two LineNames in between, which means the second LineNames starts a new line.
        // `hasLeadingLineNames` tracks if the current row already starts with a LineNames and
        // with no following StringLiteral yet, which means that the next StringLiteral should
        // be appended to the same `curLine`, instead of creating a new line.
        let hasLeadingLineNames = false;
        // `needClosingLineNames` tracks if the current row can still consume an optional LineNames,
        // which will decide if we should start a new line or not when a LineNames is encountered.
        let needClosingLineNames = false;
        // Gather row definitions of [<line-names>? <string> <track-size>? <line-names>?], which
        // be rendered into separate lines.
        function parseNodes(nodes, varParsingMode = false) {
            for (const curNode of nodes) {
                if (matching.getMatch(curNode) instanceof SDK.CSSPropertyParser.VariableMatch) {
                    const computedValueTree = tokenizeDeclaration('--property', matching.getComputedText(curNode));
                    if (!computedValueTree) {
                        continue;
                    }
                    const varNodes = ASTUtils.siblings(ASTUtils.declValue(computedValueTree.tree));
                    if (varNodes.length === 0) {
                        continue;
                    }
                    if ((varNodes[0].name === 'StringLiteral' && !hasLeadingLineNames) ||
                        (varNodes[0].name === 'LineNames' && !needClosingLineNames)) {
                        // The variable value either starts with a string, or with a line name that belongs to a new row;
                        // therefore we start a new line with the variable.
                        lines.push(curLine);
                        curLine = [curNode];
                    }
                    else {
                        curLine.push(curNode);
                    }
                    // We parse computed nodes of this variable to correctly advance local states, but
                    // these computed nodes won't be added to the lines.
                    parseNodes(varNodes, true);
                }
                else if (curNode.name === 'BinaryExpression') {
                    parseNodes(ASTUtils.siblings(curNode.firstChild));
                }
                else if (curNode.name === 'StringLiteral') {
                    if (!varParsingMode) {
                        if (hasLeadingLineNames) {
                            curLine.push(curNode);
                        }
                        else {
                            lines.push(curLine);
                            curLine = [curNode];
                        }
                    }
                    needClosingLineNames = true;
                    hasLeadingLineNames = false;
                }
                else if (curNode.name === 'LineNames') {
                    if (!varParsingMode) {
                        if (needClosingLineNames) {
                            curLine.push(curNode);
                        }
                        else {
                            lines.push(curLine);
                            curLine = [curNode];
                        }
                    }
                    hasLeadingLineNames = !needClosingLineNames;
                    needClosingLineNames = !needClosingLineNames;
                }
                else if (!varParsingMode) {
                    curLine.push(curNode);
                }
            }
        }
        const valueNodes = ASTUtils.siblings(ASTUtils.declValue(node));
        parseNodes(valueNodes);
        lines.push(curLine);
        const valueText = matching.ast.textRange(valueNodes[0], valueNodes[valueNodes.length - 1]);
        return new GridTemplateMatch(valueText, node, lines.filter(line => line.length > 0));
    }
}
export class AnchorFunctionMatch {
    text;
    node;
    functionName;
    constructor(text, node, functionName) {
        this.text = text;
        this.node = node;
        this.functionName = functionName;
    }
}
// clang-format off
export class AnchorFunctionMatcher extends matcherBase(AnchorFunctionMatch) {
    // clang-format on
    anchorFunction(node, matching) {
        if (node.name !== 'CallExpression') {
            return null;
        }
        const calleeText = matching.ast.text(node.getChild('Callee'));
        if (calleeText === 'anchor' || calleeText === 'anchor-size') {
            return calleeText;
        }
        return null;
    }
    matches(node, matching) {
        if (node.name === 'VariableName') {
            // Double-dashed anchor reference to be rendered with a link to its matching anchor.
            let parent = node.parent;
            if (!parent || parent.name !== 'ArgList') {
                return null;
            }
            parent = parent.parent;
            if (!parent || !this.anchorFunction(parent, matching)) {
                return null;
            }
            return new AnchorFunctionMatch(matching.ast.text(node), node, null);
        }
        const calleeText = this.anchorFunction(node, matching);
        if (!calleeText) {
            return null;
        }
        // Match if the anchor/anchor-size function implicitly references an anchor.
        const args = ASTUtils.children(node.getChild('ArgList'));
        if (calleeText === 'anchor' && args.length <= 2) {
            return null;
        }
        if (args.find(arg => arg.name === 'VariableName')) {
            // We have an explicit anchor reference, no need to render swatch.
            return null;
        }
        return new AnchorFunctionMatch(matching.ast.text(node), node, calleeText);
    }
}
// For linking `position-anchor: --anchor-name`.
export class PositionAnchorMatch {
    text;
    matching;
    node;
    constructor(text, matching, node) {
        this.text = text;
        this.matching = matching;
        this.node = node;
    }
}
// clang-format off
export class PositionAnchorMatcher extends matcherBase(PositionAnchorMatch) {
    // clang-format on
    accepts(propertyName) {
        return propertyName === 'position-anchor';
    }
    matches(node, matching) {
        if (node.name !== 'VariableName') {
            return null;
        }
        const dashedIdentifier = matching.ast.text(node);
        return new PositionAnchorMatch(dashedIdentifier, matching, node);
    }
}
export class CSSWideKeywordMatch {
    text;
    node;
    property;
    matchedStyles;
    constructor(text, node, property, matchedStyles) {
        this.text = text;
        this.node = node;
        this.property = property;
        this.matchedStyles = matchedStyles;
    }
    resolveProperty() {
        return this.matchedStyles.resolveGlobalKeyword(this.property, this.text);
    }
    computedText() {
        return this.resolveProperty()?.value ?? null;
    }
}
// clang-format off
export class CSSWideKeywordMatcher extends matcherBase(CSSWideKeywordMatch) {
    property;
    matchedStyles;
    // clang-format on
    constructor(property, matchedStyles) {
        super();
        this.property = property;
        this.matchedStyles = matchedStyles;
    }
    matches(node, matching) {
        const parentNode = node.parent;
        if (node.name !== 'ValueName' || parentNode?.name !== 'Declaration') {
            return null;
        }
        if (Array.from(ASTUtils.stripComments(ASTUtils.siblings(ASTUtils.declValue(parentNode))))
            .some(child => !ASTUtils.equals(child, node))) {
            return null;
        }
        const text = matching.ast.text(node);
        if (!SDK.CSSMetadata.CSSMetadata.isCSSWideKeyword(text)) {
            return null;
        }
        return new CSSWideKeywordMatch(text, node, this.property, this.matchedStyles);
    }
}
export class PositionTryMatch {
    text;
    node;
    preamble;
    fallbacks;
    constructor(text, node, preamble, fallbacks) {
        this.text = text;
        this.node = node;
        this.preamble = preamble;
        this.fallbacks = fallbacks;
    }
}
// clang-format off
export class PositionTryMatcher extends matcherBase(PositionTryMatch) {
    // clang-format on
    accepts(propertyName) {
        return propertyName === "position-try" /* LinkableNameProperties.POSITION_TRY */ ||
            propertyName === "position-try-fallbacks" /* LinkableNameProperties.POSITION_TRY_FALLBACKS */;
    }
    matches(node, matching) {
        if (node.name !== 'Declaration') {
            return null;
        }
        let preamble = [];
        const valueNodes = ASTUtils.siblings(ASTUtils.declValue(node));
        const fallbacks = ASTUtils.split(valueNodes);
        if (matching.ast.propertyName === "position-try" /* LinkableNameProperties.POSITION_TRY */) {
            for (const [i, n] of fallbacks[0].entries()) {
                const computedText = matching.getComputedText(n);
                if (SDK.CSSMetadata.CSSMetadata.isCSSWideKeyword(computedText)) {
                    return null;
                }
                if (SDK.CSSMetadata.CSSMetadata.isPositionTryOrderKeyword(computedText)) {
                    preamble = fallbacks[0].splice(0, i + 1);
                    break;
                }
            }
        }
        const valueText = matching.ast.textRange(valueNodes[0], valueNodes[valueNodes.length - 1]);
        return new PositionTryMatch(valueText, node, preamble, fallbacks);
    }
}
//# sourceMappingURL=PropertyMatchers.js.map