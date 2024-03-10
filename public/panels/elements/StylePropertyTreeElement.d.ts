import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as CodeMirror from '../../third_party/codemirror.next/codemirror.next.js';
import * as InlineEditor from '../../ui/legacy/components/inline_editor/inline_editor.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type Hint } from './CSSRuleValidator.js';
import { AngleMatch, AngleMatcher, BezierMatch, BezierMatcher, BottomUpTreeMatching, ColorMatch, ColorMatcher, ColorMixMatch, ColorMixMatcher, LinkableNameMatch, LinkableNameMatcher, LinkableNameProperties, RenderingContext, ShadowMatch, ShadowMatcher, ShadowType, StringMatch, StringMatcher, URLMatch, URLMatcher, VariableMatch, VariableMatcher } from './PropertyParser.js';
import { type StylePropertiesSection } from './StylePropertiesSection.js';
import { StylesSidebarPane } from './StylesSidebarPane.js';
export declare const activeHints: WeakMap<Element, Hint>;
interface StylePropertyTreeElementParams {
    stylesPane: StylesSidebarPane;
    section: StylePropertiesSection;
    matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles;
    property: SDK.CSSProperty.CSSProperty;
    isShorthand: boolean;
    inherited: boolean;
    overloaded: boolean;
    newProperty: boolean;
}
export declare class VariableRenderer extends VariableMatch {
    #private;
    constructor(treeElement: StylePropertyTreeElement, style: SDK.CSSStyleDeclaration.CSSStyleDeclaration, text: string, name: string, fallback: CodeMirror.SyntaxNode[], matching: BottomUpTreeMatching);
    resolveVariable(): SDK.CSSMatchedStyles.CSSVariableValue | null;
    fallbackValue(): string | null;
    computedText(): string | null;
    render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
    static matcher(treeElement: StylePropertyTreeElement, style: SDK.CSSStyleDeclaration.CSSStyleDeclaration): VariableMatcher;
}
export declare class ColorRenderer extends ColorMatch {
    #private;
    private readonly treeElement;
    constructor(treeElement: StylePropertyTreeElement, text: string);
    static matcher(treeElement: StylePropertyTreeElement): ColorMatcher;
    render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
    renderColorSwatch(valueChild?: Node, text?: string): InlineEditor.ColorSwatch.ColorSwatch;
}
export declare class ColorMixRenderer extends ColorMixMatch {
    #private;
    constructor(pane: StylesSidebarPane, text: string, space: CodeMirror.SyntaxNode[], color1: CodeMirror.SyntaxNode[], color2: CodeMirror.SyntaxNode[]);
    render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
    static matcher(pane: StylesSidebarPane): ColorMixMatcher;
}
export declare class URLRenderer extends URLMatch {
    private readonly rule;
    private readonly node;
    constructor(rule: SDK.CSSRule.CSSRule | null, node: SDK.DOMModel.DOMNode | null, url: Platform.DevToolsPath.UrlString, text: string);
    render(): Node[];
    static matcher(rule: SDK.CSSRule.CSSRule | null, node: SDK.DOMModel.DOMNode | null): URLMatcher;
}
export declare class AngleRenderer extends AngleMatch {
    #private;
    constructor(text: string, treeElement: StylePropertyTreeElement);
    render(_: unknown, context: RenderingContext): Node[];
    static matcher(treeElement: StylePropertyTreeElement): AngleMatcher;
}
export declare class LinkableNameRenderer extends LinkableNameMatch {
    #private;
    constructor(treeElement: StylePropertyTreeElement, text: string, propertyName: LinkableNameProperties);
    render(): Node[];
    static matcher(treeElement: StylePropertyTreeElement): LinkableNameMatcher;
}
export declare class BezierRenderer extends BezierMatch {
    #private;
    constructor(treeElement: StylePropertyTreeElement, text: string);
    render(): Node[];
    renderSwatch(): Node;
    static matcher(treeElement: StylePropertyTreeElement): BezierMatcher;
}
export declare class StringRenderer extends StringMatch {
    render(): Node[];
    static matcher(): StringMatcher;
}
export declare const enum ShadowPropertyType {
    X = "x",
    Y = "y",
    Spread = "spread",
    Blur = "blur",
    Inset = "inset",
    Color = "color"
}
type ShadowProperty = {
    value: string | CodeMirror.SyntaxNode;
    source: CodeMirror.SyntaxNode | null;
    expansionContext: RenderingContext | null;
    propertyType: ShadowPropertyType;
};
export declare class ShadowModel implements InlineEditor.CSSShadowEditor.CSSShadowModel {
    #private;
    constructor(shadowType: ShadowType, properties: ShadowProperty[], context: RenderingContext);
    isBoxShadow(): boolean;
    inset(): boolean;
    offsetX(): InlineEditor.CSSShadowEditor.CSSLength;
    offsetY(): InlineEditor.CSSShadowEditor.CSSLength;
    blurRadius(): InlineEditor.CSSShadowEditor.CSSLength;
    spreadRadius(): InlineEditor.CSSShadowEditor.CSSLength;
    setInset(inset: boolean): void;
    setOffsetX(value: InlineEditor.CSSShadowEditor.CSSLength): void;
    setOffsetY(value: InlineEditor.CSSShadowEditor.CSSLength): void;
    setBlurRadius(value: InlineEditor.CSSShadowEditor.CSSLength): void;
    setSpreadRadius(value: InlineEditor.CSSShadowEditor.CSSLength): void;
    renderContents(parent: HTMLElement): void;
}
export declare class ShadowRenderer extends ShadowMatch {
    #private;
    constructor(text: string, type: ShadowType, treeElement: StylePropertyTreeElement);
    shadowModel(shadow: CodeMirror.SyntaxNode[], context: RenderingContext): null | ShadowModel;
    render(node: CodeMirror.SyntaxNode, context: RenderingContext): Node[];
    static matcher(treeElement: StylePropertyTreeElement): ShadowMatcher;
}
export declare class StylePropertyTreeElement extends UI.TreeOutline.TreeElement {
    #private;
    private readonly style;
    private matchedStylesInternal;
    property: SDK.CSSProperty.CSSProperty;
    private readonly inheritedInternal;
    private overloadedInternal;
    private parentPaneInternal;
    isShorthand: boolean;
    private readonly applyStyleThrottler;
    private newProperty;
    private expandedDueToFilter;
    valueElement: HTMLElement | null;
    nameElement: HTMLElement | null;
    private expandElement;
    private originalPropertyText;
    private hasBeenEditedIncrementally;
    private prompt;
    private lastComputedValue;
    private computedStyles;
    private parentsComputedStyles;
    private contextForTest;
    constructor({ stylesPane, section, matchedStyles, property, isShorthand, inherited, overloaded, newProperty }: StylePropertyTreeElementParams);
    matchedStyles(): SDK.CSSMatchedStyles.CSSMatchedStyles;
    editable(): boolean;
    inherited(): boolean;
    overloaded(): boolean;
    setOverloaded(x: boolean): void;
    setComputedStyles(computedStyles: Map<string, string> | null): void;
    setParentsComputedStyles(parentsComputedStyles: Map<string, string> | null): void;
    get name(): string;
    get value(): string;
    updateFilter(): boolean;
    renderedPropertyText(): string;
    private processFont;
    private processGrid;
    private processLength;
    private updateState;
    node(): SDK.DOMModel.DOMNode | null;
    parentPane(): StylesSidebarPane;
    section(): StylePropertiesSection;
    private updatePane;
    private toggleDisabled;
    private isPropertyChanged;
    onpopulate(): Promise<void>;
    onattach(): void;
    onexpand(): void;
    oncollapse(): void;
    private updateExpandElement;
    getVariablePopoverContents(variableName: string, computedValue: string | null): HTMLElement | undefined;
    updateTitleIfComputedValueChanged(): void;
    updateTitle(): void;
    private innerUpdateTitle;
    updateAuthoringHint(): void;
    private mouseUp;
    private handleContextMenuEvent;
    private handleCopyContextMenuEvent;
    createCopyContextMenu(event: Event): UI.ContextMenu.ContextMenu;
    private viewComputedValue;
    private copyCssDeclarationAsJs;
    private copyAllCssDeclarationAsJs;
    private navigateToSource;
    startEditingValue(): void;
    startEditingName(): void;
    private editingNameValueKeyDown;
    private editingNameValueKeyPress;
    private applyFreeFlowStyleTextEdit;
    kickFreeFlowStyleEditForTest(): Promise<void>;
    editingEnded(context: Context): void;
    editingCancelled(element: Element | null, context: Context): void;
    private applyOriginalStyle;
    private findSibling;
    private editingCommitted;
    private removePrompt;
    styleTextAppliedForTest(): void;
    applyStyleText(styleText: string, majorChange: boolean, property?: SDK.CSSProperty.CSSProperty | null): Promise<void>;
    private innerApplyStyleText;
    ondblclick(): boolean;
    isEventWithinDisclosureTriangle(event: Event): boolean;
}
export interface Context {
    expanded: boolean;
    hasChildren: boolean;
    isEditingName: boolean;
    originalProperty?: SDK.CSSProperty.CSSProperty;
    originalName?: string;
    originalValue?: string;
    previousContent: string;
}
export {};
