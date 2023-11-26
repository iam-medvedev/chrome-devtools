interface ElementWithParent {
    element: Element;
    parent?: Element;
}
export declare function getDomState(): {
    loggables: ElementWithParent[];
    shadowRoots: ShadowRoot[];
};
export declare function isVisible(element: Element, viewportRect: DOMRect): boolean;
export {};
