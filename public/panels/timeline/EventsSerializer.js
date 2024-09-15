// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceEngine from '../../models/trace/trace.js';
export class EventsSerializer {
    #modifiedProfileCallByKey = new Map();
    keyForEvent(event) {
        if (TraceEngine.Types.TraceEvents.isProfileCall(event)) {
            return `${"p" /* TraceEngine.Types.File.EventKeyType.PROFILE_CALL */}-${event.pid}-${event.tid}-${TraceEngine.Types.TraceEvents.SampleIndex(event.sampleIndex)}-${event.nodeId}`;
        }
        if (TraceEngine.Types.TraceEvents.isLegacyTimelineFrame(event)) {
            return `${"l" /* TraceEngine.Types.File.EventKeyType.LEGACY_TIMELINE_FRAME */}-${event.index}`;
        }
        const rawEvents = TraceEngine.Helpers.SyntheticEvents.SyntheticEventsManager.getActiveManager().getRawTraceEvents();
        const key = TraceEngine.Types.TraceEvents.isSyntheticBasedEvent(event) ?
            `${"s" /* TraceEngine.Types.File.EventKeyType.SYNTHETIC_EVENT */}-${rawEvents.indexOf(event.rawSourceEvent)}` :
            `${"r" /* TraceEngine.Types.File.EventKeyType.RAW_EVENT */}-${rawEvents.indexOf(event)}`;
        if (key.length < 3) {
            return null;
        }
        return key;
    }
    eventForKey(key, traceParsedData) {
        const eventValues = TraceEngine.Types.File.traceEventKeyToValues(key);
        if (EventsSerializer.isProfileCallKey(eventValues)) {
            return this.#getModifiedProfileCallByKeyValues(eventValues, traceParsedData);
        }
        if (EventsSerializer.isLegacyTimelineFrameKey(eventValues)) {
            const event = traceParsedData.Frames.frames.at(eventValues.rawIndex);
            if (!event) {
                throw new Error(`Could not find frame with index ${eventValues.rawIndex}`);
            }
            return event;
        }
        if (EventsSerializer.isSyntheticEventKey(eventValues)) {
            const syntheticEvents = TraceEngine.Helpers.SyntheticEvents.SyntheticEventsManager.getActiveManager().getSyntheticTraceEvents();
            const syntheticEvent = syntheticEvents.at(eventValues.rawIndex);
            if (!syntheticEvent) {
                throw new Error(`Attempted to get a synthetic event from an unknown raw event index: ${eventValues.rawIndex}`);
            }
            return syntheticEvent;
        }
        if (EventsSerializer.isRawEventKey(eventValues)) {
            const rawEvents = TraceEngine.Helpers.SyntheticEvents.SyntheticEventsManager.getActiveManager().getRawTraceEvents();
            return rawEvents[eventValues.rawIndex];
        }
        throw new Error(`Unknown trace event serializable key values: ${eventValues.join('-')}`);
    }
    static isProfileCallKey(key) {
        return key.type === "p" /* TraceEngine.Types.File.EventKeyType.PROFILE_CALL */;
    }
    static isLegacyTimelineFrameKey(key) {
        return key.type === "l" /* TraceEngine.Types.File.EventKeyType.LEGACY_TIMELINE_FRAME */;
    }
    static isRawEventKey(key) {
        return key.type === "r" /* TraceEngine.Types.File.EventKeyType.RAW_EVENT */;
    }
    static isSyntheticEventKey(key) {
        return key.type === "s" /* TraceEngine.Types.File.EventKeyType.SYNTHETIC_EVENT */;
    }
    #getModifiedProfileCallByKeyValues(key, traceParsedData) {
        const cacheResult = this.#modifiedProfileCallByKey.get(key);
        if (cacheResult) {
            return cacheResult;
        }
        const profileCallsInThread = traceParsedData.Renderer.processes.get(key.processID)?.threads.get(key.threadID)?.profileCalls;
        if (!profileCallsInThread) {
            throw new Error(`Unknown profile call serializable key: ${(key)}`);
        }
        const match = profileCallsInThread?.find(e => {
            return e.sampleIndex === key.sampleIndex && e.nodeId === key.protocol;
        });
        if (!match) {
            throw new Error(`Unknown profile call serializable key: ${(JSON.stringify(key))}`);
        }
        // Cache to avoid looking up in subsequent calls.
        this.#modifiedProfileCallByKey.set(key, match);
        return match;
    }
}
//# sourceMappingURL=EventsSerializer.js.map