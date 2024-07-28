import * as TraceEngine from '../../models/trace/trace.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import type * as TimelineComponents from './components/components.js';
import * as Overlays from './overlays/overlays.js';
import { TimelineFlameChartDataProvider } from './TimelineFlameChartDataProvider.js';
import { type TimelineModeViewDelegate } from './TimelinePanel.js';
import { TimelineSelection } from './TimelineSelection.js';
import { type TimelineMarkerStyle } from './TimelineUIUtils.js';
export declare class TimelineFlameChartView extends UI.Widget.VBox implements PerfUI.FlameChart.FlameChartDelegate, UI.SearchableView.Searchable {
    #private;
    private readonly delegate;
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
    private readonly onMainAnnotateEntry;
    private readonly onNetworkAnnotateEntry;
    private readonly onMainEntrySelected;
    private readonly onNetworkEntrySelected;
    private readonly groupBySetting;
    private searchableView;
    private needsResizeToPreferredHeights?;
    private selectedSearchResult?;
    private searchRegex?;
    constructor(delegate: TimelineModeViewDelegate);
    setActiveInsight(insight: TimelineComponents.Sidebar.ActiveInsight | null): void;
    fixMe(): void;
    isNetworkTrackShownForTests(): boolean;
    getMainDataProvider(): TimelineFlameChartDataProvider;
    refreshMainFlameChart(): void;
    extensionDataVisibilityChanged(): void;
    windowChanged(windowStartTime: TraceEngine.Types.Timing.MilliSeconds, windowEndTime: TraceEngine.Types.Timing.MilliSeconds, animate: boolean): void;
    /**
     * @param startTime - the start time of the selection in MilliSeconds
     * @param endTime - the end time of the selection in MilliSeconds
     * TODO(crbug.com/346312365): update the type definitions in ChartViewport.ts
     */
    updateRangeSelection(startTime: number, endTime: number): void;
    getMainFlameChart(): PerfUI.FlameChart.FlameChart;
    getNetworkFlameChart(): PerfUI.FlameChart.FlameChart;
    updateSelectedGroup(flameChart: PerfUI.FlameChart.FlameChart, group: PerfUI.FlameChart.Group | null): void;
    setModel(newTraceEngineData: TraceEngine.Handlers.Types.TraceParseData | null, isCpuProfile?: boolean): void;
    setInsights(insights: TraceEngine.Insights.Types.TraceInsightData | null): void;
    private onEntryHighlighted;
    highlightEvent(event: TraceEngine.Types.TraceEvents.TraceEventData | null): void;
    willHide(): void;
    wasShown(): void;
    updateCountersGraphToggle(showMemoryGraph: boolean): void;
    setSelection(selection: TimelineSelection | null): void;
    addOverlay<T extends Overlays.Overlays.TimelineOverlay>(newOverlay: T): T;
    removeOverlay(removedOverlay: Overlays.Overlays.TimelineOverlay): void;
    updateExistingOverlay<T extends Overlays.Overlays.TimelineOverlay>(existingOverlay: T, newData: Partial<T>): void;
    private onAnnotateEntry;
    private onEntrySelected;
    resizeToPreferredHeights(): void;
    setSearchableView(searchableView: UI.SearchableView.SearchableView): void;
    jumpToNextSearchResult(): void;
    jumpToPreviousSearchResult(): void;
    supportsCaseSensitiveSearch(): boolean;
    supportsRegexSearch(): boolean;
    private selectSearchResult;
    private updateSearchResults;
    /**
     * Returns the indexes of the elements that matched the most recent
     * query. Elements are indexed by the data provider and correspond
     * to their position in the data provider entry data array.
     * Public only for tests.
     */
    getSearchResults(): number[] | undefined;
    onSearchCanceled(): void;
    performSearch(searchConfig: UI.SearchableView.SearchConfig, shouldJump: boolean, jumpBackwards?: boolean): void;
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
