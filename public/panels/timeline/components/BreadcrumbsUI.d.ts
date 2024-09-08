import * as TraceEngine from '../../../models/trace/trace.js';
export interface BreadcrumbsUIData {
    initialBreadcrumb: TraceEngine.Types.File.Breadcrumb;
    activeBreadcrumb: TraceEngine.Types.File.Breadcrumb;
}
export declare class BreadcrumbActivatedEvent extends Event {
    breadcrumb: TraceEngine.Types.File.Breadcrumb;
    childBreadcrumbsRemoved?: boolean | undefined;
    static readonly eventName = "breadcrumbactivated";
    constructor(breadcrumb: TraceEngine.Types.File.Breadcrumb, childBreadcrumbsRemoved?: boolean | undefined);
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
