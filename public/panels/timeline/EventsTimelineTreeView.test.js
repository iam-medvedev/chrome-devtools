// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { describe, it } from 'mocha';
import * as Trace from '../../models/trace/trace.js';
import { getAxeViolations } from '../../testing/AxeHelpers.js';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import * as RenderCoordinator from '../../ui/components/render_coordinator/render_coordinator.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Timeline from './timeline.js';
class MockViewDelegate {
    zoomEvent(_event) {
    }
    select(_selection) {
    }
    set3PCheckboxDisabled(_disabled) {
    }
    selectEntryAtTime(_events, _time) {
    }
    highlightEvent(_event) {
    }
    element = document.createElement('div');
}
describeWithEnvironment('EventsTimelineTreeView', () => {
    describe('accessibility', () => {
        it('has no aXe violations', async () => {
            const testData = [
                {
                    name: 'top level event name',
                    ts: Trace.Types.Timing.Micro(1000000),
                    ph: Trace.Types.Events.Phase.BEGIN,
                    tid: Trace.Types.Events.ThreadID(1),
                    pid: Trace.Types.Events.ProcessID(100),
                    cat: 'toplevel',
                    args: { data: { message: 'AAA' } },
                },
                {
                    name: 'TimeStamp',
                    ts: Trace.Types.Timing.Micro(1010000),
                    ph: Trace.Types.Events.Phase.BEGIN,
                    tid: Trace.Types.Events.ThreadID(1),
                    pid: Trace.Types.Events.ProcessID(100),
                    cat: 'toplevel',
                    args: { data: { message: 'BBB' } },
                },
                {
                    name: 'TimeStamp',
                    ts: Trace.Types.Timing.Micro(1020000),
                    ph: Trace.Types.Events.Phase.BEGIN,
                    tid: Trace.Types.Events.ThreadID(1),
                    pid: Trace.Types.Events.ProcessID(100),
                    cat: 'toplevel',
                    args: { data: { message: 'CCC' } },
                },
            ];
            const traceModel = Trace.TraceModel.Model.createWithAllHandlers(Trace.Types.Configuration.defaults());
            await traceModel.parse(testData);
            const parsedTrace = traceModel.parsedTrace(0);
            assert.isOk(parsedTrace);
            const mainThreadEvents = parsedTrace.data.Renderer.processes.get(Trace.Types.Events.ProcessID(100))
                ?.threads.get(Trace.Types.Events.ThreadID(1))
                ?.entries;
            assert.isOk(mainThreadEvents);
            const eventTreeView = new Timeline.EventsTimelineTreeView.EventsTimelineTreeView(new MockViewDelegate());
            eventTreeView.model = { selectedEvents: mainThreadEvents, parsedTrace, entityMapper: null };
            eventTreeView.activeSelection = Timeline.TimelineSelection.selectionFromRangeMicroSeconds(parsedTrace.data.Meta.traceBounds.min, parsedTrace.data.Meta.traceBounds.max);
            renderElementIntoDOM(eventTreeView);
            await RenderCoordinator.done();
            await UI.Widget.Widget.allUpdatesComplete;
            assert.exists(eventTreeView.contentElement.querySelector('devtools-toolbar'));
            assert.exists(eventTreeView.contentElement.querySelector('.data-grid'));
            assert.exists(eventTreeView.contentElement.querySelector('.timeline-details-view'));
            assert.isEmpty(await getAxeViolations(eventTreeView.contentElement));
        });
    });
});
//# sourceMappingURL=EventsTimelineTreeView.test.js.map