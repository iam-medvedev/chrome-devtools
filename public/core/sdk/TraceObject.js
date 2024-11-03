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
// Another thin wrapper class to enable revealing individual trace events (aka entries) in Timeline panel.
export class RevealableEvent {
    event;
    // Only Trace.Types.Events.Event are passed in, but we can't depend on that type from SDK
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(event) {
        this.event = event;
    }
}
//# sourceMappingURL=TraceObject.js.map