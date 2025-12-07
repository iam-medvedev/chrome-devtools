// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../../core/common/common.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import { createTarget, describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import { createViewFunctionStub } from '../../../../testing/ViewFunctionHelpers.js';
import * as NetworkForward from '../../../network/forward/forward.js';
import * as PreloadingHelper from '../helper/helper.js';
import * as PreloadingComponents from './components.js';
const { urlString } = Platform.DevToolsPath;
describeWithEnvironment('RuleSetGrid', () => {
    it('updates view with correct data', async () => {
        const view = createViewFunctionStub(PreloadingComponents.RuleSetGrid.RuleSetGrid);
        const ruleSetGrid = new PreloadingComponents.RuleSetGrid.RuleSetGrid(view);
        const data = {
            rows: [{
                    ruleSet: {
                        id: 'ruleSetId:0.1',
                        loaderId: 'loaderId:1',
                        sourceText: '{}',
                    },
                    preloadsStatusSummary: 'Summary',
                }],
            pageURL: urlString `https://example.com/`,
        };
        ruleSetGrid.data = data;
        const input = await view.nextInput;
        assert.deepEqual(input.data, data);
    });
    it('dispatches select event on onSelect', async () => {
        const view = createViewFunctionStub(PreloadingComponents.RuleSetGrid.RuleSetGrid);
        const ruleSetGrid = new PreloadingComponents.RuleSetGrid.RuleSetGrid(view);
        const data = {
            rows: [],
            pageURL: urlString `https://example.com/`,
        };
        ruleSetGrid.data = data;
        const input = await view.nextInput;
        const eventPromise = ruleSetGrid.once("select" /* PreloadingComponents.RuleSetGrid.Events.SELECT */);
        input.onSelect('ruleSetId:1');
        const ruleSetId = await eventPromise;
        assert.strictEqual(ruleSetId, 'ruleSetId:1');
    });
    it('reveals in elements on onRevealInElements', async () => {
        const view = createViewFunctionStub(PreloadingComponents.RuleSetGrid.RuleSetGrid);
        const ruleSetGrid = new PreloadingComponents.RuleSetGrid.RuleSetGrid(view);
        const target = createTarget();
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const revealStub = sinon.stub(Common.Revealer.RevealerRegistry.prototype, 'reveal');
        const data = {
            rows: [],
            pageURL: urlString `https://example.com/`,
        };
        ruleSetGrid.data = data;
        const input = await view.nextInput;
        const ruleSet = {
            id: 'ruleSetId:1',
            loaderId: 'loaderId:1',
            sourceText: '{}',
            backendNodeId: 42,
        };
        input.onRevealInElements(ruleSet);
        sinon.assert.calledOnce(revealStub);
        const revealedObject = revealStub.firstCall.args[0];
        assert.instanceOf(revealedObject, SDK.DOMModel.DeferredDOMNode);
        assert.strictEqual(revealedObject.backendNodeId(), 42);
    });
    it('reveals in network on onRevealInNetwork', async () => {
        const view = createViewFunctionStub(PreloadingComponents.RuleSetGrid.RuleSetGrid);
        const ruleSetGrid = new PreloadingComponents.RuleSetGrid.RuleSetGrid(view);
        const target = createTarget();
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const networkManager = target.model(SDK.NetworkManager.NetworkManager);
        assert.exists(networkManager);
        const request = { requestId: 'requestId:1' };
        // Explicitly stub the method on the instance to avoid potential issues with prototype stubbing
        const requestForIdStub = sinon.stub();
        requestForIdStub.withArgs('requestId:1').returns(request);
        networkManager.requestForId = requestForIdStub;
        const revealStub = sinon.stub(Common.Revealer.RevealerRegistry.prototype, 'reveal');
        const data = {
            rows: [],
            pageURL: urlString `https://example.com/`,
        };
        ruleSetGrid.data = data;
        const input = await view.nextInput;
        const ruleSet = {
            id: 'ruleSetId:1',
            loaderId: 'loaderId:1',
            sourceText: '{}',
            requestId: 'requestId:1',
            url: 'https://example.com/rules.json',
        };
        input.onRevealInNetwork(ruleSet);
        sinon.assert.calledOnce(revealStub);
        const revealedObject = revealStub.firstCall.args[0];
        assert.instanceOf(revealedObject, NetworkForward.UIRequestLocation.UIRequestLocation);
        assert.strictEqual(revealedObject.request, request);
    });
    it('reveals preloads on onRevealPreloadsAssociatedWithRuleSet', async () => {
        const view = createViewFunctionStub(PreloadingComponents.RuleSetGrid.RuleSetGrid);
        const ruleSetGrid = new PreloadingComponents.RuleSetGrid.RuleSetGrid(view);
        const revealStub = sinon.stub(Common.Revealer.RevealerRegistry.prototype, 'reveal');
        const data = {
            rows: [],
            pageURL: urlString `https://example.com/`,
        };
        ruleSetGrid.data = data;
        const input = await view.nextInput;
        const ruleSet = {
            id: 'ruleSetId:1',
            loaderId: 'loaderId:1',
            sourceText: '{}',
        };
        input.onRevealPreloadsAssociatedWithRuleSet(ruleSet);
        sinon.assert.calledOnce(revealStub);
        const revealedObject = revealStub.firstCall.args[0];
        assert.instanceOf(revealedObject, PreloadingHelper.PreloadingForward.AttemptViewWithFilter);
        assert.strictEqual(revealedObject.ruleSetId, 'ruleSetId:1');
    });
});
//# sourceMappingURL=RuleSetGrid.test.js.map