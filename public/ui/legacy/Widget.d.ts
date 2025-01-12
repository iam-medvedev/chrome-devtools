import '../../core/dom_extension/dom_extension.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import { Constraints } from './Geometry.js';
export declare class WidgetElement<WidgetT extends Widget> extends HTMLElement {
    widgetClass?: new (...args: any[]) => WidgetT;
    widgetParams: unknown[];
    createWidget(): WidgetT;
    connectedCallback(): void;
}
interface Constructor<T, Args extends unknown[]> {
    new (...args: Args): T;
}
export declare function widgetRef<T extends Widget, Args extends unknown[]>(type: Constructor<T, Args>, callback: (_: T) => void): ReturnType<typeof LitHtml.Directives.ref>;
export declare class Widget {
    #private;
    readonly element: HTMLElement;
    contentElement: HTMLElement;
    private shadowRoot;
    protected visibleInternal: boolean;
    private isRoot;
    private isShowingInternal;
    private readonly childrenInternal;
    private hideOnDetach;
    private notificationDepth;
    private invalidationsSuspended;
    defaultFocusedChild: Widget | null;
    private parentWidgetInternal;
    private defaultFocusedElement?;
    private cachedConstraints?;
    private constraintsInternal?;
    private invalidationsRequested?;
    private externallyManaged?;
    constructor(useShadowDom?: boolean, delegatesFocus?: boolean, element?: HTMLElement);
    /**
     * Returns the {@link Widget} whose element is the given `node`, or `undefined`
     * if the `node` is not an element for a widget.
     *
     * @param node a DOM node.
     * @returns the {@link Widget} that is attached to the `node` or `undefined`.
     */
    static get(node: Node): Widget | undefined;
    static getOrCreateWidget(element: HTMLElement): Widget;
    markAsRoot(): void;
    parentWidget(): Widget | null;
    children(): Widget[];
    childWasDetached(_widget: Widget): void;
    isShowing(): boolean;
    shouldHideOnDetach(): boolean;
    setHideOnDetach(): void;
    private inNotification;
    private parentIsShowing;
    protected callOnVisibleChildren(method: (this: Widget) => void): void;
    private processWillShow;
    private processWasShown;
    private processWillHide;
    private processWasHidden;
    private processOnResize;
    private notify;
    wasShown(): void;
    willHide(): void;
    onResize(): void;
    onLayout(): void;
    onDetach(): void;
    ownerViewDisposed(): Promise<void>;
    show(parentElement: Element, insertBefore?: Node | null): void;
    private attach;
    showWidget(): void;
    private showWidgetInternal;
    hideWidget(): void;
    private hideWidgetInternal;
    detach(overrideHideOnDetach?: boolean): void;
    detachChildWidgets(): void;
    elementsToRestoreScrollPositionsFor(): Element[];
    storeScrollPositions(): void;
    restoreScrollPositions(): void;
    doResize(): void;
    doLayout(): void;
    registerRequiredCSS(cssFile: {
        cssContent: string;
    }): void;
    registerCSSFiles(cssFiles: CSSStyleSheet[]): void;
    printWidgetHierarchy(): void;
    private collectWidgetHierarchy;
    setDefaultFocusedElement(element: Element | null): void;
    setDefaultFocusedChild(child: Widget): void;
    focus(): void;
    hasFocus(): boolean;
    calculateConstraints(): Constraints;
    constraints(): Constraints;
    setMinimumAndPreferredSizes(width: number, height: number, preferredWidth: number, preferredHeight: number): void;
    setMinimumSize(width: number, height: number): void;
    private hasNonZeroConstraints;
    suspendInvalidations(): void;
    resumeInvalidations(): void;
    invalidateConstraints(): void;
    markAsExternallyManaged(): void;
    /**
     * Override this method in derived classes to perform the actual view update.
     *
     * This is not meant to be called directly, but invoked (indirectly) through
     * the `requestAnimationFrame` and executed with the animation frame. Instead,
     * use the `update()` method to schedule an asynchronous update.
     *
     * @return can either return nothing or a promise; in that latter case, the
     *         update logic will await the resolution of the returned promise
     *         before proceeding.
     */
    protected doUpdate(): Promise<void> | void;
    /**
     * Schedules an asynchronous update for this widget.
     *
     * The update will be deduplicated and executed with the next animation
     * frame.
     */
    update(): void;
    /**
     * The `updateComplete` promise resolves when the widget has finished updating.
     *
     * Use `updateComplete` to wait for an update:
     * ```js
     * await widget.updateComplete;
     * // do stuff
     * ```
     *
     * This method is primarily useful for unit tests, to wait for widgets to build
     * their DOM. For example:
     * ```js
     * // Set up the test widget, and wait for the initial update cycle to complete.
     * const widget = new SomeWidget(someData);
     * widget.update();
     * await widget.updateComplete;
     *
     * // Assert state of the widget.
     * assert.isTrue(widget.someDataLoaded);
     * ```
     *
     * @returns a promise that resolves to a `boolean` when the widget has finished
     *          updating, the value is `true` if there are no more pending updates,
     *          and `false` if the update cycle triggered another update.
     */
    get updateComplete(): Promise<boolean>;
}
export declare class VBox extends Widget {
    constructor(useShadowDom?: boolean, delegatesFocus?: boolean, element?: HTMLElement);
    calculateConstraints(): Constraints;
}
export declare class HBox extends Widget {
    constructor(useShadowDom?: boolean);
    calculateConstraints(): Constraints;
}
export declare class VBoxWithResizeCallback extends VBox {
    private readonly resizeCallback;
    constructor(resizeCallback: () => void);
    onResize(): void;
}
export declare class WidgetFocusRestorer {
    private widget;
    private previous;
    constructor(widget: Widget);
    restore(): void;
}
export {};
