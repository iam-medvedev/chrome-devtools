export declare class EntriesLinkOverlay extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    constructor(initialFromEntryCoordinateAndDimentions: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    connectedCallback(): void;
    set fromEntryCoordinateAndDimentions(fromEntryParams: {
        x: number;
        y: number;
        length: number;
        height: number;
    });
    set entriesVisibility(entriesVisibility: {
        fromEntryVisibility: boolean;
        toEntryVisibility: boolean;
    });
    set toEntryCoordinateAndDimentions(toEntryParams: {
        x: number;
        y: number;
        length?: number;
        height?: number;
    });
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-entries-link-overlay': EntriesLinkOverlay;
    }
}
