export declare class EntriesLinkOverlay extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    constructor(initialFromEntryCoordinateAndDimentions: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    set canvasRect(rect: DOMRect | null);
    connectedCallback(): void;
    /**
     * If one entry that is linked is in a collapsed track, we show the outlines
     * but hide only the arrow.
     */
    set hideArrow(shouldHide: boolean);
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
    set fromEntryIsSource(x: boolean);
    set toEntryIsSource(x: boolean);
}
export declare class CreateEntriesLinkRemoveEvent extends Event {
    static readonly eventName = "createentrieslinkremoveevent";
    constructor();
}
export declare class CreateEntriesLinkOverlay extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    constructor(initialFromEntryParams: {
        entryStartX: number;
        entryStartY: number;
        entryWidth: number;
        entryHeight: number;
    });
    connectedCallback(): void;
    set fromEntryData(fromEntryParams: {
        entryStartX: number;
        entryStartY: number;
        entryWidth: number;
        entryHeight: number;
    });
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-entries-link-overlay': EntriesLinkOverlay;
        'devtools-create-entries-link-overlay': CreateEntriesLinkOverlay;
    }
}
