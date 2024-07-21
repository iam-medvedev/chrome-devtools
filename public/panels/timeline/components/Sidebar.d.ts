import * as Common from '../../../core/common/common.js';
import type * as TraceEngine from '../../../models/trace/trace.js';
import * as UI from '../../../ui/legacy/legacy.js';
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
export declare class ToggleSidebarInsights extends Event {
    static readonly eventName = "toggleinsightclick";
    constructor();
}
export declare class RemoveAnnotation extends Event {
    removedAnnotation: TraceEngine.Types.File.Annotation;
    static readonly eventName = "removeannotation";
    constructor(removedAnnotation: TraceEngine.Types.File.Annotation);
}
export declare const enum WidgetEvents {
    SidebarCollapseClick = "SidebarCollapseClick"
}
export type WidgetEventTypes = {
    [WidgetEvents.SidebarCollapseClick]: {};
};
declare const SidebarWidget_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<WidgetEventTypes>;
    addEventListener<T extends WidgetEvents.SidebarCollapseClick>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<WidgetEventTypes[T]>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<WidgetEventTypes, T>;
    once<T extends WidgetEvents.SidebarCollapseClick>(eventType: T): Promise<WidgetEventTypes[T]>;
    removeEventListener<T extends WidgetEvents.SidebarCollapseClick>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<WidgetEventTypes[T]>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: WidgetEvents.SidebarCollapseClick): boolean;
    dispatchEventToListeners<T extends WidgetEvents.SidebarCollapseClick>(eventType: import("../../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<WidgetEventTypes, T>): void;
}) & typeof UI.SplitWidget.SplitWidget;
export declare class SidebarWidget extends SidebarWidget_base {
    #private;
    constructor();
    updateContentsOnExpand(): void;
    setAnnotationsTabContent(updatedAnnotations: TraceEngine.Types.File.Annotation[]): void;
    setTraceParsedData(traceParsedData: TraceEngine.Handlers.Types.TraceParseData | null): void;
    setInsights(insights: TraceEngine.Insights.Types.TraceInsightData): void;
}
export declare class SidebarUI extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    onWidgetShow(): void;
    set annotations(annotations: TraceEngine.Types.File.Annotation[]);
    set insights(insights: TraceEngine.Insights.Types.TraceInsightData);
    set traceParsedData(traceParsedData: TraceEngine.Handlers.Types.TraceParseData | null);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-sidebar': SidebarWidget;
    }
}
export {};
