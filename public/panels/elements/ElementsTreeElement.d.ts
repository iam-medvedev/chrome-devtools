import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Elements from '../../models/elements/elements.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as Adorners from '../../ui/components/adorners/adorners.js';
import * as TextEditor from '../../ui/components/text_editor/text_editor.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as ElementsComponents from './components/components.js';
import { type ElementsTreeOutline } from './ElementsTreeOutline.js';
declare const enum TagType {
    OPENING = "OPENING_TAG",
    CLOSING = "CLOSING_TAG"
}
interface OpeningTagContext {
    tagType: TagType.OPENING;
    readonly adornerContainer: HTMLElement;
    adorners: Set<Adorners.Adorner.Adorner>;
    styleAdorners: Set<Adorners.Adorner.Adorner>;
    readonly adornersThrottler: Common.Throttler.Throttler;
    canAddAttributes: boolean;
    slot?: Adorners.Adorner.Adorner;
}
interface ClosingTagContext {
    tagType: TagType.CLOSING;
}
export type TagTypeContext = OpeningTagContext | ClosingTagContext;
export declare function isOpeningTag(context: TagTypeContext): context is OpeningTagContext;
export declare class ElementsTreeElement extends UI.TreeOutline.TreeElement {
    #private;
    nodeInternal: SDK.DOMModel.DOMNode;
    treeOutline: ElementsTreeOutline | null;
    private gutterContainer;
    private readonly decorationsElement;
    private searchQuery;
    private expandedChildrenLimitInternal;
    private readonly decorationsThrottler;
    private inClipboard;
    private hoveredInternal;
    private editing;
    private htmlEditElement?;
    expandAllButtonElement: UI.TreeOutline.TreeElement | null;
    selectionElement?: HTMLDivElement;
    private hintElement?;
    private aiButtonContainer?;
    private contentElement;
    readonly tagTypeContext: TagTypeContext;
    constructor(node: SDK.DOMModel.DOMNode, isClosingTag?: boolean);
    static animateOnDOMUpdate(treeElement: ElementsTreeElement): void;
    static visibleShadowRoots(node: SDK.DOMModel.DOMNode): SDK.DOMModel.DOMNode[];
    static canShowInlineText(node: SDK.DOMModel.DOMNode): boolean;
    static populateForcedPseudoStateItems(contextMenu: UI.ContextMenu.ContextMenu, node: SDK.DOMModel.DOMNode): void;
    isClosingTag(): boolean;
    node(): SDK.DOMModel.DOMNode;
    isEditing(): boolean;
    highlightSearchResults(searchQuery: string): void;
    hideSearchHighlights(): void;
    setInClipboard(inClipboard: boolean): void;
    get hovered(): boolean;
    set hovered(isHovered: boolean);
    addIssue(newIssue: IssuesManager.Issue.Issue): void;
    get issuesByNodeElement(): Map<Element, IssuesManager.Issue.Issue[]>;
    expandedChildrenLimit(): number;
    setExpandedChildrenLimit(expandedChildrenLimit: number): void;
    createSlotLink(nodeShortcut: SDK.DOMModel.DOMNodeShortcut | null): void;
    private createSelection;
    private createHint;
    private createAiButton;
    onbind(): void;
    onunbind(): void;
    onattach(): void;
    onpopulate(): Promise<void>;
    expandRecursively(): Promise<void>;
    onexpand(): void;
    oncollapse(): void;
    select(omitFocus?: boolean, selectedByUser?: boolean): boolean;
    onselect(selectedByUser?: boolean): boolean;
    ondelete(): boolean;
    onenter(): boolean;
    selectOnMouseDown(event: MouseEvent): void;
    ondblclick(event: Event): boolean;
    hasEditableNode(): boolean;
    private insertInLastAttributePosition;
    private startEditingTarget;
    private showContextMenu;
    populateTagContextMenu(contextMenu: UI.ContextMenu.ContextMenu, event: Event): void;
    populatePseudoElementContextMenu(contextMenu: UI.ContextMenu.ContextMenu): void;
    private populateExpandRecursively;
    private populateScrollIntoView;
    populateTextContextMenu(contextMenu: UI.ContextMenu.ContextMenu, textNode: Element): void;
    populateNodeContextMenu(contextMenu: UI.ContextMenu.ContextMenu): void;
    private startEditing;
    private addNewAttribute;
    private triggerEditAttribute;
    private startEditingAttribute;
    private startEditingTextNode;
    private startEditingTagName;
    private updateEditorHandles;
    private startEditingAsHTML;
    private attributeEditingCommitted;
    private tagNameEditingCommitted;
    private textNodeEditingCommitted;
    private editingCancelled;
    private distinctClosingTagElement;
    updateTitle(updateRecord?: Elements.ElementUpdateRecord.ElementUpdateRecord | null): void;
    private computeLeftIndent;
    updateDecorations(): void;
    private updateDecorationsInternal;
    private buildAttributeDOM;
    private linkifyElementByRelation;
    private buildPseudoElementDOM;
    private buildTagDOM;
    private nodeTitleInfo;
    remove(): Promise<void>;
    toggleEditAsHTML(callback?: ((arg0: boolean) => void), startEditing?: boolean): void;
    private copyCSSPath;
    private copyJSPath;
    private copyXPath;
    private copyFullXPath;
    copyStyles(): Promise<void>;
    private highlightSearchResultsInternal;
    private editAsHTML;
    adorn({ name }: {
        name: string;
    }, content?: HTMLElement): Adorners.Adorner.Adorner;
    adornSlot({ name }: {
        name: string;
    }, context: OpeningTagContext): Adorners.Adorner.Adorner;
    adornMedia({ name }: {
        name: string;
    }): Adorners.Adorner.Adorner;
    removeAdorner(adornerToRemove: Adorners.Adorner.Adorner, context: OpeningTagContext): void;
    /**
     * @param adornerType optional type of adorner to remove. If not provided, remove all adorners.
     */
    removeAdornersByType(adornerType?: ElementsComponents.AdornerManager.RegisteredAdorners): void;
    private updateAdorners;
    private updateAdornersInternal;
    updateStyleAdorners(): Promise<void>;
    pushPopoverAdorner(context: OpeningTagContext): void;
    pushGridAdorner(context: OpeningTagContext, isSubgrid: boolean): void;
    pushScrollSnapAdorner(context: OpeningTagContext): void;
    pushFlexAdorner(context: OpeningTagContext): void;
    pushContainerAdorner(context: OpeningTagContext): void;
    pushMediaAdorner(context: OpeningTagContext): void;
    updateScrollAdorner(): void;
    pushScrollAdorner(): void;
}
export declare const InitialChildrenLimit = 500;
export declare const ForbiddenClosingTagElements: Set<string>;
export declare const EditTagBlocklist: Set<string>;
export declare function adornerComparator(adornerA: Adorners.Adorner.Adorner, adornerB: Adorners.Adorner.Adorner): number;
export declare function convertUnicodeCharsToHTMLEntities(text: string): {
    text: string;
    entityRanges: TextUtils.TextRange.SourceRange[];
};
export interface EditorHandles {
    commit: () => void;
    cancel: () => void;
    editor?: TextEditor.TextEditor.TextEditor;
    resize: () => void;
}
export {};
