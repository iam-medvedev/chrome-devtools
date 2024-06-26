// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
export class PerformanceModel {
    timelineModelInternal;
    constructor() {
        this.timelineModelInternal = new TimelineModel.TimelineModel.TimelineModelImpl();
    }
    async setTracingModel(model) {
        this.timelineModelInternal.setEvents(model);
    }
}
//# sourceMappingURL=PerformanceModel.js.map