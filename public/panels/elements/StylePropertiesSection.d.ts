import '../../ui/legacy/legacy.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import type * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as ElementsComponents from './components/components.js';
import { type Context, StylePropertyTreeElement } from './StylePropertyTreeElement.js';
import { StylesSidebarPane } from './StylesSidebarPane.js';
export declare class StylePropertiesSection {
    #private;
    protected parentPane: StylesSidebarPane;
    styleInternal: SDK.CSSStyleDeclaration.CSSStyleDeclaration;
    readonly matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles;
    private computedStyles;
    private parentsComputedStyles;
    editable: boolean;
    private hoverTimer;
    private willCauseCancelEditing;
    private forceShowAll;
    private readonly originalPropertiesCount;
    element: HTMLDivElement;
    private readonly titleElement;
    propertiesTreeOutline: UI.TreeOutline.TreeOutlineInShadow;
    private showAllButton;
    protected selectorElement: HTMLSpanElement;
    private readonly newStyleRuleToolbar;
    private readonly fontEditorToolbar;
    private readonly fontEditorSectionManager;
    private readonly fontEditorButton;
    private selectedSinceMouseDown;
    private readonly elementToSelectorIndex;
    navigable: boolean | null | undefined;
    protected readonly selectorRefElement: HTMLElement;
    private hoverableSelectorsMode;
    private isHiddenInternal;
    protected customPopulateCallback: () => void;
    nestingLevel: number;
    nextEditorTriggerButtonIdx: number;
    private sectionIdx;
    readonly sectionTooltipIdPrefix: number;
    constructor(parentPane: StylesSidebarPane, matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, style: SDK.CSSStyleDeclaration.CSSStyleDeclaration, sectionIdx: number, computedStyles: Map<string, string> | null, parentsComputedStyles: Map<string, string> | null, customHeaderText?: string);
    setComputedStyles(computedStyles: Map<string, string> | null): void;
    setParentsComputedStyles(parentsComputedStyles: Map<string, string> | null): void;
    updateAuthoringHint(): void;
    setSectionIdx(sectionIdx: number): void;
    getSectionIdx(): number;
    registerFontProperty(treeElement: StylePropertyTreeElement): void;
    resetToolbars(): void;
    static createRuleOriginNode(matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, linkifier: Components.Linkifier.Linkifier, rule: SDK.CSSRule.CSSRule | null): Node;
    protected createRuleOriginNode(matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, linkifier: Components.Linkifier.Linkifier, rule: SDK.CSSRule.CSSRule | null): Node;
    private static getRuleLocationFromCSSRule;
    static tryNavigateToRuleLocation(matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, rule: SDK.CSSRule.CSSRule | null): void;
    protected static linkifyRuleLocation(cssModel: SDK.CSSModel.CSSModel, linkifier: Components.Linkifier.Linkifier, styleSheetId: Protocol.CSS.StyleSheetId, ruleLocation: TextUtils.TextRange.TextRange): Node;
    private static getCSSSelectorLocation;
    private getFocused;
    private focusNext;
    private ruleNavigation;
    private onKeyDown;
    private setSectionHovered;
    private onMouseLeave;
    private onMouseMove;
    private onFontEditorButtonClicked;
    style(): SDK.CSSStyleDeclaration.CSSStyleDeclaration;
    headerText(): string;
    private onMouseOutSelector;
    private onMouseEnterSelector;
    highlight(mode?: string | undefined): void;
    firstSibling(): StylePropertiesSection | null;
    findCurrentOrNextVisible(willIterateForward: boolean, originalSection?: StylePropertiesSection): StylePropertiesSection | null;
    lastSibling(): StylePropertiesSection | null;
    nextSibling(): StylePropertiesSection | undefined;
    previousSibling(): StylePropertiesSection | undefined;
    private onNewRuleClick;
    styleSheetEdited(edit: SDK.CSSModel.Edit): void;
    protected createAncestorRules(rule: SDK.CSSRule.CSSStyleRule): void;
    protected createClosingBrace(): HTMLElement;
    protected indentElement(element: HTMLElement, nestingLevel: number, clipboardOnly?: boolean): HTMLElement;
    protected createMediaElement(media: SDK.CSSMedia.CSSMedia): ElementsComponents.CSSQuery.CSSQuery | undefined;
    protected createContainerQueryElement(containerQuery: SDK.CSSContainerQuery.CSSContainerQuery): ElementsComponents.CSSQuery.CSSQuery | undefined;
    protected createScopeElement(scope: SDK.CSSScope.CSSScope): ElementsComponents.CSSQuery.CSSQuery | undefined;
    protected createSupportsElement(supports: SDK.CSSSupports.CSSSupports): ElementsComponents.CSSQuery.CSSQuery | undefined;
    protected createNestingElement(nestingSelector?: string): HTMLElement | undefined;
    private addContainerForContainerQuery;
    private updateAncestorRuleList;
    isPropertyInherited(propertyName: string): boolean;
    nextEditableSibling(): StylePropertiesSection | null;
    previousEditableSibling(): StylePropertiesSection | null;
    refreshUpdate(editedTreeElement: StylePropertyTreeElement): void;
    updateVarFunctions(editedTreeElement: StylePropertyTreeElement): void;
    update(full: boolean): void;
    showAllItems(event?: Event): void;
    onpopulate(): void;
    populateStyle(style: SDK.CSSStyleDeclaration.CSSStyleDeclaration, parent: TreeElementParent): void;
    isPropertyOverloaded(property: SDK.CSSProperty.CSSProperty): boolean;
    updateFilter(): boolean;
    isHidden(): boolean;
    markSelectorMatches(): void;
    static getNextSpecificityTooltipId(): string;
    renderSelectors(selectors: Array<{
        text: string;
        specificity?: Protocol.CSS.Specificity;
    }>, matchingSelectors: boolean[], elementToSelectorIndex: WeakMap<Element, number>): void;
    markSelectorHighlights(): void;
    addNewBlankProperty(index?: number | undefined): StylePropertyTreeElement;
    private handleEmptySpaceMouseDown;
    private handleEmptySpaceClick;
    private handleQueryRuleClick;
    private editingMediaFinished;
    private editingMediaCancelled;
    private editingMediaBlurHandler;
    private editingMediaCommitted;
    private editingMediaTextCommittedForTest;
    private handleSelectorClick;
    private handleContextMenuEvent;
    private navigateToSelectorSource;
    private static revealSelectorSource;
    private startEditingAtFirstPosition;
    startEditingSelector(): void;
    moveEditorFromSelector(moveDirection: string): void;
    editingSelectorCommitted(_element: Element, newContent: string, oldContent: string | null, _context: Context | undefined, moveDirection: string): void;
    setHeaderText(rule: SDK.CSSRule.CSSRule, newContent: string): Promise<void>;
    protected editingSelectorCommittedForTest(): void;
    protected updateRuleOrigin(): void;
    protected editingSelectorEnded(): void;
    editingSelectorCancelled(): void;
    /**
     * A property at or near an index and suitable for subsequent editing.
     * Either the last property, if index out-of-upper-bound,
     * or property at index, if such a property exists,
     * or otherwise, null.
     */
    closestPropertyForEditing(propertyIndex: number): UI.TreeOutline.TreeElement | null;
}
export declare class BlankStylePropertiesSection extends StylePropertiesSection {
    private normal;
    private readonly ruleLocation;
    private readonly styleSheetId;
    constructor(stylesPane: StylesSidebarPane, matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, defaultSelectorText: string, styleSheetId: Protocol.CSS.StyleSheetId, ruleLocation: TextUtils.TextRange.TextRange, insertAfterStyle: SDK.CSSStyleDeclaration.CSSStyleDeclaration, sectionIdx: number);
    private actualRuleLocation;
    private rulePrefix;
    get isBlank(): boolean;
    editingSelectorCommitted(element: Element, newContent: string, oldContent: string, context: Context | undefined, moveDirection: string): void;
    editingSelectorCancelled(): void;
    private makeNormal;
}
export declare class RegisteredPropertiesSection extends StylePropertiesSection {
    constructor(stylesPane: StylesSidebarPane, matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, style: SDK.CSSStyleDeclaration.CSSStyleDeclaration, sectionIdx: number, propertyName: string, expandedByDefault: boolean);
    setHeaderText(rule: SDK.CSSRule.CSSRule, newContent: string): Promise<void>;
    createRuleOriginNode(matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, linkifier: Components.Linkifier.Linkifier, rule: SDK.CSSRule.CSSRule | null): Node;
}
export declare class FunctionRuleSection extends StylePropertiesSection {
    constructor(stylesPane: StylesSidebarPane, matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, style: SDK.CSSStyleDeclaration.CSSStyleDeclaration, children: SDK.CSSRule.CSSNestedStyle[], sectionIdx: number, functionName: string, expandedByDefault: boolean);
    createConditionElement(condition: SDK.CSSRule.CSSNestedStyleCondition): HTMLElement | undefined;
    positionNestingElement(element: HTMLElement): HTMLElement;
    addChildren(children: SDK.CSSRule.CSSNestedStyle[], parent: TreeElementParent): void;
}
export declare class FontPaletteValuesRuleSection extends StylePropertiesSection {
    constructor(stylesPane: StylesSidebarPane, matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, style: SDK.CSSStyleDeclaration.CSSStyleDeclaration, sectionIdx: number);
}
export declare class PositionTryRuleSection extends StylePropertiesSection {
    constructor(stylesPane: StylesSidebarPane, matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, style: SDK.CSSStyleDeclaration.CSSStyleDeclaration, sectionIdx: number, active: boolean);
}
export declare class KeyframePropertiesSection extends StylePropertiesSection {
    constructor(stylesPane: StylesSidebarPane, matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, style: SDK.CSSStyleDeclaration.CSSStyleDeclaration, sectionIdx: number);
    headerText(): string;
    setHeaderText(rule: SDK.CSSRule.CSSRule, newContent: string): Promise<void>;
    isPropertyInherited(_propertyName: string): boolean;
    isPropertyOverloaded(_property: SDK.CSSProperty.CSSProperty): boolean;
    markSelectorHighlights(): void;
    markSelectorMatches(): void;
    highlight(): void;
}
export declare class HighlightPseudoStylePropertiesSection extends StylePropertiesSection {
    isPropertyInherited(_propertyName: string): boolean;
}
interface TreeElementParent {
    appendChild(child: UI.TreeOutline.TreeElement): void;
}
export {};
