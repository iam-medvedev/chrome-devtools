// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as CodeMirror from '../../third_party/codemirror.next/codemirror.next.js';
const cssParser = CodeMirror.css.cssLanguage.parser;
function nodeText(node, text) {
    return text.substring(node.from, node.to);
}
export class SyntaxTree {
    propertyValue;
    rule;
    tree;
    trailingNodes;
    propertyName;
    constructor(propertyValue, rule, tree, propertyName, trailingNodes = []) {
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
        this.rule = rule;
        this.tree = tree;
        this.trailingNodes = trailingNodes;
    }
    text(node) {
        return nodeText(node ?? this.tree, this.rule);
    }
    subtree(node) {
        return new SyntaxTree(this.propertyValue, this.rule, node);
    }
}
export class TreeWalker {
    ast;
    constructor(ast) {
        this.ast = ast;
    }
    static walkExcludingSuccessors(propertyValue, ...args) {
        const instance = new this(propertyValue, ...args);
        instance.iterateExcludingSuccessors(propertyValue.tree);
        return instance;
    }
    static walk(propertyValue, ...args) {
        const instance = new this(propertyValue, ...args);
        instance.iterate(propertyValue.tree);
        return instance;
    }
    iterate(tree) {
        tree.cursor().iterate(this.enter.bind(this), this.leave.bind(this));
    }
    iterateExcludingSuccessors(tree) {
        // Customize the first step to avoid visiting siblings of `tree`
        if (this.enter(tree)) {
            tree.firstChild?.cursor().iterate(this.enter.bind(this), this.leave.bind(this));
        }
        this.leave(tree);
    }
    enter(_node) {
        return true;
    }
    leave(_node) {
    }
}
export class RenderingContext {
    ast;
    matchedResult;
    cssControls;
    options;
    constructor(ast, matchedResult, cssControls, options = { readonly: false }) {
        this.ast = ast;
        this.matchedResult = matchedResult;
        this.cssControls = cssControls;
        this.options = options;
    }
    addControl(cssType, control) {
        if (this.cssControls) {
            const controls = this.cssControls.get(cssType);
            if (!controls) {
                this.cssControls.set(cssType, [control]);
            }
            else {
                controls.push(control);
            }
        }
    }
}
export class MatcherBase {
    createMatch;
    constructor(createMatch) {
        this.createMatch = createMatch;
    }
}
export class BottomUpTreeMatching extends TreeWalker {
    #matchers = [];
    #matchedNodes = new Map();
    computedText;
    #key(node) {
        return `${node.from}:${node.to}`;
    }
    constructor(ast, matchers) {
        super(ast);
        this.computedText = new ComputedText(ast.propertyValue);
        this.#matchers.push(...matchers);
        this.#matchers.push(new TextMatcher());
    }
    leave({ node }) {
        for (const matcher of this.#matchers) {
            const match = matcher.matches(node, this);
            if (match) {
                this.computedText.push(match, node.from - this.ast.tree.from);
                this.#matchedNodes.set(this.#key(node), match);
                break;
            }
        }
    }
    matchText(node) {
        const matchers = this.#matchers.splice(0);
        this.#matchers.push(new TextMatcher());
        this.iterateExcludingSuccessors(node);
        this.#matchers.push(...matchers);
    }
    getMatch(node) {
        return this.#matchedNodes.get(this.#key(node));
    }
    hasUnresolvedVars(node) {
        return this.computedText.hasUnresolvedVars(node.from - this.ast.tree.from, node.to - this.ast.tree.from);
    }
    getComputedText(node) {
        return this.computedText.get(node.from - this.ast.tree.from, node.to - this.ast.tree.from);
    }
}
class ComputedTextChunk {
    match;
    offset;
    #cachedComputedText = null;
    constructor(match, offset) {
        this.match = match;
        this.offset = offset;
    }
    get end() {
        return this.offset + this.length;
    }
    get length() {
        return this.match.text.length;
    }
    get computedText() {
        if (this.#cachedComputedText === null) {
            this.#cachedComputedText = this.match.computedText();
        }
        return this.#cachedComputedText;
    }
}
// This class constructs the "computed" text from the input property text, i.e., it will strip comments and substitute
// var() functions if possible. It's intended for use during the bottom-up tree matching process. The original text is
// not modified. Instead, computed text slices are produced on the fly. During bottom-up matching, the sequence of
// top-level comments and var() matches will be recorded. This produces an ordered sequence of text pieces that need to
// be substituted into the original text. When a computed text slice is requested, it is generated by piecing together
// original and computed slices as required.
export class ComputedText {
    #chunks = [];
    text;
    #sorted = true;
    constructor(text) {
        this.text = text;
    }
    clear() {
        this.#chunks.splice(0);
    }
    get chunkCount() {
        return this.#chunks.length;
    }
    #sortIfNecessary() {
        if (this.#sorted) {
            return;
        }
        // Sort intervals by offset, with longer intervals first if the offset is identical.
        this.#chunks.sort((a, b) => {
            if (a.offset < b.offset) {
                return -1;
            }
            if (b.offset < a.offset) {
                return 1;
            }
            if (a.end > b.end) {
                return -1;
            }
            if (a.end < b.end) {
                return 1;
            }
            return 0;
        });
        this.#sorted = true;
    }
    // Add another substitutable match. The match will either be appended to the list of existing matches or it will
    // be substituted for the last match(es) if it encompasses them.
    push(match, offset) {
        function hasComputedText(match) {
            return Boolean(match.computedText);
        }
        if (!hasComputedText(match) || offset < 0 || offset >= this.text.length) {
            return;
        }
        const chunk = new ComputedTextChunk(match, offset);
        if (chunk.end > this.text.length) {
            return;
        }
        this.#sorted = false;
        this.#chunks.push(chunk);
    }
    *#range(begin, end) {
        this.#sortIfNecessary();
        let i = this.#chunks.findIndex(c => c.offset >= begin);
        while (i >= 0 && i < this.#chunks.length && this.#chunks[i].end > begin && begin < end) {
            if (this.#chunks[i].end > end) {
                i++;
                continue;
            }
            yield this.#chunks[i];
            begin = this.#chunks[i].end;
            while (begin < end && i < this.#chunks.length && this.#chunks[i].offset < begin) {
                i++;
            }
        }
    }
    hasUnresolvedVars(begin, end) {
        for (const chunk of this.#range(begin, end)) {
            if (chunk.computedText === null) {
                return true;
            }
        }
        return false;
    }
    // Get a slice of the computed text corresponding to the property text in the range [begin, end). The slice may not
    // start within a substitution chunk, e.g., it's invalid to request the computed text for the property value text
    // slice "1px var(--".
    get(begin, end) {
        const pieces = [];
        const push = (text) => {
            if (text.length === 0) {
                return;
            }
            if (pieces.length > 0 && requiresSpace(pieces[pieces.length - 1], text)) {
                pieces.push(' ');
            }
            pieces.push(text);
        };
        for (const chunk of this.#range(begin, end)) {
            const piece = this.text.substring(begin, Math.min(chunk.offset, end));
            push(piece);
            if (end >= chunk.end) {
                push(chunk.computedText ?? chunk.match.text);
            }
            begin = chunk.end;
        }
        if (begin < end) {
            const piece = this.text.substring(begin, end);
            push(piece);
        }
        return pieces.join('');
    }
}
export function requiresSpace(a, b) {
    const tail = Array.isArray(a) ? a.findLast(node => node.textContent)?.textContent : a;
    const head = Array.isArray(b) ? b.find(node => node.textContent)?.textContent : b;
    const trailingChar = tail ? tail[tail.length - 1] : '';
    const leadingChar = head ? head[0] : '';
    const noSpaceAfter = ['', '(', '{', '}', ';'];
    const noSpaceBefore = ['', '(', ')', ',', ':', '*', '{', ';'];
    return !/\s/.test(trailingChar) && !/\s/.test(leadingChar) && !noSpaceAfter.includes(trailingChar) &&
        !noSpaceBefore.includes(leadingChar);
}
function mergeWithSpacing(nodes, merge) {
    const result = [...nodes];
    if (requiresSpace(nodes, merge)) {
        result.push(document.createTextNode(' '));
    }
    result.push(...merge);
    return result;
}
export const CSSControlMap = (Map);
export class Renderer extends TreeWalker {
    #matchedResult;
    #output = [];
    #context;
    constructor(ast, matchedResult, cssControls, options) {
        super(ast);
        this.#matchedResult = matchedResult;
        this.#context = new RenderingContext(this.ast, this.#matchedResult, cssControls, options);
    }
    static render(nodeOrNodes, context) {
        if (!Array.isArray(nodeOrNodes)) {
            return this.render([nodeOrNodes], context);
        }
        const cssControls = new CSSControlMap();
        const renderers = nodeOrNodes.map(node => this.walkExcludingSuccessors(context.ast.subtree(node), context.matchedResult, cssControls, context.options));
        const nodes = renderers.map(node => node.#output).reduce(mergeWithSpacing);
        return { nodes, cssControls };
    }
    static renderInto(nodeOrNodes, context, parent) {
        const { nodes, cssControls } = this.render(nodeOrNodes, context);
        if (parent.lastChild && requiresSpace([parent.lastChild], nodes)) {
            parent.appendChild(document.createTextNode(' '));
        }
        nodes.map(n => parent.appendChild(n));
        return { nodes, cssControls };
    }
    renderedMatchForTest(_nodes, _match) {
    }
    enter({ node }) {
        const match = this.#matchedResult.getMatch(node);
        if (match) {
            const output = match.render(node, this.#context);
            this.renderedMatchForTest(output, match);
            this.#output = mergeWithSpacing(this.#output, output);
            return false;
        }
        return true;
    }
}
function siblings(node) {
    const result = [];
    while (node) {
        result.push(node);
        node = node.nextSibling;
    }
    return result;
}
export function children(node) {
    return siblings(node.firstChild);
}
export class VariableMatch {
    text;
    name;
    fallback;
    matching;
    type = 'var';
    constructor(text, name, fallback, matching) {
        this.text = text;
        this.name = name;
        this.fallback = fallback;
        this.matching = matching;
    }
}
export class VariableMatcher extends MatcherBase {
    matches(node, matching) {
        const callee = node.getChild('Callee');
        const args = node.getChild('ArgList');
        if (node.name !== 'CallExpression' || !callee || (matching.ast.text(callee) !== 'var') || !args) {
            return null;
        }
        const [lparenNode, nameNode, ...fallbackOrRParenNodes] = children(args);
        if (lparenNode?.name !== '(' || nameNode?.name !== 'VariableName') {
            return null;
        }
        if (fallbackOrRParenNodes.length <= 1 && fallbackOrRParenNodes[0]?.name !== ')') {
            return null;
        }
        let fallback = [];
        if (fallbackOrRParenNodes.length > 1) {
            if (fallbackOrRParenNodes.shift()?.name !== ',') {
                return null;
            }
            if (fallbackOrRParenNodes.pop()?.name !== ')') {
                return null;
            }
            fallback = fallbackOrRParenNodes;
            if (fallback.length === 0) {
                return null;
            }
            if (fallback.some(n => n.name === ',')) {
                return null;
            }
        }
        const varName = matching.ast.text(nameNode);
        if (!varName.startsWith('--')) {
            return null;
        }
        return this.createMatch(matching.ast.text(node), varName, fallback, matching);
    }
}
export class ColorMatch {
    text;
    type = 'color';
    constructor(text) {
        this.text = text;
    }
}
export class ColorMatcher extends MatcherBase {
    matches(node, matching) {
        if (matching.ast.propertyName && !SDK.CSSMetadata.cssMetadata().isColorAwareProperty(matching.ast.propertyName)) {
            return null;
        }
        const text = matching.ast.text(node);
        if (node.name === 'ColorLiteral') {
            return this.createMatch(text);
        }
        if (node.name === 'ValueName' && Common.Color.Nicknames.has(text)) {
            return this.createMatch(text);
        }
        if (node.name === 'CallExpression') {
            const callee = node.getChild('Callee');
            if (callee && matching.ast.text(callee).match(/^(rgba?|hsla?|hwba?|lab|lch|oklab|oklch|color)$/)) {
                return this.createMatch(text);
            }
        }
        return null;
    }
}
class LegacyRegexMatch {
    processor;
    #matchedText;
    #suffix;
    get text() {
        return this.#matchedText + this.#suffix;
    }
    get type() {
        return `${this.processor}`;
    }
    constructor(matchedText, suffix, processor) {
        this.#matchedText = matchedText;
        this.#suffix = suffix;
        this.processor = processor;
    }
    render(_node, context) {
        const rendered = this.processor(this.#matchedText, context.options.readonly);
        return rendered ? [rendered, document.createTextNode(this.#suffix)] : [];
    }
}
export class LegacyRegexMatcher {
    regexp;
    processor;
    constructor(regexp, processor) {
        this.regexp = new RegExp(regexp);
        this.processor = processor;
    }
    matches(node, matching) {
        const text = matching.ast.text(node);
        this.regexp.lastIndex = 0;
        const match = this.regexp.exec(text);
        if (!match || match.index !== 0) {
            return null;
        }
        // Some of the legacy regex matching relies on matching prefixes of the text, e.g., for var()s. That particular
        // matcher can't be extended for a full-text match, because that runs into problems matching the correct closing
        // parenthesis (with fallbacks, specifically). At the same time we can't rely on prefix matching here because it
        // has false positives for some subexpressions, such as 'var() + var()'. We compromise by accepting prefix matches
        // where the remaining suffix is exclusively closing parentheses and whitespace, specifically to handle the existing
        // prefix matchers like that for var().
        const suffix = text.substring(match[0].length);
        if (!suffix.match(/^[\s)]*$/)) {
            return null;
        }
        return new LegacyRegexMatch(match[0], suffix, this.processor);
    }
}
export class TextMatch {
    text;
    isComment;
    type = 'text';
    computedText;
    constructor(text, isComment) {
        this.text = text;
        this.isComment = isComment;
        if (isComment) {
            this.computedText = () => '';
        }
    }
    render() {
        return [document.createTextNode(this.text)];
    }
}
class TextMatcher {
    matches(node, matching) {
        if (!node.firstChild || node.name === 'NumberLiteral' /* may have a Unit child */) {
            // Leaf node, just emit text
            const text = matching.ast.text(node);
            if (text.length) {
                return new TextMatch(text, node.name === 'Comment');
            }
        }
        return null;
    }
}
function declaration(rule) {
    return cssParser.parse(rule).topNode.getChild('RuleSet')?.getChild('Block')?.getChild('Declaration') ?? null;
}
export function tokenizePropertyValue(propertyValue, propertyName) {
    const fakePropertyName = '--property';
    const rule = `*{${fakePropertyName}: ${propertyValue};}`;
    const decl = declaration(rule);
    if (!decl || decl.type.isError) {
        return null;
    }
    const childNodes = children(decl);
    if (childNodes.length < 3) {
        return null;
    }
    const [varName, colon, tree] = childNodes;
    if (!varName || varName.type.isError || !colon || colon.type.isError || !tree || tree.type.isError) {
        return null;
    }
    // It's possible that there are nodes following the declaration when there are comments or syntax errors. We want to
    // render any comments, so pick up any trailing nodes following the declaration excluding the final semicolon and
    // brace.
    const trailingNodes = siblings(decl).slice(1);
    const [semicolon, brace] = trailingNodes.splice(trailingNodes.length - 2, 2);
    if (semicolon?.name !== ';' && brace?.name !== '}') {
        return null;
    }
    const name = (propertyName && tokenizePropertyName(propertyName)) ?? undefined;
    const ast = new SyntaxTree(propertyValue, rule, tree, name, trailingNodes);
    if (ast.text(varName) !== fakePropertyName || colon.name !== ':') {
        return null;
    }
    return ast;
}
export function tokenizePropertyName(name) {
    const rule = `*{${name}: inherit;}`;
    const decl = declaration(rule);
    if (!decl || decl.type.isError) {
        return null;
    }
    const propertyName = decl.getChild('PropertyName');
    if (!propertyName) {
        return null;
    }
    return nodeText(propertyName, rule);
}
// This function renders a property value as HTML, customizing the presentation with a set of given AST matchers. This
// comprises the following steps:
// 1. Build an AST of the property.
// 2. Apply tree matchers during bottom up traversal.
// 3. Render the value from left to right into HTML, deferring rendering of matched subtrees to the matchers
//
// More general, longer matches take precedence over shorter, more specific matches. Whitespaces are normalized, for
// unmatched text and around rendered matching results.
export function renderPropertyValue(value, matchers, propertyName) {
    const ast = tokenizePropertyValue(value, propertyName);
    if (!ast) {
        return [document.createTextNode(value)];
    }
    const matchedResult = BottomUpTreeMatching.walk(ast, matchers);
    ast.trailingNodes.forEach(n => matchedResult.matchText(n));
    const context = new RenderingContext(ast, matchedResult);
    return Renderer.render([...siblings(ast.tree), ...ast.trailingNodes], context).nodes;
}
//# sourceMappingURL=PropertyParser.js.map