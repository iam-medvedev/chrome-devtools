export declare class CPUThrottlingSelector extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-cpu-throttling-selector': CPUThrottlingSelector;
    }
}
