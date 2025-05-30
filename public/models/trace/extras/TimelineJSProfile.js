// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Types from '../types/types.js';
// TODO(paulirish): Delete this file.
//   - Move isNativeRuntimeFrame and nativeGroup to TraceEvents.d.ts (or TraceTree)
//   - Move createFakeTraceFromCpuProfile to TimelineLoader
export class TimelineJSProfileProcessor {
    static isNativeRuntimeFrame(frame) {
        return frame.url === 'native V8Runtime';
    }
    static nativeGroup(nativeName) {
        if (nativeName.startsWith('Parse')) {
            return "Parse" /* TimelineJSProfileProcessor.NativeGroups.PARSE */;
        }
        if (nativeName.startsWith('Compile') || nativeName.startsWith('Recompile')) {
            return "Compile" /* TimelineJSProfileProcessor.NativeGroups.COMPILE */;
        }
        return null;
    }
    static createFakeTraceFromCpuProfile(profile, tid) {
        const events = [];
        const threadName = `Thread ${tid}`;
        appendEvent('TracingStartedInPage', { data: { sessionId: '1' } }, 0, 0, "M" /* Types.Events.Phase.METADATA */);
        appendEvent("thread_name" /* Types.Events.Name.THREAD_NAME */, { name: threadName }, 0, 0, "M" /* Types.Events.Phase.METADATA */, '__metadata');
        if (!profile) {
            return { traceEvents: events, metadata: {} };
        }
        // Append a root to show the start time of the profile (which is earlier than first sample), so the Performance
        // panel won't truncate this time period.
        // 'JSRoot' doesn't exist in the new engine and is not the name of an actual trace event, but changing it might break other trace processing tools that rely on this, so we stick with this name.
        // TODO(crbug.com/341234884): consider removing this or clarify why it's required.
        appendEvent('JSRoot', {}, profile.startTime, profile.endTime - profile.startTime, "X" /* Types.Events.Phase.COMPLETE */, 'toplevel');
        // TODO: create a `Profile` event instead, as `cpuProfile` is legacy
        appendEvent('CpuProfile', { data: { cpuProfile: profile } }, profile.endTime, 0, "X" /* Types.Events.Phase.COMPLETE */);
        return {
            traceEvents: events,
            metadata: {
                dataOrigin: "CPUProfile" /* Types.File.DataOrigin.CPU_PROFILE */,
            }
        };
        function appendEvent(name, args, ts, dur, ph, cat) {
            const event = {
                cat: cat || 'disabled-by-default-devtools.timeline',
                name,
                ph: ph || "X" /* Types.Events.Phase.COMPLETE */,
                pid: Types.Events.ProcessID(1),
                tid,
                ts: Types.Timing.Micro(ts),
                args,
            };
            if (dur) {
                event.dur = Types.Timing.Micro(dur);
            }
            events.push(event);
            return event;
        }
    }
}
//# sourceMappingURL=TimelineJSProfile.js.map