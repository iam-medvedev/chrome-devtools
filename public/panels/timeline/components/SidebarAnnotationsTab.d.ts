import * as TraceEngine from '../../../models/trace/trace.js';
export declare class SidebarAnnotationsTab extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    set annotations(annotations: TraceEngine.Types.File.Annotation[]);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar-annotations': SidebarAnnotationsTab;
    }
}
