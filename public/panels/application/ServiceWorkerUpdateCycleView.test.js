// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { describeWithLocale } from '../../testing/EnvironmentHelpers.js';
import * as Resources from './application.js';
var View = Resources.ServiceWorkerUpdateCycleView;
describeWithLocale('ServiceWorkerUpdateCycleView', () => {
    let versionId = 0;
    const registrationId = 'fake-sw-id';
    it('calculates update cycle ranges', () => {
        const payload = { registrationId, scopeURL: '', isDeleted: false };
        const registration = new SDK.ServiceWorkerManager.ServiceWorkerRegistration(payload);
        let view = new View.ServiceWorkerUpdateCycleView(registration);
        let ranges = view.calculateServiceWorkerUpdateRanges();
        assert.lengthOf(ranges, 0, 'A nascent registration has no ranges to display.');
        versionId++;
        let versionPayload = {
            registrationId,
            versionId: versionId.toString(),
            scriptURL: '',
            status: "new" /* Protocol.ServiceWorker.ServiceWorkerVersionStatus.New */,
            runningStatus: "starting" /* Protocol.ServiceWorker.ServiceWorkerVersionRunningStatus.Starting */,
        };
        registration.updateVersion(versionPayload);
        view = new View.ServiceWorkerUpdateCycleView(registration);
        ranges = view.calculateServiceWorkerUpdateRanges();
        assert.lengthOf(ranges, 0, 'A new registration has no ranges to display.');
        versionId++;
        versionPayload = {
            registrationId,
            versionId: versionId.toString(),
            scriptURL: '',
            status: "installing" /* Protocol.ServiceWorker.ServiceWorkerVersionStatus.Installing */,
            runningStatus: "running" /* Protocol.ServiceWorker.ServiceWorkerVersionRunningStatus.Running */,
        };
        registration.updateVersion(versionPayload);
        view = new View.ServiceWorkerUpdateCycleView(registration);
        ranges = view.calculateServiceWorkerUpdateRanges();
        assert.lengthOf(ranges, 1, 'An installing registration has a range to display.');
        versionId++;
        versionPayload = {
            registrationId,
            versionId: versionId.toString(),
            scriptURL: '',
            status: "installing" /* Protocol.ServiceWorker.ServiceWorkerVersionStatus.Installing */,
            runningStatus: "running" /* Protocol.ServiceWorker.ServiceWorkerVersionRunningStatus.Running */,
        };
        registration.updateVersion(versionPayload);
        view = new View.ServiceWorkerUpdateCycleView(registration);
        ranges = view.calculateServiceWorkerUpdateRanges();
        assert.lengthOf(ranges, 1, 'An installing registration (reported multiple times) has a range to display.');
        versionId++;
        versionPayload = {
            registrationId,
            versionId: versionId.toString(),
            scriptURL: '',
            status: "installed" /* Protocol.ServiceWorker.ServiceWorkerVersionStatus.Installed */,
            runningStatus: "running" /* Protocol.ServiceWorker.ServiceWorkerVersionRunningStatus.Running */,
        };
        registration.updateVersion(versionPayload);
        view = new View.ServiceWorkerUpdateCycleView(registration);
        ranges = view.calculateServiceWorkerUpdateRanges();
        assert.lengthOf(ranges, 1, 'An installed registration has a range to display. ');
        versionId++;
        versionPayload = {
            registrationId,
            versionId: versionId.toString(),
            scriptURL: '',
            status: "activating" /* Protocol.ServiceWorker.ServiceWorkerVersionStatus.Activating */,
            runningStatus: "running" /* Protocol.ServiceWorker.ServiceWorkerVersionRunningStatus.Running */,
        };
        registration.updateVersion(versionPayload);
        view = new View.ServiceWorkerUpdateCycleView(registration);
        ranges = view.calculateServiceWorkerUpdateRanges();
        assert.lengthOf(ranges, 3, 'An activating registration has ranges to display.');
        versionId++;
        versionPayload = {
            registrationId,
            versionId: versionId.toString(),
            scriptURL: '',
            status: "activating" /* Protocol.ServiceWorker.ServiceWorkerVersionStatus.Activating */,
            runningStatus: "running" /* Protocol.ServiceWorker.ServiceWorkerVersionRunningStatus.Running */,
        };
        registration.updateVersion(versionPayload);
        view = new View.ServiceWorkerUpdateCycleView(registration);
        ranges = view.calculateServiceWorkerUpdateRanges();
        assert.lengthOf(ranges, 3, 'An activating registration has ranges to display.');
        versionId++;
        versionPayload = {
            registrationId,
            versionId: versionId.toString(),
            scriptURL: '',
            status: "activated" /* Protocol.ServiceWorker.ServiceWorkerVersionStatus.Activated */,
            runningStatus: "running" /* Protocol.ServiceWorker.ServiceWorkerVersionRunningStatus.Running */,
        };
        registration.updateVersion(versionPayload);
        view = new View.ServiceWorkerUpdateCycleView(registration);
        ranges = view.calculateServiceWorkerUpdateRanges();
        assert.lengthOf(ranges, 3, 'An activated registration has ranges to display.');
        versionId++;
        versionPayload = {
            registrationId,
            versionId: versionId.toString(),
            scriptURL: '',
            status: "redundant" /* Protocol.ServiceWorker.ServiceWorkerVersionStatus.Redundant */,
            runningStatus: "stopped" /* Protocol.ServiceWorker.ServiceWorkerVersionRunningStatus.Stopped */,
        };
        registration.updateVersion(versionPayload);
        view = new View.ServiceWorkerUpdateCycleView(registration);
        ranges = view.calculateServiceWorkerUpdateRanges();
        assert.lengthOf(ranges, 3, 'A redundent registration has ranges to display.');
    });
});
//# sourceMappingURL=ServiceWorkerUpdateCycleView.test.js.map