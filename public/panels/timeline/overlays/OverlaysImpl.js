// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../core/platform/platform.js';
import * as TraceEngine from '../../../models/trace/trace.js';
import * as Components from './components/components.js';
// Bit of a hack: LayoutShifts are instant events, so have no duration. But
// OPP doesn't do well at making tiny events easy to spot and click. So we
// set it to a small duration so that the user is able to see and click
// them more easily. Long term we will explore a better UI solution to
// allow us to do this properly and not hack around it.
export const LAYOUT_SHIFT_SYNTHETIC_DURATION = TraceEngine.Types.Timing.MicroSeconds(5_000);
/**
 * Below the network track there is a resize bar the user can click and drag.
 */
const NETWORK_RESIZE_ELEM_HEIGHT_PX = 8;
export function isTimeRangeLabel(annotation) {
    return annotation.type === 'TIME_RANGE';
}
export function isEntriesLink(annotation) {
    return annotation.type === 'ENTRIES_LINK';
}
export function overlayIsSingleton(overlay) {
    return overlay.type === 'CURSOR_TIMESTAMP_MARKER' || overlay.type === 'ENTRY_SELECTED';
}
export class AnnotationOverlayActionEvent extends Event {
    overlay;
    action;
    static eventName = 'annotationoverlayactionsevent';
    constructor(overlay, action) {
        super(AnnotationOverlayActionEvent.eventName);
        this.overlay = overlay;
        this.action = action;
    }
}
/**
 * This class manages all the overlays that get drawn onto the performance
 * timeline. Overlays are DOM and are drawn above the network and main flame
 * chart.
 *
 * For more documentation, see `timeline/README.md` which has a section on overlays.
 */
