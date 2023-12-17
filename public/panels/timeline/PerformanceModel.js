// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
export class PerformanceModel {
    tracingModelInternal;
    timelineModelInternal;
    constructor() {
        this.tracingModelInternal = null;
        this.timelineModelInternal = new TimelineModel.TimelineModel.TimelineModelImpl();
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
}
//# sourceMappingURL=PerformanceModel.js.map