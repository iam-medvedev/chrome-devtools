import '../../../ui/components/menus/menus.js';
export declare class CPUThrottlingSelector extends HTMLElement {
    #private;
    constructor();
    set recommendedRate(recommendedRate: number | null);
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-cpu-throttling-selector': CPUThrottlingSelector;
    }
}
