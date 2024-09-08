import * as TraceEngine from '../../../models/trace/trace.js';
export declare class SidebarAnnotationsTab extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor();
    set annotations(annotations: TraceEngine.Types.File.Annotation[]);
    set annotationEntryToColorMap(annotationEntryToColorMap: Map<TraceEngine.Types.TraceEvents.TraceEventData, string>);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-annotations': SidebarAnnotationsTab;
    }
}
