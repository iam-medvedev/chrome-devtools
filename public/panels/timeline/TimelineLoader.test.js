// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceEngine from '../../models/trace/trace.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { makeFakeEventPayload } from '../../testing/TraceHelpers.js';
import * as Timeline from './timeline.js';
async function loadWebDevTraceAsFile() {
    const file = new URL('./fixtures/traces/web-dev.json.gz', import.meta.url);
    const response = await fetch(file);
    const asBlob = await response.blob();
    const asFile = new File([asBlob], 'web-dev.json.gz', {
        type: 'application/gzip',
    });
    return asFile;
}
async function loadBasicCpuProfileAsFile() {
    const file = new URL('./fixtures/traces/node-fibonacci-website.cpuprofile.gz', import.meta.url);
    const response = await fetch(file);
    const asBlob = await response.blob();
    const asFile = new File([asBlob], 'node-fibonacci-website.cpuprofile.gz', {
        type: 'application/gzip',
    });
    return asFile;
}
describeWithEnvironment('TimelineLoader', () => {
    const loadingStartedSpy = sinon.spy();
    const loadingProgressSpy = sinon.spy();
    const processingStartedSpy = sinon.spy();
    const loadingCompleteSpy = sinon.spy();
    const recordingProgressSpy = sinon.spy();
    const loadingCompleteForTestSpy = sinon.spy();
    const client = {
        async loadingStarted() {
            loadingStartedSpy();
        },
        async loadingProgress(progress) {
            loadingProgressSpy(progress);
        },
        async processingStarted() {
            processingStartedSpy();
        },
        async loadingComplete(collectedEvents, tracingModel, exclusiveFilter, isCpuProfile) {
            loadingCompleteSpy(collectedEvents, tracingModel, exclusiveFilter, isCpuProfile);
        },
        recordingProgress: function (usage) {
            recordingProgressSpy(usage);
        },
        loadingCompleteForTest: function () {
            loadingCompleteForTestSpy();
        },
    };
    beforeEach(() => {
        loadingStartedSpy.resetHistory();
        loadingProgressSpy.resetHistory();
        processingStartedSpy.resetHistory();
        loadingCompleteSpy.resetHistory();
        recordingProgressSpy.resetHistory();
        loadingCompleteForTestSpy.resetHistory();
    });
    it('can load a saved trace file', async () => {
        const file = await loadWebDevTraceAsFile();
        const loader = await Timeline.TimelineLoader.TimelineLoader.loadFromFile(file, client);
        await loader.traceFinalizedForTest();
        assert.isTrue(loadingStartedSpy.calledOnce);
        // Exact number is deterministic so we can assert, but the fact it was 29
        // calls doesn't really matter. We just want to check it got called "a
        // bunch of times".
        assert.strictEqual(loadingProgressSpy.callCount, 29);
        assert.isTrue(processingStartedSpy.calledOnce);
        assert.isTrue(loadingCompleteSpy.calledOnce);
        // Get the arguments of the first (and only) call to the loadingComplete
        // function. TS doesn't know what the types are (they are [any, any] by
        // default), so we tell it that they align with the types of the
        // loadingComplete parameters.
        const [collectedEvents, tracingModel, exclusiveFilter, isCpuProfile] = loadingCompleteSpy.args[0];
        assert.isNull(exclusiveFilter); // We are not filtering out any events for this trace.
        if (!tracingModel) {
            throw new Error('No tracing model found from results of loadTraceFromFile');
        }
        // Ensure that we loaded something that looks about right!
        assert.lengthOf(tracingModel.allRawEvents(), 8252);
        assert.lengthOf(collectedEvents, 8252);
        assert.isFalse(isCpuProfile);
    });
    it('can load a saved CPUProfile file', async () => {
        const file = await loadBasicCpuProfileAsFile();
        const loader = await Timeline.TimelineLoader.TimelineLoader.loadFromFile(file, client);
        await loader.traceFinalizedForTest();
        assert.isTrue(loadingStartedSpy.calledOnce);
        // For the CPU Profile we are testing, loadingProgress will be called three times, because the
        // file is not that big.
        assert.strictEqual(loadingProgressSpy.callCount, 3);
        assert.isTrue(processingStartedSpy.calledOnce);
        assert.isTrue(loadingCompleteSpy.calledOnce);
        // Get the arguments of the first (and only) call to the loadingComplete
        // function. TS doesn't know what the types are (they are [any, any] by
        // default), so we tell it that they align with the types of the
        // loadingComplete parameters.
        const [collectedEvents, tracingModel, exclusiveFilter, isCpuProfile] = loadingCompleteSpy.args[0];
        assert.deepEqual(exclusiveFilter, Timeline.TimelineLoader.TimelineLoader.getCpuProfileFilter());
        if (!tracingModel) {
            throw new Error('No tracing model found from results of loadTraceFromFile');
        }
        // We create fake trace event for CPU profile, includes one for TracingStartedInPage,
        // one for metadata, one for root, and one for CPU profile
        assert.lengthOf(tracingModel.allRawEvents(), 4);
        assert.lengthOf(collectedEvents, 4);
        assert.isTrue(isCpuProfile);
    });
    it('can load recorded trace events correctly', async () => {
        const testTraceEvents = [
            makeFakeEventPayload({
                name: 'test-event',
                ph: "B" /* TraceEngine.Types.TraceEvents.Phase.BEGIN */,
                categories: ['testing1', 'testing2'],
                ts: 1_000,
                dur: 5_000,
            }),
            makeFakeEventPayload({
                name: 'test-event',
                ph: "X" /* TraceEngine.Types.TraceEvents.Phase.COMPLETE */,
                categories: ['testing1', 'testing2'],
                ts: 10_000,
                dur: 5_000,
            }),
        ];
        const loader = Timeline.TimelineLoader.TimelineLoader.loadFromEvents(testTraceEvents, client);
        await loader.traceFinalizedForTest();
        assert.isTrue(loadingStartedSpy.calledOnce);
        // For the trace events we are testing, loadingProgress will be called only once, because the
        // fake trace events array is very short.
        assert.isTrue(loadingProgressSpy.calledOnce);
        assert.isTrue(processingStartedSpy.calledOnce);
        assert.isTrue(loadingCompleteSpy.calledOnce);
        // Get the arguments of the first (and only) call to the loadingComplete
        // function. TS doesn't know what the types are (they are [any, any] by
        // default), so we tell it that they align with the types of the
        // loadingComplete parameters.
        const [collectedEvents, tracingModel, exclusiveFilter, isCpuProfile] = loadingCompleteSpy.args[0];
        assert.isNull(exclusiveFilter);
        if (!tracingModel) {
            throw new Error('No tracing model found from results of loadTraceFromFile');
        }
        // Ensure that we loaded something that looks about right!
        assert.lengthOf(tracingModel.allRawEvents(), testTraceEvents.length);
        assert.lengthOf(collectedEvents, testTraceEvents.length);
        assert.isFalse(isCpuProfile);
    });
    it('can load recorded CPUProfile correctly', async () => {
        const testProfile = { nodes: [], startTime: 0, endTime: 0 };
        const loader = Timeline.TimelineLoader.TimelineLoader.loadFromCpuProfile(testProfile, client);
        await loader.traceFinalizedForTest();
        assert.isTrue(loadingStartedSpy.calledOnce);
        // For the CPU Profile we are testing, loadingProgress will be called only once, because the
        // fake Profile is basically empty.
        assert.strictEqual(loadingProgressSpy.callCount, 1);
        assert.isTrue(processingStartedSpy.calledOnce);
        assert.isTrue(loadingCompleteSpy.calledOnce);
        // Get the arguments of the first (and only) call to the loadingComplete
        // function. TS doesn't know what the types are (they are [any, any] by
        // default), so we tell it that they align with the types of the
        // loadingComplete parameters.
        const [collectedEvents, tracingModel, exclusiveFilter, isCpuProfile] = loadingCompleteSpy.args[0];
        assert.deepEqual(exclusiveFilter, Timeline.TimelineLoader.TimelineLoader.getCpuProfileFilter());
        if (!tracingModel) {
            throw new Error('No tracing model found from results of loadTraceFromFile');
        }
        // We create fake trace event for CPU profile, includes one for TracingStartedInPage,
        // one for metadata, one for root, and one for CPU profile
        assert.lengthOf(tracingModel.allRawEvents(), 4);
        assert.lengthOf(collectedEvents, 4);
        assert.isTrue(isCpuProfile);
    });
});
//# sourceMappingURL=TimelineLoader.test.js.map