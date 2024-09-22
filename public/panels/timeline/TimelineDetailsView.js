// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as Trace from '../../models/trace/trace.js';
import * as TraceBounds from '../../services/trace_bounds/trace_bounds.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as TimelineComponents from './components/components.js';
import { EventsTimelineTreeView } from './EventsTimelineTreeView.js';
import { Tracker } from './FreshRecording.js';
import { targetForEvent } from './TargetForEvent.js';
import { TimelineLayersView } from './TimelineLayersView.js';
import { TimelinePaintProfilerView } from './TimelinePaintProfilerView.js';
import { TimelineSelection } from './TimelineSelection.js';
import { TimelineSelectorStatsView } from './TimelineSelectorStatsView.js';
import { BottomUpTimelineTreeView, CallTreeTimelineTreeView } from './TimelineTreeView.js';
import { TimelineDetailsContentHelper, TimelineUIUtils } from './TimelineUIUtils.js';
const UIStrings = {
    /**
     *@description Text for the summary view
     */
    summary: 'Summary',
    /**
     *@description Text in Timeline Details View of the Performance panel
     */
    bottomup: 'Bottom-up',
    /**
     *@description Text in Timeline Details View of the Performance panel
     */
    callTree: 'Call tree',
    /**
     *@description Text in Timeline Details View of the Performance panel
     */
    eventLog: 'Event log',
    /**
     *@description Title of the paint profiler, old name of the performance pane
     */
    paintProfiler: 'Paint profiler',
    /**
     *@description Title of the Layers tool
     */
    layers: 'Layers',
    /**
     *@description Text in Timeline Details View of the Performance panel
     *@example {1ms} PH1
     *@example {10ms} PH2
     */
    rangeSS: 'Range:  {PH1} – {PH2}',
    /**
     *@description Title of the selector stats tab
     */
    selectorStats: 'Selector stats',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/TimelineDetailsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class TimelineDetailsView extends UI.Widget.VBox {
    detailsLinkifier;
    tabbedPane;
    defaultDetailsWidget;
    defaultDetailsContentElement;
    rangeDetailViews;
    #selectedEvents;
    lazyPaintProfilerView;
    lazyLayersView;
    preferredTabId;
    selection;
    updateContentsScheduled;
    lazySelectorStatsView;
    #parsedTrace = null;
    #traceInsightsSets = null;
    #filmStrip = null;
    #networkRequestDetails;
    #layoutShiftDetails;
    #onTraceBoundsChangeBound = this.#onTraceBoundsChange.bind(this);
    constructor(delegate) {
        super();
        this.element.classList.add('timeline-details');
        this.detailsLinkifier = new Components.Linkifier.Linkifier();
        this.tabbedPane = new UI.TabbedPane.TabbedPane();
        this.tabbedPane.show(this.element);
        this.tabbedPane.headerElement().setAttribute('jslog', `${VisualLogging.toolbar('sidebar').track({ keydown: 'ArrowUp|ArrowLeft|ArrowDown|ArrowRight|Enter|Space' })}`);
        this.defaultDetailsWidget = new UI.Widget.VBox();
        this.defaultDetailsWidget.element.classList.add('timeline-details-view');
        this.defaultDetailsWidget.element.setAttribute('jslog', `${VisualLogging.pane('details').track({ resize: true })}`);
        this.defaultDetailsContentElement =
            this.defaultDetailsWidget.element.createChild('div', 'timeline-details-view-body vbox');
        this.appendTab(Tab.Details, i18nString(UIStrings.summary), this.defaultDetailsWidget);
        this.setPreferredTab(Tab.Details);
        this.rangeDetailViews = new Map();
        this.updateContentsScheduled = false;
        const bottomUpView = new BottomUpTimelineTreeView();
        this.appendTab(Tab.BottomUp, i18nString(UIStrings.bottomup), bottomUpView);
        this.rangeDetailViews.set(Tab.BottomUp, bottomUpView);
        const callTreeView = new CallTreeTimelineTreeView();
        this.appendTab(Tab.CallTree, i18nString(UIStrings.callTree), callTreeView);
        this.rangeDetailViews.set(Tab.CallTree, callTreeView);
        const eventsView = new EventsTimelineTreeView(delegate);
        this.appendTab(Tab.EventLog, i18nString(UIStrings.eventLog), eventsView);
        this.rangeDetailViews.set(Tab.EventLog, eventsView);
        this.#networkRequestDetails =
            new TimelineComponents.NetworkRequestDetails.NetworkRequestDetails(this.detailsLinkifier);
        this.#layoutShiftDetails = new TimelineComponents.LayoutShiftDetails.LayoutShiftDetails();
        this.tabbedPane.addEventListener(UI.TabbedPane.Events.TabSelected, this.tabSelected, this);
        TraceBounds.TraceBounds.onChange(this.#onTraceBoundsChangeBound);
        this.lazySelectorStatsView = null;
    }
    selectorStatsView() {
        if (this.lazySelectorStatsView) {
            return this.lazySelectorStatsView;
        }
        this.lazySelectorStatsView = new TimelineSelectorStatsView(this.#parsedTrace);
        return this.lazySelectorStatsView;
    }
    getDetailsContentElementForTest() {
        return this.defaultDetailsContentElement;
    }
    async #onTraceBoundsChange(event) {
        if (event.updateType === 'MINIMAP_BOUNDS') {
            // If new minimap bounds are set, we might need to update the selected entry summary because
            // the links to other entries (ex. initiator) might be outside of the new breadcrumb.
            if (this.selection) {
                await this.setSelection(this.selection);
            }
        }
        if (event.updateType === 'RESET' || event.updateType === 'VISIBLE_WINDOW') {
            // If the update type was a changing of the minimap bounds, we do not
            // need to redraw.
            if (!this.selection) {
                this.scheduleUpdateContentsFromWindow();
            }
        }
    }
    async setModel(parsedTrace, selectedEvents, traceInsightsSets) {
        if (this.#parsedTrace !== parsedTrace) {
            // Clear the selector stats view, so the next time the user views it we
            // reconstruct it with the new trace data.
            this.lazySelectorStatsView = null;
            this.#parsedTrace = parsedTrace;
        }
        if (parsedTrace) {
            this.#filmStrip = Trace.Extras.FilmStrip.fromParsedTrace(parsedTrace);
        }
        this.#selectedEvents = selectedEvents;
        this.#traceInsightsSets = traceInsightsSets;
        this.tabbedPane.closeTabs([Tab.PaintProfiler, Tab.LayerViewer], false);
        for (const view of this.rangeDetailViews.values()) {
            view.setModelWithEvents(selectedEvents, parsedTrace);
        }
        this.lazyPaintProfilerView = null;
        this.lazyLayersView = null;
        await this.setSelection(null);
    }
    setContent(node) {
        const allTabs = this.tabbedPane.otherTabs(Tab.Details);
        for (let i = 0; i < allTabs.length; ++i) {
            if (!this.rangeDetailViews.has(allTabs[i])) {
                this.tabbedPane.closeTab(allTabs[i]);
            }
        }
        this.defaultDetailsContentElement.removeChildren();
        this.defaultDetailsContentElement.appendChild(node);
    }
    updateContents() {
        const view = this.rangeDetailViews.get(this.tabbedPane.selectedTabId || '');
        if (view) {
            const traceBoundsState = TraceBounds.TraceBounds.BoundsManager.instance().state();
            if (!traceBoundsState) {
                return;
            }
            const visibleWindow = traceBoundsState.milli.timelineTraceWindow;
            view.updateContents(this.selection || TimelineSelection.fromRange(visibleWindow.min, visibleWindow.max));
        }
    }
    appendTab(id, tabTitle, view, isCloseable) {
        this.tabbedPane.appendTab(id, tabTitle, view, undefined, undefined, isCloseable);
        if (this.preferredTabId !== this.tabbedPane.selectedTabId) {
            this.tabbedPane.selectTab(id);
        }
    }
    headerElement() {
        return this.tabbedPane.headerElement();
    }
    setPreferredTab(tabId) {
        this.preferredTabId = tabId;
    }
    /**
     * This forces a recalculation and rerendering of the timings
     * breakdown of a track.
     * User actions like zooming or scrolling can trigger many updates in
     * short time windows, so we debounce the calls in those cases. Single
     * sporadic calls (like selecting a new track) don't need to be
     * debounced. The forceImmediateUpdate param configures the debouncing
     * behaviour.
     */
    scheduleUpdateContentsFromWindow(forceImmediateUpdate = false) {
        if (!this.#parsedTrace) {
            this.setContent(UI.Fragment.html `<div/>`);
            return;
        }
        if (forceImmediateUpdate) {
            this.updateContentsFromWindow();
            return;
        }
        // Debounce this update as it's not critical.
        if (!this.updateContentsScheduled) {
            this.updateContentsScheduled = true;
            setTimeout(() => {
                this.updateContentsScheduled = false;
                this.updateContentsFromWindow();
            }, 100);
        }
    }
    updateContentsFromWindow() {
        const traceBoundsState = TraceBounds.TraceBounds.BoundsManager.instance().state();
        if (!traceBoundsState) {
            return;
        }
        const visibleWindow = traceBoundsState.milli.timelineTraceWindow;
        this.updateSelectedRangeStats(visibleWindow.min, visibleWindow.max);
        this.updateContents();
    }
    #getFilmStripFrame(frame) {
        if (!this.#filmStrip) {
            return null;
        }
        const screenshotTime = (frame.idle ? frame.startTime : frame.endTime);
        const filmStripFrame = Trace.Extras.FilmStrip.frameClosestToTimestamp(this.#filmStrip, screenshotTime);
        if (!filmStripFrame) {
            return null;
        }
        const frameTimeMilliSeconds = Trace.Helpers.Timing.microSecondsToMilliseconds(filmStripFrame.screenshotEvent.ts);
        return frameTimeMilliSeconds - frame.endTime < 10 ? filmStripFrame : null;
    }
    async setSelection(selection) {
        if (!this.#parsedTrace) {
            // You can't make a selection if we have no trace data.
            return;
        }
        this.detailsLinkifier.reset();
        this.selection = selection;
        if (!this.selection) {
            // Update instantly using forceImmediateUpdate, since we are only
            // making a single call and don't need to debounce.
            this.scheduleUpdateContentsFromWindow(/* forceImmediateUpdate */ true);
            return;
        }
        const selectionObject = this.selection.object;
        if (TimelineSelection.isSyntheticNetworkRequestDetailsEventSelection(selectionObject)) {
            const networkRequest = selectionObject;
            const maybeTarget = targetForEvent(this.#parsedTrace, networkRequest);
            await this.#networkRequestDetails.setData(this.#parsedTrace, networkRequest, maybeTarget);
            this.setContent(this.#networkRequestDetails);
        }
        else if (TimelineSelection.isSelection(selectionObject)) {
            const event = selectionObject;
            if (Root.Runtime.experiments.isEnabled("timeline-layout-shift-details" /* Root.Runtime.ExperimentName.TIMELINE_LAYOUT_SHIFT_DETAILS */) &&
                Trace.Types.Events.isSyntheticLayoutShift(event)) {
                const isFreshRecording = Boolean(this.#parsedTrace && Tracker.instance().recordingIsFresh(this.#parsedTrace));
                this.#layoutShiftDetails.setData(event, this.#traceInsightsSets, this.#parsedTrace, isFreshRecording);
                this.setContent(this.#layoutShiftDetails);
            }
            else {
                const traceEventDetails = await TimelineUIUtils.buildTraceEventDetails(this.#parsedTrace, event, this.detailsLinkifier, true);
                this.appendDetailsTabsForTraceEventAndShowDetails(event, traceEventDetails);
            }
        }
        else if (TimelineSelection.isLegacyTimelineFrame(selectionObject)) {
            const frame = selectionObject;
            const matchedFilmStripFrame = this.#getFilmStripFrame(frame);
            this.setContent(TimelineUIUtils.generateDetailsContentForFrame(frame, this.#filmStrip, matchedFilmStripFrame));
            const target = SDK.TargetManager.TargetManager.instance().rootTarget();
            if (frame.layerTree && target) {
                const layerTreeForFrame = new TimelineModel.TracingLayerTree.TracingFrameLayerTree(target, frame.layerTree);
                const layersView = this.layersView();
                layersView.showLayerTree(layerTreeForFrame);
                if (!this.tabbedPane.hasTab(Tab.LayerViewer)) {
                    this.appendTab(Tab.LayerViewer, i18nString(UIStrings.layers), layersView);
                }
            }
        }
        else if (TimelineSelection.isRangeSelection(selectionObject)) {
            this.updateSelectedRangeStats(this.selection.startTime, this.selection.endTime);
        }
        this.updateContents();
    }
    tabSelected(event) {
        if (!event.data.isUserGesture) {
            return;
        }
        this.setPreferredTab(event.data.tabId);
        this.updateContents();
    }
    layersView() {
        if (this.lazyLayersView) {
            return this.lazyLayersView;
        }
        this.lazyLayersView = new TimelineLayersView(this.showSnapshotInPaintProfiler.bind(this));
        return this.lazyLayersView;
    }
    paintProfilerView() {
        if (this.lazyPaintProfilerView) {
            return this.lazyPaintProfilerView;
        }
        if (!this.#parsedTrace) {
            return null;
        }
        this.lazyPaintProfilerView = new TimelinePaintProfilerView(this.#parsedTrace);
        return this.lazyPaintProfilerView;
    }
    showSnapshotInPaintProfiler(snapshot) {
        const paintProfilerView = this.paintProfilerView();
        if (!paintProfilerView) {
            return;
        }
        paintProfilerView.setSnapshot(snapshot);
        if (!this.tabbedPane.hasTab(Tab.PaintProfiler)) {
            this.appendTab(Tab.PaintProfiler, i18nString(UIStrings.paintProfiler), paintProfilerView, true);
        }
        this.tabbedPane.selectTab(Tab.PaintProfiler, true);
    }
    showSelectorStatsForIndividualEvent(event) {
        this.showAggregatedSelectorStats([event]);
    }
    showAggregatedSelectorStats(events) {
        const selectorStatsView = this.selectorStatsView();
        selectorStatsView.setAggregatedEvents(events);
        if (!this.tabbedPane.hasTab(Tab.SelectorStats)) {
            this.appendTab(Tab.SelectorStats, i18nString(UIStrings.selectorStats), selectorStatsView);
        }
    }
    appendDetailsTabsForTraceEventAndShowDetails(event, content) {
        this.setContent(content);
        if (Trace.Types.Events.isPaint(event) || Trace.Types.Events.isRasterTask(event)) {
            this.showEventInPaintProfiler(event);
        }
        if (Trace.Types.Events.isUpdateLayoutTree(event)) {
            this.showSelectorStatsForIndividualEvent(event);
        }
    }
    showEventInPaintProfiler(event) {
        const paintProfilerModel = SDK.TargetManager.TargetManager.instance().models(SDK.PaintProfiler.PaintProfilerModel)[0];
        if (!paintProfilerModel) {
            return;
        }
        const paintProfilerView = this.paintProfilerView();
        if (!paintProfilerView) {
            return;
        }
        const hasProfileData = paintProfilerView.setEvent(paintProfilerModel, event);
        if (!hasProfileData) {
            return;
        }
        if (this.tabbedPane.hasTab(Tab.PaintProfiler)) {
            return;
        }
        this.appendTab(Tab.PaintProfiler, i18nString(UIStrings.paintProfiler), paintProfilerView);
    }
    updateSelectedRangeStats(startTime, endTime) {
        if (!this.#selectedEvents || !this.#parsedTrace) {
            return;
        }
        const minBoundsMilli = Trace.Helpers.Timing.traceWindowMilliSeconds(this.#parsedTrace.Meta.traceBounds).min;
        const aggregatedStats = TimelineUIUtils.statsForTimeRange(this.#selectedEvents, startTime, endTime);
        const startOffset = startTime - minBoundsMilli;
        const endOffset = endTime - minBoundsMilli;
        const contentHelper = new TimelineDetailsContentHelper(null, null);
        contentHelper.addSection(i18nString(UIStrings.rangeSS, { PH1: i18n.TimeUtilities.millisToString(startOffset), PH2: i18n.TimeUtilities.millisToString(endOffset) }));
        const pieChart = TimelineUIUtils.generatePieChart(aggregatedStats);
        contentHelper.appendElementRow('', pieChart);
        this.setContent(contentHelper.fragment);
        // Find all recalculate style events data from range
        const isSelectorStatsEnabled = Common.Settings.Settings.instance().createSetting('timeline-capture-selector-stats', false).get();
        if (this.#selectedEvents && isSelectorStatsEnabled) {
            const eventsInRange = Trace.Helpers.Trace.findUpdateLayoutTreeEvents(this.#selectedEvents, Trace.Helpers.Timing.millisecondsToMicroseconds(startTime), Trace.Helpers.Timing.millisecondsToMicroseconds(endTime));
            if (eventsInRange.length > 0) {
                this.showAggregatedSelectorStats(eventsInRange);
            }
        }
    }
}
export var Tab;
(function (Tab) {
    /* eslint-disable @typescript-eslint/naming-convention -- Used by web_tests. */
    Tab["Details"] = "details";
    Tab["EventLog"] = "event-log";
    Tab["CallTree"] = "call-tree";
    Tab["BottomUp"] = "bottom-up";
    Tab["PaintProfiler"] = "paint-profiler";
    Tab["LayerViewer"] = "layer-viewer";
    Tab["SelectorStats"] = "selector-stats";
    /* eslint-enable @typescript-eslint/naming-convention */
})(Tab || (Tab = {}));
//# sourceMappingURL=TimelineDetailsView.js.map