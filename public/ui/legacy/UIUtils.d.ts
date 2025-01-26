import './Toolbar.js';
import * as Platform from '../../core/platform/platform.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as Buttons from '../components/buttons/buttons.js';
import * as IconButton from '../components/icon_button/icon_button.js';
import { Size } from './Geometry.js';
import type { ToolbarButton } from './Toolbar.js';
import type { TreeOutline } from './Treeoutline.js';
declare global {
    interface HTMLElementTagNameMap {
        'dt-checkbox': CheckboxLabel;
        'dt-close-button': DevToolsCloseButton;
        'dt-icon-label': DevToolsIconLabel;
        'dt-small-bubble': DevToolsSmallBubble;
    }
}
export declare const highlightedSearchResultClassName = "highlighted-search-result";
export declare const highlightedCurrentSearchResultClassName = "current-search-result";
export declare function installDragHandle(element: Element, elementDragStart: ((arg0: MouseEvent) => boolean) | null, elementDrag: (arg0: MouseEvent) => void, elementDragEnd: ((arg0: MouseEvent) => void) | null, cursor: string | null, hoverCursor?: string | null, startDelay?: number): void;
export declare function elementDragStart(targetElement: Element, elementDragStart: ((arg0: MouseEvent) => boolean) | null, elementDrag: (arg0: MouseEvent) => void, elementDragEnd: ((arg0: MouseEvent) => void) | null, cursor: string | null, event: Event): void;
export declare function isBeingEdited(node?: Node | null): boolean;
export declare function isEditing(): boolean;
export declare function markBeingEdited(element: Element, value: boolean): boolean;
export declare const StyleValueDelimiters = " \u00A0\t\n\"':;,/()";
export declare function getValueModificationDirection(event: Event): string | null;
export declare function modifiedFloatNumber(number: number, event: Event, modifierMultiplier?: number): number | null;
export declare function createReplacementString(wordString: string, event: Event, customNumberHandler?: ((arg0: string, arg1: number, arg2: string) => string)): string | null;
export declare function isElementValueModification(event: Event): boolean;
export declare function handleElementValueModifications(event: Event, element: Element, finishHandler?: ((arg0: string, arg1: string) => void), suggestionHandler?: ((arg0: string) => boolean), customNumberHandler?: ((arg0: string, arg1: number, arg2: string) => string)): boolean;
export declare function openLinkExternallyLabel(): string;
export declare function copyLinkAddressLabel(): string;
export declare function copyFileNameLabel(): string;
export declare function anotherProfilerActiveLabel(): string;
export declare function asyncStackTraceLabel(description: string | undefined, previousCallFrames: {
    functionName: string;
}[]): string;
export declare function addPlatformClass(element: HTMLElement): void;
export declare function installComponentRootStyles(element: HTMLElement): void;
export declare class ElementFocusRestorer {
    private element;
    private previous;
    constructor(element: Element);
    restore(): void;
}
export declare function highlightSearchResult(element: Element, offset: number, length: number, domChanges?: HighlightChange[]): Element | null;
export declare function highlightSearchResults(element: Element, resultRanges: TextUtils.TextRange.SourceRange[], changes?: HighlightChange[]): Element[];
export declare function runCSSAnimationOnce(element: Element, className: string): void;
export declare function highlightRangesWithStyleClass(element: Element, resultRanges: TextUtils.TextRange.SourceRange[], styleClass: string, changes?: HighlightChange[]): Element[];
export declare function applyDomChanges(domChanges: HighlightChange[]): void;
export declare function revertDomChanges(domChanges: HighlightChange[]): void;
export declare function measurePreferredSize(element: Element, containerElement?: Element | null): Size;
export declare function startBatchUpdate(): void;
export declare function endBatchUpdate(): void;
export declare function invokeOnceAfterBatchUpdate(object: Object, method: () => void): void;
export declare function animateFunction(window: Window, func: Function, params: {
    from: number;
    to: number;
}[], duration: number, animationComplete?: (() => void)): () => void;
export declare class LongClickController {
    private readonly element;
    private readonly callback;
    private readonly editKey;
    private longClickData;
    private longClickInterval;
    constructor(element: Element, callback: (arg0: Event) => void, isEditKeyFunc?: (arg0: KeyboardEvent) => boolean);
    reset(): void;
    private enable;
    dispose(): void;
    static readonly TIME_MS = 200;
}
export declare function initializeUIUtils(document: Document): void;
export declare function beautifyFunctionName(name: string): string;
export declare const createTextChild: (element: Element | DocumentFragment, text: string) => Text;
export declare const createTextChildren: (element: Element | DocumentFragment, ...childrenText: string[]) => void;
export declare function createTextButton(text: string, clickHandler?: ((arg0: Event) => void), opts?: {
    className?: string;
    jslogContext?: string;
    variant?: Buttons.Button.Variant;
    title?: string;
    icon?: string;
}): Buttons.Button.Button;
export declare function createInput(className?: string, type?: string, jslogContext?: string): HTMLInputElement;
export declare function createHistoryInput(type?: string, className?: string): HTMLInputElement;
export declare function createSelect(name: string, options: string[] | Map<string, string[]>[] | Set<string>): HTMLSelectElement;
export declare function createOption(title: string, value?: string, jslogContext?: string): HTMLOptionElement;
export declare function createLabel(title: string, className?: string, associatedControl?: Element): Element;
export declare function createIconLabel(options: {
    title?: string;
    iconName: string;
    color?: string;
    width?: '14px' | '20px';
    height?: '14px' | '20px';
}): DevToolsIconLabel;
/**
 * Creates a radio button, which is comprised of a `<label>` and an `<input type="radio">` element.
 *
 * The returned pair contains the `label` element and and the `radio` input element. The latter is
 * a child of the `label`, and therefore no association via `for` attribute is necessary to make
 * the radio button accessible.
 *
 * The element is automatically styled correctly, as long as the core styles (in particular
 * `inspectorCommon.css` is injected into the current document / shadow root). The lit-html
 * equivalent of calling this method is:
 *
 * ```js
 * const jslog = VisualLogging.toggle().track({change: true}).context(jslogContext);
 * html`<label><input type="radio" name=${name} jslog=${jslog}>${title}</label>`
 * ```
 *
 * @param name the name of the radio group.
 * @param title the label text for the radio button.
 * @param jslogContext the context string for the `jslog` attribute.
 * @returns the pair of `HTMLLabelElement` and `HTMLInputElement`.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
 */
