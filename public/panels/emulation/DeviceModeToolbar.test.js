// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as EmulationModel from '../../models/emulation/emulation.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as MobileThrottling from '../mobile_throttling/mobile_throttling.js';
import * as Emulation from './emulation.js';
function createFakeSetting(defaultValue) {
    let value = defaultValue;
    return {
        get: () => value,
        set: (v) => {
            value = v;
        },
        addChangeListener: () => { },
        removeChangeListener: () => { },
        setDisabled: () => { },
        setTitle: () => { },
        title: () => '',
        asRegExp: () => null,
        type: () => "boolean" /* Common.Settings.SettingType.BOOLEAN */,
        getAsArray: () => [],
        name: 'fake',
    };
}
describeWithMockConnection('DeviceModeToolbar', () => {
    let target;
    let deviceModeModel;
    let toolbar;
    beforeEach(() => {
        sinon.stub(Common.Settings.Settings, 'instance').returns({
            createSetting: (_name, defaultValue) => createFakeSetting(defaultValue),
            moduleSetting: (_name) => createFakeSetting(false),
            createLocalSetting: (_name, defaultValue) => createFakeSetting(defaultValue),
        });
        const tabTarget = createTarget({ type: SDK.Target.Type.TAB });
        createTarget({ parentTarget: tabTarget, subtype: 'prerender' });
        target = createTarget({ parentTarget: tabTarget });
        deviceModeModel = EmulationModel.DeviceModeModel.DeviceModeModel.instance({ forceNew: true });
        // Stub ThrottlingManager to avoid dependency on network condition settings.
        const fakeMenuButton = new UI.Toolbar.ToolbarMenuButton(() => { }, undefined, undefined, 'throttle-menu');
        sinon.stub(MobileThrottling.ThrottlingManager.ThrottlingManager, 'instance').returns({
            createMobileThrottlingButton: () => fakeMenuButton,
            createSaveDataOverrideSelector: () => fakeMenuButton,
        });
        toolbar = new Emulation.DeviceModeToolbar.DeviceModeToolbar(deviceModeModel, createFakeSetting(false), createFakeSetting(false));
    });
    /**
     * Finds the rotate/screen-rotation toolbar button inside the toolbar element.
     * The button is a devtools-button with jslogContext 'screen-rotation'.
     */
    function findRotateButton() {
        const buttons = toolbar.element().querySelectorAll('devtools-button.toolbar-button');
        const button = [...buttons].find(b => b.jslogContext === 'screen-rotation');
        assert.exists(button, 'Could not find rotate button');
        return button;
    }
    describe('screen orientation lock', () => {
        it('disables the rotate button when screen orientation is locked', () => {
            // Set up responsive mode so the rotate button is initially enabled.
            deviceModeModel.emulate(EmulationModel.DeviceModeModel.Type.Responsive, null, null);
            toolbar.update();
            const modeButton = findRotateButton();
            assert.isFalse(modeButton.disabled, 'rotate button should initially be enabled');
            // Lock orientation.
            const emulationModel = target.model(SDK.EmulationModel.EmulationModel);
            assert.isNotNull(emulationModel);
            emulationModel.screenOrientationLockChanged({
                locked: true,
                orientation: { type: "portraitPrimary" /* Protocol.Emulation.ScreenOrientationType.PortraitPrimary */, angle: 0 },
            });
            toolbar.update();
            assert.isTrue(modeButton.disabled, 'rotate button should be disabled when orientation is locked');
            assert.include(modeButton.title, 'locked');
        });
        it('re-enables the rotate button when screen orientation is unlocked', () => {
            // Set up responsive mode.
            deviceModeModel.emulate(EmulationModel.DeviceModeModel.Type.Responsive, null, null);
            toolbar.update();
            const modeButton = findRotateButton();
            // Lock, then unlock orientation.
            const emulationModel = target.model(SDK.EmulationModel.EmulationModel);
            assert.isNotNull(emulationModel);
            emulationModel.screenOrientationLockChanged({
                locked: true,
                orientation: { type: "portraitPrimary" /* Protocol.Emulation.ScreenOrientationType.PortraitPrimary */, angle: 0 },
            });
            toolbar.update();
            assert.isTrue(modeButton.disabled, 'rotate button should be disabled when locked');
            emulationModel.screenOrientationLockChanged({ locked: false });
            toolbar.update();
            assert.isFalse(modeButton.disabled, 'rotate button should be re-enabled after unlock');
            assert.include(modeButton.title, 'Rotate');
        });
        it('does not rotate when screen orientation is locked and rotate button is clicked', () => {
            // Set up responsive mode.
            deviceModeModel.emulate(EmulationModel.DeviceModeModel.Type.Responsive, null, null);
            toolbar.update();
            // Lock orientation.
            const emulationModel = target.model(SDK.EmulationModel.EmulationModel);
            assert.isNotNull(emulationModel);
            emulationModel.screenOrientationLockChanged({
                locked: true,
                orientation: { type: "portraitPrimary" /* Protocol.Emulation.ScreenOrientationType.PortraitPrimary */, angle: 0 },
            });
            toolbar.update();
            // Spy on setWidth/setHeight to ensure no rotation happens.
            const setWidthSpy = sinon.spy(deviceModeModel, 'setWidth');
            const setHeightSpy = sinon.spy(deviceModeModel, 'setHeight');
            // Click the rotate button.
            const modeButton = findRotateButton();
            modeButton.click();
            sinon.assert.notCalled(setWidthSpy);
            sinon.assert.notCalled(setHeightSpy);
        });
    });
});
//# sourceMappingURL=DeviceModeToolbar.test.js.map