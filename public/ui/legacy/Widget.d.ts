import '../../core/dom_extension/dom_extension.js';
import { Constraints } from './Geometry.js';
export declare class Widget {
    readonly element: HTMLDivElement;
    contentElement: HTMLDivElement;
    private shadowRoot;
    private readonly isWebComponent;
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
    constructor(isWebComponent?: boolean, delegatesFocus?: boolean);
    /**
     * Returns the {@link Widget} whose element is the given `node`, or `undefined`
     * if the `node` is not an element for a widget.
     *
     * @param node a DOM node.
     * @returns the {@link Widget} that is attached to the `node` or `undefined`.
     */
    static get(node: Node): Widget | undefined;
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
}
export declare class VBox extends Widget {
    constructor(isWebComponent?: boolean, delegatesFocus?: boolean);
    calculateConstraints(): Constraints;
}
export declare class HBox extends Widget {
    constructor(isWebComponent?: boolean);
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
