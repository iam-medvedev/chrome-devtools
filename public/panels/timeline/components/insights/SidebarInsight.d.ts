export interface InsightDetails {
    title: string;
    expanded: boolean;
}
export declare class SidebarInsight extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    set data(data: InsightDetails);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-insight': SidebarInsight;
    }
}
