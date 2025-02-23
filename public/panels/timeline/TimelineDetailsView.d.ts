import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as Trace from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as TimelineComponents from './components/components.js';
import type { TimelineModeViewDelegate } from './TimelinePanel.js';
import { type TimelineSelection } from './TimelineSelection.js';
import { AggregatedTimelineTreeView, TimelineTreeView } from './TimelineTreeView.js';
import * as Utils from './utils/utils.js';
declare const TimelineDetailsPane_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<TimelineTreeView.EventTypes>;
    addEventListener<T extends keyof TimelineTreeView.EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<TimelineTreeView.EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<TimelineTreeView.EventTypes, T>;
    once<T extends keyof TimelineTreeView.EventTypes>(eventType: T): Promise<TimelineTreeView.EventTypes[T]>;
    removeEventListener<T extends keyof TimelineTreeView.EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<TimelineTreeView.EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof TimelineTreeView.EventTypes): boolean;
    dispatchEventToListeners<T extends keyof TimelineTreeView.EventTypes>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<TimelineTreeView.EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class TimelineDetailsPane extends TimelineDetailsPane_base {
    #private;
    private readonly detailsLinkifier;
    private tabbedPane;
    private readonly defaultDetailsWidget;
    private defaultDetailsContentWidget;
    private rangeDetailViews;
    private lazyPaintProfilerView?;
    private lazyLayersView?;
    private preferredTabId?;
    private selection?;
    private updateContentsScheduled;
    private lazySelectorStatsView;
    constructor(delegate: TimelineModeViewDelegate);
    /**
     * This selects a given tabbedPane tab.
     * Additionally, if provided a node, we open that node and
     * if a groupBySetting is included, we groupBy.
     */
    selectTab(tabName: Tab, node: Trace.Extras.TraceTree.Node | null, groupBySetting?: AggregatedTimelineTreeView.GroupBy): void;
    private selectorStatsView;
    getDetailsContentElementForTest(): HTMLElement;
    revealEventInTreeView(event: Trace.Types.Events.Event | null): void;
    setModel(data: {
        parsedTrace: Trace.Handlers.Types.ParsedTrace | null;
        selectedEvents: Trace.Types.Events.Event[] | null;
        traceInsightsSets: Trace.Insights.Types.TraceInsightSets | null;
        eventToRelatedInsightsMap: TimelineComponents.RelatedInsightChips.EventToRelatedInsightsMap | null;
        entityMapper: Utils.EntityMapper.EntityMapper | null;
    }): Promise<void>;
    private setSummaryContent;
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
