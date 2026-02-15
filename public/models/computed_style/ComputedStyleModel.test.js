// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget, stubNoopSettings } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { getMatchedStyles } from '../../testing/StyleHelpers.js';
import * as ComputedStyle from './computed_style.js';
function createNode(target, { nodeId }) {
    const domModel = target.model(SDK.DOMModel.DOMModel);
    assert.exists(domModel);
    const node = SDK.DOMModel.DOMNode.create(domModel, null, false, {
        nodeId,
        backendNodeId: 2,
        nodeType: Node.ELEMENT_NODE,
        nodeName: 'div',
        localName: 'div',
        nodeValue: '',
    });
    return node;
}
describeWithMockConnection('ComputedStyleModel', () => {
    let target;
    let computedStyleModel;
    let domNode1;
    beforeEach(() => {
        stubNoopSettings();
        target = createTarget();
        domNode1 = createNode(target, { nodeId: 1 });
        const cssModel = target.model(SDK.CSSModel.CSSModel);
        sinon.stub(ComputedStyle.ComputedStyleModel.ComputedStyleModel.prototype, 'cssModel').returns(cssModel);
        computedStyleModel = new ComputedStyle.ComputedStyleModel.ComputedStyleModel();
    });
    afterEach(() => { });
    it('listens to events on the CSS Model when there is a node given', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        const listenerSpy = sinon.spy(cssModel, 'addEventListener');
        computedStyleModel.node = domNode1;
        // Feels silly to assert each individual call; but assert 1 to verify that
        // code path was executed as expected.
        sinon.assert.calledWith(listenerSpy, SDK.CSSModel.Events.StyleSheetAdded);
    });
    it('does not listen to events when there is no node given', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        const listenerSpy = sinon.spy(SDK.CSSModel.CSSModel.prototype, 'addEventListener');
        computedStyleModel.node = null;
        sinon.assert.callCount(listenerSpy, 0);
    });
    it('emits the CSS_MODEL_CHANGED event when there is a change', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        computedStyleModel.node = domNode1;
        const modelChangedListener = sinon.spy();
        computedStyleModel.addEventListener("CSSModelChanged" /* ComputedStyle.ComputedStyleModel.Events.CSS_MODEL_CHANGED */, event => modelChangedListener(event.data));
        const FAKE_CSS_STYLESHEET_HEADER = {};
        cssModel.dispatchEventToListeners(SDK.CSSModel.Events.StyleSheetAdded, FAKE_CSS_STYLESHEET_HEADER);
        sinon.assert.calledOnceWithExactly(modelChangedListener, FAKE_CSS_STYLESHEET_HEADER);
    });
    it('emits the COMPUTED_STYLE_CHANGED event when the node ID matches', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        computedStyleModel.node = domNode1;
        const computedStyleListener = sinon.spy();
        computedStyleModel.addEventListener("ComputedStyleChanged" /* ComputedStyle.ComputedStyleModel.Events.COMPUTED_STYLE_CHANGED */, computedStyleListener);
        cssModel.dispatchEventToListeners(SDK.CSSModel.Events.ComputedStyleUpdated, { nodeId: domNode1.id });
        sinon.assert.callCount(computedStyleListener, 1);
    });
    it('does not emit the COMPUTED_STYLE_CHANGED event if the Node ID is different', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        computedStyleModel.node = domNode1;
        const computedStyleListener = sinon.spy();
        computedStyleModel.addEventListener("ComputedStyleChanged" /* ComputedStyle.ComputedStyleModel.Events.COMPUTED_STYLE_CHANGED */, computedStyleListener);
        cssModel.dispatchEventToListeners(SDK.CSSModel.Events.ComputedStyleUpdated, { nodeId: (domNode1.id + 1) });
        sinon.assert.callCount(computedStyleListener, 0);
    });
    it('fetchAllComputedStyleInfo calls the backend and returns the data', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        computedStyleModel.node = domNode1;
        const mockComputedStyle = new Map([['color', 'red']]);
        const getComputedStyleStub = sinon.stub(cssModel, 'getComputedStyle').resolves(mockComputedStyle);
        const mockMatchedStyles = await getMatchedStyles({
            node: domNode1,
        });
        const cachedMatchedCascadeForNodeStub = sinon.stub(cssModel, 'cachedMatchedCascadeForNode').resolves(mockMatchedStyles);
        const result = await computedStyleModel.fetchAllComputedStyleInfo();
        sinon.assert.calledOnce(getComputedStyleStub);
        sinon.assert.calledOnce(cachedMatchedCascadeForNodeStub);
        assert.deepEqual(result.computedStyle?.computedStyle, mockComputedStyle);
        assert.deepEqual(result.matchedStyles, mockMatchedStyles);
    });
    it('fetchAllComputedStyleInfo returns null for matchedStyles if the node does not match', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        computedStyleModel.node = domNode1;
        const mockComputedStyle = new Map([['color', 'red']]);
        const getComputedStyleStub = sinon.stub(cssModel, 'getComputedStyle').resolves(mockComputedStyle);
        const domNode2 = createNode(target, { nodeId: 2 });
        const mockMatchedStyles = await getMatchedStyles({
            node: domNode2,
        });
        const cachedMatchedCascadeForNodeStub = sinon.stub(cssModel, 'cachedMatchedCascadeForNode').resolves(mockMatchedStyles);
        const result = await computedStyleModel.fetchAllComputedStyleInfo();
        sinon.assert.calledOnce(getComputedStyleStub);
        sinon.assert.calledOnce(cachedMatchedCascadeForNodeStub);
        assert.deepEqual(result.computedStyle?.computedStyle, mockComputedStyle);
        assert.isNull(result.matchedStyles);
    });
});
//# sourceMappingURL=ComputedStyleModel.test.js.map