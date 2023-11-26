import { type Breadcrumb } from './Breadcrumbs.js';
export interface BreadcrumbsUIData {
    breadcrumb: Breadcrumb;
}
export declare class BreadcrumbRemovedEvent extends Event {
    breadcrumb: Breadcrumb;
    static readonly eventName = "breadcrumbremoved";
    constructor(breadcrumb: Breadcrumb);
}
export declare class BreadcrumbsUI extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    set data(data: BreadcrumbsUIData);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-breadcrumbs-ui': BreadcrumbsUI;
    }
}
