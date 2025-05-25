// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as Trace from '../../models/trace/trace.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment, registerNoopActions, } from '../../testing/EnvironmentHelpers.js';
import { TraceLoader } from '../../testing/TraceLoader.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Timeline from './timeline.js';
describeWithEnvironment('TimelinePanel', function () {
    let timeline;
    let traceModel;
    beforeEach(() => {
        registerNoopActions(['timeline.toggle-recording', 'timeline.record-reload', 'timeline.show-history', 'components.collect-garbage']);
        const resourceMapping = new Bindings.ResourceMapping.ResourceMapping(SDK.TargetManager.TargetManager.instance(), Workspace.Workspace.WorkspaceImpl.instance());
        Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance({
            forceNew: true,
            resourceMapping,
            targetManager: SDK.TargetManager.TargetManager.instance(),
        });
        Bindings.IgnoreListManager.IgnoreListManager.instance({
            forceNew: true,
            debuggerWorkspaceBinding: Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance(),
        });
        traceModel = Trace.TraceModel.Model.createWithAllHandlers();
        timeline = Timeline.TimelinePanel.TimelinePanel.instance({ forceNew: true, isNode: false, traceModel });
        renderElementIntoDOM(timeline);
    });
    afterEach(() => {
        timeline.detach();
        Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.removeInstance();
        Bindings.IgnoreListManager.IgnoreListManager.removeInstance();
        UI.ActionRegistry.ActionRegistry.reset();
        Timeline.TimelinePanel.TimelinePanel.removeInstance();
    });
    it('should keep other tracks when the custom tracks setting is toggled', async function () {
        const events = await TraceLoader.rawEvents(this, 'extension-tracks-and-marks.json.gz');
        await timeline.loadingComplete(events, null, null);
        const tracksBeforeDisablingSetting = timeline.getFlameChart().getMainDataProvider().timelineData().groups;
        const parsedTrace = traceModel.parsedTrace();
        const extensionTracksInTrace = parsedTrace?.ExtensionTraceData.extensionTrackData;
        const extensionTrackInTraceNames = extensionTracksInTrace?.flatMap(track => track.isTrackGroup ? [...Object.keys(track.entriesByTrack), track.name] : track.name);
        assert.exists(extensionTrackInTraceNames);
        // Test that extension tracks from the trace model are rendered in
        // the flamechart data.
        const extensionTracksInFlamechartBeforeDisabling = tracksBeforeDisablingSetting
            .filter(track => track.jslogContext === "extension" /* Timeline.CompatibilityTracksAppender.VisualLoggingTrackName.EXTENSION */)
            .map(track => track.name.split(' — Custom track')[0]);
        const nonExtensionTrackNames = tracksBeforeDisablingSetting
            .filter(track => track.jslogContext !== "extension" /* Timeline.CompatibilityTracksAppender.VisualLoggingTrackName.EXTENSION */)
            .map(track => track.name);
        assert.includeMembers(extensionTracksInFlamechartBeforeDisabling, extensionTrackInTraceNames.map(track => track));
        assert.lengthOf(extensionTracksInFlamechartBeforeDisabling, extensionTrackInTraceNames.length);
        // Disable setting
        const customTracksSetting = Timeline.TimelinePanel.TimelinePanel.extensionDataVisibilitySetting();
        customTracksSetting.set(false);
        // Test that extension tracks are not rendered in the flamechart,
        // but other tracks are.
        const tracksAfterDisablingSetting = timeline.getFlameChart().getMainDataProvider().timelineData().groups;
        const extensionTracksAfterDisabling = tracksAfterDisablingSetting.filter(track => track.jslogContext === "extension" /* Timeline.CompatibilityTracksAppender.VisualLoggingTrackName.EXTENSION */);
        const trackNamesAfterDisablingSetting = tracksAfterDisablingSetting.map(track => track.name.split(' — Custom track')[0]);
        assert.lengthOf(extensionTracksAfterDisabling, 0);
        assert.deepEqual(trackNamesAfterDisablingSetting, nonExtensionTrackNames);
        // Enable setting again
        customTracksSetting.set(true);
        const tracksAfterEnablingSetting = timeline.getFlameChart().getMainDataProvider().timelineData().groups;
        assert.deepEqual(tracksBeforeDisablingSetting, tracksAfterEnablingSetting);
    });
    it('should keep marker overlays when the custom tracks setting is toggled', async function () {
        const events = await TraceLoader.rawEvents(this, 'web-dev.json.gz');
        await timeline.loadingComplete(events, null, null);
        const overlaysBeforeDisablingSetting = timeline.getFlameChart().overlays().allOverlays();
        // Test that overlays are rendered in the timeline
        assert.isAbove(overlaysBeforeDisablingSetting.length, 0);
        // Disable setting
        const customTracksSetting = Timeline.TimelinePanel.TimelinePanel.extensionDataVisibilitySetting();
        customTracksSetting.set(false);
        // Test that overlays remain untouched
        const overlaysAfterDisablingSetting = timeline.getFlameChart().overlays().allOverlays();
        assert.deepEqual(overlaysBeforeDisablingSetting, overlaysAfterDisablingSetting);
        // Enable setting again
        customTracksSetting.set(true);
        const overlaysAfterEnablingSetting = timeline.getFlameChart().overlays().allOverlays();
        assert.deepEqual(overlaysBeforeDisablingSetting, overlaysAfterEnablingSetting);
    });
    it('keeps entries set to be dimmed as so after toggling the custom tracks setting', async function () {
        const events = await TraceLoader.rawEvents(this, 'web-dev.json.gz');
        await timeline.loadingComplete(events, null, null);
        const thirdPartyDimSetting = Common.Settings.Settings.instance().createSetting('timeline-dim-third-parties', false);
        // Dim 3P entries.
        thirdPartyDimSetting.set(true);
        const dimIndicesBeforeToggle = timeline.getFlameChart().getMainFlameChart().getDimIndices();
        assert.exists(dimIndicesBeforeToggle);
        assert.isAbove(dimIndicesBeforeToggle.length, 0);
        // Toggle the custom track setting and verify 3P entries remain dimmed.
        Timeline.TimelinePanel.TimelinePanel.extensionDataVisibilitySetting().set(true);
        const dimIndicesAfterToggle = timeline.getFlameChart().getMainFlameChart().getDimIndices();
        assert.exists(dimIndicesAfterToggle);
        assert.isAbove(dimIndicesAfterToggle.length, 0);
    });
    it('keeps annotations after toggling the custom tracks setting', async function () {
        const events = await TraceLoader.rawEvents(this, 'web-dev.json.gz');
        await timeline.loadingComplete(events, null, null);
        const parsedTrace = traceModel.parsedTrace();
        assert.isOk(parsedTrace?.Meta.traceBounds.min);
        const modificationsManager = Timeline.ModificationsManager.ModificationsManager.activeManager();
        assert.isOk(modificationsManager);
        // Add an annotation
        modificationsManager.createAnnotation({
            bounds: Trace.Helpers.Timing.traceWindowFromMicroSeconds(parsedTrace.Meta.traceBounds.min, parsedTrace.Meta.traceBounds.max),
            type: 'TIME_RANGE',
            label: '',
        });
        const annotationsBeforeToggle = timeline.getFlameChart().overlays().allOverlays().filter(e => e.type === 'TIME_RANGE');
        assert.exists(annotationsBeforeToggle);
        assert.isAbove(annotationsBeforeToggle.length, 0);
        // Toggle the custom track setting and verify annotations remain.
        Timeline.TimelinePanel.TimelinePanel.extensionDataVisibilitySetting().set(true);
        const annotationsAfterToggle = timeline.getFlameChart().overlays().allOverlays().filter(e => e.type === 'TIME_RANGE');
        assert.exists(annotationsAfterToggle);
        assert.isAbove(annotationsAfterToggle.length, 0);
    });
});
//# sourceMappingURL=TimelinePanel.test.js.map