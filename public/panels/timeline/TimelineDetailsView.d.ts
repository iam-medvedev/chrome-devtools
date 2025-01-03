import * as Common from '../../core/common/common.js';
import * as Trace from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as TimelineComponents from './components/components.js';
import type { TimelineModeViewDelegate } from './TimelinePanel.js';
import { type TimelineSelection } from './TimelineSelection.js';
import { TimelineTreeView } from './TimelineTreeView.js';
declare const TimelineDetailsView_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<TimelineTreeView.EventTypes>;
    addEventListener<T extends TimelineTreeView.Events.TREE_ROW_HOVERED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<TimelineTreeView.EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<TimelineTreeView.EventTypes, T>;
    once<T extends TimelineTreeView.Events.TREE_ROW_HOVERED>(eventType: T): Promise<TimelineTreeView.EventTypes[T]>;
    removeEventListener<T extends TimelineTreeView.Events.TREE_ROW_HOVERED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<TimelineTreeView.EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: TimelineTreeView.Events.TREE_ROW_HOVERED): boolean;
    dispatchEventToListeners<T extends TimelineTreeView.Events.TREE_ROW_HOVERED>(eventType: import("../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<TimelineTreeView.EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class TimelineDetailsView extends TimelineDetailsView_base {
    #private;
    private readonly detailsLinkifier;
    private tabbedPane;
    private readonly defaultDetailsWidget;
    private readonly defaultDetailsContentElement;
    private rangeDetailViews;
    private lazyPaintProfilerView?;
    private lazyLayersView?;
    private preferredTabId?;
    private selection?;
    private updateContentsScheduled;
    private lazySelectorStatsView;
    constructor(delegate: TimelineModeViewDelegate);
    private selectorStatsView;
    getDetailsContentElementForTest(): HTMLElement;
    revealEventInTreeView(event: Trace.Types.Events.Event | null): void;
    setModel(data: {
        parsedTrace: Trace.Handlers.Types.ParsedTrace | null;
        selectedEvents: Trace.Types.Events.Event[] | null;
        traceInsightsSets: Trace.Insights.Types.TraceInsightSets | null;
        eventToRelatedInsightsMap: TimelineComponents.RelatedInsightChips.EventToRelatedInsightsMap | null;
    }): Promise<void>;
    private setContent;
    private updateContents;
    private appendTab;
    headerElement(): Element;
    setPreferredTab(tabId: string): void;
    /**
     * This forces a recalculation and rerendering of the timings
     * breakdown of a track.
     * User actions like zooming or scrolling can trigger many updates in
     * short time windows, so we debounce the calls in those cases. Single
     * sporadic calls (like selecting a new track) don't need to be
     * debounced. The forceImmediateUpdate param configures the debouncing
     * behaviour.
     */
    private scheduleUpdateContentsFromWindow;
    private updateContentsFromWindow;
    setSelection(selection: TimelineSelection | null): Promise<void>;
    private tabSelected;
    private layersView;
    private paintProfilerView;
    private showSnapshotInPaintProfiler;
    private showSelectorStatsForIndividualEvent;
    private showAggregatedSelectorStats;
    private appendDetailsTabsForTraceEventAndShowDetails;
    private showEventInPaintProfiler;
    private updateSelectedRangeStats;
}
export declare enum Tab {
    Details = "details",
    EventLog = "event-log",
    CallTree = "call-tree",
    BottomUp = "bottom-up",
    PaintProfiler = "paint-profiler",
    LayerViewer = "layer-viewer",
    SelectorStats = "selector-stats"
}
export {};