export declare function createRadioButton(name: string, title: string, jslogContext: string): {
    label: HTMLLabelElement;
    radio: HTMLInputElement;
};
/**
 * Creates an `<input type="range">` element with the specified parameters (a slider)
 * and a `step` of 1 (the default for the element).
 *
 * The element is automatically styled correctly, as long as the core styles (in particular
 * `inspectorCommon.css` is injected into the current document / shadow root). The lit-html
 * equivalent of calling this method is:
 *
 * ```js
 * html`<input type="range" min=${min} max=${max} tabindex=${tabIndex}>`
 * ```
 *
 * @param min the minimum allowed value.
 * @param max the maximum allowed value.
 * @param tabIndex the value for the `tabindex` attribute.
 * @returns the newly created `HTMLInputElement` for the slider.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
 */
export declare function createSlider(min: number, max: number, tabIndex: number): HTMLInputElement;
export declare function setTitle(element: HTMLElement, title: string): void;
export declare class CheckboxLabel extends HTMLElement {
    private readonly shadowRootInternal;
    checkboxElement: HTMLInputElement;
    textElement: HTMLElement;
    constructor();
    connectedCallback(): void;
    static create(title?: Platform.UIString.LocalizedString, checked?: boolean, subtitle?: Platform.UIString.LocalizedString, jslogContext?: string, small?: boolean): CheckboxLabel;
    /** Only to be used when the checkbox label is 'generated' (a regex, a className, etc). Most checkboxes should be create()'d with UIStrings */
    static createWithStringLiteral(title?: string, checked?: boolean, subtitle?: Platform.UIString.LocalizedString, jslogContext?: string, small?: boolean): CheckboxLabel;
    private static lastId;
}
export declare class DevToolsIconLabel extends HTMLElement {
    #private;
    constructor();
    set data(data: IconButton.Icon.IconData);
}
export declare class DevToolsSmallBubble extends HTMLElement {
    #private;
    private textElement;
    constructor();
    connectedCallback(): void;
    set type(type: string);
}
export declare class DevToolsCloseButton extends HTMLElement {
    #private;
    constructor();
    setAccessibleName(name: string): void;
    setTabbable(tabbable: boolean): void;
}
export declare function bindInput(input: HTMLInputElement, apply: (arg0: string) => void, validate: (arg0: string) => {
    valid: boolean;
    errorMessage: (string | undefined);
}, numeric: boolean, modifierMultiplier?: number): (arg0: string) => void;
export declare function trimText(context: CanvasRenderingContext2D, text: string, maxWidth: number, trimFunction: (arg0: string, arg1: number) => string): string;
export declare function trimTextMiddle(context: CanvasRenderingContext2D, text: string, maxWidth: number): string;
export declare function trimTextEnd(context: CanvasRenderingContext2D, text: string, maxWidth: number): string;
export declare function measureTextWidth(context: CanvasRenderingContext2D, text: string): number;
/**
 * Adds a 'utm_source=devtools' as query parameter to the url.
 */
