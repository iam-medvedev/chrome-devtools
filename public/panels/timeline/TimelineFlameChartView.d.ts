import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as Trace from '../../models/trace/trace.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import type * as TimelineComponents from './components/components.js';
import * as Overlays from './overlays/overlays.js';
import { type Tab } from './TimelineDetailsView.js';
import { TimelineFlameChartDataProvider } from './TimelineFlameChartDataProvider.js';
import { TimelineFlameChartNetworkDataProvider } from './TimelineFlameChartNetworkDataProvider.js';
import type { TimelineModeViewDelegate } from './TimelinePanel.js';
import { type TimelineSelection } from './TimelineSelection.js';
import type { TimelineMarkerStyle } from './TimelineUIUtils.js';
/**
 * This defines the order these markers will be rendered if they are at the
 * same timestamp. The smaller number will be shown first - e.g. so if NavigationStart, MarkFCP,
 * MarkLCPCandidate have the same timestamp, visually we
 * will render [Nav][FCP][DCL][LCP] everytime.
 */
export declare const SORT_ORDER_PAGE_LOAD_MARKERS: Readonly<Record<string, number>>;
declare const TimelineFlameChartView_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends Events.ENTRY_LABEL_ANNOTATION_CLICKED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends Events.ENTRY_LABEL_ANNOTATION_CLICKED>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends Events.ENTRY_LABEL_ANNOTATION_CLICKED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: Events.ENTRY_LABEL_ANNOTATION_CLICKED): boolean;
    dispatchEventToListeners<T extends Events.ENTRY_LABEL_ANNOTATION_CLICKED>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class TimelineFlameChartView extends TimelineFlameChartView_base implements PerfUI.FlameChart.FlameChartDelegate, UI.SearchableView.Searchable {
    #private;
    private readonly delegate;
    /**
     * Tracks the indexes of matched entries when the user searches the panel.
     * Defaults to undefined which indicates the user has not searched.
     */
    private searchResults;
    private eventListeners;
    private readonly networkSplitWidget;
    private mainDataProvider;
    private readonly mainFlameChart;
    private readonly networkFlameChartGroupExpansionSetting;
    private networkDataProvider;
    private readonly networkFlameChart;
    private readonly networkPane;
    private readonly splitResizer;
    private readonly chartSplitWidget;
    private brickGame?;
    private readonly countersView;
    private readonly detailsSplitWidget;
    private readonly detailsView;
    private readonly onMainAddEntryLabelAnnotation;
    private readonly onNetworkAddEntryLabelAnnotation;
    private readonly onMainEntrySelected;
    private readonly onNetworkEntrySelected;
    private readonly groupBySetting;
    private searchableView;
    private needsResizeToPreferredHeights?;
    private selectedSearchResult?;
    private searchRegex?;
    constructor(delegate: TimelineModeViewDelegate);
    containingElement(): HTMLElement;
    dimThirdPartiesIfRequired(): void;
    setMarkers(parsedTrace: Trace.Handlers.Types.ParsedTrace | null): void;
    setOverlays(overlays: Overlays.Overlays.TimelineOverlay[], options: Overlays.Overlays.TimelineOverlaySetOptions): void;
    revealAnnotation(annotation: Trace.Types.File.Annotation): void;
    setActiveInsight(insight: TimelineComponents.Sidebar.ActiveInsight | null): void;
    addTimestampMarkerOverlay(timestamp: Trace.Types.Timing.Micro): void;
    removeTimestampMarkerOverlay(): Promise<void>;
    runBrickBreakerGame(): void;
    isNetworkTrackShownForTests(): boolean;
    getLinkSelectionAnnotation(): Trace.Types.File.EntriesLinkAnnotation | null;
    getMainDataProvider(): TimelineFlameChartDataProvider;
    getNetworkDataProvider(): TimelineFlameChartNetworkDataProvider;
    refreshMainFlameChart(): void;
    windowChanged(windowStartTime: Trace.Types.Timing.Milli, windowEndTime: Trace.Types.Timing.Milli, animate: boolean): void;
    /**
     * @param startTime - the start time of the selection in MilliSeconds
     * @param endTime - the end time of the selection in MilliSeconds
     * TODO(crbug.com/346312365): update the type definitions in ChartViewport.ts
     */
    updateRangeSelection(startTime: number, endTime: number): void;
    getMainFlameChart(): PerfUI.FlameChart.FlameChart;
    getNetworkFlameChart(): PerfUI.FlameChart.FlameChart;
    updateSelectedGroup(flameChart: PerfUI.FlameChart.FlameChart, group: PerfUI.FlameChart.Group | null): void;
    setModel(newParsedTrace: Trace.Handlers.Types.ParsedTrace, traceMetadata: Trace.Types.File.MetaData | null): void;
    /**
     * Resets the state of the UI data and initializes it again with the
     * current parsed trace.
     */
    rebuildDataForTrace(): void;
    setInsights(insights: Trace.Insights.Types.TraceInsightSets | null, eventToRelatedInsightsMap: TimelineComponents.RelatedInsightChips.EventToRelatedInsightsMap): void;
    reset(): void;
    setupWindowTimes(): void;
    updateLinkSelectionAnnotationWithToEntry(dataProvider: TimelineFlameChartDataProvider | TimelineFlameChartNetworkDataProvider, entryIndex: number): void;
    private onEntryHovered;
    highlightEvent(event: Trace.Types.Events.Event | null): void;
    willHide(): void;
    wasShown(): void;
    updateCountersGraphToggle(showMemoryGraph: boolean): void;
    revealEvent(event: Trace.Types.Events.Event): void;
    revealEventVertically(event: Trace.Types.Events.Event): void;
    setSelectionAndReveal(selection: TimelineSelection | null): void;
    openSelectionDetailsView(selection: TimelineSelection | null): void;
    /**
     * Used to create multiple overlays at once without triggering a redraw for each one.
     */
    bulkAddOverlays(overlays: Overlays.Overlays.TimelineOverlay[]): void;
    addOverlay<T extends Overlays.Overlays.TimelineOverlay>(newOverlay: T): T;
    bulkRemoveOverlays(overlays: Overlays.Overlays.TimelineOverlay[]): void;
    removeOverlay(removedOverlay: Overlays.Overlays.TimelineOverlay): void;
    updateExistingOverlay<T extends Overlays.Overlays.TimelineOverlay>(existingOverlay: T, newData: Partial<T>): void;
    enterLabelEditMode(overlay: Overlays.Overlays.EntryLabel): void;
    private onAddEntryLabelAnnotation;
    onEntriesLinkAnnotationCreate(dataProvider: TimelineFlameChartDataProvider | TimelineFlameChartNetworkDataProvider, entryFromIndex: number, linkCreateButton?: boolean): void;
    /**
     * This is invoked when the user uses their KEYBOARD ONLY to navigate between
     * events.
     * It IS NOT called when the user uses the mouse. See `onEntryInvoked`.
     */
    private onEntrySelected;
    handleToEntryOfLinkBetweenEntriesSelection(toIndex: number): void;
    resizeToPreferredHeights(): void;
    setSearchableView(searchableView: UI.SearchableView.SearchableView): void;
    searchResultIndexForEntryIndex(index: number): number;
    jumpToNextSearchResult(): void;
    jumpToPreviousSearchResult(): void;
    supportsCaseSensitiveSearch(): boolean;
    supportsRegexSearch(): boolean;
    private updateSearchResults;
    /**
     * Returns the indexes of the elements that matched the most recent
     * query. Elements are indexed by the data provider and correspond
     * to their position in the data provider entry data array.
     * Public only for tests.
     */
    getSearchResults(): PerfUI.FlameChart.DataProviderSearchResult[] | undefined;
    onSearchCanceled(): void;
    performSearch(searchConfig: UI.SearchableView.SearchConfig, shouldJump: boolean, jumpBackwards?: boolean): void;
    togglePopover({ event, show }: {
        event: Trace.Types.Events.Event;
        show: boolean;
    }): void;
    overlays(): Overlays.Overlays.Overlays;
    selectDetailsViewTab(tabName: Tab, node: Trace.Extras.TraceTree.Node | null): void;
}
export declare class Selection {
    timelineSelection: TimelineSelection;
    entryIndex: number;
    constructor(selection: TimelineSelection, entryIndex: number);
}
export declare const FlameChartStyle: {
    textColor: string;
};
export declare class TimelineFlameChartMarker implements PerfUI.FlameChart.FlameChartMarker {
    private readonly startTimeInternal;
    private readonly startOffset;
    private style;
    constructor(startTime: number, startOffset: number, style: TimelineMarkerStyle);
    startTime(): number;
    color(): string;
    title(): string | null;
    draw(context: CanvasRenderingContext2D, x: number, height: number, pixelsPerMillisecond: number): void;
}
export declare const enum ColorBy {
    URL = "URL"
}
/**
 * Find the Group that contains the provided level, or `null` if no group is
 * found.
 */
export declare function groupForLevel(groups: PerfUI.FlameChart.Group[], level: number): PerfUI.FlameChart.Group | null;
export declare const enum Events {
    ENTRY_LABEL_ANNOTATION_CLICKED = "EntryLabelAnnotationClicked"
}
export interface EventTypes {
    [Events.ENTRY_LABEL_ANNOTATION_CLICKED]: {
        entry: Trace.Types.Events.Event;
    };
}
export {};
