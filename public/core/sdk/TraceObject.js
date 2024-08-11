// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// A thin wrapper class, mostly to enable instanceof-based revealing of traces to open in Timeline.
export class TraceObject {
    traceEvents;
    metadata;
    constructor(traceEvents, metadata = {}) {
        this.traceEvents = traceEvents;
        this.metadata = metadata;
    }
}
//# sourceMappingURL=TraceObject.js.map