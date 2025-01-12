import '../../../ui/components/menus/menus.js';
import * as SDK from '../../../core/sdk/sdk.js';
export declare class CPUThrottlingSelector extends HTMLElement {
    #private;
    constructor();
    set recommendedOption(recommendedOption: SDK.CPUThrottlingManager.CPUThrottlingOption | null);
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-cpu-throttling-selector': CPUThrottlingSelector;
    }
}
