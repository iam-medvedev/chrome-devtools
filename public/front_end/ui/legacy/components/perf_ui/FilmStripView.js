// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../../core/common/common.js';
import * as Host from '../../../../core/host/host.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as TraceEngine from '../../../../models/trace/trace.js';
import * as UI from '../../legacy.js';
import filmStripViewStyles from './filmStripView.css.legacy.js';
const UIStrings = {
    /**
     *@description Element title in Film Strip View of the Performance panel
     */
    doubleclickToZoomImageClickTo: 'Doubleclick to zoom image. Click to view preceding requests.',
    /**
     *@description Aria label for captured screenshots in network panel.
     *@example {3ms} PH1
     */
    screenshotForSSelectToView: 'Screenshot for {PH1} - select to view preceding requests.',
    /**
     *@description Text for one or a group of screenshots
     */
    screenshot: 'Screenshot',
    /**
     *@description Prev button title in Film Strip View of the Performance panel
     */
    previousFrame: 'Previous frame',
    /**
     *@description Next button title in Film Strip View of the Performance panel
     */
    nextFrame: 'Next frame',
};
const str_ = i18n.i18n.registerUIStrings('ui/legacy/components/perf_ui/FilmStripView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class FilmStripView extends Common.ObjectWrapper.eventMixin(UI.Widget.HBox) {
    statusLabel;
    zeroTime = TraceEngine.Types.Timing.MilliSeconds(0);
    #filmStrip = null;
    constructor() {
        super(true);
        this.registerRequiredCSS(filmStripViewStyles);
        this.contentElement.classList.add('film-strip-view');
        this.statusLabel = this.contentElement.createChild('div', 'label');
        this.reset();
    }
    static setImageData(imageElement, data) {
        if (data) {
            imageElement.src = 'data:image/jpg;base64,' + data;
        }
    }
    setModel(filmStrip) {
        this.#filmStrip = filmStrip;
        this.zeroTime = TraceEngine.Helpers.Timing.microSecondsToMilliseconds(filmStrip.zeroTime);
        if (!this.#filmStrip.frames.length) {
            this.reset();
            return;
        }
        this.update();
    }
    createFrameElement(frame) {
        const time = TraceEngine.Helpers.Timing.microSecondsToMilliseconds(frame.screenshotEvent.ts);
        const frameTime = i18n.TimeUtilities.millisToString(time - this.zeroTime);
        const element = document.createElement('div');
        element.classList.add('frame');
        UI.Tooltip.Tooltip.install(element, i18nString(UIStrings.doubleclickToZoomImageClickTo));
        element.createChild('div', 'time').textContent = frameTime;
        element.tabIndex = 0;
        element.setAttribute('aria-label', i18nString(UIStrings.screenshotForSSelectToView, { PH1: frameTime }));
        UI.ARIAUtils.markAsButton(element);
        const imageElement = element.createChild('div', 'thumbnail').createChild('img');
        imageElement.alt = i18nString(UIStrings.screenshot);
        element.addEventListener('mousedown', this.onMouseEvent.bind(this, Events.FrameSelected, time), false);
        element.addEventListener('mouseenter', this.onMouseEvent.bind(this, Events.FrameEnter, time), false);
        element.addEventListener('mouseout', this.onMouseEvent.bind(this, Events.FrameExit, time), false);
        element.addEventListener('dblclick', this.onDoubleClick.bind(this, frame), false);
        element.addEventListener('focusin', this.onMouseEvent.bind(this, Events.FrameEnter, time), false);
        element.addEventListener('focusout', this.onMouseEvent.bind(this, Events.FrameExit, time), false);
        element.addEventListener('keydown', event => {
            if (event.code === 'Enter' || event.code === 'Space') {
                this.onMouseEvent(Events.FrameSelected, time);
            }
        });
        FilmStripView.setImageData(imageElement, frame.screenshotAsString);
        return element;
    }
    update() {
        const frames = this.#filmStrip?.frames;
        if (!frames || frames.length < 1) {
            return;
        }
        const frameElements = frames.map(frame => this.createFrameElement(frame));
        this.contentElement.removeChildren();
        for (const element of frameElements) {
            this.contentElement.appendChild(element);
        }
    }
    onMouseEvent(eventName, timestamp) {
        // TODO(crbug.com/1228674): Use type-safe event dispatch and remove <any>.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.dispatchEventToListeners(eventName, timestamp);
    }
    onDoubleClick(filmStripFrame) {
        if (!this.#filmStrip) {
            return;
        }
        Dialog.fromFilmStrip(this.#filmStrip, filmStripFrame.index);
    }
    reset() {
        this.zeroTime = TraceEngine.Types.Timing.MilliSeconds(0);
        this.contentElement.removeChildren();
        this.contentElement.appendChild(this.statusLabel);
    }
    setStatusText(text) {
        this.statusLabel.textContent = text;
    }
}
// TODO(crbug.com/1167717): Make this a const enum again
// eslint-disable-next-line rulesdir/const_enum
export var Events;
(function (Events) {
    Events["FrameSelected"] = "FrameSelected";
    Events["FrameEnter"] = "FrameEnter";
    Events["FrameExit"] = "FrameExit";
})(Events || (Events = {}));
export class Dialog {
    fragment;
    widget;
    index;
    dialog = null;
    #data;
    static fromFilmStrip(filmStrip, selectedFrameIndex) {
        const data = {
            source: 'TraceEngine',
            frames: filmStrip.frames,
            index: selectedFrameIndex,
            zeroTime: TraceEngine.Helpers.Timing.microSecondsToMilliseconds(filmStrip.zeroTime),
        };
        return new Dialog(data);
    }
    constructor(data) {
        this.#data = data;
        this.index = data.index;
        const prevButton = UI.UIUtils.createTextButton('\u25C0', this.onPrevFrame.bind(this));
        UI.Tooltip.Tooltip.install(prevButton, i18nString(UIStrings.previousFrame));
        const nextButton = UI.UIUtils.createTextButton('\u25B6', this.onNextFrame.bind(this));
        UI.Tooltip.Tooltip.install(nextButton, i18nString(UIStrings.nextFrame));
        this.fragment = UI.Fragment.Fragment.build `
      <x-widget flex=none margin=12px>
        <x-hbox overflow=auto border='1px solid #ddd'>
          <img $='image' data-film-strip-dialog-img style="max-height: 80vh; max-width: 80vw;"></img>
        </x-hbox>
        <x-hbox x-center justify-content=center margin-top=10px>
          ${prevButton}
          <x-hbox $='time' margin=8px></x-hbox>
          ${nextButton}
        </x-hbox>
      </x-widget>
    `;
        this.widget = this.fragment.element();
        this.widget.tabIndex = 0;
        this.widget.addEventListener('keydown', this.keyDown.bind(this), false);
        this.dialog = null;
        void this.render();
    }
    hide() {
        if (this.dialog) {
            this.dialog.hide();
        }
    }
    #framesCount() {
        return this.#data.frames.length;
    }
    #zeroTime() {
        return this.#data.zeroTime;
    }
    resize() {
        if (!this.dialog) {
            this.dialog = new UI.Dialog.Dialog();
            this.dialog.contentElement.appendChild(this.widget);
            this.dialog.setDefaultFocusedElement(this.widget);
            this.dialog.show();
        }
        this.dialog.setSizeBehavior("MeasureContent" /* UI.GlassPane.SizeBehavior.MeasureContent */);
    }
    keyDown(event) {
        const keyboardEvent = event;
        switch (keyboardEvent.key) {
            case 'ArrowLeft':
                if (Host.Platform.isMac() && keyboardEvent.metaKey) {
                    this.onFirstFrame();
                }
                else {
                    this.onPrevFrame();
                }
                break;
            case 'ArrowRight':
                if (Host.Platform.isMac() && keyboardEvent.metaKey) {
                    this.onLastFrame();
                }
                else {
                    this.onNextFrame();
                }
                break;
            case 'Home':
                this.onFirstFrame();
                break;
            case 'End':
                this.onLastFrame();
                break;
        }
    }
    onPrevFrame() {
        if (this.index > 0) {
            --this.index;
        }
        void this.render();
    }
    onNextFrame() {
        if (this.index < this.#framesCount() - 1) {
            ++this.index;
        }
        void this.render();
    }
    onFirstFrame() {
        this.index = 0;
        void this.render();
    }
    onLastFrame() {
        this.index = this.#framesCount() - 1;
        void this.render();
    }
    #currentFrameData() {
        const frame = this.#data.frames[this.index];
        return {
            snapshot: frame.screenshotAsString,
            timestamp: TraceEngine.Helpers.Timing.microSecondsToMilliseconds(frame.screenshotEvent.ts),
        };
    }
    render() {
        const currentFrameData = this.#currentFrameData();
        this.fragment.$('time').textContent =
            i18n.TimeUtilities.millisToString(currentFrameData.timestamp - this.#zeroTime());
        const image = this.fragment.$('image');
        image.setAttribute('data-frame-index', this.index.toString());
        FilmStripView.setImageData(image, currentFrameData.snapshot);
        this.resize();
    }
}
//# sourceMappingURL=FilmStripView.js.map