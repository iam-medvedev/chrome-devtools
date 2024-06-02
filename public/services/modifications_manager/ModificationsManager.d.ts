import * as TraceEngine from '../../models/trace/trace.js';
import * as TimelineComponents from '../../panels/timeline/components/components.js';
type EntryToNodeMap = Map<TraceEngine.Types.TraceEvents.SyntheticTraceEntry, TraceEngine.Helpers.TreeHelpers.TraceEntryNode>;
export declare class ModificationsManager {
    #private;
    /**
     * A new instance is create each time a trace is recorded or loaded from a file.
     * Both entryToNodeMap and wholeTraceBounds are mandatory to support all modifications and if one of them
     * is not present, something has gone wrong so let's load the trace without the modifications support.
     **/
    static maybeInstance(opts?: {
        entryToNodeMap: EntryToNodeMap | null;
        wholeTraceBounds: TraceEngine.Types.Timing.TraceWindowMicroSeconds | null | undefined;
    }): ModificationsManager | null;
    static removeInstance(): void;
    private constructor();
    getEntriesFilter(): TraceEngine.EntriesFilter.EntriesFilter;
    getTimelineBreadcrumbs(): TimelineComponents.Breadcrumbs.Breadcrumbs;
    getEntryIndex(entry: TraceEngine.Types.TraceEvents.SyntheticTraceEntry): number;
    /**
     * Builds all modifications and returns the object written into the 'modifications' trace file metada field.
     */
    getModifications(): TraceEngine.Types.File.Modifications;
    applyModifications(modifications: TraceEngine.Types.File.Modifications): void;
    applyEntriesFilterModifications(hiddenEntriesIndexes: number[], expandableEntriesIndexes: number[]): void;
}
export {};
