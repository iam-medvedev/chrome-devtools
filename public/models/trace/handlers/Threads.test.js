// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
import * as Trace from '../trace.js';
describeWithEnvironment('Handler Threads helper', function () {
    it('returns all the threads for a trace that used tracing', async function () {
        const parsedTrace = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
        const data = parsedTrace.data;
        const allThreads = Array.from(data.Renderer.processes.values()).flatMap(process => {
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
        const threads = Trace.Handlers.Threads.threadsInTrace(data);
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
        const data = parsedTrace.data;
        // Check that we did indeed parse this properly as a CPU Profile.
        assert.strictEqual(data.Renderer.processes.size, 0);
        assert.strictEqual(data.Samples.profilesInProcess.size, 1);
        const threads = Trace.Handlers.Threads.threadsInTrace(data);
        assert.lengthOf(threads, 1);
        assert.strictEqual(threads.at(0)?.type, "CPU_PROFILE" /* Trace.Handlers.Threads.ThreadType.CPU_PROFILE */);
        assert.strictEqual(threads.at(0)?.entries.length, 875);
    });
    it('includes threads that only contain CPU profile samples and no renderer trace events', async function () {
        const events = [
            {
                cat: 'disabled-by-default-devtools.timeline',
                name: "TracingStartedInBrowser" /* Trace.Types.Events.Name.TRACING_STARTED_IN_BROWSER */,
                ph: "I" /* Trace.Types.Events.Phase.INSTANT */,
                pid: Trace.Types.Events.ProcessID(1),
                tid: Trace.Types.Events.ThreadID(1),
                ts: Trace.Types.Timing.Micro(100),
                args: {
                    data: {
                        frames: [
                            {
                                frame: 'frame1',
                                url: 'http://example.com',
                                processId: 1,
                            },
                        ],
                    },
                },
            },
            {
                cat: '__metadata',
                name: "thread_name" /* Trace.Types.Events.Name.THREAD_NAME */,
                ph: "M" /* Trace.Types.Events.Phase.METADATA */,
                pid: Trace.Types.Events.ProcessID(1),
                tid: Trace.Types.Events.ThreadID(1),
                ts: Trace.Types.Timing.Micro(0),
                args: { name: 'CrRendererMain' },
            },
            {
                cat: 'disabled-by-default-devtools.timeline',
                name: "RunTask" /* Trace.Types.Events.Name.RUN_TASK */,
                ph: "X" /* Trace.Types.Events.Phase.COMPLETE */,
                pid: Trace.Types.Events.ProcessID(1),
                tid: Trace.Types.Events.ThreadID(1),
                ts: Trace.Types.Timing.Micro(100),
                dur: Trace.Types.Timing.Micro(500),
                args: {},
            },
            {
                cat: 'disabled-by-default-v8.cpu_profiler',
                name: "Profile" /* Trace.Types.Events.Name.PROFILE */,
                ph: "P" /* Trace.Types.Events.Phase.SAMPLE */,
                pid: Trace.Types.Events.ProcessID(1),
                tid: Trace.Types.Events.ThreadID(2),
                ts: Trace.Types.Timing.Micro(100),
                args: {
                    data: {
                        startTime: Trace.Types.Timing.Micro(100),
                    },
                },
                id: Trace.Types.Events.ProfileID('0x1'),
            },
            {
                cat: 'disabled-by-default-v8.cpu_profiler',
                name: "ProfileChunk" /* Trace.Types.Events.Name.PROFILE_CHUNK */,
                ph: "P" /* Trace.Types.Events.Phase.SAMPLE */,
                pid: Trace.Types.Events.ProcessID(1),
                tid: Trace.Types.Events.ThreadID(2),
                ts: Trace.Types.Timing.Micro(200),
                id: Trace.Types.Events.ProfileID('0x1'),
                args: {
                    data: {
                        cpuProfile: {
                            nodes: [
                                {
                                    id: Trace.Types.Events.CallFrameID(1),
                                    callFrame: { functionName: '(root)', scriptId: 0, columnNumber: 0, lineNumber: 0, url: '' },
                                },
                                {
                                    id: Trace.Types.Events.CallFrameID(2),
                                    callFrame: { functionName: 'wasmTask', scriptId: 1, columnNumber: 0, lineNumber: 0, url: 'test.wasm' },
                                    parent: Trace.Types.Events.CallFrameID(1),
                                },
                            ],
                            samples: [Trace.Types.Events.CallFrameID(2), Trace.Types.Events.CallFrameID(2)],
                        },
                        timeDeltas: [Trace.Types.Timing.Micro(100), Trace.Types.Timing.Micro(100)],
                    },
                },
            },
        ];
        const { parsedTrace } = await TraceLoader.executeTraceEngineOnFileContents(events);
        const threads = Trace.Handlers.Threads.threadsInTrace(parsedTrace.data);
        const sampleOnlyThread = threads.find(t => t.tid === Trace.Types.Events.ThreadID(2));
        assert.exists(sampleOnlyThread);
        assert.lengthOf(sampleOnlyThread.entries, 1);
        assert.strictEqual(sampleOnlyThread.entries[0].name, "ProfileCall" /* Trace.Types.Events.Name.PROFILE_CALL */);
        assert.strictEqual(sampleOnlyThread.entries[0].callFrame.functionName, 'wasmTask');
        assert.strictEqual(sampleOnlyThread.tree.roots.size, 1);
    });
});
//# sourceMappingURL=Threads.test.js.map