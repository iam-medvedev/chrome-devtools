// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as TraceEngine from '../../models/trace/trace.js';
import * as TraceBounds from '../../services/trace_bounds/trace_bounds.js';
import { TimelineUIUtils } from './TimelineUIUtils.js';
export class PerformanceModel extends Common.ObjectWrapper.ObjectWrapper {
    mainTargetInternal;
    tracingModelInternal;
    filtersInternal;
    timelineModelInternal;
    frameModelInternal;
    windowInternal;
    recordStartTimeInternal;
    #activeBreadcrumbWindow;
    constructor() {
        super();
        this.mainTargetInternal = null;
        this.tracingModelInternal = null;
        this.filtersInternal = [];
        this.timelineModelInternal = new TimelineModel.TimelineModel.TimelineModelImpl();
        this.frameModelInternal = new TimelineModel.TimelineFrameModel.TimelineFrameModel(event => TimelineUIUtils.eventStyle(event).category.name);
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
        const mainTracks = this.timelineModelInternal.tracks().filter(track => track.type === TimelineModel.TimelineModel.TrackType.MainThread && track.forMainFrame &&
            track.events.length);
        const threadData = mainTracks.map(track => {
            const event = track.events[0];
            return { thread: event.thread, time: event.startTime };
        });
        this.frameModelInternal.addTraceEvents(this.mainTargetInternal, this.timelineModelInternal.inspectedTargetEvents(), threadData);
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
    frames() {
        return this.frameModelInternal.getFrames();
    }
    frameModel() {
        return this.frameModelInternal;
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
    calculateWindowForMainThreadActivity() {
        const timelineModel = this.timelineModelInternal;
        let tasks = [];
        for (const track of timelineModel.tracks()) {
            // Deliberately pick up last main frame's track.
            if (track.type === TimelineModel.TimelineModel.TrackType.MainThread && track.forMainFrame) {
                tasks = track.tasks;
            }
        }
        if (!tasks.length) {
            return {
                left: TraceEngine.Types.Timing.MilliSeconds(timelineModel.minimumRecordTime()),
                right: TraceEngine.Types.Timing.MilliSeconds(timelineModel.maximumRecordTime()),
            };
        }
        /**
         * Calculates regions of low utilization and returns the index of the event
         * that is the first event that should be included.
         **/
        function findLowUtilizationRegion(startIndex, stopIndex) {
            const threshold = 0.1;
            let cutIndex = startIndex;
            let cutTime = (tasks[cutIndex].startTime + tasks[cutIndex].endTime) / 2;
            let usedTime = 0;
            const step = Math.sign(stopIndex - startIndex);
            for (let i = startIndex; i !== stopIndex; i += step) {
                const task = tasks[i];
                const taskTime = (task.startTime + task.endTime) / 2;
                const interval = Math.abs(cutTime - taskTime);
                if (usedTime < threshold * interval) {
                    cutIndex = i;
                    cutTime = taskTime;
                    usedTime = 0;
                }
                usedTime += task.duration;
            }
            return cutIndex;
        }
        const rightIndex = findLowUtilizationRegion(tasks.length - 1, 0);
        const leftIndex = findLowUtilizationRegion(0, rightIndex);
        let leftTime = tasks[leftIndex].startTime;
        let rightTime = tasks[rightIndex].endTime;
        const zoomedInSpan = rightTime - leftTime;
        const entireTraceSpan = timelineModel.maximumRecordTime() - timelineModel.minimumRecordTime();
        if (zoomedInSpan < entireTraceSpan * 0.1) {
            // If the area we have chosen to zoom into is less than 10% of the entire
            // span, we bail and show the entire trace. It would not be so useful to
            // the user to zoom in on such a small area; we assume they have
            // purposefully recorded a trace that contains empty periods of time.
            leftTime = timelineModel.minimumRecordTime();
            rightTime = timelineModel.maximumRecordTime();
        }
        else {
            // Adjust the left time down by 5%, and the right time up by 5%, so that
            // we give the range we want to zoom a bit of breathing space. At the
            // same time, ensure that we do not stray beyond the bounds of the
            // min/max time of the entire trace.
            leftTime = Math.max(leftTime - 0.05 * zoomedInSpan, timelineModel.minimumRecordTime());
            rightTime = Math.min(rightTime + 0.05 * zoomedInSpan, timelineModel.maximumRecordTime());
        }
        return {
            left: TraceEngine.Types.Timing.MilliSeconds(leftTime),
            right: TraceEngine.Types.Timing.MilliSeconds(rightTime),
        };
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