// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as AiAssistanceModels from '../../../models/ai_assistance/ai_assistance.js';
import * as Trace from '../../../models/trace/trace.js';
import { mockAidaClient } from '../../../testing/AiAssistanceHelpers.js';
import { cleanTextContent, dispatchClickEvent, doubleRaf } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment, updateHostConfig } from '../../../testing/EnvironmentHelpers.js';
import { makeInstantEvent, microsecondsTraceWindow, MockFlameChartDelegate, setupIgnoreListManagerEnvironment, } from '../../../testing/TraceHelpers.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
import * as RenderCoordinator from '../../../ui/components/render_coordinator/render_coordinator.js';
import * as PerfUI from '../../../ui/legacy/components/perf_ui/perf_ui.js';
import * as PanelCommon from '../../common/common.js';
import * as Timeline from '../timeline.js';
import * as Components from './components/components.js';
import * as Overlays from './overlays.js';
const FAKE_OVERLAY_ENTRY_QUERIES = {
    parsedTrace() {
        return null;
    },
    isEntryCollapsedByUser() {
        return false;
    },
    firstVisibleParentForEntry() {
        return null;
    },
};
/**
 * The Overlays expects to be provided with both the main and network charts
 * and data providers. This function creates all of those and optionally sets
 * the trace data for the providers if it is provided.
 */
