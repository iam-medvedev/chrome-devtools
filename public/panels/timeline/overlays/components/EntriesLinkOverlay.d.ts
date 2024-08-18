export declare class EntriesLinkOverlay extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    entryToExists: boolean;
    constructor(initialEntryCoordinate: {
        x: number;
        y: number;
    });
    connectedCallback(): void;
    set coordinateFrom(coordinateFrom: {
        x: number;
        y: number;
    });
    set coordinateTo(coordinateTo: {
        x: number;
        y: number;
    });
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-entries-link-overlay': EntriesLinkOverlay;
    }
}
