import * as Trace from '../../models/trace/trace.js';
export declare function getAnnotationEntries(annotation: Trace.Types.File.Annotation): Trace.Types.Events.Event[];
/**
 * Gets a trace window that contains the given annotation. May return `null`
 * if there is no valid window (an ENTRIES_LINK without a `to` entry for
 * example.)
 */
export declare function getAnnotationWindow(annotation: Trace.Types.File.Annotation): Trace.Types.Timing.TraceWindowMicroSeconds | null;
