// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment, setupActionRegistry, } from '../../../testing/EnvironmentHelpers.js';
import * as RenderCoordinator from '../../../ui/components/render_coordinator/render_coordinator.js';
import * as Models from '../models/models.js';
import * as RecorderComponents from './components.js';
describeWithEnvironment('ReplaySection', () => {
    setupActionRegistry();
    let settings;
    async function createReplaySection() {
        settings = new Models.RecorderSettings.RecorderSettings();
        const component = new RecorderComponents.ReplaySection.ReplaySection();
        component.data = { settings, replayExtensions: [] };
        renderElementIntoDOM(component);
        await RenderCoordinator.done();
        return component;
    }
    afterEach(() => {
        settings.speed = "normal" /* Models.RecordingPlayer.PlayRecordingSpeed.NORMAL */;
    });
    it('should change the button value when another option is selected in select menu', async () => {
        const component = await createReplaySection();
        const selectButton = component.shadowRoot?.querySelector('devtools-select-button');
        assert.strictEqual(selectButton?.value, "normal" /* Models.RecordingPlayer.PlayRecordingSpeed.NORMAL */);
        selectButton?.dispatchEvent(new RecorderComponents.SelectButton.SelectMenuSelectedEvent("slow" /* Models.RecordingPlayer.PlayRecordingSpeed.SLOW */));
        await RenderCoordinator.done();
        assert.strictEqual(selectButton?.value, "slow" /* Models.RecordingPlayer.PlayRecordingSpeed.SLOW */);
    });
    it('should emit startreplayevent on selectbuttonclick event', async () => {
        const component = await createReplaySection();
        const onceClicked = new Promise(resolve => {
            component.addEventListener('startreplay', resolve, { once: true });
        });
        const selectButton = component.shadowRoot?.querySelector('devtools-select-button');
        selectButton?.dispatchEvent(new RecorderComponents.SelectButton.SelectMenuSelectedEvent("slow" /* Models.RecordingPlayer.PlayRecordingSpeed.SLOW */));
        selectButton?.dispatchEvent(new RecorderComponents.SelectButton.SelectButtonClickEvent());
        const event = await onceClicked;
        assert.deepEqual(event.speed, "slow" /* Models.RecordingPlayer.PlayRecordingSpeed.SLOW */);
    });
    it('should save the changed button when option is selected in select menu', async () => {
        const component = await createReplaySection();
        const selectButton = component.shadowRoot?.querySelector('devtools-select-button');
        selectButton?.dispatchEvent(new RecorderComponents.SelectButton.SelectMenuSelectedEvent("slow" /* Models.RecordingPlayer.PlayRecordingSpeed.SLOW */));
        assert.strictEqual(settings.speed, "slow" /* Models.RecordingPlayer.PlayRecordingSpeed.SLOW */);
    });
    it('should load the saved button on initial render', async () => {
        settings.speed = "slow" /* Models.RecordingPlayer.PlayRecordingSpeed.SLOW */;
        const component = await createReplaySection();
        const selectButton = component.shadowRoot?.querySelector('devtools-select-button');
        assert.strictEqual(selectButton?.value, "slow" /* Models.RecordingPlayer.PlayRecordingSpeed.SLOW */);
    });
});
//# sourceMappingURL=ReplaySection.test.js.map