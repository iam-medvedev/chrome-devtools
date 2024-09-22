import * as Trace from '../../../models/trace/trace.js';
export interface BreadcrumbsUIData {
    initialBreadcrumb: Trace.Types.File.Breadcrumb;
    activeBreadcrumb: Trace.Types.File.Breadcrumb;
}
export declare class BreadcrumbActivatedEvent extends Event {
    breadcrumb: Trace.Types.File.Breadcrumb;
    childBreadcrumbsRemoved?: boolean | undefined;
    static readonly eventName = "breadcrumbactivated";
    constructor(breadcrumb: Trace.Types.File.Breadcrumb, childBreadcrumbsRemoved?: boolean | undefined);
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