export class Overlays extends EventTarget {
    /**
     * The list of active overlays. Overlays can't be marked as visible or
     * hidden; every overlay in this list is rendered.
     * We track each overlay against the HTML Element we have rendered. This is
     * because on first render of a new overlay, we create it, but then on
     * subsequent renders we do not destroy and recreate it, instead we update it
     * based on the new position of the timeline.
     */
    #overlaysToElements = new Map();
    // When the Entries Link Annotation is created, the arrow needs to follow the mouse.
    // Update the mouse coordinates while it is being created.
    #lastMouseOffsetX = null;
    #lastMouseOffsetY = null;
    // `entriesLinkInProgress` is the entries link Overlay that has not yet been fully created
    // and only has the entry that the link starts from set.
    // We save it as a separate variable because when the second entry of the link is not chosen yet,
    // the arrow follows the mouse. To achieve that, update the coordinates of `entriesLinkInProgress`
    // on mousemove. There can only be one link in the process on being created so the mousemove
    // only needs to update `entriesLinkInProgress` link overlay.
    #entriesLinkInProgress;
    #dimensions = {
        trace: {
            visibleWindow: null,
        },
        charts: {
            main: null,
            network: null,
        },
    };
    /**
     * To calculate the Y pixel value for an event we need access to the chart
     * and data provider in order to find out what level the event is on, and from
     * there calculate the pixel value for that level.
     */
    #charts;
    /**
     * The Overlays class will take each overlay, generate its HTML, and add it
     * to the container. This container is provided for us when the class is
     * created so we can manage its contents as overlays come and go.
     */
    #overlaysContainer;
    constructor(init) {
        super();
        this.#overlaysContainer = init.container;
        this.#charts = init.charts;
        this.#entriesLinkInProgress = null;
        // HTMLElements of both Flamecharts. They are used to get the mouse position over the Flamecharts.
        init.flameChartsContainers.main.addEventListener('mousemove', event => this.#updateMouseCoordinatesProgressEntriesLink.bind(this)(event, 'main'));
        init.flameChartsContainers.network.addEventListener('mousemove', event => this.#updateMouseCoordinatesProgressEntriesLink.bind(this)(event, 'network'));
    }
    // Mousemove event listener to get mouse coordinates and update them for the entries link that is being created.
    //
    // The 'mousemove' event is attached to `flameChartsContainers` instead of `overlaysContainer`
    // because `overlaysContainer` doesn't have events to enable the interaction with the
    // Flamecharts beneath it.
    #updateMouseCoordinatesProgressEntriesLink(event, chart) {
        const mouseEvent = event;
        this.#lastMouseOffsetX = mouseEvent.offsetX;
        this.#lastMouseOffsetY = mouseEvent.offsetY;
        if (!this.#entriesLinkInProgress || this.#entriesLinkInProgress.entryTo) {
            return;
        }
        // The Overlays layer coordinates cover both Network and Main Charts, while the mousemove
        // coordinates are received from the charts individually and start from 0 for each chart.
        //
        // To make it work on the overlays, we need to know which chart the entry belongs to and,
        // if it is on the main chart, add the height of the Network chart to get correct Entry
        // coordinates on the Overlays layer.
        const networkHeight = this.#dimensions.charts.network?.heightPixels ?? 0;
        const linkInProgressElement = this.#overlaysToElements.get(this.#entriesLinkInProgress);
        if (linkInProgressElement) {
            const component = linkInProgressElement.querySelector('devtools-entries-link-overlay');
            const yCoordinate = mouseEvent.offsetY + ((chart === 'main') ? networkHeight : 0);
            component.toEntryCoordinateAndDimentions = { x: mouseEvent.offsetX, y: yCoordinate };
        }
    }
    /**
     * Because entries can be a TimelineFrame, which is not a trace event, this
     * helper exists to return a consistent set of timings regardless of the type
     * of entry.
     */
    timingsForOverlayEntry(entry) {
        if (entry instanceof TraceEngine.Handlers.ModelHandlers.Frames.TimelineFrame) {
            return {
                startTime: entry.startTime,
                endTime: entry.endTime,
                duration: entry.duration,
            };
        }
        if (TraceEngine.Types.TraceEvents.isSyntheticLayoutShift(entry)) {
            const endTime = TraceEngine.Types.Timing.MicroSeconds(entry.ts + LAYOUT_SHIFT_SYNTHETIC_DURATION);
            return {
                endTime,
                duration: LAYOUT_SHIFT_SYNTHETIC_DURATION,
                startTime: entry.ts,
            };
        }
        return TraceEngine.Helpers.Timing.eventTimingsMicroSeconds(entry);
    }
    #chartForOverlayEntry(entry) {
        if (entry instanceof TraceEngine.Handlers.ModelHandlers.Frames.TimelineFrame) {
            return 'main';
        }
        if (TraceEngine.Types.TraceEvents.isNetworkTrackEntry(entry)) {
            return 'network';
        }
        return 'main';
    }
    /**
     * Add a new overlay to the view.
     */
    add(newOverlay) {
        if (this.#overlaysToElements.has(newOverlay)) {
            return newOverlay;
        }
        /**
         * If the overlay type is a singleton, and we already have one, we update
         * the existing one, rather than create a new one. This ensures you can only
         * ever have one instance of the overlay type.
         */
        const existing = this.overlaysOfType(newOverlay.type);
        if (overlayIsSingleton(newOverlay) && existing[0]) {
            this.updateExisting(existing[0], newOverlay);
            return existing[0];
        }
        // By setting the value to null, we ensure that on the next render that the
        // overlay will have a new HTML element created for it.
        this.#overlaysToElements.set(newOverlay, null);
        return newOverlay;
    }
    /**
     * Update an existing overlay without destroying and recreating its
     * associated DOM.
     *
     * This is useful if you need to rapidly update an overlay's data - e.g.
     * dragging to create time ranges - without the thrashing of destroying the
     * old overlay and re-creating the new one.
     */
    updateExisting(existingOverlay, newData) {
        if (!this.#overlaysToElements.has(existingOverlay)) {
            console.error('Trying to update an overlay that does not exist.');
            return;
        }
        for (const [key, value] of Object.entries(newData)) {
            // newData is of type Partial<T>, so each key must exist in T, but
            // Object.entries doesn't carry that information.
            const k = key;
            existingOverlay[k] = value;
        }
    }
    /**
     * @returns the list of overlays associated with a given entry.
     */
    overlaysForEntry(entry) {
        const matches = [];
        for (const [overlay] of this.#overlaysToElements) {
            if ('entry' in overlay && overlay.entry === entry) {
                matches.push(overlay);
            }
        }
        return matches;
    }
    /**
     * Removes any active overlays that match the provided type.
     * @returns the number of overlays that were removed.
     */
    removeOverlaysOfType(type) {
        const overlaysToRemove = Array.from(this.#overlaysToElements.keys()).filter(overlay => {
            return overlay.type === type;
        });
        for (const overlay of overlaysToRemove) {
            this.remove(overlay);
        }
        return overlaysToRemove.length;
    }
    /**
     * @returns all overlays that match the provided type.
     */
    overlaysOfType(type) {
        const matches = [];
        function overlayIsOfType(overlay) {
            return overlay.type === type;
        }
        for (const [overlay] of this.#overlaysToElements) {
            if (overlayIsOfType(overlay)) {
                matches.push(overlay);
            }
        }
        return matches;
    }
    /**
     * Removes the provided overlay from the list of overlays and destroys any
     * DOM associated with it.
     */
    remove(overlay) {
        const htmlElement = this.#overlaysToElements.get(overlay);
        if (htmlElement && this.#overlaysContainer) {
            this.#overlaysContainer.removeChild(htmlElement);
        }
        this.#overlaysToElements.delete(overlay);
    }
    /**
     * Update the dimenions of a chart.
     * IMPORTANT: this does not trigger a re-draw. You must call the render() method manually.
     */
    updateChartDimensions(chart, dimensions) {
        this.#dimensions.charts[chart] = dimensions;
    }
    /**
     * Update the visible window of the UI.
     * IMPORTANT: this does not trigger a re-draw. You must call the render() method manually.
     */
    updateVisibleWindow(visibleWindow) {
        this.#dimensions.trace.visibleWindow = visibleWindow;
    }
    /**
     * Clears all overlays and all data. Call this when the trace is changing
     * (e.g. the user has imported/recorded a new trace) and we need to start from
     * scratch and remove all overlays relating to the preivous trace.
     */
    reset() {
        if (this.#overlaysContainer) {
            this.#overlaysContainer.innerHTML = '';
        }
        this.#overlaysToElements.clear();
        // Clear out dimensions from the old Flame Charts.
        this.#dimensions.trace.visibleWindow = null;
        this.#dimensions.charts.main = null;
        this.#dimensions.charts.network = null;
    }
    /**
     * Updates the Overlays UI: new overlays will be rendered onto the view, and
     * existing overlays will have their positions changed to ensure they are
     * rendered in the right place.
     */
    update() {
        const timeRangeOverlays = [];
        for (const [overlay, existingElement] of this.#overlaysToElements) {
            const element = existingElement || this.#createElementForNewOverlay(overlay);
            if (existingElement) {
                this.#updateOverlayElementIfRequired(overlay, element);
            }
            else {
                // This is a new overlay, so we have to store the element and add it to the DOM.
                this.#overlaysToElements.set(overlay, element);
                this.#overlaysContainer.appendChild(element);
            }
            this.#positionOverlay(overlay, element);
            if (overlay.type === 'TIME_RANGE') {
                timeRangeOverlays.push(overlay);
            }
        }
        if (timeRangeOverlays.length > 1) { // If there are 0 or 1 overlays, they can't overlap
            this.#positionOverlappingTimeRangeLabels(timeRangeOverlays);
        }
    }
    /**
     * If any time-range overlays overlap, we try to adjust their horizontal
     * position in order to make sure you can distinguish them and that the labels
     * do not entirely overlap.
     * This is very much minimal best effort, and does not guarantee that all
     * labels will remain readable.
     */
    #positionOverlappingTimeRangeLabels(overlays) {
        const overlaysSorted = overlays.toSorted((o1, o2) => {
            return o1.bounds.min - o2.bounds.min;
        });
        // Track the overlays which overlap other overlays.
        // This isn't bi-directional: if we find that O2 overlaps O1, we will
        // store O1 => [O2]. We will not then also store O2 => [O1], because we
        // only need to deal with the overlap once.
        const overlapsByOverlay = new Map();
        for (let i = 0; i < overlaysSorted.length; i++) {
            const current = overlaysSorted[i];
            const overlaps = [];
            // Walk through subsequent overlays and find stop when you find the next one that does not overlap.
            for (let j = i + 1; j < overlaysSorted.length; j++) {
                const next = overlaysSorted[j];
                const currentAndNextOverlap = TraceEngine.Helpers.Timing.boundsIncludeTimeRange({
                    bounds: current.bounds,
                    timeRange: next.bounds,
                });
                if (currentAndNextOverlap) {
                    overlaps.push(next);
                }
                else {
                    // Overlays are sorted by time, if this one does not overlap, the next one will not, so we can break.
                    break;
                }
            }
            overlapsByOverlay.set(current, overlaps);
        }
        for (const [firstOverlay, overlappingOverlays] of overlapsByOverlay) {
            const element = this.#overlaysToElements.get(firstOverlay);
            if (!element) {
                continue;
            }
            // If the first overlay is adjusted, we can start back from 0 again
            // rather than continually increment up.
            let firstIndexForOverlapClass = 1;
            if (element.getAttribute('class')?.includes('overlap-')) {
                firstIndexForOverlapClass = 0;
            }
            overlappingOverlays.forEach(overlay => {
                const element = this.#overlaysToElements.get(overlay);
                element?.classList.add(`overlap-${firstIndexForOverlapClass++}`);
            });
        }
    }
    #positionOverlay(overlay, element) {
        switch (overlay.type) {
            case 'ENTRY_SELECTED': {
                const isVisible = this.entryIsVisibleOnChart(overlay.entry);
                this.#setOverlayElementVisibility(element, isVisible);
                if (isVisible) {
                    this.#positionEntryBorderOutlineType(overlay, element);
                }
                break;
            }
            case 'ENTRY_OUTLINE': {
                const selectedOverlay = this.overlaysOfType('ENTRY_SELECTED')?.at(0);
                // Check if this entry has also been selected by the user. If it has,
                // do not show the outline, but only show the selected outline.
                const outlinedEntryIsSelected = Boolean(selectedOverlay && selectedOverlay.entry === overlay.entry);
                if (!outlinedEntryIsSelected && this.entryIsVisibleOnChart(overlay.entry)) {
                    this.#setOverlayElementVisibility(element, true);
                    this.#positionEntryBorderOutlineType(overlay, element);
                }
                else {
                    this.#setOverlayElementVisibility(element, false);
                }
                break;
            }
            case 'TIME_RANGE': {
                this.#positionTimeRangeOverlay(overlay, element);
                const component = element.querySelector('devtools-time-range-overlay');
                if (component) {
                    component.afterOverlayUpdate();
                }
                break;
            }
            case 'ENTRY_LABEL': {
                const entryVisible = this.entryIsVisibleOnChart(overlay.entry);
                this.#setOverlayElementVisibility(element, entryVisible);
                if (entryVisible) {
                    const entryLabelParams = this.#positionEntryLabelOverlay(overlay, element);
                    const component = element.querySelector('devtools-entry-label-overlay');
                    if (component && entryLabelParams) {
                        component.entryLabelParams = entryLabelParams;
                    }
                }
                break;
            }
            case 'ENTRIES_LINK': {
                this.#positionEntriesLinkOverlay(overlay, element);
                break;
            }
            case 'TIMESPAN_BREAKDOWN': {
                this.#positionTimespanBreakdownOverlay(overlay, element);
                const component = element.querySelector('devtools-timespan-breakdown-overlay');
                if (component) {
                    component.afterOverlayUpdate();
                }
                // TODO: Have the timespan squeeze instead.
                if (overlay.entry) {
                    const { visibleWindow } = this.#dimensions.trace;
                    const isVisible = Boolean(visibleWindow && this.#entryIsVerticallyVisibleOnChart(overlay.entry) &&
                        TraceEngine.Helpers.Timing.boundsIncludeTimeRange({
                            bounds: visibleWindow,
                            timeRange: overlay.sections[0].bounds,
                        }));
                    this.#setOverlayElementVisibility(element, isVisible);
                }
                break;
            }
            case 'CURSOR_TIMESTAMP_MARKER': {
                const { visibleWindow } = this.#dimensions.trace;
                // Only update the position if the timestamp of this marker is within
                // the visible bounds.
                const isVisible = Boolean(visibleWindow && TraceEngine.Helpers.Timing.timestampIsInBounds(visibleWindow, overlay.timestamp));
                this.#setOverlayElementVisibility(element, isVisible);
                if (isVisible) {
                    this.#positionTimestampMarker(overlay, element);
                }
                break;
            }
            case 'CANDY_STRIPED_TIME_RANGE': {
                const { visibleWindow } = this.#dimensions.trace;
                // If the bounds of this overlay are not within the visible bounds, we
                // can skip updating its position and just hide it.
                const isVisible = Boolean(visibleWindow && this.#entryIsVerticallyVisibleOnChart(overlay.entry) &&
                    TraceEngine.Helpers.Timing.boundsIncludeTimeRange({
                        bounds: visibleWindow,
                        timeRange: overlay.bounds,
                    }));
                this.#setOverlayElementVisibility(element, isVisible);
                if (isVisible) {
                    this.#positionCandyStripedTimeRange(overlay, element);
                }
                break;
            }
            default: {
                Platform.TypeScriptUtilities.assertNever(overlay, `Unknown overlay: ${JSON.stringify(overlay)}`);
            }
        }
    }
    #positionTimestampMarker(overlay, element) {
        // Because we are adjusting the x position, we can use either chart here.
        const x = this.#xPixelForMicroSeconds('main', overlay.timestamp);
        element.style.left = `${x}px`;
    }
    #positionTimespanBreakdownOverlay(overlay, element) {
        const component = element.querySelector('devtools-timespan-breakdown-overlay');
        const shadow = component?.shadowRoot;
        const elementSections = shadow?.querySelectorAll('.timespan-breakdown-overlay-section');
        if (overlay.sections.length === 0) {
            return;
        }
        // Handle horizontal positioning.
        const leftEdgePixel = this.#xPixelForMicroSeconds('main', overlay.sections[0].bounds.min);
        const rightEdgePixel = this.#xPixelForMicroSeconds('main', overlay.sections[overlay.sections.length - 1].bounds.max);
        if (leftEdgePixel === null || rightEdgePixel === null) {
            return;
        }
        const rangeWidth = rightEdgePixel - leftEdgePixel;
        element.style.left = `${leftEdgePixel}px`;
        element.style.width = `${rangeWidth}px`;
        if (!(elementSections?.length)) {
            return;
        }
        let count = 0;
        for (const section of overlay.sections) {
            const leftPixel = this.#xPixelForMicroSeconds('main', section.bounds.min);
            const rightPixel = this.#xPixelForMicroSeconds('main', section.bounds.max);
            if (leftPixel === null || rightPixel === null) {
                return;
            }
            const rangeWidth = rightPixel - leftPixel;
            const sectionElement = elementSections[count];
            sectionElement.style.left = `${leftPixel}px`;
            sectionElement.style.width = `${rangeWidth}px`;
            count++;
        }
        // Handle vertical positioning based on the entry's vertical position.
        if (overlay.entry) {
            const chartName = this.#chartForOverlayEntry(overlay.entry);
            if (chartName === 'network') {
                const y = this.yPixelForEventOnChart(overlay.entry);
                if (y === null) {
                    return;
                }
                // Max height for the overlay box.
                const MAX_BOX_HEIGHT = 50;
                // Some padding so the box hovers just on top.
                const PADDING = 7;
                // Where the timespan breakdown should sit. Slightly on top of the entry.
                const bottom = y - PADDING;
                // Available space between the bottom of the overlay and top of the chart.
                const minSpace = Math.max(bottom, 0);
                // Contrain height to available space.
                const height = Math.min(MAX_BOX_HEIGHT, minSpace);
                elementSections[0].style.maxHeight = `${MAX_BOX_HEIGHT}px`;
                elementSections[0].style.height = `${height}px`;
                const top = bottom - height;
                element.style.top = `${top}px`;
                element.style.fontStyle = 'italic';
            }
        }
    }
    #positionEntriesLinkOverlay(overlay, element) {
        const component = element.querySelector('devtools-entries-link-overlay');
        if (component) {
            const fromEntryStartX = this.xPixelForEventStartOnChart(overlay.entryFrom) ?? 0;
            const fromEntryEndX = this.xPixelForEventEndOnChart(overlay.entryFrom) ?? 0;
            const fromEntryLength = fromEntryEndX - fromEntryStartX;
            const fromEntryHeight = this.pixelHeightForEventOnChart(overlay.entryFrom) ?? 0;
            const entryFromVisibility = this.entryIsVisibleOnChart(overlay.entryFrom);
            const entryToVisibility = overlay.entryTo ? this.entryIsVisibleOnChart(overlay.entryTo) : false;
            // If the 'from' entry is visible, set the entry Y as an arrow start coordinate. Ff not, get the canvas edge coordinate to for the arrow to start from.
            const yPixelForFromArrow = (entryFromVisibility ? this.yPixelForEventOnChart(overlay.entryFrom) :
                this.#yCoordinateForNotVisibleEntry(overlay.entryFrom)) ??
                0;
            component.entriesVisibility = {
                fromEntryVisibility: entryFromVisibility,
                toEntryVisibility: entryToVisibility,
            };
            component.fromEntryCoordinateAndDimentions =
                { x: fromEntryStartX, y: yPixelForFromArrow, length: fromEntryLength, height: fromEntryHeight };
            // If entryTo exists, pass the coordinates and dimentions of the entry that the arrow snaps to.
            // If it does not, the event tracking mouse coordinates updates 'to coordinates' so the arrow follows the mouse instead.
            if (overlay.entryTo) {
                const toEntryStartX = this.xPixelForEventStartOnChart(overlay.entryTo) ?? 0;
                const toEntryEndX = this.xPixelForEventEndOnChart(overlay.entryTo) ?? 0;
                const toEntryWidth = toEntryEndX - toEntryStartX;
                const toEntryHeight = this.pixelHeightForEventOnChart(overlay.entryTo) ?? 0;
                // If the 'to' entry is visible, set the entry Y as an arrow coordinate to point ot. Ff not, get the canvas edge coordate to point the arrow to.
                const yPixelForToArrow = ((this.entryIsVisibleOnChart(overlay.entryTo)) ? this.yPixelForEventOnChart(overlay.entryTo) :
                    this.#yCoordinateForNotVisibleEntry(overlay.entryTo)) ??
                    0;
                component.toEntryCoordinateAndDimentions = {
                    x: toEntryStartX ?? 0,
                    y: yPixelForToArrow,
                    length: toEntryWidth,
                    height: toEntryHeight,
                };
            }
            else if (this.#lastMouseOffsetX && this.#lastMouseOffsetY) {
                // The second coordinate for in progress link gets updated on mousemove
                this.#entriesLinkInProgress = overlay;
            }
        }
    }
    /**
     *  Return Y coordinate for an arrow connecting 2 entries to attach to if the entry is not visible.
     *  For example, if the entry is scrolled up from the visible area , return the y index of the edge of the track:
     *  --
     * |  | - entry off the visible chart
     *  --
     *
     * --Y---------------  -- Y is the returned coordinate that the arrow should point to
     *
     * flamechart data     -- visible flamechart data between the 2 lines
     * ------------------
     *
     * On the contrary, if the entry is scrolled off the bottom, get the coordinate of the top of the visible canvas.
     */
    #yCoordinateForNotVisibleEntry(entry) {
        const chartName = this.#chartForOverlayEntry(entry);
        const y = this.yPixelForEventOnChart(entry);
        if (y === null) {
            return 0;
        }
        if (chartName === 'main') {
            if (!this.#dimensions.charts.main?.heightPixels) {
                // Shouldn't happen, but if the main chart has no height, nothing on it is visible.
                return 0;
            }
            const yWithoutNetwork = y - this.networkChartOffsetHeight();
            // Check if the y position is less than 0. If it, the entry is off the top of the track canvas.
            // In that case, return the height of network track, which is also the top of main track.
            if (yWithoutNetwork < 0) {
                return this.networkChartOffsetHeight();
            }
        }
        if (chartName === 'network') {
            if (!this.#dimensions.charts.network) {
                return 0;
            }
            // The event is off the bottom of the network chart. In this case return the bottom of the network chart.
            if (y > this.#dimensions.charts.network.heightPixels ?? 0) {
                return this.#dimensions.charts.network.heightPixels;
            }
        }
        // In other cases, return the y of the entry
        return y;
    }
    #positionTimeRangeOverlay(overlay, element) {
        // Time ranges span both charts, it doesn't matter which one we pass here.
        // It's used to get the width of the container, and both charts have the
        // same width.
        const leftEdgePixel = this.#xPixelForMicroSeconds('main', overlay.bounds.min);
        const rightEdgePixel = this.#xPixelForMicroSeconds('main', overlay.bounds.max);
        if (leftEdgePixel === null || rightEdgePixel === null) {
            return;
        }
        const rangeWidth = rightEdgePixel - leftEdgePixel;
        element.style.left = `${leftEdgePixel}px`;
        element.style.width = `${rangeWidth}px`;
    }
    /**
     * Positions an EntryLabel overlay
     * @param overlay - the EntrySelected overlay that we need to position.
     * @param element - the DOM element representing the overlay
     */
    #positionEntryLabelOverlay(overlay, element) {
        const chartName = this.#chartForOverlayEntry(overlay.entry);
        const x = this.xPixelForEventStartOnChart(overlay.entry);
        const y = this.yPixelForEventOnChart(overlay.entry);
        const { endTime } = this.timingsForOverlayEntry(overlay.entry);
        const endX = this.#xPixelForMicroSeconds(chartName, endTime);
        const entryHeight = this.pixelHeightForEventOnChart(overlay.entry) ?? 0;
        if (x === null || y === null || endX === null) {
            return null;
        }
        // The width of the overlay is by default the width of the entry. However
        // we modify that for instant events like LCP markers, and also ensure a
        // minimum width.
        const widthPixels = endX - x;
        // The part of the overlay that draws a box around an entry is always at least 2px wide.
        const entryWidth = Math.max(2, widthPixels);
        const networkHeight = this.#dimensions.charts.network?.heightPixels ?? 0;
        // Find the part of the entry that is covered by resizer to not draw it over the resizer.
        // If the entry is in the main flamechart, find the part of the entry that is covered from the top.
        // If it is in the network track, find the part covered by the resizer from the bottom.
        const entryHiddenTop = this.networkChartOffsetHeight() - y;
        const entryHiddenBottom = entryHeight + y - networkHeight;
        // If the covered part is negative, the entry is fully visible and the cut off part is 0.
        const cutOffEntryHeight = Math.max((chartName === 'main') ? entryHiddenTop : entryHiddenBottom, 0);
        let topOffset = y - Components.EntryLabelOverlay.EntryLabelOverlay.LABEL_AND_CONNECTOR_HEIGHT;
        // If part of the entry height is not visible in the main flamechart, take that into the account in the top offset.
        if (chartName === 'main') {
            topOffset += cutOffEntryHeight;
        }
        // Position the start of label overlay at the start of the entry + length of connector + legth of the label element
        element.style.top = `${topOffset}px`;
        // Position the start of the entry label overlay in the the middle of the entry.
        element.style.left = `${x + entryWidth / 2}px`;
        return { height: entryHeight, width: entryWidth, cutOffEntryHeight, chart: chartName };
    }
    #positionCandyStripedTimeRange(overlay, element) {
        const chartName = this.#chartForOverlayEntry(overlay.entry);
        const startX = this.#xPixelForMicroSeconds(chartName, overlay.bounds.min);
        const endX = this.#xPixelForMicroSeconds(chartName, overlay.bounds.max);
        if (startX === null || endX === null) {
            return;
        }
        const widthPixels = endX - startX;
        // The entry selected overlay is always at least 2px wide.
        const finalWidth = Math.max(2, widthPixels);
        element.style.width = `${finalWidth}px`;
        element.style.left = `${startX}px`;
        let y = this.yPixelForEventOnChart(overlay.entry);
        if (y === null) {
            return;
        }
        const totalHeight = this.pixelHeightForEventOnChart(overlay.entry) ?? 0;
        // We might modify the height we use when drawing the overlay, hence copying the totalHeight.
        let height = totalHeight;
        if (height === null) {
            return;
        }
        // If the event is on the main chart, we need to adjust its selected border
        // if the event is cut off the top of the screen, because we need to ensure
        // that it does not overlap the resize element. Unfortunately we cannot
        // z-index our way out of this, so instead we calculate if the event is cut
        // off, and if it is, we draw the partial selected outline and do not draw
        // the top border, making it appear like it is going behind the resizer.
        // We don't need to worry about it going off the bottom, because in that
        // case we don't draw the overlay anyway.
        if (chartName === 'main') {
            const chartTopPadding = this.networkChartOffsetHeight();
            // We now calculate the available height: if the entry is cut off we don't
            // show the border for the part that is cut off.
            const cutOffTop = y < chartTopPadding;
            height = cutOffTop ? Math.abs(y + height - chartTopPadding) : height;
            element.classList.toggle('cut-off-top', cutOffTop);
            if (cutOffTop) {
                // Adjust the y position: we need to move it down from the top Y
                // position to the Y position of the first visible pixel. The
                // adjustment is totalHeight - height because if the totalHeight is 17,
                // and the visibleHeight is 5, we need to draw the overay at 17-5=12px
                // vertically from the top of the event.
                y = y + totalHeight - height;
            }
        }
        else {
            // If the event is on the network chart, we use the same logic as above
            // for the main chart, but to check if the event is cut off the bottom of
            // the network track and only part of the overlay is visible.
            // We don't need to worry about the event going off the top of the panel
            // as we can show the full overlay and it gets cut off by the minimap UI.
            const networkHeight = this.#dimensions.charts.network?.heightPixels ?? 0;
            const lastVisibleY = y + totalHeight;
            const cutOffBottom = lastVisibleY > networkHeight;
            const cutOffTop = y > networkHeight;
            element.classList.toggle('cut-off-top', cutOffTop);
            element.classList.toggle('cut-off-bottom', cutOffBottom);
            if (cutOffBottom) {
                // Adjust the height of the overlay to be the amount of visible pixels.
                height = networkHeight - y;
            }
        }
        element.style.height = `${height}px`;
        element.style.top = `${y}px`;
    }
    /**
     * Positions an EntrySelected or EntryOutline overlay. These share the same
     * method as they are both borders around an entry.
     * @param overlay - the EntrySelected/EntryOutline overlay that we need to position.
     * @param element - the DOM element representing the overlay
     */
    #positionEntryBorderOutlineType(overlay, element) {
        const chartName = this.#chartForOverlayEntry(overlay.entry);
        let x = this.xPixelForEventStartOnChart(overlay.entry);
        let y = this.yPixelForEventOnChart(overlay.entry);
        if (x === null || y === null) {
            return;
        }
        const { endTime, duration } = this.timingsForOverlayEntry(overlay.entry);
        const endX = this.#xPixelForMicroSeconds(chartName, endTime);
        if (endX === null) {
            return;
        }
        const totalHeight = this.pixelHeightForEventOnChart(overlay.entry) ?? 0;
        // We might modify the height we use when drawing the overlay, hence copying the totalHeight.
        let height = totalHeight;
        if (height === null) {
            return;
        }
        // The width of the overlay is by default the width of the entry. However
        // we modify that for instant events like LCP markers, and also ensure a
        // minimum width.
        let widthPixels = endX - x;
        if (!duration) {
            // No duration = instant event, so we check in case it's a marker.
            const provider = chartName === 'main' ? this.#charts.mainProvider : this.#charts.networkProvider;
            const chart = chartName === 'main' ? this.#charts.mainChart : this.#charts.networkChart;
            // It could be a marker event, in which case we need to know the
            // exact position the marker was rendered. This is because markers
            // which have the same timestamp are rendered next to each other, so
            // the timestamp is not necessarily exactly where the marker was
            // rendered.
            const index = provider.indexForEvent?.(overlay.entry);
            const markerPixels = chart.getMarkerPixelsForEntryIndex(index ?? -1);
            if (markerPixels) {
                x = markerPixels.x;
                widthPixels = markerPixels.width;
            }
        }
        // The entry selected overlay is always at least 2px wide.
        const finalWidth = Math.max(2, widthPixels);
        element.style.width = `${finalWidth}px`;
        // If the event is on the main chart, we need to adjust its selected border
        // if the event is cut off the top of the screen, because we need to ensure
        // that it does not overlap the resize element. Unfortunately we cannot
        // z-index our way out of this, so instead we calculate if the event is cut
        // off, and if it is, we draw the partial selected outline and do not draw
        // the top border, making it appear like it is going behind the resizer.
        // We don't need to worry about it going off the bottom, because in that
        // case we don't draw the overlay anyway.
        if (chartName === 'main') {
            const chartTopPadding = this.networkChartOffsetHeight();
            // We now calculate the available height: if the entry is cut off we don't
            // show the border for the part that is cut off.
            const cutOffTop = y < chartTopPadding;
            height = cutOffTop ? Math.abs(y + height - chartTopPadding) : height;
            element.classList.toggle('cut-off-top', cutOffTop);
            if (cutOffTop) {
                // Adjust the y position: we need to move it down from the top Y
                // position to the Y position of the first visible pixel. The
                // adjustment is totalHeight - height because if the totalHeight is 17,
                // and the visibleHeight is 5, we need to draw the overay at 17-5=12px
                // vertically from the top of the event.
                y = y + totalHeight - height;
            }
        }
        else {
            // If the event is on the network chart, we use the same logic as above
            // for the main chart, but to check if the event is cut off the bottom of
            // the network track and only part of the overlay is visible.
            // We don't need to worry about the even going off the top of the panel
            // as we can show the full overlay and it gets cut off by the minimap UI.
            const networkHeight = this.#dimensions.charts.network?.heightPixels ?? 0;
            const lastVisibleY = y + totalHeight;
            const cutOffBottom = lastVisibleY > networkHeight;
            element.classList.toggle('cut-off-bottom', cutOffBottom);
            if (cutOffBottom) {
                // Adjust the height of the overlay to be the amount of visible pixels.
                height = networkHeight - y;
            }
        }
        element.style.height = `${height}px`;
        element.style.top = `${y}px`;
        element.style.left = `${x}px`;
    }
    #createElementForNewOverlay(overlay) {
        const div = document.createElement('div');
        div.classList.add('overlay-item', `overlay-type-${overlay.type}`);
        switch (overlay.type) {
            case 'ENTRY_LABEL': {
                const component = new Components.EntryLabelOverlay.EntryLabelOverlay(overlay.label, this.#chartForOverlayEntry(overlay.entry) === 'main');
                component.addEventListener(Components.EntryLabelOverlay.EmptyEntryLabelRemoveEvent.eventName, () => {
                    this.dispatchEvent(new AnnotationOverlayActionEvent(overlay, 'Remove'));
                });
                component.addEventListener(Components.EntryLabelOverlay.EntryLabelChangeEvent.eventName, event => {
                    const newLabel = event.newLabel;
                    overlay.label = newLabel;
                    this.dispatchEvent(new AnnotationOverlayActionEvent(overlay, 'Update'));
                });
                div.appendChild(component);
                return div;
            }
            case 'ENTRIES_LINK': {
                const entryEndX = this.xPixelForEventEndOnChart(overlay.entryFrom) ?? 0;
                const entryStartX = this.xPixelForEventEndOnChart(overlay.entryFrom) ?? 0;
                const entryStartY = (this.yPixelForEventOnChart(overlay.entryFrom) ?? 0);
                const entryWidth = entryEndX - entryStartX;
                const entryHeight = this.pixelHeightForEventOnChart(overlay.entryFrom) ?? 0;
                const component = new Components.EntriesLinkOverlay.EntriesLinkOverlay({ x: entryEndX, y: entryStartY, width: entryWidth, height: entryHeight });
                div.appendChild(component);
                return div;
            }
            case 'ENTRY_OUTLINE': {
                div.classList.add(`outline-reason-${overlay.outlineReason}`);
                return div;
            }
            case 'TIME_RANGE': {
                const component = new Components.TimeRangeOverlay.TimeRangeOverlay(overlay.label);
                component.duration = overlay.showDuration ? overlay.bounds.range : null;
                component.canvasRect = this.#charts.mainChart.canvasBoundingClientRect();
                component.addEventListener(Components.TimeRangeOverlay.TimeRangeLabelChangeEvent.eventName, event => {
                    const newLabel = event.newLabel;
                    overlay.label = newLabel;
                    this.dispatchEvent(new AnnotationOverlayActionEvent(overlay, 'Update'));
                });
                component.addEventListener(Components.TimeRangeOverlay.TimeRangeRemoveEvent.eventName, () => {
                    this.dispatchEvent(new AnnotationOverlayActionEvent(overlay, 'Remove'));
                });
                div.appendChild(component);
                return div;
            }
            case 'TIMESPAN_BREAKDOWN': {
                const component = new Components.TimespanBreakdownOverlay.TimespanBreakdownOverlay();
                component.sections = overlay.sections;
                component.canvasRect = this.#charts.mainChart.canvasBoundingClientRect();
                div.appendChild(component);
                return div;
            }
            default: {
                return div;
            }
        }
    }
    /**
     * Some of the HTML elements for overlays might need updating between each render
     * (for example, if a time range has changed, we update its duration text)
     */
    #updateOverlayElementIfRequired(overlay, element) {
        switch (overlay.type) {
            case 'ENTRY_SELECTED':
                // Nothing to do here.
                break;
            case 'TIME_RANGE': {
                const component = element.querySelector('devtools-time-range-overlay');
                if (component) {
                    component.duration = overlay.showDuration ? overlay.bounds.range : null;
                    component.canvasRect = this.#charts.mainChart.canvasBoundingClientRect();
                }
                break;
            }
            case 'ENTRY_OUTLINE':
                break;
            case 'ENTRIES_LINK': {
                break;
            }
            case 'ENTRY_LABEL': {
                break;
            }
            case 'TIMESPAN_BREAKDOWN': {
                const component = element.querySelector('devtools-timespan-breakdown-overlay');
                if (component) {
                    component.sections = overlay.sections;
                    component.canvasRect = this.#charts.mainChart.canvasBoundingClientRect();
                }
                break;
            }
            case 'CURSOR_TIMESTAMP_MARKER':
                // No contents within this that need updating.
                break;
            case 'CANDY_STRIPED_TIME_RANGE':
                break;
            default:
                Platform.TypeScriptUtilities.assertNever(overlay, `Unexpected overlay ${overlay}`);
        }
    }
    /**
     * @returns true if the entry is visible on chart, which means that both
     * horizontally and vertically it is at least partially in view.
     */
    entryIsVisibleOnChart(entry) {
        const verticallyVisible = this.#entryIsVerticallyVisibleOnChart(entry);
        const horiziontallyVisible = this.#entryIsHorizontallyVisibleOnChart(entry);
        return verticallyVisible && horiziontallyVisible;
    }
    /**
     * Calculates if an entry is visible horizontally. This is easy because we
     * don't have to consider any pixels and can instead check that its start and
     * end times intersect with the visible window.
     */
    #entryIsHorizontallyVisibleOnChart(entry) {
        if (this.#dimensions.trace.visibleWindow === null) {
            return false;
        }
        const { startTime, endTime } = this.timingsForOverlayEntry(entry);
        const entryTimeRange = TraceEngine.Helpers.Timing.traceWindowFromMicroSeconds(startTime, endTime);
        return TraceEngine.Helpers.Timing.boundsIncludeTimeRange({
            bounds: this.#dimensions.trace.visibleWindow,
            timeRange: entryTimeRange,
        });
    }
    /**
     * Calculate if an entry is visible vertically on the chart. A bit fiddly as
     * we have to figure out its pixel offset and go on that. Unlike horizontal
     * visibility, we can't work soley from its microsecond values.
     */
    #entryIsVerticallyVisibleOnChart(entry) {
        const chartName = this.#chartForOverlayEntry(entry);
        const y = this.yPixelForEventOnChart(entry);
        if (y === null) {
            return false;
        }
        const eventHeight = this.pixelHeightForEventOnChart(entry);
        if (!eventHeight) {
            return false;
        }
        if (chartName === 'main') {
            if (!this.#dimensions.charts.main?.heightPixels) {
                // Shouldn't happen, but if the main chart has no height, nothing on it is visible.
                return false;
            }
            // The yPixelForEventOnChart method returns the y pixel including an adjustment for the network track.
            // To see if an entry on the main flame chart is visible, we can check
            // its y value without the network track adjustment. If it is < 0, then
            // it's off the top of the screen.
            //
            const yWithoutNetwork = y - this.networkChartOffsetHeight();
            // Check if the y position + the height is less than 0. We add height so
            // that we correctly consider an event only partially scrolled off to be
            // visible.
            if (yWithoutNetwork + eventHeight < 0) {
                return false;
            }
            if (yWithoutNetwork > this.#dimensions.charts.main.heightPixels) {
                // The event is off the bottom of the screen.
                return false;
            }
        }
        if (chartName === 'network') {
            if (!this.#dimensions.charts.network) {
                // The network chart can be hidden if there are no requests in the trace.
                return false;
            }
            if (y <= -14) {
                // Weird value, but the network chart has the header row with
                // timestamps on it: events stay visible behind those timestamps, so we
                // want any overlays to treat themselves as visible too.
                return false;
            }
            if (y > this.#dimensions.charts.network.heightPixels ?? 0) {
                // The event is off the bottom of the network chart.
                return false;
            }
        }
        // If we got here, none of the conditions to mark an event as invisible got
        // triggered, so the event must be visible.
        return true;
    }
    /**
     * Calculate the X pixel position for an event start on the timeline.
     * @param chartName - the chart that the event is on. It is expected that both
     * charts have the same width so this doesn't make a difference - but it might
     * in the future if the UI changes, hence asking for it.
     *
     * @param event - the trace event you want to get the pixel position of
     */
    xPixelForEventStartOnChart(event) {
        const chartName = this.#chartForOverlayEntry(event);
        const { startTime } = this.timingsForOverlayEntry(event);
        return this.#xPixelForMicroSeconds(chartName, startTime);
    }
    /**
     * Calculate the X pixel position for an event end on the timeline.
     * @param chartName - the chart that the event is on. It is expected that both
     * charts have the same width so this doesn't make a difference - but it might
     * in the future if the UI changes, hence asking for it.
     *
     * @param event - the trace event you want to get the pixel position of
     */
    xPixelForEventEndOnChart(event) {
        const chartName = this.#chartForOverlayEntry(event);
        const { endTime } = this.timingsForOverlayEntry(event);
        return this.#xPixelForMicroSeconds(chartName, endTime);
    }
    /**
     * Calculate the xPixel for a given timestamp. To do this we calculate how
     * far in microseconds from the left of the visible window an event is, and
     * divide that by the total time span. This gives us a fraction representing
     * how far along the timeline the event is. We can then multiply that by the
     * width of the canvas to get its pixel position.
     */
    #xPixelForMicroSeconds(chart, timestamp) {
        if (this.#dimensions.trace.visibleWindow === null) {
            console.error('Cannot calculate xPixel without visible trace window.');
            return null;
        }
        const canvasWidthPixels = this.#dimensions.charts[chart]?.widthPixels ?? null;
        if (canvasWidthPixels === null) {
            console.error(`Cannot calculate xPixel without ${chart} dimensions.`);
            return null;
        }
        const timeFromLeft = timestamp - this.#dimensions.trace.visibleWindow.min;
        const totalTimeSpan = this.#dimensions.trace.visibleWindow.range;
        return Math.floor(timeFromLeft / totalTimeSpan * canvasWidthPixels);
    }
    /**
     * Calculate the Y pixel position for the event on the timeline relative to
     * the entire window.
     * This means if the event is in the main flame chart and below the network,
     * we add the height of the network chart to the Y value to position it
     * correctly.
     * This can return null if any data was missing, or if the event is not
     * visible (if the level it's on is hidden because the track is collapsed,
     * for example)
     */
    yPixelForEventOnChart(event) {
        const chartName = this.#chartForOverlayEntry(event);
        const chart = chartName === 'main' ? this.#charts.mainChart : this.#charts.networkChart;
        const provider = chartName === 'main' ? this.#charts.mainProvider : this.#charts.networkProvider;
        const indexForEntry = provider.indexForEvent?.(event);
        if (typeof indexForEntry !== 'number') {
            return null;
        }
        const timelineData = provider.timelineData();
        if (timelineData === null) {
            return null;
        }
        const level = timelineData.entryLevels.at(indexForEntry);
        if (typeof level === 'undefined') {
            return null;
        }
        if (!chart.levelIsVisible(level)) {
            return null;
        }
        const pixelOffsetForLevel = chart.levelToOffset(level);
        // Now we have the offset for the level, we need to adjust it by the user's scroll offset.
        let pixelAdjustedForScroll = pixelOffsetForLevel - (this.#dimensions.charts[chartName]?.scrollOffsetPixels ?? 0);
        // Now if the event is in the main chart, we need to pad its Y position
        // down by the height of the network chart + the network resize element.
        if (chartName === 'main') {
            pixelAdjustedForScroll += this.networkChartOffsetHeight();
        }
        return pixelAdjustedForScroll;
    }
    /**
     * Calculate the height of the event on the timeline.
     */
    pixelHeightForEventOnChart(event) {
        const chartName = this.#chartForOverlayEntry(event);
        const chart = chartName === 'main' ? this.#charts.mainChart : this.#charts.networkChart;
        const provider = chartName === 'main' ? this.#charts.mainProvider : this.#charts.networkProvider;
        const indexForEntry = provider.indexForEvent?.(event);
        if (typeof indexForEntry !== 'number') {
            return null;
        }
        const timelineData = provider.timelineData();
        if (timelineData === null) {
            return null;
        }
        const level = timelineData.entryLevels.at(indexForEntry);
        if (typeof level === 'undefined') {
            return null;
        }
        return chart.levelHeight(level);
    }
    /**
     * Calculate the height of the network chart. If the network chart has
     * height, we also allow for the size of the resize handle shown between the
     * two charts.
     *
     * Note that it is possible for the chart to have 0 height if the user is
     * looking at a trace with no network requests.
     */
    networkChartOffsetHeight() {
        if (this.#dimensions.charts.network === null) {
            return 0;
        }
        if (this.#dimensions.charts.network.heightPixels === 0) {
            return 0;
        }
        // At this point we know the network track exists and has height. But we
        // need to check if it is collapsed, because if it is collapsed there is no
        // resizer shown.
        if (this.#dimensions.charts.network.allGroupsCollapsed) {
            return this.#dimensions.charts.network.heightPixels;
        }
        return this.#dimensions.charts.network.heightPixels + NETWORK_RESIZE_ELEM_HEIGHT_PX;
    }
    /**
     * Hides or shows an element. We used to use visibility rather than display,
     * but a child of an element with visibility: hidden may still be visible if
     * its own `display` property is set.
     */
    #setOverlayElementVisibility(element, isVisible) {
        element.style.display = isVisible ? 'block' : 'none';
    }
}
//# sourceMappingURL=OverlaysImpl.js.map