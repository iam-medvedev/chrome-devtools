// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as TraceEngine from '../../models/trace/trace.js';
import * as TraceBounds from '../../services/trace_bounds/trace_bounds.js';
export class PerformanceModel extends Common.ObjectWrapper.ObjectWrapper {
    mainTargetInternal;
    tracingModelInternal;
    filtersInternal;
    timelineModelInternal;
    windowInternal;
    recordStartTimeInternal;
    #activeBreadcrumbWindow;
    constructor() {
        super();
        this.mainTargetInternal = null;
        this.tracingModelInternal = null;
        this.filtersInternal = [];
        this.timelineModelInternal = new TimelineModel.TimelineModel.TimelineModelImpl();
        this.windowInternal = { left: 0, right: Infinity };
        this.recordStartTimeInternal = undefined;
    }
    setMainTarget(target) {
        this.mainTargetInternal = target;
    }
    mainTarget() {
        return this.mainTargetInternal;
    }
    setRecordStartTime(time) {
        this.recordStartTimeInternal = time;
    }
    recordStartTime() {
        return this.recordStartTimeInternal;
    }
    setFilters(filters) {
        this.filtersInternal = filters;
    }
    filters() {
        return this.filtersInternal;
    }
    isVisible(event) {
        return this.filtersInternal.every(f => f.accept(event));
    }
    async setTracingModel(model, isFreshRecording = false) {
        this.tracingModelInternal = model;
        this.timelineModelInternal.setEvents(model, isFreshRecording);
    }
    tracingModel() {
        if (!this.tracingModelInternal) {
            throw 'call setTracingModel before accessing PerformanceModel';
        }
        return this.tracingModelInternal;
    }
    timelineModel() {
        return this.timelineModelInternal;
    }
    setWindow(window, animate, breadcrumb) {
        const didWindowOrBreadcrumbChange = this.windowInternal.left !== window.left ||
            this.windowInternal.right !== window.right || (breadcrumb && (this.#activeBreadcrumbWindow !== breadcrumb));
        this.windowInternal = window;
        if (breadcrumb) {
            this.#activeBreadcrumbWindow = breadcrumb;
        }
        if (didWindowOrBreadcrumbChange) {
            this.dispatchEventToListeners(Events.WindowChanged, { window, animate, breadcrumbWindow: breadcrumb });
            TraceBounds.TraceBounds.BoundsManager.instance().setTimelineVisibleWindow(TraceEngine.Helpers.Timing.traceWindowFromMilliSeconds(TraceEngine.Types.Timing.MilliSeconds(window.left), TraceEngine.Types.Timing.MilliSeconds(window.right)), { shouldAnimate: Boolean(animate) });
            if (breadcrumb) {
                TraceBounds.TraceBounds.BoundsManager.instance().setMiniMapBounds(breadcrumb);
            }
        }
    }
    window() {
        return this.windowInternal;
    }
    minimumRecordTime() {
        return this.timelineModelInternal.minimumRecordTime();
    }
    maximumRecordTime() {
        return this.timelineModelInternal.maximumRecordTime();
    }
}
// TODO(crbug.com/1167717): Make this a const enum again
// eslint-disable-next-line rulesdir/const_enum
export var Events;
(function (Events) {
    Events["WindowChanged"] = "WindowChanged";
    Events["NamesResolved"] = "NamesResolved";
})(Events || (Events = {}));
//# sourceMappingURL=PerformanceModel.js.map