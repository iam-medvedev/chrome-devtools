import * as UI from '../../../ui/legacy/legacy.js';
export declare class SidebarWidget extends UI.SplitWidget.SplitWidget {
    #private;
    constructor();
}
export declare class SidebarUI extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    render(expanded: boolean): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar': SidebarWidget;
    }
}
