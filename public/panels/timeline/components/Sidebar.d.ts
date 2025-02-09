import type * as Trace from '../../../models/trace/trace.js';
import * as UI from '../../../ui/legacy/legacy.js';
export interface ActiveInsight {
    model: Trace.Insights.Types.InsightModel<{}, {}>;
    insightSetKey: string;
}
export declare class RemoveAnnotation extends Event {
    removedAnnotation: Trace.Types.File.Annotation;
    static readonly eventName = "removeannotation";
    constructor(removedAnnotation: Trace.Types.File.Annotation);
}
export declare class RevealAnnotation extends Event {
    annotation: Trace.Types.File.Annotation;
    static readonly eventName = "revealannotation";
    constructor(annotation: Trace.Types.File.Annotation);
}
declare global {
    interface GlobalEventHandlersEventMap {
        [RevealAnnotation.eventName]: RevealAnnotation;
    }
}
export declare const enum SidebarTabs {
    INSIGHTS = "insights",
    ANNOTATIONS = "annotations"
}
export declare const DEFAULT_SIDEBAR_TAB = SidebarTabs.INSIGHTS;
export declare const DEFAULT_SIDEBAR_WIDTH_PX = 240;
export declare class SidebarWidget extends UI.Widget.VBox {
    #private;
    userHasOpenedSidebarOnce(): boolean;
    constructor();
    wasShown(): void;
    setAnnotations(updatedAnnotations: Trace.Types.File.Annotation[], annotationEntryToColorMap: Map<Trace.Types.Events.Event, string>): void;
    setParsedTrace(parsedTrace: Trace.Handlers.Types.ParsedTrace | null, metadata: Trace.Types.File.MetaData | null): void;
    setInsights(insights: Trace.Insights.Types.TraceInsightSets | null): void;
    setActiveInsight(activeInsight: ActiveInsight | null): void;
}
