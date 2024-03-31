import * as TraceEngine from '../../models/trace/trace.js';
import * as TimelineComponents from '../../panels/timeline/components/components.js';
type EntryToNodeMap = Map<TraceEngine.Types.TraceEvents.SyntheticTraceEntry, TraceEngine.Helpers.TreeHelpers.TraceEntryNode>;
export declare class AnnotationsManager {
    #private;
    /**
     * A new instance is create each time a trace is recorded or loaded from a file.
     * Both entryToNodeMap and wholeTraceBounds are mandatory to support all annotations and if one of them
     * is not present, something has gone wrong so let's load the trace without the annotations support.
     **/
    static maybeInstance(opts?: {
        entryToNodeMap: EntryToNodeMap | null;
        wholeTraceBounds: TraceEngine.Types.Timing.TraceWindowMicroSeconds | null | undefined;
    }): AnnotationsManager | null;
    static removeInstance(): void;
    private constructor();
    getEntriesFilter(): TraceEngine.EntriesFilter.EntriesFilter;
    getTimelineBreadcrumbs(): TimelineComponents.Breadcrumbs.Breadcrumbs;
    getEntryIndex(entry: TraceEngine.Types.TraceEvents.SyntheticTraceEntry): number;
    /**
     * Builds all annotations and returns the object written into the 'annotations' trace file metada field.
     */
    getAnnotations(): TraceEngine.Types.File.Annotations;
    applyAnnotations(annotations: TraceEngine.Types.File.Annotations): void;
    applyEntriesFilterAnnotations(hiddenEntriesIndexes: number[], modifiedEntriesIndexes: number[]): void;
}
export {};
