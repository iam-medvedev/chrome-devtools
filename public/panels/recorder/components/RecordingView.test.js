// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import { dispatchClickEvent, dispatchMouseOverEvent, getEventPromise, renderElementIntoDOM, } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment, setupActionRegistry, } from '../../../testing/EnvironmentHelpers.js';
import { expectCall } from '../../../testing/ExpectStubCall.js';
import * as Menus from '../../../ui/components/menus/menus.js';
import * as RenderCoordinator from '../../../ui/components/render_coordinator/render_coordinator.js';
import * as Converters from '../converters/converters.js';
import * as Models from '../models/models.js';
import * as Components from './components.js';
describeWithEnvironment('RecordingView', () => {
    setupActionRegistry();
    const step = { type: Models.Schema.StepType.Scroll };
    const section = { title: 'test', steps: [step], url: 'https://example.com' };
    const userFlow = { title: 'test', steps: [step] };
    const recorderSettingsMock = {
        preferredCopyFormat: "json" /* Models.ConverterIds.ConverterIds.JSON */,
    };
    async function renderView() {
        const view = new Components.RecordingView.RecordingView();
        recorderSettingsMock.preferredCopyFormat = "json" /* Models.ConverterIds.ConverterIds.JSON */;
        renderElementIntoDOM(view);
        view.data = {
            replayState: { isPlaying: false, isPausedOnBreakpoint: false },
            isRecording: false,
            recordingTogglingInProgress: false,
            recording: userFlow,
            currentStep: undefined,
            currentError: undefined,
            sections: [section],
            settings: undefined,
            recorderSettings: recorderSettingsMock,
            lastReplayResult: undefined,
            replayAllowed: true,
            breakpointIndexes: new Set(),
            builtInConverters: [
                new Converters.JSONConverter.JSONConverter('  '),
                new Converters.PuppeteerReplayConverter.PuppeteerReplayConverter('  '),
            ],
            extensionConverters: [],
            replayExtensions: [],
        };
        await RenderCoordinator.done();
        return view;
    }
    async function waitForTextEditor(view) {
        await getEventPromise(view, 'code-generated');
        const textEditor = view.shadowRoot?.querySelector('devtools-text-editor');
        assert.isNotNull(textEditor);
        return textEditor;
    }
    function hoverOverScrollStep(view) {
        const steps = view.shadowRoot?.querySelectorAll('devtools-step-view') || [];
        assert.lengthOf(steps, 2);
        dispatchMouseOverEvent(steps[1]);
    }
    function clickStep(view) {
        const steps = view.shadowRoot?.querySelectorAll('devtools-step-view') || [];
        assert.lengthOf(steps, 2);
        dispatchClickEvent(steps[1]);
    }
    function dispatchOnStep(view, customEvent) {
        const steps = view.shadowRoot?.querySelectorAll('devtools-step-view') || [];
        assert.lengthOf(steps, 2);
        steps[1].dispatchEvent(customEvent);
    }
    function clickShowCode(view) {
        const button = view.shadowRoot?.querySelector('.show-code');
        assert.isOk(button);
        dispatchClickEvent(button);
    }
    function clickHideCode(view) {
        const button = view.shadowRoot?.querySelector('[title="Hide code"]');
        assert.isOk(button);
        dispatchClickEvent(button);
    }
    async function waitForSplitViewSidebarToBeHidden(view) {
        await getEventPromise(view, 'code-generated');
        const splitView = view.shadowRoot?.querySelector('devtools-split-view');
        assert.strictEqual(splitView?.getAttribute('sidebar-visibility'), 'hidden');
    }
    async function changeCodeView(view) {
        const menu = view.shadowRoot?.querySelector('devtools-select-menu');
        assert.isOk(menu);
        const event = new Menus.SelectMenu.SelectMenuItemSelectedEvent("@puppeteer/replay" /* Models.ConverterIds.ConverterIds.REPLAY */);
        menu.dispatchEvent(event);
    }
    it('should show code and highlight on hover', async () => {
        const view = await renderView();
        clickShowCode(view);
        // Click is handled async, therefore, waiting for the text editor.
        const textEditor = await waitForTextEditor(view);
        assert.deepEqual(textEditor.editor.state.selection.toJSON(), {
            ranges: [{ anchor: 0, head: 0 }],
            main: 0,
        });
        hoverOverScrollStep(view);
        assert.deepEqual(textEditor.editor.state.selection.toJSON(), {
            ranges: [{ anchor: 34, head: 68 }],
            main: 0,
        });
    });
    it('should close code', async () => {
        const view = await renderView();
        clickShowCode(view);
        // Click is handled async, therefore, waiting for the text editor.
        await waitForTextEditor(view);
        clickHideCode(view);
        // Click is handled async, therefore, waiting for split view to be removed.
        await waitForSplitViewSidebarToBeHidden(view);
    });
    it('should copy the recording to clipboard via copy event', async () => {
        await renderView();
        const clipboardData = new DataTransfer();
        const copyText = expectCall(sinon.stub(Host.InspectorFrontendHost.InspectorFrontendHostInstance, 'copyText'));
        const event = new ClipboardEvent('copy', { clipboardData, bubbles: true });
        document.body.dispatchEvent(event);
        const [text] = await copyText;
        assert.strictEqual(JSON.stringify(userFlow, null, 2) + '\n', text);
    });
    it('should copy a step to clipboard via copy event', async () => {
        const view = await renderView();
        clickStep(view);
        const clipboardData = new DataTransfer();
        const isCalled = sinon.promise();
        const copyText = sinon
            .stub(Host.InspectorFrontendHost.InspectorFrontendHostInstance, 'copyText')
            .callsFake(() => {
            void isCalled.resolve(true);
        });
        const event = new ClipboardEvent('copy', { clipboardData, bubbles: true });
        document.body.dispatchEvent(event);
        await isCalled;
        sinon.assert.calledWith(copyText, JSON.stringify(step, null, 2) + '\n');
    });
    it('should copy a step to clipboard via custom event', async () => {
        const view = await renderView();
        const isCalled = sinon.promise();
        const copyText = sinon
            .stub(Host.InspectorFrontendHost.InspectorFrontendHostInstance, 'copyText')
            .callsFake(() => {
            void isCalled.resolve(true);
        });
        const event = new Components.StepView.CopyStepEvent(step);
        dispatchOnStep(view, event);
        await isCalled;
        sinon.assert.calledWith(copyText, JSON.stringify(step, null, 2) + '\n');
    });
    it('should show code and change preferred copy method', async () => {
        const view = await renderView();
        clickShowCode(view);
        await waitForTextEditor(view);
        await changeCodeView(view);
        await waitForTextEditor(view);
        assert.notEqual(recorderSettingsMock.preferredCopyFormat, "json" /* Models.ConverterIds.ConverterIds.JSON */);
    });
});
//# sourceMappingURL=RecordingView.test.js.map