// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as SDK from '../../../core/sdk/sdk.js';
import { assertIsError, assertIsResult, } from '../../../testing/AiAssistanceHelpers.js';
import { describeWithEnvironment, } from '../../../testing/EnvironmentHelpers.js';
import { createStubbedDomNodeWithModels, getMatchedStyles, ruleMatch, } from '../../../testing/StyleHelpers.js';
import * as AiAssistance from '../ai_assistance.js';
describeWithEnvironment('GetStylesTool', () => {
    let element;
    let target;
    let domModel;
    beforeEach(() => {
        target = sinon.createStubInstance(SDK.Target.Target);
        target.model.returns(null);
        domModel = sinon.createStubInstance(SDK.DOMModel.DOMModel);
        domModel.target.returns(target);
        element = sinon.createStubInstance(SDK.DOMModel.DOMNode);
        element.domModel.returns(domModel);
        element.backendNodeId.returns(99);
    });
    it('successfully returns computed and authored styles', async () => {
        const { node: resolvedNode, cssModel } = createStubbedDomNodeWithModels({ nodeId: 42 });
        resolvedNode.ownerDocument = {
            documentURL: 'https://example.com',
        };
        element.ownerDocument = {
            documentURL: 'https://example.com',
        };
        sinon.stub(SDK.DOMModel.DeferredDOMNode.prototype, 'resolvePromise').resolves(resolvedNode);
        const computedStyleMap = new Map([['color', 'red']]);
        cssModel.getComputedStyle.resolves(computedStyleMap);
        const matchedPayload = [ruleMatch('div', { color: 'red' })];
        const matchedStyles = getMatchedStyles({ cssModel, node: resolvedNode, matchedPayload });
        cssModel.getMatchedStyles.resolves(matchedStyles);
        const tool = new AiAssistance.GetStyles.GetStylesTool();
        const context = {
            conversationContext: null,
            getTarget: () => target,
            getEstablishedOrigin: () => 'https://example.com',
        };
        const response = await tool.handler({
            explanation: 'Get element styles',
            elements: [42],
            styleProperties: ['color'],
        }, context);
        assertIsResult(response);
        assert.strictEqual(response.result, JSON.stringify({
            42: {
                computed: { color: 'red' },
                authored: { color: 'red' },
            },
        }, null, 2));
    });
    it('returns error when target is missing', async () => {
        const tool = new AiAssistance.GetStyles.GetStylesTool();
        const context = {
            conversationContext: null,
            getTarget: () => null,
            getEstablishedOrigin: () => undefined,
        };
        const response = await tool.handler({
            explanation: 'Get element styles',
            elements: [42],
            styleProperties: ['color'],
        }, context);
        assertIsError(response);
        assert.strictEqual(response.error, 'Error: Could not find the inspected page.');
    });
    it('returns error on origin mismatch', async () => {
        const { node: resolvedNode } = createStubbedDomNodeWithModels({ nodeId: 42 });
        resolvedNode.ownerDocument = {
            documentURL: 'https://another.com',
        };
        sinon.stub(SDK.DOMModel.DeferredDOMNode.prototype, 'resolvePromise').resolves(resolvedNode);
        const tool = new AiAssistance.GetStyles.GetStylesTool();
        const context = {
            conversationContext: null,
            getTarget: () => target,
            getEstablishedOrigin: () => 'https://example.com',
        };
        const response = await tool.handler({
            explanation: 'Get element styles',
            elements: [42],
            styleProperties: ['color'],
        }, context);
        assertIsError(response);
        assert.strictEqual(response.error, 'Error: Node does not belong to the current origin.');
    });
});
//# sourceMappingURL=GetStyles.test.js.map