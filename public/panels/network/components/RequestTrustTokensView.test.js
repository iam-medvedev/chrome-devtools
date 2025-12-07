// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assertScreenshot, renderElementIntoDOM, } from '../../../testing/DOMHelpers.js';
import { setupLocaleHooks } from '../../../testing/LocaleHelpers.js';
import { createViewFunctionStub } from '../../../testing/ViewFunctionHelpers.js';
import * as NetworkComponents from './components.js';
describe('RequestTrustTokensView', () => {
    setupLocaleHooks();
    const makeRequest = (params, result) => {
        return {
            trustTokenParams: () => params,
            trustTokenOperationDoneEvent: () => result,
            addEventListener: () => { },
            removeEventListener: () => { },
        };
    };
    it('renders the success state correctly', async () => {
        const container = document.createElement('div');
        renderElementIntoDOM(container);
        NetworkComponents.RequestTrustTokensView.DEFAULT_VIEW({
            status: 'Success',
            description: 'The operations result was served from cache.',
            issuedTokenCount: 5,
            params: [
                { name: 'Type', value: 'Issuance', isCode: true },
                { name: 'Refresh policy', value: 'UseCached', isCode: true },
                { name: 'Issuers', value: ['example.org', 'foo.dev'] },
                { name: 'Top level origin', value: 'foo.dev' },
                { name: 'Issuer', value: 'example.org' },
            ],
        }, undefined, container);
        await assertScreenshot('network/request_trust_tokens_view_success.png');
    });
    it('renders the failure state correctly', async () => {
        const container = document.createElement('div');
        renderElementIntoDOM(container);
        NetworkComponents.RequestTrustTokensView.DEFAULT_VIEW({
            status: 'Failure',
            description: 'The servers response was malformed or otherwise invalid.',
            params: [
                { name: 'Type', value: 'Redemption', isCode: true },
            ],
        }, undefined, container);
        await assertScreenshot('network/request_trust_tokens_view_failure.png');
    });
    it('adds refreshPolicy for Redemption request params', async () => {
        const view = createViewFunctionStub(NetworkComponents.RequestTrustTokensView.RequestTrustTokensView);
        const component = new NetworkComponents.RequestTrustTokensView.RequestTrustTokensView(undefined, view);
        const request = makeRequest({
            operation: "Redemption" /* Protocol.Network.TrustTokenOperationType.Redemption */,
            refreshPolicy: "UseCached" /* Protocol.Network.TrustTokenParamsRefreshPolicy.UseCached */,
        });
        component.request = request;
        const input = await view.nextInput;
        assert.deepEqual(input.params, [
            { name: 'Type', value: 'Redemption', isCode: true },
            { name: 'Refresh policy', value: 'UseCached', isCode: true },
        ]);
    });
    it('adds issuedTokenCount an Issuance request result section', async () => {
        const view = createViewFunctionStub(NetworkComponents.RequestTrustTokensView.RequestTrustTokensView);
        const component = new NetworkComponents.RequestTrustTokensView.RequestTrustTokensView(undefined, view);
        const request = makeRequest({
            operation: "Issuance" /* Protocol.Network.TrustTokenOperationType.Issuance */,
            refreshPolicy: "UseCached" /* Protocol.Network.TrustTokenParamsRefreshPolicy.UseCached */,
        }, {
            status: "Ok" /* Protocol.Network.TrustTokenOperationDoneEventStatus.Ok */,
            type: "Issuance" /* Protocol.Network.TrustTokenOperationType.Issuance */,
            requestId: 'mockId',
            issuedTokenCount: 5,
        });
        component.request = request;
        const input = await view.nextInput;
        assert.deepEqual(input.params, [
            { name: 'Type', value: 'Issuance', isCode: true },
        ]);
        assert.strictEqual(input.issuedTokenCount, 5);
    });
    it('adds topLevelOrigin and issuerOrigin to params if present in result', async () => {
        const view = createViewFunctionStub(NetworkComponents.RequestTrustTokensView.RequestTrustTokensView);
        const component = new NetworkComponents.RequestTrustTokensView.RequestTrustTokensView(undefined, view);
        const request = makeRequest({
            operation: "Redemption" /* Protocol.Network.TrustTokenOperationType.Redemption */,
            refreshPolicy: "UseCached" /* Protocol.Network.TrustTokenParamsRefreshPolicy.UseCached */,
        }, {
            status: "Ok" /* Protocol.Network.TrustTokenOperationDoneEventStatus.Ok */,
            type: "Redemption" /* Protocol.Network.TrustTokenOperationType.Redemption */,
            requestId: 'mockId',
            topLevelOrigin: 'https://toplevel.com',
            issuerOrigin: 'https://issuer.com',
        });
        component.request = request;
        const input = await view.nextInput;
        assert.deepEqual(input.params, [
            { name: 'Type', value: 'Redemption', isCode: true },
            { name: 'Refresh policy', value: 'UseCached', isCode: true },
            { name: 'Top level origin', value: 'https://toplevel.com' },
            { name: 'Issuer', value: 'https://issuer.com' },
        ]);
    });
});
//# sourceMappingURL=RequestTrustTokensView.test.js.map