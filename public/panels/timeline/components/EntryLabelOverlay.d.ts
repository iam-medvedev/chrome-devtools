export declare class EntryLabelOverlay extends HTMLElement {
    #private;
    static readonly LABEL_AND_CONNECTOR_SHIFT_LENGTH = 4;
    static readonly LABEL_CONNECTOR_HEIGHT = 6;
    static readonly LABEL_HEIGHT = 17;
    static readonly LABEL_PADDING = 4;
    static readonly LABEL_AND_CONNECTOR_HEIGHT: number;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor();
    connectedCallback(): void;
    set label(label: string);
    set entryDimensions(entryDimensions: {
        height: number;
        width: number;
    });
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-entry-label-overlay': EntryLabelOverlay;
    }
}
