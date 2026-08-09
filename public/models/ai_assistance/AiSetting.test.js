// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as AiAssistance from './ai_assistance.js';
const { SettingsStorage, SettingType, SettingAvailability } = Common.Settings;
const { DisabledReason } = AiAssistance.AiUtils;
const { Events, AiSetting } = AiAssistance.AiSetting;
describe('AiSetting', () => {
    let dummyStorage;
    let settings;
    let hostConfigTracker;
    beforeEach(() => {
        dummyStorage = new SettingsStorage({});
        settings = new Common.Settings.Settings({
            syncedStorage: dummyStorage,
            globalStorage: dummyStorage,
            localStorage: dummyStorage,
            settingRegistrations: [],
            console: new Common.Console.Console(),
        });
        hostConfigTracker = new Host.AidaClient.HostConfigTracker();
        sinon.stub(hostConfigTracker, 'pollAidaAvailability');
    });
    afterEach(() => {
        hostConfigTracker.dispose();
        sinon.restore();
    });
    it('reports disabled=false, unavailable=false, and empty disabledReasons when descriptor is available', () => {
        const descriptor = {
            name: 'test-ai-setting-available',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: true,
            isAvailable: () => ({ status: 1 /* SettingAvailability.AVAILABLE */ }),
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        assert.isFalse(aiSetting.disabled);
        assert.isFalse(aiSetting.unavailable);
        assert.deepEqual(aiSetting.disabledReasons, []);
        assert.isTrue(aiSetting.getIfNotDisabled());
    });
    it('reports disabled=true and returns disabledReasons when descriptor is disabled', () => {
        const descriptor = {
            name: 'test-ai-setting-disabled',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: false,
            isAvailable: () => ({
                status: 3 /* SettingAvailability.DISABLED */,
                reason: ["policy-restricted" /* DisabledReason.POLICY_RESTRICTED */],
            }),
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        assert.isTrue(aiSetting.disabled);
        assert.isFalse(aiSetting.unavailable);
        assert.deepEqual(aiSetting.disabledReasons, ["policy-restricted" /* DisabledReason.POLICY_RESTRICTED */]);
        assert.isUndefined(aiSetting.getIfNotDisabled());
    });
    it('reports unavailable=true when descriptor is unavailable', () => {
        const descriptor = {
            name: 'test-ai-setting-unavailable',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: false,
            isAvailable: () => ({
                status: 2 /* SettingAvailability.UNAVAILABLE */,
                reason: ["not-supported" /* DisabledReason.NOT_SUPPORTED */],
            }),
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        assert.isTrue(aiSetting.unavailable);
        assert.isFalse(aiSetting.disabled);
        assert.deepEqual(aiSetting.disabledReasons, []);
        assert.isUndefined(aiSetting.getIfNotDisabled());
    });
    it('does not modify setting when calling setIfNotDisabled while disabled', () => {
        const descriptor = {
            name: 'test-ai-setting-disabled-set',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: false,
            isAvailable: () => ({
                status: 3 /* SettingAvailability.DISABLED */,
                reason: ["policy-restricted" /* DisabledReason.POLICY_RESTRICTED */],
            }),
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        aiSetting.setIfNotDisabled(true);
        assert.isUndefined(aiSetting.getIfNotDisabled());
    });
    it('updates setting when calling setIfNotDisabled while available', () => {
        const descriptor = {
            name: 'test-ai-setting-set',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: false,
            isAvailable: () => ({ status: 1 /* SettingAvailability.AVAILABLE */ }),
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        assert.isFalse(aiSetting.getIfNotDisabled());
        aiSetting.setIfNotDisabled(true);
        assert.isTrue(aiSetting.getIfNotDisabled());
    });
    it('emits CHANGED event when underlying setting changes', () => {
        const descriptor = {
            name: 'test-ai-setting-changed-event',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: false,
            isAvailable: () => ({ status: 1 /* SettingAvailability.AVAILABLE */ }),
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        const changeListener = sinon.spy();
        aiSetting.addEventListener("Changed" /* Events.CHANGED */, changeListener);
        aiSetting.setIfNotDisabled(true);
        sinon.assert.calledOnce(changeListener);
    });
    it('re-resolves setting and emits CHANGED event when AIDA availability changes', () => {
        let isAvailable = false;
        const descriptor = {
            name: 'test-ai-setting-aida-change',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: false,
            isAvailable: () => {
                if (isAvailable) {
                    return { status: 1 /* SettingAvailability.AVAILABLE */ };
                }
                return {
                    status: 3 /* SettingAvailability.DISABLED */,
                    reason: ["policy-restricted" /* DisabledReason.POLICY_RESTRICTED */],
                };
            },
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        const changeListener = sinon.spy();
        aiSetting.addEventListener("Changed" /* Events.CHANGED */, changeListener);
        assert.isTrue(aiSetting.disabled);
        assert.isUndefined(aiSetting.getIfNotDisabled());
        // Simulate AIDA availability changing to available.
        isAvailable = true;
        hostConfigTracker.dispatchEventToListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
        sinon.assert.calledOnce(changeListener);
        assert.isFalse(aiSetting.disabled);
        assert.isFalse(aiSetting.getIfNotDisabled());
    });
    it('returns default value for getIfNotDisabled if available but not yet stored', () => {
        const descriptor = {
            name: 'test-ai-setting-default-value',
            type: "enum" /* SettingType.ENUM */,
            defaultValue: () => 'computed-default',
            isAvailable: () => ({ status: 1 /* SettingAvailability.AVAILABLE */ }),
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        assert.strictEqual(aiSetting.getIfNotDisabled(), 'computed-default');
    });
    it('does not subscribe to AIDA availability or underlying setting changes upon construction', () => {
        const descriptor = {
            name: 'test-ai-setting-no-sub',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: true,
            isAvailable: () => ({ status: 1 /* SettingAvailability.AVAILABLE */ }),
        };
        const maybeSetting = settings.maybeResolve(descriptor);
        if (!('setting' in maybeSetting)) {
            assert.fail('Unable to resolve setting');
        }
        const addChangeListenerSpy = sinon.spy(maybeSetting.setting, 'addChangeListener');
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        assert.isFalse(hostConfigTracker.hasEventListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */));
        sinon.assert.notCalled(addChangeListenerSpy);
        assert.isTrue(aiSetting.getIfNotDisabled());
    });
    it('subscribes to AIDA availability and setting changes when the first event listener is added', () => {
        const descriptor = {
            name: 'test-ai-setting-sub',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: true,
            isAvailable: () => ({ status: 1 /* SettingAvailability.AVAILABLE */ }),
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        const setting = settings.settingForTest('test-ai-setting-sub');
        const addChangeListenerSpy = sinon.spy(setting, 'addChangeListener');
        assert.isFalse(hostConfigTracker.hasEventListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */));
        const listener1 = sinon.spy();
        aiSetting.addEventListener("Changed" /* Events.CHANGED */, listener1);
        assert.isTrue(hostConfigTracker.hasEventListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */));
        sinon.assert.calledOnce(addChangeListenerSpy);
        // Adding a second listener should not add duplicate listeners.
        const listener2 = sinon.spy();
        aiSetting.addEventListener("Changed" /* Events.CHANGED */, listener2);
        sinon.assert.calledOnce(addChangeListenerSpy);
    });
    it('unsubscribes from AIDA availability and setting changes when the last event listener is removed', () => {
        const descriptor = {
            name: 'test-ai-setting-unsub',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: true,
            isAvailable: () => ({ status: 1 /* SettingAvailability.AVAILABLE */ }),
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        const setting = settings.settingForTest('test-ai-setting-unsub');
        const removeChangeListenerSpy = sinon.spy(setting, 'removeChangeListener');
        const listener1 = sinon.spy();
        const listener2 = sinon.spy();
        aiSetting.addEventListener("Changed" /* Events.CHANGED */, listener1);
        aiSetting.addEventListener("Changed" /* Events.CHANGED */, listener2);
        aiSetting.removeEventListener("Changed" /* Events.CHANGED */, listener1);
        assert.isTrue(hostConfigTracker.hasEventListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */));
        sinon.assert.notCalled(removeChangeListenerSpy);
        aiSetting.removeEventListener("Changed" /* Events.CHANGED */, listener2);
        assert.isFalse(hostConfigTracker.hasEventListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */));
        sinon.assert.calledOnce(removeChangeListenerSpy);
    });
    it('subscribes to newly resolved setting when AIDA availability changes while subscribed', () => {
        let isAvailable = false;
        const descriptor = {
            name: 'test-ai-setting-aida-sub-change',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: false,
            isAvailable: () => {
                if (isAvailable) {
                    return { status: 1 /* SettingAvailability.AVAILABLE */ };
                }
                return {
                    status: 3 /* SettingAvailability.DISABLED */,
                    reason: ["policy-restricted" /* DisabledReason.POLICY_RESTRICTED */],
                };
            },
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        const changeListener = sinon.spy();
        aiSetting.addEventListener("Changed" /* Events.CHANGED */, changeListener);
        assert.isTrue(hostConfigTracker.hasEventListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */));
        // Simulate AIDA availability changing to available.
        isAvailable = true;
        hostConfigTracker.dispatchEventToListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
        const setting = settings.settingForTest('test-ai-setting-aida-sub-change');
        changeListener.resetHistory();
        setting.set(true);
        sinon.assert.calledOnce(changeListener);
    });
    it('unsubscribes from the old setting when AIDA availability goes away while subscribed', () => {
        let isAvailable = true;
        const descriptor = {
            name: 'test-ai-setting-aida-unsub-change',
            type: "boolean" /* SettingType.BOOLEAN */,
            defaultValue: false,
            isAvailable: () => {
                if (isAvailable) {
                    return { status: 1 /* SettingAvailability.AVAILABLE */ };
                }
                return {
                    status: 3 /* SettingAvailability.DISABLED */,
                    reason: ["policy-restricted" /* DisabledReason.POLICY_RESTRICTED */],
                };
            },
        };
        const aiSetting = new AiSetting(descriptor, hostConfigTracker, settings);
        const setting = settings.settingForTest('test-ai-setting-aida-unsub-change');
        const removeChangeListenerSpy = sinon.spy(setting, 'removeChangeListener');
        const changeListener = sinon.spy();
        aiSetting.addEventListener("Changed" /* Events.CHANGED */, changeListener);
        // Simulate AIDA availability changing to disabled.
        isAvailable = false;
        hostConfigTracker.dispatchEventToListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, "no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */);
        sinon.assert.calledOnce(removeChangeListenerSpy);
        assert.isUndefined(aiSetting.getIfNotDisabled());
    });
});
//# sourceMappingURL=AiSetting.test.js.map