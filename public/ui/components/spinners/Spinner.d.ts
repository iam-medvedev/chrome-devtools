export declare class Spinner extends HTMLElement {
    #private;
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-spinner': Spinner;
    }
}
