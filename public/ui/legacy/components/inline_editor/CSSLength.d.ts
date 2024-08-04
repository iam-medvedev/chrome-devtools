export declare class DraggingFinishedEvent extends Event {
    static readonly eventName = "draggingfinished";
    constructor();
}
export declare enum CSSLengthUnit {
    PIXEL = "px",
    CENTIMETER = "cm",
    MILLIMETER = "mm",
    QUARTERMILLIMETER = "Q",
    INCH = "in",
    PICA = "pc",
    POINT = "pt",
    CAP = "cap",
    CH = "ch",
    EM = "em",
    EX = "ex",
    IC = "ic",
    LH = "lh",
    RCAP = "rcap",
    RCH = "rch",
    REM = "rem",
    REX = "rex",
    RIC = "ric",
    RLH = "rlh",
    VB = "vb",
    VH = "vh",
    VI = "vi",
    VW = "vw",
    VMIN = "vmin",
    VMAX = "vmax"
}
export declare const CSS_LENGTH_REGEX: RegExp;
type CSSLengthData = {
    lengthText: string;
};
export declare class CSSLength extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../lit-html/static.js").Static;
    private readonly shadow;
    private readonly onDraggingValue;
    private value;
    private unit;
    private isEditingSlot;
    private isDraggingValue;
    set data({ lengthText }: CSSLengthData);
    connectedCallback(): void;
    private dragValue;
    private onValueMousedown;
    private onValueMouseup;
    private render;
    private renderContent;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-css-length': CSSLength;
    }
}
export {};
