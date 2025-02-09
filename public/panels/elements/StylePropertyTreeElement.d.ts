import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as CodeMirror from '../../third_party/codemirror.next/codemirror.next.js';
import * as InlineEditor from '../../ui/legacy/components/inline_editor/inline_editor.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type Hint } from './CSSRuleValidator.js';
import { RenderingContext } from './PropertyRenderer.js';
import type { StylePropertiesSection } from './StylePropertiesSection.js';
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
declare const FlexGridRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.FlexGridMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.FlexGridMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.FlexGridMatch, _context: RenderingContext): Node[];
};
export declare class FlexGridRenderer extends FlexGridRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.FlexGridMatch>;
    render(match: SDK.CSSPropertyParserMatchers.FlexGridMatch, context: RenderingContext): Node[];
}
declare const CSSWideKeywordRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.CSSWideKeywordMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.CSSWideKeywordMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.CSSWideKeywordMatch, _context: RenderingContext): Node[];
};
export declare class CSSWideKeywordRenderer extends CSSWideKeywordRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.CSSWideKeywordMatch>;
    render(match: SDK.CSSPropertyParserMatchers.CSSWideKeywordMatch, context: RenderingContext): Node[];
}
declare const VariableRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParser.VariableMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParser.VariableMatch>;
    render(_match: SDK.CSSPropertyParser.VariableMatch, _context: RenderingContext): Node[];
};
export declare class VariableRenderer extends VariableRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement, style: SDK.CSSStyleDeclaration.CSSStyleDeclaration);
    matcher(): SDK.CSSPropertyParser.VariableMatcher;
    resolveVariable(match: SDK.CSSPropertyParser.VariableMatch): SDK.CSSMatchedStyles.CSSVariableValue | null;
    fallbackValue(match: SDK.CSSPropertyParser.VariableMatch): string | null;
    computedText(match: SDK.CSSPropertyParser.VariableMatch): string | null;
    render(match: SDK.CSSPropertyParser.VariableMatch, context: RenderingContext): Node[];
}
declare const LinearGradientRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.LinearGradientMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.LinearGradientMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.LinearGradientMatch, _context: RenderingContext): Node[];
};
export declare class LinearGradientRenderer extends LinearGradientRenderer_base {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.LinearGradientMatch>;
    render(match: SDK.CSSPropertyParserMatchers.LinearGradientMatch, context: RenderingContext): Node[];
}
declare const ColorRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.ColorMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.ColorMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.ColorMatch, _context: RenderingContext): Node[];
};
export declare class ColorRenderer extends ColorRenderer_base {
    #private;
    private readonly treeElement;
    constructor(treeElement: StylePropertyTreeElement);
    matcher(): SDK.CSSPropertyParserMatchers.ColorMatcher;
    render(match: SDK.CSSPropertyParserMatchers.ColorMatch, context: RenderingContext): Node[];
    renderColorSwatch(color: Common.Color.Color | undefined, valueChild?: Node): InlineEditor.ColorSwatch.ColorSwatch;
}
declare const LightDarkColorRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.LightDarkColorMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.LightDarkColorMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.LightDarkColorMatch, _context: RenderingContext): Node[];
};
export declare class LightDarkColorRenderer extends LightDarkColorRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    matcher(): SDK.CSSPropertyParserMatchers.LightDarkColorMatcher;
    render(match: SDK.CSSPropertyParserMatchers.LightDarkColorMatch, context: RenderingContext): Node[];
    applyColorScheme(match: SDK.CSSPropertyParserMatchers.LightDarkColorMatch, context: RenderingContext, colorSwatch: InlineEditor.ColorSwatch.ColorSwatch, light: HTMLSpanElement, dark: HTMLSpanElement, lightControls: SDK.CSSPropertyParser.CSSControlMap, darkControls: SDK.CSSPropertyParser.CSSControlMap): Promise<void>;
}
declare const ColorMixRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.ColorMixMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.ColorMixMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.ColorMixMatch, _context: RenderingContext): Node[];
};
export declare class ColorMixRenderer extends ColorMixRenderer_base {
    #private;
    constructor(pane: StylesSidebarPane);
    render(match: SDK.CSSPropertyParserMatchers.ColorMixMatch, context: RenderingContext): Node[];
    matcher(): SDK.CSSPropertyParserMatchers.ColorMixMatcher;
}
declare const AngleRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.AngleMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.AngleMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.AngleMatch, _context: RenderingContext): Node[];
};
export declare class AngleRenderer extends AngleRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    render(match: SDK.CSSPropertyParserMatchers.AngleMatch, context: RenderingContext): Node[];
    matcher(): SDK.CSSPropertyParserMatchers.AngleMatcher;
}
declare const LinkableNameRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.LinkableNameMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.LinkableNameMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.LinkableNameMatch, _context: RenderingContext): Node[];
};
export declare class LinkableNameRenderer extends LinkableNameRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    render(match: SDK.CSSPropertyParserMatchers.LinkableNameMatch): Node[];
    matcher(): SDK.CSSPropertyParserMatchers.LinkableNameMatcher;
}
declare const BezierRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.BezierMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.BezierMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.BezierMatch, _context: RenderingContext): Node[];
};
export declare class BezierRenderer extends BezierRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    render(match: SDK.CSSPropertyParserMatchers.BezierMatch): Node[];
    renderSwatch(match: SDK.CSSPropertyParserMatchers.BezierMatch): Node;
    matcher(): SDK.CSSPropertyParserMatchers.BezierMatcher;
}
declare const AutoBaseRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.AutoBaseMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.AutoBaseMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.AutoBaseMatch, _context: RenderingContext): Node[];
};
export declare class AutoBaseRenderer extends AutoBaseRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    matcher(): SDK.CSSPropertyParserMatchers.AutoBaseMatcher;
    render(match: SDK.CSSPropertyParserMatchers.AutoBaseMatch, context: RenderingContext): Node[];
}
export declare const enum ShadowPropertyType {
    X = "x",
    Y = "y",
    SPREAD = "spread",
    BLUR = "blur",
    INSET = "inset",
    COLOR = "color"
}
interface ShadowProperty {
    value: string | CodeMirror.SyntaxNode;
    source: CodeMirror.SyntaxNode | null;
    expansionContext: RenderingContext | null;
    propertyType: ShadowPropertyType;
}
export declare class ShadowModel implements InlineEditor.CSSShadowEditor.CSSShadowModel {
    #private;
    constructor(shadowType: SDK.CSSPropertyParserMatchers.ShadowType, properties: ShadowProperty[], context: RenderingContext);
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
declare const ShadowRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.ShadowMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.ShadowMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.ShadowMatch, _context: RenderingContext): Node[];
};
export declare class ShadowRenderer extends ShadowRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    shadowModel(shadow: CodeMirror.SyntaxNode[], shadowType: SDK.CSSPropertyParserMatchers.ShadowType, context: RenderingContext): null | ShadowModel;
    render(match: SDK.CSSPropertyParserMatchers.ShadowMatch, context: RenderingContext): Node[];
    matcher(): SDK.CSSPropertyParserMatchers.ShadowMatcher;
}
declare const FontRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.FontMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.FontMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.FontMatch, _context: RenderingContext): Node[];
};
export declare class FontRenderer extends FontRenderer_base {
    readonly treeElement: StylePropertyTreeElement;
    constructor(treeElement: StylePropertyTreeElement);
    render(match: SDK.CSSPropertyParserMatchers.FontMatch, context: RenderingContext): Node[];
    matcher(): SDK.CSSPropertyParserMatchers.FontMatcher;
}
declare const GridTemplateRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.GridTemplateMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.GridTemplateMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.GridTemplateMatch, _context: RenderingContext): Node[];
};
export declare class GridTemplateRenderer extends GridTemplateRenderer_base {
    render(match: SDK.CSSPropertyParserMatchers.GridTemplateMatch, context: RenderingContext): Node[];
    matcher(): SDK.CSSPropertyParserMatchers.GridTemplateMatcher;
}
declare const LengthRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.LengthMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.LengthMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.LengthMatch, _context: RenderingContext): Node[];
};
export declare class LengthRenderer extends LengthRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    render(match: SDK.CSSPropertyParserMatchers.LengthMatch, _context: RenderingContext): Node[];
    matcher(): SDK.CSSPropertyParserMatchers.LengthMatcher;
}
declare const SelectFunctionRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.SelectFunctionMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.SelectFunctionMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.SelectFunctionMatch, _context: RenderingContext): Node[];
};
export declare class SelectFunctionRenderer extends SelectFunctionRenderer_base {
    private readonly treeElement;
    constructor(treeElement: StylePropertyTreeElement);
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.SelectFunctionMatch>;
    render(match: SDK.CSSPropertyParserMatchers.SelectFunctionMatch, context: RenderingContext): Node[];
    applySelectFunction(renderedArgs: HTMLElement[], values: string[], functionText: string): Promise<void>;
}
declare const AnchorFunctionRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.AnchorFunctionMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.AnchorFunctionMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.AnchorFunctionMatch, _context: RenderingContext): Node[];
};
export declare class AnchorFunctionRenderer extends AnchorFunctionRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    anchorDecoratedForTest(): void;
    render(match: SDK.CSSPropertyParserMatchers.AnchorFunctionMatch, context: RenderingContext): Node[];
    matcher(): SDK.CSSPropertyParserMatchers.AnchorFunctionMatcher;
}
declare const PositionAnchorRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.PositionAnchorMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.PositionAnchorMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.PositionAnchorMatch, _context: RenderingContext): Node[];
};
export declare class PositionAnchorRenderer extends PositionAnchorRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    anchorDecoratedForTest(): void;
    render(match: SDK.CSSPropertyParserMatchers.PositionAnchorMatch): Node[];
    matcher(): SDK.CSSPropertyParserMatchers.PositionAnchorMatcher;
}
declare const PositionTryRenderer_base: abstract new () => {
    matcher(): SDK.CSSPropertyParser.Matcher<SDK.CSSPropertyParserMatchers.PositionTryMatch>;
    readonly matchType: SDK.CSSPropertyParser.Constructor<SDK.CSSPropertyParserMatchers.PositionTryMatch>;
    render(_match: SDK.CSSPropertyParserMatchers.PositionTryMatch, _context: RenderingContext): Node[];
};
export declare class PositionTryRenderer extends PositionTryRenderer_base {
    #private;
    constructor(treeElement: StylePropertyTreeElement);
    render(match: SDK.CSSPropertyParserMatchers.PositionTryMatch, context: RenderingContext): Node[];
    matcher(): SDK.CSSPropertyParserMatchers.PositionTryMatcher;
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
    gridNames(): Promise<Set<string>>;
    matchedStyles(): SDK.CSSMatchedStyles.CSSMatchedStyles;
    editable(): boolean;
    inherited(): boolean;
    overloaded(): boolean;
    setOverloaded(x: boolean): void;
    setComputedStyles(computedStyles: Map<string, string> | null): void;
    getComputedStyle(property: string): string | null;
    setParentsComputedStyles(parentsComputedStyles: Map<string, string> | null): void;
    get name(): string;
    get value(): string;
    updateFilter(): boolean;
    renderedPropertyText(): string;
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
    refreshIfComputedValueChanged(): void;
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
