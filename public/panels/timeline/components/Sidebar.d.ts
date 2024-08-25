import type * as TraceEngine from '../../../models/trace/trace.js';
import * as UI from '../../../ui/legacy/legacy.js';
import type * as Overlays from '../overlays/overlays.js';
export interface ActiveInsight {
    name: string;
    navigationId: string;
    createOverlayFn: (() => Overlays.Overlays.TimelineOverlay[]);
}
export declare class RemoveAnnotation extends Event {
    removedAnnotation: TraceEngine.Types.File.Annotation;
    static readonly eventName = "removeannotation";
    constructor(removedAnnotation: TraceEngine.Types.File.Annotation);
}
export declare class EventReferenceClick extends Event {
    metricEvent: TraceEngine.Types.TraceEvents.TraceEventData;
    static readonly eventName = "sidebarmetricclick";
    constructor(metricEvent: TraceEngine.Types.TraceEvents.TraceEventData);
}
declare global {
    interface GlobalEventHandlersEventMap {
        [EventReferenceClick.eventName]: EventReferenceClick;
    }
}
export declare const enum SidebarTabs {
    INSIGHTS = "insights",
    ANNOTATIONS = "annotations"
}
export declare const DEFAULT_SIDEBAR_TAB = SidebarTabs.INSIGHTS;
export declare class SidebarWidget extends UI.Widget.VBox {
    #private;
    wasShown(): void;
    setAnnotations(updatedAnnotations: TraceEngine.Types.File.Annotation[], annotationEntryToColorMap: Map<TraceEngine.Types.TraceEvents.TraceEventData, string>): void;
    setTraceParsedData(traceParsedData: TraceEngine.Handlers.Types.TraceParseData | null): void;
    setInsights(insights: TraceEngine.Insights.Types.TraceInsightData | null): void;
    setActiveInsight(activeInsight: ActiveInsight | null): void;
}
