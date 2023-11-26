// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance = null;
export class TimelineVisibleWindowChanged extends Event {
    state;
    shouldAnimate;
    static eventName = 'timelinevisiblewindowchanged';
    constructor(state, shouldAnimate) {
        super(TimelineVisibleWindowChanged.eventName, { composed: true, bubbles: true });
        this.state = state;
        this.shouldAnimate = shouldAnimate;
    }
}
export class MiniMapBoundsChanged extends Event {
    state;
    static eventName = 'minimapboundschanged';
    constructor(state) {
        super(MiniMapBoundsChanged.eventName, { composed: true, bubbles: true });
        this.state = state;
    }
}
export class BoundsManager extends EventTarget {
    static instance(opts = { forceNew: null }) {
        const forceNew = Boolean(opts.forceNew);
        if (!instance || forceNew) {
            if (!opts.initialBounds) {
                throw new Error('Cannot construct a BoundsManager without providing the initial bounds');
            }
            instance = new BoundsManager(opts.initialBounds);
        }
        return instance;
    }
    static removeInstance() {
        instance = null;
    }
    #currentState;
    constructor(initialBounds) {
        super();
        this.#currentState = {
            entireTraceBounds: initialBounds,
            minimapTraceBounds: initialBounds,
            timelineTraceWindow: initialBounds,
        };
    }
    get state() {
        return this.#currentState;
    }
    setMiniMapBounds(newBounds) {
        const existingBounds = this.#currentState.minimapTraceBounds;
        if (newBounds.min === existingBounds.min && newBounds.max === existingBounds.max) {
            // New bounds are identical to the old ones so no action required.
            return;
        }
        if (newBounds.range < 5_000) {
            // Minimum minimap bounds range is 5 milliseconds.
            return;
        }
        this.#currentState.minimapTraceBounds = newBounds;
        this.dispatchEvent(new MiniMapBoundsChanged(this.#currentState));
    }
    setTimelineVisibleWindow(newWindow, options = {
        shouldAnimate: false,
    }) {
        const existingWindow = this.#currentState.timelineTraceWindow;
        if (newWindow.min === existingWindow.min && newWindow.max === existingWindow.max) {
            // New bounds are identical to the old ones so no action required.
            return;
        }
        if (newWindow.range < 1_000) {
            // Minimum timeline visible window range is 1 millisecond.
            return;
        }
        this.#currentState.timelineTraceWindow = newWindow;
        this.dispatchEvent(new TimelineVisibleWindowChanged(this.#currentState, options.shouldAnimate));
    }
}
//# sourceMappingURL=TraceBounds.js.map