export declare function addReferrerToURL(url: Platform.DevToolsPath.UrlString): Platform.DevToolsPath.UrlString;
/**
 * We want to add a referrer query param to every request to
 * 'web.dev' or 'developers.google.com'.
 */
export declare function addReferrerToURLIfNecessary(url: Platform.DevToolsPath.UrlString): Platform.DevToolsPath.UrlString;
export declare function loadImage(url: string): Promise<HTMLImageElement | null>;
/**
 * Creates a file selector element.
 * @param callback - the function that will be called with the file the user selected
 * @param accept - optionally used to set the [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) parameter to limit file-types the user can pick.
 */
export declare function createFileSelectorElement(callback: (arg0: File) => void, accept?: string): HTMLInputElement;
export declare const MaxLengthForDisplayedURLs = 150;
export declare class MessageDialog {
    static show(message: string, where?: Element | Document, jslogContext?: string): Promise<void>;
}
export declare class ConfirmDialog {
    static show(message: string, where?: Element | Document, options?: ConfirmDialogOptions): Promise<boolean>;
}
export declare function createInlineButton(toolbarButton: ToolbarButton): Element;
export declare abstract class Renderer {
    abstract render(object: Object, options?: Options): Promise<{
        node: Node;
        tree: TreeOutline | null;
    } | null>;
    static render(object: Object, options?: Options): Promise<{
        node: Node;
        tree: TreeOutline | null;
    } | null>;
}
export declare function formatTimestamp(timestamp: number, full: boolean): string;
export interface Options {
    title?: string | Element;
    editable?: boolean;
}
export interface HighlightChange {
    node: Element | Text;
    type: string;
    oldText?: string;
    newText?: string;
    nextSibling?: Node;
    parent?: Node;
}
export declare const isScrolledToBottom: (element: Element) => boolean;
export declare function createSVGChild(element: Element, childType: string, className?: string): Element;
export declare const enclosingNodeOrSelfWithNodeNameInArray: (initialNode: Node, nameArray: string[]) => Node | null;
export declare const enclosingNodeOrSelfWithNodeName: (node: Node, nodeName: string) => Node | null;
export declare const deepElementFromPoint: (document: Document | ShadowRoot | null | undefined, x: number, y: number) => Node | null;
export declare const deepElementFromEvent: (ev: Event) => Node | null;
export declare function registerRenderer(registration: RendererRegistration): void;
export declare function getApplicableRegisteredRenderers(object: Object): RendererRegistration[];
export interface RendererRegistration {
    loadRenderer: () => Promise<Renderer>;
    contextTypes: () => Array<Function>;
}
export interface ConfirmDialogOptions {
    okButtonLabel?: string;
    cancelButtonLabel?: string;
    jslogContext?: string;
}
export declare function injectCoreStyles(elementOrShadowRoot: Element | ShadowRoot): void;
/**
 * Creates a new shadow DOM tree with the core styles and an optional list of
 * additional styles, and attaches it to the specified `element`.
 *
 * @param element the `Element` to attach the shadow DOM tree to.
 * @param options optional additional style sheets and options for `Element#attachShadow()`.
 * @returns the newly created `ShadowRoot`.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
 */
export declare function createShadowRootWithCoreStyles(element: Element, options?: {
    cssFile?: CSSStyleSheet[];
    delegatesFocus?: boolean;
}): ShadowRoot;
export declare function resetMeasuredScrollbarWidthForTest(): void;
export declare function measuredScrollbarWidth(document?: Document | null): number;
