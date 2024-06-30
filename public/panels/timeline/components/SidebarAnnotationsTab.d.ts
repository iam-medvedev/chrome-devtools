export declare class SidebarAnnotationsTab extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-annotations': SidebarAnnotationsTab;
    }
}
