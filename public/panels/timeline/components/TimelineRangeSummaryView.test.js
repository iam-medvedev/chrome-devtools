// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Trace from '../../../models/trace/trace.js';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import * as TimelineComponents from './components.js';
describeWithEnvironment('TimelineRangeSummaryView', () => {
    describe('statsForTimeRange', () => {
        it('correctly aggregates up stats', async () => {
            const mainThread = Trace.Types.Events.ThreadID(1);
            const pid = Trace.Types.Events.ProcessID(100);
            function microsec(x) {
                return Trace.Types.Timing.Micro(x);
            }
            const events = [
                {
                    cat: 'disabled-by-default-devtools.timeline',
                    name: 'TracingStartedInBrowser',
                    ph: "I" /* Trace.Types.Events.Phase.INSTANT */,
                    pid,
                    tid: mainThread,
                    ts: microsec(100),
                    args: {
                        data: {
                            frames: [
                                { frame: 'frame1', url: 'frameurl', name: 'frame-name' },
                            ],
                        },
                    },
                },
                {
                    cat: 'disabled-by-default-devtools.timeline',
                    name: 'SetLayerTreeId',
                    ph: "I" /* Trace.Types.Events.Phase.INSTANT */,
                    pid,
                    tid: mainThread,
                    ts: microsec(101),
                    args: { data: { frame: 'frame1', layerTreeId: 17 } },
                },
                {
                    cat: 'toplevel',
                    name: 'Program',
                    ph: "X" /* Trace.Types.Events.Phase.COMPLETE */,
                    ts: microsec(100000),
                    dur: microsec(3000),
                    tid: mainThread,
                    pid,
                    args: {},
                },
                {
                    cat: 'disabled-by-default-devtools.timeline',
                    name: 'FunctionCall',
                    ph: "X" /* Trace.Types.Events.Phase.COMPLETE */,
                    ts: microsec(100500),
                    dur: microsec(1500),
                    tid: mainThread,
                    pid,
                    args: {},
                },
                {
                    cat: 'disabled-by-default-devtools.timeline',
                    name: 'Layout',
                    ph: "X" /* Trace.Types.Events.Phase.COMPLETE */,
                    ts: microsec(101000),
                    dur: microsec(1000),
                    tid: mainThread,
                    pid,
                    args: {
                        beginData: {
                            frame: 'FAKE_FRAME_ID',
                            dirtyObjects: 0,
                            partialLayout: false,
                            totalObjects: 1,
                        },
                        endData: { layoutRoots: [] },
                    },
                },
                {
                    cat: 'toplevel',
                    name: 'Program',
                    ph: "X" /* Trace.Types.Events.Phase.COMPLETE */,
                    ts: microsec(104000),
                    dur: microsec(4000),
                    tid: mainThread,
                    pid,
                    args: {},
                },
                {
                    cat: 'disabled-by-default-devtools.timeline',
                    name: 'FunctionCall',
                    ph: "X" /* Trace.Types.Events.Phase.COMPLETE */,
                    ts: microsec(104000),
                    dur: microsec(1000),
                    tid: mainThread,
                    pid,
                    args: {},
                },
                {
                    cat: 'disabled-by-default-devtools.timeline',
                    name: 'CommitLoad',
                    ph: "X" /* Trace.Types.Events.Phase.COMPLETE */,
                    ts: microsec(105000),
                    dur: microsec(1000),
                    tid: mainThread,
                    pid,
                    args: {},
                },
                {
                    cat: 'disabled-by-default-devtools.timeline',
                    name: 'Layout',
                    ph: "X" /* Trace.Types.Events.Phase.COMPLETE */,
                    ts: microsec(107000),
                    dur: microsec(1000),
                    tid: mainThread,
                    pid,
                    args: {
                        beginData: {
                            frame: 'FAKE_FRAME_ID',
                            dirtyObjects: 0,
                            partialLayout: false,
                            totalObjects: 1,
                        },
                        endData: { layoutRoots: [] },
                    },
                },
            ];
            const rangeStats101To103 = TimelineComponents.TimelineRangeSummaryView.statsForTimeRange(events, Trace.Types.Timing.Milli(101), Trace.Types.Timing.Milli(103));
            assert.deepEqual(rangeStats101To103, {
                other: 1,
                rendering: 1,
                scripting: 0,
                idle: 0,
            });
            const rangeStats104To109 = TimelineComponents.TimelineRangeSummaryView.statsForTimeRange(events, Trace.Types.Timing.Milli(104), Trace.Types.Timing.Milli(109));
            assert.deepEqual(rangeStats104To109, {
                other: 2,
                rendering: 1,
                scripting: 1,
                idle: 1,
            });
        });
    });
});
//# sourceMappingURL=TimelineRangeSummaryView.test.js.map