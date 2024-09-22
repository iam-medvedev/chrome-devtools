import * as Trace from '../../../models/trace/trace.js';
export declare class SidebarAnnotationsTab extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor();
    set annotations(annotations: Trace.Types.File.Annotation[]);
    set annotationEntryToColorMap(annotationEntryToColorMap: Map<Trace.Types.Events.Event, string>);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-annotations': SidebarAnnotationsTab;
    }
}
