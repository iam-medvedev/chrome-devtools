import * as TraceEngine from '../../models/trace/trace.js';
export declare class AnnotationsManager {
    static instance(opts?: {
        forceNew: boolean | null;
    }): AnnotationsManager;
    static removeInstance(): void;
    private constructor();
    /**
     * Builds all annotations and returns the object written into the 'annotations' trace file metada field.
     */
    getAnnotations(): TraceEngine.Types.File.Annotations;
    generateTraceEntryHash(entry: TraceEngine.Types.TraceEvents.SyntheticTraceEntry): string;
}
