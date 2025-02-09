/*
 * Copyright (C) 2013 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import * as Common from '../../../../core/common/common.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as VisualLoggging from '../../../visual_logging/visual_logging.js';
import * as UI from '../../legacy.js';
import * as ThemeSupport from '../../theme_support/theme_support.js';
import { OverviewGrid } from './OverviewGrid.js';
import { TimelineOverviewCalculator } from './TimelineOverviewCalculator.js';
import timelineOverviewInfoStyles from './timelineOverviewInfo.css.js';
export class TimelineOverviewPane extends Common.ObjectWrapper.eventMixin(UI.Widget.VBox) {
    overviewCalculator;
    overviewGrid;
    cursorArea;
    cursorElement;
    overviewControls;
    markers;
    overviewInfo;
    updateThrottler;
    cursorEnabled;
    cursorPosition;
    lastWidth;
    windowStartTime;
    windowEndTime;
    muteOnWindowChanged;
    #dimHighlightSVG;
    constructor(prefix) {
        super();
        this.element.id = prefix + '-overview-pane';
        this.overviewCalculator = new TimelineOverviewCalculator();
        this.overviewGrid = new OverviewGrid(prefix, this.overviewCalculator);
        this.overviewGrid.element.setAttribute('jslog', `${VisualLoggging.timeline(`${prefix}-overview`).track({ click: true, drag: true, hover: true })}`);
        this.element.appendChild(this.overviewGrid.element);
        this.cursorArea = this.overviewGrid.element.createChild('div', 'overview-grid-cursor-area');
        this.cursorElement = this.overviewGrid.element.createChild('div', 'overview-grid-cursor-position');
        this.cursorArea.addEventListener('mousemove', this.onMouseMove.bind(this), true);
        this.cursorArea.addEventListener('mouseleave', this.hideCursor.bind(this), true);
        this.overviewGrid.setResizeEnabled(false);
        this.overviewGrid.addEventListener("WindowChangedWithPosition" /* OverviewGridEvents.WINDOW_CHANGED_WITH_POSITION */, this.onWindowChanged, this);
        this.overviewGrid.addEventListener("BreadcrumbAdded" /* OverviewGridEvents.BREADCRUMB_ADDED */, this.onBreadcrumbAdded, this);
        this.overviewGrid.setClickHandler(this.onClick.bind(this));
        this.overviewControls = [];
        this.markers = new Map();
        this.overviewInfo = new OverviewInfo(this.cursorElement);
        this.updateThrottler = new Common.Throttler.Throttler(100);
        this.cursorEnabled = false;
        this.cursorPosition = 0;
        this.lastWidth = 0;
        this.windowStartTime = 0;
        this.windowEndTime = Infinity;
        this.muteOnWindowChanged = false;
        this.#dimHighlightSVG = UI.UIUtils.createSVGChild(this.element, 'svg', 'timeline-minimap-dim-highlight-svg hidden');
        this.#initializeDimHighlightSVG();
    }
    enableCreateBreadcrumbsButton() {
        const breadcrumbsElement = this.overviewGrid.enableCreateBreadcrumbsButton();
        breadcrumbsElement.addEventListener('mousemove', this.onMouseMove.bind(this), true);
        breadcrumbsElement.addEventListener('mouseleave', this.hideCursor.bind(this), true);
    }
    onMouseMove(event) {
        if (!this.cursorEnabled) {
            return;
        }
        const mouseEvent = event;
        const target = event.target;
        const offsetLeftRelativeToCursorArea = target.getBoundingClientRect().left - this.cursorArea.getBoundingClientRect().left;
        this.cursorPosition = mouseEvent.offsetX + offsetLeftRelativeToCursorArea;
        this.cursorElement.style.left = this.cursorPosition + 'px';
        this.cursorElement.style.visibility = 'visible';
        // Dispatch an event to notify the flame chart to show a timestamp marker for the current timestamp if it's visible
        // in the flame chart.
        const timeInMilliSeconds = this.overviewCalculator.positionToTime(this.cursorPosition);
        const timeWindow = this.overviewGrid.calculateWindowValue();
        if (Trace.Types.Timing.Milli(timeWindow.rawStartValue) <= timeInMilliSeconds &&
            timeInMilliSeconds <= Trace.Types.Timing.Milli(timeWindow.rawEndValue)) {
            const timeInMicroSeconds = Trace.Helpers.Timing.milliToMicro(timeInMilliSeconds);
            this.dispatchEventToListeners("OverviewPaneMouseMove" /* Events.OVERVIEW_PANE_MOUSE_MOVE */, { timeInMicroSeconds });
        }
        else {
            this.dispatchEventToListeners("OverviewPaneMouseLeave" /* Events.OVERVIEW_PANE_MOUSE_LEAVE */);
        }
        void this.overviewInfo.setContent(this.buildOverviewInfo());
    }
    async buildOverviewInfo() {
        const document = this.element.ownerDocument;
        const x = this.cursorPosition;
        const elements = await Promise.all(this.overviewControls.map(control => control.overviewInfoPromise(x)));
        const fragment = document.createDocumentFragment();
        const nonNullElements = elements.filter(element => element !== null);
        fragment.append(...nonNullElements);
        return fragment;
    }
    hideCursor() {
        this.cursorElement.style.visibility = 'hidden';
        this.dispatchEventToListeners("OverviewPaneMouseLeave" /* Events.OVERVIEW_PANE_MOUSE_LEAVE */);
        this.overviewInfo.hide();
    }
    wasShown() {
        this.update();
    }
    willHide() {
        this.overviewInfo.hide();
    }
    onResize() {
        const width = this.element.offsetWidth;
        if (width === this.lastWidth) {
            return;
        }
        this.lastWidth = width;
        this.scheduleUpdate();
    }
    setOverviewControls(overviewControls) {
        for (let i = 0; i < this.overviewControls.length; ++i) {
            this.overviewControls[i].dispose();
        }
        for (let i = 0; i < overviewControls.length; ++i) {
            overviewControls[i].setCalculator(this.overviewCalculator);
            overviewControls[i].show(this.overviewGrid.element);
        }
        this.overviewControls = overviewControls;
        this.update();
    }
    set showingScreenshots(isShowing) {
        this.overviewGrid.showingScreenshots = isShowing;
    }
    setBounds(minimumBoundary, maximumBoundary) {
        if (minimumBoundary === this.overviewCalculator.minimumBoundary() &&
            maximumBoundary === this.overviewCalculator.maximumBoundary()) {
            return;
        }
        this.overviewCalculator.setBounds(minimumBoundary, maximumBoundary);
        this.overviewGrid.setResizeEnabled(true);
        this.cursorEnabled = true;
        this.scheduleUpdate(minimumBoundary, maximumBoundary);
    }
    setNavStartTimes(navStartTimes) {
        this.overviewCalculator.setNavStartTimes(navStartTimes);
    }
    scheduleUpdate(start, end) {
        void this.updateThrottler.schedule(async () => {
            this.update(start, end);
        });
    }
    update(start, end) {
        if (!this.isShowing()) {
            return;
        }
        this.overviewCalculator.setDisplayWidth(this.overviewGrid.clientWidth());
        for (let i = 0; i < this.overviewControls.length; ++i) {
            this.overviewControls[i].update(start, end);
        }
        this.overviewGrid.updateDividers(this.overviewCalculator);
        this.updateMarkers();
        this.updateWindow();
    }
    setMarkers(markers) {
        this.markers = markers;
    }
    /**
     * Dim the time marker outside the highlight time bounds.
     *
     * @param highlightBounds the time bounds to highlight, if it is empty, it means to highlight everything.
     */
    #dimMarkers(highlightBounds) {
        for (const time of this.markers.keys()) {
            const marker = this.markers.get(time);
            if (!marker) {
                continue;
            }
            const timeInMicroSeconds = Trace.Helpers.Timing.milliToMicro(Trace.Types.Timing.Milli(time));
            const dim = highlightBounds && !Trace.Helpers.Timing.timestampIsInBounds(highlightBounds, timeInMicroSeconds);
            // `filter: grayscale(1)`  will make the element fully completely grayscale.
            marker.style.filter = `grayscale(${dim ? 1 : 0})`;
        }
    }
    updateMarkers() {
        const filteredMarkers = new Map();
        for (const time of this.markers.keys()) {
            const marker = this.markers.get(time);
            const position = Math.round(this.overviewCalculator.computePosition(Trace.Types.Timing.Milli(time)));
            // Limit the number of markers to one per pixel.
            if (filteredMarkers.has(position)) {
                continue;
            }
            filteredMarkers.set(position, marker);
            marker.style.left = position + 'px';
        }
        this.overviewGrid.removeEventDividers();
        this.overviewGrid.addEventDividers([...filteredMarkers.values()]);
    }
    reset() {
        this.windowStartTime = 0;
        this.windowEndTime = Infinity;
        this.overviewCalculator.reset();
        this.overviewGrid.reset();
        this.overviewGrid.setResizeEnabled(false);
        this.cursorEnabled = false;
        this.hideCursor();
        this.markers = new Map();
        for (const control of this.overviewControls) {
            control.reset();
        }
        this.overviewInfo.hide();
        this.scheduleUpdate();
    }
    onClick(event) {
        return this.overviewControls.some(control => control.onClick(event));
    }
    onBreadcrumbAdded() {
        this.dispatchEventToListeners("OverviewPaneBreadcrumbAdded" /* Events.OVERVIEW_PANE_BREADCRUMB_ADDED */, {
            startTime: Trace.Types.Timing.Milli(this.windowStartTime),
            endTime: Trace.Types.Timing.Milli(this.windowEndTime),
        });
    }
    onWindowChanged(event) {
        if (this.muteOnWindowChanged) {
            return;
        }
        // Always use first control as a time converter.
        if (!this.overviewControls.length) {
            return;
        }
        this.windowStartTime =
            event.data.rawStartValue === this.overviewCalculator.minimumBoundary() ? 0 : event.data.rawStartValue;
        this.windowEndTime =
            event.data.rawEndValue === this.overviewCalculator.maximumBoundary() ? Infinity : event.data.rawEndValue;
        const windowTimes = {
            startTime: Trace.Types.Timing.Milli(this.windowStartTime),
            endTime: Trace.Types.Timing.Milli(this.windowEndTime),
        };
        this.dispatchEventToListeners("OverviewPaneWindowChanged" /* Events.OVERVIEW_PANE_WINDOW_CHANGED */, windowTimes);
    }
    setWindowTimes(startTime, endTime) {
        if (startTime === this.windowStartTime && endTime === this.windowEndTime) {
            return;
        }
        this.windowStartTime = startTime;
        this.windowEndTime = endTime;
        this.updateWindow();
        this.dispatchEventToListeners("OverviewPaneWindowChanged" /* Events.OVERVIEW_PANE_WINDOW_CHANGED */, {
            startTime: Trace.Types.Timing.Milli(startTime),
            endTime: Trace.Types.Timing.Milli(endTime),
        });
    }
    updateWindow() {
        if (!this.overviewControls.length) {
            return;
        }
        const absoluteMin = this.overviewCalculator.minimumBoundary();
        const timeSpan = this.overviewCalculator.maximumBoundary() - absoluteMin;
        const haveRecords = absoluteMin > 0;
        const left = haveRecords && this.windowStartTime ? Math.min((this.windowStartTime - absoluteMin) / timeSpan, 1) : 0;
        const right = haveRecords && this.windowEndTime < Infinity ? (this.windowEndTime - absoluteMin) / timeSpan : 1;
        this.muteOnWindowChanged = true;
        this.overviewGrid.setWindowRatio(left, right);
        this.muteOnWindowChanged = false;
    }
    /**
     * This function will create three rectangles and a polygon, which will be use to highlight the time range.
     */
    #initializeDimHighlightSVG() {
        // Set up the desaturation mask
        const defs = UI.UIUtils.createSVGChild(this.#dimHighlightSVG, 'defs');
        const mask = UI.UIUtils.createSVGChild(defs, 'mask');
        mask.id = 'dim-highlight-cutouts';
        /* Within the mask...
            - black fill = punch, fully transparently, through to the next thing. these are the cutouts to the color.
            - white fill = be 100% desaturated
            - grey fill  = show at the Lightness level of grayscale/desaturation
        */
        // This a rectangle covers the entire SVG and has a light gray fill. This sets the base desaturation level for the
        // masked area.
        // The colour here should be fixed because the colour's brightness changes the desaturation level.
        const showAllRect = UI.UIUtils.createSVGChild(mask, 'rect');
        showAllRect.setAttribute('width', '100%');
        showAllRect.setAttribute('height', '100%');
        showAllRect.setAttribute('fill', 'hsl(0deg 0% 95%)');
        // This rectangle also covers the entire SVG and has a fill with the current background. It is linked to the
        // `mask` element.
        // The `mixBlendMode` is set to 'saturation', so this rectangle will completely desaturate the area it covers
        // within the mask.
        const desaturateRect = UI.UIUtils.createSVGChild(this.#dimHighlightSVG, 'rect', 'background');
        desaturateRect.setAttribute('width', '100%');
        desaturateRect.setAttribute('height', '100%');
        desaturateRect.setAttribute('fill', ThemeSupport.ThemeSupport.instance().getComputedValue('--color-background'));
        desaturateRect.setAttribute('mask', `url(#${mask.id})`);
        desaturateRect.style.mixBlendMode = 'saturation';
        // This rectangle is positioned at the top of the not-to-desaturate time range, with full height and a black fill.
        // It will be used to "punch" through the desaturation, revealing the original colours beneath.
        // The *black* fill on the "punch-out" rectangle is crucial because black is fully transparent in a mask.
        const punchRect = UI.UIUtils.createSVGChild(mask, 'rect', 'punch');
        punchRect.setAttribute('y', '0');
        punchRect.setAttribute('height', '100%');
        punchRect.setAttribute('fill', 'black');
        // This polygon is for the bracket beyond the not desaturated area.
        const bracketColor = ThemeSupport.ThemeSupport.instance().getComputedValue('--sys-color-state-on-header-hover');
        const bracket = UI.UIUtils.createSVGChild(this.#dimHighlightSVG, 'polygon');
        bracket.setAttribute('fill', bracketColor);
        ThemeSupport.ThemeSupport.instance().addEventListener(ThemeSupport.ThemeChangeEvent.eventName, () => {
            const desaturateRect = this.#dimHighlightSVG.querySelector('rect.background');
            desaturateRect?.setAttribute('fill', ThemeSupport.ThemeSupport.instance().getComputedValue('--color-background'));
            const bracket = this.#dimHighlightSVG.querySelector('polygon');
            bracket?.setAttribute('fill', ThemeSupport.ThemeSupport.instance().getComputedValue('--sys-color-state-on-header-hover'));
        });
    }
    #addBracket(left, right) {
        const TRIANGLE_SIZE = 5; // px size of triangles
        const bracket = this.#dimHighlightSVG.querySelector('polygon');
        bracket?.setAttribute('points', `${left},0 ${left},${TRIANGLE_SIZE} ${left + TRIANGLE_SIZE - 1},1 ${right - TRIANGLE_SIZE - 1},1 ${right},${TRIANGLE_SIZE} ${right},0`);
        bracket?.classList.remove('hidden');
    }
    #hideBracket() {
        const bracket = this.#dimHighlightSVG.querySelector('polygon');
        bracket?.classList.add('hidden');
    }
    highlightBounds(bounds, withBracket) {
        const left = this.overviewCalculator.computePosition(Trace.Helpers.Timing.microToMilli(bounds.min));
        const right = this.overviewCalculator.computePosition(Trace.Helpers.Timing.microToMilli(bounds.max));
        this.#dimMarkers(bounds);
        // Update the punch out rectangle to the not-to-desaturate time range.
        const punchRect = this.#dimHighlightSVG.querySelector('rect.punch');
        punchRect?.setAttribute('x', left.toString());
        punchRect?.setAttribute('width', (right - left).toString());
        if (withBracket) {
            this.#addBracket(left, right);
        }
        else {
            this.#hideBracket();
        }
        this.#dimHighlightSVG.classList.remove('hidden');
    }
    clearBoundsHighlight() {
        this.#dimMarkers();
        this.#dimHighlightSVG.classList.add('hidden');
    }
}
export class TimelineOverviewBase extends UI.Widget.VBox {
    calculatorInternal;
    canvas;
    contextInternal;
    constructor() {
        super();
        this.calculatorInternal = null;
        this.canvas = this.element.createChild('canvas', 'fill');
        this.contextInternal = this.canvas.getContext('2d');
    }
    width() {
        return this.canvas.width;
    }
    height() {
        return this.canvas.height;
    }
    context() {
        if (!this.contextInternal) {
            throw new Error('Unable to retrieve canvas context');
        }
        return this.contextInternal;
    }
    calculator() {
        return this.calculatorInternal;
    }
    update() {
        throw new Error('Not implemented');
    }
    dispose() {
        this.detach();
    }
    reset() {
    }
    async overviewInfoPromise(_x) {
        return null;
    }
    setCalculator(calculator) {
        this.calculatorInternal = calculator;
    }
    onClick(_event) {
        return false;
    }
    resetCanvas() {
        if (this.element.clientWidth) {
            this.setCanvasSize(this.element.clientWidth, this.element.clientHeight);
        }
    }
    setCanvasSize(width, height) {
        this.canvas.width = width * window.devicePixelRatio;
        this.canvas.height = height * window.devicePixelRatio;
    }
}
export class OverviewInfo {
    anchorElement;
    glassPane;
    visible;
    element;
    constructor(anchor) {
        this.anchorElement = anchor;
        this.glassPane = new UI.GlassPane.GlassPane();
        this.glassPane.setPointerEventsBehavior("PierceContents" /* UI.GlassPane.PointerEventsBehavior.PIERCE_CONTENTS */);
        this.glassPane.setMarginBehavior("Arrow" /* UI.GlassPane.MarginBehavior.ARROW */);
        this.glassPane.setSizeBehavior("MeasureContent" /* UI.GlassPane.SizeBehavior.MEASURE_CONTENT */);
        this.visible = false;
        this.element =
            UI.UIUtils.createShadowRootWithCoreStyles(this.glassPane.contentElement, { cssFile: timelineOverviewInfoStyles })
                .createChild('div', 'overview-info');
    }
    async setContent(contentPromise) {
        this.visible = true;
        const content = await contentPromise;
        if (!this.visible) {
            return;
        }
        this.element.removeChildren();
        this.element.appendChild(content);
        this.glassPane.setContentAnchorBox(this.anchorElement.boxInWindow());
        if (!this.glassPane.isShowing()) {
            this.glassPane.show(this.anchorElement.ownerDocument);
        }
    }
    hide() {
        this.visible = false;
        this.glassPane.hide();
    }
}
//# sourceMappingURL=TimelineOverviewPane.js.map