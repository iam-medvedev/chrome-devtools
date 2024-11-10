// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
import * as Trace from '../trace.js';
import * as TraceFilter from './TraceFilter.js';
describeWithEnvironment('TraceFilter', () => {
    describe('VisibleEventsFilter', () => {
        it('accepts events that are set in the constructor and rejects other events', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'user-timings.json.gz');
            const userTimingEvent = (parsedTrace.UserTimings.performanceMeasures).at(0);
            assert.isOk(userTimingEvent);
            const visibleFilter = new TraceFilter.VisibleEventsFilter([
                "UserTiming" /* Trace.Types.Events.Name.USER_TIMING */,
            ]);
            assert.isTrue(visibleFilter.accept(userTimingEvent));
        });
        describe('eventType', () => {
            it('returns ConsoleTime if the event has the blink.console category', async function () {
                const { parsedTrace } = await TraceLoader.traceEngine(this, 'timings-track.json.gz');
                const consoleTimingEvent = (parsedTrace.UserTimings.consoleTimings).at(0);
                assert.isOk(consoleTimingEvent);
                assert.strictEqual(TraceFilter.VisibleEventsFilter.eventType(consoleTimingEvent), "ConsoleTime" /* Trace.Types.Events.Name.CONSOLE_TIME */);
            });
            it('returns UserTiming if the event has the blink.user_timing category', async function () {
                const { parsedTrace } = await TraceLoader.traceEngine(this, 'timings-track.json.gz');
                const userTimingEvent = (parsedTrace.UserTimings.performanceMeasures).at(0);
                assert.isOk(userTimingEvent);
                assert.strictEqual(TraceFilter.VisibleEventsFilter.eventType(userTimingEvent), "UserTiming" /* Trace.Types.Events.Name.USER_TIMING */);
            });
            it('returns the event name if the event is any other category', async function () {
                const { parsedTrace } = await TraceLoader.traceEngine(this, 'cls-single-frame.json.gz');
                const layoutShiftEvent = parsedTrace.LayoutShifts.clusters.at(0)?.events.at(0);
                assert.isOk(layoutShiftEvent);
                assert.strictEqual(TraceFilter.VisibleEventsFilter.eventType(layoutShiftEvent), "LayoutShift" /* Trace.Types.Events.Name.LAYOUT_SHIFT */);
            });
        });
    });
    describe('TimelineInvisibleEventsFilter', () => {
        it('does not accept events that have been set as invisible', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'user-timings.json.gz');
            const userTimingEvent = (parsedTrace.UserTimings.performanceMeasures).at(0);
            assert.isOk(userTimingEvent);
            const invisibleFilter = new TraceFilter.InvisibleEventsFilter([
                "UserTiming" /* Trace.Types.Events.Name.USER_TIMING */,
            ]);
            assert.isFalse(invisibleFilter.accept(userTimingEvent));
        });
        it('accepts events that have not been set as invisible', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'cls-single-frame.json.gz');
            const layoutShiftEvent = parsedTrace.LayoutShifts.clusters.at(0)?.events.at(0);
            assert.isOk(layoutShiftEvent);
            const invisibleFilter = new TraceFilter.InvisibleEventsFilter([
                "UserTiming" /* Trace.Types.Events.Name.USER_TIMING */,
            ]);
            assert.isTrue(invisibleFilter.accept(layoutShiftEvent));
        });
    });
    describe('ExclusiveNameFilter', () => {
        it('accepts events that do not match the provided set of names to exclude', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'user-timings.json.gz');
            const userTimingEvent = (parsedTrace.UserTimings.performanceMeasures).at(0);
            assert.isOk(userTimingEvent);
            const filter = new TraceFilter.ExclusiveNameFilter([
                "LayoutShift" /* Trace.Types.Events.Name.LAYOUT_SHIFT */,
            ]);
            assert.isTrue(filter.accept(userTimingEvent));
        });
        it('rejects events that match the provided set of names to exclude', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'cls-single-frame.json.gz');
            const layoutShiftEvent = parsedTrace.LayoutShifts.clusters.at(0)?.events.at(0);
            assert.isOk(layoutShiftEvent);
            const filter = new TraceFilter.ExclusiveNameFilter([
                "LayoutShift" /* Trace.Types.Events.Name.LAYOUT_SHIFT */,
            ]);
            assert.isFalse(filter.accept(layoutShiftEvent));
        });
    });
});
//# sourceMappingURL=TraceFilter.test.js.map