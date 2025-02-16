// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import { dispatchClickEvent } from '../../testing/DOMHelpers.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Resources from './application.js';
describeWithMockConnection('BackgroundServiceView', () => {
    const testKey = 'test-storage-key';
    const serviceName = "backgroundFetch" /* Protocol.BackgroundService.ServiceName.BackgroundFetch */;
    let target;
    let backgroundServiceModel;
    let manager;
    let view;
    beforeEach(() => {
        target = createTarget();
        backgroundServiceModel = target.model(Resources.BackgroundServiceModel.BackgroundServiceModel);
        manager = target.model(SDK.StorageKeyManager.StorageKeyManager);
        UI.ActionRegistration.maybeRemoveActionExtension('background-service.toggle-recording');
        UI.ActionRegistration.registerActionExtension({
            actionId: 'background-service.toggle-recording',
            category: "BACKGROUND_SERVICES" /* UI.ActionRegistration.ActionCategory.BACKGROUND_SERVICES */,
            title: () => 'mock',
            toggleable: true,
        });
        sinon.stub(UI.ShortcutRegistry.ShortcutRegistry, 'instance').returns({
            shortcutTitleForAction: () => { },
            shortcutsForAction: () => [new UI.KeyboardShortcut.KeyboardShortcut([{ key: UI.KeyboardShortcut.Keys.Ctrl.code, name: 'Ctrl' }], '', "DefaultShortcut" /* UI.KeyboardShortcut.Type.DEFAULT_SHORTCUT */)],
        });
        assert.exists(backgroundServiceModel);
        view = new Resources.BackgroundServiceView.BackgroundServiceView(serviceName, backgroundServiceModel);
    });
    afterEach(() => {
        UI.ActionRegistration.maybeRemoveActionExtension('background-service.toggle-recording');
    });
    it('updates event list when main storage key changes', () => {
        assert.exists(backgroundServiceModel);
        assert.exists(manager);
        backgroundServiceModel.backgroundServiceEventReceived({
            backgroundServiceEvent: {
                timestamp: 1556889085, // 2019-05-03 14:11:25.000.
                origin: '',
                storageKey: testKey,
                serviceWorkerRegistrationId: 42, // invalid.
                service: serviceName,
                eventName: 'Event1',
                instanceId: 'Instance1',
                eventMetadata: [],
            },
        });
        manager.updateStorageKeys(new Set([testKey]));
        manager.setMainStorageKey(testKey);
        const dataRow = view.getDataGrid().dataTableBody.getElementsByClassName('data-grid-data-grid-node')[0];
        const expectedData = ['Event1', testKey, 'Instance1'];
        const actualData = [
            dataRow.getElementsByClassName('event-name-column')[0].textContent,
            dataRow.getElementsByClassName('storage-key-column')[0].textContent,
            dataRow.getElementsByClassName('instance-id-column')[0].textContent,
        ];
        assert.deepEqual(actualData, expectedData);
    });
    it('shows placeholder text', () => {
        assert.isNotNull(view.contentElement.querySelector('.empty-state'));
        const header = view.contentElement.querySelector('.empty-state-header')?.textContent;
        const description = view.contentElement.querySelector('.empty-state-description')?.textContent;
        assert.deepEqual(header, 'No recording yet');
        assert.deepEqual(description, 'Start to debug background services by using the "Start recording events" button or by hitting Ctrl.Learn more');
    });
    it('Triggers record on button click', async () => {
        const recordButton = view.contentElement.querySelector('.empty-state devtools-button');
        Platform.assertNotNullOrUndefined(recordButton);
        assert.deepEqual(recordButton?.textContent, 'Start recording events');
        const recordingSpy = sinon.spy(view, 'toggleRecording');
        dispatchClickEvent(recordButton);
        assert.isTrue(recordingSpy.calledOnce);
    });
});
//# sourceMappingURL=BackgroundServiceView.test.js.map