import '../../../ui/components/menus/menus.js';
export declare class NetworkThrottlingSelector extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-network-throttling-selector': NetworkThrottlingSelector;
    }
}
