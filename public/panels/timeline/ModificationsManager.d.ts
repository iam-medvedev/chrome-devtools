import * as Trace from '../../models/trace/trace.js';
import * as TimelineComponents from '../../panels/timeline/components/components.js';
import { EntriesFilter } from './EntriesFilter.js';
import type * as Overlays from './overlays/overlays.js';
export type UpdateAction = 'Remove' | 'Add' | 'UpdateLabel' | 'UpdateTimeRange' | 'UpdateLinkToEntry' | 'EnterLabelEditState';
export declare class AnnotationModifiedEvent extends Event {
    overlay: Overlays.Overlays.TimelineOverlay;
    action: UpdateAction;
    static readonly eventName = "annotationmodifiedevent";
    constructor(overlay: Overlays.Overlays.TimelineOverlay, action: UpdateAction);
}
export declare class ModificationsManager extends EventTarget {
    #private;
    /**
     * Gets the ModificationsManager instance corresponding to a trace
     * given its index used in Model#traces. If no index is passed gets
     * the manager instance for the last trace. If no instance is found,
     * throws.
     */
    static activeManager(): ModificationsManager | null;
    static reset(): void;
    /**
     * Initializes a ModificationsManager instance for a parsed trace or changes the active manager for an existing one.
     * This needs to be called if and a trace has been parsed or switched to.
     */
    static initAndActivateModificationsManager(traceModel: Trace.TraceModel.Model, traceIndex: number): ModificationsManager | null;
    private constructor();
    getEntriesFilter(): EntriesFilter;
    getTimelineBreadcrumbs(): TimelineComponents.Breadcrumbs.Breadcrumbs;
    deleteEmptyRangeAnnotations(): void;
    /**
     * Stores the annotation and creates its overlay.
     * @returns the Overlay that gets created and associated with this annotation.
     */
    createAnnotation(newAnnotation: Trace.Types.File.Annotation, loadedFromFile?: boolean): Overlays.Overlays.TimelineOverlay;
    annotationsForEntry(entry: Trace.Types.Events.Event): Trace.Types.File.Annotation[];
    deleteEntryAnnotations(entry: Trace.Types.Events.Event): void;
    linkAnnotationBetweenEntriesExists(entryFrom: Trace.Types.Events.Event, entryTo: Trace.Types.Events.Event): boolean;
    removeAnnotation(removedAnnotation: Trace.Types.File.Annotation): void;
    removeAnnotationOverlay(removedOverlay: Overlays.Overlays.TimelineOverlay): void;
    updateAnnotation(updatedAnnotation: Trace.Types.File.Annotation): void;
    updateAnnotationOverlay(updatedOverlay: Overlays.Overlays.TimelineOverlay): void;
    getAnnotationByOverlay(overlay: Overlays.Overlays.TimelineOverlay): Trace.Types.File.Annotation | null;
    getAnnotations(): Trace.Types.File.Annotation[];
    getOverlays(): Overlays.Overlays.TimelineOverlay[];
    applyAnnotationsFromCache(): void;
    /**
     * Builds all modifications into a serializable object written into
     * the 'modifications' trace file metadata field.
     */
    toJSON(): Trace.Types.File.Modifications;
    applyModificationsIfPresent(): void;
}
