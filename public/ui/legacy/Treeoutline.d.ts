import * as Common from '../../core/common/common.js';
import type * as Buttons from '../components/buttons/buttons.js';
import type * as IconButton from '../components/icon_button/icon_button.js';
import { type TemplateResult } from '../lit/lit.js';
import { type Config } from './InplaceEditor.js';
export declare enum Events {
    ElementAttached = "ElementAttached",
    ElementsDetached = "ElementsDetached",
    ElementExpanded = "ElementExpanded",
    ElementCollapsed = "ElementCollapsed",
    ElementSelected = "ElementSelected"
}
export interface EventTypes {
    [Events.ElementAttached]: TreeElement;
    [Events.ElementsDetached]: void;
    [Events.ElementExpanded]: TreeElement;
    [Events.ElementCollapsed]: TreeElement;
    [Events.ElementSelected]: TreeElement;
}
export declare class TreeOutline extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    readonly rootElementInternal: TreeElement;
    renderSelection: boolean;
    selectedTreeElement: TreeElement | null;
    expandTreeElementsWhenArrowing: boolean;
    comparator: ((arg0: TreeElement, arg1: TreeElement) => number) | null;
    contentElement: HTMLOListElement;
    preventTabOrder: boolean;
    showSelectionOnKeyboardFocus: boolean;
    private focusable;
    element: HTMLElement;
    private useLightSelectionColor;
    private treeElementToScrollIntoView;
    private centerUponScrollIntoView;
    constructor();
    setShowSelectionOnKeyboardFocus(show: boolean, preventTabOrder?: boolean): void;
    private createRootElement;
    rootElement(): TreeElement;
    firstChild(): TreeElement | null;
    private lastDescendent;
    appendChild(child: TreeElement, comparator?: ((arg0: TreeElement, arg1: TreeElement) => number)): void;
    insertChild(child: TreeElement, index: number): void;
    removeChild(child: TreeElement): void;
    removeChildren(): void;
    treeElementFromPoint(x: number, y: number): TreeElement | null;
    treeElementFromEvent(event: MouseEvent | null): TreeElement | null;
    setComparator(comparator: ((arg0: TreeElement, arg1: TreeElement) => number) | null): void;
    setFocusable(focusable: boolean): void;
    updateFocusable(): void;
    focus(): void;
    setUseLightSelectionColor(flag: boolean): void;
    getUseLightSelectionColor(): boolean;
    bindTreeElement(element: TreeElement): void;
    unbindTreeElement(element: TreeElement): void;
    selectPrevious(): boolean;
    selectNext(): boolean;
    forceSelect(omitFocus?: boolean | undefined, selectedByUser?: boolean | undefined): void;
    private selectFirst;
    private selectLast;
    private treeKeyDown;
    deferredScrollIntoView(treeElement: TreeElement, center: boolean): void;
    onStartedEditingTitle(_treeElement: TreeElement): void;
}
export declare const enum TreeVariant {
    NAVIGATION_TREE = "NavigationTree",
    OTHER = "Other"
}
export declare class TreeOutlineInShadow extends TreeOutline {
    element: HTMLElement;
    shadowRoot: ShadowRoot;
    private readonly disclosureElement;
    renderSelection: boolean;
    constructor(variant?: TreeVariant);
    registerRequiredCSS(...cssFiles: Array<string & {
        _tag: 'CSS-in-JS';
    }>): void;
    hideOverflow(): void;
    makeDense(): void;
    onStartedEditingTitle(treeElement: TreeElement): void;
}
export declare const treeElementBylistItemNode: WeakMap<Node, TreeElement>;
export declare class TreeElement {
    #private;
    treeOutline: TreeOutline | null;
    parent: TreeElement | null;
    previousSibling: TreeElement | null;
    nextSibling: TreeElement | null;
    private readonly boundOnFocus;
    private readonly boundOnBlur;
    readonly listItemNode: HTMLLIElement;
    titleElement: Node;
    titleInternal: string | Node;
    private childrenInternal;
    childrenListNode: HTMLOListElement;
    private expandLoggable;
    private hiddenInternal;
    private selectableInternal;
    expanded: boolean;
    selected: boolean;
    private expandable;
    private collapsible;
    toggleOnClick: boolean;
    button: Buttons.Button.Button | null;
    root: boolean;
    private tooltipInternal;
    private leadingIconsElement;
    private trailingIconsElement;
    protected selectionElementInternal: HTMLElement | null;
    private disableSelectFocus;
    constructor(title?: string | Node, expandable?: boolean, jslogContext?: string | number);
    static getTreeElementBylistItemNode(node: Node): TreeElement | undefined;
    hasAncestor(ancestor: TreeElement | null): boolean;
    hasAncestorOrSelf(ancestor: TreeElement | null): boolean;
    isHidden(): boolean;
    children(): TreeElement[];
    childCount(): number;
    firstChild(): TreeElement | null;
    lastChild(): TreeElement | null;
    childAt(index: number): TreeElement | null;
    indexOfChild(child: TreeElement): number;
    appendChild(child: TreeElement, comparator?: ((arg0: TreeElement, arg1: TreeElement) => number)): void;
    insertChild(child: TreeElement, index: number): void;
    removeChildAtIndex(childIndex: number): void;
    removeChild(child: TreeElement): void;
    removeChildren(): void;
    get selectable(): boolean;
    set selectable(x: boolean);
    get listItemElement(): HTMLLIElement;
    get childrenListElement(): HTMLOListElement;
    get title(): string | Node;
    set title(x: string | Node);
    titleAsText(): string;
    startEditingTitle<T>(editingConfig: Config<T>): void;
    setLeadingIcons(icons: IconButton.Icon.Icon[] | TemplateResult[]): void;
    get tooltip(): string;
    set tooltip(x: string);
    isExpandable(): boolean;
    setExpandable(expandable: boolean): void;
    isExpandRecursively(): boolean;
    setExpandRecursively(expandRecursively: boolean): void;
    isCollapsible(): boolean;
    setCollapsible(collapsible: boolean): void;
    get hidden(): boolean;
    set hidden(x: boolean);
    invalidateChildren(): void;
    private ensureSelection;
    private treeElementToggled;
    private handleMouseDown;
    private handleDoubleClick;
    private detach;
    collapse(): void;
    collapseRecursively(): void;
    collapseChildren(): void;
    expand(): void;
    expandRecursively(maxDepth?: number): Promise<void>;
    collapseOrAscend(altKey: boolean): boolean;
    descendOrExpand(altKey: boolean): boolean;
    reveal(center?: boolean): void;
    revealed(): boolean;
    selectOnMouseDown(event: MouseEvent): void;
    select(omitFocus?: boolean, selectedByUser?: boolean): boolean;
    setFocusable(focusable: boolean): void;
    private onFocus;
    private onBlur;
    revealAndSelect(omitFocus?: boolean): void;
    deselect(): void;
    private populateIfNeeded;
    onpopulate(): Promise<void>;
    onenter(): boolean;
    ondelete(): boolean;
    onspace(): boolean;
    onbind(): void;
    onunbind(): void;
    onattach(): void;
    onexpand(): void;
    oncollapse(): void;
    ondblclick(_e: Event): boolean;
    onselect(_selectedByUser?: boolean): boolean;
    traverseNextTreeElement(skipUnrevealed: boolean, stayWithin?: TreeElement | null, dontPopulate?: boolean, info?: {
        depthChange: number;
    }): TreeElement | null;
    traversePreviousTreeElement(skipUnrevealed: boolean, dontPopulate?: boolean): TreeElement | null;
    isEventWithinDisclosureTriangle(event: MouseEvent): boolean;
    setDisableSelectFocus(toggle: boolean): void;
}
