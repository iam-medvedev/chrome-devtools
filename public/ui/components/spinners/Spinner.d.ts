export declare class Spinner extends HTMLElement {
    #private;
    static readonly litTagName: import("../../lit-html/static.js").Static;
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-spinner': Spinner;
    }
}
