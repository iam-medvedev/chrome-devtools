// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { getFirstOrError } from '../../../testing/InsightHelpers.js';
import { SnapshotTester } from '../../../testing/SnapshotTester.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
import { PerformanceTraceFormatter } from '../ai_assistance.js';
async function createFormatter(context, name) {
    const { parsedTrace, insights, metadata } = await TraceLoader.traceEngine(context, name);
    assert.isOk(insights);
    const insightSet = getFirstOrError(insights.values());
    const focus = TimelineUtils.AIContext.AgentFocus.full(parsedTrace, insightSet, metadata);
    const eventsSerializer = new TimelineUtils.EventsSerializer.EventsSerializer();
    const formatter = new PerformanceTraceFormatter(focus, eventsSerializer);
    return { formatter, parsedTrace };
}
describeWithEnvironment('PerformanceTraceFormatter', () => {
    let snapshotTester;
    before(async () => {
        snapshotTester = new SnapshotTester(import.meta);
        await snapshotTester.load();
    });
    after(async () => {
        await snapshotTester.finish();
    });
    it('formatTraceSummary', async function () {
        const { formatter } = await createFormatter(this, 'web-dev.json.gz');
        const output = formatter.formatTraceSummary();
        snapshotTester.assert(this, output);
    });
    it('formatCriticalRequests', async function () {
        const { formatter } = await createFormatter(this, 'render-blocking-requests.json.gz');
        const output = formatter.formatCriticalRequests();
        snapshotTester.assert(this, output);
    });
    it('formatLongestTasks', async function () {
        const { formatter } = await createFormatter(this, 'long-task-from-worker-thread.json.gz');
        const output = formatter.formatLongestTasks();
        snapshotTester.assert(this, output);
    });
    it('formatMainThreadBottomUpSummary', async function () {
        const { formatter } = await createFormatter(this, 'yahoo-news.json.gz');
        const output = formatter.formatMainThreadBottomUpSummary();
        snapshotTester.assert(this, output);
    });
    it('formatThirdPartySummary', async function () {
        const { formatter } = await createFormatter(this, 'yahoo-news.json.gz');
        const output = formatter.formatThirdPartySummary();
        snapshotTester.assert(this, output);
    });
    it('formatMainThreadTrackSummary', async function () {
        const { formatter, parsedTrace } = await createFormatter(this, 'yahoo-news.json.gz');
        const min = parsedTrace.Meta.traceBounds.min;
        const max = parsedTrace.Meta.traceBounds.min + parsedTrace.Meta.traceBounds.range / 2;
        const output = formatter.formatMainThreadTrackSummary(min, max);
        snapshotTester.assert(this, output);
    });
});
//# sourceMappingURL=PerformanceTraceFormatter.test.js.map