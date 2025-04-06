import { XElement } from './XElement.js';
export declare class XWidget extends XElement {
    private visible;
    defaultFocusedElement: Element | null;
    private elementsToRestoreScrollPositionsFor;
    private onShownCallback;
    private onHiddenCallback;
    private onResizedCallback;
    constructor();
    isShowing(): boolean;
    setElementsToRestoreScrollPositionsFor(elements: Element[]): void;
    restoreScrollPositions(): void;
    private static storeScrollPosition;
    setDefaultFocusedElement(element: Element | null): void;
    focus(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
