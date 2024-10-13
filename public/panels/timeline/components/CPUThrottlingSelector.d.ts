import '../../../ui/components/menus/menus.js';
export declare class CPUThrottlingSelector extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-cpu-throttling-selector': CPUThrottlingSelector;
    }
}
