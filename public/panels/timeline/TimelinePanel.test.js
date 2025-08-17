// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as Trace from '../../models/trace/trace.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { dispatchClickEvent, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment, registerNoopActions, } from '../../testing/EnvironmentHelpers.js';
import { TraceLoader } from '../../testing/TraceLoader.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Timeline from './timeline.js';
async function contentDataToFile(contentData) {
    if (contentData.isTextContent) {
        return JSON.parse(contentData.text);
    }
    const decoded = Common.Base64.decode(contentData.base64);
    const text = await Common.Gzip.arrayBufferToString(decoded.buffer);
    return JSON.parse(text);
}
describeWithEnvironment('TimelinePanel', function () {
    let timeline;
    let traceModel;
    beforeEach(() => {
        registerNoopActions(['timeline.toggle-recording', 'timeline.record-reload', 'timeline.show-history', 'components.collect-garbage']);
        const resourceMapping = new Bindings.ResourceMapping.ResourceMapping(SDK.TargetManager.TargetManager.instance(), Workspace.Workspace.WorkspaceImpl.instance());
        const ignoreListManager = Workspace.IgnoreListManager.IgnoreListManager.instance({ forceNew: true });
        Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance({
            forceNew: true,
            resourceMapping,
            targetManager: SDK.TargetManager.TargetManager.instance(),
            ignoreListManager,
        });
        traceModel = Trace.TraceModel.Model.createWithAllHandlers();
        timeline = Timeline.TimelinePanel.TimelinePanel.instance({ forceNew: true, isNode: false, traceModel });
        renderElementIntoDOM(timeline);
    });
    afterEach(() => {
        timeline.detach();
        Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.removeInstance();
        Workspace.IgnoreListManager.IgnoreListManager.removeInstance();
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
    it('clears out AI related contexts when the user presses "Clear"', async () => {
        const context = UI.Context.Context.instance();
        const { AIContext, AICallTree } = Timeline.Utils;
        const callTree = sinon.createStubInstance(AICallTree.AICallTree);
        context.setFlavor(AIContext.AgentFocus, AIContext.AgentFocus.fromCallTree(callTree));
        const clearButton = timeline.element.querySelector('[aria-label="Clear"]');
        assert.isOk(clearButton);
        dispatchClickEvent(clearButton);
        assert.isNull(context.flavor(AIContext.AgentFocus));
    });
    // These next few tests can move into the saveToFile describe block below.
    it('saves visual track config metadata to disk if the user has modified it', async function () {
        const events = await TraceLoader.rawEvents(this, 'web-dev.json.gz');
        await timeline.loadingComplete(events, null, null);
        const flameChartView = timeline.getFlameChart();
        const FAKE_METADATA = {
            main: [{ hidden: true, expanded: false, originalIndex: 0, visualIndex: 0 }],
            network: [{ hidden: false, expanded: false, originalIndex: 0, visualIndex: 0 }],
        };
        sinon.stub(flameChartView, 'getPersistedConfigMetadata').callsFake(() => {
            return FAKE_METADATA;
        });
        const fileManager = Workspace.FileManager.FileManager.instance();
        const saveSpy = sinon.stub(fileManager, 'save').callsFake(() => {
            return Promise.resolve({});
        });
        const closeSpy = sinon.stub(fileManager, 'close');
        await timeline.saveToFile({
            includeScriptContent: false,
            includeSourceMaps: false,
            addModifications: true,
        });
        sinon.assert.calledOnce(saveSpy);
        sinon.assert.calledOnce(closeSpy);
        const [fileName, contentData] = saveSpy.getCall(0).args;
        // Matches Trace-20250613T132120.json
        assert.match(fileName, /Trace-[\d|T]+\.json$/);
        const file = await contentDataToFile(contentData);
        assert.deepEqual(file.metadata.visualTrackConfig, FAKE_METADATA);
    });
    it('does not save visual track config if the user does not save with modifications', async function () {
        const events = await TraceLoader.rawEvents(this, 'web-dev.json.gz');
        await timeline.loadingComplete(events, null, null);
        const flameChartView = timeline.getFlameChart();
        const FAKE_METADATA = {
            main: [{ hidden: true, expanded: false, originalIndex: 0, visualIndex: 0 }],
            network: [{ hidden: false, expanded: false, originalIndex: 0, visualIndex: 0 }],
        };
        sinon.stub(flameChartView, 'getPersistedConfigMetadata').callsFake(() => {
            return FAKE_METADATA;
        });
        const fileManager = Workspace.FileManager.FileManager.instance();
        const saveSpy = sinon.stub(fileManager, 'save').callsFake(() => {
            return Promise.resolve({});
        });
        sinon.stub(fileManager, 'close');
        await timeline.saveToFile({
            includeScriptContent: false,
            includeSourceMaps: false,
            addModifications: false,
        });
        sinon.assert.calledOnce(saveSpy);
        const [, contentData] = saveSpy.getCall(0).args;
        const file = await contentDataToFile(contentData);
        assert.isUndefined(file.metadata.visualTrackConfig);
    });
    it('does not save visual track config if the user has not made any', async function () {
        const events = await TraceLoader.rawEvents(this, 'web-dev.json.gz');
        await timeline.loadingComplete(events, null, null);
        const flameChartView = timeline.getFlameChart();
        sinon.stub(flameChartView, 'getPersistedConfigMetadata').callsFake(() => {
            return { main: null, network: null };
        });
        const fileManager = Workspace.FileManager.FileManager.instance();
        const saveSpy = sinon.stub(fileManager, 'save').callsFake(() => {
            return Promise.resolve({});
        });
        sinon.stub(fileManager, 'close');
        await timeline.saveToFile({
            includeScriptContent: false,
            includeSourceMaps: false,
            addModifications: true,
        });
        sinon.assert.calledOnce(saveSpy);
        const [, contentData] = saveSpy.getCall(0).args;
        const file = await contentDataToFile(contentData);
        assert.isUndefined(file.metadata.visualTrackConfig);
    });
    it('includes the trace metadata when saving to a file', async function () {
        const events = await TraceLoader.rawEvents(this, 'web-dev-with-commit.json.gz');
        const metadata = await TraceLoader.metadata(this, 'web-dev-with-commit.json.gz');
        await timeline.loadingComplete(events, null, metadata);
        const fileManager = Workspace.FileManager.FileManager.instance();
        const saveSpy = sinon.stub(fileManager, 'save').callsFake(() => {
            return Promise.resolve({});
        });
        sinon.stub(fileManager, 'close');
        await timeline.saveToFile({
            includeScriptContent: false,
            includeSourceMaps: false,
            addModifications: false,
        });
        sinon.assert.calledOnce(saveSpy);
        const [, contentData] = saveSpy.getCall(0).args;
        // Assert that each value in the metadata of the JSON matches the metadata in memory.
        // We can't do a simple deepEqual() on the two objects as the in-memory
        // contains values that are `undefined` which do not exist in the JSON
        // version.
        const file = await contentDataToFile(contentData);
        for (const k in file) {
            const key = k;
            assert.deepEqual(file.metadata[key], metadata[key]);
        }
    });
    describe('handleExternalRecordRequest', () => {
        it('returns information on the insights found in the recording', async function () {
            const uiView = UI.ViewManager.ViewManager.instance({ forceNew: true });
            sinon.stub(uiView, 'showView');
            const events = await TraceLoader.rawEvents(this, 'web-dev-with-commit.json.gz');
            await timeline.loadingComplete(events, null, null);
            sinon.stub(timeline, 'recordReload').callsFake(() => {
                timeline.dispatchEventToListeners("RecordingCompleted" /* Timeline.TimelinePanel.Events.RECORDING_COMPLETED */, { traceIndex: 0 });
            });
            const generator = Timeline.TimelinePanel.TimelinePanel.handleExternalRecordRequest();
            let externalRequestResponse = await generator.next();
            while (!externalRequestResponse.done) {
                externalRequestResponse = await generator.next();
            }
            const { message } = externalRequestResponse.value;
            assert.include(message, '# Trace recording results');
            const EXPECTED_INSIGHT_TITLES = [
                'LCP breakdown',
                'LCP request discovery',
                'Render blocking requests',
                'Document request latency',
            ];
            for (const title of EXPECTED_INSIGHT_TITLES) {
                assert.include(message, `### Insight Title: ${title}`);
            }
            assert.include(message, `- Time to first byte: 7.94 ms (6.1% of total LCP time)
- Resource load delay: 33.16 ms (25.7% of total LCP time)
- Resource load duration: 14.70 ms (11.4% of total LCP time)
- Element render delay: 73.41 ms (56.8% of total LCP time)`);
        });
        it('includes information on passing insights under a separate heading', async function () {
            const uiView = UI.ViewManager.ViewManager.instance({ forceNew: true });
            sinon.stub(uiView, 'showView');
            const events = await TraceLoader.rawEvents(this, 'web-dev-with-commit.json.gz');
            await timeline.loadingComplete(events, null, null);
            sinon.stub(timeline, 'recordReload').callsFake(() => {
                timeline.dispatchEventToListeners("RecordingCompleted" /* Timeline.TimelinePanel.Events.RECORDING_COMPLETED */, { traceIndex: 0 });
            });
            const generator = Timeline.TimelinePanel.TimelinePanel.handleExternalRecordRequest();
            let externalRequestResponse = await generator.next();
            while (!externalRequestResponse.done) {
                externalRequestResponse = await generator.next();
            }
            const { message } = externalRequestResponse.value;
            assert.include(message, '# Trace recording results');
            assert.include(message, '## Non-passing insights:');
            const EXPECTED_INSIGHT_TITLES = [
                'INP breakdown',
                'Layout shift culprits',
            ];
            for (const title of EXPECTED_INSIGHT_TITLES) {
                assert.include(message, `### Insight Title: ${title}`);
            }
        });
    });
    describe('saveToFile', function () {
        let fileManager;
        let saveSpy;
        let closeSpy;
        beforeEach(() => {
            fileManager = Workspace.FileManager.FileManager.instance();
            saveSpy = sinon.stub(fileManager, 'save').callsFake(() => {
                return Promise.resolve({});
            });
            closeSpy = sinon.stub(fileManager, 'close');
        });
        describe('with gz', function () {
            this.beforeAll(() => {
                Root.Runtime.experiments.enableForTest("timeline-save-as-gz" /* Root.Runtime.ExperimentName.TIMELINE_SAVE_AS_GZ */);
            });
            this.afterAll(() => {
                Root.Runtime.experiments.disableForTest("timeline-save-as-gz" /* Root.Runtime.ExperimentName.TIMELINE_SAVE_AS_GZ */);
            });
            it('saves a regular trace file', async function () {
                const { traceEvents, metadata } = await TraceLoader.traceFile(this, 'web-dev.json.gz');
                await timeline.innerSaveToFile(traceEvents, metadata, {
                    savingEnhancedTrace: false,
                    addModifications: false,
                });
                sinon.assert.calledOnce(saveSpy);
                sinon.assert.calledOnce(closeSpy);
                const [fileName, contentData] = saveSpy.getCall(0).args;
                assert.match(fileName, /Trace-[\d|T]+\.json.gz$/);
                const file = await contentDataToFile(contentData);
                assert.isUndefined(file.metadata.enhancedTraceVersion);
                assert.deepEqual(file.traceEvents, traceEvents);
            });
            it('saves a CPU profile trace file', async function () {
                const profile = await TraceLoader.rawCPUProfile(this, 'node-fibonacci-website.cpuprofile.gz');
                const file = Trace.Helpers.SamplesIntegrator.SamplesIntegrator.createFakeTraceFromCpuProfile(profile, Trace.Types.Events.ThreadID(1));
                const { traceEvents, metadata } = file;
                await timeline.innerSaveToFile(traceEvents, metadata, {
                    savingEnhancedTrace: false,
                    addModifications: false,
                });
                sinon.assert.calledOnce(saveSpy);
                sinon.assert.calledOnce(closeSpy);
                const [fileName, contentData] = saveSpy.getCall(0).args;
                assert.match(fileName, /CPU-[\d|T]+\.cpuprofile.gz$/);
                const traceFile = await contentDataToFile(contentData);
                const cpuFile = traceFile;
                const profile2 = Trace.Helpers.SamplesIntegrator.SamplesIntegrator.extractCpuProfileFromFakeTrace(traceEvents);
                assert.deepEqual(cpuFile, profile2);
            });
            it('saves an enhanced trace file', async function () {
                const { traceEvents, metadata } = await TraceLoader.traceFile(this, 'enhanced-traces.json.gz');
                await timeline.innerSaveToFile(traceEvents, metadata, {
                    savingEnhancedTrace: true,
                    addModifications: false,
                });
                sinon.assert.calledOnce(saveSpy);
                sinon.assert.calledOnce(closeSpy);
                const [fileName, contentData] = saveSpy.getCall(0).args;
                assert.match(fileName, /EnhancedTrace-[\d|T]+\.json\.gz$/);
                const file = await contentDataToFile(contentData);
                assert.isDefined(file.metadata.enhancedTraceVersion);
            });
            it('saves a trace file with modifications', async function () {
                const { traceEvents, metadata } = await TraceLoader.traceFile(this, 'web-dev.json.gz');
                // Load to initialize modification manager
                await timeline.loadingComplete(traceEvents, null, metadata);
                const modificationsManager = Timeline.ModificationsManager.ModificationsManager.activeManager();
                assert.isOk(modificationsManager);
                modificationsManager.createAnnotation({
                    bounds: Trace.Helpers.Timing.traceWindowFromMicroSeconds(Trace.Types.Timing.Micro(1), Trace.Types.Timing.Micro(2)),
                    type: 'TIME_RANGE',
                    label: 'Test Annotation',
                });
                await timeline.saveToFile({
                    includeScriptContent: false,
                    includeSourceMaps: false,
                    addModifications: true,
                });
                sinon.assert.calledOnce(saveSpy);
                sinon.assert.calledOnce(closeSpy);
                const [, contentData] = saveSpy.getCall(0).args;
                const file = await contentDataToFile(contentData);
                assert.isDefined(file.metadata.modifications);
                assert.lengthOf(file.metadata.modifications.annotations.labelledTimeRanges, 1);
                assert.strictEqual(file.metadata.modifications.annotations.labelledTimeRanges[0].label, 'Test Annotation');
            });
        });
        describe('without gz', function () {
            it('saves a regular trace file', async function () {
                const { traceEvents, metadata } = await TraceLoader.traceFile(this, 'web-dev.json.gz');
                await timeline.innerSaveToFile(traceEvents, metadata, {
                    savingEnhancedTrace: false,
                    addModifications: false,
                });
                sinon.assert.calledOnce(saveSpy);
                sinon.assert.calledOnce(closeSpy);
                const [fileName, contentData] = saveSpy.getCall(0).args;
                assert.match(fileName, /Trace-[\d|T]+\.json$/);
                const file = await contentDataToFile(contentData);
                assert.isUndefined(file.metadata.enhancedTraceVersion);
                assert.deepEqual(file.traceEvents, traceEvents);
            });
        });
    });
});
//# sourceMappingURL=TimelinePanel.test.js.map