import type * as TraceEngine from '../../../models/trace/trace.js';
import * as UI from '../../../ui/legacy/legacy.js';
import type * as Overlays from '../overlays/overlays.js';
export declare const enum SidebarTabsName {
    INSIGHTS = "Insights",
    ANNOTATIONS = "Annotations"
}
export declare const DEFAULT_SIDEBAR_TAB = SidebarTabsName.INSIGHTS;
export declare enum InsightsCategories {
    ALL = "All",
    INP = "INP",
    LCP = "LCP",
    CLS = "CLS",
    OTHER = "Other"
}
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
export declare class SidebarWidget extends UI.SplitWidget.SplitWidget {
    #private;
    constructor();
    updateContentsOnExpand(): void;
    setAnnotationsTabContent(updatedAnnotations: TraceEngine.Types.File.Annotation[]): void;
    setTraceParsedData(traceParsedData: TraceEngine.Handlers.Types.TraceParseData | null): void;
    setInsights(insights: TraceEngine.Insights.Types.TraceInsightData): void;
    setActiveInsight(activeInsight: ActiveInsight | null): void;
}
export declare class SidebarUI extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    onWidgetShow(): void;
    set annotations(annotations: TraceEngine.Types.File.Annotation[]);
    set insights(insights: TraceEngine.Insights.Types.TraceInsightData);
    set activeInsight(activeInsight: ActiveInsight | null);
    set traceParsedData(traceParsedData: TraceEngine.Handlers.Types.TraceParseData | null);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar': SidebarWidget;
    }
}
