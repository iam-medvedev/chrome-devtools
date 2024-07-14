export declare class EmptyEntryLabelRemoveEvent extends Event {
    static readonly eventName = "emptyentrylabelremoveevent";
    constructor();
}
export declare class EntryLabelChangeEvent extends Event {
    newLabel: string;
    static readonly eventName = "entrylabelchangeevent";
    constructor(newLabel: string);
}
export declare class EntryLabelOverlay extends HTMLElement {
    #private;
    static readonly LABEL_AND_CONNECTOR_SHIFT_LENGTH = 8;
    static readonly LABEL_CONNECTOR_HEIGHT = 7;
    static readonly LABEL_HEIGHT = 17;
    static readonly LABEL_PADDING = 4;
    static readonly LABEL_AND_CONNECTOR_HEIGHT: number;
    static readonly MAX_LABEL_LENGTH = 100;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor(label: string);
    connectedCallback(): void;
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