function createCharts(parsedTrace) {
    const mainProvider = new Timeline.TimelineFlameChartDataProvider.TimelineFlameChartDataProvider();
    const networkProvider = new Timeline.TimelineFlameChartNetworkDataProvider.TimelineFlameChartNetworkDataProvider();
    if (parsedTrace) {
        const entityMapper = new Timeline.Utils.EntityMapper.EntityMapper(parsedTrace);
        mainProvider.setModel(parsedTrace, entityMapper);
        networkProvider.setModel(parsedTrace, entityMapper);
    }
    const delegate = new MockFlameChartDelegate();
    const mainChart = new PerfUI.FlameChart.FlameChart(mainProvider, delegate);
    const networkChart = new PerfUI.FlameChart.FlameChart(networkProvider, delegate);
    // Add to DOM for offsetWidth, etc working
    document.body.append(mainChart.element, networkChart.element);
    if (parsedTrace) {
        // Force the charts to render. Normally the TimelineFlameChartView would do
        // this, but we aren't creating one for these tests.
        mainChart.update();
        networkChart.update();
    }
    return {
        mainProvider,
        mainChart,
        networkProvider,
        networkChart,
    };
}
describeWithEnvironment('Overlays', () => {
    let showFreDialogStub;
    beforeEach(() => {
        showFreDialogStub = sinon.stub(PanelCommon.FreDialog, 'show');
        setupIgnoreListManagerEnvironment();
    });
    afterEach(() => {
        // Remove any FlameChart elements from the DOM
        document.body.querySelectorAll('widget').forEach(e => e.remove());
    });
    it('can calculate the x position of an event based on the dimensions and its timestamp', async () => {
        const flameChartsContainer = document.createElement('div');
        const mainFlameChartsContainer = flameChartsContainer.createChild('div');
        const networkFlameChartsContainer = flameChartsContainer.createChild('div');
        const container = flameChartsContainer.createChild('div');
        const overlays = new Overlays.Overlays.Overlays({
            container,
            flameChartsContainers: {
                main: mainFlameChartsContainer,
                network: networkFlameChartsContainer,
            },
            charts: createCharts(),
            entryQueries: FAKE_OVERLAY_ENTRY_QUERIES,
        });
        // Set up the dimensions so it is 100px wide
        overlays.updateChartDimensions('main', {
            widthPixels: 100,
            heightPixels: 50,
            scrollOffsetPixels: 0,
            allGroupsCollapsed: false,
        });
        overlays.updateChartDimensions('network', {
            widthPixels: 100,
            heightPixels: 50,
            scrollOffsetPixels: 0,
            allGroupsCollapsed: false,
        });
        const windowMin = Trace.Types.Timing.Micro(0);
        const windowMax = Trace.Types.Timing.Micro(100);
        // Set the visible window to be 0-100 microseconds
        overlays.updateVisibleWindow(Trace.Helpers.Timing.traceWindowFromMicroSeconds(windowMin, windowMax));
        // Now set an event to be at 50 microseconds.
        const event = makeInstantEvent('test-event', 50);
        const xPosition = overlays.xPixelForEventStartOnChart(event);
        assert.strictEqual(xPosition, 50);
    });
    it('can calculate the y position of a main chart event', async function () {
        const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
        const charts = createCharts(parsedTrace);
        const flameChartsContainer = document.createElement('div');
        const mainFlameChartsContainer = flameChartsContainer.createChild('div');
        const networkFlameChartsContainer = flameChartsContainer.createChild('div');
        const container = flameChartsContainer.createChild('div');
        const overlays = new Overlays.Overlays.Overlays({
            container,
            flameChartsContainers: {
                main: mainFlameChartsContainer,
                network: networkFlameChartsContainer,
            },
            charts,
            entryQueries: FAKE_OVERLAY_ENTRY_QUERIES,
        });
        overlays.updateChartDimensions('main', {
            widthPixels: 1000,
            heightPixels: 500,
            scrollOffsetPixels: 0,
            allGroupsCollapsed: false,
        });
        overlays.updateChartDimensions('network', {
            widthPixels: 1000,
            heightPixels: 200,
            scrollOffsetPixels: 0,
            allGroupsCollapsed: false,
        });
        // Set the visible window to be the entire trace.
        overlays.updateVisibleWindow(parsedTrace.Meta.traceBounds);
        const event = charts.mainProvider.eventByIndex?.(50);
        assert.isOk(event);
        const yPixel = overlays.yPixelForEventOnChart(event);
        // The Y offset for the main chart is 280px, but we add 208px on (200px for the
        // network chart, and 8px for the re-size handle) giving us the expected
        // 441px.
        assert.strictEqual(yPixel, 488);
    });
    it('can adjust the y position of a main chart event when the network track is collapsed', async function () {
        const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
        const charts = createCharts(parsedTrace);
        const flameChartsContainer = document.createElement('div');
        const mainFlameChartsContainer = flameChartsContainer.createChild('div');
        const networkFlameChartsContainer = flameChartsContainer.createChild('div');
        const container = flameChartsContainer.createChild('div');
        const overlays = new Overlays.Overlays.Overlays({
            container,
            flameChartsContainers: {
                main: mainFlameChartsContainer,
                network: networkFlameChartsContainer,
            },
            charts,
            entryQueries: FAKE_OVERLAY_ENTRY_QUERIES,
        });
        overlays.updateChartDimensions('main', {
            widthPixels: 1000,
            heightPixels: 500,
            scrollOffsetPixels: 0,
            allGroupsCollapsed: false,
        });
        overlays.updateChartDimensions('network', {
            widthPixels: 1000,
            heightPixels: 34,
            scrollOffsetPixels: 0,
            // Make the network track collapsed
            allGroupsCollapsed: true,
        });
        // Set the visible window to be the entire trace.
        overlays.updateVisibleWindow(parsedTrace.Meta.traceBounds);
        const event = charts.mainProvider.eventByIndex?.(50);
        assert.isOk(event);
        const yPixel = overlays.yPixelForEventOnChart(event);
        // The Y offset for the main chart is 280px, but we add 34px on (the height
        // of the collapsed network chart, with no resizer bar as it is hidden when
        // the network track is collapsed). This gives us 280+34 = 314.
        assert.strictEqual(yPixel, 314);
    });
    it('can calculate the y position of a network chart event', async function () {
        const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
        const charts = createCharts(parsedTrace);
        const flameChartsContainer = document.createElement('div');
        const mainFlameChartsContainer = flameChartsContainer.createChild('div');
        const networkFlameChartsContainer = flameChartsContainer.createChild('div');
        const container = flameChartsContainer.createChild('div');
        const overlays = new Overlays.Overlays.Overlays({
            container,
            flameChartsContainers: {
                main: mainFlameChartsContainer,
                network: networkFlameChartsContainer,
            },
            charts,
            entryQueries: FAKE_OVERLAY_ENTRY_QUERIES,
        });
        overlays.updateChartDimensions('main', {
            widthPixels: 1000,
            heightPixels: 500,
            scrollOffsetPixels: 0,
            allGroupsCollapsed: false,
        });
        overlays.updateChartDimensions('network', {
            widthPixels: 1000,
            heightPixels: 200,
            scrollOffsetPixels: 0,
            allGroupsCollapsed: false,
        });
        // Set the visible window to be the entire trace.
        overlays.updateVisibleWindow(parsedTrace.Meta.traceBounds);
        // Fake the level being visible: because we don't fully render the chart we
        // need to fake this for this test.
        sinon.stub(charts.networkChart, 'levelIsVisible').callsFake(() => true);
        // Find an event on the network chart
        const event = charts.networkProvider.eventByIndex?.(0);
        assert.isOk(event);
        const yPixel = overlays.yPixelForEventOnChart(event);
        // This event is in the first level, but the first level has some offset
        // above it to allow for the header row and the row with the timestamps on
        // it, hence why this value is not 0px.
        assert.strictEqual(yPixel, 34);
    });
    describe('rendering overlays', () => {
        function setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace) {
            const charts = createCharts(parsedTrace);
            const flameChartsContainer = document.createElement('div');
            const mainFlameChartsContainer = flameChartsContainer.createChild('div');
            const networkFlameChartsContainer = flameChartsContainer.createChild('div');
            const container = flameChartsContainer.createChild('div');
            const overlays = new Overlays.Overlays.Overlays({
                container,
                flameChartsContainers: {
                    main: mainFlameChartsContainer,
                    network: networkFlameChartsContainer,
                },
                charts,
                entryQueries: {
                    ...FAKE_OVERLAY_ENTRY_QUERIES,
                    parsedTrace() {
                        return parsedTrace;
                    },
                },
            });
            const currManager = Timeline.ModificationsManager.ModificationsManager.activeManager();
            // The Annotations Overlays are added through the ModificationsManager listener
            currManager?.addEventListener(Timeline.ModificationsManager.AnnotationModifiedEvent.eventName, async (event) => {
                const { overlay, action } = event;
                if (action === 'Add') {
                    overlays.add(overlay);
                }
                await overlays.update();
            });
            // When an annotation overlay is remomved, this event is dispatched to the Modifications Manager.
            overlays.addEventListener(Overlays.Overlays.AnnotationOverlayActionEvent.eventName, async (event) => {
                const { overlay, action } = event;
                if (action === 'Remove') {
                    overlays.remove(overlay);
                }
                await overlays.update();
            });
            overlays.updateChartDimensions('main', {
                widthPixels: 1000,
                heightPixels: 500,
                scrollOffsetPixels: 0,
                allGroupsCollapsed: false,
            });
            overlays.updateChartDimensions('network', {
                widthPixels: 1000,
                heightPixels: 200,
                scrollOffsetPixels: 0,
                allGroupsCollapsed: false,
            });
            // Set the visible window to be the entire trace.
            overlays.updateVisibleWindow(parsedTrace.Meta.traceBounds);
            return { overlays, container, charts };
        }
        async function createAnnotationsLabelElement(context, file, entryIndex, label, isEventOnMainChart = true) {
            updateHostConfig({
                devToolsAiGeneratedTimelineLabels: {
                    enabled: true,
                }
            });
            const { parsedTrace } = await TraceLoader.traceEngine(context, file);
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            let event;
            if (isEventOnMainChart) {
                event = charts.mainProvider.eventByIndex?.(entryIndex);
            }
            else {
                event = charts.networkProvider.eventByIndex?.(entryIndex);
            }
            assert.isOk(event);
            // Create an entry label overlay
            Timeline.ModificationsManager.ModificationsManager.activeManager()?.createAnnotation({
                type: 'ENTRY_LABEL',
                entry: event,
                label: label ?? '',
            });
            await overlays.update();
            await RenderCoordinator.done();
            // Ensure that the overlay was created.
            const overlayDOM = container.querySelector('.overlay-type-ENTRY_LABEL');
            assert.isOk(overlayDOM);
            const component = overlayDOM?.querySelector('devtools-entry-label-overlay');
            assert.isOk(component?.shadowRoot);
            component.connectedCallback();
            const elementsWrapper = component.shadowRoot.querySelector('.label-parts-wrapper');
            assert.isOk(elementsWrapper);
            const inputField = elementsWrapper.querySelector('.input-field');
            assert.isOk(inputField);
            return { elementsWrapper, inputField, overlays, event, component };
        }
        it('can render an entry selected overlay', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            overlays.add({
                type: 'ENTRY_SELECTED',
                entry: event,
            });
            await overlays.update();
            // Ensure that the overlay was created.
            const overlayDOM = container.querySelector('.overlay-type-ENTRY_SELECTED');
            assert.isOk(overlayDOM);
        });
        it('renders an ENTRY_OUTLINE even if the entry is also the ENTRY_SELECTED entry', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            overlays.add({
                type: 'ENTRY_OUTLINE',
                entry: event,
                outlineReason: 'ERROR',
            });
            await overlays.update();
            const outlineVisible = container.querySelector('.overlay-type-ENTRY_OUTLINE')?.style.display === 'block';
            assert.isTrue(outlineVisible, 'The ENTRY_OUTLINE should be visible');
            // Now make a selected entry too
            overlays.add({
                type: 'ENTRY_SELECTED',
                entry: event,
            });
            await overlays.update();
            const outlineStillVisible = container.querySelector('.overlay-type-ENTRY_OUTLINE')?.style.display === 'block';
            assert.isTrue(outlineStillVisible, 'The ENTRY_OUTLINE should be visible');
        });
        it('only ever renders a single selected overlay', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event1 = charts.mainProvider.eventByIndex?.(50);
            const event2 = charts.mainProvider.eventByIndex?.(51);
            assert.isOk(event1);
            assert.isOk(event2);
            overlays.add({
                type: 'ENTRY_SELECTED',
                entry: event1,
            });
            await overlays.update();
            overlays.add({
                type: 'ENTRY_SELECTED',
                entry: event2,
            });
            await overlays.update();
            // There should only be one of these
            const entrySelectedOverlays = container.querySelectorAll('.overlay-type-ENTRY_SELECTED');
            assert.lengthOf(entrySelectedOverlays, 1);
        });
        it('can render entry label overlay', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            overlays.add({
                type: 'ENTRY_LABEL',
                entry: event,
                label: 'entry label',
            });
            await overlays.update();
            // Ensure that the overlay was created.
            const overlayDOM = container.querySelector('.overlay-type-ENTRY_LABEL');
            assert.isOk(overlayDOM);
        });
        it('dispatches an event when the entry label overlay is clicked', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            overlays.add({
                type: 'ENTRY_LABEL',
                entry: event,
                label: 'entry label',
            });
            await overlays.update();
            // Ensure that the overlay was created.
            const overlayDOM = container.querySelector('.overlay-type-ENTRY_LABEL');
            assert.isOk(overlayDOM);
            const overlayClick = new Promise(resolve => {
                overlays.addEventListener(Overlays.Overlays.EntryLabelMouseClick.eventName, e => {
                    const event = e;
                    resolve(event.overlay);
                }, { once: true });
            });
            dispatchClickEvent(overlayDOM);
            const overlayFromEvent = await overlayClick;
            // Check that the event was dispatched on the right overlay.
            assert.deepEqual(overlayFromEvent, {
                type: 'ENTRY_LABEL',
                entry: event,
                label: 'entry label',
            });
        });
        it('should show FRE dialog on the ai suggestion button click if the `ai-annotations-enabled` setting is off', async function () {
            Common.Settings.moduleSetting('ai-annotations-enabled').set(false);
            const { elementsWrapper, inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50);
            // Double click on the label box to make it editable and focus on it
            inputField.dispatchEvent(new FocusEvent('dblclick', { bubbles: true }));
            await RenderCoordinator.done();
            const aiLabelButtonWrapper = elementsWrapper.querySelector('.ai-label-button-wrapper');
            assert.isOk(aiLabelButtonWrapper);
            const aiButton = aiLabelButtonWrapper.querySelector('.ai-label-button');
            assert.isOk(aiButton);
            // This dialog should not be visible unless the `generate annotation` button is clicked
            assert.isFalse(showFreDialogStub.called, 'Expected FreDialog to be not shown but it\'s shown');
            aiButton.dispatchEvent(new FocusEvent('click', { bubbles: true }));
            await RenderCoordinator.done();
            // This dialog should be visible
            assert.isTrue(showFreDialogStub.called, 'Expected FreDialog to be shown but it\'s not shown');
            const customLearnMoreButtonTitle = showFreDialogStub.lastCall.args[0].learnMoreButtonTitle;
            assert.exists(customLearnMoreButtonTitle, 'Expected FreDialog to have a custom button title but it\'s not provided');
            assert.deepEqual(customLearnMoreButtonTitle.toString(), 'Learn more about auto annotations');
        });
        it('should not show FRE dialog on the ai suggestion button click if the `ai-annotations-enabled` setting is on', async function () {
            Common.Settings.moduleSetting('ai-annotations-enabled').set(true);
            const { elementsWrapper, inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50);
            // Double click on the label box to make it editable and focus on it
            inputField.dispatchEvent(new FocusEvent('dblclick', { bubbles: true }));
            const aiLabelButtonWrapper = elementsWrapper.querySelector('.ai-label-button-wrapper');
            assert.isOk(aiLabelButtonWrapper);
            const aiButton = aiLabelButtonWrapper.querySelector('.ai-label-button');
            assert.isOk(aiButton);
            aiButton.dispatchEvent(new FocusEvent('click', { bubbles: true }));
            // This dialog should not be visible on the `generate label` button click since the setting is already on
            assert.isFalse(showFreDialogStub.called, 'Expected FreDialog to be shown but it\'s not shown');
        });
        it('toggles overlays container display', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            overlays.toggleAllOverlaysDisplayed(true);
            await overlays.update();
            assert.strictEqual(container.style.display, 'block');
            overlays.toggleAllOverlaysDisplayed(false);
            await overlays.update();
            assert.strictEqual(container.style.display, 'none');
            overlays.toggleAllOverlaysDisplayed(true);
            await overlays.update();
            assert.strictEqual(container.style.display, 'block');
        });
        it('only renders one TIMESTAMP_MARKER as it is a singleton', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            overlays.add({
                type: 'TIMESTAMP_MARKER',
                timestamp: parsedTrace.Meta.traceBounds.min,
            });
            overlays.add({
                type: 'TIMESTAMP_MARKER',
                timestamp: parsedTrace.Meta.traceBounds.max,
            });
            await overlays.update();
            assert.lengthOf(container.children, 1);
        });
        it('can render provided label for entry label overlay', async function () {
            const { inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50, 'entry label');
            assert.strictEqual(inputField?.innerText, 'entry label');
        });
        it('generates a label when the user clicks "Generate" if the setting is enabled', async function () {
            const { elementsWrapper, inputField, component } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50);
            Common.Settings.moduleSetting('ai-annotations-enabled').set(true);
            const generateButton = elementsWrapper.querySelector('.ai-label-button');
            assert.isOk(generateButton, 'could not find "Generate label" button');
            assert.isTrue(generateButton.classList.contains('enabled'));
            const agent = new AiAssistanceModels.PerformanceAgent({
                aidaClient: mockAidaClient([[{
                            explanation: 'This is an interesting entry',
                            metadata: {
                                rpcGlobalId: 123,
                            }
                        }]])
            });
            component.overrideAIAgentForTest(agent);
            // The Agent call is async, so wait for the change event on the label to ensure the UI is updated.
            const changeEvent = new Promise(resolve => {
                component.addEventListener(Components.EntryLabelOverlay.EntryLabelChangeEvent.eventName, () => resolve(), { once: true });
            });
            dispatchClickEvent(generateButton);
            await RenderCoordinator.done();
            await changeEvent;
            assert.strictEqual(inputField.innerHTML, 'This is an interesting entry');
        });
        it('"Generate label" button does not appear on tracks other than main', async function () {
            const { elementsWrapper } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 0, '', /* isEventOnMainChart */ false);
            const generateButton = elementsWrapper.querySelector('.ai-label-button');
            // The button should not appear next to a network event
            assert.isNotOk(generateButton, 'could not find "Generate label" button');
        });
        it('shows correct tooltip on the `generate ai label` hover for the users with logging enabled', async function () {
            const { elementsWrapper } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50);
            const aiLabelButtonWrapper = elementsWrapper.querySelector('.ai-label-button-wrapper');
            assert.isOk(aiLabelButtonWrapper);
            const tooltip = aiLabelButtonWrapper.querySelector('devtools-tooltip');
            assert.isOk(tooltip);
            assert.strictEqual(cleanTextContent(tooltip.innerText), 'The selected call stack is sent to Google. The content you submit and that is generated by this feature will be used to improve Google’s AI models. This is an experimental AI feature and won’t always get it right. Learn more in settings');
        });
        it('does not show the AI button if there is already a label', async function () {
            const { elementsWrapper } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50, 'initial entry label');
            const aiLabelButtonWrapper = elementsWrapper.querySelector('.ai-label-button-wrapper');
            assert.isNull(aiLabelButtonWrapper);
        });
        it('shows correct tooltip text on `generate ai label` hover for the users with logging disabled', async function () {
            updateHostConfig({
                aidaAvailability: {
                    enabled: true,
                    blockedByAge: false,
                    blockedByEnterprisePolicy: false,
                    blockedByGeo: false,
                    disallowLogging: true,
                    enterprisePolicyValue: 1,
                },
            });
            const { elementsWrapper } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50);
            const aiLabelButtonWrapper = elementsWrapper.querySelector('.ai-label-button-wrapper');
            assert.isOk(aiLabelButtonWrapper);
            const tooltip = aiLabelButtonWrapper.querySelector('devtools-tooltip');
            assert.isOk(tooltip);
            assert.strictEqual(cleanTextContent(tooltip.innerText), 'The selected call stack is sent to Google. The content you submit and that is generated by this feature will not be used to improve Google’s AI models. This is an experimental AI feature and won’t always get it right. Learn more in settings');
        });
        it('Does not show `generate ai label` button if the label is not empty', async function () {
            updateHostConfig({
                aidaAvailability: {
                    enabled: false,
                    blockedByAge: true,
                    blockedByEnterprisePolicy: false,
                    blockedByGeo: false,
                    disallowLogging: true,
                    enterprisePolicyValue: 1,
                },
            });
            const { elementsWrapper, inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50, 'entry label');
            assert.strictEqual(inputField?.innerText, 'entry label');
            const aiLabelButtonWrapper = elementsWrapper.querySelector('.ai-label-disabled-button-wrapper');
            // Button should not exist
            assert.isNotOk(aiLabelButtonWrapper);
        });
        it('Shows the `generate ai label` button if the label is empty', async function () {
            updateHostConfig({
                aidaAvailability: {
                    enabled: false,
                    blockedByAge: true,
                    blockedByEnterprisePolicy: false,
                    blockedByGeo: false,
                    disallowLogging: true,
                    enterprisePolicyValue: 1,
                },
            });
            const { elementsWrapper, inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50, '');
            assert.strictEqual(inputField?.innerText, '');
            const aiLabelButtonWrapper = elementsWrapper.querySelector('.ai-label-disabled-button-wrapper');
            assert.isOk(aiLabelButtonWrapper);
        });
        it('Shows disabled `generate ai label` button if the user is not logged into their google account or is under 18', async function () {
            updateHostConfig({
                aidaAvailability: {
                    enabled: false,
                    blockedByAge: true,
                    blockedByEnterprisePolicy: false,
                    blockedByGeo: false,
                    disallowLogging: true,
                    enterprisePolicyValue: 1,
                },
            });
            const { elementsWrapper, inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50, '');
            assert.strictEqual(inputField?.innerText, '');
            const aiLabelButtonWrapper = elementsWrapper.querySelector('.ai-label-disabled-button-wrapper');
            assert.isOk(aiLabelButtonWrapper);
            const tooltip = aiLabelButtonWrapper.querySelector('devtools-tooltip');
            assert.isOk(tooltip);
            assert.strictEqual(cleanTextContent(tooltip.innerText), 'Auto annotations are not available. Learn more in settings');
        });
        it('Shows disabled `generate ai label` button if the user is in an unsupported location', async function () {
            updateHostConfig({
                aidaAvailability: {
                    enabled: false,
                    blockedByAge: false,
                    blockedByEnterprisePolicy: false,
                    blockedByGeo: true,
                    disallowLogging: true,
                    enterprisePolicyValue: 1,
                },
            });
            const { elementsWrapper, inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50, '');
            assert.strictEqual(inputField?.innerText, '');
            const aiLabelButtonWrapper = elementsWrapper.querySelector('.ai-label-disabled-button-wrapper');
            assert.isOk(aiLabelButtonWrapper);
            const tooltip = aiLabelButtonWrapper.querySelector('devtools-tooltip');
            assert.isOk(tooltip);
            assert.strictEqual(cleanTextContent(tooltip.innerText), 'Auto annotations are not available. Learn more in settings');
        });
        it('Does not show the `generate ai label` button for enterprise users with disabled AI features', async function () {
            updateHostConfig({
                aidaAvailability: {
                    enabled: false,
                    blockedByAge: false,
                    blockedByEnterprisePolicy: true,
                    blockedByGeo: false,
                    disallowLogging: true,
                    enterprisePolicyValue: 2,
                },
            });
            const { elementsWrapper, inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50, 'entry label');
            assert.strictEqual(inputField?.innerText, 'entry label');
            const aiLabelButtonWrapper = elementsWrapper.querySelector('.ai-label-button-wrapper');
            // Button should not exist
            assert.isNotOk(aiLabelButtonWrapper);
        });
        it('Inputting `Enter`into label overlay makes it non-editable', async function () {
            const { inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50, 'label');
            // Double click on the label box to make it editable and focus on it
            inputField.dispatchEvent(new FocusEvent('dblclick', { bubbles: true }));
            // Ensure the label content is editable
            assert.isTrue(inputField.isContentEditable);
            // Press `Enter` to make the label not editable
            inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true, bubbles: true }));
            // Ensure the label content is not editable
            assert.isFalse(inputField.isContentEditable);
        });
        it('Inputting `Enter` into time range label field when the label is empty removes the overlay', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            // Create a time range overlay with an empty label
            overlays.add({
                type: 'TIME_RANGE',
                label: '',
                showDuration: true,
                // Make this overlay the entire span of the trace
                bounds: parsedTrace.Meta.traceBounds,
            });
            await overlays.update();
            // Ensure that the overlay was created.
            const overlayDOM = container.querySelector('.overlay-type-TIME_RANGE');
            assert.isOk(overlayDOM);
            const component = overlayDOM?.querySelector('devtools-time-range-overlay');
            assert.isOk(component?.shadowRoot);
            component.connectedCallback();
            const rangeContainer = component.shadowRoot.querySelector('.range-container');
            assert.isOk(rangeContainer);
            const labelBox = rangeContainer.querySelector('.label-text');
            assert.isOk(labelBox);
            // Double click on the label box to make it editable and focus on it
            labelBox.dispatchEvent(new FocusEvent('dblclick', { bubbles: true }));
            // Press `Enter` on the label field
            labelBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true, bubbles: true }));
            // Ensure that the entry overlay has been removed because it was saved empty
            assert.lengthOf(overlays.overlaysOfType('TIME_RANGE'), 0);
        });
        it('Inputting `Enter` into time range label field when the label is not empty does not remove the overlay', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            // Create a time range overlay with a label
            overlays.add({
                type: 'TIME_RANGE',
                label: 'label',
                showDuration: true,
                // Make this overlay the entire span of the trace
                bounds: parsedTrace.Meta.traceBounds,
            });
            await overlays.update();
            // Ensure that the overlay was created.
            const overlayDOM = container.querySelector('.overlay-type-TIME_RANGE');
            assert.isOk(overlayDOM);
            const component = overlayDOM?.querySelector('devtools-time-range-overlay');
            assert.isOk(component?.shadowRoot);
            component.connectedCallback();
            const rangeContainer = component.shadowRoot.querySelector('.range-container');
            assert.isOk(rangeContainer);
            const labelBox = rangeContainer.querySelector('.label-text');
            assert.isOk(labelBox);
            // Double click on the label box to make it editable and focus on it
            labelBox.dispatchEvent(new FocusEvent('dblclick', { bubbles: true }));
            // Press `Enter` on the label field
            labelBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true, bubbles: true }));
            // Ensure that the entry overlay has not been because it was has a non-empty label
            assert.lengthOf(overlays.overlaysOfType('TIME_RANGE'), 1);
        });
        it('Can create multiple Time Range Overlays for Time Range annotations', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            Timeline.ModificationsManager.ModificationsManager.activeManager()?.createAnnotation({
                type: 'TIME_RANGE',
                label: 'label',
                bounds: parsedTrace.Meta.traceBounds,
            });
            Timeline.ModificationsManager.ModificationsManager.activeManager()?.createAnnotation({
                type: 'TIME_RANGE',
                label: 'label2',
                bounds: parsedTrace.Meta.traceBounds,
            });
            await overlays.update();
            assert.lengthOf(overlays.overlaysOfType('TIME_RANGE'), 2);
        });
        it('removes empty label if it is empty when it loses focus', async function () {
            const { inputField, overlays, event } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50);
            // Double click on the label box to make it editable and focus on it
            inputField.dispatchEvent(new FocusEvent('dblclick', { bubbles: true }));
            // Ensure that the entry has 1 overlay
            assert.lengthOf(overlays.overlaysForEntry(event), 1);
            // Change the content to not editable by changing the element blur like when clicking outside of it.
            // The label is empty since no initial value was passed into it and no characters were entered.
            inputField.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
            await doubleRaf();
            // Ensure that the entry overlay has been removed because it was saved empty
            assert.lengthOf(overlays.overlaysForEntry(event), 0);
        });
        it('Update label overlay when the label changes', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            // Create an entry label overlay
            Timeline.ModificationsManager.ModificationsManager.activeManager()?.createAnnotation({
                type: 'ENTRY_LABEL',
                entry: event,
                label: '',
            });
            await overlays.update();
            // Ensure that the overlay was created.
            const overlayDOM = container.querySelector('.overlay-type-ENTRY_LABEL');
            assert.isOk(overlayDOM);
            const component = overlayDOM?.querySelector('devtools-entry-label-overlay');
            assert.isOk(component?.shadowRoot);
            component.connectedCallback();
            component.dispatchEvent(new Components.EntryLabelOverlay.EntryLabelChangeEvent('new label'));
            const updatedOverlay = overlays.overlaysForEntry(event)[0];
            assert.isOk(updatedOverlay);
            // Make sure the label was updated in the Overlay Object
            assert.strictEqual(updatedOverlay.label, 'new label');
        });
        it('creates an overlay for a time range when an time range annotation is created', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            // Since TIME_RANGE is AnnotationOverlay, create it through ModificationsManager
            Timeline.ModificationsManager.ModificationsManager.activeManager()?.createAnnotation({
                type: 'TIME_RANGE',
                label: '',
                // Make this overlay the entire span of the trace
                bounds: parsedTrace.Meta.traceBounds,
            });
            await overlays.update();
            const overlayDOM = container.querySelector('.overlay-type-TIME_RANGE');
            assert.isOk(overlayDOM);
        });
        it('can render an overlay for a time range', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            overlays.add({
                type: 'TIME_RANGE',
                label: '',
                showDuration: true,
                // Make this overlay the entire span of the trace
                bounds: parsedTrace.Meta.traceBounds,
            });
            await overlays.update();
            const overlayDOM = container.querySelector('.overlay-type-TIME_RANGE');
            assert.isOk(overlayDOM);
        });
        it('can update a time range overlay with new bounds', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const rangeOverlay = overlays.add({
                type: 'TIME_RANGE',
                label: '',
                showDuration: true,
                // Make this overlay the entire span of the trace
                bounds: parsedTrace.Meta.traceBounds,
            });
            await overlays.update();
            const overlayDOM = container.querySelector('.overlay-type-TIME_RANGE');
            assert.isOk(overlayDOM);
            const firstWidth = window.parseInt(overlayDOM.style.width);
            // change the bounds so the new min is +1second of time.
            const newBounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(Trace.Types.Timing.Micro(rangeOverlay.bounds.min + (1_000 * 1_000)), rangeOverlay.bounds.max);
            overlays.updateExisting(rangeOverlay, { bounds: newBounds });
            await overlays.update();
            const secondWidth = window.parseInt(overlayDOM.style.width);
            // The new time range is smaller so the DOM element should have less width
            assert.isTrue(secondWidth < firstWidth);
        });
        it('renders the overlay for a selected layout shift entry correctly', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'cls-single-frame.json.gz');
            const { overlays, container } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const layoutShiftEvent = parsedTrace.LayoutShifts.clusters.at(0)?.events.at(0);
            if (!layoutShiftEvent) {
                throw new Error('layoutShiftEvent was unexpectedly undefined');
            }
            overlays.add({
                type: 'ENTRY_SELECTED',
                entry: layoutShiftEvent,
            });
            const boundsRange = Trace.Types.Timing.Micro(20_000);
            const boundsMax = Trace.Types.Timing.Micro(layoutShiftEvent.ts + boundsRange);
            overlays.updateVisibleWindow({ min: layoutShiftEvent.ts, max: boundsMax, range: boundsRange });
            await overlays.update();
            const overlayDOM = container.querySelector('.overlay-type-ENTRY_SELECTED');
            assert.isOk(overlayDOM);
            assert.strictEqual(window.parseInt(overlayDOM.style.width), 17);
        });
        it('renders the duration and label for a time range overlay', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            overlays.add({
                type: 'TIME_RANGE',
                label: '',
                showDuration: true,
                // Make this overlay the entire span of the trace
                bounds: parsedTrace.Meta.traceBounds,
            });
            await overlays.update();
            await RenderCoordinator.done();
            const overlayDOM = container.querySelector('.overlay-type-TIME_RANGE');
            const component = overlayDOM?.querySelector('devtools-time-range-overlay');
            assert.isOk(component?.shadowRoot);
            const rangeContainer = component.shadowRoot.querySelector('.range-container');
            assert.isOk(rangeContainer);
            const duration = rangeContainer.querySelector('.duration');
            assert.isOk(duration);
            assert.strictEqual(duration?.innerText, '1.26\xA0s');
        });
        it('can remove an overlay', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            const selectedOverlay = overlays.add({
                type: 'ENTRY_SELECTED',
                entry: event,
            });
            await overlays.update();
            assert.lengthOf(container.children, 1);
            overlays.remove(selectedOverlay);
            await overlays.update();
            assert.lengthOf(container.children, 0);
        });
        it('can render an entry selected overlay for a frame', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev-with-commit.json.gz');
            const { overlays, container, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const timelineFrame = charts.mainProvider.eventByIndex?.(5);
            assert.isOk(timelineFrame);
            overlays.add({
                type: 'ENTRY_SELECTED',
                entry: timelineFrame,
            });
            await overlays.update();
            // Ensure that the overlay was created.
            const overlayDOM = container.querySelector('.overlay-type-ENTRY_SELECTED');
            assert.isOk(overlayDOM);
        });
        it('can return a list of overlays for an entry', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { overlays, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            overlays.add({
                type: 'ENTRY_SELECTED',
                entry: event,
            });
            const existingOverlays = overlays.overlaysForEntry(event);
            assert.deepEqual(existingOverlays, [{
                    type: 'ENTRY_SELECTED',
                    entry: event,
                }]);
        });
        it('can delete overlays and remove them from the DOM', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev.json.gz');
            const { container, overlays, charts } = setupChartWithDimensionsAndAnnotationOverlayListeners(parsedTrace);
            const event = charts.mainProvider.eventByIndex?.(50);
            assert.isOk(event);
            overlays.add({
                type: 'ENTRY_SELECTED',
                entry: event,
            });
            await overlays.update();
            assert.lengthOf(container.children, 1);
            const removedCount = overlays.removeOverlaysOfType('ENTRY_SELECTED');
            assert.strictEqual(removedCount, 1);
            assert.lengthOf(container.children, 0);
        });
        it('the label entry field is editable when created without initial label', async function () {
            const { inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50);
            // The label input box should be editable after it is created and before anything else happened
            assert.isTrue(inputField.isContentEditable);
        });
        it('the label entry field is in focus after being double clicked on', async function () {
            const { inputField } = await createAnnotationsLabelElement(this, 'web-dev.json.gz', 50);
            // The label input box should be editable after it is created and before anything else happened
            assert.isTrue(inputField.isContentEditable);
            // Make the content to editable by changing the element blur like when clicking outside of it.
            // When that happens, the content should be set to not editable.
            inputField.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
            await doubleRaf();
            assert.isFalse(inputField.isContentEditable);
            // Double click on the label to make it editable again
            inputField.dispatchEvent(new FocusEvent('dblclick', { bubbles: true }));
            assert.isTrue(inputField.isContentEditable);
        });
    });
    describe('traceWindowContainingOverlays', () => {
        it('calculates the smallest window that fits the overlay inside', () => {
            const FAKE_EVENT_1 = {
                ts: 0,
                dur: 10,
            };
            const FAKE_EVENT_2 = {
                ts: 5,
                dur: 100,
            };
            const overlay1 = {
                entry: FAKE_EVENT_1,
                type: 'ENTRY_OUTLINE',
                outlineReason: 'INFO',
            };
            const overlay2 = {
                entry: FAKE_EVENT_2,
                type: 'ENTRY_OUTLINE',
                outlineReason: 'INFO',
            };
            const traceWindow = Overlays.Overlays.traceWindowContainingOverlays([overlay1, overlay2]);
            if (!traceWindow) {
                throw new Error('No trace window for overlays');
            }
            assert.strictEqual(traceWindow.min, 0);
            assert.strictEqual(traceWindow.max, 105);
        });
        it('returns null for no overlays', () => {
            const traceWindow = Overlays.Overlays.traceWindowContainingOverlays([]);
            assert.isNull(traceWindow);
        });
    });
    describe('jslogcontext for overlays', () => {
        const FAKE_EVENT = {
            ts: 0,
            dur: 10,
        };
        it('does not define a log for an entry_selected overlay', () => {
            const overlay = {
                type: 'ENTRY_SELECTED',
                entry: FAKE_EVENT,
            };
            const context = Overlays.Overlays.jsLogContext(overlay);
            assert.isNull(context);
        });
        it('defines a log for an entry outline based on its type', () => {
            const overlayInfo = {
                type: 'ENTRY_OUTLINE',
                outlineReason: 'INFO',
                entry: FAKE_EVENT,
            };
            const overlayError = {
                type: 'ENTRY_OUTLINE',
                outlineReason: 'ERROR',
                entry: FAKE_EVENT,
            };
            const infoContext = Overlays.Overlays.jsLogContext(overlayInfo);
            assert.strictEqual(infoContext, 'timeline.overlays.entry-outline-info');
            const errorContext = Overlays.Overlays.jsLogContext(overlayError);
            assert.strictEqual(errorContext, 'timeline.overlays.entry-outline-error');
        });
        it('defines a log for entry labels', () => {
            const overlay = {
                type: 'ENTRY_LABEL',
                entry: FAKE_EVENT,
                label: 'hello world',
            };
            const context = Overlays.Overlays.jsLogContext(overlay);
            assert.strictEqual(context, 'timeline.overlays.entry-label');
        });
        it('defines a log for time ranges', () => {
            const overlay = {
                showDuration: true,
                type: 'TIME_RANGE',
                bounds: microsecondsTraceWindow(1_000, 10_000),
                label: 'hello world',
            };
            const context = Overlays.Overlays.jsLogContext(overlay);
            assert.strictEqual(context, 'timeline.overlays.time-range');
        });
        it('defines a log for timespan breakdowns', () => {
            const overlay = {
                type: 'TIMESPAN_BREAKDOWN',
                sections: [],
            };
            const context = Overlays.Overlays.jsLogContext(overlay);
            assert.strictEqual(context, 'timeline.overlays.timespan-breakdown');
        });
        it('defines a log for cursor timestamp marker', () => {
            const overlay = {
                type: 'TIMESTAMP_MARKER',
                timestamp: 1_000,
            };
            const context = Overlays.Overlays.jsLogContext(overlay);
            assert.strictEqual(context, 'timeline.overlays.cursor-timestamp-marker');
        });
        it('defines a log for candy striped time ranges', () => {
            const overlay = {
                type: 'CANDY_STRIPED_TIME_RANGE',
                bounds: microsecondsTraceWindow(1_000, 10_000),
                entry: FAKE_EVENT,
            };
            const context = Overlays.Overlays.jsLogContext(overlay);
            assert.strictEqual(context, 'timeline.overlays.candy-striped-time-range');
        });
        it('defines a log for entries links but only if they are connected', () => {
            const overlayConnected = {
                type: 'ENTRIES_LINK',
                entryFrom: FAKE_EVENT,
                entryTo: FAKE_EVENT,
                state: "connected" /* Trace.Types.File.EntriesLinkState.CONNECTED */,
            };
            const overlayPending = {
                type: 'ENTRIES_LINK',
                entryFrom: FAKE_EVENT,
                entryTo: undefined,
                state: "pending_to_event" /* Trace.Types.File.EntriesLinkState.PENDING_TO_EVENT */,
            };
            const connectedContext = Overlays.Overlays.jsLogContext(overlayConnected);
            assert.strictEqual(connectedContext, 'timeline.overlays.entries-link');
            const pendingContext = Overlays.Overlays.jsLogContext(overlayPending);
            assert.isNull(pendingContext);
        });
    });
});
//# sourceMappingURL=OverlaysImpl.test.js.map