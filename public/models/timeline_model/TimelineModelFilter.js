// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Trace from '../../models/trace/trace.js';
export class TimelineModelFilter {
}
export class TimelineVisibleEventsFilter extends TimelineModelFilter {
    visibleTypes;
    constructor(visibleTypes) {
        super();
        this.visibleTypes = new Set(visibleTypes);
    }
    accept(event) {
        if (Trace.Types.Extensions.isSyntheticExtensionEntry(event)) {
            return true;
        }
        return this.visibleTypes.has(TimelineVisibleEventsFilter.eventType(event));
    }
    static eventType(event) {
        // Any blink.console category events are treated as ConsoleTime events
        if (event.cat.includes('blink.console')) {
            return "ConsoleTime" /* Trace.Types.Events.Name.CONSOLE_TIME */;
        }
        // Any blink.user_timing egory events are treated as UserTiming events
        if (event.cat.includes('blink.user_timing')) {
            return "UserTiming" /* Trace.Types.Events.Name.USER_TIMING */;
        }
        return event.name;
    }
}
export class TimelineInvisibleEventsFilter extends TimelineModelFilter {
    #invisibleTypes;
    constructor(invisibleTypes) {
        super();
        this.#invisibleTypes = new Set(invisibleTypes);
    }
    accept(event) {
        return !this.#invisibleTypes.has(TimelineVisibleEventsFilter.eventType(event));
    }
}
export class ExclusiveNameFilter extends TimelineModelFilter {
    #excludeNames;
    constructor(excludeNames) {
        super();
        this.#excludeNames = new Set(excludeNames);
    }
    accept(event) {
        return !this.#excludeNames.has(event.name);
    }
}
//# sourceMappingURL=TimelineModelFilter.js.map