// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
import * as Trace from '../trace.js';
describeWithEnvironment('Handler Threads helper', function () {
    it('returns all the threads for a trace that used tracing', async function () {
        const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
        const allThreads = Array.from(parsedTrace.Renderer.processes.values()).flatMap(process => {
            return Array.from(process.threads.values());
        });
        const expectedThreadNamesAndTypes = [
            { name: 'CrRendererMain', type: "MAIN_THREAD" /* Trace.Handlers.Threads.ThreadType.MAIN_THREAD */ },
            { name: 'Chrome_ChildIOThread', type: "OTHER" /* Trace.Handlers.Threads.ThreadType.OTHER */ },
            { name: 'Compositor', type: "OTHER" /* Trace.Handlers.Threads.ThreadType.OTHER */ },
            { name: 'ThreadPoolServiceThread', type: "THREAD_POOL" /* Trace.Handlers.Threads.ThreadType.THREAD_POOL */ },
            { name: 'Media', type: "OTHER" /* Trace.Handlers.Threads.ThreadType.OTHER */ },
            { name: 'ThreadPoolForegroundWorker', type: "THREAD_POOL" /* Trace.Handlers.Threads.ThreadType.THREAD_POOL */ },
            { name: 'CompositorTileWorker4', type: "RASTERIZER" /* Trace.Handlers.Threads.ThreadType.RASTERIZER */ },
            { name: 'CompositorTileWorker2', type: "RASTERIZER" /* Trace.Handlers.Threads.ThreadType.RASTERIZER */ },
            { name: 'CompositorTileWorker1', type: "RASTERIZER" /* Trace.Handlers.Threads.ThreadType.RASTERIZER */ },
            { name: 'CompositorTileWorkerBackground', type: "RASTERIZER" /* Trace.Handlers.Threads.ThreadType.RASTERIZER */ },
            { name: 'ThreadPoolForegroundWorker', type: "THREAD_POOL" /* Trace.Handlers.Threads.ThreadType.THREAD_POOL */ },
            { name: 'CompositorTileWorker3', type: "RASTERIZER" /* Trace.Handlers.Threads.ThreadType.RASTERIZER */ },
        ];
        const threads = Trace.Handlers.Threads.threadsInTrace(parsedTrace);
        assert.strictEqual(threads.length, allThreads.length);
        assert.deepEqual(threads.map(thread => ({ name: thread.name, type: thread.type })), expectedThreadNamesAndTypes);
    });
    it('returns all the threads for a trace that used CPU profiling', async function () {
        // Bit of extra setup required: we need to mimic what the panel does where
        // it takes the CDP Profile and wraps it in fake trace events, before then
        // passing that through to the new engine.
        const profile = await TraceLoader.rawCPUProfile(this, 'node-fibonacci-website.cpuprofile.gz');
        const contents = Trace.Helpers.SamplesIntegrator.SamplesIntegrator.createFakeTraceFromCpuProfile(profile, Trace.Types.Events.ThreadID(1));
        const { parsedTrace } = await TraceLoader.executeTraceEngineOnFileContents(contents);
        // Check that we did indeed parse this properly as a CPU Profile.
        assert.strictEqual(parsedTrace.Renderer.processes.size, 0);
        assert.strictEqual(parsedTrace.Samples.profilesInProcess.size, 1);
        const threads = Trace.Handlers.Threads.threadsInTrace(parsedTrace);
        assert.lengthOf(threads, 1);
        assert.strictEqual(threads.at(0)?.type, "CPU_PROFILE" /* Trace.Handlers.Threads.ThreadType.CPU_PROFILE */);
        assert.strictEqual(threads.at(0)?.entries.length, 875);
    });
});
//# sourceMappingURL=Threads.test.js.map