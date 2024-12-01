import '../../../ui/components/menus/menus.js';
export declare class IgnoreListSetting extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-perf-ignore-list-setting': IgnoreListSetting;
    }
}
