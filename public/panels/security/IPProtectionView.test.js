// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget, stubNoopSettings } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { createViewFunctionStub } from '../../testing/ViewFunctionHelpers.js';
import * as Security from './security.js';
describeWithMockConnection('IPProtectionView', () => {
    let mockView;
    let target;
    let networkManager;
    const allStatuses = [
        "Available" /* Protocol.Network.IpProxyStatus.Available */,
        "FeatureNotEnabled" /* Protocol.Network.IpProxyStatus.FeatureNotEnabled */,
        "MaskedDomainListNotEnabled" /* Protocol.Network.IpProxyStatus.MaskedDomainListNotEnabled */,
        "MaskedDomainListNotPopulated" /* Protocol.Network.IpProxyStatus.MaskedDomainListNotPopulated */,
        "AuthTokensUnavailable" /* Protocol.Network.IpProxyStatus.AuthTokensUnavailable */,
        "Unavailable" /* Protocol.Network.IpProxyStatus.Unavailable */,
        "BypassedByDevTools" /* Protocol.Network.IpProxyStatus.BypassedByDevTools */,
        null,
    ];
    beforeEach(() => {
        mockView = createViewFunctionStub(Security.IPProtectionView.IPProtectionView);
        stubNoopSettings();
        target = createTarget();
        networkManager = target.model(SDK.NetworkManager.NetworkManager);
        assert.exists(networkManager);
    });
    afterEach(() => {
        sinon.restore();
    });
    for (const status of allStatuses) {
        it(`should render the status "${status}"`, async () => {
            // Mock the promise returned by getIpProtectionProxyStatus.
            const getIpProtectionProxyStatusStub = sinon.stub(networkManager, 'getIpProtectionProxyStatus').resolves(status);
            // Instantiate the view, which will immediately call wasShown() and fetch the status.
            const view = new Security.IPProtectionView.IPProtectionView(undefined, mockView);
            // Wait for the asynchronous operations to complete and the view to update.
            await view.wasShown();
            await mockView.nextInput;
            // Assert that the mocked method was called.
            sinon.assert.called(getIpProtectionProxyStatusStub);
            // Assert that the view's input now contains the expected status.
            assert.deepEqual(mockView.input.status, status);
        });
    }
});
//# sourceMappingURL=IPProtectionView.test.js.map