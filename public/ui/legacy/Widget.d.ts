import '../../core/dom_extension/dom_extension.js';
import * as Platform from '../../core/platform/platform.js';
import * as Lit from '../../ui/lit/lit.js';
import { Constraints, Size } from './Geometry.js';
type WidgetConstructor<WidgetT extends Widget> = new (element: WidgetElement<WidgetT>) => WidgetT;
type WidgetProducer<WidgetT extends Widget> = (element: WidgetElement<WidgetT>) => WidgetT;
type WidgetFactory<WidgetT extends Widget> = WidgetConstructor<WidgetT> | WidgetProducer<WidgetT>;
type InferWidgetTFromFactory<F> = F extends WidgetFactory<infer WidgetT> ? WidgetT : never;
export declare class WidgetConfig<WidgetT extends Widget> {
    readonly widgetClass: WidgetFactory<WidgetT>;
    readonly widgetParams?: Partial<WidgetT> | undefined;
    constructor(widgetClass: WidgetFactory<WidgetT>, widgetParams?: Partial<WidgetT> | undefined);
}
export declare function widgetConfig<F extends WidgetFactory<Widget>, ParamKeys extends keyof InferWidgetTFromFactory<F>>(widgetClass: F, widgetParams?: Pick<InferWidgetTFromFactory<F>, ParamKeys> & Partial<InferWidgetTFromFactory<F>>): WidgetConfig<any>;
export declare class WidgetElement<WidgetT extends Widget> extends HTMLElement {
    #private;
    createWidget(): WidgetT;
    set widgetConfig(config: WidgetConfig<WidgetT>);
    getWidget(): WidgetT | undefined;
    connectedCallback(): void;
    appendChild<T extends Node>(child: T): T;
    insertBefore<T extends Node>(child: T, referenceChild: Node): T;
    removeChild<T extends Node>(child: T): T;
    removeChildren(): void;
    cloneNode(deep: boolean): Node;
}
export declare function widgetRef<T extends Widget, Args extends unknown[]>(type: Platform.Constructor.Constructor<T, Args>, callback: (_: T) => void): ReturnType<typeof Lit.Directives.ref>;
/**
 * Wraps CSS text in a @scope at-rule to encapsulate widget styles.
 *
 * This function relies on an implicit scope root (the parent element of the
 * <style> tag) and sets an explicit scope limit at `<devtools-widget>`.
 * This prevents a parent widget's styles from cascading into any nested
 * child widgets.
 *
 * @param styles The CSS rules to be scoped.
 * @returns The scoped CSS string.
 */
export declare function widgetScoped(styles: string): string;
export declare class Widget {
    #private;
    readonly element: HTMLElement;
    contentElement: HTMLElement;
    defaultFocusedChild: Widget | null;
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
    show(parentElement: Element, insertBefore?: Node | null, suppressOrphanWidgetError?: boolean): void;
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
    registerRequiredCSS(...cssFiles: Array<string & {
        _tag: 'CSS-in-JS';
    }>): void;
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
    set minimumSize(size: Size);
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
     * use the `requestUpdate()` method to schedule an asynchronous update.
     *
     * @return can either return nothing or a promise; in that latter case, the
     *         update logic will await the resolution of the returned promise
     *         before proceeding.
     */
    performUpdate(): Promise<void> | void;
    /**
     * Schedules an asynchronous update for this widget.
     *
     * The update will be deduplicated and executed with the next animation
     * frame.
     */
    requestUpdate(): void;
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
     * widget.requestUpdate();
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
    constructor(useShadowDom?: boolean | HTMLElement, delegatesFocus?: boolean, element?: HTMLElement);
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
