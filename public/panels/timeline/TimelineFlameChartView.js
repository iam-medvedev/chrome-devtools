// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as TraceEngine from '../../models/trace/trace.js';
import * as TraceBounds from '../../services/trace_bounds/trace_bounds.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import { CountersGraph } from './CountersGraph.js';
import { SHOULD_SHOW_EASTER_EGG } from './EasterEgg.js';
import { ExtensionDataGatherer } from './ExtensionDataGatherer.js';
import { targetForEvent } from './TargetForEvent.js';
import { TimelineDetailsView } from './TimelineDetailsView.js';
import { TimelineRegExp } from './TimelineFilters.js';
import { TimelineFlameChartDataProvider, } from './TimelineFlameChartDataProvider.js';
import { TimelineFlameChartNetworkDataProvider } from './TimelineFlameChartNetworkDataProvider.js';
import { TimelineSelection } from './TimelineSelection.js';
import { AggregatedTimelineTreeView } from './TimelineTreeView.js';
const UIStrings = {
    /**
     *@description Text in Timeline Flame Chart View of the Performance panel
     *@example {Frame} PH1
     *@example {10ms} PH2
     */
    sAtS: '{PH1} at {PH2}',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/TimelineFlameChartView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const MAX_HIGHLIGHTED_SEARCH_ELEMENTS = 200;
export class TimelineFlameChartView extends UI.Widget.VBox {
    delegate;
    searchResults;
    eventListeners;
    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
    networkSplitWidget;
    mainDataProvider;
    mainFlameChart;
    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    networkFlameChartGroupExpansionSetting;
    networkDataProvider;
    networkFlameChart;
    networkPane;
    splitResizer;
    chartSplitWidget;
    brickGame;
    countersView;
    detailsSplitWidget;
    detailsView;
    onMainEntrySelected;
    onNetworkEntrySelected;
    #boundRefreshAfterIgnoreList;
    #selectedEvents;
    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupBySetting;
    searchableView;
    needsResizeToPreferredHeights;
    selectedSearchResult;
    searchRegex;
    #traceEngineData;
    #selectedGroupName = null;
    #onTraceBoundsChangeBound = this.#onTraceBoundsChange.bind(this);
    #gameKeyMatches = 0;
    #gameTimeout = setTimeout(() => ({}), 0);
    constructor(delegate) {
        super();
        this.element.classList.add('timeline-flamechart');
        this.delegate = delegate;
        this.eventListeners = [];
        this.#traceEngineData = null;
        // Create main and network flamecharts.
        this.networkSplitWidget = new UI.SplitWidget.SplitWidget(false, false, 'timeline-flamechart-main-view', 150);
        // Ensure that the network panel & resizer appears above the main thread.
        this.networkSplitWidget.sidebarElement().style.zIndex = '120';
        const mainViewGroupExpansionSetting = Common.Settings.Settings.instance().createSetting('timeline-flamechart-main-view-group-expansion', {});
        this.mainDataProvider = new TimelineFlameChartDataProvider();
        this.mainDataProvider.addEventListener("DataChanged" /* TimelineFlameChartDataProviderEvents.DataChanged */, () => this.mainFlameChart.scheduleUpdate());
        this.mainFlameChart = new PerfUI.FlameChart.FlameChart(this.mainDataProvider, this, mainViewGroupExpansionSetting);
        this.mainFlameChart.alwaysShowVerticalScroll();
        this.mainFlameChart.enableRuler(false);
        this.networkFlameChartGroupExpansionSetting =
            Common.Settings.Settings.instance().createSetting('timeline-flamechart-network-view-group-expansion', {});
        this.networkDataProvider = new TimelineFlameChartNetworkDataProvider();
        this.networkFlameChart =
            new PerfUI.FlameChart.FlameChart(this.networkDataProvider, this, this.networkFlameChartGroupExpansionSetting);
        this.networkFlameChart.alwaysShowVerticalScroll();
        this.networkPane = new UI.Widget.VBox();
        this.networkPane.setMinimumSize(23, 23);
        this.networkFlameChart.show(this.networkPane.element);
        this.splitResizer = this.networkPane.element.createChild('div', 'timeline-flamechart-resizer');
        this.networkSplitWidget.hideDefaultResizer(true);
        this.networkSplitWidget.installResizer(this.splitResizer);
        this.networkSplitWidget.setMainWidget(this.mainFlameChart);
        this.networkSplitWidget.setSidebarWidget(this.networkPane);
        // Create counters chart splitter.
        this.chartSplitWidget = new UI.SplitWidget.SplitWidget(false, true, 'timeline-counters-split-view-state');
        this.countersView = new CountersGraph(this.delegate);
        this.chartSplitWidget.setMainWidget(this.networkSplitWidget);
        this.chartSplitWidget.setSidebarWidget(this.countersView);
        this.chartSplitWidget.hideDefaultResizer();
        this.chartSplitWidget.installResizer(this.countersView.resizerElement());
        // Create top level properties splitter.
        this.detailsSplitWidget = new UI.SplitWidget.SplitWidget(false, true, 'timeline-panel-details-split-view-state');
        this.detailsSplitWidget.element.classList.add('timeline-details-split');
        this.detailsView = new TimelineDetailsView(delegate);
        this.detailsSplitWidget.installResizer(this.detailsView.headerElement());
        this.detailsSplitWidget.setMainWidget(this.chartSplitWidget);
        this.detailsSplitWidget.setSidebarWidget(this.detailsView);
        this.detailsSplitWidget.show(this.element);
        this.onMainEntrySelected = this.onEntrySelected.bind(this, this.mainDataProvider);
        this.onNetworkEntrySelected = this.onEntrySelected.bind(this, this.networkDataProvider);
        this.mainFlameChart.addEventListener("EntrySelected" /* PerfUI.FlameChart.Events.EntrySelected */, this.onMainEntrySelected, this);
        this.mainFlameChart.addEventListener("EntryInvoked" /* PerfUI.FlameChart.Events.EntryInvoked */, this.onMainEntrySelected, this);
        this.networkFlameChart.addEventListener("EntrySelected" /* PerfUI.FlameChart.Events.EntrySelected */, this.onNetworkEntrySelected, this);
        this.networkFlameChart.addEventListener("EntryInvoked" /* PerfUI.FlameChart.Events.EntryInvoked */, this.onNetworkEntrySelected, this);
        this.mainFlameChart.addEventListener("EntryHighlighted" /* PerfUI.FlameChart.Events.EntryHighlighted */, this.onEntryHighlighted, this);
        this.element.addEventListener('keydown', this.#keydownHandler.bind(this));
        this.#boundRefreshAfterIgnoreList = this.#refreshAfterIgnoreList.bind(this);
        this.#selectedEvents = null;
        this.groupBySetting = Common.Settings.Settings.instance().createSetting('timeline-tree-group-by', AggregatedTimelineTreeView.GroupBy.None);
        this.groupBySetting.addChangeListener(this.refreshMainFlameChart, this);
        this.refreshMainFlameChart();
        TraceBounds.TraceBounds.onChange(this.#onTraceBoundsChangeBound);
    }
    #keydownHandler(event) {
        const keyCombo = 'fixme';
        if (event.key === keyCombo[this.#gameKeyMatches]) {
            this.#gameKeyMatches++;
            clearTimeout(this.#gameTimeout);
            this.#gameTimeout = setTimeout(() => {
                this.#gameKeyMatches = 0;
            }, 2000);
        }
        else {
            this.#gameKeyMatches = 0;
            clearTimeout(this.#gameTimeout);
        }
        if (this.#gameKeyMatches !== keyCombo.length) {
            return;
        }
        this.fixMe();
    }
    fixMe() {
        if (!SHOULD_SHOW_EASTER_EGG) {
            return;
        }
        if ([...this.element.childNodes].find(child => child instanceof PerfUI.BrickBreaker.BrickBreaker)) {
            return;
        }
        this.brickGame = new PerfUI.BrickBreaker.BrickBreaker(this.mainFlameChart);
        this.brickGame.classList.add('brick-game');
        this.element.append(this.brickGame);
    }
    #onTraceBoundsChange(event) {
        if (event.updateType === 'MINIMAP_BOUNDS') {
            // If the update type was a changing of the minimap bounds, we do not
            // need to redraw the timeline.
            return;
        }
        const visibleWindow = event.state.milli.timelineTraceWindow;
        const shouldAnimate = Boolean(event.options.shouldAnimate);
        this.mainFlameChart.setWindowTimes(visibleWindow.min, visibleWindow.max, shouldAnimate);
        this.networkDataProvider.setWindowTimes(visibleWindow.min, visibleWindow.max);
        this.networkFlameChart.setWindowTimes(visibleWindow.min, visibleWindow.max, shouldAnimate);
        this.updateSearchResults(false, false);
    }
    isNetworkTrackShownForTests() {
        return this.networkSplitWidget.showMode() !== "OnlyMain" /* UI.SplitWidget.ShowMode.OnlyMain */;
    }
    getMainDataProvider() {
        return this.mainDataProvider;
    }
    refreshMainFlameChart() {
        this.mainFlameChart.update();
    }
    windowChanged(windowStartTime, windowEndTime, animate) {
        TraceBounds.TraceBounds.BoundsManager.instance().setTimelineVisibleWindow(TraceEngine.Helpers.Timing.traceWindowFromMilliSeconds(TraceEngine.Types.Timing.MilliSeconds(windowStartTime), TraceEngine.Types.Timing.MilliSeconds(windowEndTime)), { shouldAnimate: animate });
    }
    updateRangeSelection(startTime, endTime) {
        this.delegate.select(TimelineSelection.fromRange(startTime, endTime));
    }
    getMainFlameChart() {
        return this.mainFlameChart;
    }
    // This function is public for test purpose.
    getNetworkFlameChart() {
        return this.networkFlameChart;
    }
    updateSelectedGroup(flameChart, group) {
        if (flameChart !== this.mainFlameChart || this.#selectedGroupName === group?.name) {
            return;
        }
        this.#selectedGroupName = group?.name || null;
        this.#selectedEvents = group ? this.mainDataProvider.groupTreeEvents(group) : null;
        this.#updateDetailViews();
    }
    setModel(newTraceEngineData, isCpuProfile = false) {
        if (newTraceEngineData === this.#traceEngineData) {
            return;
        }
        this.#selectedGroupName = null;
        this.#traceEngineData = newTraceEngineData;
        Common.EventTarget.removeEventListeners(this.eventListeners);
        this.#selectedEvents = null;
        this.mainDataProvider.setModel(newTraceEngineData, isCpuProfile);
        this.networkDataProvider.setModel(newTraceEngineData);
        ExtensionDataGatherer.instance().modelChanged(newTraceEngineData);
        this.#reset();
        this.updateSearchResults(false, false);
        this.refreshMainFlameChart();
        this.#updateFlameCharts();
    }
    #reset() {
        if (this.networkDataProvider.isEmpty()) {
            this.mainFlameChart.enableRuler(true);
            this.networkSplitWidget.hideSidebar();
        }
        else {
            this.mainFlameChart.enableRuler(false);
            this.networkSplitWidget.showBoth();
            this.resizeToPreferredHeights();
        }
        this.mainFlameChart.reset();
        this.networkFlameChart.reset();
        this.updateSearchResults(false, false);
        const traceBoundsState = TraceBounds.TraceBounds.BoundsManager.instance().state();
        if (!traceBoundsState) {
            throw new Error('TimelineFlameChartView could not set the window bounds.');
        }
        const visibleWindow = traceBoundsState.milli.timelineTraceWindow;
        this.mainFlameChart.setWindowTimes(visibleWindow.min, visibleWindow.max);
        this.networkDataProvider.setWindowTimes(visibleWindow.min, visibleWindow.max);
        this.networkFlameChart.setWindowTimes(visibleWindow.min, visibleWindow.max);
    }
    #refreshAfterIgnoreList() {
        // The ignore list will only affect Thread tracks, which will only be in main flame chart.
        // So just force recalculate and redraw the main flame chart here.
        this.mainDataProvider.timelineData(true);
        this.mainFlameChart.scheduleUpdate();
    }
    #updateDetailViews() {
        this.countersView.setModel(this.#traceEngineData, this.#selectedEvents);
        void this.detailsView.setModel(this.#traceEngineData, this.#selectedEvents);
    }
    #updateFlameCharts() {
        this.mainFlameChart.scheduleUpdate();
        this.networkFlameChart.scheduleUpdate();
    }
    onEntryHighlighted(commonEvent) {
        SDK.OverlayModel.OverlayModel.hideDOMNodeHighlight();
        const entryIndex = commonEvent.data;
        const event = this.mainDataProvider.eventByIndex(entryIndex);
        if (!event || !this.#traceEngineData) {
            return;
        }
        const target = targetForEvent(this.#traceEngineData, event);
        if (!target) {
            return;
        }
        const nodeIds = TraceEngine.Extras.FetchNodes.nodeIdsForEvent(this.#traceEngineData, event);
        for (const nodeId of nodeIds) {
            new SDK.DOMModel.DeferredDOMNode(target, nodeId).highlight();
        }
    }
    highlightEvent(event) {
        const entryIndex = event ? this.mainDataProvider.entryIndexForSelection(TimelineSelection.fromTraceEvent(event)) : -1;
        if (entryIndex >= 0) {
            this.mainFlameChart.highlightEntry(entryIndex);
        }
        else {
            this.mainFlameChart.hideHighlight();
        }
    }
    willHide() {
        this.networkFlameChartGroupExpansionSetting.removeChangeListener(this.resizeToPreferredHeights, this);
        Bindings.IgnoreListManager.IgnoreListManager.instance().removeChangeListener(this.#boundRefreshAfterIgnoreList);
    }
    wasShown() {
        this.networkFlameChartGroupExpansionSetting.addChangeListener(this.resizeToPreferredHeights, this);
        Bindings.IgnoreListManager.IgnoreListManager.instance().addChangeListener(this.#boundRefreshAfterIgnoreList);
        if (this.needsResizeToPreferredHeights) {
            this.resizeToPreferredHeights();
        }
        this.#updateFlameCharts();
    }
    updateCountersGraphToggle(showMemoryGraph) {
        if (showMemoryGraph) {
            this.chartSplitWidget.showBoth();
        }
        else {
            this.chartSplitWidget.hideSidebar();
        }
    }
    setSelection(selection) {
        let index = this.mainDataProvider.entryIndexForSelection(selection);
        this.mainFlameChart.setSelectedEntry(index);
        index = this.networkDataProvider.entryIndexForSelection(selection);
        this.networkFlameChart.setSelectedEntry(index);
        if (this.detailsView) {
            // TODO(crbug.com/1459265):  Change to await after migration work.
            void this.detailsView.setSelection(selection);
        }
    }
    onEntrySelected(dataProvider, event) {
        const entryIndex = event.data;
        if (dataProvider === this.mainDataProvider) {
            if (this.mainDataProvider.buildFlowForInitiator(entryIndex)) {
                this.mainFlameChart.scheduleUpdate();
            }
        }
        this.delegate.select(dataProvider
            .createSelection(entryIndex));
    }
    resizeToPreferredHeights() {
        if (!this.isShowing()) {
            this.needsResizeToPreferredHeights = true;
            return;
        }
        this.needsResizeToPreferredHeights = false;
        this.networkPane.element.classList.toggle('timeline-network-resizer-disabled', !this.networkDataProvider.isExpanded());
        this.networkSplitWidget.setSidebarSize(this.networkDataProvider.preferredHeight() + this.splitResizer.clientHeight + PerfUI.FlameChart.RulerHeight +
            2);
    }
    setSearchableView(searchableView) {
        this.searchableView = searchableView;
    }
    // UI.SearchableView.Searchable implementation
    jumpToNextSearchResult() {
        if (!this.searchResults || !this.searchResults.length) {
            return;
        }
        const index = typeof this.selectedSearchResult !== 'undefined' ? this.searchResults.indexOf(this.selectedSearchResult) : -1;
        this.selectSearchResult(Platform.NumberUtilities.mod(index + 1, this.searchResults.length));
    }
    jumpToPreviousSearchResult() {
        if (!this.searchResults || !this.searchResults.length) {
            return;
        }
        const index = typeof this.selectedSearchResult !== 'undefined' ? this.searchResults.indexOf(this.selectedSearchResult) : 0;
        this.selectSearchResult(Platform.NumberUtilities.mod(index - 1, this.searchResults.length));
    }
    supportsCaseSensitiveSearch() {
        return true;
    }
    supportsRegexSearch() {
        return true;
    }
    selectSearchResult(index) {
        this.searchableView.updateCurrentMatchIndex(index);
        if (this.searchResults) {
            this.selectedSearchResult = this.searchResults[index];
            this.delegate.select(this.mainDataProvider.createSelection(this.selectedSearchResult));
            this.mainFlameChart.showPopoverForSearchResult(this.selectedSearchResult);
        }
    }
    updateSearchResults(shouldJump, jumpBackwards) {
        const traceBoundsState = TraceBounds.TraceBounds.BoundsManager.instance().state();
        if (!traceBoundsState) {
            return;
        }
        const oldSelectedSearchResult = this.selectedSearchResult;
        delete this.selectedSearchResult;
        this.searchResults = [];
        this.mainFlameChart.removeSearchResultHighlights();
        if (!this.searchRegex) {
            return;
        }
        const regExpFilter = new TimelineRegExp(this.searchRegex);
        const visibleWindow = traceBoundsState.milli.timelineTraceWindow;
        this.searchResults = this.mainDataProvider.search(visibleWindow.min, visibleWindow.max, regExpFilter);
        this.searchableView.updateSearchMatchesCount(this.searchResults.length);
        // To avoid too many highlights when the search regex matches too many entries,
        // for example, when user only types in "e" as the search query,
        // We only highlight the search results when the number of matches is less than or equal to 200.
        if (this.searchResults.length <= MAX_HIGHLIGHTED_SEARCH_ELEMENTS) {
            this.mainFlameChart.highlightAllEntries(this.searchResults);
        }
        if (!shouldJump || !this.searchResults.length) {
            return;
        }
        let selectedIndex = this.searchResults.indexOf(oldSelectedSearchResult);
        if (selectedIndex === -1) {
            selectedIndex = jumpBackwards ? this.searchResults.length - 1 : 0;
        }
        this.selectSearchResult(selectedIndex);
    }
    /**
     * Returns the indexes of the elements that matched the most recent
     * query. Elements are indexed by the data provider and correspond
     * to their position in the data provider entry data array.
     * Public only for tests.
     */
    getSearchResults() {
        return this.searchResults;
    }
    onSearchCanceled() {
        if (typeof this.selectedSearchResult !== 'undefined') {
            this.delegate.select(null);
        }
        delete this.searchResults;
        delete this.selectedSearchResult;
        delete this.searchRegex;
        this.mainFlameChart.showPopoverForSearchResult(-1);
        this.mainFlameChart.removeSearchResultHighlights();
    }
    performSearch(searchConfig, shouldJump, jumpBackwards) {
        this.searchRegex = searchConfig.toSearchRegex().regex;
        this.updateSearchResults(shouldJump, jumpBackwards);
    }
}
export class Selection {
    timelineSelection;
    entryIndex;
    constructor(selection, entryIndex) {
        this.timelineSelection = selection;
        this.entryIndex = entryIndex;
    }
}
export const FlameChartStyle = {
    textColor: '#333',
};
export class TimelineFlameChartMarker {
    startTimeInternal;
    startOffset;
    style;
    constructor(startTime, startOffset, style) {
        this.startTimeInternal = startTime;
        this.startOffset = startOffset;
        this.style = style;
    }
    startTime() {
        return this.startTimeInternal;
    }
    color() {
        return this.style.color;
    }
    title() {
        if (this.style.lowPriority) {
            return null;
        }
        const startTime = i18n.TimeUtilities.millisToString(this.startOffset);
        return i18nString(UIStrings.sAtS, { PH1: this.style.title, PH2: startTime });
    }
    draw(context, x, height, pixelsPerMillisecond) {
        const lowPriorityVisibilityThresholdInPixelsPerMs = 4;
        if (this.style.lowPriority && pixelsPerMillisecond < lowPriorityVisibilityThresholdInPixelsPerMs) {
            return;
        }
        context.save();
        if (this.style.tall) {
            context.strokeStyle = this.style.color;
            context.lineWidth = this.style.lineWidth;
            context.translate(this.style.lineWidth < 1 || (this.style.lineWidth & 1) ? 0.5 : 0, 0.5);
            context.beginPath();
            context.moveTo(x, 0);
            context.setLineDash(this.style.dashStyle);
            context.lineTo(x, context.canvas.height);
            context.stroke();
        }
        context.restore();
    }
}
//# sourceMappingURL=TimelineFlameChartView.js.map