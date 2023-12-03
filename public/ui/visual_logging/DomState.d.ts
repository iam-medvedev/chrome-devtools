interface ElementWithParent {
    element: Element;
    parent?: Element;
}
export declare function getDomState(documents: Document[]): {
    loggables: ElementWithParent[];
    shadowRoots: ShadowRoot[];
};
export declare function isVisible(element: Element, viewportRect: DOMRect): boolean;
export {};
