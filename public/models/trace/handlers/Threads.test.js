// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TimelineModel from '../../../models/timeline_model/timeline_model.js';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
import * as TraceEngine from '../trace.js';
describeWithEnvironment('Handler Threads helper', function () {
    it('returns all the threads for a trace that used tracing', async function () {
        const { traceData } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
        const allThreads = Array.from(traceData.Renderer.processes.values()).flatMap(process => {
            return Array.from(process.threads.values());
        });
        const expectedThreadNamesAndTypes = [
            { name: 'CrRendererMain', type: "MAIN_THREAD" /* TraceEngine.Handlers.Threads.ThreadType.MAIN_THREAD */ },
            { name: 'Chrome_ChildIOThread', type: "OTHER" /* TraceEngine.Handlers.Threads.ThreadType.OTHER */ },
            { name: 'Compositor', type: "OTHER" /* TraceEngine.Handlers.Threads.ThreadType.OTHER */ },
            { name: 'ThreadPoolServiceThread', type: "THREAD_POOL" /* TraceEngine.Handlers.Threads.ThreadType.THREAD_POOL */ },
            { name: 'Media', type: "OTHER" /* TraceEngine.Handlers.Threads.ThreadType.OTHER */ },
            { name: 'ThreadPoolForegroundWorker', type: "THREAD_POOL" /* TraceEngine.Handlers.Threads.ThreadType.THREAD_POOL */ },
            { name: 'CompositorTileWorker4', type: "RASTERIZER" /* TraceEngine.Handlers.Threads.ThreadType.RASTERIZER */ },
            { name: 'CompositorTileWorker2', type: "RASTERIZER" /* TraceEngine.Handlers.Threads.ThreadType.RASTERIZER */ },
            { name: 'CompositorTileWorker1', type: "RASTERIZER" /* TraceEngine.Handlers.Threads.ThreadType.RASTERIZER */ },
            { name: 'CompositorTileWorkerBackground', type: "RASTERIZER" /* TraceEngine.Handlers.Threads.ThreadType.RASTERIZER */ },
            { name: 'ThreadPoolForegroundWorker', type: "THREAD_POOL" /* TraceEngine.Handlers.Threads.ThreadType.THREAD_POOL */ },
            { name: 'CompositorTileWorker3', type: "RASTERIZER" /* TraceEngine.Handlers.Threads.ThreadType.RASTERIZER */ },
        ];
        const threads = TraceEngine.Handlers.Threads.threadsInTrace(traceData);
        assert.strictEqual(threads.length, allThreads.length);
        assert.deepEqual(threads.map(thread => ({ name: thread.name, type: thread.type })), expectedThreadNamesAndTypes);
    });
    it('returns all the threads for a trace that used CPU profiling', async function () {
        // Bit of extra setup required: we need to mimic what the panel does where
        // it takes the CDP Profile and wraps it in fake trace events, before then
        // passing that through to the new engine.
        const rawEvents = await TraceLoader.rawCPUProfile(this, 'node-fibonacci-website.cpuprofile.gz');
        const events = TimelineModel.TimelineJSProfile.TimelineJSProfileProcessor.createFakeTraceFromCpuProfile(rawEvents, TraceEngine.Types.TraceEvents.ThreadID(1));
        const { traceData } = await TraceLoader.executeTraceEngineOnFileContents(events);
        // Check that we did indeed parse this properly as a CPU Profile.
        assert.strictEqual(traceData.Renderer.processes.size, 0);
        assert.strictEqual(traceData.Samples.profilesInProcess.size, 1);
        const threads = TraceEngine.Handlers.Threads.threadsInTrace(traceData);
        assert.strictEqual(threads.length, 1);
        assert.strictEqual(threads.at(0)?.type, "CPU_PROFILE" /* TraceEngine.Handlers.Threads.ThreadType.CPU_PROFILE */);
        assert.strictEqual(threads.at(0)?.entries.length, 875);
    });
});
//# sourceMappingURL=Threads.test.js.map